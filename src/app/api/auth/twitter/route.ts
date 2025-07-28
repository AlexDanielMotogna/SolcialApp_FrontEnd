import { NextRequest } from "next/server";
import { TwitterApi } from "twitter-api-v2";

export async function GET(req: NextRequest) {
  const client = new TwitterApi({
    appKey: process.env.TWITTER_API_KEY!,
    appSecret: process.env.TWITTER_API_SECRET!,
  });

  const { url, oauth_token, oauth_token_secret } = await client.generateAuthLink(
    process.env.OAUTH_CALLBACK_URL!,
    { linkMode: "authorize" }
  );

  // Crea los headers para las cookies
  const headers = new Headers();
  headers.append(
    "Set-Cookie",
    `oauth_token_secret=${oauth_token_secret}; Path=/; HttpOnly; SameSite=Lax`
  );
  headers.append(
    "Set-Cookie",
    `oauth_token=${oauth_token}; Path=/; HttpOnly; SameSite=Lax`
  );
  headers.append("Location", url);

  // Redirige al usuario a Twitter
  return new Response(null, {
    status: 302,
    headers,
  });
}