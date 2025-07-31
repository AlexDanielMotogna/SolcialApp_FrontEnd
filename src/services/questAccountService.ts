interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  status?: number;
}

export const questAccountService = {
  async fetchCreatedQuests(userId: string): Promise<ApiResponse<any[]>> {
    try {
      console.log("📤 Fetching created quests for user:", userId);
      
      const response = await fetch(`/api/quests/created?userId=${userId}`);
      const data = await response.json();

      if (!response.ok) {
        return {
          success: false,
          error: data.error || "Failed to fetch created quests",
          status: response.status,
        };
      }

      console.log("✅ Created quests fetched successfully");
      return {
        success: true,
        data: data.quests || [],
      };
    } catch (error) {
      console.error("❌ Network error fetching created quests:", error);
      return {
        success: false,
        error: "Network error occurred",
      };
    }
  },

  async fetchCompletedQuests(userId: string): Promise<ApiResponse<any[]>> {
    try {
      console.log("📤 Fetching completed quests for user:", userId);
      
      const response = await fetch(`/api/user-quests/completed?userId=${userId}`);
      const data = await response.json();

      if (!response.ok) {
        return {
          success: false,
          error: data.error || "Failed to fetch completed quests",
          status: response.status,
        };
      }

      console.log("✅ Completed quests fetched successfully");
      return {
        success: true,
        data: data.completedQuests || [],
      };
    } catch (error) {
      console.error("❌ Network error fetching completed quests:", error);
      return {
        success: false,
        error: "Network error occurred",
      };
    }
  },

  async claimReward(userQuestId: string, userId: string): Promise<ApiResponse<any>> {
    try {
      console.log("💰 Claiming reward for userQuest:", userQuestId);
      
      const response = await fetch("/api/user-quests/claim", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userQuestId,
          userId,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        return {
          success: false,
          error: data.error || "Failed to claim reward",
          status: response.status,
        };
      }

      console.log("✅ Reward claimed successfully");
      return {
        success: true,
        data: data,
      };
    } catch (error) {
      console.error("❌ Network error claiming reward:", error);
      return {
        success: false,
        error: "Network error occurred",
      };
    }
  },

  async cancelQuest(questId: string): Promise<ApiResponse<any>> {
    try {
      console.log("❌ Canceling quest:", questId);
      
      const response = await fetch("/api/quests/cancel", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ questId }),
      });

      const data = await response.json();

      if (!response.ok) {
        return {
          success: false,
          error: data.error || "Failed to cancel quest",
          status: response.status,
        };
      }

      console.log("✅ Quest canceled successfully");
      return {
        success: true,
        data: data,
      };
    } catch (error) {
      console.error("❌ Network error canceling quest:", error);
      return {
        success: false,
        error: "Network error occurred",
      };
    }
  },

  async updateQuest(questId: string, updateData: any): Promise<ApiResponse<any>> {
    try {
      console.log("🔄 Updating quest:", questId);
      
      const response = await fetch(`/api/quests/${questId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updateData),
      });

      const data = await response.json();

      if (!response.ok) {
        return {
          success: false,
          error: data.error || "Failed to update quest",
          status: response.status,
        };
      }

      console.log("✅ Quest updated successfully");
      return {
        success: true,
        data: data,
      };
    } catch (error) {
      console.error("❌ Network error updating quest:", error);
      return {
        success: false,
        error: "Network error occurred",
      };
    }
  },
};