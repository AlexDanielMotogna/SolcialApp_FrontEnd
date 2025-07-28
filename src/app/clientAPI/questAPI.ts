import { Quest } from "@/utils/questHelpers";
import axios from "axios";

class QuestAPI {
constructor() {}

  public async getQuests(): Promise<Quest[]> {
    // Implementation for fetching quests
    return [];
  }

  public async getQuestById(id: string): Promise<Quest | null> {
    // Implementation for fetching a quest by ID
    return null;
  }

  public async createQuest(questData: any): Promise<Quest | null> {
    return axios
      .post("/api/quests", questData)
      .then((resp) => {
        console.log("create Quest resp: ", resp);
        if (resp && resp.data) {
          return Promise.resolve(resp.data as Quest);
        }
        return Promise.reject(new Error("No Data"));
      })
      .catch((err) => {
        console.log("create Quest err: ", err);
        return Promise.reject(err);
      });
  }

  public async updateQuest(id: string, questData: any): Promise<Quest | null> {
    // Implementation for updating an existing quest
    return null;
  }

  public async deleteQuest(id: string): Promise<void> {
    // Implementation for deleting a quest
  }
}

export const questAPI = new QuestAPI();

function setShowSuccess(arg0: boolean) {
    throw new Error("Function not implemented.");
}
function refreshQuests() {
    throw new Error("Function not implemented.");
}

