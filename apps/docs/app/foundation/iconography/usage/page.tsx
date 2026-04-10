import { Container, Divider } from '@umichkisa-ds/web'
import { DoDont } from '@/components/DoDont'
import { Do, Dont } from '@/components/DoDont'
import { CodeBlock } from '@/components/CodeBlock'
import { InlineCode } from '@/components/InlineCode'
import { Heading } from '@/components/Heading'

export default async function IconographyUsagePage() {
  return (
    <Container size="md" as="article">

      {/* ── Header ──────────────────────────────────────────── */}
      <h1 className="type-h1 font-sejong-bold tracking-tight mb-4 text-foreground">Usage</h1>

      {/* ── The <Icon> Component ─────────────────────────────── */}
      <Heading as="h2">The <InlineCode>{'<Icon>'}</InlineCode> Component</Heading>

      <CodeBlock code={`// Default size (md = 20px), decorative
<Icon name="arrow-right" />

// Explicit size
<Icon name="arrow-right" size="lg" />

// Semantic — announced by screen readers
<Icon name="x" label="Close" />`} lang="tsx" />

      <Divider className="my-8" />

      {/* ── Wrapping for Interaction ─────────────────────────── */}
      <Heading as="h2">Wrapping for Interaction</Heading>
      <p className="type-body mb-4 text-foreground max-w-prose">
        The{' '}
        <InlineCode>{'<Icon>'}</InlineCode>{' '}
        component renders an SVG. SVGs have no keyboard focus, no click semantics, and no role
        that signals interactivity to assistive technology. Always wrap an interactive icon in a{' '}
        <InlineCode>{'<button>'}</InlineCode>{' '}
        or{' '}
        <InlineCode>{'<a>'}</InlineCode>.
        {' '}The wrapper provides the interaction model, the keyboard target, and the accessible label.
      </p>

      <CodeBlock code={`// ✅ correct — button provides interaction semantics
<button aria-label="Close">
  <Icon name="x" />
</button>

// ❌ wrong — icon has no interaction semantics
<Icon name="x" onClick={close} />`} lang="tsx" />

      <p className="type-body mb-4 text-foreground max-w-prose">
        The wrapper also provides the touch target. Interactive elements must have a minimum tap
        area of 44×44px — the{' '}
        <InlineCode>{'<Icon>'}</InlineCode>{' '}
        itself is never 44px; the button or link around it is.
      </p>

      <p className="type-body mb-4 text-foreground max-w-prose">
        When an icon is the only content inside a button or link, provide an{' '}
        <InlineCode>aria-label</InlineCode>{' '}
        on the wrapper so screen reader users know what the control does, and wrap the button in a{' '}
        <InlineCode>{'<Tooltip>'}</InlineCode>{' '}
        for sighted users who may not recognize the icon.
      </p>

      <CodeBlock code={`<Tooltip content="Close dialog">
  <button aria-label="Close dialog">
    <Icon name="x" />
  </button>
</Tooltip>`} lang="tsx" />

      <p className="type-body mb-4 text-foreground max-w-prose">
        The{' '}
        <InlineCode>aria-label</InlineCode>{' '}
        on the button and the tooltip content should be identical. Do not also pass a{' '}
        <InlineCode>label</InlineCode>{' '}
        prop on{' '}
        <InlineCode>{'<Icon>'}</InlineCode>{' '}
        — that creates redundant screen-reader announcements.
      </p>

      <Divider className="my-8" />

      {/* ── Icon + Text ─────────────────────────────────────── */}
      <Heading as="h2">Icon + Text</Heading>
      <p className="type-body mb-4 text-foreground max-w-prose">
        When an icon appears next to a text label, use{' '}
        <InlineCode>flex items-center gap-2</InlineCode>{' '}
        as the layout pattern. This aligns the icon optically with the text cap height and
        provides consistent spacing.
      </p>

      <CodeBlock code={`<button className="flex items-center gap-2">
  <Icon name="plus" size="sm" />
  <span>Add member</span>
</button>`} lang="tsx" />

      <p className="type-body mb-4 text-foreground max-w-prose">
        The{' '}
        <InlineCode>gap-2</InlineCode>{' '}
        (8px) spacing works for most pairings. Use{' '}
        <InlineCode>gap-1</InlineCode>{' '}
        (4px) for compact UI like tags or badges, and{' '}
        <InlineCode>gap-3</InlineCode>{' '}
        (12px) for larger display contexts.
      </p>

      <Divider className="my-8" />

      {/* ── Color ───────────────────────────────────────────── */}
      <Heading as="h2">Color</Heading>
      <p className="type-body mb-4 text-foreground max-w-prose">
        Icons inherit{' '}
        <InlineCode>currentColor</InlineCode>.
        {' '}To change an icon{"'"}s color, change the text color of its container using semantic tokens.
      </p>

      <CodeBlock code={`// Muted info icon
<span className="text-muted-foreground">
  <Icon name="info" />
</span>

// Error state
<span className="text-error">
  <Icon name="alert-triangle" />
</span>`} lang="tsx" />

      <p className="type-body mb-4 text-foreground max-w-prose">
        Never pass a color prop to{' '}
        <InlineCode>{'<Icon>'}</InlineCode>.
        {' '}Never set{' '}
        <InlineCode>color</InlineCode>{' '}
        or{' '}
        <InlineCode>fill</InlineCode>{' '}
        inline on the icon. If you find yourself wanting to pass a color directly, the color you want
        already exists as a semantic token — reach for that instead.
      </p>

      <Divider className="my-8" />

      {/* ── Disabled Icons ──────────────────────────────────── */}
      <Heading as="h2">Disabled Icons</Heading>
      <p className="type-body mb-4 text-foreground max-w-prose">
        Disabled icons use{' '}
        <InlineCode>text-disabled-foreground</InlineCode>{' '}
        — the same token as disabled text. Never reduce size or weight to communicate disabled state. Only color changes.
      </p>

      <CodeBlock code={`<span className="text-disabled-foreground">
  <Icon name="lock" />
</span>`} lang="tsx" />

      <Divider className="my-8" />

      {/* ── Responsive Sizing ───────────────────────────────── */}
      <Heading as="h2">Responsive Sizing</Heading>
      <p className="type-body mb-4 text-foreground max-w-prose">
        Never apply breakpoint prefixes directly to icon size. Icon size is determined by component context — the component the icon lives in — not by the viewport width.
      </p>
      <p className="type-body mb-4 text-foreground max-w-prose">
        If a component changes size across breakpoints, the icon size change is encapsulated inside that component{"'"}s variant logic. The{' '}
        <InlineCode>{'<Icon>'}</InlineCode>{' '}
        itself receives a fixed{' '}
        <InlineCode>size</InlineCode>{' '}
        prop.
      </p>

      <CodeBlock code={`// ✅ correct — component variant controls icon size internally
<Button size="sm"> {/* Button uses sm icon internally on mobile */}
  <Icon name="plus" size="sm" />
</Button>

// ❌ wrong — breakpoint prefix on the icon directly
<Icon name="plus" size="sm" className="md:w-5 md:h-5" />`} lang="tsx" />

      <Divider className="my-8" />

      {/* ── Do's and Don'ts ─────────────────────────────────── */}
      <Heading as="h2">Do{"'"}s and Don{"'"}ts</Heading>

      {/* Wrapping interactive icons */}
      <Heading as="h3" className="mt-6">Wrapping interactive icons</Heading>
      <DoDont>
        <Do>
          <p className="type-body text-foreground">Wrap interactive icons in a <InlineCode>button</InlineCode> or <InlineCode>a</InlineCode>. The wrapper carries the interaction semantics and accessible label.</p>
          <CodeBlock code={`<button aria-label="Delete">
  <Icon name="trash-2" />
</button>`} lang="tsx" />
        </Do>
        <Dont>
          <p className="type-body text-foreground">Attach event handlers directly to <InlineCode>Icon</InlineCode>. The SVG element has no button role and is not keyboard-reachable by default.</p>
          <CodeBlock code={`<Icon name="trash-2" onClick={handleDelete} />`} lang="tsx" />
        </Dont>
      </DoDont>

      {/* Sizing icons */}
      <Heading as="h3" className="mt-6">Sizing icons</Heading>
      <DoDont>
        <Do>
          <p className="type-body text-foreground">Use the <InlineCode>size</InlineCode> prop from the defined scale. Every size maps to a predictable pixel value and 4px grid step.</p>
          <CodeBlock code={`<Icon name="search" size="sm" />`} lang="tsx" />
        </Do>
        <Dont>
          <p className="type-body text-foreground">Apply Tailwind text size classes to icons. Font-size utilities are not reliable for SVG sizing and produce unpredictable results.</p>
          <CodeBlock code={`<Icon name="search" className="text-xl" />`} lang="tsx" />
        </Dont>
      </DoDont>


    </Container>
  )
}
