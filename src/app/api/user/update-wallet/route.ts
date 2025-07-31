import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from "@/lib/mongodb";
import mongoose from "mongoose";

export async function POST(request: NextRequest) {
  try {
    const { walletAddress } = await request.json();

    if (!walletAddress) {
      return NextResponse.json(
        { error: 'Wallet address is required' },
        { status: 400 }
      );
    }

    await connectDB();

    const mockUserId = new mongoose.Types.ObjectId("6883f941a7f69d335b0d2184");
    const db = mongoose.connection.db;
    
    if (!db) {
      return NextResponse.json(
        { error: 'Database connection failed' },
        { status: 500 }
      );
    }
    
    const result = await db.collection('authusers').updateOne(
      { _id: mockUserId },
      {
        $set: {
          walletAddress: walletAddress,
          updatedAt: new Date()
        }
      }
    );

    if (result.modifiedCount === 0) {
      const userExists = await db.collection('authusers').findOne({ _id: mockUserId });
      
      if (!userExists) {
        return NextResponse.json(
          { error: 'User not found with that ID' },
          { status: 404 }
        );
      } else {
        return NextResponse.json(
          { error: 'User found but wallet not updated' },
          { status: 500 }
        );
      }
    }

    return NextResponse.json({
      message: 'Wallet address updated successfully',
      walletAddress: walletAddress,
      userId: mockUserId
    });

  } catch (error) {
    console.error('Error in update-wallet API:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}