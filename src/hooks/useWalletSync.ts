"use client";
import { useEffect } from "react";
import { useSession } from "next-auth/react";
import { useGlobalWallet } from "@/context/WalletContext";
// Custom hook to sync the user's wallet with their authenticated session
// This hook ensures that the wallet address is updated in the database when the user is authenticated
export const useWalletSync = () => {
  const { data: session, status } = useSession();
  const { walletAddress, isConnected, updateWalletInDB } = useGlobalWallet();

  useEffect(() => {
    if (session?.user && walletAddress && isConnected) {
      console.log("Syncing wallet with authenticated user");
      updateWalletInDB(walletAddress);
    }
  }, [session, walletAddress, isConnected, updateWalletInDB]);

  return {
    session,
    walletAddress,
    isConnected,
    isAuthenticated: !!session?.user,
    isWalletConnected: isConnected,
    isSynced: !!(session?.user && walletAddress),
  };
};
