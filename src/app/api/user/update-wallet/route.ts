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
      console.log("❌ Authentication failed in update-wallet");
      return authError;
    }

    const { user } = authResult;
    if (!user) {
      console.log("❌ No authenticated user found in update-wallet");
      return NextResponse.json(
        { error: 'No authenticated user found' },
        { status: 401 }
      );
    }

    // ✅ VALIDAR QUE EL REQUEST TENGA CONTENIDO
    let requestBody;
    try {
      const text = await request.text();
      console.log('📝 Raw request body:', text);
      
      if (!text || text.trim() === '') {
        console.log('❌ Empty request body received');
        return NextResponse.json(
          { error: 'Request body is empty' },
          { status: 400 }
        );
      }

      requestBody = JSON.parse(text);
      console.log('📦 Parsed request body:', requestBody);
    } catch (parseError) {
      console.error('❌ JSON parsing error:', parseError);
      return NextResponse.json(
        { error: 'Invalid JSON format in request body' },
        { status: 400 }
      );
    }

    const { walletAddress } = requestBody;

    if (!walletAddress) {
      console.log('❌ No walletAddress in request:', requestBody);
      return NextResponse.json(
        { error: 'Wallet address is required' },
        { status: 400 }
      );
    }

    // ✅ VALIDAR FORMATO DE WALLET ADDRESS
    if (typeof walletAddress !== 'string' || walletAddress.trim().length === 0) {
      console.log('❌ Invalid wallet address format:', walletAddress);
      return NextResponse.json(
        { error: 'Invalid wallet address format' },
        { status: 400 }
      );
    }

    await connectDB();

    // ✅ OBTENER USUARIO ACTUAL CON SU WALLET
    const currentUser = await User.findById(user.id);
    if (!currentUser) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      );
    }

    // ✅ VERIFICAR SI EL WALLET ES EL MISMO QUE YA TIENE
    if (currentUser.walletaddress === walletAddress.trim()) {
      console.log(`✅ Wallet ${walletAddress} is already connected to user ${user.email}`);
      return NextResponse.json({
        success: true,
        message: 'Wallet is already connected to your account',
        walletaddress: walletAddress,
        userId: user.id,
        alreadyConnected: true
      });
    }

    // ✅ VERIFICAR QUE EL NUEVO WALLET NO ESTÉ EN USO POR OTRO USUARIO
    const existingWallet = await User.findOne({ 
      walletaddress: walletAddress.trim(),
      _id: { $ne: user.id }
    });

    if (existingWallet) {
      console.log(`❌ Wallet ${walletAddress} is already in use by another user: ${existingWallet._id}`);
      return NextResponse.json(
        { error: 'This wallet is already connected to another account' },
        { status: 409 }
      );
    }

    // ✅ ACTUALIZAR CON EL NUEVO WALLET
    console.log(`🔄 Updating wallet for user ${user.email}: ${currentUser.walletaddress} → ${walletAddress}`);
    
    const result = await User.findByIdAndUpdate(
      user.id,
      {
        walletaddress: walletAddress.trim(),
        updatedAt: new Date()
      },
      { new: true }
    );

    if (!result) {
      console.log(`❌ Failed to update user: ${user.id}`);
      return NextResponse.json(
        { error: 'Failed to update wallet address' },
        { status: 500 }
      );
    }

    console.log(`✅ Wallet updated successfully for user ${user.email}: ${walletAddress}`);

    return NextResponse.json({
      success: true,
      message: 'Wallet address connected successfully',
      walletaddress: walletAddress,
      userId: user.id,
      previousWallet: currentUser.walletaddress,
      alreadyConnected: false
    });

  } catch (error) {
    console.error('❌ Error in update-wallet API:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}