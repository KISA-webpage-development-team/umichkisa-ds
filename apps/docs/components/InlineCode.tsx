import type { ReactNode } from "react"

export function InlineCode({ children }: { children: ReactNode }) {
  return (
    <code className="rounded px-1 py-0.5 bg-surface-subtle text-foreground">
      {children}
    </code>
  )
}
