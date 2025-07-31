import mongoose, { Schema, Document, Model } from "mongoose";
import bcrypt from "bcryptjs";

export interface IAuthUser extends Document {
  name: string;
  email: string;
  password: string;
  phone?: string;
  avatar?: string;
  online?: boolean;
  twitter_id?: string;
  twitter_handle?: string;
  oauth_token?: string;
  oauth_token_secret?: string;
  resetPasswordToken?: string;
  resetPasswordExpire?: Date;
  isVerified?: boolean;
  verificationToken?: string;
  verificationTokenExpire?: Date;
  twoFactorEnabled?: boolean;
  twoFactorSecret?: string;
  walletaddress: string;
  twitterAccessToken?: string;
  twitterAccessSecret?: string;
  twitterScreenName?: string; // <-- usa este nombre para el handle
  twitterUserId?: string;
  hasTwitterAccess?: boolean;
  friends?: mongoose.Types.ObjectId[];
  pendingRequests?: {
    senderId: mongoose.Types.ObjectId;
    requestType: "sent" | "received";
  }[];
  comparePassword(candidatePassword: string): Promise<boolean>;
}

const UserSchema = new Schema<IAuthUser>({
  name: {
    type: String,
    required: [true, "Please provide name"],
    minlength: 3,
    maxlength: 50,
  },
  email: {
    type: String,
    required: [true, "Please provide email"],
    minlength: 3,
    maxlength: 50,
    match: [
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      "Please provide a valid email",
    ],
    unique: true,
  },
  phone: {
    type: String,
    required: false,
    default: null,
  },
  password: {
    type: String,
    required: [true, "Please provide password"],
    minlength: 3,
  },
  avatar: {
    type: String,
    default: null,
  },
  online: {
    type: Boolean,
    default: false,
  },
  twitter_id: {
    type: String,
    unique: true,
    sparse: true,
  },
  twitter_handle: {
    type: String,
    default: null,
  },
  oauth_token: {
    type: String,
  },
  oauth_token_secret: {
    type: String,
  },
  resetPasswordToken: { type: String },
  resetPasswordExpire: { type: Date },
  isVerified: { type: Boolean, default: false },
  verificationToken: { type: String },
  verificationTokenExpire: { type: Date },
  twoFactorEnabled: { type: Boolean, default: false },
  twoFactorSecret: { type: String },
  walletaddress: String,
  twitterAccessToken: { type: String, default: null },
  twitterAccessSecret: { type: String, default: null },
  twitterScreenName: { type: String, default: null }, // <-- usa este nombre
  twitterUserId: { type: String, default: null },
  hasTwitterAccess: { type: Boolean, default: false },
  friends: [{ type: Schema.Types.ObjectId, ref: "AuthUser" }],
  pendingRequests: [
    {
      senderId: { type: Schema.Types.ObjectId, ref: "AuthUser", required: true },
      requestType: { type: String, enum: ["sent", "received"], required: true },
    },
  ],
});

UserSchema.methods.comparePassword = async function (
  candidatePassword: string
): Promise<boolean> {
  return await bcrypt.compare(candidatePassword, this.password);
};

const AuthUser: Model<IAuthUser> =
  mongoose.models.AuthUser || mongoose.model<IAuthUser>("AuthUser", UserSchema);

export default AuthUser;