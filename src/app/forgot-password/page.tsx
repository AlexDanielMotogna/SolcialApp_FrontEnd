"use client";

import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { useRouter } from "next/navigation";
import Image from "next/image";
import User from "../../../public/imgs/user.svg";
import AuthLayout from "@/components/layouts/auth-layout";
import AuthErrorModal from "@/components/modals/AuthErrorModal";
import AuthSuccessModal from "@/components/modals/AuthSuccessModal";
import { LoadingBar } from "@/components/ui/LoadingBar";
import Link from "next/link";

const ForgotPassword: React.FC = () => {
  const { t } = useTranslation();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState("");
  const [error, setError] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [redirecting, setRedirecting] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setMsg("");

    try {
      const res = await fetch("/api/auth/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();

      if (!res.ok) {
        setError(t(data.msg) || t("forgot_password_failed"));
        setShowModal(true);
        setLoading(false);
        return;
      }
      setMsg(t("password_reset_email_sent"));
      setShowModal(true);
      setRedirecting(true);
      setTimeout(() => {
        setRedirecting(false);
        router.push("/login");
      }, 2000);
    } catch (e) {
      setError(t("internal_server_error"));
      setShowModal(true);
    }
    setLoading(false);
  };

  return (
    <AuthLayout>
      <form
        onSubmit={handleSubmit}
        className="w-full flex flex-col gap-8 text-xl"
      >
        {/* Header */}
        <div className="w-full p-8 flex items-center justify-between">
          <h3 className="text-5xl text-white font-bold">{t("forgot_password")}</h3>
        </div>

        {/* Form content */}
        <div className="w-full flex flex-col gap-6 px-10 py-4">
          <div className="w-full flex flex-col gap-2">
            <label className="font-semibold text-[#ACB5BB] text-xl">{t("email")}</label>
            <div className="relative w-full">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none">
                <Image src={User} alt="user" width={28} height={28} />
              </span>
              <input
                type="email"
                placeholder={t("placeholder_email")}
                className="w-full py-5 pl-16 pr-4 bg-[#232326] border-2 border-[#44444A] rounded-xl text-white text-xl placeholder-[#6C7278] shadow focus:border-[#9945FF] focus:ring-2 focus:ring-[#9945FF] focus:outline-none transition-all"
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
                autoComplete="username"
              />
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="w-full border-t border-[#44444A] p-8 flex flex-col gap-4">
          <button
            className="w-full py-4 rounded-xl font-bold text-xl bg-gradient-to-r from-[#9945FF] to-[#0BCB7B] text-white shadow-green-500/20
              transform transition-all duration-200 hover:scale-105 hover:shadow-lg hover:from-[#7c37cc] hover:to-[#0BCB7B] focus:outline-none focus:ring-2 focus:ring-[#9945FF]"
            type="submit"
            disabled={loading || redirecting}
          >
            {loading ? t("loading") : t("continue")}
          </button>
          {(loading || redirecting) && (
            <div className="w-full my-4">
              <LoadingBar
                variant="success"
                size="md"
                text={
                  redirecting
                    ? <span className="text-xl font-semibold">{t("redirecting_to_login")}</span>
                    : <span className="text-xl font-semibold">{t("sending_email")}</span>
                }
                className="shadow-md shadow-green-500/20"
              />
            </div>
          )}
          <p className="font-medium text-xl text-[#ACB5BB] text-center">
            {t("remember_password")}{" "}
            <Link
              href="/login"
              className="font-semibold bg-gradient-to-r from-[#9945FF] to-[#0BCB7B] bg-clip-text text-transparent cursor-pointer text-xl"
            >
              {t("login_here")}
            </Link>
          </p>
        </div>
      </form>

      {/* Success Modal */}
      {showModal && msg && (
        <AuthSuccessModal
          title={t("email_sent")}
          message={msg}
          onClose={() => { setShowModal(false); setMsg(""); }}
          className="text-xl"
        />
      )}
      {/* Error Modal */}
      {showModal && error && (
        <AuthErrorModal
          title={t("error")}
          message={error}
          onClose={() => { setShowModal(false); setError(""); }}
          className="text-xl"
        />
      )}
    </AuthLayout>
  );
};

export default ForgotPassword;