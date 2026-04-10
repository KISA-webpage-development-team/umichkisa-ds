import { Alert, Container, Divider } from '@umichkisa-ds/web'
import { CodeBlock } from '@/components/CodeBlock'
import { Heading } from '@/components/Heading'
import { InlineCode } from '@/components/InlineCode'
export default async function ColorsOverviewPage() {
  return (
    <Container size="md" as="article">

      {/* ── Header ──────────────────────────────────────────── */}
      <h1 className="type-h1 font-sejong-bold tracking-tight mb-4 text-foreground">Colors</h1>
      <p className="type-body mb-4 text-foreground max-w-prose">
        Color is one of the most visible decisions in any interface. Done inconsistently,
        it creates visual noise — a button is one shade of blue here, another shade there,
        a heading feels slightly off, and the page looks like it was assembled by different
        people who never talked to each other. Because it was.
      </p>
      <p className="type-body mb-4 text-foreground max-w-prose">
        The KISA color system exists to solve that. It gives every developer on the team a
        shared vocabulary: instead of choosing a color by eye or copying a hex value from
        somewhere, you reach for a named token —{' '}
        <InlineCode>--color-brand-primary</InlineCode>,{' '}
        <InlineCode>--color-muted-foreground</InlineCode>{' '}
        — and the right color appears, consistently, everywhere.
      </p>
      <p className="type-body mb-4 text-foreground max-w-prose">
        This guide covers how the color system is structured, the full palette we build
        from, the tokens you use in components, and the rules that keep everything
        consistent.
      </p>
      <Divider className="my-8" />

      {/* ── How the System Works ────────────────────────────── */}
      <Heading as="h2">How the System Works</Heading>
      <p className="type-body mb-4 text-foreground max-w-prose">
        The color system is organized in three tiers. Each tier has a specific job,
        and they only communicate in one direction — downward.
      </p>

      {/* 3-tier diagram — opacity utilities used intentionally for visual hierarchy
          in this one-off illustration. No semantic token exists for these roles. */}
      <div className="my-8 flex flex-col">
        <div className="rounded-t-xl bg-brand-primary px-6 py-5">
          <p className="type-caption font-mono tracking-widest uppercase text-brand-foreground opacity-70">Tier 1</p>
          <p className="mt-1 type-body font-semibold text-brand-foreground">Primitives</p>
          <p className="mt-2 type-body-sm text-brand-accent-subtle">Raw color values. The source of truth for every color in the system.</p>
          <code className="mt-3 block type-caption font-mono text-brand-foreground opacity-60">--primitive-michigan-blue: oklch(19% 0.061 243)</code>
        </div>
        <div className="flex justify-center bg-surface-subtle py-2 type-body text-muted-foreground">↓</div>
        <div className="bg-brand-primary-mid px-6 py-5">
          <p className="type-caption font-mono tracking-widest uppercase text-surface opacity-70">Tier 2</p>
          <p className="mt-1 type-body font-semibold text-surface">Semantic Tokens</p>
          <p className="mt-2 type-body-sm text-surface opacity-80">Named by purpose, not value. This is what components use.</p>
          <code className="mt-3 block type-caption font-mono text-surface opacity-60">--color-brand-primary: var(--primitive-michigan-blue)</code>
        </div>
        <div className="flex justify-center bg-surface-subtle py-2 type-body text-muted-foreground">↓</div>
        <div className="rounded-b-xl border border-t-0 border-border bg-surface-muted px-6 py-5">
          <p className="type-caption font-mono tracking-widest uppercase text-muted-foreground">Tier 3</p>
          <p className="mt-1 type-body font-semibold text-foreground">Component Layer</p>
          <p className="mt-2 type-body-sm text-muted-foreground">Tokens applied inside component CSS. Never raw values.</p>
          <code className="mt-3 block type-caption font-mono text-muted-foreground">background-color: var(--color-brand-primary)</code>
        </div>
      </div>

      {/* ── Tier 1 — Primitives ─────────────────────────────── */}
      <Heading as="h3" className="mt-6">Tier 1 — Primitives</Heading>
      <p className="type-body mb-4 text-foreground max-w-prose">
        Primitives are the raw material. They hold color values and nothing else —
        no meaning, no context, just the value. You will find them in{' '}
        <InlineCode>packages/web/src/tokens/primitives.css</InlineCode>.
      </p>
      <p className="type-body mb-4 text-foreground max-w-prose">
        You will never reference a primitive directly in a component. Their only job
        is to be referenced by semantic tokens.
      </p>

      <Alert variant="info" title="Why OKLCH?">
        Hex values (<InlineCode>#00274c</InlineCode>)
        are unreadable — you cannot tell anything about a color from the code alone.
        OKLCH is perceptually uniform, meaning a 10% increase in lightness actually looks
        10% lighter to the human eye, making the palette predictable. Reading an OKLCH value:{' '}
        <InlineCode>oklch(lightness% chroma hue)</InlineCode>.
      </Alert>

      {/* ── Tier 2 — Semantic Tokens ────────────────────────── */}
      <Heading as="h3" className="mt-6">Tier 2 — Semantic Tokens</Heading>
      <p className="type-body mb-4 text-foreground max-w-prose">
        Semantic tokens are named by their purpose. This is the tier you interact with
        when writing component code. You will find them in{' '}
        <InlineCode>packages/web/src/tokens/semantic.css</InlineCode>.
      </p>

      <CodeBlock code={`--color-brand-primary: var(--primitive-michigan-blue);
--color-foreground:    var(--primitive-gray-900);`} lang="css" />

      <p className="type-body mb-4 text-foreground max-w-prose">
        The name tells you what the color is <em>for</em>, not what it looks like. This matters
        for maintainability: if KISA ever updates its brand colors, only the primitive
        value changes. Every component that references the semantic token updates
        automatically — without touching a single component file.
      </p>
      <p className="type-body mb-4 text-foreground max-w-prose">
        <strong className="font-semibold text-foreground">Rule: always use semantic tokens in components. Never reference primitives directly.</strong>
      </p>

      {/* ── Tier 3 — Component Layer ────────────────────────── */}
      <Heading as="h3" className="mt-6">Tier 3 — Component Layer</Heading>
      <p className="type-body mb-4 text-foreground max-w-prose">
        The component layer is where semantic tokens get applied to actual UI elements.
      </p>

      <CodeBlock code={`.btn-primary {
  background-color: var(--color-brand-primary);
  color:            var(--color-brand-foreground);
}`} lang="css" />

      <p className="type-body mb-4 text-foreground max-w-prose">
        The component does not know what color{' '}
        <InlineCode>--color-brand-primary</InlineCode>{' '}
        is. It only knows the purpose. The actual value flows in from the semantic layer,
        which in turn pulls it from primitives. This separation is what makes the system
        maintainable.
      </p>

      <Divider className="my-8" />

      {/* ── Dark Mode ───────────────────────────────────────── */}
      <Heading as="h2">Dark Mode</Heading>
      <p className="type-body mb-4 text-foreground max-w-prose">
        This design system does not support dark mode. There is no dark-mode token layer,
        no{' '}
        <InlineCode>.dark</InlineCode>{' '}
        class, and no media query variant. Components should not implement
        dark mode behavior. If this changes in a future version, it will be documented here.
      </p>

    </Container>
  )
}
