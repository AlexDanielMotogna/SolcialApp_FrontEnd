export async function fetchQuest(questId: string) {
  const res = await fetch(`/api/quests/${questId}`);
  if (!res.ok) throw new Error("Quest not found");
  return res.json();
}

export async function fetchUserQuestSession(userId: string, walletAdress: string, questId: string) {
  const res = await fetch(`/api/user-quests/by-user?userId=${userId}&walletAdress=${walletAdress}&questId=${questId}`);
  if (!res.ok) return null;
  return res.json();
}

export async function fetchCreatedQuests(userId: string) {
  const res = await fetch(`/api/quests/created?userId=${userId}`);
  const data = await res.json();
  return data.quests;
}

export async function fetchCompletedQuests(userId: string) {
  const res = await fetch(`/api/quests/completed?userId=${userId}`);
  const data = await res.json();
  return data.quests;
}
