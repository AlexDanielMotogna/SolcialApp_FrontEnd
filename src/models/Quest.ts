import mongoose, { Schema, Document, models } from "mongoose";

export interface IQuest extends Document {
  questName: string;
  description: string;
  banner: string;
  maxParticipants: number;
  rewardPool: number;
  rewardPerTask: string;
  startDate: string;
  startTime: string;
  endDate: string;
  endTime: string;
  tasks: {
    like: boolean;
    retweet: boolean;
    comment: boolean;
    follow: boolean;
    quote: boolean;
  };
  status: "active" | "completed" | "canceled"; // <-- Add this line
  createdAt: Date;
}

const QuestSchema = new Schema<IQuest>({
  questName: { type: String, required: true },
  description: { type: String, required: true },
  banner: { type: String, required: false },
  maxParticipants: { type: Number, required: true },
  rewardPool: { type: Number, required: true },
rewardPerTask: { type: String, required: true }, 
  startDate: { type: String, required: true },
  startTime: { type: String, required: true },
  endDate: { type: String, required: true },
  endTime: { type: String, required: true },
  tasks: {
    like: Boolean,
    retweet: Boolean,
    comment: Boolean,
    follow: Boolean,
    quote: Boolean,
  },
  status: { type: String, enum: ["active", "completed", "canceled"], default: "active" }, // <-- NEW
  createdAt: { type: Date, default: Date.now },
});

export default models.Quest || mongoose.model<IQuest>("Quest", QuestSchema);