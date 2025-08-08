import mongoose, { Schema, Document, models } from "mongoose";

export interface IOrder extends Document {
  orderNumber: number; 
  chain: string;
  tokenAddress: string;
  tokenInfo?: {
    name: string;
    icon: string;
  };
  selectedPackage: {
    views: string;
    price: string;
  };
  title: string;
  pitch: string;
  image?: string;
  links: {
    website?: string;
    x?: string;
    telegram?: string;
    discord?: string;
  };
  discordUsername?: string;
  telegramUsername?: string;
  dataVerifiableChecked: boolean;
  termsAcceptedChecked: boolean;
  createdAt: Date;
}

const OrderSchema = new Schema<IOrder>(
  {
    orderNumber: { type: Number,unique: true }, 
    chain: { type: String, required: true },
    tokenAddress: { type: String, required: true },
    tokenInfo: {
      name: String,
      icon: String,
    },
    selectedPackage: {
      views: String,
      price: String,
    },
    title: { type: String, required: true },
    pitch: { type: String, required: true },
    image: String,
    links: {
      website: String,
      x: String,
      telegram: String,
      discord: String,
    },
    discordUsername: String,
    telegramUsername: String,
    dataVerifiableChecked: { type: Boolean, required: true },
    termsAcceptedChecked: { type: Boolean, required: true },
    createdAt: { type: Date, default: Date.now },
  },
  { collection: "orders" }
);

export default models.Order || mongoose.model<IOrder>("Order", OrderSchema);