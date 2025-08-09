"use client";
import { useState, useEffect, useCallback, useMemo } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import toast from "react-hot-toast";
import dynamic from "next/dynamic";
import {
  LoadingBar,
  LoadingOverlay,
  ListLoadingSkeleton,
  LoadingSpinner,
} from "@/components/ui/LoadingBar";
// Import Quest type
import type { Quest } from "@/types/quest";

// Context & Hooks
import { useGlobalWallet } from "@/context/WalletContext";
import { useQuests } from "@/hooks/useQuests";
import { useUserQuests } from "@/hooks/useUserQuests";
import { useSessionTimers } from "@/hooks/useSessionTimers";
import { useQuestActions } from "@/hooks/useQuestActions";
import { useAuthUser } from "@/hooks/useAuthUser"; // ✅ NEW SIMPLIFIED AUTH HOOK

// Services
import { questService } from "@/services/questService";

// Utils & Constants
import { questUtils } from "@/utils/questUtils";
import {
  QUEST_FILTERS,
  TWITTER_AUTH_MESSAGES,
  QUEST_MESSAGES,
} from "@/constants/quest/questConstants";

// Components
import QuestHeader from "@/components/quest/QuestHeader";
import QuestGrid from "@/components/quest/QuestGrid";
import QuestFooter from "@/components/quest/QuestFooter";
import "../../styles/animation.css";

// Lazy loaded components
const QuestModals = dynamic(() => import("@/components/quest/QuestModals"), {
  ssr: false,
});

