"use client";

import Image from "next/image";
import React, { useState, useEffect } from "react";
import Search from "../../../public/icons/Search";
import ButtonLg from "../../components/ButtonLg";
import CleanShot from "../../../public/imgs/CleanShot.png";
import CleanShot3 from "../../../public/imgs/CleanShot3.png";
import CleanShot4 from "../../../public/imgs/CleanShot4.png";
import CleanShot5 from "../../../public/imgs/CleanShot5.png";
import CleanShot6 from "../../../public/imgs/CleanShot6.png";
import Shrimp from "../../../public/imgs/Shrimp.png";
import WhiteFlag from "../../../public/imgs/WhiteFlag.png";
import PowerShield from "../../../public/imgs/PowerShield.png";
import Hourglass from "../../../public/imgs/Hourglass.png";
import Sol from "../../../public/imgs/Sol.png";
import MatchSword from "../../../public/imgs/MatchSword.png";
import CoinGame from "../../../public/imgs/CoinGame.png";
import GameTrophy from "../../../public/imgs/GameTrophy.png";
import GameCrown from "../../../public/imgs/GameCrown.png";
import tCat from "../../../public/imgs/tCat.png";
import tPONKEI from "../../../public/imgs/tPONKEI.png";
import bgGrid from "../../../public/imgs/bgGrid.png";
import Game from "../../../public/imgs/Game.png";
import CleanShot8 from "../../../public/imgs/CleanShot8.png";
import Deexscreener from "../../../public/imgs/Deexscreener.png";
import ArrowRight from "../../../public/icons/ArrowRight";
import Button from "../../components/Button";
import Filter from "../../../public/icons/Filter";
import ArrowLeft from "../../../public/icons/ArrowLeft";
import NextArrow from "../../../public/icons/NextArrow";
import ArrowUp from "../../../public/icons/ArrowUp";
import Twitter from "../../../public/icons/Twitter";
import Discord from "../../../public/icons/Discord";
import Telegram from "../../../public/icons/Telegram";
import Twitch from "../../../public/imgs/Twitch.svg";
import Global from "../../../public/icons/Global";
import WalletChart from "@/components/WalletChart";
import Chat from "@/components/global/Chat";
import WalletTabs from "./components/WalletTabs";
import CreateQuest from "@/components/modals/CreateQuest";
import CreateMatch from "@/components/modals/CreateMatch";
import CreateLadder from "@/components/modals/CreateLadder";
import CreateToken from "@/components/modals/CreateToken";

import BoostTokenModal from "@/components/modals/BoostTokenModal";
import "../styles/animation.css"; // Import custom animation styles

