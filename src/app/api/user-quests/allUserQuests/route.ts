import { NextRequest, NextResponse } from "next/server";
import UserQuest from "@/models/UserQuest";
import { connectDB } from "@/lib/mongodb";

export async function GET(req: NextRequest) {
    await connectDB(); // <-- agrega esto
  const { searchParams } = new URL(req.url);
  const userId = searchParams.get("userId");

  if (!userId) {
    return NextResponse.json({ error: "Missing userId" }, { status: 400 });
  }

  try {
    const userQuests = await UserQuest.find({ userId });
    return NextResponse.json({ userQuests });
  } catch (error) {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}