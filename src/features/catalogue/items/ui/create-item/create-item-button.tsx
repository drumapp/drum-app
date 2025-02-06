"use client"
import React, { useState } from 'react'
import { Button } from "@/components/ui/button"
import { CreateItemModal } from '@/features/catalogue/items/ui/create-item/create-item-modal'
import { MoreHorizontal } from 'lucide-react'

const CreateItemButton = () => {
    const [isCreateItemModalOpen, setIsCreateItemModalOpen] = useState(false);

    return (
        <>
        <Button variant={'outline'} ><MoreHorizontal /></Button>
            <Button variant={'primary'} onClick={() => setIsCreateItemModalOpen(true)}>Ajouter Article</Button>
            <CreateItemModal isOpen={isCreateItemModalOpen} setIsOpen={setIsCreateItemModalOpen} />
        </>
    )
}

export default CreateItemButton