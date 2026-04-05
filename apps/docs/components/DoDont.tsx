import type { ReactNode } from "react"

export function DoDont({ children }: { children: ReactNode }) {
  return (
    <div className="my-6 grid grid-cols-1 gap-4 md:grid-cols-2">{children}</div>
  )
}

export function Do({
  children,
  label = "Do",
}: {
  children: ReactNode
  label?: string
}) {
  return (
    <div className="rounded-xl border border-l-4 border-success bg-success-subtle p-4">
      <p className="mb-2 type-caption text-foreground uppercase tracking-normal">
        <span className="mr-1.5" aria-hidden>
          ✓
        </span>
        <strong>{label}</strong>
      </p>
      <div className="space-y-1.5 type-body-sm text-foreground">
        {children}
      </div>
    </div>
  )
}

export function Dont({
  children,
  label = "Don't",
}: {
  children: ReactNode
  label?: string
}) {
  return (
    <div className="rounded-xl border border-l-4 border-error bg-error-subtle p-4">
      <p className="mb-2 type-caption text-foreground uppercase tracking-normal">
        <span className="mr-1.5" aria-hidden>
          ✕
        </span>
        <strong>{label}</strong>
      </p>
      <div className="space-y-1.5 type-body-sm text-foreground">
        {children}
      </div>
    </div>
  )
}
