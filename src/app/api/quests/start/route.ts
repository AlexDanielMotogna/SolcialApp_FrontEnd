import { NextRequest } from "next/server";
import { connectDB } from "@/lib/mongodb";
import UserQuest from "@/models/UserQuest";

export async function POST(req: NextRequest) {
  await connectDB();
  const { questId, userId } = await req.json();

  if (!questId || !userId) {
    return new Response(JSON.stringify({ success: false, error: "Missing questId or userId" }), { status: 400 });
  }

  // Registra que el usuario ha empezado el quest
  await UserQuest.create({
    userId,
    questId,
    status: "started",
    startedAt: new Date(),
  });

  return new Response(JSON.stringify({ success: true }), { status: 200 });
}