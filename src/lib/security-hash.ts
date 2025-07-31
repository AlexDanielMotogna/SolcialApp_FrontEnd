import bcrypt from "bcryptjs";
import crypto from "crypto";

// Hash password with bcrypt and a secret pepper
export async function hashPassword(password: string): Promise<string> {
  const pepper = process.env.HASH_PASSWORD_SECRET || "";
  const saltRounds = 6;
  return await bcrypt.hash(password + pepper, saltRounds);
}

// Verify password with bcrypt and secret pepper
export async function verifyPassword(password: string, hashedPassword: string): Promise<boolean> {
  const pepper = process.env.HASH_PASSWORD_SECRET || "";
  return await bcrypt.compare(password + pepper, hashedPassword);
}

// Compare plain password with hashed password
export async function comparePassword(plainPassword: string, hashedPassword: string): Promise<boolean> {
  const pepper = process.env.HASH_PASSWORD_SECRET || "";
  return await bcrypt.compare(plainPassword + pepper, hashedPassword);
}

// AES encryption for tokens using HASH_TOKEN_SECRET
export function encryptAES(data: string, secret = process.env.HASH_TOKEN_SECRET || ""): string {
  const iv = crypto.randomBytes(16);
  const key = crypto.createHash("sha256").update(secret).digest();
  const cipher = crypto.createCipheriv("aes-256-ctr", key, iv);
  const encrypted = Buffer.concat([cipher.update(data, "utf8"), cipher.final()]);
  return `${iv.toString("hex")}:${encrypted.toString("hex")}`;
}

// AES decryption for tokens using HASH_TOKEN_SECRET
export function decryptAES(encryptedData: string, secret = process.env.HASH_TOKEN_SECRET || ""): string {
  const [ivHex, encryptedHex] = encryptedData.split(":");
  const iv = Buffer.from(ivHex, "hex");
  const encrypted = Buffer.from(encryptedHex, "hex");
  const key = crypto.createHash("sha256").update(secret).digest();
  const decipher = crypto.createDecipheriv("aes-256-ctr", key, iv);
  const decrypted = Buffer.concat([decipher.update(encrypted), decipher.final()]);
  return decrypted.toString("utf8");
}