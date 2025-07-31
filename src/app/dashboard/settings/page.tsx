"use client";

import React from "react";
import Link from "next/link";

const SettingsPage: React.FC = () => {
  return (
    <div className="flex-1 flex flex-col items-center w-full px-8 pt-16">
      <div className="w-full max-w-3xl">
        <h1 className="text-3xl font-bold text-white mb-8">Settings</h1>
        <section className="border-b border-[#232326] pb-8 mb-8">
          <h2 className="text-xl font-semibold text-white mb-4">General</h2>
          <div className="flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <span className="text-base text-white">Change Password</span>
              <Link
                href="/dashboard/settings/change-password"
                className="text-[#19F12F] hover:underline font-medium transition"
              >
                Edit
              </Link>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-base text-white">Two-Factor Authentication (2FA)</span>
              <Link
                href="/dashboard/settings/two-fa"
                className="text-[#19F12F] hover:underline font-medium transition"
              >
                Edit
              </Link>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default SettingsPage;