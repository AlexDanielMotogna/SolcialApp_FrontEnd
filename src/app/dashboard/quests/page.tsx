// OPTIMIZAR: c:\Users\Lian Li\Desktop\FrontEnd_Solcial\solcial\src\app\dashboard\quests\page.tsx

"use client";
import { useState, useEffect, useContext, useCallback, useMemo } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import toast from "react-hot-toast";
import dynamic from "next/dynamic";

// Context & Hooks
import { MockUserContext } from "@/context/MockUserContext";
import { useGlobalWallet } from "@/context/WalletContext";
import { useQuests } from "@/hooks/useQuests";
import { useUserQuests } from "@/hooks/useUserQuests";
import { useSessionTimers } from "@/hooks/useSessionTimers";
import { useQuestActions } from "@/hooks/useQuestActions";

// Services
import { questService } from "@/services/questService";
import { userService } from "@/services/userService";

// Utils & Constants
import { questUtils } from "@/utils/questUtils";
import {
  QUEST_FILTERS,
  TWITTER_AUTH_MESSAGES,
  QUEST_MESSAGES,
} from "@/constants/questConstants";

// Types
import type { Quest, UserQuest, User } from "@/types/quest";

// Components
import QuestHeader from "@/components/quest/QuestHeader";
import QuestGrid from "@/components/quest/QuestGrid";
import QuestFooter from "@/components/quest/QuestFooter";

// Lazy loaded components
const QuestModals = dynamic(() => import("@/components/quest/QuestModals"), {
  ssr: false,
});

