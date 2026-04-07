import {
  Alert,
  Container,
  LoadingSpinner,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  TableMobileList,
  TableMobileItem,
} from '@umichkisa-ds/web'
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
      <h1 className="type-h1 font-sejong-bold tracking-tight mb-4 text-foreground">LoadingSpinner</h1>
      <p className="type-body mb-4 text-foreground max-w-prose">
        Animated spinner for indicating loading state. Renders an accessible
        spinning indicator that can optionally display a visible label.
      </p>

      <div className="my-4 max-w-prose">
        <Alert variant="info">
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
        </Alert>
      </div>

      <div className="my-4 mb-8 max-w-prose">
        <Alert variant="info">
          Use <strong>LoadingSpinner</strong> for indeterminate waits such as
          data fetching or form submission. Use <strong>Skeleton</strong> for
          layout-preserving content placeholders where the shape of the content
          is known ahead of time.
        </Alert>
      </div>

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
        <div className="relative rounded-md border border-border w-full h-48 overflow-hidden bg-surface-subtle">
          <div className="p-4">
            <p className="type-body text-muted-foreground">Page content behind overlay</p>
          </div>
          <div className="absolute inset-0 flex items-center justify-center bg-surface z-10">
            <LoadingSpinner size="lg" label="Loading..." showLabel />
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
      </ul>

      {/* ── API Reference ────────────────────────────────────── */}
      <h2 className="type-h2 mt-8 mb-4 text-foreground">API Reference</h2>
      <p className="type-body mb-4 text-foreground max-w-prose">
        All props are optional.
      </p>
      <div className="my-6">
        <div className="hidden md:block">
          <Table size="sm">
            <TableHeader>
              <TableRow>
                <TableHead>Prop</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Default</TableHead>
                <TableHead>Description</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle">size</code></TableCell>
                <TableCell><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle">&#39;sm&#39; | &#39;md&#39; | &#39;lg&#39;</code></TableCell>
                <TableCell><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle">&#39;md&#39;</code></TableCell>
                <TableCell>Spinner diameter. sm = 20px, md = 32px, lg = 48px.</TableCell>
              </TableRow>
              <TableRow>
                <TableCell><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle">label</code></TableCell>
                <TableCell><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle">string</code></TableCell>
                <TableCell><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle">&#39;Loading&#39;</code></TableCell>
                <TableCell>Accessible label for screen readers. Always applied as <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle">aria-label</code>.</TableCell>
              </TableRow>
              <TableRow>
                <TableCell><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle">showLabel</code></TableCell>
                <TableCell><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle">boolean</code></TableCell>
                <TableCell><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle">false</code></TableCell>
                <TableCell>Render the label text visually below the spinner.</TableCell>
              </TableRow>
              <TableRow>
                <TableCell><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle">className</code></TableCell>
                <TableCell><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle">string</code></TableCell>
                <TableCell>—</TableCell>
                <TableCell>Applied to the outer wrapper div for layout and positioning.</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
        <div className="block md:hidden">
          <TableMobileList>
            <TableMobileItem>
              <span className="type-body-sm text-foreground"><strong>size</strong></span>
              <span className="type-caption text-muted-foreground"><code className="rounded px-1 py-0.5 font-mono bg-surface-subtle">&#39;sm&#39; | &#39;md&#39; | &#39;lg&#39;</code> · default <code className="rounded px-1 py-0.5 font-mono bg-surface-subtle">&#39;md&#39;</code></span>
              <span className="type-caption text-muted-foreground">Spinner diameter. sm = 20px, md = 32px, lg = 48px.</span>
            </TableMobileItem>
            <TableMobileItem>
              <span className="type-body-sm text-foreground"><strong>label</strong></span>
              <span className="type-caption text-muted-foreground"><code className="rounded px-1 py-0.5 font-mono bg-surface-subtle">string</code> · default <code className="rounded px-1 py-0.5 font-mono bg-surface-subtle">&#39;Loading&#39;</code></span>
              <span className="type-caption text-muted-foreground">Accessible label for screen readers. Always applied as <code className="rounded px-1 py-0.5 font-mono bg-surface-subtle">aria-label</code>.</span>
            </TableMobileItem>
            <TableMobileItem>
              <span className="type-body-sm text-foreground"><strong>showLabel</strong></span>
              <span className="type-caption text-muted-foreground"><code className="rounded px-1 py-0.5 font-mono bg-surface-subtle">boolean</code> · default <code className="rounded px-1 py-0.5 font-mono bg-surface-subtle">false</code></span>
              <span className="type-caption text-muted-foreground">Render the label text visually below the spinner.</span>
            </TableMobileItem>
            <TableMobileItem>
              <span className="type-body-sm text-foreground"><strong>className</strong></span>
              <span className="type-caption text-muted-foreground"><code className="rounded px-1 py-0.5 font-mono bg-surface-subtle">string</code></span>
              <span className="type-caption text-muted-foreground">Applied to the outer wrapper div for layout and positioning.</span>
            </TableMobileItem>
          </TableMobileList>
        </div>
      </div>

    </Container>
  )
}
