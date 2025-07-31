import { NextRequest } from 'next/server';

interface RateLimitEntry {
  count: number;
  resetTime: number;
}

const rateLimitMap = new Map<string, RateLimitEntry>();

export function rateLimit(identifier: string, limit: number = 5, windowMs: number = 60000) {
  const now = Date.now();
  const key = identifier;
  
  if (rateLimitMap.has(key)) {
    const entry = rateLimitMap.get(key)!;
    if (now > entry.resetTime) {
      rateLimitMap.delete(key);
    }
  }
  
  const entry = rateLimitMap.get(key) || { count: 0, resetTime: now + windowMs };
  entry.count++;
  rateLimitMap.set(key, entry);
  
  const isBlocked = entry.count > limit;
  const remainingTime = Math.max(0, entry.resetTime - now);
  
  return { isBlocked, remainingTime, attempts: entry.count, limit };
}

export function isValidSolanaAddress(address: string): boolean {
  const base58Regex = /^[123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz]{32,44}$/;
  return base58Regex.test(address);
}

export function isSuspiciousUserAgent(userAgent: string): boolean {
  const suspiciousPatterns = [
    /bot/i, /crawler/i, /spider/i, /scraper/i,
    /python/i, /curl/i, /wget/i, /postman/i
  ];
  return suspiciousPatterns.some(pattern => pattern.test(userAgent));
}

export async function verifyRecaptcha(token: string): Promise<{
  success: boolean;
  score?: number;
  error?: string;
}> {
  try {
    const response = await fetch('https://www.google.com/recaptcha/api/siteverify', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: `secret=${process.env.RECAPTCHA_SECRET_KEY}&response=${token}`
    });

    const data = await response.json();
    
    console.log('reCAPTCHA response:', data); // ✅ DEBUG
    
    if (!data.success) {
      return { success: false, error: 'Captcha verification failed' };
    }

    // ✅ AJUSTAR SCORE MÍNIMO PARA TESTING
    const minScore = 0.3; // Bajado de 0.5 a 0.3 para testing
    if (data.score < minScore) {
      return { success: false, error: `Low security score: ${data.score}`, score: data.score };
    }

    if (data.action !== 'join_quest') {
      return { success: false, error: `Invalid action: ${data.action}` };
    }

    return { success: true, score: data.score };
  } catch (error) {
    console.error('Captcha verification error:', error);
    return { success: false, error: 'Captcha service error' };
  }
}

export async function validateRequest(req: NextRequest, data: any): Promise<{
  valid: boolean;
  error?: string;
  statusCode?: number;
}> {
  const { userId, questId, tasks, walletaddress, captchaToken } = data;

  // ✅ 1. VERIFICAR CAPTCHA PRIMERO (antes del rate limiting)
  if (!captchaToken) {
    return { valid: false, error: "Security verification required", statusCode: 400 };
  }

  const captchaResult = await verifyRecaptcha(captchaToken);
  if (!captchaResult.success) {
    console.log('❌ Captcha failed:', captchaResult.error);
    return { valid: false, error: captchaResult.error || "Security verification failed", statusCode: 400 };
  }

  console.log(`✅ reCAPTCHA verified successfully - Score: ${captchaResult.score}`);

  // ✅ 2. RATE LIMITING DESPUÉS DEL CAPTCHA (más permisivo para usuarios verificados)
  const clientIP = req.headers.get('x-forwarded-for') || req.headers.get('x-real-ip') || 'unknown';
  const ipRateLimit = rateLimit(`quest_join_${clientIP}`, 10, 300000); // ✅ Aumentado a 10 intentos
  
  if (ipRateLimit.isBlocked) {
    return {
      valid: false,
      error: `Too many attempts. Please wait ${Math.ceil(ipRateLimit.remainingTime / 1000)} seconds.`,
      statusCode: 429
    };
  }

  // ✅ 3. VALIDAR WALLET
  if (!walletaddress || !isValidSolanaAddress(walletaddress)) {
    return { valid: false, error: "Invalid wallet address", statusCode: 400 };
  }

  // ✅ 4. RATE LIMITING POR WALLET (más permisivo)
  const walletRateLimit = rateLimit(`quest_join_wallet_${walletaddress}`, 5, 600000); // ✅ Aumentado a 5 intentos
  if (walletRateLimit.isBlocked) {
    return { valid: false, error: "Too many attempts from this wallet", statusCode: 429 };
  }

  // ✅ 5. VERIFICAR USER AGENT (más permisivo en desarrollo)
  const userAgent = req.headers.get('user-agent') || '';
  if (process.env.NODE_ENV === 'production' && isSuspiciousUserAgent(userAgent)) {
    return { valid: false, error: "Suspicious activity detected", statusCode: 403 };
  }

  return { valid: true };
}

// ✅ FUNCIÓN TEMPORAL PARA DESARROLLO
export function clearRateLimit(identifier: string) {
  if (process.env.NODE_ENV === 'development') {
    rateLimitMap.delete(identifier);
    console.log(`✅ Rate limit cleared for: ${identifier}`);
  }
}

export function clearAllRateLimits() {
  if (process.env.NODE_ENV === 'development') {
    rateLimitMap.clear();
    console.log('✅ All rate limits cleared');
  }
}