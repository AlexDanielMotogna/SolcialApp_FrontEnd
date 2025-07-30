"use client";
import React, { createContext, useContext, useEffect, useState } from 'react';
import { useWallet } from '@solana/wallet-adapter-react';
import { useMockUser } from './MockUserContext'; // ✅ IMPORT
import toast from 'react-hot-toast';

interface WalletContextType {
  isConnected: boolean;
  walletAddress: string | null;
  walletName: string | null;
  connecting: boolean;
  disconnect: () => Promise<void>;
}

const WalletContext = createContext<WalletContextType | undefined>(undefined);

interface WalletContextProviderProps {
  children: React.ReactNode;
}

export const WalletContextProvider: React.FC<WalletContextProviderProps> = ({ children }) => {
  const { connected, publicKey, wallet, connecting, disconnect: walletDisconnect } = useWallet();
  const mockUser = useMockUser(); // ✅ USAR MOCK USER
  const [walletAddress, setWalletAddress] = useState<string | null>(null);
  const [isConnected, setIsConnected] = useState(false);

  // ✅ ACTUALIZAR ESTADO CUANDO CAMBIA LA WALLET
  useEffect(() => {
    if (connected && publicKey) {
      const address = publicKey.toString();
      setWalletAddress(address);
      setIsConnected(true);
      
      // ✅ GUARDAR AUTOMÁTICAMENTE EN BD
      handleWalletConnection(address, wallet?.adapter.name || 'Unknown');
      
      toast.success(`Connected to ${wallet?.adapter.name}!`);
    } else {
      setWalletAddress(null);
      setIsConnected(false);
    }
  }, [connected, publicKey, wallet]);

  // ✅ FUNCIÓN PARA GUARDAR EN BD
  const handleWalletConnection = async (address: string, walletName: string) => {
    try {
      const response = await fetch('/api/user/update-wallet', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          walletAddress: address,
        }),
      });

      if (response.ok) {
        console.log('✅ Wallet updated for user:', mockUser.id);
        console.log('✅ New wallet address:', address);
        toast.success('Wallet connected and saved!');
      } else {
        console.error('❌ Error updating wallet in database');
        toast.error('Connected but failed to save wallet');
      }
    } catch (error) {
      console.error('❌ Error connecting to database:', error);
      toast.error('Connected but failed to save wallet');
    }
  };

  // ✅ FUNCIÓN PARA DESCONECTAR
  const disconnect = async () => {
    try {
      await walletDisconnect();
      setWalletAddress(null);
      setIsConnected(false);
      toast.success('Wallet disconnected');
    } catch (error) {
      console.error('Error disconnecting wallet:', error);
      toast.error('Error disconnecting wallet');
    }
  };

  const value: WalletContextType = {
    isConnected,
    walletAddress,
    walletName: wallet?.adapter.name || null,
    connecting,
    disconnect,
  };

  return (
    <WalletContext.Provider value={value}>
      {children}
    </WalletContext.Provider>
  );
};

// ✅ HOOK PERSONALIZADO
export const useGlobalWallet = () => {
  const context = useContext(WalletContext);
  if (context === undefined) {
    throw new Error('useGlobalWallet must be used within a WalletContextProvider');
  }
  return context;
};