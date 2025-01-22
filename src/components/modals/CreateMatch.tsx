"use client";

import { useState } from "react";
import Close from "../../../public/icons/Close";
import SocialMedia from "../../../public/imgs/SocialMedia.png";
import TwitterLg from "../../../public/icons/TwitterLg";
import ArrowRight from "../../../public/icons/ArrowRight";
import Calendar from "../../../public/icons/Calendar";
import Button from "../../components/ButtonBorder";

import Image from "next/image";

interface CreateMatchProps {
  isOpen: boolean;
  onClose: () => void;
}

const CreateMatch: React.FC<CreateMatchProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-[#000000] bg-opacity-60 flex justify-center items-center z-50">
      <div
        className="bg-[#161618] w-[470px]  max-h-[90vh] overflow-y-auto flex flex-col items-start justify-start gap-6 border border-[#44444A] rounded-2xl shadow-[0px_2px_10px_-3px_rgba(0,0,0,0)]"
        style={{
          boxShadow: "0px -5px 10px 0px #FFFFFF1A inset",
          scrollbarWidth: "none",
          msOverflowStyle: "none",
        }}
      >
        <div className="w-full p-8 border-b border-[#44444A] flex items-center justify-between">
          <h3 className="text-[1.8rem] text-white font-semibold">
            Create Private Match
          </h3>

          <Close onClick={onClose} />
        </div>

        <div className="w-full flex flex-col items-start justify-start gap-6 px-8">
          <div className="w-full flex flex-col items-start justify-start gap-1">
            <h4 className="text-white font-semibold text-[1.8rem]">
              Create Private Match
            </h4>
            <p className="text-[#ACB5BB] text-[1.4rem]">
              Invite friends for a private competitive session.
            </p>
          </div>

          <div className="w-full flex flex-col items-start justify-start gap-[0.8rem]">
            <div className="w-full flex flex-col items-start justify-start gap-2">
              <h6 className="text-[1.2rem] text-[#ACB5BB] font-normal">
                Match Name
              </h6>
              <input
                className="w-full py-5 px-5 bg-[#2C2C30] border border-[#44444A] rounded-xl text-[1.4rem] text-[#6C7278] font-normal outline-none border-none"
                placeholder="Weekly Ladder Tournament"
              />
            </div>

            <div className="w-full flex flex-col items-start justify-start gap-2">
              <h6 className="text-[1.2rem] text-[#ACB5BB] font-normal">
                Bet Amount
              </h6>
              <input
                className="w-full py-5 px-5 bg-[#2C2C30] border border-[#44444A] rounded-xl text-[1.4rem] text-[#6C7278] font-normal outline-none border-none"
                placeholder="10 SOL"
              />
            </div>

            <div className="w-full flex flex-col items-start justify-start gap-2">
              <h6 className="text-[1.2rem] text-[#ACB5BB] font-normal">
                Starting Balance
              </h6>
              <input
                className="w-full py-5 px-5 bg-[#2C2C30] border border-[#44444A] rounded-xl text-[1.4rem] text-[#6C7278] font-normal outline-none border-none"
                placeholder="100 SOL"
              />
            </div>

            <div className="w-full flex flex-col items-start justify-start gap-2">
              <h6 className="text-[1.2rem] text-[#ACB5BB] font-normal">
                Invite Code
              </h6>
              <input
                className="w-full py-5 px-5 bg-[#2C2C30] border border-[#44444A] rounded-xl text-[1.4rem] text-white font-normal outline-none border-none"
                placeholder="PRV12345"
              />
            </div>

            <div className="w-full flex flex-col items-start justify-start gap-2">
              <h6 className="text-[1.2rem] text-[#ACB5BB] font-normal">
                Minimum Market Cap for Tokens
              </h6>
              <input
                className="w-full py-5 px-5 bg-[#2C2C30] border border-[#44444A] rounded-xl text-[1.4rem] text-[#6C7278] font-normal outline-none border-none"
                placeholder="5000 USD"
              />
            </div>

            <div className="w-full grid grid-cols-2 gap-4">
              <div className="w-full flex flex-col items-start justify-start gap-2">
                <h6 className="text-[1.2rem] text-[#ACB5BB] font-normal">
                  Start Date
                </h6>
                <div className="w-full py-5 px-5 bg-[#2C2C30] border border-[#44444A] rounded-xl flex items-center justify-between">
                  <input
                    className="w-full text-[1.4rem] text-[#6C7278] font-normal outline-none border-none bg-transparent outline-none border-none"
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
          </div>
        </div>
        <div className="w-full border-t border-[#44444A] p-8">
          <Button text="Create Quest" />
        </div>
      </div>
    </div>
  );
};

export default CreateMatch;
