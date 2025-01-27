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
import GameCoingLg from "../../../../public/imgs/GameCoinLg.png";
import PowerShield from "../../../../public/imgs/PowerShield.png";
import GameTrophy from "../../../../public/imgs/GameTrophy.png";
import GameCrown from "../../../../public/imgs/GameCrown.png";
import Sword from "../../../../public/imgs/MatchSword.png";
import ShieldSword from "../../../../public/imgs/ShieldSword.png";
import CleanShotGreen from "../../../../public/imgs/CleanShotGreen.png";
import CleanShotRed from "../../../../public/imgs/CleanShotRed.png";
import CleanShotCircle from "../../../../public/imgs/CleanShotCircle4.png";
import ShieldDoubleSword from "../../../../public/imgs/ShieldDoubleSword.png";
import Sol from "../../../../public/imgs/Sol.png";
import ArrowRight from "../../../../public/icons/ArrowRight";
import ArrowDown from "../../../../public/icons/ArrowDown";
import ButtonBlack from "../../../components/ButtonBlack";
import Gold from "../../../../public/imgs/Gold.png";
import Silver from "../../../../public/imgs/Silver.png";
import Bronze from "../../../../public/imgs/Bronze.png";
import CleanShotCircle4 from "../../../../public/imgs/CleanShotCircle4.png";
import fourthBadge from "../../../../public/imgs/fourthBadge.png";
import fifthBadge from "../../../../public/imgs/fifthBadge.png";
import sixthBadge from "../../../../public/imgs/sixthBadge.png";
import Chat from "@/components/global/Chat";

