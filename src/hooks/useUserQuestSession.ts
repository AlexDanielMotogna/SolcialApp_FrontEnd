import { useEffect, useState } from "react";
import { fetchUserQuestSession } from "@/utils/questApi";

export function useUserQuestSession(isOpen: boolean, user: any, questId: string | null) {
  const [userQuest, setUserQuest] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!isOpen || !questId || !user?.id || !user?.walletAdress) return;
    setLoading(true);
    fetchUserQuestSession(user.id, user.walletAdress, questId)
      .then(data => {
        setUserQuest(data?.userQuest || null);
        setLoading(false);
      })
      .catch(() => {
        setUserQuest(null);
        setLoading(false);
      });
  }, [isOpen, questId, user?.id, user?.walletAdress]);

  return { userQuest, loading, setUserQuest };
}