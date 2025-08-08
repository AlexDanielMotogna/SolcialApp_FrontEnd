export function GenerateReferralCode(length = 10): string {
  const alphabet = "0123456789ABCDEFGHIJKLMNPQRSTVWXYZ";
  const bytes = new Uint8Array(length);
  crypto.getRandomValues(bytes);

  return [...bytes].map((b) => alphabet[b % alphabet.length]).join("");
}
