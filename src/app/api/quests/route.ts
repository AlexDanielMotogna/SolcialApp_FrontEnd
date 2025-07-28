import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Quest from "@/models/Quest";

export async function POST(request: Request) {
  try {
    await connectDB();
    const data = await request.json();

    // Calcula rewardPerTask en el backend
    const maxParticipants = Number(data.maxParticipants);
    const rewardPool = Number(data.rewardPool);
    const rewardPerTask =
      !isNaN(rewardPool) && !isNaN(maxParticipants) && maxParticipants > 0
        ? (rewardPool / maxParticipants).toFixed(6)
        : "0";

    delete data.rewardPerTask; // eliminate any value that comes from the frontend

    // Extract userId from data or set it explicitly
    const userId = data.userId; // Adjust this line if userId comes from elsewhere (e.g., session)

    const quest = await Quest.create({
      ...data,
      rewardPerTask,
      userId, // <-- aquí lo agregas calculado
    });

    return NextResponse.json({ quest }, { status: 201 });
  } catch (error) {
    console.error("Error creating quest:", error);
    return NextResponse.json({ message: "Error creating quest", error }, { status: 500 });
  }
}
// Fetch all quests
export async function GET() {
  try {
    await connectDB();
    // Fetch all quests sorted by createdAt in descending order
    const quests = await Quest.find().sort({ createdAt: -1 });
    return NextResponse.json({ quests });
  } catch (error) {
    console.error("Error fetching quests:", error); // <-- LOG
    return NextResponse.json({ message: "Error fetching quests", error }, { status: 500 });
  }
}