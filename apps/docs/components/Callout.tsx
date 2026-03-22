import type { ReactNode } from "react"

type CalloutType = "info" | "warning" | "tip"

type CalloutProps = {
  type?: CalloutType
  children: ReactNode
}

/*
 * DS GAP: Callout uses 4 shades per feedback type (bg, border, accent, labelColor).
 * The DS currently defines only --color-*-subtle (bg) and --color-* (main/accent).
 * Mid-shade border and dark label colors have no DS token yet.
 * When the DS adds --color-*-border and --color-*-foreground tokens, migrate here.
 * Tracked: docs/specs/docs-token-alignment.md § G5
 */
const configs: Record<
  CalloutType,
  {
    bg: string
    border: string
    accent: string
    labelColor: string
    icon: string
    label: string
  }
> = {
  info: {
    bg: "oklch(96% 0.025 240)",
    border: "oklch(88% 0.05 240)",
    accent: "oklch(52% 0.14 240)",
    labelColor: "oklch(35% 0.12 240)",
    icon: "ℹ",
    label: "Note",
  },
  warning: {
    bg: "oklch(97% 0.05 85)",
    border: "oklch(88% 0.1 85)",
    accent: "oklch(55% 0.16 55)",
    labelColor: "oklch(40% 0.14 55)",
    icon: "⚠",
    label: "Warning",
  },
  tip: {
    bg: "oklch(97% 0.04 145)",
    border: "oklch(88% 0.07 145)",
    accent: "oklch(52% 0.16 145)",
    labelColor: "oklch(35% 0.14 145)",
    icon: "✦",
    label: "Tip",
  },
}

export function Callout({ type = "info", children }: CalloutProps) {
  const c = configs[type]

  return (
    <div
      className="my-6 rounded-r-xl p-4"
      style={{
        background: c.bg,
        border: `1px solid ${c.border}`,
        borderLeftWidth: "4px",
        borderLeftColor: c.accent,
      }}
    >
      <p
        className="mb-2 flex items-center gap-2 text-[11px] font-bold uppercase tracking-widest"
        style={{ color: c.labelColor }}
      >
        <span
          className="flex h-4 w-4 items-center justify-center rounded-full text-[9px] font-bold text-white" // DS GAP: no on-accent foreground token
          style={{ backgroundColor: c.accent }}
          aria-hidden="true"
        >
          {c.icon}
        </span>
        {c.label}
      </p>
      <div className="text-sm" style={{ color: "oklch(25% 0.01 264)" }}>
        {children}
      </div>
    </div>
  )
}
