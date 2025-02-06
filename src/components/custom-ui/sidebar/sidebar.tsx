import { Separator } from '@/components/ui/separator'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { navbarItems } from '../navbar/navbar-model'
import { cn } from '@/lib/utils'

export const SideBar = () => {
      return (
            <aside className='h-full w-full border-r-2 border-slate-100 p-4'>
                  <Link href={'/'} className='flex items-center justify-start gap-x-2'>
                        <Image src="/icon-logo.svg" alt='logo' width={40} height={40} priority />
                        <h1 className='text-2xl font-bold'>Drum App</h1>
                  </Link>
                  <Separator className="my-4"/>
                  <div className="flex flex-col">
                        <Accordion type="single"  collapsible className="w-full">
                              {navbarItems.map((item) => (
                                    item.subItems ? (
                                          <AccordionItem key={item.title} value={item.title}>
                                          <AccordionTrigger className="py-2 text-sm hover:no-underline font-semibold">{item.title}</AccordionTrigger>
                                          <AccordionContent className="pb-1">
                                                {item.subItems?.map((subItem) => (
                                                      <Link
                                                            key={subItem.title}
                                                            href={subItem.href}
                                                            className={cn(
                                                                  "flex w-full items-center py-2 pl-4 pr-4 text-sm",
                                                                  "transition-colors hover:bg-accent",
                                                                  "focus-visible:bg-accent focus-visible:outline-none",
                                                            )}
                                                      >
                                                            {subItem.title}
                                                      </Link>
                                                ))}
                                          </AccordionContent>
                                    </AccordionItem>
                                    ) : ( 
                                          <div key={item.title}  className="">
                                                <Link   href={item.href} className={"py-2 text-sm hover:no-underline font-semibold"} > {item.title}</Link> 
                                                <Separator className="mt-2" />
                                          </div>
                                    )

                              ))}
                        </Accordion>
                  </div>

            </aside>
      )
}
