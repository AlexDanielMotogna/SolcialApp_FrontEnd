import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
// @ts-ignore
import speakeasy from "speakeasy";
import { authOptions } from "../../../../../lib/auth";
import AuthUser from "../../../../../models/AuthUser";
import { connectDB } from "../../../../../lib/mongodb";

// Generate backup codes
function generateBackupCodes(count: number = 10): string[] {
  const codes: string[] = [];
  for (let i = 0; i < count; i++) {
    const code = Math.random().toString(36).substring(2, 10).toUpperCase();
    codes.push(code);
  }
  return codes;
}

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user?.email) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const { token, secret } = await req.json();

    if (!token || !secret) {
      return NextResponse.json(
        { error: "Token and secret are required" },
        { status: 400 }
      );
    }

    await connectDB();

    const user = await AuthUser.findOne({ email: session.user.email });
    if (!user) {
      return NextResponse.json(
        { error: "User not found" },
        { status: 404 }
      );
    }

    // Verify the token
    const verified = speakeasy.totp.verify({
      secret: secret,
      encoding: "base32",
      token: token,
      window: 1,
    });

    if (!verified) {
      return NextResponse.json(
        { error: "Invalid verification code" },
        { status: 400 }
      );
    }

    // Generate backup codes
    const backupCodes = generateBackupCodes();

    // Enable 2FA
    user.twoFactorEnabled = true;
    user.twoFactorSecret = secret;
    // Note: You should encrypt backup codes before storing
    await user.save();

    return NextResponse.json({
      success: true,
      backupCodes,
      message: "2FA enabled successfully",
    });

  } catch (error) {
    console.error("2FA verification error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
