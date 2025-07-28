import { NextRequest } from "next/server";
import { TwitterApi } from "twitter-api-v2";
import { connectDB } from "@/lib/mongodb";
import Quest from "@/models/Quest";

export async function POST(req: NextRequest) {
  await connectDB();

  const { tweetLink, questName, description } = await req.json();

  if (!tweetLink || !questName) {
    return new Response(JSON.stringify({ success: false, error: "Faltan campos requeridos" }), { status: 400 });
  }

  const tweetId = tweetLink.split("/").pop();

  try {
    const client = new TwitterApi({
      appKey: process.env.TWITTER_API_KEY!,
      appSecret: process.env.TWITTER_API_SECRET!,
      accessToken: process.env.TWITTER_ACCESS_TOKEN!,
      accessSecret: process.env.TWITTER_ACCESS_TOKEN_SECRET!,
    });

    const tweetData = await client.v2.singleTweet(tweetId!, {
      "tweet.fields": "author_id"
    });

    const authorId = tweetData?.data?.author_id;

    if (!authorId) {
      return new Response(JSON.stringify({ success: false, error: "No se pudo obtener el authorId" }), { status: 400 });
    }

    const quest = new Quest({
      tweetLink,
      questName,
      description,
      authorId,
      tasks: { like: true } // puedes personalizar las tareas
    });

    await quest.save();

    return new Response(JSON.stringify({ success: true, quest }), { status: 201 });
  } catch (err) {
    console.error("❌ Error creando quest:", err);
    return new Response(JSON.stringify({ success: false, error: "Error al crear quest" }), { status: 500 });
  }
}

export async function GET(req: NextRequest) {
  await connectDB();
  const { searchParams } = new URL(req.url);
  const userId = searchParams.get("userId");

  if (!userId) {
    return new Response(JSON.stringify({ success: false, error: "Falta userId" }), { status: 400 });
  }

  const quests = await Quest.find({ userId });
  return new Response(JSON.stringify({ success: true, quests }), { status: 200 });
}