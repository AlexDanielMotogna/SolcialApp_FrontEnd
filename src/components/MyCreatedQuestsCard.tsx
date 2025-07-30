import { FiSettings } from "react-icons/fi";
import { useRef, useState, useEffect } from "react";
import { formatDate } from "@/utils/questHelpers";
import {
  parseDecimal128ToNumber,
  formatDecimalForDisplay,
} from "@/utils/decimal"; // ✅ IMPORTAR funciones

interface Quest {
  _id: string;
  questName: string;
  status: string;
  startDateTime: string;
  actualParticipants?: number;
  rewardPool?: any; // ✅ CAMBIAR de number a any para manejar Decimal128
  maxParticipants?: number;
}

interface Props {
  quests: Quest[];
  onEdit?: (quest: Quest) => void;
  onCancel?: (quest: Quest) => void;
}

const MyCreatedQuestsCard: React.FC<Props> = ({ quests, onEdit, onCancel }) => {
  const [menuOpen, setMenuOpen] = useState<string | null>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  console.log("Quests recibidos en MyCreatedQuestsCard:", quests);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setMenuOpen(null);
      }
    }
    if (menuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [menuOpen]);

  return (
    <div className="bg-[#18181C] rounded-2xl p-10 mb-28 shadow-lg w-full max-w-6xl min-w-[1300px] overflow-x-auto">
      <table className="w-full text-left text-xl min-w-[1100px]">
        <thead>
          <tr className="text-[#ACB5BB] text-2xl">
            <th className="py-5 px-4">Quest</th>
            <th className="px-4">Status</th>
            <th className="px-4">Start Date</th>
            <th className="px-4">Current Participants</th>
            <th className="px-4">Max Participants</th>
            <th className="px-4">Reward Pool</th>
            <th className="px-4">Actions</th>
          </tr>
        </thead>
        <tbody>
          {quests.map((quest) => {
            // ✅ PARSEAR el rewardPool para cada quest
            const rewardPool = parseDecimal128ToNumber(quest.rewardPool);
            const formattedRewardPool = formatDecimalForDisplay(rewardPool);

            return (
              <tr
                key={quest._id}
                className="border-t border-[#23232A] text-white text-xl"
              >
                <td className="py-6 px-4">{quest.questName}</td>
                <td className="px-4">
                  <span
                    className={`
                      px-4 py-2 rounded text-xl font-semibold
                      ${
                        quest.status === "active"
                          ? "bg-green-600 text-white"
                          : ""
                      }
                      ${
                        quest.status === "finished"
                          ? "bg-blue-600 text-white"
                          : ""
                      }
                      ${
                        quest.status === "canceled"
                          ? "bg-red-600 text-white"
                          : ""
                      }
                      `}
                  >
                    {quest.status.charAt(0).toUpperCase() +
                      quest.status.slice(1)}
                  </span>
                </td>
                <td className="px-4">{formatDate(quest.startDateTime)}</td>
                <td className="px-4">{quest.actualParticipants ?? 0}</td>
                <td className="px-4">{quest.maxParticipants}</td>
                <td className="px-4">{formattedRewardPool} SOL</td>
                <td className="px-4 flex items-center justify-center relative">
                  <button
                    className="p-3 rounded-full hover:bg-[#23232A] transition"
                    onClick={() =>
                      setMenuOpen(menuOpen === quest._id ? null : quest._id)
                    }
                  >
                    <FiSettings size={24} />
                  </button>
                  {menuOpen === quest._id && (
                    <div
                      ref={menuRef}
                      className="absolute right-0 mt-3 w-56 bg-[#23232A] border border-[#44444A] rounded-xl shadow-lg z-20"
                    >
                      <button
                        className="w-full text-left px-6 py-4 hover:bg-[#9945FF] hover:text-white transition text-xl"
                        onClick={() => {
                          setMenuOpen(null);
                          onEdit?.(quest);
                        }}
                      >
                        Edit Quest
                      </button>
                      <button
                        className="w-full text-left px-6 py-4 hover:bg-[#FF4D4F] hover:text-white transition text-xl"
                        onClick={() => {
                          setMenuOpen(null);
                          onCancel?.(quest);
                        }}
                      >
                        Cancel Quest
                      </button>
                    </div>
                  )}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default MyCreatedQuestsCard;
