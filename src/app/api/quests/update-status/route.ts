import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import Quest from '@/models/Quest';

export async function POST(req: NextRequest) {
  try {
    await connectDB();

    const quests = await Quest.find({
      status: { $in: ["active", "pending"] }
    });

    const now = new Date();
    let updatedCount = 0;

    for (const quest of quests) {
      let shouldUpdate = false;
      let newStatus = quest.status;

      // ✅ VERIFICAR SI EL TIEMPO SE ACABÓ
      const endTime = new Date(quest.endDateTime);
      if (now > endTime && quest.status !== "finished") {
        newStatus = "finished";
        shouldUpdate = true;
      }

      // ✅ VERIFICAR SI SE ALCANZÓ EL MÁXIMO DE PARTICIPANTES
      if (quest.actualParticipants >= quest.maxParticipants && quest.status !== "finished") {
        newStatus = "finished";
        shouldUpdate = true;
      }

      if (shouldUpdate) {
        await Quest.findByIdAndUpdate(quest._id, {
          status: newStatus,
          updatedAt: now
        });
        updatedCount++;
      }
    }

    return NextResponse.json({
      success: true,
      message: `Updated ${updatedCount} quests`,
      updatedCount
    });

  } catch (error) {
    console.error('Error updating quest status:', error);
    return NextResponse.json({
      success: false,
      error: 'Failed to update quest status'
    }, { status: 500 });
  }
}