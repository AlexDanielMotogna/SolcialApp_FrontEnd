// CREAR: c:\Users\Lian Li\Desktop\FrontEnd_Solcial\solcial\src\components\ui\LoadingBar.tsx

"use client";
import React from 'react';

// ============================================================================
// LOADING BAR PRINCIPAL (BARRA ANIMADA)
// ============================================================================
interface LoadingBarProps {
  variant?: 'primary' | 'secondary' | 'success' | 'warning' | 'error';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  text?: string;
  showPercentage?: boolean;
  percentage?: number;
  className?: string;
}

export const LoadingBar: React.FC<LoadingBarProps> = ({
  variant = 'primary',
  size = 'md',
  text = 'Loading...',
  showPercentage = false,
  percentage = 0,
  className = ''
}) => {
  const variants = {
    primary: 'from-[#9945FF] via-[#14F195] to-[#9945FF]',
    secondary: 'from-[#44444A] via-[#6C7278] to-[#44444A]',
    success: 'from-[#10B981] via-[#34D399] to-[#10B981]',
    warning: 'from-[#F59E0B] via-[#FCD34D] to-[#F59E0B]',
    error: 'from-[#EF4444] via-[#F87171] to-[#EF4444]',
  };

  const sizes = {
    sm: 'h-1',
    md: 'h-2',
    lg: 'h-3',
    xl: 'h-4',
  };

  const textSizes = {
    sm: 'text-xs',
    md: 'text-sm',
    lg: 'text-base',
    xl: 'text-lg',
  };

  return (
    <div className={`w-full ${className}`}>
      {/* Texto y porcentaje */}
      <div className="flex items-center justify-between mb-2">
        <span className={`text-white font-medium ${textSizes[size]}`}>
          {text}
        </span>
        {showPercentage && (
          <span className={`text-[#ACB5BB] font-semibold ${textSizes[size]}`}>
            {percentage}%
          </span>
        )}
      </div>

      {/* Barra de loading */}
      <div className="w-full bg-[#2C2C30] rounded-full overflow-hidden">
        <div
          className={`${sizes[size]} bg-gradient-to-r ${variants[variant]} rounded-full transition-all duration-300 ease-out relative overflow-hidden`}
          style={{
            width: showPercentage ? `${percentage}%` : '100%',
            animation: showPercentage ? 'none' : 'loadingPulse 2s ease-in-out infinite'
          }}
        >
          {/* Efecto de brillo */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer" />
        </div>
      </div>
    </div>
  );
};

// ============================================================================
// LOADING SKELETON PARA QUEST CARDS
// ============================================================================
export const QuestCardSkeleton: React.FC = () => {
  return (
    <div className="w-full p-[1.6rem] flex flex-col gap-4 bg-[#1E1E20] border border-[#2C2C30] rounded-2xl animate-pulse">
      {/* Banner skeleton */}
      <div className="w-full h-60 bg-gradient-to-r from-[#2C2C30] via-[#44444A] to-[#2C2C30] rounded-lg relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent animate-shimmer" />
      </div>

      {/* Title skeleton */}
      <div className="space-y-2">
        <div className="h-6 bg-gradient-to-r from-[#2C2C30] to-[#44444A] rounded w-3/4 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent animate-shimmer" />
        </div>
        <div className="h-4 bg-gradient-to-r from-[#2C2C30] to-[#44444A] rounded w-1/2 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent animate-shimmer" />
        </div>
      </div>

      {/* Tasks skeleton */}
      <div className="flex gap-2">
        {[1, 2, 3].map((i) => (
          <div key={i} className="h-8 w-8 bg-gradient-to-r from-[#2C2C30] to-[#44444A] rounded relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent animate-shimmer" />
          </div>
        ))}
      </div>

      {/* Reward skeleton */}
      <div className="h-8 bg-gradient-to-r from-[#2C2C30] to-[#44444A] rounded w-1/3 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent animate-shimmer" />
      </div>

      {/* Button skeleton */}
      <div className="h-12 bg-gradient-to-r from-[#2C2C30] to-[#44444A] rounded-xl relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent animate-shimmer" />
      </div>
    </div>
  );
};

// ============================================================================
// LOADING SPINNER ÉPICO
// ============================================================================
interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  variant?: 'primary' | 'secondary' | 'success';
  text?: string;
  className?: string;
}

export const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  size = 'md',
  variant = 'primary',
  text,
  className = ''
}) => {
  const sizes = {
    sm: 'w-6 h-6',
    md: 'w-10 h-10',
    lg: 'w-16 h-16',
    xl: 'w-24 h-24',
  };

  const variants = {
    primary: 'border-[#9945FF] border-t-transparent',
    secondary: 'border-[#14F195] border-t-transparent',
    success: 'border-[#10B981] border-t-transparent',
  };

  return (
    <div className={`flex flex-col items-center justify-center gap-4 ${className}`}>
      <div className={`${sizes[size]} border-4 ${variants[variant]} rounded-full animate-spin`} />
      {text && (
        <p className="text-white text-center font-medium animate-pulse">
          {text}
        </p>
      )}
    </div>
  );
};

// ============================================================================
// LOADING OVERLAY PARA TODA LA PANTALLA
// ============================================================================
interface LoadingOverlayProps {
  show: boolean;
  text?: string;
  variant?: 'spinner' | 'bar' | 'dots';
  blur?: boolean;
}

export const LoadingOverlay: React.FC<LoadingOverlayProps> = ({
  show,
  text = 'Loading amazing content...',
  variant = 'spinner',
  blur = true
}) => {
  if (!show) return null;

  return (
    <div className={`fixed inset-0 z-50 flex items-center justify-center ${
      blur ? 'backdrop-blur-sm' : ''
    } bg-black/60`}>
      <div className="bg-[#161618] p-8 rounded-2xl border border-[#44444A] shadow-2xl max-w-sm w-full mx-4">
        {variant === 'spinner' && (
          <LoadingSpinner size="lg" text={text} />
        )}
        
        {variant === 'bar' && (
          <LoadingBar size="lg" text={text} />
        )}
        
        {variant === 'dots' && (
          <div className="flex flex-col items-center gap-4">
            <div className="flex gap-2">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="w-4 h-4 bg-[#9945FF] rounded-full animate-bounce"
                  style={{
                    animationDelay: `${i * 0.1}s`,
                    animationDuration: '0.6s'
                  }}
                />
              ))}
            </div>
            <p className="text-white text-center font-medium">{text}</p>
          </div>
        )}
      </div>
    </div>
  );
};

// ============================================================================
// LOADING PARA LISTAS
// ============================================================================
export const ListLoadingSkeleton: React.FC<{ items?: number }> = ({ items = 6 }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
      {Array.from({ length: items }).map((_, index) => (
        <QuestCardSkeleton key={index} />
      ))}
    </div>
  );
};