
"use client";
// ============================================================================
// REACT & NEXT.JS IMPORTS
// ============================================================================
import { useEffect, useState } from "react";
import { useSession } from 'next-auth/react';
import toast from "react-hot-toast";

// ============================================================================
// COMPONENTS IMPORTS
// ============================================================================
import ButtonBlack from "@/components/ButtonBlack";
import MyCreatedQuestsCard from "@/components/MyCreatedQuestsCard";
import CompletedQuestsCard from "@/components/CompletedQuestsCard";
import EditQuest from "@/components/modals/EditQuest";

// ============================================================================
// UI LOADING COMPONENTS
// ============================================================================
import { 
  LoadingBar, 
  LoadingOverlay, 
  LoadingSpinner 
} from "@/components/ui/LoadingBar";
import {
  CreatedQuestsTableSkeleton,
  CompletedQuestsTableSkeleton
} from "@/components/ui/TableSkeletons";

// ============================================================================
// UTILS & TYPES IMPORTS
// ============================================================================
import { fetchCreatedQuests } from "@/utils/questApi";
import { parseISOToFormFields } from "@/utils/dateUtils";
import type { User } from "@/types/quest";

const QuestAccount = () => {
  // ============================================================================
  // AUTHENTICATION
  // ============================================================================
  const { data: session, status } = useSession();
  const [user, setUser] = useState<User | null>(null);

  // ============================================================================
  // LOCAL STATE
  // ============================================================================
  const [createdQuests, setCreatedQuests] = useState<any[]>([]);
  const [completedUserQuests, setCompletedUserQuests] = useState<any[]>([]);
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [selectedQuest, setSelectedQuest] = useState<any>(null);
  const [showEditModal, setShowEditModal] = useState(false);
  
  // ✅ LOADING STATES MEJORADOS
  const [loading, setLoading] = useState(false);
  const [loadingCreated, setLoadingCreated] = useState(false);
  const [loadingCompleted, setLoadingCompleted] = useState(false);
  const [loadingAction, setLoadingAction] = useState(false);
  const [actionText, setActionText] = useState('');

  // ============================================================================
  // EFFECTS
  // ============================================================================
  useEffect(() => {
    const fetchRealUser = async () => {
      if (session?.user?.email && status === 'authenticated') {
        try {
          setLoading(true);
          console.log('👤 [Account] Fetching real user data for:', session.user.email);
          
          const response = await fetch('/api/user/profile');
          const result = await response.json();
          
          if (response.ok && result.success && result.user) {
            setUser(result.user);
            console.log('✅ [Account] Real user data loaded:', result.user.email);
          } else {
            console.error('❌ [Account] Failed to fetch user data:', result.error);
          }
        } catch (error) {
          console.error('❌ [Account] Error fetching user data:', error);
        } finally {
          setLoading(false);
        }
      } else {
        setUser(null);
      }
    };

    fetchRealUser();
  }, [session, status]);

  // ============================================================================
  // API FUNCTIONS CON LOADING MEJORADO
  // ============================================================================
  const fetchCompletedUserQuests = async (userId: string) => {
    try {
      setLoadingCompleted(true);
      console.log('📊 [Account] Fetching completed quests for user:', userId);
      
      const response = await fetch(
        `/api/user-quests/completed?userId=${userId}`
      );
      const data = await response.json();

      if (!response.ok) {
        console.error('❌ [Account] Failed to fetch completed quests:', data.error);
        throw new Error(data.error || "Failed to fetch completed userQuests");
      }

      console.log('✅ [Account] Completed quests fetched:', data.completedQuests?.length || 0);
      return data.completedQuests || [];
    } catch (error) {
      console.error("❌ [Account] Error fetching completed userQuests:", error);
      toast.error("Failed to load completed quests");
      return [];
    } finally {
      setLoadingCompleted(false);
    }
  };

  const refreshQuests = async () => {
    if (!user?.id) {
      console.log('⏳ [Account] No user ID available for refreshing quests');
      return;
    }

    try {
      setLoadingCreated(true);
      setLoadingCompleted(true);
      console.log('🔄 [Account] Refreshing quests for user:', user.id);
      
      const [created, completedUserQuests] = await Promise.all([
        fetchCreatedQuests(user.id),
        fetchCompletedUserQuests(user.id),
      ]);

      setCreatedQuests(created);
      setCompletedUserQuests(completedUserQuests);
      
      console.log('✅ [Account] Quests refreshed:', {
        created: created.length,
        completed: completedUserQuests.length
      });
    } catch (error) {
      console.error("❌ [Account] Error refreshing quests:", error);
      toast.error("Failed to refresh quests");
    } finally {
      setLoadingCreated(false);
      setLoadingCompleted(false);
    }
  };

  useEffect(() => {
    if (!user?.id) return;
    
    console.log('🚀 [Account] User loaded, refreshing quests...');
    refreshQuests();
  }, [user?.id]);

  // ============================================================================
  // EVENT HANDLERS CON LOADING
  // ============================================================================
  const handleClaimReward = async (userQuest: any) => {
    if (!user?.id) {
      toast.error("User not authenticated");
      return;
    }

    try {
      setLoadingAction(true);
      setActionText('Claiming your reward...');
      console.log('💰 [Account] Claiming reward for quest:', userQuest._id);
      
      const response = await fetch("/api/user-quests/claim", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userQuestId: userQuest._id,
          userId: user.id,
        }),
      });

      if (response.ok) {
        console.log('✅ [Account] Reward claimed successfully');
        toast.success("Reward claimed successfully!");
        
        setActionText('Refreshing your quests...');
        const updated = await fetchCompletedUserQuests(user.id);
        setCompletedUserQuests(updated);
      } else {
        const errorData = await response.json();
        console.error('❌ [Account] Failed to claim reward:', errorData.error);
        toast.error(errorData.error || "Failed to claim reward");
      }
    } catch (error) {
      console.error("❌ [Account] Error claiming reward:", error);
      toast.error("Error claiming reward");
    } finally {
      setLoadingAction(false);
      setActionText('');
    }
  };

  const confirmCancel = async () => {
    if (!selectedQuest?._id) return;

    try {
      setLoadingAction(true);
      setActionText('Canceling quest...');
      console.log('🚫 [Account] Canceling quest:', selectedQuest._id);
      
      const response = await fetch("/api/quests/cancel", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ questId: selectedQuest._id }),
      });

      if (response.ok) {
        console.log('✅ [Account] Quest canceled successfully');
        toast.success("Quest canceled successfully");
        
        setActionText('Refreshing quests...');
        await refreshQuests();
        setShowCancelModal(false);
        setSelectedQuest(null);
      } else {
        const errorData = await response.json();
        console.error('❌ [Account] Failed to cancel quest:', errorData.error);
        toast.error("Failed to cancel quest");
      }
    } catch (error) {
      console.error("❌ [Account] Error canceling quest:", error);
      toast.error("Error canceling quest");
    } finally {
      setLoadingAction(false);
      setActionText('');
    }
  };

  const handleEdit = (quest: any) => {
    const now = new Date();
    const start = quest.startDateTime ? new Date(quest.startDateTime) : null;

    if (start && now >= start) {
      toast.error("You can't edit this quest because it has already started.");
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

  const closeEditModal = () => {
    setShowEditModal(false);
    setSelectedQuest(null);
    refreshQuests();
  };

  const closeCancelModal = () => setShowCancelModal(false);

  // ============================================================================
  // LOADING & AUTHENTICATION STATES CON LOADING ÉPICO
  // ============================================================================
  if (status === 'loading') {
    return (
      <LoadingOverlay 
        show={true} 
        text="Initializing your account dashboard..." 
        variant="spinner" 
      />
    );
  }

  if (status === 'unauthenticated') {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <LoadingSpinner size="lg" variant="secondary" />
          <p className="text-lg mt-4 text-white">Please log in to access your account.</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <LoadingOverlay 
        show={true} 
        text="Loading your profile data..." 
        variant="bar" 
      />
    );
  }

  // ============================================================================
  // RENDER CON LOADING ÉPICO
  // ============================================================================
  return (
    <>
      <div className="w-full min-h-[1200px] flex flex-col items-center justify-start py-12 px-2">
        
        {/* ✅ LOADING BAR GENERAL MEJORADO */}
        {(loadingCreated || loadingCompleted) && (
          <div className="w-full max-w-6xl mb-6">
            <LoadingBar 
              variant="primary" 
              size="md" 
              text="⚡ Syncing your epic quest data..." 
              className="animate-slideInUp shadow-lg shadow-purple-500/20"
            />
          </div>
        )}

        {/* ✅ BACK BUTTON MEJORADO */}
        <div className="w-full max-w-8xl flex items-center justify-start mb-8 ml-12">
          <div className="group">
            <ButtonBlack
              text="← Back to Quests"
              onClick={() => window.history.back()}
            />
          </div>
        </div>

        {/* ============================================================================ */}
        {/* CREATED QUESTS SECTION MEJORADA */}
        {/* ============================================================================ */}
        <div className="flex items-center space-x-4 w-full max-w-6xl mb-6">
          <h2 className="text-3xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
            🚀 My Created Quests
          </h2>
          <div className="flex-1 h-px bg-gradient-to-r from-purple-500/50 to-transparent"></div>
          <div className="text-sm text-gray-400 bg-[#2C2C30] px-3 py-1 rounded-full">
            {createdQuests.length} quests
          </div>
        </div>

        {/* ✅ LOADING BAR ESPECÍFICO MEJORADO */}
        {loadingCreated && (
          <div className="w-full max-w-6xl mb-4">
            <LoadingBar 
              variant="success" 
              size="sm" 
              text="🎯 Loading your created quests..." 
              className="shadow-md shadow-green-500/20"
            />
          </div>
        )}

        {/* ✅ SKELETON TABLE O CONTENIDO REAL */}
        {loadingCreated ? (
          <div className="w-full max-w-6xl mx-auto">
          <CreatedQuestsTableSkeleton rows={5} />
          </div>
        ) : (
          <div className="mx-auto transition-all duration-500 animate-slideInUp">
            <MyCreatedQuestsCard
              quests={createdQuests}
              onEdit={handleEdit}
              onCancel={handleCancel}
            />
          </div>
        )}

        {/* ============================================================================ */}
        {/* COMPLETED QUESTS SECTION MEJORADA */}
        {/* ============================================================================ */}
        <div className="flex items-center space-x-4 w-full max-w-6xl mb-6 mt-16">
          <h2 className="text-3xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
            🏆 Completed Quests
          </h2>
          <div className="flex-1 h-px bg-gradient-to-r from-blue-500/50 to-transparent"></div>
          <div className="text-sm text-gray-400 bg-[#2C2C30] px-3 py-1 rounded-full">
            {completedUserQuests.length} completed
          </div>
        </div>

        {/* ✅ LOADING BAR ESPECÍFICO MEJORADO */}
        {loadingCompleted && (
          <div className="w-full max-w-6xl mb-4">
            <LoadingBar 
              variant="warning" 
              size="sm" 
              text="💰 Loading your completed quests..." 
              className="shadow-md shadow-yellow-500/20"
            />
          </div>
        )}

        {/* ✅ SKELETON TABLE O CONTENIDO REAL */}
        {loadingCompleted ? (
          <CompletedQuestsTableSkeleton rows={3} />
        ) : (
          <div className="transition-all duration-500 animate-slideInUp">
            <CompletedQuestsCard
              userQuests={completedUserQuests}
              onClaim={handleClaimReward}
              processing={loadingAction}
            />
          </div>
        )}

        {/* ============================================================================ */}
        {/* MODALS MEJORADOS */}
        {/* ============================================================================ */}
        <EditQuest
          isOpen={showEditModal}
          onClose={closeEditModal}
          refreshQuests={refreshQuests}
          initialData={selectedQuest}
          user={user}
        />

        {/* ✅ MODAL DE CONFIRMACIÓN ÉPICO */}
        {showCancelModal && (
          <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 animate-fadeIn">
            <div className="bg-gradient-to-br from-[#18181C] to-[#1E1E20] p-8 rounded-3xl shadow-2xl flex flex-col items-center min-w-[450px] border border-[#44444A] transform transition-all duration-300 animate-slideInUp">
              
              {/* ✅ LOADING BAR ÉPICO EN EL MODAL */}
              {loadingAction && (
                <div className="w-full mb-6">
                  <LoadingBar 
                    variant="error" 
                    size="md" 
                    text="🚫 Processing cancellation..." 
                    className="shadow-lg shadow-red-500/30"
                  />
                </div>
              )}

              {/* ✅ ICONO Y TEXTO MEJORADOS */}
              <div className="w-16 h-16 bg-gradient-to-br from-red-500/20 to-red-600/20 rounded-full flex items-center justify-center mb-6">
                <span className="text-3xl">⚠️</span>
              </div>

              <h3 className="text-2xl font-bold text-white mb-2">Cancel Quest?</h3>
              <p className="text-gray-400 mb-8 text-center">
                This action cannot be undone. The quest will be permanently cancelled.
              </p>

              {/* ✅ BOTONES MEJORADOS */}
              <div className="flex gap-4 w-full">
                <button
                  onClick={closeCancelModal}
                  disabled={loadingAction}
                  className="flex-1 px-6 py-3 bg-[#2C2C30] hover:bg-[#44444A] text-white rounded-xl font-semibold transition-all duration-200 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed border border-[#44444A]"
                >
                  Keep Quest
                </button>
                <button
                  onClick={confirmCancel}
                  disabled={loadingAction}
                  className="flex-1 px-6 py-3 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white rounded-xl font-semibold transition-all duration-200 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-red-500/25"
                >
                  {loadingAction ? (
                    <div className="flex items-center justify-center space-x-2">
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                      <span>Canceling...</span>
                    </div>
                  ) : (
                    "Yes, Cancel Quest"
                  )}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* ✅ LOADING OVERLAY ÉPICO PARA ACCIONES */}
      <LoadingOverlay 
        show={loadingAction} 
        text={actionText || "⚡ Processing your request..."} 
        variant="dots" 
        blur={true}
      />

      {/* ✅ FOOTER MEJORADO */}
      <footer className="w-full h-20 mt-24 bg-gradient-to-t from-[#0A0A0B] to-transparent" />
    </>
  );
};

export default QuestAccount;