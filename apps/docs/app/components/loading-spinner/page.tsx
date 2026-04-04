import { Container, LoadingSpinner } from '@umichkisa-ds/web'
import { ComponentPreview } from '@/components/ComponentPreview'
import { highlight } from '@/lib/highlight'

const defaultCode = `import { LoadingSpinner } from '@umichkisa-ds/web'

<LoadingSpinner />`

const sizesCode = `import { LoadingSpinner } from '@umichkisa-ds/web'

<LoadingSpinner size="sm" />
<LoadingSpinner size="md" />
<LoadingSpinner size="lg" />`

const withLabelCode = `import { LoadingSpinner } from '@umichkisa-ds/web'

<LoadingSpinner size="lg" label="Loading events..." showLabel />`

const inlineCode = `import { LoadingSpinner } from '@umichkisa-ds/web'

<div className="flex items-center gap-2">
  <LoadingSpinner size="sm" label="Loading results" />
  <span className="type-body-sm text-muted-foreground">Loading results...</span>
</div>`

const overlayCode = `import { LoadingSpinner } from '@umichkisa-ds/web'

{/* Full-screen overlay — wrap your app or page section */}
<div className="fixed inset-0 z-50 flex items-center justify-center bg-surface">
  <LoadingSpinner size="lg" label="Loading..." showLabel />
</div>`