const Quests = () => {
  // ============================================================================
  // CONTEXT & HOOKS
  // ============================================================================
  const { isConnected, walletAddress } = useGlobalWallet();
  const context = useContext(MockUserContext);
  const router = useRouter();
  const searchParams = useSearchParams();

  const {
    quests,
    loading,
    currentPage,
    totalPages,
    totalCount,
    filter,
    questsPerPage,
    handlePageChange,
    handleFilterChange,
    refreshQuests,
  } = useQuests();

  // ============================================================================
  // LOCAL STATE
  // ============================================================================
  const [user, setUser] = useState<User | null>(context?.user || null);
  const { userQuests, loadingUserQuests, refreshUserQuests } = useUserQuests(
    user?.id
  );
  const { startSessionTimer, stopSessionTimer } = useSessionTimers();

  const [modalType, setModalType] = useState<
    "CreateQuest" | "QuestModal" | null
  >(null);
  const [selectedQuestId, setSelectedQuestId] = useState<string | null>(null);
  const [showConnectTwitterModal, setShowConnectTwitterModal] = useState(false);
  const [showExpirationModal, setShowExpirationModal] = useState(false);
  const [expiredQuestName, setExpiredQuestName] = useState<string>("");
  const [now, setNow] = useState(new Date());

  // ============================================================================
  // MEMOIZED VALUES
  // ============================================================================
  const selectedQuest = useMemo(
    () => quests.find((q: Quest) => q._id === selectedQuestId),
    [quests, selectedQuestId]
  );

  const selectedUserQuest = useMemo(
    () => userQuests.find((uq) => uq.questId === selectedQuestId),
    [userQuests, selectedQuestId]
  );

  const { questsCompleted, rewardEarned } = useMemo(
    () => questUtils.calculateQuestStats(userQuests),
    [userQuests]
  );

  // ============================================================================
  // CALLBACKS
  // ============================================================================
  const refreshAllData = useCallback(async () => {
    await Promise.all([refreshQuests(), refreshUserQuests()]);
  }, [refreshQuests, refreshUserQuests]);

  const openModal = useCallback((type: "CreateQuest" | "QuestModal") => {
    setModalType(type);
  }, []);

  const closeModal = useCallback(() => {
    setModalType(null);
    setSelectedQuestId(null);
  }, []);

  const handleSessionExpiration = useCallback(
    async (questId: string, questName: string) => {
      try {
        const result = await questService.checkQuestExpiration(
          questId,
          user?.id || "",
          walletAddress || ""
        );

        if (result.success && (result.data?.expired || result.data?.found)) {
          setExpiredQuestName(questName);
          setShowExpirationModal(true);
          toast.error(`${QUEST_MESSAGES.SESSION_EXPIRED} ${questName}`);

          if (modalType === "QuestModal" && selectedQuestId === questId) {
            closeModal();
          }

          await refreshAllData();
        }

        stopSessionTimer(questId);
      } catch (error) {
        console.error("Error handling session expiration:", error);
      }
    },
    [
      user?.id,
      walletAddress,
      modalType,
      selectedQuestId,
      closeModal,
      refreshAllData,
      stopSessionTimer,
    ]
  );

  // ✅ USAR EL CUSTOM HOOK CON TIPOS CORRECTOS
  const { handleQuestCardClick, isExecutingQuest, loadingQuestId } =
    useQuestActions({
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
      handleSessionExpiration, // ✅ PASAR EL HANDLER
    });

  // ============================================================================
  // EFFECTS
  // ============================================================================
  useEffect(() => {
    if (!user?.id) return;

    const fetchUserData = async () => {
      const result = await userService.fetchUser(user.id);
      if (result.success) {
        setUser(result.data);
      }
    };

    fetchUserData();
  }, [user?.id]);

  // Twitter auth effect
  useEffect(() => {
    const twitterStatus = searchParams.get("twitter");
    if (!twitterStatus) return;

    const handleTwitterAuth = async () => {
      switch (twitterStatus) {
        case "success":
          toast.success(TWITTER_AUTH_MESSAGES.SUCCESS);
          if (user?.id) {
            const userResult = await userService.fetchUser(user.id);
            if (userResult.success) setUser(userResult.data);
          }
          await refreshAllData();
          break;
        case "error":
          toast.error(TWITTER_AUTH_MESSAGES.ERROR);
          break;
        case "user_not_found":
          toast.error(TWITTER_AUTH_MESSAGES.USER_NOT_FOUND);
          break;
        case "oauth_error":
          toast.error(TWITTER_AUTH_MESSAGES.OAUTH_ERROR);
          break;
      }
      router.replace("/dashboard/quests", { scroll: false });
    };

    handleTwitterAuth();
  }, [searchParams, router, user?.id, refreshAllData]);

  // Clock effect
  useEffect(() => {
    const interval = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  // ============================================================================
  // RENDER
  // ============================================================================
  return (
    <div className="min-h-screen flex flex-col">
      <div className="flex-1 w-full px-5 p-[1.6rem] xl:py-[1.8rem] xl:px-[2.4rem] flex flex-col items-start justify-start gap-[2.4rem]">
        <QuestHeader
          filters={QUEST_FILTERS}
          currentFilter={filter}
          onFilterChange={handleFilterChange}
          onCreateQuest={() => openModal("CreateQuest")}
          questsCompleted={questsCompleted}
          rewardEarned={rewardEarned}
        />

        <div className="flex-1 w-full">
          <QuestGrid
            quests={quests}
            userQuests={userQuests}
            user={user}
            loading={loading}
            loadingQuestId={loadingQuestId}
            isExecutingQuest={isExecutingQuest}
            now={now}
            onQuestClick={handleQuestCardClick}
            getButtonProps={(quest) => {
              const userQuest = userQuests.find(
                (uq) => uq.questId === quest._id
              );
              const isLoading =
                loadingQuestId === quest._id && isExecutingQuest;
              return questUtils.getQuestButtonProps(
                quest,
                userQuest,
                user,
                isLoading
              );
            }}
          />
        </div>
      </div>

      <QuestFooter
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
        totalCount={totalCount}
        itemsPerPage={questsPerPage}
      />

      {modalType && (
        <QuestModals
          modalType={modalType}
          selectedQuest={selectedQuest}
          selectedUserQuest={selectedUserQuest}
          user={user}
          loading={loading || loadingUserQuests}
          showConnectTwitterModal={showConnectTwitterModal}
          showExpirationModal={showExpirationModal}
          expiredQuestName={expiredQuestName}
          isExecutingQuest={isExecutingQuest}
          onCloseModal={closeModal}
          onCloseTwitterModal={() => setShowConnectTwitterModal(false)}
          onCloseExpirationModal={() => {
            setShowExpirationModal(false);
            setExpiredQuestName("");
          }}
          onSessionExpired={(questName) => {
            setExpiredQuestName(questName);
            setShowExpirationModal(true);
          }}
          onQuestCompleted={stopSessionTimer}
          onRefreshData={refreshAllData}
          onRefreshQuests={refreshQuests}
        />
      )}
    </div>
  );
};

export default Quests;
