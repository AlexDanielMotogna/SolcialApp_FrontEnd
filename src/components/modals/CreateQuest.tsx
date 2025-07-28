"use client";
import { questAPI } from "@/app/clientAPI/questAPI";
import { useMockUser } from "@/context/MockUserContext";
import { useCreateQuest } from "@/hooks/useCreateQuest";
import Image from "next/image";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import Close from "../../../public/icons/Close";
import SolanaIcon from "../../../public/imgs/SolanaIconReward.png";
import ButtonBorder from "../../components/ButtonBorder";
import { toUTCISOString } from "../../utils/dateUtils";

// Initial form state for the CreateQuest component
// This includes fields for quest details, tasks, and dates
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

// CreateQuestProps interface defines the props for the CreateQuest component
export interface CreateQuestProps {
  isOpen: boolean;
  onClose: () => void;
  refreshQuests: () => void;
  initialData?: Partial<typeof initialForm> & { _id?: string };
  isEdit?: boolean;
}
// Extend CreateQuestProps to include refreshQuests
// This allows the component to refresh the quest list after creation

// CreateQuest component now accepts refreshQuests as a prop
const CreateQuest: React.FC<CreateQuestProps> = ({
  isOpen,
  onClose,
  refreshQuests,
}) => {
  const { id: userId } = useMockUser();
  const {
    form,
    setForm,
    handleChange,
    handleSubmit,
    calculateRewardPerTask,
    loading,
    error,
  } = useCreateQuest(initialForm, onClose, userId);

  const [showSuccess, setShowSuccess] = useState(false);

  useEffect(() => {
    async function fetchAuthorId() {
      if (form.tweetLink && form.tweetLink.startsWith("http")) {
        const res = await fetch("/api/quests/testAuthId", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ tweetLink: form.tweetLink }),
        });
        const data = await res.json();
        if (data.success) {
          setForm((prev: typeof initialForm) => ({
            ...prev,
            authorId: data.authorId,
          }));
        }
      }
    }
    fetchAuthorId();
  }, [form.tweetLink]);

  const handleSubmitWithPopup = async (e: React.FormEvent) => {
    e.preventDefault();

    // Convert dates and times to UTC ISO string
    const startDateTimeUTC = toUTCISOString(form.startDate, form.startTime);
    const endDateTimeUTC = toUTCISOString(form.endDate, form.endTime);

    // Filtra solo los tasks seleccionados (true)
    const filteredTasks = Object.fromEntries(
      Object.entries(form.tasks).filter(([_, value]) => value === true)
    );

    // Prepara el quest data para enviar al backend
    const questData = {
      ...form,
      tasks: filteredTasks, // Solo los seleccionados
      startDateTime: startDateTimeUTC,
      endDateTime: endDateTimeUTC,
      userId,
    };

    // Remove the original date and time fields
    delete questData.startDate;
    delete questData.startTime;
    delete questData.endDate;
    delete questData.endTime;

    // Send the data to the backend
    try {
      await questAPI.createQuest(questData);
      setShowSuccess(true);
      refreshQuests();
    } catch (error) {
      toast.error("Error creating quest: " + (error as Error).message);
      // Handle error (e.g., show an error message)
    }
  };
  // If the modal is not open, return null to avoid rendering
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-[#000000] bg-opacity-60 flex justify-center items-end md:items-center z-50">
      {/* Success Modal */}
      {showSuccess && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-60">
          <div className="bg-[#18181b] p-8 rounded-2xl shadow-xl flex flex-col items-center">
            <h2 className="text-2xl font-bold text-green-400 mb-4">
              Quest Created!
            </h2>
            <p className="text-white mb-6">
              Your quest was created successfully.
            </p>
            <button
              className="px-6 py-2 bg-green-600 text-white rounded-lg font-semibold"
              onClick={() => {
                setShowSuccess(false);
                onClose();
              }}
            >
              Close
            </button>
          </div>
        </div>
      )}

      <form
        onSubmit={handleSubmitWithPopup}
        className="bg-[#161618] w-[470px] max-h-[90vh] flex flex-col items-start justify-start gap-6 border border-[#44444A] rounded-2xl shadow-[0px_2px_10px_-3px_rgba(0,0,0,0)]"
        style={{
          boxShadow: "0px -5px 10px 0px #FFFFFF1A inset",
          scrollbarWidth: "none",
          msOverflowStyle: "none",
        }}
      >
        <div className="w-full p-8 border-b border-[#44444A] flex items-center justify-between">
          <h3 className="text-[1.8rem] text-white font-semibold">
            Create Quest
          </h3>
          <Close onClick={onClose} />
        </div>

        <div
          className="w-full flex flex-col items-start justify-start gap-6 px-8 overflow-y-auto"
          style={{
            scrollbarWidth: "none",
            msOverflowStyle: "none",
          }}
        >
          <div className="w-full flex flex-col items-start justify-start gap-1">
            <h4 className="text-white font-semibold text-[1.8rem]">
              Launch a New Quest
            </h4>
            <p className="text-[#ACB5BB] text-[1.4rem]">
              Engage your community with exciting quests and earn traction!
            </p>
          </div>

          <div className="w-full flex flex-col items-start justify-start gap-[0.8rem]">
            {/* Quest Name */}
            <div className="w-full flex flex-col items-start justify-start gap-2">
              <h6 className="text-[1.2rem] text-[#ACB5BB] font-normal">
                Quest Name
              </h6>
              <input
                name="questName"
                value={form.questName}
                onChange={handleChange}
                className="w-full py-5 px-5 bg-[#2C2C30] border border-[#44444A] rounded-xl text-[1.4rem] text-[#6C7278] font-normal"
                placeholder="Social Media Engagement Quest"
                required
              />
            </div>

            {/* Description */}
            <div className="w-full flex flex-col items-start justify-start gap-2">
              <h6 className="text-[1.2rem] text-[#ACB5BB] font-normal">
                Description
              </h6>
              <textarea
                name="description"
                value={form.description}
                onChange={handleChange}
                className="w-full h-[77px] px-5 py-5 bg-[#2C2C30] border border-[#44444A] rounded-xl text-[1.4rem] text-[#6C7278] font-normal resize-none"
                placeholder="Engage with our social media"
                required
              />
            </div>
            {/* Tweet/Post Link */}
            <div className="w-full flex flex-col items-start justify-start gap-2">
              <h6 className="text-[1.2rem] text-[#ACB5BB] font-normal">
                Tweet/Post Link
              </h6>
              <input
                name="tweetLink"
                value={form.tweetLink}
                onChange={handleChange}
                className="w-full py-5 px-5 bg-[#2C2C30] border border-[#44444A] rounded-xl text-[1.4rem] text-[#6C7278] font-normal"
                placeholder="https://twitter.com/..."
                required
              />
            </div>

            {/* Banner */}
            <div className="w-full flex flex-col items-start justify-start gap-2">
              <h6 className="text-[1.2rem] text-[#ACB5BB] font-normal">
                Banner Image
              </h6>
              <input
                type="file"
                accept="image/*"
                name="banner"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) {
                    const url = URL.createObjectURL(file);
                    setForm((prev: any) => ({
                      ...prev,
                      banner: url,
                      bannerFile: file,
                    }));
                  }
                }}
                className="w-full py-2 px-2 bg-[#2C2C30] border border-[#44444A] rounded-xl text-[1.3rem] text-[#6C7278] font-normal"
                required
              />
              {/* Preview */}
              {form.banner && (
                <img
                  src={form.banner}
                  alt="Banner Preview"
                  className="w-full h-32 object-cover rounded-xl mt-2"
                />
              )}
            </div>

            {/* Max Participants */}
            <div className="w-full flex flex-col items-start justify-start gap-2">
              <h6 className="text-[1.2rem] text-[#ACB5BB] font-normal">
                Max Participants
              </h6>
              <input
                name="maxParticipants"
                value={form.maxParticipants}
                onChange={handleChange}
                type="number"
                min={1}
                className="w-full py-5 px-5 bg-[#2C2C30] border border-[#44444A] rounded-xl text-[1.4rem] text-[#6C7278] font-normal"
                placeholder="50"
                required
              />
            </div>

            {/* Reward Pool */}
            <div className="w-full flex flex-col items-start justify-start gap-2">
              <h6 className="text-[1.2rem] text-[#ACB5BB] font-normal">
                Reward Pool
              </h6>
              <div className="w-full relative">
                <input
                  name="rewardPool"
                  value={form.rewardPool}
                  onChange={handleChange}
                  className="w-full py-5 px-5 bg-[#2C2C30] border border-[#44444A] rounded-xl text-[1.4rem] text-[#6C7278] font-normal"
                  placeholder="50 SOL"
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
            {/* Reward per Task */}
            <div className="w-full flex flex-col items-start justify-start gap-2">
              <h6 className="text-[1.2rem] text-[#ACB5BB] font-normal">
                Reward per Task
              </h6>
              <div className="w-full relative">
                <input
                  name="rewardPerTask"
                  value={calculateRewardPerTask()}
                  onChange={handleChange}
                  className="w-full py-5 px-5 pr-12 bg-[#2C2C30] border border-[#44444A] rounded-xl text-[1.4rem] text-[#6C7278] font-normal"
                  placeholder="0.01 SOL"
                  readOnly
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

            {/* Dates */}
            <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Start Date & Time */}
              <div className="w-full flex flex-col gap-2">
                <h6 className="text-[1.2rem] text-[#ACB5BB] font-normal">
                  Start Date & Time
                </h6>
                <div className="flex flex-col gap-2">
                  <label className="text-[1.1rem] text-[#ACB5BB]">Date</label>
                  <input
                    name="startDate"
                    value={form.startDate}
                    onChange={handleChange}
                    type="date"
                    className="w-full py-3 px-4 bg-[#2C2C30] border border-[#44444A] rounded-xl text-[1.3rem] text-[#6C7278] font-normal outline-none"
                    required
                  />
                  <label className="text-[1.1rem] text-[#ACB5BB]">Time</label>
                  <input
                    name="startTime"
                    value={form.startTime}
                    onChange={handleChange}
                    type="time"
                    step="1"
                    className="w-full py-3 px-4 bg-[#2C2C30] border border-[#44444A] rounded-xl text-[1.3rem] text-[#6C7278] font-normal outline-none"
                    required
                  />
                </div>
              </div>
              {/* End Date & Time */}
              <div className="w-full flex flex-col gap-2">
                <h6 className="text-[1.2rem] text-[#ACB5BB] font-normal">
                  End Date & Time
                </h6>
                <div className="flex flex-col gap-2">
                  <label className="text-[1.1rem] text-[#ACB5BB]">Date</label>
                  <input
                    name="endDate"
                    value={form.endDate}
                    onChange={handleChange}
                    type="date"
                    className="w-full py-3 px-4 bg-[#2C2C30] border border-[#44444A] rounded-xl text-[1.3rem] text-[#6C7278] font-normal outline-none"
                    required
                  />
                  <label className="text-[1.1rem] text-[#ACB5BB]">Time</label>
                  <input
                    name="endTime"
                    value={form.endTime}
                    onChange={handleChange}
                    type="time"
                    step="1"
                    className="w-full py-3 px-4 bg-[#2C2C30] border border-[#44444A] rounded-xl text-[1.3rem] text-[#6C7278] font-normal outline-none"
                    required
                  />
                </div>
              </div>
            </div>

            {/* Tasks checkboxes */}
            <div className="w-full flex flex-col items-start justify-start gap-2">
              <h6 className="text-[1.2rem] text-[#ACB5BB] font-normal">
                Tasks
              </h6>
              <div className="flex flex-col gap-2 w-full">
                <label className="flex items-center gap-2 text-[1.4rem] text-[#EDF1F3]">
                  <input
                    type="checkbox"
                    name="like"
                    checked={form.tasks.like}
                    onChange={handleChange}
                    className="accent-[#9945FF] w-5 h-5"
                  />
                  Like Tweet
                </label>
                <label className="flex items-center gap-2 text-[1.4rem] text-[#EDF1F3]">
                  <input
                    type="checkbox"
                    name="retweet"
                    checked={form.tasks.retweet}
                    onChange={handleChange}
                    className="accent-[#9945FF] w-5 h-5"
                  />
                  Retweet
                </label>
                <label className="flex items-center gap-2 text-[1.4rem] text-[#EDF1F3]">
                  <input
                    type="checkbox"
                    name="comment"
                    checked={form.tasks.comment}
                    onChange={handleChange}
                    className="accent-[#9945FF] w-5 h-5"
                  />
                  Comment
                </label>
                <label className="flex items-center gap-2 text-[1.4rem] text-[#EDF1F3]">
                  <input
                    type="checkbox"
                    name="follow"
                    checked={form.tasks.follow}
                    onChange={handleChange}
                    className="accent-[#9945FF] w-5 h-5"
                  />
                  Follow
                </label>
                <label className="flex items-center gap-2 text-[1.4rem] text-[#EDF1F3]">
                  <input
                    type="checkbox"
                    name="quote"
                    checked={form.tasks.quote}
                    onChange={handleChange}
                    className="accent-[#9945FF] w-5 h-5"
                  />
                  Quote
                </label>
              </div>
            </div>
          </div>
        </div>
        <div className="w-full border-t border-[#44444A] p-8">
          <ButtonBorder
            text={loading ? "Creating..." : "Create Quest"}
            onClick={handleSubmitWithPopup}
            disabled={loading}
            type="button"
          />
          {error && <div className="text-red-500 mt-2">{error}</div>}
        </div>
      </form>
    </div>
  );
};

export default CreateQuest;
