// MODIFICAR: c:\Users\Lian Li\Desktop\FrontEnd_Solcial\solcial\src\components\modals\EditQuest.tsx

import { initialForm } from "./CreateQuest";
import { CreateQuestProps } from "./CreateQuest";
import ButtonBorder from "../../components/ButtonBorder";
import BannerUpload from "../BannerUpload"; // ✅ AGREGAR IMPORT
import { useState, useEffect } from "react";
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
      setForm({ ...initialForm, ...initialData });
      
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
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-60">
          <div className="bg-[#18181b] p-8 rounded-2xl shadow-xl flex flex-col items-center">
            <h2 className="text-2xl font-bold text-green-400 mb-4">
              Quest Edited!
            </h2>
            <p className="text-white mb-6">
              Your quest was edited successfully.
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

        <div className="w-full flex flex-col items-start justify-start gap-6 px-8 overflow-y-auto">
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

          {/* Tasks */}
          <div className="w-full flex flex-col items-start justify-start gap-2">
            <h6 className="text-[1.2rem] text-[#ACB5BB] font-normal">Tasks</h6>
            <div className="flex flex-col gap-2 w-full">
              {ALL_AVAILABLE_TASKS.map((task) => (
                <label
                  key={task.key}
                  className="flex items-center gap-2 text-[1.4rem] text-[#EDF1F3]"
                >
                  <input
                    type="checkbox"
                    name={task.key}
                    checked={
                      form.tasks[task.key as keyof typeof form.tasks] || false
                    }
                    onChange={handleChange}
                    className="accent-[#9945FF] w-5 h-5"
                    disabled={questStarted()}
                  />
                  {task.label}
                </label>
              ))}
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