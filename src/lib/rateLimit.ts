interface RateLimitEntry {
  count: number;
  resetTime: number;
}

const rateLimitMap = new Map<string, RateLimitEntry>();

export function rateLimit(identifier: string, limit: number = 5, windowMs: number = 60000) {
  const now = Date.now();
  const key = identifier;
  
  // Limpiar entradas expiradas
  if (rateLimitMap.has(key)) {
    const entry = rateLimitMap.get(key)!;
    if (now > entry.resetTime) {
      rateLimitMap.delete(key);
    }
  }
  
  // Obtener o crear entrada
  const entry = rateLimitMap.get(key) || { count: 0, resetTime: now + windowMs };
  
  // Incrementar contador
  entry.count++;
  rateLimitMap.set(key, entry);
  
  // Verificar límite
  const isBlocked = entry.count > limit;
  const remainingTime = Math.max(0, entry.resetTime - now);
  
  return {
    isBlocked,
    remainingTime,
    attempts: entry.count,
    limit
  };
}

// Función para validar dirección Solana
export function isValidSolanaAddress(address: string): boolean {
  const base58Regex = /^[123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz]{32,44}$/;
  return base58Regex.test(address);
}

// Función para detectar User Agents sospechosos
export function isSuspiciousUserAgent(userAgent: string): boolean {
  const suspiciousPatterns = [
    /bot/i,
    /crawler/i,
    /spider/i,
    /scraper/i,
    /python/i,
    /curl/i,
    /wget/i,
    /postman/i
  ];
  
  return suspiciousPatterns.some(pattern => pattern.test(userAgent));
}