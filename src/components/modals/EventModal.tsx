"use client";

import { useState } from "react";
import Close from "../../../public/icons/Close";
import Tournament from "../../../public/imgs/Tournament.png";
import TwitterLg from "../../../public/icons/TwitterLg";
import ArrowRight from "../../../public/icons/ArrowRight";
import Button from "../../components/ButtonBorder";
import Gold from "../../../public/imgs/Gold.png";
import Silver from "../../../public/imgs/Silver.png";
import Bronze from "../../../public/imgs/Bronze.png";
import CleanShotCircle4 from "../../../public/imgs/CleanShotCircle4.png";

import Image from "next/image";

interface EventModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const EventModal: React.FC<EventModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 bg-[#000000] bg-opacity-60 flex justify-center items-center z-50">
      <div
        className="bg-[#161618] max-h-[90vh] overflow-y-auto flex flex-col items-start justify-start gap-6 border border-[#44444A] rounded-2xl shadow-[0px_2px_10px_-3px_rgba(0,0,0,0)]"
        style={{
          boxShadow: "0px -5px 10px 0px #FFFFFF1A inset",
          scrollbarWidth: "none",
          msOverflowStyle: "none",
        }}
      >
        <div className="w-full p-8 border-b border-[#44444A] flex items-center justify-between">
          <h3 className="text-[1.8rem] text-white font-semibold">
            Tournament Details
          </h3>

          <Close onClick={onClose} />
        </div>

        <div className="w-full flex flex-col items-start justify-start gap-6 px-8">
          <Image src={Tournament} className="w-full" alt="" />

          <div className="w-full flex flex-col items-start justify-start gap-1">
            <h3 className="text-white font-semibold text-[1.8rem]">
              Tournament Title
            </h3>
            <h5 className="text-[#ACB5BB] text-[1.4rem]">
              Tournament description Engage with our social media posts.
            </h5>
          </div>

          <div className="w-full flex flex-col items-start justify-start gap-[0.8rem]">
            <div className="w-full flex items-end justify-between bg-[#2C2C30] border border-[#44444A] rounded-lg px-4 py-[0.6rem]">
              <h5 className="text-[1.4rem] text-[#ACB5BB]">Entry Cost</h5>
              <h5 className="text-[#EDF1F3] font-semibold text-[1.4rem]">
                2 SOL
              </h5>
            </div>
            <div className="w-full flex items-end justify-between bg-[#2C2C30] border border-[#44444A] rounded-lg px-4 py-[0.6rem]">
              <h5 className="text-[1.4rem] text-[#ACB5BB]">Prize</h5>
              <h5 className="text-[#EDF1F3] font-semibold text-[1.4rem]">
                500 SOL
              </h5>
            </div>
            <div className="w-full flex items-center gap-2 justify-between bg-[#2C2C30] border border-[#44444A] rounded-lg px-4 py-[0.6rem]">
              <h5 className="text-[1.4rem] text-[#ACB5BB] text-nowrap">
                Payout Distribution
              </h5>
              <div className="w-full flex items-end justify-end gap-2">
                <div className="w-full flex flex-col items-start justify-start gap-2">
                  <h6 className="text-[#ACB5BB] text-[1.2rem] font-normal">
                    1st
                  </h6>
                  <h6 className="text-[#EDF1F3] font-semibold text-[1.2rem]">
                    300 SOL
                  </h6>
                </div>
                <div className="w-full flex flex-col items-start justify-start gap-2">
                  <h6 className="text-[#ACB5BB] text-[1.2rem] font-normal">
                    2nd
                  </h6>
                  <h6 className="text-[#EDF1F3] font-semibold text-[1.2rem]">
                    100 SOL
                  </h6>
                </div>
                <div className="w-full flex flex-col items-start justify-start gap-2">
                  <h6 className="text-[#ACB5BB] text-[1.2rem] font-normal">
                    3rd-4th
                  </h6>
                  <h6 className="text-[#EDF1F3] font-semibold text-[1.2rem]">
                    25 SOL
                  </h6>
                </div>
                <div className="w-full flex flex-col items-start justify-start gap-2">
                  <h6 className="text-[#ACB5BB] text-[1.2rem] font-normal">
                    5th-8th
                  </h6>
                  <h6 className="text-[#EDF1F3] font-semibold text-[1.2rem]">
                    12.5 SOL
                  </h6>
                </div>
              </div>
            </div>
            <div className="w-full flex items-end justify-between bg-[#2C2C30] border border-[#44444A] rounded-lg px-4 py-[0.6rem]">
              <h5 className="text-[1.4rem] text-[#ACB5BB]">Start Date</h5>
              <h5 className="text-[#EDF1F3] font-semibold text-[1.4rem]">
                22/11/2024, 11:00:00
              </h5>
            </div>
            <div className="w-full flex items-end justify-between bg-[#2C2C30] border border-[#44444A] rounded-lg px-4 py-[0.6rem]">
              <h5 className="text-[1.4rem] text-[#ACB5BB]">End Date</h5>
              <h5 className="text-[#EDF1F3] font-semibold text-[1.4rem]">
                25/11/2024, 11:00:00
              </h5>
            </div>
          </div>
        </div>

        <div className="w-full flex flex-col items-start justify-start px-8 gap-6">
          <div className="w-full flex items-center justify-between">
            <h4 className="text-white text-[1.6rem] font-semibold">
              Leaderboard
            </h4>
            <h5 className="text-[#ACB5BB] text-[1.4rem] font-normal">
              2,289 Participiant
            </h5>
          </div>

          <div className="w-full flex flex-col items-start justify-start gap-[0.8rem]">
            <div className="w-full border border-[#ECAC31] rounded-[1.4rem] p-5 flex flex-col items-start justify-start gap-4">
              <div className="w-full flex items-center justify-between">
                <div className="w-full flex items-center justify-start gap-[0.4rem]">
                  <Image src={Gold} alt="Badge" />
                  <div className="w-full flex flex-col items-start justify-start gap-1">
                    <h4 className="text-[#EDF1F3] text-[1.6rem] font-medium">
                      John Doe
                    </h4>
                    <h5 className="text-[#ACB5BB] text-[1.4rem] font-normal">
                      12,789% - Prize Money : $$$
                    </h5>
                  </div>
                  <Image src={CleanShotCircle4} alt="Clean Shot" />
                </div>
              </div>
              <div className="w-full grid grid-cols-2">
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
                      John Doe
                    </h4>
                    <h5 className="text-[#ACB5BB] text-[1.4rem] font-normal">
                      12,789% - Prize Money : $$$
                    </h5>
                  </div>
                  <Image src={CleanShotCircle4} alt="Clean Shot" />
                </div>
              </div>
              <div className="w-full grid grid-cols-2">
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
                      John Doe
                    </h4>
                    <h5 className="text-[#ACB5BB] text-[1.4rem] font-normal">
                      12,789% - Prize Money : $$$
                    </h5>
                  </div>
                  <Image src={CleanShotCircle4} alt="Clean Shot" />
                </div>
              </div>
              <div className="w-full grid grid-cols-2">
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

        <div className="w-full border-t border-[#44444A] p-8">
          <Button text="Join Tournament" />
        </div>
      </div>
    </div>
  );
};

export default EventModal;
