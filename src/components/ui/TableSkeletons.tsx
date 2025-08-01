// CREAR: c:\Users\Lian Li\Desktop\FrontEnd_Solcial\solcial\src\components\ui\TableSkeletons.tsx

"use client";
import React from 'react';

// ============================================================================
// SKELETON PARA CREATED QUESTS TABLE
// ============================================================================
export const CreatedQuestsTableSkeleton: React.FC<{ rows?: number }> = ({ rows = 5 }) => {
  return (
    <div className="w-full max-w-6xl mx-auto bg-[#1E1E20] border border-[#2C2C30] rounded-2xl overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#2C2C30] to-[#44444A] p-6">
        <div className="h-8 bg-gradient-to-r from-[#44444A] to-[#6C7278] rounded w-64 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent animate-shimmer" />
        </div>
      </div>

      {/* Table Header */}
      <div className="grid grid-cols-7 gap-4 p-4 border-b border-[#2C2C30] bg-[#18181C]">
        {['Quest', 'Status', 'Start Date', 'Current Participants', 'Max Participants', 'Reward Pool', 'Actions'].map((_, index) => (
          <div key={index} className="h-4 bg-gradient-to-r from-[#2C2C30] to-[#44444A] rounded relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent animate-shimmer" />
          </div>
        ))}
      </div>

      {/* Table Rows */}
      {Array.from({ length: rows }).map((_, rowIndex) => (
        <div key={rowIndex} className="grid grid-cols-7 gap-4 p-4 border-b border-[#2C2C30] last:border-b-0 hover:bg-[#1A1A1C] transition-colors">
          {/* Quest Name */}
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-gradient-to-r from-purple-500/50 to-blue-500/50 rounded-full animate-pulse" />
            <div className="h-4 bg-gradient-to-r from-[#2C2C30] to-[#44444A] rounded w-32 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent animate-shimmer" />
            </div>
          </div>

          {/* Status Badge */}
          <div className="h-6 bg-gradient-to-r from-[#2C2C30] to-[#44444A] rounded-full w-20 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent animate-shimmer" />
          </div>

          {/* Start Date */}
          <div className="h-4 bg-gradient-to-r from-[#2C2C30] to-[#44444A] rounded w-24 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent animate-shimmer" />
          </div>

          {/* Current Participants */}
          <div className="h-4 bg-gradient-to-r from-[#2C2C30] to-[#44444A] rounded w-8 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent animate-shimmer" />
          </div>

          {/* Max Participants */}
          <div className="h-4 bg-gradient-to-r from-[#2C2C30] to-[#44444A] rounded w-8 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent animate-shimmer" />
          </div>

          {/* Reward Pool */}
          <div className="h-4 bg-gradient-to-r from-[#2C2C30] to-[#44444A] rounded w-16 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent animate-shimmer" />
          </div>

          {/* Actions */}
          <div className="flex space-x-2">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-500/20 to-blue-600/20 rounded-lg relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent animate-shimmer" />
            </div>
            <div className="w-8 h-8 bg-gradient-to-r from-red-500/20 to-red-600/20 rounded-lg relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent animate-shimmer" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

// ============================================================================
// SKELETON PARA COMPLETED QUESTS TABLE
// ============================================================================
export const CompletedQuestsTableSkeleton: React.FC<{ rows?: number }> = ({ rows = 3 }) => {
  return (
     <div className="w-full max-w-6xl mx-auto bg-[#1E1E20] border border-[#2C2C30] rounded-2xl overflow-hidden">
      {/* resto del código igual */}
      {/* Header */}
      <div className="bg-gradient-to-r from-[#2C2C30] to-[#44444A] p-6">
        <div className="h-8 bg-gradient-to-r from-[#44444A] to-[#6C7278] rounded w-64 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent animate-shimmer" />
        </div>
      </div>

      {/* Table Header */}
      <div className="grid grid-cols-5 gap-4 p-4 border-b border-[#2C2C30] bg-[#18181C]">
        {['Quest Title', 'Enrolled Date', 'Reward', 'Status', 'Claim Status'].map((_, index) => (
          <div key={index} className="h-4 bg-gradient-to-r from-[#2C2C30] to-[#44444A] rounded relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent animate-shimmer" />
          </div>
        ))}
      </div>

      {/* Table Rows */}
      {Array.from({ length: rows }).map((_, rowIndex) => (
        <div key={rowIndex} className="grid grid-cols-5 gap-4 p-4 border-b border-[#2C2C30] last:border-b-0 hover:bg-[#1A1A1C] transition-colors">
          {/* Quest Title */}
          <div className="flex items-center space-x-2">
            <div className="w-6 h-6 bg-gradient-to-r from-yellow-500/50 to-orange-500/50 rounded-full animate-pulse" />
            <div className="h-4 bg-gradient-to-r from-[#2C2C30] to-[#44444A] rounded w-24 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent animate-shimmer" />
            </div>
          </div>

          {/* Enrolled Date */}
          <div className="h-4 bg-gradient-to-r from-[#2C2C30] to-[#44444A] rounded w-28 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent animate-shimmer" />
          </div>

          {/* Reward */}
          <div className="h-4 bg-gradient-to-r from-purple-500/20 to-blue-500/20 rounded w-20 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent animate-shimmer" />
          </div>

          {/* Status */}
          <div className="h-6 bg-gradient-to-r from-green-500/20 to-green-600/20 rounded-full w-24 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent animate-shimmer" />
          </div>

          {/* Claim Status */}
          <div className="h-8 bg-gradient-to-r from-purple-500/20 to-blue-500/20 rounded-lg w-32 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent animate-shimmer" />
          </div>
        </div>
      ))}
    </div>
  );
};