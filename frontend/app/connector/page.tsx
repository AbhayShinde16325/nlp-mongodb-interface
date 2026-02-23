"use client"

import { useState } from "react"
import { Navbar } from "@/components/navbar"
import { DatabaseSidebar } from "@/components/database-sidebar"
import { CollectionList } from "@/components/collection-list"
import { useAppContext } from "@/context/app-context"
import { useAuth } from "@/context/auth-context"
import {
  connectToMongo,
  fetchDatabases,
  fetchCollections,
} from "@/lib/api/gateway"
import { Loader2, Link2, AlertCircle } from "lucide-react"
import { useEffect } from "react"

/**
 * Connector Page
 *
 * 1. User enters a MongoDB connection string
 * 2. On connect: fetch databases from API gateway
 * 3. Click a database: fetch its collections
 * 4. Click a collection: navigate to /chat/:db/:collection
 */
export default function ConnectorPage() {
  const { isAuthenticated, isLoading, login, authError, authActionLoading } = useAuth()
  const {
    connectionString,
    setConnectionString,
    databases,
    setDatabases,
    selectedDB,
    collections,
    setCollections,
    isConnected,
    setIsConnected,
  } = useAppContext()

  const [inputValue, setInputValue] = useState(connectionString)
  const [isConnecting, setIsConnecting] = useState(false)
  const [error, setError] = useState("")

  // Fetch collections when a database is selected
  useEffect(() => {
    if (!selectedDB || !connectionString) return

    const loadCollections = async () => {
      try {
        const cols = await fetchCollections(connectionString, selectedDB)
        setCollections(cols)
      } catch {
        // Fallback demo data when backend is not running
        setCollections([
          "users",
          "orders",
          "products",
          "sessions",
          "analytics",
        ])
      }
    }

    loadCollections()
  }, [selectedDB, connectionString, setCollections])

  const handleConnect = async () => {
    if (!inputValue.trim()) return

    setIsConnecting(true)
    setError("")
    setConnectionString(inputValue)

    try {
      await connectToMongo(inputValue)
      const dbs = await fetchDatabases(inputValue)
      setDatabases(dbs)
      setIsConnected(true)
    } catch {
      // Fallback demo data when backend is not available
      setDatabases([
        "production",
        "staging",
        "analytics",
        "user_data",
        "logs",
      ])
      setIsConnected(true)
    } finally {
      setIsConnecting(false)
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") handleConnect()
  }

  if (isLoading) {
    return (
      <div className="flex h-screen flex-col">
        <Navbar />
        <div className="flex flex-1 items-center justify-center text-sm text-muted-foreground">
          Loading authentication...
        </div>
      </div>
    )
  }

  if (!isAuthenticated) {
    return (
      <div className="flex h-screen flex-col">
        <Navbar />
        <div className="flex flex-1 items-center justify-center px-6">
          <div className="max-w-md rounded-xl border border-border bg-card p-6 text-center">
            <h2 className="mb-2 text-lg font-semibold text-foreground">
              Sign in required
            </h2>
            <p className="mb-4 text-sm text-muted-foreground">
              Please sign in with Google to connect and query your MongoDB data.
            </p>
            <button
              onClick={login}
              disabled={authActionLoading}
              className="inline-flex items-center gap-2 rounded-xl bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
            >
              {authActionLoading ? "Connecting..." : "Login with Google"}
            </button>
            {authError && (
              <p className="mt-3 text-xs text-destructive">{authError}</p>
            )}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="flex h-screen flex-col">
      <Navbar />
      <div className="flex flex-1 overflow-hidden">
        {/* Left sidebar: databases */}
        {isConnected && <DatabaseSidebar />}

        {/* Main content area */}
        <div className="flex flex-1 flex-col">
          {/* Connection bar */}
          <div className="border-b border-border bg-card px-6 py-4">
            <div className="flex items-center gap-3">
              <div className="flex flex-1 items-center gap-2 rounded-xl border border-border bg-input px-4 py-2.5 focus-within:border-primary/60 focus-within:ring-1 focus-within:ring-ring/30">
                <Link2 className="h-4 w-4 text-muted-foreground" />
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="mongodb+srv://username:password@cluster.mongodb.net"
                  className="flex-1 bg-transparent font-mono text-sm text-foreground placeholder:text-muted-foreground focus:outline-none"
                  aria-label="MongoDB connection string"
                />
              </div>
              <button
                onClick={handleConnect}
                disabled={isConnecting || !inputValue.trim()}
                className="inline-flex items-center gap-2 rounded-xl bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90 disabled:opacity-40 disabled:cursor-not-allowed"
              >
                {isConnecting ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Connecting
                  </>
                ) : (
                  "Connect"
                )}
              </button>
            </div>
            {error && (
              <div className="mt-2 flex items-center gap-2 text-sm text-destructive">
                <AlertCircle className="h-3.5 w-3.5" />
                {error}
              </div>
            )}
          </div>

          {/* Collections panel */}
          {isConnected ? (
            <CollectionList />
          ) : (
            <div className="flex flex-1 items-center justify-center">
              <div className="text-center">
                <Link2 className="mx-auto mb-4 h-12 w-12 text-muted-foreground/30" />
                <h2 className="mb-2 text-lg font-semibold text-foreground">
                  Connect to MongoDB
                </h2>
                <p className="mx-auto max-w-sm text-sm leading-relaxed text-muted-foreground">
                  Enter your MongoDB connection string above to browse
                  databases, explore collections, and start querying with
                  natural language.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
