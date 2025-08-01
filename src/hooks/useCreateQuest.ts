// REEMPLAZAR COMPLETAMENTE: c:\Users\Lian Li\Desktop\FrontEnd_Solcial\solcial\src\hooks\useCreateQuest.ts

import { useState, useCallback } from "react";
import { questAPI } from "@/app/clientAPI/questAPI";
import toast from "react-hot-toast";

// Types
import type { User } from "@/types/quest";

interface UseCreateQuestProps {
  initialForm: any;
  onClose: () => void;
  user: User | null; // ✅ USUARIO REAL
  refreshQuests: () => void;
  isEdit?: boolean;
}

export function useCreateQuest({
  initialForm,
  onClose,
  user, // ✅ USUARIO REAL COMO PARÁMETRO
  refreshQuests,
  isEdit = false,
}: UseCreateQuestProps) {
  // ============================================================================
  // STATE
  // ============================================================================
  const [form, setForm] = useState(initialForm);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // ============================================================================
  // FORM HANDLERS
  // ============================================================================
  const handleChange = useCallback((
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    
    // ✅ HANDLE TASK CHECKBOXES
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
      // ✅ HANDLE REGULAR INPUTS
      setForm((prev: any) => ({
        ...prev,
        [name]: value,
      }));
    }
  }, []);

  // ============================================================================
  // CALCULATIONS
  // ============================================================================
  const calculateRewardPerTask = useCallback(() => {
    const pool = parseFloat(form.rewardPool);
    const participants = parseInt(form.maxParticipants, 10);
    
    if (!isNaN(pool) && !isNaN(participants) && participants > 0) {
      return (pool / participants).toFixed(6);
    }
    return "0.000000";
  }, [form.rewardPool, form.maxParticipants]);

  // ============================================================================
  // VALIDATION
  // ============================================================================
  const validateForm = useCallback(() => {
    const errors: string[] = [];

    // ✅ USER VALIDATION
    if (!user?.id) {
      errors.push("User authentication required");
    }

    // ✅ BASIC FIELDS
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

    // ✅ NUMERIC VALIDATIONS
    const maxParticipants = parseInt(form.maxParticipants, 10);
    if (isNaN(maxParticipants) || maxParticipants < 1) {
      errors.push("Max participants must be at least 1");
    }

    const rewardPool = parseFloat(form.rewardPool);
    if (isNaN(rewardPool) || rewardPool <= 0) {
      errors.push("Reward pool must be greater than 0");
    }

    // ✅ DATE VALIDATIONS
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

    // ✅ TASKS VALIDATION
    const selectedTasks = Object.values(form.tasks || {}).filter(Boolean);
    if (selectedTasks.length === 0) {
      errors.push("At least one task must be selected");
    }

    return errors;
  }, [form, user]);

  // ============================================================================
  // SUBMIT HANDLER
  // ============================================================================
  const handleSubmit = useCallback(async (questData: any) => {
    console.log(`🚀 [useCreateQuest] Starting ${isEdit ? 'update' : 'creation'} process...`);
    
    setLoading(true);
    setError(null);

    try {
      // ✅ VALIDATE USER
      if (!user?.id) {
        throw new Error("User authentication required");
      }

      // ✅ VALIDATE FORM
      const validationErrors = validateForm();
      if (validationErrors.length > 0) {
        throw new Error(validationErrors.join(", "));
      }

      console.log(`✅ [useCreateQuest] Validation passed for user: ${user.email}`);

      // ✅ PREPARE QUEST DATA
      const payload = {
        ...questData,
        userId: user.id, // ✅ USER REAL
        authorId: form.authorId, // ✅ TWITTER AUTHOR ID
        createdBy: user.email, // ✅ AUDIT TRAIL
        ...(isEdit && questData._id && { _id: questData._id }),
      };

      console.log(`📤 [useCreateQuest] Sending payload:`, {
        questName: payload.questName,
        userId: payload.userId,
        authorId: payload.authorId,
        isEdit,
      });

      // ✅ CALL API
      let result;
      if (isEdit) {
        result = await questAPI.updateQuest(questData._id, payload);
      } else {
        result = await questAPI.createQuest(payload);
      }

      if (result) {
        console.log(`✅ [useCreateQuest] Quest ${isEdit ? 'updated' : 'created'} successfully`);
        
        toast.success(
          isEdit 
            ? "Quest updated successfully!" 
            : "Quest created successfully!"
        );

        // ✅ REFRESH DATA
        refreshQuests();

        // ✅ CLOSE MODAL
        if (isEdit) {
          onClose();
        }

        return "success";
      } else {
        throw new Error(`Failed to ${isEdit ? 'update' : 'create'} quest`);
      }

    } catch (err: any) {
      const errorMessage = err.message || `Error ${isEdit ? 'updating' : 'creating'} quest`;
      console.error(`❌ [useCreateQuest] Error:`, errorMessage);
      
      setError(errorMessage);
      toast.error(errorMessage);
      
      return "error";
    } finally {
      console.log(`🔄 [useCreateQuest] Process completed`);
      setLoading(false);
    }
  }, [user, form, isEdit, validateForm, refreshQuests, onClose]);

  // ============================================================================
  // RESET FORM
  // ============================================================================
  const resetForm = useCallback(() => {
    console.log('🔄 [useCreateQuest] Resetting form');
    setForm(initialForm);
    setError(null);
  }, [initialForm]);

  // ============================================================================
  // FORM STATUS
  // ============================================================================
  const isFormValid = useCallback(() => {
    return validateForm().length === 0;
  }, [validateForm]);

  const getFormErrors = useCallback(() => {
    return validateForm();
  }, [validateForm]);

  // ============================================================================
  // RETURN
  // ============================================================================
  return {
    // ✅ FORM STATE
    form,
    setForm,
    loading,
    error,

    // ✅ HANDLERS
    handleChange,
    handleSubmit,
    resetForm,

    // ✅ UTILITIES
    calculateRewardPerTask,
    isFormValid,
    getFormErrors,

    // ✅ STATUS
    isReady: !!user?.id,
    userEmail: user?.email,
  };
}