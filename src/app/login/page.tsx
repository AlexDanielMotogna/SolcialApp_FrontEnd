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
import logo from "../../../public/imgs/logo.png";
import CryptoBalance from "../../../public/imgs/Crypto-Balancee.png";
import Headline from "../../../public/imgs/Headline.png";
import { signIn } from "next-auth/react";

const Login: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [totpCode, setTotpCode] = useState("");
  const [is2faRequired, setIs2faRequired] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [verificationSent, setVerificationSent] = useState(false);
  const [showSpinner, setShowSpinner] = useState(false);
  const [errorModal, setErrorModal] = useState<string | null>(null);
  const [noPasswordModal, setNoPasswordModal] = useState(false);
  const [noPasswordEmail, setNoPasswordEmail] = useState("");
  const [width, setWidth] = useState<number | null>(null);
  const router = useRouter();

  useEffect(() => {
    setWidth(window.innerWidth);
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const body: any = { email, password };
      if (is2faRequired) body.totp = totpCode;
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      const data = await res.json();
      if (res.ok && data.status === "success") {
        setShowSpinner(true); // Affiche le spinner
        toast.success("Login successful!");
        setTimeout(() => {
          router.push("/dashboard");
        }, 1500); // Laisse le spinner visible avant la redirection
        return;
      } else if (data.status === "2fa_required") {
        setIs2faRequired(true);
        setTotpCode("");
      } else if (data.status === "no_password") {
        setNoPasswordEmail(email);
        setNoPasswordModal(true);
      } else {
        setErrorModal(data.msg || data.message || "Login failed");
      }
    } catch {
      setErrorModal("Login failed");
    }
    setLoading(false);
  };

  const handleGoogleLogin = async () => {
    await signIn("google", { callbackUrl: "/dashboard" });
  };

  return (
    <div className="container">
      <div className="w-screen min-h-screen bg-[#111113] relative">
        {/* background SVG repeat */}
        <div
          className="absolute inset-0 w-full h-full -z-10"
          style={{
            backgroundImage: "url('/imgs/bg2.svg')",
            backgroundRepeat: "repeat",
            backgroundSize: "auto",
            backgroundPosition: "top left",
          }}
        />
        <div className="w-full h-screen absolute top-0 left-0 grid grid-cols-1 md:grid-cols-2 justify-between md:justify-center items-center">
          <div className="w-full md:h-screen flex flex-col items-center justify-center">
            <Image src={logo} className="mb-7 pt-12 w-64" alt="" />
            <Image src={CryptoBalance} className="w-[65%] hidden md:block" alt="" />
            <Image src={Headline} className="px-7" alt="" />
          </div>
          <div className="w-full h-full p-4">
            <div className="w-full h-full bg-[#161618] border border-[#2C2C30] rounded-[20px] flex justify-center items-center ">
              {showSpinner ? (
                <div className="w-full flex flex-col items-center justify-center py-20">
                  <svg
                    className="animate-spin h-12 w-12 text-[#9945FF]"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8v8z"
                    ></path>
                  </svg>
                  <p className="mt-6 text-[#ACB5BB] text-lg font-medium">
                    Loading your dashboard...
                  </p>
                </div>
              ) : (
                <form
                  onSubmit={handleLogin}
                  className="relative bg-[#161618] w-[400px] flex flex-col items-start gap-6"
                >
                  {/* Header */}
                  <div className="w-full p-8 flex items-center justify-between">
                    <h3 className="text-[1.8rem] text-white font-semibold">
                      Login
                    </h3>
                  </div>

                  {/* Form content */}
                  <div className="w-full flex flex-col gap-6 px-8 py-4">
                    {/* Email */}
                    <div className="w-full flex flex-col gap-2">
                      <label className="text-[1.1rem] text-[#ACB5BB] font-medium">
                        Email
                      </label>
                      <div className="relative w-full">
                        <span className="absolute left-4 top-1/2 -translate-y-1/2">
                          <Image src={User} alt="user" width={20} height={20} />
                        </span>
                        <input
                          type="email"
                          placeholder="yourname@gmail.com"
                          className="
                            w-full
                            py-4
                            pl-12
                            pr-4
                            bg-[#232326]
                            border-2 border-[#44444A]
                            rounded-xl
                            text-[1.1rem]
                            text-white
                            placeholder-[#6C7278]
                            shadow
                            focus:border-[#9945FF]
                            focus:ring-2 focus:ring-[#9945FF]
                            focus:outline-none
                            transition-all
                          "
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          required
                          autoComplete="username"
                        />
                      </div>
                    </div>
                    {/* Password */}
                    <div className="w-full flex flex-col gap-2">
                      <label className="text-[1.1rem] text-[#ACB5BB] font-medium">
                        Password
                      </label>
                      <div className="relative w-full">
                        <span className="absolute left-4 top-1/2 -translate-y-1/2">
                          <Image src={Key} alt="key" width={20} height={20} />
                        </span>
                        <input
                          type={showPassword ? "text" : "password"}
                          placeholder="********"
                          className="w-full py-4 pl-12 pr-12 bg-[#232326] border-2 border-[#44444A] rounded-xl text-[1.1rem] text-white placeholder-[#6C7278] shadow focus:border-[#9945FF] focus:ring-2 focus:ring-[#9945FF] focus:outline-none transition-all"
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
                          aria-label={
                            showPassword ? "Hide password" : "Show password"
                          }
                        >
                          <span
                            className="inline-block"
                            style={{
                              filter: "contrast(2) brightness(1.5)",
                            }}
                          >
                            <Image
                              src={showPassword ? EyeSlash : Eye}
                              alt="toggle password"
                              width={20}
                              height={20}
                            />
                          </span>
                        </button>
                      </div>
                    </div>
                    {/* 2FA */}
                    {is2faRequired && (
                      <div className="w-full flex flex-col gap-2">
                        <label className="text-[1.1rem] text-[#ACB5BB] font-medium">
                          TOTP Code
                        </label>
                        <input
                          type="text"
                          placeholder="123456"
                          className="w-full py-4 px-4 bg-[#232326] border-2 border-[#44444A] rounded-xl text-[1.1rem] text-white placeholder-[#6C7278] shadow focus:border-[#9945FF] focus:ring-2 focus:ring-[#9945FF] focus:outline-none transition-all"
                          value={totpCode}
                          onChange={(e) => setTotpCode(e.target.value)}
                          required
                        />
                      </div>
                    )}
                    {/* Forgot password */}
                    <div className="w-full flex justify-end">
                      <Link href="/forgot-password">
                        <span className="font-semibold text-[1.1rem] gradient bg-clip-text text-transparent cursor-pointer">
                          Forgot Password?
                        </span>
                      </Link>
                    </div>
                  </div>
                  {/* Footer */}
                  <div className="w-full border-t border-[#44444A] p-8 flex flex-col gap-4">
                    <ButtonBorder
                      text={loading ? "Logging in..." : "Login"}
                      type="submit"
                      disabled={loading}
                      className="w-full py-3 rounded-xl font-bold text-lg shadow-green-500/20 hover:scale-105 transition-transform"
                    />
                    <div className="w-full flex items-center gap-3">
                      <div className="h-[1px] bg-[#44444A] w-1/2" />
                      <span className="text-[#6C7278] font-normal text-[1.1rem]">
                        Or
                      </span>
                      <div className="h-[1px] bg-[#44444A] w-1/2" />
                    </div>
                    <div
                      className="w-full h-[46px] flex items-center justify-center gap-2 bg-[#2C2C30] border border-[#44444A] rounded-xl cursor-pointer hover:bg-[#232326] transition-all"
                      onClick={handleGoogleLogin}
                    >
                      <Image src={google} alt="google" width={22} height={22} />
                      <span className="text-white font-medium text-[1.1rem]">
                        Login with Google
                      </span>
                    </div>
                    <p className="font-medium text-[1.1rem] text-[#ACB5BB] text-center">
                      Don’t have an account?{" "}
                      <Link
                        href="/register"
                        className="font-semibold bg-gradient-to-r from-[#9945FF] to-[#0BCB7B] bg-clip-text text-transparent cursor-pointer"
                      >
                        Register Here
                      </Link>
                    </p>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
      {/* Error Modal */}
      {errorModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
          <div className="bg-[#161618] border border-[#44444A] rounded-2xl shadow-2xl p-8 flex flex-col items-center gap-4 w-[350px]">
            <h2 className="text-red-500 text-2xl font-semibold mb-2">Erreur</h2>
            <p className="text-[#ACB5BB] text-center">{errorModal}</p>
            <button
              className="mt-4 px-6 py-2 rounded-xl bg-[#9945FF] text-white font-bold hover:bg-[#7c37cc] transition"
              onClick={() => setErrorModal(null)}
            >
              Fermer
            </button>
          </div>
        </div>
      )}
      {/* No Password Modal */}
      {noPasswordModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
          <div className="bg-[#161618] border border-[#44444A] rounded-2xl shadow-2xl p-8 flex flex-col items-center gap-4 w-[350px]">
            <h2 className="text-yellow-400 text-2xl font-semibold mb-2">
              Password missing
            </h2>
            <p className="text-[#ACB5BB] text-center">
              This account does not have a password associated.<br />
              Click below to create one.
            </p>
            <button
              className="mt-4 px-6 py-2 rounded-xl bg-[#9945FF] text-white font-bold hover:bg-[#7c37cc] transition"
              onClick={async () => {
                setNoPasswordModal(false);
                const res = await fetch("/api/auth/request-password", {
                  method: "POST",
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify({ email: noPasswordEmail }),
                });
                if (res.ok) {
                  // Affiche un toast ou une modal de succès
                } else {
                  // Affiche une erreur
                }
              }}
            >
              Create a password
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Login;