import { ArrowRight } from "lucide-react"

const steps = [
  {
    label: "Frontend",
    tech: "React + Next.js",
    description: "User types a natural language query in the chat interface",
  },
  {
    label: "API Gateway",
    tech: "Node.js Express",
    description: "Request is validated and routed to the NLP service",
  },
  {
    label: "NLP Service",
    tech: "FastAPI",
    description: "Natural language is translated into a MongoDB query",
  },
  {
    label: "Database",
    tech: "MongoDB",
    description: "Query is executed and results are returned upstream",
  },
]

/**
 * ArchitectureSection: Visual breakdown of the system architecture.
 * Shows the data flow from frontend to database.
 */
export function ArchitectureSection() {
  return (
    <section
      id="architecture"
      className="border-t border-border px-6 py-20"
    >
      <div className="mx-auto max-w-4xl">
        <div className="mb-12 text-center">
          <h2 className="text-2xl font-bold tracking-tight text-foreground md:text-3xl">
            How it works
          </h2>
          <p className="mt-3 text-sm text-muted-foreground">
            A clean pipeline from natural language to query results.
          </p>
        </div>

        {/* Architecture flow */}
        <div className="flex flex-col items-center gap-3 md:flex-row md:justify-center">
          {steps.map((step, i) => (
            <div key={step.label} className="flex items-center gap-3">
              <div className="w-52 rounded-xl border border-border bg-card p-4 text-center">
                <div className="mb-1 text-xs font-semibold uppercase tracking-wider text-primary">
                  {step.label}
                </div>
                <div className="mb-2 font-mono text-[11px] text-muted-foreground">
                  {step.tech}
                </div>
                <p className="text-xs leading-relaxed text-muted-foreground/80">
                  {step.description}
                </p>
              </div>
              {i < steps.length - 1 && (
                <ArrowRight className="hidden h-4 w-4 text-muted-foreground/40 md:block" />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
