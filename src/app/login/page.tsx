"use client";

import React, { useState } from "react";
import google from "../../../public/imgs/google.svg";
import User from "../../../public/imgs/user.svg";
import Key from "../../../public/imgs/key.svg";
import Eye from "../../../public/imgs/eye-slash.svg";
import bg from "../../../public/imgs/bg2.svg";
import logo from "../../../public/imgs/logo.png";
import CryptoBalance from "../../../public/imgs/Crypto-Balancee.png";
import Headline from "../../../public/imgs/Headline.png";
import Image from 'next/image';
import Link from "next/link";
import Button from "../../components/Button";
import Input from "../../components/Input";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";

const Login: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [totpCode, setTotpCode] = useState<string>("");
  const [is2faRequired, setIs2faRequired] = useState<boolean>(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      // Prépare le body selon le flow
      const body: any = { email, password };
      if (is2faRequired) {
        body.totp = totpCode;
      }

      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      const data = await res.json();

      if (res.ok && data.status === "success") {
        router.push("/dashboard");
      } else if (data.status === "2fa_required") {
        setIs2faRequired(true);
        setError("");
        setTotpCode(""); // Vide le champ à l'affichage
      } else {
        setError(data.msg || data.message || "Login failed");
      }
    } catch {
      setError("Login failed");
    }
    setLoading(false);
  };

  const handleGoogleLogin = async () => {
    await signIn("google", { callbackUrl: "/dashboard" });
  };

  return (
    <div className="container">
      <div className="w-screen h-screen bg-[#111113]">
        <Image src={bg} className="relative" alt="" />
        <div className="w-full h-screen absolute top-0 left-0 grid grid-cols-1 md:grid-cols-2 justify-between md:justify-center items-center">
          <div className="w-full md:h-screen flex flex-col items-center justify-center">
            <Image src={logo} className="mb-7 pt-12 w-64" alt="" />
            <Image src={CryptoBalance} className="w-[65%] hidden md:block" alt="" />
            <Image src={Headline} className="px-7" alt="" />
          </div>
          <div className="w-full h-full p-4">
            <div className="w-full h-full bg-[#161618] border border-[#2C2C30] rounded-[20px] flex justify-center items-center ">
              <form className="w-[343px] h-full flex justify-center items-center flex-col gap-10 p-9" onSubmit={handleLogin}>
                <div className="w-full flex flex-col justify-start items-start gap-5">
                  <h1 className="text-white font-semibold text-[3.2rem]">
                    Login
                  </h1>
                  <p className="text-[#ACB5BB] font-medium text-[1.6rem]">
                    Let’s login into your account first
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
                  <Input
                    label="Password"
                    placeholder="********"
                    imgSrc={Key}
                    showPassword={Eye}
                    value={password}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
                    type="password"
                  />

                  {is2faRequired && (
                    <Input
                      label="TOTP Code"
                      placeholder="123456"
                      imgSrc={Key}
                      showPassword={Eye}
                      value={totpCode}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => setTotpCode(e.target.value)}
                    />
                  )}

                  <div className="w-full flex justify-end items-end">
                    <Link href="/forgot-password">
                      <p className="font-semibold text-[1.4rem] gradient bg-clip-text text-transparent cursor-pointer">
                        Forgot Password ?
                      </p>
                    </Link>
                  </div>
                </div>
                <Button text={loading ? "Logging in..." : "Login"} type="submit" disabled={loading} />

                {error && (
                  <div className="text-red-500 text-sm">{error}</div>
                )}

                <div className="w-full flex items-center gap-3">
                  <div className="h-[1px] bg-[#44444A] w-1/2" />
                  <span className="text-[#6C7278] font-normal text-[1.4rem]">
                    Or
                  </span>
                  <div className="h-[1px] bg-[#44444A] w-1/2" />
                </div>

                <div
                  className="w-full h-[46px] flex items-center justify-center gap-[.5rem] bg-[#2C2C30] border border-[#44444A] rounded-lg cursor-pointer"
                  onClick={handleGoogleLogin}
                >
                  <Image src={google} alt="google" />
                  <span className="text-white font-medium text-[1.4rem]">
                    Login with Google
                  </span>
                </div>

                <p className="font-medium text-[1.4rem] text-[#ACB5BB]">
                  Don’t have an account?{" "}
                  <Link
                    href="/register"
                    className="font-semibold bg-gradient-to-r from-[#9945FF] to-[#0BCB7B] bg-clip-text text-transparent cursor-pointer"
                  >
                    Register Here
                  </Link>
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
