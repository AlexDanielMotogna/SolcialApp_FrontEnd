import Image from "next/image";

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
import Graph from "../../../public/imgs/Graph.png";
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
import Chat from "../../../public/imgs/Chat.png";
import Global from "../../../public/icons/Global";

const DashboardMain = () => {
  return (
    <div className="w-full py-8 px-10 flex flex-col items-start justify-start gap-7 overflow-y-auto">
      <div className="w-full bg-[#1E1E20] p-5 border border-[#2C2C30] rounded-2xl flex flex-col md:flex-row items-center justify-center gap-5">
        <input
          placeholder="Enter Solana Wallet Address"
          className="w-full border border-[#2C2C30] rounded-2xl h-[52px] bg-transparent px-9 text-[#6C7278] font-normal text-[1.6rem]"
        />
        <div className="w-full md:w-[232px]">
          <ButtonLg text="Analyze" />
        </div>
      </div>

      <div className="w-full grid grid-cols-1 md:grid-cols-[464px_1fr] gap-9">
        <div className="w-full bg-[#1E1E20] border border-[#2C2C30] rounded-2xl px-10 py-7 flex flex-col md:flex-row items-center justify-center gap-6">
          <div className="w-full h-full flex flex-col items-center justify-between md:border-r md:border-r-[#2C2C30]">
            <div className="w-full flex items-center justify-center md:justify-start gap-4">
              <Image src={Sol} alt=""/>
              <p className="text-[#ACB5BB] text-[1.4rem] font-normal">
                SOL Balance
              </p>
            </div>

            <div className="w-full flex flex-col items-center md:items-start md:justify-start gap-2">
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

        <div className="w-full grid grid-cols-2 md:grid-cols-4 gap-5">
          {/* <div className="w-full bg-[#1E1E20] border border-[#2C2C30] rounded-2xl p-7 flex items-start justify-between flex-col">
              <Image src={Treasure} />

              <div className="w-full flex flex-col items-start justify-start gap-1">
                <span className="text-xl text-[#ACB5BB]">Wallet Balance</span>
                <h2 className="text-white text-3xl font-semibold">$0.00</h2>
              </div>
            </div> */}
          <div className="w-full bg-[#1E1E20] border border-[#2C2C30] rounded-2xl p-7 flex items-start justify-between flex-col">
            <Image src={Shrimp} alt=""/>

            <div className="w-full flex flex-col items-start justify-start gap-1">
              <span className="text-xl text-[#ACB5BB]">Your Level</span>
              <h2 className="text-white text-3xl font-semibold">Shrimp</h2>
            </div>
          </div>
          <div className="w-full bg-[#1E1E20] border border-[#2C2C30] rounded-2xl p-7 flex items-start justify-between flex-col">
            <Image src={WhiteFlag} alt=""/>

            <div className="w-full flex flex-col items-start justify-start gap-1">
              <span className="text-xl text-[#ACB5BB]">Win Rate</span>
              <h2 className="text-white text-3xl font-semibold">75%</h2>
            </div>
          </div>
          <div className="w-full bg-[#1E1E20] border border-[#2C2C30] rounded-2xl p-7 flex items-start justify-between flex-col">
            <Image src={PowerShield} alt=""/>

            <div className="w-full flex flex-col items-start justify-start gap-1">
              <span className="text-xl text-[#ACB5BB]">Gain/Loss</span>
              <h2 className="text-white text-3xl font-semibold">+12%</h2>
            </div>
          </div>
          <div className="w-full bg-[#1E1E20] border border-[#2C2C30] rounded-2xl p-7 flex items-start justify-between flex-col">
            <Image src={Hourglass} alt=""/>

            <div className="w-full flex flex-col items-start justify-start gap-1">
              <span className="text-xl text-[#ACB5BB]">Transactions</span>
              <h2 className="text-white text-3xl font-semibold">3000</h2>
            </div>
          </div>
        </div>
      </div>

      <div className="w-full grid grid-cols-1 md:grid-cols-[1fr_180px] gap-5">
        <div className="w-full bg-[#161618] border border-[#2C2C30] rounded-2xl py-6 px-5 flex flex-col items-center justify-between gap-4">
          <div className="w-full flex items-center justify-between">
            <h2 className="w-full text-white font-semibold text-[1.8rem]">
              Analyzer
            </h2>

            <div className="w-max flex items-center justify-center gap-2 ">
              <div className="flex items-center justify-start gap-3 border border-[#2C2C30] py-[0.8rem] px-5 rounded-xl">
                <Search />
                <input
                  className="border-none outline-none bg-transparent text-[1.4rem] font-normal text-[#ACB5BB]"
                  placeholder="Search anything..."
                />
              </div>

              <div className="w-[36px] h-[36px] flex items-center justify-center bg-[#2C2C30] rounded-xl">
                <Filter />
              </div>
            </div>
          </div>

          <table className="w-full flex flex-col items-start justify-start gap-3">
            <thead className="w-full flex items-center justify-between bg-[#2C2C30] rounded-xl">
              <tr className="w-[25px] py-4 px-5">
                <th className="text-[#ACB5BB] font-medium text-base">#</th>
              </tr>

              <tr className="w-[33px] py-4">
                <th className="text-[#ACB5BB] font-medium text-base">Icon</th>
              </tr>

              <tr className="w-[57px] py-4">
                <th className="text-[#ACB5BB] font-medium text-base">Token</th>
              </tr>

              <tr className="w-[60px] py-4">
                <th className="text-[#ACB5BB] font-medium text-base">
                  Firs Buy
                </th>
              </tr>

              <tr className="w-[83px] py-4">
                <th className="text-[#ACB5BB] font-medium text-base">
                  Token Buy
                </th>
              </tr>

              <tr className="w-[55px] py-4">
                <th className="text-[#ACB5BB] font-medium text-base">
                  SOL Used
                </th>
              </tr>

              <tr className="w-[61px] py-4">
                <th className="text-[#ACB5BB] font-medium text-base">
                  USDT Used
                </th>
              </tr>

              <tr className="w-[52px] py-4">
                <th className="text-[#ACB5BB] font-medium text-base">
                  Buy/Sell
                </th>
              </tr>

              <tr className="w-[82px] py-4">
                <th className="text-[#ACB5BB] font-medium text-base">
                  Token Sold
                </th>
              </tr>

              <tr className="w-[66px] py-4">
                <th className="text-[#ACB5BB] font-medium text-base">
                  SOL Received
                </th>
              </tr>

              <tr className="w-[75px] py-4">
                <th className="text-[#ACB5BB] font-medium text-base">
                  USDT Received
                </th>
              </tr>

              <tr className="w-[81px] py-4">
                <th className="text-[#ACB5BB] font-medium text-base">
                  SOL Earned/Lost
                </th>
              </tr>

              <tr className="w-[61px] py-4">
                <th className="text-[#ACB5BB] font-medium text-base">
                  Profit/Loss
                </th>
              </tr>

              <tr className="w-[66px] py-4">
                <th className="text-[#ACB5BB] font-medium text-base">
                  Last Sell
                </th>
              </tr>

              <tr className="w-[71px] py-4">
                <th className="text-[#ACB5BB] font-medium text-base">Link</th>
              </tr>
            </thead>

            <tbody className="w-full flex flex-col items-center justify-start">
              <tr className="w-full flex items-center justify-between">
                <td className="w-[25px] py-4 px-5 text-[#ACB5BB] font-medium text-[1.2rem]">
                  1
                </td>

                <td className="w-[33px] py-4">
                  <Image src={CleanShot8} alt=""/>
                </td>

                <td className="w-[57px] py-4 text-[#ACB5BB] font-medium text-[1.2rem]">
                  LUNO
                </td>

                <td className="w-[60px] py-4 text-[#ACB5BB] font-medium text-[1.2rem]">
                  6/1/2025 17:56:30
                </td>

                <td className="w-[83px] py-4 text-[#ACB5BB] font-medium text-[1.2rem]">
                  418998.56
                </td>

                <td className="w-[55px] py-4 text-[#ACB5BB] font-medium text-[1.2rem] flex items-center justify-start gap-2">
                  <Image src={Sol} alt=""/>
                  5.00
                </td>

                <td className="w-[61px] py-4 text-[#ACB5BB] font-medium text-[1.2rem]">
                  $1104.30
                </td>

                <td className="w-[52px] py-4 text-[#ACB5BB] font-medium text-[1.2rem]">
                  8/5
                </td>

                <td className="w-[82px] py-4 text-[#ACB5BB] font-medium text-[1.2rem]">
                  418998.56
                </td>

                <td className="w-[66px] py-4 text-[#ACB5BB] font-medium text-[1.2rem] flex items-center justify-start gap-2">
                  <Image src={Sol} alt=""/>
                  0.86
                </td>

                <td className="w-[75px] py-4 text-[#ACB5BB] font-medium text-[1.2rem]">
                  $189.89
                </td>

                <td className="w-[81px] py-4 text-[#C65468] font-medium text-[1.2rem] flex items-center justify-start gap-2">
                  <Image src={Sol} alt=""/>
                  -4.14
                </td>

                <td className="w-[61px] py-4 text-[#EA3030] font-medium text-[1.2rem]">
                  -82.89%
                </td>

                <td className="w-[66px] py-4 text-[#ACB5BB] font-medium text-[1.2rem]">
                  6/1/2025 17:56:30
                </td>

                <td className="w-[71px] py-4 text-[#ACB5BB] font-medium text-[1.2rem]">
                  <Image src={Deexscreener} alt=""/>
                </td>
              </tr>

              <tr className="w-full flex items-center justify-between">
                <td className="w-[25px] py-4 px-5 text-[#ACB5BB] font-medium text-[1.2rem]">
                  2
                </td>

                <td className="w-[33px] py-4">
                  <Image src={CleanShot4} alt="" />
                </td>

                <td className="w-[57px] py-4 text-[#ACB5BB] font-medium text-[1.2rem]">
                  RELIQ
                </td>

                <td className="w-[60px] py-4 text-[#ACB5BB] font-medium text-[1.2rem]">
                  6/1/2025 17:56:30
                </td>

                <td className="w-[83px] py-4 text-[#ACB5BB] font-medium text-[1.2rem]">
                  1630933.34
                </td>

                <td className="w-[55px] py-4 text-[#ACB5BB] font-medium text-[1.2rem] flex items-center justify-start gap-2">
                  <Image src={Sol} alt="" />
                  5.00
                </td>

                <td className="w-[61px] py-4 text-[#ACB5BB] font-medium text-[1.2rem]">
                  $1090.55
                </td>

                <td className="w-[52px] py-4 text-[#ACB5BB] font-medium text-[1.2rem]">
                  1/1
                </td>

                <td className="w-[82px] py-4 text-[#ACB5BB] font-medium text-[1.2rem]">
                  1630933.34
                </td>

                <td className="w-[66px] py-4 text-[#ACB5BB] font-medium text-[1.2rem] flex items-center justify-start gap-2">
                  <Image src={Sol} alt="" />
                  0.10
                </td>

                <td className="w-[75px] py-4 text-[#ACB5BB] font-medium text-[1.2rem]">
                  $21.10
                </td>

                <td className="w-[81px] py-4 text-[#C65468] font-medium text-[1.2rem] flex items-center justify-start gap-2">
                  <Image src={Sol} alt="" />
                  -4.90
                </td>

                <td className="w-[61px] py-4 text-[#EA3030] font-medium text-[1.2rem]">
                  -98.07%
                </td>

                <td className="w-[66px] py-4 text-[#ACB5BB] font-medium text-[1.2rem]">
                  6/1/2025 17:56:30
                </td>

                <td className="w-[71px] py-4 text-[#ACB5BB] font-medium text-[1.2rem]">
                  <Image src={Deexscreener} alt="" />
                </td>
              </tr>

              <tr className="w-full flex items-center justify-between">
                <td className="w-[25px] py-4 px-5 text-[#ACB5BB] font-medium text-[1.2rem]">
                  3
                </td>

                <td className="w-[33px] py-4">
                  <Image src={CleanShot} alt="" />
                </td>

                <td className="w-[57px] py-4 text-[#ACB5BB] font-medium text-[1.2rem]">
                  GenBeta
                </td>

                <td className="w-[60px] py-4 text-[#ACB5BB] font-medium text-[1.2rem]">
                  6/1/2025 17:56:30
                </td>

                <td className="w-[83px] py-4 text-[#ACB5BB] font-medium text-[1.2rem]">
                  2156176.51{" "}
                </td>

                <td className="w-[55px] py-4 text-[#ACB5BB] font-medium text-[1.2rem] flex items-center justify-start gap-2">
                  <Image src={Sol} alt="" />
                  10.00
                </td>

                <td className="w-[61px] py-4 text-[#ACB5BB] font-medium text-[1.2rem]">
                  $1093.95
                </td>

                <td className="w-[52px] py-4 text-[#ACB5BB] font-medium text-[1.2rem]">
                  1/0
                </td>

                <td className="w-[82px] py-4 text-[#ACB5BB] font-medium text-[1.2rem]">
                  0.00
                </td>

                <td className="w-[66px] py-4 text-[#ACB5BB] font-medium text-[1.2rem] flex items-center justify-start gap-2">
                  <Image src={Sol} alt="" />
                  0.00{" "}
                </td>

                <td className="w-[75px] py-4 text-[#ACB5BB] font-medium text-[1.2rem]">
                  $0.00
                </td>

                <td className="w-[81px] py-4 text-[#ACB5BB] font-medium text-[1.2rem] flex items-center justify-start gap-2">
                  <Image src={Sol} alt="" />
                  N/A
                </td>

                <td className="w-[61px] py-4 text-[#ACB5BB] font-medium text-[1.2rem]">
                  0.00%
                </td>

                <td className="w-[66px] py-4 text-[#ACB5BB] font-medium text-[1.2rem]">
                  N/A
                </td>

                <td className="w-[71px] py-4 text-[#ACB5BB] font-medium text-[1.2rem]">
                  <Image src={Deexscreener} alt="" />
                </td>
              </tr>

              <tr className="w-full flex items-center justify-between">
                <td className="w-[25px] py-4 px-5 text-[#ACB5BB] font-medium text-[1.2rem]">
                  4
                </td>

                <td className="w-[33px] py-4">
                  <Image src={CleanShot8} alt="" />
                </td>

                <td className="w-[57px] py-4 text-[#ACB5BB] font-medium text-[1.2rem]">
                  F(ART)
                </td>

                <td className="w-[60px] py-4 text-[#ACB5BB] font-medium text-[1.2rem]">
                  6/1/2025 17:56:30
                </td>

                <td className="w-[83px] py-4 text-[#ACB5BB] font-medium text-[1.2rem]">
                  12029029.88
                </td>

                <td className="w-[55px] py-4 text-[#ACB5BB] font-medium text-[1.2rem] flex items-center justify-start gap-2">
                  <Image src={Sol} alt="" />
                  3.50
                </td>

                <td className="w-[61px] py-4 text-[#ACB5BB] font-medium text-[1.2rem]">
                  $431.98
                </td>

                <td className="w-[52px] py-4 text-[#ACB5BB] font-medium text-[1.2rem]">
                  5/6
                </td>

                <td className="w-[82px] py-4 text-[#ACB5BB] font-medium text-[1.2rem]">
                  12029029....
                </td>

                <td className="w-[66px] py-4 text-[#ACB5BB] font-medium text-[1.2rem] flex items-center justify-start gap-2">
                  <Image src={Sol} alt="" />
                  3.50
                </td>

                <td className="w-[75px] py-4 text-[#ACB5BB] font-medium text-[1.2rem]">
                  $431.98
                </td>

                <td className="w-[81px] py-4 text-[#C65468] font-medium text-[1.2rem] flex items-center justify-start gap-2">
                  <Image src={Sol} alt="" />
                  -1.51
                </td>

                <td className="w-[61px] py-4 text-[#EA3030] font-medium text-[1.2rem]">
                  -75.37%
                </td>

                <td className="w-[66px] py-4 text-[#ACB5BB] font-medium text-[1.2rem]">
                  6/1/2025 17:56:30
                </td>

                <td className="w-[71px] py-4 text-[#ACB5BB] font-medium text-[1.2rem]">
                  <Image src={Deexscreener} alt="" />
                </td>
              </tr>

              <tr className="w-full flex items-center justify-between">
                <td className="w-[25px] py-4 px-5 text-[#ACB5BB] font-medium text-[1.2rem]">
                  5
                </td>

                <td className="w-[33px] py-4">
                  <Image src={CleanShot3} alt="" />
                </td>

                <td className="w-[57px] py-4 text-[#ACB5BB] font-medium text-[1.2rem]">
                  RHEA
                </td>

                <td className="w-[60px] py-4 text-[#ACB5BB] font-medium text-[1.2rem]">
                  6/1/2025 17:56:30
                </td>

                <td className="w-[83px] py-4 text-[#ACB5BB] font-medium text-[1.2rem]">
                  936844.80
                </td>

                <td className="w-[55px] py-4 text-[#ACB5BB] font-medium text-[1.2rem] flex items-center justify-start gap-2">
                  <Image src={Sol} alt="" />
                  10.00
                </td>

                <td className="w-[61px] py-4 text-[#ACB5BB] font-medium text-[1.2rem]">
                  $1079.80
                </td>

                <td className="w-[52px] py-4 text-[#ACB5BB] font-medium text-[1.2rem]">
                  4/7
                </td>

                <td className="w-[82px] py-4 text-[#ACB5BB] font-medium text-[1.2rem]">
                  936844.80
                </td>

                <td className="w-[66px] py-4 text-[#ACB5BB] font-medium text-[1.2rem] flex items-center justify-start gap-2">
                  <Image src={Sol} alt="" />
                  10.00
                </td>

                <td className="w-[75px] py-4 text-[#ACB5BB] font-medium text-[1.2rem]">
                  $1079.80
                </td>

                <td className="w-[81px] py-4 text-[#12B3A8] font-medium text-[1.2rem] flex items-center justify-start gap-2">
                  <Image src={Sol} alt="" />
                  +6.87
                </td>

                <td className="w-[61px] py-4 text-[#33A34C] font-medium text-[1.2rem]">
                  +68.70%
                </td>

                <td className="w-[66px] py-4 text-[#ACB5BB] font-medium text-[1.2rem]">
                  6/1/2025 17:56:30
                </td>

                <td className="w-[71px] py-4 text-[#ACB5BB] font-medium text-[1.2rem]">
                  <Image src={Deexscreener} alt="" />
                </td>
              </tr>

              <tr className="w-full flex items-center justify-between">
                <td className="w-[25px] py-4 px-5 text-[#ACB5BB] font-medium text-[1.2rem]">
                  6
                </td>

                <td className="w-[33px] py-4">
                  <Image src={CleanShot5} alt="" />
                </td>

                <td className="w-[57px] py-4 text-[#ACB5BB] font-medium text-[1.2rem]">
                  МАІ
                </td>

                <td className="w-[60px] py-4 text-[#ACB5BB] font-medium text-[1.2rem]">
                  6/1/2025 17:56:30
                </td>

                <td className="w-[83px] py-4 text-[#ACB5BB] font-medium text-[1.2rem]">
                  10868702.26
                </td>

                <td className="w-[55px] py-4 text-[#ACB5BB] font-medium text-[1.2rem] flex items-center justify-start gap-2">
                  <Image src={Sol} alt="" />
                  5.50
                </td>

                <td className="w-[61px] py-4 text-[#ACB5BB] font-medium text-[1.2rem]">
                  $961.69
                </td>

                <td className="w-[52px] py-4 text-[#ACB5BB] font-medium text-[1.2rem]">
                  3/8
                </td>

                <td className="w-[82px] py-4 text-[#ACB5BB] font-medium text-[1.2rem]">
                  10868702...
                </td>

                <td className="w-[66px] py-4 text-[#ACB5BB] font-medium text-[1.2rem] flex items-center justify-start gap-2">
                  <Image src={Sol} alt="" />
                  5.50
                </td>

                <td className="w-[75px] py-4 text-[#ACB5BB] font-medium text-[1.2rem]">
                  $961.69
                </td>

                <td className="w-[81px] py-4 text-[#C65468] font-medium text-[1.2rem] flex items-center justify-start gap-2">
                  <Image src={Sol} alt="" />
                  -4.98
                </td>

                <td className="w-[61px] py-4 text-[#EA3030] font-medium text-[1.2rem]">
                  -99.55%
                </td>

                <td className="w-[66px] py-4 text-[#ACB5BB] font-medium text-[1.2rem]">
                  6/1/2025 17:56:30
                </td>

                <td className="w-[71px] py-4 text-[#ACB5BB] font-medium text-[1.2rem]">
                  <Image src={Deexscreener} alt="" />
                </td>
              </tr>

              <tr className="w-full flex items-center justify-between">
                <td className="w-[25px] py-4 px-5 text-[#ACB5BB] font-medium text-[1.2rem]">
                  7
                </td>

                <td className="w-[33px] py-4">
                  <Image src={CleanShot} alt="" />
                </td>

                <td className="w-[57px] py-4 text-[#ACB5BB] font-medium text-[1.2rem]">
                  Cverse
                </td>

                <td className="w-[60px] py-4 text-[#ACB5BB] font-medium text-[1.2rem]">
                  6/1/2025 17:56:30
                </td>

                <td className="w-[83px] py-4 text-[#ACB5BB] font-medium text-[1.2rem]">
                  2156176.51
                </td>

                <td className="w-[55px] py-4 text-[#ACB5BB] font-medium text-[1.2rem] flex items-center justify-start gap-2">
                  <Image src={Sol} alt="" />
                  10.00
                </td>

                <td className="w-[61px] py-4 text-[#ACB5BB] font-medium text-[1.2rem]">
                  $1093.95
                </td>

                <td className="w-[52px] py-4 text-[#ACB5BB] font-medium text-[1.2rem]">
                  9/2
                </td>

                <td className="w-[82px] py-4 text-[#ACB5BB] font-medium text-[1.2rem]">
                  2156176.51
                </td>

                <td className="w-[66px] py-4 text-[#ACB5BB] font-medium text-[1.2rem] flex items-center justify-start gap-2">
                  <Image src={Sol} alt="" />
                  10.00
                </td>

                <td className="w-[75px] py-4 text-[#ACB5BB] font-medium text-[1.2rem]">
                  $1093.95
                </td>

                <td className="w-[81px] py-4 text-[#C65468] font-medium text-[1.2rem] flex items-center justify-start gap-2">
                  <Image src={Sol} alt="" />
                  -37.83
                </td>

                <td className="w-[61px] py-4 text-[#EA3030] font-medium text-[1.2rem]">
                  -36.03%
                </td>

                <td className="w-[66px] py-4 text-[#ACB5BB] font-medium text-[1.2rem]">
                  6/1/2025 17:56:30
                </td>

                <td className="w-[71px] py-4 text-[#ACB5BB] font-medium text-[1.2rem]">
                  <Image src={Deexscreener} alt="" />
                </td>
              </tr>
            </tbody>
          </table>

          {/* Pagination */}
          <div className="w-full flex items-start justify-between">
            <div className="flex items-center justify-center gap-10">
              <div className="w-[32px] h-[32px] flex items-center justify-center border border-[#44444A] rounded-xl">
                <ArrowLeft />
              </div>
              <div className="flex items-center justify-center">
                <span className="h-[32px] rounded-xl bg-[#44444A] text-white px-6 flex items-center font-bold text-[1.2rem]">
                  1
                </span>
                <span className="h-[32px] rounded-xl text-[#6C7278] px-6 flex items-center font-bold text-[1.2rem]">
                  2
                </span>
                <span className="h-[32px] rounded-xl text-[#6C7278] px-6 flex items-center font-bold text-[1.2rem]">
                  3
                </span>
                <span className="h-[32px] rounded-xl text-[#6C7278] px-6 flex items-center font-bold text-[1.2rem]">
                  ...
                </span>
                <span className="h-[32px] rounded-xl text-[#6C7278] px-6 flex items-center font-bold text-[1.2rem]">
                  10
                </span>
              </div>
              <div className="w-[32px] h-[32px] flex items-center justify-center border border-[#44444A] rounded-xl">
                <NextArrow />
              </div>
            </div>

            <div className="flex items-center justify-center gap-7">
              <span className="text-[#6C7278] text-[1.2rem]">
                Showing 1 to 10 of 50 entries
              </span>
              <div className="flex items-center justify-center gap-4 bg-[#2C2C30] border border-[#44444A] rounded-xl p-4 text-white font-medium text-[1.2rem] cursor-pointer">
                <p>Show 10</p>
                <ArrowUp />
              </div>
              -
            </div>
          </div>
        </div>

        <div className="w-full grid grid-rows-4 gap-4">
          <div className="w-full bg-[#1E1E20] border border-[#2C2C30] rounded-2xl py-5 pl-4 pr-5 flex flex-col items-start justify-between">
            <Image src={MatchSword}  alt=""/>

            <div className="w-full flex items-end justify-end">
              <div className="w-full flex flex-col items-start justify-start gap-1">
                <h2 className="font-semibold text-[1.4rem] text-[#EDF1F3]">
                  Create Match
                </h2>
                <p className="text-[#ACB5BB] text-[1rem] font-normal">
                  Start competing with others.
                </p>
              </div>
              <ArrowRight />
            </div>
          </div>

          <div className="w-full bg-[#1E1E20] border border-[#2C2C30] rounded-2xl py-5 pl-4 pr-5 flex flex-col items-start justify-between">
            <Image src={GameTrophy} alt="" />

            <div className="w-full flex items-end justify-end">
              <div className="w-full flex flex-col items-start justify-start gap-1">
                <h2 className="font-semibold text-[1.4rem] text-[#EDF1F3]">
                  Create Quest
                </h2>
                <p className="text-[#ACB5BB] text-[1rem] font-normal">
                  New challenge for users.
                </p>
              </div>
              <ArrowRight />
            </div>
          </div>

          <div className="w-full bg-[#1E1E20] border border-[#2C2C30] rounded-2xl py-5 pl-4 pr-5 flex flex-col items-start justify-between">
            <Image src={GameCrown} alt="" />

            <div className="w-full flex items-end justify-end">
              <div className="w-full flex flex-col items-start justify-start gap-1">
                <h2 className="font-semibold text-[1.4rem] text-[#EDF1F3]">
                  View Leaderboard
                </h2>
                <p className="text-[#ACB5BB] text-[1rem] font-normal">
                  Track top players and ranking.
                </p>
              </div>
              <ArrowRight />
            </div>
          </div>

          <div className="w-full bg-[#1E1E20] border border-[#2C2C30] rounded-2xl py-5 pl-4 pr-5 flex flex-col items-start justify-between">
            <Image src={CoinGame} alt="" />

            <div className="w-full flex items-end justify-end">
              <div className="w-full flex flex-col items-start justify-start gap-1">
                <h2 className="font-semibold text-[1.4rem] text-[#EDF1F3]">
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
            <table className="w-full flex flex-col items-start justify-start gap-3">
              {/* Table Header */}
              <thead className="w-full flex items-center justify-start bg-[#2C2C30] rounded-xl py-3 px-4 md:py-4 md:px-5">
                <tr className="w-[50px] md:w-[57px]">
                  <th className="text-[#ACB5BB] font-medium text-[1rem] md:text-[1.2rem]">
                    Тор
                  </th>
                </tr>
                <tr className="w-[140px] md:w-[240px]">
                  <th className="text-[#ACB5BB] font-medium text-[1rem] md:text-[1.2rem]">
                    Token
                  </th>
                </tr>
                <tr className="w-[100px] md:w-auto">
                  <th className="text-[#ACB5BB] font-medium text-[1rem] md:text-[1.2rem]">
                    $Gained
                  </th>
                </tr>
              </thead>

              {/* Table Body */}
              <tbody className="w-full flex flex-col items-center justify-start">
                {/* Row 1 */}
                <tr className="w-full flex items-center py-2 px-3 md:py-3 md:px-5">
                  <tr className="w-[50px] md:w-[57px]">
                    <td className="text-[#ACB5BB] font-medium text-[1rem] md:text-[1.4rem]">
                      #1
                    </td>
                  </tr>
                  <tr className="w-[140px] md:w-[240px]">
                    <td className="text-white font-medium text-[1rem] md:text-[1.6rem] flex items-center justify-start gap-2 md:gap-3">
                      <Image
                        src={tCat}
                        className="h-[20px] w-[20px] md:h-auto md:w-auto"
                        alt=""
                      />
                      CATS
                    </td>
                  </tr>
                  <tr className="w-[100px] md:w-auto">
                    <td className="text-[#ACB5BB] font-medium text-[1rem] md:text-[1.4rem]">
                      $6.8K
                    </td>
                  </tr>
                </tr>

                {/* Row 2 */}
                <tr className="w-full flex items-center py-2 px-3 md:py-3 md:px-5">
                  <tr className="w-[50px] md:w-[57px]">
                    <td className="text-[#ACB5BB] font-medium text-[1rem] md:text-[1.4rem]">
                      #2
                    </td>
                  </tr>
                  <tr className="w-[140px] md:w-[240px]">
                    <td className="text-white font-medium text-[1rem] md:text-[1.6rem] flex items-center justify-start gap-2 md:gap-3">
                      <Image
                        src={tPONKEI}
                        className="h-[20px] w-[20px] md:h-auto md:w-auto"
                        alt=""
                      />
                      PONKEI
                    </td>
                  </tr>
                  <tr className="w-[100px] md:w-auto">
                    <td className="text-[#ACB5BB] font-medium text-[1rem] md:text-[1.4rem]">
                      $1.7K
                    </td>
                  </tr>
                </tr>

                {/* Row 3 */}
                <tr className="w-full flex items-center py-2 px-3 md:py-3 md:px-5">
                  <tr className="w-[50px] md:w-[57px]">
                    <td className="text-[#ACB5BB] font-medium text-[1rem] md:text-[1.4rem]">
                      #3
                    </td>
                  </tr>
                  <tr className="w-[140px] md:w-[240px]">
                    <td className="text-white font-medium text-[1rem] md:text-[1.6rem] flex items-center justify-start gap-2 md:gap-3">
                      <Image
                        src={CleanShot5}
                        className="h-[20px] w-[20px] md:h-auto md:w-auto"
                        alt=""
                      />
                      DOLPHINWIF
                    </td>
                  </tr>
                  <tr className="w-[100px] md:w-auto">
                    <td className="text-[#ACB5BB] font-medium text-[1rem] md:text-[1.4rem]">
                      $0.6K
                    </td>
                  </tr>
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
                <tr className="w-[50px] md:w-[57px]">
                  <th className="text-[#ACB5BB] font-medium text-[1rem] md:text-[1.2rem]">
                    Тор
                  </th>
                </tr>
                <tr className="w-[140px] md:w-[240px]">
                  <th className="text-[#ACB5BB] font-medium text-[1rem] md:text-[1.2rem]">
                    Token
                  </th>
                </tr>
                <tr className="w-[100px] md:w-[160px]">
                  <th className="text-[#ACB5BB] font-medium text-[1rem] md:text-[1.2rem]">
                    Token amount
                  </th>
                </tr>
                <tr className="w-[80px] md:w-[160px]">
                  <th className="text-[#ACB5BB] font-medium text-[1rem] md:text-[1.2rem]">
                    $Price
                  </th>
                </tr>
              </thead>

              <tbody className="w-full flex flex-col items-center justify-start relative">
                <tr className="w-full flex items-center py-2 px-3 md:py-3 md:px-5">
                  <tr className="w-[50px] md:w-[57px]">
                    <td className="text-[#ACB5BB] font-medium text-[1rem] md:text-[1.4rem]">
                      #1
                    </td>
                  </tr>
                  <tr className="w-[140px] md:w-[240px]">
                    <td className="text-white font-medium text-[1rem] md:text-[1.6rem] flex items-center justify-start gap-2 md:gap-3">
                      <Image
                        src={CleanShot6}
                        className="h-[24px] w-[24px] md:h-auto md:w-auto"
                        alt=""
                      />
                      GOAT
                    </td>
                  </tr>
                  <tr className="w-[100px] md:w-[160px]">
                    <td className="text-[#ACB5BB] font-medium text-[1rem] md:text-[1.4rem]">
                      9,101.256
                    </td>
                  </tr>
                  <tr className="w-[80px] md:w-[160px]">
                    <td className="text-[#ACB5BB] font-medium text-[1rem] md:text-[1.4rem]">
                      $6.8K
                    </td>
                  </tr>
                </tr>

                <tr className="w-full flex items-center py-2 px-3 md:py-3 md:px-5">
                  <tr className="w-[50px] md:w-[57px]">
                    <td className="text-[#ACB5BB] font-medium text-[1rem] md:text-[1.4rem]">
                      #2
                    </td>
                  </tr>
                  <tr className="w-[140px] md:w-[240px]">
                    <td className="text-white font-medium text-[1rem] md:text-[1.6rem] flex items-center justify-start gap-2 md:gap-3">
                      <Image
                        src={CleanShot3}
                        className="h-[24px] w-[24px] md:h-auto md:w-auto"
                        alt=""
                      />
                      RHEA
                    </td>
                  </tr>
                  <tr className="w-[100px] md:w-[160px]">
                    <td className="text-[#ACB5BB] font-medium text-[1rem] md:text-[1.4rem]">
                      5,678.432
                    </td>
                  </tr>
                  <tr className="w-[80px] md:w-[160px]">
                    <td className="text-[#ACB5BB] font-medium text-[1rem] md:text-[1.4rem]">
                      $1.7K
                    </td>
                  </tr>
                </tr>

                <tr className="w-full flex items-center py-2 px-3 md:py-3 md:px-5 relative">
                  <tr className="w-[50px] md:w-[57px]">
                    <td className="text-[#ACB5BB] font-medium text-[1rem] md:text-[1.4rem]">
                      #3
                    </td>
                  </tr>
                  <tr className="w-[140px] md:w-[240px]">
                    <td className="text-white font-medium text-[1rem] md:text-[1.6rem] flex items-center justify-start gap-2 md:gap-3">
                      <Image
                        src={CleanShot}
                        className="h-[24px] w-[24px] md:h-auto md:w-auto"
                        alt=""
                      />
                      GenBeta
                    </td>
                  </tr>
                  <tr className="w-[100px] md:w-[160px]">
                    <td className="text-[#ACB5BB] font-medium text-[1rem] md:text-[1.4rem]">
                      2,345.678
                    </td>
                  </tr>
                  <tr className="w-[80px] md:w-[160px]">
                    <td className="text-[#ACB5BB] font-medium text-[1rem] md:text-[1.4rem]">
                      $0.6K
                    </td>
                  </tr>

                  <Image
                    src={Chat}
                    className="absolute bottom-0 right-8 w-[40px] h-[40px] md:w-auto md:h-auto"
                    alt=""
                  />
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <div className="w-full grid grid-cols-1 md:grid-cols-[1fr_302px] gap-8">
        <div className="w-full bg-[#1E1E20] border border-[#2C2C30] rounded-2xl py-8 px-10 flex flex-col items-start justify-start gap-8">
          <div className="w-full flex flex-col md:flex-col items-start md:items-center justify-between gap-4">
            <h2 className="w-full text-white font-semibold text-[1.8rem]">
              Wallet Balance History
            </h2>

            <div className="w-max bg-[#2C2C30] border border-[#26262C] p-2 rounded-xl flex items-center justify-center gap-2  drop-shadow-[0_6px_10px_-3px_rgba(0,0,0,0.25)]">
              <span className="p-[0.8rem] flex items-center justify-center rounded-lg text-[#ACB5BB] text-xl text-nowrap cursor-pointer">
                1 Day
              </span>
              <span
                className="p-[0.8rem] bg-[#44444A] flex items-center justify-center rounded-lg text-white text-xl text-nowrap cursor-pointer shadow-[0px_6px_10px_-3px_rgba(0,0,0,0.25)]"
                style={{
                  boxShadow: "inset 0px -5px 10px 0px rgba(255, 255, 255, 0.1)",
                }}
              >
                7 Days
              </span>
              <span className="p-[0.8rem] flex items-center justify-center rounded-lg text-[#ACB5BB] text-xl text-nowrap cursor-pointer">
                30 Days
              </span>
              <span className="p-[0.8rem] flex items-center justify-center rounded-lg text-[#ACB5BB] text-xl text-nowrap cursor-pointer">
                Custom
              </span>
            </div>
          </div>

          <Image src={Graph} className="w-full" alt="" />
        </div>

        <div className="w-full bg-[#161618] border border-[#2C2C30] rounded-2xl overflow-hidden relative">
          <Image src={bgGrid} className="w-full relative" alt="" />

          <div className="w-full h-full flex flex-col items-center justify-between gap-6 p-6 absolute top-0 left-0">
            <div className="w-full flex flex-col items-center justify-center gap-5 relative overflow-hidden rounded-[12px]">
              <Image src={Game} className="w-full relative overflow-hidden" alt="" />

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
                <Button text="Create Advertisement" />
                <a className="cursor-pointer text-white font-semibold text-[1.2rem]">
                  Learn more
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardMain;
