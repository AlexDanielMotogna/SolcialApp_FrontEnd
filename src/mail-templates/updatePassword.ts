type UpdatePasswordTemplate = {
  subject: string;
  html: string;
};

export default function updatePasswordEmailTemplate(
  userName: string,
  lang: string = "en"
): UpdatePasswordTemplate {
  const baseLang = lang.split("-")[0];
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
    fr: {
      subject: "Votre mot de passe a été mis à jour",
      html: `
        <div>
          <h2>Bonjour ${userName || ""},</h2>
          <p>Votre mot de passe a été changé avec succès.</p>
          <p>Si vous n'avez pas effectué cette action, veuillez contacter notre support immédiatement.</p>
          <p>Vous pouvez maintenant vous connecter avec votre nouveau mot de passe.</p>
          <br/>
          <p>Cordialement,<br/>L'équipe Solcial</p>
        </div>
      `,
    },
    es: {
      subject: "Tu contraseña ha sido actualizada",
      html: `
        <div>
          <h2>Hola ${userName || ""},</h2>
          <p>Tu contraseña ha sido cambiada con éxito.</p>
          <p>Si no realizaste esta acción, por favor contacta a nuestro soporte de inmediato.</p>
          <p>Ahora puedes iniciar sesión con tu nueva contraseña.</p>
          <br/>
          <p>Saludos cordiales,<br/>El equipo de Solcial</p>
        </div>
      `,
    },
  };
  return templates[baseLang] || templates.en;
}