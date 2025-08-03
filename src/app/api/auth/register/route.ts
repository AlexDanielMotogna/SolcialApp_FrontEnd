import { NextRequest } from "next/server";
import { connectDB } from "@/lib/mongodb";
import AuthUser from "@/models/AuthUser";
import { hashPassword } from "@/lib/security-hash";
import { sendMail } from "@/lib/mailer";
import verificationEmailTemplate from "@/mail-templates/verification";
import crypto from "crypto";
import { uploadToCloudinary } from "@/lib/cloudinary";
export async function POST(req: NextRequest) {
  await connectDB();

  const formData = await req.formData();
  const username = formData.get("username") as string;
  const email = formData.get("email") as string;
  const phone = formData.get("phone") as string;
  const password = formData.get("password") as string;
  const avatarFile = formData.get("avatar");

  if (!username || !email || !password || !phone) {
    return new Response(JSON.stringify({ msg: "missing_required_fields" }), { status: 400 });
  }

  const existing = await AuthUser.findOne({ email });
  if (existing) {
    return new Response(JSON.stringify({ msg: "user_already_exists" }), { status: 409 });
  }

  const hashedPassword = await hashPassword(password);

  const verificationToken = crypto.randomBytes(32).toString("hex");
  const hashedToken = crypto.createHash("sha256").update(verificationToken).digest("hex");
  const verificationTokenExpire = new Date(Date.now() + 24 * 60 * 60 * 1000);

  let avatarUrl = "";
  if (avatarFile && typeof avatarFile === "object" && "arrayBuffer" in avatarFile) {
    avatarUrl = await uploadToCloudinary(avatarFile as File);
  }

  const createdUser = await AuthUser.create({
    name: username,
    email: email,
    phone: phone,
    password: hashedPassword,
    avatar: avatarUrl,
    isVerified: false,
    verificationToken: hashedToken,
    verificationTokenExpire,
  });

  // Envoie le token non hashé dans l’email
  const templateObj = verificationEmailTemplate(username, `${process.env.NEXTAUTH_URL}/verify-email?token=${verificationToken}`, "en");
  await sendMail({
    to: email,
    subject: templateObj.subject,
    html: templateObj.html,
  });

  return new Response(JSON.stringify(
    { status: "success", msg: "user_registered_verify_email" }
  ), { status: 200 });
}

