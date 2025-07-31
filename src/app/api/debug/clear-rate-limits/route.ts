import { NextRequest, NextResponse } from 'next/server';
import { clearAllRateLimits } from '@/lib/antiBot';

export async function POST(req: NextRequest) {
  if (process.env.NODE_ENV !== 'development') {
    return NextResponse.json({ error: 'Only available in development' }, { status: 403 });
  }

  clearAllRateLimits();
  
  return NextResponse.json({ message: 'Rate limits cleared' });
}