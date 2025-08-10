"use client";

import React, { useState } from "react";
import Link from "next/link";
import { signOut } from "next-auth/react";
import { useAuthUser } from "@/hooks/useAuthUser";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { handleLogout, handleDeleteAccount } from "@/lib/clients";

const KeyIcon = () => (
  <svg
    className="w-6 h-6 text-white"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-3.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z"
    />
  </svg>
);

const ShieldIcon = () => (
  <svg
    className="w-6 h-6 text-white"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
    />
  </svg>
);

const LogoutIcon = () => (
  <svg
    className="w-6 h-6 text-white"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
    />
  </svg>
);

const TrashIcon = () => (
  <svg
    className="w-6 h-6 text-white"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
    />
  </svg>
);

const ChevronRightIcon = () => (
  <svg
    className="w-5 h-5 text-white"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M9 5l7 7-7 7"
    />
  </svg>
);

const SettingsPage: React.FC = () => {
  const { user } = useAuthUser();
  const router = useRouter();
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);

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
        <div className="w-full max-w-4xl">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-6xl font-bold bg-gradient-to-r from-[#9945FF] to-[#0BCB7B] bg-clip-text text-transparent mb-2">
              Settings
            </h1>
            <p className="text-[#ACB5BB] text-3xl">
              Manage your account preferences and security
            </p>
          </div>

          {/* User Info Card */}
          <div className="bg-[#161618] border border-[#2C2C30] rounded-2xl p-6 mb-8">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-gradient-to-r from-[#9945FF] to-[#0BCB7B] rounded-full flex items-center justify-center">
                <span className="text-white text-2xl font-bold">
                  {user?.name?.charAt(0).toUpperCase() || "U"}
                </span>
              </div>
              <div>
                <h3 className="text-white text-3xl font-semibold">
                  {user?.name || "User"}
                </h3>
                <p className="text-[#ACB5BB] text-xl">{user?.email}</p>
                <div className="flex items-center gap-2 mt-1">
                  <div
                    className={`w-2 h-2 rounded-full ${
                      user?.isVerified ? "bg-[#19F12F]" : "bg-yellow-500"
                    }`}
                  ></div>
                  <span className="text-lg text-[#ACB5BB]">
                    {user?.isVerified
                      ? "Verified Account"
                      : "Unverified Account"}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Settings Sections */}
          <div className="space-y-6">
            {/* Security Section */}
            <section className="bg-[#161618] border border-[#2C2C30] rounded-2xl p-8">
              <h2 className="text-4xl font-semibold text-white mb-8 flex items-center gap-3">
                <ShieldIcon />
                Security & Privacy
              </h2>
              <div className="space-y-6">
                <Link
                  href="/dashboard/settings/change-password"
                  className="flex items-center justify-between p-6 bg-[#232326] hover:bg-[#2C2C30] rounded-xl transition-all duration-200 group"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-[#9945FF]/10 rounded-lg flex items-center justify-center">
                      <KeyIcon />
                    </div>
                    <div>
                      <h3 className="text-white text-2xl font-medium">
                        Change Password
                      </h3>
                      <p className="text-[#ACB5BB] text-lg">
                        Update your account password
                      </p>
                    </div>
                  </div>
                  <ChevronRightIcon />
                </Link>

                <Link
                  href="/dashboard/settings/two-fa"
                  className="flex items-center justify-between p-6 bg-[#232326] hover:bg-[#2C2C30] rounded-xl transition-all duration-200 group"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-[#0BCB7B]/10 rounded-lg flex items-center justify-center">
                      <ShieldIcon />
                    </div>
                    <div>
                      <h3 className="text-white text-2xl font-medium">
                        Two-Factor Authentication
                      </h3>
                      <p className="text-[#ACB5BB] text-lg">
                        {user?.twoFactorEnabled ? "Enabled" : "Disabled"} • Add
                        extra security to your account
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <div
                      className={`w-2 h-2 rounded-full ${
                        user?.twoFactorEnabled ? "bg-[#19F12F]" : "bg-gray-500"
                      }`}
                    ></div>
                    <ChevronRightIcon />
                  </div>
                </Link>
              </div>
            </section>

            {/* Account Actions Section */}
            <section className="bg-[#161618] border border-[#2C2C30] rounded-2xl p-8">
              <h2 className="text-4xl font-semibold text-white mb-8">
                Account Actions
              </h2>
              <div className="space-y-6">
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center justify-between p-6 bg-[#232326] hover:bg-[#2C2C30] rounded-xl transition-all duration-200 group"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-blue-500/10 rounded-lg flex items-center justify-center">
                      <LogoutIcon />
                    </div>
                    <div className="text-left">
                      <h3 className="text-white text-2xl font-medium">
                        Sign Out
                      </h3>
                      <p className="text-[#ACB5BB] text-lg">
                        Sign out of your account
                      </p>
                    </div>
                  </div>
                  <ChevronRightIcon />
                </button>

                <button
                  onClick={() => setShowDeleteModal(true)}
                  className="w-full flex items-center justify-between p-6 bg-red-500/5 hover:bg-red-500/10 border border-red-500/20 rounded-xl transition-all duration-200 group"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-red-500/10 rounded-lg flex items-center justify-center">
                      <TrashIcon />
                    </div>
                    <div className="text-left">
                      <h3 className="text-red-400 text-2xl font-medium">
                        Delete Account
                      </h3>
                      <p className="text-[#ACB5BB] text-lg">
                        Permanently delete your account
                      </p>
                    </div>
                  </div>
                  <ChevronRightIcon />
                </button>
              </div>
            </section>
          </div>
        </div>
      </div>

      {/* Delete Account Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
          <div className="bg-[#161618] border border-[#44444A] rounded-2xl shadow-2xl p-8 flex flex-col items-center gap-6 w-[400px] mx-4">
            <div className="w-16 h-16 bg-red-500/10 rounded-full flex items-center justify-center">
              <TrashIcon />
            </div>
            <div className="text-center">
              <h2 className="text-red-400 text-3xl font-semibold mb-2">
                Delete Account
              </h2>
              <p className="text-[#ACB5BB] text-lg leading-relaxed">
                Are you sure you want to delete your account? This action cannot
                be undone and will permanently remove all your data.
              </p>
            </div>
            <div className="flex gap-3 w-full">
              <button
                className="flex-1 px-6 py-3 rounded-xl bg-[#232326] text-white text-lg font-medium hover:bg-[#2C2C30] transition"
                onClick={() => setShowDeleteModal(false)}
                disabled={deleteLoading}
              >
                Cancel
              </button>
              <button
                className="flex-1 px-6 py-3 rounded-xl bg-red-600 text-white text-lg font-medium hover:bg-red-700 transition disabled:opacity-50"
                onClick={() =>
                  handleDeleteAccount()({
                    onSuccess: () => {
                      console.log("Delete account: Success");
                      /* ... */
                    },
                    onError: () => {
                      console.log("Delete account: Error");
                      /* ... */
                    },
                    onFinally: () => {
                      console.log("Delete account: Finally");
                      /* ... */
                    },
                  })
                }
                disabled={deleteLoading}
              >
                {deleteLoading ? "Deleting..." : "Delete Account"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SettingsPage;
