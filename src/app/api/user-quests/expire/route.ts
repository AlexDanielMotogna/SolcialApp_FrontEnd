import { NextRequest } from "next/server";
import { connectDB } from "@/lib/mongodb";
import UserQuest from "@/models/UserQuest";
import Quest from "@/models/Quest";
import mongoose from "mongoose";

export async function POST(req: NextRequest) {
  console.log("Expire endpoint called");
  
  const { questId, userId, walletaddress } = await req.json();
  console.log("questId recibido:", questId);

  const session = await mongoose.startSession();
  session.startTransaction();
  
  try {
    const now = new Date();
    console.log("Current time:", now);

    // Checked for expired user quests
    const expiredUserQuests = await UserQuest.find({
      questId,
      status: "active",
      sessionExpiresAt: { $lt: now }, // Only consider sessions that have actually expired
      $or: [
        { userId },
        { walletaddress }
      ]
    }).session(session);

    console.log("Expired userQuests found:", expiredUserQuests.length);
    console.log("Sessions to delete:", expiredUserQuests.map(uq => ({
      id: uq._id,
      expiresAt: uq.sessionExpiresAt,
      isExpired: uq.sessionExpiresAt < now
    })));

    if (!expiredUserQuests.length) {
      await session.abortTransaction();
      session.endSession();
      
      // Verify if there are still active sessions
      const activeUserQuests = await UserQuest.find({
        questId,
        status: "active",
        $or: [{ userId }, { walletaddress }]
      });

      if (activeUserQuests.length > 0) {
        const stillActive = activeUserQuests.filter(uq => uq.sessionExpiresAt > now);
        if (stillActive.length > 0) {
          console.log("Session still active, expires at:", stillActive[0].sessionExpiresAt);
          return new Response(JSON.stringify({ 
            expired: false, 
            found: false,
            message: "Session is still active",
            expiresAt: stillActive[0].sessionExpiresAt
          }), { status: 200 });
        }
      }

      console.log("No expired sessions found for user");
      return new Response(JSON.stringify({ 
        expired: false, 
        found: false,
        error: "No expired sessions found" 
      }), { status: 200 });
    }

    // Eliminate expired sessions
    const deleteResult = await UserQuest.deleteMany({
      _id: { $in: expiredUserQuests.map(uq => uq._id) }
    }, { session });

    console.log("Sessions deleted:", deleteResult.deletedCount);

    // Actualize the quest's reserved participants count
    await Quest.updateOne(
      { _id: questId, reservedParticipants: { $gte: deleteResult.deletedCount } },
      { $inc: { reservedParticipants: -deleteResult.deletedCount } },
      { session }
    );

    await session.commitTransaction();
    session.endSession();

    console.log("Expire completed successfully:", {
      deleted: deleteResult.deletedCount,
      expired: deleteResult.deletedCount > 0
    });

    return new Response(JSON.stringify({ 
      expired: deleteResult.deletedCount > 0,
      found: deleteResult.deletedCount > 0,
      deletedCount: deleteResult.deletedCount
    }), { status: 200 });

  } catch (err) {
    console.error("Error expiring session:", err);
    await session.abortTransaction();
    session.endSession();
    return new Response(JSON.stringify({ 
      expired: false, 
      found: false,
      error: "Error expiring session" 
    }), { status: 500 });
  }
}