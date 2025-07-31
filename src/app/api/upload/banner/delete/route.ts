// CREAR: c:\Users\Lian Li\Desktop\FrontEnd_Solcial\solcial\src\app\api\upload\banner\delete\route.ts

import { NextRequest, NextResponse } from 'next/server';
import cloudinary from '@/lib/cloudinary';

export async function DELETE(request: NextRequest) {
  try {
    const { publicId } = await request.json();

    if (!publicId) {
      return NextResponse.json(
        { error: 'No publicId provided' },
        { status: 400 }
      );
    }

    console.log('🗑️ Deleting banner from Cloudinary:', publicId);

    // Borrar de Cloudinary
    const result = await cloudinary.uploader.destroy(publicId);

    if (result.result === 'ok') {
      console.log('✅ Banner deleted successfully from Cloudinary');
      return NextResponse.json({
        success: true,
        message: 'Banner deleted successfully',
        result
      });
    } else {
      console.warn('⚠️ Banner not found in Cloudinary or already deleted');
      return NextResponse.json({
        success: true,
        message: 'Banner not found or already deleted',
        result
      });
    }

  } catch (error) {
    console.error('❌ Error deleting banner:', error);
    return NextResponse.json(
      { error: 'Failed to delete banner' },
      { status: 500 }
    );
  }
}