"use client";

import React, { useState } from "react";
import Link from "next/link";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Eye from "../../../../../public/imgs/eye.svg";
import EyeSlash from "../../../../../public/imgs/eye-slash.svg";
import Key from "../../../../../public/imgs/key.svg";

const ArrowLeftIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
  </svg>
);

const CheckIcon = ({ className }: { className?: string }) => (
  <svg className={`w-5 h-5 ${className}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
  </svg>
);

const XIcon = ({ className }: { className?: string }) => (
  <svg className={`w-5 h-5 ${className}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
  </svg>
);

const ChangePasswordPage: React.FC = () => {
  const router = useRouter();
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  // Password validation
  const passwordRequirements = [
    { text: "At least 8 characters", check: newPassword.length >= 8 },
    { text: "Contains uppercase letter", check: /[A-Z]/.test(newPassword) },
    { text: "Contains lowercase letter", check: /[a-z]/.test(newPassword) },
    { text: "Contains number", check: /\d/.test(newPassword) },
    { text: "Contains special character", check: /[!@#$%^&*(),.?\":{}|<>]/.test(newPassword) },
  ];

  const isPasswordValid = passwordRequirements.every(req => req.check);
  const doPasswordsMatch = newPassword === confirmPassword && confirmPassword !== "";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!isPasswordValid) {
      toast.error("Please meet all password requirements");
      return;
    }

    if (!doPasswordsMatch) {
      toast.error("New passwords do not match");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch("/api/auth/settings/change-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          currentPassword,
          newPassword,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        toast.success("Password changed successfully!");
        router.push("/dashboard/settings");
      } else {
        toast.error(data.error || "Failed to change password");
      }
    } catch (error) {
      toast.error("An error occurred while changing password");
    } finally {
      setLoading(false);
    }
  };

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
              <div className="w-10 h-10 bg-gradient-to-r from-[#9945FF] to-[#0BCB7B] rounded-full flex items-center justify-center">
                <Image src={Key} alt="key" width={20} height={20} />
              </div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-[#9945FF] to-[#0BCB7B] bg-clip-text text-transparent">
                Change Password
              </h1>
            </div>
            <p className="text-[#ACB5BB] text-lg">
              Update your account password to keep your account secure
            </p>
          </div>

          {/* Form Card */}
          <div className="bg-[#161618] border border-[#2C2C30] rounded-2xl p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              
              {/* Current Password */}
              <div className="space-y-2">
                <label className="text-white font-medium text-lg">Current Password</label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2">
                    <Image src={Key} alt="key" width={20} height={20} />
                  </span>
                  <input
                    type={showCurrentPassword ? "text" : "password"}
                    placeholder="Enter your current password"
                    className="w-full py-4 pl-12 pr-12 bg-[#232326] border-2 border-[#44444A] rounded-xl text-white placeholder-[#6C7278] focus:border-[#9945FF] focus:ring-2 focus:ring-[#9945FF] focus:outline-none transition-all"
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                    required
                  />
                  <button
                    type="button"
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-[#6C7278] hover:text-[#9945FF] transition-colors"
                    onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                  >
                    <Image
                      src={showCurrentPassword ? EyeSlash : Eye}
                      alt="toggle password"
                      width={20}
                      height={20}
                    />
                  </button>
                </div>
              </div>

              {/* New Password */}
              <div className="space-y-2">
                <label className="text-white font-medium text-lg">New Password</label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2">
                    <Image src={Key} alt="key" width={20} height={20} />
                  </span>
                  <input
                    type={showNewPassword ? "text" : "password"}
                    placeholder="Enter your new password"
                    className="w-full py-4 pl-12 pr-12 bg-[#232326] border-2 border-[#44444A] rounded-xl text-white placeholder-[#6C7278] focus:border-[#9945FF] focus:ring-2 focus:ring-[#9945FF] focus:outline-none transition-all"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    required
                  />
                  <button
                    type="button"
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-[#6C7278] hover:text-[#9945FF] transition-colors"
                    onClick={() => setShowNewPassword(!showNewPassword)}
                  >
                    <Image
                      src={showNewPassword ? EyeSlash : Eye}
                      alt="toggle password"
                      width={20}
                      height={20}
                    />
                  </button>
                </div>
              </div>

              {/* Password Requirements */}
              {newPassword && (
                <div className="bg-[#232326] rounded-xl p-4 space-y-2">
                  <h4 className="text-white font-medium mb-3">Password Requirements:</h4>
                  {passwordRequirements.map((req, index) => (
                    <div key={index} className="flex items-center gap-2">
                      {req.check ? (
                        <CheckIcon className="text-[#19F12F]" />
                      ) : (
                        <XIcon className="text-red-400" />
                      )}
                      <span className={req.check ? "text-[#19F12F]" : "text-[#ACB5BB]"}>
                        {req.text}
                      </span>
                    </div>
                  ))}
                </div>
              )}

              {/* Confirm Password */}
              <div className="space-y-2">
                <label className="text-white font-medium text-lg">Confirm New Password</label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2">
                    <Image src={Key} alt="key" width={20} height={20} />
                  </span>
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="Confirm your new password"
                    className={`w-full py-4 pl-12 pr-12 bg-[#232326] border-2 rounded-xl text-white placeholder-[#6C7278] focus:outline-none transition-all ${
                      confirmPassword === "" 
                        ? "border-[#44444A] focus:border-[#9945FF] focus:ring-2 focus:ring-[#9945FF]"
                        : doPasswordsMatch 
                          ? "border-[#19F12F] focus:border-[#19F12F] focus:ring-2 focus:ring-[#19F12F]"
                          : "border-red-400 focus:border-red-400 focus:ring-2 focus:ring-red-400"
                    }`}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                  />
                  <button
                    type="button"
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-[#6C7278] hover:text-[#9945FF] transition-colors"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  >
                    <Image
                      src={showConfirmPassword ? EyeSlash : Eye}
                      alt="toggle password"
                      width={20}
                      height={20}
                    />
                  </button>
                </div>
                {confirmPassword && !doPasswordsMatch && (
                  <p className="text-red-400 text-sm">Passwords do not match</p>
                )}
              </div>

              {/* Submit Button */}
              <div className="flex gap-4 pt-4">
                <Link
                  href="/dashboard/settings"
                  className="flex-1 py-4 px-6 bg-[#232326] text-white rounded-xl font-medium hover:bg-[#2C2C30] transition-all text-center"
                >
                  Cancel
                </Link>
                <button
                  type="submit"
                  disabled={loading || !isPasswordValid || !doPasswordsMatch || !currentPassword}
                  className="flex-1 py-4 px-6 bg-gradient-to-r from-[#9945FF] to-[#0BCB7B] text-white rounded-xl font-medium hover:shadow-lg hover:shadow-purple-500/20 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? "Changing Password..." : "Change Password"}
                </button>
              </div>
            </form>
          </div>

          {/* Security Tips */}
          <div className="mt-8 bg-[#161618] border border-[#2C2C30] rounded-2xl p-6">
            <h3 className="text-white font-bold text-lg mb-4">Security Tips</h3>
            <div className="space-y-3 text-[#ACB5BB]">
              <div className="flex items-start gap-3">
                <CheckIcon className="text-[#19F12F] mt-0.5 flex-shrink-0" />
                <span>Use a unique password that you don't use elsewhere</span>
              </div>
              <div className="flex items-start gap-3">
                <CheckIcon className="text-[#19F12F] mt-0.5 flex-shrink-0" />
                <span>Include a mix of letters, numbers, and special characters</span>
              </div>
              <div className="flex items-start gap-3">
                <CheckIcon className="text-[#19F12F] mt-0.5 flex-shrink-0" />
                <span>Consider using a password manager to generate and store strong passwords</span>
              </div>
              <div className="flex items-start gap-3">
                <CheckIcon className="text-[#19F12F] mt-0.5 flex-shrink-0" />
                <span>Enable two-factor authentication for additional security</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChangePasswordPage;
