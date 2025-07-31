// CREAR: c:\Users\Lian Li\Desktop\FrontEnd_Solcial\solcial\src\app\api\quest-access\route.ts

import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import { validateQuestAccess } from "@/lib/questValidation";
import UserQuest from "@/models/UserQuest";

export async function POST(req: NextRequest) {
  const requestId = Date.now();
  console.log(`🔍 [${requestId}] Starting quest access validation...`);
  
  try {
    await connectDB();
    console.log(`✅ [${requestId}] Database connected`);

    const { questId, userId, walletaddress } = await req.json();
    console.log(`📝 [${requestId}] Access request:`, {
      userId,
      questId,
      walletaddress,
    });

    // ✅ BASIC INPUT VALIDATION
    if (!userId || !questId || !walletaddress) {
      console.log(`❌ [${requestId}] Missing required fields`);
      return NextResponse.json(
        { error: "Missing required fields: userId, questId, walletaddress" },
        { status: 400 }
      );
    }

    // ✅ QUEST ACCESS VALIDATION (PERMISIVA)
    const questValidation = await validateQuestAccess(
      questId,
      userId,
      walletaddress
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