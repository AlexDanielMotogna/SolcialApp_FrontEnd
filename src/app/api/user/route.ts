import { NextRequest, NextResponse } from "next/server";
import AuthUser from "@/models/AuthUser";
import { connectDB } from "@/lib/mongodb";
import { Types } from "mongoose";

export async function GET(req: NextRequest) {
  await connectDB();
  
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");
  
  if (!id) {
    return NextResponse.json({ error: "Missing id" }, { status: 400 });
  }

  try {
    const user = await AuthUser.findOne({ _id: new Types.ObjectId(id) });
    console.log("👤 Usuario desde BD:", user); // <-- LOG en el backend

    
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json({ user }, { status: 200 });
  } catch (error) {
    console.error("Error fetching user:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}