import Image from "next/image";

import CleanShotGreen from "../../../../public/imgs/CleanShotGreen.png";
import ShieldDoubleSword from "../../../../public/imgs/ShieldDoubleSword.png";
import CleanShotRed from "../../../../public/imgs/CleanShotRed.png";
import Gold from "../../../../public/imgs/Gold.png";
import Silver from "../../../../public/imgs/Silver.png";
import Bronze from "../../../../public/imgs/Bronze.png";
import CleanShotCircle4 from "../../../../public/imgs/CleanShotCircle4.png";
import Shrimp from "../../../../public/imgs/Shrimp.png";
import WhiteFlag from "../../../../public/imgs/WhiteFlag.png";
import PowerShield from "../../../../public/imgs/PowerShield.png";
import Hourglass from "../../../../public/imgs/Hourglass.png";
import AvatarBadge from "../../../../public/imgs/AvatarBadge.png";
import Wallet from "../../../../public/icons/Wallet";
import ShadowButton from "@/components/ShadowButton";
import Twitter from "../../../../public/icons/Twitter";
import Telegram from "../../../../public/icons/Telegram";
import Discord from "../../../../public/icons/Discord";
import Chat from "@/components/global/Chat";

const profile = () => {
  return (
    <div className="w-full p-[1.6rem] xl:py-[1.8rem] xl:px-[2.4rem] grid grid-cols-1 xl:grid-cols-3 gap-[1.6rem]">
      <div className="w-full max-h-[900px] order-3 xl:order-1 bg-[#161618] border border-[#2C2C30] rounded-2xl flex flex-col items-start justify-start">
        <div className="w-full py-[1.3rem] px-5 flex items-center border-b border-[#2C2C30]">
          <h4 className="text-white text-[1.6rem] font-semibold">
            Match History
          </h4>
        </div>

        <div
          className="w-full flex flex-col items-start justify-start gap-[0.8rem] p-[1.4rem] max-h-[820px] overflow-y-auto"
          style={{
            scrollbarWidth: "none",
            msOverflowStyle: "none",
          }}
        >
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

                <p className="text-base text-[#ACB5BB] font-normal whitespace-nowrap">
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

                <p className="text-base text-[#ACB5BB] font-normal whitespace-nowrap">
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

                <p className="text-base text-[#ACB5BB] font-normal whitespace-nowrap">
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

                <p className="text-base text-[#ACB5BB] font-normal whitespace-nowrap">
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

                <p className="text-base text-[#ACB5BB] font-normal whitespace-nowrap">
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

                <p className="text-base text-[#ACB5BB] font-normal whitespace-nowrap">
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

                <p className="text-base text-[#ACB5BB] font-normal whitespace-nowrap">
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

                <p className="text-base text-[#ACB5BB] font-normal whitespace-nowrap">
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
        </div>
      </div>

      <div className="w-full order-1 xl:order-2 bg-[#161618] grid grid-rows-[max-content_max-content] gap-4">
        <div className="w-full bg-[#161618] border border-[#2C2C30] rounded-2xl flex flex-col items-start justify-start gap-[1.4rem]">
          <div className="w-full py-[1.3rem] px-5 flex items-center border-b border-[#2C2C30]">
            <h4 className="text-white text-[1.6rem] font-semibold">
              My Profile
            </h4>
          </div>

          <div className="w-full h-full flex flex-col items-center justify-center gap-[3.3rem] px-[1.4rem] pb-[1.4rem]">
            <Image src={AvatarBadge} alt="avatar" unoptimized />

            <div className="w-full flex flex-col items-center justify-center gap-1">
              <h3 className="text-white text-[1.8rem] font-medium">Alex</h3>
              <h6 className="text-[#ACB5BB] text-[1.2rem] font-normal">
                @Alex
              </h6>
            </div>

            <div className="w-full grid grid-cols-4 md:grid-cols-2  gap-[1.2rem]">
              <div className="w-full bg-[#1E1E20] border border-[#2C2C30] rounded-2xl p-[0.8rem] flex items-start justify-start gap-[0.8rem] flex-col">
                <Image src={Shrimp} alt="" width={24} height={24} />

                <div className="w-full flex flex-col items-start justify-start gap-1">
                  <p className="text-base text-[#ACB5BB]">Your Level</p>
                  <h5 className="text-white text-[1.4] font-semibold">
                    Shrimp
                  </h5>
                </div>
              </div>
              <div className="w-full bg-[#1E1E20] border border-[#2C2C30] rounded-2xl p-[0.8rem] flex items-start justify-between gap-[0.8rem] flex-col">
                <Image src={WhiteFlag} alt="" width={24} height={24} />

                <div className="w-full flex flex-col items-start justify-start gap-1">
                  <span className="text-base text-[#ACB5BB]">Win Rate</span>
                  <h2 className="text-white text-[1.4] font-semibold">75%</h2>
                </div>
              </div>
              <div className="w-full bg-[#1E1E20] border border-[#2C2C30] rounded-2xl p-[0.8rem] flex items-start justify-between gap-[0.8rem] flex-col">
                <Image src={PowerShield} alt="" width={24} height={24} />

                <div className="w-full flex flex-col items-start justify-start gap-1">
                  <span className="text-base text-[#ACB5BB]">Gain/Loss</span>
                  <h2 className="text-white text-[1.4] font-semibold">+12%</h2>
                </div>
              </div>
              <div className="w-full bg-[#1E1E20] border border-[#2C2C30] rounded-2xl p-[0.8rem] flex items-start justify-start gap-[0.8rem] flex-col">
                <Image src={Hourglass} alt="" width={24} height={24} />

                <div className="w-full flex flex-col items-start justify-start gap-1">
                  <span className="text-base text-[#ACB5BB]">Transactions</span>
                  <h2 className="text-white text-[1.4] font-semibold">3000</h2>
                </div>
              </div>
            </div>

            <div className="w-full flex flex-col items-start justify-start gap-[0.8rem]">
              <div className="w-full flex items-center justify-between">
                <h6 className="text-[#ACB5BB] text-[1.2rem] font-normal">
                  Level 23
                </h6>
                <h6 className="text-[#EDF1F3] text-[1.2rem] font-medium">
                  6,570 / 10,750 ХР
                </h6>
              </div>

              <div className="w-full h-[12px] rounded-full bg-[#2C2C30] flex items-start justify-start overflow-hidden">
                <div className="w-[234px] h-full gradient"></div>
              </div>
            </div>
          </div>
        </div>

        <div className="w-full bg-[#161618] border border-[#2C2C30] rounded-2xl flex flex-col items-start justify-start gap-6">
          <div className="w-full py-[1.3rem] px-5 flex items-center border-b border-[#2C2C30]">
            <h4 className="text-white text-[1.6rem] font-semibold">Bio</h4>
          </div>

          <div className="w-full px-[1.4rem] pb-[1.2rem] flex flex-col items-start justify-start gap-[1.2rem] ">
            <div className="w-full p-[1.4rem] rounded-2xl bg-[#1E1E20] border border-[#2C2C30]">
              <h5 className="text-[1.4rem] text-white">I am the best</h5>
            </div>
          </div>
        </div>
      </div>

      <div className="w-full order-2 xl:order-3 grid grid-rows-[1fr_max-content_max-content] gap-4">
        <div className="w-full bg-[#161618] border border-[#2C2C30] rounded-2xl flex flex-col items-start justify-start">
          <div className="w-full py-[1.3rem] px-5 flex items-center border-b border-[#2C2C30]">
            <h4 className="text-white text-[1.6rem] font-semibold">
              Ranks History
            </h4>
          </div>

          <div className="w-full flex flex-col items-start justify-start gap-[1.6rem] p-[1.4rem]">
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
            </div>
          </div>
        </div>

        <div className="w-full bg-[#161618] border border-[#2C2C30] rounded-2xl flex flex-col items-start justify-start gap-6">
          <div className="w-full py-[1.3rem] px-5 flex items-center border-b border-[#2C2C30]">
            <h4 className="text-white text-[1.6rem] font-semibold">
              My Wallet
            </h4>
          </div>

          <div className="w-full px-[1.4rem] pb-[1.2rem] flex flex-col items-start justify-start gap-[1.2rem]">
            <ShadowButton label="0x2CJGFKDJSKKWJAJCJAKAKCJ0394" />
            <ShadowButton label="Disconnect Wallet" icon={Wallet} />
          </div>
        </div>

        <div className="w-full bg-[#161618] border border-[#2C2C30] rounded-2xl flex flex-col items-start justify-start gap-6">
          <div className="w-full py-[1.3rem] px-5 flex items-center border-b border-[#2C2C30]">
            <h4 className="text-white text-[1.6rem] font-semibold">
              Social Links
            </h4>
          </div>

          <div className="w-full px-[1.4rem] pb-[1.2rem] flex flex-col items-start justify-start gap-[1.2rem]">
            <ShadowButton label="Discord" icon={Discord} />
            <ShadowButton label="Telegram" icon={Telegram} />
            <ShadowButton label="Twitter-X" icon={Twitter} />
          </div>
        </div>
      </div>

      <Chat />

    </div>
  );
};

export default profile;
