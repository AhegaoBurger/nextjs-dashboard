// lib/bot.ts
import { Telegraf } from 'telegraf';

if (!process.env.TELEGRAM_BOT_TOKEN) {
  throw new Error('TELEGRAM_BOT_TOKEN is not defined');
}

const bot = new Telegraf(process.env.TELEGRAM_BOT_TOKEN);

// Bot commands and handlers can be defined here
bot.start((ctx: any) => ctx.reply('Welcome! Send /info to get user info'));

bot.command('info', (ctx: any) => {
  const user = ctx.from;
  ctx.reply(`User Info:
    First Name: ${user.first_name}
    Last Name: ${user.last_name}
    Username: ${user.username}
    Profile URL: https://t.me/${user.username}`);
});

// This allows the bot instance to be used in other files
export default bot;
