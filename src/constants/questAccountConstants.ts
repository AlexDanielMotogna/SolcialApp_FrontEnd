export const QUEST_ACCOUNT_MESSAGES = {
  CLAIM_SUCCESS: "Reward claimed successfully!",
  CLAIM_ERROR: "Failed to claim reward. Please try again.",
  CANCEL_SUCCESS: "Quest canceled successfully!",
  CANCEL_ERROR: "Failed to cancel quest. Please try again.",
  EDIT_SUCCESS: "Quest updated successfully!",
  EDIT_ERROR: "Failed to update quest. Please try again.",
  QUEST_STARTED: "You can't edit this quest because it has already started.",
  LOADING_CREATED: "Loading your created quests...",
  LOADING_COMPLETED: "Loading completed quests...",
  NO_CREATED_QUESTS: "You haven't created any quests yet.",
  NO_COMPLETED_QUESTS: "You haven't completed any quests yet.",
  CONFIRM_CANCEL: "Are you sure you want to cancel this quest?",
  CANCEL_WARNING: "This action cannot be undone. All participants will be notified.",
} as const;

export const QUEST_ACCOUNT_TABS = [
  { id: "created", label: "My Created Quests", icon: "📝" },
  { id: "completed", label: "Completed Quests", icon: "✅" },
] as const;

export const QUEST_ACTIONS = {
  EDIT: "edit",
  CANCEL: "cancel",
  VIEW: "view",
  CLAIM: "claim",
} as const;