type PassResult = "aa" | "large-only" | "intentional-fail"

type ContrastRow = {
  foreground: string
  background: string
  ratio: string
  passes: PassResult
}

type ContrastTableProps = {
  rows: ContrastRow[]
}

function PassBadge({ passes }: { passes: PassResult }) {
  if (passes === "aa") {
    return (
      <span className="inline-flex items-center gap-1.5 rounded-full border border-success bg-success-subtle px-2.5 py-1 type-caption uppercase tracking-normal text-foreground">
        <span aria-hidden>✓</span> <strong>AA</strong>
      </span>
    )
  }

  if (passes === "large-only") {
    return (
      <span className="inline-flex items-center gap-1.5 rounded-full border border-warning bg-warning-subtle px-2.5 py-1 type-caption uppercase tracking-normal text-foreground">
        <span aria-hidden>◐</span> <strong>Large only</strong>
      </span>
    )
  }

  return (
    <span className="inline-flex items-center gap-1.5 rounded-full border border-border bg-surface-subtle px-2.5 py-1 type-caption uppercase tracking-normal text-muted-foreground">
      <span aria-hidden>✕</span> <strong>By design</strong>
    </span>
  )
}

function ColorDot({ token }: { token: string }) {
  const isLight =
    token.includes("surface") ||
    token.includes("border") ||
    token.includes("muted") ||
    token.includes("disabled") ||
    token.includes("subtle")

  return (
    <span
      className={`inline-block h-4 w-4 flex-shrink-0 rounded-full ${isLight ? "border border-border-strong" : "border border-border"}`}
      style={{ backgroundColor: `var(${token})` }}
      aria-hidden="true"
    />
  )
}

export function ContrastTable({ rows }: ContrastTableProps) {
  return (
    <div className="my-6 overflow-x-auto rounded-xl border border-border">
      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-surface-subtle">
            {["Foreground", "Background", "Ratio", "WCAG AA"].map((heading) => (
              <th
                key={heading}
                className="border-b border-border px-4 py-3 text-left type-caption uppercase tracking-normal text-muted-foreground"
              >
                {heading}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr
              key={i}
              className={`${i % 2 === 0 ? "bg-surface" : "bg-surface-subtle"} ${i < rows.length - 1 ? "border-b border-border" : ""}`}
            >
              {/* Foreground */}
              <td className="px-4 py-3">
                <div className="flex items-center gap-2.5">
                  <ColorDot token={row.foreground} />
                  <code className="type-caption font-mono text-foreground">
                    {row.foreground}
                  </code>
                </div>
              </td>

              {/* Background */}
              <td className="px-4 py-3">
                <div className="flex items-center gap-2.5">
                  <ColorDot token={row.background} />
                  <code className="type-caption font-mono text-foreground">
                    {row.background}
                  </code>
                </div>
              </td>

              {/* Ratio */}
              <td className="px-4 py-3">
                <span className="type-body-sm font-mono text-foreground tabular-nums">
                  <strong>{row.ratio}</strong>
                </span>
              </td>

              {/* Badge */}
              <td className="px-4 py-3">
                <PassBadge passes={row.passes} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
