import { Container } from '@umichkisa-ds/web'
export default function LayoutUsagePage() {
  return (
    <Container size="md" as="article">

      {/* ── Header ──────────────────────────────────────────── */}
      <h1 className="type-h1 font-sejong-bold tracking-tight mt-8 mb-4 text-foreground">Usage</h1>

      <blockquote className="border-l-[3px] border-brand-accent bg-surface-subtle pl-4 py-2 my-4 rounded-r">
        <span className="italic text-muted-foreground type-body">
          <strong className="font-semibold text-foreground">Coming soon.</strong> This page will be updated once the{' '}
          <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">Container</code>
          {' '}component is implemented.
        </span>
      </blockquote>

      <p className="type-body mb-4 text-foreground max-w-prose">
        The layout rules defined in this section — default inset, max-width, column gutter —
        will be encoded into a set of ready-made components. Instead of writing responsive
        class strings by hand, you will reach for a component and the rules apply automatically.
      </p>

      <p className="type-body mb-4 text-foreground max-w-prose">
        Components planned:
      </p>

      <ul className="type-body text-foreground max-w-prose flex flex-col gap-2">
        <li className="flex gap-2">
          <span className="text-muted-foreground">•</span>
          <span>
            <strong className="font-semibold text-foreground"><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">Container</code></strong>
            {' '}— applies max-width, centering, and the default inset per breakpoint
          </span>
        </li>
        <li className="flex gap-2">
          <span className="text-muted-foreground">•</span>
          <span>
            <strong className="font-semibold text-foreground"><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">Grid</code></strong>
            {' '}— applies the column gutter and responsive column breakdown
          </span>
        </li>
      </ul>

    </Container>
  )
}
