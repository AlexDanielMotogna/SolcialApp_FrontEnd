import { connectDB } from "@/lib/mongodb";
import AuthUser from "@/models/AuthUser";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  await connectDB();
  const session = await getServerSession(authOptions);
  const email = session?.user?.email;
  if (!email) return Response.json({ error: "Unauthorized" }, { status: 401 });

  await AuthUser.findOneAndUpdate(
    { email },
    { twoFactorEnabled: false, twoFactorSecret: null }
  );

  return Response.json({ success: true });
}