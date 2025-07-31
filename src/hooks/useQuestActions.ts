import { useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { questService } from "@/services/questService";
import { QUEST_MESSAGES } from "@/constants/questConstants";
import type { Quest, User } from "@/types/quest";

interface UseQuestActionsProps {
  user: User | null;
  walletAddress: string | null;
  isConnected: boolean;
  refreshAllData: () => Promise<void>;
  // ✅ CORREGIR EL TIPO DEL HANDLER
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
  // ✅ AGREGAR EL HANDLER DE EXPIRACIÓN
  handleSessionExpiration: (
    questId: string,
    questName: string
  ) => Promise<void>;
}

// MODIFICAR: c:\Users\Lian Li\Desktop\FrontEnd_Solcial\solcial\src\hooks\useQuestActions.ts

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
      console.log("🎯 Quest card clicked:", quest.questName);

      // ✅ MANEJO BÁSICO SIN BLOQUEAR
      if (!user) {
        toast.error("Please login to join quests");
        return;
      }

      if (!isConnected || !walletAddress) {
        toast.error("Please connect your wallet");
        return;
      }

      // ✅ SI NO TIENE TWITTER, MOSTRAR MODAL DE CONEXIÓN
      if (!user.hasTwitterAccess) {
        console.log("🐦 NO TWITTER ACCESS - OPENING MODAL");
        console.log(
          "🔧 setShowConnectTwitterModal function:",
          typeof setShowConnectTwitterModal
        );
        console.log("🐦 User needs to connect Twitter");
        setShowConnectTwitterModal(true);
        return;
      }

      try {
        console.log("🔍 Checking quest access...");

        const accessResponse = await fetch("/api/quest-access", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            questId: quest._id,
            userId: user.id,
            walletaddress: walletAddress,
          }),
        });

        const accessResult = await accessResponse.json();

        if (!accessResponse.ok) {
          // ✅ MANEJO ESPECÍFICO PARA TWITTER
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

        // Si ya participó, abrir modal directamente
        if (accessResult.hasParticipated && accessResult.userQuest) {
          if (accessResult.userQuest.status === "active") {
            const expirationResult = await questService.checkQuestExpiration(
              quest._id,
              user.id,
              user.walletaddress
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

        // Si no ha participado pero el quest terminó
        if (quest.status === "finished" && !accessResult.hasParticipated) {
          toast.error("Quest has ended and you didn't participate.");
          return;
        }

        // Si no ha participado y el quest está activo, intentar unirse
        if (!accessResult.hasParticipated) {
          await handleJoinQuest(quest);
          return;
        }
      } catch (error) {
        console.error("❌ Error checking quest access:", error);
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

      // ✅ VERIFICAR TWITTER ANTES DE UNIRSE
      if (!user.hasTwitterAccess) {
        console.log("🐦 Twitter access required for joining quest");
        setShowConnectTwitterModal(true);
        return;
      }

      setIsExecutingQuest(true);
      setLoadingQuestId(quest._id);

      try {
        const result = await questService.createQuestSession({
          userId: user.id,
          walletaddress: walletAddress,
          questId: quest._id,
          tasks: quest.tasks,
        });

        if (!result.success) {
          // ✅ MANEJO ESPECÍFICO DE ERRORES TWITTER
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
        console.error("❌ Error joining quest:", error);
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
