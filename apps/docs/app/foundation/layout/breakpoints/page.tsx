import { Container } from '@umichkisa-ds/web'
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
      <div className="my-6 overflow-x-auto">
        <table className="w-full border-collapse border border-border">
          <thead className="bg-surface-subtle">
            <tr>
              <th className="px-4 py-3 text-left type-caption border-b border-border text-muted-foreground">Name</th>
              <th className="px-4 py-3 text-left type-caption border-b border-border text-muted-foreground">Prefix</th>
              <th className="px-4 py-3 text-left type-caption border-b border-border text-muted-foreground">Viewport</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b border-border">
              <td className="px-4 py-3 type-body-sm text-foreground">Mobile</td>
              <td className="px-4 py-3 type-body-sm text-foreground"><em>(default)</em></td>
              <td className="px-4 py-3 type-body-sm text-foreground">&lt; 768px</td>
            </tr>
            <tr className="border-b border-border">
              <td className="px-4 py-3 type-body-sm text-foreground">Tablet</td>
              <td className="px-4 py-3 type-body-sm text-foreground"><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">md:</code></td>
              <td className="px-4 py-3 type-body-sm text-foreground">&ge; 768px</td>
            </tr>
            <tr className="border-b border-border">
              <td className="px-4 py-3 type-body-sm text-foreground">Desktop</td>
              <td className="px-4 py-3 type-body-sm text-foreground"><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">lg:</code></td>
              <td className="px-4 py-3 type-body-sm text-foreground">&ge; 1024px</td>
            </tr>
          </tbody>
        </table>
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
