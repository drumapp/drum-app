import React from 'react'
import { Button } from "@/components/ui/button"
import Link from 'next/link'
import Image from 'next/image'
import { navbarItems } from './navbar-model'

import { Bell, Settings } from 'lucide-react'
import { UserButton } from '@/features/authentication/ui/user-button'
import { NavbarItem } from './navbar-item'


export const StickyNavbar = () => {
      return (
            <div className=" hidden 2xl:block sticky top-0 z-50 w-full border-b bg-slate-800 my-4 rounded-xl shadow-lg">
                  <div className="flex h-16 items-center justify-between px-4">
                        <div className="flex items-center gap-6">
                              <Link href="/" className="hidden min-[1400px]:flex items-center space-x-2">
                                    <Image src="/icon-logo.svg" alt='logo' width={40} height={40} priority />
                              </Link>
                              <nav className="hidden min-[1400px]:flex items-center">
                                    {navbarItems.map((item) => (
                                          <NavbarItem key={item.title} item={item} />
                                    ))}
                              </nav>
                        </div>
                        <div className="flex items-center gap-4">
                              <Button variant="ghost" className="text-white"> <Bell /> </Button>
                              <Button variant="ghost" className="text-white"> <Settings /> </Button>
                              <UserButton />
                        </div>
                  </div>
            </div>
      )
}
