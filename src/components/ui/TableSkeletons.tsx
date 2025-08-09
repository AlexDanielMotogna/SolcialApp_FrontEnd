"use client";
import React from 'react';

// ============================================================================
// SKELETON PARA CREATED QUESTS TABLE - MATCH EXACT STRUCTURE
// ============================================================================
export const CreatedQuestsTableSkeleton: React.FC<{ rows?: number }> = ({ rows = 5 }) => {
  return (
    <div className="bg-[#18181C] rounded-2xl p-10 mb-28 shadow-lg w-full max-w-6xl min-w-[1400px] overflow-x-auto">
      <table className="w-full text-left text-xl min-w-[1100px]">
        {/* Table Header - EXACT MATCH */}
        <thead>
          <tr className="text-[#ACB5BB] text-2xl">
            <th className="py-5 px-4">
              <div className="h-6 bg-gradient-to-r from-[#ACB5BB]/20 to-[#ACB5BB]/10 rounded w-16 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent animate-shimmer" />
              </div>
            </th>
            <th className="px-4">
              <div className="h-6 bg-gradient-to-r from-[#ACB5BB]/20 to-[#ACB5BB]/10 rounded w-14 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent animate-shimmer" />
              </div>
            </th>
            <th className="px-4">
              <div className="h-6 bg-gradient-to-r from-[#ACB5BB]/20 to-[#ACB5BB]/10 rounded w-20 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent animate-shimmer" />
              </div>
            </th>
            <th className="px-4">
              <div className="h-6 bg-gradient-to-r from-[#ACB5BB]/20 to-[#ACB5BB]/10 rounded w-32 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent animate-shimmer" />
              </div>
            </th>
            <th className="px-4">
              <div className="h-6 bg-gradient-to-r from-[#ACB5BB]/20 to-[#ACB5BB]/10 rounded w-28 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent animate-shimmer" />
              </div>
            </th>
            <th className="px-4">
              <div className="h-6 bg-gradient-to-r from-[#ACB5BB]/20 to-[#ACB5BB]/10 rounded w-24 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent animate-shimmer" />
              </div>
            </th>
            <th className="px-4">
              <div className="h-6 bg-gradient-to-r from-[#ACB5BB]/20 to-[#ACB5BB]/10 rounded w-16 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent animate-shimmer" />
              </div>
            </th>
          </tr>
        </thead>

        {/* Table Body - EXACT MATCH */}
        <tbody>
          {Array.from({ length: rows }).map((_, rowIndex) => (
            <tr key={rowIndex} className="border-t border-[#23232A] text-white text-xl">
              {/* Quest Name */}
              <td className="py-6 px-4">
                <div className="h-5 bg-gradient-to-r from-[#2C2C30] to-[#44444A] rounded w-40 relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent animate-shimmer" />
                </div>
              </td>

              {/* Status Badge */}
              <td className="px-4">
                <div className="h-8 bg-gradient-to-r from-green-600/30 to-green-500/20 rounded w-20 relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent animate-shimmer" />
                </div>
              </td>

              {/* Start Date */}
              <td className="px-4">
                <div className="h-5 bg-gradient-to-r from-[#2C2C30] to-[#44444A] rounded w-24 relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent animate-shimmer" />
                </div>
              </td>

              {/* Current Participants */}
              <td className="px-4">
                <div className="h-5 bg-gradient-to-r from-[#2C2C30] to-[#44444A] rounded w-8 relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent animate-shimmer" />
                </div>
              </td>

              {/* Max Participants */}
              <td className="px-4">
                <div className="h-5 bg-gradient-to-r from-[#2C2C30] to-[#44444A] rounded w-8 relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent animate-shimmer" />
                </div>
              </td>

              {/* Reward Pool */}
              <td className="px-4">
                <div className="h-5 bg-gradient-to-r from-[#2C2C30] to-[#44444A] rounded w-20 relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent animate-shimmer" />
                </div>
              </td>

              {/* Actions - Settings Button */}
              <td className="px-4 flex items-center justify-center relative">
                <div className="w-12 h-12 bg-gradient-to-r from-[#23232A] to-[#2C2C30] rounded-full relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent animate-shimmer" />
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

// ============================================================================
// SKELETON PARA COMPLETED QUESTS TABLE - MATCH EXACT STRUCTURE
// ============================================================================
export const CompletedQuestsTableSkeleton: React.FC<{ rows?: number }> = ({ rows = 3 }) => {
  return (
    <div className="w-full bg-[#18181C] rounded-2xl p-10 shadow-lg w-full max-w-6xl min-w-[1400px] overflow-x-auto">
      <table className="w-full text-left text-xl min-w-[1100px]">
        {/* Table Header - EXACT MATCH */}
        <thead>
          <tr className="text-[#ACB5BB] text-2xl">
            <th className="py-5 px-4">
              <div className="h-6 bg-gradient-to-r from-[#ACB5BB]/20 to-[#ACB5BB]/10 rounded w-24 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent animate-shimmer" />
              </div>
            </th>
            <th className="px-4">
              <div className="h-6 bg-gradient-to-r from-[#ACB5BB]/20 to-[#ACB5BB]/10 rounded w-28 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent animate-shimmer" />
              </div>
            </th>
            <th className="px-4">
              <div className="h-6 bg-gradient-to-r from-[#ACB5BB]/20 to-[#ACB5BB]/10 rounded w-16 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent animate-shimmer" />
              </div>
            </th>
            <th className="px-4">
              <div className="h-6 bg-gradient-to-r from-[#ACB5BB]/20 to-[#ACB5BB]/10 rounded w-14 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent animate-shimmer" />
              </div>
            </th>
            <th className="px-4">
              <div className="h-6 bg-gradient-to-r from-[#ACB5BB]/20 to-[#ACB5BB]/10 rounded w-24 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent animate-shimmer" />
              </div>
            </th>
          </tr>
        </thead>

        {/* Table Body - EXACT MATCH */}
        <tbody>
          {Array.from({ length: rows }).map((_, rowIndex) => (
            <tr key={rowIndex} className="border-t border-[#23232A] text-white text-xl">
              {/* Quest Title with Trophy Icon */}
              <td className="py-6 px-4 flex items-center gap-3">
                <span className="text-3xl">🏆</span>
                <div className="h-5 bg-gradient-to-r from-[#2C2C30] to-[#44444A] rounded w-32 relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent animate-shimmer" />
                </div>
              </td>

              {/* Enrolled Date */}
              <td className="px-4">
                <div className="h-5 bg-gradient-to-r from-[#2C2C30] to-[#44444A] rounded w-24 relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent animate-shimmer" />
                </div>
              </td>

              {/* Reward - Purple color like real component */}
              <td className="px-4">
                <div className="h-5 bg-gradient-to-r from-[#9945FF]/30 to-[#9945FF]/20 rounded w-20 relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent animate-shimmer" />
                </div>
              </td>

              {/* Status - Green "Completed" */}
              <td className="px-4">
                <div className="h-5 bg-gradient-to-r from-green-400/30 to-green-400/20 rounded w-20 relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent animate-shimmer" />
                </div>
              </td>

              {/* Claim Status - Button or Claimed status */}
              <td className="px-4">
                <div className="h-10 bg-gradient-to-r from-[#2C2C30] to-[#44444A] rounded w-28 relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent animate-shimmer" />
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};