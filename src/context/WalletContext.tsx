// MODIFICAR: c:\Users\Lian Li\Desktop\FrontEnd_Solcial\solcial\src\context\WalletContext.tsx

"use client";
import React, { createContext, useContext, useEffect, useState, useCallback } from "react";
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

  // ✅ FUNCIÓN PARA MOSTRAR DIÁLOGO DE CONFLICTO DE WALLET
  const showWalletConflictDialog = async (address: string): Promise<boolean> => {
    return new Promise((resolve) => {
      const dialog = document.createElement('div');
      dialog.className = 'fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50';
      dialog.innerHTML = `
        <div class="bg-[#161618] border border-[#2C2C30] rounded-2xl p-8 max-w-md mx-4">
          <div class="text-center">
            <div class="w-16 h-16 mx-auto mb-4 bg-red-500/20 rounded-full flex items-center justify-center">
              <svg class="w-8 h-8 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"></path>
              </svg>
            </div>
            <h3 class="text-xl font-bold text-white mb-4">Wallet Already Connected</h3>
            <p class="text-[#ACB5BB] mb-6">
              This wallet is already connected to another account. Would you like to transfer it to your current account?
            </p>
            <p class="text-sm text-[#6C7278] mb-6">
              Wallet: ${address.substring(0, 6)}...${address.substring(address.length - 4)}
            </p>
            <div class="flex gap-4">
              <button id="cancel-transfer" class="flex-1 py-3 px-4 bg-[#232326] text-white rounded-xl font-medium hover:bg-[#2C2C30] transition-all">
                Cancel
              </button>
              <button id="confirm-transfer" class="flex-1 py-3 px-4 bg-gradient-to-r from-[#9945FF] to-[#0BCB7B] text-white rounded-xl font-medium hover:shadow-lg hover:shadow-purple-500/20 transition-all">
                Transfer Wallet
              </button>
            </div>
          </div>
        </div>
      `;

      document.body.appendChild(dialog);

      const handleCancel = () => {
        document.body.removeChild(dialog);
        resolve(false);
      };

      const handleConfirm = () => {
        document.body.removeChild(dialog);
        resolve(true);
      };

      dialog.querySelector('#cancel-transfer')?.addEventListener('click', handleCancel);
      dialog.querySelector('#confirm-transfer')?.addEventListener('click', handleConfirm);
      
      // Close on backdrop click
      dialog.addEventListener('click', (e) => {
        if (e.target === dialog) {
          handleCancel();
        }
      });
    });
  };

  // ✅ FUNCIÓN PARA CAMBIAR WALLET (FORZAR ACTUALIZACIÓN)
  const handleWalletSwitch = async (address: string) => {
    try {
      const response = await fetch('/api/user/force-update-wallet', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          walletAddress: address.trim(),
          forceUpdate: true 
        }),
      });

      const result = await response.json();

      if (response.ok && result.success) {
        toast.success('Wallet successfully transferred to your account!');
        return;
      } else {
        toast.error(result.error || 'Failed to transfer wallet');
      }
    } catch (error) {
      if (process.env.NODE_ENV === 'development') {
        console.error('❌ Wallet switch error:', error);
      }
      toast.error('Failed to transfer wallet. Please try again');
    }
  };

  // ✅ FUNCIÓN PARA GUARDAR EN BD (LLAMADA EXTERNAMENTE) - MEMOIZED
  const updateWalletInDB = useCallback(async (address: string) => {
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

      // ✅ HANDLE ERRORS WITH DETAILED MESSAGING
      if (process.env.NODE_ENV === 'development') {
        console.error('❌ API Error:', result);
      }
      
      switch (response.status) {
        case 409:
          // Wallet already connected to another account
          toast.error(result.error || 'This wallet is already connected to another account', {
            duration: 6000,
            style: {
              background: '#FEE2E2',
              border: '1px solid #FECACA',
              color: '#991B1B',
            },
          });
          
          // Show custom confirmation with better UX
          const shouldTransfer = await showWalletConflictDialog(address);
          if (shouldTransfer) {
            await handleWalletSwitch(address);
          }
          break;
          
        case 400:
          toast.error(result.error || 'Invalid wallet address or request format');
          break;
          
        case 401:
          toast.error('Please log in to connect your wallet');
          // Could redirect to login page here
          break;
          
        case 404:
          toast.error('Account not found. Please log in again');
          break;
          
        default:
          toast.error(result.error || 'Failed to save wallet. Please try again');
      }

    } catch (error) {
      if (process.env.NODE_ENV === 'development') {
        console.error('❌ Network error:', error);
      }
      toast.error('Connection error. Please try again');
    }
  }, []); // ✅ NO DEPENDENCIES NEEDED - FUNCTION IS STABLE

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
