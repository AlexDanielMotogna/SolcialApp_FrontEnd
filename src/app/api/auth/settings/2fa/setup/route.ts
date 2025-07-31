import { connectDB } from "@/lib/mongodb";
import AuthUser from "@/models/AuthUser";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { generate2FASecret, generateQRCode } from "@/lib/2fa";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  await connectDB();
  const session = await getServerSession(authOptions);
  const email = session?.user?.email;
  if (!email) return Response.json({ error: "Unauthorized" }, { status: 401 });

  const { secret, otpAuthUrl } = generate2FASecret(email);
  const qrCode = await generateQRCode(otpAuthUrl);

  await AuthUser.findOneAndUpdate(
    { email },
    { twoFactorSecret: secret, twoFactorEnabled: false }
  );

  return Response.json({ qrCode, secret });
}