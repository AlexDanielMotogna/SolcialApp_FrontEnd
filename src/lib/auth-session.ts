// CREAR: c:\Users\Lian Li\Desktop\FrontEnd_Solcial\solcial\src\lib\auth-session.ts

import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { connectDB } from "@/lib/mongodb";
import User from "@/models/AuthUser";

export async function getAuthenticatedUser() {
  try {
    // ✅ OBTENER SESIÓN DEL SERVIDOR
    const session = await getServerSession(authOptions);

    if (!session?.user?.email) {
      return {
        success: false,
        error: "Not authenticated",
        user: null,
        status: 401
      };
    }

    // ✅ OBTENER DATOS FRESCOS DE LA BASE DE DATOS
    await connectDB();
    const user = await User.findOne({ email: session.user.email });
     console.log("🔍 DEBUG - User from DB:", {
      id: user?._id,
      email: user?.email,
      walletaddress: user?.walletaddress,
      hasTwitterAccess: user?.hasTwitterAccess,
    });
    if (!user) {
      return {
        success: false,
        error: "User not found in database",
        user: null,
        status: 404
      };
    }

    if (!user.isVerified) {
      return {
        success: false,
        error: "Email not verified",
        user: null,
        status: 403
      };
    }

    return {
      success: true,
      error: null,
      user: {
        id: (user._id as { toString: () => string }).toString(),
        name: user.name,
        email: user.email,
        avatar: user.avatar,
        walletaddress: user.walletaddress,
        hasTwitterAccess: user.hasTwitterAccess,
        isVerified: user.isVerified,
        phone: user.phone,
      },
      status: 200
    };
  } catch (error) {
    console.error("Error getting authenticated user:", error);
    return {
      success: false,
      error: "Authentication error",
      user: null,
      status: 500
    };
  }
  
}

// ✅ HELPER PARA MIDDLEWARE DE AUTENTICACIÓN
export function createAuthResponse(authResult: any) {
  if (!authResult.success) {
    return new Response(
      JSON.stringify({ 
        success: false, 
        error: authResult.error 
      }), 
      { 
        status: authResult.status,
        headers: { "Content-Type": "application/json" }
      }
    );
  }
  return null; // Continue with request
}