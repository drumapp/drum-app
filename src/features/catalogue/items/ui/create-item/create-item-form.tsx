"use client"

import React, { useActionState, useEffect, useRef, useState } from 'react'
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { CreateItemFormSchema, CreateItemFormSchemaType } from '../../lib/schemas'
import { createItem } from '../../server/actions/items-actions'
import { toast } from 'sonner'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ImageIcon, X } from 'lucide-react'


interface ICreateItemFormProps {
  onCancel?: () => void
}


export const CreateItemForm = ({ onCancel }: ICreateItemFormProps) => {

  const [state, action, isPending] = useActionState(createItem, null);
  const [imagePreview, setImagePreview] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const prevStateRef = useRef(state);

  useEffect(() => {
    if (prevStateRef.current !== state) {
      if (state?.error) {
        toast.error(state.error);
      }
      if (state?.data) {
        toast.success("L'article a été créé avec succés");
        onCancel?.();
      }
      prevStateRef.current = state;
    }
  }, [state, onCancel])

  


  const form = useForm<CreateItemFormSchemaType>({
    resolver: zodResolver(CreateItemFormSchema),
    defaultValues: {
      title: "Madrier",
      description: "Madrier de Ssi Brahim Touama ould Aghli",
      purchasePrice: 100,
      sellingPrice: 120,
      minThreshold: 5,
      maxThreshold: 20,
      isStockable: true,
    },
  })

  const isStockable = form.watch('isStockable')

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setImagePreview(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleRemoveImage = () => {
    setImagePreview(null)
    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
  }



  return (
    <Card className="w-full max-w-4xl mx-auto border-none shadow-none">
      <CardHeader>
        <CardTitle className='text-2xl font-bold'>Créer un nouvel article</CardTitle>
        <CardDescription>Renseigner la description d&apos;un article du catalogue.</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form action={action} className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">


              <FormField control={form.control} name="title" render={({ field }) => (
                <FormItem>
                  <FormLabel className='font-semibold'>Titre</FormLabel>
                  <FormControl>
                    <Input placeholder="Titre de l'article" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
              />

              <FormField
                control={form.control}
                name="image"
                render={({ }) => (
                  <FormItem>
                  <FormLabel>Product Image</FormLabel>
                  <FormControl>
                    <div className="flex items-center space-x-4">
                      <Avatar className="w-24 h-24 rounded-md border">
                        <AvatarImage src={imagePreview || state?.data?.imagePath || undefined} alt="Product" />
                        <AvatarFallback className='rounded-md'>
                          <ImageIcon className="w-8 h-8 text-muted-foreground"/>
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-row flex-1">
                        <Input type="file" id="image" name="image" accept=".jpg, .png, jpeg" onChange={handleImageChange} ref={fileInputRef} className="hidden" />
                        <Button type="button"  variant="tertiary" className="w-full mb-2" onClick={() => fileInputRef.current?.click()} > Upload Image </Button>
                        {(imagePreview || state?.data?.imagePath) && (
                          <Button type="button"  className="w-full" onClick={handleRemoveImage}>
                            <X className="w-4 h-4 mr-2" />
                            Remove Image
                          </Button>
                        )}
                      </div>
                    </div>
                  </FormControl>
                  <input type="hidden" name="removeImage" value={!imagePreview && !state?.data?.imagePath ? "true" : "false"} />
                </FormItem>
                )}
              />


              <FormField control={form.control} name="description" render={({ field }) => (
                <FormItem className="col-span-full">
                  <FormLabel className='font-semibold'>Description</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Description de l'article" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
              />

              <FormField control={form.control} name="purchasePrice" render={({ field }) => (
                <FormItem>
                  <FormLabel className='font-semibold'>Prix Achat</FormLabel>
                  <FormControl>
                    <Input type="number" step="0.1" {...field} onChange={(e) => field.onChange(Number.parseFloat(e.target.value))} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
              />

              <FormField control={form.control} name="sellingPrice" render={({ field }) => (
                <FormItem>
                  <FormLabel className='font-semibold'>Prix Vente</FormLabel>
                  <FormControl>
                    <Input type="number" step="0.1" {...field} onChange={(e) => field.onChange(Number.parseFloat(e.target.value))} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
              />

              {isStockable && (
                <>
                  <FormField control={form.control} name="minThreshold" render={({ field }) => (
                    <FormItem>
                      <FormLabel className='font-semibold'>Seuil Stock min</FormLabel>
                      <FormControl>
                        <Input type="number" {...field} onChange={(e) => field.onChange(Number.parseInt(e.target.value))} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                  />
                  <FormField control={form.control} name="maxThreshold" render={({ field }) => (
                    <FormItem>
                      <FormLabel className='font-semibold'>Seuil Stock max</FormLabel>
                      <FormControl>
                        <Input type="number" {...field} onChange={(e) => field.onChange(Number.parseInt(e.target.value))} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                  />
                </>
              )}
              <FormField control={form.control} name="isStockable" render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                  <div className="space-y-0.5">
                    <FormLabel className="text-base font-semibold">Stockable</FormLabel>
                    <FormDescription>Cet article est il stockable ?</FormDescription>
                  </div>
                  <FormControl>
                    <Switch checked={field.value} onCheckedChange={field.onChange} />
                  </FormControl>
                </FormItem>
              )}
              />

            </div>
            <div className="flex justify-end space-x-4 mt-6">
              <Button type="button" variant="outline" onClick={onCancel} disabled={isPending}> Annuler </Button>
              <Button type="submit" disabled={isPending}>Creer Article</Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  )
}
