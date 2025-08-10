import { v2 as cloudinary } from "cloudinary";
// Importing Cloudinary library for image uploads
// This module provides functions to upload images to Cloudinary and manage image transformations
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function uploadToCloudinary(
  file: File,
  folder = "solcial"
): Promise<string> {
  try {
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    return new Promise((resolve, reject) => {
      cloudinary.uploader
        .upload_stream(
          {
            folder: folder,
            resource_type: "auto",
            transformation: [
              { width: 400, height: 400, crop: "fill" },
              { quality: "auto" },
            ],
          },
          (error, result) => {
            if (error) {
              console.error("Cloudinary upload error:", error);
              reject(error);
            } else {
              resolve(result?.secure_url || "");
            }
          }
        )
        .end(buffer);
    });
  } catch (error) {
    console.error("Error processing file for Cloudinary:", error);
    throw new Error("Failed to upload image");
  }
}

export default cloudinary;
