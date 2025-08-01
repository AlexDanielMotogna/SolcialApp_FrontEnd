// REEMPLAZAR COMPLETAMENTE: c:\Users\Lian Li\Desktop\FrontEnd_Solcial\solcial\src\components\modals\CreateQuest.tsx

"use client";
import { questAPI } from "@/app/clientAPI/questAPI";
import { useSession } from 'next-auth/react';
import { useCreateQuest } from "@/hooks/useCreateQuest";
import Image from "next/image";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import Close from "../../../public/icons/Close";
import SolanaIcon from "../../../public/imgs/SolanaIconReward.png";
import ButtonBorder from "../ButtonBorder";
import { toUTCISOString } from "../../utils/dateUtils";
import BannerUpload from "../BannerUpload";
import TaskSelector from "@/components/ui/TaskSelector";
import SuccessModal from "@/components/ui/SuccessModal";
import { validateQuestFormWithToast } from "@/utils/questValidation";
import DateTimePicker from "@/components/ui/DateTimePicker";
import { getMinimumDateTime } from "../../utils/dateUtils";

// Types
import type { User } from "@/types/quest";

export const initialForm = {
  questName: "",
  description: "",
  tweetLink: "",
  authorId: "",
  maxParticipants: "",
  rewardPool: "",
  rewardPerTask: "",
  startDate: "",
  startTime: "",
  endDate: "",
  endTime: "",
  tasks: {
    like: false,
    retweet: false,
    comment: false,
    follow: false,
    quote: false,
  },
};

export interface CreateQuestProps {
  isOpen: boolean;
  onClose: () => void;
  refreshQuests: () => void;
  initialData?: Partial<typeof initialForm> & { 
    _id?: string; 
    banner?: string; 
    bannerPublicId?: string 
  };
  isEdit?: boolean;
  user: User | null;
}

