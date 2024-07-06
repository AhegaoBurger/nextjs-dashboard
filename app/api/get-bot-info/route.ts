import { NextResponse } from 'next/server';
import { Bot } from 'grammy';

const bot = new Bot(process.env.TELEGRAM_BOT_TOKEN as string);

export async function GET() {
  try {
    const botInfo = await bot.api.getMe();
    return NextResponse.json({ username: botInfo.username });
  } catch (error) {
    console.error('Error getting bot info:', error);
    return NextResponse.json({ error: 'Failed to get bot info' }, { status: 500 });
  }
}