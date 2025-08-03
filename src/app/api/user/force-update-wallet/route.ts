import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from "@/lib/mongodb";
import { getAuthenticatedUser, createAuthResponse } from "@/lib/auth-session";
import User from "@/models/AuthUser";

export async function POST(request: NextRequest) {
  try {
    // ✅ OBTENER USUARIO REAL DE LA SESIÓN
    const authResult = await getAuthenticatedUser();
    const authError = createAuthResponse(authResult);
    if (authError) {
      return authError;
    }

    const { user } = authResult;
    if (!user) {
      return NextResponse.json(
        { error: 'No authenticated user found' },
        { status: 401 }
      );
    }

    // ✅ VALIDAR REQUEST BODY
    let requestBody;
    try {
      const text = await request.text();
      if (!text || text.trim() === '') {
        return NextResponse.json(
          { error: 'Request body is empty' },
          { status: 400 }
        );
      }
      requestBody = JSON.parse(text);
    } catch (parseError) {
      return NextResponse.json(
        { error: 'Invalid JSON format in request body' },
        { status: 400 }
      );
    }

    const { walletAddress, forceUpdate } = requestBody;

    if (!walletAddress || !forceUpdate) {
      return NextResponse.json(
        { error: 'Wallet address and forceUpdate flag are required' },
        { status: 400 }
      );
    }

    if (typeof walletAddress !== 'string' || walletAddress.trim().length === 0) {
      return NextResponse.json(
        { error: 'Invalid wallet address format' },
        { status: 400 }
      );
    }

    await connectDB();

    // ✅ FIND THE USER WHO CURRENTLY HAS THIS WALLET
    const currentWalletOwner = await User.findOne({ 
      walletaddress: walletAddress.trim() 
    });

    if (currentWalletOwner) {
      // Remove wallet from current owner
      await User.findByIdAndUpdate(
        currentWalletOwner._id,
        { 
          $unset: { walletaddress: 1 },
          updatedAt: new Date()
        }
      );
    }

    // ✅ ASSIGN WALLET TO NEW USER
    const result = await User.findByIdAndUpdate(
      user.id,
      {
        walletaddress: walletAddress.trim(),
        updatedAt: new Date()
      },
      { new: true }
    );

    if (!result) {
      return NextResponse.json(
        { error: 'Failed to update wallet address' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Wallet transferred successfully',
      walletaddress: walletAddress,
      userId: user.id,
      previousOwner: currentWalletOwner ? currentWalletOwner._id : null
    });

  } catch (error) {
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
