// CREAR: c:\Users\Lian Li\Desktop\FrontEnd_Solcial\solcial\src\lib\auth-session.ts

import { getServerSession } from "next-auth/next";
import { connectDB } from "@/lib/mongodb";
import AuthUser from "@/models/AuthUser";

// ✅ CONFIGURACIÓN DE NEXTAUTH (necesitamos importarla)
const authOptions = {
  // Tu configuración actual de NextAuth
  providers: [], // Los providers que tienes
  callbacks: {}, // Los callbacks que tienes
  pages: {
    signIn: "/auth/login",
    error: "/auth/error",
  },
};

export async function getAuthenticatedUser() {
  try {
    // ✅ OBTENER SESIÓN DEL SERVIDOR
    const session = await getServerSession(authOptions);

    if (!session?.user?.email) {
      return {
        success: false,
        error: "Not authenticated",
        user: null
      };
    }

    // ✅ OBTENER USUARIO DE LA BASE DE DATOS
    await connectDB();
    const user = await AuthUser.findOne({ email: session.user.email }) as {
      _id: any;
      name: string;
      email: string;
      avatar?: string;
      walletaddress?: string;
      hasTwitterAccess?: boolean;
      isVerified?: boolean;
     
    } | null;

    if (!user) {
      return {
        success: false,
        error: "User not found",
        user: null
      };
    }

    return {
      success: true,
      error: null,
      user: {
        id: user._id.toString(),
        name: user.name,
        email: user.email,
        avatar: user.avatar,
        walletaddress: user.walletaddress,
        hasTwitterAccess: user.hasTwitterAccess,
        isVerified: user.isVerified,
        // Agregar otros campos que necesites
      }
    };

  } catch (error) {
    console.error("Error getting authenticated user:", error);
    return {
      success: false,
      error: "Authentication error",
      user: null
    };
  }
}

export { authOptions };