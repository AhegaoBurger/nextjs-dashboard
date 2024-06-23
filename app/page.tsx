'use client';
import AcmeLogo from '@/app/ui/acme-logo';
import { ArrowRightIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import styles from '@/app/ui/home.module.css'
import { lusitana } from '@/app/ui/fonts';
import Image from 'next/image';
import { CirclePlus, CircleX, ChevronRight } from 'lucide-react';
import { useEffect, useState } from 'react';

import useTelegramInitData from '@/lib/useTelegramInitData'

// Import the necessary styles globally
import '@telegram-apps/telegram-ui/dist/styles.css';

// Import components from the library
import { AppRoot, Cell, List, Section, Avatar } from '@telegram-apps/telegram-ui';

interface User {
  id: number;
  first_name: string;
  last_name?: string;
  username?: string;
  is_bot: boolean;
}

const fetchUserData = async () => {
  const response = await fetch('/api/tele-user-info');
  if (!response.ok) {
    throw new Error('Failed to fetch user info');
  }
  const data: User = await response.json();
  console.log('data', data);
  return data;
};

export default function Page() {
  const initData = useTelegramInitData();

  const [user, setUser] = useState<User | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchUserData()
      .then(setUser)
      .catch((error) => setError(error.message));
  }, []);

  if (error) {
    return <p>Error: {error}</p>;
  }

  if (!user) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <AppRoot>
      <Avatar
        size={40}
        src="https://avatars.githubusercontent.com/u/84640980?v=4"
      />
     Haylo
     {/* <p>User: {user}</p> */}
     <p>First Name: {user.first_name}</p>
      {user.last_name && <p>Last Name: {user.last_name}</p>}
      {user.username && (
        <>
          <p>Username: {user.username}</p>
          <img
            src={`https://t.me/${user.username}`}
            alt={`${user.first_name} ${user.last_name}`}
          />
        </>
      )}
     <h1>initData</h1>
      <pre>{JSON.stringify(initData, null, 2)}</pre>
      </AppRoot>
    </div>
  );
}
