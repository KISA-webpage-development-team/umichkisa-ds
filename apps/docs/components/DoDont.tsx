import type { ReactNode } from "react"

export function DoDont({ children }: { children: ReactNode }) {
  return (
    <div className="my-6 grid grid-cols-1 gap-4 sm:grid-cols-2">{children}</div>
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
    <div
      className="rounded-xl p-4"
      style={{
        background: "oklch(97% 0.04 145)",
        borderLeft: "3px solid oklch(55% 0.16 145)",
        border: "1px solid oklch(88% 0.07 145)",
        borderLeftWidth: "3px",
        borderLeftColor: "oklch(55% 0.16 145)",
      }}
    >
      <p
        className="mb-2 text-[11px] font-bold uppercase tracking-widest"
        style={{ color: "oklch(38% 0.14 145)" }}
      >
        <span className="mr-1.5" aria-hidden>
          ✓
        </span>
        {label}
      </p>
      <div className="space-y-1.5 text-sm" style={{ color: "oklch(25% 0.01 264)" }}>
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
    <div
      className="rounded-xl p-4"
      style={{
        background: "oklch(97% 0.03 27)",
        border: "1px solid oklch(88% 0.06 27)",
        borderLeftWidth: "3px",
        borderLeftColor: "oklch(52% 0.2 27)",
      }}
    >
      <p
        className="mb-2 text-[11px] font-bold uppercase tracking-widest"
        style={{ color: "oklch(40% 0.17 27)" }}
      >
        <span className="mr-1.5" aria-hidden>
          ✕
        </span>
        {label}
      </p>
      <div className="space-y-1.5 text-sm" style={{ color: "oklch(25% 0.01 264)" }}>
        {children}
      </div>
    </div>
  )
}
