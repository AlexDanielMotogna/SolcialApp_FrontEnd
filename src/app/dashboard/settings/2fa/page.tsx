"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import Image from "next/image";
import Link from "next/link";
// @ts-ignore
import QRCode from "qrcode";
import { useAuthUser } from "../../../../hooks/useAuthUser";

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

const TwoFactorAuthPage: React.FC = () => {
  const router = useRouter();
  const { user, isLoading: userLoading } = useAuthUser();
  const [qrCode, setQrCode] = useState("");
  const [secret, setSecret] = useState("");
  const [verificationCode, setVerificationCode] = useState("");
  const [backupCodes, setBackupCodes] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState<'setup' | 'verify' | 'backup' | 'manage'>('setup');
  const [is2FAEnabled, setIs2FAEnabled] = useState(false);

  useEffect(() => {
    if (user && !userLoading) {
      setIs2FAEnabled(user.twoFactorEnabled || false);
      if (user.twoFactorEnabled) {
        setStep('manage');
      }
    }
  }, [user, userLoading]);

  const generateQRCode = async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/auth/2fa/setup", {
        method: "POST",
      });

      const data = await response.json();

      if (response.ok) {
        setSecret(data.secret);
        const qrCodeDataURL = await QRCode.toDataURL(data.qrCodeUrl);
        setQrCode(qrCodeDataURL);
        setStep('verify');
      } else {
        toast.error(data.error || "Failed to generate 2FA setup");
      }
    } catch (error) {
      toast.error("An error occurred while setting up 2FA");
    } finally {
      setLoading(false);
    }
  };

  const verify2FA = async () => {
    if (verificationCode.length !== 6) {
      toast.error("Please enter a 6-digit code");
      return;
    }

    setLoading(true);
    try {
      const response = await fetch("/api/auth/2fa/verify", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          token: verificationCode,
          secret,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setBackupCodes(data.backupCodes);
        setIs2FAEnabled(true);
        setStep('backup');
        toast.success("2FA enabled successfully!");
      } else {
        toast.error(data.error || "Invalid verification code");
      }
    } catch (error) {
      toast.error("An error occurred while verifying 2FA");
    } finally {
      setLoading(false);
    }
  };

  const disable2FA = async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/auth/2fa/disable", {
        method: "POST",
      });

      const data = await response.json();

      if (response.ok) {
        setIs2FAEnabled(false);
        setStep('setup');
        toast.success("2FA disabled successfully!");
      } else {
        toast.error(data.error || "Failed to disable 2FA");
      }
    } catch (error) {
      toast.error("An error occurred while disabling 2FA");
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast.success("Copied to clipboard!");
  };

  const finishSetup = () => {
    router.push("/dashboard/settings");
  };

  if (userLoading) {
    return (
      <div className="min-h-screen bg-[#111113] flex items-center justify-center">
        <div className="text-white">Loading...</div>
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
          {step === 'setup' && (
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
                onClick={generateQRCode}
                disabled={loading}
                className="w-full py-4 px-6 bg-gradient-to-r from-[#9945FF] to-[#0BCB7B] text-white rounded-xl font-medium hover:shadow-lg hover:shadow-purple-500/20 transition-all disabled:opacity-50"
              >
                {loading ? "Generating..." : "Start Setup"}
              </button>
            </div>
          )}

          {step === 'verify' && (
            <div className="bg-[#161618] border border-[#2C2C30] rounded-2xl p-8">
              <div className="text-center mb-8">
                <h2 className="text-2xl font-bold text-white mb-4">Scan QR Code</h2>
                <p className="text-[#ACB5BB]">
                  Use your authenticator app to scan this QR code, then enter the 6-digit code to verify.
                </p>
              </div>

              {/* QR Code */}
              <div className="flex justify-center mb-8">
                <div className="bg-white p-4 rounded-2xl">
                  {qrCode && <img src={qrCode} alt="2FA QR Code" className="w-48 h-48" />}
                </div>
              </div>

              {/* Manual Entry */}
              <div className="bg-[#232326] rounded-xl p-4 mb-8">
                <h3 className="text-white font-medium mb-2">Can't scan? Enter this code manually:</h3>
                <div className="flex items-center gap-2">
                  <code className="bg-[#161618] text-[#19F12F] px-3 py-2 rounded text-sm font-mono flex-1">
                    {secret}
                  </code>
                  <button
                    onClick={() => copyToClipboard(secret)}
                    className="p-2 text-[#ACB5BB] hover:text-[#9945FF] transition-colors"
                  >
                    <CopyIcon />
                  </button>
                </div>
              </div>

              {/* Verification */}
              <div className="space-y-4">
                <div>
                  <label className="text-white font-medium text-lg block mb-2">Enter verification code</label>
                  <input
                    type="text"
                    placeholder="000000"
                    maxLength={6}
                    className="w-full py-4 px-6 bg-[#232326] border-2 border-[#44444A] rounded-xl text-white text-center text-xl font-mono placeholder-[#6C7278] focus:border-[#9945FF] focus:ring-2 focus:ring-[#9945FF] focus:outline-none transition-all"
                    value={verificationCode}
                    onChange={(e) => setVerificationCode(e.target.value.replace(/\D/g, '').slice(0, 6))}
                  />
                </div>

                <div className="flex gap-4">
                  <button
                    onClick={() => setStep('setup')}
                    className="flex-1 py-4 px-6 bg-[#232326] text-white rounded-xl font-medium hover:bg-[#2C2C30] transition-all"
                  >
                    Back
                  </button>
                  <button
                    onClick={verify2FA}
                    disabled={loading || verificationCode.length !== 6}
                    className="flex-1 py-4 px-6 bg-gradient-to-r from-[#9945FF] to-[#0BCB7B] text-white rounded-xl font-medium hover:shadow-lg hover:shadow-purple-500/20 transition-all disabled:opacity-50"
                  >
                    {loading ? "Verifying..." : "Verify & Enable"}
                  </button>
                </div>
              </div>
            </div>
          )}

          {step === 'backup' && (
            <div className="bg-[#161618] border border-[#2C2C30] rounded-2xl p-8">
              <div className="text-center mb-8">
                <CheckIcon className="w-16 h-16 mx-auto mb-4 text-[#19F12F]" />
                <h2 className="text-2xl font-bold text-white mb-4">2FA Enabled Successfully!</h2>
                <p className="text-[#ACB5BB]">
                  Save these backup codes in a safe place. You can use them to access your account if you lose your authenticator device.
                </p>
              </div>

              <div className="bg-[#232326] rounded-xl p-6 mb-8">
                <h3 className="text-white font-medium mb-4 flex items-center gap-2">
                  <ShieldIcon className="w-5 h-5" />
                  Backup Recovery Codes
                </h3>
                <div className="grid grid-cols-2 gap-2 mb-4">
                  {backupCodes.map((code, index) => (
                    <div key={index} className="bg-[#161618] p-3 rounded-lg">
                      <code className="text-[#19F12F] font-mono text-sm">{code}</code>
                    </div>
                  ))}
                </div>
                <button
                  onClick={() => copyToClipboard(backupCodes.join('\n'))}
                  className="w-full py-3 px-4 bg-[#44444A] text-white rounded-lg hover:bg-[#555] transition-all flex items-center justify-center gap-2"
                >
                  <CopyIcon />
                  Copy All Codes
                </button>
              </div>

              <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-4 mb-8">
                <h4 className="text-red-400 font-medium mb-2">⚠️ Important:</h4>
                <ul className="text-red-300 text-sm space-y-1">
                  <li>• Store these codes in a safe place</li>
                  <li>• Each code can only be used once</li>
                  <li>• Don't share these codes with anyone</li>
                  <li>• You'll need them if you lose access to your authenticator</li>
                </ul>
              </div>

              <button
                onClick={finishSetup}
                className="w-full py-4 px-6 bg-gradient-to-r from-[#9945FF] to-[#0BCB7B] text-white rounded-xl font-medium hover:shadow-lg hover:shadow-purple-500/20 transition-all"
              >
                Complete Setup
              </button>
            </div>
          )}

          {step === 'manage' && is2FAEnabled && (
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
                  onClick={disable2FA}
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
    </div>
  );
};

export default TwoFactorAuthPage;
