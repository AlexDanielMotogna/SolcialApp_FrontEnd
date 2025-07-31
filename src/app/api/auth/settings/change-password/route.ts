import { connectDB } from "@/lib/mongodb";
import AuthUser from "@/models/AuthUser";
import { hashPassword, comparePassword } from "@/lib/security-hash";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  await connectDB();
  const session = await getServerSession(authOptions);
  const email = session?.user?.email;
  if (!email) {
    return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 401 });
  }

  const { currentPassword, newPassword } = await req.json();
  if (!currentPassword || !newPassword || newPassword.length < 8) {
    return new Response(JSON.stringify({ error: "Invalid input" }), { status: 400 });
  }

  const user = await AuthUser.findOne({ email });
  if (!user) {
    return new Response(JSON.stringify({ error: "User not found" }), { status: 404 });
  }

  const passwordMatch = await comparePassword(currentPassword, user.password);
  console.log(`Password match: ${passwordMatch}`); // Debugging line to check password comparison
  console.log(`Current Password: ${currentPassword}, User Password: ${user.password}, currentHashPassword: ${hashPassword(currentPassword)}`); // Debugging line to check values
  if (!passwordMatch) {
    return new Response(JSON.stringify({ error: "Incorrect current password" }), { status: 401 });
  }

  user.password = await hashPassword(newPassword);
  await user.save();

  return new Response(JSON.stringify({ message: "Password updated successfully" }), { status: 200 });
}