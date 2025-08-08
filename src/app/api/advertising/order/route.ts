import { NextRequest } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Order, { IOrder } from "@/models/Order";

// Générateur d'ID aléatoire de 14 caractères (alphanumérique)
function generateOrderId(length = 14) {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let id = "";
  for (let i = 0; i < length; i++) {
    id += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return id;
}

export async function POST(req: NextRequest) {
  await connectDB();

  try {
    const formData: IOrder = await req.json();

    // Génère un orderId unique
    let orderId: string;
    let exists = true;
    do {
      orderId = generateOrderId();
      // Vérifie l'unicité
      exists = !!(await Order.exists({ orderId }));
    } while (exists);

    // Ajoute l'orderId au formData
    (formData as any).orderId = orderId;

    const order = await Order.create(formData);

    return new Response(JSON.stringify({ success: true, order }), { status: 201 });
  } catch (error) {
    console.error("Order creation error:", error);
    return new Response(JSON.stringify({ success: false, error: "Order creation failed" }), { status: 500 });
  }
}