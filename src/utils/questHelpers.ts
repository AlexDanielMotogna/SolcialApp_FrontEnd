export interface Quest {
  status: string;
  rewardPool: number;
  maxParticipants: number;
  participants?: number;
  startDateTime?: string;
  endDateTime?: string;
  tasks?: Record<string, boolean>;
  questName?: string;
  description?: string;
  twitterId?: string;
  _id?: string;
}

export interface UserQuest {
  status: string;
  completedTasks: Record<string, boolean>;
  rewardClaimed?: boolean;
  sessionExpiresAt?: string;
  quest?: Quest;
  questId?: string;
  twitterId?: string;
  _id?: string;
}

export function getQuestStatus(quest: Quest) {
  return quest.status === "finished" || quest.status === "canceled";
}

export function getRewardPerUser(quest: Quest) {
  return quest.maxParticipants > 0
    ? quest.rewardPool / quest.maxParticipants
    : 0;
}

export function getRequiredTasks(quest: Quest): string[] {
  return quest.tasks ? Object.keys(quest.tasks) : [];
}

export function getIncompleteRequiredTasks(
  quest: Quest,
  userQuest: UserQuest | null
): string[] {
  const requiredTasks = getRequiredTasks(quest);
  return requiredTasks.filter((task) => !userQuest?.completedTasks?.[task]);
}

export function formatDate(dateString: string) {
  if (!dateString) return "";
  const date = new Date(dateString);
  return date.toLocaleString("es-ES", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}
