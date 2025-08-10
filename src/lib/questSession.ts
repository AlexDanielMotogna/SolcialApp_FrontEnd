import Quest from "@/models/Quest";
import UserQuest from "@/models/UserQuest";
import mongoose from "mongoose";
// This module handles the creation and management of quest sessions
// It includes functions to create a new quest session, check session expiration, and clean up expired sessions
// It uses Mongoose for database operations and handles atomic transactions to ensure data integrity
interface CreateSessionData {
  userId: string;
  questId: string;
  walletaddress: string;
  twitterId?: string;
  tasks: any;
  quest: any;
}

interface SessionResult {
  success: boolean;
  error?: string;
  userQuest?: any;
  sessionExpiresAt?: Date;
}

export async function createQuestSession(
  data: CreateSessionData
): Promise<SessionResult> {
  const { userId, questId, walletaddress, twitterId, tasks, quest } = data;

  try {
    // 1. Prepare data for the session
    const completedTasks = Object.fromEntries(
      Object.keys(tasks).map((k) => [k, false])
    );

    const sessionExpiresAt = new Date(Date.now() + 10 * 1000); // 5 minutos

    // 2. Start transaction for creating a quest session
    // This ensures that all operations are atomic and can be rolled back in case of an error
    const session = await mongoose.startSession();
    session.startTransaction();

    try {
      // 2a. Try to update the quest and reserve a spot
      const updatedQuest = await Quest.findOneAndUpdate(
        {
          _id: questId,
          $expr: { $lt: ["$reservedParticipants", "$maxParticipants"] },
        },
        { $inc: { reservedParticipants: 1 } },
        { new: true, session }
      );

      if (!updatedQuest) {
        await session.abortTransaction();
        session.endSession();

        return {
          success: false,
          error: "No spots available",
        };
      }

      // 2b. Creeate the user quest session
      const userQuestData = {
        userId,
        questId,
        walletaddress,
        completedTasks,
        sessionExpiresAt,
        twitter_id: twitterId,
        rewardAmount: quest.rewardPerTask,
        questName: quest.questName,
        rewardClaimed: false,
        status: "active",
      };

      const userQuest = await UserQuest.create([userQuestData], { session });

      // 2c. Confirm the transaction
      await session.commitTransaction();
      session.endSession();

      return {
        success: true,
        userQuest: userQuest[0],
        sessionExpiresAt,
      };
    } catch (transactionError: any) {
      try {
        await session.abortTransaction();
        session.endSession();
      } catch (abortError) {}

      // Handle specific transaction errors
      let errorMessage = "Error creating quest session";

      if (
        transactionError.message?.includes("Write conflict") ||
        transactionError.message?.includes("WriteConflict")
      ) {
        errorMessage = "Quest is very popular, please try again in a moment";
      } else if (transactionError.code === 11000) {
        errorMessage = "You are already participating in this quest";
      } else if (transactionError.message?.includes("validation")) {
        errorMessage = "Invalid quest data provided";
      }

      return {
        success: false,
        error: `${errorMessage}: Caused by :: ${transactionError.message}`,
      };
    }
  } catch (error: any) {
    return {
      success: false,
      error: `Quest session creation failed: ${error.message}`,
    };
  }
}
// Function to handle session expiration
// This function checks if a quest session has expired and cleans up if necessary
export async function handleSessionExpiration(
  questId: string,
  userId: string,
  walletaddress: string
): Promise<{ expired: boolean; found: boolean }> {
  try {
    const userQuest = await UserQuest.findOne({
      questId,
      $or: [{ userId }, { walletaddress }],
      status: "active",
    });

    if (!userQuest) {
      return { expired: false, found: false };
    }

    const now = new Date();
    const expiresAt = new Date(userQuest.sessionExpiresAt);

    if (now > expiresAt) {
      // Start transaction for cleanup
      const session = await mongoose.startSession();
      session.startTransaction();

      try {
        // Delete expired UserQuest
        await UserQuest.deleteOne({ _id: userQuest._id }, { session });

        // Decrement reserved participants
        await Quest.updateOne(
          { _id: questId },
          { $inc: { reservedParticipants: -1 } },
          { session }
        );

        await session.commitTransaction();
        session.endSession();

        return { expired: true, found: true };
      } catch (cleanupError) {
        await session.abortTransaction();
        session.endSession();

        return { expired: true, found: true };
      }
    }

    return { expired: false, found: true };
  } catch (error) {
    return { expired: false, found: false };
  }
}
