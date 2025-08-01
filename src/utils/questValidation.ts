import toast from "react-hot-toast";
import type { User } from "@/types/quest";

// ============================================================================
// TYPES
// ============================================================================
export interface QuestFormData {
  questName: string;
  description: string;
  tweetLink: string;
  authorId: string;
  maxParticipants: string;
  rewardPool: string;
  startDate: string;
  startTime: string;
  endDate: string;
  endTime: string;
  tasks: Record<string, boolean>;
}

export interface ValidationResult {
  isValid: boolean;
  errors: string[];
}

// ============================================================================
// VALIDATION RULES
// ============================================================================
export const VALIDATION_RULES = {
  questName: {
    minLength: 3,
    maxLength: 100,
    pattern: /^[a-zA-Z0-9\s\-_.,!?()]+$/,
  },
  description: {
    minLength: 10,
    maxLength: 500,
  },
  tweetLink: {
    pattern: /^https?:\/\/(twitter\.com|x\.com)\/\w+\/status\/\d+/,
  },
  maxParticipants: {
    min: 1,
    max: 10000,
  },
  rewardPool: {
    min: 0.001,
    max: 1000,
  },
  quest: {
    minDurationMinutes: 30,
    maxDurationDays: 30,
  }
};

// ============================================================================
// INDIVIDUAL FIELD VALIDATORS
// ============================================================================

/**
 * Validar nombre del quest
 */
export const validateQuestName = (questName: string): string[] => {
  const errors: string[] = [];
  
  if (!questName.trim()) {
    errors.push("Quest name is required");
    return errors;
  }
  
  if (questName.length < VALIDATION_RULES.questName.minLength) {
    errors.push(`Quest name must be at least ${VALIDATION_RULES.questName.minLength} characters`);
  }
  
  if (questName.length > VALIDATION_RULES.questName.maxLength) {
    errors.push(`Quest name cannot exceed ${VALIDATION_RULES.questName.maxLength} characters`);
  }
  
  if (!VALIDATION_RULES.questName.pattern.test(questName)) {
    errors.push("Quest name contains invalid characters");
  }
  
  return errors;
};

/**
 * Validar descripción
 */
export const validateDescription = (description: string): string[] => {
  const errors: string[] = [];
  
  if (!description.trim()) {
    errors.push("Description is required");
    return errors;
  }
  
  if (description.length < VALIDATION_RULES.description.minLength) {
    errors.push(`Description must be at least ${VALIDATION_RULES.description.minLength} characters`);
  }
  
  if (description.length > VALIDATION_RULES.description.maxLength) {
    errors.push(`Description cannot exceed ${VALIDATION_RULES.description.maxLength} characters`);
  }
  
  return errors;
};

/**
 * Validar enlace de tweet
 */
export const validateTweetLink = (tweetLink: string, authorId: string): string[] => {
  const errors: string[] = [];
  
  if (!tweetLink.trim()) {
    errors.push("Tweet link is required");
    return errors;
  }
  
  if (!VALIDATION_RULES.tweetLink.pattern.test(tweetLink)) {
    errors.push("Please enter a valid Twitter/X post URL");
  }
  
  if (!authorId) {
    errors.push("Could not detect tweet author - please check the link");
  }
  
  return errors;
};

/**
 * Validar participantes máximos
 */
export const validateMaxParticipants = (maxParticipants: string): string[] => {
  const errors: string[] = [];
  
  if (!maxParticipants.trim()) {
    errors.push("Maximum participants is required");
    return errors;
  }
  
  const num = parseInt(maxParticipants);
  
  if (isNaN(num)) {
    errors.push("Maximum participants must be a valid number");
    return errors;
  }
  
  if (num < VALIDATION_RULES.maxParticipants.min) {
    errors.push(`Minimum ${VALIDATION_RULES.maxParticipants.min} participant required`);
  }
  
  if (num > VALIDATION_RULES.maxParticipants.max) {
    errors.push(`Maximum ${VALIDATION_RULES.maxParticipants.max} participants allowed`);
  }
  
  return errors;
};

/**
 * Validar pool de recompensas
 */
export const validateRewardPool = (rewardPool: string): string[] => {
  const errors: string[] = [];
  
  if (!rewardPool.trim()) {
    errors.push("Reward pool is required");
    return errors;
  }
  
  const num = parseFloat(rewardPool);
  
  if (isNaN(num)) {
    errors.push("Reward pool must be a valid number");
    return errors;
  }
  
  if (num < VALIDATION_RULES.rewardPool.min) {
    errors.push(`Minimum reward pool is ${VALIDATION_RULES.rewardPool.min} SOL`);
  }
  
  if (num > VALIDATION_RULES.rewardPool.max) {
    errors.push(`Maximum reward pool is ${VALIDATION_RULES.rewardPool.max} SOL`);
  }
  
  return errors;
};

/**
 * Validar fechas y horarios
 */
