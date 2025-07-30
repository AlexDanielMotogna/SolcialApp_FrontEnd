import Quest from "@/models/Quest";
import UserQuest from "@/models/UserQuest";
import mongoose from "mongoose";
import { NextRequest } from "next/server";
import { connectDB } from "@/lib/mongodb"; 

export async function POST(req: NextRequest) {
  try {
    console.log("🚀 Starting user-quest creation...");
    
    await connectDB();
    console.log("✅ Database connected");
    
    const { userId, questId, tasks, walletaddress } = await req.json();
    console.log("📝 Request data:", { userId, questId, tasks, walletaddress });

    const quest = await Quest.findById(questId);
    console.log("🎯 Quest found:", quest ? `ID: ${quest._id}, reservedParticipants: ${quest.reservedParticipants}, maxParticipants: ${quest.maxParticipants}` : "NOT FOUND");

    if (!quest) {
      console.log("❌ Quest not found");
      return new Response(JSON.stringify({ error: "Quest not found" }), { status: 404 });
    }

    // ✅ VALIDACIÓN DE START DATE - NUEVA VALIDACIÓN
    const currentTime = new Date();
    const questStartTime = new Date(quest.startDateTime);
    
    console.log("📅 Checking quest start date:", {
      startDateTime: quest.startDateTime,
      now: currentTime,
      hasStarted: currentTime >= questStartTime
    });

    if (currentTime < questStartTime) {
      const timeUntilStart = questStartTime.getTime() - currentTime.getTime();
      const minutesUntilStart = Math.ceil(timeUntilStart / (1000 * 60));
      const hoursUntilStart = Math.ceil(timeUntilStart / (1000 * 60 * 60));
      
      console.log(`❌ Quest has not started yet. Starts in ${minutesUntilStart} minutes`);
      
      let timeMessage;
      if (hoursUntilStart > 1) {
        timeMessage = `Quest starts in ${hoursUntilStart} hours`;
      } else {
        timeMessage = `Quest starts in ${minutesUntilStart} minutes`;
      }
      
      return new Response(JSON.stringify({ 
        error: timeMessage 
      }), { status: 400 });
    }

    // ✅ VALIDACIÓN DE STATUS - NUEVA VALIDACIÓN
    if (quest.status !== "active") {
      console.log("❌ Quest is not active, status:", quest.status);
      return new Response(JSON.stringify({ error: "Quest is not active" }), { status: 400 });
    }

    // Verificar fecha de finalización
    console.log("📅 Checking quest end date:", {
      endDateTime: quest.endDateTime,
      now: new Date(),
      hasEnded: new Date() > new Date(quest.endDateTime)
    });

    if (new Date() > new Date(quest.endDateTime)) {
      console.log("❌ Quest has ended");
      if (quest.status !== "finished") {
        quest.status = "finished";
        await quest.save();
        console.log("✅ Quest status updated to finished");
      }
      return new Response(JSON.stringify({ error: "Quest has ended" }), { status: 400 });
    }

    // Verificar cupos
    console.log("👥 Checking quest capacity:", {
      actualParticipants: quest.actualParticipants,
      maxParticipants: quest.maxParticipants,
      isFull: quest.actualParticipants >= quest.maxParticipants
    });

    if (quest.actualParticipants >= quest.maxParticipants) {
      console.log("❌ Quest is full");
      if (quest.status !== "finished") {
        quest.status = "finished";
        await quest.save();
        console.log("✅ Quest status updated to finished (full)");
      }
      return new Response(JSON.stringify({ error: "Quest is full" }), { status: 400 });
    }
    
    // Verificar si ya participó
    console.log("🔄 Checking if quest is repeatable:", quest.repeatable);
    
    if (!quest?.repeatable) {
      console.log("🔍 Checking existing session...");
      const existingSession = await UserQuest.findOne({
        questId,
        $or: [{ userId }, { walletaddress }],
        status: { $in: ["active", "finished"] },
      });
      
      console.log("📋 Existing session:", existingSession ? `Found: ${existingSession._id}` : "Not found");

      if (existingSession) {
        console.log("❌ Quest already completed");
        return new Response(JSON.stringify({ error: "Quest ya completado" }), {
          status: 409,
        });
      }
    }

    console.log("🔧 Creating completed tasks object...");
    const completedTasks = Object.fromEntries(
      Object.keys(tasks).map((k) => [k, false])
    );
    console.log("✅ Completed tasks object:", completedTasks);

    const sessionExpiresAt = new Date(Date.now() + 20 * 1000); // 20 segundos
    console.log("⏰ Session expires at:", sessionExpiresAt);

    console.log("🔄 Starting transaction...");
    const session = await mongoose.startSession();
    session.startTransaction();
    
    try {
      console.log("📈 Attempting to increment reservedParticipants...");
      
      // 1. Incrementa reservedParticipants solo si hay cupo
      const updatedQuest = await Quest.findOneAndUpdate(
        {
          _id: questId,
          $expr: { $lt: ["$reservedParticipants", "$maxParticipants"] },
        },
        { $inc: { reservedParticipants: 1 } },
        { new: true, session }
      );
      
      console.log("🎯 Quest update result:", updatedQuest ? `Updated: reservedParticipants=${updatedQuest.reservedParticipants}` : "NO UPDATE (no spots available)");
      
      if (!updatedQuest) {
        console.log("❌ No spots available, aborting transaction");
        await session.abortTransaction();
        session.endSession();
        return new Response(JSON.stringify({ error: "No spots available" }), {
          status: 400,
        });
      }

      console.log("👤 Creating UserQuest...");
      
      // 2. Crea el UserQuest
      const userQuest = await UserQuest.create(
        [
          {
            userId,
            questId,
            walletaddress,
            completedTasks,
            sessionExpiresAt,
            rewardAmount: quest.rewardPerTask,
            questName: quest.questName,
            rewardClaimed: false,
            status: "active",
          },
        ],
        { session }
      );

      console.log("✅ UserQuest created:", userQuest[0]);

      await session.commitTransaction();
      console.log("✅ Transaction committed");
      session.endSession();

      console.log("🎉 Success! Returning userQuest");
      return new Response(JSON.stringify(userQuest[0]), { status: 201 });
      
    } catch (transactionError) {
      console.error("❌ Transaction error:", transactionError);
      await session.abortTransaction();
      session.endSession();
      return new Response(
        JSON.stringify({ 
          error: "Error creating quest session", 
          details: typeof transactionError === "object" && transactionError !== null && "message" in transactionError 
            ? (transactionError as { message?: string }).message 
            : String(transactionError)
        }),
        { status: 500 }
      );
    }
    
  } catch (mainError) {
    console.error("❌ Main error in user-quests:", mainError);
    return new Response(
      JSON.stringify({ 
        error: "Internal server error", 
        details: typeof mainError === "object" && mainError !== null && "message" in mainError 
          ? (mainError as { message?: string }).message 
          : String(mainError)
      }),
      { status: 500 }
    );
  }
}