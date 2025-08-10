import nodemailer from "nodemailer";
// This module is responsible for sending emails using Nodemailer
// It is used for functionalities like sending verification emails, password reset links, etc.
const transporter = nodemailer.createTransport({
  service: process.env.EMAIL_SERVICE || "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

/**
 * Sends an email using the configured transporter.
 */
export async function sendMail({
  to,
  subject,
  html,
}: {
  to: string;
  subject: string;
  html: string;
}): Promise<void> {
  await transporter.sendMail({
    from: `Solcial <${process.env.EMAIL_USER}>`,
    to,
    subject,
    html,
  });
}