const Quests = () => {
  // ============================================================================
  // AUTHENTICATION - SIMPLIFIED WITH NEW HOOK
  // ============================================================================
  const {
    user,
    isLoading: authLoading,
    isAuthenticated,
    isUnauthenticated,
    refreshUser,
  } = useAuthUser();

  // ============================================================================
  // CONTEXT & HOOKS
  // ============================================================================
  const { isConnected, walletAddress, updateWalletInDB } = useGlobalWallet();
  const router = useRouter();
  const searchParams = useSearchParams();

  const {
    quests,
    loading,
    filterLoading,
    pageLoading,
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
  // ✅ ADD WALLET SYNC STATE TO PREVENT INFINITE LOOPS
  const [lastSyncedWallet, setLastSyncedWallet] = useState<string | null>(null);
  // ✅ ADD MINIMUM LOADING TIME FOR SMOOTH TRANSITIONS
  const [minLoadingTime, setMinLoadingTime] = useState(true);

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
        const result = await questService.checkQuestExpiration(questId);

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
    [modalType, selectedQuestId, closeModal, refreshAllData, stopSessionTimer]
  );

  // ✅ USE NEW SIMPLIFIED AUTH HOOK
  const { handleQuestCardClick, isExecutingQuest, loadingQuestId } =
    useQuestActions({
      user, // ✅ SIMPLIFIED USER FROM SESSION
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
    });

  // ✅ MEMOIZE BUTTON PROPS FUNCTION TO PREVENT UNNECESSARY RE-RENDERS
  const getButtonPropsCallback = useCallback(
    (quest: any) => {
      const userQuest = userQuests.find((uq) => uq.questId === quest._id);
      const isLoading = loadingQuestId === quest._id && isExecutingQuest;
      return questUtils.getQuestButtonProps(quest, userQuest, user, isLoading);
    },
    [userQuests, loadingQuestId, isExecutingQuest, user]
  );

  // ============================================================================
  // EFFECTS - OPTIMIZED WALLET SYNC WITH LAZY LOADING
  // ============================================================================

  // ✅ MINIMUM LOADING TIME EFFECT (PREVENT TOO FAST TRANSITIONS)
  useEffect(() => {
    const timer = setTimeout(() => {
      setMinLoadingTime(false);
    }, 1200); // ✅ MINIMUM 1.2 SECONDS FOR SMOOTH TRANSITION

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const syncWallet = async () => {
      // ✅ ONLY SYNC IF WALLET CHANGED AND WE HAVEN'T ALREADY SYNCED IT
      if (
        user &&
        walletAddress &&
        isConnected &&
        user.walletaddress !== walletAddress &&
        lastSyncedWallet !== walletAddress
      ) {
        console.log("🔄 Syncing new wallet for user:", user.email);
        console.log("🔄 Current wallet:", user.walletaddress);
        console.log("🔄 New wallet:", walletAddress);

        try {
          await updateWalletInDB(walletAddress);
          setLastSyncedWallet(walletAddress);
          console.log("✅ Wallet sync completed");

          // ✅ DON'T CALL refreshUser() - IT CREATES INFINITE LOOP
          // The session will be updated on next navigation or manual refresh
        } catch (error) {
          console.error("❌ Wallet sync failed:", error);
        }
      }
    };

    syncWallet();
  }, [
    user?.id,
    walletAddress,
    isConnected,
    user?.walletaddress,
    lastSyncedWallet,
  ]); // ✅ REMOVED updateWalletInDB - IT'S NOW STABLE

  // ✅ RESET SYNC STATE WHEN USER CHANGES
  useEffect(() => {
    if (user?.walletaddress) {
      setLastSyncedWallet(user.walletaddress);
    }
  }, [user?.id]);

  // ============================================================================
  // TWITTER AUTH EFFECT
  // ============================================================================
  useEffect(() => {
    const twitterStatus = searchParams.get("twitter");
    if (!twitterStatus) return;
    // handle Twitter authentication status
    const handleTwitterAuth = async () => {
      switch (twitterStatus) {
        case "success":
          toast.success(TWITTER_AUTH_MESSAGES.SUCCESS);
          await refreshUser();
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
        case "not_authenticated":
          toast.error("Please log in first");
          break;
      }
      router.replace("/dashboard/quests", { scroll: false });
    };

    handleTwitterAuth();
  }, [searchParams, router, refreshUser, refreshAllData]);

  // ============================================================================
  // LOADING & AUTHENTICATION STATES WITH SMOOTH TRANSITIONS
  // ============================================================================
  if (authLoading) {
    return (
      <>
        <div className="min-h-screen flex flex-col">
          <div className="flex-1 w-full px-5 p-[1.6rem] xl:py-[1.8rem] xl:px-[2.4rem] flex flex-col items-start justify-start gap-[2.4rem]">
            {/* ✅ SHOW PAGE STRUCTURE IMMEDIATELY */}
            <div className="w-full mb-4">
              <LoadingBar
                variant="primary"
                size="md"
                text="Initializing your quest dashboard..."
                className="animate-slideInUp"
              />
            </div>

            <div className="space-y-4">
              <ListLoadingSkeleton items={6} />
            </div>
          </div>
        </div>
      </>
    );
  }

  if (isUnauthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <LoadingBar size="lg" variant="secondary" />
          <p className="text-lg mt-4">Please log in to access quests.</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <>
        <div className="min-h-screen flex flex-col">
          <div className="flex-1 w-full px-5 p-[1.6rem] xl:py-[1.8rem] xl:px-[2.4rem] flex flex-col items-start justify-start gap-[2.4rem]">
            {/* ✅ SHOW PAGE STRUCTURE IMMEDIATELY */}
            <div className="w-full mb-4">
              <LoadingBar
                variant="primary"
                size="md"
                text="Loading your profile data..."
                className="animate-slideInUp"
              />
            </div>

            <div className="space-y-4">
              <ListLoadingSkeleton items={6} />
            </div>
          </div>
        </div>
      </>
    );
  }
  // ============================================================================
  // RENDER WITH SMOOTH LAZY LOADING
  // ============================================================================
  return (
    <>
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
            {loading || minLoadingTime ? (
              <div className="space-y-4 opacity-100 transition-opacity duration-500">
                <LoadingBar
                  variant="secondary"
                  size="lg"
                  text="Fetching quests..."
                  className="mb-6"
                />
                <ListLoadingSkeleton items={questsPerPage} />
              </div>
            ) : (
              <div className="opacity-0 animate-fadeIn">
                <QuestGrid
                  quests={quests}
                  userQuests={userQuests}
                  user={user}
                  loading={loading}
                  loadingQuestId={loadingQuestId}
                  isExecutingQuest={isExecutingQuest}
                  onQuestClick={handleQuestCardClick}
                  getButtonProps={getButtonPropsCallback}
                />
              </div>
            )}
          </div>
        </div>

        {/*  LOADING OVERLAY PARA QUEST ACTIONS */}
        <LoadingOverlay
          show={isExecutingQuest}
          text="Processing your quest action..."
          variant="dots"
          blur={true}
        />

        {/*  LOADING OVERLAY PARA USER QUESTS */}
        <LoadingOverlay
          show={loadingUserQuests && !loading}
          text="Syncing your quest progress..."
          variant="spinner"
          blur={false}
        />

        <QuestFooter
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
          totalCount={totalCount}
          itemsPerPage={questsPerPage}
        />

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
      </div>
    </>
  );
};

export default Quests;
