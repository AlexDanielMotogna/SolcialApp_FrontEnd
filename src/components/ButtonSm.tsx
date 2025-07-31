"use client";
import { useWallet } from '@solana/wallet-adapter-react';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import { useState, useEffect } from 'react';
import Wallet from "../../public/icons/Wallet";

interface WalletButtonProps {
  text?: string;
}

const WalletButtonSm: React.FC<WalletButtonProps> = ({ text = "Connect Wallet" }) => {
  const { connected, publicKey, wallet, connecting } = useWallet();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const getButtonText = () => {
    if (!mounted) return "Loading...";
    if (connecting) return "Connecting...";
    if (connected && publicKey) {
      return `${wallet?.adapter.name || 'Wallet'}`;
    }
    return text;
  };

  if (!mounted) {
    return (
      <button className="w-full h-[36px] flex items-center justify-center gap-4 border rounded-md gradient border-none outline-none font-semibold text-[1.4rem] text-white hover:text-opacity-85 transition-all duration-300 ease-in-out">
        <Wallet color="#FFFFFF" />
        Loading...
      </button>
    );
  }

  return (
    <WalletMultiButton 
      style={{
        width: '100%',
        height: '36px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '16px',
        border: 'none',
        borderRadius: '6px',
        outline: 'none',
        fontWeight: '600',
        fontSize: '1.4rem',
        color: 'white',
        background: 'linear-gradient(135deg, #9945FF 0%, #14F195 100%)',
        transition: 'all 0.3s ease-in-out',
        cursor: 'pointer',
        fontFamily: 'inherit',
      }}
      startIcon={<Wallet color="#FFFFFF" />}
    >
      {getButtonText()}
    </WalletMultiButton>
  );
};

export default WalletButtonSm;