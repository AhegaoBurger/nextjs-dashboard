'use client';
import AcmeLogo from '@/app/ui/acme-logo';
import { ArrowRightIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import styles from '@/app/ui/home.module.css'
import { lusitana } from '@/app/ui/fonts';
import Image from 'next/image';
import { CirclePlus, CircleX, ChevronRight } from 'lucide-react';

import { useTelegram } from '@/lib/TelegramProvider';

export default function Page() {
  const { telegramUser, webApp } = useTelegram();
  console.log(telegramUser);

  return (
    <div>
     Hi
     {telegramUser ? (
        <div>
          <h1>Welcome {telegramUser?.username}</h1>
          User data:
          <pre>{JSON.stringify(telegramUser, null, 2)}</pre>
          Eniter Web App data:
          <pre>{JSON.stringify(webApp, null, 2)}</pre>
        </div>
      ) : (
        <div>Make sure web app is opened from telegram client</div>
      )}
    </div>
  );
}
