"use client"

import Link from "next/link"
import { Database, ChevronRight } from "lucide-react"
import { useAppContext } from "@/context/app-context"

/**
 * DatabaseSidebar: Left sidebar on the Connector page.
 * Displays the list of databases fetched from MongoDB.
 * Clicking a database fetches its collections.
 */
export function DatabaseSidebar() {
  const { databases, selectedDB, setSelectedDB } = useAppContext()

  if (databases.length === 0) {
    return (
      <aside className="flex w-64 flex-col border-r border-border bg-sidebar p-4">
        <h2 className="mb-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          Databases
        </h2>
        <p className="text-sm text-muted-foreground">
          Connect to see your databases.
        </p>
      </aside>
    )
  }

  return (
    <aside className="flex w-64 flex-shrink-0 flex-col border-r border-border bg-sidebar">
      <div className="border-b border-sidebar-border p-4">
        <h2 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          Databases
        </h2>
      </div>
      <nav className="flex-1 overflow-y-auto p-2" aria-label="Database list">
        {databases.map((db) => (
          <button
            key={db}
            onClick={() => setSelectedDB(db)}
            className={`flex w-full items-center gap-2 rounded-md px-3 py-2 text-sm transition-colors ${
              selectedDB === db
                ? "bg-sidebar-accent text-sidebar-accent-foreground"
                : "text-sidebar-foreground hover:bg-sidebar-accent/50"
            }`}
          >
            <Database className="h-3.5 w-3.5 text-primary" />
            <span className="flex-1 truncate text-left font-mono text-xs">
              {db}
            </span>
            <ChevronRight className="h-3 w-3 text-muted-foreground" />
          </button>
        ))}
      </nav>
    </aside>
  )
}
