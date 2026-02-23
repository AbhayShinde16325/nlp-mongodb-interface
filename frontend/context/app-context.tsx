"use client"

import { createContext, useContext, useState, useCallback, type ReactNode } from "react"

/** A single chat message between user and assistant */
export interface QueryResultSnapshot {
  data?: Record<string, unknown>[]
  result?: number
  result_count?: number
  total_results?: number
  page?: number
  page_size?: number
  warning?: string
  value_hint?: string
}

export interface ChatMessage {
  id: string
  role: "user" | "assistant"
  content: string
  timestamp: Date
  queryResult?: QueryResultSnapshot
}

interface AppContextType {
  connectionString: string
  setConnectionString: (s: string) => void
  selectedDB: string | null
  setSelectedDB: (db: string | null) => void
  selectedCollection: string | null
  setSelectedCollection: (col: string | null) => void
  databases: string[]
  setDatabases: (dbs: string[]) => void
  collections: string[]
  setCollections: (cols: string[]) => void
  chatMessages: ChatMessage[]
  addChatMessage: (msg: ChatMessage) => void
  clearChat: () => void
  isConnected: boolean
  setIsConnected: (v: boolean) => void
}

const AppContext = createContext<AppContextType | undefined>(undefined)

/**
 * AppProvider manages the core application state:
 * - MongoDB connection info
 * - Database & collection selection
 * - Chat message history
 */
export function AppProvider({ children }: { children: ReactNode }) {
  const [connectionString, setConnectionString] = useState("")
  const [selectedDB, setSelectedDB] = useState<string | null>(null)
  const [selectedCollection, setSelectedCollection] = useState<string | null>(null)
  const [databases, setDatabases] = useState<string[]>([])
  const [collections, setCollections] = useState<string[]>([])
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([])
  const [isConnected, setIsConnected] = useState(false)

  const addChatMessage = useCallback((msg: ChatMessage) => {
    setChatMessages((prev) => [...prev, msg])
  }, [])

  const clearChat = useCallback(() => {
    setChatMessages([])
  }, [])

  return (
    <AppContext.Provider
      value={{
        connectionString,
        setConnectionString,
        selectedDB,
        setSelectedDB,
        selectedCollection,
        setSelectedCollection,
        databases,
        setDatabases,
        collections,
        setCollections,
        chatMessages,
        addChatMessage,
        clearChat,
        isConnected,
        setIsConnected,
      }}
    >
      {children}
    </AppContext.Provider>
  )
}

export function useAppContext() {
  const context = useContext(AppContext)
  if (!context) throw new Error("useAppContext must be used within AppProvider")
  return context
}
