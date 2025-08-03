import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function POST(request: NextRequest) {
  try {
    console.log("⚠️  [DEPRECATED] /api/user/sync-nextauth endpoint called");
    console.log("🔍 Request headers:", Object.fromEntries(request.headers.entries()));
    
    const session = await getServerSession(authOptions);
    
    if (!session?.user) {
      return NextResponse.json(
        { 
          success: false, 
          error: "Not authenticated",
          message: "This endpoint is deprecated. User data is now automatically included in NextAuth sessions."
        },
        { status: 401 }
      );
    }

    // Log the request body to understand what's being sent
    let requestBody;
    try {
      requestBody = await request.json();
      console.log("📦 Request body:", requestBody);
    } catch (e) {
      console.log("📦 No JSON body or empty body");
    }

    // Since we now include all user data in the session itself,
    // this sync endpoint is no longer necessary
    return NextResponse.json({
      success: true,
      message: "Session data is now automatically included in NextAuth. This endpoint is deprecated.",
      user: session.user,
      deprecationNotice: "Please update your code to use NextAuth session data directly instead of calling this endpoint."
    });

  } catch (error) {
    console.error("❌ Error in deprecated sync-nextauth endpoint:", error);
    return NextResponse.json(
      { 
        success: false, 
        error: "Internal server error",
        message: "This endpoint is deprecated and should not be used."
      },
      { status: 500 }
    );
  }
}
