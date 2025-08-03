"use client";
import React, { useEffect, useState } from 'react';

// ============================================================================
// TYPES
// ============================================================================
interface RewardSuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
  rewardAmount: number;
  cryptoSymbol: string; // e.g., 'bitcoin', 'ethereum', 'solana'
  cryptoTicker: string; // e.g., 'BTC', 'ETH', 'SOL'
  questName?: string;
  className?: string;
}

interface CryptoPriceData {
  price: number;
  change24h: number;
  loading: boolean;
  error: boolean;
}

// ============================================================================
// GOLDEN PARTICLE COMPONENT
// ============================================================================
const GoldenParticle: React.FC<{ delay: number; color: string }> = ({ delay, color }) => (
  <div
    className={`absolute w-2 h-2 ${color} rounded-full animate-bounce opacity-0`}
    style={{
      left: `${Math.random() * 100}%`,
      animationDelay: `${delay}ms`,
      animationDuration: `${2000 + Math.random() * 1000}ms`,
      animationIterationCount: 'infinite'
    }}
  />
);

// ============================================================================
// FLOATING COIN COMPONENT
// ============================================================================
const FloatingCoin: React.FC<{ delay: number }> = ({ delay }) => (
  <div
    className="absolute text-2xl animate-bounce opacity-0"
    style={{
      left: `${15 + Math.random() * 70}%`,
      top: `${15 + Math.random() * 50}%`,
      animationDelay: `${delay}ms`,
      animationDuration: '3s',
      animationIterationCount: 'infinite'
    }}
  >
    💰
  </div>
);

