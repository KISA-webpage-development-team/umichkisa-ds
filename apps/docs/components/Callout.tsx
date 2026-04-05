import type { ReactNode } from "react"

type CalloutType = "info" | "warning" | "tip"

type CalloutProps = {
  type?: CalloutType
  children: ReactNode
}

const configs: Record<
  CalloutType,
  {
    container: string
    accent: string
    icon: string
    label: string
  }
> = {
  info: {
    container: "bg-info-subtle border-info",
    accent: "bg-info",
    icon: "\u2139",
    label: "Note",
  },
  warning: {
    container: "bg-warning-subtle border-warning",
    accent: "bg-warning",
    icon: "\u26A0",
    label: "Warning",
  },
  tip: {
    container: "bg-success-subtle border-success",
    accent: "bg-success",
    icon: "\u2726",
    label: "Tip",
  },
}

export function Callout({ type = "info", children }: CalloutProps) {
  const c = configs[type]

  return (
    <div
      className={`my-6 rounded-r-xl border border-l-4 p-4 ${c.container}`}
    >
      <p className="mb-2 flex items-center gap-2 type-caption text-foreground uppercase tracking-normal">
        <span
          className={`flex h-4 w-4 items-center justify-center rounded-full type-caption text-surface ${c.accent}`}
          aria-hidden="true"
        >
          {c.icon}
        </span>
        <strong>{c.label}</strong>
      </p>
      <div className="type-body-sm text-foreground">
        {children}
      </div>
    </div>
  )
}
