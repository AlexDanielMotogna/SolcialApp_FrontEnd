// REEMPLAZAR EN: c:\Users\Lian Li\Desktop\FrontEnd_Solcial\solcial\src\utils\cloudinaryClient.ts

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
  console.log('🔍 getOptimizedImageUrl called with:', {
    publicId,
    cloudName: cloudinaryConfig.cloudName,
    envVar: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME
  });

  if (!publicId) {
    console.warn('⚠️ No publicId provided');
    return "/imgs/placeholder.png";
  }

  if (!cloudinaryConfig.cloudName) {
    console.error('❌ cloudinaryConfig.cloudName is missing:', cloudinaryConfig.cloudName);
    console.error('❌ Environment variable NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME:', process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME);
    return "/imgs/placeholder.png";
  }

  const config = { ...QUEST_BANNER_CONFIG, ...options };
  
  const finalUrl = `https://res.cloudinary.com/${cloudinaryConfig.cloudName}/image/upload/` +
    `w_${config.width},h_${config.height},c_${config.crop},q_${config.quality},f_${config.format}/${publicId}`;
  
  console.log('✅ Generated optimized URL:', finalUrl);
  return finalUrl;
};