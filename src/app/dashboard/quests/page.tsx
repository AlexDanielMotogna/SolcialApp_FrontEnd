"use client";
import Link from "next/link";
import Image from "next/image";
import { useState, useEffect, useContext } from "react";
import PowerShield from "../../../../public/imgs/PowerShield.png";
import Moneybag from "../../../../public/imgs/Moneybag.png";
import ButtonBorder from "../../../components/ButtonBorder";
import QuestModal from "@/components/modals/QuestModal";
import CreateQuest from "@/components/modals/CreateQuest";
import ButtonBlack from "@/components/ButtonBlack";
import QuestCard from "@/components/QuestCard";
import Pagination from "@/components/Pagination"; // ✅ AGREGADO
import { MockUserContext } from "@/context/MockUserContext";
import { FaTwitter } from "react-icons/fa";
import toast from "react-hot-toast";
import Notification from "@/components/global/Notification";

const FILTERS = [
  { label: "Active", value: "active" },
  { label: "finished", value: "finished" },
  { label: "Canceled", value: "canceled" },
  { label: "Oldest", value: "oldest" },
  { label: "Newest", value: "newest" },
  { label: "Biggest Reward", value: "biggest" },
  { label: "Lowest Reward", value: "lowest" },
];

const Quests = () => {
  const context = useContext(MockUserContext);

  // Estados principales
  const [user, setUser] = useState(context?.user);
  const [quests, setQuests] = useState<any[]>([]);
  const [userQuests, setUserQuests] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadingUserQuests, setLoadingUserQuests] = useState(true);

  // Estados de UI
  const [filter, setFilter] = useState<string>("");
  const [modalType, setModalType] = useState<
    "CreateQuest" | "QuestModal" | null
  >(null);
  const [selectedQuestId, setSelectedQuestId] = useState<string | null>(null);

  // Estados de modales
  const [showConnectTwitterModal, setShowConnectTwitterModal] = useState(false);
  const [showExpirationModal, setShowExpirationModal] = useState(false);
  const [expiredQuestName, setExpiredQuestName] = useState<string>("");

  // Estados de loading específicos
  const [creatingQuestSession, setCreatingQuestSession] = useState(false);
  const [loadingQuestId, setLoadingQuestId] = useState<string | null>(null);

  // ✅ AGREGADO - Estados de paginación
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const [questsPerPage] = useState(6);

  // Timer management
  const [sessionTimers, setSessionTimers] = useState<{
    [questId: string]: NodeJS.Timeout;
  }>({});
  const [now, setNow] = useState(new Date());

  // ============================================================================
  // FETCH FUNCTIONS
  // ============================================================================

  const fetchUser = async () => {
    if (!user?.id) return;
    try {
      const res = await fetch(`/api/user?id=${user.id}`);
      const data = await res.json();
      if (data.user) {
        setUser(data.user);
      }
    } catch (err) {
      console.error("Error fetching user:", err);
      toast.error("Error fetching user data.");
    }
  };

  const fetchUserQuests = async () => {
    if (!user?.id) return;

    try {
      const res = await fetch(
        `/api/user-quests/allUserQuests?userId=${user.id}`
      );
      const data = await res.json();
      setUserQuests(data.userQuests || []);
    } catch (err) {
      setUserQuests([]);
    } finally {
      setLoadingUserQuests(false);
    }
  };

  // ✅ MODIFICADO - fetchQuests con paginación
  const fetchQuests = async (page = 1, filterParam = filter) => {
    try {
      setLoading(true);

      // ✅ BUILD URL WITH PARAMETERS
      const params = new URLSearchParams({
        page: page.toString(),
        limit: questsPerPage.toString(),
      });

      if (filterParam) {
        if (["active", "finished", "canceled"].includes(filterParam)) {
          params.append("filter", filterParam);
        } else {
          params.append("sort", filterParam);
        }
      }

      const res = await fetch(`/api/quests?${params}`);
      const data = await res.json();

      if (data.quests) {
        setQuests(data.quests);

        // ✅ UPDATE PAGINATION STATES
        if (data.pagination) {
          setCurrentPage(data.pagination.currentPage);
          setTotalPages(data.pagination.totalPages);
          setTotalCount(data.pagination.totalCount);
        }
      }
    } catch (err) {
      console.error("Error fetching quests:", err);
      setQuests([]);
    } finally {
      setLoading(false);
    }
  };

  // ✅ AGREGADO - Función para refrescar datos
  const refreshData = async () => {
    await Promise.all([fetchQuests(currentPage, filter), fetchUserQuests()]);
  };

  // ✅ AGREGADO - Función para cambiar página
  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
      fetchQuests(newPage, filter);
    }
  };

  // ✅ MODIFICADO - handleFilterChange para paginación
  const handleFilterChange = (newFilter: string) => {
    setFilter(newFilter);
    setCurrentPage(1); // ✅ RESET to page 1
    fetchQuests(1, newFilter);
  };

  // ============================================================================
  // TIMER MANAGEMENT
  // ============================================================================

  const startSessionTimer = (
    questId: string,
    questName: string,
    expiresAt: string
  ) => {
    const timeUntilExpiration = new Date(expiresAt).getTime() - Date.now();

    if (timeUntilExpiration <= 0) {
      handleSessionExpiration(questId, questName);
      return;
    }

    const timer = setTimeout(() => {
      handleSessionExpiration(questId, questName);
    }, timeUntilExpiration);

    setSessionTimers((prev) => ({ ...prev, [questId]: timer }));
  };

  const stopSessionTimer = (questId: string) => {
    setSessionTimers((prev) => {
      const timer = prev[questId];
      if (timer) {
        clearTimeout(timer);
      }
      const newTimers = { ...prev };
      delete newTimers[questId];
      return newTimers;
    });
  };

  const handleSessionExpiration = async (
    questId: string,
    questName: string
  ) => {
    try {
      const response = await fetch("/api/user-quests/expire", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          questId,
          userId: user.id,
          walletaddress: user.walletaddress,
        }),
      });

      const data = await response.json();

      if (response.ok && (data.expired || data.found)) {
        setExpiredQuestName(questName);
        setShowExpirationModal(true);
        toast.error(`Quest session expired: ${questName}`);

        if (modalType === "QuestModal" && selectedQuestId === questId) {
          closeModal();
        }

        await refreshData();
      }

      stopSessionTimer(questId);
    } catch (error) {
      console.error("Error handling session expiration:", error);
    }
  };

  // ============================================================================
  // MODAL HANDLERS
  // ============================================================================

  const openModal = (type: "CreateQuest" | "QuestModal") => setModalType(type);

  const closeModal = () => {
    setModalType(null);
    setSelectedQuestId(null);
  };

  const closeExpirationModal = () => {
    setShowExpirationModal(false);
    setExpiredQuestName("");
  };

  // ============================================================================
  // QUEST INTERACTION
  // ============================================================================

  const handleQuestCardClick = async (quest: any) => {
    if (!user) {
      toast.error("User not found");
      return;
    }

    const userQuest = userQuests.find((uq) => uq.questId === quest._id);
    const isConnectedToTwitter = !!user?.hasTwitterAccess;
    const questStartTime = new Date(quest.startDateTime);
    const currentTime = new Date();

    if (currentTime < questStartTime) {
      const timeUntilStart = questStartTime.getTime() - currentTime.getTime();
      const hoursUntilStart = Math.ceil(timeUntilStart / (1000 * 60 * 60));
      const minutesUntilStart = Math.ceil(timeUntilStart / (1000 * 60));

      if (hoursUntilStart > 1) {
        toast.error(`Quest starts in ${hoursUntilStart} hours`);
      } else {
        toast.error(`Quest starts in ${minutesUntilStart} minutes`);
      }
      return;
    }

    if (quest.status === "canceled") {
      toast.error("This quest has been canceled.");
      return;
    }

    if (quest.status === "finished" && !userQuest) {
      toast.error("Quest has ended.");
      return;
    }

    if (quest.actualParticipants >= quest.maxParticipants && !userQuest) {
      toast.error("No spots available.");
      return;
    }

    if (!isConnectedToTwitter) {
      setShowConnectTwitterModal(true);
      return;
    }

    if (userQuest) {
      console.log(
        "🔍 Checking quest expiration using existing expire endpoint..."
      );

      try {
        const response = await fetch("/api/user-quests/expire", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            questId: quest._id,
            userId: user.id,
            walletaddress: user.walletaddress,
          }),
        });

        const data = await response.json();

        if (response.ok) {
          if (data.expired && data.found) {
            console.log("⏰ Quest expired and deleted by backend");
            setExpiredQuestName(quest.questName);
            setShowExpirationModal(true);
            toast.error(`Quest session expired: ${quest.questName}`);
            await refreshData();
            return;
          }

          if (!data.expired && !data.found) {
            console.log("✅ Quest is still active, opening modal");
            setSelectedQuestId(quest._id);
            openModal("QuestModal");
            return;
          }
        }
      } catch (error) {
        console.error("Error checking expiration:", error);
        toast.error("Error checking quest status. Please try again.");
        return;
      }
    }

    if (quest.status === "finished") {
      toast.error("Quest has ended and you didn't participate.");
      return;
    }

    await createQuestSession(quest);
  };

  const createQuestSession = async (quest: any) => {
    if (quest.status === "canceled") {
      toast.error("Cannot join a canceled quest.");
      return;
    }

    if (quest.status === "finished") {
      toast.error("Quest has ended and you didn't participate.");
      return;
    }

    setCreatingQuestSession(true);
    setLoadingQuestId(quest._id);

    try {
      const res = await fetch("/api/user-quests", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: user.id,
          walletaddress: user.walletaddress,
          questId: quest._id,
          tasks: quest.tasks,
        }),
      });

      if (!res.ok) {
        const errorData = await res.json();
        toast.error(errorData.error || "Could not start quest");
        return;
      }

      const result = await res.json();
      await refreshData();

      if (result.sessionExpiresAt) {
        startSessionTimer(quest._id, quest.questName, result.sessionExpiresAt);
      }

      setSelectedQuestId(quest._id);
      openModal("QuestModal");
    } catch (error) {
      console.error("Error creating quest session:", error);
      toast.error("Could not start quest");
    } finally {
      setCreatingQuestSession(false);
      setLoadingQuestId(null);
    }
  };

  // ============================================================================
  // QUEST BUTTON LOGIC
  // ============================================================================

  const getQuestButtonProps = (quest: any) => {
    const userQuest = userQuests.find((uq) => uq.questId === quest._id);
    const isConnectedToTwitter = !!user?.hasTwitterAccess;
    const isThisQuestLoading =
      loadingQuestId === quest._id && creatingQuestSession;
    const questStartTime = new Date(quest.startDateTime);
    const currentTime = new Date();

    if (isThisQuestLoading) {
      return { text: "Creating session...", disabled: true };
    }

    if (currentTime < questStartTime) {
      const timeUntilStart = questStartTime.getTime() - currentTime.getTime();
      const hoursUntilStart = Math.ceil(timeUntilStart / (1000 * 60 * 60));
      const minutesUntilStart = Math.ceil(timeUntilStart / (1000 * 60));

      if (hoursUntilStart > 1) {
        return { text: `Starts in ${hoursUntilStart}h`, disabled: true };
      } else if (minutesUntilStart > 1) {
        return { text: `Starts in ${minutesUntilStart}m`, disabled: true };
      } else {
        return { text: "Starting soon...", disabled: true };
      }
    }

    if (quest.status === "canceled") {
      return { text: "Quest Canceled", disabled: true };
    }

    if (quest.status === "finished") {
      if (userQuest) {
        if (userQuest.status === "finished") {
          return {
            text: userQuest.rewardClaimed ? "Completed" : "Claim Reward",
            disabled: false,
          };
        }
        return { text: "Continue Quest", disabled: false };
      }
      return { text: "Quest has ended", disabled: true };
    }

    if (quest.actualParticipants >= quest.maxParticipants && !userQuest) {
      return { text: "No spots available", disabled: true };
    }

    if (!isConnectedToTwitter) {
      return { text: "Connect to Twitter", disabled: false };
    }

    if (userQuest) {
      if (userQuest.status === "expired") {
        return { text: "Join Quest", disabled: false };
      }
      if (userQuest.status === "active") {
        return { text: "Continue Quest", disabled: false };
      }
      if (userQuest.status === "finished") {
        return {
          text: userQuest.rewardClaimed ? "Completed" : "Claim Reward",
          disabled: false,
        };
      }
    }

    return { text: "Join Quest", disabled: false };
  };

  // ============================================================================
  // FILTERING LOGIC (MANTENIDO PARA BACKWARD COMPATIBILITY)
  // ============================================================================

  const getFilteredQuests = () => {
    let filtered = [...quests];

    switch (filter) {
      case "active":
        return filtered.filter((q) => q.status === "active");
      case "finished":
        return filtered.filter((q) => q.status === "finished");
      case "canceled":
        return filtered.filter((q) => q.status === "canceled");
      case "oldest":
        return filtered.sort(
          (a, b) =>
            new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
        );
      case "newest":
        return filtered.sort(
          (a, b) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
      case "biggest":
        return filtered.sort((a, b) => b.rewardPool - a.rewardPool);
      case "lowest":
        return filtered.sort((a, b) => a.rewardPool - b.rewardPool);
      default:
        return filtered;
    }
  };

  // ============================================================================
  // COMPUTED VALUES
  // ============================================================================

  const selectedQuest = quests.find((q) => q._id === selectedQuestId);
  const selectedUserQuest = userQuests.find(
    (uq) => uq.questId === selectedQuestId
  );
  const filteredQuests = getFilteredQuests(); // ✅ MANTENIDO para backward compatibility
  const questsCompleted = userQuests.filter(
    (uq) => uq.status === "finished" && uq.rewardClaimed
  ).length;
  const rewardEarned = userQuests
    .filter((uq) => uq.status === "finished" && uq.rewardClaimed)
    .reduce((acc, uq) => {
      const rewardValue = parseFloat(uq.rewardAmount || "0");
      return acc + rewardValue;
    }, 0);

  // ============================================================================
  // EFFECTS
  // ============================================================================

  useEffect(() => {
    fetchUser();
  }, []);

  useEffect(() => {
    if (user?.id) {
      fetchUserQuests();
    }
  }, [user?.id]);

  // ✅ MODIFICADO - useEffect para fetchQuests
  useEffect(() => {
    fetchQuests(1, ""); // ✅ LOAD page 1 initially
  }, []);

  useEffect(() => {
    const interval = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    return () => {
      Object.values(sessionTimers).forEach((timer) => clearTimeout(timer));
    };
  }, [sessionTimers]);

  // ============================================================================
  // RENDER
  // ============================================================================

  return (
    <div className="w-full px-5 p-[1.6rem] xl:py-[1.8rem] xl:px-[2.4rem] flex flex-col items-start justify-start gap-[2.4rem]">
      {/* Header */}
      <div className="w-full flex flex-col md:flex-row items-center justify-between gap-4 mb-6">
        <div className="flex-shrink-0 w-full md:w-auto flex items-center gap-3 justify-start">
          <Link href="/dashboard/quests/account">
            <ButtonBlack text="My Account" />
          </Link>
          <ButtonBorder
            text="Create Quest"
            onClick={() => openModal("CreateQuest")}
          />
        </div>

        {/* Filters */}
        <div className="flex-1 flex flex-wrap justify-center gap-2">
          {FILTERS.map((f) => (
            <button
              key={f.value}
              onClick={() => handleFilterChange(f.value)}
              className={`px-4 py-2 rounded-lg border font-semibold text-[1.3rem] transition ${
                filter === f.value
                  ? "bg-[#9945FF] text-white border-[#9945FF]"
                  : "bg-[#23232A] text-[#ACB5BB] border-[#2C2C30] hover:bg-[#2C2C30]"
              }`}
            >
              {f.label}
            </button>
          ))}
          {filter && (
            <button
              onClick={() => handleFilterChange("")}
              className="px-4 py-2 rounded-lg border font-semibold text-[1.3rem] bg-[#23232A] text-[#ACB5BB] border-[#2C2C30] hover:bg-[#2C2C30]"
            >
              Clear
            </button>
          )}
        </div>

        {/* Stats */}
        <div className="flex gap-3 flex-shrink-0 mt-4 md:mt-0">
          <div className="w-[140px] xl:w-[170px] flex items-center justify-start gap-3 py-4 xl:py-5 px-3 xl:px-4 bg-[#1E1E20] border border-[#2C2C30] rounded-2xl">
            <Image
              src={PowerShield}
              alt=""
              className="w-[28px] h-[28px] xl:w-[38px] xl:h-[38px]"
            />
            <div className="flex flex-col items-start justify-start gap-1">
              <h3 className="text-white font-semibold text-[1.5rem]">
                {questsCompleted}
              </h3>
              <span className="text-[1.1rem] text-[#ACB5BB]">
                Quests completed
              </span>
            </div>
          </div>
          <div className="w-[140px] xl:w-[170px] flex items-center justify-start gap-3 py-4 xl:py-5 px-3 xl:px-4 bg-[#1E1E20] border border-[#2C2C30] rounded-2xl">
            <Image
              src={Moneybag}
              alt=""
              className="w-[28px] h-[28px] xl:w-[38px] xl:h-[38px]"
            />
            <div className="flex flex-col items-start justify-start gap-1">
              <h3 className="text-white font-semibold text-[1.5rem]">
                {rewardEarned}
              </h3>
              <span className="text-[1.1rem] text-[#ACB5BB]">
                Total Rewards
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Quest Grid */}
      <div
        className="w-full flex-1 overflow-y-auto grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 xl:gap-9"
        style={{ maxHeight: "70vh" }}
      >
        {loading ? (
          <div className="col-span-full text-center text-white text-xl">
            Loading quests...
          </div>
        ) : quests.length === 0 ? (
          // ✅ CAMBIADO de filteredQuests a quests
          <div className="col-span-full text-center text-white text-xl">
            No quests found.
          </div>
        ) : (
          // ✅ CAMBIADO de filteredQuests a quests
          quests.map((quest, idx) => {
            const userQuest = userQuests.find((uq) => uq.questId === quest._id);
            const buttonProps = getQuestButtonProps(quest);

            return (
              <QuestCard
                key={quest._id || idx}
                quest={quest}
                user={user}
                userQuest={userQuest}
                now={now}
                onOpenModal={() => handleQuestCardClick(quest)}
                buttonText={buttonProps.text}
                buttonDisabled={buttonProps.disabled}
              />
            );
          })
        )}
      </div>

      {/* ✅ AGREGADO - Pagination Component */}
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
        totalCount={totalCount}
        itemsPerPage={questsPerPage}
      />

      {/* Loading Indicator */}
      {creatingQuestSession && (
        <div className="fixed top-4 right-4 bg-[#161618] border border-[#44444A] rounded-lg p-4 flex items-center gap-3 z-50">
          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-[#9945FF]"></div>
          <span className="text-white text-sm">Creating quest session...</span>
        </div>
      )}

      {/* Session Expiration Modal */}
      {showExpirationModal && (
        <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-[100]">
          <div className="bg-[#161618] border border-[#44444A] rounded-xl p-10 flex flex-col items-center max-w-lg mx-4">
            <div className="w-20 h-20 bg-red-500/20 rounded-full flex items-center justify-center mb-6">
              <svg
                className="w-10 h-10 text-red-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <h2 className="text-red-400 text-3xl font-bold mb-4 text-center">
              Session Expired
            </h2>
            <p className="mb-6 text-[#ACB5BB] text-center text-lg">
              Your quest session has expired after 20 seconds.
            </p>
            <p className="mb-6 text-white text-center font-semibold text-xl">
              Quest: {expiredQuestName}
            </p>
            <p className="mb-8 text-[#ACB5BB] text-center text-base">
              You can restart the quest by clicking "Join Quest" again.
            </p>
            <button
              className="bg-red-500 hover:bg-red-600 text-white px-8 py-4 rounded-lg font-semibold transition-colors duration-200 w-full text-lg"
              onClick={closeExpirationModal}
            >
              Accept & Close
            </button>
          </div>
        </div>
      )}

      {/* Twitter Connection Modal */}
      {showConnectTwitterModal && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
          <div className="bg-[#161618] border border-[#44444A] rounded-xl p-8 flex flex-col items-center max-w-md mx-4">
            <div className="w-16 h-16 bg-blue-500/20 rounded-full flex items-center justify-center mb-4">
              <FaTwitter size={32} color="#1DA1F2" />
            </div>
            <h2 className="text-blue-400 text-xl font-bold mb-2 text-center">
              Connect to Twitter
            </h2>
            <p className="mb-4 text-[#ACB5BB] text-center">
              To participate in quests you need to connect your Twitter account.
            </p>
            <p className="mb-6 text-white text-center font-semibold">
              This will open a new tab for authentication.
            </p>
            <div className="flex gap-3 w-full">
              <button
                className="flex-1 bg-[#1DA1F2] hover:bg-[#1A94DA] text-white px-6 py-3 rounded-lg font-semibold transition-colors duration-200 flex items-center justify-center gap-2"
                onClick={() => {
                  window.open(
                    "/api/auth/twitter",
                    "_blank",
                    "width=600,height=600"
                  );
                  setShowConnectTwitterModal(false);
                  toast.success(
                    "Please complete Twitter connection in the new tab, then refresh this page."
                  );
                }}
              >
                <FaTwitter /> Connect Twitter
              </button>
              <button
                className="flex-1 bg-[#44444A] hover:bg-[#555] text-white px-6 py-3 rounded-lg font-semibold transition-colors duration-200"
                onClick={() => setShowConnectTwitterModal(false)}
              >
                Cancel
              </button>
            </div>
            <p className="mt-4 text-[#ACB5BB] text-center text-sm">
              After connecting, you may need to refresh this page.
            </p>
          </div>
        </div>
      )}

      {/* Modals */}
      {modalType === "QuestModal" && selectedQuest && (
        <QuestModal
          isOpen={true}
          quest={selectedQuest}
          user={user}
          userQuest={selectedUserQuest}
          loading={loading || loadingUserQuests}
          onClose={closeModal}
          onSessionExpired={() => {
            setExpiredQuestName(selectedQuest.questName);
            setShowExpirationModal(true);
          }}
          mutateUserQuest={refreshData}
          onExpiredInModal={(questName) => {
            setExpiredQuestName(questName);
            setShowExpirationModal(true);
          }}
          onQuestCompleted={stopSessionTimer}
        />
      )}

      {modalType === "CreateQuest" && (
        <CreateQuest
          isOpen={true}
          onClose={() => setModalType(null)}
          refreshQuests={fetchQuests}
        />
      )}
    </div>
  );
};

export default Quests;
