"use client";

import { useMemo, useState } from "react";
import Close from "../../../public/icons/Close";
import TwitterLg from "../../../public/icons/TwitterLg";
import ArrowRight from "../../../public/icons/ArrowRight";
import Button from "../../components/ButtonBorder";
import Image from "next/image";
import SocialMedia from "../../../public/imgs/SocialMedia.png";
import RewardClaim from "@/components/modals/RewardClaim";

interface QuestModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const QuestModal: React.FC<QuestModalProps> = ({ isOpen, onClose }) => {
const [rewardModalOpen, setRewardModalOpen] = useState(false);
//I simulated the data structure for the quest. Based on the context provided we can create the tables in the database and fetch the data from there.
// This is a simulated quest object, replace it with actual data fetching logic.
  const [quest, setQuest] = useState(() => ({
    id: 1,
    title: "Social Media Engagement Quest",
    description: "Engage with our social media posts to win prizes.",
    reward: 100,
    rewardToken: "SOL",
    image: SocialMedia,
    startDate: "22/11/2024, 11:00:00",
    endDate: "25/11/2024, 11:00:00",
    participants: 33,
    maxParticipants: 100,
    rewardState: "not_claimed", // "not_claimed", "claimed"
    subtasks: [
      { id: "like", label: "Like my twitter post", completed: true },
      { id: "follow", label: "Follow my twitter page", completed: true },
      { id: "retweet", label: "Retweet my twitter post", completed: true },
    ],
  }), 
  );

  if (!isOpen) return null;
// Check if the quest is already claimed or if all subtasks are completed, we have to updated the status in DB. Just created this function to simulate the logic
  const alreadyClaimed = quest.rewardState === "claimed";
  const allCompleted = quest.subtasks.every(t => t.completed);
  const rewardPerUser = quest.maxParticipants > 0 ? quest.reward / quest.maxParticipants : 0;

  return (
    <>
      <div className="fixed inset-0 bg-[#000000] bg-opacity-60 flex justify-center items-end md:items-center z-50">
        <div
          className="bg-[#161618] max-h-[100vh] w-[100vw] md:w-[420px] md:max-h-[90vh] overflow-y-auto flex flex-col items-start justify-start gap-6 border border-[#44444A] rounded-2xl"
          style={{
            boxShadow: "0px -5px 10px 0px #FFFFFF1A inset",
            scrollbarWidth: "none",
            msOverflowStyle: "none",
          }}
        >
          {/* Header */}
          <div className="w-full p-8 border-b border-[#44444A] flex items-center justify-between">
            <h3 className="text-[1.8rem] text-white font-semibold">{quest.title}</h3>
            <Close onClick={onClose} />
          </div>

          {/* Content */}
          <div className="w-full flex flex-col items-start justify-start gap-6 px-8">
            <Image src={quest.image} className="w-full rounded-xl" alt="quest image" />

            <div className="w-full flex flex-col items-start justify-start gap-1">
              <h4 className="text-white font-semibold text-[1.8rem]">{quest.title}</h4>
              <p className="text-[#ACB5BB] text-[1.4rem]">{quest.description}</p>
            </div>

            {/* Info */}
            <div className="w-full flex flex-col gap-[0.8rem]">
              <InfoRow label="Total Reward" value={`${quest.reward} ${quest.rewardToken}`} />
              <InfoRow label="Reward per User" value={`${rewardPerUser.toFixed(2)} ${quest.rewardToken}`} />
              <InfoRow label="Start Date" value={quest.startDate} />
              <InfoRow label="End Date" value={quest.endDate} />
              <InfoRow label="Participants" value={`${quest.participants} / ${quest.maxParticipants}`} />
            </div>
          </div>

          {/* Subtasks */}
          <div className="w-full flex flex-col items-start justify-start px-8 gap-6">
            <h5 className="text-white text-[1.6rem] font-semibold">Tasks</h5>

            <div className="w-full flex flex-col items-start justify-start gap-[0.8rem]">
              {quest.subtasks.map((task) => (
                <div
                  key={task.id}
                  className={`w-full bg-[#2C2C30] p-5 flex items-center justify-between rounded-md border ${
                    task.completed ? "border-green-500" : "border-[#44444A]"
                  }`}
                >
                  <div className="flex items-center justify-center gap-[0.6rem]">
                    <TwitterLg />
                    <p className="text-white font-medium text-[1.4rem]">{task.label}</p>
                  </div>
                  <ArrowRight />
                </div>
              ))}
            </div>
          </div>
          
          {/* Footer */}
          <div className="w-full border-t border-[#44444A] p-8">
            {quest.rewardState === "claimed" && (
              <p className="text-[#ACB5BB] text-[1.4rem]">
                🎉 Reward was already claimed.
              </p>
              )}

          <Button
            text={quest.rewardState === "claimed" ? "Reward Claimed" : "Claim Reward"}
            disabled={!allCompleted || quest.rewardState === "claimed"}
            onClick={() => {
              if (allCompleted && !alreadyClaimed) {
                setRewardModalOpen(true);
                setQuest(prev => ({ ...prev, rewardState: "claimed" })); // Simulate claiming the reward
              }
            }}
          />
        </div>
        </div>
      </div>

      {/* Reward Modal */}
      <RewardClaim
        isOpen={rewardModalOpen}
        onClose={() => setRewardModalOpen(false)}
        amount={rewardPerUser}
        token={quest.rewardToken}
      />
    </>
  );
};

const InfoRow = ({ label, value }: { label: string; value: string }) => (
  <div className="w-full flex items-end justify-between bg-[#2C2C30] border border-[#44444A] rounded-lg px-4 py-[0.6rem]">
    <span className="text-[1.4rem] text-[#ACB5BB]">{label}</span>
    <p className="text-[#EDF1F3] font-semibold text-[1.4rem]">{value}</p>
  </div>
);

export default QuestModal;
