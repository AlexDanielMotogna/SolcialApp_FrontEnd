import mongoose, { Schema, Document } from "mongoose";

export interface IUser extends Document {
  name: string;
  email: string;
  walletaddress: string;
  twitterAccessToken?: string;
  twitterAccessSecret?: string;
  twitterScreenName?: string; // <-- usa este nombre para el handle
  twitterUserId?: string;
  hasTwitterAccess?: boolean;
}

const UserSchema = new Schema<IUser>({
  name: String,
  email: String,
  walletaddress: String,
  twitterAccessToken: { type: String, default: null },
  twitterAccessSecret: { type: String, default: null },
  twitterScreenName: { type: String, default: null }, // <-- usa este nombre
  twitterUserId: { type: String, default: null },
  hasTwitterAccess: { type: Boolean, default: false },
}, {
  toJSON: {
    virtuals: true,
    versionKey: false,
  },
});

// Elimina o comenta esto:
// UserSchema.virtual("hasTwitterAccess").get(function (this: IUser) {
//   return !!this.twitterAccessSecret && !!this.twitterAccessToken;
// });

const AuthUser = mongoose.models.AuthUser || mongoose.model<IUser>("AuthUser", UserSchema);
export default AuthUser;