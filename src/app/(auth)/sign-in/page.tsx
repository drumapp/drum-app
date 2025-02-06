import { autoLoginService } from '@/features/authentication/server/service/auto-login-service'
import { SignInCard } from '@/features/authentication/ui/sign-in-card'
import React from 'react'

async function SignInPage() {

  await autoLoginService()

  return (
    <SignInCard/>
  )
}

export default SignInPage