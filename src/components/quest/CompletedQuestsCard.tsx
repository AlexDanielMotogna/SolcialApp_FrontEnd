import {
  formatDecimalForDisplay,
  parseDecimal128ToNumber,
} from "@/utils/decimal";
import { formatDate } from "@/utils/questHelpers";
import Image from "next/image";
import SolanaIcon from "../../../public/imgs/SolanaIconReward.png";
import ButtonBlack from "../ButtonBlack";
import { DynamicTable, TableColumn } from "../DynamicTable";

interface CompletedUserQuest {
  _id: string;
  questName: string;
  date?: string;
  rewardAmount: any;
  status: string;
  rewardClaimed?: boolean;
}

type Props = {
  userQuests: any[];
  onClaim: (userQuest: any) => Promise<void>;
  processing: boolean;
};

const CompletedQuestsCard: React.FC<Props> = ({
  userQuests,
  onClaim,
  processing,
}) => {
  const columns: TableColumn<any>[] = [
    {
      key: "#",
      label: "#",
      render: (_v, _r, i) => i + 1,
      className: "w-[50px] py-6 text-[#ACB5BB] text-xl  text-center",
    },
    {
      key: "questName",
      label: "Quest Title",
      className: "w-[200px] text-[#E5E7EB] text-xl  text-center",
      render: (_v, row) => (
        <div className="flex items-center gap-3">
          <span className="text-2xl md:text-3xl text-[#FFD700]">🏆</span>
          <span className="font-semibold">
            {row.questName || "Unknown Quest"}
          </span>
        </div>
      ),
    },
    {
      key: "date",
      label: "Enrolled Date",
      className: "w-[180px] text-[#ACB5BB] text-center",
      render: (value) => (value ? formatDate(value) : "No date"),
    },
    {
      key: "rewardAmount",
      label: "Reward",
      className: "w-[160px] text-xl text-[#ACB5BB]  text-center",
      render: (value) => {
        const rewardValue = parseDecimal128ToNumber(value);
        const formattedReward = formatDecimalForDisplay(rewardValue);
        return (
          <div className="flex items-center justify-center gap-2">
            <span className="text-[#ACB5BB] font-medium">
              {formattedReward}
            </span>
            <Image
              src={SolanaIcon}
              alt="Solana"
              className="w-6 h-6"
              width={24}
              height={24}
            />
          </div>
        );
      },
    },
    {
      key: "status",
      label: "Status",
      className: "w-[120px] text-center text-xl text-[#ACB5BB]",
      render: () => (
        <span className="font-semibold text-xl text-green-400">Completed</span>
      ),
    },
    {
      key: "rewardClaimed",
      label: "Claim Status",
      className: "w-[160px] text-center text-xl text-[#ACB5BB]",
      render: (value, row) =>
        value ? (
          <span className="text-green-400 text-xl font-semibold">
            ✅ Claimed
          </span>
        ) : (
          <ButtonBlack text="Claim Reward" onClick={() => onClaim?.(row)} />
        ),
    },
  ];

  return (
    <div className="min-w-[1550px] 2xl:min-w-0 flex items-start justify-start overflow-x-auto bg-[#161618] border border-[#2C2C30] rounded-2xl py-6 px-5 mb-28 shadow-lg w-full">
      {!userQuests || userQuests.length === 0 ? (
        <div className="text-center py-10 text-[#ACB5BB] text-xl w-full">
          No completed quests found
        </div>
      ) : (
        <div className="max-h-[660px] overflow-y-auto w-full">
          <DynamicTable
            columns={columns}
            data={userQuests}
            rowKey={(row) => row._id || row.questName}
          />
        </div>
      )}
    </div>
  );
};

export default CompletedQuestsCard;
