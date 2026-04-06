import { Container, Badge, Icon, Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '@umichkisa-ds/web'
import { ComponentPreview } from '@/components/ComponentPreview'
import { highlight } from '@/lib/highlight'

const defaultCode = `import { Badge } from '@umichkisa-ds/web'

<Badge>Label</Badge>`

const variantsCode = `import { Badge } from '@umichkisa-ds/web'

<Badge variant="default">Default</Badge>
<Badge variant="brand">Brand</Badge>
<Badge variant="success">Success</Badge>
<Badge variant="warning">Warning</Badge>
<Badge variant="error">Error</Badge>
<Badge variant="info">Info</Badge>
<Badge variant="outline">Outline</Badge>`

const sizesCode = `import { Badge } from '@umichkisa-ds/web'

<Badge size="sm">Small</Badge>
<Badge size="md">Medium</Badge>`

const withIconCode = `import { Badge, Icon } from '@umichkisa-ds/web'

<Badge>
  <Icon name="thumbs-up" size="sm" />
  Approved
</Badge>`

const asChildCode = `import { Badge } from '@umichkisa-ds/web'

<Badge asChild>
  <a href="#">Clickable</a>
</Badge>`

export default async function BadgePage() {
  const [
    defaultHighlighted,
    variantsHighlighted,
    sizesHighlighted,
    withIconHighlighted,
    asChildHighlighted,
  ] = await Promise.all([
    highlight(defaultCode),
    highlight(variantsCode),
    highlight(sizesCode),
    highlight(withIconCode),
    highlight(asChildCode),
  ])

  return (
    <Container size="md" as="article">

      {/* ── Header ──────────────────────────────────────────── */}
      <h1 className="type-h1 mb-4 text-foreground">Badge</h1>
      <p className="type-body mb-8 text-foreground max-w-prose">
        Inline label for status, categorization, and metadata display. Supports
        seven semantic variants, two sizes, and{' '}
        <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">
          asChild
        </code>{' '}
        composition for rendering as any element. Extends all native{' '}
        <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">
          &lt;span&gt;
        </code>{' '}
        attributes.
      </p>

      {/* ── Examples ────────────────────────────────────────── */}
      <h2 className="type-h2 mt-8 mb-4 text-foreground">Examples</h2>

      {/* Default */}
      <h3 className="type-h3 mt-6 mb-2 text-foreground">Default</h3>
      <p className="type-body mb-2 text-foreground max-w-prose">
        The simplest usage. Renders as{' '}
        <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">
          default
        </code>{' '}
        variant at{' '}
        <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">
          md
        </code>{' '}
        size by default.
      </p>
      <ComponentPreview code={defaultCode} highlightedCode={defaultHighlighted}>
        <Badge>Label</Badge>
      </ComponentPreview>

      {/* Variants */}
      <h3 className="type-h3 mt-8 mb-2 text-foreground">Variants</h3>
      <p className="type-body mb-2 text-foreground max-w-prose">
        Seven semantic variants for different levels of emphasis and intent.
      </p>
      <ComponentPreview code={variantsCode} highlightedCode={variantsHighlighted}>
        <div className="flex items-center gap-4 flex-wrap">
          <Badge variant="default">Default</Badge>
          <Badge variant="brand">Brand</Badge>
          <Badge variant="success">Success</Badge>
          <Badge variant="warning">Warning</Badge>
          <Badge variant="error">Error</Badge>
          <Badge variant="info">Info</Badge>
          <Badge variant="outline">Outline</Badge>
        </div>
      </ComponentPreview>
      <ul className="type-body-sm text-foreground max-w-prose mt-4 mb-2 flex flex-col gap-2">
        <li><strong className="text-foreground">Default</strong> — neutral label for general metadata.</li>
        <li><strong className="text-foreground">Brand</strong> — branded or primary emphasis.</li>
        <li><strong className="text-foreground">Success</strong> — positive status or completion.</li>
        <li><strong className="text-foreground">Warning</strong> — caution or pending state.</li>
        <li><strong className="text-foreground">Error</strong> — error or critical state.</li>
        <li><strong className="text-foreground">Info</strong> — informational or neutral highlight.</li>
        <li><strong className="text-foreground">Outline</strong> — minimal, border-only style.</li>
      </ul>

      {/* Sizes */}
      <h3 className="type-h3 mt-8 mb-2 text-foreground">Sizes</h3>
      <p className="type-body mb-2 text-foreground max-w-prose">
        Use{' '}
        <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">
          md
        </code>{' '}
        (default) for general UI — page metadata, status labels, inline tags. Use{' '}
        <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">
          sm
        </code>{' '}
        for compact contexts like table cells, dense lists, and sidebars where the
        badge sits alongside{' '}
        <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">
          type-caption
        </code>{' '}
        text.
      </p>
      <ComponentPreview code={sizesCode} highlightedCode={sizesHighlighted}>
        <div className="flex items-center gap-4">
          <Badge size="sm">Small</Badge>
          <Badge size="md">Medium</Badge>
        </div>
      </ComponentPreview>

      {/* With icon */}
      <h3 className="type-h3 mt-8 mb-2 text-foreground">With icon</h3>
      <p className="type-body mb-2 text-foreground max-w-prose">
        Badge has built-in gap-1 so icons and text align automatically.
      </p>
      <ComponentPreview code={withIconCode} highlightedCode={withIconHighlighted}>
        <Badge>
          <Icon name="thumbs-up" size="sm" />
          Approved
        </Badge>
      </ComponentPreview>

      {/* As link */}
      <h3 className="type-h3 mt-8 mb-2 text-foreground">As link</h3>
      <p className="type-body mb-2 text-foreground max-w-prose">
        Use{' '}
        <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">
          asChild
        </code>{' '}
        to render the badge as a different element, such as an anchor.
        When enabled, Badge does not render its own{' '}
        <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">
          &lt;span&gt;
        </code>
        — it passes all styling and props to the single child element you provide.
      </p>
      <ComponentPreview code={asChildCode} highlightedCode={asChildHighlighted}>
        <Badge asChild>
          <a href="#">Clickable</a>
        </Badge>
      </ComponentPreview>

      {/* ── API Reference ────────────────────────────────────── */}
      <h2 className="type-h2 mt-8 mb-4 text-foreground">API Reference</h2>
      <p className="type-body mb-4 text-foreground max-w-prose">
        All props are optional.
      </p>
      <div className="my-6">
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
              <TableCell><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle">variant</code></TableCell>
              <TableCell><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle">&quot;default&quot; | &quot;brand&quot; | &quot;success&quot; | &quot;warning&quot; | &quot;error&quot; | &quot;info&quot; | &quot;outline&quot;</code></TableCell>
              <TableCell><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle">&#39;default&#39;</code></TableCell>
              <TableCell>Visual style of the badge.</TableCell>
            </TableRow>
            <TableRow>
              <TableCell><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle">size</code></TableCell>
              <TableCell><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle">&quot;sm&quot; | &quot;md&quot;</code></TableCell>
              <TableCell><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle">&#39;md&#39;</code></TableCell>
              <TableCell>Size of the badge.</TableCell>
            </TableRow>
            <TableRow>
              <TableCell><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle">asChild</code></TableCell>
              <TableCell><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle">boolean</code></TableCell>
              <TableCell><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle">false</code></TableCell>
              <TableCell>Merge props onto the child element instead of rendering a span.</TableCell>
            </TableRow>
            <TableRow>
              <TableCell><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle">className</code></TableCell>
              <TableCell><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle">string</code></TableCell>
              <TableCell>—</TableCell>
              <TableCell>Merged via cn() (class merge utility). Use for layout utilities only — never override variant styles.</TableCell>
            </TableRow>
            <TableRow>
              <TableCell><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle">children</code></TableCell>
              <TableCell><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle">ReactNode</code></TableCell>
              <TableCell>—</TableCell>
              <TableCell>Badge content.</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>

    </Container>
  )
}
