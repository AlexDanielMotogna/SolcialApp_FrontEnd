interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  status?: number;
}

export const userService = {
  async fetchUser(userId: string): Promise<ApiResponse<any>> {
    try {
      console.log("👤 Fetching user data for ID:", userId);
      
      const res = await fetch(`/api/user?id=${userId}`);
      const data = await res.json();
      
      if (!res.ok) {
        console.log(`❌ User fetch error (${res.status}):`, data.error);
        return { 
          success: false, 
          error: data.error || "Error fetching user data",
          status: res.status 
        };
      }
      
      if (data.user) {
        console.log("✅ User data fetched successfully");
        return { 
          success: true, 
          data: data.user 
        };
      }
      
      return { 
        success: false, 
        error: "User not found" 
      };
    } catch (error) {
      console.error("❌ Network error fetching user:", error);
      return { 
        success: false, 
        error: "Network error occurred" 
      };
    }
  },

  async updateUser(userId: string, updateData: any): Promise<ApiResponse<any>> {
    try {
      console.log("🔄 Updating user data for ID:", userId);
      
      const res = await fetch(`/api/user`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: userId, ...updateData }),
      });
      
      const data = await res.json();
      
      if (!res.ok) {
        console.log(`❌ User update error (${res.status}):`, data.error);
        return { 
          success: false, 
          error: data.error || "Error updating user data",
          status: res.status 
        };
      }
      
      console.log("✅ User data updated successfully");
      return { 
        success: true, 
        data: data.user 
      };
    } catch (error) {
      console.error("❌ Network error updating user:", error);
      return { 
        success: false, 
        error: "Network error occurred" 
      };
    }
  },

  async connectTwitter(userId: string): Promise<ApiResponse<any>> {
    try {
      console.log("🐦 Initiating Twitter connection for user:", userId);
      
      // Redirect to Twitter auth endpoint
      window.location.href = `/api/auth/twitter?userId=${userId}`;
      
      return { 
        success: true, 
        data: { message: "Redirecting to Twitter..." } 
      };
    } catch (error) {
      console.error("❌ Error initiating Twitter connection:", error);
      return { 
        success: false, 
        error: "Error connecting to Twitter" 
      };
    }
  },

  async fetchUserStats(userId: string): Promise<ApiResponse<any>> {
    try {
      console.log("📊 Fetching user stats for ID:", userId);
      
      const res = await fetch(`/api/user/stats?id=${userId}`);
      const data = await res.json();
      
      if (!res.ok) {
        return { 
          success: false, 
          error: data.error || "Error fetching user stats",
          status: res.status 
        };
      }
      
      console.log("✅ User stats fetched successfully");
      return { 
        success: true, 
        data: data.stats 
      };
    } catch (error) {
      console.error("❌ Network error fetching user stats:", error);
      return { 
        success: false, 
        error: "Network error occurred" 
      };
    }
  },
};