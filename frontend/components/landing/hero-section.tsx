"use client"

import Link from "next/link"
import { useAuth } from "@/context/auth-context"
import { ArrowRight, Terminal } from "lucide-react"

/**
 * HeroSection: Primary landing section.
 * Displays the core value proposition and a CTA to get started.
 */
export function HeroSection() {
  const { isAuthenticated, login, authActionLoading, authError } = useAuth()

  return (
    <section className="relative flex flex-col items-center px-6 pb-20 pt-24">
      {/* Subtle grid background */}
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:64px_64px]" />

      <div className="relative z-10 mx-auto max-w-3xl text-center">
        {/* Badge */}
        <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-1.5">
          <Terminal className="h-3.5 w-3.5 text-primary" />
          <span className="text-xs font-medium text-muted-foreground">
            Developer-First MongoDB Tool
          </span>
        </div>

        {/* Heading */}
        <h1 className="text-balance text-4xl font-bold leading-tight tracking-tight text-foreground md:text-5xl lg:text-6xl">
          Natural Language Interface{" "}
          <span className="text-primary">for MongoDB</span>
        </h1>

        {/* Description */}
        <p className="mx-auto mt-6 max-w-xl text-pretty text-base leading-relaxed text-muted-foreground md:text-lg">
          Stop writing complex aggregation pipelines by hand. Query your MongoDB
          databases using plain English and let the NLP engine handle the
          translation.
        </p>

        {/* CTA */}
        <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
          {isAuthenticated ? (
            <Link
              href="/connector"
              className="inline-flex items-center gap-2 rounded-xl bg-primary px-6 py-3 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
            >
              Go to Dashboard
              <ArrowRight className="h-4 w-4" />
            </Link>
          ) : (
            <div className="flex flex-col items-center gap-2">
              <button
                onClick={login}
                disabled={authActionLoading}
                className="inline-flex items-center gap-2 rounded-xl bg-primary px-6 py-3 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {authActionLoading ? "Connecting..." : "Get Started"}
                <ArrowRight className="h-4 w-4" />
              </button>
              {authError && (
                <p className="max-w-xl text-center text-xs text-destructive">
                  {authError}
                </p>
              )}
            </div>
          )}
          <a
            href="#architecture"
            className="inline-flex items-center gap-2 rounded-xl border border-border px-6 py-3 text-sm font-medium text-foreground transition-colors hover:bg-secondary"
          >
            How It Works
          </a>
        </div>

        {/* Terminal preview */}
        <div className="mx-auto mt-16 max-w-lg overflow-hidden rounded-xl border border-border bg-card">
          <div className="flex items-center gap-2 border-b border-border px-4 py-2.5">
            <div className="h-2.5 w-2.5 rounded-full bg-destructive/60" />
            <div className="h-2.5 w-2.5 rounded-full bg-chart-5/60" />
            <div className="h-2.5 w-2.5 rounded-full bg-primary/60" />
            <span className="ml-2 text-xs text-muted-foreground">mongonl</span>
          </div>
          <div className="p-4">
            <p className="font-mono text-xs leading-relaxed text-muted-foreground">
              <span className="text-primary">{">"}</span>{" "}
              <span className="text-foreground">
                Show me all users who signed up in the last 7 days
              </span>
            </p>
            <p className="mt-3 font-mono text-xs leading-relaxed text-muted-foreground">
              <span className="text-primary/70">{"// "}</span>
              {"Translating to MongoDB query..."}
            </p>
            <p className="mt-1 font-mono text-xs leading-relaxed text-foreground/80">
              {'db.users.find({ createdAt: { $gte: ISODate("2025-02-16") } })'}
            </p>
            <p className="mt-3 font-mono text-xs text-primary">
              {"Found 23 documents"}
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
