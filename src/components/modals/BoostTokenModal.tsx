"use client";

import { useState, useEffect } from "react";
import Close from "../../../public/icons/Close";
import Button from "../../components/ButtonBorder";
import { BOOST_PRICES } from "../../data/mockBoostToken";
import { fakeTokens } from "../../data/mockTokensForDinamic";
import Image from "next/image";

// Thunder icon
const LightningIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
    <path
      d="M13 2L3 14H12L11 22L21 10H12L13 2Z"
      fill="#FFD700"
      stroke="#FFD700"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

// Clock icon
const ClockIcon = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
    <circle cx="12" cy="12" r="10" stroke="white" strokeWidth="2" />
    <polyline
      points="12,6 12,12 16,14"
      stroke="white"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

interface BoostTokenModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const BoostTokenModal: React.FC<BoostTokenModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [step, setStep] = useState<"select" | "find" | "boost">("select");
  const [selectedToken, setSelectedToken] = useState<any | null>(null);
  const [selectedBoost, setSelectedBoost] = useState<any | null>(null);
  const [tokenAddress, setTokenAddress] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isTokenFound, setIsTokenFound] = useState(false);

  useEffect(() => {
    if (!isOpen) {
      setStep("select");
      setSelectedToken(null);
      setSelectedBoost(null);
      setTokenAddress("");
      setIsTokenFound(false);
    }
  }, [isOpen]);

  // Find token logic for "new token"
  const handleFindToken = () => {
    if (!tokenAddress.trim()) return;
    setIsLoading(true);
    setTimeout(() => {
      // Simulate search in fakeTokens
      const foundToken = fakeTokens.find(
        (token) => token.address?.toLowerCase() === tokenAddress.toLowerCase()
      );
      if (foundToken) {
        setSelectedToken(foundToken);
        setIsTokenFound(true);
        setStep("boost");
      } else {
        setSelectedToken(null);
        setIsTokenFound(false);
      }
      setIsLoading(false);
    }, 1000);
  };

  // Boost logic
  const handleBoostToken = () => {
    if (!selectedToken || !selectedBoost) return;
    setIsLoading(true);
    setTimeout(() => {
      alert(
        `Token ${selectedToken.symbol} boosted for ${selectedBoost.duration}!`
      );
      onClose();
    }, 1500);
  };

  // Step 1: Select boosted token or boost new
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 bg-[#000000] bg-opacity-60 flex justify-center items-end md:items-center z-50">
      <div className="bg-[#161618] w-[90vw] md:w-[600px] max-h-[90vh] flex flex-col items-start justify-start gap-6 border border-[#44444A] rounded-2xl shadow overflow-y-auto">
        {/* Header */}
        <div className="w-full p-8 border-b border-[#44444A] flex items-center justify-between">
          <h3 className="text-[1.8rem] text-white font-semibold">
            Boost Token
          </h3>
          <Close onClick={onClose} />
        </div>

        {/* Step 1: Select or New */}
        {step === "select" && (
          <div className="w-full flex flex-col gap-6 p-8">
            <div>
              <label className="block text-zinc-300 mb-2 font-medium">
                Select a boosted token:
              </label>
              <select
                className="bg-zinc-900 text-white px-4 py-2 rounded-lg shadow focus:outline-none w-full"
                value={selectedToken?.rank ?? ""}
                onChange={(e) => {
                  const token = fakeTokens.find(
                    (t) => t.rank === Number(e.target.value)
                  );
                  setSelectedToken(token || null);
                  if (token) setStep("boost");
                }}
              >
                <option value="" disabled>
                  Choose a token...
                </option>
                {fakeTokens.map((token) => (
                  <option key={token.rank} value={token.rank}>
                    {token.name}
                  </option>
                ))}
              </select>
              {/* Show icon and name below dropdown when selected */}
              {selectedToken && (
                <div className="flex items-center gap-4 mt-6 p-4 bg-zinc-900 rounded-xl border border-zinc-800">
                  <div className="flex items-center justify-center w-12 h-12 rounded-full bg-zinc-800 border border-zinc-700 shadow">
                    <img
                      src={selectedToken.imageUrl}
                      alt={selectedToken.name}
                      className="w-10 h-10 rounded-full object-cover"
                    />
                  </div>
                  <div>
                    <div className="text-white text-lg font-bold leading-tight">
                      {selectedToken.name}
                      <span className="ml-2 text-zinc-400 font-normal text-base">
                        ({selectedToken.symbol})
                      </span>
                    </div>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-yellow-400 font-bold text-base flex items-center gap-1">
                        {selectedToken.boosts} <LightningIcon />
                      </span>
                      <span
                        className={`text-xs px-2 py-1 rounded ${
                          selectedToken.change24h >= 0
                            ? "bg-green-900/30 text-green-400"
                            : "bg-red-900/30 text-red-400"
                        }`}
                      >
                        {selectedToken.change24h >= 0 ? "+" : ""}
                        {selectedToken.change24h.toFixed(2)}%
                      </span>
                    </div>
                  </div>
                  <div className="ml-auto text-right">
                    <div className="text-zinc-400 text-xs">Market Cap</div>
                    <div className="text-white font-mono text-sm">
                      ${selectedToken.marketCap.toLocaleString()}
                    </div>
                  </div>
                </div>
              )}
            </div>
            <div className="w-full flex justify-center">
              <Button
                text="Boost New Token"
                onClick={() => setStep("find")}
                className="w-full"
              />
            </div>
          </div>
        )}

        {/* Step 2: Find new token */}
        {step === "find" && (
          <div className="w-full flex flex-col gap-6 p-8">
            <div>
              <h6 className="text-[1.2rem] text-[#ACB5BB] font-normal mb-2">
                Enter Token Address
              </h6>
              <input
                className="w-full py-5 px-5 bg-[#2C2C30] border border-[#44444A] rounded-xl text-[1.4rem] text-white font-normal outline-none"
                placeholder="0x1234512345123451234512345"
                value={tokenAddress}
                onChange={(e) => setTokenAddress(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && handleFindToken()}
              />
              <Button
                text={isLoading ? "Searching..." : "Find Token"}
                onClick={handleFindToken}
                disabled={isLoading || !tokenAddress.trim()}
                className="w-full mt-2"
              />
            </div>
            {/* Error message if token not found */}
            {!isTokenFound &&
              tokenAddress &&
              !isLoading &&
              selectedToken === null && (
                <div className="w-full p-4 bg-red-900/20 border border-red-500/30 rounded-xl">
                  <p className="text-red-400 text-[1.4rem]">
                    Token not found. Please check the address and try again.
                  </p>
                </div>
              )}
          </div>
        )}

        {/* Step 3: Boost pack selection */}
        {step === "boost" && selectedToken && (
          <div className="w-full flex flex-col gap-6 p-8">
            {/* Token Info */}
            <div className="w-full p-4 bg-zinc-900 border border-zinc-800 rounded-xl flex items-center gap-4">
              <div className="flex items-center justify-center w-14 h-14 rounded-full bg-zinc-800 border border-zinc-700 shadow">
                <Image
                  src={selectedToken.imageUrl}
                  alt={selectedToken.name}
                  width={48}
                  height={48}
                  className="rounded-full object-cover"
                />
              </div>
              <div className="flex-1">
                <div className="text-white font-bold text-lg leading-tight">
                  {selectedToken.name}
                  <span className="ml-2 text-zinc-400 font-normal text-base">
                    ({selectedToken.symbol})
                  </span>
                </div>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-yellow-400 font-bold text-base flex items-center gap-1">
                    {selectedToken.boosts} <LightningIcon />
                  </span>
                  <span
                    className={`text-xs px-2 py-1 rounded ${
                      selectedToken.change24h >= 0
                        ? "bg-green-900/30 text-green-400"
                        : "bg-red-900/30 text-red-400"
                    }`}
                  >
                    {selectedToken.change24h >= 0 ? "+" : ""}
                    {selectedToken.change24h.toFixed(2)}%
                  </span>
                </div>
                <div className="grid grid-cols-2 gap-2 mt-2">
                  <div>
                    <span className="text-zinc-400 text-xs">Market Cap</span>
                    <div className="text-white font-mono text-sm">
                      ${selectedToken.marketCap.toLocaleString()}
                    </div>
                  </div>
                  <div>
                    <span className="text-zinc-400 text-xs">Volume 24h</span>
                    <div className="text-white font-mono text-sm">
                      ${selectedToken.volume24h.toLocaleString()}
                    </div>
                  </div>
                  <div>
                    <span className="text-zinc-400 text-xs">Launch Date</span>
                    <div className="text-white font-mono text-sm">
                      {selectedToken.launchDate ?? "N/A"}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* Boost Prices */}
            <div className="w-full flex flex-col items-start justify-start gap-4">
              <h6 className="text-[1.2rem] text-[#ACB5BB] font-normal">
                Boost Packs
              </h6>
              <div className="w-full grid grid-cols-2 gap-4">
                {BOOST_PRICES.slice(0, 4).map((boost) => (
                  <div
                    key={boost.id}
                    className={`p-4 border rounded-lg cursor-pointer transition-all flex flex-col items-center ${
                      selectedBoost?.id === boost.id
                        ? "border-[#FFD700] bg-[#FFD700]/10"
                        : "border-[#44444A] bg-[#2C2C30] hover:border-[#66666A]"
                    }`}
                    onClick={() => setSelectedBoost(boost)}
                  >
                    <div className="mb-3">
                      <LightningIcon />
                    </div>
                    <div className="text-white font-bold text-xl mb-1">
                      {boost.multiplier}
                    </div>
                    <div className="flex items-center gap-1 text-white text-xs mb-3">
                      <ClockIcon />
                      <span>{boost.duration}</span>
                    </div>
                    <div className="text-white font-semibold text-lg">
                      {boost.currency}
                      {boost.price.toLocaleString()}
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <Button
              text={isLoading ? "Processing..." : "Boost Token"}
              onClick={handleBoostToken}
              disabled={!selectedBoost || isLoading}
              className="w-full mt-4"
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default BoostTokenModal;
