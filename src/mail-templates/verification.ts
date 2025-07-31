type VerificationTemplate = {
  subject: string;
  html: string;
};

export default function verificationEmailTemplate(
  userName: string,
  verificationUrl: string,
  lang: string = "en"
): VerificationTemplate {
  const templates: Record<string, VerificationTemplate> = {
    en: {
      subject: "Verify your email address",
      html: `
        <div>
          <h2>Welcome ${userName || ""}!</h2>
          <p>Please verify your email address by clicking the link below:</p>
          <a href="${verificationUrl}">${verificationUrl}</a>
          <p>This link will expire in 24 hours.</p>
        </div>
      `,
    },
  };
  return templates[lang] || templates.en;
}