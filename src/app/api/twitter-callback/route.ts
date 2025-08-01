// CREAR: c:\Users\Lian Li\Desktop\FrontEnd_Solcial\solcial\src\app\api\twitter-callback\route.ts

import { NextRequest, NextResponse } from "next/server";
import { TwitterApi } from "twitter-api-v2";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { connectDB } from "@/lib/mongodb";
import AuthUser from "@/models/AuthUser";

export async function GET(req: NextRequest) {
  try {
    console.log('🐦 [CALLBACK] Twitter callback received');
    console.log('🔗 Full URL:', req.url);
    console.log('🔗 Search params:', req.nextUrl.searchParams.toString());

    const session = await getServerSession(authOptions);
    
    if (!session?.user?.email) {
      console.log('❌ [CALLBACK] No session found');
      return NextResponse.redirect(new URL('/dashboard/quests?error=no_session', req.url));
    }

    // ✅ USAR nextUrl EN LUGAR DE new URL()
    const oauth_token = req.nextUrl.searchParams.get('oauth_token');
    const oauth_verifier = req.nextUrl.searchParams.get('oauth_verifier');
    const denied = req.nextUrl.searchParams.get('denied');

    console.log('🔗 Callback params:', { oauth_token, oauth_verifier, denied });
    console.log('🍪 Cookies:', {
      oauth_token_secret: req.cookies.get('oauth_token_secret')?.value ? 'EXISTS' : 'MISSING',
      oauth_token_cookie: req.cookies.get('oauth_token')?.value ? 'EXISTS' : 'MISSING'
    });

    if (denied) {
      console.log('❌ [CALLBACK] Twitter auth denied');
      return NextResponse.redirect(new URL('/dashboard/quests?error=denied', req.url));
    }

    if (!oauth_token || !oauth_verifier) {
      console.log('❌ [CALLBACK] Missing OAuth parameters');
      console.log('❌ [CALLBACK] oauth_token:', oauth_token);
      console.log('❌ [CALLBACK] oauth_verifier:', oauth_verifier);
      return NextResponse.redirect(new URL('/dashboard/quests?error=missing_params', req.url));
    }

    const oauth_token_secret = req.cookies.get('oauth_token_secret')?.value;
    
    if (!oauth_token_secret) {
      console.log('❌ [CALLBACK] Missing OAuth token secret in cookies');
      return NextResponse.redirect(new URL('/dashboard/quests?error=missing_secret', req.url));
    }

    console.log('✅ [CALLBACK] Processing OAuth for user:', session.user.email);

    // ✅ CREAR CLIENT CON TOKENS TEMPORALES
    const client = new TwitterApi({
      appKey: process.env.TWITTER_API_KEY!,
      appSecret: process.env.TWITTER_API_SECRET!,
      accessToken: oauth_token,
      accessSecret: oauth_token_secret,
    });

    // ✅ INTERCAMBIAR POR TOKENS PERMANENTES
    const loginResult = await client.login(oauth_verifier);
    
    // ✅ OBTENER DATOS DEL USUARIO
    const twitterUser = await loginResult.client.v2.me();
    
    console.log('✅ [API] Twitter user data:', twitterUser.data.username);

    // ✅ GUARDAR EN BASE DE DATOS
    await connectDB();
    
    const updatedUser = await AuthUser.findOneAndUpdate(
      { email: session.user.email },
      {
        $set: {
          hasTwitterAccess: true,
          twitterUserId: twitterUser.data.id,
          twitterScreenName: twitterUser.data.username,
          twitterAccessToken: loginResult.accessToken,
          twitterAccessSecret: loginResult.accessSecret,
          twitterConnectedAt: new Date(),
        }
      },
      { new: true }
    );

    if (!updatedUser) {
      console.error('❌ [API] User not found for Twitter update');
      return NextResponse.redirect(new URL('/dashboard/quests?twitter_error=user_not_found', req.url));
    }

    console.log('✅ [API] Twitter connection saved for user:', updatedUser.email);

    // ✅ LIMPIAR COOKIES Y REDIRIGIR
    const response = NextResponse.redirect(new URL('/dashboard/quests?twitter_success=true', req.url));
    response.cookies.delete('oauth_token');
    response.cookies.delete('oauth_token_secret');

    return response;

  } catch (error) {
    console.error('❌ [CALLBACK] Error:', error);
    return NextResponse.redirect(new URL('/dashboard/quests?twitter_error=server_error', req.url));
  }
}