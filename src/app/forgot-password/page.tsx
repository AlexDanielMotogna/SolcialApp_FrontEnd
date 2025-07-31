"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

import User from "../../../public/imgs/user.svg";
import LeftArrow from "../../../public/imgs/arrow-left.svg";
import bg from "../../../public/imgs/bg2.svg";
import logo from "../../../public/imgs/logo.png";
import CryptoBalance from "../../../public/imgs/Crypto-Balancee.png";
import Headline from "../../../public/imgs/Headline.png";
import FilledLeftArrow from "../../../public/icons/FilledLeftArrow";

import Button from "../../components/Button";
import Input from "../../components/Input";

const ForgotPassword: React.FC = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState("");
  const [error, setError] = useState("");
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

      if (res.ok) {
        setMsg("Password reset email sent! Check your inbox.");
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
      <div className="w-screen h-screen bg-[#111113] ">
        <Image src={bg} className="relative" alt=''/>
        <div className="w-full h-screen absolute top-0 left-0 grid grid-cols-1 md:grid-cols-2 justify-start md:justify-center items-start md:items-center">
          <div className="w-full px-6 h-full pt-20 md:hidden">
            <FilledLeftArrow />
          </div>

          <div className="w-full md:h-screen flex flex-col items-center justify-center">
            <Image src={logo} className="mb-7 pt-12 w-64" alt=''/>
            <Image src={CryptoBalance} className="w-[65%] hidden md:block" alt=''/>
            <Image src={Headline} className="px-7" alt=''/>
          </div>
          <div className="w-full h-full flex justify-start items-end p-4">
            <div className="w-full max-h-max md:h-full bg-[#161618] border border-[#2C2C30] rounded-[20px] flex justify-center items-center ">
              <form className="w-[343px] h-full flex justify-center items-center flex-col gap-10 p-9" onSubmit={handleSubmit}>
                <div className="w-full flex flex-col justify-start items-start gap-5">
                  <Image
                    src={LeftArrow}
                    className="hidden md:block cursor-pointer"
                    alt=''
                    onClick={() => router.push("/login")}
                  />
                  <h1 className="text-white font-semibold text-[3.2rem]">
                    Forgot Password
                  </h1>
                  <p className="text-[#ACB5BB] font-medium text-[1.6rem]">
                    Input your email address account to receive a reset link
                  </p>
                </div>

                <div className="w-full flex flex-col items-start justify-start gap-[1rem]">
                  <Input
                    label="Email"
                    placeholder="yourname@gmail.com"
                    imgSrc={User}
                    value={email}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
                  />
                </div>
                <Button text={loading ? "Sending..." : "Continue"} type="submit" disabled={loading || !email} />

                {msg && (
                  <div className="text-green-500 text-sm">{msg}</div>
                )}
                {error && (
                  <div className="text-red-500 text-sm">{error}</div>
                )}
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;