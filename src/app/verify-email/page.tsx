"use client";
import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import logo from "../../../public/imgs/logo.png";
import CryptoBalance from "../../../public/imgs/Crypto-Balancee.png";
import Headline from "../../../public/imgs/Headline.png";
import { LoadingBar } from "@/components/ui/LoadingBar";
import AuthLayout from "@/components/layouts/auth-layout";

const VerifyEmail = () => {
  const [status, setStatus] = useState<string>("Please wait...");
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const hasVerified = useRef(false);

  useEffect(() => {
    if (hasVerified.current) return;
    const queryParams = new URLSearchParams(window.location.search);
    const token = queryParams.get("token");

    if (!token) {
      setStatus("Verification token is missing!");
      setLoading(false);
      return;
    }

    const verifyEmail = async () => {
      try {
        const response = await fetch(`/api/auth/verify-email?token=${token}`);
        const data = await response.json();
        if (response.ok && data.message === "User verified successfully") {
          setStatus("Email verified successfully.\nRedirecting to login page...");
          setTimeout(() => {
            router.push("/login");
            setLoading(false); // Facultatif, car la page va changer
          }, 3000);
        } else {
          setStatus(`Verification failed: ${data.msg || data.message}`);
          setLoading(false);
        }
      } catch (error: any) {
        setStatus(`Something went wrong: ${error.message}`);
        setLoading(false);
      }
    };

    verifyEmail();
    hasVerified.current = true;
  }, [router]);

  return (
    <AuthLayout>
      <div className="w-full flex flex-col gap-8 text-xl items-center justify-center min-h-screen">
        {/* Header */}
        <div className="w-full p-8 flex items-center justify-center">
          <h3 className="text-5xl text-white font-bold text-center">
            Email Verification
          </h3>
        </div>
        {/* Status box centrée */}
        <div className="w-full flex justify-center">
          <div className="w-full max-w-md flex flex-col items-center gap-8 bg-[#161618] p-9">
            {loading ? (
              <>
                <div className="w-full flex flex-col items-center gap-4">
                  <LoadingBar
                    variant="success"
                    size="md"
                    text={
                      <span className="text-green-400 text-2xl font-semibold text-center">
                    {status.startsWith("Email verified")
                      ? "✅ Email verified! \n Redirecting to login page..."
                      : status.startsWith("Verification failed")
                      ? "❌ Verification failed"
                      : "⏳ Please wait..."}
                  </span>
                    }
                    className="shadow-md shadow-green-500/20 w-full"
                  />
                </div>
              </>
            ) : (
              <p className="text-[#ACB5BB] font-medium text-xl text-center">
                {status}
              </p>
            )}
          </div>
        </div>
      </div>
    </AuthLayout>
  );
};

export default VerifyEmail;