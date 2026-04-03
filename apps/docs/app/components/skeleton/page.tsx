import { Container, Skeleton } from '@umichkisa-ds/web'
import { ComponentPreview } from '@/components/ComponentPreview'

const defaultCode = `import { Skeleton } from '@umichkisa-ds/web'

<div className="flex flex-col gap-4 w-full">
  <Skeleton className="h-6 w-2/5" />
  <Skeleton className="h-32" />
</div>`

const circularCode = `import { Skeleton } from '@umichkisa-ds/web'

<Skeleton variant="circular" className="h-14 w-14" />`

const textBlockCode = `import { Skeleton } from '@umichkisa-ds/web'

<div className="flex flex-col gap-2">
  <Skeleton className="h-4 w-3/4" />
  <Skeleton className="h-4" />
  <Skeleton className="h-4 w-5/6" />
</div>`

const cardCompositionCode = `import { Skeleton } from '@umichkisa-ds/web'

<div className="flex items-start gap-4 p-4 rounded-md border border-border">
  <Skeleton variant="circular" className="h-10 w-10 shrink-0" />
  <div className="flex flex-col gap-2 flex-1">
    <Skeleton className="h-4 w-1/3" />
    <Skeleton className="h-4" />
    <Skeleton className="h-4 w-5/6" />
  </div>
</div>`

export default function SkeletonPage() {
  return (
    <Container size="md" as="article">

      {/* ── Header ──────────────────────────────────────────── */}
      <h1 className="type-h1 font-sejong-bold tracking-tight mt-8 mb-4 text-foreground">Skeleton</h1>
      <p className="type-body mb-8 text-foreground max-w-prose">
        Visual placeholder for content that is loading. Renders a pulsing block
        that approximates the shape of the real content, reducing perceived wait
        time and helping prevent layout shift when dimensions match the final
        content. Consumer controls dimensions via{' '}
        <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">
          className
        </code>.
        The skeleton pulses automatically using a CSS opacity animation.
      </p>
      <p className="type-body-sm mb-8 text-muted-foreground max-w-prose">
        When grouping multiple skeletons as a loading state, wrap them in a
        container with{' '}
        <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">
          aria-busy=&quot;true&quot;
        </code>{' '}
        to communicate the loading state to screen readers.
      </p>

      {/* ── Examples ────────────────────────────────────────── */}
      <h2 className="type-h2 mt-8 mb-4 text-foreground">Examples</h2>

      {/* Default */}
      <h3 className="type-h3 mt-6 mb-2 text-foreground">Default</h3>
      <p className="type-body mb-2 text-foreground max-w-prose">
        A heading placeholder with a content block below. Set dimensions with
        Tailwind height and width utilities.
      </p>
      <ComponentPreview code={defaultCode}>
        <div className="flex flex-col gap-4 w-full">
          <Skeleton className="h-6 w-2/5" />
          <Skeleton className="h-32" />
        </div>
      </ComponentPreview>

      {/* Circular */}
      <h3 className="type-h3 mt-8 mb-2 text-foreground">Circular</h3>
      <p className="type-body mb-2 text-foreground max-w-prose">
        Use{' '}
        <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">
          variant=&quot;circular&quot;
        </code>{' '}
        for avatar or icon placeholders. Provide explicit width and height.
      </p>
      <ComponentPreview code={circularCode}>
        <Skeleton variant="circular" className="h-14 w-14" />
      </ComponentPreview>

      {/* Text block */}
      <h3 className="type-h3 mt-8 mb-2 text-foreground">Text block</h3>
      <p className="type-body mb-2 text-foreground max-w-prose">
        Stack multiple skeletons with varying widths to approximate a paragraph.
      </p>
      <ComponentPreview code={textBlockCode}>
        <div className="flex flex-col gap-2">
          <Skeleton className="h-4 w-3/4" />
          <Skeleton className="h-4" />
          <Skeleton className="h-4 w-5/6" />
        </div>
      </ComponentPreview>

      {/* Card composition */}
      <h3 className="type-h3 mt-8 mb-2 text-foreground">Card composition</h3>
      <p className="type-body mb-2 text-foreground max-w-prose">
        Combine circular and rectangular skeletons to create a realistic loading
        state for a card with an avatar and text content.
      </p>
      <ComponentPreview code={cardCompositionCode}>
        <div className="flex items-start gap-4 p-4 rounded-md border border-border">
          <Skeleton variant="circular" className="h-10 w-10 shrink-0" />
          <div className="flex flex-col gap-2 flex-1">
            <Skeleton className="h-4 w-1/3" />
            <Skeleton className="h-4" />
            <Skeleton className="h-4 w-5/6" />
          </div>
        </div>
      </ComponentPreview>

      {/* ── API Reference ────────────────────────────────────── */}
      <h2 className="type-h2 mt-8 mb-4 text-foreground">API Reference</h2>
      <p className="type-body mb-4 text-foreground max-w-prose">
        All props are optional. Extends native{' '}
        <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">
          &lt;div&gt;
        </code>{' '}
        attributes.
      </p>
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
              <td className="px-4 py-3 text-foreground"><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle">variant</code></td>
              <td className="px-4 py-3 text-foreground"><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle">&quot;rectangular&quot; | &quot;circular&quot;</code></td>
              <td className="px-4 py-3 text-foreground"><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle">&#39;rectangular&#39;</code></td>
              <td className="px-4 py-3 type-body-sm text-foreground">Shape of the placeholder. Rectangular applies <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">rounded-md</code>; circular applies full rounding for avatars.</td>
            </tr>
            <tr className="border-b border-border">
              <td className="px-4 py-3 text-foreground"><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle">className</code></td>
              <td className="px-4 py-3 text-foreground"><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle">string</code></td>
              <td className="px-4 py-3 type-body-sm text-foreground">—</td>
              <td className="px-4 py-3 type-body-sm text-foreground">Controls dimensions and layout. Use height and width utilities to match the content being replaced.</td>
            </tr>
          </tbody>
        </table>
      </div>

    </Container>
  )
}
