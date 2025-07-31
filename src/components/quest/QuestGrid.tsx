import QuestCard from "../QuestCard";

interface QuestGridProps {
  quests: any[];
  userQuests: any[];
  user: any;
  loading: boolean;
  loadingQuestId: string | null;
  isExecutingQuest: boolean;
  now: Date;
  onQuestClick: (quest: any) => void;
  getButtonProps: (quest: any) => { text: string; disabled: boolean };
}

const QuestGrid = ({
  quests,
  userQuests,
  user,
  loading,
  loadingQuestId,
  isExecutingQuest,
  now,
  onQuestClick,
  getButtonProps,
}: QuestGridProps) => {
  return (
    <>
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
          <div className="col-span-full text-center text-white text-xl">
            No quests found.
          </div>
        ) : (
          quests.map((quest, idx) => {
            const userQuest = userQuests.find((uq) => uq.questId === quest._id);
            const buttonProps = getButtonProps(quest);

            return (
              <QuestCard
                key={quest._id || idx}
                quest={quest}
                user={user}
                userQuest={userQuest}
                now={now}
                onOpenModal={() => onQuestClick(quest)}
                buttonText={buttonProps.text}
                buttonDisabled={buttonProps.disabled}
              />
            );
          })
        )}
      </div>

      {/* Loading Indicator */}
      {isExecutingQuest && (
        <div className="fixed top-4 right-4 bg-[#161618] border border-[#44444A] rounded-lg p-4 flex items-center gap-3 z-50">
          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-[#9945FF]"></div>
          <span className="text-white text-sm">Joining quest...</span>
        </div>
      )}
    </>
  );
};

export default QuestGrid;