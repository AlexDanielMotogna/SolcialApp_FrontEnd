// MODIFICAR: c:\Users\Lian Li\Desktop\FrontEnd_Solcial\solcial\src\app\api\user\profile\route.ts

import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import User from "@/models/AuthUser";

// ✅ EXPORTAR MÉTODO GET
export async function GET(request: NextRequest) {
  try {
    console.log('🔍 [API] /api/user/profile - GET request received');

    // ✅ OBTENER SESIÓN
    const session = await getServerSession(authOptions);
    
    if (!session?.user?.email) {
      console.log('❌ [API] No session found');
      return NextResponse.json(
        { success: false, error: "Not authenticated" },
        { status: 401 }
      );
    }

    console.log('✅ [API] Session found for user:', session.user.email);

    const user = await User.findOne({ email: session.user.email }).lean();
    
    if (!user) {
      console.log('❌ [API] User not found in database:', session.user.email);
      return NextResponse.json(
        { success: false, error: "User not found" },
        { status: 404 }
      );
    }

    console.log('✅ [API] User found:', user.email);

    // ✅ CONVERTIR _id A STRING
    const userData = {
      ...user,
      id: user._id.toString(),
      _id: user._id.toString(),
    };

    return NextResponse.json({
      success: true,
      user: userData,
    });

  } catch (error) {
    console.error('❌ [API] Error in /api/user/profile:', error);
    return NextResponse.json(
      { success: false, error: "Internal server error" },
      { status: 500 }
    );
  }
}

// ✅ OPCIONAL: EXPORTAR MÉTODO POST PARA UPDATES
export async function POST(request: NextRequest) {
  try {
    console.log('🔄 [API] /api/user/profile - POST request received');

    const session = await getServerSession(authOptions);
    
    if (!session?.user?.email) {
      return NextResponse.json(
        { success: false, error: "Not authenticated" },
        { status: 401 }
      );
    }

    const body = await request.json();
    console.log('📝 [API] Update data:', body);


    // ✅ ACTUALIZAR USUARIO
    const updatedUser = await User.findOneAndUpdate(
      { email: session.user.email },
      { $set: body },
      { new: true, lean: true }
    );

    if (!updatedUser) {
      return NextResponse.json(
        { success: false, error: "User not found" },
        { status: 404 }
      );
    }

    console.log('✅ [API] User updated successfully');

    return NextResponse.json({
      success: true,
      user: {
        ...updatedUser,
        id: updatedUser._id.toString(),
        _id: updatedUser._id.toString(),
      },
    });

  } catch (error) {
    console.error('❌ [API] Error updating user profile:', error);
    return NextResponse.json(
      { success: false, error: "Internal server error" },
      { status: 500 }
    );
  }
}