interface RateLimitEntry {
  count: number;
  resetTime: number;
}

const rateLimitMap = new Map<string, RateLimitEntry>();

export function rateLimit(
  identifier: string,
  limit: number = 5,
  windowMs: number = 60000
) {
  const now = Date.now();
  const key = identifier;

  // Check if the key exists and if the reset time has passed
  if (rateLimitMap.has(key)) {
    const entry = rateLimitMap.get(key)!;
    if (now > entry.resetTime) {
      rateLimitMap.delete(key);
    }
  }

  // Obtain or create a new entry
  const entry = rateLimitMap.get(key) || {
    count: 0,
    resetTime: now + windowMs,
  };

  // Update entry
  entry.count++;
  rateLimitMap.set(key, entry);

  // Verfy if the limit is reached
  const isBlocked = entry.count > limit;
  const remainingTime = Math.max(0, entry.resetTime - now);

  return {
    isBlocked,
    remainingTime,
    attempts: entry.count,
    limit,
  };
}

// function to validate Solana address
export function isValidSolanaAddress(address: string): boolean {
  const base58Regex =
    /^[123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz]{32,44}$/;
  return base58Regex.test(address);
}

// Function to check if the user agent is suspicious
export function isSuspiciousUserAgent(userAgent: string): boolean {
  const suspiciousPatterns = [
    /bot/i,
    /crawler/i,
    /spider/i,
    /scraper/i,
    /python/i,
    /curl/i,
    /wget/i,
    /postman/i,
  ];

  return suspiciousPatterns.some((pattern) => pattern.test(userAgent));
}
