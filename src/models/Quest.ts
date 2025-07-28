import mongoose, { Schema, Document, models } from "mongoose";


export interface IQuest extends Document {
  userId: string;
  questName: string;
  description: string;
  tweetLink: string;
  authorId: string; // <-- NUEVO CAMPO
  banner: string;
  maxParticipants: number;
  rewardPool: number;
  rewardPerTask: string;
  startDateTime: Date;
  endDateTime: Date;
  tasks: {
    like: boolean;
    retweet: boolean;
    comment: boolean;
    follow: boolean;
    quote: boolean;
  };
  status: "active" | "completed" | "canceled" | "finished";
  createdAt: Date;
  reservedParticipants: number;
  actualParticipants: number;
}

const QuestSchema = new Schema<IQuest>({
  userId: { type: String, required: true },
  questName: { type: String, required: true },
  description: { type: String, required: true },
  tweetLink: { type: String, required: true },
  authorId: { type: String, required: true }, // <-- NUEVO CAMPO
  banner: { type: String, required: false },
  maxParticipants: { type: Number, required: true },
  rewardPool: { type: Number, required: true },
  rewardPerTask: { type: String, required: true },
  startDateTime: { type: Date, required: true },
  endDateTime: { type: Date, required: true },
  tasks: {
    like: Boolean,
    retweet: Boolean,
    comment: Boolean,
    follow: Boolean,
    quote: Boolean,
  },
  status: { type: String, enum: ["active", "completed", "canceled", "finished"], default: "active" },
  createdAt: { type: Date, default: Date.now },
  reservedParticipants: { type: Number, default: 0 },
  actualParticipants: { type: Number, default: 0 },
});

export default models.Quest || mongoose.model<IQuest>("Quest", QuestSchema);