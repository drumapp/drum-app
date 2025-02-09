import { Modal } from '@/components/custom-ui/modal/modal'
import React from 'react'
import { CreateCategoryForm } from './create-category-form'


interface ICreateCategoryModalProps {
      isOpen: boolean,
      setIsOpen: (value: boolean) => void
}
export const CreateCategoryModal = ({ isOpen, setIsOpen }: ICreateCategoryModalProps) => {

      return (
            <Modal open={isOpen} onOpenChange={setIsOpen}>
                  <CreateCategoryForm onCancel={()=> {setIsOpen(false)}}/>
            </Modal>
      )
}
