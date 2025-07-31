"use client";

import React, { useState, FormEvent } from "react";
import Button from "@/components/Button";
import Link from "next/link";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";

const API_BASE = "/api/auth/settings";

const ChangePasswordPage: React.FC = () => {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleChangePassword = async (e: FormEvent) => {
    e.preventDefault();
    if (!currentPassword || !newPassword || !confirm) {
      toast.error("Please fill in all fields.");
      return;
    }
    if (newPassword !== confirm) {
      toast.error("Passwords do not match.");
      return;
    }
    setLoading(true);
    try {
      const res = await fetch("/api/auth/settings/change-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ currentPassword, newPassword }),
      });
      const data = await res.json();
      if (res.ok) {
        toast.success("Password changed successfully!");
        setCurrentPassword("");
        setNewPassword("");
        setConfirm("");
        setTimeout(() => {
          router.push("/dashboard/settings");
        }, 1500); // Redirige après 1.5s
      } else {
        toast.error(data.error || data.msg || data.message || "Error changing password.");
      }
    } catch {
      toast.error("Error changing password.");
    }
    setLoading(false);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <div className="bg-[#161618] border border-[#44444A] rounded-2xl p-8 w-full max-w-md flex flex-col gap-6">
        <h2 className="text-white text-2xl font-bold mb-4">Change Password</h2>
        <form onSubmit={handleChangePassword} className="flex flex-col gap-4">
          <label className="text-white" htmlFor="currentPassword">Current Password</label>
          <input
            type="password"
            id="currentPassword"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
            className="p-2 rounded-md bg-[#222222] border border-[#44444A] text-white"
            required
            autoComplete="current-password"
          />
          <label className="text-white" htmlFor="newPassword">New Password</label>
          <input
            type="password"
            id="newPassword"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            className="p-2 rounded-md bg-[#222222] border border-[#44444A] text-white"
            required
            autoComplete="new-password"
          />
          <label className="text-white" htmlFor="confirm">Confirm New Password</label>
          <input
            type="password"
            id="confirm"
            value={confirm}
            onChange={(e) => setConfirm(e.target.value)}
            className="p-2 rounded-md bg-[#222222] border border-[#44444A] text-white"
            required
            autoComplete="new-password"
          />
          <Button type="submit" disabled={loading}>
            {loading ? "Changing..." : "Change Password"}
          </Button>
        </form>
        <Link href="/dashboard/settings" className="text-[#19F12D] mt-4 underline">Back to Settings</Link>
      </div>
    </div>
  );
};

export default ChangePasswordPage;