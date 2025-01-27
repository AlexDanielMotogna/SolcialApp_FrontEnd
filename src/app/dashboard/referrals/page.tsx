import Image from "next/image";

import HeroHelmet from "../../../../public/imgs/HeroHelmet.png";
import Moneybag from "../../../../public/imgs/Moneybag.png";
import GameCrownLg from "../../../../public/imgs/GameCrownLg.png";
import GameCoinLg from "../../../../public/imgs/GameCoinLg.png";
import ArrowLeft from "../../../../public/icons/ArrowLeft";
import NextArrow from "../../../../public/icons/NextArrow";
import ArrowUp from "../../../../public/icons/ArrowUp";
import Search from "../../../../public/icons/Search";
import Filter from "../../../../public/icons/Filter";
import Button from "../../../components/Button";

const Referrals = () => {
  return (
    <div className="w-full py-[1.8rem] px-[2.4rem] flex flex-col items-start justify-start gap-[2.4rem]">
      <div className="w-full flex flex-col md:flex-row md:gap-8 items-center justify-between gap-5">
        <div className="w-full flex flex-col items-start justify-start gap-1">
          <h2 className="text-white font-semibold text-[2rem] md:text-[2.4rem]">
            Referrals
          </h2>
          <h3 className="text-[#ACB5BB] text-[1.6rem] md:text-[1.8rem]">
            Refer users to earn rewards. Affiliates earn greater rewards.{" "}
            <span className="text-[#0BCB7B]"> Learn more</span>
          </h3>
        </div>

        <div className="flex items-center justify-center gap-5">
          <div className="w-[160px] md:w-[196px] flex items-center justify-start gap-3 py-5 md:py-[1.4rem] px-3 md:px-4 bg-[#1E1E20] border border-[#2C2C30] rounded-2xl">
            <Image
              src={HeroHelmet}
              alt=""
              className="w-[32px] h-[32px] md:w-[48px] md:h-[48px]"
            />

            <div className="flex flex-col items-start justify-start gap-1">
              <h3 className="text-white font-semibold text-[1.8rem]">0</h3>
              <h6 className="text-[1.2rem] text-[#ACB5BB] font-normal">
                Traders Referred
              </h6>
            </div>
          </div>
          <div className="w-[160px] md:w-[196px] flex items-center justify-start gap-3 py-5 md:py-[1.4rem] px-3 md:px-4 bg-[#1E1E20] border border-[#2C2C30] rounded-2xl">
            <Image
              src={Moneybag}
              alt=""
              className="w-[32px] h-[32px] md:w-[48px] md:h-[48px]"
            />

            <div className="flex flex-col items-start justify-start gap-1">
              <h3 className="text-white font-semibold text-[1.8rem]">$0,00</h3>
              <span className="text-[1.2rem] text-[#ACB5BB]">
                Rewards Earned
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-[1.8rem]">
        <div className="w-full bg-[#1E1E20] border border-[#2C2C30] rounded-2xl p-[1.8rem] flex flex-col items-start justify-start gap-[1.3rem]">
          <Image src={GameCrownLg} alt="" />
          <h4 className="text-[1.4rem] text-white font-semibold">Your Code</h4>
          <div
            className="w-full bg-[#161618] h-full px-7 overflow-hidden border border-[#2C2C30] rounded-md flex items-center justify-center shadow-[0px_6px_10px_-3px_rgba(0,0,0,0.25)]"
            style={{
              boxShadow: "inset 0px 7.4px 18.5px 0px rgba(255, 255, 255, 0.1)",
            }}
          >
            <a
              className="text-white text-[1.4rem] font-semibold py-[1.3rem] cursor-pointer truncate sm:text-[1.2rem] sm:py-[1rem] md:text-[1.1rem] md:py-[0.8rem] max-w-full"
              href="https://solcialapp.com/0x2CJGFKDJSKKWJAJCJAKAKCJ0394"
              target="_blank"
              rel="noopener noreferrer"
            >
              https://solcialapp.com/0x2CJGFKDJSKKWJAJCJAKAKCJ0394
            </a>
          </div>
        </div>

        <div className="w-full bg-[#1E1E20] border border-[#2C2C30] rounded-2xl p-[1.8rem] flex flex-col items-start justify-start gap-[1.3rem]">
          <Image src={GameCoinLg} alt="" />
          <h4 className="text-[1.4rem] text-white font-semibold">Claim</h4>
          <div className="w-full">
            <Button text="Claim Reward" />
          </div>
        </div>
      </div>

      <div className="w-full bg-[#161618] border border-[#2C2C30] rounded-2xl py-6 px-5 flex flex-col items-center justify-between gap-4 overflow-hidden">
        <div className="w-full flex flex-col md:flex-row items-center gap-5 justify-between">
          <h2 className="w-full text-white font-semibold text-[1.8rem]">
            Referrals & Legacy Reward History
          </h2>

          <div className="w-full md:max-w-max flex items-center justify-center gap-2 ">
            <div className="w-full flex items-center justify-start gap-3 border border-[#2C2C30] py-[0.8rem] px-5 rounded-xl">
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

<div className="w-full flex items-start justify-start overflow-x-auto sm:w-calc-100vw-4rem">
        <table className="w-full flex flex-col items-start justify-start gap-3">
          <thead className="w-full flex items-center justify-between bg-[#2C2C30] rounded-xl">
            <tr className="w-[634px] py-4 px-5">
              <th className="text-[#ACB5BB] font-medium text-[1.2rem]">
                Address
              </th>
            </tr>

            <tr className="w-[120px] py-4">
              <th className="text-[#ACB5BB] font-medium text-[1.2rem]">
                Date Joined
              </th>
            </tr>

            <tr className="w-[120px] py-4">
              <th className="text-[#ACB5BB] font-medium text-[1.2rem]">
                Total Volume
              </th>
            </tr>

            <tr className="w-[120px] py-4">
              <th className="text-[#ACB5BB] font-medium text-[1.2rem]">
                Fees Paid
              </th>
            </tr>

            <tr className="w-[120px] py-4">
              <th className="text-[#ACB5BB] font-medium text-[1.2rem]">
                Your Rewards
              </th>
            </tr>
          </thead>

          <tbody className="w-full flex flex-col items-center justify-start">
            <tr className="w-full flex items-center justify-between">
              <td className="w-[634px] py-4 px-5 text-[#ACB5BB] font-medium text-[1.4rem]">
                0xB2C3D4E5F67890A1B2C3D4E5F6
              </td>

              <td className="w-[120px] py-4 text-[#ACB5BB] font-medium text-[1.4rem]">
                March 15, 2026
              </td>

              <td className="w-[120px] py-4 text-[#ACB5BB] font-medium text-[1.4rem]">
                $12,345.67
              </td>

              <td className="w-[120px] py-4 text-[#ACB5BB] font-medium text-[1.4rem]">
                $250.00
              </td>

              <td className="w-[120px] py-4 text-[#ACB5BB] font-medium text-[1.4rem]">
                $175.00
              </td>
            </tr>

            <tr className="w-full flex items-center justify-between">
              <td className="w-[634px] py-4 px-5 text-[#ACB5BB] font-medium text-[1.4rem]">
                0xB2C3D4E5F67890A1B2C3D4E5F6
              </td>

              <td className="w-[120px] py-4 text-[#ACB5BB] font-medium text-[1.4rem]">
                March 15, 2026
              </td>

              <td className="w-[120px] py-4 text-[#ACB5BB] font-medium text-[1.4rem]">
                $12,345.67
              </td>

              <td className="w-[120px] py-4 text-[#ACB5BB] font-medium text-[1.4rem]">
                $250.00
              </td>

              <td className="w-[120px] py-4 text-[#ACB5BB] font-medium text-[1.4rem]">
                $175.00
              </td>
            </tr>

            <tr className="w-full flex items-center justify-between">
              <td className="w-[634px] py-4 px-5 text-[#ACB5BB] font-medium text-[1.4rem]">
                0xB2C3D4E5F67890A1B2C3D4E5F6
              </td>

              <td className="w-[120px] py-4 text-[#ACB5BB] font-medium text-[1.4rem]">
                March 15, 2026
              </td>

              <td className="w-[120px] py-4 text-[#ACB5BB] font-medium text-[1.4rem]">
                $12,345.67
              </td>

              <td className="w-[120px] py-4 text-[#ACB5BB] font-medium text-[1.4rem]">
                $250.00
              </td>

              <td className="w-[120px] py-4 text-[#ACB5BB] font-medium text-[1.4rem]">
                $175.00
              </td>
            </tr>

            <tr className="w-full flex items-center justify-between">
              <td className="w-[634px] py-4 px-5 text-[#ACB5BB] font-medium text-[1.4rem]">
                0xB2C3D4E5F67890A1B2C3D4E5F6
              </td>

              <td className="w-[120px] py-4 text-[#ACB5BB] font-medium text-[1.4rem]">
                March 15, 2026
              </td>

              <td className="w-[120px] py-4 text-[#ACB5BB] font-medium text-[1.4rem]">
                $12,345.67
              </td>

              <td className="w-[120px] py-4 text-[#ACB5BB] font-medium text-[1.4rem]">
                $250.00
              </td>

              <td className="w-[120px] py-4 text-[#ACB5BB] font-medium text-[1.4rem]">
                $175.00
              </td>
            </tr>

            <tr className="w-full flex items-center justify-between">
              <td className="w-[634px] py-4 px-5 text-[#ACB5BB] font-medium text-[1.4rem]">
                0xB2C3D4E5F67890A1B2C3D4E5F6
              </td>

              <td className="w-[120px] py-4 text-[#ACB5BB] font-medium text-[1.4rem]">
                March 15, 2026
              </td>

              <td className="w-[120px] py-4 text-[#ACB5BB] font-medium text-[1.4rem]">
                $12,345.67
              </td>

              <td className="w-[120px] py-4 text-[#ACB5BB] font-medium text-[1.4rem]">
                $250.00
              </td>

              <td className="w-[120px] py-4 text-[#ACB5BB] font-medium text-[1.4rem]">
                $175.00
              </td>
            </tr>

            <tr className="w-full flex items-center justify-between">
              <td className="w-[634px] py-4 px-5 text-[#ACB5BB] font-medium text-[1.4rem]">
                0xB2C3D4E5F67890A1B2C3D4E5F6
              </td>

              <td className="w-[120px] py-4 text-[#ACB5BB] font-medium text-[1.4rem]">
                March 15, 2026
              </td>

              <td className="w-[120px] py-4 text-[#ACB5BB] font-medium text-[1.4rem]">
                $12,345.67
              </td>

              <td className="w-[120px] py-4 text-[#ACB5BB] font-medium text-[1.4rem]">
                $250.00
              </td>

              <td className="w-[120px] py-4 text-[#ACB5BB] font-medium text-[1.4rem]">
                $175.00
              </td>
            </tr>

            <tr className="w-full flex items-center justify-between">
              <td className="w-[634px] py-4 px-5 text-[#ACB5BB] font-medium text-[1.4rem]">
                0xB2C3D4E5F67890A1B2C3D4E5F6
              </td>

              <td className="w-[120px] py-4 text-[#ACB5BB] font-medium text-[1.4rem]">
                March 15, 2026
              </td>

              <td className="w-[120px] py-4 text-[#ACB5BB] font-medium text-[1.4rem]">
                $12,345.67
              </td>

              <td className="w-[120px] py-4 text-[#ACB5BB] font-medium text-[1.4rem]">
                $250.00
              </td>

              <td className="w-[120px] py-4 text-[#ACB5BB] font-medium text-[1.4rem]">
                $175.00
              </td>
            </tr>

            <tr className="w-full flex items-center justify-between">
              <td className="w-[634px] py-4 px-5 text-[#ACB5BB] font-medium text-[1.4rem]">
                0xB2C3D4E5F67890A1B2C3D4E5F6
              </td>

              <td className="w-[120px] py-4 text-[#ACB5BB] font-medium text-[1.4rem]">
                March 15, 2026
              </td>

              <td className="w-[120px] py-4 text-[#ACB5BB] font-medium text-[1.4rem]">
                $12,345.67
              </td>

              <td className="w-[120px] py-4 text-[#ACB5BB] font-medium text-[1.4rem]">
                $250.00
              </td>

              <td className="w-[120px] py-4 text-[#ACB5BB] font-medium text-[1.4rem]">
                $175.00
              </td>
            </tr>
          </tbody>
        </table>
        </div>

        {/* Pagination */}
        <div className="w-full flex flex-col md:flex-row gap-5 items-start justify-between">
          <div className="flex items-center justify-center gap-10">
            <div className="w-[32px] h-[32px] flex items-center justify-center border border-[#44444A] rounded-xl cursor-pointer">
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
    </div>
  );
};

export default Referrals;
