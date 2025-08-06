"use client";
import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import logo from "../../../public/imgs/logo.png";
import CryptoBalance from "../../../public/imgs/Crypto-Balancee.png";
import Headline from "../../../public/imgs/Headline.png";
import { LoadingBar } from "@/components/ui/LoadingBar";
import AuthLayout from "@/components/layouts/auth-layout";
import { useTranslation } from "react-i18next";

const VerifyEmail = () => {
  const { t } = useTranslation();
  const [status, setStatus] = useState<string>(t("please_wait", "Please wait..."));
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const hasVerified = useRef(false);

  useEffect(() => {
    if (hasVerified.current) return;
    const queryParams = new URLSearchParams(window.location.search);
    const token = queryParams.get("token");

    if (!token) {
      setStatus(t("verification_token_missing", "Verification token is missing!"));
      setLoading(false);
      return;
    }

    const verifyEmail = async () => {
      try {
        const response = await fetch(`/api/auth/verify-email?token=${token}`);
        const data = await response.json();
        if (response.ok && data.message === "User verified successfully") {
          setStatus(t("email_verified_success", "Email successfully verified. Redirecting to login page..."));
          setTimeout(() => {
            router.push("/login");
            setLoading(false);
          }, 3000);
        } else {
          setStatus(
            t("verification_failed", "Verification failed:") +
              " " +
              (t(data.msg, data.msg) || t(data.message, data.message) || "")
          );
          setLoading(false);
        }
      } catch (error: any) {
        setStatus(
          t("something_went_wrong", "Something went wrong:") +
            " " +
            (error.message || "")
        );
        setLoading(false);
      }
    };

    verifyEmail();
    hasVerified.current = true;
  }, [router, t]);

  return (
    <AuthLayout>
      <div className="w-full flex flex-col gap-8 text-xl items-center justify-center min-h-screen">
        {/* Header */}
        <div className="w-full p-8 flex items-center justify-center">
          <h3 className="text-5xl text-white font-bold text-center">
            {t("email_verification", "Email verification")}
          </h3>
        </div>
        {/* Status box centered */}
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
                        {status}
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