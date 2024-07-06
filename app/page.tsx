'use client';
import AcmeLogo from '@/app/ui/acme-logo';
import { ArrowRightIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import styles from '@/app/ui/home.module.css'
import { lusitana } from '@/app/ui/fonts';
import Image from 'next/image';
import { CirclePlus, CircleX, ChevronRight } from 'lucide-react';
import { useEffect, useState } from 'react';
import { User, Contact, FetchContactsResponse } from '@/types';

import useTelegramInitData from '@/lib/useTelegramInitData'

// Import the necessary styles globally
import '@telegram-apps/telegram-ui/dist/styles.css';

// Import components from the library
import { AppRoot, Cell, List, Section, Avatar, Button } from '@telegram-apps/telegram-ui';

import { WebApp } from "@grammyjs/web-app";

const fetchUserData = async () => {
  const response = await fetch('/api/tele-user-info');
  if (!response.ok) {
    throw new Error('Failed to fetch user info');
  }
  const data: User = await response.json();
  console.log('data', data);
  return data;
};

const createInviteLink = async (): Promise<string> => {
  const response = await fetch('/api/create-invite-link', { method: 'POST' });
  if (!response.ok) {
    throw new Error('Failed to create invite link');
  }
  const data = await response.json();
  return data.inviteLink;
};

const getBotUsername = async (): Promise<string> => {
  const response = await fetch('/api/get-bot-info');
  if (!response.ok) {
    throw new Error('Failed to get bot info');
  }
  const data = await response.json();
  return data.username;
};


export default function Page() {
  const initData = useTelegramInitData();

  const [user, setUser] = useState<User | null>(null);
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [tg, setTg] = useState<any>(null);
  const [botUsername, setBotUsername] = useState<string | null>(null);

  useEffect(() => {
    if (typeof window !== 'undefined' && window.Telegram) {
      setTg(window.Telegram.WebApp);
    }

    getBotUsername().then(setBotUsername)
    .then(data => console.log('botData', data))
    .catch(console.error);
  }, []);

  const handleAddToGroup = () => {
    if (!tg || !botUsername) {
      setError('Unable to add bot to group at this time');
      return;
    }

    // This URL will open the "Add to Group" dialog
    const url = `https://telegram.me/${botUsername}&startgroup=true`;
    // tg.openTelegramLink(url);
    window.Telegram.WebApp.openTelegramLink(url);
  };

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

  function closeWebApp() {
    if (window.Telegram && window.Telegram.WebApp) {
      window.Telegram.WebApp.close();
    } else {
      console.error('Telegram WebApp is not available');
    }
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
      <Button onClick={handleAddToGroup} disabled={!botUsername}>
          Add Bot to Group
        </Button>
        <Button onClick={closeWebApp}>
          Close WebApp
        </Button>
      </AppRoot>
    </div>
  );
}
