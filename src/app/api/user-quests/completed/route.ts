import { NextRequest, NextResponse } from "next/server";
import { connectDB }from "@/lib/mongodb";
import UserQuest from "@/models/UserQuest";

export async function GET(req: NextRequest) {
  try {
    await connectDB();
    
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get("userId");
    
    console.log("🔍 Completed quests endpoint called with userId:", userId);
    
    if (!userId) {
      return NextResponse.json({ error: "UserId is required" }, { status: 400 });
    }
    
    // ✅ BUSCAR UserQuests completados
    const completedUserQuests = await UserQuest.find({
      userId: userId,
      status: "finished"
    }).sort({ enrolledAt: -1 });
    
    console.log("✅ Found completed userQuests:", completedUserQuests.length);
    console.log("✅ First userQuest:", completedUserQuests[0]);
    
    // ✅ MAPEAR DIRECTAMENTE
    const completedQuests = completedUserQuests.map(uq => ({
      _id: uq._id.toString(),
      questName: uq.questName || "Unknown Quest",
      date: uq.enrolledAt || uq.createdAt,
      rewardAmount: uq.rewardAmount,
      status: uq.status,
      rewardClaimed: uq.rewardClaimed || false
    }));
    
    console.log("🎯 Returning completed quests:", completedQuests);
    
    return NextResponse.json({ 
      completedQuests,
      count: completedQuests.length 
    });
    
  } catch (error) {
    console.error("❌ Error fetching completed quests:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}