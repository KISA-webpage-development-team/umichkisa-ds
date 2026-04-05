import { Container, Tooltip, IconButton } from '@umichkisa-ds/web'
import { ComponentPreview } from '@/components/ComponentPreview'
import { highlight } from '@/lib/highlight'

const defaultCode = `import { Tooltip, IconButton } from '@umichkisa-ds/web'

<Tooltip content="Delete item">
  <IconButton icon="trash-2" aria-label="Delete item" />
</Tooltip>`

const truncatedCode = `import { Tooltip } from '@umichkisa-ds/web'

<Tooltip content="This is the full text that was truncated">
  <span className="block max-w-[120px] truncate">
    This is the full text that was truncated
  </span>
</Tooltip>`

const placementCode = `import { Tooltip, IconButton } from '@umichkisa-ds/web'

<Tooltip content="Top" side="top">
  <IconButton icon="chevron-right" aria-label="Top" />
</Tooltip>
<Tooltip content="Right" side="right">
  <IconButton icon="arrow-right" aria-label="Right" />
</Tooltip>
<Tooltip content="Bottom" side="bottom">
  <IconButton icon="chevron-down" aria-label="Bottom" />
</Tooltip>
<Tooltip content="Left" side="left">
  <IconButton icon="arrow-left" aria-label="Left" />
</Tooltip>`

const delayCode = `import { Tooltip, IconButton } from '@umichkisa-ds/web'

<Tooltip content="Slow tooltip" delayDuration={800}>
  <IconButton icon="clock-9" aria-label="Slow tooltip" />
</Tooltip>`

