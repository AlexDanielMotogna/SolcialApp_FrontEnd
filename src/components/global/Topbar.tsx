import Image from 'next/image';
import React from 'react';
import Analyzer from "../../../public/icons/Analyzer";
import ButtonSm from "../ButtonSm";
import Notification from "../../../public/icons/Notification";
import User from "../../../public/icons/User";
import Matches from "../../../public/icons/Matches";
import Quests from "../../../public/icons/Quests";
import Profile from "../../../public/icons/Profile";
import Events from "../../../public/icons/Events";
import Tournaments from "../../../public/icons/Tournaments";
import Referrals from "../../../public/icons/Referrals";
import Clock from "../../../public/icons/Clock";
import Alert1 from "../../../public/imgs/Alert1.png";
import Alert2 from "../../../public/imgs/Alert2.png";
import Alert3 from "../../../public/imgs/Alert3.png";
import Alert4 from "../../../public/imgs/Alert4.png";
import Menu from '../../../public/icons/Menu';
import NotificationCard from "./NotificationCard";
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import { useWallet } from '@solana/wallet-adapter-react';
import { useState, useEffect } from 'react';
import Wallet from '../../../public/icons/Wallet';
import { SolanaWalletProvider } from '@/providers/WalletProvider';

const notifications = [
  {
    image: Alert1,
    title: "SOL Price Alert!",
    message: "Solana has just surpassed $50! 🚀 Tap here to view details or adjust your trading strategy."
  },
  {
    image: Alert2,
    title: "Transaction Confirmed",
    message: "Your purchase of 1 SOL at $35 per coin has been successfully confirmed. View transaction details."
  },
  {
    image: Alert3,
    title: "Weekly Portfolio Summary",
    message: "Your portfolio gained 3.2% this week! Tap here to review your top-performing tokens."
  },
  {
    image: Alert4,
    title: "Market Update: Ladder Match Rankings",
    message: "The latest Ladder Match rankings are out! See if you've moved up the leaderboard and view your recent matches."
  }
];

const Topbar = ({ activePath, toggleSidebar }: { activePath: string, toggleSidebar: () => void }) => {
  const [showNotifications, setShowNotifications] = React.useState(false);
  

  let topbarLabel = "";
  let topbarIcon = null;

  switch (activePath) {
    case "/dashboard":
      topbarLabel = "Analyzer";
      topbarIcon = <Analyzer />;
      break;
    case "/dashboard/matches":
      topbarLabel = "Matches";
      topbarIcon = <Matches />;
      break;
    case "/dashboard/quests":
      topbarLabel = "Quests";
      topbarIcon = <Quests />;
      break;
    case "/dashboard/profile":
      topbarLabel = "Profile";
      topbarIcon = <Profile />;
      break;
    case "/dashboard/events":
      topbarLabel = "Events";
      topbarIcon = <Events />;
      break;
    case "/dashboard/tournaments":
      topbarLabel = "Ads";
      topbarIcon = <Tournaments />;
      break;
    case "/dashboard/boost":
      topbarLabel = "Boost Token";
      topbarIcon = <Clock />;
      break;
    case "/dashboard/referrals":
      topbarLabel = "Referrals";
      topbarIcon = <Referrals />;
      break;
    default:
      topbarLabel = "Dashboard";
      topbarIcon = <Analyzer />;
  }

  return (
    <div className="w-full px-9 py-[16px] flex items-center justify-between border-b border-b-[#2C2C30] relative">
      <div className="flex items-center gap-5">
        <div className='flex items-center justify-center mr-2 lg:hidden'>
          <button onClick={toggleSidebar} aria-label="Toggle Sidebar">
            <Menu />
          </button>
        </div>
        {topbarIcon && React.cloneElement(topbarIcon, { color: "white" })}
        <h1 className="font-bold text-3xl text-white">{topbarLabel}</h1>
      </div>
      <div className="w-full flex items-center justify-end gap-10">
        <div className="flex items-center justify-start gap-4">
          <div className="w-[162px]">
            <ButtonSm text="Connect Wallet" />
          </div>
          {/* Notification Bell */}
          <div className="relative hidden md:flex items-center justify-center">
            <button
              className="border border-[#2C2C30] rounded-2xl w-14 h-14 flex items-center justify-center"
              onClick={() => setShowNotifications((prev) => !prev)}
              aria-label="Show Notifications"
            >
              <Notification />
            </button>
            {showNotifications && (
              <div className="absolute top-16 right-0 z-50 bg-transparent">
                {notifications.map((notif, idx) => (
                  <NotificationCard
                    key={idx}
                    image={notif.image}
                    title={notif.title}
                    message={notif.message}
                  />
                ))}
              </div>
            )}
          </div>
          {/* User Icon */}
          <div className="items-center justify-center border border-[#2C2C30] rounded-2xl w-14 h-14 hidden md:flex cursor-pointer">
            <User />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Topbar;