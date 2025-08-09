"use client";

import { useState, useEffect } from "react";
import Close from "../../../public/icons/Close";
import Button from "../../components/ButtonBorder";
import { BOOST_PRICES, MOCK_TOKENS, TokenInfo, BoostPrice } from "../../data/mockBoostToken";
import Image from "next/image";

// Thunder icon
const LightningIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M13 2L3 14H12L11 22L21 10H12L13 2Z" fill="#FFD700" stroke="#FFD700" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

// Clock icon
const ClockIcon = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="12" cy="12" r="10" stroke="white" strokeWidth="2"/>
    <polyline points="12,6 12,12 16,14" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

interface BoostTokenModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const BoostTokenModal: React.FC<BoostTokenModalProps> = ({ isOpen, onClose }) => {
  const [tokenAddress, setTokenAddress] = useState("");
  const [selectedToken, setSelectedToken] = useState<TokenInfo | null>(null);
  const [selectedBoost, setSelectedBoost] = useState<BoostPrice | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isTokenFound, setIsTokenFound] = useState(false);

  // Reset state when modal opens/closes
  useEffect(() => {
    if (!isOpen) {
      setTokenAddress("");
      setSelectedToken(null);
      setSelectedBoost(null);
      setIsTokenFound(false);
    }
  }, [isOpen]);

  // Handle the token search
  const handleFindToken = () => {
    if (!tokenAddress.trim()) return;
    
    setIsLoading(true);
    
    // Simulate a token search, this is a mock data in data/mockBoostToken.ts
    setTimeout(() => {
      const foundToken = MOCK_TOKENS.find(
        token => token.address.toLowerCase() === tokenAddress.toLowerCase()
      );
      
      if (foundToken) {
        setSelectedToken(foundToken);
        setIsTokenFound(true);
      } else {
        setSelectedToken(null);
        setIsTokenFound(false);
      }
      setIsLoading(false);
    }, 1000);
  };

  // Handle the token boost
  const handleBoostToken = () => {
    if (!selectedToken || !selectedBoost) return;
    
    setIsLoading(true);
    
    // Simulate a token boost
    setTimeout(() => {
      console.log("Token boosted:", {
        token: selectedToken,
        boost: selectedBoost,
        timestamp: new Date().toISOString()
      });
      
      // notify that the token has been boosted
      alert(`Token ${selectedToken.symbol} boosted with success for ${selectedBoost.duration}!`);
      
      onClose();
    }, 1500);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-[#000000] bg-opacity-60 flex justify-center items-end md:items-center z-50">
      <div
        className="bg-[#161618] w-[90vw] md:w-[600px] max-h-[90vh] flex flex-col items-start justify-start gap-6 border border-[#44444A] rounded-2xl shadow-[0px_2px_10px_-3px_rgba(0,0,0,0)] overflow-y-auto"
        style={{
          boxShadow: "0px -5px 10px 0px #FFFFFF1A inset",
          scrollbarWidth: "none",
          msOverflowStyle: "none",
        }}
      >
        {/* Header */}
        <div className="w-full p-8 border-b border-[#44444A] flex items-center justify-between">
          <h3 className="text-[1.8rem] text-white font-semibold">
            Boost Token
          </h3>
          <Close onClick={onClose} />
        </div>

        {/* Content */}
        <div className="w-full flex flex-col items-start justify-start gap-6 p-8">
          {/* Description */}
          <div className="w-full flex flex-col items-start justify-start gap-1">
            <h4 className="text-white font-semibold text-[1.6rem]">
              Boost your token for more
            </h4>
            <p className="text-[#ACB5BB] text-[1.4rem]">
              Promote your token and maximize visibility.
            </p>
          </div>

          {/* Token Address Input */}
          <div className="w-full flex flex-col items-start justify-start gap-2">
            <h6 className="text-[1.2rem] text-[#ACB5BB] font-normal">
              Token Address
            </h6>
            <input
              className="w-full py-5 px-5 bg-[#2C2C30] border border-[#44444A] rounded-xl text-[1.4rem] text-white font-normal outline-none"
              placeholder="0x1234512345123451234512345"
              value={tokenAddress}
              onChange={(e) => setTokenAddress(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleFindToken()}
            />
            <Button 
              text={isLoading ? "Searching..." : "Find Token"} 
              onClick={handleFindToken}
              disabled={isLoading || !tokenAddress.trim()}
              className="w-full"
            />
          </div>

          {/* Token Info (if found) */}
          {selectedToken && (
            <div className="w-full p-4 bg-[#2C2C30] border border-[#44444A] rounded-xl">
              <div className="flex items-center gap-3 mb-3">
                {selectedToken.logo && (
                  <Image 
                    src={selectedToken.logo} 
                    alt={selectedToken.name}
                    width={40}
                    height={40}
                    className="rounded-full"
                  />
                )}
                <div>
                  <h5 className="text-white font-semibold text-[1.4rem]">
                    {selectedToken.name} ({selectedToken.symbol})
                  </h5>
                  <p className="text-[#ACB5BB] text-[1.2rem]">
                    ${selectedToken.price.toFixed(6)}
                  </p>
                </div>
                <div className={`ml-auto px-3 py-1 rounded-lg text-[1.2rem] font-semibold ${
                  selectedToken.change24h >= 0 ? 'bg-green-900/20 text-green-400' : 'bg-red-900/20 text-red-400'
                }`}>
                  {selectedToken.change24h >= 0 ? '+' : ''}{selectedToken.change24h.toFixed(2)}%
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4 text-[1.2rem]">
                <div>
                  <span className="text-[#ACB5BB]">Market Cap: </span>
                  <span className="text-white">${(selectedToken.marketCap / 1000000).toFixed(2)}M</span>
                </div>
                <div>
                  <span className="text-[#ACB5BB]">Volume 24h: </span>
                  <span className="text-white">${(selectedToken.volume24h / 1000).toFixed(0)}K</span>
                </div>
              </div>
            </div>
          )}

          {/* Boost Prices */}
          {selectedToken && (
            <div className="w-full flex flex-col items-start justify-start gap-4">
              <h6 className="text-[1.2rem] text-[#ACB5BB] font-normal">
                Boost Prices
              </h6>
              <div className="w-full grid grid-cols-2 gap-4">
                {BOOST_PRICES.slice(0, 4).map((boost) => (
                  <div
                    key={boost.id}
                    className={`p-4 border rounded-lg cursor-pointer transition-all flex flex-col items-center ${
                      selectedBoost?.id === boost.id
                        ? 'border-[#FFD700] bg-[#FFD700]/10'
                        : 'border-[#44444A] bg-[#2C2C30] hover:border-[#66666A]'
                    }`}
                    onClick={() => setSelectedBoost(boost)}
                  >
                    {/* Lightning icon */}
                    <div className="mb-3">
                      <LightningIcon />
                    </div>
                    
                    {/* Multiplier */}
                    <div className="text-white font-bold text-xl mb-1">
                      {boost.multiplier}
                    </div>
                    
                    {/* Duration with clock icon */}
                    <div className="flex items-center gap-1 text-white text-xs mb-3">
                      <ClockIcon />
                      <span>{boost.duration}</span>
                    </div>
                    
                    {/* Price */}
                    <div className="text-white font-semibold text-lg">
                      {boost.currency}{boost.price.toLocaleString()}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Error message if token not found */}
          {!isTokenFound && tokenAddress && !isLoading && selectedToken === null && (
            <div className="w-full p-4 bg-red-900/20 border border-red-500/30 rounded-xl">
              <p className="text-red-400 text-[1.4rem]">
                Token not found. Please check the address and try again.
              </p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="w-full border-t border-[#44444A] p-8">
          <Button 
            text={isLoading ? "Processing..." : "Boost Token"}
            onClick={handleBoostToken}
            disabled={!selectedToken || !selectedBoost || isLoading}
            className="w-full"
          />
        </div>
      </div>
    </div>
  );
};

export default BoostTokenModal;

