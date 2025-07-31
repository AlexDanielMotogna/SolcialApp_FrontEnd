import { useState, useEffect } from "react";
import toast from "react-hot-toast";

export const useQuestAccount = (userId?: string) => {
  const [createdQuests, setCreatedQuests] = useState<any[]>([]);
  const [completedUserQuests, setCompletedUserQuests] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  const fetchCreatedQuests = async (userId: string) => {
    try {
      const response = await fetch(`/api/quests/created?userId=${userId}`);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to fetch created quests");
      }

      return data.quests || [];
    } catch (error) {
      console.error("Error fetching created quests:", error);
      toast.error("Error loading created quests");
      return [];
    }
  };

  const fetchCompletedUserQuests = async (userId: string) => {
    try {
      const response = await fetch(`/api/user-quests/completed?userId=${userId}`);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to fetch completed userQuests");
      }

      return data.completedQuests || [];
    } catch (error) {
      console.error("Error fetching completed userQuests:", error);
      toast.error("Error loading completed quests");
      return [];
    }
  };

  const refreshQuests = async () => {
    if (!userId) return;

    try {
      setRefreshing(true);
      console.log("🔄 Refreshing quest account data...");

      const [created, completed] = await Promise.all([
        fetchCreatedQuests(userId),
        fetchCompletedUserQuests(userId),
      ]);

      setCreatedQuests(created);
      setCompletedUserQuests(completed);
      console.log("✅ Quest account data refreshed");
    } catch (error) {
      console.error("❌ Error refreshing quests:", error);
      toast.error("Error refreshing quest data");
    } finally {
      setRefreshing(false);
    }
  };

  const loadInitialData = async () => {
    if (!userId) return;
    
    setLoading(true);
    await refreshQuests();
    setLoading(false);
  };

  useEffect(() => {
    loadInitialData();
  }, [userId]);

  return {
    createdQuests,
    completedUserQuests,
    loading,
    refreshing,
    refreshQuests,
    setCreatedQuests,
    setCompletedUserQuests,
  };
};