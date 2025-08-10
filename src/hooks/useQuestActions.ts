import { questService } from "@/services/questService";
import type { Quest, User } from "@/types/quest";
import { useCallback, useState } from "react";
import toast from "react-hot-toast";

// Custom hook to handle quest actions like joining quests, checking access, and managing session timers
// This hook is used in the QuestCard component and handles user interactions with quests
interface UseQuestActionsProps {
  user: User | null;
  walletAddress: string | null;
  isConnected: boolean;
  refreshAllData: () => Promise<void>;
  startSessionTimer: (
    questId: string,
    questName: string,
    expiresAt: string,
    onExpire: (questId: string, questName: string) => void
  ) => void;
  openModal: (type: "CreateQuest" | "QuestModal") => void;
  setSelectedQuestId: (id: string) => void;
  setShowConnectTwitterModal: (show: boolean) => void;
  setShowExpirationModal: (show: boolean) => void;
  setExpiredQuestName: (name: string) => void;
  handleSessionExpiration: (
    questId: string,
    questName: string
  ) => Promise<void>;
}

export const useQuestActions = ({
  user,
  walletAddress,
  isConnected,
  refreshAllData,
  startSessionTimer,
  openModal,
  setSelectedQuestId,
  setShowConnectTwitterModal,
  setShowExpirationModal,
  setExpiredQuestName,
  handleSessionExpiration,
}: UseQuestActionsProps) => {
  const [isExecutingQuest, setIsExecutingQuest] = useState(false);
  const [loadingQuestId, setLoadingQuestId] = useState<string | null>(null);

  const handleQuestCardClick = useCallback(
    async (quest: Quest) => {
      if (!user) {
        toast.error("Please login to join quests");
        return;
      }
      if (!isConnected || !walletAddress) {
        toast.error("Please connect your wallet");
        return;
      }
      if (!user.hasTwitterAccess) {
        setShowConnectTwitterModal(true);
        return;
      }
      try {
        const accessResponse = await fetch("/api/quest-access", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            questId: quest._id,
            walletAddress: walletAddress,
          }),
        });

        const accessResult = await accessResponse.json();

        if (!accessResponse.ok) {
          if (
            accessResult.error?.includes("Connect") ||
            accessResult.error === "twitter_required"
          ) {
            setShowConnectTwitterModal(true);
            return;
          }
          toast.error(accessResult.error || "Cannot access quest");
          return;
        }
        if (accessResult.hasParticipated && accessResult.userQuest) {
          if (accessResult.userQuest.status === "expired") {
            setExpiredQuestName(quest.questName);
            setShowExpirationModal(true);
            toast.error(`Session expired: ${quest.questName}`);
            await refreshAllData();
            return;
          }
          if (accessResult.userQuest.status === "active") {
            const expirationResult = await questService.checkQuestExpiration(
              quest._id
            );

            if (
              expirationResult.success &&
              expirationResult.data?.expired &&
              expirationResult.data?.found
            ) {
              setExpiredQuestName(quest.questName);
              setShowExpirationModal(true);
              toast.error(`Session expired: ${quest.questName}`);
              await refreshAllData();
              return;
            }
          }

          setSelectedQuestId(quest._id);
          openModal("QuestModal");
          return;
        }

        if (quest.status === "finished" && !accessResult.hasParticipated) {
          toast.error("Quest has ended and you didn't participate.");
          return;
        }

        if (!accessResult.hasParticipated) {
          await handleJoinQuest(quest);
          return;
        }
      } catch (error) {
        console.error("Error checking quest access:", error);
        toast.error("Error accessing quest. Please try again.");
      }
    },
    [
      user,
      isConnected,
      walletAddress,
      refreshAllData,
      setSelectedQuestId,
      openModal,
      setShowConnectTwitterModal,
      setShowExpirationModal,
      setExpiredQuestName,
    ]
  );

  const handleJoinQuest = useCallback(
    async (quest: Quest) => {
      if (isExecutingQuest || !user || !walletAddress) return;
      if (!user.hasTwitterAccess) {
        console.log("🐦 Twitter access required for joining quest");
        setShowConnectTwitterModal(true);
        return;
      }
      setIsExecutingQuest(true);
      setLoadingQuestId(quest._id);
      try {
        const result = await questService.createQuestSession({
          walletaddress: walletAddress,
          questId: quest._id,
          tasks: quest.tasks,
        });

        if (!result.success) {
          if (
            result.error?.includes("Connect") ||
            result.error?.includes("twitter")
          ) {
            setShowConnectTwitterModal(true);
            return;
          }
          if (
            result.error?.includes("already completed") ||
            result.error?.includes("already active")
          ) {
            await refreshAllData();
            setSelectedQuestId(quest._id);
            openModal("QuestModal");
            toast.success("Opening your quest...");
            return;
          }
          toast.error(result.error || "Could not start quest");
          return;
        }

        await refreshAllData();

        if (result.data?.sessionExpiresAt) {
          startSessionTimer(
            quest._id,
            quest.questName,
            result.data.sessionExpiresAt,
            handleSessionExpiration
          );
        }

        setSelectedQuestId(quest._id);
        openModal("QuestModal");
        toast.success(`Joined quest: ${quest.questName}`);
      } catch (error) {
        toast.error("Could not start quest");
      } finally {
        setIsExecutingQuest(false);
        setLoadingQuestId(null);
      }
    },
    [
      isExecutingQuest,
      user,
      walletAddress,
      refreshAllData,
      startSessionTimer,
      setSelectedQuestId,
      openModal,
      handleSessionExpiration,
      setShowConnectTwitterModal,
    ]
  );
  return {
    handleQuestCardClick,
    handleJoinQuest,
    isExecutingQuest,
    loadingQuestId,
  };
};
