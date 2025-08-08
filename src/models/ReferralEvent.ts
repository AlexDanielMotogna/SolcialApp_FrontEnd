import { Schema, model, models } from "mongoose";

export enum ReferralTypeEnum {
  // TO DEFINE
  CREATE_ACCOUNT = "CREATE_ACCOUNT",
}

export interface IReferralEvent extends Document {
  parent: string;
  child: string;
  type: ReferralTypeEnum;
  reward: number;
  createdAt: Date;
}

const ReferralEventSchema = new Schema<IReferralEvent>({
  parent: { type: String, ref: "User", required: true },
  child: { type: String, ref: "User", required: true },
  type: { type: String, enum: Object.values(ReferralTypeEnum), required: true },
  reward: { type: Number, required: true },
  createdAt: { type: Date, default: Date.now },
});

export default models.AuthUser ||
  model<IReferralEvent>("ReferralEvent", ReferralEventSchema);
