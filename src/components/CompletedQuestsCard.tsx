import ButtonBorder from "@/components/ButtonBorder";
import ButtonBlack from "./ButtonBlack";
import { formatDate } from "@/utils/questHelpers";
import { parseDecimal128ToNumber, formatDecimalForDisplay } from "@/utils/decimal";

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

const CompletedQuestsCard: React.FC<Props> = ({ userQuests, onClaim, processing }) => {
  console.log("🔍 CompletedQuestsCard recibió userQuests:", userQuests);
  console.log("🔍 Cantidad de userQuests:", userQuests?.length);

  return (
    <div className="bg-[#18181C] rounded-2xl p-10 shadow-lg w-full max-w-6xl min-w-[1300px] overflow-x-auto">
      {!userQuests || userQuests.length === 0 ? (
        <div className="text-center py-10 text-[#ACB5BB] text-xl">
          No completed quests found
        </div>
      ) : (
        <table className="w-full text-left text-xl min-w-[1100px]">
          <thead>
            <tr className="text-[#ACB5BB] text-2xl">
              <th className="py-5 px-4">Quest Title</th>
              <th className="px-4">Enrolled Date</th>
              <th className="px-4">Reward</th>
              <th className="px-4">Status</th>
              <th className="px-4">Claim Status</th>
            </tr>
          </thead>
          <tbody>
            {userQuests.map((userQuest, index) => {
              console.log(`🔍 Processing userQuest ${index}:`, userQuest);
              
              const rewardValue = parseDecimal128ToNumber(userQuest.rewardAmount);
              const formattedReward = formatDecimalForDisplay(rewardValue);
              
              console.log(`💰 UserQuest ${index} reward:`, {
                raw: userQuest.rewardAmount,
                parsed: rewardValue,
                formatted: formattedReward
              });

              return (
                <tr key={userQuest._id || index} className="border-t border-[#23232A] text-white text-xl">
                  <td className="py-6 px-4 flex items-center gap-3">
                    <span className="text-3xl text-[#FFD700]">🏆</span>
                    <span className="font-semibold">
                      {userQuest.questName || "Unknown Quest"}
                    </span>
                  </td>
                  <td className="px-4">
                    {userQuest.date ? formatDate(userQuest.date) : "No date"}
                  </td>
                  <td className="px-4 text-[#9945FF] font-semibold">
                    {formattedReward} SOL
                  </td>
                  <td className="px-4">
                    <span className="font-semibold text-xl text-green-400">
                      Completed
                    </span>
                  </td>
                  <td className="px-4">
                    {userQuest.rewardClaimed ? (
                      <span className="text-green-400 text-xl font-semibold">
                        ✅ Claimed
                      </span>
                    ) : (
                      <ButtonBlack
                        text="Claim Reward"
                        onClick={() => onClaim?.(userQuest)}
                      />
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default CompletedQuestsCard;