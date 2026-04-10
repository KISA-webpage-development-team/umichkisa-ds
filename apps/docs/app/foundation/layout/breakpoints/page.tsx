import {
  Container,
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from '@umichkisa-ds/web'
export default function LayoutBreakpointsPage() {
  return (
    <Container size="md" as="article">

      {/* ── Header ──────────────────────────────────────────── */}
      <h1 className="type-h1 font-sejong-bold tracking-tight mb-4 text-foreground">Breakpoints</h1>

      <p className="type-body mb-4 text-foreground max-w-prose">
        KISA is a web-first product. The primary experience is designed for
        desktop browsers — that is where most users are, and where the design
        is optimized.
      </p>
      <p className="type-body mb-4 text-foreground max-w-prose">
        That said, the layout system is implemented using Tailwind&#39;s
        mobile-first CSS pattern. Default styles (no prefix) target narrow
        viewports, and breakpoints layer additional styles on top as the
        screen grows. This is a coding convention, not a design priority —
        it keeps responsive behavior predictable and prevents accidental
        overflow on smaller screens.
      </p>
      <p className="type-body mb-4 text-foreground max-w-prose">
        The layout system operates on three tiers.
      </p>

      {/* ── Breakpoint Table ────────────────────────────────── */}
      <div className="my-6">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Prefix</TableHead>
              <TableHead>Viewport</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell>Mobile</TableCell>
              <TableCell><em>(default)</em></TableCell>
              <TableCell>&lt; 768px</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Tablet</TableCell>
              <TableCell><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">md:</code></TableCell>
              <TableCell>&ge; 768px</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Desktop</TableCell>
              <TableCell><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">lg:</code></TableCell>
              <TableCell>&ge; 1024px</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>

      <p className="type-body mb-4 text-foreground max-w-prose">
        Design decisions start at the desktop tier — that is the priority
        viewport. In code, default styles target mobile, and{' '}
        <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">md:</code> and{' '}
        <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">lg:</code>{' '}
        prefixes layer adjustments on as the viewport grows.
      </p>
      <p className="type-body mb-4 text-foreground max-w-prose">
        Tailwind provides additional breakpoints —{' '}
        <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">sm:</code>,{' '}
        <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">xl:</code>,{' '}
        <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">2xl:</code>.
        Never use them. The three-tier system covers all layout needs for
        this product. Introducing extra breakpoints fragments the system,
        makes responsive behavior harder to reason about, and creates
        inconsistencies that are difficult to audit.
      </p>
      <p className="type-body mb-4 text-foreground max-w-prose">
        If a layout cannot be solved with the three tiers, the problem is
        in the component or design — not in the breakpoint system.
      </p>

    </Container>
  )
}
