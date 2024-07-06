import { NextRequest, NextResponse } from 'next/server';
import { Bot } from 'grammy';

const bot = new Bot(process.env.TELEGRAM_BOT_TOKEN as string);

export async function POST(req: NextRequest) {
  try {
    // Generate a unique invite link
    const inviteLink = await bot.api.createChatInviteLink(process.env.BOT_USERNAME as string, {
      name: "Add bot to group",
      creates_join_request: true
    });

    return NextResponse.json({ inviteLink: inviteLink.invite_link });
  } catch (error) {
    console.error('Error creating invite link:', error);
    return NextResponse.json({ error: 'Failed to create invite link' }, { status: 500 });
  }
}