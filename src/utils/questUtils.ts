export interface QuestButtonProps {
  text: string;
  disabled: boolean;
}

export const questUtils = {
  getQuestButtonProps(
    quest: any,
    userQuest: any,
    user: any,
    isLoading: boolean
  ): QuestButtonProps {
    const isConnectedToTwitter = !!user?.hasTwitterAccess;
    const questStartTime = new Date(quest.startDateTime);
    const currentTime = new Date();

    // Loading state
    if (isLoading) {
      return { text: "Joining quest...", disabled: true };
    }

    // ✅ NO USER - PERMITIR CLICK
    if (!user) {
      return { text: "Login Required", disabled: false }; // ✅ FALSE para permitir click
    }

    // Quest hasn't started yet
    if (currentTime < questStartTime) {
      const timeUntilStart = questStartTime.getTime() - currentTime.getTime();
      const hoursUntilStart = Math.ceil(timeUntilStart / (1000 * 60 * 60));
      const minutesUntilStart = Math.ceil(timeUntilStart / (1000 * 60));

      if (hoursUntilStart > 1) {
        return { text: `Starts in ${hoursUntilStart}h`, disabled: true };
      } else if (minutesUntilStart > 1) {
        return { text: `Starts in ${minutesUntilStart}m`, disabled: true };
      } else {
        return { text: "Starting soon...", disabled: true };
      }
    }

    // Quest canceled
    if (quest.status === "canceled") {
      return { text: "Quest Canceled", disabled: true };
    }

    // Quest finished
    if (quest.status === "finished") {
      if (userQuest) {
        if (userQuest.status === "finished") {
          const allTasksCompleted = Object.values(
            userQuest.completedTasks || {}
          ).every(Boolean);

          if (allTasksCompleted && !userQuest.rewardClaimed) {
            return { text: "Complete", disabled: false }; // ✅ Siempre clickeable
          }

          if (userQuest.rewardClaimed) {
            return { text: "Reward Claimed", disabled: false }; // ✅ Siempre clickeable
          }

          return { text: "Complete", disabled: false }; // ✅ Siempre clickeable
        }
        return { text: "Complete", disabled: false }; // ✅ Siempre clickeable
      }
      return { text: "Quest Ended", disabled: true };
    }

    // Quest full check
    if (quest.actualParticipants >= quest.maxParticipants && !userQuest) {
      return { text: "No spots available", disabled: true };
    }

    // ✅ SIN TWITTER - BOTÓN CLICKEABLE PARA CONECTAR
    if (!isConnectedToTwitter) {
      return { text: "Connect to Twitter", disabled: false }; // ✅ FALSE para permitir click
    }

    // Usuario con quest
    if (userQuest) {
      // UI-only: If sessionExpiresAt is in the past, treat as expired (even if backend hasn't updated status yet)
      if (userQuest.sessionExpiresAt) {
        const expiresAt = new Date(userQuest.sessionExpiresAt).getTime();
        if (expiresAt < Date.now()) {
          return { text: "Join Quest", disabled: false };
        }
      }
      if (userQuest.status === "expired") {
        return { text: "Join Quest", disabled: false };
      }
      if (userQuest.status === "active") {
        return { text: "Continue Quest", disabled: false };
      }
      if (userQuest.status === "finished") {
        const allTasksCompleted = Object.values(
          userQuest.completedTasks || {}
        ).every(Boolean);

        if (allTasksCompleted && !userQuest.rewardClaimed) {
          return { text: "Complete", disabled: false };
        }

        if (userQuest.rewardClaimed) {
          return { text: "Reward Claimed", disabled: false };
        }

        return { text: "Complete", disabled: false };
      }
    }

    // Default - can join
    return { text: "Join Quest", disabled: false };
  },

  calculateQuestStats(userQuests: any[]) {
    const questsCompleted = userQuests.filter(
      (uq) => uq.status === "finished" && uq.rewardClaimed
    ).length;

    const rewardEarned = userQuests
      .filter((uq) => uq.status === "finished" && uq.rewardClaimed)
      .reduce((acc, uq) => {
        const rewardValue = parseFloat(uq.rewardAmount || "0");
        return acc + rewardValue;
      }, 0);

    return { questsCompleted, rewardEarned };
  },

  validateQuestAccess(quest: any, user: any, walletAddress: string) {
    const questStartTime = new Date(quest.startDateTime);
    const currentTime = new Date();

    if (currentTime < questStartTime) {
      const timeUntilStart = questStartTime.getTime() - currentTime.getTime();
      const hoursUntilStart = Math.ceil(timeUntilStart / (1000 * 60 * 60));
      const minutesUntilStart = Math.ceil(timeUntilStart / (1000 * 60));

      const message =
        hoursUntilStart > 1
          ? `Quest starts in ${hoursUntilStart} hours`
          : `Quest starts in ${minutesUntilStart} minutes`;

      return { valid: false, message };
    }

    if (quest.status === "canceled") {
      return { valid: false, message: "This quest has been canceled." };
    }

    if (quest.actualParticipants >= quest.maxParticipants) {
      return { valid: false, message: "No spots available." };
    }

    if (!user?.hasTwitterAccess) {
      return { valid: false, message: "twitter_required" };
    }

    return { valid: true };
  },

  formatTimeRemaining(startDateTime: string) {
    const questStartTime = new Date(startDateTime);
    const currentTime = new Date();
    const timeUntilStart = questStartTime.getTime() - currentTime.getTime();

    if (timeUntilStart <= 0) {
      return null;
    }

    const hoursUntilStart = Math.ceil(timeUntilStart / (1000 * 60 * 60));
    const minutesUntilStart = Math.ceil(timeUntilStart / (1000 * 60));

    if (hoursUntilStart > 1) {
      return `Starts in ${hoursUntilStart}h`;
    } else if (minutesUntilStart > 1) {
      return `Starts in ${minutesUntilStart}m`;
    } else {
      return "Starting soon...";
    }
  },
};
