import { Container } from '@umichkisa-ds/web'
export default function IconographyOverviewPage() {
  return (
    <Container size="md" as="article">

      {/* ── Header ──────────────────────────────────────────── */}
      <h1 className="type-h1 font-sejong-bold tracking-tight mt-8 mb-4 text-foreground">Iconography</h1>
      <p className="type-body mb-4 text-foreground max-w-prose">
        Icons carry meaning silently. A trash can means delete. A magnifying glass means
        search. Done consistently, icons reduce reading load and make interfaces feel
        intuitive. Done carelessly — a mix of three different visual styles pulled from
        four different libraries — they create visual noise that undermines every other
        design decision on the page.
      </p>
      <p className="type-body mb-4 text-foreground max-w-prose">
        Every icon in the KISA design system comes from{' '}
        <strong className="font-semibold text-foreground">Lucide</strong>. One library, one
        stroke weight, one source of truth. The moment a second icon library enters the
        codebase, the visual language splits — users may not consciously notice, but
        they feel it. The interface stops feeling designed and starts feeling assembled.
      </p>

      <hr className="my-8 border-0 border-t border-border" />

      {/* ── How the System Works ────────────────────────────── */}
      <h2 className="type-h2 mt-8 mb-4 text-foreground">How the System Works</h2>
      <p className="type-body mb-4 text-foreground max-w-prose">
        The iconography system has three layers:
      </p>
      <p className="type-body mb-4 text-foreground max-w-prose">
        <strong className="font-semibold text-foreground">Lucide</strong> is the icon library — 1500+ icons with a single geometric stroke
        style. This is the catalogue you browse when you need an icon.
      </p>
      <p className="type-body mb-4 text-foreground max-w-prose">
        <strong className="font-semibold text-foreground">
          <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">{'<Icon>'}</code>
        </strong>{' '}
        is the wrapper component that enforces size, color, and
        accessibility conventions. You never import a Lucide icon directly in a
        component. You use{' '}
        <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">{'<Icon>'}</code>{' '}
        and let it handle the rest.
      </p>
      <p className="type-body mb-4 text-foreground max-w-prose">
        <strong className="font-semibold text-foreground">Semantic usage</strong> is how icons appear in the actual UI — inside buttons, next
        to labels, as status indicators. This layer is governed by the conventions in
        the Usage and Accessibility sections.
      </p>

    </Container>
  )
}
