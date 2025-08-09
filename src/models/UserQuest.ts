import mongoose, { Schema, Document, models } from "mongoose";

export interface IUserQuest extends Document {
  userId: string;
  questId: string;
  questName?: string;
  walletaddress: string;
  completedTasks: { [key: string]: boolean };
  rewardClaimed: boolean;
  enrolledAt: Date;
  twitter_id?: string;
  rewardAmount: mongoose.Types.Decimal128;
  sessionExpiresAt?: Date;
  status: "active" | "finished";
}

const UserQuestSchema = new Schema<IUserQuest>(
  {
    userId: { type: String, required: true },
    questId: { type: String, required: true },
    questName: { type: String, required: true },
    walletaddress: { type: String, required: true },
    completedTasks: { type: Object, required: true },
    rewardClaimed: { type: Boolean, default: false },
    twitter_id: { type: String, required: false },
    enrolledAt: { type: Date, default: Date.now },
    rewardAmount: {
      type: Schema.Types.Decimal128,
      default: () => mongoose.Types.Decimal128.fromString("0"),
    },
    sessionExpiresAt: { type: Date },
    status: {
      type: String,
      enum: ["active", "finished"],
      default: "active",
    },
  },
  {
    toJSON: {
      virtuals: true,
      versionKey: false,
      transform: function (doc, ret) {
        if (ret.rewardAmount && ret.rewardAmount.toString) {
          (ret as any).rewardAmount = ret.rewardAmount.toString();
        }
        return ret;
      },
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
