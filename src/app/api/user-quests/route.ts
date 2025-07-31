// MODIFICAR: c:\Users\Lian Li\Desktop\FrontEnd_Solcial\solcial\src\app\api\user-quests\route.ts

import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import { validateQuestJoin } from "@/lib/questValidation"; // ✅ CAMBIAR IMPORT
import { createQuestSession } from "@/lib/questSession";

export async function POST(req: NextRequest) {
  const requestId = Date.now();
  console.log(`🚀 [${requestId}] Starting user-quest creation...`);
  
  try {
    await connectDB();
    console.log(`✅ [${requestId}] Database connected`);

    const data = await req.json();
    console.log(`📝 [${requestId}] Request data:`, {
      userId: data.userId,
      questId: data.questId,
      walletaddress: data.walletaddress,
      tasksCount: data.tasks?.length || 0,
    });

    // ✅ BASIC INPUT VALIDATION
    if (!data.userId || !data.questId || !data.walletaddress) {
      console.log(`❌ [${requestId}] Missing required fields`);
      return NextResponse.json(
        { error: "Missing required fields: userId, questId, walletaddress" },
        { status: 400 }
      );
    }

    // ✅ QUEST JOIN VALIDATION (ESTRICTA)
    const questValidation = await validateQuestJoin( // ✅ CAMBIAR FUNCIÓN
      data.questId,
      data.userId,
      data.walletaddress
    );
    
    if (!questValidation.valid) {
      console.log(
        `❌ [${requestId}] Quest validation failed:`,
        questValidation.error
      );

      // ✅ MANEJAR CASO ESPECIAL: Ya completado
      if (questValidation.statusCode === 409 && questValidation.userQuest) {
        const userQuest = questValidation.userQuest;
        
        if (userQuest.status === "finished") {
          console.log(`ℹ️ [${requestId}] User already completed this quest, returning existing data`);
          
          return NextResponse.json({
            ...userQuest.toObject(),
            message: "Quest already completed",
            alreadyCompleted: true, // ✅ Flag para el frontend
          }, { status: 200 }); // ✅ 200 en lugar de error
        }
        
        if (userQuest.status === "active") {
          console.log(`ℹ️ [${requestId}] User already has active session, returning existing data`);
          
          return NextResponse.json({
            ...userQuest.toObject(),
            message: "Quest session already active",
            alreadyActive: true, // ✅ Flag para el frontend
          }, { status: 200 }); // ✅ 200 en lugar de error
        }
      }

      // ✅ Para otros errores, devolver error normal
      return NextResponse.json(
        { error: questValidation.error },
        { status: questValidation.statusCode || 400 }
      );
    }
    
    console.log(`✅ [${requestId}] Quest validations passed`);

    // ✅ CREATE QUEST SESSION
    console.log(`📊 [${requestId}] Creating quest session...`);
    
    const sessionResult = await createQuestSession({
      ...data,
      quest: questValidation.quest,
    });

    console.log(`📊 [${requestId}] Session result:`, {
      success: sessionResult.success,
      error: sessionResult.error,
      hasUserQuest: !!sessionResult.userQuest,
      sessionExpiresAt: sessionResult.sessionExpiresAt,
    });

    if (!sessionResult.success) {
      console.log(
        `❌ [${requestId}] Session creation failed:`,
        sessionResult.error
      );

      // ✅ DETERMINE APPROPRIATE STATUS CODE
      let statusCode = 400;

      if (
        sessionResult.error?.includes("very popular") ||
        sessionResult.error?.includes("Write conflict") ||
        sessionResult.error?.includes("too many requests")
      ) {
        statusCode = 429; // Too Many Requests
      } else if (
        sessionResult.error?.includes("already participating") ||
        sessionResult.error?.includes("Quest already completed") ||
        sessionResult.error?.includes("already active")
      ) {
        statusCode = 409; // Conflict
      } else if (sessionResult.error?.includes("No spots available")) {
        statusCode = 410; // Gone
      } else if (sessionResult.error?.includes("not found")) {
        statusCode = 404; // Not Found
      }

      return NextResponse.json(
        { error: sessionResult.error },
        { status: statusCode }
      );
    }

    console.log(`✅ [${requestId}] Quest session created successfully`);

    return NextResponse.json(
      {
        ...sessionResult.userQuest.toObject(),
        sessionExpiresAt: sessionResult.sessionExpiresAt,
        message: "Quest joined successfully",
      },
      { status: 201 }
    );
    
  } catch (error) {
    console.error(`❌ [${requestId}] Error in user-quests:`, error);
    return NextResponse.json(
      { error: "Internal server error. Please try again." },
      { status: 500 }
    );
  }
}