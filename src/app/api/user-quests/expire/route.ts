import { NextRequest } from "next/server";
import { connectDB } from "@/lib/mongodb";
import UserQuest from "@/models/UserQuest";
import Quest from "@/models/Quest";
import mongoose from "mongoose";

export async function POST(req: NextRequest) {
  console.log("Expire endpoint called");
  //await connectDB();
  const { questId, userId, walletAdress } = await req.json();
  console.log("questId recibido:", questId);

  console.log("Filtro usado:", {
  questId,
  $or: [
    { userId },
    { walletAdress }
  ]
});

  const session = await mongoose.startSession();
  session.startTransaction();
  try {
    // Busca todas las sesiones activas de ese quest para ese usuario
    const userQuests = await UserQuest.find({
      questId,
      status: "active",
      $or: [
        { userId },
        { walletAdress }
      ]
    }).session(session);
    console.log("userQuests encontrados:", userQuests.length);

    if (!userQuests.length) {
      await session.abortTransaction();
      session.endSession();
      return new Response(JSON.stringify({ expired: false, error: "No sessions found" }), { status: 404 });
    }

    // Elimina la(s) sesión(es) de ese quest para ese usuario
    const deleteResult = await UserQuest.deleteMany({
      questId,
      status: "active",
      $or: [
        { userId },
        { walletAdress }
      ]
    }, { session });

    // Libera los cupos (resta tantos como sesiones eliminadas)
    await Quest.updateOne(
      { _id: questId, reservedParticipants: { $gte: userQuests.length } },
      { $inc: { reservedParticipants: -userQuests.length } },
      { session }
    );

    await session.commitTransaction();
    session.endSession();

    // Si se borró al menos una sesión, expired = true
    return new Response(JSON.stringify({ expired: deleteResult.deletedCount > 0 }), { status: 200 });
  } catch (err) {
    console.error("Error expiring session:", err);
    await session.abortTransaction();
    session.endSession();
    return new Response(JSON.stringify({ expired: false, error: "Error expiring session" }), { status: 500 });
  }
}