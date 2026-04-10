import { Container, Divider } from '@umichkisa-ds/web'
import Link from 'next/link'
import { CodeBlock } from '@/components/CodeBlock'
import { InlineCode } from '@/components/InlineCode'
import { Heading } from '@/components/Heading'

export default async function LayoutOverviewPage() {
  return (
    <Container size="md" as="article">

      {/* ── Header ──────────────────────────────────────────── */}
      <h1 className="type-h1 font-sejong-bold tracking-tight mb-4 text-foreground">Layout</h1>

      <Heading as="h2">Overview</Heading>
      <p className="type-body mb-4 text-foreground max-w-prose">
        Interfaces break when people make independent spacing decisions.
        One developer reaches for{' '}
        <InlineCode>px-6</InlineCode>,
        another uses{' '}
        <InlineCode>px-[24px]</InlineCode>,
        a third copies from a nearby component. Each choice is defensible in isolation.
        Together, they create a page that feels assembled, not designed.
      </p>
      <p className="type-body mb-4 text-foreground max-w-prose">
        The KISA layout system is a small set of rules that removes those
        decisions. Breakpoints, spacing, max-width, and gutters are defined
        once. You apply them.
      </p>

      <Divider className="my-8" />

      {/* ── In this section ─────────────────────────────────── */}
      <Heading as="h2">In this section</Heading>
      <ul className="type-body text-foreground max-w-prose flex flex-col gap-2">
        <li className="flex gap-2">
          <span className="text-muted-foreground">•</span>
          <span>
            <Link href="/foundation/layout/breakpoints" className="text-link underline-offset-2 hover:underline hover:text-brand-primary">Breakpoints</Link>
            {' '}— the three layout tiers (mobile, tablet, desktop) and the rules for using them
          </span>
        </li>
        <li className="flex gap-2">
          <span className="text-muted-foreground">•</span>
          <span>
            <Link href="/foundation/layout/spacing" className="text-link underline-offset-2 hover:underline hover:text-brand-primary">Spacing</Link>
            {' '}— default inset, max-width, column gutter, vertical spacing tiers, page shell pattern, and full-bleed pattern
          </span>
        </li>
        <li className="flex gap-2">
          <span className="text-muted-foreground">•</span>
          <span>
            <Link href="/foundation/layout/usage" className="text-link underline-offset-2 hover:underline hover:text-brand-primary">Usage</Link>
            {' '}— ready-made layout components (<InlineCode>Container</InlineCode>, <InlineCode>Grid</InlineCode>) and when to use them
          </span>
        </li>
      </ul>

      <Divider className="my-8" />

      {/* ── Accessibility ───────────────────────────────────── */}
      <Heading as="h2">Accessibility</Heading>
      <p className="type-body mb-4 text-foreground max-w-prose">
        The page shell must use semantic landmark elements so that screen reader users can navigate by region:
      </p>
      <ul className="type-body text-foreground max-w-prose flex flex-col gap-2">
        <li className="flex gap-2">
          <span className="text-muted-foreground">•</span>
          <span>
            <InlineCode>{'<header>'}</InlineCode>
            {' '}— site header (banner region: logo, site name, global utilities)
          </span>
        </li>
        <li className="flex gap-2">
          <span className="text-muted-foreground">•</span>
          <span>
            <InlineCode>{'<nav>'}</InlineCode>
            {' '}— navigation landmarks (add{' '}
            <InlineCode>aria-label</InlineCode>
            {' '}if more than one{' '}
            <InlineCode>{'<nav>'}</InlineCode>
            {' '}exists on the page)
          </span>
        </li>
        <li className="flex gap-2">
          <span className="text-muted-foreground">•</span>
          <span>
            <InlineCode>{'<main>'}</InlineCode>
            {' '}— the primary page content
          </span>
        </li>
        <li className="flex gap-2">
          <span className="text-muted-foreground">•</span>
          <span>
            <InlineCode>{'<footer>'}</InlineCode>
            {' '}— site footer
          </span>
        </li>
      </ul>
      <p className="type-body mb-4 text-foreground max-w-prose mt-4">
        Every page must include a <strong className="font-semibold text-foreground">skip link</strong> — a visually hidden anchor that becomes visible on focus and jumps to{' '}
        <InlineCode>{'<main>'}</InlineCode>.
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

    </Container>
  )
}
