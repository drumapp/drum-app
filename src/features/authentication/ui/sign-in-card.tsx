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
import { SignInFormSchemaType } from '../lib/types'
import { SignInFormSchema } from '../lib/schemas'
import { useLogin } from '../server/api/client/use-login'

export const SignInCard = () => {

      // Sign In Form
      const form = useForm<SignInFormSchemaType>({
            resolver: zodResolver(SignInFormSchema),
            defaultValues: { email: "", password: "" }
      });

      //Form submit handler
      function onSubmit(credentials: SignInFormSchemaType) {            
            login({json: credentials})
      }

      // Sign In mutation
      const {mutate: login, isPending} = useLogin();



      return (
            <Card className='w-full p-4 border-none shadow-none md:w-[500px] lg:w-[600px] md:border-solid md:shadow-md'>
                  <CardHeader className="flex justify-center items-center text-center space-y-1">
                        <div className="flex items-center justify-center w-full">
                              <Image src="/full-logo.svg" alt='logo' width={242} height={40} priority />
                        </div>
                        <div className="p-8" />
                        <CardTitle className="text-3xl font-bold tracking-tight flex items-center justify-center gap-2">
                              <Fingerprint className="size-6" />
                              Sign In
                        </CardTitle>
                        <CardDescription className=" text-slate-500 text-xs font-semibold">
                              Login to access the app.
                        </CardDescription>
                  </CardHeader>

                  <CardContent>
                        <Form {...form}>
                              <form className='space-y-4' onSubmit={form.handleSubmit(onSubmit)}>
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
                                    <div className="p-5"><Separator /></div>
                                    <Button className='w-full' size={'lg'} disabled={isPending} aria-label="Login">Login</Button>
                              </form>
                        </Form>
                  </CardContent>

                  <div className="w-1/2 mx-auto"><Separator /></div>
                  <CardFooter className='p-7 flex items-baseline justify-center'>
                        <p className='text-slate-500 text-xs font-semibold'>You don&apos;t have an account?&nbsp;</p>
                        <Button asChild variant={'link'} size={'xs'} className='px-1 font-bold'>
                              <Link href={"/sign-up"}>Sign Up</Link>
                        </Button>
                  </CardFooter>
            </Card>
      )
}
