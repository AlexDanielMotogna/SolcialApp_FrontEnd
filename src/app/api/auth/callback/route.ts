import { NextRequest } from "next/server";
import { Types } from "mongoose";
import { TwitterApi } from "twitter-api-v2";
import AuthUser from "@/models/AuthUser";
import { MOCK_USER } from "@/context/MockUserContext";

console.log("id en mockUserDespues:", MOCK_USER.id);

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const oauth_verifier = searchParams.get("oauth_verifier");

  // Recupera los tokens de la cookie
  const cookie = req.headers.get("cookie") || "";
  const oauth_token_secret = cookie
    .split("; ")
    .find((row) => row.startsWith("oauth_token_secret="))
    ?.split("=")[1];
  const oauth_token = cookie
    .split("; ")
    .find((row) => row.startsWith("oauth_token="))
    ?.split("=")[1];

  console.log("id en mockUser:", MOCK_USER.id);

  if (!oauth_token || !oauth_verifier || !oauth_token_secret) {
    return new Response(
      "Missing oauth_token, oauth_verifier or oauth_token_secret",
      { status: 400 }
    );
  }

  // Crea el cliente temporal con los tokens
  const tempClient = new TwitterApi({
    appKey: process.env.TWITTER_API_KEY!,
    appSecret: process.env.TWITTER_API_SECRET!,
    accessToken: oauth_token,
    accessSecret: oauth_token_secret,
  });

  try {
    const { accessToken, accessSecret, screenName, userId } =
      await tempClient.login(oauth_verifier);

    console.log("id en mockUser2:", MOCK_USER.id);
    // Log tokens obtenidos
    console.log("Tokens obtenidos:", {
      accessToken,
      accessSecret,
      screenName,
      userId,
    });

    const user = await AuthUser.findOne({
      _id: new Types.ObjectId(MOCK_USER.id),
    });
    console.log("Usuario encontrado:", user);

    if (user) {
      user.twitterAccessToken = accessToken;
      user.twitterAccessSecret = accessSecret;
      user.twitterScreenName = screenName;
      user.twitterUserId = userId;
      await user.save();
      console.log("Tokens guardados en el usuario.");
    } else {
      console.log("Usuario mock NO encontrado en la base de datos.");
    }

    return new Response("Twitter account connected!", { status: 200 });
  } catch (error) {
    console.error("Error durante el proceso OAuth:", error);
    return new Response("Error during Twitter OAuth", { status: 500 });
  }
}
