"use client"
import React, { useState } from 'react'
import { Button } from "@/components/ui/button"
import { MoreHorizontal } from 'lucide-react'
import { CreateCategoryModal } from './create-category-modal'

const CreateCategoryButton = () => {
    const [isCreateCategorymModalOpen, setIsCreateCategoryModalOpen] = useState(false);

    return (
        <>
        <Button variant={'outline'} ><MoreHorizontal /></Button>
            <Button variant={'primary'} onClick={() => setIsCreateCategoryModalOpen(true)}>Ajouter Catégorie</Button>
            <CreateCategoryModal isOpen={isCreateCategorymModalOpen} setIsOpen={setIsCreateCategoryModalOpen} />
        </>
    )
}

export default CreateCategoryButton