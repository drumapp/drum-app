"use client";

import React from 'react';
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Loader, LogOut } from 'lucide-react';
import { useCurrentUser } from '../server/api/client/use-current-user';
import { useLogout } from '../server/api/client/use-logout';

export const UserButton = () => {
      // Fetch Current User
      const {data: response, isLoading} = useCurrentUser();
      const user = response?.data;

      // Logout Mutation
      const {mutate: logout} = useLogout();

      // Display loader while fetching current user
      if (isLoading) {
            return (
                  <div className="size-10 rounded-full flex items-center justify-center bg-gradient-to-br from-neutral-50 via-neutral-100 to-neutral-200 border border-neutral-300 shadow-lg">
                        <Loader className='size-4 animate-spin text-muted-foreground' />
                  </div>
            )
      }

      if (user == null) { return null }
      const { name, email, tenantId } = user
      const avatarFallbackText = name ? name.charAt(0).toUpperCase() : email.charAt(0).toUpperCase() ?? "U"

      return (
            <DropdownMenu modal={false}>
                  <DropdownMenuTrigger className='outline-none relative'>
                        <Avatar className='size-10 hover:opacity-75 transition border'>
                              <AvatarFallback className='bg-gradient-to-br from-neutral-50 via-neutral-100 to-neutral-200 font-semibold text-primary flex items-center justify-center'>{avatarFallbackText}</AvatarFallback>
                        </Avatar>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align='end' side='bottom' className='w-60'>
                        <div className="flex flex-col items-center justify-center gap-2 px-2.5 py-4">
                              <Avatar className='size-[52px] border'>
                                    <AvatarFallback className='bg-gradient-to-br from-neutral-50 via-neutral-100 to-neutral-200 text-primary text-xl font-bold flex items-center justify-center'>{avatarFallbackText}</AvatarFallback>
                              </Avatar>
                              <div className="flex flex-col items-center justify-center">
                                    <p className="text-sm font-semibold text-neutral-800"> {name || "User"} </p>
                                    <p className="text-xs  text-neutral-500"> {email} </p>
                                    <p className="text-xs  text-neutral-500"> {tenantId} </p>
                              </div>
                        </div>
                        <DropdownMenuSeparator className='mb-1' />
                        <DropdownMenuItem className='flex h-10 items-center justify-center font-semibold cursor-pointer text-destructive' onClick={() => logout(null)}>
                              <LogOut className='size-4 mr-2' /> Logout
                        </DropdownMenuItem>
                  </DropdownMenuContent>
            </DropdownMenu>
      )
}
