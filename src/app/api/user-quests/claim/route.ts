import UserQuest from "@/models/UserQuest";
import { NextRequest } from "next/server";

// Handles the claim reward request for a user quest
export async function POST(req: NextRequest) {
  const { userQuestId } = await req.json();

  // Find the user quest session by ID
  const userQuest = await UserQuest.findById(userQuestId);

  // If session not found, return error
  if (!userQuest) {
    return new Response(JSON.stringify({ success: false, error: "Session not found" }), { status: 404 });
  }

  // Check if all tasks are completed
  const allTasksCompleted = Object.values(userQuest.completedTasks).every(Boolean);
  if (!allTasksCompleted) {
    return new Response(JSON.stringify({ success: false, error: "Not all tasks completed" }), { status: 400 });
  }

  // Check if reward has already been claimed
  if (userQuest.rewardClaimed) {
    return new Response(JSON.stringify({ success: false, error: "Reward already claimed" }), { status: 400 });
  }

  // Mark the reward as claimed
  userQuest.rewardClaimed = true;
  userQuest.status = "finished";
  await userQuest.save();

  // Return success response
  return new Response(JSON.stringify({ success: true }), { status: 200 });
}