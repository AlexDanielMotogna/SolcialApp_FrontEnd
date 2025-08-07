import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import { connectDB } from "@/lib/mongodb";
import User from "@/models/AuthUser";
import type { AuthOptions } from "next-auth";

export const authOptions: AuthOptions = {
  providers: [
    CredentialsProvider({
      credentials: {
        email: { label: "Email", type: "email", placeholder: "your@email.com" },
        password: { label: "Password", type: "password" },
        totp: { label: "2FA Code", type: "text" },
      },
      async authorize(credentials) {
        try {
          await connectDB();

          if (!credentials?.email || !credentials?.password) {
            throw new Error("Email and password are required");
          }

          const user = await User.findOne({ email: credentials.email });

          if (!user) {
            throw new Error("User not found");
          }

          // Check if user is verified
          if (!user.isVerified) {
            throw new Error("not_verified");
          }

          // Check if user has no password (OAuth user trying to set password)
          if (!user.password) {
            throw new Error("no_password");
          }

          // Verify password
          const isPasswordValid = await user.comparePassword(
            credentials.password
          );
          if (!isPasswordValid) {
            throw new Error("Invalid credentials");
          }

          // Check 2FA if enabled
          if (user.twoFactorEnabled) {
            if (!credentials.totp) {
              throw new Error("2fa_required");
            }

            // Verify TOTP code (you'll need to implement this)
            const speakeasy = require("speakeasy");
            const verified = speakeasy.totp.verify({
              secret: user.twoFactorSecret,
              encoding: "base32",
              token: credentials.totp,
              window: 1,
            });

            if (!verified) {
              throw new Error("Invalid 2FA code");
            }
          }

          // Return user data for session
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
        } catch (error: any) {
          console.error("Authorization error:", error.message);
          throw new Error(error.message);
        }
      },
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
    // ✅ ENHANCED SESSION CALLBACK - Include all user data
    async session({ session, token }: { session: any; token: any }) {
      if (session.user?.email) {
        await connectDB();
        const dbUser = await User.findOne({ email: session.user.email }).lean();
        if (dbUser) {
          // ✅ Include all necessary user data in session
          session.user = {
            ...session.user,
            id: dbUser._id.toString(),
            _id: dbUser._id.toString(),
            name: dbUser.name,
            email: dbUser.email,
            phone: dbUser.phone,
            walletaddress: dbUser.walletaddress,
            hasTwitterAccess: dbUser.hasTwitterAccess,
            isVerified: dbUser.isVerified,
            avatar: dbUser.avatar,
            twitter_id: dbUser.twitter_id,
            twitter_handle: dbUser.twitter_handle,
            twitterScreenName: dbUser.twitterScreenName,
            twitterUserId: dbUser.twitterUserId,
            twitterAccessToken: dbUser.twitterAccessToken,
            twitterAccessSecret: dbUser.twitterAccessSecret,
            online: dbUser.online,
            twoFactorEnabled: dbUser.twoFactorEnabled,
            friends: dbUser.friends,
            pendingRequests: dbUser.pendingRequests,
          };
        }
      }
      return session;
    },
    async jwt({ token, user }: { token: any; user?: any }) {
      // Si el usuario existe (primer login), añade datos al token
      if (user) {
        token.id = user.id;
        token.email = user.email;
        token.name = user.name;
        token.avatar = user.avatar;
        token.walletaddress = user.walletaddress;
        token.hasTwitterAccess = user.hasTwitterAccess;
        token.isVerified = user.isVerified;
      }
      // Si el token tiene email, busca el usuario en la base de datos y añade datos
      if (token.email) {
        await connectDB();
        const dbUser = await User.findOne({ email: token.email }).lean();
        if (dbUser) {
          token.id = dbUser._id.toString();
          token.name = dbUser.name;
          token.avatar = dbUser.avatar;
          token.walletaddress = dbUser.walletaddress;
          token.hasTwitterAccess = dbUser.hasTwitterAccess;
          token.isVerified = dbUser.isVerified;
        }
      }
      return token;
    },
  },
  pages: {
    signIn: "/login",
    error: "/login", // Redirect errors to login page
  },
  session: {
    strategy: "jwt" as const,
  },
};
