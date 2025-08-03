"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import bg from "../../../public/imgs/bg2.svg";
import logo from "../../../public/imgs/logo.png";
import Link from "next/link";
import LeftArrow from "../../../public/imgs/arrow-left.svg";
import Input from "@/components/Input";
import User from "../../../public/imgs/user.svg";
import Key from "../../../public/imgs/key.svg";
import Eye from "../../../public/imgs/eye.svg";
import EyeSlash from "../../../public/imgs/eye-slash.svg";
import CryptoBalance from "../../../public/imgs/Crypto-Balancee.png";
import Headline from "../../../public/imgs/Headline.png";
import Button from "../../components/Button";

const ForgotPassword: React.FC = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState("");
  const [error, setError] = useState("");
  const [showModal, setShowModal] = useState(false);
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
        setError(data.msg || "Login failed");
        setShowModal(true);
        return;
      }
      setMsg("Password reset email sent! Check your inbox.");
      setShowModal(true);
    } catch (e) {
      setError("Something went wrong");
      setShowModal(true);
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
              <form className="relative bg-[#161618] w-[400px] flex flex-col items-start gap-6 border border-[#44444A] rounded-2xl shadow-2xl"
      onSubmit={handleSubmit}
>
  <div className="w-full p-8 border-b border-[#44444A] flex items-center justify-between">
    <h3 className="text-[1.8rem] text-white font-semibold">Forgot Password</h3>
    <Image src={logo} alt="logo" width={32} height={32} />
  </div>
  <div className="w-full flex flex-col gap-6 px-8 py-4">
    <div className="w-full flex flex-col gap-2">
      <label className="text-[1.1rem] text-[#ACB5BB] font-medium">Email</label>
      <div className="relative w-full">
        <span className="absolute left-4 top-1/2 -translate-y-1/2">
          <Image src={User} alt="user" width={20} height={20} />
        </span>
        <input
          type="email"
          placeholder="yourname@gmail.com"
          className="w-full py-4 pl-12 pr-4 bg-[#232326] border-2 border-[#44444A] rounded-xl text-[1.1rem] text-white placeholder-[#6C7278] shadow focus:border-[#9945FF] focus:ring-2 focus:ring-[#9945FF] focus:outline-none transition-all"
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
          autoComplete="username"
        />
      </div>
    </div>
  </div>
  <div className="w-full border-t border-[#44444A] p-8 flex flex-col gap-4">
    <Button
      text={loading ? "Sending..." : "Continue"}
      type="submit"
      disabled={loading || !email}
      className="w-full py-3 rounded-xl font-bold text-lg shadow-green-500/20 hover:scale-105 transition-transform"
    />
    {msg && (
      <div className="text-green-500 text-sm">{msg}</div>
    )}
    {error && (
      <div className="text-red-500 text-sm">{error}</div>
    )}
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
      {showModal && (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
    <div className="bg-[#161618] border border-[#44444A] rounded-2xl shadow-2xl p-8 flex flex-col items-center gap-4 w-[350px]">
      <h2 className="text-white text-2xl font-semibold mb-2">Email Sent!</h2>
      <p className="text-[#ACB5BB] text-center">
        Please check your inbox and follow the instructions in the email.
      </p>
      <button
        className="mt-4 px-6 py-2 rounded-xl bg-[#9945FF] text-white font-bold hover:bg-[#7c37cc] transition"
        onClick={() => setShowModal(false)}
      >
        OK
      </button>
    </div>
  </div>
)}
    </div>
  );
};

export default ForgotPassword;