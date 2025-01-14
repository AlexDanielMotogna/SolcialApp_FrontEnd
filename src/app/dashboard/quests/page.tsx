"use client";

import Image from "next/image";

import { useState } from "react";
import PowerShield from "../../../../public/imgs/PowerShield.png";
import Moneybag from "../../../../public/imgs/Moneybag.png";
import SocialMedia from "../../../../public/imgs/SocialMedia.png";
import DogeWifHat from "../../../../public/imgs/DogeWifHat.png";
import Pepe from "../../../../public/imgs/Pepe.png";
import Viral from "../../../../public/imgs/Viral.png";
import Shiba from "../../../../public/imgs/Shiba.png";
import Hype from "../../../../public/imgs/Hype.png";
import Close from "../../../../public/icons/Close";
import ButtonBorder from "../../../components/ButtonBorder";
import TwitterLg from "../../../../public/icons/TwitterLg";
import ArrowRight from "../../../../public/icons/ArrowRight";
import Button from "../../../components/ButtonBorder";

const Quests = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="w-full py-[1.8rem] px-[2.4rem] flex flex-col items-start justify-start gap-[2.4rem]">
      <div className="w-full flex flex-col md:flex-row md:gap-8 items-center justify-between">
        <div className="w-full flex flex-col items-start justify-start gap-1">
          <h2 className="text-white font-semibold text-[2.4rem]">
            Explore Exciting Quests!
          </h2>
          <p className="text-[#ACB5BB] text-[1.8rem]">
            Earn rewards by completing tasks and engaging with our platform.
          </p>
        </div>

        <div className="flex items-center justify-center gap-5">
          <div className="w-[160px] md:w-[196px] flex items-center justify-start gap-3 py-[1.6rem] px-4 bg-[#1E1E20] border border-[#2C2C30] rounded-2xl">
            <Image src={PowerShield} alt=""/>

            <div className="flex flex-col items-start justify-start gap-1">
              <h3 className="text-white font-semibold text-[1.8rem]">75</h3>
              <span className="text-[1.2rem] text-[#ACB5BB]">
                Quests Completed
              </span>
            </div>
          </div>
          <div className="w-[160px] md:w-[196px] flex items-center justify-start gap-3 py-[1.6rem] px-4 bg-[#1E1E20] border border-[#2C2C30] rounded-2xl">
            <Image src={Moneybag} alt=""/>

            <div className="flex flex-col items-start justify-start gap-1">
              <h3 className="text-white font-semibold text-[1.8rem]">
                1,4 SOL
              </h3>
              <span className="text-[1.2rem] text-[#ACB5BB]">
                Rewards Earned
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-9">
        <div className="w-full p-[1.6rem] flex flex-col items-start justify-start gap-4 bg-[#1E1E20] border border-[#2C2C30] rounded-2xl">
          <div className="w-full relative">
            <Image src={SocialMedia} className="w-full" alt=""/>
            <div
              className="absolute right-4 top-4 px-4 py-[0.4rem] bg-[#2C2C30] border border-[#2C2C30] rounded-lg shadow-[0px_2px_10px_-3px_rgba(0,0,0,0)]"
              style={{ boxShadow: "0px -5px 10px 0px #FFFFFF1A inset" }}
            >
              <span className="text-white text-[1.2rem]">January 10, 2025</span>
            </div>
          </div>

          <div className="w-full flex flex-col items-start justify-start gap-1">
            <h4 className="text-white font-semibold text-[1.8rem]">
              Social Media Engagement Quest
            </h4>
            <p className="text-[#ACB5BB] text-[1.4rem]">
              Engage with our social media posts to win prizes.
            </p>
          </div>

          <h4 className="text-[#EDF1F3] font-semibold text-[1.8rem]">
            25 <span className="text-[#9945FF]">SOL</span>
          </h4>

          <div className="w-full" onClick={openModal}>
            <ButtonBorder text="View Quest" />
          </div>
        </div>

        <div className="w-full p-[1.6rem] flex flex-col items-start justify-start gap-4 bg-[#1E1E20] border border-[#2C2C30] rounded-2xl">
          <div className="w-full relative">
            <Image src={Shiba} className="w-full" alt=""/>
            <div
              className="absolute right-4 top-4 px-4 py-[0.4rem] bg-[#2C2C30] border border-[#2C2C30] rounded-lg shadow-[0px_2px_10px_-3px_rgba(0,0,0,0)]"
              style={{ boxShadow: "0px -5px 10px 0px #FFFFFF1A inset" }}
            >
              <span className="text-white text-[1.2rem]">January 10, 2025</span>
            </div>
          </div>

          <div className="w-full flex flex-col items-start justify-start gap-1">
            <h4 className="text-white font-semibold text-[1.8rem]">
              Social Media Engagement Shiba
            </h4>
            <p className="text-[#ACB5BB] text-[1.4rem]">
              1000 Likes, 1000 Comments and 1000 Retweets
            </p>
          </div>

          <h4 className="text-[#EDF1F3] font-semibold text-[1.8rem]">
            1 <span className="text-[#9945FF]">SOL</span>
          </h4>

          <div className="w-full" onClick={openModal}>
            <ButtonBorder text="View Quest" />
          </div>
        </div>

        <div className="w-full p-[1.6rem] flex flex-col items-start justify-start gap-4 bg-[#1E1E20] border border-[#2C2C30] rounded-2xl">
          <div className="w-full relative">
            <Image src={Viral} className="w-full" alt=""/>
            <div
              className="absolute right-4 top-4 px-4 py-[0.4rem] bg-[#2C2C30] border border-[#2C2C30] rounded-lg shadow-[0px_2px_10px_-3px_rgba(0,0,0,0)]"
              style={{ boxShadow: "0px -5px 10px 0px #FFFFFF1A inset" }}
            >
              <span className="text-white text-[1.2rem]">January 10, 2025</span>
            </div>
          </div>

          <div className="w-full flex flex-col items-start justify-start gap-1">
            <h4 className="text-white font-semibold text-[1.8rem]">
              Make this post go viral
            </h4>
            <p className="text-[#ACB5BB] text-[1.4rem]">
              10.000 Likes, 10.000 Retweet and 10.000 comments.
            </p>
          </div>

          <h4 className="text-[#EDF1F3] font-semibold text-[1.8rem]">
            5 <span className="text-[#9945FF]">SOL</span>
          </h4>

          <div className="w-full" onClick={openModal}>
            <ButtonBorder text="View Quest" />
          </div>
        </div>

        <div className="w-full p-[1.6rem] flex flex-col items-start justify-start gap-4 bg-[#1E1E20] border border-[#2C2C30] rounded-2xl">
          <div className="w-full relative">
            <Image src={Hype} className="w-full" alt=""/>
            <div
              className="absolute right-4 top-4 px-4 py-[0.4rem] bg-[#2C2C30] border border-[#2C2C30] rounded-lg shadow-[0px_2px_10px_-3px_rgba(0,0,0,0)]"
              style={{ boxShadow: "0px -5px 10px 0px #FFFFFF1A inset" }}
            >
              <span className="text-white text-[1.2rem]">January 10, 2025</span>
            </div>
          </div>

          <div className="w-full flex flex-col items-start justify-start gap-1">
            <h4 className="text-white font-semibold text-[1.8rem]">
              Solcial Media Engagement Hype
            </h4>
            <p className="text-[#ACB5BB] text-[1.4rem]">
              100.000 Likes 100.000 Retweets &100.000 Coms
            </p>
          </div>

          <h4 className="text-[#EDF1F3] font-semibold text-[1.8rem]">
            15 <span className="text-[#9945FF]">SOL</span>
          </h4>

          <div className="w-full" onClick={openModal}>
            <ButtonBorder text="View Quest" />
          </div>
        </div>

        <div className="w-full p-[1.6rem] flex flex-col items-start justify-start gap-4 bg-[#1E1E20] border border-[#2C2C30] rounded-2xl">
          <div className="w-full relative">
            <Image src={DogeWifHat} className="w-full" alt=""/>
            <div
              className="absolute right-4 top-4 px-4 py-[0.4rem] bg-[#2C2C30] border border-[#2C2C30] rounded-lg shadow-[0px_2px_10px_-3px_rgba(0,0,0,0)]"
              style={{ boxShadow: "0px -5px 10px 0px #FFFFFF1A inset" }}
            >
              <span className="text-white text-[1.2rem]">January 10, 2025</span>
            </div>
          </div>

          <div className="w-full flex flex-col items-start justify-start gap-1">
            <h4 className="text-white font-semibold text-[1.8rem]">
              Boosting post DogeWifHat
            </h4>
            <p className="text-[#ACB5BB] text-[1.4rem]">
              10.000 Likes, 10.000 Retweets and 10.000 Comments
            </p>
          </div>

          <h4 className="text-[#EDF1F3] font-semibold text-[1.8rem]">
            7 <span className="text-[#9945FF]">SOL</span>
          </h4>

          <div className="w-full" onClick={openModal}>
            <ButtonBorder text="View Quest" />
          </div>
        </div>

        <div className="w-full p-[1.6rem] flex flex-col items-start justify-start gap-4 bg-[#1E1E20] border border-[#2C2C30] rounded-2xl">
          <div className="w-full relative">
            <Image src={Pepe} className="w-full" alt=""/>
            <div
              className="absolute right-4 top-4 px-4 py-[0.4rem] bg-[#2C2C30] border border-[#2C2C30] rounded-lg shadow-[0px_2px_10px_-3px_rgba(0,0,0,0)]"
              style={{ boxShadow: "0px -5px 10px 0px #FFFFFF1A inset" }}
            >
              <span className="text-white text-[1.2rem]">January 10, 2025</span>
            </div>
          </div>

          <div className="w-full flex flex-col items-start justify-start gap-1">
            <h4 className="text-white font-semibold text-[1.8rem]">
              Lets get some hype on twitter, Pepe Fam
            </h4>
            <p className="text-[#ACB5BB] text-[1.4rem]">
              10.000 Likes, 10.000 Retweets and 10.000 Comments
            </p>
          </div>

          <h4 className="text-[#EDF1F3] font-semibold text-[1.8rem]">
            5 <span className="text-[#9945FF]">SOL</span>
          </h4>

          <div className="w-full" onClick={openModal}>
            <ButtonBorder text="View Quest" />
          </div>
        </div>
      </div>

      {isModalOpen && (
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
                Social Media Engagement Quest
              </h3>

              <Close onClick={closeModal} />
            </div>

            <div className="w-full flex flex-col items-start justify-start gap-6 px-8">
              <Image src={SocialMedia} className="w-full" alt=""/>

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
                  <span className="text-[1.4rem] text-[#ACB5BB]">
                    Start Date
                  </span>
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
      )}
    </div>
  );
};

export default Quests;
