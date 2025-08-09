export const QUEST_FILTERS = [
  { label: "Active", value: "active" },
  { label: "finished", value: "finished" },
  { label: "Canceled", value: "canceled" },
  { label: "Oldest", value: "oldest" },
  { label: "Newest", value: "newest" },
  { label: "Biggest Reward", value: "biggest" },
  { label: "Lowest Reward", value: "lowest" },
];

export const QUEST_STATUS = {
  ACTIVE: "active",
  FINISHED: "finished",
  CANCELED: "canceled",
} as const;

export const TWITTER_AUTH_MESSAGES = {
  SUCCESS: "Twitter connected successfully!",
  ERROR: "Failed to connect Twitter. Please try again.",
  USER_NOT_FOUND: "User not found. Please contact support.",
  OAUTH_ERROR: "Twitter authentication failed. Please try again.",
} as const;

export const QUEST_MESSAGES = {
  JOIN_SUCCESS: "Successfully joined quest:",
  ALREADY_ACTIVE: "You already have this quest active!",
  SESSION_EXPIRED: "Quest session expired:",
  NO_SPOTS: "No spots available.",
  QUEST_CANCELED: "This quest has been canceled.",
  WALLET_REQUIRED: "Please connect your wallet first to participate in quests",
  USER_NOT_FOUND: "User not found",
} as const;