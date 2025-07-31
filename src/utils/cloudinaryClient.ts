export const cloudinaryConfig = {
  cloudName: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
};

// Dimensiones para banners de quest
export const QUEST_BANNER_CONFIG = {
  width: 400,
  height: 240,
  crop: 'fill',
  quality: 'auto',
  format: 'webp',
} as const;

// ✅ Función para generar URL optimizada (SOLO cliente)
export const getOptimizedImageUrl = (publicId: string, options = {}) => {
  if (!publicId || !cloudinaryConfig.cloudName) {
    return "/imgs/placeholder.png";
  }

  const config = { ...QUEST_BANNER_CONFIG, ...options };
  
  return `https://res.cloudinary.com/${cloudinaryConfig.cloudName}/image/upload/` +
    `w_${config.width},h_${config.height},c_${config.crop},q_${config.quality},f_${config.format}/${publicId}`;
};