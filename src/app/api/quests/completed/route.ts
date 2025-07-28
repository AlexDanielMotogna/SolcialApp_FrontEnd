import { NextRequest } from "next/server";
import { connectDB } from "@/lib/mongodb";
import UserQuest from "@/models/UserQuest";
import Quest from "@/models/Quest";

export async function GET(req: NextRequest) {
  await connectDB();
  const { searchParams } = new URL(req.url);
  const userId = searchParams.get("userId");

  if (!userId) {
    return new Response(JSON.stringify({ quests: [] }), { status: 400 });
  }

  // Busca quests completados por el usuario
  const userQuests = await UserQuest.find({ userId, status: "completed" }).lean();

  // Opcional: puedes enriquecer con datos del quest original
   const quests = await Promise.all(
    userQuests.map(async (uq: any) => {
      const quest = await Quest.findById(uq.questId).lean() as {
        _id?: any;
        questName?: string;
        rewardPool?: number;
        startDateTime?: string;
        endDateTime?: string;
        rewardPerTask?: number;
      };
      return {
        _id: quest?._id,
        questName: quest?.questName,
        status: uq.status,
        completedAt: uq.completedAt,
        rewardClaimed: uq.rewardClaimed,
        reward: quest?.rewardPerTask ?? 0,
        startDateTime: quest?.startDateTime ?? "",
        endDateTime: quest?.endDateTime ?? "",
        date: quest?.endDateTime ?? "",
      };
    })
  );

  return new Response(JSON.stringify({ quests }), { status: 200 });
}