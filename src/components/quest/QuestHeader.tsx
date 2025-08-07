import { memo, useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import ButtonBlack from "../ButtonBlack";
import ButtonBorder from "../ButtonBorder";
import PowerShield from "../../../public/imgs/PowerShield.png";
import Moneybag from "../../../public/imgs/Moneybag.png";
import SolanaIcon from "../../../public/icons/SolanaIconReward.png";
import UsdtIcon from "../../../public/icons/Usdt.svg";
import { FaExchangeAlt } from "react-icons/fa";
import { formatDecimalForDisplay } from "@/utils/decimal";
import { getSolPrice } from "@/utils/getSolPrice";

interface QuestHeaderProps {
  filters: Array<{ label: string; value: string }>;
  currentFilter: string;
  onFilterChange: (filter: string) => void;
  onCreateQuest: () => void;
  questsCompleted: number;
  rewardEarned: number;
  rewardEarnedUSD?: number; // optional, if you have it
}

const QuestHeader = memo(({
  filters,
  currentFilter,
  onFilterChange,
  onCreateQuest,
  questsCompleted,
  rewardEarned,
  rewardEarnedUSD,
}: QuestHeaderProps) => {
  const [currency, setCurrency] = useState<'SOL' | 'USDT'>('SOL');
  const [solPrice, setSolPrice] = useState<number | null>(null);
  const [loadingPrice, setLoadingPrice] = useState(false);


useEffect(() => {
  if (currency === 'USDT') {
    setLoadingPrice(true);
    getSolPrice().then((price) => {
      setSolPrice(price);
      setLoadingPrice(false);
    });
  }
}, [currency]);

  console.log("Currency:", solPrice);

  const solToUsd = rewardEarnedUSD !== undefined
    ? rewardEarnedUSD
    : solPrice !== null
      ? rewardEarned * solPrice
      : rewardEarned * 150; // fallback

  const handleSwitch = () => setCurrency((c) => (c === 'SOL' ? 'USDT' : 'SOL'));

  return (
    <div className="w-full flex flex-col md:flex-row items-center justify-between gap-4 mb-6">
      {/* Navigation Buttons */}
      <div className="flex-shrink-0 w-full md:w-auto flex items-center gap-3 justify-start">
        <Link href="/dashboard/quests/account">
          <ButtonBlack text="My Account" />
        </Link>
        <ButtonBorder text="Create Quest" onClick={onCreateQuest} />
      </div>

      {/* Filters */}
      <div className="flex-1 flex flex-wrap justify-center gap-2">
        {filters.map((f) => (
          <button
            key={f.value}
            onClick={() => onFilterChange(f.value)}
            className={`px-4 py-2 rounded-lg border font-semibold text-[1.3rem] transition ${
              currentFilter === f.value
                ? "bg-[#9945FF] text-white border-[#9945FF]"
                : "bg-[#23232A] text-[#ACB5BB] border-[#2C2C30] hover:bg-[#2C2C30]"
            }`}
          >
            {f.label}
          </button>
        ))}
        {currentFilter && (
          <button
            onClick={() => onFilterChange("")}
            className="px-4 py-2 rounded-lg border font-semibold text-[1.3rem] bg-[#23232A] text-[#ACB5BB] border-[#2C2C30] hover:bg-[#2C2C30]"
          >
            Clear
          </button>
        )}
      </div>

      {/* Stats */}
      <div className="flex gap-3 flex-shrink-0 mt-4 md:mt-0">
        <div className="w-[140px] xl:w-[170px] flex items-center justify-start gap-3 py-4 xl:py-5 px-3 xl:px-4 bg-[#1E1E20] border border-[#2C2C30] rounded-2xl">
          <Image
            src={PowerShield}
            alt=""
            className="w-[28px] h-[28px] xl:w-[38px] xl:h-[38px]"
          />
          <div className="flex flex-col items-start justify-start gap-1">
            <h3 className="text-white font-semibold text-[1.5rem]">
              {questsCompleted}
            </h3>
            <span className="text-[1.1rem] text-[#ACB5BB]">
              Quests completed
            </span>
          </div>
        </div>
        <div className="w-[170px] flex items-center justify-start gap-3 py-4 xl:py-5 px-3 xl:px-4 bg-[#1E1E20] border border-[#2C2C30] rounded-2xl relative">
          <Image
            src={currency === 'SOL' ? SolanaIcon : UsdtIcon}
            alt={currency}
            className="w-[28px] h-[28px] xl:w-[38px] xl:h-[38px]"
          />
          <div className="flex flex-col items-start justify-start gap-1">
            <h3 className="text-white font-semibold text-[1.5rem] transition-all duration-300">
              {currency === 'SOL'
                ? formatDecimalForDisplay(rewardEarned)
                : loadingPrice
                  ? <span className="text-xs text-[#ACB5BB]">Loading...</span>
                  : formatDecimalForDisplay(solToUsd, 2)}
              <span className="ml-1 text-xs text-[#ACB5BB]">{currency}</span>
            </h3>
            <span className="text-[1.1rem] text-[#ACB5BB]">Total Rewards</span>
          </div>
          <button
            type="button"
            onClick={handleSwitch}
            className="absolute top-2 right-2 bg-[#23232A] hover:bg-[#2C2C30] rounded-full p-1 transition-colors"
            title="Switch currency"
            aria-label="Switch currency"
          >
            <FaExchangeAlt className={`text-[#ACB5BB] transition-transform duration-300 ${currency === 'USDT' ? 'rotate-180' : ''}`} size={18} />
          </button>
        </div>
      </div>
    </div>
  );
});

QuestHeader.displayName = 'QuestHeader';

export default QuestHeader;