import { useState, useCallback } from "react";
import { questAPI } from "@/app/clientAPI/questAPI";
import toast from "react-hot-toast";
import type { User } from "@/types/quest";

//this is a custom hook for creating and editing quests in the Solcial app
//it handles form state, validation, submission, and error handling
//it can be used for both creating new quests and editing existing ones
//this hook is used in the CreateQuest component
interface UseCreateQuestProps {
  initialForm: any;
  onClose: () => void;
  user: User | null;
  refreshQuests: () => void;
  isEdit?: boolean;
}

export function useCreateQuest({
  initialForm,
  onClose,
  user,
  refreshQuests,
  isEdit = false,
}: UseCreateQuestProps) {
  const [form, setForm] = useState(initialForm);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const { name, value } = e.target;
      if (
        name === "like" ||
        name === "retweet" ||
        name === "comment" ||
        name === "follow" ||
        name === "quote"
      ) {
        const checked = (e.target as HTMLInputElement).checked;
        setForm((prev: any) => ({
          ...prev,
          tasks: { ...prev.tasks, [name]: checked },
        }));
      } else {
        setForm((prev: any) => ({
          ...prev,
          [name]: value,
        }));
      }
    },
    []
  );
  const calculateRewardPerTask = useCallback(() => {
    const pool = parseFloat(form.rewardPool);
    const participants = parseInt(form.maxParticipants, 10);

    if (!isNaN(pool) && !isNaN(participants) && participants > 0) {
      return (pool / participants).toFixed(6);
    }
    return "0.000000";
  }, [form.rewardPool, form.maxParticipants]);

  const validateForm = useCallback(() => {
    const errors: string[] = [];
    if (!user?.id) {
      errors.push("User authentication required");
    }
    if (!form.questName?.trim()) {
      errors.push("Quest name is required");
    }

    if (!form.description?.trim()) {
      errors.push("Description is required");
    }

    if (!form.tweetLink?.trim()) {
      errors.push("Tweet link is required");
    }

    if (!form.authorId?.trim()) {
      errors.push("Invalid tweet link - could not detect author");
    }

    const maxParticipants = parseInt(form.maxParticipants, 10);
    if (isNaN(maxParticipants) || maxParticipants < 1) {
      errors.push("Max participants must be at least 1");
    }

    const rewardPool = parseFloat(form.rewardPool);
    if (isNaN(rewardPool) || rewardPool <= 0) {
      errors.push("Reward pool must be greater than 0");
    }

    if (!form.startDate || !form.startTime) {
      errors.push("Start date and time are required");
    }

    if (!form.endDate || !form.endTime) {
      errors.push("End date and time are required");
    }

    if (form.startDate && form.startTime && form.endDate && form.endTime) {
      const startDateTime = new Date(`${form.startDate}T${form.startTime}`);
      const endDateTime = new Date(`${form.endDate}T${form.endTime}`);
      const now = new Date();

      if (startDateTime <= now) {
        errors.push("Start date must be in the future");
      }

      if (endDateTime <= startDateTime) {
        errors.push("End date must be after start date");
      }
    }
    const selectedTasks = Object.values(form.tasks || {}).filter(Boolean);
    if (selectedTasks.length === 0) {
      errors.push("At least one task must be selected");
    }

    return errors;
  }, [form, user]);

  const handleSubmit = useCallback(
    async (questData: any) => {
      setLoading(true);
      setError(null);

      try {
        if (!user?.id) {
          throw new Error("User authentication required");
        }
        const validationErrors = validateForm();
        if (validationErrors.length > 0) {
          throw new Error(validationErrors.join(", "));
        }
        // Prepare payload
        const payload = {
          ...questData,
          userId: user.id,
          authorId: form.authorId,
          createdBy: user.email,
          ...(isEdit && questData._id && { _id: questData._id }),
        };

        console.log(`📤 [useCreateQuest] Sending payload:`, {
          questName: payload.questName,
          userId: payload.userId,
          authorId: payload.authorId,
          isEdit,
        });

        let result;
        if (isEdit) {
          result = await questAPI.updateQuest(questData._id, payload);
        } else {
          result = await questAPI.createQuest(payload);
        }
        if (result) {
          toast.success(
            isEdit
              ? "Quest updated successfully!"
              : "Quest created successfully!"
          );
          refreshQuests();
          if (isEdit) {
            onClose();
          }

          return "success";
        } else {
          throw new Error(`Failed to ${isEdit ? "update" : "create"} quest`);
        }
      } catch (err: any) {
        const errorMessage =
          err.message || `Error ${isEdit ? "updating" : "creating"} quest`;

        setError(errorMessage);
        toast.error(errorMessage);

        return "error";
      } finally {
        setLoading(false);
      }
    },
    [user, form, isEdit, validateForm, refreshQuests, onClose]
  );

  const resetForm = useCallback(() => {
    setForm(initialForm);
    setError(null);
  }, [initialForm]);

  const isFormValid = useCallback(() => {
    return validateForm().length === 0;
  }, [validateForm]);

  const getFormErrors = useCallback(() => {
    return validateForm();
  }, [validateForm]);

  return {
    form,
    setForm,
    loading,
    error,
    handleChange,
    handleSubmit,
    resetForm,
    calculateRewardPerTask,
    isFormValid,
    getFormErrors,
    isReady: !!user?.id,
    userEmail: user?.email,
  };
}
