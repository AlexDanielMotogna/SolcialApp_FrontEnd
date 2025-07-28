import { NextRequest } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Quest from "@/models/Quest";

export async function POST(req: NextRequest) {
  await connectDB();
  const { questId } = await req.json();

  if (!questId) {
    return new Response(JSON.stringify({ success: false, error: "Missing questId" }), { status: 400 });
  }

  // Actualiza el estado del quest a "canceled"
  await Quest.findByIdAndUpdate(questId, { status: "canceled" });

  return new Response(JSON.stringify({ success: true }), { status: 200 });
}