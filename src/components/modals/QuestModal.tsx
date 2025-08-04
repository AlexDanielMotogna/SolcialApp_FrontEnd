import InfoRow from "@/components/global/InfoRow";
import Notification from "@/components/global/Notification";
import TaskList from "@/components/global/TaskList";
import RewardSuccessModal from "@/components/ui/RewardSuccessModal";
import { useNotificaciones } from "@/context/NotificacionesContext";
import {
  getIncompleteRequiredTasks,
  getQuestStatus,
  getRequiredTasks,
} from "@/utils/questHelpers";
import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import Close from "../../../public/icons/Close";
import Button from "../ButtonBorder";
import { parseDecimal128ToNumber, formatDecimalForDisplay } from "@/utils/decimal";


interface QuestModalProps {
  isOpen: boolean;
  quest: any;
  user: any;
  userQuest: any;
  loading?: boolean;
  onClose: () => void;
  onSessionExpired?: () => void;
  mutateUserQuest?: () => void;
  onExpiredInModal?: (questName: string) => void;
  onQuestCompleted?: (questName: string) => void;
}

const QuestModal: React.FC<QuestModalProps> = ({
  isOpen,
  quest,
  user,
  userQuest,
  loading = false,
  onClose,
  onSessionExpired,
  mutateUserQuest,
  onExpiredInModal,
  onQuestCompleted,
}) => {
  const { setMensaje } = useNotificaciones();
  const [rewardModalOpen, setRewardModalOpen] = useState(false);

  // ============================================================================
  // COMPUTED VALUES
  // ============================================================================

  const questIsInactive = getQuestStatus(quest);
  const sessionCompleted = userQuest && userQuest.status === "finished";
  const rewardClaimed = userQuest && userQuest.rewardClaimed;
  const allUserTasksCompleted =
    userQuest && Object.values(userQuest.completedTasks).every(Boolean);
  const isSessionExpired = userQuest && userQuest.status === "expired";
  const hasActiveSession = userQuest && userQuest.status === "active";
  const requiredTasks = getRequiredTasks(quest);
  const incompleteRequiredTasks = getIncompleteRequiredTasks(quest, userQuest);
  const tasksToShow = userQuest ? userQuest.completedTasks : quest.tasks;
  const rewardPerUser = parseDecimal128ToNumber(quest.rewardPerTask);
  const formattedRewardPerUser = formatDecimalForDisplay(rewardPerUser, 6);
  const rewardPool = parseDecimal128ToNumber(quest.rewardPool);
  const formattedRewardPool = formatDecimalForDisplay(rewardPool, 6);

  const canVerifyAgain =
    userQuest &&
    userQuest.status === "active" &&
    incompleteRequiredTasks.length > 0 &&
    !rewardClaimed &&
    !isSessionExpired;

  // ============================================================================
  // EFFECTS
  // ============================================================================

  useEffect(() => {
    console.log(
      "🔍 QuestModal useEffect - checking userQuest:",
      userQuest?.status
    );

    // ✅ Verificar expiración usando el endpoint existente
    const checkExpiration = async () => {
      if (userQuest && userQuest.questId && userQuest.status === "active") {
        try {
          const response = await fetch("/api/user-quests/expire", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              questId: userQuest.questId,
              userId: user.id,
              walletaddress: user.walletaddress,
            }),
          });

          const data = await response.json();

          if (response.ok && data.expired && data.found) {
            console.log("⏰ Session expired detected by backend in modal");
            onExpiredInModal?.(quest.questName);
            onClose();
          }
        } catch (error) {
          console.error("Error checking expiration in modal:", error);
        }
      }
    };

    checkExpiration();
  }, [
    userQuest,
    quest.questName,
    onExpiredInModal,
    onClose,
    user.id,
    user.walletaddress,
  ]);

  // ============================================================================
  // HANDLERS
  // ============================================================================

  const handleTweetLinkClick = () => {
    if (quest.tweetLink) {
      window.open(quest.tweetLink, "_blank", "noopener,noreferrer");
    }
  };

  const handleClaimReward = async () => {
    if (!userQuest) return;

    try {
      const res = await fetch("/api/user-quests/claim", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userQuestId: userQuest._id,
        }),
      });

      if (res.ok) {
        setRewardModalOpen(true);
        mutateUserQuest?.();
      } else {
        toast.error("Error claiming reward. Please try again.");
      }
    } catch (error) {
      toast.error("Error claiming reward. Please try again.");
    }
  };

  const handleVerifyTasks = async () => {
    try {
      const verifyRes = await fetch("/api/user-quests/verify-twitter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userQuestId: userQuest._id,
          userId: user.id,
        }),
      });

      const verifyData = await verifyRes.json();

      // ✅ Manejar diferentes códigos de estado
      if (verifyRes.status === 429) {
        toast.error(
          "Twitter servers are busy. Please try again in a few minutes.",
          {
            duration: 6000,
            style: {
              background: "#FEF2F2",
              color: "#DC2626",
              border: "1px solid #FECACA",
            },
          }
        );
        return;
      }
      if (
        verifyRes.status === 500 &&
        verifyData.error &&
        verifyData.error.includes("rate limit")
      ) {
        toast.error(
          "Twitter API rate limit exceeded. Please wait a few minutes and try again.",
          {
            duration: 6000,
            style: {
              background: "#FEF2F2",
              color: "#DC2626",
              border: "1px solid #FECACA",
            },
          }
        );
        return;
      }
      if (verifyData.success) {
        mutateUserQuest?.();
        toast.success("Tasks verified successfully!");
        onQuestCompleted?.(quest._id);
      } else {
        toast.error("Complete all the tasks on Twitter before verifying.");
      }
    } catch (error) {
      toast.error("Error verifying tasks. Please try again.");
    }
  };

  // ============================================================================
  // BUTTON LOGIC
  // ============================================================================

  const getFooterButton = () => {
    // Session expired - close modal to restart
    if (isSessionExpired) {
      return <Button text="Session Expired - Close" onClick={onClose} />;
    }

    // Quest inactive (but allow claim if user completed and quest finished)
    if (
      questIsInactive &&
      !(
        quest.status === "finished" &&
        userQuest &&
        userQuest.status === "finished"
      )
    ) {
      return <Button text={`Quest ${quest.status}`} disabled />;
    }

    // Reward ready to claim (highest priority)
    if (
      userQuest &&
      userQuest.status === "finished" &&
      allUserTasksCompleted &&
      !rewardClaimed
    ) {
      return <Button text="Claim Reward" onClick={handleClaimReward} />;
    }

    // Tasks verification available (only if quest not finished)
    if (canVerifyAgain && quest.status !== "finished") {
      return (
        <Button
          text="Verify Tasks"
          className="bg-yellow-500 hover:bg-yellow-600 text-black"
          disabled={!user?.hasTwitterAccess}
          onClick={handleVerifyTasks}
        />
      );
    }

    // Quest finished but tasks not completed
    if (quest.status === "finished" && userQuest && !allUserTasksCompleted) {
      return <Button text="Quest ended - Tasks not completed" disabled />;
    }

    // Session completed, reward available (alternative path)
    if (sessionCompleted && !rewardClaimed) {
      const canClaim =
        userQuest && Object.values(userQuest.completedTasks).every(Boolean);
      return (
        <Button
          text="Claim Reward"
          disabled={!canClaim}
          onClick={canClaim ? handleClaimReward : undefined}
        />
      );
    }

    // All tasks completed (final verification)
    if (allUserTasksCompleted && !rewardClaimed) {
      return <Button text="Claim Reward" onClick={handleClaimReward} />;
    }

    // Active session but pending tasks (only if quest not finished)
    if (hasActiveSession && quest.status !== "finished") {
      return <Button text="Complete all tasks to claim reward" disabled />;
    }

    // Reward already claimed
    if (rewardClaimed) {
      return <Button text="Reward already claimed" disabled />;
    }

    // No userQuest - modal shouldn't be open
    if (!userQuest) {
      return <Button text="Close" onClick={onClose} />;
    }

    // Default state
    return <Button text="Close" onClick={onClose} />;
  };

  // ============================================================================
  // RENDER CONDITIONS
  // ============================================================================

  if (!isOpen) return null;

  if (loading) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-50">
        <div className="bg-[#161618] w-[420px] flex items-center justify-center rounded-2xl p-10">
          <span className="text-white text-xl">Loading...</span>
        </div>
      </div>
    );
  }

  if (!quest) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-50">
        <div className="bg-[#161618] w-[420px] flex items-center justify-center rounded-2xl p-10">
          <span className="text-white text-xl">Quest not found</span>
          <button className="ml-4 text-white underline" onClick={onClose}>
            Close
          </button>
        </div>
      </div>
    );
  }

  // ============================================================================
  // MAIN RENDER
  // ============================================================================

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
            <h3 className="text-[1.8rem] text-white font-semibold">
              {quest.questName}
            </h3>
            <Close onClick={onClose} />
          </div>

          {/* Quest Information */}
          <div className="w-full flex flex-col items-start justify-start gap-6 px-8">
            <div className="w-full flex flex-col items-start justify-start gap-1">
              <h4 className="text-white font-semibold text-[1.8rem]">
                {quest.questName}
              </h4>
              <p className="text-[#ACB5BB] text-[1.4rem]">
                {quest.description}
              </p>
            </div>

            {/* Quest Details */}
            <div className="w-full flex flex-col gap-[0.8rem]">
              <InfoRow label="Total Reward" value={`${formattedRewardPool} SOL`} />
              <InfoRow
                label="Reward per User"
                value={`${formattedRewardPerUser} SOL`}
              />
              <InfoRow
                label="Start Date"
                value={new Date(quest.startDateTime).toLocaleString()}
              />
              <InfoRow
                label="End Date"
                value={new Date(quest.endDateTime).toLocaleString()}
              />
              <InfoRow
                label="Participants"
                value={`${quest.actualParticipants ?? 0} / ${
                  quest.maxParticipants
                }`}
              />
            </div>
          </div>

          {/* Tasks Section */}
          <div className="w-full flex flex-col items-start justify-start px-8 gap-4">
            <h5 className="text-white text-[1.6rem] font-semibold">Tasks</h5>

            {/* Tweet Link Button */}
            {quest.tweetLink && (
              <div className="w-full">
                <p className="text-[#ACB5BB] text-[1.2rem] mb-3">
                  Complete all required tasks on this tweet:
                </p>
                <button
                  onClick={handleTweetLinkClick}
                  className="w-full p-4 bg-[#1DA1F2] hover:bg-[#1A94DA] transition-colors duration-200 rounded-lg border border-[#1DA1F2] text-white font-medium text-[1.4rem] flex items-center justify-center gap-2"
                >
                  <svg
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
                  </svg>
                  Open Tweet on Twitter
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                    />
                  </svg>
                </button>
              </div>
            )}

            <TaskList tasks={tasksToShow} userQuest={userQuest} />
          </div>

          {/* Notifications */}
          {isSessionExpired && (
            <div className="w-full px-8">
              <Notification type="error">
                Your session has expired. Please restart the quest.
              </Notification>
            </div>
          )}

          {/* Footer */}
          <div className="w-full border-t border-[#44444A] p-8">
            {getFooterButton()}
          </div>
        </div>
      </div>

      {/* Reward Success Modal */}
      <RewardSuccessModal
        isOpen={rewardModalOpen}
        onClose={() => setRewardModalOpen(false)}
        rewardAmount={rewardPerUser}
        cryptoSymbol="solana"
        cryptoTicker="SOL"
        questName={quest.questName}
      />
    </>
  );
};

export default QuestModal;
