// MODIFICAR: c:\Users\Lian Li\Desktop\FrontEnd_Solcial\solcial\src\components\modals\EditQuest.tsx

import { initialForm } from "./CreateQuest";
import { CreateQuestProps } from "./CreateQuest";
import ButtonBorder from "../../components/ButtonBorder";
import BannerUpload from "../BannerUpload"; // ✅ AGREGAR IMPORT
import { useState, useEffect } from "react";
import SuccessModal from "../ui/SuccessModal";
import { parseDecimal128ToNumber, formatDecimalForDisplay } from "@/utils/decimal";
import type { User } from "@/types/quest";

const ALL_AVAILABLE_TASKS = [
  { key: "like", label: "Like" },
  { key: "retweet", label: "Retweet" },
  { key: "comment", label: "Comment" },
  { key: "follow", label: "Follow" },
  { key: "quote", label: "Quote" },
];

const EditQuest: React.FC<CreateQuestProps> = ({
  isOpen,
  onClose,
  refreshQuests,
  initialData,
  isEdit = true, 
  user,
}) => {
  const [form, setForm] = useState(initialForm);
  const [showSuccess, setShowSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  // ✅ NUEVO: Estado para manejar la imagen del banner
  const [bannerData, setBannerData] = useState<{publicId: string; url: string} | null>(null);
  const [currentBannerUrl, setCurrentBannerUrl] = useState<string>("");

  useEffect(() => {
    if (initialData) {
      // Ensure all tasks are present in the form, defaulting to false if missing
      const allTasks = { ...initialForm.tasks };
      if (initialData.tasks) {
        for (const key in allTasks) {
          allTasks[key as keyof typeof allTasks] = Boolean(initialData.tasks[key as keyof typeof allTasks]);
        }
      }
      setForm({ ...initialForm, ...initialData, tasks: allTasks });

      // ✅ CONFIGURAR BANNER ACTUAL
      if (initialData.banner || initialData.bannerPublicId) {
        setCurrentBannerUrl(initialData.banner || "");
        if (initialData.bannerPublicId) {
          setBannerData({
            publicId: initialData.bannerPublicId,
            url: initialData.banner || ""
          });
        }
      } else {
        setCurrentBannerUrl("");
        setBannerData(null);
      }
    }
  }, [initialData, isOpen]);

  // Verifica si el quest ya empezó
  const questStarted = () => {
    if (!form.startDate || !form.startTime) return false;
    const startDateTime = new Date(`${form.startDate}T${form.startTime}`);
    return new Date() >= startDateTime;
  };

  function handleChange(e: any) {
    const { name, value, type, checked } = e.target;
    if (name in form.tasks) {
      setForm((prev: any) => ({
        ...prev,
        tasks: { ...prev.tasks, [name]: checked },
      }));
    } else {
      setForm((prev: any) => ({
        ...prev,
        [name]: type === "checkbox" ? checked : value,
      }));
    }
  }

  // ✅ NUEVO: Handler para cambio de imagen
  const handleImageUpload = (imageData: { publicId: string; url: string }) => {
    console.log("✅ New banner uploaded:", imageData);
    setBannerData(imageData);
    setCurrentBannerUrl(imageData.url);
  };

  // ✅ FUNCIÓN PARA BORRAR IMAGEN ANTIGUA DE CLOUDINARY
  const deleteOldBanner = async (publicId: string) => {
    try {
      const response = await fetch('/api/upload/banner/delete', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ publicId }),
      });

      if (!response.ok) {
        console.warn('⚠️ Could not delete old banner from Cloudinary');
      } else {
        console.log('✅ Old banner deleted from Cloudinary');
      }
    } catch (error) {
      console.warn('⚠️ Error deleting old banner:', error);
    }
  };

  const handleEditSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    if (questStarted()) {
      setError("You can't edit this quest because it has already started.");
      setLoading(false);
      return;
    }

    // ✅ INCLUIR DATOS DEL BANNER EN LA ACTUALIZACIÓN
    const questData = {
      questId: initialData?._id,
      userId: user?.id ?? "", 
      questName: form.questName,
      description: form.description,
      startDate: form.startDate,
      startTime: form.startTime,
      endDate: form.endDate,
      endTime: form.endTime,
      tasks: form.tasks,
      tweetLink: form.tweetLink,
      // ✅ AGREGAR DATOS DEL BANNER
      banner: bannerData?.url || currentBannerUrl || "",
      bannerPublicId: bannerData?.publicId || initialData?.bannerPublicId || "",
      // ✅ INDICAR SI SE CAMBIÓ EL BANNER
      bannerChanged: bannerData !== null && bannerData.publicId !== initialData?.bannerPublicId,
      oldBannerPublicId: initialData?.bannerPublicId || "",
    };
    console.log("✅ [EditQuest] Submitting quest data for user:", user?.email ?? "unknown");
    console.log("Submitting quest data:", questData);
    
    try {
      const res = await fetch("/api/quests/edit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(questData),
      });
      
      if (res.ok) {
        console.log("✅ Quest updated successfully");
        
        // ✅ SI SE CAMBIÓ EL BANNER, BORRAR EL ANTERIOR
        if (questData.bannerChanged && questData.oldBannerPublicId && questData.oldBannerPublicId !== questData.bannerPublicId) {
          console.log("🗑️ Deleting old banner:", questData.oldBannerPublicId);
          await deleteOldBanner(questData.oldBannerPublicId);
        }
        
        setShowSuccess(true);
        refreshQuests();
      } else {
        const errorData = await res.json();
        setError(errorData.error || "Error editing quest");
      }
    } catch (error) {
      console.error("❌ Error editing quest:", error);
      setError("Error editing quest");
    }
    setLoading(false);
  };

  if (!isOpen) return null;

  const rewardPool = parseDecimal128ToNumber(form.rewardPool);
  const formattedRewardPool = formatDecimalForDisplay(rewardPool);
  
  return (
    <div className="fixed inset-0 bg-[#000000] bg-opacity-60 flex justify-center items-end md:items-center z-50">
      {showSuccess && (
        <SuccessModal
          isOpen={showSuccess}
          onClose={() => {
            setShowSuccess(false);
            onClose();
          }}
          questName={form.questName}
          title="Quest Edited Successfully!"
          successMessage="Quest Successfully Edited!"
          infoMessage="Your quest changes are now live and visible to all community members. Participants can continue engaging!"
        />
      )}

      <form
        onSubmit={handleEditSubmit}
        className="bg-[#161618] w-[470px] max-h-[90vh] flex flex-col items-start justify-start gap-6 border border-[#44444A] rounded-2xl shadow-[0px_2px_10px_-3px_rgba(0,0,0,0)]"
        style={{
          boxShadow: "0px -5px 10px 0px #FFFFFF1A inset",
          scrollbarWidth: "none",
          msOverflowStyle: "none",
        }}
      >
        <div className="w-full p-8 border-b border-[#44444A] flex items-center justify-between">
          <h3 className="text-[1.8rem] text-white font-semibold">Edit Quest</h3>
          <button
            type="button"
            onClick={onClose}
            className="text-white text-2xl"
          >
            ×
          </button>
        </div>

        <div className="w-full flex flex-col items-start justify-start gap-6 px-8 overflow-y-auto overflow-x-hidden">
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
              required
              disabled={questStarted()}
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
              required
              disabled={questStarted()}
            />
          </div>

          {/* ✅ AGREGAR BANNER UPLOAD */}
          <div className="w-full">
            <BannerUpload 
              onImageUpload={handleImageUpload}
              currentImage={currentBannerUrl}
              disabled={questStarted() || loading}
            />
            {questStarted() && (
              <p className="text-[#ACB5BB] text-sm mt-2">
                Banner cannot be changed after quest starts
              </p>
            )}
          </div>

          {/* Tweet Link */}
          <div className="w-full flex flex-col items-start justify-start gap-2">
            <h6 className="text-[1.2rem] text-[#ACB5BB] font-normal">
              Tweet Link
            </h6>
            <input
              name="tweetLink"
              value={form.tweetLink || ""}
              onChange={handleChange}
              placeholder="https://x.com/username/status/123456789"
              className="w-full py-5 px-5 bg-[#2C2C30] border border-[#44444A] rounded-xl text-[1.4rem] text-[#6C7278] font-normal"
              disabled={questStarted()}
            />
            <p className="text-[#ACB5BB] text-sm">
              Link to the tweet that participants need to interact with
            </p>
          </div>

          {/* Start Date & Time */}
          <div className="w-full flex flex-col gap-2">
            <h6 className="text-[1.2rem] text-[#ACB5BB] font-normal">
              Start Date & Time
            </h6>
            <input
              name="startDate"
              value={form.startDate}
              onChange={handleChange}
              type="date"
              className="w-full py-3 px-4 bg-[#2C2C30] border border-[#44444A] rounded-xl text-[1.3rem] text-[#6C7278] font-normal outline-none"
              required
              disabled={questStarted()}
            />
            <input
              name="startTime"
              value={form.startTime}
              onChange={handleChange}
              type="time"
              step="1"
              className="w-full py-3 px-4 bg-[#2C2C30] border border-[#44444A] rounded-xl text-[1.3rem] text-[#6C7278] font-normal outline-none"
              required
              disabled={questStarted()}
            />
          </div>

          {/* End Date & Time */}
          <div className="w-full flex flex-col gap-2">
            <h6 className="text-[1.2rem] text-[#ACB5BB] font-normal">
              End Date & Time
            </h6>
            <input
              name="endDate"
              value={form.endDate}
              onChange={handleChange}
              type="date"
              className="w-full py-3 px-4 bg-[#2C2C30] border border-[#44444A] rounded-xl text-[1.3rem] text-[#6C7278] font-normal outline-none"
              required
              disabled={questStarted()}
            />
            <input
              name="endTime"
              value={form.endTime}
              onChange={handleChange}
              type="time"
              step="1"
              className="w-full py-3 px-4 bg-[#2C2C30] border border-[#44444A] rounded-xl text-[1.3rem] text-[#6C7278] font-normal outline-none"
              required
              disabled={questStarted()}
            />
          </div>

          {/* Tasks - Use TaskSelector.tsx config and UI for full consistency */}
                   
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
            {/* Grid of tasks - identical to TaskSelector.tsx */}
            <div className="grid grid-cols-1 gap-3 w-full">
              {require('@/components/ui/TaskSelector').TASK_CONFIG.map((task: any) => {
                const isSelected = form.tasks[task.key as keyof typeof form.tasks] || false;
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
                      disabled={isEdit && questStarted()}
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
            <p className="text-[#ACB5BB] text-sm mt-2">
              Select the tasks that participants need to complete
            </p>
          </div>

          {/* Campos bloqueados */}
          <div className="w-full flex flex-col items-start justify-start gap-2 opacity-60">
            <h6 className="text-[1.2rem] text-[#ACB5BB] font-normal">
              Max Participants
            </h6>
            <input
              name="maxParticipants"
              value={form.maxParticipants}
              type="number"
              min={1}
              className="w-full py-5 px-5 bg-[#23232A] border border-[#44444A] rounded-xl text-[1.4rem] text-[#6C7278] font-normal"
              disabled
            />
            <h6 className="text-[1.2rem] text-[#ACB5BB] font-normal mt-2">
              Reward Pool
            </h6>
            <input
              name="rewardPool"
              value={formattedRewardPool}
              className="w-full py-5 px-5 bg-[#23232A] border border-[#44444A] rounded-xl text-[1.4rem] text-[#6C7278] font-normal"
              disabled
            />
            <p className="text-[#ACB5BB] text-xs mt-1">
              These fields cannot be edited to maintain quest integrity
            </p>
          </div>
        </div>
        
        <div className="w-full border-t border-[#44444A] p-8">
          <ButtonBorder
            text={loading ? "Saving..." : "Save Changes"}
            onClick={handleEditSubmit}
            disabled={loading || questStarted()}
            type="button"
          />
          {error && <div className="text-red-500 mt-2">{error}</div>}
        </div>
      </form>
    </div>
  );
};

export default EditQuest;