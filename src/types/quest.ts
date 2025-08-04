
//interface Quest and UserQuest types for a quest management system
export interface Quest {
  _id: string;
  questName: string;
  status: 'active' | 'finished' | 'canceled';
  startDateTime: string;
  endDateTime: string;
  maxParticipants: number;
  actualParticipants: number;
  tasks: QuestTask[];
  repeatable: boolean;
  banner?: string;
  bannerPublicId?: string;
  [key: string]: any;
}

export interface UserQuest {
  _id: string;
  questId: string;
  userId: string;
  walletaddress: string;
  status: 'active' | 'finished' | 'expired';
  completedTasks: Record<string, boolean>;
  rewardClaimed: boolean;
  sessionExpiresAt?: string;
  [key: string]: any;
}

export interface User {
  id: string;
  email: string;
  name: string;
  walletaddress?: string; // ✅ Make optional to match AuthUser
  hasTwitterAccess?: boolean; // ✅ Make optional to match AuthUser
  isVerified?: boolean;
  avatar?: string;
  twitter_id?: string;
  twitter_handle?: string;
  twitterScreenName?: string;
  twitterUserId?: string;
  phone?: string;
  [key: string]: any;
}

export interface QuestTask {
  id: string;
  type: string;
  description: string;
  completed: boolean;
  [key: string]: any;
}

export interface QuestButtonProps {
  text: string;
  disabled: boolean;
}

export interface QuestStats {
  questsCompleted: number;
  rewardEarned: number;
}