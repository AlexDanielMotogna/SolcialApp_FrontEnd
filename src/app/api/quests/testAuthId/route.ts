// src/app/api/quests/testAuthId/route.ts

import { NextRequest } from "next/server";
import { TwitterApi } from "twitter-api-v2";

export async function POST(req: NextRequest) {
  const { tweetLink } = await req.json();

  const tweetId = tweetLink?.split("/").pop();

  if (!tweetId) {
    return new Response(JSON.stringify({ success: false, error: "Tweet ID no válido" }), { status: 400 });
  }

  try {
    const client = new TwitterApi({
      appKey: process.env.TWITTER_API_KEY!,
      appSecret: process.env.TWITTER_API_SECRET!,
      accessToken: process.env.TWITTER_ACCESS_TOKEN!,
      accessSecret: process.env.TWITTER_ACCESS_TOKEN_SECRET!,
    });

    const tweetData = await client.v2.singleTweet(tweetId, {
      "tweet.fields": "author_id"
    });

    const authorId = tweetData?.data?.author_id;

    if (!authorId) {
      return new Response(JSON.stringify({ success: false, error: "No se pudo obtener el authorId" }), { status: 404 });
    }

    return new Response(JSON.stringify({
      success: true,
      authorId,
      tweetId
    }), { status: 200 });

  } catch (err) {
    console.error("❌ Error:", err);
    return new Response(JSON.stringify({ success: false, error: "Error consultando Twitter API" }), { status: 500 });
  }
}
