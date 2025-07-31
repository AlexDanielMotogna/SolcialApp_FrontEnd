import Link from "next/link";
import Image from "next/image";
import ButtonBlack from "../ButtonBlack";
import ButtonBorder from "../ButtonBorder";
import PowerShield from "../../../public/imgs/PowerShield.png";
import Moneybag from "../../../public/imgs/Moneybag.png";

interface QuestHeaderProps {
  filters: Array<{ label: string; value: string }>;
  currentFilter: string;
  onFilterChange: (filter: string) => void;
  onCreateQuest: () => void;
  questsCompleted: number;
  rewardEarned: number;
}

const QuestHeader = ({
  filters,
  currentFilter,
  onFilterChange,
  onCreateQuest,
  questsCompleted,
  rewardEarned,
}: QuestHeaderProps) => {
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
        <div className="w-[140px] xl:w-[170px] flex items-center justify-start gap-3 py-4 xl:py-5 px-3 xl:px-4 bg-[#1E1E20] border border-[#2C2C30] rounded-2xl">
          <Image
            src={Moneybag}
            alt=""
            className="w-[28px] h-[28px] xl:w-[38px] xl:h-[38px]"
          />
          <div className="flex flex-col items-start justify-start gap-1">
            <h3 className="text-white font-semibold text-[1.5rem]">
              {rewardEarned}
            </h3>
            <span className="text-[1.1rem] text-[#ACB5BB]">Total Rewards</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuestHeader;