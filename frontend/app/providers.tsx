"use client"

import { SessionProvider } from "next-auth/react"
import { AppProvider } from "@/context/app-context"
import { AuthProvider } from "@/context/auth-context"

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <AuthProvider>
        <AppProvider>{children}</AppProvider>
      </AuthProvider>
    </SessionProvider>
  )
}
