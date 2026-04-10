import { Card, CardContent, Container } from '@umichkisa-ds/web'
import { ContrastTable, PassBadge } from '@/components/ContrastTable'
import { Heading } from '@/components/Heading'
import { InlineCode } from '@/components/InlineCode'

export default function ColorsAccessibilityPage() {
  return (
    <Container size="md" as="article">

      {/* ── Header ──────────────────────────────────────────── */}
      <h1 className="type-h1 font-sejong-bold tracking-tight mb-4 text-foreground">Accessibility</h1>

      <p className="type-body mb-4 text-foreground max-w-prose">
        Color contrast is the ratio between the brightness of text and the brightness of
        its background. A ratio of 1:1 means no contrast at all — white text on white.
        A ratio of 21:1 is the maximum — black text on white.
      </p>
      <p className="type-body mb-4 text-foreground max-w-prose">
        <a href="https://www.w3.org/WAI/WCAG21/Understanding/conformance#levels" className="text-link underline hover:text-brand-primary">WCAG AA</a> is the industry standard accessibility level. It requires:
      </p>
      <ul className="type-body text-foreground max-w-prose flex flex-col gap-2 mb-4">
        <li className="flex gap-2"><span className="text-muted-foreground">&bull;</span><strong className="font-semibold text-foreground">4.5:1</strong> minimum for normal body text</li>
        <li className="flex gap-2"><span className="text-muted-foreground">&bull;</span><strong className="font-semibold text-foreground">3:1</strong> minimum for large text (18px and above, or 14px bold)</li>
        <li className="flex gap-2"><span className="text-muted-foreground">&bull;</span><strong className="font-semibold text-foreground">3:1</strong> minimum for UI components such as button borders and input outlines</li>
      </ul>

      <p className="type-body mb-4 text-foreground max-w-prose">
        The table below shows the contrast ratios for the token pairs you will use most
        often. See the legend below the table for how to read the badges.
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
      <Card className="mt-4">
        <CardContent>
          <p className="type-body-sm mb-2 text-foreground"><strong>Legend</strong></p>
          <ul className="flex flex-col gap-2 type-body-sm text-muted-foreground">
            <li className="flex items-center gap-2">
              <PassBadge passes="aa" />
              <span>Passes WCAG AA for all text sizes (4.5:1+).</span>
            </li>
            <li className="flex items-center gap-2">
              <PassBadge passes="large-only" />
              <span>Passes for large text only (18px+ or 14px bold, 3:1+). Do not use at small sizes.</span>
            </li>
            <li className="flex items-center gap-2">
              <PassBadge passes="intentional-fail" />
              <span>Intentionally below contrast thresholds. See rationale below.</span>
            </li>
          </ul>
        </CardContent>
      </Card>

      <Heading as="h2">Rationale</Heading>

      <p className="type-body mb-4 text-foreground max-w-prose">
        <strong className="font-semibold text-foreground">On <InlineCode>--color-disabled-foreground</InlineCode>:</strong>{' '}
        The 2.8:1 ratio is intentional. Disabled elements are not meant to be read — they communicate
        {'"'}this action is not available.{'"'} If a user needs to read it, it should not be disabled.
      </p>
      <p className="type-body mb-4 text-foreground max-w-prose">
        <strong className="font-semibold text-foreground">On <InlineCode>--color-muted-foreground</InlineCode> over <InlineCode>--color-surface-subtle</InlineCode>:</strong>{' '}
        This combination passes at 4.2:1 for large text only. Avoid using muted text at small sizes
        inside cards — use{' '}
        <InlineCode>--color-foreground</InlineCode>{' '}
        instead if the content matters.
      </p>
      <p className="type-body mb-4 text-foreground max-w-prose">
        <strong className="font-semibold text-foreground">On <InlineCode>--color-muted-foreground</InlineCode> over <InlineCode>--color-surface-muted</InlineCode>:</strong>{' '}
        This combination (3.8:1) passes for large text only. Surface-muted is used inside cards for
        detail rows — avoid muted text at small sizes in these regions. Use{' '}
        <InlineCode>--color-foreground</InlineCode>{' '}
        instead if the content needs to be readable.
      </p>
      <p className="type-body mb-4 text-foreground max-w-prose">
        <strong className="font-semibold text-foreground">On <InlineCode>--color-brand-foreground</InlineCode> over <InlineCode>--color-brand-primary</InlineCode>:</strong>{' '}
        This is the strongest verified pair in the system at 8.2:1 — maize on navy. It clears
        WCAG AA at every text size and weight. Whenever text sits on a brand-primary background,
        this is the combination to reach for. It is also the combination that defines KISA{"'"}s
        visual identity.
      </p>
      <p className="type-body mb-4 text-foreground max-w-prose">
        <strong className="font-semibold text-foreground">On <InlineCode>--color-brand-foreground</InlineCode> over hover and pressed states:</strong>{' '}
        Maize remains valid on{' '}
        <InlineCode>--color-brand-primary-hover</InlineCode>{' '}
        (7.2:1) and{' '}
        <InlineCode>--color-brand-primary-pressed</InlineCode>{' '}
        (10.3:1). Both clear WCAG AA. There is no need for a different text token on interactive states.
      </p>
      <p className="type-body mb-4 text-foreground max-w-prose">
        <strong className="font-semibold text-foreground">On feedback colors over <InlineCode>--color-surface</InlineCode>:</strong>{' '}
        <InlineCode>--color-error</InlineCode>{' '}
        (3.9:1) passes for large text only — do not use it as small body text.{' '}
        <InlineCode>--color-warning</InlineCode>{' '}
        (3.0:1) meets the non-text contrast threshold exactly — treat it as a floor, not a comfortable
        pass, and always pair it with a{' '}
        <InlineCode>--color-foreground</InlineCode>{' '}
        label for any readable content.{' '}
        <InlineCode>--color-success</InlineCode>{' '}
        (2.2:1) fails both text and non-text contrast thresholds — never use it as standalone text or
        icon color; always pair it with a{' '}
        <InlineCode>--color-foreground</InlineCode>{' '}
        label.{' '}
        <InlineCode>--color-info</InlineCode>{' '}
        (5.9:1) passes for all text sizes.
      </p>

    </Container>
  )
}
