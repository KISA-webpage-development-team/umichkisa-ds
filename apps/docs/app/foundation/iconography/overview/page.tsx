import { Container } from '@umichkisa-ds/web'
export default function IconographyOverviewPage() {
  return (
    <Container size="md" as="article">

      {/* ── Header ──────────────────────────────────────────── */}
      <h1 className="type-h1 mb-4 text-foreground">Iconography</h1>
      <p className="type-body mb-4 text-foreground max-w-prose">
        Icons carry meaning silently — a trash can means delete, a magnifying glass
        means search. Consistency is what makes that work: every icon in the KISA
        design system comes from <strong>Lucide</strong>, one library with one stroke
        weight as the single source of truth. The moment a second icon library enters
        the codebase, the visual language splits — users may not consciously notice,
        but they feel it.
      </p>

      <hr className="my-8 border-0 border-t border-border" />

      {/* ── How the System Works ────────────────────────────── */}
      <h2 className="type-h2 mt-8 mb-4 text-foreground">How the System Works</h2>
      <p className="type-body mb-4 text-foreground max-w-prose">
        The iconography system has three layers:
      </p>
      <p className="type-body mb-4 text-foreground max-w-prose">
        <strong>Lucide</strong> is the icon library — 1500+ icons with a single geometric stroke
        style. This is the catalogue you browse when you need an icon.
      </p>
      <p className="type-body mb-4 text-foreground max-w-prose">
        <strong>
          <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">{'<Icon>'}</code>
        </strong>{' '}
        is the wrapper component that enforces size, color, and
        accessibility conventions. You never import a Lucide icon directly in a
        component. You use{' '}
        <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">{'<Icon>'}</code>{' '}
        and let it handle the rest.
      </p>
      <p className="type-body mb-4 text-foreground max-w-prose">
        <strong>Semantic usage</strong> is how icons appear in the actual UI — inside buttons, next
        to labels, as status indicators. This layer is governed by the conventions in
        the Usage and Accessibility sections.
      </p>

    </Container>
  )
}
