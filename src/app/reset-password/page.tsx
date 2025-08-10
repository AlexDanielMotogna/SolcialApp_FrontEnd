"use client";

import React, { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";
import Eye from "../../../public/imgs/eye.svg";
import EyeSlash from "../../../public/imgs/eye-slash.svg";
import AuthLayout from "@/components/layouts/auth-layout";
import AuthErrorModal from "@/components/modals/AuthErrorModal";
import AuthSuccessModal from "@/components/modals/AuthSuccessModal";
import PasswordStrengthBar from "../../components/PasswordStrengthBar";
import Button from "../../components/Button";
import Link from "next/link";
import { LoadingBar } from "@/components/ui/LoadingBar";
import { useTranslation } from "react-i18next";

function getPasswordStrength(password: string): number {
  let score = 0;
  if (password.length >= 8) score++;
  if (/[A-Z]/.test(password)) score++;
  if (/[0-9]/.test(password)) score++;
  if (/[^A-Za-z0-9]/.test(password)) score++;
  return score;
}

const ResetPassword = () => {
  const { t, i18n } = useTranslation();
  const [ready, setReady] = useState(false);
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [redirecting, setRedirecting] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  useEffect(() => {
    if (i18n.isInitialized) {
      setReady(true);
    } else {
      const onInit = () => setReady(true);
      i18n.on("initialized", onInit);
      return () => i18n.off("initialized", onInit);
    }
  }, [i18n]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setMsg("");
    setLoading(true);

    if (!password || !confirm) {
      setError(t("please_fill_all_fields", "Please fill all fields."));
      setLoading(false);
      return;
    }
    const passwordStrength = getPasswordStrength(password);
    if (passwordStrength < 3) {
      setError(t("password_too_weak", "Password is too weak. Please use a stronger password."));
      setLoading(false);
      return;
    }
    if (password !== confirm) {
      setError(t("passwords_dont_match", "Passwords do not match."));
      setLoading(false);
      return;
    }
    if (!token) {
      setError(t("invalid_or_missing_token", "Invalid or missing reset tokens."));
      setLoading(false);
      return;
    }

    try {
      const res = await fetch("/api/auth/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          token,
          password,
          lang: i18n.language,
        }),
      });
      const data = await res.json();

      if (res.ok) {
        setMsg(t("password_reset_success", "Votre mot de passe a été réinitialisé. Vous pouvez maintenant vous connecter."));
        setPassword("");
        setConfirm("");
        setRedirecting(true);
        setTimeout(() => {
          router.push("/login");
        }, 2000);
      } else {
        setError(t(data.msg) || t("something_went_wrong", "Une erreur est survenue."));
      }
    } catch {
      setError(t("something_went_wrong", "Une erreur est survenue."));
    }
    setLoading(false);
  };

  if (!ready) return null;

  return (
    <AuthLayout>
      <form
        className="w-full flex flex-col gap-8 text-xl"
        onSubmit={handleSubmit}
      >
        {/* Header */}
        <div className="w-full p-8 flex items-center justify-between">
          <h3 className="text-5xl text-white font-bold">{t("reset_password", "Reset password")}</h3>
        </div>
        {/* Form content */}
        <div className="w-full flex flex-col gap-6 px-10 py-4">
          <div className="w-full flex flex-col gap-2">
            <label className="font-semibold text-[#ACB5BB] text-xl">{t("new_password", "New password")}</label>
            <div className="relative w-full">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="********"
                className="w-full py-3 pl-6 pr-12 bg-[#232326] border-2 border-[#44444A] rounded-xl text-white text-xl placeholder-[#6C7278] shadow focus:border-[#9945FF] focus:ring-2 focus:ring-[#9945FF] focus:outline-none transition-all"
                style={{ lineHeight: "1.5", height: "48px" }}
                value={password}
                onChange={e => setPassword(e.target.value)}
                required
                autoComplete="new-password"
              />
              <button
                type="button"
                tabIndex={-1}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-[#6C7278] hover:text-[#9945FF] transition-colors"
                onClick={() => setShowPassword(v => !v)}
                aria-label={showPassword ? t("hide_password", "Hide password") : t("show_password", "Show password")}
              >
                <Image src={showPassword ? EyeSlash : Eye} alt="toggle password" width={24} height={24} />
              </button>
            </div>
            <PasswordStrengthBar password={password} />
          </div>
          <div className="w-full flex flex-col gap-2">
            <label className="font-semibold text-[#ACB5BB] text-xl">{t("confirm_password", "Confirm password")}</label>
            <div className="relative w-full">
              <input
                type={showConfirm ? "text" : "password"}
                placeholder="********"
                className="w-full py-3 pl-6 pr-12 bg-[#232326] border-2 border-[#44444A] rounded-xl text-white text-xl placeholder-[#6C7278] shadow focus:border-[#9945FF] focus:ring-2 focus:ring-[#9945FF] focus:outline-none transition-all"
                style={{ lineHeight: "1.5", height: "48px" }}
                value={confirm}
                onChange={e => setConfirm(e.target.value)}
                required
                autoComplete="new-password"
              />
              <button
                type="button"
                tabIndex={-1}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-[#6C7278] hover:text-[#9945FF] transition-colors"
                onClick={() => setShowConfirm(v => !v)}
                aria-label={showConfirm ? t("hide_password", "Hide password") : t("show_password", "Show password")}
              >
                <Image src={showConfirm ? EyeSlash : Eye} alt="toggle password" width={24} height={24} />
              </button>
            </div>
          </div>
        </div>
        {/* Footer */}
        <div className="w-full border-t border-[#44444A] p-8 flex flex-col gap-4">
          <Button
            text={loading ? t("resetting", "Resetting...") : t("reset_password", "Reset password")}
            type="submit"
            disabled={loading || redirecting}
            className="w-full py-4 rounded-xl font-bold text-xl shadow-green-500/20 hover:scale-105 transition-transform"
          />
          {(loading || redirecting) && (
            <div className="w-full my-4">
              <LoadingBar
                variant="success"
                size="md"
                text={
                  redirecting
                    ? <span className="text-xl font-semibold">{t("redirecting_to_login", "Redirecting to login page...")}</span>
                    : <span className="text-xl font-semibold">{t("resetting_password", "Resetting password...")}</span>
                }
                className="shadow-md shadow-green-500/20"
              />
            </div>
          )}
          <p className="font-medium text-xl text-[#ACB5BB] text-center">
            {t("remember_password", "Remember your password ?")}{" "}
            <Link
              href="/login"
              className="font-semibold bg-gradient-to-r from-[#9945FF] to-[#0BCB7B] bg-clip-text text-transparent cursor-pointer text-xl"
            >
              {t("login_here", "Login here")}
            </Link>
          </p>
        </div>
      </form>
      {/* Error Modal */}
      {error && (
        <AuthErrorModal
          title={t("error", "Erreur")}
          message={error}
          onClose={() => setError("")}
          className="text-xl"
        />
      )}
      {/* Success Modal */}
      {msg && (
        <AuthSuccessModal
          title={t("success", "Succès")}
          message={msg}
          onClose={() => setMsg("")}
          className="text-xl"
        />
      )}
    </AuthLayout>
  );
};

export default ResetPassword;
