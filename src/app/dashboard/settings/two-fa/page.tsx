"use client";

import React, { useState, useEffect, FormEvent } from "react";
import Button from "@/components/Button";
import Link from "next/link";
import { toast } from "react-hot-toast";

// Les routes API sont maintenant dans /api/auth/settings/2fa
const API_BASE = "/api/auth/settings/2fa";

const TwoFASettingsPage: React.FC = () => {
  const [enabled, setEnabled] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [qrCode, setQrCode] = useState<string>("");
  const [totpSecret, setTotpSecret] = useState<string>("");
  const [totpCode, setTotpCode] = useState<string>("");
  const [validating, setValidating] = useState<boolean>(false);

  useEffect(() => {
    const fetchStatus = async () => {
      try {
        const res = await fetch(`${API_BASE}/status`);
        const data = await res.json();
        setEnabled(data.enabled);
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
      setShowModal(true);
    } catch {
      toast.error("Error generating 2FA setup.");
    }
  };

  const handleValidate2FA = async (e: FormEvent) => {
    e.preventDefault();
    setValidating(true);
    try {
      const res = await fetch(`${API_BASE}/activate`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code: totpCode }),
      });
      const data = await res.json();
      if (res.ok) {
        toast.success("2FA enabled!");
        setEnabled(true);
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
    try {
      const res = await fetch(`${API_BASE}/disable`, { method: "POST" });
      if (!res.ok) {
        toast.error("Error disabling 2FA.");
        return;
      }
      setEnabled(false);
      toast.success("2FA disabled.");
    } catch {
      toast.error("Error disabling 2FA.");
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <div className="text-white">Loading...</div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <div className="bg-[#161618] border border-[#44444A] rounded-2xl p-8 w-full max-w-md flex flex-col gap-6">
        <h2 className="text-white text-2xl font-bold mb-4">Two-Factor Authentication (2FA)</h2>
        {!enabled ? (
          <Button onClick={handleEnable2FA}>Enable 2FA</Button>
        ) : (
          <Button onClick={handleDisable2FA}>Disable 2FA</Button>
        )}
        <Link href="/dashboard/settings" className="text-[#19F12F] mt-4 underline">Back to Settings</Link>
      </div>

      {showModal && qrCode && totpSecret && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60">
          <div className="bg-[#161618] border border-[#44444A] rounded-2xl p-8 w-full max-w-md flex flex-col gap-6 relative">
            <button
              type="button"
              onClick={() => setShowModal(false)}
              className="absolute top-4 right-4 text-[#ACB5BB] hover:text-white text-2xl"
              aria-label="Close"
            >
              &times;
            </button>
            <h3 className="text-white text-xl font-semibold mb-2">Scan this QR code</h3>
            <img src={qrCode} alt="2FA QR Code" className="mx-auto mb-4" />
            <div className="text-white text-center">
              Or enter this code manually:
              <div className="font-mono text-lg mt-2">{totpSecret}</div>
            </div>
            <form onSubmit={handleValidate2FA} className="flex flex-col gap-4">
              <label className="text-white" htmlFor="totpCode">
                Enter the code from your authenticator app:
              </label>
              <input
                type="text"
                id="totpCode"
                value={totpCode}
                onChange={(e) => setTotpCode(e.target.value)}
                className="p-2 rounded-md bg-[#222222] border border-[#44444A] text-white focus:outline-none focus:ring-2 focus:ring-[#19F12F]"
                required
                autoComplete="one-time-code"
                inputMode="numeric"
                pattern="\d{6}"
                maxLength={6}
              />
              <Button type="submit" disabled={validating}>
                {validating ? "Validating..." : "Validate Code"}
              </Button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default TwoFASettingsPage;