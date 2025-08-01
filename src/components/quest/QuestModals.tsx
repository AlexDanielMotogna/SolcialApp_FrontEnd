import QuestModal from "../modals/QuestModal";
import CreateQuest from "../modals/CreateQuest";
import { FaTwitter } from "react-icons/fa";

interface QuestModalsProps {
  modalType: "CreateQuest" | "QuestModal" | null;
  selectedQuest?: any;
  selectedUserQuest?: any;
  user?: any;
  loading: boolean;
  showConnectTwitterModal: boolean;
  showExpirationModal: boolean;
  expiredQuestName: string;
  isExecutingQuest: boolean;
  onCloseModal: () => void;
  onCloseTwitterModal: () => void;
  onCloseExpirationModal: () => void;
  onSessionExpired: (questName: string) => void;
  onQuestCompleted: (questId: string) => void;
  onRefreshData: () => void;
  onRefreshQuests: () => void;
}

const QuestModals = ({
  modalType,
  selectedQuest,
  selectedUserQuest,
  user,
  loading,
  showConnectTwitterModal,
  showExpirationModal,
  expiredQuestName,
  isExecutingQuest,
  onCloseModal,
  onCloseTwitterModal,
  onCloseExpirationModal,
  onSessionExpired,
  onQuestCompleted,
  onRefreshData,
  onRefreshQuests,
}: QuestModalsProps) => {
  return (
    <>
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
              onClick={onCloseExpirationModal}
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
            <div className="flex gap-3 w-full">
              <button
                className="flex-1 bg-[#1DA1F2] hover:bg-[#1A94DA] text-white px-6 py-3 rounded-lg font-semibold transition-colors duration-200 flex items-center justify-center gap-2"
                onClick={() => {
                  // ✅ AGREGAR USER ID A LA URL
                  const twitterAuthUrl = '/api/twitter-auth/twitter';
                  console.log(
                    "🐦 Redirecting to Twitter OAuth:",
                    twitterAuthUrl
                  );
                  window.location.href = twitterAuthUrl;
                }}
              >
                <FaTwitter /> Connect Twitter
              </button>
              <button
                className="flex-1 bg-[#44444A] hover:bg-[#555] text-white px-6 py-3 rounded-lg font-semibold transition-colors duration-200"
                onClick={onCloseTwitterModal}
              >
                Cancel
              </button>
            </div>
            <p className="mt-4 text-[#ACB5BB] text-center text-sm">
              You will be redirected to Twitter for authentication.
            </p>
          </div>
        </div>
      )}

      {/* Quest Modal */}
      {modalType === "QuestModal" && selectedQuest && (
        <QuestModal
          isOpen={true}
          quest={selectedQuest}
          user={user}
          userQuest={selectedUserQuest}
          loading={loading}
          onClose={onCloseModal}
          onSessionExpired={() => onSessionExpired(selectedQuest.questName)}
          mutateUserQuest={onRefreshData}
          onExpiredInModal={onSessionExpired}
          onQuestCompleted={onQuestCompleted}
        />
      )}
      {/* Create Quest Modal */}
      {modalType === "CreateQuest" && (
        <CreateQuest
          isOpen={true}
          onClose={onCloseModal}
          refreshQuests={onRefreshQuests}
          user={user} // ✅ SOLO AGREGAR ESTA LÍNEA
        />
      )}
    </>
  );
};

export default QuestModals;
