"use client";
import { useState } from "react";
import { MockUserContext, MOCK_USER } from "@/context/MockUserContext";
import QuestModal from "@/components/modals/QuestModal";

const quests = [
  { _id: "6882423ff1bffdda5f6cb78d", questName: "Quest 1" },
  { _id: "6882423ff1bffdda5f6cb78e", questName: "Quest 2" },
];

export default function TestQuestPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedQuestId, setSelectedQuestId] = useState<string | null>(null);

  const handleOpenModal = (id: string) => {
    setSelectedQuestId(id);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedQuestId(null);
  };

  return (
    <MockUserContext.Provider value={{ user: MOCK_USER }}>
      <div>
        <h2>Test Quest Modal</h2>
        {quests.map((quest) => (
          <button key={quest._id} onClick={() => handleOpenModal(quest._id)}>
            View Quest {quest.questName}
          </button>
        ))}

        <QuestModal
          isOpen={isModalOpen}
          questId={selectedQuestId}
          onClose={handleCloseModal}
        />
      </div>
    </MockUserContext.Provider>
  );
}