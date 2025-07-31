type ForgotPasswordTemplate = {
  subject: string;
  html: string;
};

export default function forgotPasswordEmailTemplate(
  userName: string,
  resetUrl: string,
  lang: string = "en"
): ForgotPasswordTemplate {
  const templates: Record<string, ForgotPasswordTemplate> = {
    en: {
      subject: "Reset your password",
      html: `
        <div>
          <h2>Hello ${userName || ""},</h2>
          <p>You requested a password reset.</p>
          <p>
            Click this link to choose a new password:<br/>
            <a href="${resetUrl}">${resetUrl}</a>
          </p>
          <p>This link will expire in 30 minutes.</p>
          <p>If you did not request this, please ignore this email.</p>
        </div>
      `,
    },
  };
  return templates[lang] || templates.en;
}