import { NextRequest } from "next/server";
import { connectDB } from "@/lib/mongodb";
import AuthUser from "@/models/AuthUser";

export async function GET(req: NextRequest) {
  await connectDB();
  const email = req.nextUrl.searchParams.get("email");
  if (!email) {
    return new Response(JSON.stringify({ twoFactorEnabled: false }), { status: 400 });
  }
  const user = await AuthUser.findOne({ email });
  return new Response(JSON.stringify({ twoFactorEnabled: !!user?.twoFactorEnabled }), { status: 200 });
}