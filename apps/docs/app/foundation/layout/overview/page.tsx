import { Container } from '@umichkisa-ds/web'
import Link from 'next/link'
import { CodeBlock } from '@/components/CodeBlock'

export default async function LayoutOverviewPage() {
  return (
    <Container size="md" as="article">

      {/* ── Header ──────────────────────────────────────────── */}
      <h1 className="type-h1 font-sejong-bold tracking-tight mb-4 text-foreground">Layout</h1>

      <h2 className="type-h2 mt-8 mb-4 text-foreground">Overview</h2>
      <p className="type-body mb-4 text-foreground max-w-prose">
        Interfaces break when people make independent spacing decisions.
        One developer reaches for{' '}
        <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">px-6</code>,
        another uses{' '}
        <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">px-[24px]</code>,
        a third copies from a nearby component. Each choice is defensible in isolation.
        Together, they create a page that feels assembled, not designed.
      </p>
      <p className="type-body mb-4 text-foreground max-w-prose">
        The KISA layout system is a small set of rules that removes those
        decisions. Breakpoints, spacing, max-width, and gutters are defined
        once. You apply them.
      </p>

      <hr className="my-8 border-0 border-t border-border" />

      {/* ── In this section ─────────────────────────────────── */}
      <h2 className="type-h2 mt-8 mb-4 text-foreground">In this section</h2>
      <ul className="type-body text-foreground max-w-prose flex flex-col gap-2">
        <li className="flex gap-2">
          <span className="text-muted-foreground">•</span>
          <span>
            <Link href="/foundation/layout/breakpoints" className="text-link underline-offset-2 hover:underline">Breakpoints</Link>
            {' '}— the three layout tiers (mobile, tablet, desktop) and the rules for using them
          </span>
        </li>
        <li className="flex gap-2">
          <span className="text-muted-foreground">•</span>
          <span>
            <Link href="/foundation/layout/spacing" className="text-link underline-offset-2 hover:underline">Spacing</Link>
            {' '}— default inset, max-width, column gutter, vertical spacing tiers, page shell pattern, and full-bleed pattern
          </span>
        </li>
        <li className="flex gap-2">
          <span className="text-muted-foreground">•</span>
          <span>
            <Link href="/foundation/layout/usage" className="text-link underline-offset-2 hover:underline">Usage</Link>
            {' '}— ready-made layout components (<code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">Container</code>, <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">Grid</code>) — coming once components are built
          </span>
        </li>
      </ul>

      <hr className="my-8 border-0 border-t border-border" />

      {/* ── Accessibility ───────────────────────────────────── */}
      <h2 className="type-h2 mt-8 mb-4 text-foreground">Accessibility</h2>
      <p className="type-body mb-4 text-foreground max-w-prose">
        The page shell must use semantic landmark elements so that screen reader users can navigate by region:
      </p>
      <ul className="type-body text-foreground max-w-prose flex flex-col gap-2">
        <li className="flex gap-2">
          <span className="text-muted-foreground">•</span>
          <span>
            <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">{'<header>'}</code>
            {' '}— site header (banner region: logo, site name, global utilities)
          </span>
        </li>
        <li className="flex gap-2">
          <span className="text-muted-foreground">•</span>
          <span>
            <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">{'<nav>'}</code>
            {' '}— navigation landmarks (add{' '}
            <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">aria-label</code>
            {' '}if more than one{' '}
            <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">{'<nav>'}</code>
            {' '}exists on the page)
          </span>
        </li>
        <li className="flex gap-2">
          <span className="text-muted-foreground">•</span>
          <span>
            <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">{'<main>'}</code>
            {' '}— the primary page content
          </span>
        </li>
        <li className="flex gap-2">
          <span className="text-muted-foreground">•</span>
          <span>
            <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">{'<footer>'}</code>
            {' '}— site footer
          </span>
        </li>
      </ul>
      <p className="type-body mb-4 text-foreground max-w-prose mt-4">
        Every page must include a <strong className="font-semibold text-foreground">skip link</strong> — a visually hidden anchor that becomes visible on focus and jumps to{' '}
        <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">{'<main>'}</code>.
        This allows keyboard and screen reader users to bypass repeated navigation on every page load.
      </p>

      <CodeBlock code={`<a
  href="#main-content"
  class="sr-only focus-visible:not-sr-only focus-visible:fixed focus-visible:top-4 focus-visible:left-4 focus-visible:z-50 focus-visible:px-4 focus-visible:py-2 focus-visible:bg-surface focus-visible:text-foreground focus-visible:rounded focus-visible:shadow-lg"
>
  Skip to main content
</a>
<main id="main-content">
  <!-- page content -->
</main>`} lang="tsx" />

      <p className="type-body mb-4 text-foreground max-w-prose">
        These are implementation requirements for the page shell, not component-level concerns. They are configured once and apply globally.
      </p>

    </Container>
  )
}
