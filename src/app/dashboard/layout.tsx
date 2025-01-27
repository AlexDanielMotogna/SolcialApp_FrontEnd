"use client";

import React, { useState } from "react";

import Sidebar from "../../components/global/Sidebar";
import Topbar from "../../components/global/Topbar";
import CryptoRow from "../../components/global/CryptoRow/CryptoRow";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [activePath, setActivePath] = useState<string>("/dashboard");
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(prev => !prev);
  };

  return (
    <div className="w-full h-screen bg-[#111113] grid grid-cols-1 md:grid-cols-[250px_1fr]">
      <Sidebar isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen} activePath={activePath} setActivePath={setActivePath} />
      
      <div className="w-full h-full bg-[#161618] border border-[#2C2C30] rounded-tl-2xl rounded-bl-2xl overflow-x-hidden overflow-y-auto">
        <Topbar activePath={activePath} toggleSidebar={toggleSidebar} />
        <CryptoRow />
        <div>{children}</div>
      </div>
    </div>
  );
}
