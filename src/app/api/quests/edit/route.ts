import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Quest from "@/models/Quest";

export async function POST(req: NextRequest) {
  try {
    await connectDB();
    
    const {
      questId,
      questName,
      description,
      startDate,
      startTime,
      endDate,
      endTime,
      tasks,
      tweetLink,
      // ✅ AGREGAR CAMPOS DE BANNER
      banner,
      bannerPublicId,
      bannerChanged,
      oldBannerPublicId,
    } = await req.json();

    // Verificar que el quest existe
    const existingQuest = await Quest.findById(questId);
    if (!existingQuest) {
      return NextResponse.json(
        { error: "Quest not found" },
        { status: 404 }
      );
    }

    // Verificar que el quest no haya empezado
    const startDateTime = new Date(`${startDate}T${startTime}`);
    if (new Date() >= startDateTime) {
      return NextResponse.json(
        { error: "Cannot edit quest that has already started" },
        { status: 400 }
      );
    }

    // Preparar datos de actualización
    const updateData: any = {
      questName,
      description,
      startDateTime,
      endDateTime: new Date(`${endDate}T${endTime}`),
      tasks,
      tweetLink,
      updatedAt: new Date(),
    };

    // ✅ ACTUALIZAR BANNER SI SE CAMBIÓ
    if (bannerChanged || banner || bannerPublicId) {
      updateData.banner = banner || "";
      updateData.bannerPublicId = bannerPublicId || "";
    }

    // Actualizar quest
    const updatedQuest = await Quest.findByIdAndUpdate(
      questId,
      updateData,
      { new: true }
    );

    console.log("✅ Quest updated successfully:", {
      questId,
      questName,
      bannerChanged,
      hasBanner: !!banner,
    });

    return NextResponse.json({
      success: true,
      message: "Quest updated successfully",
      quest: updatedQuest,
    });

  } catch (error) {
    console.error("❌ Error updating quest:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}