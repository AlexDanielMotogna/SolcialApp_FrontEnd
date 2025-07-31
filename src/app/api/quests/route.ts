import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Quest from "@/models/Quest";
import mongoose from "mongoose";

// ============================================================================
// CREATE QUEST - POST
// ============================================================================
export async function POST(request: Request) {
  try {
    await connectDB();
    const data = await request.json();

    // Calculate rewardPerTask on the backend
    const maxParticipants = Number(data.maxParticipants);
    const rewardPool = Number(data.rewardPool);
    
    // ✅ CALCULATE as number first
    const rewardPerTaskNumber = 
      !isNaN(rewardPool) && !isNaN(maxParticipants) && maxParticipants > 0
        ? rewardPool / maxParticipants
        : 0;

    // ✅ CONVERT to Decimal128 for MongoDB
    const rewardPerTaskDecimal = mongoose.Types.Decimal128.fromString(rewardPerTaskNumber.toFixed(6));
    const rewardPoolDecimal = mongoose.Types.Decimal128.fromString(rewardPool.toFixed(6));

    console.log("💰 Calculated rewardPerTask:", rewardPerTaskNumber);
    console.log("💰 As Decimal128:", rewardPerTaskDecimal);

    delete data.rewardPerTask; // eliminate any value that comes from the frontend

    // Extract userId from data or set it explicitly
    const userId = data.userId; 
    console.log("User ID:", userId);
    const authorId = data.authorId;
    
    const quest = await Quest.create({
      ...data,
      rewardPool: rewardPoolDecimal,     // ✅ USE Decimal128
      rewardPerTask: rewardPerTaskDecimal, // ✅ USE Decimal128
      userId,
      authorId,
    });

    return NextResponse.json({ quest }, { status: 201 });
  } catch (error) {
    console.error("Error creating quest:", error);
    return NextResponse.json({ message: "Error creating quest", error }, { status: 500 });
  }
}

// ============================================================================
// FETCH QUESTS WITH PAGINATION - GET
// ============================================================================
export async function GET(req: NextRequest) {
  try {
    await connectDB();
    
    const { searchParams } = new URL(req.url);
    
    // ✅ PAGINATION PARAMETERS
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "6");
    const filter = searchParams.get("filter") || "";
    const sort = searchParams.get("sort") || "newest";
    
    // ✅ VALIDATE PARAMETERS
    const validatedPage = Math.max(1, page);
    const validatedLimit = Math.max(1, Math.min(100, limit)); // maximum 100 per page
    const skip = (validatedPage - 1) * validatedLimit;
    
    console.log("🔍 Query params:", { page: validatedPage, limit: validatedLimit, filter, sort });
    
    // ✅ BUILD MONGODB FILTER
    let mongoFilter: any = {};
    
    if (filter === "active") {
      mongoFilter.status = "active";
    } else if (filter === "finished") {
      mongoFilter.status = "finished";
    } else if (filter === "canceled") {
      mongoFilter.status = "canceled";
    }
    
    console.log("🔍 MongoDB filter:", mongoFilter);
    
    // ✅ BUILD MONGODB SORT
    let mongoSort: any = {};
    
    switch (sort) {
      case "oldest":
        mongoSort.createdAt = 1;
        break;
      case "newest":
        mongoSort.createdAt = -1;
        break;
      case "biggest":
        mongoSort.rewardPool = -1;
        break;
      case "lowest":
        mongoSort.rewardPool = 1;
        break;
      default:
        mongoSort.createdAt = -1; // newest by default
    }
    
    console.log("🔍 MongoDB sort:", mongoSort);
    
    // ✅ EXECUTE QUERIES IN PARALLEL FOR BETTER PERFORMANCE
    const [quests, totalCount] = await Promise.all([
      Quest.find(mongoFilter)
        .sort(mongoSort)
        .skip(skip)
        .limit(validatedLimit)
        .lean(), // better performance
      Quest.countDocuments(mongoFilter)
    ]);
    
    // ✅ CALCULATE PAGINATION METADATA
    const totalPages = Math.ceil(totalCount / validatedLimit);
    const hasNext = validatedPage < totalPages;
    const hasPrev = validatedPage > 1;
    
    console.log("✅ Query results:", {
      questsFound: quests.length,
      totalCount,
      totalPages,
      currentPage: validatedPage
    });
    
    // ✅ RESPONSE WITH PAGINATION
    return NextResponse.json({
      quests,
      pagination: {
        currentPage: validatedPage,
        totalPages,
        totalCount,
        hasNext,
        hasPrev,
        limit: validatedLimit,
        skip,
        // ✅ ADDITIONAL USEFUL METADATA
        isFirstPage: validatedPage === 1,
        isLastPage: validatedPage === totalPages,
        nextPage: hasNext ? validatedPage + 1 : null,
        prevPage: hasPrev ? validatedPage - 1 : null
      },
      // ✅ QUERY METADATA
      query: {
        filter,
        sort,
        appliedFilter: mongoFilter,
        appliedSort: mongoSort
      }
    });
    
  } catch (error) {
    console.error("❌ Error fetching quests:", error);
    return NextResponse.json(
      { 
        error: "Internal server error",
        message: "Failed to fetch quests",
        details: error instanceof Error ? error.message : "Unknown error"
      }, 
      { status: 500 }
    );
  }
}