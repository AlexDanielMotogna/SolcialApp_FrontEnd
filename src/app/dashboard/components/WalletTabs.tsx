"use client";

import React, { useState } from "react";

interface WalletTabsProps {
  options: string[];
  defaultSelected?: string;
  onTabSelect?: (selectedTab: string) => void;
}

const WalletTabs: React.FC<WalletTabsProps> = ({
  options,
  defaultSelected = options[1],
  onTabSelect,
}) => {
  const [selectedTab, setSelectedTab] = useState(defaultSelected);

  const handleTabClick = (tab: string) => {
    setSelectedTab(tab);
    if (onTabSelect) {
      onTabSelect(tab);
    }
  };

  return (
    <div className="w-max bg-[#2C2C30] border border-[#26262C] p-2 rounded-xl flex items-center justify-center gap-2 drop-shadow-[0_6px_10px_-3px_rgba(0,0,0,0.25)]">
      {options.map((option) => (
        <span
          key={option}
          onClick={() => handleTabClick(option)}
          className={`p-[0.8rem] flex items-center justify-center rounded-lg text-xl text-nowrap cursor-pointer transition-all duration-300 ease-in-out ${
            selectedTab === option
              ? "bg-[#44444A] text-white shadow-[0px_6px_10px_-3px_rgba(0,0,0,0.25)] scale-105"
              : "text-[#ACB5BB]"
          }`}
          style={
            selectedTab === option
              ? {
                  boxShadow: "inset 0px -5px 10px 0px rgba(255, 255, 255, 0.1)",
                }
              : {}
          }
        >
          {option}
        </span>
      ))}
    </div>
  );
};

export default WalletTabs;
