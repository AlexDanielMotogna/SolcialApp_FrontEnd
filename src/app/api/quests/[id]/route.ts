import { connectDB } from "@/lib/mongodb";
import Quest from "@/models/Quest";

// Handler for GET requests to fetch a quest by ID
export async function GET(request: Request, context: { params: { id: string } }) {
  await connectDB();
  const id = context.params.id; 

  try {
    const quest = await Quest.findById(id);
    if (!quest) {
      return new Response(JSON.stringify({ message: "Not found" }), { status: 404 });
    }
    return new Response(JSON.stringify({ quest }), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ message: "Server error" }), { status: 500 });
  }
}