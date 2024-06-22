'use client';
import AcmeLogo from '@/app/ui/acme-logo';
import { ArrowRightIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import styles from '@/app/ui/home.module.css'
import { lusitana } from '@/app/ui/fonts';
import Image from 'next/image';
import { CirclePlus, CircleX, ChevronRight } from 'lucide-react';

import { TelegramProvider, useTelegram } from "@/lib/TelegramProvider";

import WebApp from '@twa-dev/sdk'

// WebApp.showAlert('Hello world!');

export default function Page() {
  const { telegramUser, webApp } = useTelegram();
  console.log(telegramUser);

  // WebApp.showAlert('Hello world!');

  return (
    <div>
     
    </div>
  );
}
