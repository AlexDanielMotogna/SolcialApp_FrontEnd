import { parseISOToFormFields } from "@/utils/dateUtils";

export const questAccountUtils = {
  canEditQuest(quest: any): { canEdit: boolean; reason?: string } {
    const now = new Date();
    const start = quest.startDateTime ? new Date(quest.startDateTime) : null;

    if (start && now >= start) {
      return {
        canEdit: false,
        reason: "Quest has already started and cannot be edited",
      };
    }

    if (quest.status === "canceled") {
      return {
        canEdit: false,
        reason: "Canceled quests cannot be edited",
      };
    }

    if (quest.status === "finished") {
      return {
        canEdit: false,
        reason: "Finished quests cannot be edited",
      };
    }

    if (quest.actualParticipants > 0) {
      return {
        canEdit: false,
        reason: "Quest with participants cannot be edited",
      };
    }

    return { canEdit: true };
  },

  canCancelQuest(quest: any): { canCancel: boolean; reason?: string } {
    const now = new Date();
    const start = quest.startDateTime ? new Date(quest.startDateTime) : null;

    if (quest.status === "canceled") {
      return {
        canCancel: false,
        reason: "Quest is already canceled",
      };
    }

    if (quest.status === "finished") {
      return {
        canCancel: false,
        reason: "Finished quests cannot be canceled",
      };
    }

    if (start && now > new Date(start.getTime() + 30 * 60 * 1000)) { // 30 min after start
      return {
        canCancel: false,
        reason: "Quest has been running for too long to be canceled",
      };
    }

    return { canCancel: true };
  },

  prepareQuestForEdit(quest: any) {
    try {
      const startFields = parseISOToFormFields(quest.startDateTime);
      const endFields = parseISOToFormFields(quest.endDateTime);

      return {
        ...quest,
        startDate: startFields.date,
        startTime: startFields.time,
        endDate: endFields.date,
        endTime: endFields.time,
      };
    } catch (error) {
      console.error("Error preparing quest for edit:", error);
      return quest;
    }
  },

  calculateQuestStats(createdQuests: any[], completedQuests: any[]) {
    const totalCreated = createdQuests.length;
    const activeQuests = createdQuests.filter(q => q.status === "active").length;
    const canceledQuests = createdQuests.filter(q => q.status === "canceled").length;
    const finishedQuests = createdQuests.filter(q => q.status === "finished").length;
    
    const totalCompleted = completedQuests.length;
    const totalRewardsClaimed = completedQuests
      .filter(uq => uq.rewardClaimed)
      .reduce((acc, uq) => acc + parseFloat(uq.rewardAmount || "0"), 0);
    
    const pendingRewards = completedQuests
      .filter(uq => !uq.rewardClaimed)
      .reduce((acc, uq) => acc + parseFloat(uq.rewardAmount || "0"), 0);

    return {
      created: {
        total: totalCreated,
        active: activeQuests,
        finished: finishedQuests,
        canceled: canceledQuests,
      },
      completed: {
        total: totalCompleted,
        rewardsClaimed: totalRewardsClaimed,
        pendingRewards: pendingRewards,
      },
    };
  },

  getQuestStatusBadge(status: string) {
    const badges = {
      active: {
        text: "Active",
        className: "bg-green-500/20 text-green-400 border-green-500/30",
      },
      finished: {
        text: "Finished",
        className: "bg-blue-500/20 text-blue-400 border-blue-500/30",
      },
      canceled: {
        text: "Canceled",
        className: "bg-red-500/20 text-red-400 border-red-500/30",
      },
      pending: {
        text: "Pending",
        className: "bg-yellow-500/20 text-yellow-400 border-yellow-500/30",
      },
    };

    return badges[status as keyof typeof badges] || badges.pending;
  },
};