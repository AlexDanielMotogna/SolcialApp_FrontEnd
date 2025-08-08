import mongoose from "mongoose";
// Import the necessary types from mongoose
const MONGODB_URI = process.env.MONGODB_URI;
// Ensure the environment variable is defined
// If not, throw an error to prevent connection attempts with an undefined URI
if (!MONGODB_URI) {
  throw new Error(
    "Please define the MONGODB_URI environment variable inside .env.local"
  );
}
// Check if the global mongoose instance is already cached
// This is useful in a Next.js environment to prevent multiple connections during hot reloading
let cached = (global as any).mongoose;

if (!cached) {
  cached = (global as any).mongoose = { conn: null, promise: null };
}
// This is a workaround to avoid the "Maximum call stack size exceeded" error
// when using mongoose in a Next.js application with hot reloading.
export async function connectDB() {
  if (cached.conn) return cached.conn;
  if (!cached.promise) {
    cached.promise = mongoose
      .connect(MONGODB_URI as string, {
        bufferCommands: false,
      })
      .then((mongoose) => mongoose);
  }
  try {
    cached.conn = await cached.promise;

    console.log("Connected");
  } catch (e) {
    cached.promise = null;
    throw e;
  }
  return cached.conn;
}
