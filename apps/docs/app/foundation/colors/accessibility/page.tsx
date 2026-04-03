import { Container } from '@umichkisa-ds/web'
import { ContrastTable } from '@/components/ContrastTable'

export default function ColorsAccessibilityPage() {
  return (
    <Container size="md" as="article">

      {/* ── Header ──────────────────────────────────────────── */}
      <h1 className="type-h1 font-sejong-bold tracking-tight mt-8 mb-4 text-foreground">Accessibility</h1>

      <p className="type-body mb-4 text-foreground max-w-prose">
        Color contrast is the ratio between the brightness of text and the brightness of
        its background. A ratio of 1:1 means no contrast at all — white text on white.
        A ratio of 21:1 is the maximum — black text on white.
      </p>
      <p className="type-body mb-4 text-foreground max-w-prose">
        WCAG AA is the industry standard accessibility level. It requires:
      </p>
      <ul className="type-body text-foreground max-w-prose flex flex-col gap-2 mb-4">
        <li className="flex gap-2"><span className="text-muted-foreground">&bull;</span><strong className="font-semibold text-foreground">4.5:1</strong> minimum for normal body text</li>
        <li className="flex gap-2"><span className="text-muted-foreground">&bull;</span><strong className="font-semibold text-foreground">3:1</strong> minimum for large text (18px and above, or 14px bold)</li>
        <li className="flex gap-2"><span className="text-muted-foreground">&bull;</span><strong className="font-semibold text-foreground">3:1</strong> minimum for UI components such as button borders and input outlines</li>
      </ul>

      <p className="type-body mb-4 text-foreground max-w-prose">
        The table below shows the contrast ratios for the token pairs you will use most
        often. Pairs labeled <strong className="font-semibold text-foreground">AA</strong> pass WCAG AA for normal text.
        Pairs labeled <strong className="font-semibold text-foreground">Large only</strong> pass only for large text (18px+ or 14px bold).
        Pairs labeled <strong className="font-semibold text-foreground">By design</strong> intentionally fail — they are designed that way.
      </p>

      <ContrastTable rows={[
        { foreground: "--color-foreground",          background: "--color-surface",        ratio: "16.0:1", passes: "aa" },
        { foreground: "--color-muted-foreground",    background: "--color-surface",        ratio: "4.6:1",  passes: "aa" },
        { foreground: "--color-disabled-foreground", background: "--color-surface",        ratio: "2.8:1",  passes: "intentional-fail" },
        { foreground: "--color-link",                background: "--color-surface",        ratio: "5.9:1",  passes: "aa" },
        { foreground: "--color-brand-foreground",    background: "--color-brand-primary",  ratio: "8.2:1",  passes: "aa" },
        { foreground: "--color-brand-foreground",    background: "--color-brand-primary-hover",   ratio: "7.2:1",  passes: "aa" },
        { foreground: "--color-brand-foreground",    background: "--color-brand-primary-pressed", ratio: "10.3:1", passes: "aa" },
        { foreground: "--color-foreground",          background: "--color-surface-subtle", ratio: "14.5:1", passes: "aa" },
        { foreground: "--color-muted-foreground",    background: "--color-surface-subtle", ratio: "4.2:1",  passes: "large-only" },
        { foreground: "--color-muted-foreground",    background: "--color-surface-muted",  ratio: "3.8:1",  passes: "large-only" },
        { foreground: "--color-brand-accent",        background: "--color-brand-primary",  ratio: "8.2:1",  passes: "aa" },
        { foreground: "--color-foreground",          background: "--color-brand-accent",   ratio: "9.8:1",  passes: "aa" },
        { foreground: "--color-error",         background: "--color-surface",        ratio: "3.9:1",  passes: "large-only" },
        { foreground: "--color-success",       background: "--color-surface",        ratio: "2.2:1",  passes: "intentional-fail" },
        { foreground: "--color-warning",       background: "--color-surface",        ratio: "3.0:1",  passes: "large-only" },
        { foreground: "--color-info",          background: "--color-surface",        ratio: "5.9:1",  passes: "aa" },
      ]} />

      {/* Legend */}
      <div className="mt-4 rounded-lg px-4 py-3 type-body-sm bg-surface-subtle border border-border">
        <p className="font-semibold mb-1 text-foreground">Legend</p>
        <ul className="flex flex-col gap-1 text-muted-foreground">
          <li><strong style={{ color: "oklch(35% 0.12 145)" }}>AA</strong> — Passes WCAG AA for all text sizes (4.5:1+).</li>
          <li><strong style={{ color: "oklch(48% 0.14 55)" }}>Large only</strong> — Passes WCAG AA for large text only (18px+ or 14px bold, 3:1+). Do not use at small sizes.</li>
          <li><strong className="text-muted-foreground">By design</strong> — Intentionally below contrast thresholds. See notes below for rationale.</li>
        </ul>
      </div>

      <p className="type-body mb-4 mt-6 text-foreground max-w-prose">
        <strong className="font-semibold text-foreground">On <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">--color-disabled-foreground</code>:</strong>{' '}
        The 2.8:1 ratio is intentional. Disabled elements are not meant to be read — they communicate
        {'"'}this action is not available.{'"'} If a user needs to read it, it should not be disabled.
      </p>
      <p className="type-body mb-4 text-foreground max-w-prose">
        <strong className="font-semibold text-foreground">On <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">--color-muted-foreground</code> over <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">--color-surface-subtle</code>:</strong>{' '}
        This combination passes at 4.2:1 for large text only. Avoid using muted text at small sizes
        inside cards — use{' '}
        <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">--color-foreground</code>{' '}
        instead if the content matters.
      </p>
      <p className="type-body mb-4 text-foreground max-w-prose">
        <strong className="font-semibold text-foreground">On <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">--color-muted-foreground</code> over <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">--color-surface-muted</code>:</strong>{' '}
        This combination (3.8:1) passes for large text only. Surface-muted is used inside cards for
        detail rows — avoid muted text at small sizes in these regions. Use{' '}
        <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">--color-foreground</code>{' '}
        instead if the content needs to be readable.
      </p>
      <p className="type-body mb-4 text-foreground max-w-prose">
        <strong className="font-semibold text-foreground">On <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">--color-brand-foreground</code> over <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">--color-brand-primary</code>:</strong>{' '}
        This is the strongest verified pair in the system at 8.2:1 — maize on navy. It clears
        WCAG AA at every text size and weight. Whenever text sits on a brand-primary background,
        this is the combination to reach for. It is also the combination that defines KISA{"'"}s
        visual identity.
      </p>
      <p className="type-body mb-4 text-foreground max-w-prose">
        <strong className="font-semibold text-foreground">On <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">--color-brand-foreground</code> over hover and pressed states:</strong>{' '}
        Maize remains valid on{' '}
        <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">--color-brand-primary-hover</code>{' '}
        (7.2:1) and{' '}
        <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">--color-brand-primary-pressed</code>{' '}
        (10.3:1). Both clear WCAG AA. There is no need for a different text token on interactive states.
      </p>
      <p className="type-body mb-4 text-foreground max-w-prose">
        <strong className="font-semibold text-foreground">On feedback colors over <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">--color-surface</code>:</strong>{' '}
        <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">--color-error</code>{' '}
        (3.9:1) passes for large text only — do not use it as small body text.{' '}
        <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">--color-warning</code>{' '}
        (3.0:1) meets the non-text contrast threshold exactly — treat it as a floor, not a comfortable
        pass, and always pair it with a{' '}
        <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">--color-foreground</code>{' '}
        label for any readable content.{' '}
        <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">--color-success</code>{' '}
        (2.2:1) fails both text and non-text contrast thresholds — never use it as standalone text or
        icon color; always pair it with a{' '}
        <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">--color-foreground</code>{' '}
        label.{' '}
        <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">--color-info</code>{' '}
        (5.9:1) passes for all text sizes.
      </p>

    </Container>
  )
}
