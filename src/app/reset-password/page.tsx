"use client";

import React, { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";

import User from "../../../public/imgs/user.svg";
import LeftArrow from "../../../public/imgs/arrow-left.svg";
import Key from "../../../public/imgs/key.svg";
import Eye from "../../../public/imgs/eye-slash.svg";
import bg from "../../../public/imgs/bg2.svg";
import logo from "../../../public/imgs/logo.png";
import CryptoBalance from "../../../public/imgs/Crypto-Balancee.png";
import Headline from "../../../public/imgs/Headline.png";
import FilledLeftArrow from "../../../public/icons/FilledLeftArrow";
import EyeSlash from "../../../public/imgs/eye-slash.svg";
import Button from "../../components/Button";
import Link from "next/link";


import Input from "../../components/Input";
import PasswordStrengthBar from "../../components/PasswordStrengthBar";

const ResetPassword = () => {
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setMsg("");

    if (!password || !confirm) {
      setError("Please fill in all fields.");
      return;
    }
    if (password !== confirm) {
      setError("Passwords do not match.");
      return;
    }
    if (!token) {
      setError("Invalid or missing reset token.");
      return;
    }

    setLoading(true);
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
        setTimeout(() => {
          router.push("/login");
        }, 2000); // Redirige vers login après 2 secondes
      } else {
        setError(data.msg || data.message || "Something went wrong.");
      }
    } catch {
      setError("Something went wrong.");
    }
    setLoading(false);
  };

  return (
    <div className="container">
      <div className="w-screen h-auto md:h-screen bg-[#111113] ">
        <Image src={bg} className="relative" alt=''/>
        <div className="w-full h-auto absolute top-0 left-0 grid grid-cols-1 md:grid-cols-2 justify-start md:justify-center items-start md:items-center">
          <div className="w-full md:h-screen flex flex-col items-center justify-center">
            <Image src={logo} className="mb-7 pt-12 w-64" alt=''/>
            <Image src={CryptoBalance} className="w-[65%] hidden md:block" alt=''/>
            <Image src={Headline} className="px-7" alt=''/>
          </div>
          <div className="w-full max-h-max md:h-full px-4 pt-12 md:pt-4 pb-4">
            <div className="w-full h-full bg-[#161618] border border-[#2C2C30] rounded-[20px] flex justify-center items-center ">
              <form
  className="relative bg-[#161618] w-[400px] flex flex-col items-start gap-6"
  onSubmit={handleSubmit}
>
  <div className="w-full p-8 flex items-center justify-between">
    <h3 className="text-[1.8rem] text-white font-semibold">Reset Password</h3>
  </div>
  <div className="w-full flex flex-col gap-6 px-8 py-4">
    <div className="w-full flex flex-col gap-2">
      <label className="text-[1.1rem] text-[#ACB5BB] font-medium">New Password</label>
      <div className="relative w-full">
        <span className="absolute left-4 top-1/2 -translate-y-1/2">
          <Image src={Key} alt="key" width={20} height={20} />
        </span>
        <input
          type={showPassword ? "text" : "password"}
          placeholder="********"
          className="w-full py-4 pl-12 pr-12 bg-[#232326] border-2 border-[#44444A] rounded-xl text-[1.1rem] text-white placeholder-[#6C7278] shadow focus:border-[#9945FF] focus:ring-2 focus:ring-[#9945FF] focus:outline-none transition-all"
          value={password}
          onChange={e => setPassword(e.target.value)}
          required
        />
        <button
          type="button"
          tabIndex={-1}
          className="absolute right-4 top-1/2 -translate-y-1/2 text-[#6C7278] hover:text-[#9945FF] transition-colors"
          onClick={() => setShowPassword(v => !v)}
          aria-label={showPassword ? "Hide password" : "Show password"}
        >
          <Image src={showPassword ? EyeSlash : Eye} alt="toggle password" width={20} height={20} />
        </button>
      </div>
      <PasswordStrengthBar password={password} />
    </div>
    <div className="w-full flex flex-col gap-2">
      <label className="text-[1.1rem] text-[#ACB5BB] font-medium">Confirm Password</label>
      <div className="relative w-full">
        <span className="absolute left-4 top-1/2 -translate-y-1/2">
          <Image src={Key} alt="key" width={20} height={20} />
        </span>
        <input
          type={showConfirm ? "text" : "password"}
          placeholder="********"
          className="w-full py-4 pl-12 pr-12 bg-[#232326] border-2 border-[#44444A] rounded-xl text-[1.1rem] text-white placeholder-[#6C7278] shadow focus:border-[#9945FF] focus:ring-2 focus:ring-[#9945FF] focus:outline-none transition-all"
          value={confirm}
          onChange={e => setConfirm(e.target.value)}
          required
        />
        <button
          type="button"
          tabIndex={-1}
          className="absolute right-4 top-1/2 -translate-y-1/2 text-[#6C7278] hover:text-[#9945FF] transition-colors"
          onClick={() => setShowConfirm(v => !v)}
          aria-label={showConfirm ? "Hide password" : "Show password"}
        >
          <Image src={showConfirm ? EyeSlash : Eye} alt="toggle password" width={20} height={20} />
        </button>
      </div>
    </div>
  </div>
  <div className="w-full p-8 flex flex-col gap-4">
    <Button
      text={loading ? "Resetting..." : "Reset Password"}
      type="submit"
      disabled={loading}
      className="w-full py-3 rounded-xl font-bold text-lg shadow-green-500/20 hover:scale-105 transition-transform"
    />
    <p className="font-medium text-[1.1rem] text-[#ACB5BB] text-center">
      Remember your password?{" "}
      <Link
        href="/login"
        className="font-semibold bg-gradient-to-r from-[#9945FF] to-[#0BCB7B] bg-clip-text text-transparent cursor-pointer"
      >
        Login Here
      </Link>
    </p>
  </div>
</form>
            </div>
          </div>
        </div>
      </div>
      {/* Error Modal */}
      {error && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
          <div className="bg-[#161618] border border-[#44444A] rounded-2xl shadow-2xl p-8 flex flex-col items-center gap-4 w-[350px]">
            <h2 className="text-red-500 text-2xl font-semibold mb-2">Error</h2>
            <p className="text-[#ACB5BB] text-center">{error}</p>
            <button
              className="mt-4 px-6 py-2 rounded-xl bg-[#9945FF] text-white font-bold hover:bg-[#7c37cc] transition"
              onClick={() => setError("")}
            >
              OK
            </button>
          </div>
        </div>
      )}
      {/* Success Modal */}
      {msg && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
          <div className="bg-[#161618] border border-[#44444A] rounded-2xl shadow-2xl p-8 flex flex-col items-center gap-4 w-[350px]">
            <h2 className="text-green-500 text-2xl font-semibold mb-2">Success</h2>
            <p className="text-[#ACB5BB] text-center">{msg}</p>
            <button
              className="mt-4 px-6 py-2 rounded-xl bg-[#9945FF] text-white font-bold hover:bg-[#7c37cc] transition"
              onClick={() => setMsg("")}
            >
              OK
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ResetPassword;
