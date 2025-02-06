import { ReactNode } from "react";
import React from 'react'

interface IAuthLayoutProps {
      children: ReactNode
}

function AuthLayout({ children }: IAuthLayoutProps) {
      return (
            <div className="min-h-screen flex items-center justify-center md:bg-slate-50">
                  {children}
            </div>
      )
}

export default AuthLayout