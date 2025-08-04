// This is a development helper component to test NextAuth
"use client";

import { useAuthUser } from "@/hooks/useAuthUser";
import { signIn, signOut } from "next-auth/react";

export default function AuthDebug() {
  const { user, session, isAuthenticated, isLoading, status } = useAuthUser();

  if (process.env.NODE_ENV !== "development") {
    return null; // Only show in development
  }

  return (
    <div className="fixed bottom-4 right-4 bg-black/90 text-white p-4 rounded-lg max-w-sm text-xs z-50">
      <h4 className="font-bold mb-2">🔐 Auth Debug Info</h4>
      <div className="space-y-1">
        <p><strong>Status:</strong> {status}</p>
        <p><strong>Loading:</strong> {isLoading ? "Yes" : "No"}</p>
        <p><strong>Authenticated:</strong> {isAuthenticated ? "Yes" : "No"}</p>
        {user && (
          <>
            <p><strong>User ID:</strong> {user.id}</p>
            <p><strong>Email:</strong> {user.email}</p>
            <p><strong>Name:</strong> {user.name}</p>
            <p><strong>Wallet:</strong> {user.walletaddress || "None"}</p>
            <p><strong>Twitter:</strong> {user.hasTwitterAccess ? "Connected" : "Not connected"}</p>
          </>
        )}
      </div>
      <div className="mt-2 space-x-2">
        {isAuthenticated ? (
          <button 
            onClick={() => signOut()} 
            className="bg-red-600 px-2 py-1 rounded text-xs"
          >
            Sign Out
          </button>
        ) : (
          <button 
            onClick={() => signIn()} 
            className="bg-blue-600 px-2 py-1 rounded text-xs"
          >
            Sign In
          </button>
        )}
      </div>
    </div>
  );
}
