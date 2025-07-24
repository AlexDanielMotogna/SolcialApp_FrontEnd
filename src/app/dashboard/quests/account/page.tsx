"use client";

import { useState, useRef, useEffect } from "react";
import ButtonBorder from "@/components/ButtonBorder";
import ButtonBlack from "@/components/ButtonBlack";
import { FiSettings } from "react-icons/fi";

const mockQuests = [
  {
    _id: "1",
    questName: "Social Media Engagement Shiba",
    status: "active",
    published: "Jan 15, 2025",
    participants: 124,
    rewardPool: 1,
  },
  {
    _id: "2",
    questName: "DogeWait Boost",
    status: "active",
    published: "Jan 15, 2025",
    participants: 86,
    rewardPool: 5,
  },
  {
    _id: "3",
    questName: "Make this post go viral",
    status: "active",
    published: "Jan 5, 2025",
    participants: 38,
    rewardPool: 5,
  },
];

const completedQuests = [
  {
    _id: "c1",
    questName: "Social Media Engagement Quest",
    date: "January 20, 2025",
    reward: 25,
    status: "Completed",
    claimed: true,
  },
  {
    _id: "c2",
    questName: "Social Media Engagement Shiba",
    date: "January 19, 2025",
    reward: 1,
    status: "Waiting for completion",
    claimed: false,
  },
  {
    _id: "c3",
    questName: "Make this post go viral",
    date: "January 18, 2025",
    reward: 5,
    status: "Waiting for completion",
    claimed: false,
  },
  {
    _id: "c1b",
    questName: "Social Media Engagement Quest",
    date: "January 20, 2025",
    reward: 25,
    status: "Completed",
    claimed: true,
  },
  {
    _id: "c2b",
    questName: "Social Media Engagement Shiba",
    date: "January 19, 2025",
    reward: 1,
    status: "Waiting for completion",
    claimed: false,
  },
  {
    _id: "c3b",
    questName: "Make this post go viral",
    date: "January 18, 2025",
    reward: 5,
    status: "Waiting for completion",
    claimed: false,
  },
];

const QuestAccount = () => {
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [selectedQuest, setSelectedQuest] = useState<any>(null);
  const [menuOpen, setMenuOpen] = useState<string | null>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  // Cierra el menú al hacer click fuera
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

  const handleCancel = (quest: any) => {
    setSelectedQuest(quest);
    setShowCancelModal(true);
    setMenuOpen(null);
  };

  const confirmCancel = () => {
    // Aquí lógica para cancelar el quest
    setShowCancelModal(false);
    setSelectedQuest(null);
  };

  return (
    <div className="w-full overflow-x-automin-h-[600px] flex flex-col items-center justify-start py-4 px-2">
      {/* Back button */}
      <div className="flex-shrink-0 w-full md:w-auto flex items-center gap-3 justify-start">
        <ButtonBlack text="Back to Quests"  onClick={() => window.history.back()} />
      </div>

      {/* My Created Quests */}
      <h2 className="text-3xl font-bold text-white mb-6 w-full max-w-6xl">My Created Quests</h2>
      <div className="bg-[#18181C] rounded-2xl p-10 mb-28 shadow-lg w-full max-w-6xl min-w-[1100px] overflow-x-auto">
        <table className="w-full text-left text-xl min-w-[1100px]">
          <thead>
            <tr className="text-[#ACB5BB] text-2xl">
              <th className="py-5 px-4">Quest</th>
              <th className="px-4">Status</th>
              <th className="px-4">Published</th>
              <th className="px-4">Participants</th>
              <th className="px-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {mockQuests.map((quest) => (
              <tr key={quest._id} className="border-t border-[#23232A] text-white text-xl">
                <td className="py-6 px-4">{quest.questName}</td>
                <td className="px-4">
                  <span className={`
                    px-4 py-2 rounded text-xl font-semibold
                    ${quest.status === "active" ? "bg-green-600 text-white" : ""}
                    ${quest.status === "completed" ? "bg-blue-600 text-white" : ""}
                    ${quest.status === "canceled" ? "bg-red-600 text-white" : ""}
                  `}>
                    {quest.status.charAt(0).toUpperCase() + quest.status.slice(1)}
                  </span>
                </td>
                <td className="px-4">{quest.published}</td>
                <td className="px-4">{quest.participants}</td>
                <td className="px-4 relative">
                  <button
                    className="p-3 rounded-full hover:bg-[#23232A] transition"
                    onClick={() => setMenuOpen(menuOpen === quest._id ? null : quest._id)}
                  >
                    <FiSettings size={32} />
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
                          // lógica editar
                        }}
                      >
                        Edit Quest
                      </button>
                      <button
                        className="w-full text-left px-6 py-4 hover:bg-[#FF4D4F] hover:text-white transition text-xl"
                        onClick={() => handleCancel(quest)}
                      >
                        Cancel Quest
                      </button>
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Cancel Modal */}
      {showCancelModal && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
          <div className="bg-[#18181C] p-14 rounded-2xl shadow-lg flex flex-col items-center min-w-[400px]">
            <p className="text-white mb-10 text-2xl">Quest will be cancelled, are you sure?</p>
            <div className="flex gap-10">
              <ButtonBorder text="No"  onClick={() => setShowCancelModal(false)} />
              <ButtonBlack text="Yes, Cancel"  onClick={confirmCancel} />
            </div>
          </div>
        </div>
      )}

      {/* Completed Quests */}
      <h2 className="text-3xl font-bold text-white mb-6 w-full max-w-6xl">Completed Quests</h2>
        <div className="bg-[#18181C] rounded-2xl p-10 shadow-lg w-full max-w-6xl min-w-[1100px] overflow-x-auto">
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
              {completedQuests.map((quest) => (
                <tr key={quest._id} className="border-t border-[#23232A] text-white text-xl">
                  <td className="py-6 px-4 flex items-center gap-3">
                    <span className="text-3xl text-[#FFD700]">🏆</span>
                    <span className="font-semibold">{quest.questName}</span>
                  </td>
                  <td className="px-4">{quest.date}</td>
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
                    {quest.claimed ? (
                      <span className="text-[#ACB5BB] text-xl">Claimed</span>
                    ) : (
                      <ButtonBorder
                        text="Claim all Rewards"
                        onClick={() => {
                          // Add your claim logic here
                          console.log(`Claiming rewards for quest: ${quest._id}`);
                        }}
                      />
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
    </div>
  );
};

export default QuestAccount;