// MODIFICAR: c:\Users\Lian Li\Desktop\FrontEnd_Solcial\solcial\src\app\api\user-quests\verify-twitter\route.ts

import { NextRequest } from "next/server";
import { getServerSession } from "next-auth"; // ✅ AGREGAR
import { authOptions } from "@/lib/auth"; // ✅ AGREGAR
import { connectDB } from "@/lib/mongodb"; // ✅ AGREGAR
import Quest from "@/models/Quest";
import UserQuest from "@/models/UserQuest";
import AuthUser from "@/models/AuthUser";
import { TwitterApi } from "twitter-api-v2";
import { Types } from "mongoose";

export async function POST(req: NextRequest) {
  try {
    console.log("🐦 [API] POST /verify-twitter - Starting verification");

    // ✅ OBTENER SESIÓN EN LUGAR DE userId DEL BODY
    const session = await getServerSession(authOptions);

    if (!session?.user?.email) {
      console.log("❌ [API] No session found for Twitter verification");
      return new Response(
        JSON.stringify({
          success: false,
          error: "Authentication required",
        }),
        { status: 401 }
      );
    }

    // ✅ OBTENER SOLO userQuestId DEL BODY
    const { userQuestId } = await req.json();
    console.log(
      "✅ [API] Verifying Twitter for user:",
      session.user.email,
      "userQuestId:",
      userQuestId
    );

    // ✅ CONECTAR A DB
    await connectDB();

    // ✅ BUSCAR USER POR EMAIL DE LA SESIÓN
    const user = await AuthUser.findOne({ email: session.user.email });

    if (!user) {
      console.log("❌ [API] User not found in database:", session.user.email);
      return new Response(
        JSON.stringify({
          success: false,
          error: "User not found",
        }),
        { status: 404 }
      );
    }

    console.log("✅ [API] User found:", user.email);

    // ✅ VERIFICAR CONEXIÓN DE TWITTER
    if (
      !user.twitterAccessToken ||
      !user.twitterAccessSecret ||
      !user.twitterUserId
    ) {
      console.log("❌ [API] User not connected to Twitter");
      return new Response(
        JSON.stringify({
          success: false,
          error: "User not connected to Twitter",
        }),
        { status: 400 }
      );
    }

    // ✅ BUSCAR USERQUEST
    const userQuest = await UserQuest.findById(userQuestId);
    console.log("✅ [API] UserQuest:", userQuest?.status);

    if (!userQuest) {
      console.log("❌ [API] UserQuest not found");
      return new Response(
        JSON.stringify({
          success: false,
          error: "Session not found",
        }),
        { status: 404 }
      );
    }

    // ✅ VERIFICAR QUE EL USERQUEST PERTENECE AL USUARIO
    if (
      userQuest.userId.toString() !==
      (user as { _id: Types.ObjectId })._id.toString()
    ) {
      console.log("❌ [API] UserQuest doesn't belong to user");
      return new Response(
        JSON.stringify({
          success: false,
          error: "Unauthorized",
        }),
        { status: 403 }
      );
    }

    // ✅ BUSCAR QUEST
    const quest = await Quest.findById(userQuest.questId);
    console.log("✅ [API] Quest found:", quest?.questName);

    if (!quest) {
      console.log("❌ [API] Quest not found");
      return new Response(
        JSON.stringify({
          success: false,
          error: "Quest not found",
        }),
        { status: 404 }
      );
    }

    const tweetId = quest.tweetLink.split("/").pop();
    console.log("✅ [API] Tweet ID:", tweetId);

    const requiredTasks = Object.keys(quest.tasks).filter(
      (task) => quest.tasks[task]
    );
    console.log("✅ [API] Required tasks:", requiredTasks);

    // ✅ CREAR CLIENTE TWITTER
    const client = new TwitterApi({
      appKey: process.env.TWITTER_API_KEY!,
      appSecret: process.env.TWITTER_API_SECRET!,
      accessToken: user.twitterAccessToken,
      accessSecret: user.twitterAccessSecret,
    });

    const completedTasks: Record<string, boolean> = {};

    // ✅ VERIFICAR TAREAS
    for (const task of requiredTasks) {
      switch (task) {
        case "like": {
          const likedTweetsResponse = await client.v2.userLikedTweets(
            user.twitterUserId,
            { max_results: 100 }
          );
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
            tweet.referenced_tweets?.some(
              (ref: any) =>
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
          completedTasks.comment = replies.some(
            (reply: any) =>
              String(reply.author_id) === String(user.twitterUserId)
          );
          console.log("✅ Resultado comment (reply):", completedTasks.comment);
          break;
        }
        default:
          break;
      }
    }

    // ✅ ACTUALIZAR USERQUEST
    userQuest.completedTasks = Object.fromEntries(
      requiredTasks.map((task) => [task, completedTasks[task] || false])
    );

    const allRequiredCompleted = requiredTasks.every(
      (task) => userQuest.completedTasks[task] === true
    );
    console.log("✅ [API] All tasks completed:", allRequiredCompleted);

    if (allRequiredCompleted) {
      userQuest.status = "finished";
      console.log("✅ [API] Quest completed!");

      // ✅ ACTUALIZAR PARTICIPANTES
      const updatedQuest = await Quest.findByIdAndUpdate(
        userQuest.questId,
        {
          $inc: {
            actualParticipants: 1,
            reservedParticipants: -1,
          },
        },
        { new: true }
      );

      if (updatedQuest.actualParticipants >= updatedQuest.maxParticipants) {
        updatedQuest.status = "finished";
        await updatedQuest.save();
        console.log("✅ [API] Quest reached max participants");
      }
    }

    await userQuest.save();
    console.log("✅ [API] UserQuest saved successfully");

    return new Response(
      JSON.stringify({
        success: true,
        completedTasks: userQuest.completedTasks,
        status: userQuest.status,
      }),
      { status: 200 }
    );
  } catch (error) {
    console.error("❌ [API] Error verifying Twitter tasks:", error);

    if (
      typeof error === "object" &&
      error !== null &&
      "code" in error &&
      (error as any).code === 429
    ) {
      return new Response(
        JSON.stringify({
          success: false,
          error: "Twitter API rate limit exceeded. Try again in a few minutes.",
        }),
        { status: 429 }
      );
    }

    return new Response(
      JSON.stringify({
        success: false,
        error: "Error verifying tasks",
      }),
      { status: 500 }
    );
  }
}
