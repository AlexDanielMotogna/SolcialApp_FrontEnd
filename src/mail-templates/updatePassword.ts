type UpdatePasswordTemplate = {
  subject: string;
  html: string;
};

export default function updatePasswordEmailTemplate(
  userName: string,
  lang: string = "en"
): UpdatePasswordTemplate {
  const templates: Record<string, UpdatePasswordTemplate> = {
    en: {
      subject: "Your password has been updated",
      html: `
        <div>
          <h2>Hello ${userName || ""},</h2>
          <p>Your password was successfully changed.</p>
          <p>If you did not perform this action, please contact our support immediately.</p>
          <p>You can now log in with your new password.</p>
          <br/>
          <p>Best regards,<br/>Solcial Team</p>
        </div>
      `,
    },
  };
  return templates[lang] || templates.en;
}