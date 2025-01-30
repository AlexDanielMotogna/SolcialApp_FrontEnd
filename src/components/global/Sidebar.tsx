"use client";

import React, { FC, useState, useCallback, JSX } from "react";
import ReactLoading from 'react-loading';
import { useRouter } from "next/navigation";
import Image from "next/image";
import Menu from "../../../public/icons/Menu";
import Close from "../../../public/icons/Close";
import Analyzer from "../../../public/icons/Analyzer";
import Matches from "../../../public/icons/Matches";
import Quests from "../../../public/icons/Quests";
import Profile from "../../../public/icons/Profile";
import Events from "../../../public/icons/Events";
import Tournaments from "../../../public/icons/Tournaments";
import Referrals from "../../../public/icons/Referrals";
import Clock from "../../../public/icons/Clock";
import Settings from "../../../public/icons/Settings";
import Help from "../../../public/icons/Help";
import Logo from "../../../public/imgs/logo.png";
import Sort from "../../../public/icons/Sort";
import Avatar from "../../../public/imgs/Avatar.png";

interface MenuItemProps {
  icon: JSX.Element;
  label: string;
  path: string;
  isActive: boolean;
  onClick: () => void;
}

const MenuItem: FC<MenuItemProps> = ({
  icon,
  label,
  path,
  isActive,
  onClick,
}) => (
  <div
    className={`w-full flex items-center justify-start gap-3 py-[10px] px-3 rounded-xl cursor-pointer ${
      isActive
        ? "bg-[#2C2C30] border border-[#F6F7FA33] text-white shadow-[0px_8px_23px_-3px_rgba(0,0,0,1)]"
        : "text-[#ACB5BB]"
    }`}
    style={
      isActive
        ? { boxShadow: "inset 0px -5px 10px 0px rgba(255, 255, 255, 0.1)" }
        : {}
    }
    onClick={onClick}
    aria-label={label}
  >
    {React.cloneElement(icon, { color: isActive ? "white" : "#ACB5BB" })}
    <p className="font-medium text-2xl">{label}</p>
  </div>
);

const Sidebar: FC<{
  activePath: string;
  setActivePath: React.Dispatch<React.SetStateAction<string>>;
  isSidebarOpen: boolean;
  setIsSidebarOpen: React.Dispatch<React.SetStateAction<boolean>>;
}> = ({ activePath, setActivePath, isSidebarOpen, setIsSidebarOpen }) => {
  const router = useRouter();

  const handleNavigation = useCallback(
    (path: string) => {
      setActivePath(path);
      router.push(path);
      setIsSidebarOpen(false);
    },
    [router, setActivePath, setIsSidebarOpen]
  );

  const toggleSidebar = () => setIsSidebarOpen((prev) => !prev);

  return (
    <>
      <div
        className={`fixed top-0 left-0 h-screen w-[100vw] bg-[#111113] p-[2.4rem] z-20 transform transition-transform duration-300 ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } lg:w-[250px] lg:translate-x-0 lg:relative`}
      >
        <div className="w-full h-full flex flex-col justify-between items-start gap-[2.4rem]">
         <div className="w-full flex flex-col justify-start items-start gap-[2.4rem]">

          <div className="w-full flex items-center justify-between">
            <Image src={Logo} className="w-56" alt="Logo" />
            <button onClick={toggleSidebar} className="lg:hidden">
              {isSidebarOpen ? <Close /> : <Menu />}
            </button>
          </div>

          <div className="w-full flex flex-col items-start gap-3">
            <span className="text-[#6C7278] text-lg font-normal">MAIN MENU</span>
            <div className="w-full flex flex-col items-start gap-2">
              <MenuItem
                icon={<Analyzer />}
                label="Analyzer"
                path="/dashboard"
                isActive={activePath === "/dashboard"}
                onClick={() => handleNavigation("/dashboard")}
              />
              <MenuItem
                icon={<Matches />}
                label="Matches"
                path="/dashboard/matches"
                isActive={activePath === "/dashboard/matches"}
                onClick={() => handleNavigation("/dashboard/matches")}
              />
              <MenuItem
                icon={<Quests />}
                label="Quests"
                path="/dashboard/quests"
                isActive={activePath === "/dashboard/quests"}
                onClick={() => handleNavigation("/dashboard/quests")}
              />
              <MenuItem
                icon={<Profile />}
                label="Profile"
                path="/dashboard/profile"
                isActive={activePath === "/dashboard/profile"}
                onClick={() => handleNavigation("/dashboard/profile")}
              />
              <MenuItem
                icon={<Events />}
                label="Events"
                path="/dashboard/events"
                isActive={activePath === "/dashboard/events"}
                onClick={() => handleNavigation("/dashboard/events")}
              />
              <MenuItem
                icon={<Tournaments />}
                label="Tournaments"
                path="/dashboard/tournaments"
                isActive={activePath === "/dashboard/tournaments"}
                onClick={() => handleNavigation("/dashboard/tournaments")}
              />
              <MenuItem
                icon={<Clock />}
                label="Boost Token"
                path="/dashboard/boost"
                isActive={activePath === "/dashboard/boost"}
                onClick={() => handleNavigation("/dashboard/boost")}
              />
              <MenuItem
                icon={<Referrals />}
                label="Referrals"
                path="/dashboard/referrals"
                isActive={activePath === "/dashboard/referrals"}
                onClick={() => handleNavigation("/dashboard/referrals")}
              />
            </div>
          </div>
          </div>

          <div className="w-full flex flex-col items-start gap-2">
            <MenuItem
              icon={<Settings />}
              label="Settings"
              path="/dashboard/settings"
              isActive={activePath === "/dashboard/settings"}
              onClick={() => handleNavigation("/dashboard/settings")}
            />
            <MenuItem
              icon={<Help />}
              label="Help & Center"
              path="/dashboard/help"
              isActive={activePath === "/dashboard/help"}
              onClick={() => handleNavigation("/dashboard/help")}
            />
            <div className="w-full bg-[#2C2C30] border-white border-opacity-30 flex items-center justify-between gap-3 py-[10px] px-3 rounded-lg">
              <div className="w-full flex items-start justify-start gap-2">
                <Image src={Avatar} alt="User Avatar" />
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
    </>
  );
};

export default Sidebar;