export const validateDateTime = (
  startDate: string,
  startTime: string,
  endDate: string,
  endTime: string
): string[] => {
  const errors: string[] = [];
  
  // Verificar campos requeridos
  if (!startDate) errors.push("Start date is required");
  if (!startTime) errors.push("Start time is required");
  if (!endDate) errors.push("End date is required");
  if (!endTime) errors.push("End time is required");
  
  if (errors.length > 0) return errors;
  
  const now = new Date();
  const startDateTime = new Date(`${startDate}T${startTime}`);
  const endDateTime = new Date(`${endDate}T${endTime}`);
  
  // Verificar fechas válidas
  if (isNaN(startDateTime.getTime())) {
    errors.push("Invalid start date/time");
  }
  
  if (isNaN(endDateTime.getTime())) {
    errors.push("Invalid end date/time");
  }
  
  if (errors.length > 0) return errors;
  
  // Verificar que start date no sea en el pasado (con margen de 5 minutos)
  const fiveMinutesFromNow = new Date(now.getTime() + 5 * 60 * 1000);
  if (startDateTime < fiveMinutesFromNow) {
    errors.push("Start date must be at least 5 minutes in the future");
  }
  
  // Verificar que end date sea después de start date
  if (endDateTime <= startDateTime) {
    errors.push("End date must be after start date");
  }
  
  // Verificar duración mínima
  const durationMinutes = (endDateTime.getTime() - startDateTime.getTime()) / (1000 * 60);
  if (durationMinutes < VALIDATION_RULES.quest.minDurationMinutes) {
    errors.push(`Quest must last at least ${VALIDATION_RULES.quest.minDurationMinutes} minutes`);
  }
  
  // Verificar duración máxima
  const durationDays = durationMinutes / (60 * 24);
  if (durationDays > VALIDATION_RULES.quest.maxDurationDays) {
    errors.push(`Quest cannot last more than ${VALIDATION_RULES.quest.maxDurationDays} days`);
  }
  
  return errors;
};

/**
 * Validar tasks seleccionados
 */
export const validateTasks = (tasks: Record<string, boolean>): string[] => {
  const errors: string[] = [];
  
  const selectedTasks = Object.values(tasks).filter(Boolean);
  
  if (selectedTasks.length === 0) {
    errors.push("Please select at least one task");
  }
  
  if (selectedTasks.length > 5) {
    errors.push("Maximum 5 tasks can be selected");
  }
  
  return errors;
};

/**
 * Validar autenticación de usuario
 */
export const validateUser = (user: User | null): string[] => {
  const errors: string[] = [];
  
  if (!user) {
    errors.push("User not authenticated");
    return errors;
  }
  
  if (!user.id) {
    errors.push("Invalid user session");
  }
  
  if (!user.email) {
    errors.push("User email not found");
  }
  
  return errors;
};

// ============================================================================
// MAIN VALIDATION FUNCTION
// ============================================================================

/**
 * Validar todo el formulario de quest
 */
export const validateQuestForm = async (
  form: QuestFormData,
  user: User | null
): Promise<ValidationResult> => {
  const allErrors: string[] = [];
  
  // ✅ Validar usuario
  allErrors.push(...validateUser(user));
  
  // ✅ Validar campos básicos
  allErrors.push(...validateQuestName(form.questName));
  allErrors.push(...validateDescription(form.description));
  allErrors.push(...validateTweetLink(form.tweetLink, form.authorId));
  allErrors.push(...validateMaxParticipants(form.maxParticipants));
  allErrors.push(...validateRewardPool(form.rewardPool));
  
  // ✅ Validar fechas
  allErrors.push(...validateDateTime(
    form.startDate,
    form.startTime,
    form.endDate,
    form.endTime
  ));
  
  // ✅ Validar tasks
  allErrors.push(...validateTasks(form.tasks));
  
  return {
    isValid: allErrors.length === 0,
    errors: allErrors
  };
};

// ============================================================================
// VALIDATION WITH TOAST NOTIFICATIONS
// ============================================================================

/**
 * Validar y mostrar errores con toast
 */
export const validateQuestFormWithToast = async (
  form: QuestFormData,
  user: User | null
): Promise<boolean> => {
  const result = await validateQuestForm(form, user);
  
  if (!result.isValid) {
    // Mostrar solo el primer error para mejor UX
    toast.error(`❌ ${result.errors[0]}`);
    
    // Log todos los errores para debugging
    console.error('❌ [QuestValidation] Validation errors:', result.errors);
    
    return false;
  }
  
  console.log('✅ [QuestValidation] All validations passed');
  return true;
};

// ============================================================================
// REAL-TIME VALIDATION HELPERS
// ============================================================================

/**
 * Validación en tiempo real para un campo específico
 */
export const validateFieldRealTime = (
  fieldName: keyof QuestFormData,
  value: string | Record<string, boolean>,
  form?: Partial<QuestFormData>
): string[] => {
  switch (fieldName) {
    case 'questName':
      return validateQuestName(value as string);
    case 'description':
      return validateDescription(value as string);
    case 'tweetLink':
      return validateTweetLink(value as string, form?.authorId || '');
    case 'maxParticipants':
      return validateMaxParticipants(value as string);
    case 'rewardPool':
      return validateRewardPool(value as string);
    case 'tasks':
      return validateTasks(value as Record<string, boolean>);
    default:
      return [];
  }
};

/**
 * Obtener estado de validación para UI
 */
export const getFieldValidationState = (
  fieldName: keyof QuestFormData,
  value: string | Record<string, boolean>,
  form?: Partial<QuestFormData>
): 'valid' | 'invalid' | 'neutral' => {
  if (!value || (typeof value === 'string' && !value.trim())) {
    return 'neutral';
  }
  
  const errors = validateFieldRealTime(fieldName, value, form);
  return errors.length === 0 ? 'valid' : 'invalid';
};