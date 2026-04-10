import { Container, Divider } from '@umichkisa-ds/web'
import { InlineCode } from '@/components/InlineCode'
import { Heading } from '@/components/Heading'
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

      <Divider className="my-8" />

      {/* ── How the System Works ────────────────────────────── */}
      <Heading as="h2">How the System Works</Heading>
      <p className="type-body mb-4 text-foreground max-w-prose">
        The iconography system has three layers:
      </p>
      <p className="type-body mb-4 text-foreground max-w-prose">
        <strong>Lucide</strong> is the icon library — 1500+ icons with a single geometric stroke
        style. This is the catalogue you browse when you need an icon.
      </p>
      <p className="type-body mb-4 text-foreground max-w-prose">
        <strong>
          <InlineCode>{'<Icon>'}</InlineCode>
        </strong>{' '}
        is the wrapper component that enforces size, color, and
        accessibility conventions. You never import a Lucide icon directly in a
        component. You use{' '}
        <InlineCode>{'<Icon>'}</InlineCode>{' '}
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
