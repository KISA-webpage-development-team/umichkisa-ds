import { Container, Alert } from '@umichkisa-ds/web'
import { InlineCode } from '@/components/InlineCode'
import { Heading } from '@/components/Heading'

export default function LayoutUsagePage() {
  return (
    <Container size="md" as="article">

      {/* ── Header ──────────────────────────────────────────── */}
      <h1 className="type-h1 font-sejong-bold tracking-tight mb-4 text-foreground">Usage</h1>
      <p className="type-body mb-8 text-foreground max-w-prose">
        Layout in this design system is component-driven, not utility-driven.
        The default inset, max-width, column gutter, and responsive behavior
        are encoded into a small set of components — reach for them instead
        of hand-composing responsive class strings.
      </p>

      {/* ── Philosophy ──────────────────────────────────────── */}
      <Heading as="h2">Philosophy</Heading>
      <p className="type-body mb-4 text-foreground max-w-prose">
        Every page in the KISA app starts with the same shell:{' '}
        <InlineCode>mx-auto w-full max-w-screen-2xl px-4 md:px-6 lg:px-8</InlineCode>.
        Hand-rolling that string on every page is how design systems drift —
        one page uses{' '}
        <InlineCode>px-5</InlineCode>, another forgets the{' '}
        <InlineCode>md:</InlineCode>{' '}
        bump, and the inset stops being predictable.
      </p>
      <p className="type-body mb-4 text-foreground max-w-prose">
        The fix is not discipline. The fix is to never write the string. Reach
        for{' '}
        <a
          href="/components/container"
          className="text-link hover:underline hover:text-brand-primary"
        >
          <InlineCode>Container</InlineCode>
        </a>
        {' '}and the rules apply automatically — and they stay correct when
        the rules change.
      </p>

      {/* ── Decision Tree ───────────────────────────────────── */}
      <Heading as="h2">What to reach for</Heading>
      <p className="type-body mb-4 text-foreground max-w-prose">
        Four decisions cover almost every layout need.
      </p>

      <ul className="type-body text-foreground max-w-prose flex flex-col gap-4 mb-4">
        <li className="flex gap-2">
          <span className="text-muted-foreground">•</span>
          <span>
            <strong className="font-semibold text-foreground">Page shell, max-width, centering</strong>
            {' — use '}
            <a
              href="/components/container"
              className="text-link hover:underline hover:text-brand-primary"
            >
              <InlineCode>Container</InlineCode>
            </a>
            . One per page region. The{' '}
            <InlineCode>size</InlineCode>{' '}
            prop chooses the max-width:{' '}
            <InlineCode>default</InlineCode>{' '}
            for standard pages,{' '}
            <InlineCode>md</InlineCode>{' '}
            or{' '}
            <InlineCode>sm</InlineCode>{' '}
            for forms,{' '}
            <InlineCode>prose</InlineCode>{' '}
            for long-form text.
          </span>
        </li>
        <li className="flex gap-2">
          <span className="text-muted-foreground">•</span>
          <span>
            <strong className="font-semibold text-foreground">Repeating items that reflow across breakpoints</strong>
            {' — use '}
            <a
              href="/components/grid"
              className="text-link hover:underline hover:text-brand-primary"
            >
              <InlineCode>Grid</InlineCode>
            </a>
            . Card grids, tag clouds, feature blocks — anything where you want
            N columns at desktop, fewer at tablet, one column on mobile. The{' '}
            <InlineCode>gap</InlineCode>{' '}
            prop maps to the three spacing tiers.
          </span>
        </li>
        <li className="flex gap-2">
          <span className="text-muted-foreground">•</span>
          <span>
            <strong className="font-semibold text-foreground">Vertical rhythm between sections</strong>
            {' — there is no component for this. Apply the three-tier spacing system from '}
            <a
              href="/foundation/layout/spacing"
              className="text-link hover:underline hover:text-brand-primary"
            >
              spacing
            </a>
            : element (<InlineCode>gap-2</InlineCode>), component (<InlineCode>gap-4</InlineCode>),
            section (<InlineCode>gap-6</InlineCode>). Never scale these across breakpoints.
          </span>
        </li>
        <li className="flex gap-2">
          <span className="text-muted-foreground">•</span>
          <span>
            <strong className="font-semibold text-foreground">Asymmetric layouts</strong>
            {' — sidebar + main, holy grail, magazine layouts. There is no component for these. Drop down to raw Tailwind grid utilities ('}
            <InlineCode>grid grid-cols-[240px_1fr]</InlineCode>
            {') as the escape hatch. Stay inside the three '}
            <a
              href="/foundation/layout/breakpoints"
              className="text-link hover:underline hover:text-brand-primary"
            >
              breakpoint tiers
            </a>
            {' ('}
            <InlineCode>default</InlineCode>{' / '}
            <InlineCode>md:</InlineCode>{' / '}
            <InlineCode>lg:</InlineCode>
            {').'}
          </span>
        </li>
      </ul>

      {/* ── Anti-patterns ───────────────────────────────────── */}
      <Heading as="h2">Anti-patterns</Heading>
      <Alert variant="warning" title="Avoid these">
        <ul className="flex flex-col gap-2">
          <li>
            <strong className="font-semibold">Don&apos;t hand-roll the page shell.</strong>{' '}
            If you find yourself typing{' '}
            <InlineCode>mx-auto max-w-* px-* md:px-*</InlineCode>,
            stop and use{' '}
            <InlineCode>Container</InlineCode>{' '}
            instead.
          </li>
          <li>
            <strong className="font-semibold">Don&apos;t nest Containers.</strong>{' '}
            Each page region gets one Container at most. For full-bleed banners
            inside a Container region, see the page-level structure pattern on
            the{' '}
            <a
              href="/components/container"
              className="text-link hover:underline hover:text-brand-primary"
            >
              Container page
            </a>
            .
          </li>
          <li>
            <strong className="font-semibold">Don&apos;t scale vertical gaps across breakpoints.</strong>{' '}
            Layout responsiveness in this DS is column reflow, not gap scaling.
            A{' '}
            <InlineCode>gap-4</InlineCode>{' '}
            stays{' '}
            <InlineCode>gap-4</InlineCode>{' '}
            from mobile to desktop.
          </li>
          <li>
            <strong className="font-semibold">Don&apos;t use unsupported breakpoints.</strong>{' '}
            Only{' '}
            <InlineCode>default</InlineCode>,{' '}
            <InlineCode>md:</InlineCode>, and{' '}
            <InlineCode>lg:</InlineCode>{' '}
            are permitted. If a layout cannot be solved with three tiers, the
            problem is in the component or design — not the breakpoint system.
          </li>
          <li>
            <strong className="font-semibold">Don&apos;t use arbitrary spacing values.</strong>{' '}
            Every spacing value comes from Tailwind&apos;s built-in 4px-based
            scale. No{' '}
            <InlineCode>px-[24px]</InlineCode>, no{' '}
            <InlineCode>mt-[13px]</InlineCode>.
          </li>
        </ul>
      </Alert>

    </Container>
  )
}
