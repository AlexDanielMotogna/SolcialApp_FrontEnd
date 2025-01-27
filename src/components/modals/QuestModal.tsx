"use client";

import { useState } from "react";
import Close from "../../../public/icons/Close";
import SocialMedia from "../../../public/imgs/SocialMedia.png";
import TwitterLg from "../../../public/icons/TwitterLg";
import ArrowRight from "../../../public/icons/ArrowRight";
import Button from "../../components/ButtonBorder";

import Image from "next/image";

interface QuestModalProps {
    isOpen: boolean;
    onClose: () => void;
  }
  
  const QuestModal: React.FC<QuestModalProps> = ({ isOpen, onClose }) => {
    if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-[#000000] bg-opacity-60 flex justify-center items-end md:items-center z-50">
      <div
        className="bg-[#161618] max-h-[100vh] w-[100vw] md:w-[420px] md:max-h-[90vh] overflow-y-auto flex flex-col items-start justify-start gap-6 border border-[#44444A] rounded-2xl shadow-[0px_2px_10px_-3px_rgba(0,0,0,0)]"
        style={{
          boxShadow: "0px -5px 10px 0px #FFFFFF1A inset",
          scrollbarWidth: "none",
          msOverflowStyle: "none",
        }}
      >
        <div className="w-full p-8 border-b border-[#44444A] flex items-center justify-between">
          <h3 className="text-[1.8rem] text-white font-semibold">
            Social Media Engagement Quest
          </h3>

          <Close onClick={onClose} />
        </div>

        <div className="w-full flex flex-col items-start justify-start gap-6 px-8">
          <Image src={SocialMedia} className="w-full" alt="" />

          <div className="w-full flex flex-col items-start justify-start gap-1">
            <h4 className="text-white font-semibold text-[1.8rem]">
              Social Media Engagement Quest
            </h4>
            <p className="text-[#ACB5BB] text-[1.4rem]">
              Engage with our social media posts to win prizes.
            </p>
          </div>

          <div className="w-full flex flex-col items-start justify-start gap-[0.8rem]">
            <div className="w-full flex items-end justify-between bg-[#2C2C30] border border-[#44444A] rounded-lg px-4 py-[0.6rem]">
              <span className="text-[1.4rem] text-[#ACB5BB]">Reward</span>
              <p className="text-[#EDF1F3] font-semibold text-[1.4rem]">
                500 SOL
              </p>
            </div>
            <div className="w-full flex items-end justify-between bg-[#2C2C30] border border-[#44444A] rounded-lg px-4 py-[0.6rem]">
              <span className="text-[1.4rem] text-[#ACB5BB]">Start Date</span>
              <p className="text-[#EDF1F3] font-semibold text-[1.4rem]">
                22/11/2024, 11:00:00
              </p>
            </div>
            <div className="w-full flex items-end justify-between bg-[#2C2C30] border border-[#44444A] rounded-lg px-4 py-[0.6rem]">
              <span className="text-[1.4rem] text-[#ACB5BB]">End Date</span>
              <p className="text-[#EDF1F3] font-semibold text-[1.4rem]">
                25/11/2024, 11:00:00
              </p>
            </div>
          </div>
        </div>

        <div className="w-full flex flex-col items-start justify-start px-8 gap-6">
          <h5 className="text-white text-[1.6rem] font-semibold">Tasks</h5>

          <div className="w-full flex flex-col items-start justify-start gap-[0.8rem]">
            <div className="w-full bg-[#2C2C30] p-5 flex items-center justify-between rounded-md border border-[#44444A]">
              <div className="flex items-center justify-center gap-[0.6rem]">
                <TwitterLg />
                <p className="text-white font-medium text-[1.4rem]">
                  Like my twitter post
                </p>
              </div>

              <ArrowRight />
            </div>

            <div className="w-full bg-[#2C2C30] p-5 flex items-center justify-between rounded-md border border-[#44444A]">
              <div className="flex items-center justify-center gap-[0.6rem]">
                <TwitterLg />
                <p className="text-white font-medium text-[1.4rem]">
                  Follow my twitter page
                </p>
              </div>

              <ArrowRight />
            </div>

            <div className="w-full bg-[#2C2C30] p-5 flex items-center justify-between rounded-md border border-[#44444A]">
              <div className="flex items-center justify-center gap-[0.6rem]">
                <TwitterLg />
                <p className="text-white font-medium text-[1.4rem]">
                  Retweet my twitter post
                </p>
              </div>

              <ArrowRight />
            </div>
          </div>
        </div>

        <div className="w-full border-t border-[#44444A] p-8">
          <Button text="Claim Reward" />
        </div>
      </div>
    </div>
  );
};

export default QuestModal;
