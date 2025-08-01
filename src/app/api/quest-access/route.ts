// REEMPLAZAR COMPLETAMENTE: c:\Users\Lian Li\Desktop\FrontEnd_Solcial\solcial\src\app\api\quest-access\route.ts

import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import { getAuthenticatedUser, createAuthResponse } from "@/lib/auth-session";
import { validateQuestAccess } from "@/lib/questValidation";
import UserQuest from "@/models/UserQuest";

export async function POST(req: NextRequest) {
  const requestId = Date.now();
  console.log(`🔍 [${requestId}] Starting quest access validation...`);
  
  try {
    // ✅ OBTENER USUARIO DE LA SESIÓN (SEGURO)
    const authResult = await getAuthenticatedUser();
    const authError = createAuthResponse(authResult);
    if (authError) {
      console.log(`❌ [${requestId}] Authentication failed:`, authResult.error);
      return authError;
    }

    const { user } = authResult;
    if (!user) {
      console.log(`❌ [${requestId}] User object is null`);
      return NextResponse.json(
        { error: "User not found in session" },
        { status: 401 }
      );
    }
    console.log(`✅ [${requestId}] User authenticated:`, user.email);

    await connectDB();
    console.log(`✅ [${requestId}] Database connected`);

    const { questId } = await req.json();
    console.log(`📝 [${requestId}] Access request:`, {
      userId: user.id,
      questId,
      walletaddress: user.walletaddress,
    });

    // ✅ BASIC INPUT VALIDATION
    if (!questId) {
      console.log(`❌ [${requestId}] Missing questId`);
      return NextResponse.json(
        { error: "Quest ID is required" },
        { status: 400 }
      );
    }

    // ✅ QUEST ACCESS VALIDATION (USAR DATOS DE SESIÓN)
    const questValidation = await validateQuestAccess(
      questId,
      user.id, // ✅ DE LA SESIÓN
      user.walletaddress // ✅ DE LA SESIÓN
    );
    
    if (!questValidation.valid) {
      console.log(
        `❌ [${requestId}] Quest access denied:`,
        questValidation.error
      );
      return NextResponse.json(
        { error: questValidation.error },
        { status: questValidation.statusCode || 400 }
      );
    }
    
    console.log(`✅ [${requestId}] Quest access granted`);

    // ✅ RETURN QUEST AND USER QUEST DATA
    const response = {
      quest: questValidation.quest,
      userQuest: questValidation.userQuest || null,
      hasParticipated: !!questValidation.userQuest,
      canAccess: true,
      user: {
        id: user.id,
        hasTwitterAccess: user.hasTwitterAccess,
        walletaddress: user.walletaddress
      }
    };

    return NextResponse.json(response, { status: 200 });
    
  } catch (error) {
    console.error(`❌ [${requestId}] Error in quest-access:`, error);
    return NextResponse.json(
      { error: "Internal server error. Please try again." },
      { status: 500 }
    );
  }
}