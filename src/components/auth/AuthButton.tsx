"use client";

import { signIn, signOut } from "next-auth/react";
import { useAuthUser } from "@/hooks/useAuthUser";

interface AuthButtonProps {
  className?: string;
  showUserInfo?: boolean;
}

export const AuthButton = ({ className = "", showUserInfo = true }: AuthButtonProps) => {
  const { user, isAuthenticated, isLoading } = useAuthUser();

  if (isLoading) {
    return (
      <div className={`animate-pulse ${className}`}>
        <div className="h-10 w-24 bg-gray-200 rounded"></div>
      </div>
    );
  }

  if (isAuthenticated && user) {
    return (
      <div className={`flex items-center gap-3 ${className}`}>
        {showUserInfo && (
          <div className="flex items-center gap-2">
            {user.avatar && (
              <img
                src={user.avatar}
                alt={user.name}
                className="w-8 h-8 rounded-full"
              />
            )}
            <div className="text-sm">
              <p className="font-medium">{user.name}</p>
              <p className="text-gray-500 text-xs">{user.email}</p>
            </div>
          </div>
        )}
        <button
          onClick={() => signOut()}
          className="px-4 py-2 text-sm font-medium text-white bg-red-600 hover:bg-red-700 rounded-md transition-colors"
        >
          Sign Out
        </button>
      </div>
    );
  }

  return (
    <button
      onClick={() => signIn()}
      className={`px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-md transition-colors ${className}`}
    >
      Sign In
    </button>
  );
};

export default AuthButton;
