"use client"
import React, { startTransition, useActionState, useEffect, useRef } from 'react'
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { CreateItemCategoryFormSchema, CreateItemCategoryFormSchemaType } from '../../lib/schemas'
import { toast } from 'sonner'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue, } from "@/components/ui/select"
import { createItemCategory } from '../../server/actions'
import { ItemCategoryType } from '../../lib/enums'


interface ICreateCategoryFormProps {
      onCancel?: () => void
}


export const CreateCategoryForm = ({ onCancel }: ICreateCategoryFormProps) => {

      const [state, action, isPending] = useActionState(createItemCategory, null);
      const prevStateRef = useRef(state);

      useEffect(() => {
            if (prevStateRef.current !== state) {
                  if (state?.error) {
                        toast.error(state.error);
                  }
                  if (state?.data) {
                        toast.success("La catégorie a été créé avec succés");
                        onCancel?.();
                  }
                  prevStateRef.current = state;
            }
      }, [state, onCancel])

      const handleSubmit = async (data: CreateItemCategoryFormSchemaType) => {
            const formData = new FormData();
            formData.append("title", data.title);
            formData.append("description", data.description || "");
            formData.append("type", data.type);
      
            // Log the FormData object
            for (const [key, value] of formData.entries()) {
                  console.log(`${key}: ${value}`);
            }
            startTransition(() => {
                  action(formData);
            });
      };


      const form = useForm<CreateItemCategoryFormSchemaType>({
            resolver: zodResolver(CreateItemCategoryFormSchema),
            defaultValues: {
                  title: "",
                  description: "",
            },
      })


      return (
            <Card className="w-full max-w-4xl mx-auto border-none shadow-none">
                  <CardHeader>
                        <CardTitle className='text-2xl font-bold'>Créer une catégorie d&apos;articles</CardTitle>
                        <CardDescription>Renseigner la description d&apos;une catégorie d&apos;articles du catalogue.</CardDescription>
                  </CardHeader>
                  <CardContent>
                        <Form {...form}>
                              <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-8">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">


                                          <FormField control={form.control} name="title" render={({ field }) => (
                                                <FormItem className='col-span-full md:col-span-1'>
                                                      <FormLabel className='font-semibold'>Titre</FormLabel>
                                                      <FormControl>
                                                            <Input placeholder="Titre de la catégories" {...field} />
                                                      </FormControl>
                                                      <FormMessage />
                                                </FormItem>
                                          )}
                                          />



                                          <FormField
                                                control={form.control}
                                                name="type"
                                                render={({ field }) => (
                                                      <FormItem className='col-span-full md:col-span-1'>
                                                            <FormLabel>Category Type</FormLabel>
                                                            <FormControl>
                                                                  <Select onValueChange={field.onChange}
                                                                        value={field.value} // Ensure the value is controlled
                                                                        defaultValue={field.value} // Ensure initial value is set
                                                                  >

                                                                        <SelectTrigger>
                                                                              <SelectValue placeholder="Choisir un type d'article" />
                                                                        </SelectTrigger>

                                                                        <SelectContent>
                                                                              <SelectItem value={ItemCategoryType.Product}>Produit</SelectItem>
                                                                              <SelectItem value={ItemCategoryType.Service}>Service</SelectItem>
                                                                        </SelectContent>
                                                                  </Select>
                                                            </FormControl>
                                                            <FormDescription>Spécifie si cette catégorie s&apos;applique aux articles de type produit ou service.</FormDescription>
                                                            <FormMessage />
                                                      </FormItem>
                                                )}
                                          />


                                          <FormField control={form.control} name="description" render={({ field }) => (
                                                <FormItem className="col-span-full">
                                                      <FormLabel className='font-semibold'>Description</FormLabel>
                                                      <FormControl>
                                                            <Textarea placeholder="Description de la catégorie" {...field} />
                                                      </FormControl>
                                                      <FormMessage />
                                                </FormItem>
                                          )}
                                          />



                                    </div>
                                    <div className="flex justify-end space-x-4 mt-6">
                                          <Button type="button" variant="outline" onClick={onCancel} disabled={isPending}> Annuler </Button>
                                          <Button type="submit" disabled={isPending}>Creer Catégorie</Button>
                                    </div>
                              </form>
                        </Form>
                  </CardContent>
            </Card>
      )
}
