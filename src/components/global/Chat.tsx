"use client";

import React, { useState } from "react";
import Image from "next/image";
import ChatIcon from "../../../public/imgs/Chat.png";
import ChatAvatar from "../../../public/imgs/ChatAvatar.png";
import Close from "../../../public/icons/Close";
import Button from "../Button";

interface ChatMessage {
  id: number;
  username: string;
  message: string;
}

const chatMessages: ChatMessage[] = [
  {
    id: 1,
    username: "LadderKing",
    message: "Anyone up for a private match? 👊",
  },
  {
    id: 2,
    username: "WhaleWatcher",
    message: "SOL price is about to break $60. 🚀",
  },
  {
    id: 3,
    username: "TokenTactician",
    message: "Just swapped ETH for SOL! 📈",
  },
  {
    id: 4,
    username: "MoonHunter",
    message: "5 wins in a row—let’s go for 10! 🔥",
  },
  {
    id: 5,
    username: "DeFiNomad",
    message: "Why is all talking ladder today? 🧐",
  },
  {
    id: 6,
    username: "CryptoGuru99",
    message: "Just secured a 5x win streak! 🎉",
  },
  {
    id: 7,
    username: "SOL_Hustler",
    message: "Who else is farming SOL today? 💰",
  },
  {
    id: 8,
    username: "LadderKing",
    message: "Anyone up for a private match? 👊",
  },
  {
    id: 9,
    username: "WhaleWatcher",
    message: "SOL price is about to break $60. 🚀",
  },
  {
    id: 10,
    username: "TokenTactician",
    message: "Just swapped ETH for SOL! 📈",
  },
  {
    id: 11,
    username: "MoonHunter",
    message: "5 wins in a row—let’s go for 10! 🔥",
  },
  {
    id: 12,
    username: "DeFiNomad",
    message: "Why is all talking ladder today? 🧐",
  },
  {
    id: 13,
    username: "SOL_Hustler",
    message: "Who else is farming SOL today? 💰",
  },
];

const Chat: React.FC = () => {
  const [isChatVisible, setIsChatVisible] = useState(false);

  return (
    <div className="fixed bottom-6 right-16 flex items-end justify-end">
      {isChatVisible && (
        <div
          className="bg-[#161618]/80 border border-[#44444A] rounded-2xl p-[1.8rem] flex flex-col items-start justify-start gap-8 transition-opacity duration-300 mb-5 mr-2 max-h-[720px]"
          style={{
            boxShadow:
              "0px 16px 20px -6px #000000A6, 0px 14px 22px -9px #FFFFFF0F inset",
            backdropFilter: "blur(14px)",
          }}
        >
          <div className="w-full flex items-center justify-between border-b pb-[1.8rem] border-b-[#44444A]">
            <div className="w-full flex items-center justify-start gap-[0.8rem]">
              <span className="w-[10px] h-[10px] rounded-full bg-[#44D1BB]"></span>
              <h4 className="text-white text-[1.6rem] font-semibold">
                12.5K Players Connected
              </h4>
            </div>

            <Close onClick={() => setIsChatVisible(false)} />
          </div>

          <div
            className="w-full flex flex-col items-start justify-start gap-2 max-h-[500px] overflow-y-scroll"
            style={{
              scrollbarWidth: "none",
              msOverflowStyle: "none",
            }}
          >
            {chatMessages.map((chat) => (
              <div
                key={chat.id}
                className="w-full flex items-center justify-start gap-[1.2rem] bg-[rgba(255,255,255,0.03)] border border-[#161618] p-[0.8rem] rounded-[0.8rem]"
              >
                <Image src={ChatAvatar} alt="chat avatar" />
                <h6 className="text-[1.2rem] text-white font-medium">
                  {chat.username}
                </h6>
                <h5 className="text-[1.4rem] text-[#ACB5BB] font-normal">
                  {chat.message}
                </h5>
              </div>
            ))}
          </div>

          <div className="w-full bg-[#161618] border border-[#2C2C30] rounded-md p-3 flex items-center justify-start gap-5">
            <input
              placeholder="Write Message"
              className="w-full border-none outline-none text-[1.4rem] text-[#ACB5BB] font-normal bg-transparent"
            />
            <div className="w-[64px]">
              <Button text="Send" size="xs" />
            </div>
          </div>
        </div>
      )}

      <Image
        src={ChatIcon}
        className="w-[40px] h-[40px] md:w-auto md:h-auto cursor-pointer"
        alt="chat icon"
        onClick={() => setIsChatVisible((prev) => !prev)}
      />
    </div>
  );
};

export default Chat;
