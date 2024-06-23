'use client';
import AcmeLogo from '@/app/ui/acme-logo';
import { ArrowRightIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import styles from '@/app/ui/home.module.css'
import { lusitana } from '@/app/ui/fonts';
import Image from 'next/image';
import { CirclePlus, CircleX, ChevronRight } from 'lucide-react';

import useTelegramInitData from '@/lib/useTelegramInitData'

// Import the necessary styles globally
import '@telegram-apps/telegram-ui/dist/styles.css';

// Import components from the library
import { AppRoot, Cell, List, Section, Avatar } from '@telegram-apps/telegram-ui';

export default function Page() {
  const initData = useTelegramInitData();

  return (
    <div>
      <AppRoot>
      <Avatar
        size={40}
        src="https://avatars.githubusercontent.com/u/84640980?v=4"
      />
     Goody
     <h1>initData</h1>
      <pre>{JSON.stringify(initData, null, 2)}</pre>
      </AppRoot>
    </div>
  );
}
