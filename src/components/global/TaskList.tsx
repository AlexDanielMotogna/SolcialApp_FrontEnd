import { TASK_CONFIG } from "@/components/ui/TaskSelector";



const TaskList = ({ tasks, userQuest }: { tasks: Record<string, boolean>, userQuest?: any }) => {
  // Always show all tasks, indicate visually if completed
  return (
    <div className="w-full flex flex-col items-start justify-start gap-4">
      {Object.entries(tasks).map(([task, completed]) => {
        const config = TASK_CONFIG.find(tc => tc.key.toLowerCase() === task.toLowerCase());
        const isCompleted = !!userQuest && !!completed;
        return (
          <div
            key={task}
            className={`relative group w-full bg-gradient-to-r ${config ? config.color : ''} ${config ? config.hoverColor : ''}
              border ${isCompleted ? 'border-[#10B981] shadow-lg shadow-green-500/25 bg-gradient-to-r from-green-500/10 to-emerald-500/10' : 'border-[#44444A]'}
              rounded-xl p-4 transition-all duration-300
              hover:scale-[1.01] hover:shadow-xl hover:shadow-green-500/10
              ${isCompleted ? 'transform scale-[1.01]' : ''}
              ${!isCompleted && userQuest ? 'opacity-60' : ''}
              select-none
            `}
            style={{ cursor: 'default' }}
          >
            <div className="flex items-center gap-4">
              {/* Icon with effects */}
              <div className={`relative w-14 h-14 rounded-xl ${config ? config.iconBg : 'bg-[#23232A]'} flex items-center justify-center border border-white/10 ${isCompleted ? 'animate-pulse shadow-lg' : ''}`}>
                <div className="absolute inset-0 bg-gradient-to-br from-white/20 via-transparent to-transparent rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="relative z-10 text-2xl">{config ? config.icon : null}</div>
                {isCompleted && (
                  <>
                    <div className="absolute -top-1 -right-1 w-3 h-3 bg-[#10B981] rounded-full animate-ping" />
                    <div className="absolute -top-1 -right-1 w-3 h-3 bg-[#10B981] rounded-full" />
                  </>
                )}
              </div>
              {/* Text and description */}
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-[1.4rem] text-white font-semibold group-hover:text-white transition-colors">{config ? config.label : task}</span>
                  {isCompleted && (
                    <span className="px-3 py-1 bg-gradient-to-r from-[#10B981] to-[#34D399] text-white text-xs rounded-full font-bold animate-fadeIn shadow-lg">✔ Completed</span>
                  )}
                </div>
                <p className="text-[1.2rem] text-[#ACB5BB] group-hover:text-[#EDF1F3] transition-colors">{config ? config.description : ''}</p>
              </div>
              {/* Visual checkmark */}
              <div className={`relative w-7 h-7 rounded-lg border-2 flex items-center justify-center transition-all duration-300
                ${isCompleted ? 'bg-gradient-to-br from-[#10B981] to-[#34D399] border-[#10B981] shadow-lg shadow-green-500/30' : 'border-[#6C7278] group-hover:border-[#ACB5BB] bg-transparent'}
                transform group-hover:scale-110
              `}>
                {isCompleted && (
                  <>
                    <svg className="w-4 h-4 text-white animate-checkmark drop-shadow-lg" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={4}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                    <div className="absolute inset-0 bg-gradient-to-br from-[#10B981]/50 to-[#34D399]/50 rounded-lg blur-sm -z-10" />
                  </>
                )}
              </div>
            </div>
            {/* Animated shimmer and border for completed */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent opacity-0 group-hover:opacity-100 rounded-xl transition-all duration-500 animate-shimmer pointer-events-none" />
            {isCompleted && (
              <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-[#10B981]/20 via-[#34D399]/20 to-[#10B981]/20 animate-pulse pointer-events-none" />
            )}
          </div>
        );
      })}
    </div>
  );
};

export default TaskList;