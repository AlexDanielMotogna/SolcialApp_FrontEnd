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


const Topbar = ({ activePath, toggleSidebar }: { activePath: string, toggleSidebar: () => void }) => {
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
      <div className='flex items-center justify-center mr-2 md:hidden'>
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

          <div className="relative md:flex items-center justify-center border border-[#2C2C30] rounded-2xl w-14 h-14 group cursor-pointer hidden">
            <Notification />

            <div
              className="absolute w-[335px] md:min-w-[410px] z-10 top-16 right-0 p-8 bg-[#161618] border rounded-2xl border-[#44444A] flex flex-col items-start justify-start gap-8 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-opacity duration-300"
              style={{
                boxShadow:
                  "0px 16px 20px -6px #000000A6, 0px 14px 22px -9px #FFFFFF0F inset",
              }}
            >
              <div className="w-full flex items-center justify-between">
                <h2 className="text-white font-semibold text-[1.6rem]">
                  Notification
                </h2>
                <p className="text-[#8C71F6] text-[1.4rem]">Mark as read</p>
              </div>

              <div className="w-full flex items-start justify-start gap-5">
                <Image src={Alert1} alt=''/>
                <div className="w-full flex flex-col items-start justify-start gap-3">
                  <p className="text-white font-medium text-[1.4rem]">
                    SOL Price Alert!
                  </p>
                  <span className="text-[#ACB5BB] text-xl">
                    Solana has just surpassed $50! 🚀 Tap here to view details
                    or adjust your trading strategy.
                  </span>
                </div>
              </div>

              <div className="w-full flex items-start justify-start gap-5">
                <Image src={Alert2} alt=''/>
                <div className="w-full flex flex-col items-start justify-start gap-3">
                  <p className="text-white font-medium text-[1.4rem]">
                    Transaction Confirmed
                  </p>
                  <span className="text-[#ACB5BB] text-xl">
                    Your purchase of 1 SOL at $35 per coin has been successfully
                    confirmed. View transaction details.
                  </span>
                </div>
              </div>

              <div className="w-full flex items-start justify-start gap-5">
                <Image src={Alert3} alt=''/>
                <div className="w-full flex flex-col items-start justify-start gap-3">
                  <p className="text-white font-medium text-[1.4rem]">
                    Weekly Portfolio Summary
                  </p>
                  <span className="text-[#ACB5BB] text-xl">
                    Your portfolio gained 3.2% this week! Tap here to review
                    your top-performing tokens.
                  </span>
                </div>
              </div>

              <div className="w-full flex items-start justify-start gap-5">
                <Image src={Alert4} alt=""/>
                <div className="w-full flex flex-col items-start justify-start gap-3">
                  <p className="text-white font-medium text-[1.4rem]">
                    Market Update: Ladder Match Rankings
                  </p>
                  <span className="text-[#ACB5BB] text-xl">
                    The latest Ladder Match rankings are out! See if you've
                    moved up the leaderboard and view your recent matches.
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="items-center justify-center border border-[#2C2C30] rounded-2xl w-14 h-14 hidden md:flex cursor-pointer">
            <User />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Topbar;
