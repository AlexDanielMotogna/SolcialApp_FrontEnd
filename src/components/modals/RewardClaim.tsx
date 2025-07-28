"use client";

import React from "react";
import Close from "../../../public/icons/Close";
import Image from "next/image";
import Checkmark from "../../../public/imgs/SolanaIconReward.png"; // Usa tu ícono, o reemplaza por texto
import RewardIcon from "../../../public/imgs/Moneybag.png"; // o el ícono de recompensa

interface RewardClaimProps {
  isOpen: boolean;
  onClose: () => void;
  amount: number;
  token: string;
}

const RewardClaim: React.FC<RewardClaimProps> = ({ isOpen, onClose, amount, token }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-[#000000] bg-opacity-60 z-50 flex justify-center items-end md:items-center">
      <div className="bg-[#161618] w-[90vw] md:w-[420px] flex flex-col items-start justify-start gap-6 border border-[#44444A] rounded-2xl overflow-hidden shadow-[0px_2px_10px_-3px_rgba(0,0,0,0)]"
        style={{ boxShadow: "0px -5px 10px 0px #FFFFFF1A inset" }}
      >
        {/* Header */}
        <div className="w-full p-6 border-b border-[#44444A] flex items-center justify-between">
          <h3 className="text-[1.8rem] text-white font-semibold">Reward Claimed!</h3>
          <Close onClick={onClose} />
        </div>

        {/* Body */}
        <div className="w-full flex flex-col items-center justify-center gap-6 px-6 pb-6 text-center">
          <div className="w-24 h-24 rounded-full bg-[#2C2C30] flex items-center justify-center border border-[#44444A]">
            <Image src={RewardIcon} alt="Reward Icon" className="w-12 h-12" />
          </div>

          <div className="flex flex-col gap-2">
            <h4 className="text-white font-semibold text-[2rem]">
              +{amount} {token}
            </h4>
            <p className="text-[#ACB5BB] text-[1.4rem]">
              Congratulations! You successfully claimed your reward.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RewardClaim;
