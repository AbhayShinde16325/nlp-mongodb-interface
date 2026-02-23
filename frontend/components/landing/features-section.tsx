import { Database, MessageSquare, Shield, Zap } from "lucide-react"

const features = [
  {
    icon: MessageSquare,
    title: "Natural Language Queries",
    description:
      "Write queries in plain English. The NLP engine translates your intent into optimized MongoDB operations, including aggregations and lookups.",
  },
  {
    icon: Database,
    title: "Multi-Database Support",
    description:
      "Connect to any MongoDB instance. Browse databases and collections with a clean, intuitive interface designed for developers.",
  },
  {
    icon: Zap,
    title: "Real-Time Results",
    description:
      "Get instant responses in a chat-like interface. Results are formatted for readability with syntax highlighting for JSON output.",
  },
  {
    icon: Shield,
    title: "Secure Connections",
    description:
      "Your connection strings are never stored. All communication happens through the API gateway with encrypted transport.",
  },
]

/**
 * FeaturesSection: Grid of product features with icons and descriptions.
 */
export function FeaturesSection() {
  return (
    <section className="border-t border-border px-6 py-20">
      <div className="mx-auto max-w-5xl">
        <div className="mb-12 text-center">
          <h2 className="text-2xl font-bold tracking-tight text-foreground md:text-3xl">
            Built for developers who work with MongoDB
          </h2>
          <p className="mt-3 text-sm text-muted-foreground">
            A streamlined workflow from connection to query result.
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="rounded-xl border border-border bg-card p-6"
            >
              <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                <feature.icon className="h-5 w-5 text-primary" />
              </div>
              <h3 className="mb-2 text-sm font-semibold text-card-foreground">
                {feature.title}
              </h3>
              <p className="text-sm leading-relaxed text-muted-foreground">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
