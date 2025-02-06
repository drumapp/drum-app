import { autoLoginService } from '@/features/authentication/server/service/auto-login-service'
import { SignUpCard } from '@/features/authentication/ui/sign-up-card'
import React from 'react'

async function SignUpPage() {

  await autoLoginService()

  return (
    <div>
      <SignUpCard />
    </div>
  )
}

export default SignUpPage