const CreateQuest: React.FC<CreateQuestProps> = ({
  isOpen,
  onClose,
  refreshQuests,
  initialData,
  isEdit = false,
  user,
}) => {
  // ============================================================================
  // AUTHENTICATION & VALIDATION
  // ============================================================================
  const { data: session, status } = useSession();

  // ============================================================================
  // HOOKS & STATE
  // ============================================================================
  const {
    form,
    setForm,
    handleChange,
    handleSubmit,
    calculateRewardPerTask,
    loading,
    error,
  } = useCreateQuest({
    initialForm: initialData || initialForm,
    onClose,
    user,
    refreshQuests,
    isEdit,
  });

  const [showSuccess, setShowSuccess] = useState(false);
  const [bannerData, setBannerData] = useState<{
    publicId: string;
    url: string;
  } | null>(null);

  // ============================================================================
  // EFFECTS
  // ============================================================================

  
  // ✅ FETCH AUTHOR ID FROM TWEET LINK
  useEffect(() => {
    const fetchAuthorId = async () => {
      if (!form.tweetLink || !form.tweetLink.startsWith("http")) return;

      try {
        console.log('🔍 [CreateQuest] Fetching author ID for tweet:', form.tweetLink);
        
        const res = await fetch("/api/quests/testAuthId", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ tweetLink: form.tweetLink }),
        });
        
        const data = await res.json();
        
        if (data.success && data.userId) {
          console.log('✅ [CreateQuest] Author ID found:', data.userId);
            setForm((prev: typeof initialForm) => ({
            ...prev,
            authorId: data.userId as string,
            }));
        } else {
          console.log('❌ [CreateQuest] Could not fetch author ID:', data.error);
        }
      } catch (error) {
        console.error('❌ [CreateQuest] Error fetching author ID:', error);
      }
    };

    const timeoutId = setTimeout(fetchAuthorId, 500);
    return () => clearTimeout(timeoutId);
  }, [form.tweetLink, setForm]);

  // ✅ POPULATE FORM WITH INITIAL DATA (FOR EDIT MODE)
  useEffect(() => {
    if (initialData && isEdit) {
      console.log('📝 [CreateQuest] Populating form with initial data for edit');
      setForm((prev: typeof initialForm) => ({
        ...prev,
        ...initialData,
      }));

      if (initialData.banner) {
        setBannerData({
          url: initialData.banner,
          publicId: initialData.bannerPublicId || '',
        });
      }
    }
  }, [initialData, isEdit, setForm]);

  // ✅ VALIDACIÓN DE FECHAS EN TIEMPO REAL
  useEffect(() => {
    if (form.startDate && form.startTime && form.endDate && form.endTime) {
      const now = new Date();
      const startDateTime = new Date(`${form.startDate}T${form.startTime}`);
      const endDateTime = new Date(`${form.endDate}T${form.endTime}`);

      // Solo mostrar advertencias, no errores bloqueantes
      if (startDateTime < now) {
        console.warn('⚠️ Start date is in the past');
      }

      if (endDateTime <= startDateTime) {
        console.warn('⚠️ End date must be after start date');
      }
    }
  }, [form.startDate, form.startTime, form.endDate, form.endTime]);

  // ============================================================================
  // EVENT HANDLERS
  // ============================================================================
  const handleSubmitWithPopup = async (e: React.FormEvent) => {
  e.preventDefault();

  // ✅ USAR EL VALIDADOR ÉPICO
  const isValid = await validateQuestFormWithToast(form, user);
  if (!isValid) return;

  try {
    console.log(`🚀 [CreateQuest] ${isEdit ? 'Updating' : 'Creating'} quest...`);

    // ✅ CONVERT DATES TO UTC
    const startDateTimeUTC = toUTCISOString(form.startDate, form.startTime);
    const endDateTimeUTC = toUTCISOString(form.endDate, form.endTime);

    // ✅ FILTER SELECTED TASKS
    const filteredTasks = Object.fromEntries(
      Object.entries(form.tasks).filter(([_, value]) => value === true)
    );

    // ✅ PREPARE QUEST DATA
    const questData = {
      ...form,
      tasks: filteredTasks,
      banner: bannerData?.url || "",
      bannerPublicId: bannerData?.publicId || "",
      startDateTime: startDateTimeUTC,
      endDateTime: endDateTimeUTC,
      userId: user!.id,
      authorId: form.authorId,
      // FOR EDIT MODE
      ...(isEdit && initialData?._id && { _id: initialData._id }),
    };

    // ✅ REMOVE TEMPORARY FIELDS
    delete questData.startDate;
    delete questData.startTime;
    delete questData.endDate;
    delete questData.endTime;

    // ✅ CALL API
    if (isEdit) {
      await questAPI.updateQuest(initialData?._id || "", questData);
      toast.success("✅ Quest updated successfully!");
    } else {
      await questAPI.createQuest(questData);
      setShowSuccess(true);
    }

    console.log(`✅ [CreateQuest] Quest ${isEdit ? 'updated' : 'created'} successfully`);
    refreshQuests();
    
    if (isEdit) {
      onClose();
    }
  } catch (error) {
    console.error(`❌ [CreateQuest] Error ${isEdit ? 'updating' : 'creating'} quest:`, error);
    toast.error(`❌ Error ${isEdit ? 'updating' : 'creating'} quest: ` + (error as Error).message);
  }
};

  // ============================================================================
  // RENDER CONDITIONS
  // ============================================================================
  if (!isOpen) return null;

  if (status === 'loading') {
    return (
      <div className="fixed inset-0 bg-[#000000] bg-opacity-60 flex justify-center items-center z-50">
        <div className="text-white text-lg">Loading...</div>
      </div>
    );
  }

  if (status === 'unauthenticated') {
    return null;
  }

  if (!user) {
    return (
      <div className="fixed inset-0 bg-[#000000] bg-opacity-60 flex justify-center items-center z-50">
        <div className="text-white text-lg">Loading user data...</div>
      </div>
    );
  }

  // ============================================================================
  // RENDER
  // ============================================================================
  return (
    <div className="fixed inset-0 bg-[#000000] bg-opacity-60 flex justify-center items-end md:items-center z-50">
      {/* ✅ SUCCESS MODAL */}
      <SuccessModal
        isOpen={showSuccess}
        onClose={() => {
          setShowSuccess(false);
          onClose();
        }}
        questName={form.questName}
      />

      {/* ✅ MAIN FORM */}
      <form
        onSubmit={handleSubmitWithPopup}
        className="bg-[#161618] w-[470px] max-h-[90vh] flex flex-col items-start justify-start gap-6 border border-[#44444A] rounded-2xl shadow-[0px_2px_10px_-3px_rgba(0,0,0,0)]"
        style={{
          boxShadow: "0px -5px 10px 0px #FFFFFF1A inset",
          scrollbarWidth: "none",
          msOverflowStyle: "none",
        }}
      >
        {/* ✅ HEADER */}
        <div className="w-full p-8 border-b border-[#44444A] flex items-center justify-between">
          <h3 className="text-[1.8rem] text-white font-semibold">
            {isEdit ? 'Edit Quest' : 'Create Quest'}
          </h3>
          <Close onClick={onClose} />
        </div>

        {/* ✅ FORM CONTENT */}
        <div
          className="w-full flex flex-col items-start justify-start gap-6 px-8 overflow-y-auto"
          style={{
            scrollbarWidth: "none",
            msOverflowStyle: "none",
          }}
        >
          {/* ✅ INTRO */}
          <div className="w-full flex flex-col items-start justify-start gap-1">
            <h4 className="text-white font-semibold text-[1.8rem]">
              {isEdit ? 'Update Your Quest' : 'Launch a New Quest'}
            </h4>
            <p className="text-[#ACB5BB] text-[1.4rem]">
              {isEdit 
                ? 'Make changes to your quest details'
                : 'Engage your community with exciting quests and earn traction!'
              }
            </p>
            {/* ✅ USER INFO */}
            <p className="text-[#6C7278] text-[1.2rem] mt-2">
              Creating as: <span className="text-[#ACB5BB]">{user.email}</span>
            </p>
          </div>

          <div className="w-full flex flex-col items-start justify-start gap-[0.8rem]">
            {/* ✅ QUEST NAME */}
            <div className="w-full flex flex-col items-start justify-start gap-2">
              <h6 className="text-[1.2rem] text-[#ACB5BB] font-normal">
                Quest Name *
              </h6>
              <input
                name="questName"
                value={form.questName}
                onChange={handleChange}
                className="w-full py-5 px-5 bg-[#2C2C30] border border-[#44444A] rounded-xl text-[1.4rem] text-white font-normal placeholder-[#6C7278] focus:border-[#9945FF] focus:outline-none transition-colors"
                placeholder="Social Media Engagement Quest"
                required
                maxLength={100}
              />
            </div>

            {/* ✅ DESCRIPTION */}
            <div className="w-full flex flex-col items-start justify-start gap-2">
              <h6 className="text-[1.2rem] text-[#ACB5BB] font-normal">
                Description *
              </h6>
              <textarea
                name="description"
                value={form.description}
                onChange={handleChange}
                className="w-full h-[77px] px-5 py-5 bg-[#2C2C30] border border-[#44444A] rounded-xl text-[1.4rem] text-white font-normal resize-none placeholder-[#6C7278] focus:border-[#9945FF] focus:outline-none transition-colors"
                placeholder="Engage with our social media and help us grow our community!"
                required
                maxLength={500}
              />
              <BannerUpload 
                onImageUpload={setBannerData} 
                disabled={loading}
              />
            </div>

            {/* ✅ TWEET LINK */}
            <div className="w-full flex flex-col items-start justify-start gap-2">
              <h6 className="text-[1.2rem] text-[#ACB5BB] font-normal">
                Tweet/Post Link *
              </h6>
              <input
                name="tweetLink"
                value={form.tweetLink}
                onChange={handleChange}
                className="w-full py-5 px-5 bg-[#2C2C30] border border-[#44444A] rounded-xl text-[1.4rem] text-white font-normal placeholder-[#6C7278] focus:border-[#9945FF] focus:outline-none transition-colors"
                placeholder="https://twitter.com/username/status/..."
                required
                type="url"
              />
              {form.authorId && (
                <p className="text-[#10B981] text-[1.1rem]">
                  ✅ Tweet author detected
                </p>
              )}
            </div>

            {/* ✅ MAX PARTICIPANTS */}
            <div className="w-full flex flex-col items-start justify-start gap-2">
              <h6 className="text-[1.2rem] text-[#ACB5BB] font-normal">
                Max Participants *
              </h6>
              <input
                name="maxParticipants"
                value={form.maxParticipants}
                onChange={handleChange}
                type="number"
                min={1}
                max={10000}
                className="w-full py-5 px-5 bg-[#2C2C30] border border-[#44444A] rounded-xl text-[1.4rem] text-white font-normal placeholder-[#6C7278] focus:border-[#9945FF] focus:outline-none transition-colors"
                placeholder="50"
                required
              />
            </div>

            {/* ✅ REWARD POOL */}
            <div className="w-full flex flex-col items-start justify-start gap-2">
              <h6 className="text-[1.2rem] text-[#ACB5BB] font-normal">
                Reward Pool (SOL) *
              </h6>
              <div className="w-full relative">
                <input
                  name="rewardPool"
                  value={form.rewardPool}
                  onChange={handleChange}
                  type="number"
                  step="0.001"
                  min="0.001"
                  className="w-full py-5 px-5 pr-14 bg-[#2C2C30] border border-[#44444A] rounded-xl text-[1.4rem] text-white font-normal placeholder-[#6C7278] focus:border-[#9945FF] focus:outline-none transition-colors"
                  placeholder="0.5"
                  required
                />
                <span className="absolute right-4 top-1/2 -translate-y-1/2">
                  <Image
                    src={SolanaIcon}
                    alt="Solana"
                    className="w-6 h-6"
                    width={24}
                    height={24}
                  />
                </span>
              </div>
            </div>

            {/* ✅ REWARD PER TASK (CALCULATED) */}
            <div className="w-full flex flex-col items-start justify-start gap-2">
              <h6 className="text-[1.2rem] text-[#ACB5BB] font-normal">
                Reward per Task (Auto-calculated)
              </h6>
              <div className="w-full relative">
                <input
                  value={calculateRewardPerTask()}
                  className="w-full py-5 px-5 pr-14 bg-[#1a1a1c] border border-[#44444A] rounded-xl text-[1.4rem] text-[#ACB5BB] font-normal cursor-not-allowed"
                  readOnly
                />
                <span className="absolute right-4 top-1/2 -translate-y-1/2">
                  <Image
                    src={SolanaIcon}
                    alt="Solana"
                    className="w-6 h-6 opacity-60"
                    width={24}
                    height={24}
                  />
                </span>
              </div>
            </div>

        
             {/* ✅ DATE TIME PICKERS ÉPICOS */}
           <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* START DATE TIME */}
              <DateTimePicker
                label="Start Date & Time"
                dateValue={form.startDate}
                timeValue={form.startTime}
                onDateChange={(date) => setForm((prev: any) => ({ ...prev, startDate: date }))}
                onTimeChange={(time) => setForm((prev: any) => ({ ...prev, startTime: time }))}
                minDate={new Date().toISOString().split('T')[0]}
                required
              />

              {/* END DATE TIME */}
              <DateTimePicker
                label="End Date & Time"
                dateValue={form.endDate}
                timeValue={form.endTime}
                onDateChange={(date) => setForm((prev: any) => ({ ...prev, endDate: date }))}
                onTimeChange={(time) => setForm((prev: any) => ({ ...prev, endTime: time }))}
                minDate={form.startDate || new Date().toISOString().split('T')[0]}
                required
              />
            </div>

             {/* ✅ TASKS CHECKBOXES ÉPICOS */}
             {/* ✅ TASK SELECTOR COMPONENT */}
            <TaskSelector 
              tasks={form.tasks}
              onChange={handleChange}
              className="animate-slideInUp"
            />
          </div>
        </div>

        {/* ✅ FOOTER */}
        <div className="w-full border-t border-[#44444A] p-8">
          <ButtonBorder
            text={loading 
              ? (isEdit ? "Updating..." : "Creating...") 
              : (isEdit ? "Update Quest" : "Create Quest")
            }
            onClick={handleSubmitWithPopup}
            disabled={loading || !user?.id}
            type="button"
          />
          {error && (
            <div className="text-red-400 mt-3 p-2 bg-red-950 rounded-lg text-[1.2rem]">
              ❌ {error}
            </div>
          )}
        </div>
      </form>
    </div>
  );
};

export default CreateQuest;