// src/app/api/quests/testAuthId/route.ts

import { NextRequest } from "next/server";
import { TwitterApi } from "twitter-api-v2";

export async function POST(req: NextRequest) {
  const { tweetLink } = await req.json();

  const tweetId = tweetLink?.split("/").pop();
  console.log("tweetLink recibido:", tweetLink);
  console.log("tweetId extraído:", tweetId);

  // Validación básica del tweetId
  if (!tweetId) {
    console.log("Tweet ID no válido");
    return new Response(JSON.stringify({ success: false, error: "Tweet ID no válido" }), { status: 400 });
  }

  try {
    console.log("TWITTER_API_KEY:", process.env.TWITTER_API_KEY ? "OK" : "NO");
    console.log("TWITTER_API_SECRET:", process.env.TWITTER_API_SECRET ? "OK" : "NO");
    console.log("TWITTER_ACCESS_TOKEN:", process.env.TWITTER_ACCESS_TOKEN ? "OK" : "NO");
    console.log("TWITTER_ACCESS_TOKEN_SECRET:", process.env.TWITTER_ACCESS_TOKEN_SECRET ? "OK" : "NO");

    const client = new TwitterApi({
      appKey: process.env.TWITTER_API_KEY!,
      appSecret: process.env.TWITTER_API_SECRET!,
      accessToken: process.env.TWITTER_ACCESS_TOKEN!,
      accessSecret: process.env.TWITTER_ACCESS_TOKEN_SECRET!,
    });

    console.log("Consultando tweet en Twitter API...");
    const tweetData = await client.v2.singleTweet(tweetId, {
      "tweet.fields": "author_id"
    });
    console.log("Respuesta de Twitter API:", tweetData);

    const userId = tweetData?.data?.author_id;
    console.log("author_id obtenido:", userId);

    if (!userId) {
      console.log("No se pudo obtener el userId del tweet");
      return new Response(JSON.stringify({ success: false, error: "No se pudo obtener el userId" }), { status: 404 });
    }

    return new Response(JSON.stringify({
      success: true,
      userId,
      tweetId
    }), { status: 200 });

  } catch (err) {
    console.error("❌ Error consultando Twitter API:", err);
    return new Response(JSON.stringify({ success: false, error: "Error consultando Twitter API" }), { status: 500 });
  }
}