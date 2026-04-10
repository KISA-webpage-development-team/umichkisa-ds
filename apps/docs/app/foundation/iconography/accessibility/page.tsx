import {
  Container,
  Divider,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@umichkisa-ds/web'
import { CodeBlock } from '@/components/CodeBlock'
import { InlineCode } from '@/components/InlineCode'
import { Heading } from '@/components/Heading'
export default async function IconographyAccessibilityPage() {
  return (
    <Container size="md" as="article">

      {/* ── Header ──────────────────────────────────────────── */}
      <h1 className="type-h1 font-sejong-bold tracking-tight mb-4 text-foreground">Accessibility</h1>

      {/* ── The Problem Icons Create ────────────────────────── */}
      <Heading as="h2">The Problem Icons Create</Heading>
      <p className="type-body mb-4 text-foreground max-w-prose">
        Icons are visually obvious to sighted users but completely ambiguous to screen
        readers — unless the code explicitly describes them. A trash can icon conveys
        {' "'}delete{'"'} to anyone looking at the screen. To a screen reader, it is just an
        SVG element with no label. The user hears nothing, or worse, the raw SVG title
        if one happens to exist.
      </p>
      <p className="type-body mb-4 text-foreground max-w-prose">
        The KISA icon system makes the right behavior the default. When you omit the{' '}
        <InlineCode>label</InlineCode>{' '}
        prop, the icon is hidden from assistive technology. When you provide
        it, the icon becomes a labeled image. Neither option requires you to write
        accessibility attributes by hand — the{' '}
        <InlineCode>{'<Icon>'}</InlineCode>{' '}
        component handles them.
      </p>

      <Divider className="my-8" />

      {/* ── Decorative Icons ────────────────────────────────── */}
      <Heading as="h2">Decorative Icons</Heading>
      <p className="type-body mb-4 text-foreground max-w-prose">
        When the{' '}
        <InlineCode>label</InlineCode>{' '}
        prop is omitted,{' '}
        <InlineCode>{'<Icon>'}</InlineCode>{' '}
        sets{' '}
        <InlineCode>aria-hidden=&quot;true&quot;</InlineCode>{' '}
        on the SVG. The icon is invisible to screen readers. Any accessible announcement comes
        from the surrounding context — the button{"'"}s{' '}
        <InlineCode>aria-label</InlineCode>,
        {' '}the visible text label, or the heading it sits next to.
      </p>
      <p className="type-body mb-4 text-foreground max-w-prose">
        Use decorative icons whenever visible text already describes the action or content:
      </p>

      <CodeBlock code={`// The button label "Save changes" is the announcement.
// The icon adds visual reinforcement — screen readers ignore it.
<button>
  <Icon name="save" />
  Save changes
</button>`} lang="tsx" />

      <Divider className="my-8" />

      {/* ── Semantic Icons ──────────────────────────────────── */}
      <Heading as="h2">Semantic Icons</Heading>
      <p className="type-body mb-4 text-foreground max-w-prose">
        When{' '}
        <InlineCode>label</InlineCode>{' '}
        is provided,{' '}
        <InlineCode>{'<Icon>'}</InlineCode>{' '}
        sets{' '}
        <InlineCode>role=&quot;img&quot;</InlineCode>{' '}
        and{' '}
        <InlineCode>aria-label</InlineCode>{' '}
        on the SVG. The icon becomes a labeled image that screen readers will announce.
      </p>
      <p className="type-body mb-4 text-foreground max-w-prose">
        Use semantic icons when the icon is the only indicator of meaning — no visible
        text label nearby explains what it represents:
      </p>

      <CodeBlock code={`// A status dot with no label — the icon must announce its own meaning.
<Icon name="check-circle" label="Verified" />`} lang="tsx" />

      <p className="type-body mb-4 text-foreground max-w-prose">
        Do not use{' '}
        <InlineCode>label</InlineCode>{' '}
        when the icon is inside a button that already has{' '}
        <InlineCode>aria-label</InlineCode>.
        {' '}That creates duplicate announcements — the screen reader reads
        both the button label and the icon label.
      </p>

      <Divider className="my-8" />

      {/* ── Decision Rule ───────────────────────────────────── */}
      <Heading as="h2">Decision Rule</Heading>
      <p className="type-body mb-4 text-foreground max-w-prose">
        Three scenarios cover the vast majority of icon usage. When in doubt, ask:{' '}
        <em>is there text nearby that already describes this?</em> If yes, decorative. If no, semantic.
      </p>

      <div className="my-6">
        <Table size="sm">
          <TableHeader>
            <TableRow>
              <TableHead>Scenario</TableHead>
              <TableHead>Approach</TableHead>
              <TableHead>Markup</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell>Icon next to a visible text label</TableCell>
              <TableCell>
                Decorative — omit{' '}
                <InlineCode>label</InlineCode>{' '}
                prop
              </TableCell>
              <TableCell>
                <InlineCode>{`<button><Icon name="save" />Save</button>`}</InlineCode>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                Icon alone inside a{' '}
                <InlineCode>button</InlineCode>{' '}
                or{' '}
                <InlineCode>a</InlineCode>
              </TableCell>
              <TableCell>
                Decorative —{' '}
                <InlineCode>aria-label</InlineCode>{' '}
                on the wrapper, not the icon
              </TableCell>
              <TableCell>
                <InlineCode>{`<button aria-label="Close"><Icon name="x" /></button>`}</InlineCode>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Standalone meaning indicator (no button, no nearby text)</TableCell>
              <TableCell>
                Semantic — provide{' '}
                <InlineCode>label</InlineCode>{' '}
                prop
              </TableCell>
              <TableCell>
                <InlineCode>{`<Icon name="check-circle" label="Verified" />`}</InlineCode>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>

      <Divider className="my-8" />

      {/* ── Touch Targets ───────────────────────────────────── */}
      <Heading as="h2">Touch Targets</Heading>
      <p className="type-body mb-4 text-foreground max-w-prose">
        The{' '}
        <InlineCode>{'<Icon>'}</InlineCode>{' '}
        component renders an SVG sized via the{' '}
        <InlineCode>size</InlineCode>{' '}
        prop. None of these are large enough to serve as a touch target.
      </p>
      <p className="type-body mb-4 text-foreground max-w-prose">
        Interactive wrappers around icons must be at least 44×44px. This is the minimum touch target size for mobile use per WCAG 2.5.5. Use{' '}
        <InlineCode>min-w-[44px] min-h-[44px]</InlineCode>{' '}
        with{' '}
        <InlineCode>flex items-center justify-center</InlineCode>{' '}
        on the button so the icon is centered inside regardless of its visual size:
      </p>

      <CodeBlock code={`<button
  aria-label="Close"
  className="flex items-center justify-center min-w-[44px] min-h-[44px]"
>
  <Icon name="x" />
</button>`} lang="tsx" />

      <p className="type-body mb-4 text-foreground max-w-prose">
        This approach works for any icon size — the wrapper always meets 44×44px. Never rely on padding calculated from the icon{"'"}s pixel size, as changing the{' '}
        <InlineCode>size</InlineCode>{' '}
        prop would break the math.
      </p>
      <p className="type-body mb-4 text-foreground max-w-prose">
        Never reduce the button dimensions below 44×44px to make an icon-only button feel smaller.
      </p>

      <Divider className="my-8" />

      {/* ── Icon Color and Contrast ─────────────────────────── */}
      <Heading as="h2">Icon Color and Contrast</Heading>
      <p className="type-body mb-4 text-foreground max-w-prose">
        Icons are non-text UI components and must meet the 3:1 contrast ratio threshold (WCAG 1.4.11).
      </p>
      <p className="type-body mb-4 text-foreground max-w-prose">
        Two semantic color tokens fail this threshold and must never be used as the sole color of an icon:
      </p>
      <ul className="type-body text-foreground max-w-prose flex flex-col gap-2 mb-4">
        <li className="flex gap-2">
          <span className="text-muted-foreground">&bull;</span>
          <span>
            <InlineCode>--color-success</InlineCode>{' '}
            — 2.2:1 on white. Fails both text and non-text contrast thresholds.
          </span>
        </li>
        <li className="flex gap-2">
          <span className="text-muted-foreground">&bull;</span>
          <span>
            <InlineCode>--color-warning</InlineCode>{' '}
            — 3.0:1 on white. Exactly at the floor, not a comfortable pass.
          </span>
        </li>
      </ul>
      <p className="type-body mb-4 text-foreground max-w-prose">
        When using these tokens in a feedback context, always pair the icon with a visible text label using{' '}
        <InlineCode>text-foreground</InlineCode>.
        {' '}The label carries the accessible meaning; the icon adds visual reinforcement.
      </p>

      <CodeBlock code={`// ✅ correct — icon + text label; icon contrast alone does not matter
<span className="flex items-center gap-2">
  <span className="text-success"><Icon name="check-circle" /></span>
  <span className="text-foreground">Profile saved</span>
</span>

// ❌ wrong — standalone icon with --color-success, fails 3:1
<span className="text-success"><Icon name="check-circle" label="Success" /></span>`} lang="tsx" />

      <p className="type-body mb-4 text-foreground max-w-prose">
        <InlineCode>--color-error</InlineCode>{' '}
        (3.9:1) passes non-text contrast and may be used as a standalone icon color for error state indicators, though pairing with a label is still preferred.
      </p>

    </Container>
  )
}
