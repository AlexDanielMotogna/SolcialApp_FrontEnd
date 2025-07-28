import mongoose, { Schema, Document, models } from "mongoose";

export interface IUserQuest extends Document {
  userId: string;
  questId: string;
  walletAdress: string;
  completedTasks: { [key: string]: boolean };
  rewardClaimed: boolean;
  enrolledAt: Date;
  sessionExpiresAt?: Date; // Opcional, para manejo de sesión
  status: "active" | "expired" | "completed";
}

const UserQuestSchema = new Schema<IUserQuest>(
  {
    userId: { type: String, required: true },
    questId: { type: String, required: true },
    walletAdress: { type: String, required: true },
    completedTasks: { type: Object, required: true },
    rewardClaimed: { type: Boolean, default: false },
    enrolledAt: { type: Date, default: Date.now },
    sessionExpiresAt: { type: Date }, // Opcional
    status: {
      type: String,
      enum: ["active", "expired", "completed"],
      default: "active",
    },
  },
  {
    toJSON: {
      virtuals: true,
      versionKey: false,
    },
  }
);
UserQuestSchema.virtual("quest", {
  ref: "Quest",
  localField: "questId",
  foreignField: "_id",
  justOne: true,
});
UserQuestSchema.pre(["find", "findOne"], function (next) {
  this.populate({
    path: "quest",
    select: "_id questName",
  });
  next();
});
UserQuestSchema.post(["save"], async function (doc, next) {
  await doc.populate({
    path: "quest",
    select: "_id questName",
  });
  next();
});

export default models.UserQuest ||
  mongoose.model<IUserQuest>("UserQuest", UserQuestSchema);
