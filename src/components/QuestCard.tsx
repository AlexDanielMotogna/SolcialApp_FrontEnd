import Image from "next/image";
import ButtonBorder from "./ButtonBorder";
import { formatLocalDate, getTimeLeft, getEndInColor } from "@/utils/dateUtils";

interface QuestCardProps {
  quest: any;
  now: Date;
  onOpenModal: () => void;
}

const QuestCard: React.FC<QuestCardProps> = ({ quest, now, onOpenModal }) => (
  <div className="w-full p-[1.6rem] flex flex-col items-start justify-start xl:justify-between gap-4 bg-[#1E1E20] border border-[#2C2C30] rounded-2xl">
    <div className="w-full relative">
      <Image
        src={
          quest.banner && quest.banner !== ""
            ? quest.banner
            : "/imgs/placeholder.png"
        }
        alt={quest.questName}
        className="w-full"
        width={400}
        height={200}
      />
      {/* Status badge left top corner */}
      <span
        className={`
          absolute top-4 left-4 px-3 py-1 rounded font-semibold z-10
          ${quest.status === "active" ? "bg-green-600 text-white" : ""}
          ${quest.status === "completed" ? "bg-blue-600 text-white" : ""}
          ${quest.status === "canceled" ? "bg-red-600 text-white" : ""}
          ${quest.status === "finished" ? "bg-yellow-500 text-black" : ""}
        `}
        style={{ minWidth: "80px", textAlign: "center" }}
      >
        {quest.status}
      </span>
      {/* Start date right top corner */}
      <span
        className="absolute top-4 right-4 px-3 py-1 rounded bg-[#2C2C30] text-white font-semibold z-10 border border-[#23232A]"
        style={{ minWidth: "80px", textAlign: "center" }}
      >
        {quest.startDateTime ? formatLocalDate(quest.startDateTime) : ""}
      </span>
    </div>
    {/* Description and End in */}
    <div className="w-full flex flex-row items-center justify-between gap-1">
      <h4 className="text-white font-semibold text-[1.8rem]">
        {quest.questName}
      </h4>
      <div
        className={`
    flex items-center px-4 py-1 rounded-xl border shadow-inner ml-4 text-xl
    ${getEndInColor(quest.endDateTime, now)} 
    bg-[#18181b] border-[#23232A]
  `}
        style={{ minWidth: "150px", textAlign: "center" }}
      >
        <span className="font-semibold mr-2">⏰ End in:</span>
        <span className="font-mono">
          {quest.endDateTime ? getTimeLeft(quest.endDateTime, now) : "--"}
        </span>
      </div>
    </div>
    {/* Tasks and Participants */}
    <div className="w-full flex items-center justify-between mt-2">
      <div className="flex flex-wrap gap-2">
        {Object.entries(quest.tasks).map(([task, active]) =>
          active ? (
            <span
              key={task}
              className="px-2 py-1 bg-[#9945FF] text-white rounded"
            >
              {task}
            </span>
          ) : null
        )}
      </div>
      <div className="flex items-center gap-2">
        <span className="text-[#ACB5BB] text-[1.3rem] font-semibold">
          Participants:
        </span>
        <span className="bg-[#23232A] text-[#FFD600] font-bold px-3 py-1 rounded-lg text-[1.3rem]">
          {quest.actualParticipants ?? 0}
        </span>
        <span className="text-[#ACB5BB] text-[1.3rem] font-semibold">/</span>
        <span className="bg-[#23232A] text-green-400 font-bold px-3 py-1 rounded-lg text-[1.3rem]">
          {quest.maxParticipants}
        </span>
      </div>
    </div>
    <h4 className="text-[#EDF1F3] font-semibold text-[1.8rem] mt-2">
      {quest.rewardPerTask} <span className="text-[#9945FF]">SOL</span>
    </h4>
    <div
      className="w-full"
      onClick={quest.status === "finished" ? undefined : onOpenModal}
    >
      <ButtonBorder
        text={quest.status === "finished" ? "Quest Finished" : "View Quest"}
        disabled={quest.status === "finished"}
      />
    </div>
  </div>
);

export default QuestCard;
