import '@/app/ui/global.css'
import { inter } from '@/app/ui/fonts';
import { Inter as FontSans } from "next/font/google"
import { cn } from "@/lib/utils"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation';
import {
  DropdownMenu,
  DropdownMenuLabel,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import Image from "next/image"
// import React, { useEffect, useState, useCallback } from 'react'
import Avatar from './(components)/Avatar'
import Script from 'next/script';

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = createClient()

	const { data, error } = await supabase.auth.getUser()
	const user = data.user
	// console.log("The result of getUser is ", user)

  	const userProfilePicUrl = await supabase
		.from('profiles')
		.select(`avatar_url`)
		.eq('id', user?.id)
		.single()

	const avatarUrl = userProfilePicUrl.data?.avatar_url

  // const { telegramUser, webApp } = useTelegram();
  // console.log(user);
  
  return (
    <html className='flex gap-2' lang="en">
      <head >
        <Script id='telegram' src="https://telegram.org/js/telegram-web-app.js" strategy='beforeInteractive'></Script>
      </head>
      <body className={`${inter.className} antialiased`} style={{ paddingTop: '1.5rem' }}> {/* Adjust paddingTop to the height of your navbar */}      
      {/* <nav className="fixed inset-x-0 top-0 z-50 bg-white shadow-sm dark:bg-gray-950/90">
        <div className="w-full max-w-7xl mx-auto px-4">
          <div className="flex justify-between h-14 items-center">
            <Link href="/" className="flex items-center" prefetch={false}>
              <MountainIcon className="h-6 w-6" />
              <span className="sr-only">Acme Inc</span>
            </Link>
            <nav className="hidden md:flex gap-4">
              <Link
                href="/"
                className="font-medium flex items-center text-sm transition-colors hover:underline"
                prefetch={false}
              >
                Home
              </Link>
              <Link
                href="/account"
                className="font-medium flex items-center text-sm transition-colors hover:underline"
                prefetch={false}
              >
                Account
              </Link>
            </nav>
            <div className="flex items-center gap-4">
              {!data?.user ? (
                <>
            <Link href="/login">
              <Button variant="outline" size="sm">
              Sign in
            </Button>
          </Link>
          <Link href="/register">
            <Button size="sm">Sign up</Button>
          </Link>
                </>
              ) : (
                <>
                  <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                className="overflow-hidden rounded-full"
              >
              {avatarUrl ? (
                <Avatar
                  avatarUrl={avatarUrl}
                />
              ) : (
                // <div className="avatar no-image" style={{ height: 36, width: 36 }} />
                <Image
                  src="/public/placeholder-user.jpg"
                  width={36}
                  height={36}
                  alt="Avatar"
                  className="overflow-hidden rounded-full"
                />
              )}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Settings</DropdownMenuItem>
              <DropdownMenuItem>Support</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <form action="/auth/signout" method="post">
                  <Button variant='ghost' type="submit">
                    Sign out
                  </Button>
                </form>
                    </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
                </>
              )}
            </div>
          </div>
        </div>
      </nav> */}
        {children}
      </body>
    </html>
  );
}


function MountainIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m8 3 4 8 5-5 5 15H2L8 3z" />
    </svg>
  )
}