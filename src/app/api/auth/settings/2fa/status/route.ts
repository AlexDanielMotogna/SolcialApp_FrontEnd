import { connectDB } from "@/lib/mongodb";
import AuthUser from "@/models/AuthUser";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  await connectDB();
  const session = await getServerSession(authOptions);
  const email = session?.user?.email;
  if (!email) {
    return new Response(JSON.stringify({ enabled: false }), { status: 401 });
  }

  const user = await AuthUser.findOne({ email });
  return new Response(JSON.stringify({ enabled: !!user?.twoFactorEnabled }), { status: 200 });
}