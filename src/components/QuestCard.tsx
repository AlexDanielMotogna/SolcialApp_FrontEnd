// REEMPLAZAR: c:\Users\Lian Li\Desktop\FrontEnd_Solcial\solcial\src\components\QuestCard.tsx

import { memo } from "react";
import { Heart, Repeat2, UserPlus, Feather, Twitter, MessageCircle, MessageSquareQuote } from "lucide-react";
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
  
  // Normalize status to lowercase for comparison
  const normalizedStatus = status?.toLowerCase();
  
  const statusStyles = {
    active: "bg-green-600 text-white",
    canceled: "bg-red-600 text-white",
    cancelled: "bg-red-600 text-white", // Alternative spelling
    finished: "bg-yellow-500 text-black",
  };

  return `${baseStyles} ${
    statusStyles[normalizedStatus as keyof typeof statusStyles] ||
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

const QuestBanner: React.FC<{ quest: any; now: Date }> = ({ quest, now }) => {
  const imageUrl = getQuestImage(quest);
  const isPlaceholder = imageUrl === "/imgs/placeholder.png";
  
  // ✅ CHECK CANCELED STATUS FIRST - before checking expiration
  const isCanceled = quest.status?.toLowerCase() === 'canceled' || quest.status?.toLowerCase() === 'cancelled';
  
  const timeLeft = formatTimeLeft(quest.endDateTime, now);
  const isExpired = !isCanceled && timeLeft === "Expired"; // Only expired if not canceled
  const timeStatus = getTimeStatus(quest.endDateTime, now);
  const isUrgent = !isCanceled && timeStatus.colorValue === "#ef4444"; // Only urgent if not canceled

  // Debug: Log the actual status from DB
  console.log('🔍 Quest status from DB:', {
    questName: quest.questName,
    status: quest.status,
    statusType: typeof quest.status,
    isCanceled,
    isExpired,
    timeLeft
  });

  // Modern status badge design for all states
  const getStatusDesign = () => {
    if (isCanceled) {
      return {
        bg: 'bg-red-600/90', // Much more opaque background
        border: 'border-red-500/80', // Stronger border
        dot: 'bg-red-100',
        text: 'text-white', // Pure white text for maximum contrast
        label: 'Canceled'
      };
    }
    
    if (isExpired) {
      return {
        bg: 'bg-yellow-600/90', // Much more opaque background
        border: 'border-yellow-500/80', // Stronger border
        dot: 'bg-yellow-100',
        text: 'text-white', // Pure white text for maximum contrast
        label: 'Finished'
      };
    }

    // Check for finished status from DB
    if (quest.status?.toLowerCase() === 'finished') {
      return {
        bg: 'bg-yellow-600/90', // Much more opaque background
        border: 'border-yellow-500/80', // Stronger border
        dot: 'bg-yellow-100',
        text: 'text-white', // Pure white text for maximum contrast
        label: 'Finished'
      };
    }
    
    // Default: Active
    return {
      bg: isUrgent ? 'bg-red-600/90' : 'bg-green-600/90', // Much more opaque background
      border: isUrgent ? 'border-red-500/80' : 'border-green-500/80', // Stronger border
      dot: isUrgent ? 'bg-red-100 animate-pulse' : 'bg-green-100',
      text: 'text-white', // Pure white text for maximum contrast
      label: quest.status || 'Active'
    };
  };

  const statusDesign = getStatusDesign();

  return (
    <div className="w-full relative">
      {isPlaceholder ? (
        // ✅ CUSTOM PLACEHOLDER WITH MATCHING DESIGN
        <div 
          className="w-full h-[240px] rounded-lg bg-gradient-to-br from-[#2C2C30] via-[#1E1E20] to-[#161618] border border-[#44444A] flex items-center justify-center"
          style={{ aspectRatio: '400/240' }}
        >
          <div className="text-center">
            <div className="w-16 h-16 mx-auto mb-3 bg-[#44444A] rounded-full flex items-center justify-center">
              <svg className="w-8 h-8 text-[#ACB5BB]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
            <p className="text-[#ACB5BB] text-lg font-medium">Quest Image</p>
            <p className="text-[#6C7278] text-xs mt-1">No banner available</p>
          </div>
        </div>
      ) : (
        // ✅ REGULAR IMAGE WITH ERROR FALLBACK
        <Image
          src={imageUrl}
          alt={quest.questName}
          className="w-full h-[240px] rounded-lg object-cover"
          width={400}
          height={240}
          priority={false}
          placeholder="blur"
          blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k="
          onError={(e) => {
            console.warn('❌ Image failed to load, showing fallback placeholder');
            // Create a fallback placeholder element
            const placeholder = document.createElement('div');
            placeholder.className = 'w-full h-[240px] rounded-lg bg-gradient-to-br from-[#2C2C30] via-[#1E1E20] to-[#161618] border border-[#44444A] flex items-center justify-center';
            placeholder.innerHTML = `
              <div class="text-center">
                <div class="w-16 h-16 mx-auto mb-3 bg-[#44444A] rounded-full flex items-center justify-center">
                  <svg class="w-8 h-8 text-[#ACB5BB]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
                <p class="text-[#ACB5BB] text-lg font-medium">Quest Image</p>
                <p class="text-[#6C7278] text-xs mt-1">Failed to load</p>
              </div>
            `;
            e.currentTarget.parentNode?.replaceChild(placeholder, e.currentTarget);
          }}
          loading="lazy"
        />
      )}

      {/* ✅ MODERN STATUS BADGE - GLASSMORPHISM FOR ALL STATES */}
      <div 
        className={`
          absolute top-2 left-2 sm:top-4 sm:left-4 px-2 py-1 sm:px-3 sm:py-2 rounded-lg sm:rounded-xl border backdrop-blur-sm transition-all duration-300 z-10
          ${statusDesign.bg} ${statusDesign.border}
        `}
      >
        <div className="flex items-center gap-1 sm:gap-2">
          <div className={`w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full ${statusDesign.dot}`} />
          <span className={`text-sm sm:text-lg font-bold ${statusDesign.text} capitalize`}>
            {statusDesign.label}
          </span>
        </div>
      </div>

      {/* Timer Display - Top Right */}
      <div 
        className={`
          absolute top-2 right-2 sm:top-4 sm:right-4 px-2 py-1 sm:px-3 sm:py-2 rounded-lg sm:rounded-xl border backdrop-blur-sm transition-all duration-300 z-10
          ${isCanceled 
            ? 'bg-red-600/90 border-red-500/80'
            : isExpired
            ? 'bg-gray-600/90 border-gray-500/80'
            : isUrgent 
            ? 'bg-red-600/90 border-red-500/80' 
            : 'bg-blue-600/90 border-blue-500/80'
          }
        `}
      >
        <div className="flex items-center gap-1 sm:gap-2">
          <svg 
            className={`w-2.5 h-2.5 sm:w-3 sm:h-3 text-white`} 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" 
            />
          </svg>
          <div className="flex flex-col">
            <span className="text-xs leading-none text-white hidden sm:block">
              Ends in
            </span>
            <span 
              className={`font-mono text-base sm:text-base font-bold leading-none text-white`}
            >
              {isCanceled ? '--:--' : isExpired ? 'Expired' : timeLeft}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

const QuestHeader: React.FC<{ quest: any; now: Date }> = ({ quest, now }) => {
  // ✅ CHECK CANCELED STATUS FIRST
  const isCanceled = quest.status?.toLowerCase() === 'canceled' || quest.status?.toLowerCase() === 'cancelled';
  
  const timeStatus = getTimeStatus(quest.endDateTime, now);
  const timeLeft = formatTimeLeft(quest.endDateTime, now);
 /*  const isExpired = !isCanceled && timeLeft === "Expired"; // Only expired if not canceled
  const isUrgent = !isCanceled && timeStatus.colorValue === "#ef4444"; // Only urgent if not canceled */

  return (
    <div className="w-full flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 sm:gap-3 lg:gap-4">
      <h4 className="text-white font-semibold text-lg sm:text-xl md:text-[1.6rem] lg:text-[1.8rem] xl:text-[2rem] truncate w-full sm:w-auto">
        {quest.questName}
      </h4>

      {/* Start Date of the Quest*/}
      <div className="px-3 py-1.5 sm:px-4 sm:py-2 rounded-lg sm:rounded-xl bg-purple-500/10 border border-purple-400/30 backdrop-blur-sm transition-all duration-300 shrink-0">
        <div className="flex items-center gap-1.5 sm:gap-2">
          <svg 
            className="w-3 h-3 sm:w-4 sm:h-4 text-purple-400" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" 
            />
          </svg>
          <div className="flex flex-col">
            <span className="text-xs leading-none text-[#ACB5BB] hidden sm:block">Start Date</span>
            <span className="font-mono text-sm sm:text-lg font-bold leading-none text-purple-300">
              {quest.startDateTime ? formatLocalDate(quest.startDateTime) : "--"}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

// Map task names to Lucide icons
const getTaskIcon = (task: string) => {
  const t = task.toLowerCase();
  if (t.includes('like')) {
    return <Heart className="w-4 h-4 sm:w-5 sm:h-5 text-pink-400" fill="currentColor" strokeWidth={2} />;
  }
  if (t.includes('retweet')) {
    return <Repeat2 className="w-4 h-4 sm:w-5 sm:h-5 text-green-400" strokeWidth={2} />;
  }
  if (t.includes('follow')) {
    return <UserPlus className="w-4 h-4 sm:w-5 sm:h-5 text-blue-300" strokeWidth={2} />;
  }
  if (t.includes('tweet') || t.includes('post')) {
    return <Feather className="w-4 h-4 sm:w-5 sm:h-5 text-cyan-300" strokeWidth={2} />;
  }
  if (t.includes('comment')) {
    return <MessageCircle className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-300" strokeWidth={2} />;
  }
  if (t.includes('quote')) {
    return <MessageSquareQuote className="w-4 h-4 sm:w-5 sm:h-5 text-purple-300" strokeWidth={2} />;
  }
  // Default: Twitter icon for unknown types only
  return <Twitter className="w-4 h-4 sm:w-5 sm:h-5 text-white" strokeWidth={2} />;
};

const TasksList: React.FC<{ tasks: any }> = ({ tasks }) => {
  const activeTasks = getActiveTasks(tasks);

  return (
    <div className="flex flex-wrap gap-1.5 sm:gap-2">
      {activeTasks.map(([task]) => (
        <span
          key={task}
          className="group flex items-center gap-1 px-2.5 py-1 sm:px-3 sm:py-1.5 bg-white/10 border border-white/20 text-white rounded-lg sm:rounded-xl text-sm sm:text-base font-medium whitespace-nowrap backdrop-blur-md shadow-md transition-all duration-300 hover:bg-white/20 hover:border-white/30 hover:scale-105 relative"
        >
          {getTaskIcon(task)}
          {/* Tooltip on hover */}
          <span className="absolute left-1/2 -translate-x-1/2 top-full mt-2 px-3 py-2 rounded bg-black text-base sm:text-base text-white font-semibold opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity whitespace-nowrap z-20 shadow-lg">
            {task}
          </span>
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
    <div className="flex flex-col gap-2 min-w-[140px] sm:min-w-[160px] w-full lg:w-auto">
      {/* Números de participantes */}
      <div className="flex items-center justify-between text-sm sm:text-base">
        <span className="text-[#ACB5BB] font-medium">Participants</span>
        <span className="text-white font-semibold">
          {actualParticipants}/{maxParticipants}
        </span>
      </div>

      {/* Barra de progreso */}
      <div className="w-full bg-[#23232A] rounded-full h-2 sm:h-2.5 overflow-hidden">
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
          className={`text-xs sm:text-sm font-bold ${
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
  <div className="w-full flex flex-col lg:flex-row items-start lg:items-center justify-between gap-3 lg:gap-4">
    <TasksList tasks={quest.tasks} />
    <ParticipantsProgressBar quest={quest} />
  </div>
);

const RewardInfo: React.FC<{ quest: any }> = ({ quest }) => {
  const rewardPerTask = parseDecimal128ToNumber(quest.rewardPerTask);
  const formattedReward = formatDecimalForDisplay(rewardPerTask);

  return (
    <h4 className="text-[#EDF1F3] font-semibold text-xl sm:text-2xl lg:text-[1.8rem] mt-2 flex items-center gap-2">
      {formattedReward}
      <span className="inline-flex items-center">
        <img
          src="/icons/SolanaIconReward.png"
          alt="Solana"
          className="w-6 h-6 sm:w-10 sm:h-10 object-contain ml-1"
          style={{ display: 'inline-block', verticalAlign: 'middle' }}
        />
      </span>
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
    <div className="w-full p-4 sm:p-6 lg:p-[1.6rem] flex flex-col items-start justify-start xl:justify-between gap-3 sm:gap-4 bg-[#1E1E20] border border-[#2C2C30] rounded-xl sm:rounded-2xl hover:border-[#44444A] transition-colors duration-200">
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