const Matches = () => {
  return (
    <div className="w-full p-[1.6rem] md:py-[1.8rem] md:px-[2.4rem] grid grid-cols-1 md:grid-cols-3 gap-[1.6rem]">
      <div className="w-full max-h-[790px] bg-[#161618] border border-[#2C2C30] rounded-2xl flex flex-col items-start justify-start overflow-x-hidden">
        <div className="w-full py-[1.3rem] px-5 flex items-center border-b border-[#2C2C30]">
          <h4 className="text-white text-[1.6rem] font-semibold">
            Your Ladder Statistics
          </h4>
        </div>

        <div className="w-full flex flex-col items-start justify-start gap-[0.8rem] px-[1.4rem] pt-[1.4rem] pb-0 overflow-y-auto" style={{
            scrollbarWidth: "none",
            msOverflowStyle: "none",
          }}>
            
          <div className="w-full bg-[#1E1E20] border border-[#2C2C30] rounded-2xl p-[1.4rem] flex flex-col items-start justify-start gap-[0.9rem]">
            <div className="w-full flex flex-col items-start justify-start gap-1">
              <h3 className="text-white text-[1.8rem] font-medium">200</h3>
              <h6 className="text-[#ACB5BB] text-[1.2rem] font-normal">
                Total Matches
              </h6>
            </div>

            <div className="w-full grid grid-cols-[1fr_120px]">
              <div className="w-full bg-[#12B3A8] border border-[#033D55] rounded-tl-[6px] rounded-bl-[6px] py-1 px-[0.8rem] flex items-center justify-between">
                <h6 className="text-white text-[1.2rem] font-normal">Wins</h6>
                <h6 className="text-[#EDF1F3] text-[1.2rem] font-normal">
                  <span className="font-bold">160</span> - 80%
                </h6>
              </div>

              <div className="w-full bg-[#C65468] border border-[#5F103B] rounded-tr-[6px] rounded-br-[6px] py-1 px-[0.8rem] flex items-center justify-between">
                <h6 className="text-white text-[1.2rem] font-normal">Lost</h6>

                <h6 className="text-[#EDF1F3] text-[1.2rem] font-normal">
                  <span className="font-bold">40</span> - 20%
                </h6>
              </div>
            </div>
          </div>

          <div className="w-full flex flex-col items-start justify-start gap-[0.8rem] relative">

          <div className="w-full grid grid-cols-2 gap-[0.8rem]">
            <div className="w-full p-5 bg-[#1E1E20] border border-[#2C2C30] rounded-2xl flex items-center justify-start gap-3 md:gap-5">
              <Image
                src={GameCoingLg}
                alt="game coin"
                width={32}
                height={32}
                unoptimized
              />
              <div className="w-full flex flex-col items-start justify-start gap-1">
                <h6 className="text-[#ACB5BB] text-[1.2rem] font-normal">
                  Total XP
                </h6>
                <h4 className="text-white text-[1.6rem] font-semibold">
                  55.5K
                </h4>
              </div>
            </div>
            <div className="w-full p-5 bg-[#1E1E20] border border-[#2C2C30] rounded-2xl flex items-center justify-start gap-3 md:gap-5">
              <Image
                src={PowerShield}
                alt="power shield"
                width={32}
                height={32}
                unoptimized
              />
              <div className="w-full flex flex-col items-start justify-start gap-1">
                <h6 className="text-[#ACB5BB] text-[1.2rem] font-normal">
                  Best Win Streak
                </h6>
                <h4 className="text-white text-[1.6rem] font-semibold">18</h4>
              </div>
            </div>
            <div className="w-full p-5 bg-[#1E1E20] border border-[#2C2C30] rounded-2xl flex items-center justify-start gap-3 md:gap-5">
              <Image
                src={GameTrophy}
                alt="game trophy"
                width={32}
                height={32}
                unoptimized
              />
              <div className="w-full flex flex-col items-start justify-start gap-1">
                <h6 className="text-[#ACB5BB] text-[1.2rem] font-normal whitespace-nowrap">
                  Your Ladder Rank
                </h6>
                <h4 className="text-white text-[1.6rem] font-semibold">
                  12,823
                </h4>
              </div>
            </div>
            <div className="w-full p-5 bg-[#1E1E20] border border-[#2C2C30] rounded-2xl flex items-center justify-start gap-3 md:gap-5">
              <Image
                src={GameCrown}
                alt="game crown"
                width={32}
                height={32}
                unoptimized
              />
              <div className="w-full flex flex-col items-start justify-start gap-1">
                <h6 className="text-[#ACB5BB] text-[1.2rem] font-normal">
                  All Time Rank
                </h6>
                <h4 className="text-white text-[1.6rem] font-semibold">98</h4>
              </div>
            </div>
          </div>

          <div className="w-full flex flex-col items-start justify-start gap-[0.8rem]">
            <div className="w-full grid grid-cols-[1fr_max-content_1fr] items-center gap-5">
              <div className="w-full h-[1px] bg-[#44444A]"></div>
              <p className=" text-[#ACB5BB] text-base">CREATE NEW</p>
              <div className="w-full h-[1px] bg-[#44444A]"></div>
            </div>

            <div className="w-full bg-[#1E1E20] border border-[#2C2C30] rounded-2xl p-4 md:py-5 md:pl-5 md:pr-[1.4rem] flex items-center justify-between">
              <div className="w-full flex items-center justify-start gap-4">
                <Image
                  src={Sword}
                  alt="sword"
                  width={32}
                  height={32}
                  unoptimized
                />
                <div className="w-full flex flex-col items-start justify-start gap-1">
                  <h6 className="text-[#EDF1F3] text-[1.2rem] md:text-[1.6rem] font-semibold">
                    Create a Ladder Match
                  </h6>
                  <p className="text-[#ACB5BB] text-base font-regular">
                    Create a Ladder Match
                  </p>
                </div>
              </div>

              <ArrowRight />
            </div>

            <div className="w-full bg-[#1E1E20] border border-[#2C2C30] rounded-2xl p-4 md:py-5 md:pl-5 md:pr-[1.4rem] flex items-center justify-between">
              <div className="w-full flex items-center justify-start gap-4">
                <Image
                  src={GameTrophy}
                  alt="game trophy"
                  width={32}
                  height={32}
                  unoptimized
                />
                <div className="w-full flex flex-col items-start justify-start gap-1">
                  <h6 className="text-[#EDF1F3] text-[1.2rem] md:text-[1.6rem] font-semibold">
                    Create a Private Match
                  </h6>
                  <p className="text-[#ACB5BB] text-base font-regular">
                    Start competing with others.
                  </p>
                </div>
              </div>

              <ArrowRight />
            </div>

            <div className="w-full bg-[#1E1E20] border border-[#2C2C30] rounded-2xl p-4 md:py-5 md:pl-5 md:pr-[1.4rem] flex items-center justify-between">
              <div className="w-full flex items-center justify-start gap-4">
                <Image
                  src={GameCrown}
                  alt="GameCrown"
                  width={32}
                  height={32}
                  unoptimized
                />
                <div className="w-full flex flex-col items-start justify-start gap-1">
                  <h6 className="text-[#EDF1F3] text-[1.2rem] md:text-[1.6rem] font-semibold">
                    Create Tournament
                  </h6>
                  <p className="text-[#ACB5BB] text-base font-regular">
                    Start competing with others.
                  </p>
                </div>
              </div>

              <ArrowRight />
            </div>

            <div className="w-full bg-[#1E1E20] border border-[#2C2C30] rounded-2xl p-4 md:py-5 md:pl-5 md:pr-[1.4rem] flex items-center justify-between">
              <div className="w-full flex items-center justify-start gap-4">
                <Image
                  src={ShieldSword}
                  alt="GameCrown"
                  width={32}
                  height={32}
                  unoptimized
                />
                <div className="w-full flex flex-col items-start justify-start gap-1">
                  <h6 className="text-[#EDF1F3] text-[1.2rem] md:text-[1.6rem] font-semibold">
                    Join Private Match
                  </h6>
                  <p className="text-[#ACB5BB] text-base font-regular">
                    Enter match code to join
                  </p>
                </div>
              </div>

              <div className="flex items-center justify-center">
                <input
                  className="w-[75px] md:w-[92.67px] py-4 px-[0.8rem] border border-[#2C2C30] bg-[#1E1E20] rounded-tl-2xl rounded-bl-2xl text-[#6C7278] font-normal text-base outline-none"
                  placeholder="Enter Code"
                />

                <button className="py-[0.85rem] px-7 border border-white border-opacity-15 rounded-tr-2xl rounded-br-2xl text-[1.2rem] text-white font-semibold gradient overflow-hidden outline-none">
                  Join
                </button>
              </div>
            </div>
          </div>

          <div className="w-full flex flex-col items-start justify-start gap-[0.8rem]">
            <div className="w-full grid grid-cols-[1fr_max-content_1fr] items-center gap-5">
              <div className="w-full h-[1px] bg-[#44444A]"></div>
              <p className=" text-[#ACB5BB] text-base">Games History</p>
              <div className="w-full h-[1px] bg-[#44444A]"></div>
            </div>

            <div className="w-full bg-[#1E1E20] border border-[#2C2C30] rounded-[12px] p-[1.4rem] flex items-center justify-between">
              <div className="flex flex-col items-start justify-start gap-3">
                <p className="text-base text-[#ACB5BB] font-normal">
                  01/07/2025
                </p>

                <div className="flex items-center justify-start gap-3">
                  <Image src={CleanShotGreen} alt="clean shot" />

                  <div className="flex flex-col items-start justify-start gap-1">
                    <p className="text-base text-[#12B3A8] font-normal">
                      Winner
                    </p>
                    <h6 className="text-[#EDF1F3] text-[1.2rem] font-medium">
                      Alex
                    </h6>
                  </div>
                </div>
              </div>

              <div className="flex flex-col items-center justify-center gap-3">
                <Image src={ShieldDoubleSword} alt="Shield double sword" />

                <p className="text-base text-[#ACB5BB] font-normal whitespace-nowrap ">
                  Bet: <span className="text-[#EDF1F3]">1 SOL</span> - Min Cap:{" "}
                  <span className="text-[#EDF1F3]">100k</span>
                </p>
              </div>

              <div className="flex flex-col items-end justify-start gap-3">
                <p className="text-base text-[#ACB5BB] font-normal whitespace-nowrap">
                  Starting Balance:{" "}
                  <span className="text-[#EDF1F3]">2 SOL</span>
                </p>

                <div className="flex items-end justify-end gap-3">
                  <div className="flex flex-col items-start justify-start gap-1">
                    <p className="text-base text-[#C65468] font-normal">
                      Loser
                    </p>
                    <h6 className="text-[1.2rem] text-[#EDF1F3] font-medium">
                      John
                    </h6>
                  </div>

                  <Image src={CleanShotRed} alt="Clean shot red" />
                </div>
              </div>
            </div>
          </div>

          <div className="w-full flex flex-col items-start justify-start gap-[0.8rem]">
            <div className="w-full bg-[#1E1E20] border border-[#2C2C30] rounded-[12px] p-[1.4rem] flex items-center justify-between">
              <div className="flex flex-col items-start justify-start gap-3">
                <p className="text-base text-[#ACB5BB] font-normal">
                  01/07/2025
                </p>

                <div className="flex items-center justify-start gap-3">
                  <Image src={CleanShotGreen} alt="clean shot" />

                  <div className="flex flex-col items-start justify-start gap-1">
                    <p className="text-base text-[#12B3A8] font-normal">
                      Winner
                    </p>
                    <h6 className="text-[#EDF1F3] text-[1.2rem] font-medium">
                      Alex
                    </h6>
                  </div>
                </div>
              </div>

              <div className="flex flex-col items-center justify-center gap-3">
                <Image src={ShieldDoubleSword} alt="Shield double sword" />

                <p className="text-base text-[#ACB5BB] font-normal">
                  Bet: <span className="text-[#EDF1F3]">1 SOL</span> - Min Cap:{" "}
                  <span className="text-[#EDF1F3]">100k</span>
                </p>
              </div>

              <div className="flex flex-col items-end justify-start gap-3">
                <p className="text-base text-[#ACB5BB] font-normal">
                  Starting Balance:{" "}
                  <span className="text-[#EDF1F3]">2 SOL</span>
                </p>

                <div className="flex items-end justify-end gap-3">
                  <div className="flex flex-col items-start justify-start gap-1">
                    <p className="text-base text-[#C65468] font-normal">
                      Loser
                    </p>
                    <h6 className="text-[1.2rem] text-[#EDF1F3] font-medium">
                      John
                    </h6>
                  </div>

                  <Image src={CleanShotRed} alt="Clean shot red" />
                </div>
              </div>
            </div>
          </div>

          <div
            className="absolute w-full h-[87px] bottom-0 left-0"
            style={{
              background:
                "linear-gradient(to top, rgba(22, 22, 24, 1) 0%, rgba(22, 22, 24, 0) 100%)",
            }}
          ></div>
          </div>

          
        </div>
      </div>

      <div className="w-full max-h-[790px] bg-[#161618] border border-[#2C2C30] rounded-2xl flex flex-col items-start justify-start overflow-x-hidden">
        <div className="w-full py-[1.3rem] px-5 flex items-center border-b border-[#2C2C30]">
          <h4 className="text-white text-[1.6rem] font-semibold">
            Available Matches
          </h4>
        </div>

        <div className="w-full h-full flex flex-col items-start justify-start gap-[1.6rem] px-[1.4rem] pt-[1.4rem] pb-0  overflow-y-auto" style={{
            scrollbarWidth: "none",
            msOverflowStyle: "none",
          }}>
          <div className="w-full flex items-center justify-between">
            <div className="p-3 md:p-4 flex items-center justify-center gap-2 md:gap-4 bg-[#2C2C30] border border-[#44444A] rounded-[8px] cursor-pointer">
              <h6 className="text-base md:text-[1.2rem] text-white">Min Cap</h6>
              <ArrowDown />
            </div>
            <div className="p-3 md:p-4 flex items-center justify-center gap-2 md:gap-4 bg-[#2C2C30] border border-[#44444A] rounded-[8px] cursor-pointer">
              <h6 className="text-[1.2rem] text-white"> Amount</h6>
              <ArrowDown />
            </div>
            <div className="p-3 md:p-4 flex items-center justify-center gap-2 md:gap-4 bg-[#2C2C30] border border-[#44444A] rounded-[8px] cursor-pointer">
              <h6 className="text-[1.2rem] text-white">Time</h6>
              <ArrowDown />
            </div>
            <div className="p-3 md:p-4 flex items-center justify-center gap-2 md:gap-4 bg-[#2C2C30] border border-[#44444A] rounded-[8px] cursor-pointer">
              <h6 className="text-[1.2rem] text-white">Type</h6>
              <ArrowDown />
            </div>
          </div>

          <div className="w-full flex flex-col items-start justify-start gap-[0.8rem]">
            <div className="w-full grid grid-cols-[1fr_max-content_1fr] items-center gap-5">
              <div className="w-full h-[1px] bg-[#44444A]"></div>
              <p className=" text-[#ACB5BB] text-base">Available Games</p>
              <div className="w-full h-[1px] bg-[#44444A]"></div>
            </div>

            <div className="w-full flex flex-col items-start justify-start gap-[0.8rem] relative">
            <div className="w-full bg-[#1E1E20] border border-[#2C2C30] rounded-2xl p-4 flex flex-col items-start justify-start gap-4">
              <div className="w-full flex items-center justify-between">
                <div className="w-full flex items-center justify-start gap-2">
                  <Image
                    src={ShieldDoubleSword}
                    alt="shield double sword"
                    unoptimized
                  />
                  <div className="flex flex-col items-start justify-start gap-2">
                    <div className="flex items-center justify-start gap-[0.4rem]">
                      <h5 className="text-[#EDF1F3] text-[1.4rem] font-medium">
                        Bet
                      </h5>
                      <Image src={Sol} alt="sol" unoptimized />
                      <h5 className="text-[#EDF1F3] text-[1.4rem] font-medium">
                        1.00
                      </h5>
                    </div>

                    <p className="text-base text-[#ACB5BB] font-normal">
                      Bet: <span className="text-[#EDF1F3]">1 SOL</span> - Min
                      Cap: <span className="text-[#EDF1F3]">100k</span>
                    </p>
                  </div>
                </div>

                <Image
                  src={CleanShotCircle}
                  alt="Clean Shot Circle"
                  unoptimized
                />
              </div>

              <div className="w-full grid grid-cols-2 gap-4">
                <div className="w-full">
                  <Button text="Join" size="xs" />
                </div>
                <div className="w-full">
                  <ButtonBlack text="Details" />
                </div>
              </div>
            </div>
            <div className="w-full bg-[#1E1E20] border border-[#2C2C30] rounded-2xl p-4 flex flex-col items-start justify-start gap-4">
              <div className="w-full flex items-center justify-between">
                <div className="w-full flex items-center justify-start gap-2">
                  <Image
                    src={ShieldDoubleSword}
                    alt="shield double sword"
                    unoptimized
                  />
                  <div className="flex flex-col items-start justify-start gap-2">
                    <div className="flex items-center justify-start gap-[0.4rem]">
                      <h5 className="text-[#EDF1F3] text-[1.4rem] font-medium">
                        Bet
                      </h5>
                      <Image src={Sol} alt="sol" unoptimized />
                      <h5 className="text-[#EDF1F3] text-[1.4rem] font-medium">
                        1.00
                      </h5>
                    </div>

                    <p className="text-base text-[#ACB5BB] font-normal">
                      Bet: <span className="text-[#EDF1F3]">1 SOL</span> - Min
                      Cap: <span className="text-[#EDF1F3]">100k</span>
                    </p>
                  </div>
                </div>

                <Image
                  src={CleanShotCircle}
                  alt="Clean Shot Circle"
                  unoptimized
                />
              </div>

              <div className="w-full grid grid-cols-2 gap-4">
                <div className="w-full">
                  <Button text="Join" size="xs" />
                </div>
                <div className="w-full">
                  <ButtonBlack text="Details" />
                </div>
              </div>
            </div>
            <div className="w-full bg-[#1E1E20] border border-[#2C2C30] rounded-2xl p-4 flex flex-col items-start justify-start gap-4">
              <div className="w-full flex items-center justify-between">
                <div className="w-full flex items-center justify-start gap-2">
                  <Image
                    src={ShieldDoubleSword}
                    alt="shield double sword"
                    unoptimized
                  />
                  <div className="flex flex-col items-start justify-start gap-2">
                    <div className="flex items-center justify-start gap-[0.4rem]">
                      <h5 className="text-[#EDF1F3] text-[1.4rem] font-medium">
                        Bet
                      </h5>
                      <Image src={Sol} alt="sol" unoptimized />
                      <h5 className="text-[#EDF1F3] text-[1.4rem] font-medium">
                        1.00
                      </h5>
                    </div>

                    <p className="text-base text-[#ACB5BB] font-normal">
                      Bet: <span className="text-[#EDF1F3]">1 SOL</span> - Min
                      Cap: <span className="text-[#EDF1F3]">100k</span>
                    </p>
                  </div>
                </div>

                <Image
                  src={CleanShotCircle}
                  alt="Clean Shot Circle"
                  unoptimized
                />
              </div>

              <div className="w-full grid grid-cols-2 gap-4">
                <div className="w-full">
                  <Button text="Join" size="xs" />
                </div>
                <div className="w-full">
                  <ButtonBlack text="Details" />
                </div>
              </div>
            </div>
            <div className="w-full bg-[#1E1E20] border border-[#2C2C30] rounded-2xl p-4 flex flex-col items-start justify-start gap-4">
              <div className="w-full flex items-center justify-between">
                <div className="w-full flex items-center justify-start gap-2">
                  <Image
                    src={ShieldDoubleSword}
                    alt="shield double sword"
                    unoptimized
                  />
                  <div className="flex flex-col items-start justify-start gap-2">
                    <div className="flex items-center justify-start gap-[0.4rem]">
                      <h5 className="text-[#EDF1F3] text-[1.4rem] font-medium">
                        Bet
                      </h5>
                      <Image src={Sol} alt="sol" unoptimized />
                      <h5 className="text-[#EDF1F3] text-[1.4rem] font-medium">
                        1.00
                      </h5>
                    </div>

                    <p className="text-base text-[#ACB5BB] font-normal">
                      Bet: <span className="text-[#EDF1F3]">1 SOL</span> - Min
                      Cap: <span className="text-[#EDF1F3]">100k</span>
                    </p>
                  </div>
                </div>

                <Image
                  src={CleanShotCircle}
                  alt="Clean Shot Circle"
                  unoptimized
                />
              </div>

              <div className="w-full grid grid-cols-2 gap-4">
                <div className="w-full">
                  <Button text="Join" size="xs" />
                </div>
                <div className="w-full">
                  <ButtonBlack text="Details" />
                </div>
              </div>
            </div>
            <div className="w-full bg-[#1E1E20] border border-[#2C2C30] rounded-2xl p-4 flex flex-col items-start justify-start gap-4">
              <div className="w-full flex items-center justify-between">
                <div className="w-full flex items-center justify-start gap-2">
                  <Image
                    src={ShieldDoubleSword}
                    alt="shield double sword"
                    unoptimized
                  />
                  <div className="flex flex-col items-start justify-start gap-2">
                    <div className="flex items-center justify-start gap-[0.4rem]">
                      <h5 className="text-[#EDF1F3] text-[1.4rem] font-medium">
                        Bet
                      </h5>
                      <Image src={Sol} alt="sol" unoptimized />
                      <h5 className="text-[#EDF1F3] text-[1.4rem] font-medium">
                        1.00
                      </h5>
                    </div>

                    <p className="text-base text-[#ACB5BB] font-normal">
                      Bet: <span className="text-[#EDF1F3]">1 SOL</span> - Min
                      Cap: <span className="text-[#EDF1F3]">100k</span>
                    </p>
                  </div>
                </div>

                <Image
                  src={CleanShotCircle}
                  alt="Clean Shot Circle"
                  unoptimized
                />
              </div>

              <div className="w-full grid grid-cols-2 gap-4">
                <div className="w-full">
                  <Button text="Join" size="xs" />
                </div>
                <div className="w-full">
                  <ButtonBlack text="Details" />
                </div>
              </div>
            </div>
            <div className="w-full bg-[#1E1E20] border border-[#2C2C30] rounded-2xl p-4 flex flex-col items-start justify-start gap-4">
              <div className="w-full flex items-center justify-between">
                <div className="w-full flex items-center justify-start gap-2">
                  <Image
                    src={ShieldDoubleSword}
                    alt="shield double sword"
                    unoptimized
                  />
                  <div className="flex flex-col items-start justify-start gap-2">
                    <div className="flex items-center justify-start gap-[0.4rem]">
                      <h5 className="text-[#EDF1F3] text-[1.4rem] font-medium">
                        Bet
                      </h5>
                      <Image src={Sol} alt="sol" unoptimized />
                      <h5 className="text-[#EDF1F3] text-[1.4rem] font-medium">
                        1.00
                      </h5>
                    </div>

                    <p className="text-base text-[#ACB5BB] font-normal">
                      Bet: <span className="text-[#EDF1F3]">1 SOL</span> - Min
                      Cap: <span className="text-[#EDF1F3]">100k</span>
                    </p>
                  </div>
                </div>

                <Image
                  src={CleanShotCircle}
                  alt="Clean Shot Circle"
                  unoptimized
                />
              </div>

              <div className="w-full grid grid-cols-2 gap-4">
                <div className="w-full">
                  <Button text="Join" size="xs" />
                </div>
                <div className="w-full">
                  <ButtonBlack text="Details" />
                </div>
              </div>
            </div>
            <div className="w-full bg-[#1E1E20] border border-[#2C2C30] rounded-2xl p-4 flex flex-col items-start justify-start gap-4">
              <div className="w-full flex items-center justify-between">
                <div className="w-full flex items-center justify-start gap-2">
                  <Image
                    src={ShieldDoubleSword}
                    alt="shield double sword"
                    unoptimized
                  />
                  <div className="flex flex-col items-start justify-start gap-2">
                    <div className="flex items-center justify-start gap-[0.4rem]">
                      <h5 className="text-[#EDF1F3] text-[1.4rem] font-medium">
                        Bet
                      </h5>
                      <Image src={Sol} alt="sol" unoptimized />
                      <h5 className="text-[#EDF1F3] text-[1.4rem] font-medium">
                        1.00
                      </h5>
                    </div>

                    <p className="text-base text-[#ACB5BB] font-normal">
                      Bet: <span className="text-[#EDF1F3]">1 SOL</span> - Min
                      Cap: <span className="text-[#EDF1F3]">100k</span>
                    </p>
                  </div>
                </div>

                <Image
                  src={CleanShotCircle}
                  alt="Clean Shot Circle"
                  unoptimized
                />
              </div>

              <div className="w-full grid grid-cols-2 gap-4">
                <div className="w-full">
                  <Button text="Join" size="xs" />
                </div>
                <div className="w-full">
                  <ButtonBlack text="Details" />
                </div>
              </div>
            </div>
            </div>
            <div
            className="absolute w-full h-[87px] bottom-0 left-0"
            style={{
              background:
                "linear-gradient(to top, rgba(22, 22, 24, 1) 0%, rgba(22, 22, 24, 0) 100%)",
            }}
          ></div>
          </div>

          
        </div>
      </div>

      <div className="w-full max-h-[790px] overflow-hidden bg-[#161618] border border-[#2C2C30] rounded-2xl flex flex-col items-start justify-start overflow-x-hidden">
        <div className="w-full py-[1.3rem] px-5 flex items-center border-b border-[#2C2C30]">
          <h4 className="text-white text-[1.6rem] font-semibold">
            Leaderboard
          </h4>
        </div>

        <div className="w-full flex flex-col items-start justify-start gap-[1.6rem] p-[1.4rem] overflow-y-auto" style={{
            scrollbarWidth: "none",
            msOverflowStyle: "none",
          }}>
          <div className="w-full grid grid-cols-2">
            <div className="w-full flex items-center justify-center border-b-2 border-b-[#7D52F4] p-5">
              <h5 className="text-white text-[1.4rem] font-semibold">
                Ladder Leaderboard
              </h5>
            </div>
            <div className="w-full flex items-center justify-center p-5">
              <h5 className="text-[#ACB5BB] text-[1.4rem] font-medium">
                All Time Best Traders
              </h5>
            </div>
          </div>

          <div className="w-full flex flex-col items-start justify-start gap-[1.6rem] relative">

          <div className="w-full flex flex-col items-start justify-start gap-[0.8rem]">
            <div className="w-full border border-[#ECAC31] rounded-[1.4rem] p-5 flex flex-col items-start justify-start gap-4">
              <div className="w-full flex items-center justify-between">
                <div className="w-full flex items-center justify-start gap-[0.4rem]">
                  <Image src={Gold} alt="Badge" />
                  <div className="w-full flex flex-col items-start justify-start gap-1">
                    <h4 className="text-[#EDF1F3] text-[1.6rem] font-medium">
                      AlexCrypto
                    </h4>
                    <h5 className="text-[#ACB5BB] text-[1.4rem] font-normal">
                      12,789 Points
                    </h5>
                  </div>
                  <Image src={CleanShotCircle4} alt="Clean Shot" />
                </div>
              </div>
              <div className="w-full grid grid-cols-[1fr_122.91px]">
                <div className="w-full bg-[#12B3A8] border border-[#033D55] rounded-tl-[6px] rounded-bl-[6px] py-1 px-[0.8rem] flex items-center justify-between">
                  <p className="text-white text-[1rem] font-normal">Wins</p>
                  <p className="text-[#EDF1F3] text-[1rem] font-normal">
                    <span className="font-bold">160</span> - 80%
                  </p>
                </div>

                <div className="w-full bg-[#C65468] border border-[#5F103B] rounded-tr-[6px] rounded-br-[6px] py-1 px-[0.8rem] flex items-center justify-between">
                  <p className="text-white text-[1rem] font-normal">Lost</p>

                  <p className="text-[#EDF1F3] text-[1rem] font-normal">
                    <span className="font-bold">40</span> - 20%
                  </p>
                </div>
              </div>
            </div>

            <div className="w-full border border-[#ACB5BB] rounded-[1.4rem] p-5 flex flex-col items-start justify-start gap-4">
              <div className="w-full flex items-center justify-between">
                <div className="w-full flex items-center justify-start gap-[0.4rem]">
                  <Image src={Silver} alt="Badge" />
                  <div className="w-full flex flex-col items-start justify-start gap-1">
                    <h4 className="text-[#EDF1F3] text-[1.6rem] font-medium">
                      Marc Peter
                    </h4>
                    <h5 className="text-[#ACB5BB] text-[1.4rem] font-normal">
                      10,000 Points
                    </h5>
                  </div>
                  <Image src={CleanShotCircle4} alt="Clean Shot" />
                </div>
              </div>
              <div className="w-full grid grid-cols-[1fr_122.91px]">
                <div className="w-full bg-[#12B3A8] border border-[#033D55] rounded-tl-[6px] rounded-bl-[6px] py-1 px-[0.8rem] flex items-center justify-between">
                  <p className="text-white text-[1rem] font-normal">Wins</p>
                  <p className="text-[#EDF1F3] text-[1rem] font-normal">
                    <span className="font-bold">160</span> - 80%
                  </p>
                </div>

                <div className="w-full bg-[#C65468] border border-[#5F103B] rounded-tr-[6px] rounded-br-[6px] py-1 px-[0.8rem] flex items-center justify-between">
                  <p className="text-white text-[1rem] font-normal">Lost</p>

                  <p className="text-[#EDF1F3] text-[1rem] font-normal">
                    <span className="font-bold">40</span> - 20%
                  </p>
                </div>
              </div>
            </div>

            <div className="w-full border border-[#ECAC31] rounded-[1.4rem] p-5 flex flex-col items-start justify-start gap-4">
              <div className="w-full flex items-center justify-between">
                <div className="w-full flex items-center justify-start gap-[0.4rem]">
                  <Image src={Bronze} alt="Badge" />
                  <div className="w-full flex flex-col items-start justify-start gap-1">
                    <h4 className="text-[#EDF1F3] text-[1.6rem] font-medium">
                      John Wick
                    </h4>
                    <h5 className="text-[#ACB5BB] text-[1.4rem] font-normal">
                      8,891 Points
                    </h5>
                  </div>
                  <Image src={CleanShotCircle4} alt="Clean Shot" />
                </div>
              </div>
              <div className="w-full grid grid-cols-[1fr_122.91px]">
                <div className="w-full bg-[#12B3A8] border border-[#033D55] rounded-tl-[6px] rounded-bl-[6px] py-1 px-[0.8rem] flex items-center justify-between">
                  <p className="text-white text-[1rem] font-normal">Wins</p>
                  <p className="text-[#EDF1F3] text-[1rem] font-normal">
                    <span className="font-bold">160</span> - 80%
                  </p>
                </div>

                <div className="w-full bg-[#C65468] border border-[#5F103B] rounded-tr-[6px] rounded-br-[6px] py-1 px-[0.8rem] flex items-center justify-between">
                  <p className="text-white text-[1rem] font-normal">Lost</p>

                  <p className="text-[#EDF1F3] text-[1rem] font-normal">
                    <span className="font-bold">40</span> - 20%
                  </p>
                </div>
              </div>
            </div>

            <div className="w-full border border-[#2C2C30] bg-[#1E1E20] rounded-[1.4rem] p-5 flex flex-col items-start justify-start gap-4">
              <div className="w-full flex items-center justify-between">
                <div className="w-full flex items-center justify-start gap-[0.4rem]">
                  <Image src={fourthBadge} alt="Badge" />
                  <div className="w-full flex flex-col items-start justify-start gap-1">
                    <h4 className="text-[#EDF1F3] text-[1.6rem] font-medium">
                      Arnold
                    </h4>
                    <h5 className="text-[#ACB5BB] text-[1.4rem] font-normal">
                      6,781 Points
                    </h5>
                  </div>
                  <Image src={CleanShotCircle4} alt="Clean Shot" />
                </div>
              </div>
              <div className="w-full grid grid-cols-[1fr_122.91px]">
                <div className="w-full bg-[#12B3A8] border border-[#033D55] rounded-tl-[6px] rounded-bl-[6px] py-1 px-[0.8rem] flex items-center justify-between">
                  <p className="text-white text-[1rem] font-normal">Wins</p>
                  <p className="text-[#EDF1F3] text-[1rem] font-normal">
                    <span className="font-bold">160</span> - 80%
                  </p>
                </div>

                <div className="w-full bg-[#C65468] border border-[#5F103B] rounded-tr-[6px] rounded-br-[6px] py-1 px-[0.8rem] flex items-center justify-between">
                  <p className="text-white text-[1rem] font-normal">Lost</p>

                  <p className="text-[#EDF1F3] text-[1rem] font-normal">
                    <span className="font-bold">40</span> - 20%
                  </p>
                </div>
              </div>
            </div>
            <div className="w-full border border-[#2C2C30] bg-[#1E1E20] rounded-[1.4rem] p-5 flex flex-col items-start justify-start gap-4">
              <div className="w-full flex items-center justify-between">
                <div className="w-full flex items-center justify-start gap-[0.4rem]">
                  <Image src={fifthBadge} alt="Badge" />
                  <div className="w-full flex flex-col items-start justify-start gap-1">
                    <h4 className="text-[#EDF1F3] text-[1.6rem] font-medium">
                      Elena p250
                    </h4>
                    <h5 className="text-[#ACB5BB] text-[1.4rem] font-normal">
                      5,562 Points
                    </h5>
                  </div>
                  <Image src={CleanShotCircle4} alt="Clean Shot" />
                </div>
              </div>
              <div className="w-full grid grid-cols-[1fr_122.91px]">
                <div className="w-full bg-[#12B3A8] border border-[#033D55] rounded-tl-[6px] rounded-bl-[6px] py-1 px-[0.8rem] flex items-center justify-between">
                  <p className="text-white text-[1rem] font-normal">Wins</p>
                  <p className="text-[#EDF1F3] text-[1rem] font-normal">
                    <span className="font-bold">160</span> - 80%
                  </p>
                </div>

                <div className="w-full bg-[#C65468] border border-[#5F103B] rounded-tr-[6px] rounded-br-[6px] py-1 px-[0.8rem] flex items-center justify-between">
                  <p className="text-white text-[1rem] font-normal">Lost</p>

                  <p className="text-[#EDF1F3] text-[1rem] font-normal">
                    <span className="font-bold">40</span> - 20%
                  </p>
                </div>
              </div>
            </div>
            <div className="w-full border border-[#2C2C30] bg-[#1E1E20] rounded-[1.4rem] p-5 flex flex-col items-start justify-start gap-4">
              <div className="w-full flex items-center justify-between">
                <div className="w-full flex items-center justify-start gap-[0.4rem]">
                  <Image src={sixthBadge} alt="Badge" />
                  <div className="w-full flex flex-col items-start justify-start gap-1">
                    <h4 className="text-[#EDF1F3] text-[1.6rem] font-medium">
                      Maria teresa
                    </h4>
                    <h5 className="text-[#ACB5BB] text-[1.4rem] font-normal">
                      5,321 Points
                    </h5>
                  </div>
                  <Image src={CleanShotCircle4} alt="Clean Shot" />
                </div>
              </div>
              <div className="w-full grid grid-cols-[1fr_122.91px]">
                <div className="w-full bg-[#12B3A8] border border-[#033D55] rounded-tl-[6px] rounded-bl-[6px] py-1 px-[0.8rem] flex items-center justify-between">
                  <p className="text-white text-[1rem] font-normal">Wins</p>
                  <p className="text-[#EDF1F3] text-[1rem] font-normal">
                    <span className="font-bold">160</span> - 80%
                  </p>
                </div>

                <div className="w-full bg-[#C65468] border border-[#5F103B] rounded-tr-[6px] rounded-br-[6px] py-1 px-[0.8rem] flex items-center justify-between">
                  <p className="text-white text-[1rem] font-normal">Lost</p>

                  <p className="text-[#EDF1F3] text-[1rem] font-normal">
                    <span className="font-bold">40</span> - 20%
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div
            className="absolute w-full h-[87px] bottom-0 left-0"
            style={{
              background:
                "linear-gradient(to top, rgba(22, 22, 24, 1) 0%, rgba(22, 22, 24, 0) 100%)",
            }}
          ></div>
          </div>
        </div>
      </div>

      <Chat />
    </div>
  );
};

export default Matches;
