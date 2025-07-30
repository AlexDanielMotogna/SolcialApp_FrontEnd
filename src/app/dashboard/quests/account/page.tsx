"use client";
import { useEffect, useState } from "react";
import ButtonBlack from "@/components/ButtonBlack";
import MyCreatedQuestsCard from "@/components/MyCreatedQuestsCard";
import CompletedQuestsCard from "@/components/CompletedQuestsCard";
import { fetchCreatedQuests } from "@/utils/questApi";
import EditQuest from "@/components/modals/EditQuest";
import { parseISOToFormFields } from "@/utils/dateUtils";
import { useMockUserProvider } from "@/components/global/MockUserProvider";

const QuestAccount = () => {
  const { user } = useMockUserProvider();
  const userId = user?.id;

  const [createdQuests, setCreatedQuests] = useState<any[]>([]);
  const [completedUserQuests, setCompletedUserQuests] = useState<any[]>([]);
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [selectedQuest, setSelectedQuest] = useState<any>(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [loading, setLoading] = useState(false);

  const fetchCompletedUserQuests = async (userId: string) => {
    try {
      setLoading(true);
      const response = await fetch(
        `/api/user-quests/completed?userId=${userId}`
      );
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to fetch completed userQuests");
      }

      return data.completedQuests || [];
    } catch (error) {
      console.error("Error fetching completed userQuests:", error);
      return [];
    } finally {
      setLoading(false);
    }
  };

  const refreshQuests = async () => {
    if (!userId) return;

    try {
      const [created, completedUserQuests] = await Promise.all([
        fetchCreatedQuests(userId),
        fetchCompletedUserQuests(userId),
      ]);

      setCreatedQuests(created);
      setCompletedUserQuests(completedUserQuests);
    } catch (error) {
      console.error("Error refreshing quests:", error);
    }
  };

  useEffect(() => {
    if (!userId) return;
    refreshQuests();
  }, [userId]);

  const handleClaimReward = async (userQuest: any) => {
    try {
      const response = await fetch("/api/user-quests/claim", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userQuestId: userQuest._id,
          userId: userId,
        }),
      });

      if (response.ok) {
        const updated = await fetchCompletedUserQuests(userId);
        setCompletedUserQuests(updated);
      } else {
        const errorData = await response.json();
        alert(errorData.error || "Failed to claim reward");
      }
    } catch (error) {
      console.error("Error claiming reward:", error);
      alert("Error claiming reward");
    }
  };

  const handleEdit = (quest: any) => {
    const now = new Date();
    const start = quest.startDateTime ? new Date(quest.startDateTime) : null;

    if (start && now >= start) {
      alert("No puedes editar este quest porque ya ha empezado.");
      return;
    }

    const startFields = parseISOToFormFields(quest.startDateTime);
    const endFields = parseISOToFormFields(quest.endDateTime);

    const initialData = {
      ...quest,
      startDate: startFields.date,
      startTime: startFields.time,
      endDate: endFields.date,
      endTime: endFields.time,
    };
    setSelectedQuest(initialData);
    setShowEditModal(true);
  };

  const handleCancel = (quest: any) => {
    setSelectedQuest(quest);
    setShowCancelModal(true);
  };

  const confirmCancel = async () => {
    if (!selectedQuest?._id) return;

    try {
      const response = await fetch("/api/quests/cancel", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ questId: selectedQuest._id }),
      });

      if (response.ok) {
        await refreshQuests();
        setShowCancelModal(false);
        setSelectedQuest(null);
      }
    } catch (error) {
      console.error("Error canceling quest:", error);
    }
  };

  const closeEditModal = () => {
    setShowEditModal(false);
    setSelectedQuest(null);
    refreshQuests();
  };

  const closeCancelModal = () => setShowCancelModal(false);

  return (
    <>
      <div className="w-full min-h-[1200px] flex flex-col items-center justify-start py-12 px-2">
        <div className="w-full max-w-8xl flex items-center justify-start mb-8 ml-12">
          <ButtonBlack
            text="Back to Quests"
            onClick={() => window.history.back()}
          />
        </div>

        <h2 className="text-3xl font-bold text-white mb-6 w-full max-w-6xl">
          My Created Quests
        </h2>
        <MyCreatedQuestsCard
          quests={createdQuests}
          onEdit={handleEdit}
          onCancel={handleCancel}
        />

        <EditQuest
          isOpen={showEditModal}
          onClose={closeEditModal}
          refreshQuests={refreshQuests}
          initialData={selectedQuest}
        />

        {showCancelModal && (
          <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
            <div className="bg-[#18181C] p-14 rounded-2xl shadow-lg flex flex-col items-center min-w-[400px]">
              <p className="text-white mb-10 text-2xl">
                Quest will be cancelled, are you sure?
              </p>
              <div className="flex gap-10">
                <ButtonBlack text="No" onClick={closeCancelModal} />
                <ButtonBlack text="Yes, Cancel" onClick={confirmCancel} />
              </div>
            </div>
          </div>
        )}

        <h2 className="text-3xl font-bold text-white mb-6 w-full max-w-6xl">
          Completed Quests
        </h2>
        {loading ? (
          <div className="text-center py-10 text-[#ACB5BB] text-xl">
            Loading completed quests...
          </div>
        ) : (
          <CompletedQuestsCard
            userQuests={completedUserQuests}
            onClaim={handleClaimReward}
          />
        )}
      </div>
      <footer className="w-full h-100 h-20 mt-[100px]" />
    </>
  );
};

export default QuestAccount;
