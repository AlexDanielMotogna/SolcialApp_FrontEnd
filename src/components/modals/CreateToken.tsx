"use client";

import Close from "../../../public/icons/Close";
import Button from "../../components/ButtonBorder";

import Image from "next/image";
import ArrowDown from "../../../public/icons/ArrowDown";
import Attach from "../../../public/icons/Attach";

interface CreateTokenProps {
  isOpen: boolean;
  onClose: () => void;
}

const CreateToken: React.FC<CreateTokenProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-[#000000] bg-opacity-60 flex justify-center items-end md:items-center z-50">
      <div
        className="bg-[#161618] w-[470px]  max-h-[90vh]  flex flex-col items-start justify-start gap-6 border border-[#44444A] rounded-2xl shadow-[0px_2px_10px_-3px_rgba(0,0,0,0)]"
        style={{
          boxShadow: "0px -5px 10px 0px #FFFFFF1A inset",
          scrollbarWidth: "none",
          msOverflowStyle: "none",
        }}
      >
        <div className="w-full p-8 border-b border-[#44444A] flex items-center justify-between">
          <h3 className="text-[1.8rem] text-white font-semibold">
            Create Token Advertising
          </h3>

          <Close onClick={onClose} />
        </div>

        <div className="w-full flex flex-col items-start justify-start gap-6 px-8 overflow-y-auto" style={{
            scrollbarWidth: "none",
            msOverflowStyle: "none",
          }}>
          <div className="w-full flex flex-col items-start justify-start gap-1">
            <h4 className="text-white font-semibold text-[1.8rem]">
              Launch a Token Advertising Campaign
            </h4>
            <p className="text-[#ACB5BB] text-[1.4rem]">
              Promote your token and maximize visibility.
            </p>
          </div>

          <div className="w-full flex flex-col items-start justify-start gap-[0.8rem]">
            
          <div className="w-full flex flex-col items-start justify-start gap-2">
              <h6 className="text-[1.2rem] text-[#ACB5BB] font-normal">
                Chain
              </h6>
              <div className="w-full py-5 px-5 bg-[#2C2C30] border border-[#44444A] rounded-xl flex items-center justify-between">
                <input
                  className="w-full text-[1.4rem] text-[#6C7278] font-normal outline-none border-none bg-transparent"
                  placeholder="Select Chain"
                />
                <ArrowDown />
              </div>
            </div>
            
            <div className="w-full flex flex-col items-start justify-start gap-2">
              <h6 className="text-[1.2rem] text-[#ACB5BB] font-normal">
                Token Address
              </h6>
              <input
                className="w-full py-5 px-5 bg-[#2C2C30] border border-[#44444A] rounded-xl text-[1.4rem] text-[#6C7278] font-normal outline-none border-none"
                placeholder="0x1234512345123451234512345"
              />
            </div>
            
            <div className="w-full flex flex-col items-start justify-start gap-2">
              <h6 className="text-[1.2rem] text-[#ACB5BB] font-normal">
              Price 
              </h6>
              <div
                className="w-full py-5 px-5 bg-[#1E1E20] border border-[#2C2C30] rounded-xl text-[1.4rem] text-[#6C7278] font-normal flex flex-col items-start justify-start gap-1"
              >
                <h5 className="text-[#EDF1F3] text-[1.4rem] font-normal">24h</h5>
                <h5 className="text-[#9945FF] text-[1.4rem] font-normal">$150</h5>
                </div>
            </div>

            <div className="w-full flex flex-col items-start justify-start gap-2">
              <h6 className="text-[1.2rem] text-[#ACB5BB] font-normal">
                Pitch
              </h6>
              <textarea
                className="w-full h-[77px] px-5 py-5 bg-[#2C2C30] border border-[#44444A] rounded-xl text-[1.4rem] text-[#6C7278] font-normal resize-none"
                placeholder="Introducing a new token revolutionizing the gaming industry."
              />
            </div>

            <div className="w-full flex flex-col items-start justify-start gap-2">
              <h6 className="text-[1.2rem] text-[#ACB5BB] font-normal">
              Image Upload
              </h6>
              <div className="w-full py-5 px-5 bg-[#2C2C30] border border-[#44444A] rounded-xl flex items-center justify-between">
                <input
                  className="w-full text-[1.4rem] text-[#6C7278] font-normal outline-none border-none bg-transparent"
                  placeholder="PNG/JPG/WebP Max Size: 5 MB"
                />
                <Attach />
              </div>
            </div>

            <div className="w-full flex flex-col items-start justify-start gap-2">
              <h6 className="text-[1.2rem] text-[#ACB5BB] font-normal">
                Links
              </h6>
              <input
                className="w-full py-5 px-5 bg-[#2C2C30] border border-[#44444A] rounded-xl text-[1.4rem] text-[#6C7278] font-normal border-none outline-none"
                placeholder="Add Website URL"
              />
              <input
                className="w-full py-5 px-5 bg-[#2C2C30] border border-[#44444A] rounded-xl text-[1.4rem] text-[#6C7278] font-normal border-none outline-none"
                placeholder="Add Telegram username"
              />
              <input
                className="w-full py-5 px-5 bg-[#2C2C30] border border-[#44444A] rounded-xl text-[1.4rem] text-[#6C7278] font-normal border-none outline-none"
                placeholder="Add Discord ID"
              />
            </div>

            <div className="w-full flex flex-col items-start justify-start gap-2">
              <h6 className="text-[1.2rem] text-[#ACB5BB] font-normal">
                Starting Balance
              </h6>
              <input
                className="w-full py-5 px-5 bg-[#2C2C30] border border-[#44444A] rounded-xl text-[1.4rem] text-[#6C7278] font-normal border-none outline-none"
                placeholder="100 SOL"
              />
            </div>

            <div className="w-full flex flex-col items-start justify-start gap-2">
              <h6 className="text-[1.2rem] text-[#ACB5BB] font-normal">
                Minimum Market Cap for Tokens
              </h6>
              <input
                className="w-full py-5 px-5 bg-[#2C2C30] border border-[#44444A] rounded-xl text-[1.4rem] text-[#6C7278] font-normal border-none outline-none"
                placeholder="5000 USD"
              />
            </div>

            
          </div>
        </div>
        <div className="w-full border-t border-[#44444A] p-8">
          <Button text="Submit Campaign" />
        </div>
      </div>
    </div>
  );
};

export default CreateToken;
