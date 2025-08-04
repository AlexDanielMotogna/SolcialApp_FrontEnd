import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
// @ts-ignore
import speakeasy from "speakeasy";
// @ts-ignore
import QRCode from "qrcode";
import { authOptions } from "../../../../../lib/auth";
import AuthUser from "../../../../../models/AuthUser";
import { connectDB } from "../../../../../lib/mongodb";

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user?.email) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    await connectDB();

    // Check if 2FA is already enabled
    const user = await AuthUser.findOne({ email: session.user.email });
    if (!user) {
      return NextResponse.json(
        { error: "User not found" },
        { status: 404 }
      );
    }

    if (user.twoFactorEnabled) {
      return NextResponse.json(
        { error: "2FA is already enabled" },
        { status: 400 }
      );
    }

    // Generate secret
    const secret = speakeasy.generateSecret({
      name: `SolcialApp (${session.user.email})`,
      issuer: "SolcialApp",
    });

    // Generate QR code URL
    const qrCodeUrl = speakeasy.otpauthURL({
      secret: secret.base32,
      label: session.user.email,
      issuer: "SolcialApp",
      encoding: "base32",
    });

    // Store temporary secret (you might want to encrypt this)
    user.twoFactorSecret = secret.base32;
    await user.save();

    return NextResponse.json({
      secret: secret.base32,
      qrCodeUrl,
    });

  } catch (error) {
    console.error("2FA setup error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
