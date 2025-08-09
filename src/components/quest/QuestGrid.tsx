import { memo, useState, useEffect } from "react";
import QuestCard from "./QuestCard";

interface QuestGridProps {
  quests: any[];
  userQuests: any[];
  user: any;
  loading: boolean;
  loadingQuestId: string | null;
  isExecutingQuest: boolean;
  onQuestClick: (quest: any) => void;
  getButtonProps: (quest: any) => { text: string; disabled: boolean };
}

const QuestGrid = memo(
  ({
    quests,
    userQuests,
    user,
    loading,
    loadingQuestId,
    isExecutingQuest,
    onQuestClick,
    getButtonProps,
  }: QuestGridProps) => {
    const [now, setNow] = useState(new Date());

    useEffect(() => {
      // ✅ UPDATE TIME ONLY EVERY 30 SECONDS FOR TIME-SENSITIVE DISPLAYS
      const interval = setInterval(() => setNow(new Date()), 30000);
      return () => clearInterval(interval);
    }, []);
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
              const userQuest = userQuests.find(
                (uq) => uq.questId === quest._id
              );
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

        {/* Loading Indicator removed as requested */}
      </>
    );
  }
);

QuestGrid.displayName = "QuestGrid";

export default QuestGrid;
