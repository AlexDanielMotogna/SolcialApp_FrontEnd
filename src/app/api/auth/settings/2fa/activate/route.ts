import { connectDB } from "@/lib/mongodb";
import AuthUser from "@/models/AuthUser";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { verify2FAToken } from "@/lib/2fa";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  await connectDB();
  const session = await getServerSession(authOptions);
  const email = session?.user?.email;
  if (!email) return Response.json({ error: "Unauthorized" }, { status: 401 });

  const { code } = await req.json();
  const user = await AuthUser.findOne({ email });
  if (!user?.twoFactorSecret) {
    return Response.json({ error: "2FA not initialized" }, { status: 400 });
  }

  const isValid = verify2FAToken(user.twoFactorSecret, code);
  if (!isValid) {
    return Response.json({ error: "Invalid code" }, { status: 400 });
  }

  user.twoFactorEnabled = true;
  await user.save();

  return Response.json({ success: true });
}