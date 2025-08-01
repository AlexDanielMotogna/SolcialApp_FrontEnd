// CREAR: c:\Users\Lian Li\Desktop\FrontEnd_Solcial\solcial\src\hooks\useWalletSync.ts

"use client";
import { useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useGlobalWallet } from '@/context/WalletContext';

export const useWalletSync = () => {
  const { data: session, status } = useSession();
  const { walletAddress, isConnected, updateWalletInDB } = useGlobalWallet();

  // ✅ SYNC WALLET CUANDO AMBOS ESTÉN DISPONIBLES
  useEffect(() => {
    if (session?.user && walletAddress && isConnected) {
      console.log('🔄 Syncing wallet with authenticated user');
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