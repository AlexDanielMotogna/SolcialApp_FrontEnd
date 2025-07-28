import Quest from "@/models/Quest";
import UserQuest from "@/models/UserQuest";
import mongoose from "mongoose";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  const { userId, questId, tasks, walletAdress } = await req.json();


  const quest = await Quest.findById(questId);

  if (new Date() > new Date(quest.endDateTime)) {
    if (quest.status !== "finished") {
      quest.status = "finished";
      await quest.save();
    }
    return new Response(JSON.stringify({ error: "Quest has ended" }), { status: 400 });
  }

  // Verifica si el quest está lleno
    if (quest.actualParticipants >= quest.maxParticipants) {
      if (quest.status !== "finished") {
        quest.status = "finished";
        await quest.save();
      }
      return new Response(JSON.stringify({ error: "Quest is full" }), { status: 400 });
    }
  
  if (!quest?.repeatable) {
    const existingSession = await UserQuest.findOne({
      questId,
      $or: [{ userId }, { walletAdress }],
      status: { $in: ["active", "completed"] },
    });

    if (existingSession) {
      return new Response(JSON.stringify({ error: "Quest ya completado" }), {
        status: 409,
      });
    }
  }

  const completedTasks = Object.fromEntries(
    Object.keys(tasks).map((k) => [k, false])
  );
  const sessionExpiresAt = new Date(Date.now() + 10 * 1000); // 10 segundos

  const session = await mongoose.startSession();
  session.startTransaction();
  try {
    // 1. Incrementa reservedParticipants solo si hay cupo (usando $expr)W
    const quest = await Quest.findOneAndUpdate(
      {
        _id: questId,
        $expr: { $lt: ["$reservedParticipants", "$maxParticipants"] },
      },
      { $inc: { reservedParticipants: 1 } },
      { new: true, session }
    );
    if (!quest) {
      await session.abortTransaction();
      session.endSession();
      return new Response(JSON.stringify({ error: "No spots available" }), {
        status: 400,
      });
    }
    // 2. Crea el UserQuest
    const userQuest = await UserQuest.create(
      [
        {
          userId,
          questId,
          walletAdress,
          completedTasks,
          sessionExpiresAt,
          rewardClaimed: false,
          status: "active",
        },
      ],
      { session }
    );

    await session.commitTransaction();
    session.endSession();

    return new Response(JSON.stringify(userQuest[0]), { status: 201 });
  } catch (err) {
    await session.abortTransaction();
    session.endSession();
    return new Response(
      JSON.stringify({ error: "Error creating quest session" }),
      { status: 500 }
    );
  }
}
