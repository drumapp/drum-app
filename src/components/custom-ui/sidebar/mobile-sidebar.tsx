"use client"
import React, { useEffect, useState } from 'react'
import {
      Sheet,
      SheetContent,
      SheetDescription,
      SheetHeader,
      SheetTitle,
      SheetTrigger,
} from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { Menu } from 'lucide-react'
import { SideBar } from './sidebar'
import { usePathname } from 'next/navigation'

export const MobileSidebar = () => {
      // Close the sidebar when path name change => navigation to other page[]
      const [isOpen, setIsOpen] = useState(false)
      const pathName = usePathname();
      useEffect(() => { setIsOpen(false) }, [pathName])

      return (
            <Sheet modal={false} open={isOpen} onOpenChange={setIsOpen}>
                  <SheetTrigger asChild>
                        <Button variant={"secondary"} size={'icon'} className='lg:hidden p-5'>
                              <Menu strokeWidth={3}/>
                        </Button>
                  </SheetTrigger>
                  <SheetContent side={'left'} className='p-0'>
                        <SheetHeader className='hidden'>
                              <SheetTitle></SheetTitle>
                              <SheetDescription></SheetDescription>
                        </SheetHeader>
                        <SideBar />
                  </SheetContent>
            </Sheet>

      )
}