export default async function TooltipPage() {
  const [
    defaultHighlighted,
    truncatedHighlighted,
    placementHighlighted,
    delayHighlighted,
  ] = await Promise.all([
    highlight(defaultCode),
    highlight(truncatedCode),
    highlight(placementCode),
    highlight(delayCode),
  ])

  return (
    <Container size="md" as="article">

      {/* ── Header ──────────────────────────────────────────── */}
      <h1 className="type-h1 font-sejong-bold tracking-tight mb-4 text-foreground">Tooltip</h1>
      <p className="type-body mb-8 text-foreground max-w-prose">
        Informational text label that appears on hover or focus. Use for
        icon-only buttons, truncated text, or any element that benefits from a
        short textual hint. When wrapping icon-only buttons, the tooltip
        content should match the trigger&apos;s{' '}
        <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">
          aria-label
        </code>{' '}
        so screen readers and sighted users receive the same information.
      </p>

      {/* ── Examples ────────────────────────────────────────── */}
      <h2 className="type-h2 mt-8 mb-4 text-foreground">Examples</h2>

      {/* Default */}
      <h3 className="type-h3 mt-6 mb-2 text-foreground">Default</h3>
      <p className="type-body mb-2 text-foreground max-w-prose">
        Wrap any trigger element. The tooltip appears on hover and focus.
      </p>
      <ComponentPreview code={defaultCode} highlightedCode={defaultHighlighted}>
        <Tooltip content="Delete item">
          <IconButton icon="trash-2" aria-label="Delete item" />
        </Tooltip>
      </ComponentPreview>

      {/* On text */}
      <h3 className="type-h3 mt-8 mb-2 text-foreground">On truncated text</h3>
      <p className="type-body mb-2 text-foreground max-w-prose">
        Tooltip works on any element, not just icon buttons. Wrap truncated
        text to reveal the full content on hover.
      </p>
      <ComponentPreview code={truncatedCode} highlightedCode={truncatedHighlighted}>
        <Tooltip content="This is the full text that was truncated because it is too long to display">
          <span className="type-body-sm text-foreground block max-w-[120px] truncate">
            This is the full text that was truncated because it is too long to display
          </span>
        </Tooltip>
      </ComponentPreview>

      {/* Placement */}
      <h3 className="type-h3 mt-8 mb-2 text-foreground">Placement</h3>
      <p className="type-body mb-2 text-foreground max-w-prose">
        Use the{' '}
        <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">
          side
        </code>{' '}
        prop to control which side of the trigger the tooltip appears on.
        Radix automatically flips to an available side if the preferred one
        would overflow the viewport.
      </p>
      <ComponentPreview code={placementCode} highlightedCode={placementHighlighted}>
        <div className="flex items-center gap-4">
          <Tooltip content="Top" side="top">
            <IconButton icon="chevron-right" aria-label="Top" />
          </Tooltip>
          <Tooltip content="Right" side="right">
            <IconButton icon="arrow-right" aria-label="Right" />
          </Tooltip>
          <Tooltip content="Bottom" side="bottom">
            <IconButton icon="chevron-down" aria-label="Bottom" />
          </Tooltip>
          <Tooltip content="Left" side="left">
            <IconButton icon="arrow-left" aria-label="Left" />
          </Tooltip>
        </div>
      </ComponentPreview>

      {/* Custom delay */}
      <h3 className="type-h3 mt-8 mb-2 text-foreground">Custom delay</h3>
      <p className="type-body mb-2 text-foreground max-w-prose">
        Override{' '}
        <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">
          delayDuration
        </code>{' '}
        to control how long (in milliseconds) the user must hover before
        the tooltip appears. Default is 200ms.
      </p>
      <ComponentPreview code={delayCode} highlightedCode={delayHighlighted}>
        <Tooltip content="Slow tooltip" delayDuration={800}>
          <IconButton icon="clock-9" aria-label="Slow tooltip" />
        </Tooltip>
      </ComponentPreview>

      {/* ── API Reference ────────────────────────────────────── */}
      <h2 className="type-h2 mt-8 mb-4 text-foreground">API Reference</h2>
      <div className="my-6 overflow-x-auto">
        <table className="w-full border-collapse border border-border">
          <thead className="bg-surface-subtle">
            <tr>
              <th className="px-4 py-3 text-left type-caption border-b border-border text-muted-foreground">Prop</th>
              <th className="px-4 py-3 text-left type-caption border-b border-border text-muted-foreground">Type</th>
              <th className="px-4 py-3 text-left type-caption border-b border-border text-muted-foreground">Default</th>
              <th className="px-4 py-3 text-left type-caption border-b border-border text-muted-foreground">Description</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b border-border">
              <td className="px-4 py-3 text-foreground"><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle">content</code></td>
              <td className="px-4 py-3 text-foreground"><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle">string</code></td>
              <td className="px-4 py-3 type-body-sm text-foreground">—</td>
              <td className="px-4 py-3 type-body-sm text-foreground">Text displayed in the tooltip bubble. Required.</td>
            </tr>
            <tr className="border-b border-border">
              <td className="px-4 py-3 text-foreground"><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle">children</code></td>
              <td className="px-4 py-3 text-foreground"><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle">ReactNode</code></td>
              <td className="px-4 py-3 type-body-sm text-foreground">—</td>
              <td className="px-4 py-3 type-body-sm text-foreground">The trigger element. Native elements and DS components work out of the box.</td>
            </tr>
            <tr className="border-b border-border">
              <td className="px-4 py-3 text-foreground"><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle">side</code></td>
              <td className="px-4 py-3 text-foreground"><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle">&quot;top&quot; | &quot;right&quot; | &quot;bottom&quot; | &quot;left&quot;</code></td>
              <td className="px-4 py-3 text-foreground"><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle">&quot;top&quot;</code></td>
              <td className="px-4 py-3 type-body-sm text-foreground">Preferred side of the trigger. Flips automatically on overflow.</td>
            </tr>
            <tr className="border-b border-border">
              <td className="px-4 py-3 text-foreground"><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle">delayDuration</code></td>
              <td className="px-4 py-3 text-foreground"><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle">number</code></td>
              <td className="px-4 py-3 text-foreground"><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle">200</code></td>
              <td className="px-4 py-3 type-body-sm text-foreground">Milliseconds to wait before showing the tooltip on hover.</td>
            </tr>
          </tbody>
        </table>
      </div>

    </Container>
  )
}
