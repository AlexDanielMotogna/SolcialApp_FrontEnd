type VerificationTemplate = {
  subject: string;
  html: string;
};

export default function verificationEmailTemplate(
  userName: string,
  verificationUrl: string,
  lang: string = "en"
): VerificationTemplate {
  const baseLang = lang.split("-")[0];
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
    fr: {
      subject: "Vérifiez votre adresse e-mail",
      html: `
        <div>
          <h2>Bienvenue ${userName || ""}!</h2>
          <p>Veuillez vérifier votre adresse e-mail en cliquant sur le lien ci-dessous :</p>
          <a href="${verificationUrl}">${verificationUrl}</a>
          <p>Ce lien expirera dans 24 heures.</p>
        </div>
      `,
    },
    es: {
      subject: "Verifica tu dirección de correo electrónico",
      html: `
        <div>
          <h2>¡Bienvenido ${userName || ""}!</h2>
          <p>Por favor verifica tu dirección de correo electrónico haciendo clic en el siguiente enlace:</p>
          <a href="${verificationUrl}">${verificationUrl}</a>
          <p>Este enlace expirará en 24 horas.</p>
        </div>
      `,
    },
  };
  return templates[baseLang] || templates.en;
}