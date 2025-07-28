"use client";
import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import PowerShield from "../../../../public/imgs/PowerShield.png";
import Moneybag from "../../../../public/imgs/Moneybag.png";
import ButtonBorder from "../../../components/ButtonBorder";
import QuestModal from "@/components/modals/QuestModal";
import CreateQuest from "@/components/modals/CreateQuest";
import ButtonBlack from "@/components/ButtonBlack";
import QuestCard from "@/components/QuestCard";


const FILTERS = [
  { label: "Active", value: "active" },
  { label: "Completed", value: "completed" },
  { label: "Canceled", value: "canceled" },
  { label: "Oldest", value: "oldest" },
  { label: "Newest", value: "newest" },
  { label: "Biggest Reward", value: "biggest" },
  { label: "Lowest Reward", value: "lowest" },
];

const Quests = () => {
  const [showSessionExpiredModal, setShowSessionExpiredModal] = useState(false);
  const [selectedQuestId, setSelectedQuestId] = useState<string | null>(null);
  const [filter, setFilter] = useState<string>("");
  const [modalType, setModalType] = useState<"CreateQuest" | "QuestModal" | null>(null);
  const [quests, setQuests] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // Handle quest card click to open modal
  const [now, setNow] = useState(new Date());
  useEffect(() => {
    const interval = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  // Fetch quests from the API
  const fetchQuests = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/quests");
      const data = await res.json();
      setQuests(data.quests || []);
    } catch (err) {
      setQuests([]);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchQuests();
  }, []);

  // Filter quests based on the selected filter
  let filteredQuests = [...quests];
  if (filter === "active") filteredQuests = filteredQuests.filter(q => q.status === "active");
  if (filter === "completed") filteredQuests = filteredQuests.filter(q => q.status === "completed");
  if (filter === "canceled") filteredQuests = filteredQuests.filter(q => q.status === "canceled");
  if (filter === "oldest") filteredQuests = filteredQuests.sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());
  if (filter === "newest") filteredQuests = filteredQuests.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  if (filter === "biggest") filteredQuests = filteredQuests.sort((a, b) => b.rewardPool - a.rewardPool);
  if (filter === "lowest") filteredQuests = filteredQuests.sort((a, b) => a.rewardPool - b.rewardPool);

  // Stats (example)
  const questsCompleted = quests.length;
  const rewardEarned = quests.reduce((acc, q) => acc + (q.rewardPool || 0), 0);

  // Modal handlers
  const openModal = (type: "CreateQuest" | "QuestModal") => setModalType(type);
  const closeModal = () => setModalType(null);

  return (
    <div className="w-full px-5 p-[1.6rem] xl:py-[1.8rem] xl:px-[2.4rem] flex flex-col items-start justify-start gap-[2.4rem]">
      <div className="w-full flex flex-col md:flex-row items-center justify-between gap-4 mb-6">
        {/* Left: My Quest Account */}
        <div className="flex-shrink-0 w-full md:w-auto flex items-center gap-3 justify-start">
          <Link href="/dashboard/quests/account">
            <ButtonBlack text="My Account" />
          </Link>
          <ButtonBorder text="Create Quest" onClick={() => openModal("CreateQuest")} />
        </div>
        {/* Center: Filters */}
        <div className="flex-1 flex flex-wrap justify-center gap-2">
          {FILTERS.map(f => (
            <button
              key={f.value}
              onClick={() => setFilter(f.value)}
              className={`px-4 py-2 rounded-lg border font-semibold text-[1.3rem] transition ${
                filter === f.value
                  ? "bg-[#9945FF] text-white border-[#9945FF]"
                  : "bg-[#23232A] text-[#ACB5BB] border-[#2C2C30] hover:bg-[#2C2C30]"
              }`}
            >
              {f.label}
            </button>
          ))}
          {filter && (
            <button
              onClick={() => setFilter("")}
              className="px-4 py-2 rounded-lg border font-semibold text-[1.3rem] bg-[#23232A] text-[#ACB5BB] border-[#2C2C30] hover:bg-[#2C2C30]"
            >
              Clear
            </button>
          )}
        </div>
        {/* Right: Stats */}
        <div className="flex gap-3 flex-shrink-0 mt-4 md:mt-0">
          <div className="w-[140px] xl:w-[170px] flex items-center justify-start gap-3 py-4 xl:py-5 px-3 xl:px-4 bg-[#1E1E20] border border-[#2C2C30] rounded-2xl">
            <Image src={PowerShield} alt="" className="w-[28px] h-[28px] xl:w-[38px] xl:h-[38px]"/>
            <div className="flex flex-col items-start justify-start gap-1">
              <h3 className="text-white font-semibold text-[1.5rem]">{questsCompleted}</h3>
              <span className="text-[1.1rem] text-[#ACB5BB]">Quests completed</span>
            </div>
          </div>
          <div className="w-[140px] xl:w-[170px] flex items-center justify-start gap-3 py-4 xl:py-5 px-3 xl:px-4 bg-[#1E1E20] border border-[#2C2C30] rounded-2xl">
            <Image src={Moneybag} alt="" className="w-[28px] h-[28px] xl:w-[38px] xl:h-[38px]"/>
            <div className="flex flex-col items-start justify-start gap-1">
              <h3 className="text-white font-semibold text-[1.5rem]">{rewardEarned}</h3>
              <span className="text-[1.1rem] text-[#ACB5BB]">Total Rewards</span>
            </div>
          </div>
        </div>
      </div>
      {/* Quest menu ends */}

      <div className="w-full flex-1 overflow-y-auto grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 xl:gap-9" style={{ maxHeight: "70vh" }}>
        {loading ? (
          <div className="col-span-full text-center text-white text-xl">Loading quests...</div>
        ) : filteredQuests.length === 0 ? (
          <div className="col-span-full text-center text-white text-xl">No quests found.</div>
        ) : (
          // Map through filtered quests and render QuestCard components
         filteredQuests.map((quest, idx) => (
          <QuestCard
            key={quest._id || idx}
            quest={quest}
            now={now}
            onOpenModal={() => {
              setSelectedQuestId(quest._id); // <-- Save the selected questId
              openModal("QuestModal");
            }}
          />
        ))
        )}
      </div> 
      {modalType === "QuestModal" && (
        <QuestModal
          isOpen={true}
          questId={selectedQuestId} // <-- pass the selected questId 
          onClose={closeModal}
          onSessionExpired={() => setShowSessionExpiredModal(true)} // <-- Nuevo prop
        />
        
      )}
      {modalType === "CreateQuest" && (
        <CreateQuest isOpen={true} onClose={() => setModalType(null)} refreshQuests={fetchQuests} />
      )}
      {showSessionExpiredModal && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-8 flex flex-col items-center">
            <h2 className="text-red-700 text-xl font-bold mb-4">Session Expired</h2>
            <p className="mb-6 text-gray-800">Your session has expired. Please restart the quest.</p>
            <button
              className="bg-red-700 text-white px-6 py-2 rounded font-semibold"
              onClick={() => {
                setShowSessionExpiredModal(false); // Oculta el modal global
                setModalType(null); // Cierra el QuestModal si está abierto
              }}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Quests;