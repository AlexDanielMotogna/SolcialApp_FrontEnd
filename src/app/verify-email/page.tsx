"use client";
import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import logo from "../../../public/imgs/logo.png";
import CryptoBalance from "../../../public/imgs/Crypto-Balancee.png";
import Headline from "../../../public/imgs/Headline.png";
import { FaSpinner } from "react-icons/fa";

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
          setStatus("Email verified successfully. Redirecting to login page...");
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
    <div className="container">
      <div className="w-screen h-auto md:h-screen bg-[#111113] ">
        <div className="w-full h-auto absolute top-0 left-0 grid grid-cols-1 md:grid-cols-2 justify-start md:justify-center items-start md:items-center">
          <div className="w-full md:h-screen flex flex-col items-center justify-center">
            <Image src={logo} className="mb-7 pt-12 w-64" alt="" />
            <Image src={CryptoBalance} className="w-[65%] hidden md:block" alt="" />
            <Image src={Headline} className="px-7" alt="" />
          </div>
          <div className="w-full max-h-max md:h-full px-4 pt-12 md:pt-4 pb-4">
            <div className="w-full h-full bg-[#161618] border border-[#2C2C30] rounded-[20px] flex justify-center items-center ">
              <div className="w-[393px] h-full flex justify-center items-center flex-col gap-10 p-9">
                <h1 className="text-white font-semibold text-3xl md:text-[2.2rem] text-center">
                  Email Verification
                </h1>
                {loading ? (
                  <div className="flex flex-col items-center gap-4 py-6">
                    <FaSpinner className="animate-spin text-[#9945FF] text-4xl" />
                    <p className="text-[#ACB5BB] font-medium text-[1.1rem] text-center">
                      {status}
                    </p>
                  </div>
                ) : (
                  <p className="text-[#ACB5BB] font-medium text-[1.1rem] text-center">
                    {status}
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VerifyEmail;