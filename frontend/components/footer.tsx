import { Database } from "lucide-react"

/**
 * Footer: Minimal footer with branding and contact links.
 * Displayed at the bottom of public-facing pages.
 */
export function Footer() {
  return (
    <footer className="border-t border-border bg-background px-6 py-8">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-6 md:flex-row md:justify-between">
        {/* Brand */}
        <div className="flex items-center gap-2">
          <Database className="h-4 w-4 text-primary" />
          <span className="text-sm font-medium text-foreground">MongoNL</span>
        </div>

        {/* Links */}
        <nav className="flex items-center gap-6" aria-label="Footer links">
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            GitHub
          </a>
          <a
            href="mailto:support@mongonl.dev"
            className="text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            Contact
          </a>
          <a
            href="#"
            className="text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            Documentation
          </a>
        </nav>

        {/* Copyright */}
        <p className="text-xs text-muted-foreground">
          {"Built for developers, powered by NLP."}
        </p>
      </div>
    </footer>
  )
}
