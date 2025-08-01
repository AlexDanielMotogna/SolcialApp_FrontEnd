// CREAR: c:\Users\Lian Li\Desktop\FrontEnd_Solcial\solcial\src\components\ui\TaskSelector.tsx

"use client";
import React from "react";

// ============================================================================
// TYPES
// ============================================================================
interface TaskData {
  key: string;
  label: string;
  icon: React.ReactNode;
  description: string;
  color: string;
  hoverColor: string;
  iconBg: string;
  iconColor: string;
}

interface TaskSelectorProps {
  tasks: Record<string, boolean>;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  className?: string;
}

// ============================================================================
// TASK DATA CONFIGURATION
// ============================================================================
export const TASK_CONFIG: TaskData[] = [
  {
    key: "like",
    label: "Like Tweet",
    description: "Participants must like the tweet",
    color: "from-red-500/20 to-pink-500/20 border-red-400/30",
    hoverColor:
      "hover:from-red-500/30 hover:to-pink-500/30 hover:border-red-400/50",
    iconBg: "bg-gradient-to-br from-red-500/20 to-pink-500/20",
    iconColor: "text-red-400",
    icon: (
      <svg viewBox="0 0 24 24" className="w-6 h-6 fill-current">
        <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
      </svg>
    ),
  },
  {
    key: "retweet",
    label: "Retweet",
    description: "Participants must retweet the post",
    color: "from-green-500/20 to-emerald-500/20 border-green-400/30",
    hoverColor:
      "hover:from-green-500/30 hover:to-emerald-500/30 hover:border-green-400/50",
    iconBg: "bg-gradient-to-br from-green-500/20 to-emerald-500/20",
    iconColor: "text-green-400",
    icon: (
      <svg viewBox="0 0 24 24" className="w-6 h-6 fill-current">
        <path d="M23.615 15.477c-.47-.47-1.23-.47-1.697 0l-1.326 1.326V7.4c0-2.178-1.772-3.95-3.95-3.95h-5.2c-.663 0-1.2.538-1.2 1.2s.537 1.2 1.2 1.2h5.2c.854 0 1.55.695 1.55 1.55v9.403l-1.326-1.326c-.47-.47-1.23-.47-1.697 0s-.47 1.23 0 1.697L17.717 19.2c.47.47 1.23.47 1.697 0l2.548-2.548c.472-.47.472-1.23.002-1.697zM.918 8.523c.47.47 1.23.47 1.697 0L4.94 7.197v9.403c0 2.178 1.772 3.95 3.95 3.95h5.2c.663 0 1.2-.538 1.2-1.2s-.537-1.2-1.2-1.2h-5.2c-.854 0-1.55-.695-1.55-1.55V7.197l1.326 1.326c.47.47 1.23.47 1.697 0s.47-1.23 0-1.697L8.815 4.278c-.47-.47-1.23-.47-1.697 0L4.57 6.826c-.472.47-.472 1.23-.002 1.697z" />
      </svg>
    ),
  },
  {
    key: "comment",
    label: "Comment",
    description: "Participants must comment on the tweet",
    color: "from-blue-500/20 to-cyan-500/20 border-blue-400/30",
    hoverColor:
      "hover:from-blue-500/30 hover:to-cyan-500/30 hover:border-blue-400/50",
    iconBg: "bg-gradient-to-br from-blue-500/20 to-cyan-500/20",
    iconColor: "text-blue-400",
    icon: (
      <svg viewBox="0 0 24 24" className="w-6 h-6 fill-current">
        <path d="M20 2H4c-1.1 0-1.99.9-1.99 2L2 22l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zM6 9h12v2H6V9zm8 5H6v-2h8v2zm4-6H6V6h12v2z" />
      </svg>
    ),
  },
  {
    key: "follow",
    label: "Follow",
    description: "Participants must follow the account",
    color: "from-purple-500/20 to-violet-500/20 border-purple-400/30",
    hoverColor:
      "hover:from-purple-500/30 hover:to-violet-500/30 hover:border-purple-400/50",
    iconBg: "bg-gradient-to-br from-purple-500/20 to-violet-500/20",
    iconColor: "text-purple-400",
    icon: (
      <svg viewBox="0 0 24 24" className="w-6 h-6 fill-current">
        <path d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
        <path d="M19 8a3 3 0 100-6 3 3 0 000 6zm0 0v6m-3-3h6" />
      </svg>
    ),
  },
  {
    key: "quote",
    label: "Quote Tweet",
    description: "Participants must quote tweet with their own message",
    color: "from-yellow-500/20 to-orange-500/20 border-yellow-400/30",
    hoverColor:
      "hover:from-yellow-500/30 hover:to-orange-500/30 hover:border-yellow-400/50",
    iconBg: "bg-gradient-to-br from-yellow-500/20 to-orange-500/20",
    iconColor: "text-yellow-400",
    icon: (
      <svg viewBox="0 0 24 24" className="w-6 h-6 fill-current">
        <path d="M6 17h3l2-4V7H5v6h3l-2 4zm8 0h3l2-4V7h-6v6h3l-2 4z" />
      </svg>
    ),
  },
];

