import mongoose, { Schema, Document, models } from "mongoose";

// Define the Quest interface
export interface IQuest extends Document {
  userId: string;
  questName: string;
  description: string;
  tweetLink: string;
  authorId: string;
  banner: string;
  bannerPublicId: string;
  maxParticipants: number;
  rewardPool: mongoose.Types.Decimal128;
  rewardPerTask: mongoose.Types.Decimal128;
  startDateTime: Date;
  endDateTime: Date;
  tasks: {
    like: boolean;
    retweet: boolean;
    comment: boolean;
    banner: string;
    follow: boolean;
    quote: boolean;
  };
  status: "active" | "finished" | "canceled";
  createdAt: Date;
  reservedParticipants: number;
  actualParticipants: number;
}

const QuestSchema = new Schema<IQuest>({
  userId: { type: String, required: true },
  questName: { type: String, required: true },
  description: { type: String, required: true },
  tweetLink: { type: String, required: true },
  banner: {
    type: String,
    default: "", // URL de Cloudinary o vacío para placeholder
  },
  bannerPublicId: {
    type: String,
    default: "", // Public ID de Cloudinary para gestión
  },
  authorId: { type: String, required: true },
  maxParticipants: { type: Number, required: true },
  rewardPool: {
    type: Schema.Types.Decimal128, //
    required: true,
  },
  rewardPerTask: {
    type: Schema.Types.Decimal128,
    required: true,
  },
  startDateTime: { type: Date, required: true },
  endDateTime: { type: Date, required: true },
  tasks: {
    like: Boolean,
    retweet: Boolean,
    comment: Boolean,
    follow: Boolean,
    quote: Boolean,
  },
  status: {
    type: String,
    enum: ["active", "finished", "canceled"],
    default: "active",
  },
  createdAt: { type: Date, default: Date.now },
  reservedParticipants: { type: Number, default: 0 },
  actualParticipants: { type: Number, default: 0 },
});

export default models.Quest || mongoose.model<IQuest>("Quest", QuestSchema);
