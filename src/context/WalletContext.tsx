// MODIFICAR: c:\Users\Lian Li\Desktop\FrontEnd_Solcial\solcial\src\context\WalletContext.tsx

"use client";
import React, { createContext, useContext, useEffect, useState } from "react";
import { useWallet } from "@solana/wallet-adapter-react";
import toast from "react-hot-toast";

interface WalletContextType {
  isConnected: boolean;
  walletAddress: string | null;
  walletName: string | null;
  connecting: boolean;
  disconnect: () => Promise<void>;
  updateWalletInDB: (address: string) => Promise<void>; // ✅ MÉTODO PÚBLICO
}

const WalletContext = createContext<WalletContextType | undefined>(undefined);

interface WalletContextProviderProps {
  children: React.ReactNode;
}

export const WalletContextProvider: React.FC<WalletContextProviderProps> = ({
  children,
}) => {
  const {
    connected,
    publicKey,
    wallet,
    connecting,
    disconnect: walletDisconnect,
  } = useWallet();
  const [walletAddress, setWalletAddress] = useState<string | null>(null);
  const [isConnected, setIsConnected] = useState(false);

  // ✅ ACTUALIZAR ESTADO CUANDO CAMBIA LA WALLET
 useEffect(() => {
    if (connected && publicKey) {
      const address = publicKey.toString();
      setWalletAddress(address);
      setIsConnected(true);

      console.log("🔗 Wallet connected:", address);
      console.log("🔗 Wallet adapter:", wallet?.adapter.name);
      toast.success(`Connected to ${wallet?.adapter.name}!`);
      
      // ✅ LLAMAR AUTOMÁTICAMENTE PARA PROBAR
      console.log("🚀 Auto-saving wallet to database...");
      updateWalletInDB(address);
    } else {
      setWalletAddress(null);
      setIsConnected(false);
    }
  }, [connected, publicKey, wallet]);

  // ✅ FUNCIÓN PARA GUARDAR EN BD (LLAMADA EXTERNAMENTE)
  const updateWalletInDB = async (address: string) => {
    try {
      console.log('💾 Sending wallet to database:', address);
      
      // ✅ VERIFICAR QUE LA ADDRESS NO ESTÉ VACÍA
      if (!address || address.trim() === '') {
        console.error('❌ Empty wallet address, not sending to API');
        toast.error('Invalid wallet address');
        return;
      }

      const requestBody = {
        walletAddress: address.trim()
      };

      console.log('📦 Request body:', requestBody);

      const response = await fetch('/api/user/update-wallet', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
      });

      console.log('📡 Response status:', response.status);
      
      const result = await response.json();
      console.log('📦 Response data:', result);

      if (response.ok && result.success) {
        if (result.alreadyConnected) {
          console.log('ℹ️ Wallet already connected, silent success');
        } else {
          if (result.previousWallet) {
            toast.success(`Wallet updated successfully!`);
          } else {
            toast.success('Wallet connected and saved!');
          }
        }
        return;
      }

      // ✅ MANEJAR ERRORES
      console.error('❌ API Error:', result);
      
      switch (response.status) {
        case 409:
          toast.error('This wallet is already connected to another account');
          break;
        case 400:
          toast.error('Invalid wallet address or request format');
          break;
        case 401:
          toast.error('Please log in to connect your wallet');
          break;
        case 404:
          toast.error('Account not found. Please log in again');
          break;
        default:
          toast.error('Connected but failed to save wallet');
      }

    } catch (error) {
      console.error('❌ Network error:', error);
      toast.error('Connection error. Please try again');
    }
  };

  // ✅ FUNCIÓN PARA DESCONECTAR
  const disconnect = async () => {
    try {
      await walletDisconnect();
      setWalletAddress(null);
      setIsConnected(false);
      toast.success("Wallet disconnected");
    } catch (error) {
      console.error("Error disconnecting wallet:", error);
      toast.error("Error disconnecting wallet");
    }
  };

  const value: WalletContextType = {
    isConnected,
    walletAddress,
    walletName: wallet?.adapter.name || null,
    connecting,
    disconnect,
    updateWalletInDB, // ✅ EXPONER MÉTODO
  };

  return (
    <WalletContext.Provider value={value}>{children}</WalletContext.Provider>
  );
};

// ✅ HOOK PERSONALIZADO
export const useGlobalWallet = () => {
  const context = useContext(WalletContext);
  if (context === undefined) {
    throw new Error(
      "useGlobalWallet must be used within a WalletContextProvider"
    );
  }
  return context;
};