// ============================================================================
// PRICE DISPLAY COMPONENT
// ============================================================================
const PriceDisplay: React.FC<{ 
  amount: number; 
  priceData: CryptoPriceData; 
  ticker: string;
}> = ({ amount, priceData, ticker }) => {
  const totalValue = amount * priceData.price;
  const isPositive = priceData.change24h >= 0;

  if (priceData.loading) {
    return (
      <div className="bg-[#232326] border border-[#44444A] rounded-xl p-4">
        <div className="animate-pulse">
          <div className="h-6 bg-[#44444A] rounded mb-2"></div>
          <div className="h-8 bg-[#44444A] rounded"></div>
        </div>
      </div>
    );
  }

  if (priceData.error) {
    return (
      <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-4">
        <p className="text-red-400 text-center">Unable to fetch live price</p>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-r from-[#232326] to-[#2C2C30] border border-[#44444A] rounded-xl p-6">
      {/* Crypto Amount */}
      <div className="text-center mb-4">
        <div className="flex items-center justify-center gap-2 mb-2">
          <span className="text-3xl">💎</span>
          <span className="text-3xl font-bold text-white">{amount}</span>
          <span className="text-2xl font-semibold text-[#9945FF]">{ticker}</span>
        </div>
      </div>

      {/* USD Value */}
      <div className="text-center mb-4">
        <div className="text-4xl font-bold bg-gradient-to-r from-[#19F12F] to-[#0BCB7B] bg-clip-text text-transparent mb-1">
          ${totalValue.toLocaleString('en-US', { 
            minimumFractionDigits: 2, 
            maximumFractionDigits: 2 
          })}
        </div>
        <p className="text-[#ACB5BB] text-sm">Total Value (USD)</p>
      </div>

      {/* Live Price Info */}
      <div className="bg-[#1A1A1C] rounded-lg p-3">
        <div className="flex items-center justify-between">
          <span className="text-[#ACB5BB] text-sm">Live Price:</span>
          <span className="text-white font-semibold">
            ${priceData.price.toLocaleString('en-US', { 
              minimumFractionDigits: 2, 
              maximumFractionDigits: 2 
            })}
          </span>
        </div>
        <div className="flex items-center justify-between mt-1">
          <span className="text-[#ACB5BB] text-sm">24h Change:</span>
          <span className={`font-semibold flex items-center gap-1 ${
            isPositive ? 'text-[#19F12F]' : 'text-red-400'
          }`}>
            {isPositive ? '↗' : '↘'}
            {Math.abs(priceData.change24h).toFixed(2)}%
          </span>
        </div>
      </div>
    </div>
  );
};

// ============================================================================
// MAIN REWARD SUCCESS MODAL COMPONENT
// ============================================================================
const RewardSuccessModal: React.FC<RewardSuccessModalProps> = ({ 
  isOpen, 
  onClose, 
  rewardAmount,
  cryptoSymbol,
  cryptoTicker,
  questName,
  className = "" 
}) => {
  const [showEffects, setShowEffects] = useState(false);
  const [showContent, setShowContent] = useState(false);
  const [priceData, setPriceData] = useState<CryptoPriceData>({
    price: 0,
    change24h: 0,
    loading: true,
    error: false
  });

  // ✅ FETCH CRYPTO PRICE FROM COINGECKO
  const fetchCryptoPrice = async () => {
    try {
      setPriceData(prev => ({ ...prev, loading: true, error: false }));
      
      const response = await fetch(
        `https://api.coingecko.com/api/v3/simple/price?ids=${cryptoSymbol}&vs_currencies=usd&include_24hr_change=true`,
        {
          headers: {
            'Accept': 'application/json',
          }
        }
      );

      if (!response.ok) {
        throw new Error('Failed to fetch price');
      }

      const data = await response.json();
      const coinData = data[cryptoSymbol];
      
      if (coinData) {
        setPriceData({
          price: coinData.usd,
          change24h: coinData.usd_24h_change || 0,
          loading: false,
          error: false
        });
      } else {
        throw new Error('Coin data not found');
      }
    } catch (error) {
      console.error('Error fetching crypto price:', error);
      setPriceData(prev => ({ 
        ...prev, 
        loading: false, 
        error: true 
      }));
    }
  };

  // ✅ EFFECTS FOR SEQUENTIAL ANIMATIONS
  useEffect(() => {
    if (isOpen) {
      // Show effects immediately
      setShowEffects(true);
      
      // Fetch crypto price
      fetchCryptoPrice();
      
      // Show content after a delay
      const contentTimer = setTimeout(() => {
        setShowContent(true);
      }, 300);

      return () => clearTimeout(contentTimer);
    } else {
      setShowEffects(false);
      setShowContent(false);
    }
  }, [isOpen, cryptoSymbol]);

  if (!isOpen) return null;

  return (
    <div className={`fixed inset-0 flex items-center justify-center z-50 bg-black/60 backdrop-blur-sm ${className}`}>
      {/* ✅ GOLDEN PARTICLES & COINS BACKGROUND */}
      {showEffects && (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {/* Golden Particles */}
          {Array.from({ length: 25 }).map((_, i) => (
            <GoldenParticle
              key={`particle-${i}`}
              delay={i * 120}
              color={[
                'bg-yellow-400', 'bg-orange-400', 'bg-[#19F12F]', 
                'bg-[#9945FF]', 'bg-[#0BCB7B]', 'bg-amber-400'
              ][i % 6]}
            />
          ))}
          
          {/* Floating Coins */}
          {Array.from({ length: 12 }).map((_, i) => (
            <FloatingCoin key={`coin-${i}`} delay={i * 250} />
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
        
        {/* ✅ REWARD ICON WITH GLOW */}
        <div className="relative mb-6">
          <div className="w-24 h-24 bg-gradient-to-r from-yellow-400 via-orange-400 to-yellow-500 rounded-full flex items-center justify-center shadow-lg shadow-yellow-500/30 animate-pulse">
            <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
            </svg>
          </div>
          
          {/* ✅ GOLDEN PULSE RINGS */}
          <div className="absolute inset-0 rounded-full border-4 border-yellow-400/40 animate-ping" />
          <div className="absolute inset-0 rounded-full border-2 border-orange-400/30 animate-pulse" />
          
          {/* ✅ SPARKLE EFFECTS */}
          <div className="absolute -top-1 -right-1 text-2xl animate-bounce">✨</div>
          <div className="absolute -bottom-1 -left-1 text-xl animate-pulse">💫</div>
        </div>

        {/* ✅ SUCCESS TITLE */}
        <h2 className="text-3xl font-bold bg-gradient-to-r from-yellow-400 via-orange-400 to-yellow-500 bg-clip-text text-transparent mb-2 text-center">
          Reward Claimed!
        </h2>
        
        <p className="text-[#ACB5BB] text-lg text-center mb-6">
          Congratulations! You've earned crypto rewards 🎉
        </p>

        {/* ✅ LIVE PRICE DISPLAY */}
        <div className="w-full mb-6">
          <PriceDisplay 
            amount={rewardAmount} 
            priceData={priceData} 
            ticker={cryptoTicker} 
          />
        </div>

        {/* ✅ QUEST INFO (IF PROVIDED) */}
        {questName && (
          <div className="w-full bg-[#232326] border border-[#44444A] rounded-xl p-4 mb-6">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-8 h-8 bg-gradient-to-r from-[#9945FF] to-[#0BCB7B] rounded-lg flex items-center justify-center">
                <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                </svg>
              </div>
              <span className="text-[#ACB5BB] text-xl font-medium">Quest Completed</span>
            </div>
            
            <h3 className="text-white font-semibold text-lg line-clamp-2">
              {questName}
            </h3>
          </div>
        )}

        {/* ✅ ACHIEVEMENT STATS */}
        <div className="grid grid-cols-3 gap-3 w-full mb-6">
          {[
            { label: 'Status', value: 'Claimed', icon: '✅', color: 'text-[#19F12F]' },
            { label: 'Type', value: 'Crypto', icon: '💎', color: 'text-[#9945FF]' },
            { label: 'Source', value: 'Live', icon: '📡', color: 'text-[#0BCB7B]' }
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
        <div className="bg-gradient-to-r from-[#19F12F]/10 to-[#0BCB7B]/10 border border-[#19F12F]/20 rounded-xl p-4 mb-6 w-full">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-lg">🏆</span>
            <span className="text-[#19F12F] font-semibold text-xl">Reward Successfully Claimed!</span>
          </div>
          <p className="text-[#ACB5BB] text-base">
            Your crypto reward has been added to your wallet. Prices are updated live from CoinGecko.
          </p>
        </div>

        {/* ✅ ACTION BUTTON */}
        <button
          onClick={onClose}
          className="
            group relative w-full px-6 py-4 bg-gradient-to-r from-yellow-500 via-orange-500 to-yellow-600
            hover:from-yellow-400 hover:via-orange-400 hover:to-yellow-500
            text-white rounded-xl font-semibold text-lg
            transition-all duration-300 hover:scale-[1.02] hover:shadow-lg hover:shadow-yellow-500/30
            border border-yellow-500/30 overflow-hidden
          "
        >
          {/* ✅ SHIMMER EFFECT */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
          
          {/* ✅ BUTTON CONTENT */}
          <div className="relative flex items-center justify-center gap-2">
            <span>💰</span>
            <span>Amazing! Continue</span>
            <span>🚀</span>
          </div>
        </button>

        {/* ✅ FOOTER MESSAGE */}
        <p className="text-[#6C7278] text-base text-center mt-4">
          Live prices powered by CoinGecko API
        </p>
      </div>
    </div>
  );
};

export default RewardSuccessModal;
