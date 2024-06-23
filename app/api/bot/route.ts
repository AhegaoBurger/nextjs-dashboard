// app/api/bot/route.ts
import { NextRequest, NextResponse } from 'next/server';
import bot from '@/lib/bot';

export const config = {
  api: {
    bodyParser: false,
  },
};

export async function POST(req: NextRequest) {
  
}
