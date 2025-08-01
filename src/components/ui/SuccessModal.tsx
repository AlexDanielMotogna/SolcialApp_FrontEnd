// CREAR: c:\Users\Lian Li\Desktop\FrontEnd_Solcial\solcial\src\components\ui\SuccessModal.tsx

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
    className={`absolute w-2 h-2 ${color} rounded-sm animate-confetti opacity-0`}
    style={{
      left: `${Math.random() * 100}%`,
      animationDelay: `${delay}ms`,
      animationDuration: `${2000 + Math.random() * 1000}ms`
    }}
  />
);

// ============================================================================
// FLOATING REWARDS COMPONENT
// ============================================================================
const FloatingReward: React.FC<{ icon: string; delay: number }> = ({ icon, delay }) => (
  <div
    className="absolute text-2xl animate-float opacity-0"
    style={{
      left: `${20 + Math.random() * 60}%`,
      top: `${20 + Math.random() * 40}%`,
      animationDelay: `${delay}ms`,
      animationDuration: '3s'
    }}
  >
    {icon}
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
  const [showFireworks, setShowFireworks] = useState(false);
  const [showContent, setShowContent] = useState(false);

  // ✅ EFFECTS PARA ANIMACIONES SECUENCIALES
  useEffect(() => {
    if (isOpen) {
      // Mostrar fuegos artificiales inmediatamente
      setShowFireworks(true);
      
      // Mostrar contenido después de un delay
      const contentTimer = setTimeout(() => {
        setShowContent(true);
      }, 300);

      return () => clearTimeout(contentTimer);
    } else {
      setShowFireworks(false);
      setShowContent(false);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className={`fixed inset-0 flex items-center justify-center z-50 bg-black/80 backdrop-blur-sm ${className}`}>
      {/* ✅ CONFETTI BACKGROUND */}
      {showFireworks && (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {/* Confetti Particles */}
          {Array.from({ length: 50 }).map((_, i) => (
            <ConfettiParticle
              key={`confetti-${i}`}
              delay={i * 100}
              color={[
                'bg-yellow-400', 'bg-purple-500', 'bg-blue-500', 
                'bg-green-500', 'bg-red-500', 'bg-pink-500'
              ][i % 6]}
            />
          ))}
          
          {/* Floating Rewards */}
          {['🎉', '✨', '🏆', '💰', '🚀', '⭐', '🎯'].map((icon, i) => (
            <FloatingReward key={`reward-${i}`} icon={icon} delay={i * 200} />
          ))}
        </div>
      )}

      {/* ✅ MAIN MODAL CONTENT */}
      <div className={`
        relative bg-gradient-to-br from-[#18181C] via-[#1E1E20] to-[#2C2C30] 
        p-8 rounded-3xl shadow-2xl flex flex-col items-center max-w-md w-full mx-4
        border border-[#44444A] transform transition-all duration-500
        ${showContent ? 'scale-100 opacity-100' : 'scale-75 opacity-0'}
      `}>
        
        {/* ✅ GLOW EFFECT BACKGROUND */}
        <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 via-blue-500/10 to-green-500/10 rounded-3xl blur-xl" />
        
        {/* ✅ SUCCESS ICON ÉPICO */}
        <div className="relative mb-6">
          <div className="w-20 h-20 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full flex items-center justify-center shadow-lg shadow-green-500/30 animate-bounce">
            <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          
          {/* ✅ PULSE RINGS */}
          <div className="absolute inset-0 rounded-full border-4 border-green-400/30 animate-ping" />
          <div className="absolute inset-0 rounded-full border-2 border-green-400/20 animate-pulse" />
        </div>

        {/* ✅ SUCCESS TITLE CON GRADIENTE */}
        <h2 className="text-3xl font-bold bg-gradient-to-r from-green-400 via-emerald-400 to-teal-400 bg-clip-text text-transparent mb-4 text-center animate-slideInUp">
          Quest Created Successfully! 🎉
        </h2>

        {/* ✅ QUEST INFO CARD */}
        <div className="w-full bg-gradient-to-r from-[#2C2C30] to-[#44444A] rounded-2xl p-4 mb-6 border border-[#6C7278]/30">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-blue-500 rounded-lg flex items-center justify-center">
              <span className="text-white text-sm">🚀</span>
            </div>
            <span className="text-[#ACB5BB] text-sm font-medium">Your Epic Quest</span>
          </div>
          
          <h3 className="text-white font-bold text-lg mb-2 line-clamp-2">
            {questName}
          </h3>
          
          <div className="flex items-center gap-2 text-sm">
            <div className="flex items-center gap-1 text-green-400">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
              <span>Live & Active</span>
            </div>
            <div className="w-1 h-1 bg-[#6C7278] rounded-full" />
            <span className="text-[#ACB5BB]">Ready for participants</span>
          </div>
        </div>

        {/* ✅ ACHIEVEMENT BADGES */}
        <div className="flex gap-2 mb-6 flex-wrap justify-center">
          {[
            { icon: '🏆', label: 'Quest Master', color: 'from-yellow-500 to-orange-500' },
            { icon: '🎯', label: 'Engagement Pro', color: 'from-blue-500 to-cyan-500' },
            { icon: '⚡', label: 'Community Builder', color: 'from-purple-500 to-pink-500' }
          ].map((badge, i) => (
            <div 
              key={badge.label}
              className={`
                px-3 py-1 bg-gradient-to-r ${badge.color} rounded-full text-white text-xs font-bold
                transform transition-all duration-300 hover:scale-110 animate-slideInUp
                shadow-lg
              `}
              style={{ animationDelay: `${i * 100}ms` }}
            >
              <span className="mr-1">{badge.icon}</span>
              {badge.label}
            </div>
          ))}
        </div>

        {/* ✅ STATS CARDS */}
        <div className="grid grid-cols-3 gap-3 w-full mb-6">
          {[
            { label: 'Potential', value: 'High', icon: '📈', color: 'text-green-400' },
            { label: 'Visibility', value: '100%', icon: '👁️', color: 'text-blue-400' },
            { label: 'Rewards', value: 'Active', icon: '💰', color: 'text-yellow-400' }
          ].map((stat, i) => (
            <div 
              key={stat.label}
              className="bg-[#1A1A1C] rounded-xl p-3 text-center border border-[#44444A] transform transition-all duration-300 hover:scale-105 animate-slideInUp"
              style={{ animationDelay: `${i * 150}ms` }}
            >
              <div className="text-lg mb-1">{stat.icon}</div>
              <div className={`text-sm font-bold ${stat.color}`}>{stat.value}</div>
              <div className="text-xs text-[#6C7278]">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* ✅ MOTIVATIONAL MESSAGE */}
        <div className="bg-gradient-to-r from-purple-500/10 to-blue-500/10 rounded-xl p-4 mb-6 border border-purple-500/20">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-lg">💡</span>
            <span className="text-[#ACB5BB] font-semibold text-sm">Pro Tip</span>
          </div>
          <p className="text-white text-sm">
            Share your quest on social media to maximize engagement and attract more participants!
          </p>
        </div>

        {/* ✅ CLOSE BUTTON ÉPICO */}
        <button
          onClick={onClose}
          className="
            group relative w-full px-8 py-4 bg-gradient-to-r from-green-600 to-emerald-600 
            hover:from-green-500 hover:to-emerald-500 text-white rounded-2xl font-bold text-lg
            transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-green-500/25
            border border-green-500/30 overflow-hidden
          "
        >
          {/* ✅ SHIMMER EFFECT */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
          
          {/* ✅ BUTTON CONTENT */}
          <div className="relative flex items-center justify-center gap-2">
            <span>🎉</span>
            <span>Awesome! Let's Go</span>
            <span>✨</span>
          </div>
        </button>

        {/* ✅ FOOTER MESSAGE */}
        <p className="text-[#6C7278] text-xs text-center mt-4">
          Your quest is now visible to all community members
        </p>
      </div>
    </div>
  );
};

export default SuccessModal;