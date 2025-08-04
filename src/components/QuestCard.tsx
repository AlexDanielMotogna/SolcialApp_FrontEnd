// REEMPLAZAR: c:\Users\Lian Li\Desktop\FrontEnd_Solcial\solcial\src\components\QuestCard.tsx

import { memo } from "react";
import {
  formatLocalDate,
  getEndInColor,
  getTimeLeft,
  getTimeStatus,
} from "@/utils/dateUtils";
import {
  formatDecimalForDisplay,
  parseDecimal128ToNumber,
} from "@/utils/decimal";
import Image from "next/image";
import ButtonBorder from "./ButtonBorder";
import { getOptimizedImageUrl } from "@/utils/cloudinaryClient";

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
  console.log('🔍 Getting image for quest:', quest.questName);
  
  // ✅ PRIORIDAD 1: Usar banner URL directa (ya está optimizada)
  if (quest.banner && quest.banner.includes('cloudinary.com')) {
    console.log('✅ Using direct banner URL:', quest.banner);
    return quest.banner;
  }

  // ✅ PRIORIDAD 2: Intentar generar URL optimizada
  if (quest.bannerPublicId) {
    const optimizedUrl = getOptimizedImageUrl(quest.bannerPublicId);
    if (optimizedUrl !== "/imgs/placeholder.png") {
      console.log('✅ Using optimized URL:', optimizedUrl);
      return optimizedUrl;
    }
  }

  // ✅ FALLBACK: placeholder
  console.log('⚠️ Using placeholder for quest:', quest.questName);
  return "/imgs/placeholder.png";
};

const getActiveTasks = (tasks: any) => {
  return Object.entries(tasks).filter(([, active]) => active);
};

// ✅ NUEVA FUNCIÓN PARA FORMATEAR TIEMPO MÁS LEGIBLE
const formatTimeLeft = (endDateTime: string, now: Date): string => {
  if (!endDateTime) return "--";

  const endTime = new Date(endDateTime);
  const diffMs = endTime.getTime() - now.getTime();

  if (diffMs <= 0) return "Expired";

  const days = Math.floor(diffMs / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diffMs % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));

  if (days > 0) {
    if (days >= 7) {
      const weeks = Math.floor(days / 7);
      const remainingDays = days % 7;
      return remainingDays > 0
        ? `${weeks}w ${remainingDays}d ${hours}h`
        : `${weeks}w ${hours}h`;
    }
    return hours > 0 ? `${days}d ${hours}h` : `${days}d ${minutes}m`;
  }

  if (hours > 0) {
    return minutes > 0 ? `${hours}h ${minutes}m` : `${hours}h`;
  }

  return `${minutes}m`;
};

// ============================================================================
// COMPONENTS
// ============================================================================

const QuestBanner: React.FC<{ quest: any; now: Date }> = ({ quest, now }) => (
  <div className="w-full relative">
    <Image
      src={getQuestImage(quest)}
      alt={quest.questName}
      className="w-full rounded-lg object-cover"
      width={400}
      height={240}
      priority={false}
      placeholder="blur"
      blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k="
     // ✅ AGREGAR MANEJO DE ERRORES
      onError={(e) => {
        console.warn('❌ Image failed to load, using placeholder:', getQuestImage(quest));
        e.currentTarget.src = "/imgs/placeholder.png";
      }}
      // ✅ TIMEOUT MÁS LARGO
      loading="lazy"
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

const QuestHeader: React.FC<{ quest: any; now: Date }> = ({ quest, now }) => {
  const timeStatus = getTimeStatus(quest.endDateTime, now);

  return (
    <div className="w-full flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 sm:gap-1">
      <h4 className="text-white font-semibold text-[1.6rem] sm:text-[1.8rem] lg:text-[2rem] truncate w-full sm:w-auto">
        {quest.questName}
      </h4>

      {/* ✅ TIEMPO MEJORADO Y MÁS LEGIBLE */}
      <div
        className="flex flex-col sm:flex-row items-center justify-center px-3 sm:px-4 py-2 sm:py-1 rounded-xl border shadow-inner ml-0 sm:ml-4 mt-2 sm:mt-0 w-full sm:w-auto bg-[#18181b] border-[#23232A] text-center"
        style={{
          minWidth: "140px",
          color: timeStatus.colorValue,
        }}
      >
        <span className="font-semibold text-sm sm:text-base lg:text-lg mb-1 sm:mb-0 sm:mr-2">
          ⏰ Ends in:
        </span>
        <span className="font-mono text-base sm:text-lg lg:text-xl xl:text-xl font-bold">
          {formatTimeLeft(quest.endDateTime, now)}
        </span>
      </div>
    </div>
  );
};

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

// ✅ NUEVA BARRA DE PROGRESO ANIMADA PARA PARTICIPANTS
const ParticipantsProgressBar: React.FC<{ quest: any }> = ({ quest }) => {
  const actualParticipants = quest.actualParticipants ?? 0;
  const maxParticipants = quest.maxParticipants ?? 1;
  const progressPercentage = Math.min(
    (actualParticipants / maxParticipants) * 100,
    100
  );

  // Colores dinámicos basados en el progreso
  const getProgressColor = () => {
    if (progressPercentage >= 90) return "bg-red-500";
    if (progressPercentage >= 70) return "bg-yellow-500";
    if (progressPercentage >= 40) return "bg-blue-500";
    return "bg-green-500";
  };

  return (
    <div className="flex flex-col gap-2 min-w-[160px]">
      {/* Números de participantes */}
      <div className="flex items-center justify-between text-xm">
        <span className="text-[#ACB5BB] font-medium">Participants</span>
        <span className="text-white font-semibold">
          {actualParticipants}/{maxParticipants}
        </span>
      </div>

      {/* Barra de progreso */}
      <div className="w-full bg-[#23232A] rounded-full h-2.5 overflow-hidden">
        <div
          className={`h-full rounded-full transition-all duration-1000 ease-out ${getProgressColor()}`}
          style={{
            width: `${progressPercentage}%`,
            background:
              progressPercentage >= 90
                ? "linear-gradient(90deg, #ef4444, #dc2626)"
                : progressPercentage >= 70
                ? "linear-gradient(90deg, #eab308, #ca8a04)"
                : progressPercentage >= 40
                ? "linear-gradient(90deg, #3b82f6, #2563eb)"
                : "linear-gradient(90deg, #10b981, #059669)",
          }}
        />
      </div>

      {/* Porcentaje */}
      <div className="text-right">
        <span
          className={`text-xm font-bold ${
            progressPercentage >= 90
              ? "text-red-400"
              : progressPercentage >= 70
              ? "text-yellow-400"
              : progressPercentage >= 40
              ? "text-blue-400"
              : "text-green-400"
          }`}
        >
          {actualParticipants} / {maxParticipants} (
          {progressPercentage.toFixed(1)}%)
        </span>
      </div>
    </div>
  );
};

const TasksAndParticipants: React.FC<{ quest: any }> = ({ quest }) => (
  <div className="w-full flex items-center justify-between mt-2 gap-4">
    <TasksList tasks={quest.tasks} />
    <ParticipantsProgressBar quest={quest} />
  </div>
);

const RewardInfo: React.FC<{ quest: any }> = ({ quest }) => {
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

const QuestCard: React.FC<QuestCardProps> = memo(({
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
});

QuestCard.displayName = 'QuestCard';

export default QuestCard;
