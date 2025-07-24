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
  const [filter, setFilter] = useState<string>("");
  const [modalType, setModalType] = useState<"CreateQuest" | "QuestModal" | null>(null);
  const [quests, setQuests] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

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
  const questsCompleted = quests.length; // Total number of quests create
  const rewardEarned = quests.reduce((acc, q) => acc + (q.rewardPool || 0), 0);

  // Modal handlers
  const openModal = (type: "CreateQuest" | "QuestModal") => setModalType(type);
  const closeModal = () => setModalType(null);

{/* Quest menu starts */}
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
              <span className="text-[1.1rem] text-[#ACB5BB]">Quests Created</span>
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
          filteredQuests.map((quest, idx) => (
          <div
            key={quest._id || idx}
            className="w-full p-[1.6rem] flex flex-col items-start justify-start xl:justify-between gap-4 bg-[#1E1E20] border border-[#2C2C30] rounded-2xl"
          >
            <div className="w-full relative">
              <Image
                src={quest.banner && quest.banner !== "" ? quest.banner : "/imgs/placeholder.png"}
                alt={quest.questName}
                className="w-full"
                width={400}
                height={200}
              />
              {/* Status badge left top corner */}
              <span
                className={`
                  absolute top-4 left-4 px-3 py-1 rounded  font-semibold z-10
                  ${quest.status === "active" ? "bg-green-600 text-white" : ""}
                  ${quest.status === "completed" ? "bg-blue-600 text-white" : ""}
                  ${quest.status === "canceled" ? "bg-red-600 text-white" : ""}
                  ${quest.status === "available" ? "bg-yellow-500 text-black" : ""}
                `}
                style={{ minWidth: "80px", textAlign: "center" }}
              >
                {quest.status}
              </span>
              {/* Start date right top corner */}
              <span
                className="absolute top-4 right-4 px-3 py-1 rounded bg-[#2C2C30] text-white  font-semibold z-10 border border-[#23232A]"
                style={{ minWidth: "80px", textAlign: "center" }}
              >
                {quest.startDate}{quest.startTime ? ` at ${quest.startTime}` : ""}
                </span>
            </div>
            {/* Description */}
            <div className="w-full flex flex-col items-start justify-start gap-1">
              <h4 className="text-white font-semibold text-[1.8rem]">
                {quest.questName}
              </h4>
              <p
                className="text-[#ACB5BB] text-[1.4rem] max-h-[72px] overflow-y-auto break-words pr-2"
                style={{ scrollbarWidth: "thin" }}
              >
                {quest.description}
              </p>
            </div>
            {/* Tasks y Max Participants en la misma fila */}
            <div className="w-full flex items-center justify-between mt-2">
              <div className="flex flex-wrap gap-2">
                {Object.entries(quest.tasks).map(([task, active]) =>
                  active ? (
                    <span key={task} className="px-2 py-1 bg-[#9945FF] text-white rounded">{task}</span>
                  ) : null
                )}
              </div>
              <div>
                <span className="text-[#ACB5BB] text-[1.3rem] font-semibold">
                  Max Participants: {quest.maxParticipants}
                </span>
              </div>
            </div>
            <h4 className="text-[#EDF1F3] font-semibold text-[1.8rem] mt-2">
              {quest.rewardPerTask} <span className="text-[#9945FF]">SOL</span>
            </h4>
            <div className="w-full" onClick={() => openModal("QuestModal")}>
              <ButtonBorder text="View Quest" />
            </div>
          </div>
          ))
        )}
      </div>
      {modalType === "QuestModal" && <QuestModal isOpen={true} onClose={closeModal} />}
       {modalType === "CreateQuest" && (
        <CreateQuest isOpen={true} onClose={() => setModalType(null)} refreshQuests={fetchQuests} />
      )}
    </div>
  );
};
export default Quests;