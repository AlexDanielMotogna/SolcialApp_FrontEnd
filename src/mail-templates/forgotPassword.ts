type ForgotPasswordTemplate = {
  subject: string;
  html: string;
};

export default function forgotPasswordEmailTemplate(
  userName: string,
  resetUrl: string,
  lang: string = "en"
): ForgotPasswordTemplate {
  const baseLang = lang.split("-")[0];
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
    fr: {
      subject: "Réinitialisez votre mot de passe",
      html: `
        <div>
          <h2>Bonjour ${userName || ""},</h2>
          <p>Vous avez demandé une réinitialisation de mot de passe.</p>
          <p>
            Cliquez sur ce lien pour choisir un nouveau mot de passe :<br/>
            <a href="${resetUrl}">${resetUrl}</a>
          </p>
          <p>Ce lien expirera dans 30 minutes.</p>
          <p>Si vous n'avez pas fait cette demande, veuillez ignorer cet e-mail.</p>
        </div>
      `,
    },
    es: {
      subject: "Restablecer su contraseña",
      html: `
        <div>
          <h2>Hola ${userName || ""},</h2>
          <p>Ha solicitado restablecer su contraseña.</p>
          <p>
            Haga clic en este enlace para elegir una nueva contraseña:<br/>
            <a href="${resetUrl}">${resetUrl}</a>
          </p>
          <p>Este enlace caducará en 30 minutos.</p>
          <p>Si no solicitó esto, ignore este correo electrónico.</p>
        </div>
      `,
    }
  };
  return templates[baseLang] || templates.en;
}