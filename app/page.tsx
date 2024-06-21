import AcmeLogo from '@/app/ui/acme-logo';
import { ArrowRightIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import styles from '@/app/ui/home.module.css'
import { lusitana } from '@/app/ui/fonts';
import Image from 'next/image';
import { CirclePlus, CircleX, ChevronRight } from 'lucide-react';

// Import the necessary styles globally
import '@telegram-apps/telegram-ui/dist/styles.css';

// Import components from the library
import { AppRoot, Cell, List, Section, Tappable, Badge, Avatar, Button } from '@telegram-apps/telegram-ui';

// Example data for rendering list cells
const cellsTexts = ['Chat Settings', 'Data and Storage', 'Devices'];

export default function Page() {
  return (
    <AppRoot className='bg-gray-100 rounded-md'>
      <Cell
        className='rounded-md'
        after={<Button size='s' after={<ChevronRight />}>Free</Button>}
        before={<Avatar size={48} />}
        description=""
        hint=""
        interactiveAnimation="opacity"
        subhead=""
        subtitle=""
        titleBadge={<ChevronRight />}
      >
        Artur
      </Cell>
    {/* <List>
      <Section header="Header for the section" footer="Footer for the section">
        {cellsTexts.map((cellText, index) => (
          <Cell key={index}>
            {cellText}
          </Cell>
        ))}
      </Section>
    </List> */}
    <Button
      className='rounded'
      before={<CirclePlus />}
      mode="filled"
      size="s"
      
    />
    </AppRoot>
  );
}
