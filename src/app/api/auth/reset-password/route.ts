import { hashPassword, decryptAES } from "@/lib/security-hash";
import { sendMail } from "@/lib/mailer";
import updatePasswordEmailTemplate from "@/mail-templates/updatePassword";
import { connectDB } from "@/lib/mongodb";
import AuthUser from "@/models/AuthUser";
import { NextRequest } from "next/server";

export async function POST(request: NextRequest) {
  await connectDB();
  const { token, password, lang = "en" } = await request.json();

  if (!token || !password) {
    return new Response(JSON.stringify({ msg: "Please provide a token and a new password" }), { status: 400 });
  }

  // Cherche l'utilisateur avec un token valide et non expiré
  const users = await AuthUser.find({ resetPasswordExpire: { $gt: Date.now() } });
  const user = users.find(u => u.resetPasswordToken && decryptAES(u.resetPasswordToken) === token);

  if (!user) {
    return new Response(JSON.stringify({ msg: "Invalid or expired token" }), { status: 400 });
  }

  user.password = await hashPassword(password);
  user.resetPasswordToken = null;
  user.resetPasswordExpire = null;
  await user.save();

  const templateData = updatePasswordEmailTemplate(user.name, lang);
  await sendMail({
    to: user.email,
    subject: templateData.subject,
    html: templateData.html,
  });

  const { password: _, ...userObject } = user.toObject();
  return new Response(JSON.stringify({ message: "Password updated successfully", user: userObject }), { status: 200 });
}