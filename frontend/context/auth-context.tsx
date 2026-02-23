"use client"

import { createContext, useContext, useMemo, useCallback, useState, type ReactNode } from "react"
import { signIn, signOut, useSession } from "next-auth/react"

/** Shape of the authenticated user object */
interface User {
  id: string
  name: string
  email: string
  avatar: string
}

interface AuthContextType {
  user: User | null
  isAuthenticated: boolean
  isLoading: boolean
  authError: string | null
  authActionLoading: boolean
  login: () => void
  logout: () => void
  clearAuthError: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

/**
 * AuthProvider wraps the app and provides authentication state.
 * Uses NextAuth Google provider.
 */
export function AuthProvider({ children }: { children: ReactNode }) {
  const { data: session, status } = useSession()
  const [authError, setAuthError] = useState<string | null>(null)
  const [authActionLoading, setAuthActionLoading] = useState(false)

  const initials = useMemo(() => {
    const label = session?.user?.name || session?.user?.email || "User"
    return label
      .split(" ")
      .filter(Boolean)
      .slice(0, 2)
      .map((part) => part[0]?.toUpperCase() || "")
      .join("")
  }, [session?.user?.name, session?.user?.email])

  const login = useCallback(() => {
    setAuthError(null)
    setAuthActionLoading(true)
    signIn(
      "google",
      { callbackUrl: "/connector", redirect: true },
      { prompt: "select_account" }
    )
      .then((result) => {
        if (result?.error) {
          setAuthError(
            "Google login failed. Check GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, NEXTAUTH_URL, and Google OAuth redirect URI."
          )
        }
      })
      .catch(() => {
        setAuthError("Google login failed due to a network/configuration error.")
      })
      .finally(() => {
        setAuthActionLoading(false)
      })
  }, [])

  const logout = useCallback(() => {
    signOut({ callbackUrl: "/" })
  }, [])

  const clearAuthError = useCallback(() => {
    setAuthError(null)
  }, [])

  const user: User | null = session?.user
    ? {
        id: session.user.email || "user",
        name: session.user.name || "User",
        email: session.user.email || "",
        avatar: initials || "U",
      }
    : null

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading: status === "loading",
        authError,
        authActionLoading,
        login,
        logout,
        clearAuthError,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) throw new Error("useAuth must be used within AuthProvider")
  return context
}
