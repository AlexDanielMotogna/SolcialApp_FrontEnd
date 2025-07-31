import { NextRequest } from "next/server";
import Quest from "@/models/Quest";
import UserQuest from "@/models/UserQuest";
import AuthUser from "@/models/AuthUser";
import { TwitterApi } from "twitter-api-v2";
import { Types } from "mongoose";

export async function POST(req: NextRequest) {
  const { userQuestId, userId } = await req.json();
  console.log("POST /verify-twitter", { userQuestId, userId });

  const userQuest = await UserQuest.findById(userQuestId);
  console.log("userQuest:", userQuest);
  if (!userQuest) {
    console.log("Session not found");
    return new Response(JSON.stringify({ success: false, error: "Session not found" }), { status: 404 });
  }

  const quest = await Quest.findById(userQuest.questId);
  console.log("quest:", quest);
  if (!quest) {
    console.log("Quest not found");
    return new Response(JSON.stringify({ success: false, error: "Quest not found" }), { status: 404 });
  }

  const tweetId = quest.tweetLink.split("/").pop();
  console.log("tweetId:", tweetId);

  const requiredTasks = Object.keys(quest.tasks).filter(task => quest.tasks[task]);
  console.log("requiredTasks:", requiredTasks);

  const user = await AuthUser.findById(new Types.ObjectId(userId));
  console.log("user:", user);
  if (!user || !user.twitterAccessToken || !user.twitterAccessSecret || !user.twitterUserId) {
    console.log("User not connected to Twitter");
    return new Response(JSON.stringify({ success: false, error: "User not connected to Twitter" }), { status: 400 });
  }

  const client = new TwitterApi({
    appKey: process.env.TWITTER_API_KEY!,
    appSecret: process.env.TWITTER_API_SECRET!,
    accessToken: user.twitterAccessToken,
    accessSecret: user.twitterAccessSecret,
  });

  const tweetuserId = quest.userId;
  const completedTasks: Record<string, boolean> = {};

  try {
 let userTimelineData: any[] | null = null;

for (const task of requiredTasks) {
  switch (task) {
    case "like": {
      const likedTweetsResponse = await client.v2.userLikedTweets(user.twitterUserId, { max_results: 100 });
      const likedData = Array.isArray(likedTweetsResponse.data?.data)
        ? likedTweetsResponse.data.data
        : [];
      const tweetIds = likedData.map((t: any) => t.id);
      completedTasks.like = tweetIds.includes(String(tweetId));
      console.log("✅ Resultado like:", completedTasks.like);
      break;
    }
    case "retweet": {
      const searchResponse = await fetch(
        `https://api.twitter.com/2/tweets/search/recent?query=from:${user.twitterScreenName} is:retweet&tweet.fields=referenced_tweets,author_id,created_at`,
        {
          headers: {
            Authorization: `Bearer ${process.env.TWITTER_BEARER_TOKEN}`,
          },
        }
      );
      const json = await searchResponse.json();
      const retweets = Array.isArray(json.data) ? json.data : [];
      completedTasks.retweet = retweets.some((tweet: any) =>
        tweet.referenced_tweets?.some((ref: any) =>
          ref.type === "retweeted" && String(ref.id) === String(tweetId)
        )
      );
      console.log("✅ Resultado retweet:", completedTasks.retweet);
      break;
    }
    case "comment": {
      const searchResponse = await fetch(
        `https://api.twitter.com/2/tweets/search/recent?query=conversation_id:${tweetId}&tweet.fields=in_reply_to_user_id,author_id,created_at`,
        {
          headers: {
            Authorization: `Bearer ${process.env.TWITTER_BEARER_TOKEN}`,
          },
        }
      );
      const json = await searchResponse.json();
      const replies = Array.isArray(json.data) ? json.data : [];
      completedTasks.comment = replies.some((reply: any) =>
        String(reply.author_id) === String(user.twitterUserId)
      );
      console.log("✅ Resultado comment (reply):", completedTasks.comment);
      break;
    }
    default:
      break;
  }
}

userQuest.completedTasks = Object.fromEntries(
  requiredTasks.map(task => [task, completedTasks[task] || false])
);
console.log("userQuest.completedTasks:", userQuest.completedTasks);

const allRequiredCompleted = requiredTasks.every(task => userQuest.completedTasks[task] === true);
console.log("allRequiredCompleted:", allRequiredCompleted);

// Actualiza el estado del userQuest
if (allRequiredCompleted) {
  userQuest.status = "finished";
  console.log("Quest status set to completed");

  // Actualiza los participantes
  const updatedQuest = await Quest.findByIdAndUpdate(
    userQuest.questId,
    { 
      $inc: { 
        actualParticipants: 1,
        reservedParticipants: -1
      }
    },
    { new: true }
  );

  // Si ya se alcanzó el máximo, marca el quest como finalizado
  if (updatedQuest.actualParticipants >= updatedQuest.maxParticipants) {
    updatedQuest.status = "finished";
    await updatedQuest.save();
    console.log("Quest status set to completed");
  }
}



await userQuest.save();
console.log("userQuest saved");

return new Response(JSON.stringify({
  success: true,
  completedTasks: userQuest.completedTasks,
  status: userQuest.status,
}), { status: 200 });

} catch (error) {
  if (typeof error === "object" && error !== null && "code" in error && (error as any).code === 429) {
    console.error("Twitter API rate limit exceeded:", error);
    return new Response(JSON.stringify({
      success: false,
      error: "Has alcanzado el límite de verificaciones automáticas de Twitter. Intenta de nuevo en unos minutos."
    }), { status: 429 });
  }
  console.error("Error verifying tasks:", error);
  return new Response(JSON.stringify({ success: false, error: "Error verifying tasks" }), { status: 500 });
}
}