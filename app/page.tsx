'use client';
import AcmeLogo from '@/app/ui/acme-logo';
import { ArrowRightIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import styles from '@/app/ui/home.module.css'
import { lusitana } from '@/app/ui/fonts';
import Image from 'next/image';
import { CirclePlus, CircleX, ChevronRight } from 'lucide-react';

import useTelegramInitData from '@/lib/useTelegramInitData'

export default function Page() {
  const initData = useTelegramInitData();

  return (
    <div>
     Hi
     <h1>initData</h1>
      <pre>{JSON.stringify(initData, null, 2)}</pre>
    </div>
  );
}
