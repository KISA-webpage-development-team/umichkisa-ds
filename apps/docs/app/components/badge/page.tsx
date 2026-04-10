import {
  Container, Badge, Icon, Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '@umichkisa-ds/web'
import { ComponentPreview } from '@/components/ComponentPreview'
import { InlineCode } from '@/components/InlineCode'
import { highlight } from '@/lib/highlight'
import { Heading } from '@/components/Heading'

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
        <InlineCode>
          asChild
        </InlineCode>{' '}
        composition for rendering as any element. Extends all native{' '}
        <InlineCode>
          &lt;span&gt;
        </InlineCode>{' '}
        attributes.
      </p>

      {/* ── Examples ────────────────────────────────────────── */}
      <Heading as="h2">Examples</Heading>

      {/* Default */}
      <Heading as="h3" className="mt-6">Default</Heading>
      <p className="type-body mb-2 text-foreground max-w-prose">
        The simplest usage. Renders as{' '}
        <InlineCode>
          default
        </InlineCode>{' '}
        variant at{' '}
        <InlineCode>
          md
        </InlineCode>{' '}
        size by default.
      </p>
      <ComponentPreview code={defaultCode} highlightedCode={defaultHighlighted}>
        <Badge>Label</Badge>
      </ComponentPreview>

      {/* Variants */}
      <Heading as="h3">Variants</Heading>
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
      <Heading as="h3">Sizes</Heading>
      <p className="type-body mb-2 text-foreground max-w-prose">
        Use{' '}
        <InlineCode>
          md
        </InlineCode>{' '}
        (default) for general UI — page metadata, status labels, inline tags. Use{' '}
        <InlineCode>
          sm
        </InlineCode>{' '}
        for compact contexts like table cells, dense lists, and sidebars where the
        badge sits alongside{' '}
        <InlineCode>
          type-caption
        </InlineCode>{' '}
        text.
      </p>
      <ComponentPreview code={sizesCode} highlightedCode={sizesHighlighted}>
        <div className="flex items-center gap-4">
          <Badge size="sm">Small</Badge>
          <Badge size="md">Medium</Badge>
        </div>
      </ComponentPreview>

      {/* With icon */}
      <Heading as="h3">With icon</Heading>
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
      <Heading as="h3">As link</Heading>
      <p className="type-body mb-2 text-foreground max-w-prose">
        Use{' '}
        <InlineCode>
          asChild
        </InlineCode>{' '}
        to render the badge as a different element, such as an anchor.
        When enabled, Badge does not render its own{' '}
        <InlineCode>
          &lt;span&gt;
        </InlineCode>
        — it passes all styling and props to the single child element you provide.
      </p>
      <ComponentPreview code={asChildCode} highlightedCode={asChildHighlighted}>
        <Badge asChild>
          <a href="#">Clickable</a>
        </Badge>
      </ComponentPreview>

      {/* ── API Reference ────────────────────────────────────── */}
      <Heading as="h2">API Reference</Heading>
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
              <TableCell><InlineCode>variant</InlineCode></TableCell>
              <TableCell><InlineCode>&quot;default&quot; | &quot;brand&quot; | &quot;success&quot; | &quot;warning&quot; | &quot;error&quot; | &quot;info&quot; | &quot;outline&quot;</InlineCode></TableCell>
              <TableCell><InlineCode>&#39;default&#39;</InlineCode></TableCell>
              <TableCell>Visual style of the badge.</TableCell>
            </TableRow>
            <TableRow>
              <TableCell><InlineCode>size</InlineCode></TableCell>
              <TableCell><InlineCode>&quot;sm&quot; | &quot;md&quot;</InlineCode></TableCell>
              <TableCell><InlineCode>&#39;md&#39;</InlineCode></TableCell>
              <TableCell>Size of the badge.</TableCell>
            </TableRow>
            <TableRow>
              <TableCell><InlineCode>asChild</InlineCode></TableCell>
              <TableCell><InlineCode>boolean</InlineCode></TableCell>
              <TableCell><InlineCode>false</InlineCode></TableCell>
              <TableCell>Merge props onto the child element instead of rendering a span.</TableCell>
            </TableRow>
            <TableRow>
              <TableCell><InlineCode>className</InlineCode></TableCell>
              <TableCell><InlineCode>string</InlineCode></TableCell>
              <TableCell>—</TableCell>
              <TableCell>Merged via cn() (class merge utility). Use for layout utilities only — never override variant styles.</TableCell>
            </TableRow>
            <TableRow>
              <TableCell><InlineCode>children</InlineCode></TableCell>
              <TableCell><InlineCode>ReactNode</InlineCode></TableCell>
              <TableCell>—</TableCell>
              <TableCell>Badge content.</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>

    </Container>
  )
}
