import { useState, useEffect } from "react";

export const useUserQuests = (userId?: string) => {
  const [userQuests, setUserQuests] = useState<any[]>([]);
  const [loadingUserQuests, setLoadingUserQuests] = useState(true);

  const fetchUserQuests = async () => {
    if (!userId) return;

    try {
      const res = await fetch(`/api/user-quests/allUserQuests?userId=${userId}`);
      const data = await res.json();
      setUserQuests(data.userQuests || []);
    } catch (err) {
      setUserQuests([]);
    } finally {
      setLoadingUserQuests(false);
    }
  };

  const refreshUserQuests = async () => {
    await fetchUserQuests();
  };

  useEffect(() => {
    if (userId) {
      fetchUserQuests();
    }
  }, [userId]);

  return {
    userQuests,
    loadingUserQuests,
    fetchUserQuests,
    refreshUserQuests,
  };
};