import { use } from "react";
import Wallet from "../../public/icons/Wallet";

interface CreateQuestSessionData {
  questId: string; 
  walletaddress: string; // ❌ ELIMINAR: userId y walletaddress - vienen de la sesión
  tasks: any;      
}

interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  status?: number;
}

export const questService = {
  async createQuestSession(data: CreateQuestSessionData): Promise<ApiResponse<any>> {
    try {
      console.log("📤 Creating quest session...", data.questId);
      
      const response = await fetch("/api/user-quests", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          questId: data.questId,
          tasks: data.tasks,
          Walletaddress: data.walletaddress, // ❌ ELIMINAR: userId y walletaddress - vienen de la sesión
          // ❌ ELIMINAR: userId y walletaddress - vienen de la sesión
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        console.log(`❌ API Error (${response.status}):`, result.error);
        return {
          success: false,
          error: result.error || "Could not start quest",
          status: response.status,
        };
      }

      console.log("✅ Quest session created successfully");
      return {
        success: true,
        data: result,
      };
    } catch (error) {
      console.error("❌ Network error:", error);
      return {
        success: false,
        error: "Network error occurred",
      };
    }
  },

  async checkQuestExpiration(questId: string): Promise<ApiResponse<any>> {
    try {
      const response = await fetch("/api/user-quests/expire", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          questId,
          Walletaddress: "",
          userId: "" //

        }),
      });

      const data = await response.json();

      if (!response.ok) {
        return {
          success: false,
          error: data.error || "Error checking quest status",
        };
      }

      return {
        success: true,
        data,
      };
    } catch (error) {
      console.error("Error checking quest expiration:", error);
      return {
        success: false,
        error: "Network error occurred",
      };
    }
  },

  async fetchQuests(page: number = 1, limit: number = 6, filter?: string, sort?: string) {
    try {
      const params = new URLSearchParams({
        page: page.toString(),
        limit: limit.toString(),
      });

      if (filter) {
        params.append("filter", filter);
      }

      if (sort) {
        params.append("sort", sort);
      }

      const response = await fetch(`/api/quests?${params}`);
      const data = await response.json();

      if (!response.ok) {
        return {
          success: false,
          error: data.error || "Error fetching quests",
        };
      }

      return {
        success: true,
        data: data,
      };
    } catch (error) {
      console.error("Error fetching quests:", error);
      return {
        success: false,
        error: "Network error occurred",
      };
    }
  },

  async fetchUserQuests(): Promise<ApiResponse<any>> {
    try {
      // ✅ NO ENVIAR userId - la API lo obtiene de la sesión
      const response = await fetch(`/api/user-quests/allUserQuests`);
      const data = await response.json();

      if (!response.ok) {
        return {
          success: false,
          error: data.error || "Error fetching user quests",
        };
      }

      return {
        success: true,
        data: data.userQuests || [],
      };
    } catch (error) {
      console.error("Error fetching user quests:", error);
      return {
        success: false,
        error: "Network error occurred",
      };
    }
  },
};