import NextAuth from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      _id: string;
      name: string;
      email: string;
      image?: string;
      phone?: string;
      walletaddress?: string;
      hasTwitterAccess?: boolean;
      isVerified?: boolean;
      avatar?: string;
      twitter_id?: string;
      twitter_handle?: string;
      twitterScreenName?: string;
      twitterUserId?: string;
      twitterAccessToken?: string;
      twitterAccessSecret?: string;
      online?: boolean;
      twoFactorEnabled?: boolean;
      friends?: string[];
      pendingRequests?: {
        senderId: string;
        requestType: "sent" | "received";
      }[];
    };
  }

  interface User {
    id: string;
    _id?: string;
    name: string;
    email: string;
    image?: string;
    phone?: string;
    walletaddress?: string;
    hasTwitterAccess?: boolean;
    isVerified?: boolean;
    avatar?: string;
    twitter_id?: string;
    twitter_handle?: string;
    twitterScreenName?: string;
    twitterUserId?: string;
    twitterAccessToken?: string;
    twitterAccessSecret?: string;
    online?: boolean;
    twoFactorEnabled?: boolean;
    friends?: string[];
    pendingRequests?: {
      senderId: string;
      requestType: "sent" | "received";
    }[];
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    _id: string;
    name: string;
    email: string;
    phone?: string;
    walletaddress?: string;
    hasTwitterAccess?: boolean;
    isVerified?: boolean;
    avatar?: string;
    twitter_id?: string;
    twitter_handle?: string;
    twitterScreenName?: string;
    twitterUserId?: string;
    twitterAccessToken?: string;
    twitterAccessSecret?: string;
    online?: boolean;
    twoFactorEnabled?: boolean;
    friends?: string[];
    pendingRequests?: {
      senderId: string;
      requestType: "sent" | "received";
    }[];
  }
}