// ============================================================================
// TASK COUNTER COMPONENT
// ============================================================================
const TaskCounter: React.FC<{
  selectedCount: number;
  selectedTasks: string[];
}> = ({ selectedCount, selectedTasks }) => (
  <div className="w-full mt-3 p-4 bg-gradient-to-r from-[#1A1A1C] to-[#2C2C30] rounded-xl border border-[#44444A]">
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-3">
        {selectedCount > 0 ? (
          <>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-gradient-to-r from-[#10B981] to-[#34D399] rounded-full animate-pulse shadow-lg shadow-green-500/30" />
              <span className="text-[#10B981] font-semibold text-sm">
                {selectedCount} task{selectedCount !== 1 ? "s" : ""} selected
              </span>
            </div>
            {/* ✅ BADGES DE TASKS SELECCIONADOS */}
            <div className="flex gap-1">
              {selectedTasks.slice(0, 3).map((task) => (
                <span
                  key={task}
                  className="px-2 py-1 bg-[#9945FF]/20 text-[#9945FF] text-xs rounded-md font-medium border border-[#9945FF]/30"
                >
                  {task}
                </span>
              ))}
              {selectedTasks.length > 3 && (
                <span className="px-2 py-1 bg-[#6C7278]/20 text-[#ACB5BB] text-xs rounded-md font-medium">
                  +{selectedTasks.length - 3} more
                </span>
              )}
            </div>
          </>
        ) : (
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-gradient-to-r from-[#EF4444] to-[#F87171] rounded-full animate-pulse shadow-lg shadow-red-500/30" />
            <span className="text-[#EF4444] font-semibold text-sm">
              Please select at least one task
            </span>
          </div>
        )}
      </div>

      <div className="text-[#6C7278] text-sm font-medium">Max: 5 tasks</div>
    </div>
  </div>
);

// ============================================================================
// TASK ITEM COMPONENT
// ============================================================================
const TaskItem: React.FC<{
  task: TaskData;
  isSelected: boolean;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}> = ({ task, isSelected, onChange }) => (
  <label
    className={`
      relative group cursor-pointer 
      bg-gradient-to-r ${task.color} ${task.hoverColor}
      border ${
        isSelected
          ? "border-[#9945FF] shadow-lg shadow-purple-500/25 bg-gradient-to-r from-purple-500/10 to-blue-500/10"
          : "border-[#44444A]"
      }
      rounded-xl p-4 
      transition-all duration-300 
      hover:scale-[1.02] hover:shadow-xl hover:shadow-purple-500/10
      ${isSelected ? "transform scale-[1.01]" : ""}
    `}
  >
    {/* ✅ CHECKBOX OCULTO */}
    <input
      type="checkbox"
      name={task.key}
      checked={isSelected}
      onChange={onChange}
      className="sr-only"
    />

    {/* ✅ CONTENIDO DEL TASK */}
    <div className="flex items-center gap-4">
      {/* ✅ ICONO ÉPICO CON EFECTOS */}
      <div
        className={`
        relative w-14 h-14 rounded-xl ${task.iconBg} 
        flex items-center justify-center
        transform transition-all duration-300 group-hover:scale-110 group-hover:rotate-3
        ${isSelected ? "animate-pulse shadow-lg" : ""}
        border border-white/10
      `}
      >
        {/* ✅ EFECTO DE BRILLO INTERIOR */}
        <div className="absolute inset-0 bg-gradient-to-br from-white/20 via-transparent to-transparent rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        {/* ✅ ICONO */}
        <div className="relative z-10 text-2xl transform transition-transform group-hover:scale-110">
          {task.icon}
        </div>

        {/* ✅ PARTÍCULAS DE EFECTO */}
        {isSelected && (
          <>
            <div className="absolute -top-1 -right-1 w-3 h-3 bg-[#9945FF] rounded-full animate-ping" />
            <div className="absolute -top-1 -right-1 w-3 h-3 bg-[#9945FF] rounded-full" />
          </>
        )}
      </div>

      {/* ✅ TEXTO Y DESCRIPCIÓN */}
      <div className="flex-1">
        <div className="flex items-center gap-2 mb-1">
          <span className="text-[1.4rem] text-white font-semibold group-hover:text-white transition-colors">
            {task.label}
          </span>
          {/* ✅ BADGE DE SELECCIONADO MEJORADO */}
          {isSelected && (
            <span className="px-3 py-1 bg-gradient-to-r from-[#9945FF] to-[#14F195] text-white text-xs rounded-full font-bold animate-fadeIn shadow-lg">
              ✨ Active
            </span>
          )}
        </div>
        <p className="text-[1.2rem] text-[#ACB5BB] group-hover:text-[#EDF1F3] transition-colors">
          {task.description}
        </p>
      </div>

      {/* ✅ CHECKBOX VISUAL ÉPICO */}
      <div
        className={`
        relative w-7 h-7 rounded-lg border-2 flex items-center justify-center transition-all duration-300
        ${
          isSelected
            ? "bg-gradient-to-br from-[#9945FF] to-[#14F195] border-[#9945FF] shadow-lg shadow-purple-500/30"
            : "border-[#6C7278] group-hover:border-[#ACB5BB] bg-transparent"
        }
        transform group-hover:scale-110
      `}
      >
        {isSelected && (
          <>
            {/* ✅ CHECKMARK ÉPICO */}
            <svg
              className="w-4 h-4 text-white animate-checkmark drop-shadow-lg"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              strokeWidth={4}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M5 13l4 4L19 7"
              />
            </svg>
            {/* ✅ GLOW EFFECT */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#9945FF]/50 to-[#14F195]/50 rounded-lg blur-sm -z-10" />
          </>
        )}
      </div>
    </div>

    {/* ✅ EFECTO DE BRILLO ANIMADO */}
    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent opacity-0 group-hover:opacity-100 rounded-xl transition-all duration-500 animate-shimmer pointer-events-none" />

    {/* ✅ BORDE LUMINOSO PARA SELECCIONADOS */}
    {isSelected && (
      <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-[#9945FF]/20 via-[#14F195]/20 to-[#9945FF]/20 animate-pulse pointer-events-none" />
    )}
  </label>
);

// ============================================================================
// MAIN TASK SELECTOR COMPONENT
// ============================================================================
const TaskSelector: React.FC<TaskSelectorProps> = ({
  tasks,
  onChange,
  className = "",
}) => {
  const selectedCount = Object.values(tasks).filter(Boolean).length;
  const selectedTasks = Object.entries(tasks)
    .filter(([_, value]) => value)
    .map(([key, _]) => key);

  return (
    <div
      className={`w-full flex flex-col items-start justify-start gap-2 ${className}`}
    >
      {/* ✅ HEADER ÉPICO */}
      <div className="flex items-center gap-3 mb-2">
        <div className="w-8 h-8 bg-gradient-to-br from-[#9945FF] to-[#14F195] rounded-lg flex items-center justify-center shadow-lg shadow-purple-500/30">
          <span className="text-white text-lg">⚡</span>
        </div>
        <h6 className="text-[1.2rem] text-[#ACB5BB] font-normal">
          Tasks * (Select at least one)
        </h6>
      </div>

      {/* ✅ GRID DE TASKS ÉPICO */}
      <div className="grid grid-cols-1 gap-3 w-full">
        {TASK_CONFIG.map((task) => (
          <TaskItem
            key={task.key}
            task={task}
            isSelected={tasks[task.key] || false}
            onChange={onChange}
          />
        ))}
      </div>

      {/* ✅ CONTADOR ÉPICO */}
      <TaskCounter
        selectedCount={selectedCount}
        selectedTasks={selectedTasks}
      />
    </div>
  );
};

export default TaskSelector;
