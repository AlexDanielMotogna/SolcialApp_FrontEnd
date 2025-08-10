"use client";
import ButtonBorder from "@/components/ButtonBorder";
import AuthLayout from "@/components/layouts/auth-layout";
import AuthErrorModal from "@/components/modals/AuthErrorModal";
import AuthSuccessModal from "@/components/modals/AuthSuccessModal";
import { LoadingBar } from "@/components/ui/LoadingBar";
import { signIn } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useTranslation } from "react-i18next";
import EyeSlash from "../../../public/imgs/eye-slash.svg";
import Eye from "../../../public/imgs/eye.svg";
import google from "../../../public/imgs/google.svg";

const Login: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [is2faRequired, setIs2faRequired] = useState(false);
  const [totpCode, setTotpCode] = useState("");
  const [errorModal, setErrorModal] = useState<string | null>(null);
  const [loginLoading, setLoginLoading] = useState(false);
  const [showSpinner, setShowSpinner] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [verificationSent, setVerificationSent] = useState(false);
  const [noPasswordModal, setNoPasswordModal] = useState(false);
  const [noPasswordEmail, setNoPasswordEmail] = useState("");
  const [hasTried2fa, setHasTried2fa] = useState(false);
  const [redirectingMsg, setRedirectingMsg] = useState<string | null>(null);
  const [mailSent, setMailSent] = useState(false);
  const { t, i18n } = useTranslation();
  const [ready, setReady] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (i18n.isInitialized) {
      setReady(true);
    } else {
      const onInit = () => setReady(true);
      i18n.on("initialized", onInit);
      return () => i18n.off("initialized", onInit);
    }
  }, [i18n]);

  // Vérifie si 2FA est requis à chaque changement d'email
  useEffect(() => {
    if (email) {
      fetch(`/api/auth/needs-2fa?email=${encodeURIComponent(email)}`)
        .then((res) => res.json())
        .then((data) => setIs2faRequired(!!data.twoFactorEnabled));
    } else {
      setIs2faRequired(false);
    }
  }, [email]);

  // Vérifie au chargement si un email est déjà pré-rempli (par le navigateur)
  useEffect(() => {
    // Attend que le DOM soit prêt pour lire la valeur de l'input
    setTimeout(() => {
      const input = document.querySelector<HTMLInputElement>(
        'input[type="email"]'
      );
      if (input && input.value && !email) {
        setEmail(input.value);
      }
    }, 100);
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginLoading(true);
    setErrorModal(null);

    // Usar NextAuth para login
    const result = await signIn("credentials", {
      redirect: false,
      email,
      password,
      totp: is2faRequired ? totpCode : undefined,
      callbackUrl: "/dashboard",
    });

    // Manejo de errores y lógica de negocio personalizada
    if (result?.error) {
      // No password
      if (result.error === "no_password") {
        setNoPasswordModal(true);
        setNoPasswordEmail(email);

        // Envío automático del mail de reset
        fetch("/api/auth/request-password", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email }),
        })
          .then((r) => {
            if (r.ok) {
              toast.success(t("password_reset_email_sent"));
            } else {
              r.json().then((d) =>
                toast.error(d.msg || t("failed_to_send_reset_email"))
              );
            }
          })
          .catch(() => toast.error(t("failed_to_send_reset_email")));

        setLoginLoading(false);
        return;
      }

      // 2FA requerido
      if (result.error === "2fa_required") {
        setHasTried2fa(true);
        setLoginLoading(false);
        return;
      }

      // Código 2FA inválido
      if (
        is2faRequired &&
        result.error &&
        result.error.toLowerCase().includes("2fa")
      ) {
        setHasTried2fa(true);
        setLoginLoading(false);
        return;
      }

      // Otros errores
      setErrorModal(result.error);
      setLoginLoading(false);
      return;
    }

    // Éxito
    setLoginLoading(false);
    setShowSpinner(true);
    setTimeout(() => router.push("/dashboard"));
  };

  const handleGoogleLogin = async () => {
    await signIn("google", { callbackUrl: "/dashboard" });
  };

  const handleRedirect = (url: string, msg: string) => {
    setRedirectingMsg(msg);
    setShowSpinner(true);
    setTimeout(() => {
      setShowSpinner(false);
      setRedirectingMsg(null);
      router.push(url,60000);
    });
  };

  // Envoi automatique du mail quand la modale s'ouvre
  useEffect(() => {
    if (noPasswordModal && noPasswordEmail && !mailSent) {
      setMailSent(true);
      fetch("/api/auth/request-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: noPasswordEmail,
          lang: i18n.language,
        }),
      })
        .then((res) => {
          if (res.ok) {
            toast.success(
              t("password_reset_email_sent", "Password reset email sent!")
            );
          } else {
            res.json().then((data) => {
              toast.error(
                data.message ||
                  t("failed_to_send_reset_email", "Failed to send reset email")
              );
            });
          }
        })
        .catch(() => {
          toast.error(
            t("failed_to_send_reset_email", "Failed to send reset email")
          );
        });
    }
    // Reset mailSent quand la modale se ferme
    if (!noPasswordModal) setMailSent(false);
  }, [noPasswordModal, noPasswordEmail, t, mailSent, i18n.language]);

  if (!ready) return null;

  return (
    <AuthLayout>
      <form
        onSubmit={handleLogin}
        className="w-full flex flex-col gap-8 text-xl"
      >
        {/* Header */}
        <div className="w-full p-8 flex items-center justify-between">
          <h3 className="text-5xl text-white font-bold">{t("login")}</h3>{" "}
          {/* Passe à text-5xl */}
        </div>

        {/* Form content */}
        <div className="w-full flex flex-col gap-6 px-10 py-4">
          {/* Email */}
          <div className="w-full flex flex-col gap-2">
            <label className="font-semibold text-[#ACB5BB] text-xl">
              {t("email")}
            </label>
            <div className="relative w-full">
              <input
                type="email"
                placeholder={t("placeholder_email")}
                className="w-full py-5 px-4 bg-[#232326] border-2 border-[#44444A] rounded-xl text-white text-[1.15em] placeholder-[#6C7278] shadow focus:border-[#9945FF] focus:ring-2 focus:ring-[#9945FF] focus:outline-none transition-all"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                autoComplete="username"
              />
            </div>
          </div>
          {/* Password */}
          <div className="w-full flex flex-col gap-2">
            <label className="font-semibold text-[#ACB5BB] text-xl">
              {t("password")}
            </label>
            <div className="relative w-full">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="********"
                className="w-full py-5 pr-12 px-4 bg-[#232326] border-2 border-[#44444A] rounded-xl text-white text-[1.15em] placeholder-[#6C7278] shadow focus:border-[#9945FF] focus:ring-2 focus:ring-[#9945FF] focus:outline-none transition-all"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                autoComplete="current-password"
              />
              <button
                type="button"
                tabIndex={-1}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-[#6C7278] hover:text-[#9945FF] transition-colors"
                onClick={() => setShowPassword((v) => !v)}
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                <span
                  className="inline-block"
                  style={{ filter: "contrast(2) brightness(1.5)" }}
                >
                  <Image
                    src={showPassword ? EyeSlash : Eye}
                    alt="toggle password"
                    width={24}
                    height={24}
                  />
                </span>
              </button>
            </div>
          </div>
          {/* 2FA */}
          {is2faRequired && (
            <div className="w-full flex flex-col gap-2">
              <label className="font-semibold text-[#ACB5BB] text-xl">
                {t("two_factor_code", "Two Factor Authentication Code")}
              </label>
              <input
                type="text"
                placeholder={t("two_factor_placeholder", "Code 2FA")}
                className="w-full py-5 px-4 bg-[#232326] border-2 border-[#44444A] rounded-xl text-white text-[1.15em] placeholder-[#6C7278] shadow focus:border-[#9945FF] focus:ring-2 focus:ring-[#9945FF] focus:outline-none transition-all"
                value={totpCode}
                onChange={(e) => setTotpCode(e.target.value)}
              />
            </div>
          )}
          {/* Forgot password */}
          <div className="w-full flex justify-end">
            <button
              type="button"
              onClick={() =>
                handleRedirect(
                  "/forgot-password",
                  t(
                    "redirecting_forgot_password",
                    "Redirecting to forgot password page..."
                  )
                )
              }
              className="font-semibold bg-gradient-to-r from-[#9945FF] to-[#0BCB7B] bg-clip-text text-transparent cursor-pointer text-xl outline-none border-none hover:opacity-80"
            >
              {t("forgot_password")}
            </button>
          </div>
        </div>
        {/* Footer */}
        <div className="w-full border-t border-[#44444A] p-8 flex flex-col gap-4">
          <ButtonBorder
            text={loginLoading ? t("loading") : t("login")}
            type="submit"
            disabled={loginLoading || !!redirectingMsg}
            className="w-full py-4 rounded-xl font-bold text-xl shadow-green-500/20 hover:scale-105 transition-transform"
          />

          {/* Loader pendant le login */}
          {loginLoading && !redirectingMsg && (
            <div className="w-full my-4">
              <LoadingBar
                variant="primary"
                size="md"
                text={<span className="text-xl">{t("loading", "Loading...")}</span>}
                className="shadow-md shadow-blue-500/20"
              />
            </div>
          )}

          {/* Loader pour la redirection */}
          {redirectingMsg && (
            <div className="w-full my-4">
              <LoadingBar
                variant="primary"
                size="md"
                text={redirectingMsg}
                className="shadow-md shadow-blue-500/20"
              />
            </div>
          )}

          <div className="w-full flex items-center gap-3">
            <div className="h-[1px] bg-[#44444A] w-1/2" />
            <span className="text-[#6C7278] font-normal text-xl">
              {t("or")}
            </span>
            <div className="h-[1px] bg-[#44444A] w-1/2" />
          </div>
          <div
            className="w-full h-[54px] flex items-center justify-center gap-2 bg-[#2C2C30] border border-[#44444A] rounded-xl cursor-pointer hover:bg-[#232326] transition-all"
            onClick={handleGoogleLogin}
          >
            <Image src={google} alt="google" width={32} height={32} />
            <span className="text-white font-medium text-xl">
              {t("login_with_google")}
            </span>
          </div>
          <p className="font-medium text-xl text-[#ACB5BB] text-center">
            {t("dont_have_account")}{" "}
            <button
              type="button"
              onClick={() =>
                handleRedirect(
                  "/register",
                  t(
                    "redirecting_register",
                    "Redirecting to registration page..."
                  )
                )
                }
                className="font-semibold bg-gradient-to-r from-[#9945FF] to-[#0BCB7B] bg-clip-text text-transparent cursor-pointer text-xl outline-none border-none hover:opacity-80"
            >
              {t("register_here")}
            </button>
          </p>
        </div>
      </form>

      {/* Error Modal */}
      {errorModal && (
        <AuthErrorModal
          message={
            errorModal === "no_password"
              ? t(
                  "no_password_modal",
                  "This account does not have a password associated. Please create one using the link sent to your email."
                )
              : t(errorModal)
          }
          onClose={() => setErrorModal(null)}
          className="text-xl"
        />
      )}

      {/* Success Modal */}
      {verificationSent && (
        <AuthSuccessModal
          title={t("email_sent")}
          message={t(
            "verification_email_sent",
            "Please check your inbox and follow the instructions to verify your email."
          )}
          onClose={() => setVerificationSent(false)}
          className="text-xl"
        />
      )}

      {/* No Password Modal */}
      {noPasswordModal && (
        <AuthSuccessModal
          title={t("password_missing", "Mot de passe manquant")}
          message={t(
            "no_password_modal",
            "Ce compte n'a pas de mot de passe associé. Un email pour en créer un vient de vous être envoyé."
          )}
          buttonText={t("ok_got_it", "OK, got it")}
          onButtonClick={() => setNoPasswordModal(false)}
          onClose={() => setNoPasswordModal(false)}
          className="text-xl"
        />
      )}

      {/* 2FA Error Modal */}
      {is2faRequired && hasTried2fa && (
        <AuthErrorModal
          title={t("error", "Error")}
          message={t("invalid_2fa_code", "Invalid 2FA code.")}
          onClose={() => setHasTried2fa(false)}
          className="text-xl"
        />
      )}
    </AuthLayout>
  );
};

export default Login;
