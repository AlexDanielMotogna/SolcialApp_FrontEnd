import { NextRequest } from "next/server";
import { Types } from "mongoose";
import { TwitterApi } from "twitter-api-v2";
import AuthUser from "@/models/AuthUser";
import { connectDB } from "@/lib/mongodb";

// Usa el ID del usuario de pruebas directamente (solo para desarrollo)
const MOCK_USER_ID = "6883f941a7f69d335b0d2184";

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

  if (!oauth_token || !oauth_verifier || !oauth_token_secret) {
    // ✅ REDIRIGIR CON ERROR
    return Response.redirect(new URL('/dashboard/quests?twitter=error', req.url));
  }

  // Crea el cliente temporal con los tokens
  const tempClient = new TwitterApi({
    appKey: process.env.TWITTER_API_KEY!,
    appSecret: process.env.TWITTER_API_SECRET!,
    accessToken: oauth_token,
    accessSecret: oauth_token_secret,
  });

  try {
    await connectDB();
    
    const { accessToken, accessSecret, screenName, userId } =
      await tempClient.login(oauth_verifier);

    console.log("Tokens obtenidos:", {
      accessToken,
      accessSecret,
      screenName,
      userId,
    });

    // Busca el usuario de pruebas directamente por ID
    const user = await AuthUser.findOne({
      _id: new Types.ObjectId(MOCK_USER_ID),
    });
    
    console.log("Usuario encontrado:", user);
    
    if (user) {
      user.twitterAccessToken = accessToken;
      user.twitterAccessSecret = accessSecret;
      user.twitterScreenName = screenName;
      user.twitterUserId = userId;
      user.hasTwitterAccess = true;
      await user.save();
      console.log("Tokens guardados en el usuario.");
      
      // ✅ REDIRIGIR CON ÉXITO
      return Response.redirect(new URL('/dashboard/quests?twitter=success', req.url));
    } else {
      console.log("Usuario mock NO encontrado en la base de datos.");
      // ✅ REDIRIGIR CON ERROR DE USUARIO
      return Response.redirect(new URL('/dashboard/quests?twitter=user_not_found', req.url));
    }

  } catch (error) {
    console.error("Error durante el proceso OAuth:", error);
    // ✅ REDIRIGIR CON ERROR DE OAUTH
    return Response.redirect(new URL('/dashboard/quests?twitter=oauth_error', req.url));
  }
}