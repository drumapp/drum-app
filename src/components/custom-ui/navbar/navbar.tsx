import React from 'react'
import { UserButton } from '@/features/authentication/ui/user-button'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Bell, Settings } from 'lucide-react'
import { MobileSidebar } from '../sidebar/mobile-sidebar'
import Link from 'next/link'

export const Navbar = () => {
      return (
            <nav className="w-full px-6 p-4 lg:pt-2 flex items-center justify-between lg:justify-end bg-slate-50 lg:bg-inherit 2xl:hidden">

                  <MobileSidebar />
                  <Link href={'/'} className='hidden md:flex lg:hidden items-center justify-start gap-x-2'>
                        <Image src="/icon-logo.svg" alt='logo' width={40} height={40} priority />
                        <h1 className='text-2xl font-bold'>Drum App</h1>
                  </Link>
                  <div className="flex items-center justify-center gap-x-4">
                        <Button variant="ghost" size="icon"><Bell className="h-5 w-5" /></Button>
                        <Button variant="ghost" size="icon"> <Settings className="h-5 w-5" /></Button>
                        <UserButton />
                  </div>
            </nav>
      )
}
