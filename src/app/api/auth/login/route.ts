import { NextRequest } from "next/server";
import { verifyPassword } from "@/lib/security-hash";
import { connectDB } from "@/lib/mongodb";
import AuthUser from "@/models/AuthUser";
import { verify2FAToken } from "@/lib/2fa";

export const dynamic = 'force-dynamic';

export async function POST(req: NextRequest) {
  await connectDB();

  try {
    const body = await req.json();
    const { email, password, totp } = body;

    const user = await AuthUser.findOne({ email });

    if (!user) {
      return new Response(JSON.stringify({ msg: "Invalid credentials" }), { status: 409 });
    }

    if (!user.isVerified) {
      return new Response(JSON.stringify({ msg: "Please verify your email address to login" }), { status: 409 });
    }

    // Cas où le password est null ou non défini
    if (!user.password) {
      return new Response(JSON.stringify({ status: "no_password", msg: "No password set for this account" }), { status: 403 });
    }

    const isMatch = await verifyPassword(password, user.password);
    if (!isMatch) {
      return new Response(JSON.stringify({ msg: "Invalid credentials" }), { status: 409 });
    }

    // Vérifie le code TOTP si le 2FA est activé
    if (user.twoFactorEnabled) {
      if (!totp) {
        // Demande le code TOTP au frontend
        return new Response(JSON.stringify({ status: "2fa_required" }), { status: 401 });
      }
      const isValid2FA = verify2FAToken(user.twoFactorSecret, totp);
      if (!isValid2FA) {
        return new Response(JSON.stringify({ msg: "Invalid 2FA code" }), { status: 401 });
      }
    }

    const { password: _, twoFactorSecret, ...userObject } = user.toObject();

    return new Response(JSON.stringify({
      status: "success",
      user: userObject,
    }), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ msg: "Internal server error" }), { status: 500 });
  }
}