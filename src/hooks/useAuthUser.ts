"use client";

import { useSession } from "next-auth/react";
import { useMemo } from "react";
// Custom hook to manage authenticated user data
// This hook provides access to the authenticated user's information and session status
// It is used throughout the application to access user details like ID, name, email, and wallet address
export interface AuthUser {
  id: string;
  _id: string;
  name: string;
  email: string;
  phone?: string;
  walletaddress?: string;
  hasTwitterAccess?: boolean;
  isVerified?: boolean;
  avatar?: string;
  twitter_id?: string;
  twitter_handle?: string;
  twitterScreenName?: string;
  twitterUserId?: string;
  twitterAccessToken?: string;
  twitterAccessSecret?: string;
  online?: boolean;
  twoFactorEnabled?: boolean;
  friends?: string[];
  pendingRequests?: {
    senderId: string;
    requestType: "sent" | "received";
  }[];
}

export const useAuthUser = () => {
  const { data: session, status, update } = useSession();

  const user = useMemo((): AuthUser | null => {
    if (!session?.user) return null;

    // Type assertion to access our custom properties
    const sessionUser = session.user as any;

    return {
      id: sessionUser.id || sessionUser._id,
      _id: sessionUser._id || sessionUser.id,
      name: sessionUser.name || "",
      email: sessionUser.email || "",
      phone: sessionUser.phone,
      walletaddress: sessionUser.walletaddress,
      hasTwitterAccess: sessionUser.hasTwitterAccess || false,
      isVerified: sessionUser.isVerified || false,
      avatar: sessionUser.avatar || sessionUser.image,
      twitter_id: sessionUser.twitter_id,
      twitter_handle: sessionUser.twitter_handle,
      twitterScreenName: sessionUser.twitterScreenName,
      twitterUserId: sessionUser.twitterUserId,
      twitterAccessToken: sessionUser.twitterAccessToken,
      twitterAccessSecret: sessionUser.twitterAccessSecret,
      online: sessionUser.online,
      twoFactorEnabled: sessionUser.twoFactorEnabled || false,
      friends: sessionUser.friends || [],
      pendingRequests: sessionUser.pendingRequests || [],
    };
  }, [session]);

  const isLoading = status === "loading";
  const isAuthenticated = status === "authenticated" && !!user;
  const isUnauthenticated = status === "unauthenticated";

  // Function to refresh user data in session
  const refreshUser = async () => {
    await update();
  };

  return {
    user,
    session,
    isLoading,
    isAuthenticated,
    isUnauthenticated,
    status,
    refreshUser,
  };
};
