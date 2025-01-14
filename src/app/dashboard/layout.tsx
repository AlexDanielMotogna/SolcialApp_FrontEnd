"use client";

import Sidebar from "../../components/global/Sidebar";
import Topbar from "../../components/global/Topbar";
import CryptoRow from "../../components/global/CryptoRow/CryptoRow";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="w-full h-screen bg-[#111113] grid grid-cols-1 md:grid-cols-[250px_1fr]">
      <Sidebar />

      <div className="w-full h-full bg-[#161618] border border-[#2C2C30] rounded-2xl overflow-x-hidden overflow-y-auto">
        <Topbar />
        <CryptoRow />
        <div>{children}</div>
      </div>
    </div>
  );
}
