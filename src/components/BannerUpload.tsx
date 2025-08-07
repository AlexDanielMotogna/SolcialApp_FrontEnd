import React, { useState, useRef } from "react";
import Image from "next/image";

interface BannerUploadProps {
  onImageUpload: (imageData: { publicId: string; url: string }) => void;
  currentImage?: string;
  disabled?: boolean;
}

const BannerUpload: React.FC<BannerUploadProps> = ({
  onImageUpload,
  currentImage,
  disabled = false,
}) => {
  const [uploading, setUploading] = useState(false);
  const [preview, setPreview] = useState<string | null>(currentImage || null);
  const [dragOver, setDragOver] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = async (file: File) => {
    if (!file) return;

    // Validaciones del lado del cliente
    const maxSize = 2 * 1024 * 1024; // 2MB
    if (file.size > maxSize) {
      alert("File size exceeds 2MB limit");
      return;
    }

    const allowedTypes = ["image/jpeg", "image/png", "image/webp", "image/jpg"];
    if (!allowedTypes.includes(file.type)) {
      alert("Invalid file type. Only JPEG, PNG, and WebP are allowed");
      return;
    }

    // Mostrar preview
    const reader = new FileReader();
    reader.onload = (e) => {
      setPreview(e.target?.result as string);
    };
    reader.readAsDataURL(file);

    // Subir archivo
    setUploading(true);
    try {
      const formData = new FormData();
      formData.append("file", file);

      const response = await fetch("/api/upload/banner", {
        method: "POST",
        body: formData,
      });

      const result = await response.json();

      if (result.success) {
        onImageUpload({
          publicId: result.data.publicId,
          url: result.data.url,
        });
        console.log("✅ Image uploaded successfully:", result.data.publicId);
      } else {
        alert(result.error || "Upload failed");
        setPreview(currentImage || null);
      }
    } catch (error) {
      console.error("Upload error:", error);
      alert("Upload failed");
      setPreview(currentImage || null);
    } finally {
      setUploading(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);

    if (disabled || uploading) return;

    const files = Array.from(e.dataTransfer.files);
    if (files.length > 0) {
      handleFileSelect(files[0]);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    if (!disabled && !uploading) {
      setDragOver(true);
    }
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
  };

  const handleClick = () => {
    if (!disabled && !uploading) {
      fileInputRef.current?.click();
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleFileSelect(file);
    }
  };

  return (
    <div className="w-full">
      <label className="block text-white font-semibold mb-2">
        Quest Banner
      </label>

      <div
        className={`
          relative w-full h-60 border-2 border-dashed rounded-lg cursor-pointer transition-all duration-200
          ${
            dragOver
              ? "border-[#9945FF] bg-[#9945FF]/10"
              : "border-[#44444A] hover:border-[#9945FF]/50"
          }
          ${
            disabled || uploading
              ? "cursor-not-allowed opacity-50"
              : "hover:bg-[#2C2C30]/30"
          }
        `}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onClick={handleClick}
      >
        {/* Hidden Input */}
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleInputChange}
          className="hidden"
          disabled={disabled || uploading}
        />

        {/* Preview or Upload Area */}
        {preview ? (
          <div className="relative w-full h-full">
            <Image
              src={preview}
              alt="Banner preview"
              fill
              className="object-cover rounded-lg"
            />

            {/* Overlay */}
            <div className="absolute inset-0 bg-black/40 opacity-0 hover:opacity-100 transition-opacity duration-200 rounded-lg flex items-center justify-center">
              <div className="text-white text-center">
                <svg
                  className="w-8 h-8 mx-auto mb-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 002 2z"
                  />
                </svg>
                <p className="text-sm font-medium">Click to change banner</p>
              </div>
            </div>

            {/* Loading Overlay */}
            {uploading && (
              <div className="absolute inset-0 bg-black/60 flex items-center justify-center rounded-lg">
                <div className="text-center text-white">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#9945FF] mx-auto mb-2"></div>
                  <p className="text-sm">Uploading...</p>
                </div>
              </div>
            )}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center h-full text-[#ACB5BB]">
            {uploading ? (
              <>
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#9945FF] mb-4"></div>
                <p className="text-lg font-medium">Uploading banner...</p>
              </>
            ) : (
              <>
                <svg
                  className="w-12 h-12 mb-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 002 2z"
                  />
                </svg>
                <p className="text-lg font-medium mb-2">Choose quest banner</p>
                <p className="text-sm text-center">
                  Drag & drop an image here, or click to select
                  <br />
                  <span className="text-[#9945FF]">
                    Max 2MB • JPEG, PNG, WebP
                  </span>
                  <br />
                  <span className="text-[#ACB5BB]">Recommended: 400x240px</span>
                </p>
              </>
            )}
          </div>
        )}
      </div>

      {/* File Info */}
      <p className="text-xs text-[#ACB5BB] mt-2">
        Images will be automatically optimized and resized to 400x240px
      </p>
    </div>
  );
};

export default BannerUpload;