export default async function LoadingSpinnerPage() {
  const [defaultHighlighted, sizesHighlighted, withLabelHighlighted, inlineHighlighted, overlayHighlighted] = await Promise.all([
    highlight(defaultCode),
    highlight(sizesCode),
    highlight(withLabelCode),
    highlight(inlineCode),
    highlight(overlayCode),
  ]);

  return (
    <Container size="md" as="article">

      {/* ── Header ──────────────────────────────────────────── */}
      <h1 className="type-h1 font-sejong-bold tracking-tight mt-8 mb-4 text-foreground">LoadingSpinner</h1>
      <p className="type-body mb-2 text-foreground max-w-prose">
        Animated spinner for indicating loading state. Renders an accessible
        spinning indicator that can optionally display a visible label.
      </p>
      <p className="type-body-sm mb-4 text-muted-foreground max-w-prose">
        The{' '}
        <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">
          label
        </code>{' '}
        prop always sets an{' '}
        <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">
          aria-label
        </code>{' '}
        for screen readers. By default the label is invisible. Pass{' '}
        <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">
          showLabel
        </code>{' '}
        to also render it visually below the spinner.
      </p>
      <p className="type-body-sm mb-8 text-muted-foreground max-w-prose">
        Use <strong>LoadingSpinner</strong> for indeterminate waits such as data
        fetching or form submission. Use <strong>Skeleton</strong> for
        layout-preserving content placeholders where the shape of the content is
        known ahead of time.
      </p>

      {/* ── Examples ────────────────────────────────────────── */}
      <h2 className="type-h2 mt-8 mb-4 text-foreground">Examples</h2>

      {/* Default */}
      <h3 className="type-h3 mt-6 mb-2 text-foreground">Default</h3>
      <p className="type-body mb-2 text-foreground max-w-prose">
        A spinner centered inside a loading panel. Uses the default{' '}
        <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">
          md
        </code>{' '}
        size and an accessible{' '}
        <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">
          aria-label
        </code>{' '}
        of &quot;Loading&quot;.
      </p>
      <ComponentPreview code={defaultCode} highlightedCode={defaultHighlighted}>
        <div className="flex items-center justify-center rounded-md border border-border p-8 w-full">
          <LoadingSpinner />
        </div>
      </ComponentPreview>

      {/* Sizes */}
      <h3 className="type-h3 mt-8 mb-2 text-foreground">Sizes</h3>
      <p className="type-body mb-2 text-foreground max-w-prose">
        Three sizes for different contexts: small for inline indicators, medium
        for section loaders, and large for prominent full-page states.
      </p>
      <ComponentPreview code={sizesCode} highlightedCode={sizesHighlighted}>
        <div className="flex items-center gap-6">
          <div className="flex flex-col items-center gap-2">
            <div className="flex items-center justify-center rounded-md border border-border p-4">
              <LoadingSpinner size="sm" />
            </div>
            <span className="type-caption text-muted-foreground">sm</span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <div className="flex items-center justify-center rounded-md border border-border p-4">
              <LoadingSpinner size="md" />
            </div>
            <span className="type-caption text-muted-foreground">md</span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <div className="flex items-center justify-center rounded-md border border-border p-4">
              <LoadingSpinner size="lg" />
            </div>
            <span className="type-caption text-muted-foreground">lg</span>
          </div>
        </div>
      </ComponentPreview>

      {/* With label */}
      <h3 className="type-h3 mt-8 mb-2 text-foreground">With label</h3>
      <p className="type-body mb-2 text-foreground max-w-prose">
        Pass{' '}
        <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">
          showLabel
        </code>{' '}
        to render the label text visually below the spinner. Useful for
        prominent loading states where users benefit from explicit feedback.
      </p>
      <ComponentPreview code={withLabelCode} highlightedCode={withLabelHighlighted}>
        <div className="flex items-center justify-center rounded-md border border-border p-8 w-full">
          <LoadingSpinner size="lg" label="Loading events..." showLabel />
        </div>
      </ComponentPreview>

      {/* Inline loading */}
      <h3 className="type-h3 mt-8 mb-2 text-foreground">Inline loading</h3>
      <p className="type-body mb-2 text-foreground max-w-prose">
        A small spinner placed inline next to descriptive text. The spinner
        provides an accessible label while the adjacent text gives visual
        context.
      </p>
      <ComponentPreview code={inlineCode} highlightedCode={inlineHighlighted}>
        <div className="flex items-center gap-2">
          <LoadingSpinner size="sm" label="Loading results" />
          <span className="type-body-sm text-muted-foreground">Loading results...</span>
        </div>
      </ComponentPreview>

      {/* Full-screen overlay pattern */}
      <h3 className="type-h3 mt-8 mb-2 text-foreground">Full-screen overlay pattern</h3>
      <p className="type-body mb-2 text-foreground max-w-prose">
        A consumer-side pattern for blocking the entire viewport during a
        critical loading state such as authentication or initial data fetch.
        The contained preview below simulates the effect.
      </p>
      <ComponentPreview code={overlayCode} highlightedCode={overlayHighlighted}>
        <div className="relative rounded-md border border-border w-full h-48 overflow-hidden">
          <div className="absolute inset-0 flex items-center justify-center bg-surface z-10">
            <LoadingSpinner size="lg" label="Loading..." showLabel />
          </div>
          <div className="p-4">
            <p className="type-body text-muted-foreground">Page content behind overlay</p>
          </div>
        </div>
      </ComponentPreview>

      {/* ── Usage Guidelines ─────────────────────────────────── */}
      <h2 className="type-h2 mt-8 mb-4 text-foreground">Usage Guidelines</h2>
      <ul className="list-disc pl-6 space-y-2 mb-8 max-w-prose">
        <li className="type-body text-foreground">
          Use <strong>LoadingSpinner</strong> for indeterminate loading — API
          calls, authentication, form submission — where you cannot predict how
          long the operation will take.
        </li>
        <li className="type-body text-foreground">
          Use <strong>Skeleton</strong> when you know the layout shape and want
          to preserve it during loading, reducing layout shift.
        </li>
        <li className="type-body text-foreground">
          Prefer{' '}
          <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">
            sm
          </code>{' '}
          for inline contexts,{' '}
          <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">
            md
          </code>{' '}
          for section loaders, and{' '}
          <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">
            lg
          </code>{' '}
          for prominent or full-page loading states.
        </li>
      </ul>

      {/* ── API Reference ────────────────────────────────────── */}
      <h2 className="type-h2 mt-8 mb-4 text-foreground">API Reference</h2>
      <p className="type-body mb-4 text-foreground max-w-prose">
        All props are optional.
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
              <td className="px-4 py-3 text-foreground"><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle">size</code></td>
              <td className="px-4 py-3 text-foreground"><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle">&quot;sm&quot; | &quot;md&quot; | &quot;lg&quot;</code></td>
              <td className="px-4 py-3 text-foreground"><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle">&#39;md&#39;</code></td>
              <td className="px-4 py-3 type-body-sm text-foreground">Spinner diameter. sm = 20px, md = 32px, lg = 48px.</td>
            </tr>
            <tr className="border-b border-border">
              <td className="px-4 py-3 text-foreground"><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle">label</code></td>
              <td className="px-4 py-3 text-foreground"><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle">string</code></td>
              <td className="px-4 py-3 text-foreground"><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle">&#39;Loading&#39;</code></td>
              <td className="px-4 py-3 type-body-sm text-foreground">Accessible label for screen readers. Always applied as <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">aria-label</code>.</td>
            </tr>
            <tr className="border-b border-border">
              <td className="px-4 py-3 text-foreground"><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle">showLabel</code></td>
              <td className="px-4 py-3 text-foreground"><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle">boolean</code></td>
              <td className="px-4 py-3 text-foreground"><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle">false</code></td>
              <td className="px-4 py-3 type-body-sm text-foreground">Render the label text visually below the spinner.</td>
            </tr>
            <tr className="border-b border-border">
              <td className="px-4 py-3 text-foreground"><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle">className</code></td>
              <td className="px-4 py-3 text-foreground"><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle">string</code></td>
              <td className="px-4 py-3 type-body-sm text-foreground">—</td>
              <td className="px-4 py-3 type-body-sm text-foreground">Applied to the outer wrapper div for layout and positioning.</td>
            </tr>
          </tbody>
        </table>
      </div>

    </Container>
  )
}
