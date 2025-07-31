import { NextRequest } from "next/server";
import crypto from "crypto";
import { connectDB } from "@/lib/mongodb";
import AuthUser from "@/models/AuthUser";

export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest) {
  await connectDB();

  try {
    const { searchParams } = new URL(req.url);
    const token = searchParams.get("token");

    if (!token) {
      return new Response(JSON.stringify({ msg: "Verification token is required" }), { status: 400 });
    }

    const hashedToken = crypto.createHash("sha256").update(token).digest("hex");
    const user = await AuthUser.findOne({
      verificationToken: hashedToken,
      verificationTokenExpire: { $gt: Date.now() },
    });

    if (!user) {
      return new Response(JSON.stringify({ msg: "Invalid or expired token" }), { status: 400 });
    }

    user.isVerified = true;
    user.verificationToken = undefined;
    user.verificationTokenExpire = undefined;
    await user.save();

    return new Response(JSON.stringify({ message: "User verified successfully" }), { status: 200 });
  } catch (error) {
    console.error("Error in verify email:", error);
    return new Response(JSON.stringify({ msg: "Internal server error" }), { status: 500 });
  }
}