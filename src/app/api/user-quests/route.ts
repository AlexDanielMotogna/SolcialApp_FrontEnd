import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import { getAuthenticatedUser, createAuthResponse } from "@/lib/auth-session";
import { validateQuestJoin } from "@/lib/questValidation";
import { createQuestSession } from "@/lib/questSession";

export async function POST(req: NextRequest) {
  const requestId = Date.now();
  console.log(`🚀 [${requestId}] Starting user-quest creation...`);
  
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
      console.log(`❌ [${requestId}] User object is null after authentication`);
      return NextResponse.json(
        { error: "Authenticated user not found" },
        { status: 401 }
      );
    }
    console.log(`✅ [${requestId}] User authenticated:`, user.email);

    await connectDB();
    console.log(`✅ [${requestId}] Database connected`);

    const data = await req.json();
    console.log(`📝 [${requestId}] Request data:`, {
      userId: user.id, // ✅ DE LA SESIÓN
      questId: data.questId,
      walletaddress: user.walletaddress, // ✅ DE LA SESIÓN
      tasksCount: data.tasks?.length || 0,
    });

    // ✅ BASIC INPUT VALIDATION
    if (!data.questId) {
      console.log(`❌ [${requestId}] Missing questId`);
      return NextResponse.json(
        { error: "Quest ID is required" },
        { status: 400 }
      );
    }

    // ✅ QUEST JOIN VALIDATION CON DATOS DE SESIÓN
    const questValidation = await validateQuestJoin(
      data.questId,
      user.id, // ✅ DE LA SESIÓN
      user.walletaddress // ✅ DE LA SESIÓN
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
            alreadyCompleted: true,
          }, { status: 200 });
        }
        
        if (userQuest.status === "active") {
          console.log(`ℹ️ [${requestId}] User already has active session, returning existing data`);
          
          return NextResponse.json({
            ...userQuest.toObject(),
            message: "Quest session already active",
            alreadyActive: true,
          }, { status: 200 });
        }
      }

      return NextResponse.json(
        { error: questValidation.error },
        { status: questValidation.statusCode || 400 }
      );
    }
    
    console.log(`✅ [${requestId}] Quest validations passed`);

    // ✅ CREATE QUEST SESSION CON DATOS DE SESIÓN
    console.log(`📊 [${requestId}] Creating quest session...`);
    
    const sessionResult = await createQuestSession({
      ...data,
      userId: user.id, // ✅ DE LA SESIÓN
      walletaddress: user.walletaddress, // ✅ DE LA SESIÓN
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
        statusCode = 429;
      } else if (
        sessionResult.error?.includes("already participating") ||
        sessionResult.error?.includes("Quest already completed") ||
        sessionResult.error?.includes("already active")
      ) {
        statusCode = 409;
      } else if (sessionResult.error?.includes("No spots available")) {
        statusCode = 410;
      } else if (sessionResult.error?.includes("not found")) {
        statusCode = 404;
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