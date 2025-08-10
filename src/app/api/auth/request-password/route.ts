import { encryptAES,decryptAES } from "@/lib/security-hash";
import { sendMail } from "@/lib/mailer";
import requestPasswordEmailTemplate from "@/mail-templates/requestPassword";
import { connectDB } from "@/lib/mongodb";
import AuthUser from "@/models/AuthUser";
import crypto from "crypto";
import { NextRequest } from "next/server";

function isTokenValid(user: any) {
  return (
    user.resetPasswordToken &&
    user.resetPasswordExpire &&
    user.resetPasswordExpire > Date.now()
  );
}

export async function POST(request: NextRequest) {
  await connectDB();
  try {
    const { email, lang = "en" } = await request.json();

    if (!email) {
      return new Response(JSON.stringify({ msg: "Please provide an email" }), { status: 400 });
    }

    const user = await AuthUser.findOne({ email });
    if (!user) {
      return new Response(JSON.stringify({ msg: "User with this email does not exist" }), { status: 404 });
    }

    // On ne fait la demande que si le user n'a pas de password
    if (user.password) {
      return new Response(JSON.stringify({ msg: "This account already has a password" }), { status: 400 });
    }

    let resetToken: string;
    if (isTokenValid(user)) {
      // Reuse existing token
      resetToken = decryptAES(user.resetPasswordToken);
    } else {
      // Generate a new token
      resetToken = crypto.randomBytes(20).toString("hex");
      const encryptedToken = encryptAES(resetToken);
      user.resetPasswordToken = encryptedToken;
      user.resetPasswordExpire = Date.now() + 30 * 60 * 1000;
      await user.save();
    }

    const resetUrl = `${process.env.FRONTEND_URL}/reset-password?token=${resetToken}`;
    const templateData = requestPasswordEmailTemplate(user.name, resetUrl, lang);
    await sendMail({
      to: user.email,
      subject: templateData.subject,
      html: templateData.html,
    });

    return new Response(JSON.stringify({ message: "Password creation email sent" }), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ msg: "Internal server error" }), { status: 500 });
  }
}