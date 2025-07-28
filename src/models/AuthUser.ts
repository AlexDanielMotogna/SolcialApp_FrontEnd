import mongoose, { Schema, Document } from "mongoose";

export interface IUser extends Document {
  name: string;
  email: string;
  walletAdress: string;
  twitterAccessToken?: string;
  twitterAccessSecret?: string;
  twitterScreenName?: string;
  twitterUserId?: string;
  hasTwitterAccess?: boolean;
}

const UserSchema = new Schema<IUser>({
  name: String,
  email: String,
  walletAdress: String,
  twitterAccessToken: String,
  twitterAccessSecret: String,
  twitterScreenName: String,
  twitterUserId: String,


}, {
    toJSON: {
      virtuals: true,
      versionKey: false,
    },
  });
// Add a virtual field to check if the user has Twitter access
UserSchema.virtual("hasTwitterAccess").get(function (this: IUser) {
  return this.twitterAccessSecret ? true : false;
});

const AuthUser = mongoose.models.AuthUser || mongoose.model<IUser>("AuthUser", UserSchema);
export default AuthUser;