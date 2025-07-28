import { NextRequest } from "next/server";
import { connectDB } from "@/lib/mongodb";
import UserQuest from "@/models/UserQuest";

export async function GET(req: NextRequest) {
  //await connectDB();
  const { searchParams } = new URL(req.url);
  const userId = searchParams.get("userId");
  const walletAdress = searchParams.get("walletAdress");
  const questId = searchParams.get("questId");

  if (!questId || (!userId && !walletAdress)) {
    return new Response(JSON.stringify({ error: "Missing params" }), { status: 400 });
  }

  // Elimina el filtro de status para devolver cualquier sesión
  const userQuest = await UserQuest.findOne({
    questId,
    $or: [
      { userId },
      { walletAdress }
    ]
  });

  return new Response(JSON.stringify({ userQuest }), { status: 200 });
}