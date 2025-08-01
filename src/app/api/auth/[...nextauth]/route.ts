// MODIFICAR: c:\Users\Lian Li\Desktop\FrontEnd_Solcial\solcial\src\app\api\auth\[...nextauth]\route.ts

import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import { connectDB } from "@/lib/mongodb";
import User from "@/models/AuthUser";

export const authOptions = {
  providers: [
    CredentialsProvider({
      credentials: {
        email: { label: "Email", type: "email", placeholder: "your@email.com" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        await connectDB();
        const user = await User.findOne({ email: credentials?.email });
        if (user && user.password === credentials?.password) {
          return {
            id: (user._id as { toString: () => string }).toString(),
            name: user.name,
            email: user.email,
            phone: user.phone,
            image: user.avatar,
            walletaddress: user.walletaddress,
            hasTwitterAccess: user.hasTwitterAccess,
            isVerified: user.isVerified,
            avatar: user.avatar,
          };
        }
        return null;
      }
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  callbacks: {
    async signIn({ user, account }: { user: any; account: any }) {
      await connectDB();
      const existingUser = await User.findOne({ email: user.email });
      if (!existingUser) {
        await User.create({
          name: user.name,
          email: user.email,
          phone: user.phone,
          avatar: user.image,
          isVerified: true,
        });
      }
      return true;
    },
    // ✅ MEJORAR SESSION CALLBACK
    async session({ session, token }: { session: any; token: any }) {
      if (session.user?.email) {
        await connectDB();
        const dbUser = await User.findOne({ email: session.user.email });
        if (dbUser) {
          // ✅ AGREGAR INFORMACIÓN DEL USUARIO A LA SESIÓN
          session.user.id = (dbUser._id as { toString: () => string }).toString();
          session.user.walletaddress = dbUser.walletaddress;
          session.user.hasTwitterAccess = dbUser.hasTwitterAccess;
          session.user.isVerified = dbUser.isVerified;
          session.user.avatar = dbUser.avatar;
        }
      }
      return session;
    },
    async jwt({ token, user }: { token: any; user?: any }) {
      return token;
    },
  },
  pages: {
    signIn: "/login",
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };