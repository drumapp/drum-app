"use client";

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { INavbarItem } from "./navbar-model"
import { cn } from "@/lib/utils"
import { ChevronDown } from "lucide-react";
import Link from "next/link";
import {
      DropdownMenu,
      DropdownMenuContent,
      DropdownMenuItem,
      DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export function NavbarItem({ item }: { item: INavbarItem }) {
      const [isOpen, setIsOpen] = useState(false)
      const [x, setX] = useState(0)
     

      return (
                  <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
                        <DropdownMenuTrigger asChild onMouseEnter={() => {setIsOpen(true); setX(1)} } onMouseLeave={() => { if (x!=2) { setIsOpen(false); setX(0) } }} >
                              <Button variant="link" className={cn(
                                          "h-16 px-4 text-sm font-semibold text-white ",
                                          "flex items-center gap-1 rounded-none border-transparent",
                                          "focus-visible:outline-none focus-visible:ring-transparent"
                                    )}
                              >
                                    {item.title}
                                    {item.subItems && <ChevronDown className="h-4 w-4 opacity-50" />}
                              </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="w-48 p-0">
                              {item.subItems && item.subItems.map((subItem) => (
                                    <DropdownMenuItem key={subItem.title} onMouseEnter={() => {setIsOpen(true); setX(2)}} onMouseLeave={() => {setIsOpen(false); setX(0)}} >
                                          <Link href={subItem.href} className={cn( "px-4 py-2 text-sm transition-colors hover:bg-accent" )} >
                                                {subItem.title}
                                          </Link>
                                    </DropdownMenuItem>
                              ))}

                        </DropdownMenuContent>
                  </DropdownMenu>
      )
}