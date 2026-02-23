"use client"

import { use } from "react"
import { Navbar } from "@/components/navbar"
import { ChatInterface } from "@/components/chat-interface"
import { Database, Table2, ArrowLeft } from "lucide-react"
import Link from "next/link"

/**
 * Chat Page: /chat/:db/:collection
 *
 * ChatGPT-like interface for querying a specific MongoDB collection
 * using natural language. The NLP service translates queries to
 * MongoDB operations and returns results.
 */
export default function ChatPage({
  params,
}: {
  params: Promise<{ db: string; collection: string }>
}) {
  const { db, collection } = use(params)

  return (
    <div className="flex h-screen flex-col">
      <Navbar />

      {/* Chat header: shows current db + collection context */}
      <div className="flex items-center gap-3 border-b border-border bg-card px-6 py-3">
        <Link
          href="/connector"
          className="flex items-center gap-1 text-sm text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          Back
        </Link>
        <div className="h-4 w-px bg-border" />
        <div className="flex items-center gap-2">
          <Database className="h-3.5 w-3.5 text-primary" />
          <span className="font-mono text-xs text-muted-foreground">{db}</span>
        </div>
        <span className="text-muted-foreground/40">/</span>
        <div className="flex items-center gap-2">
          <Table2 className="h-3.5 w-3.5 text-primary" />
          <span className="font-mono text-xs text-foreground">{collection}</span>
        </div>
      </div>

      {/* Chat interface fills remaining space */}
      <div className="flex-1 overflow-hidden">
        <ChatInterface db={db} collection={collection} />
      </div>
    </div>
  )
}
