import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb"; // 
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

    delete data.rewardPerTask; // <-- elimina cualquier valor que venga del frontend

    const quest = await Quest.create({
      ...data,
      rewardPerTask, // <-- aquí lo agregas calculado
    });

    return NextResponse.json({ quest }, { status: 201 });
  } catch (error) {
    console.error("Error creating quest:", error);
    return NextResponse.json({ message: "Error creating quest", error }, { status: 500 });
  }
}