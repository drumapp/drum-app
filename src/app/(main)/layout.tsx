"use client"
import { Navbar } from '@/components/custom-ui/navbar/navbar'
import { StickyNavbar } from '@/components/custom-ui/navbar/sticky-navbar';
import { SideBar } from '@/components/custom-ui/sidebar/sidebar'
import React, { ReactNode } from 'react'
import { useMedia } from "react-use";

interface IDashboardLayoutProps {
      children: ReactNode
}

function DashboardLayout({ children }: IDashboardLayoutProps) {
      const isLargeDesktop = useMedia("(min-width: 1536px)", true);
      return (
            <div className="min-h-screen">
                  <div className="flex w-full h-full">
                        <div className="fixed left-0 top-0 hidden lg:block lg:w-[260px] 2xl:hidden h-full overflow-auto">
                              <SideBar/>
                        </div>
                        <div className="lg:pl-[260px] 2xl:pl-0 w-full py-2">
                              <div className="mx-auto max-w-screen-2xl h-full">
                                    {isLargeDesktop ? <StickyNavbar/> : <Navbar/>}
                                    <main className="h-full py-2 px-4 flex flex-col">
                                          {children}
                                    </main>
                              </div>
                        </div>
                  </div>
            </div>
      )
}

export default DashboardLayout