import Image from 'next/image';

import Analyzer from "../../../public/icons/Analyzer";
import ButtonSm from "../ButtonSm";
import Notification from "../../../public/icons/Notification";
import User from "../../../public/icons/User";
import Alert1 from "../../../public/imgs/Alert1.png";
import Alert2 from "../../../public/imgs/Alert2.png";
import Alert3 from "../../../public/imgs/Alert3.png";
import Alert4 from "../../../public/imgs/Alert4.png";

const Topbar = () => {
  return (
    <div className="w-full px-12 py-[16px] flex items-center justify-between border-b border-b-[#2C2C30] relative">
      <div className="flex items-center justify-start gap-3">
        <Analyzer />
        <p className="font-medium text-white text-2xl">Analyzer</p>
      </div>

      <div className="w-full flex items-center justify-end gap-10">
        {/* <div className="flex items-center justify-start gap-3">
            <Search />
            <input
              className="border-none outline-none bg-transparent text-[1.4rem] font-normal text-[#6C7278]"
              placeholder="Search anything..."
            />
          </div> */}

        {/* <div className="h-[27px] w-[1px] bg-[#2C2C30]"></div> */}

        <div className="flex items-center justify-start gap-4">
          <div className="w-[162px] hidden md:block">
            <ButtonSm text="Connect Wallet" />
          </div>

          <div className="relative flex items-center justify-center border border-[#2C2C30] rounded-2xl w-14 h-14 group cursor-pointer">
            <Notification />

            <div
              className="absolute min-w-[410px] z-10 top-16 right-0 p-8 bg-[#161618] border rounded-2xl border-[#44444A] flex flex-col items-start justify-start gap-8 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-opacity duration-300"
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