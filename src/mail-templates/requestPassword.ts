type requestPasswordTemplate = {
  subject: string;
  html: string;
};

export default function requestPasswordEmailTemplate(
  userName: string,
  resetUrl: string,
  lang: string = "en"
): requestPasswordTemplate {
  const baseLang = lang.split("-")[0];
  const templates: Record<string, requestPasswordTemplate> = {
    en: {
      subject: "Create your password",
      html: `
        <div>
          <h2>Hello ${userName || ""},</h2>
          <p>You requested to create a password.</p>
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
      subject: "Créez votre mot de passe",
      html: `
        <div>
          <h2>Bonjour ${userName || ""},</h2>
          <p>Vous avez demandé à créer un mot de passe.</p>
          <p>
            Cliquez sur ce lien pour choisir un nouveau mot de passe :<br/>
            <a href="${resetUrl}">${resetUrl}</a>
          </p>
          <p>Ce lien expirera dans 30 minutes.</p>
          <p>Si vous n'avez pas demandé cela, veuillez ignorer cet e-mail.</p>
        </div>
      `,
    },
    es: {
      subject: "Crea tu contraseña",
      html: `
        <div>
          <h2>Hola ${userName || ""},</h2>
          <p>Has solicitado crear una contraseña.</p>
          <p>
            Haz clic en este enlace para elegir una nueva contraseña:<br/>
            <a href="${resetUrl}">${resetUrl}</a>
          </p>
          <p>Este enlace expirará en 30 minutos.</p>
          <p>Si no solicitaste esto, ignora este correo electrónico.</p>
        </div>
      `,
    },
  };
  return templates[baseLang] || templates.en;
}