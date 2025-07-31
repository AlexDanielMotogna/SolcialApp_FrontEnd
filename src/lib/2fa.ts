import speakeasy from "speakeasy";
import QRCode from "qrcode";

/**
 * Generate a secret TOTP (2FA)
 */
export function generate2FASecret(email: string) {
  const secretObj = speakeasy.generateSecret({ name: `SolcialApp (${email})` });
  return {
    secret: secretObj.base32,
    otpAuthUrl: secretObj.otpauth_url,
  };
}

/**
 * Check TOTP sent by the user
 */
export function verify2FAToken(secret: string, token: string) {
  return speakeasy.totp.verify({
    secret,
    encoding: "base32",
    token,
  });
}

/**
 * Generate QR code from otpAuthUrl
 */
export async function generateQRCode(otpAuthUrl: string): Promise<string> {
  return QRCode.toDataURL(otpAuthUrl);
}