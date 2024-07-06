import { NextRequest, NextResponse } from 'next/server';
import { Bot } from 'grammy';
import { createClient } from '@supabase/supabase-js';

// Initialize Supabase client
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL as string;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY as string;
const supabase = createClient(supabaseUrl, supabaseKey);

interface TelegramContact {
  user_id: string;
  first_name: string;
  last_name?: string;
  phone_number?: string;
  username?: string;
}

export async function POST(req: NextRequest) {
  const { userId } = await req.json();

  if (!userId) {
    return NextResponse.json({ message: 'User ID is required' }, { status: 400 });
  }

  const bot = new Bot(process.env.TELEGRAM_BOT_TOKEN as string);

  try {
    // Fetch contacts from Telegram
    const contacts = await bot.api.getContacts() as TelegramContact[];

    // Store contacts in the database
    const { data, error } = await supabase
      .from('contacts')
      .upsert(
        contacts.map(contact => ({
          user_id: userId,
          telegram_id: contact.user_id,
          first_name: contact.first_name,
          last_name: contact.last_name,
          phone_number: contact.phone_number,
          username: contact.username
        })),
        { onConflict: 'user_id, telegram_id' }
      );

    if (error) {
      throw error;
    }

    return NextResponse.json({ message: 'Contacts fetched and stored successfully', count: contacts.length });
  } catch (error) {
    console.error('Error fetching or storing contacts:', error);
    return NextResponse.json({ message: 'Error fetching or storing contacts', error: (error as Error).message }, { status: 500 });
  }
}