"use client";
import { questAPI } from "@/app/clientAPI/questAPI";
import DateTimePicker from "@/components/ui/DateTimePicker";
import SuccessModal from "@/components/ui/SuccessModal";
import { useCreateQuest } from "@/hooks/useCreateQuest";
import type { User } from "@/types/quest";
import { validateQuestFormWithToast } from "@/utils/questValidation";
import { useSession } from 'next-auth/react';
import Image from "next/image";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import Close from "../../../public/icons/Close";
import SolanaIcon from "../../../public/imgs/SolanaIconReward.png";
import { toUTCISOString } from "../../utils/dateUtils";
import BannerUpload from "../BannerUpload";
import ButtonBorder from "../ButtonBorder";

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

//export interface for CreateQuest component props
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
//create quest modal component
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
  // Fetch author ID from tweet link
  useEffect(() => {
    const fetchAuthorId = async () => {
      if (!form.tweetLink || !form.tweetLink.startsWith("http")) return;

      try {
        const res = await fetch("/api/quests/testAuthId", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ tweetLink: form.tweetLink }),
        });
        
        const data = await res.json();
        
        if (data.success && data.userId) {
            setForm((prev: typeof initialForm) => ({
            ...prev,
            authorId: data.userId as string,
            }));
        } else {
          toast.error('Could not fetch author ID:', data.error);
        }
      } catch (error) {
        console.error('Error fetching author ID:', error);
      }
    };

    const timeoutId = setTimeout(fetchAuthorId, 500);
    return () => clearTimeout(timeoutId);
  }, [form.tweetLink, setForm]);

  // Populate form with initial data if editing
  useEffect(() => {
    if (initialData && isEdit) {
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

  // Validations for start and end dates
  useEffect(() => {
    if (form.startDate && form.startTime && form.endDate && form.endTime) {
      const now = new Date();
      const startDateTime = new Date(`${form.startDate}T${form.startTime}`);
      const endDateTime = new Date(`${form.endDate}T${form.endTime}`);

      if (startDateTime < now) {
        console.warn('Start date is in the past');
      }

      if (endDateTime <= startDateTime) {
        console.warn('End date must be after start date');
      }
    }
  }, [form.startDate, form.startTime, form.endDate, form.endTime]);

  // ============================================================================
  // EVENT HANDLERS
  // ============================================================================
  const handleSubmitWithPopup = async (e: React.FormEvent) => {
  e.preventDefault();

  //validate form
  const isValid = await validateQuestFormWithToast(form, user);
  if (!isValid) return;

  try {
    // convert dates to UTC
    const startDateTimeUTC = toUTCISOString(form.startDate, form.startTime);
    const endDateTimeUTC = toUTCISOString(form.endDate, form.endTime);

    // remove tasks that are not selected
    const filteredTasks = Object.fromEntries(
      Object.entries(form.tasks).filter(([_, value]) => value === true)
    );

    // construct quest data
    const questData = {
      ...form,
      tasks: filteredTasks,
      banner: bannerData?.url || "",
      bannerPublicId: bannerData?.publicId || "",
      startDateTime: startDateTimeUTC,
      endDateTime: endDateTimeUTC,
      userId: user!.id,
      authorId: form.authorId,
      ...(isEdit && initialData?._id && { _id: initialData._id }),
    };

    // remove temporary fields
    delete questData.startDate;
    delete questData.startTime;
    delete questData.endDate;
    delete questData.endTime;

    //
    if (isEdit) {
      await questAPI.updateQuest(initialData?._id || "", questData);
      toast.success("Quest updated successfully!");
    } else {
      await questAPI.createQuest(questData);
      setShowSuccess(true);
    }
    refreshQuests();
    if (isEdit) {
      onClose();
    }
  } catch (error) {
    toast.error(`Error ${isEdit ? 'updating' : 'creating'} quest: ` + (error as Error).message);
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
    <div className="fixed inset-0 bg-[#000000] bg-opacity-60 flex justify-center items-end md:items-center z-50 overflow-x-hidden">
      {/* show success modal*/}
      <SuccessModal
        isOpen={showSuccess}
        onClose={() => {
          setShowSuccess(false);
          onClose();
        }}
        questName={form.questName}
      />

      {/* create quest form */}
      <form
        onSubmit={handleSubmitWithPopup}
        className="bg-[#161618] w-[470px] max-h-[90vh] flex flex-col items-start justify-start gap-6 border border-[#44444A] rounded-2xl shadow-[0px_2px_10px_-3px_rgba(0,0,0,0)]"
        style={{
          boxShadow: "0px -5px 10px 0px #FFFFFF1A inset",
          scrollbarWidth: "none",
          msOverflowStyle: "none",
        }}
      >
        {/* header */}
        <div className="w-full p-8 border-b border-[#44444A] flex items-center justify-between">
          <h3 className="text-[1.8rem] text-white font-semibold">
            {isEdit ? 'Edit Quest' : 'Create Quest'}
          </h3>
          <Close onClick={onClose} />
        </div>
        <div
          className="w-full flex flex-col items-start justify-start gap-6 px-8 overflow-y-auto overflow-x-hidden"
          style={{
            scrollbarWidth: "none",
            msOverflowStyle: "none",
          }}
        >
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
            {/* user info, for development enviorment*/}
            <p className="text-[#6C7278] text-[1.2rem] mt-2">
              Creating as: <span className="text-[#ACB5BB]">{user.email}</span>
            </p>
          </div>

          <div className="w-full flex flex-col items-start justify-start gap-[0.8rem]">
            {/* Name*/}
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

            {/* Description */}
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

            {/* Tweet link*/}
            <div className="w-full flex flex-col items-start justify-start gap-2">
              <h6 className="text-[1.2rem] text-[#ACB5BB] font-normal">
                Tweet/Post Link *
              </h6>
              <input
                name="tweetLink"
                value={form.tweetLink}
                onChange={handleChange}
                className="w-full py-5 px-5 bg-[#2C2C30] border border-[#44444A] rounded-xl text-[1.4rem] text-white font-normal placeholder-[#6C7278] focus:border-[#9945FF] focus:outline-none transition-colors"
                placeholder="https://x.com/username/status/..."
                required
                type="url"
              />
              {form.authorId && (
                <p className="text-[#10B981] text-[1.1rem]">
                  Tweet author detected 
                </p>
              )}
            </div>

            {/* Max participants */}
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

            {/* Reward Pool */}
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

            {/* Reward per task / autocalculated */}
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

        
             {/* Date and time, DateTimePicked from UI component */}
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

            {/* Task selector */}
            <div className="w-full flex flex-col items-start justify-start gap-4 animate-slideInUp">
              {/* Header */}
              <div className="flex items-center gap-3 mb-2">
                <div className="w-8 h-8 bg-gradient-to-br from-[#9945FF] to-[#14F195] rounded-lg flex items-center justify-center shadow-lg shadow-purple-500/30">
                  <span className="text-white text-lg">⚡</span>
                </div>
                <h6 className="text-[1.2rem] text-[#ACB5BB] font-normal">
                  Tasks * (Select at least one)
                </h6>
              </div>
              {/* Grid of tasks */}
              <div className="grid grid-cols-1 gap-3 w-full">
                {require('@/components/ui/TaskSelector').TASK_CONFIG.map((task: any) => {
                  const isSelected = form.tasks[task.key] || false;
                  return (
                    <label
                      key={task.key}
                      className={`
                        relative group cursor-pointer 
                        bg-gradient-to-r ${task.color} ${task.hoverColor}
                        border ${isSelected ? 'border-[#9945FF] shadow-lg shadow-purple-500/25 bg-gradient-to-r from-purple-500/10 to-blue-500/10' : 'border-[#44444A]'}
                        rounded-xl p-4 
                        transition-all duration-300 
                        hover:scale-[1.02] hover:shadow-xl hover:shadow-purple-500/10
                        ${isSelected ? 'transform scale-[1.01]' : ''}
                      `}
                    >
                      <input
                        type="checkbox"
                        name={task.key}
                        checked={isSelected}
                        onChange={handleChange}
                        className="sr-only"
                      />
                      <div className="flex items-center gap-4">
                        <div className={`relative w-14 h-14 rounded-xl ${task.iconBg} flex items-center justify-center transform transition-all duration-300 group-hover:scale-110 group-hover:rotate-3 ${isSelected ? 'animate-pulse shadow-lg' : ''} border border-white/10`}>
                          <div className="absolute inset-0 bg-gradient-to-br from-white/20 via-transparent to-transparent rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                          <div className="relative z-10 text-2xl transform transition-transform group-hover:scale-110">{task.icon}</div>
                          {isSelected && (
                            <>
                              <div className="absolute -top-1 -right-1 w-3 h-3 bg-[#9945FF] rounded-full animate-ping" />
                              <div className="absolute -top-1 -right-1 w-3 h-3 bg-[#9945FF] rounded-full" />
                            </>
                          )}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="text-[1.4rem] text-white font-semibold group-hover:text-white transition-colors">{task.label}</span>
                            {isSelected && (
                              <span className="px-3 py-1 bg-gradient-to-r from-[#9945FF] to-[#14F195] text-white text-xs rounded-full font-bold animate-fadeIn shadow-lg">✨ Active</span>
                            )}
                          </div>
                          <p className="text-[1.2rem] text-[#ACB5BB] group-hover:text-[#EDF1F3] transition-colors">{task.description}</p>
                        </div>
                        <div className={`relative w-7 h-7 rounded-lg border-2 flex items-center justify-center transition-all duration-300 ${isSelected ? 'bg-gradient-to-br from-[#9945FF] to-[#14F195] border-[#9945FF] shadow-lg shadow-purple-500/30' : 'border-[#6C7278] group-hover:border-[#ACB5BB] bg-transparent'} transform group-hover:scale-110`}>
                          {isSelected && (
                            <>
                              <svg className="w-4 h-4 text-white animate-checkmark drop-shadow-lg" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={4}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                              </svg>
                              <div className="absolute inset-0 bg-gradient-to-br from-[#9945FF]/50 to-[#14F195]/50 rounded-lg blur-sm -z-10" />
                            </>
                          )}
                        </div>
                      </div>
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent opacity-0 group-hover:opacity-100 rounded-xl transition-all duration-500 animate-shimmer pointer-events-none" />
                      {isSelected && (
                        <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-[#9945FF]/20 via-[#14F195]/20 to-[#9945FF]/20 animate-pulse pointer-events-none" />
                      )}
                    </label>
                  );
                })}
              </div>
              {/* Counter */}
              {(() => {
                const tasks = form.tasks;
                const selectedCount = Object.values(tasks).filter(Boolean).length;
                const selectedTasks = Object.entries(tasks).filter(([_, value]) => value).map(([key, _]) => key);
                return (
                  <div className="w-full mt-3 p-4 bg-gradient-to-r from-[#1A1A1C] to-[#2C2C30] rounded-xl border border-[#44444A]">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        {selectedCount > 0 ? (
                          <>
                            <div className="flex items-center gap-2">
                              <div className="w-3 h-3 bg-gradient-to-r from-[#10B981] to-[#34D399] rounded-full animate-pulse shadow-lg shadow-green-500/30" />
                              <span className="text-[#10B981] font-semibold text-sm">{selectedCount} task{selectedCount !== 1 ? 's' : ''} selected</span>
                            </div>
                            <div className="flex gap-1">
                              {selectedTasks.slice(0, 3).map((task) => (
                                <span key={task} className="px-2 py-1 bg-[#9945FF]/20 text-[#9945FF] text-xs rounded-md font-medium border border-[#9945FF]/30">{task}</span>
                              ))}
                              {selectedTasks.length > 3 && (
                                <span className="px-2 py-1 bg-[#6C7278]/20 text-[#ACB5BB] text-xs rounded-md font-medium">+{selectedTasks.length - 3} more</span>
                              )}
                            </div>
                          </>
                        ) : (
                          <div className="flex items-center gap-2">
                            <div className="w-3 h-3 bg-gradient-to-r from-[#EF4444] to-[#F87171] rounded-full animate-pulse shadow-lg shadow-red-500/30" />
                            <span className="text-[#EF4444] font-semibold text-sm">Please select at least one task</span>
                          </div>
                        )}
                      </div>
                      <div className="text-[#6C7278] text-sm font-medium">Max: 5 tasks</div>
                    </div>
                  </div>
                );
              })()}
            </div>
          </div>
        </div>

        {/* Footer / Button place */}
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