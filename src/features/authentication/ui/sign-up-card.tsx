"use client"
import React from 'react'
import {
      Card,
      CardContent,
      CardDescription,
      CardFooter,
      CardHeader,
      CardTitle,
} from "@/components/ui/card"
import {
      Form,
      FormControl,
      FormField,
      FormItem,
      FormMessage,
} from "@/components/ui/form"
import Image from 'next/image'
import { Fingerprint } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Separator } from '@/components/ui/separator'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { SignUpFormSchemaType } from '../lib/types'
import { SignUpFormSchema } from '../lib/schemas'
import { useRegister } from '../server/api/client/use-register'

export const SignUpCard = () => {

      // Sign Up Form
      const form = useForm<SignUpFormSchemaType>({
            resolver: zodResolver(SignUpFormSchema),
            defaultValues: { name: "", email: "", password: "", tenantId: "ac-01" }
      });

      //Form submit handler
      function onSubmit(credentials: SignUpFormSchemaType) {
            register({ json: credentials })
      }

      // Sign Up mutation
      const { mutate: register, isPending } = useRegister()



      return (
            <Card className='w-full p-4 border-none shadow-none md:w-[500px] lg:w-[600px] md:border-solid md:shadow-md'>
                  <CardHeader className="flex justify-center items-center text-center space-y-1">
                        <div className="flex items-center justify-center w-full">
                              <Image src="/full-logo.svg" alt='logo' width={242} height={40} priority />
                        </div>
                        <div className="p-8" />
                        <CardTitle className="text-3xl font-bold tracking-tight flex items-center justify-center gap-2">
                              <Fingerprint className="size-6" />
                              Sign Up
                        </CardTitle>
                        <CardDescription className=" text-slate-500 text-xs font-semibold">
                              Create you account to access the app.
                        </CardDescription>
                        <CardDescription className='text-slate-500 text-xs '>
                              Sign up implies you agree our{" "}
                              <Link href={"/privacy"}><span className='font-bold text-indigo-600'>Privacy Policy</span></Link>{" "}
                              and {" "}
                              <Link href={"/terms-of-service"}><span className='font-bold text-indigo-600'>Terms of Service</span></Link>{" "}
                        </CardDescription>
                  </CardHeader>

                  <CardContent>
                        <Form {...form}>
                              <form className='space-y-4' onSubmit={form.handleSubmit(onSubmit)}>
                                    <FormField
                                          control={form.control}
                                          name="name"
                                          render={({ field }) => (
                                                <FormItem>
                                                      <FormControl>
                                                            <Input className='text-center font-semibold placeholder:font-normal' type='text' placeholder="Enter your name" aria-label="Name" {...field} />
                                                      </FormControl>
                                                      <FormMessage />
                                                </FormItem>
                                          )}
                                    />
                                    <FormField
                                          control={form.control}
                                          name="email"
                                          render={({ field }) => (
                                                <FormItem>
                                                      <FormControl>
                                                            <Input className='text-center font-semibold placeholder:font-normal' type='email' placeholder="Enter your email" aria-label="Email" {...field} />
                                                      </FormControl>
                                                      <FormMessage />
                                                </FormItem>
                                          )}
                                    />

                                    <FormField control={form.control} name="password" render={({ field }) => (
                                          <FormItem>
                                                <FormControl>
                                                      <Input className='text-center font-semibold placeholder:font-normal' type='password' placeholder="Enter your password" aria-label="Password" {...field} />
                                                </FormControl>
                                                <FormMessage />
                                          </FormItem>
                                    )}
                                    />
                                    <FormField
                                          control={form.control}
                                          name="tenantId"
                                          render={({ field }) => (
                                                <FormItem>
                                                      <FormControl>
                                                            <Input className='text-center font-semibold placeholder:font-normal' type='text' placeholder="Enter tenant ID" aria-label="Tenant ID" {...field} />
                                                      </FormControl>
                                                      <FormMessage />
                                                </FormItem>
                                          )}
                                    />
                                    <div className="p-5"><Separator /></div>
                                    <Button className='w-full' size={'lg'} disabled={isPending} aria-label="Register">Create Account</Button>
                              </form>
                        </Form>
                  </CardContent>

                  <div className="w-1/2 mx-auto"><Separator /></div>
                  <CardFooter className='p-7 flex items-baseline justify-center'>
                        <p className='text-slate-500 text-xs font-semibold'>You already have an account?&nbsp;</p>
                        <Button asChild variant={'link'} size={'xs'} className='px-1 font-bold'>
                              <Link href={"/sign-in"}>Sign In</Link>
                        </Button>
                  </CardFooter>
            </Card>
      )
}
