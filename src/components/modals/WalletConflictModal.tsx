"use client";

import React from 'react';

interface WalletConflictModalProps {
  isOpen: boolean;
  walletAddress: string;
  onConfirm: () => void;
  onCancel: () => void;
}

const WalletConflictModal: React.FC<WalletConflictModalProps> = ({
  isOpen,
  walletAddress,
  onConfirm,
  onCancel,
}) => {
  if (!isOpen) return null;

  const formatAddress = (address: string) => {
    if (address.length <= 10) return address;
    return `${address.substring(0, 6)}...${address.substring(address.length - 4)}`;
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4">
      <div className="bg-[#161618] border border-[#2C2C30] rounded-2xl p-8 max-w-md w-full">
        <div className="text-center">
          {/* Warning Icon */}
          <div className="w-16 h-16 mx-auto mb-4 bg-red-500/20 rounded-full flex items-center justify-center">
            <svg className="w-8 h-8 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth="2" 
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"
              />
            </svg>
          </div>

          {/* Title */}
          <h3 className="text-xl font-bold text-white mb-4">
            Wallet Already Connected
          </h3>

          {/* Description */}
          <p className="text-[#ACB5BB] mb-4">
            This wallet is already connected to another account. Would you like to transfer it to your current account?
          </p>

          {/* Wallet Address */}
          <div className="bg-[#232326] rounded-xl p-4 mb-6">
            <p className="text-sm text-[#6C7278] mb-1">Wallet Address:</p>
            <p className="text-[#19F12F] font-mono text-sm break-all">
              {formatAddress(walletAddress)}
            </p>
          </div>

          {/* Warning */}
          <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-4 mb-6">
            <p className="text-red-400 text-sm">
              ⚠️ This will disconnect the wallet from its current account and connect it to yours.
            </p>
          </div>

          {/* Buttons */}
          <div className="flex gap-4">
            <button
              onClick={onCancel}
              className="flex-1 py-3 px-4 bg-[#232326] text-white rounded-xl font-medium hover:bg-[#2C2C30] transition-all"
            >
              Cancel
            </button>
            <button
              onClick={onConfirm}
              className="flex-1 py-3 px-4 bg-gradient-to-r from-[#9945FF] to-[#0BCB7B] text-white rounded-xl font-medium hover:shadow-lg hover:shadow-purple-500/20 transition-all"
            >
              Transfer Wallet
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WalletConflictModal;
