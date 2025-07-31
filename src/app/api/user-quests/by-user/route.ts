import UserQuest from "@/models/UserQuest";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const userId = searchParams.get("userId");
  const walletaddress = searchParams.get("walletaddress");
  const questId = searchParams.get("questId");

  if (!questId || (!userId && !walletaddress)) {
    return new Response(JSON.stringify({ error: "Missing params" }), { status: 400 });
  }

  // Elimina el filtro de status para devolver cualquier sesión
  const userQuest = await UserQuest.findOne({
    questId,
    $or: [
      { userId },
      { walletaddress }
    ]
  });

  return new Response(JSON.stringify({ userQuest }), { status: 200 });
}