// app/api/user-info/route.ts
import { NextRequest, NextResponse } from 'next/server';
import bot from '@/lib/bot';

export async function GET() {
  try {
    const user = await bot.telegram.getMe();
    return NextResponse.json(user);
  } catch (error: any) {
    console.error('Error fetching user info:', error);
    return NextResponse.json({ status: 'error', message: error.message });
  }
}
