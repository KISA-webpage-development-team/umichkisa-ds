import type { ReactNode } from "react"
import { Alert } from "@umichkisa-ds/web"

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
    <Alert variant="success" title={label}>
      {children}
    </Alert>
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
    <Alert variant="error" title={label}>
      {children}
    </Alert>
  )
}
