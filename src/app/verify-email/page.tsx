"use client";
import React, { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";

const VerifyEmail: React.FC = () => {
  const [status, setStatus] = useState<string>("Please wait...");
  const router = useRouter();
  const hasVerified = useRef<boolean>(false);

  useEffect(() => {
    if (hasVerified.current) return;

    const verifyEmail = async () => {
      const queryParams = new URLSearchParams(window.location.search);
      const token = queryParams.get("token");

      if (!token) {
        setStatus("Verification token is missing!");
        return;
      }

      try {
        const response = await fetch(`/api/auth/verify-email?token=${token}`);
        const data = await response.json();
        if (response.ok && data.message === "User verified successfully") {
          setStatus("Email verified successfully. Redirecting to login page...");
          setTimeout(() => {
            router.push("/login");
          }, 3000);
        } else {
          setStatus(`Verification failed: ${data.msg || data.message}`);
        }
      } catch (error: any) {
        setStatus(`Something went wrong: ${error.message}`);
      }
    };

    verifyEmail();
    hasVerified.current = true;
  }, [router]);

  return (
    <div className="verify-email">
      <h1>Email Verification</h1>
      <p>{status}</p>
      <style jsx>{`
        .verify-email {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          min-height: 100vh;
          text-align: center;
        }
        h1 {
          font-size: 2rem;
          margin-bottom: 1rem;
        }
        p {
          font-size: 1.2rem;
        }
      `}</style>
    </div>
  );
};

export default VerifyEmail;