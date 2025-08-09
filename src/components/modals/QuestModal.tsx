import InfoRow from "@/components/global/InfoRow";
import Notification from "@/components/global/Notification";
import TaskList from "@/components/global/TaskList";
import RewardSuccessModal from "@/components/ui/RewardSuccessModal";
import { LoadingOverlay } from "@/components/ui/LoadingBar";
import { useNotificaciones } from "@/context/NotificacionesContext";
import {
  getIncompleteRequiredTasks,
  getQuestStatus,
  getRequiredTasks,
} from "@/utils/questHelpers";
import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import Close from "../../../public/icons/Close";
import QuestsIcon from "../../../public/icons/Quests";
import Button from "../ButtonBorder";
import {
  parseDecimal128ToNumber,
  formatDecimalForDisplay,
} from "@/utils/decimal";

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
  const [actionLoading, setActionLoading] = useState(false); // for verify/claim

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

  const handleClaimReward = async (e?: React.MouseEvent) => {
    if (e) e.preventDefault();
    if (!userQuest) return;
    setActionLoading(true);
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
    setActionLoading(false);
  };

  const handleVerifyTasks = async (e?: React.MouseEvent) => {
    if (e) e.preventDefault();
    setActionLoading(true);
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
        setActionLoading(false);
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
        setActionLoading(false);
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
    setActionLoading(false);
  };

  // ============================================================================
  // BUTTON LOGIC
  // ============================================================================

  const getFooterButton = () => {
    // Session expired - close modal to restart
    if (isSessionExpired) {
      return <Button text="Session Expired - Close" onClick={onClose} type="button" />;
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
      return <Button text={`Quest ${quest.status}`} disabled type="button" />;
    }

    // Reward ready to claim (highest priority)
    if (
      userQuest &&
      userQuest.status === "finished" &&
      allUserTasksCompleted &&
      !rewardClaimed
    ) {
      return <Button text="Claim Reward" onClick={handleClaimReward} type="button" disabled={actionLoading} />;
    }

    // Tasks verification available (only if quest not finished)
    if (canVerifyAgain && quest.status !== "finished") {
      return (
        <Button
          text={actionLoading ? "Verifying..." : "Verify Tasks"}
          className="bg-yellow-500 hover:bg-yellow-600 text-black"
          disabled={!user?.hasTwitterAccess || actionLoading}
          onClick={handleVerifyTasks}
          type="button"
        />
      );
    }

    // Quest finished but tasks not completed
    if (quest.status === "finished" && userQuest && !allUserTasksCompleted) {
      return <Button text="Quest ended - Tasks not completed" disabled type="button" />;
    }

    // Session completed, reward available (alternative path)
    if (sessionCompleted && !rewardClaimed) {
      const canClaim =
        userQuest && Object.values(userQuest.completedTasks).every(Boolean);
      return (
        <Button
          text="Claim Reward"
          disabled={!canClaim || actionLoading}
          onClick={canClaim ? handleClaimReward : undefined}
          type="button"
        />
      );
    }

    // All tasks completed (final verification)
    if (allUserTasksCompleted && !rewardClaimed) {
      return <Button text="Claim Reward" onClick={handleClaimReward} type="button" disabled={actionLoading} />;
    }

    // Active session but pending tasks (only if quest not finished)
    if (hasActiveSession && quest.status !== "finished") {
      return <Button text="Complete all tasks to claim reward" disabled type="button" />;
    }

    // Reward already claimed
    if (rewardClaimed) {
      return <Button text="Reward already claimed" disabled type="button" />;
    }

    // No userQuest - modal shouldn't be open
    if (!userQuest) {
      return <Button text="Close" onClick={onClose} type="button" />;
    }

    // Default state
    return <Button text="Close" onClick={onClose} type="button" />;
  };

  // ============================================================================
  // RENDER CONDITIONS
  // ============================================================================

  if (!isOpen) return null;

  if (loading) {
    return (
      <LoadingOverlay
        show={true}
        text="Loading quest details..."
        variant="dots"
        blur={true}
      />
    );
  }

  if (!quest) {
    return (
      <>
        <LoadingOverlay
          show={true}
          text="Quest not found"
          variant="dots"
          blur={true}
        />
        <div className="fixed inset-0 z-50 flex items-center justify-center pointer-events-none">
          <button
            className="mt-4 text-white underline text-base pointer-events-auto bg-black/60 px-6 py-3 rounded-xl shadow-lg"
            style={{
              position: "absolute",
              top: "60%",
              left: "50%",
              transform: "translate(-50%, 0)",
            }}
            onClick={onClose}
          >
            Close
          </button>
        </div>
      </>
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
            <h3 className="text-[1.8rem] text-white font-semibold flex items-center gap-3">
              <span className="inline-flex items-center justify-center w-8 h-8 rounded-xl bg-[#222] border border-[#44444A]">
                <QuestsIcon color="#12994aff" />
              </span>
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
              <InfoRow
                label="Total Reward"
                value={
                  <span className="inline-flex items-center">
                    {formattedRewardPool}
                    <img
                      src="/icons/SolanaIconReward.png"
                      alt="Solana"
                      className="w-6 h-6 sm:w-7 sm:h-7 object-contain ml-1"
                      style={{
                        display: "inline-block",
                        verticalAlign: "middle",
                      }}
                    />
                  </span>
                }
              />
              <InfoRow
                label="Reward per User"
                value={
                  <span className="inline-flex items-center">
                    {formattedRewardPerUser}
                    <img
                      src="/icons/SolanaIconReward.png"
                      alt="Solana"
                      className="w-6 h-6 sm:w-7 sm:h-7 object-contain ml-1"
                    />
                  </span>
                }
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
                  Complete all required tasks on this post:
                </p>
                <button
                  onClick={handleTweetLinkClick}
                  className="w-full p-4 bg-[#181818] hover:bg-[#222] transition-colors duration-200 rounded-lg border border-[#222] text-white font-medium text-[1.4rem] flex items-center justify-center gap-2"
                  style={{ boxShadow: "0 2px 8px 0 #00000030" }}
                >
                  {/* X Logo SVG */}
                  <svg
                    className="w-5 h-5"
                    viewBox="0 0 120 120"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <rect width="120" height="120" rx="24" fill="#181818" />
                    <path
                      d="M85.5 34H74.7L60.1 54.1L45.7 34H34.5L54.2 61.1L34 86H44.8L60.1 66.1L75.3 86H86.5L66.2 59.1L85.5 34ZM62.2 62.7L74.1 78.1H70.2L60.1 64.7L49.9 78.1H45.9L57.8 62.7L45.9 47.3H49.9L60.1 60.7L70.2 47.3H74.1L62.2 62.7Z"
                      fill="white"
                    />
                  </svg>
                  Open Post on X
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
