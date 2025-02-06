import { Modal } from '@/components/custom-ui/modal/modal'
import React from 'react'
import { CreateItemForm } from './create-item-form'

interface ICreateItemModalProps {
      isOpen: boolean,
      setIsOpen: (value: boolean) => void
}
export const CreateItemModal = ({ isOpen, setIsOpen }: ICreateItemModalProps) => {

      return (
            <Modal open={isOpen} onOpenChange={setIsOpen}>
                  <CreateItemForm onCancel={()=> {setIsOpen(false)}}/>
            </Modal>
      )
}
