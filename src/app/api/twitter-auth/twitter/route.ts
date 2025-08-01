import { NextRequest, NextResponse } from "next/server";
import { TwitterApi } from "twitter-api-v2";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export async function GET(req: NextRequest) {
  try {
    console.log('🐦 [API] Twitter auth request received');
    console.log('🔑 API Key exists:', !!process.env.TWITTER_API_KEY);
    console.log('🔑 API Secret exists:', !!process.env.TWITTER_API_SECRET);
    console.log('🌐 NextAuth URL:', process.env.NEXTAUTH_URL);

    const session = await getServerSession(authOptions);
    
    if (!session?.user?.email) {
      console.log('❌ [API] No session found for Twitter auth');
      return NextResponse.json({ error: "Authentication required" }, { status: 401 });
    }

    console.log('✅ [API] User authenticated for Twitter:', session.user.email);

    const client = new TwitterApi({
      appKey: process.env.TWITTER_API_KEY!,
      appSecret: process.env.TWITTER_API_SECRET!,
    });

    const callbackUrl = `${process.env.NEXTAUTH_URL}/api/twitter-callback`;
    console.log('🔗 Using callback URL:', callbackUrl);

    const authLink = await client.generateAuthLink(callbackUrl);

    console.log('✅ [API] Generated Twitter auth link');
    console.log('🔗 Auth URL:', authLink.url);
    console.log('🎫 OAuth Token:', authLink.oauth_token);
    console.log('🔐 OAuth Secret exists:', !!authLink.oauth_token_secret);

    const response = NextResponse.redirect(authLink.url);
    
    response.cookies.set("oauth_token_secret", authLink.oauth_token_secret, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 15,
      sameSite: 'lax',
    });
    
    response.cookies.set("oauth_token", authLink.oauth_token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 15,
      sameSite: 'lax',
    });

    console.log('✅ [API] Cookies set, redirecting to Twitter');

    return response;

  } catch (error) {
    if (error instanceof Error) {
      console.error("❌ [API] Detailed error:", {
        message: error.message,
        // Optionally add more properties if you know the error shape
      });
    } else {
      console.error("❌ [API] Unknown error:", error);
    }
    return NextResponse.json({ error: "Failed to generate Twitter auth link" }, { status: 500 });
  }
}