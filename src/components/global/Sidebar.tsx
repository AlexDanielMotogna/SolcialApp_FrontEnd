"use client";

import { FC } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

import Logo from "../../../public/imgs/logo.png";
import Menu from "../../../public/icons/Menu";
import Analyzer from "../../../public/icons/Analyzer";
import Matches from "../../../public/icons/Matches";
import Quests from "../../../public/icons/Quests";
import Profile from "../../../public/icons/Profile";
import Events from "../../../public/icons/Events";
import Tournaments from "../../../public/icons/Tournaments";
import Referrals from "../../../public/icons/Referrals";
import Clock from "../../../public/icons/Clock";
import Avatar from "../../../public/imgs/Avatar.png";
import Sort from "../../../public/icons/Sort";
import Settings from "../../../public/icons/Settings";
import Help from "../../../public/icons/Help";


const Sidebar: FC = () => {

  const router = useRouter();

  const handleNavigation = (path: string) => {
    router.push(path); 
  };

  return (
    <div className="w-full h-screen hidden md:block p-[2.4rem]">
      <div className="w-full h-full flex flex-col justify-between items-start">
        <div className="w-full flex flex-col items-start gap-10">
          <div className="w-full flex items-center justify-between">
            <Image src={Logo} className="w-56" alt=""/>
            <Menu />
          </div>

          <div className="w-full flex flex-col items-start justify-start gap-3">
            <span className="text-[#6C7278] text-lg font-normal">MAIN MENU</span>

            <div className="w-full flex flex-col items-start justify-start gap-2">
              <div
                className="w-full flex items-center justify-start gap-3 py-[10px] px-3 border border-[#F6F7FA33] rounded-xl bg-[#2C2C30] shadow-[0px_8px_23px_-3px_rgba(0,0,0,1)] cursor-pointer"
                style={{
                  boxShadow: "inset 0px -5px 10px 0px rgba(255, 255, 255, 0.1)",
                }}
                onClick={() => handleNavigation("/dashboard")}
              >
                <Analyzer />
                <p className="font-medium text-white text-2xl">Analyzer</p>
              </div>

              <div
                className="w-full flex items-center justify-start gap-3 py-[10px] px-3 rounded-xl cursor-pointer"
                onClick={() => handleNavigation("/dashboard/matches")}

              >
                <Matches />
                <p className="font-medium text-[#ACB5BB] text-2xl">Matches</p>
              </div>

              <div
                className="w-full flex items-center justify-start gap-3 py-[10px] px-3 rounded-xl cursor-pointer"
                onClick={() => handleNavigation("/dashboard/quests")}
              >
                <Quests />
                <p className="font-medium text-[#ACB5BB] text-2xl">Quests</p>
              </div>

              <div
                className="w-full flex items-center justify-start gap-3 py-[10px] px-3 rounded-xl cursor-pointer"
                onClick={() => handleNavigation("/dashboard/profile")}
              >
                <Profile />
                <p className="font-medium text-[#ACB5BB] text-2xl">Profile</p>
              </div>

              <div
                className="w-full flex items-center justify-start gap-3 py-[10px] px-3 rounded-xl cursor-pointer"
                onClick={() => handleNavigation("/dashboard/events")}
              >
                <Events />
                <p className="font-medium text-[#ACB5BB] text-2xl">Events</p>
              </div>

              <div
                className="w-full flex items-center justify-start gap-3 py-[10px] px-3 rounded-xl cursor-pointer"
                onClick={() => handleNavigation("/dashboard/tournaments")}
              >
                <Tournaments />
                <p className="font-medium text-[#ACB5BB] text-2xl">Ads</p>
              </div>

              <div
                className="w-full flex items-center justify-start gap-3 py-[10px] px-3 rounded-xl cursor-pointer"
                onClick={() => handleNavigation("/dashboard/boost")}
              >
                <Clock />
                <p className="font-medium text-[#ACB5BB] text-2xl">Boost Token</p>
              </div>

              <div
                className="w-full flex items-center justify-start gap-3 py-[10px] px-3 rounded-xl cursor-pointer"
                onClick={() => handleNavigation("/dashboard/referrals")}
              >
                <Referrals />
                <p className="font-medium text-[#ACB5BB] text-2xl">Referrals</p>
              </div>
            </div>
          </div>
        </div>

        <div className="w-full flex flex-col items-start justify-start gap-2">
          <div className="w-full flex items-center justify-start gap-3 py-[10px] px-3 rounded-lg" onClick={() => handleNavigation("/dashboard/settings")}
          >
            <Settings />
            <p className="font-medium text-[#ACB5BB] text-2xl">Settings</p>
          </div>
          <div className="w-full flex items-center justify-start gap-3 py-[8px] px-3 rounded-lg" onClick={() => handleNavigation("/dashboard/help")}
          >
            <Help />
            <p className="font-medium text-[#ACB5BB] text-2xl">Help & Center</p>
          </div>
          <div className="w-full bg-[#2C2C30] border-white border-opacity-30 flex items-center justify-between gap-3 py-[10px] px-3 rounded-lg">
            <div className="w-full flex items-start justify-start gap-2">
              <Image src={Avatar} alt=""/>
              <div className="flex flex-col items-start justify-center gap-1">
                <h2 className="text-white font-medium text-[1.4rem]">Alex</h2>
                <span className="text-[#6C7278] text-lg">alex@gmail.com</span>
              </div>
            </div>
            <Sort />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
