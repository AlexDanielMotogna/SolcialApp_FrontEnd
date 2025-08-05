"use client";

import React, { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";
import Key from "../../../public/imgs/key.svg";
import Eye from "../../../public/imgs/eye.svg";
import EyeSlash from "../../../public/imgs/eye-slash.svg";
import AuthLayout from "@/components/layouts/auth-layout";
import AuthErrorModal from "@/components/modals/AuthErrorModal";
import AuthSuccessModal from "@/components/modals/AuthSuccessModal";
import PasswordStrengthBar from "../../components/PasswordStrengthBar";
import Button from "../../components/Button";
import Link from "next/link";
import { LoadingBar } from "@/components/ui/LoadingBar";

function getPasswordStrength(password: string): number {
  let score = 0;
  if (password.length >= 8) score++;
  if (/[A-Z]/.test(password)) score++;
  if (/[0-9]/.test(password)) score++;
  if (/[^A-Za-z0-9]/.test(password)) score++;
  return score;
}

const ResetPassword = () => {
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setMsg("");
    setLoading(true);

    if (!password || !confirm) {
      setError("Please fill in all fields.");
      setLoading(false);
      return;
    }
    const passwordStrength = getPasswordStrength(password);
    if (passwordStrength < 3) {
      setError("Password is too weak. Please use a stronger password.");
      setLoading(false);
      return;
    }
    if (password !== confirm) {
      setError("Passwords do not match.");
      setLoading(false);
      return;
    }
    if (!token) {
      setError("Invalid or missing reset token.");
      setLoading(false);
      return;
    }

    try {
      const res = await fetch("/api/auth/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token, password }),
      });
      const data = await res.json();

      if (res.ok) {
        setMsg("Your password has been reset. You can now log in.");
        setPassword("");
        setConfirm("");
        setRedirecting(true);
        setTimeout(() => {
          router.push("/login");
        }, 2000);
      } else {
        setError(data.msg || data.message || "Something went wrong.");
      }
    } catch {
      setError("Something went wrong.");
    }
    setLoading(false);
  };

  return (
    <AuthLayout>
      <form
        className="w-full flex flex-col gap-8 text-xl"
        onSubmit={handleSubmit}
      >
        {/* Header */}
        <div className="w-full p-8 flex items-center justify-between">
          <h3 className="text-5xl text-white font-bold">Reset Password</h3>
        </div>
        {/* Form content */}
        <div className="w-full flex flex-col gap-6 px-10 py-4">
          <div className="w-full flex flex-col gap-2">
            <label className="font-semibold text-[#ACB5BB] text-xl">New Password</label>
            <div className="relative w-full">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none">
                <Image src={Key} alt="key" width={28} height={28} />
              </span>
              <input
                type={showPassword ? "text" : "password"}
                placeholder="********"
                className="w-full py-5 pl-16 pr-12 bg-[#232326] border-2 border-[#44444A] rounded-xl text-white text-xl placeholder-[#6C7278] shadow focus:border-[#9945FF] focus:ring-2 focus:ring-[#9945FF] focus:outline-none transition-all"
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
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                <Image src={showPassword ? EyeSlash : Eye} alt="toggle password" width={24} height={24} />
              </button>
            </div>
            <PasswordStrengthBar password={password} />
          </div>
          <div className="w-full flex flex-col gap-2">
            <label className="font-semibold text-[#ACB5BB] text-xl">Confirm Password</label>
            <div className="relative w-full">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none">
                <Image src={Key} alt="key" width={28} height={28} />
              </span>
              <input
                type={showConfirm ? "text" : "password"}
                placeholder="********"
                className="w-full py-5 pl-16 pr-12 bg-[#232326] border-2 border-[#44444A] rounded-xl text-white text-xl placeholder-[#6C7278] shadow focus:border-[#9945FF] focus:ring-2 focus:ring-[#9945FF] focus:outline-none transition-all"
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
                aria-label={showConfirm ? "Hide password" : "Show password"}
              >
                <Image src={showConfirm ? EyeSlash : Eye} alt="toggle password" width={24} height={24} />
              </button>
            </div>
          </div>
        </div>
        {/* Footer */}
        <div className="w-full border-t border-[#44444A] p-8 flex flex-col gap-4">
          <Button
            text={loading ? "Resetting..." : "Reset Password"}
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
                    ? <span className="text-xl font-semibold">Redirecting to login page...</span>
                    : <span className="text-xl font-semibold">Resetting password...</span>
                }
                className="shadow-md shadow-green-500/20"
              />
            </div>
          )}
          <p className="font-medium text-xl text-[#ACB5BB] text-center">
            Remember your password?{" "}
            <Link
              href="/login"
              className="font-semibold bg-gradient-to-r from-[#9945FF] to-[#0BCB7B] bg-clip-text text-transparent cursor-pointer text-xl"
            >
              Login Here
            </Link>
          </p>
        </div>
      </form>
      {/* Error Modal */}
      {error && (
        <AuthErrorModal
          title="Error"
          message={error}
          onClose={() => setError("")}
          className="text-xl"
        />
      )}
      {/* Success Modal */}
      {msg && (
        <AuthSuccessModal
          title="Success"
          message={msg}
          onClose={() => setMsg("")}
          className="text-xl"
        />
      )}
    </AuthLayout>
  );
};

export default ResetPassword;
