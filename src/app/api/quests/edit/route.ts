import { NextRequest } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Quest from "@/models/Quest";

export async function POST(req: NextRequest) {
  await connectDB();
  const { questId, questName, description, startDate, startTime, endDate, endTime, tasks } = await req.json();

  if (!questId) {
    return new Response(JSON.stringify({ success: false, error: "Missing questId" }), { status: 400 });
  }

  // Verifica que el quest no haya empezado
  const quest = await Quest.findById(questId);
  if (!quest) {
    return new Response(JSON.stringify({ success: false, error: "Quest not found" }), { status: 404 });
  }
  if (new Date() >= new Date(quest.startDateTime)) {
    return new Response(JSON.stringify({ success: false, error: "Quest already started" }), { status: 400 });
  }

  // Une fecha y hora en formato ISO
  const startDateTime = startDate && startTime ? new Date(`${startDate}T${startTime}`).toISOString() : quest.startDateTime;
  const endDateTime = endDate && endTime ? new Date(`${endDate}T${endTime}`).toISOString() : quest.endDateTime;

  // Actualiza solo los campos permitidos
  await Quest.findByIdAndUpdate(questId, {
    questName,
    description,
    startDateTime,
    endDateTime,
    tasks,
  });

  return new Response(JSON.stringify({ success: true }), { status: 200 });
}