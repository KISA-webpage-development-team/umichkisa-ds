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

/*
 * DS GAP: AA and "large only" badges need success/warning mid-shades.
 * DS defines --color-success-subtle + --color-success, and --color-warning-subtle + --color-warning.
 * The border and text colors here require darker variants not yet in the DS.
 * Migrate when DS adds --color-success-foreground and --color-warning-foreground.
 * Tracked: docs/specs/docs-token-alignment.md § G5
 */
function PassBadge({ passes }: { passes: PassResult }) {
  if (passes === "aa") {
    return (
      <span
        className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wide"
        style={{
          backgroundColor: "oklch(95% 0.05 145)",
          color: "oklch(35% 0.12 145)",
          border: "1px solid oklch(85% 0.08 145)",
        }}
      >
        <span aria-hidden>✓</span> AA
      </span>
    )
  }

  if (passes === "large-only") {
    return (
      <span
        className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wide"
        style={{
          backgroundColor: "oklch(97% 0.05 85)",
          color: "oklch(48% 0.14 55)",
          border: "1px solid oklch(88% 0.1 85)",
        }}
      >
        <span aria-hidden>◐</span> Large only
      </span>
    )
  }

  return (
    <span
      className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wide"
      style={{
        backgroundColor: "var(--color-surface-subtle)",
        color: "var(--color-muted-foreground)",
        border: "1px solid var(--color-border)",
      }}
    >
      <span aria-hidden>✕</span> By design
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
      className="inline-block h-4 w-4 flex-shrink-0 rounded-full"
      style={{
        backgroundColor: `var(${token})`,
        border: isLight
          ? "1.5px solid var(--color-border-strong)"
          : "1.5px solid rgba(0,0,0,0.12)",
        boxShadow: "inset 0 1px 2px rgba(0,0,0,0.08)",
      }}
      aria-hidden="true"
    />
  )
}

export function ContrastTable({ rows }: ContrastTableProps) {
  return (
    <div
      className="my-6 overflow-x-auto rounded-xl"
      style={{ border: "1px solid var(--color-border)" }}
    >
      <table className="w-full border-collapse text-sm">
        <thead>
          <tr style={{ backgroundColor: "var(--color-surface-subtle)" }}>
            {["Foreground", "Background", "Ratio", "WCAG AA"].map((heading) => (
              <th
                key={heading}
                className="px-4 py-3 text-left"
                style={{
                  borderBottom: "1px solid var(--color-border)",
                  color: "var(--color-muted-foreground)",
                  fontSize: "11px",
                  fontWeight: 600,
                  letterSpacing: "0.07em",
                  textTransform: "uppercase",
                }}
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
              style={{
                backgroundColor:
                  i % 2 === 0
                    ? "var(--color-surface)"
                    : "var(--color-surface-subtle)",
                borderBottom:
                  i < rows.length - 1
                    ? "1px solid var(--color-border)"
                    : undefined,
              }}
            >
              {/* Foreground */}
              <td className="px-4 py-3">
                <div className="flex items-center gap-2.5">
                  <ColorDot token={row.foreground} />
                  <code
                    className="text-xs"
                    style={{ color: "var(--color-foreground)" }}
                  >
                    {row.foreground}
                  </code>
                </div>
              </td>

              {/* Background */}
              <td className="px-4 py-3">
                <div className="flex items-center gap-2.5">
                  <ColorDot token={row.background} />
                  <code
                    className="text-xs"
                    style={{ color: "var(--color-foreground)" }}
                  >
                    {row.background}
                  </code>
                </div>
              </td>

              {/* Ratio */}
              <td className="px-4 py-3">
                <span
                  className="font-mono text-sm font-bold tabular-nums"
                  style={{ color: "var(--color-foreground)" }}
                >
                  {row.ratio}
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
