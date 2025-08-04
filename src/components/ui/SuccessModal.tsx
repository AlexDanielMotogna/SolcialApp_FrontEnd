"use client";
import React, { useEffect, useState } from 'react';

// ============================================================================
// TYPES
// ============================================================================
interface SuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
  questName: string;
  className?: string;
}

// ============================================================================
// CONFETTI PARTICLE COMPONENT
// ============================================================================
const ConfettiParticle: React.FC<{ delay: number; color: string }> = ({ delay, color }) => (
  <div
    className={`absolute w-1.5 h-1.5 ${color} rounded-sm animate-bounce opacity-0`}
    style={{
      left: `${Math.random() * 100}%`,
      animationDelay: `${delay}ms`,
      animationDuration: `${1500 + Math.random() * 1000}ms`
    }}
  />
);

// ============================================================================
// FLOATING SPARKLE COMPONENT
// ============================================================================
const FloatingSparkle: React.FC<{ delay: number }> = ({ delay }) => (
  <div
    className="absolute text-xl animate-pulse opacity-0"
    style={{
      left: `${20 + Math.random() * 60}%`,
      top: `${20 + Math.random() * 40}%`,
      animationDelay: `${delay}ms`,
      animationDuration: '2s'
    }}
  >
    ✨
  </div>
);

// ============================================================================
// MAIN SUCCESS MODAL COMPONENT
// ============================================================================
const SuccessModal: React.FC<SuccessModalProps> = ({ 
  isOpen, 
  onClose, 
  questName,
  className = "" 
}) => {
  const [showEffects, setShowEffects] = useState(false);
  const [showContent, setShowContent] = useState(false);

  // ✅ EFFECTS FOR SEQUENTIAL ANIMATIONS
  useEffect(() => {
    if (isOpen) {
      // Show effects immediately
      setShowEffects(true);
      
      // Show content after a delay
      const contentTimer = setTimeout(() => {
        setShowContent(true);
      }, 200);

      return () => clearTimeout(contentTimer);
    } else {
      setShowEffects(false);
      setShowContent(false);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className={`fixed inset-0 flex items-center justify-center z-50 bg-black/60 backdrop-blur-sm ${className}`}>
      {/* ✅ CONFETTI & SPARKLES BACKGROUND */}
      {showEffects && (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {/* Confetti Particles */}
          {Array.from({ length: 20 }).map((_, i) => (
            <ConfettiParticle
              key={`confetti-${i}`}
              delay={i * 150}
              color={[
                'bg-[#9945FF]', 'bg-[#0BCB7B]', 'bg-[#19F12F]', 
                'bg-purple-400', 'bg-green-400', 'bg-emerald-400'
              ][i % 6]}
            />
          ))}
          
          {/* Floating Sparkles */}
          {Array.from({ length: 8 }).map((_, i) => (
            <FloatingSparkle key={`sparkle-${i}`} delay={i * 300} />
          ))}
        </div>
      )}

      {/* ✅ MAIN MODAL CONTENT */}
      <div className={`
        relative bg-[#161618] border border-[#2C2C30] 
        p-8 rounded-2xl shadow-2xl flex flex-col items-center max-w-md w-full mx-4
        transform transition-all duration-500
        ${showContent ? 'scale-100 opacity-100' : 'scale-90 opacity-0'}
      `}>
        
        {/* ✅ SUCCESS ICON */}
        <div className="relative mb-6">
          <div className="w-20 h-20 bg-gradient-to-r from-[#9945FF] to-[#0BCB7B] rounded-full flex items-center justify-center shadow-lg shadow-green-500/20 animate-bounce">
            <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          
          {/* ✅ PULSE RINGS */}
          <div className="absolute inset-0 rounded-full border-4 border-[#19F12F]/30 animate-ping" />
          <div className="absolute inset-0 rounded-full border-2 border-[#19F12F]/20 animate-pulse" />
        </div>

        {/* ✅ SUCCESS TITLE */}
        <h2 className="text-3xl font-bold bg-gradient-to-r from-[#9945FF] to-[#0BCB7B] bg-clip-text text-transparent mb-4 text-center">
          Quest Created Successfully!
        </h2>

        {/* ✅ QUEST INFO CARD */}
        <div className="w-full bg-[#232326] border border-[#44444A] rounded-xl p-4 mb-6">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-8 h-8 bg-gradient-to-r from-[#9945FF] to-[#0BCB7B] rounded-lg flex items-center justify-center">
              <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <span className="text-[#ACB5BB] text-xl font-medium">Your New Quest</span>
          </div>
          
          <h3 className="text-white font-semibold text-lg mb-3 line-clamp-2">
            {questName}
          </h3>
          
          <div className="flex items-center gap-2 text-base">
            <div className="flex items-center gap-1 text-[#19F12F]">
              <div className="w-2 h-2 bg-[#19F12F] rounded-full animate-pulse" />
              <span>Live & Active</span>
            </div>
            <div className="w-1 h-1 bg-[#6C7278] rounded-full" />
            <span className="text-[#ACB5BB]">Ready for participants</span>
          </div>
        </div>

        {/* ✅ STATS GRID */}
        <div className="grid grid-cols-3 gap-3 w-full mb-6">
          {[
            { label: 'Status', value: 'Active', icon: '�', color: 'text-[#19F12F]' },
            { label: 'Visibility', value: 'Public', icon: '�', color: 'text-[#0BCB7B]' },
            { label: 'Rewards', value: 'Ready', icon: '�', color: 'text-[#9945FF]' }
          ].map((stat, i) => (
            <div 
              key={stat.label}
              className="bg-[#1A1A1C] border border-[#44444A] rounded-xl p-3 text-center transform transition-all duration-300 hover:scale-105"
              style={{ animationDelay: `${i * 100}ms` }}
            >
              <div className="text-xl mb-1">{stat.icon}</div>
              <div className={`text-lg font-semibold ${stat.color}`}>{stat.value}</div>
              <div className="text-base text-[#6C7278]">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* ✅ SUCCESS MESSAGE */}
        <div className="bg-[#19F12F]/10 border border-[#19F12F]/20 rounded-xl p-4 mb-6 w-full">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-lg">🎉</span>
            <span className="text-[#19F12F] font-semibold text-xl">Quest Successfully Created!</span>
          </div>
          <p className="text-[#ACB5BB] text-base">
            Your quest is now live and visible to all community members. Participants can start engaging immediately!
          </p>
        </div>

        {/* ✅ ACTION BUTTON */}
        <button
          onClick={onClose}
          className="
            group relative w-full px-6 py-4 bg-gradient-to-r from-[#9945FF] to-[#0BCB7B] 
            text-white rounded-xl font-semibold text-lg
            transition-all duration-300 hover:scale-[1.02] hover:shadow-lg hover:shadow-purple-500/20
            border border-purple-500/20 overflow-hidden
          "
        >
          {/* ✅ SHIMMER EFFECT */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
          
          {/* ✅ BUTTON CONTENT */}
          <div className="relative flex items-center justify-center gap-2">
            <span>�</span>
            <span>Perfect! Let's Go</span>
            <span>✨</span>
          </div>
        </button>

        {/* ✅ FOOTER MESSAGE */}
        <p className="text-[#6C7278] text-base text-center mt-4">
          Quest is now visible in the community dashboard
        </p>
      </div>
    </div>
  );
};

export default SuccessModal;