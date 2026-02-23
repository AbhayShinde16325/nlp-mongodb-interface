"use client"

import Link from "next/link"
import { Table2, ArrowRight } from "lucide-react"
import { useAppContext } from "@/context/app-context"

/**
 * CollectionList: Displays collections for the selected database.
 * Each collection links to the chat interface for querying.
 */
export function CollectionList() {
  const { collections, selectedDB, selectedCollection, setSelectedCollection } =
    useAppContext()

  if (!selectedDB) {
    return (
      <div className="flex flex-1 items-center justify-center">
        <div className="text-center">
          <Table2 className="mx-auto mb-3 h-10 w-10 text-muted-foreground/40" />
          <p className="text-sm text-muted-foreground">
            Select a database to view its collections.
          </p>
        </div>
      </div>
    )
  }

  if (collections.length === 0) {
    return (
      <div className="flex flex-1 items-center justify-center">
        <div className="text-center">
          <Table2 className="mx-auto mb-3 h-10 w-10 text-muted-foreground/40" />
          <p className="text-sm text-muted-foreground">
            No collections found in{" "}
            <span className="font-mono text-foreground">{selectedDB}</span>.
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="flex-1 p-6">
      <div className="mb-4">
        <h2 className="text-lg font-semibold text-foreground">{selectedDB}</h2>
        <p className="text-sm text-muted-foreground">
          {collections.length} collection{collections.length !== 1 ? "s" : ""} found
        </p>
      </div>
      <div className="grid gap-2">
        {collections.map((col) => (
          <Link
            key={col}
            href={`/chat/${selectedDB}/${col}`}
            className="group flex items-center justify-between rounded-lg border border-border bg-card p-4 transition-colors hover:border-primary/40 hover:bg-card/80"
          >
            <div className="flex items-center gap-3">
              <Table2 className="h-4 w-4 text-primary" />
              <span className="font-mono text-sm text-card-foreground">{col}</span>
            </div>
            <ArrowRight className="h-4 w-4 text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100" />
          </Link>
        ))}
      </div>
    </div>
  )
}
