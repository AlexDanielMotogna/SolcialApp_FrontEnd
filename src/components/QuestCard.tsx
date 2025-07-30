import Image from "next/image";
import ButtonBorder from "./ButtonBorder";
import { formatLocalDate, getTimeLeft, getEndInColor } from "@/utils/dateUtils";
import { parseDecimal128ToNumber, formatDecimalForDisplay } from "@/utils/decimal";


// ============================================================================
// TYPES
// ============================================================================

interface QuestCardProps {
  quest: any;
  user: any;
  userQuest: any;
  now: Date;
  onOpenModal: () => void;
  buttonText: string;
  buttonDisabled: boolean;
}

// ============================================================================
// UTILS
// ============================================================================

const getStatusBadgeStyles = (status: string) => {
  const baseStyles =
    "absolute top-4 left-4 px-3 py-1 rounded font-semibold z-10";
  const statusStyles = {
    active: "bg-green-600 text-white",
    completed: "bg-blue-600 text-white",
    canceled: "bg-red-600 text-white",
    finished: "bg-yellow-500 text-black",
  };

  return `${baseStyles} ${
    statusStyles[status as keyof typeof statusStyles] ||
    "bg-gray-600 text-white"
  }`;
};

const getQuestImage = (quest: any) => {
  return quest.banner && quest.banner !== ""
    ? quest.banner
    : "/imgs/placeholder.png";
};

const getActiveTasks = (tasks: any) => {
  return Object.entries(tasks).filter(([, active]) => active);
};

// ============================================================================
// COMPONENTS
// ============================================================================

const QuestBanner: React.FC<{ quest: any; now: Date }> = ({ quest, now }) => (
  <div className="w-full relative">
    <Image
      src={getQuestImage(quest)}
      alt={quest.questName}
      className="w-full rounded-lg"
      width={400}
      height={200}
    />

    {/* Status Badge */}
    <span
      className={getStatusBadgeStyles(quest.status)}
      style={{ minWidth: "80px", textAlign: "center" }}
    >
      {quest.status}
    </span>

    {/* Start Date Badge */}
    <span
      className="absolute top-4 right-4 px-3 py-1 rounded bg-[#2C2C30] text-white font-semibold z-10 border border-[#23232A]"
      style={{ minWidth: "80px", textAlign: "center" }}
    >
      {quest.startDateTime ? formatLocalDate(quest.startDateTime) : ""}
    </span>
  </div>
);

const QuestHeader: React.FC<{ quest: any; now: Date }> = ({ quest, now }) => (
  <div className="w-full flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 sm:gap-1">
    <h4 className="text-white font-semibold text-[1.6rem] sm:text-[1.8rem] lg:text-[2rem] truncate w-full sm:w-auto">
      {quest.questName}
    </h4>

    {/* End Time Countdown */}
    <div
      className={`
        flex flex-col sm:flex-row items-center justify-center px-3 sm:px-4 py-2 sm:py-1 rounded-xl border shadow-inner ml-0 sm:ml-4 mt-2 sm:mt-0 w-full sm:w-auto
        ${getEndInColor(quest.endDateTime, now)} 
        bg-[#18181b] border-[#23232A] text-center
      `}
      style={{ minWidth: "120px" }}
    >
      <span className="font-semibold text-sm sm:text-base lg:text-lg mb-1 sm:mb-0 sm:mr-2">
        ⏰ End in:
      </span>
      <span className="font-mono text-base sm:text-lg lg:text-xl xl:text-xl font-bold">
        {quest.endDateTime ? getTimeLeft(quest.endDateTime, now) : "--"}
      </span>
    </div>
  </div>
);

const TasksList: React.FC<{ tasks: any }> = ({ tasks }) => {
  const activeTasks = getActiveTasks(tasks);

  return (
    <div className="flex flex-wrap gap-2">
      {activeTasks.map(([task]) => (
        <span
          key={task}
          className="px-2 py-1 bg-[#9945FF] text-white rounded text-sm font-medium"
        >
          {task}
        </span>
      ))}
    </div>
  );
};

const ParticipantsInfo: React.FC<{ quest: any }> = ({ quest }) => (
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
);

const TasksAndParticipants: React.FC<{ quest: any }> = ({ quest }) => (
  <div className="w-full flex items-center justify-between mt-2">
    <TasksList tasks={quest.tasks} />
    <ParticipantsInfo quest={quest} />
  </div>
);

const RewardInfo: React.FC<{ quest: any }> = ({ quest }) => {
  // ✅ PARSEAR el valor Decimal128 antes de renderizar
  const rewardPerTask = parseDecimal128ToNumber(quest.rewardPerTask);
  const formattedReward = formatDecimalForDisplay(rewardPerTask);
  
  return (
    <h4 className="text-[#EDF1F3] font-semibold text-[1.8rem] mt-2">
      {formattedReward} <span className="text-[#9945FF]">SOL</span>
    </h4>
  );
};

const QuestAction: React.FC<{
  buttonText: string;
  buttonDisabled: boolean;
  onOpenModal: () => void;
}> = ({ buttonText, buttonDisabled, onOpenModal }) => (
  <div className="w-full">
    <ButtonBorder
      text={buttonText}
      disabled={buttonDisabled}
      onClick={onOpenModal}
    />
  </div>
);

// ============================================================================
// MAIN COMPONENT
// ============================================================================

const QuestCard: React.FC<QuestCardProps> = ({
  quest,
  user,
  userQuest,
  now,
  onOpenModal,
  buttonText,
  buttonDisabled,
}) => {
  return (
    <div className="w-full p-[1.6rem] flex flex-col items-start justify-start xl:justify-between gap-4 bg-[#1E1E20] border border-[#2C2C30] rounded-2xl hover:border-[#44444A] transition-colors duration-200">
      {/* Quest Banner with Status and Date */}
      <QuestBanner quest={quest} now={now} />

      {/* Quest Name and End Time */}
      <QuestHeader quest={quest} now={now} />

      {/* Tasks and Participants Info */}
      <TasksAndParticipants quest={quest} />

      {/* Reward Information */}
      <RewardInfo quest={quest} />

      {/* Action Button */}
      <QuestAction
        buttonText={buttonText}
        buttonDisabled={buttonDisabled}
        onOpenModal={onOpenModal}
      />
    </div>
  );
};

export default QuestCard;
