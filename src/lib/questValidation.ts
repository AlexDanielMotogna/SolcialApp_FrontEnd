import Quest from "@/models/Quest";
import UserQuest from "@/models/UserQuest";

interface QuestValidationResult {
  valid: boolean;
  error?: string;
  statusCode?: number;
  quest?: any;
  userQuest?: any;
}

//
export async function validateQuestJoin(
  questId: string,
  userId: string,
  walletaddress: string,
  twitter_id?: string
): Promise<QuestValidationResult> {
  console.log("🔍 Starting quest JOIN validation for:", {
    questId,
    userId,
    walletaddress,
  });

  try {
    // 1. Verify that the quest exists
    const quest = await Quest.findById(questId);
    console.log(
      "🎯 Quest found:",
      quest ? `ID: ${quest._id}, Status: ${quest.status}` : "NOT FOUND"
    );

    if (!quest) {
      return {
        valid: false,
        error: "Quest not found",
        statusCode: 404,
      };
    }

    // 2. Verify if the quest is repeatable
    const currentTime = new Date();
    const questStartTime = new Date(quest.startDateTime);

    if (currentTime < questStartTime) {
      const timeUntilStart = questStartTime.getTime() - currentTime.getTime();
      const minutesUntilStart = Math.ceil(timeUntilStart / (1000 * 60));
      const hoursUntilStart = Math.ceil(timeUntilStart / (1000 * 60 * 60));

      const timeMessage =
        hoursUntilStart > 1
          ? `Quest starts in ${hoursUntilStart} hours`
          : `Quest starts in ${minutesUntilStart} minutes`;

      return {
        valid: false,
        error: timeMessage,
        statusCode: 400,
      };
    }

    // 3. Verify quest status
    if (quest.status !== "active") {
      return {
        valid: false,
        error: `Quest is ${quest.status}`,
        statusCode: 400,
      };
    }

    // 4. Verify if the quest has ended
    if (currentTime > new Date(quest.endDateTime)) {
      return {
        valid: false,
        error: "Quest has ended",
        statusCode: 400,
      };
    }

    // 5. Verify if there are available spots
    if (quest.actualParticipants >= quest.maxParticipants) {
      return {
        valid: false,
        error: "No spots available",
        statusCode: 410,
      };
    }

    // 6. Verify if the user has already joined the quest
    if (!quest.repeatable) {
      const existingSession = await UserQuest.findOne({
        questId,
        $or: [{ userId }, { walletaddress }, { twitter_id }],
        status: { $in: ["active", "finished"] },
      });

      if (existingSession) {
        const errorMessage =
          existingSession.status === "finished"
            ? "Quest already completed"
            : "Quest already active";

        return {
          valid: false,
          error: errorMessage,
          statusCode: 409,
          userQuest: existingSession,
        };
      }
    }

    return {
      valid: true,
      quest,
    };
  } catch (error) {
    console.error("❌ Error in quest join validation:", error);
    return {
      valid: false,
      error: "Internal validation error",
      statusCode: 500,
    };
  }
}

// ✅ NUEVA: Para acceder a un quest (validación permisiva)
export async function validateQuestAccess(
  questId: string,
  userId: string,
  walletaddress: string
): Promise<QuestValidationResult> {
  console.log("🔍 Starting quest ACCESS validation for:", {
    questId,
    userId,
    walletaddress,
  });

  try {
    // 1. Verificar que el quest existe
    const quest = await Quest.findById(questId);

    if (!quest) {
      return {
        valid: false,
        error: "Quest not found",
        statusCode: 404,
      };
    }

    // 2. Buscar userQuest si existe
    const userQuest = await UserQuest.findOne({
      questId,
      $or: [{ userId }, { walletaddress }],
    });

    // ✅ Si el usuario tiene un quest (activo o completado), SIEMPRE permitir acceso
    if (userQuest) {
      console.log("✅ User has participation, granting access");
      return {
        valid: true,
        quest,
        userQuest,
      };
    }

    // ✅ Si no tiene userQuest, aplicar validaciones normales para unirse
    return await validateQuestJoin(
      questId,
      userId,
      walletaddress,
      quest.twitter_id
    );
  } catch (error) {
    console.error("❌ Error in quest access validation:", error);
    return {
      valid: false,
      error: "Internal validation error",
      statusCode: 500,
    };
  }
}

// ✅ MANTENER: Para validar constraints
export async function validateQuestConstraints(
  quest: any
): Promise<QuestValidationResult> {
  console.log("🔧 Validating quest constraints...");

  try {
    if (quest.reservedParticipants >= quest.maxParticipants) {
      return {
        valid: false,
        error: "Quest is very popular, please try again in a moment",
        statusCode: 429,
      };
    }

    return {
      valid: true,
      quest,
    };
  } catch (error) {
    console.error("❌ Error validating quest constraints:", error);
    return {
      valid: false,
      error: "Error validating quest constraints",
      statusCode: 500,
    };
  }
}
