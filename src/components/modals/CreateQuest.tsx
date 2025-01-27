"use client";

import { useState } from "react";
import Close from "../../../public/icons/Close";
import SocialMedia from "../../../public/imgs/SocialMedia.png";
import TwitterLg from "../../../public/icons/TwitterLg";
import ArrowRight from "../../../public/icons/ArrowRight";
import Calendar from "../../../public/icons/Calendar";
import Button from "../../components/ButtonBorder";

import Image from "next/image";

interface CreateQuestProps {
  isOpen: boolean;
  onClose: () => void;
}

const CreateQuest: React.FC<CreateQuestProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-[#000000] bg-opacity-60 flex justify-center items-end md:items-center z-50">
      <div
        className="bg-[#161618] w-[470px] max-h-[90vh]  flex flex-col items-start justify-start gap-6 border border-[#44444A] rounded-2xl shadow-[0px_2px_10px_-3px_rgba(0,0,0,0)]"
        style={{
          boxShadow: "0px -5px 10px 0px #FFFFFF1A inset",
          scrollbarWidth: "none",
          msOverflowStyle: "none",
        }}
      >
        <div className="w-full p-8 border-b border-[#44444A] flex items-center justify-between">
          <h3 className="text-[1.8rem] text-white font-semibold">
            Create Quest
          </h3>

          <Close onClick={onClose} />
        </div>

        <div className="w-full flex flex-col items-start justify-start gap-6 px-8 overflow-y-auto" style={{
            scrollbarWidth: "none",
            msOverflowStyle: "none",
          }}>
          <div className="w-full flex flex-col items-start justify-start gap-1">
            <h4 className="text-white font-semibold text-[1.8rem]">
              Launch a New Quest
            </h4>
            <p className="text-[#ACB5BB] text-[1.4rem]">
              Engage your community with exciting quests and earn traction!
            </p>
          </div>

          <div className="w-full flex flex-col items-start justify-start gap-[0.8rem]">
            
            <div className="w-full flex flex-col items-start justify-start gap-2">
              <h6 className="text-[1.2rem] text-[#ACB5BB] font-normal">
                Quest Name
              </h6>
              <input
                className="w-full py-5 px-5 bg-[#2C2C30] border border-[#44444A] rounded-xl text-[1.4rem] text-[#6C7278] font-normal"
                placeholder="Social Media Engagement Quest"
              />
            </div>

            <div className="w-full flex flex-col items-start justify-start gap-2">
              <h6 className="text-[1.2rem] text-[#ACB5BB] font-normal">
                Quest Name
              </h6>
              <textarea
                className="w-full h-[77px] px-5 py-5 bg-[#2C2C30] border border-[#44444A] rounded-xl text-[1.4rem] text-[#6C7278] font-normal resize-none"
                placeholder="Engage with our social media"
              />
            </div>

            <div className="w-full flex flex-col items-start justify-start gap-2">
              <h6 className="text-[1.2rem] text-[#ACB5BB] font-normal">
                Reward Ammount
              </h6>
              <input
                className="w-full py-5 px-5 bg-[#2C2C30] border border-[#44444A] rounded-xl text-[1.4rem] text-[#6C7278] font-normal"
                placeholder="50 SOL"
              />
            </div>

            <div className="w-full grid grid-cols-2 gap-4">
            
            <div className="w-full flex flex-col items-start justify-start gap-2">
              <h6 className="text-[1.2rem] text-[#ACB5BB] font-normal">
              Start Date
              </h6>
              <div className="w-full py-5 px-5 bg-[#2C2C30] border border-[#44444A] rounded-xl flex items-center justify-between">
              <input
                className="w-full text-[1.4rem] text-[#6C7278] font-normal outline-none border-none bg-transparent"
                placeholder="MM/DD/YYYY"
              />
              <Calendar />
              </div>
            </div>
            
            <div className="w-full flex flex-col items-start justify-start gap-2">
              <h6 className="text-[1.2rem] text-[#ACB5BB] font-normal">
              End Date
              </h6>
              <div className="w-full py-5 px-5 bg-[#2C2C30] border border-[#44444A] rounded-xl flex items-center justify-between">
              <input
                className="w-full text-[1.4rem] text-[#6C7278] font-normal outline-none border-none bg-transparent"
                placeholder="MM/DD/YYYY"
              />
              <Calendar />
              </div>
            </div>

            </div>

            <div className="w-full flex flex-col items-start justify-start gap-2">
              <h6 className="text-[1.2rem] text-[#ACB5BB] font-normal">
              Tasks
              </h6>
              <textarea
                className="w-full h-[77px] px-5 py-5 bg-[#2C2C30] border border-[#44444A] rounded-xl text-[1.4rem] text-[#6C7278] font-normal resize-none"
                placeholder="Enter tasks list"
              />
            </div>

            <div className="w-full flex flex-col items-start justify-start gap-2">
              <h6 className="text-[1.2rem] text-[#ACB5BB] font-normal">
                Max Participants
              </h6>
              <input
                className="w-full py-5 px-5 bg-[#2C2C30] border border-[#44444A] rounded-xl text-[1.4rem] text-[#6C7278] font-normal"
                placeholder="50"
              />
            </div>

          </div>
        </div>

        <div className="w-full border-t border-[#44444A] p-8">
          <Button text="Create Quest" />
        </div>
      </div>
    </div>
  );
};

export default CreateQuest;
