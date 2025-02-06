"use client"
import { ReactNode } from "react";
import { useMedia } from "react-use";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, } from "@/components/ui/dialog"

import { Drawer, DrawerContent, DrawerDescription,DrawerHeader, DrawerTitle, } from "@/components/ui/drawer"


interface IModalProps {
      children: ReactNode,
      open: boolean,
      onOpenChange:(value:boolean) => void
}

export const Modal = ({children, open, onOpenChange}: IModalProps) => {
      const isDesktop = useMedia("(min-width: 1024px)", true);
      if (isDesktop) {
            return (
                  <Dialog open={open} onOpenChange={onOpenChange}>
                    <DialogContent className="w-full max-w-4xl p-0 border-none overflow-y-auto hide-scrollbar max-h-[85vh]">
                      <DialogHeader>
                        <DialogTitle hidden ></DialogTitle>
                        <DialogDescription hidden> </DialogDescription>
                      </DialogHeader>
                      {children}
                    </DialogContent>
                  </Dialog>
            )
      } else {
            return(
                  <Drawer open={open} onOpenChange={onOpenChange}>
                    <DrawerContent>
                      <DrawerHeader hidden>
                        <DrawerTitle></DrawerTitle>
                        <DrawerDescription></DrawerDescription>
                      </DrawerHeader>
                      <div className="overflow-y-auto hide-scrollbar max-h-[85vh]">
                        {children}
                      </div>
                    </DrawerContent>
                  </Drawer>
            )
      }
}