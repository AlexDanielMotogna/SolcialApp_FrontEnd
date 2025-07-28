import ButtonBorder from "@/components/ButtonBorder";
import ButtonBlack from "./ButtonBlack";
import { formatDate } from "@/utils/questHelpers";

interface CompletedQuest {
  rewardClaimed: any;
  _id: string;
  questName: string;
  date: string;
  reward: number;
  status: string;
  claimed: boolean;
}

interface Props {
  quests: CompletedQuest[];
  onClaim?: (quest: CompletedQuest) => void;
}

const CompletedQuestsCard: React.FC<Props> = ({ quests, onClaim }) => (
  <div className="bg-[#18181C] rounded-2xl p-10 shadow-lg w-full max-w-6xl min-w-[1300px] overflow-x-auto">
    <table className="w-full text-left text-xl min-w-[1100px]">
      <thead>
        <tr className="text-[#ACB5BB] text-2xl">
          <th className="py-5 px-4">Quest Title</th>
          <th className="px-4">End Date</th>
          <th className="px-4">Reward</th>
          <th className="px-4">Quest Status</th>
          <th className="px-4">Claim Status</th>
        </tr>
      </thead>
      <tbody>
        {quests.map((quest) => (
          <tr key={quest._id} className="border-t border-[#23232A] text-white text-xl">
            <td className="py-6 px-4 flex items-center gap-3">
              <span className="text-3xl text-[#FFD700]">🏆</span>
              <span className="font-semibold">{quest.questName}</span>
            </td>
            <td className="px-4">{formatDate(quest.date)}</td>
            <td className="px-4 text-[#9945FF] font-semibold">{quest.reward} SOL</td>
            <td className="px-4">
              <span className={`
                font-semibold text-xl
                ${quest.status === "Completed" ? "text-green-400" : "text-[#ACB5BB]"}
              `}>
                {quest.status}
              </span>
            </td>
            <td className="px-4">
              {quest.rewardClaimed ? (
                <span className="text-[#ACB5BB] text-xl">Reward claimed</span>
              ) : (
                <ButtonBlack
                  text="Claim Reward"
                  onClick={() => onClaim?.(quest)}
                />
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

export default CompletedQuestsCard;