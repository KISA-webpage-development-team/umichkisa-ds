import { Container } from '@umichkisa-ds/web'
import { DoDont } from '@/components/DoDont'
import { Do, Dont } from '@/components/DoDont'
import { CodeBlock } from '@/components/CodeBlock'

export default async function IconographyUsagePage() {
  return (
    <Container size="md" as="article">

      {/* ── Header ──────────────────────────────────────────── */}
      <h1 className="type-h1 font-sejong-bold tracking-tight mb-4 text-foreground">Usage</h1>

      {/* ── The <Icon> Component ─────────────────────────────── */}
      <h2 className="type-h2 mt-8 mb-4 text-foreground">The <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">{'<Icon>'}</code> Component</h2>

      <CodeBlock code={`// Default size (md = 20px), decorative
<Icon name="arrow-right" />

// Explicit size
<Icon name="arrow-right" size="lg" />

// Semantic — announced by screen readers
<Icon name="x" label="Close" />`} lang="tsx" />

      <hr className="my-8 border-0 border-t border-border" />

      {/* ── Wrapping for Interaction ─────────────────────────── */}
      <h2 className="type-h2 mt-8 mb-4 text-foreground">Wrapping for Interaction</h2>
      <p className="type-body mb-4 text-foreground max-w-prose">
        The{' '}
        <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">{'<Icon>'}</code>{' '}
        component renders an SVG. SVGs have no keyboard focus, no click semantics, and no role
        that signals interactivity to assistive technology. Always wrap an interactive icon in a{' '}
        <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">{'<button>'}</code>{' '}
        or{' '}
        <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">{'<a>'}</code>.
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
        <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">{'<Icon>'}</code>{' '}
        itself is never 44px; the button or link around it is.
      </p>

      <p className="type-body mb-4 text-foreground max-w-prose">
        When an icon is the only content inside a button or link, provide an{' '}
        <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">aria-label</code>{' '}
        on the wrapper so screen reader users know what the control does, and wrap the button in a{' '}
        <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">{'<Tooltip>'}</code>{' '}
        for sighted users who may not recognize the icon.
      </p>

      <CodeBlock code={`<Tooltip content="Close dialog">
  <button aria-label="Close dialog">
    <Icon name="x" />
  </button>
</Tooltip>`} lang="tsx" />

      <p className="type-body mb-4 text-foreground max-w-prose">
        The{' '}
        <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">aria-label</code>{' '}
        on the button and the tooltip content should be identical. Do not also pass a{' '}
        <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">label</code>{' '}
        prop on{' '}
        <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">{'<Icon>'}</code>{' '}
        — that creates redundant screen-reader announcements.
      </p>

      <hr className="my-8 border-0 border-t border-border" />

      {/* ── Icon + Text ─────────────────────────────────────── */}
      <h2 className="type-h2 mt-8 mb-4 text-foreground">Icon + Text</h2>
      <p className="type-body mb-4 text-foreground max-w-prose">
        When an icon appears next to a text label, use{' '}
        <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">flex items-center gap-2</code>{' '}
        as the layout pattern. This aligns the icon optically with the text cap height and
        provides consistent spacing.
      </p>

      <CodeBlock code={`<button className="flex items-center gap-2">
  <Icon name="plus" size="sm" />
  <span>Add member</span>
</button>`} lang="tsx" />

      <p className="type-body mb-4 text-foreground max-w-prose">
        The{' '}
        <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">gap-2</code>{' '}
        (8px) spacing works for most pairings. Use{' '}
        <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">gap-1</code>{' '}
        (4px) for compact UI like tags or badges, and{' '}
        <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">gap-3</code>{' '}
        (12px) for larger display contexts.
      </p>

      <hr className="my-8 border-0 border-t border-border" />

      {/* ── Color ───────────────────────────────────────────── */}
      <h2 className="type-h2 mt-8 mb-4 text-foreground">Color</h2>
      <p className="type-body mb-4 text-foreground max-w-prose">
        Icons inherit{' '}
        <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">currentColor</code>.
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
        <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">{'<Icon>'}</code>.
        {' '}Never set{' '}
        <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">color</code>{' '}
        or{' '}
        <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">fill</code>{' '}
        inline on the icon. If you find yourself wanting to pass a color directly, the color you want
        already exists as a semantic token — reach for that instead.
      </p>

      <hr className="my-8 border-0 border-t border-border" />

      {/* ── Disabled Icons ──────────────────────────────────── */}
      <h2 className="type-h2 mt-8 mb-4 text-foreground">Disabled Icons</h2>
      <p className="type-body mb-4 text-foreground max-w-prose">
        Disabled icons use{' '}
        <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">text-disabled-foreground</code>{' '}
        — the same token as disabled text. Never reduce size or weight to communicate disabled state. Only color changes.
      </p>

      <CodeBlock code={`<span className="text-disabled-foreground">
  <Icon name="lock" />
</span>`} lang="tsx" />

      <hr className="my-8 border-0 border-t border-border" />

      {/* ── Responsive Sizing ───────────────────────────────── */}
      <h2 className="type-h2 mt-8 mb-4 text-foreground">Responsive Sizing</h2>
      <p className="type-body mb-4 text-foreground max-w-prose">
        Never apply breakpoint prefixes directly to icon size. Icon size is determined by component context — the component the icon lives in — not by the viewport width.
      </p>
      <p className="type-body mb-4 text-foreground max-w-prose">
        If a component changes size across breakpoints, the icon size change is encapsulated inside that component{"'"}s variant logic. The{' '}
        <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">{'<Icon>'}</code>{' '}
        itself receives a fixed{' '}
        <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">size</code>{' '}
        prop.
      </p>

      <CodeBlock code={`// ✅ correct — component variant controls icon size internally
<Button size="sm"> {/* Button uses sm icon internally on mobile */}
  <Icon name="plus" size="sm" />
</Button>

// ❌ wrong — breakpoint prefix on the icon directly
<Icon name="plus" size="sm" className="md:w-5 md:h-5" />`} lang="tsx" />

      <hr className="my-8 border-0 border-t border-border" />

      {/* ── Do's and Don'ts ─────────────────────────────────── */}
      <h2 className="type-h2 mt-8 mb-4 text-foreground">Do{"'"}s and Don{"'"}ts</h2>

      {/* Wrapping interactive icons */}
      <h3 className="type-h3 mt-6 mb-2 text-foreground">Wrapping interactive icons</h3>
      <DoDont>
        <Do>
          <p className="type-body text-foreground">Wrap interactive icons in a <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">button</code> or <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">a</code>. The wrapper carries the interaction semantics and accessible label.</p>
          <CodeBlock code={`<button aria-label="Delete">
  <Icon name="trash-2" />
</button>`} lang="tsx" />
        </Do>
        <Dont>
          <p className="type-body text-foreground">Attach event handlers directly to <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">Icon</code>. The SVG element has no button role and is not keyboard-reachable by default.</p>
          <CodeBlock code={`<Icon name="trash-2" onClick={handleDelete} />`} lang="tsx" />
        </Dont>
      </DoDont>

      {/* Sizing icons */}
      <h3 className="type-h3 mt-6 mb-2 text-foreground">Sizing icons</h3>
      <DoDont>
        <Do>
          <p className="type-body text-foreground">Use the <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">size</code> prop from the defined scale. Every size maps to a predictable pixel value and 4px grid step.</p>
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