const DashboardMain: React.FC = () => {
  const [openModal, setOpenModal] = useState<string | null>(null);

  const openModalHandler = (modalType: string) => {
    setOpenModal(modalType);
  };

  const closeModalHandler = () => {
    setOpenModal(null);
  };

  const [selectedTab, setSelectedTab] = useState("1 Day");

  const handleTabSelect = (selectedTab: string) => {
    setSelectedTab(selectedTab);
  };

  return (
    <div className="w-full p-[1.6rem] md:py-8 md:px-10 flex flex-col items-start justify-start gap-7 overflow-y-auto">
      <div className="w-full bg-[#1E1E20] p-5 border border-[#2C2C30] rounded-2xl flex flex-col md:flex-row items-center justify-center gap-5">
        <input
          placeholder="Enter Solana Wallet Address"
          className="w-full border border-[#2C2C30] outline-none rounded-2xl h-[52px] bg-transparent px-9 text-[#6C7278] font-normal text-[1.6rem] focus:border-opacity-90 focus:ring-1 focus:ring-[#2C2C30] transition duration-300 ease-in-out"
        />
        <div className="w-full md:w-[232px]">
          <ButtonLg text="Analyze" />
        </div>
      </div>

      <div className="w-full grid grid-cols-1 xl:grid-cols-[464px_1fr] gap-9">
        <div className="w-full bg-[#1E1E20] border border-[#2C2C30] rounded-2xl px-10 py-7 flex flex-col xl:flex-row items-center justify-center gap-6">
          <div className="w-full h-full flex flex-col items-center justify-between xl:border-r xl:border-r-[#2C2C30]">
            <div className="w-full flex items-center justify-center xl:justify-start gap-4">
              <Image src={Sol} alt="" />
              <p className="text-[#ACB5BB] text-[1.4rem] font-normal">
                SOL Balance
              </p>
            </div>

            <div className="w-full flex flex-col items-center xl:items-start xl:justify-start gap-2">
              <h3 className="text-white font-medium text-[3.2rem]">
                12.45 SOL
              </h3>
              <p className="text-[#ACB5BB] text-[1.4rem] font-normal">
                $21900.84 USD
              </p>
            </div>
          </div>

          <div className="w-full flex flex-col items-start justify-start gap-3">
            <div className="w-full flex items-end justify-between bg-[#2C2C30] border border-[#44444A] rounded-lg px-4 py-2">
              <span className="text-[1.4rem] text-[#ACB5BB]">
                Total Profit (SOL)
              </span>
              <p className="text-white font-semibold text-[1.4rem]">+45.12</p>
            </div>
            <div className="w-full flex items-end justify-between bg-[#2C2C30] border border-[#44444A] rounded-lg px-4 py-2">
              <span className="text-[1.4rem] text-[#ACB5BB]">
                Total Profit (USD)
              </span>
              <p className="text-white font-semibold text-[1.4rem]">
                $3,142.78
              </p>
            </div>
            <div className="w-full flex items-end justify-between bg-[#2C2C30] border border-[#44444A] rounded-lg px-4 py-2">
              <span className="text-[1.4rem] text-[#ACB5BB]">Buy Average</span>
              <p className="text-white font-semibold text-[1.4rem]">
                13.54 SOL
              </p>
            </div>
          </div>
        </div>

        <div className="w-full grid grid-cols-2 xl:grid-cols-4 gap-5">
          <div className="w-full bg-[#1E1E20] border border-[#2C2C30] rounded-2xl p-7 flex items-start justify-between flex-col">
            <Image src={Shrimp} alt="" />

            <div className="w-full flex flex-col items-start justify-start gap-1">
              <span className="text-xl text-[#ACB5BB]">Your Level</span>
              <h2 className="text-white text-3xl font-semibold">Shrimp</h2>
            </div>
          </div>
          <div className="w-full bg-[#1E1E20] border border-[#2C2C30] rounded-2xl p-7 flex items-start justify-between flex-col">
            <Image src={WhiteFlag} alt="" />

            <div className="w-full flex flex-col items-start justify-start gap-1">
              <span className="text-xl text-[#ACB5BB]">Win Rate</span>
              <h2 className="text-white text-3xl font-semibold">75%</h2>
            </div>
          </div>
          <div className="w-full bg-[#1E1E20] border border-[#2C2C30] rounded-2xl p-7 flex items-start justify-between flex-col">
            <Image src={PowerShield} alt="" />

            <div className="w-full flex flex-col items-start justify-start gap-1">
              <span className="text-xl text-[#ACB5BB]">Gain/Loss</span>
              <h2 className="text-white text-3xl font-semibold">+12%</h2>
            </div>
          </div>
          <div className="w-full bg-[#1E1E20] border border-[#2C2C30] rounded-2xl p-7 flex items-start justify-between flex-col">
            <Image src={Hourglass} alt="" />

            <div className="w-full flex flex-col items-start justify-start gap-1">
              <span className="text-xl text-[#ACB5BB]">Transactions</span>
              <h2 className="text-white text-3xl font-semibold">3000</h2>
            </div>
          </div>
        </div>
      </div>

      <div className="w-full grid grid-cols-1 xl:grid-cols-[1fr_180px] gap-5">
        <div className="w-full bg-[#161618] border border-[#2C2C30] rounded-2xl py-6 px-5 flex flex-col items-center justify-between gap-4 overflow-hidden">
          <div className="w-full flex flex-col md:flex-row gap-5 items-center justify-between">
            <h2 className="w-full text-white font-semibold text-[1.8rem]">
              Analyzer
            </h2>

            <div className="w-full md:w-max flex items-center justify-center gap-2 ">
              <div className="w-full flex items-center justify-start gap-3 border border-[#2C2C30] py-[0.8rem] px-5 rounded-xl focus-within:border-opacity-90 focus-within:ring-1 focus-within:ring-[#2C2C30] transition duration-300 ease-in-out">
                <Search />
                <input
                  className="border-none outline-none bg-transparent text-[1.4rem] font-normal text-[#ACB5BB]"
                  placeholder="Search anything..."
                />
              </div>

              <div className="w-[36px] h-[36px] flex items-center justify-center bg-[#2C2C30] rounded-xl cursor-pointer">
                <Filter />
              </div>
            </div>
          </div>

          <div className="w-full overflow-x-auto">
            <div className="min-w-[1500px] 2xl:min-w-0 flex items-start justify-start overflow-x-auto">
              <table className="w-full table-auto border-collapse border-spacing-0">
                <thead className="w-full bg-[#2C2C30] rounded-xl">
                  <tr>
                    <th className="text-[#ACB5BB] font-medium text-base w-[25px] py-4 px-5">
                      #
                    </th>
                    <th className="text-[#ACB5BB] font-medium text-base w-[33px] py-4 px-5 md:px-0 whitespace-nowrap md:whitespace-normal">
                      Icon
                    </th>

                    <th className="text-[#ACB5BB] font-medium text-base w-[57px] py-4 px-5 md:px-0 whitespace-nowrap md:whitespace-normal">
                      Token
                    </th>

                    <th className="text-[#ACB5BB] font-medium text-base w-[60px] py-4 px-5 md:px-0 whitespace-nowrap md:whitespace-normal">
                      Firs Buy
                    </th>
                    <th className="text-[#ACB5BB] font-medium text-base w-[83px] py-4 px-5 md:px-0 whitespace-nowrap md:whitespace-normal">
                      Token Buy
                    </th>
                    <th className="text-[#ACB5BB] font-medium text-base w-[55px] py-4 px-5 md:px-0 whitespace-nowrap md:whitespace-normal">
                      SOL Used
                    </th>
                    <th className="text-[#ACB5BB] font-medium text-base w-[61px] py-4 px-5 md:px-0 whitespace-nowrap md:whitespace-normal">
                      USDT Used
                    </th>
                    <th className="text-[#ACB5BB] font-medium text-base w-[52px] py-4 px-5 md:px-0 whitespace-nowrap md:whitespace-normal">
                      Buy/Sell
                    </th>
                    <th className="text-[#ACB5BB] font-medium text-base w-[82px] py-4 px-5 md:px-0 whitespace-nowrap md:whitespace-normal">
                      Token Sold
                    </th>
                    <th className="text-[#ACB5BB] font-medium text-base w-[66px] py-4 px-5 md:px-0 whitespace-nowrap md:whitespace-normal">
                      SOL Received
                    </th>
                    <th className="text-[#ACB5BB] font-medium text-base w-[75px] py-4 px-5 md:px-0 whitespace-nowrap md:whitespace-normal">
                      USDT Received
                    </th>
                    <th className="text-[#ACB5BB] font-medium text-base w-[81px] py-4 px-5 md:px-0 whitespace-nowrap md:whitespace-normal">
                      SOL Earned/Lost
                    </th>
                    <th className="text-[#ACB5BB] font-medium text-base w-[61px] py-4 px-5 md:px-0 whitespace-nowrap md:whitespace-normal">
                      Profit/Loss
                    </th>
                    <th className="text-[#ACB5BB] font-medium text-base w-[66px] py-4 px-5 md:px-0 whitespace-nowrap md:whitespace-normal">
                      Last Sell
                    </th>
                    <th className="text-[#ACB5BB] font-medium text-base w-[71px] py-4 px-5 md:px-0 whitespace-nowrap md:whitespace-normal">
                      Link
                    </th>
                  </tr>
                </thead>

                <tbody className="w-full">
                  <tr>
                    <td className="w-[25px] py-4 px-5 text-[#ACB5BB] font-medium text-[1.2rem] text-center">
                      1
                    </td>
                    <td className="w-[33px] py-4">
                      <div className="w-full flex items-center justify-center">
                        <Image src={CleanShot8} alt="" />
                      </div>
                    </td>
                    <td className="w-[57px] py-4 text-[#ACB5BB] font-medium text-[1.2rem] text-center">
                      LUNO
                    </td>
                    <td className="w-[60px] py-4 text-[#ACB5BB] font-medium text-[1.2rem] text-center">
                      6/1/2025 17:56:30
                    </td>
                    <td className="w-[83px] py-4 text-[#ACB5BB] font-medium text-[1.2rem] text-center">
                      418998.56
                    </td>
                    <td className="w-[55px] py-4">
                      <div className="w-full flex items-center justify-center gap-2">
                        <Image src={Sol} alt="" />
                        <h6 className="text-[#ACB5BB] font-medium text-[1.2rem]">
                          5.00
                        </h6>
                      </div>
                    </td>
                    <td className="w-[61px] py-4 text-[#ACB5BB] font-medium text-[1.2rem] text-center">
                      $1104.30
                    </td>
                    <td className="w-[52px] py-4 text-[#ACB5BB] font-medium text-[1.2rem] text-center">
                      8/5
                    </td>
                    <td className="w-[82px] py-4 text-[#ACB5BB] font-medium text-[1.2rem] text-center">
                      418998.56
                    </td>
                    <td className="w-[66px] py-4">
                      <div className="w-full flex items-center justify-center gap-2">
                        <Image src={Sol} alt="" />
                        <h6 className="text-[#ACB5BB] font-medium text-[1.2rem]">
                          0.86
                        </h6>
                      </div>
                    </td>
                    <td className="w-[75px] py-4 text-[#ACB5BB] font-medium text-[1.2rem] text-center">
                      $189.89
                    </td>
                    <td className="w-[81px] py-4">
                      <div className="w-full flex items-center justify-center gap-2">
                        <Image src={Sol} alt="" />
                        <h6 className="text-[#C65468] font-medium text-[1.2rem]">
                          -4.14
                        </h6>
                      </div>
                    </td>
                    <td className="w-[61px] py-4 text-[#EA3030] font-medium text-[1.2rem] text-center">
                      -82.89%
                    </td>
                    <td className="w-[66px] py-4 text-[#ACB5BB] font-medium text-[1.2rem] text-center">
                      6/1/2025 17:56:30
                    </td>
                    <td className="w-[71px] py-4">
                      <div className="w-full flex items-center justify-center">
                        <Image src={Deexscreener} alt="" />
                      </div>
                    </td>
                  </tr>

                  <tr>
                    <td className="w-[25px] py-4 px-5 text-[#ACB5BB] font-medium text-[1.2rem] text-center">
                      2
                    </td>
                    <td className="w-[33px] py-4">
                      <div className="w-full flex items-center justify-center">
                        <Image src={CleanShot4} alt="" />
                      </div>
                    </td>
                    <td className="w-[57px] py-4 text-[#ACB5BB] font-medium text-[1.2rem] text-center">
                      RELIQ
                    </td>
                    <td className="w-[60px] py-4 text-[#ACB5BB] font-medium text-[1.2rem] text-center">
                      6/1/2025 17:56:30
                    </td>
                    <td className="w-[83px] py-4 text-[#ACB5BB] font-medium text-[1.2rem] text-center">
                      1630933.34
                    </td>
                    <td className="w-[55px] py-4">
                      <div className="w-full flex items-center justify-center gap-2">
                        <Image src={Sol} alt="" />
                        <h6 className="text-[#ACB5BB] font-medium text-[1.2rem]">
                          5.00
                        </h6>
                      </div>
                    </td>
                    <td className="w-[61px] py-4 text-[#ACB5BB] font-medium text-[1.2rem] text-center">
                      $1090.55
                    </td>
                    <td className="w-[52px] py-4 text-[#ACB5BB] font-medium text-[1.2rem] text-center">
                      1/1
                    </td>
                    <td className="w-[82px] py-4 text-[#ACB5BB] font-medium text-[1.2rem] text-center">
                      1630933.34
                    </td>
                    <td className="w-[66px] py-4">
                      <div className="w-full flex items-center justify-center gap-2">
                        <Image src={Sol} alt="" />
                        <h6 className="text-[#ACB5BB] font-medium text-[1.2rem]">
                          0.10
                        </h6>
                      </div>
                    </td>
                    <td className="w-[75px] py-4 text-[#ACB5BB] font-medium text-[1.2rem] text-center">
                      $21.10
                    </td>
                    <td className="w-[81px] py-4">
                      <div className="w-full flex items-center justify-center gap-2">
                        <Image src={Sol} alt="" />
                        <h6 className="text-[#C65468] font-medium text-[1.2rem]">
                          -4.90
                        </h6>
                      </div>
                    </td>
                    <td className="w-[61px] py-4 text-[#EA3030] font-medium text-[1.2rem] text-center">
                      -98.07%
                    </td>
                    <td className="w-[66px] py-4 text-[#ACB5BB] font-medium text-[1.2rem] text-center">
                      6/1/2025 17:56:30
                    </td>
                    <td className="w-[71px] py-4">
                      <div className="w-full flex items-center justify-center">
                        <Image src={Deexscreener} alt="" />
                      </div>
                    </td>
                  </tr>

                  <tr>
                    <td className="w-[25px] py-4 px-5 text-[#ACB5BB] font-medium text-[1.2rem] text-center">
                      3
                    </td>
                    <td className="w-[33px] py-4">
                      <div className="w-full flex items-center justify-center">
                        <Image src={CleanShot} alt="" />
                      </div>
                    </td>
                    <td className="w-[57px] py-4 text-[#ACB5BB] font-medium text-[1.2rem] text-center">
                      GenBeta
                    </td>
                    <td className="w-[60px] py-4 text-[#ACB5BB] font-medium text-[1.2rem] text-center">
                      6/1/2025 17:56:30
                    </td>
                    <td className="w-[83px] py-4 text-[#ACB5BB] font-medium text-[1.2rem] text-center">
                      2156176.51
                    </td>
                    <td className="w-[55px] py-4">
                      <div className="w-full flex items-center justify-center gap-2">
                        <Image src={Sol} alt="" />
                        <h6 className="text-[#ACB5BB] font-medium text-[1.2rem]">
                          10.00
                        </h6>
                      </div>
                    </td>
                    <td className="w-[61px] py-4 text-[#ACB5BB] font-medium text-[1.2rem] text-center">
                      $1093.95
                    </td>
                    <td className="w-[52px] py-4 text-[#ACB5BB] font-medium text-[1.2rem] text-center">
                      1/0
                    </td>
                    <td className="w-[82px] py-4 text-[#ACB5BB] font-medium text-[1.2rem] text-center">
                      0.00
                    </td>
                    <td className="w-[66px] py-4">
                      <div className="w-full flex items-center justify-center gap-2">
                        <Image src={Sol} alt="" />
                        <h6 className="text-[#ACB5BB] font-medium text-[1.2rem]">
                          0.00
                        </h6>
                      </div>
                    </td>
                    <td className="w-[75px] py-4 text-[#ACB5BB] font-medium text-[1.2rem] text-center">
                      $0.00
                    </td>
                    <td className="w-[81px] py-4">
                      <div className="w-full flex items-center justify-center gap-2">
                        <Image src={Sol} alt="" />
                        <h6 className="text-[#ACB5BB] font-medium text-[1.2rem]">
                          N/A
                        </h6>
                      </div>
                    </td>
                    <td className="w-[61px] py-4 text-[#ACB5BB] font-medium text-[1.2rem] text-center">
                      0.00%
                    </td>
                    <td className="w-[66px] py-4 text-[#ACB5BB] font-medium text-[1.2rem] text-center">
                      N/A
                    </td>
                    <td className="w-[71px] py-4">
                      <div className="w-full flex items-center justify-center">
                        <Image src={Deexscreener} alt="" />
                      </div>
                    </td>
                  </tr>

                  <tr>
                    <td className="w-[25px] py-4 px-5 text-[#ACB5BB] font-medium text-[1.2rem] text-center">
                      4
                    </td>
                    <td className="w-[33px] py-4">
                      <div className="w-full flex items-center justify-center">
                        <Image src={CleanShot8} alt="" />
                      </div>
                    </td>
                    <td className="w-[57px] py-4 text-[#ACB5BB] font-medium text-[1.2rem] text-center">
                      F(ART)
                    </td>
                    <td className="w-[60px] py-4 text-[#ACB5BB] font-medium text-[1.2rem] text-center">
                      6/1/2025 17:56:30
                    </td>
                    <td className="w-[83px] py-4 text-[#ACB5BB] font-medium text-[1.2rem] text-center">
                      12029029.88
                    </td>
                    <td className="w-[55px] py-4">
                      <div className="w-full flex items-center justify-center gap-2">
                        <Image src={Sol} alt="" />
                        <h6 className="text-[#ACB5BB] font-medium text-[1.2rem]">
                          3.50
                        </h6>
                      </div>
                    </td>
                    <td className="w-[61px] py-4 text-[#ACB5BB] font-medium text-[1.2rem] text-center">
                      $431.98
                    </td>
                    <td className="w-[52px] py-4 text-[#ACB5BB] font-medium text-[1.2rem] text-center">
                      5/6
                    </td>
                    <td className="w-[82px] py-4 text-[#ACB5BB] font-medium text-[1.2rem] text-center">
                      0.00
                    </td>
                    <td className="w-[66px] py-4">
                      <div className="w-full flex items-center justify-center gap-2">
                        <Image src={Sol} alt="" />
                        <h6 className="text-[#ACB5BB] font-medium text-[1.2rem]">
                          0.49
                        </h6>
                      </div>
                    </td>
                    <td className="w-[75px] py-4 text-[#ACB5BB] font-medium text-[1.2rem] text-center">
                      $431.98
                    </td>
                    <td className="w-[81px] py-4">
                      <div className="w-full flex items-center justify-center gap-2">
                        <Image src={Sol} alt="" />
                        <h6 className="text-[#C65468] font-medium text-[1.2rem]">
                          -1.51
                        </h6>
                      </div>
                    </td>
                    <td className="w-[61px] py-4 text-[#EA3030] font-medium text-[1.2rem] text-center">
                      -75.37%
                    </td>
                    <td className="w-[66px] py-4 text-[#ACB5BB] font-medium text-[1.2rem] text-center">
                      6/1/2025 17:56:30
                    </td>
                    <td className="w-[71px] py-4">
                      <div className="w-full flex items-center justify-center">
                        <Image src={Deexscreener} alt="" />
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td className="w-[25px] py-4 px-5 text-[#ACB5BB] font-medium text-[1.2rem] text-center">
                      5
                    </td>
                    <td className="w-[33px] py-4">
                      <div className="w-full flex items-center justify-center">
                        <Image src={CleanShot8} alt="" />
                      </div>
                    </td>
                    <td className="w-[57px] py-4 text-[#ACB5BB] font-medium text-[1.2rem] text-center">
                      LUNO
                    </td>
                    <td className="w-[60px] py-4 text-[#ACB5BB] font-medium text-[1.2rem] text-center">
                      6/1/2025 17:56:30
                    </td>
                    <td className="w-[83px] py-4 text-[#ACB5BB] font-medium text-[1.2rem] text-center">
                      418998.56
                    </td>
                    <td className="w-[55px] py-4">
                      <div className="w-full flex items-center justify-center gap-2">
                        <Image src={Sol} alt="" />
                        <h6 className="text-[#ACB5BB] font-medium text-[1.2rem]">
                          5.00
                        </h6>
                      </div>
                    </td>
                    <td className="w-[61px] py-4 text-[#ACB5BB] font-medium text-[1.2rem] text-center">
                      $1104.30
                    </td>
                    <td className="w-[52px] py-4 text-[#ACB5BB] font-medium text-[1.2rem] text-center">
                      8/5
                    </td>
                    <td className="w-[82px] py-4 text-[#ACB5BB] font-medium text-[1.2rem] text-center">
                      418998.56
                    </td>
                    <td className="w-[66px] py-4">
                      <div className="w-full flex items-center justify-center gap-2">
                        <Image src={Sol} alt="" />
                        <h6 className="text-[#ACB5BB] font-medium text-[1.2rem]">
                          0.86
                        </h6>
                      </div>
                    </td>
                    <td className="w-[75px] py-4 text-[#ACB5BB] font-medium text-[1.2rem] text-center">
                      $189.89
                    </td>
                    <td className="w-[81px] py-4">
                      <div className="w-full flex items-center justify-center gap-2">
                        <Image src={Sol} alt="" />
                        <h6 className="text-[#C65468] font-medium text-[1.2rem]">
                          -4.14
                        </h6>
                      </div>
                    </td>
                    <td className="w-[61px] py-4 text-[#EA3030] font-medium text-[1.2rem] text-center">
                      -82.89%
                    </td>
                    <td className="w-[66px] py-4 text-[#ACB5BB] font-medium text-[1.2rem] text-center">
                      6/1/2025 17:56:30
                    </td>
                    <td className="w-[71px] py-4">
                      <div className="w-full flex items-center justify-center">
                        <Image src={Deexscreener} alt="" />
                      </div>
                    </td>
                  </tr>

                  <tr>
                    <td className="w-[25px] py-4 px-5 text-[#ACB5BB] font-medium text-[1.2rem] text-center">
                      6
                    </td>
                    <td className="w-[33px] py-4">
                      <div className="w-full flex items-center justify-center">
                        <Image src={CleanShot4} alt="" />
                      </div>
                    </td>
                    <td className="w-[57px] py-4 text-[#ACB5BB] font-medium text-[1.2rem] text-center">
                      RELIQ
                    </td>
                    <td className="w-[60px] py-4 text-[#ACB5BB] font-medium text-[1.2rem] text-center">
                      6/1/2025 17:56:30
                    </td>
                    <td className="w-[83px] py-4 text-[#ACB5BB] font-medium text-[1.2rem] text-center">
                      1630933.34
                    </td>
                    <td className="w-[55px] py-4">
                      <div className="w-full flex items-center justify-center gap-2">
                        <Image src={Sol} alt="" />
                        <h6 className="text-[#ACB5BB] font-medium text-[1.2rem]">
                          5.00
                        </h6>
                      </div>
                    </td>
                    <td className="w-[61px] py-4 text-[#ACB5BB] font-medium text-[1.2rem] text-center">
                      $1090.55
                    </td>
                    <td className="w-[52px] py-4 text-[#ACB5BB] font-medium text-[1.2rem] text-center">
                      1/1
                    </td>
                    <td className="w-[82px] py-4 text-[#ACB5BB] font-medium text-[1.2rem] text-center">
                      1630933.34
                    </td>
                    <td className="w-[66px] py-4">
                      <div className="w-full flex items-center justify-center gap-2">
                        <Image src={Sol} alt="" />
                        <h6 className="text-[#ACB5BB] font-medium text-[1.2rem]">
                          0.10
                        </h6>
                      </div>
                    </td>
                    <td className="w-[75px] py-4 text-[#ACB5BB] font-medium text-[1.2rem] text-center">
                      $21.10
                    </td>
                    <td className="w-[81px] py-4">
                      <div className="w-full flex items-center justify-center gap-2">
                        <Image src={Sol} alt="" />
                        <h6 className="text-[#C65468] font-medium text-[1.2rem]">
                          -4.90
                        </h6>
                      </div>
                    </td>
                    <td className="w-[61px] py-4 text-[#EA3030] font-medium text-[1.2rem] text-center">
                      -98.07%
                    </td>
                    <td className="w-[66px] py-4 text-[#ACB5BB] font-medium text-[1.2rem] text-center">
                      6/1/2025 17:56:30
                    </td>
                    <td className="w-[71px] py-4">
                      <div className="w-full flex items-center justify-center">
                        <Image src={Deexscreener} alt="" />
                      </div>
                    </td>
                  </tr>

                  <tr>
                    <td className="w-[25px] py-4 px-5 text-[#ACB5BB] font-medium text-[1.2rem] text-center">
                      7
                    </td>
                    <td className="w-[33px] py-4">
                      <div className="w-full flex items-center justify-center">
                        <Image src={CleanShot} alt="" />
                      </div>
                    </td>
                    <td className="w-[57px] py-4 text-[#ACB5BB] font-medium text-[1.2rem] text-center">
                      GenBeta
                    </td>
                    <td className="w-[60px] py-4 text-[#ACB5BB] font-medium text-[1.2rem] text-center">
                      6/1/2025 17:56:30
                    </td>
                    <td className="w-[83px] py-4 text-[#ACB5BB] font-medium text-[1.2rem] text-center">
                      2156176.51
                    </td>
                    <td className="w-[55px] py-4">
                      <div className="w-full flex items-center justify-center gap-2">
                        <Image src={Sol} alt="" />
                        <h6 className="text-[#ACB5BB] font-medium text-[1.2rem]">
                          10.00
                        </h6>
                      </div>
                    </td>
                    <td className="w-[61px] py-4 text-[#ACB5BB] font-medium text-[1.2rem] text-center">
                      $1093.95
                    </td>
                    <td className="w-[52px] py-4 text-[#ACB5BB] font-medium text-[1.2rem] text-center">
                      1/0
                    </td>
                    <td className="w-[82px] py-4 text-[#ACB5BB] font-medium text-[1.2rem] text-center">
                      0.00
                    </td>
                    <td className="w-[66px] py-4">
                      <div className="w-full flex items-center justify-center gap-2">
                        <Image src={Sol} alt="" />
                        <h6 className="text-[#ACB5BB] font-medium text-[1.2rem]">
                          0.00
                        </h6>
                      </div>
                    </td>
                    <td className="w-[75px] py-4 text-[#ACB5BB] font-medium text-[1.2rem] text-center">
                      $0.00
                    </td>
                    <td className="w-[81px] py-4">
                      <div className="w-full flex items-center justify-center gap-2">
                        <Image src={Sol} alt="" />
                        <h6 className="text-[#ACB5BB] font-medium text-[1.2rem]">
                          N/A
                        </h6>
                      </div>
                    </td>
                    <td className="w-[61px] py-4 text-[#ACB5BB] font-medium text-[1.2rem] text-center">
                      0.00%
                    </td>
                    <td className="w-[66px] py-4 text-[#ACB5BB] font-medium text-[1.2rem] text-center">
                      N/A
                    </td>
                    <td className="w-[71px] py-4">
                      <div className="w-full flex items-center justify-center">
                        <Image src={Deexscreener} alt="" />
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <div className="w-full flex flex-col md:flex-row gap-5 items-start justify-between">
            <div className="flex items-center justify-center gap-10">
              <div className="w-[32px] h-[32px] flex items-center justify-center border border-[#44444A] rounded-xl cursor-pointer">
                <ArrowLeft />
              </div>
              <div className="flex items-center justify-center">
                <span className="h-[32px] rounded-xl bg-[#44444A] text-white px-6 flex items-center font-bold text-[1.2rem] cursor-pointer">
                  1
                </span>
                <span className="h-[32px] rounded-xl text-[#6C7278] px-6 flex items-center font-bold text-[1.2rem] cursor-pointer">
                  2
                </span>
                <span className="h-[32px] rounded-xl text-[#6C7278] px-6 flex items-center font-bold text-[1.2rem] cursor-pointer">
                  3
                </span>
                <span className="h-[32px] rounded-xl text-[#6C7278] px-6 flex items-center font-bold text-[1.2rem] cursor-pointer">
                  ...
                </span>
                <span className="h-[32px] rounded-xl text-[#6C7278] px-6 flex items-center font-bold text-[1.2rem] cursor-pointer">
                  10
                </span>
              </div>
              <div className="w-[32px] h-[32px] flex items-center justify-center border border-[#44444A] rounded-xl cursor-pointer">
                <NextArrow />
              </div>
            </div>

            <div className="flex items-center justify-center gap-7">
              <span className="text-[#6C7278] text-[1.2rem]">
                Showing 1 to 10 of 50 entries
              </span>
              <div className="hidden md:flex items-center justify-center gap-4 bg-[#2C2C30] border border-[#44444A] rounded-xl p-4 text-white font-medium text-[1.2rem] cursor-pointer">
                <p>Show 10</p>
                <ArrowUp />
              </div>
              -
            </div>
          </div>
        </div>

        <div className="w-full grid grid-rows-4 gap-4">
          <div
            className="w-full bg-[#1E1E20] border border-[#2C2C30] rounded-2xl py-5 pl-4 pr-5 flex flex-col items-start justify-between gap-4 cursor-pointer"
            onClick={() => openModalHandler("match")}
          >
            <Image src={MatchSword} alt="" />

            <div className="w-full flex items-end justify-end">
              <div className="w-full flex flex-col items-start justify-start gap-1">
                <h2 className="font-semibold text-[1.4rem] text-[#EDF1F3] cursor-pointer">
                  Create Match
                </h2>
                <p className="text-[#ACB5BB] text-[1rem] font-normal">
                  Start competing with others.
                </p>
              </div>
              <ArrowRight />
            </div>
          </div>

          <div
            className="w-full bg-[#1E1E20] border border-[#2C2C30] rounded-2xl py-5 pl-4 pr-5 flex flex-col items-start justify-between cursor-pointer"
            onClick={() => openModalHandler("quest")}
          >
            <Image src={GameTrophy} alt="" />

            <div className="w-full flex items-end justify-end">
              <div className="w-full flex flex-col items-start justify-start gap-1">
                <h2 className="font-semibold text-[1.4rem] text-[#EDF1F3] cursor-pointer">
                  Create Quest
                </h2>
                <p className="text-[#ACB5BB] text-[1rem] font-normal">
                  New challenge for users.
                </p>
              </div>
              <ArrowRight />
            </div>
          </div>

          <div
            className="w-full bg-[#1E1E20] border border-[#2C2C30] rounded-2xl py-5 pl-4 pr-5 flex flex-col items-start justify-between cursor-pointer"
            onClick={() => openModalHandler("Ladder")}
          >
            <Image src={GameCrown} alt="" />

            <div className="w-full flex items-end justify-end">
              <div className="w-full flex flex-col items-start justify-start gap-1">
                <h2 className="font-semibold text-[1.4rem] text-[#EDF1F3] cursor-pointer">
                  View Leaderboard
                </h2>
                <p className="text-[#ACB5BB] text-[1rem] font-normal">
                  Track top players and ranking.
                </p>
              </div>
              <ArrowRight />
            </div>
          </div>

          <div
            className="w-full bg-[#1E1E20] border border-[#2C2C30] rounded-2xl py-5 pl-4 pr-5 flex flex-col items-start justify-between cursor-pointer"
            onClick={() => openModalHandler("Token")}
          >
            <Image src={CoinGame} alt="" />

            <div className="w-full flex items-end justify-end">
              <div className="w-full flex flex-col items-start justify-start gap-1">
                <h2 className="font-semibold text-[1.4rem] text-[#EDF1F3] cursor-pointer">
                  Create Advertising
                </h2>
                <p className="text-[#ACB5BB] text-[1rem] font-normal">
                  Promote & reach audience.
                </p>
              </div>
              <ArrowRight />
            </div>
          </div>
        </div>
      </div>

      <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-5">
        <div className="w-full bg-[#161618] border border-[#2C2C30] rounded-2xl p-4 md:p-6 flex flex-col items-start justify-start gap-5 md:gap-7">
          <h2 className="w-full text-white font-semibold text-[1.4rem] md:text-[1.8rem]">
            Top 3 Gains
          </h2>

          <div className="w-full overflow-x-auto">
            <table className="w-full">
              <thead className="w-full flex items-center justify-start bg-[#2C2C30] rounded-xl py-4 px-5">
                <tr>
                  <th className="text-[#ACB5BB] font-medium text-[1rem] md:text-[1.2rem] w-[50px] md:w-[57px] text-left">
                    Тор
                  </th>
                  <th className="text-[#ACB5BB] font-medium text-[1rem] md:text-[1.2rem] w-[140px] md:w-[240px] text-left">
                    Token
                  </th>
                  <th className="text-[#ACB5BB] font-medium text-[1rem] md:text-[1.2rem] w-[100px] md:w-auto text-left">
                    $Gained
                  </th>
                </tr>
              </thead>

              <tbody className="w-full flex flex-col items-center justify-start">
                <tr className="w-full flex items-center py-2 px-3 md:py-3 md:px-5">
                  <td className="text-[#ACB5BB] font-medium text-[1rem] md:text-[1.4rem] w-[50px] md:w-[57px]">
                    #1
                  </td>
                  <td className="text-white font-medium text-[1rem] md:text-[1.6rem] flex items-center justify-start gap-2 md:gap-3 w-[140px] md:w-[240px]">
                    <Image
                      src={tCat}
                      className="h-[20px] w-[20px] md:h-auto md:w-auto"
                      alt=""
                    />
                    CATS
                  </td>
                  <td className="text-[#ACB5BB] font-medium text-[1rem] md:text-[1.4rem] w-[100px] md:w-auto">
                    $6.8K
                  </td>
                </tr>

                <tr className="w-full flex items-center py-2 px-3 md:py-3 md:px-5">
                  <td className="text-[#ACB5BB] font-medium text-[1rem] md:text-[1.4rem] w-[50px] md:w-[57px]">
                    #2
                  </td>
                  <td className="text-white font-medium text-[1rem] md:text-[1.6rem] flex items-center justify-start gap-2 md:gap-3 w-[140px] md:w-[240px]">
                    <Image
                      src={tPONKEI}
                      className="h-[20px] w-[20px] md:h-auto md:w-auto"
                      alt=""
                    />
                    PONKEI
                  </td>
                  <td className="text-[#ACB5BB] font-medium text-[1rem] md:text-[1.4rem] w-[100px] md:w-auto">
                    $1.7K
                  </td>
                </tr>

                <tr className="w-full flex items-center py-2 px-3 md:py-3 md:px-5">
                  <td className="text-[#ACB5BB] font-medium text-[1rem] md:text-[1.4rem] w-[50px] md:w-[57px]">
                    #3
                  </td>
                  <td className="text-white font-medium text-[1rem] md:text-[1.6rem] flex items-center justify-start gap-2 md:gap-3 w-[140px] md:w-[240px]">
                    <Image
                      src={CleanShot5}
                      className="h-[20px] w-[20px] md:h-auto md:w-auto"
                      alt=""
                    />
                    DOLPHINWIF
                  </td>
                  <td className="text-[#ACB5BB] font-medium text-[1rem] md:text-[1.4rem] w-[100px] md:w-auto">
                    $0.6K
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div className="w-full bg-[#161618] border border-[#2C2C30] rounded-2xl p-6 flex flex-col items-start justify-start gap-7">
          <h2 className="w-full text-white font-semibold text-[1.8rem]">
            Top 3 Holdings
          </h2>

          <div className="w-full overflow-x-auto">
            <table className="w-full flex flex-col items-start justify-start gap-3">
              <thead className="w-full flex items-center justify-start bg-[#2C2C30] rounded-xl py-4 px-5">
                <tr>
                  <th className="text-[#ACB5BB] font-medium text-[1rem] md:text-[1.2rem] w-[50px] md:w-[57px] text-left">
                    Тор
                  </th>
                  <th className="text-[#ACB5BB] font-medium text-[1rem] md:text-[1.2rem] w-[140px] md:w-[240px] text-left">
                    Token
                  </th>
                  <th className="text-[#ACB5BB] font-medium text-[1rem] md:text-[1.2rem] w-[100px] md:w-[160px] text-left">
                    Token amount
                  </th>
                  <th className="text-[#ACB5BB] font-medium text-[1rem] md:text-[1.2rem] w-[80px] md:w-[160px] text-left">
                    $Price
                  </th>
                </tr>
              </thead>

              <tbody className="w-full">
                <tr className="w-full flex items-center py-2 px-3 md:py-3 md:px-5">
                  <td className="text-[#ACB5BB] font-medium text-[1rem] md:text-[1.4rem] w-[50px] md:w-[57px]">
                    #1
                  </td>
                  <td className="text-white font-medium text-[1rem] md:text-[1.6rem] flex items-center justify-start gap-2 md:gap-3 w-[140px] md:w-[240px]">
                    <Image
                      src={CleanShot6}
                      className="h-[24px] w-[24px] md:h-auto md:w-auto"
                      alt=""
                    />
                    GOAT
                  </td>
                  <td className="text-[#ACB5BB] font-medium text-[1rem] md:text-[1.4rem] w-[100px] md:w-[160px]">
                    9,101.256
                  </td>
                  <td className="text-[#ACB5BB] font-medium text-[1rem] md:text-[1.4rem] w-[80px] md:w-[160px]">
                    $6.8K
                  </td>
                </tr>

                <tr className="w-full flex items-center py-2 px-3 md:py-3 md:px-5">
                  <td className="text-[#ACB5BB] font-medium text-[1rem] md:text-[1.4rem] w-[50px] md:w-[57px]">
                    #2
                  </td>
                  <td className="text-white font-medium text-[1rem] md:text-[1.6rem] flex items-center justify-start gap-2 md:gap-3 w-[140px] md:w-[240px]">
                    <Image
                      src={CleanShot3}
                      className="h-[24px] w-[24px] md:h-auto md:w-auto"
                      alt=""
                    />
                    RHEA
                  </td>
                  <td className="text-[#ACB5BB] font-medium text-[1rem] md:text-[1.4rem] w-[100px] md:w-[160px]">
                    5,678.432
                  </td>
                  <td className="text-[#ACB5BB] font-medium text-[1rem] md:text-[1.4rem] w-[80px] md:w-[160px]">
                    $1.7K
                  </td>
                </tr>

                <tr className="w-full flex items-center py-2 px-3 md:py-3 md:px-5 relative">
                  <td className="text-[#ACB5BB] font-medium text-[1rem] md:text-[1.4rem] w-[50px] md:w-[57px]">
                    #3
                  </td>
                  <td className="text-white font-medium text-[1rem] md:text-[1.6rem] flex items-center justify-start gap-2 md:gap-3 w-[140px] md:w-[240px]">
                    <Image
                      src={CleanShot}
                      className="h-[24px] w-[24px] md:h-auto md:w-auto"
                      alt=""
                    />
                    GenBeta
                  </td>
                  <td className="text-[#ACB5BB] font-medium text-[1rem] md:text-[1.4rem] w-[100px] md:w-[160px]">
                    2,345.678
                  </td>
                  <td className="text-[#ACB5BB] font-medium text-[1rem] md:text-[1.4rem] w-[80px] md:w-[160px]">
                    $0.6K
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <div className="w-full h-full grid grid-cols-1 2xl:grid-cols-[1fr_302px] gap-8 pb-28">
        <div className="w-full bg-[#1E1E20] border border-[#2C2C30] rounded-2xl py-8 px-10 flex flex-col items-start justify-start gap-8">
          <div className="w-full flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <h2 className="w-full text-white font-semibold text-[1.8rem]">
              Wallet Balance History
            </h2>

            <WalletTabs
              options={["1 Day", "7 Days", "30 Days", "Custom"]}
              onTabSelect={handleTabSelect}
            />
          </div>

          <WalletChart selectedTab={selectedTab} />
        </div>

        <div className="w-full bg-[#161618] border border-[#2C2C30] rounded-2xl overflow-hidden relative">
          <Image src={bgGrid} className="w-full relative h-[400px]" alt="" />

          <div className="w-full h-full flex flex-col items-center justify-between gap-6 p-6 absolute top-0 left-0">
            <div className="w-full flex flex-col items-center justify-center gap-5 relative overflow-hidden rounded-[12px]">
              <Image
                src={Game}
                className="w-full relative overflow-hidden object-cover"
                alt=""
              />

              <div className="w-full flex items-center justify-between py-3 px-8 absolute bottom-0 left-0 bg-[rgba(30,30,32,0.9)]">
                <div className="w-[32px] h-[32px] flex items-center justify-center border border-white rounded-xl">
                  <Twitter />
                </div>
                <div className="w-[32px] h-[32px] flex items-center justify-center border border-white rounded-xl">
                  <Discord />
                </div>
                <div className="w-[32px] h-[32px] flex items-center justify-center border border-white rounded-xl">
                  <Telegram />
                </div>
                <div className="w-[32px] h-[32px] flex items-center justify-center border border-white rounded-xl">
                  <Image src={Twitch} alt="" />
                </div>
                <div className="w-[32px] h-[32px] flex items-center justify-center border border-white rounded-xl">
                  <Global />
                </div>
              </div>
            </div>

            <div className="w-full flex flex-col items-start justify-center gap-6">
              <div className="w-full flex flex-col items-start justify-center gap-1">
                <h3 className="text-white font-semibold text-[1.6rem]">
                  Advertise Your Project
                </h3>
                <p className="text-[#ACB5BB] text-[1.2rem]">
                  Promote your project to a larger audience and achieve your
                  goals faster.
                </p>
              </div>

              <div className="w-full flex flex-col items-center justify-center gap-6">

                <div className="w-full flex flex-col gap-3">
                  <Button text="Create Advertisement" size="sm" onClick={() => openModalHandler("Token")} />
                  <Button text="Boost Token" size="sm" onClick={() => openModalHandler("BoostToken")} />
                </div>
                <Button
                  text="Create Advertisement"
                  size="sm"
                  onClick={() => openModalHandler("Token")}
                />
                <a className="cursor-pointer text-white font-semibold text-[1.2rem]">
                  Learn more
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
      {openModal === "quest" && (
        <CreateQuest
          isOpen={true}
          onClose={closeModalHandler}
          refreshQuests={() => {}}
        />
      )}
      {openModal === "match" && (
        <CreateMatch isOpen={true} onClose={closeModalHandler} />
      )}
      {openModal === "Ladder" && (
        <CreateLadder isOpen={true} onClose={closeModalHandler} />
      )}
      {openModal === "Token" && (
        <CreateToken isOpen={true} onClose={closeModalHandler} />
      )}
      {openModal === "BoostToken" && (
        <BoostTokenModal isOpen={true} onClose={closeModalHandler} />
      )}
      <Chat />
    </div>
  );
};

export default DashboardMain;
