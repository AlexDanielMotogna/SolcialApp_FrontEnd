"use client";
import { useEffect, useRef, useCallback, useState } from "react";

interface CaptchaProps {
  onVerify: (token: string | null) => void;
  onExpire?: () => void;
  action?: string;
}

declare global {
  interface Window {
    grecaptcha: any;
  }
}

export default function CaptchaVerification({
  onVerify,
  onExpire,
  action = "join_quest",
}: CaptchaProps) {
  const [status, setStatus] = useState<
    "loading" | "ready" | "executing" | "completed" | "error"
  >("loading");
  const hasExecuted = useRef(false);

  const executeRecaptcha = useCallback(() => {
    // ✅ PREVENT MULTIPLE EXECUTIONS
    if (hasExecuted.current) {
      console.log("🔍 Captcha already executed, skipping...");
      return;
    }

    if (status === "executing" || status === "completed") {
      console.log("🔍 Captcha already in progress or completed, skipping...");
      return;
    }

    if (
      typeof window !== "undefined" &&
      window.grecaptcha &&
      window.grecaptcha.ready
    ) {
      console.log("🚀 Starting reCAPTCHA execution...");
      setStatus("executing");
      hasExecuted.current = true;

      window.grecaptcha.ready(() => {
        window.grecaptcha
          .execute(process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY, {
            action: action,
          })
          .then((token: string) => {
            console.log("✅ reCAPTCHA v3 token generated successfully");
            console.log("🔍 Token preview:", token.substring(0, 50) + "...");
            setStatus("completed");
            onVerify(token);
          })
          .catch((error: any) => {
            console.error("❌ reCAPTCHA execution error:", error);
            setStatus("error");
            hasExecuted.current = false; // ✅ RESET ON ERROR
            onVerify(null);
          });
      });
    } else {
      console.log("❌ reCAPTCHA not ready yet");
      setStatus("error");
      onVerify(null);
    }
  }, [onVerify, action, status]);

  // ✅ RESET STATE ON MOUNT
  useEffect(() => {
    hasExecuted.current = false;
    setStatus("loading");
  }, []);

  // ✅ MAIN EFFECT - REMOVED executeRecaptcha FROM DEPENDENCIES
  useEffect(() => {
    console.log("🔧 CaptchaVerification mounted");
    hasExecuted.current = false;
    setStatus("loading");

    if (!process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY) {
      console.error("❌ NEXT_PUBLIC_RECAPTCHA_SITE_KEY not configured");
      setStatus("error");
      onVerify(null);
      return;
    }

    console.log("🔍 Checking for existing reCAPTCHA script...");
    const existingScript = document.getElementById("recaptcha-v3-script");

    if (existingScript && window.grecaptcha) {
      console.log("✅ reCAPTCHA already loaded, executing immediately");
      setStatus("ready");
      setTimeout(() => {
        if (!hasExecuted.current) {
          executeRecaptcha();
        }
      }, 500);
      return;
    }

    console.log("🔄 Loading reCAPTCHA script...");
    const script = document.createElement("script");
    script.id = "recaptcha-v3-script";
    script.src = `https://www.google.com/recaptcha/api.js?render=${process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY}`;
    script.async = true;
    script.defer = true;

    script.onload = () => {
      console.log("✅ reCAPTCHA script loaded successfully");
      setStatus("ready");
      setTimeout(() => {
        if (!hasExecuted.current) {
          executeRecaptcha();
        }
      }, 1000);
    };

    script.onerror = () => {
      console.error("❌ Failed to load reCAPTCHA script");
      setStatus("error");
      onVerify(null);
    };

    document.head.appendChild(script);

    return () => {
      console.log("🔧 CaptchaVerification unmounting");
      hasExecuted.current = false;
    };
  }, [onVerify]); // ✅ SOLO onVerify COMO DEPENDENCIA

  if (!process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY) {
    return (
      <div className="text-red-400 text-center p-4 border border-red-500 rounded">
        ⚠️ reCAPTCHA v3 not configured
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center gap-4 p-4">
      <div className="flex items-center gap-2 text-[#ACB5BB]">
        {status === "loading" && (
          <>
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-500"></div>
            <span className="text-sm">Loading security verification...</span>
          </>
        )}
        {status === "ready" && (
          <>
            <div className="animate-pulse rounded-full h-4 w-4 bg-yellow-500"></div>
            <span className="text-sm">Preparing verification...</span>
          </>
        )}
        {status === "executing" && (
          <>
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-500"></div>
            <span className="text-sm">Verifying security...</span>
          </>
        )}
        {status === "completed" && (
          <>
            <div className="rounded-full h-4 w-4 bg-green-500"></div>
            <span className="text-sm text-green-400">
              Verification complete!
            </span>
          </>
        )}
        {status === "error" && (
          <>
            <div className="rounded-full h-4 w-4 bg-red-500"></div>
            <span className="text-sm text-red-400">Verification failed</span>
          </>
        )}
      </div>

      <div className="text-xs text-[#ACB5BB] text-center">
        🔒 Protected by reCAPTCHA v3
      </div>

      {status === "error" && (
        <button
          onClick={() => {
            console.log("🔄 Manual retry initiated");
            hasExecuted.current = false;
            setStatus("loading");
            setTimeout(() => {
              if (!hasExecuted.current) {
                executeRecaptcha();
              }
            }, 500);
          }}
          className="mt-2 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg text-sm"
        >
          Retry Verification
        </button>
      )}
    </div>
  );
}