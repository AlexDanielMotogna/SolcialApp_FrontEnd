import { useEffect, useState } from "react";
import { fetchUserQuestSession } from "@/utils/questApi";
// Custom hook to manage user quest session
// This hook is used in the UserQuestSession component to fetch and manage the user's quest session data
// It handles fetching the user quest session when the modal is opened and provides loading state management
export function useUserQuestSession(
  isOpen: boolean,
  user: any,
  questId: string | null
) {
  const [userQuest, setUserQuest] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!isOpen || !questId || !user?.id || !user?.walletaddress) return;
    setLoading(true);
    fetchUserQuestSession(user.id, user.walletaddress, questId)
      .then((data) => {
        setUserQuest(data?.userQuest || null);
        setLoading(false);
      })
      .catch(() => {
        setUserQuest(null);
        setLoading(false);
      });
  }, [isOpen, questId, user?.id, user?.walletaddress]);

  return { userQuest, loading, setUserQuest };
}
