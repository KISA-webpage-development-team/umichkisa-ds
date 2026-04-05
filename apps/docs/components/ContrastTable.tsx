import {
  Table, TableHeader, TableBody, TableRow, TableHead, TableCell,
  TableMobileList, TableMobileItem,
} from '@umichkisa-ds/web'

export type PassResult = "aa" | "large-only" | "intentional-fail"

type ContrastRow = {
  foreground: string
  background: string
  ratio: string
  passes: PassResult
}

type ContrastTableProps = {
  rows: ContrastRow[]
}

export function PassBadge({ passes }: { passes: PassResult }) {
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
    <div className="my-6">
      {/* Desktop table */}
      <div className="hidden md:block">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Foreground</TableHead>
              <TableHead>Background</TableHead>
              <TableHead>Ratio</TableHead>
              <TableHead>WCAG AA</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {rows.map((row, i) => (
              <TableRow key={i}>
                <TableCell>
                  <div className="flex items-center gap-2.5">
                    <ColorDot token={row.foreground} />
                    <code className="type-caption font-mono text-foreground">
                      {row.foreground}
                    </code>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2.5">
                    <ColorDot token={row.background} />
                    <code className="type-caption font-mono text-foreground">
                      {row.background}
                    </code>
                  </div>
                </TableCell>
                <TableCell>
                  <span className="type-body-sm font-mono tabular-nums text-foreground">
                    <strong>{row.ratio}</strong>
                  </span>
                </TableCell>
                <TableCell>
                  <PassBadge passes={row.passes} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Mobile stacked list */}
      <div className="block md:hidden">
        <TableMobileList>
          {rows.map((row, i) => (
            <TableMobileItem key={i}>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <ColorDot token={row.foreground} />
                  <code className="type-caption font-mono text-foreground">
                    {row.foreground}
                  </code>
                </div>
                <PassBadge passes={row.passes} />
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <span className="type-caption text-muted-foreground">on</span>
                <ColorDot token={row.background} />
                <code className="type-caption font-mono text-muted-foreground">
                  {row.background}
                </code>
                <span className="ml-auto type-body-sm font-mono tabular-nums text-foreground">
                  <strong>{row.ratio}</strong>
                </span>
              </div>
            </TableMobileItem>
          ))}
        </TableMobileList>
      </div>
    </div>
  )
}
