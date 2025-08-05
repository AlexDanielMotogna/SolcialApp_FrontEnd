"use client";
import React, { useEffect, useState } from "react";
import Button from "@/components/Button";
import ButtonBorder from "@/components/ButtonBorder";
import Input from "@/components/Input";
import Link from "next/link";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import Image from "next/image";
import User from "../../../public/imgs/user.svg";
import Key from "../../../public/imgs/key.svg";
import Eye from "../../../public/imgs/eye.svg";
import EyeSlash from "../../../public/imgs/eye-slash.svg";
import google from "../../../public/imgs/google.svg";
import { signIn } from "next-auth/react";
import { useAuthUser } from "@/hooks/useAuthUser";
import { LoadingBar } from "@/components/ui/LoadingBar";
import AuthLayout from "@/components/layouts/auth-layout";
import AuthErrorModal from "@/components/modals/AuthErrorModal";
import AuthSuccessModal from "@/components/modals/AuthSuccessModal";

const Login: React.FC = () => {
  const { isAuthenticated, isLoading } = useAuthUser();
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
  const [loginLoadingVariant, setLoginLoadingVariant] = useState<"bar" | "dots" | "spinner">("dots");
  const [hasTried2fa, setHasTried2fa] = useState(false);
  const [redirectingMsg, setRedirectingMsg] = useState<string | null>(null);
  const router = useRouter();

  // Redirect if already authenticated
  useEffect(() => {
    if (isAuthenticated) {
      router.push("/dashboard");
    }
  }, [isAuthenticated, router]);

  // Vérifie si 2FA est requis à chaque changement d'email
  useEffect(() => {
    if (email) {
      fetch(`/api/auth/needs-2fa?email=${encodeURIComponent(email)}`)
        .then(res => res.json())
        .then(data => setIs2faRequired(!!data.twoFactorEnabled));
    } else {
      setIs2faRequired(false);
    }
  }, [email]);

  // Vérifie au chargement si un email est déjà pré-rempli (par le navigateur)
  useEffect(() => {
    // Attend que le DOM soit prêt pour lire la valeur de l'input
    setTimeout(() => {
      const input = document.querySelector<HTMLInputElement>('input[type="email"]');
      if (input && input.value && !email) {
        setEmail(input.value);
      }
    }, 100);
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginLoading(true);
    setErrorModal(null);

    const credentials: Record<string, any> = {
      email,
      password,
    };
    // Ajoute totp seulement si le champ 2FA est affiché
    if (is2faRequired) {
      credentials.totp = totpCode;
    }

    const result = await signIn("credentials", {
      ...credentials,
      redirect: false,
    });

    // Cas 2FA demandé ou code manquant
    if (is2faRequired && (!totpCode || result?.error === "2fa_required")) {
      setHasTried2fa(true);
      setLoginLoading(false);
      return;
    }

    // Cas code 2FA invalide
    if (is2faRequired && result?.error && result.error.toLowerCase().includes("2fa")) {
      setHasTried2fa(true);
      setLoginLoading(false);
      return;
    }

    // Autres erreurs
    if (result?.error) {
      setErrorModal(result.error);
      setLoginLoading(false);
      return;
    }

    // Succès
    setLoginLoading(false);
    setShowSpinner(true);
    setTimeout(() => router.push("/dashboard"), 1500);
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
      router.push(url);
    }, 1200);
  };

  return (
    <AuthLayout>
      <form
        onSubmit={handleLogin}
        className="w-full flex flex-col gap-8 text-xl"
      >
        {/* Header */}
        <div className="w-full p-8 flex items-center justify-between">
          <h3 className="text-5xl text-white font-bold">Login</h3> {/* Passe à text-5xl */}
        </div>

        {/* Form content */}
        <div className="w-full flex flex-col gap-6 px-10 py-4">
          {/* Email */}
          <div className="w-full flex flex-col gap-2">
            <label className="font-semibold text-[#ACB5BB] text-xl">Email</label>
            <div className="relative w-full">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none">
                <Image src={User} alt="user" width={28} height={28} />
              </span>
              <input
                type="email"
                placeholder="yourname@gmail.com"
                className="w-full py-5 pl-16 pr-4 bg-[#232326] border-2 border-[#44444A] rounded-xl text-white text-[1.15em] placeholder-[#6C7278] shadow focus:border-[#9945FF] focus:ring-2 focus:ring-[#9945FF] focus:outline-none transition-all"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                autoComplete="username"
              />
            </div>
          </div>
          {/* Password */}
          <div className="w-full flex flex-col gap-2">
            <label className="font-semibold text-[#ACB5BB] text-xl">Password</label>
            <div className="relative w-full">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none">
                <Image src={Key} alt="key" width={28} height={28} />
              </span>
              <input
                type={showPassword ? "text" : "password"}
                placeholder="********"
                className="w-full py-5 pl-16 pr-12 bg-[#232326] border-2 border-[#44444A] rounded-xl text-white text-[1.15em] placeholder-[#6C7278] shadow focus:border-[#9945FF] focus:ring-2 focus:ring-[#9945FF] focus:outline-none transition-all"
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
                <span className="inline-block" style={{ filter: "contrast(2) brightness(1.5)" }}>
                  <Image src={showPassword ? EyeSlash : Eye} alt="toggle password" width={24} height={24} />
                </span>
              </button>
            </div>
          </div>
          {/* 2FA */}
          {is2faRequired && (
            <div className="w-full flex flex-col gap-2">
              <label className="font-semibold text-[#ACB5BB] text-xl">
                Two Factor Authentication Code
              </label>
              <input
                type="text"
                placeholder="Code 2FA"
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
                  "Redirecting to forgot password page..."
                )
              }
              className="font-semibold bg-gradient-to-r from-[#9945FF] to-[#0BCB7B] bg-clip-text text-transparent cursor-pointer text-xl outline-none border-none hover:opacity-80"
            >
              Forgot Password?
            </button>
          </div>
        </div>
        {/* Footer */}
        <div className="w-full border-t border-[#44444A] p-8 flex flex-col gap-4">
          <ButtonBorder
            text={loginLoading ? "Logging in..." : "Login"}
            type="submit"
            disabled={loginLoading || !!redirectingMsg}
            className="w-full py-4 rounded-xl font-bold text-xl shadow-green-500/20 hover:scale-105 transition-transform"
          />

          {/* Loader pour la redirection */}
          {redirectingMsg && (
            <div className="w-full my-4">
              <LoadingBar
                variant="primary"
                size="md"
                text={<span className="text-xl">{redirectingMsg}</span>}
                className="shadow-md shadow-blue-500/20"
              />
            </div>
          )}

          <div className="w-full flex items-center gap-3">
            <div className="h-[1px] bg-[#44444A] w-1/2" />
            <span className="text-[#6C7278] font-normal text-xl">Or</span>
            <div className="h-[1px] bg-[#44444A] w-1/2" />
          </div>
          <div
            className="w-full h-[54px] flex items-center justify-center gap-2 bg-[#2C2C30] border border-[#44444A] rounded-xl cursor-pointer hover:bg-[#232326] transition-all"
            onClick={handleGoogleLogin}
          >
            <Image src={google} alt="google" width={32} height={32} />
            <span className="text-white font-medium text-xl">Login with Google</span>
          </div>
          <p className="font-medium text-xl text-[#ACB5BB] text-center">
            Don’t have an account?{" "}
            <button
              type="button"
              onClick={() =>
                handleRedirect(
                  "/register",
                  "Redirecting to registration page..."
                )
              }
              className="font-semibold bg-gradient-to-r from-[#9945FF] to-[#0BCB7B] bg-clip-text text-transparent cursor-pointer text-xl outline-none border-none hover:opacity-80"
            >
              Register Here
            </button>
          </p>
        </div>
      </form>

      {/* Error Modal */}
      {errorModal && (
        <AuthErrorModal
          message={
            errorModal === "no_password"
              ? "This account does not have a password associated. Please create one using the link sent to your email."
              : errorModal
          }
          onClose={() => setErrorModal(null)}
          className="text-xl"
        />
      )}

      {/* Success Modal */}
      {verificationSent && (
        <AuthSuccessModal
          title="Verification Email Sent"
          message="Please check your inbox and follow the instructions to verify your email."
          onClose={() => setVerificationSent(false)}
          className="text-xl"
        />
      )}

      {/* No Password Modal */}
      {noPasswordModal && (
        <AuthSuccessModal
          title="Password missing"
          message="This account does not have a password associated. Click below to create one."
          buttonText="Create a password"
          onButtonClick={async () => {
            setNoPasswordModal(false);
            try {
              const res = await fetch("/api/auth/request-password", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email: noPasswordEmail }),
              });
              if (res.ok) {
                toast.success("Password reset email sent!");
              } else {
                const data = await res.json();
                toast.error(data.message || "Failed to send reset email");
              }
            } catch (error) {
              toast.error("Failed to send reset email");
            }
          }}
          onClose={() => setNoPasswordModal(false)}
          className="text-xl"
        />
      )}

      {/* 2FA Error Modal */}
      {is2faRequired && hasTried2fa && (
        <AuthErrorModal
          title="Error"
          message="Invalid 2FA code."
          onClose={() => setHasTried2fa(false)}
          className="text-xl"
        />
      )}
    </AuthLayout>
  );
};

export default Login;