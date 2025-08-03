"use client";

import React, { useState, useEffect, FormEvent } from "react";
import Link from "next/link";
import { toast } from "react-hot-toast";
import Image from "next/image";

// Les routes API sont maintenant dans /api/auth/settings/2fa
const API_BASE = "/api/auth/settings/2fa";

const ArrowLeftIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
  </svg>
);

const ShieldIcon = ({ className }: { className?: string }) => (
  <svg className={className || "w-6 h-6"} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
  </svg>
);

const CheckIcon = ({ className }: { className?: string }) => (
  <svg className={className || "w-5 h-5"} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
  </svg>
);

const CopyIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
  </svg>
);

const TwoFASettingsPage: React.FC = () => {
  const [enabled, setEnabled] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [qrCode, setQrCode] = useState<string>("");
  const [totpSecret, setTotpSecret] = useState<string>("");
  const [totpCode, setTotpCode] = useState<string>("");
  const [validating, setValidating] = useState<boolean>(false);
  const [step, setStep] = useState<'setup' | 'verify' | 'manage'>('setup');

  useEffect(() => {
    const fetchStatus = async () => {
      try {
        const res = await fetch(`${API_BASE}/status`);
        const data = await res.json();
        setEnabled(data.enabled);
        if (data.enabled) {
          setStep('manage');
        }
      } catch {
        toast.error("Unable to fetch 2FA status.");
      }
      setLoading(false);
    };
    fetchStatus();
  }, []);

  const handleEnable2FA = async () => {
    try {
      const res = await fetch(`${API_BASE}/setup`, { method: "POST" });
      if (!res.ok) {
        toast.error("Error generating 2FA setup.");
        return;
      }
      const data = await res.json();
      setQrCode(data.qrCode);
      setTotpSecret(data.secret);
      setStep('verify');
      setShowModal(true);
    } catch {
      toast.error("Error generating 2FA setup.");
    }
  };

  const handleValidate2FA = async (e: FormEvent) => {
    e.preventDefault();
    if (totpCode.length !== 6) {
      toast.error("Please enter a 6-digit code");
      return;
    }

    setValidating(true);
    try {
      const res = await fetch(`${API_BASE}/activate`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code: totpCode }),
      });
      const data = await res.json();
      if (res.ok) {
        toast.success("2FA enabled successfully!");
        setEnabled(true);
        setStep('manage');
        setShowModal(false);
        setTotpCode("");
      } else {
        toast.error(data.error || data.message || "Invalid code.");
      }
    } catch {
      toast.error("Error validating code.");
    }
    setValidating(false);
  };

  const handleDisable2FA = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${API_BASE}/disable`, { method: "POST" });
      if (!res.ok) {
        toast.error("Error disabling 2FA.");
        return;
      }
      setEnabled(false);
      setStep('setup');
      toast.success("2FA disabled successfully.");
    } catch {
      toast.error("Error disabling 2FA.");
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast.success("Copied to clipboard!");
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#111113] flex items-center justify-center">
        <div className="text-white text-lg">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#111113] relative">
      {/* Background pattern */}
      <div
        className="absolute inset-0 w-full h-full -z-10"
        style={{
          backgroundImage: "url('/imgs/bg2.svg')",
          backgroundRepeat: "repeat",
          backgroundSize: "auto",
          backgroundPosition: "top left",
        }}
      />

      <div className="flex-1 flex flex-col items-center w-full px-6 py-8">
        <div className="w-full max-w-2xl">
          {/* Header */}
          <div className="mb-8">
            <Link
              href="/dashboard/settings"
              className="inline-flex items-center gap-2 text-[#ACB5BB] hover:text-white transition-colors mb-4"
            >
              <ArrowLeftIcon />
              Back to Settings
            </Link>
            <div className="flex items-center gap-3 mb-2">
              <ShieldIcon />
              <h1 className="text-4xl font-bold bg-gradient-to-r from-[#9945FF] to-[#0BCB7B] bg-clip-text text-transparent">
                Two-Factor Authentication
              </h1>
            </div>
            <p className="text-[#ACB5BB] text-lg">
              Add an extra layer of security to your account with 2FA
            </p>
          </div>

          {/* Content based on step */}
          {step === 'setup' && !enabled && (
            <div className="bg-[#161618] border border-[#2C2C30] rounded-2xl p-8">
              <div className="text-center mb-8">
                <ShieldIcon className="w-16 h-16 mx-auto mb-4 text-[#9945FF]" />
                <h2 className="text-2xl font-bold text-white mb-4">Enable Two-Factor Authentication</h2>
                <p className="text-[#ACB5BB]">
                  Protect your account with an additional security layer. You'll need an authenticator app like Google Authenticator or Authy.
                </p>
              </div>

              <div className="space-y-4 mb-8">
                <div className="flex items-start gap-3 p-4 bg-[#232326] rounded-xl">
                  <div className="w-6 h-6 bg-[#9945FF] text-white rounded-full flex items-center justify-center text-sm font-bold mt-1">1</div>
                  <div>
                    <h3 className="text-white font-medium">Download an authenticator app</h3>
                    <p className="text-[#ACB5BB] text-sm">Google Authenticator, Authy, or Microsoft Authenticator</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-4 bg-[#232326] rounded-xl">
                  <div className="w-6 h-6 bg-[#9945FF] text-white rounded-full flex items-center justify-center text-sm font-bold mt-1">2</div>
                  <div>
                    <h3 className="text-white font-medium">Scan QR code</h3>
                    <p className="text-[#ACB5BB] text-sm">Use your authenticator app to scan the QR code</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-4 bg-[#232326] rounded-xl">
                  <div className="w-6 h-6 bg-[#9945FF] text-white rounded-full flex items-center justify-center text-sm font-bold mt-1">3</div>
                  <div>
                    <h3 className="text-white font-medium">Enter verification code</h3>
                    <p className="text-[#ACB5BB] text-sm">Complete setup by entering the 6-digit code</p>
                  </div>
                </div>
              </div>

              <button
                onClick={handleEnable2FA}
                disabled={loading}
                className="w-full py-4 px-6 bg-gradient-to-r from-[#9945FF] to-[#0BCB7B] text-white rounded-xl font-medium hover:shadow-lg hover:shadow-purple-500/20 transition-all disabled:opacity-50"
              >
                {loading ? "Generating..." : "Start Setup"}
              </button>
            </div>
          )}

          {step === 'manage' && enabled && (
            <div className="bg-[#161618] border border-[#2C2C30] rounded-2xl p-8">
              <div className="text-center mb-8">
                <div className="w-16 h-16 mx-auto mb-4 bg-[#19F12F]/20 rounded-full flex items-center justify-center">
                  <CheckIcon className="w-8 h-8 text-[#19F12F]" />
                </div>
                <h2 className="text-2xl font-bold text-white mb-4">2FA is Active</h2>
                <p className="text-[#ACB5BB]">
                  Your account is protected with two-factor authentication.
                </p>
              </div>

              <div className="space-y-4 mb-8">
                <div className="bg-[#232326] rounded-xl p-6">
                  <h3 className="text-white font-medium mb-2">Status</h3>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-[#19F12F] rounded-full"></div>
                    <span className="text-[#19F12F]">Two-Factor Authentication Enabled</span>
                  </div>
                </div>

                <div className="bg-[#232326] rounded-xl p-6">
                  <h3 className="text-white font-medium mb-2">Recovery Options</h3>
                  <p className="text-[#ACB5BB] text-sm mb-4">
                    Make sure you have access to your authenticator app and backup codes.
                  </p>
                  <button
                    onClick={() => toast.success("Feature coming soon")}
                    className="py-2 px-4 bg-[#44444A] text-white rounded-lg hover:bg-[#555] transition-all text-sm"
                  >
                    View Backup Codes
                  </button>
                </div>
              </div>

              <div className="flex gap-4">
                <Link
                  href="/dashboard/settings"
                  className="flex-1 py-4 px-6 bg-[#232326] text-white rounded-xl font-medium hover:bg-[#2C2C30] transition-all text-center"
                >
                  Back to Settings
                </Link>
                <button
                  onClick={handleDisable2FA}
                  disabled={loading}
                  className="flex-1 py-4 px-6 bg-red-500 text-white rounded-xl font-medium hover:bg-red-600 transition-all disabled:opacity-50"
                >
                  {loading ? "Disabling..." : "Disable 2FA"}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* QR Code Modal */}
      {showModal && step === 'verify' && qrCode && totpSecret && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60 p-4">
          <div className="bg-[#161618] border border-[#2C2C30] rounded-2xl p-8 w-full max-w-md relative">
            <button
              type="button"
              onClick={() => {
                setShowModal(false);
                setStep('setup');
              }}
              className="absolute top-4 right-4 text-[#ACB5BB] hover:text-white text-2xl transition-colors"
              aria-label="Close"
            >
              ×
            </button>
            
            <div className="text-center mb-6">
              <h3 className="text-2xl font-bold text-white mb-2">Scan QR Code</h3>
              <p className="text-[#ACB5BB]">
                Use your authenticator app to scan this QR code, then enter the 6-digit code to verify.
              </p>
            </div>

            {/* QR Code */}
            <div className="flex justify-center mb-6">
              <div className="bg-white p-4 rounded-2xl">
                <img src={qrCode} alt="2FA QR Code" className="w-48 h-48" />
              </div>
            </div>

            {/* Manual Entry */}
            <div className="bg-[#232326] rounded-xl p-4 mb-6">
              <h4 className="text-white font-medium mb-2">Can't scan? Enter this code manually:</h4>
              <div className="flex items-center gap-2">
                <code className="bg-[#161618] text-[#19F12F] px-3 py-2 rounded text-sm font-mono flex-1">
                  {totpSecret}
                </code>
                <button
                  onClick={() => copyToClipboard(totpSecret)}
                  className="p-2 text-[#ACB5BB] hover:text-[#9945FF] transition-colors"
                >
                  <CopyIcon />
                </button>
              </div>
            </div>

            {/* Verification Form */}
            <form onSubmit={handleValidate2FA} className="space-y-4">
              <div>
                <label className="text-white font-medium text-lg block mb-2">Enter verification code</label>
                <input
                  type="text"
                  placeholder="000000"
                  maxLength={6}
                  className="w-full py-4 px-6 bg-[#232326] border-2 border-[#44444A] rounded-xl text-white text-center text-xl font-mono placeholder-[#6C7278] focus:border-[#9945FF] focus:ring-2 focus:ring-[#9945FF] focus:outline-none transition-all"
                  value={totpCode}
                  onChange={(e) => setTotpCode(e.target.value.replace(/\D/g, '').slice(0, 6))}
                  required
                  autoComplete="one-time-code"
                  inputMode="numeric"
                />
              </div>

              <div className="flex gap-4">
                <button
                  type="button"
                  onClick={() => {
                    setShowModal(false);
                    setStep('setup');
                  }}
                  className="flex-1 py-4 px-6 bg-[#232326] text-white rounded-xl font-medium hover:bg-[#2C2C30] transition-all"
                >
                  Back
                </button>
                <button
                  type="submit"
                  disabled={validating || totpCode.length !== 6}
                  className="flex-1 py-4 px-6 bg-gradient-to-r from-[#9945FF] to-[#0BCB7B] text-white rounded-xl font-medium hover:shadow-lg hover:shadow-purple-500/20 transition-all disabled:opacity-50"
                >
                  {validating ? "Verifying..." : "Verify & Enable"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default TwoFASettingsPage;