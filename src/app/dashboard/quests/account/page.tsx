"use client";
import { useEffect, useState } from "react";
import ButtonBlack from "@/components/ButtonBlack";
import MyCreatedQuestsCard from "@/components/MyCreatedQuestsCard";
import CompletedQuestsCard from "@/components/CompletedQuestsCard";
import { fetchCreatedQuests, fetchCompletedQuests } from "@/utils/questApi";
import EditQuest from "@/components/modals/EditQuest";
import {parseISOToFormFields} from "@/utils/dateUtils";
import { useMockUserProvider } from "@/components/global/MockUserProvider";
import { useContext } from "react";


// Usa el userId real del usuario logueado

const QuestAccount = () => {
  const { user } = useMockUserProvider(); // Usa el provider
  const userId = user?.id; // Usa el campo correcto del mock
  const [createdQuests, setCreatedQuests] = useState([]);
  const [completedQuests, setCompletedQuests] = useState([]);
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [selectedQuest, setSelectedQuest] = useState<any>(null);
  const [showEditModal, setShowEditModal] = useState(false);

  // Refresca la lista de quests creados
 const refreshQuests = () => {
  fetchCreatedQuests(userId).then((quests) => {
    console.log("Quests recibidos:", quests);
    setCreatedQuests(quests);
  });
};

  useEffect(() => {
    refreshQuests();
    fetchCompletedQuests(userId).then(setCompletedQuests);
  }, [userId]);

  // Abrir modal de edición solo si el quest no ha empezado
 const handleEdit = (quest: any) => {
  const now = new Date();
  const start = quest.startDateTime ? new Date(quest.startDateTime) : null;

  if (start && now >= start) {
    alert("No puedes editar este quest porque ya ha empezado.");
    return;
  }

  // Convierte las fechas para el formulario
  const startFields = parseISOToFormFields(quest.startDateTime);
  const endFields = parseISOToFormFields(quest.endDateTime);
  console.log("Start Fields:", startFields);
  console.log("End Fields:", endFields);  

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

  // Abrir modal de cancelación
  const handleCancel = (quest: any) => {
    setSelectedQuest(quest);
    setShowCancelModal(true);
  };

  // Confirmar cancelación
  const confirmCancel = async () => {
    if (!selectedQuest?._id) return;
    await fetch("/api/quests/cancel", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ questId: selectedQuest._id }),
    });
    refreshQuests();
    setShowCancelModal(false);
    setSelectedQuest(null);
  };

  return (
    <>
      <div className="w-full min-h-[600px] flex flex-col items-center justify-start py-12 px-2">
        {/* Back button */}
        <div className="flex-shrink-0 w-full md:w-auto flex items-center gap-3 justify-start">
          <ButtonBlack text="Back to Quests" onClick={() => window.history.back()} />
        </div>

        {/* My Created Quests */}
        <h2 className="text-3xl font-bold text-white mb-6 w-full max-w-6xl">My Created Quests</h2>
        <MyCreatedQuestsCard
          quests={createdQuests}
          onEdit={handleEdit}
          onCancel={handleCancel}
        />
        <EditQuest
          isOpen={showEditModal}
          onClose={() => {
            setShowEditModal(false);
            setSelectedQuest(null);
            refreshQuests();
          }}
          refreshQuests={refreshQuests}
          initialData={selectedQuest}
        />
        {/* Cancel Modal */}
        {showCancelModal && (
          <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
            <div className="bg-[#18181C] p-14 rounded-2xl shadow-lg flex flex-col items-center min-w-[400px]">
              <p className="text-white mb-10 text-2xl">Quest will be cancelled, are you sure?</p>
              <div className="flex gap-10">
                <ButtonBlack text="No" onClick={() => setShowCancelModal(false)} />
                <ButtonBlack text="Yes, Cancel" onClick={confirmCancel} />
              </div>
            </div>
          </div>
        )}

        {/* Completed Quests */}
        <h2 className="text-3xl font-bold text-white mb-6 w-full max-w-6xl">Completed Quests</h2>
        <CompletedQuestsCard
          quests={completedQuests}
          onClaim={(quest) => {
            console.log(`Claiming rewards for quest: ${quest._id}`);
          }}
        />
      </div>
      <footer className="w-full h-100 h-20 mt-[100px]" />
    </>
  );
};

export default QuestAccount;