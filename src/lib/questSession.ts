import Quest from "@/models/Quest";
import UserQuest from "@/models/UserQuest";
import mongoose from "mongoose";

interface CreateSessionData {
  userId: string;
  questId: string;
  walletaddress: string;
  tasks: any;
  quest: any;
}

interface SessionResult {
  success: boolean;
  error?: string;
  userQuest?: any;
  sessionExpiresAt?: Date;
}

export async function createQuestSession(data: CreateSessionData): Promise<SessionResult> {
  console.log("🚀 Starting quest session creation...");
  
  const { userId, questId, walletaddress, tasks, quest } = data;
  
  try {
    // 1. Preparar datos de la sesión
    console.log("🔧 Preparing session data...");
    
    const completedTasks = Object.fromEntries(
      Object.keys(tasks).map((k) => [k, false])
    );
    
    const sessionExpiresAt = new Date(Date.now() + 20 * 1000); // 20 segundos
    
    console.log("✅ Session data prepared:", {
      completedTasksCount: Object.keys(completedTasks).length,
      sessionExpiresAt,
      rewardAmount: quest.rewardPerTask
    });

    // 2. Ejecutar transacción atómica
    console.log("🔄 Starting atomic transaction...");
    const session = await mongoose.startSession();
    session.startTransaction();
    
    try {
      // 2a. Intentar reservar un spot
      console.log("📈 Attempting to reserve quest spot...");
      
      const updatedQuest = await Quest.findOneAndUpdate(
        {
          _id: questId,
          $expr: { $lt: ["$reservedParticipants", "$maxParticipants"] },
        },
        { $inc: { reservedParticipants: 1 } },
        { new: true, session }
      );
      
      console.log("🎯 Quest reservation result:", 
        updatedQuest 
          ? `Success: reservedParticipants=${updatedQuest.reservedParticipants}/${updatedQuest.maxParticipants}` 
          : "FAILED - No spots available"
      );
      
      if (!updatedQuest) {
        console.log("❌ Could not reserve spot, aborting transaction");
        await session.abortTransaction();
        session.endSession();
        
        return {
          success: false,
          error: "No spots available",
        };
      }

      // 2b. Crear UserQuest
      console.log("👤 Creating UserQuest record...");
      
      const userQuestData = {
        userId,
        questId,
        walletaddress,
        completedTasks,
        sessionExpiresAt,
        rewardAmount: quest.rewardPerTask,
        questName: quest.questName,
        rewardClaimed: false,
        status: "active",
      };
      
      const userQuest = await UserQuest.create([userQuestData], { session });
      
      console.log("✅ UserQuest created:", {
        id: userQuest[0]._id,
        questName: userQuest[0].questName,
        status: userQuest[0].status
      });

      // 2c. Confirmar transacción
      await session.commitTransaction();
      console.log("✅ Transaction committed successfully");
      session.endSession();

      return {
        success: true,
        userQuest: userQuest[0],
        sessionExpiresAt,
      };
      
    } catch (transactionError: any) {
      console.error("❌ Transaction error:", transactionError);
      
      try {
        await session.abortTransaction();
        session.endSession();
      } catch (abortError) {
        console.error("❌ Error aborting transaction:", abortError);
      }
      
      // Clasificar el error para better UX
      let errorMessage = "Error creating quest session";
      
      if (transactionError.message?.includes("Write conflict") || 
          transactionError.message?.includes("WriteConflict")) {
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
    console.error("❌ Session creation error:", error);
    
    return {
      success: false,
      error: `Quest session creation failed: ${error.message}`,
    };
  }
}

export async function handleSessionExpiration(
  questId: string, 
  userId: string, 
  walletaddress: string
): Promise<{ expired: boolean; found: boolean }> {
  console.log("⏰ Checking session expiration...");
  
  try {
    const userQuest = await UserQuest.findOne({
      questId,
      $or: [{ userId }, { walletaddress }],
      status: "active"
    });

    if (!userQuest) {
      console.log("📋 No active session found");
      return { expired: false, found: false };
    }

    const now = new Date();
    const expiresAt = new Date(userQuest.sessionExpiresAt);
    
    console.log("⏱️ Session time check:", {
      now: now.toISOString(),
      expiresAt: expiresAt.toISOString(),
      hasExpired: now > expiresAt
    });

    if (now > expiresAt) {
      console.log("❌ Session has expired, cleaning up...");
      
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
        
        console.log("✅ Expired session cleaned up successfully");
        return { expired: true, found: true };
        
      } catch (cleanupError) {
        console.error("❌ Error cleaning up expired session:", cleanupError);
        await session.abortTransaction();
        session.endSession();
        
        return { expired: true, found: true };
      }
    }

    console.log("✅ Session is still active");
    return { expired: false, found: true };
    
  } catch (error) {
    console.error("❌ Error checking session expiration:", error);
    return { expired: false, found: false };
  }
}