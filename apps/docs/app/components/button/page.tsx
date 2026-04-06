import { Container, Button, Icon, Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '@umichkisa-ds/web'
import { ComponentPreview } from '@/components/ComponentPreview'
import { highlight } from '@/lib/highlight'

const defaultCode = `import { Button } from '@umichkisa-ds/web'

<Button>Label</Button>`

const variantsCode = `import { Button } from '@umichkisa-ds/web'

<Button variant="primary">Primary</Button>
<Button variant="secondary">Secondary</Button>
<Button variant="tertiary">Tertiary</Button>
<Button variant="destructive">Destructive</Button>`

const sizesCode = `import { Button } from '@umichkisa-ds/web'

<Button size="sm">Small</Button>
<Button size="md">Medium</Button>
<Button size="lg">Large</Button>`

const withIconCode = `import { Button, Icon } from '@umichkisa-ds/web'

<Button>
  <Icon name="plus" />
  Add item
</Button>`

const disabledCode = `import { Button } from '@umichkisa-ds/web'

<Button variant="primary" disabled>Primary</Button>
<Button variant="secondary" disabled>Secondary</Button>
<Button variant="tertiary" disabled>Tertiary</Button>
<Button variant="destructive" disabled>Destructive</Button>`

export default async function ButtonPage() {
  const [
    defaultHighlighted,
    variantsHighlighted,
    sizesHighlighted,
    withIconHighlighted,
    disabledHighlighted,
  ] = await Promise.all([
    highlight(defaultCode),
    highlight(variantsCode),
    highlight(sizesCode),
    highlight(withIconCode),
    highlight(disabledCode),
  ])

  return (
    <Container size="md" as="article">

      {/* ── Header ──────────────────────────────────────────── */}
      <h1 className="type-h1 mb-4 text-foreground">Button</h1>
      <p className="type-body mb-8 text-foreground max-w-prose">
        The primary interactive element for triggering actions. Supports four
        semantic variants and three sizes. Extends all native{' '}
        <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">
          &lt;button&gt;
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
          primary
        </code>{' '}
        variant at{' '}
        <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">
          md
        </code>{' '}
        size by default.
      </p>
      <ComponentPreview code={defaultCode} highlightedCode={defaultHighlighted}>
        <Button>Label</Button>
      </ComponentPreview>

      {/* Variants */}
      <h3 className="type-h3 mt-8 mb-2 text-foreground">Variants</h3>
      <p className="type-body mb-2 text-foreground max-w-prose">
        Four semantic variants for different levels of emphasis and intent.
      </p>
      <ComponentPreview code={variantsCode} highlightedCode={variantsHighlighted}>
        <div className="flex flex-wrap items-center gap-4">
          <Button variant="primary">Primary</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="tertiary">Tertiary</Button>
          <Button variant="destructive">Destructive</Button>
        </div>
      </ComponentPreview>
      <ul className="type-body text-foreground max-w-prose mt-4 mb-2 flex flex-col gap-2">
        <li><strong className="text-foreground">Primary</strong> — the main action on the page. Usually one per screen.</li>
        <li><strong className="text-foreground">Secondary</strong> — supporting actions alongside a primary button.</li>
        <li><strong className="text-foreground">Tertiary</strong> — low-emphasis actions like "Cancel" or inline text-level actions.</li>
        <li><strong className="text-foreground">Destructive</strong> — actions that delete data or cannot be undone.</li>
      </ul>

      {/* Sizes */}
      <h3 className="type-h3 mt-8 mb-2 text-foreground">Sizes</h3>
      <p className="type-body mb-2 text-foreground max-w-prose">
        Three sizes aligned to the spacing grid. Use{' '}
        <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">
          md
        </code>{' '}
        (default) for most UI.
      </p>
      <ComponentPreview code={sizesCode} highlightedCode={sizesHighlighted}>
        <div className="flex flex-wrap items-center gap-4">
          <Button size="sm">Small</Button>
          <Button size="md">Medium</Button>
          <Button size="lg">Large</Button>
        </div>
      </ComponentPreview>

      {/* With icon */}
      <h3 className="type-h3 mt-8 mb-2 text-foreground">With icon</h3>
      <p className="type-body mb-2 text-foreground max-w-prose">
        Button has built-in{' '}
        <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">
          gap-2
        </code>{' '}
        so icons and text align automatically. Always use the{' '}
        <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">
          &lt;Icon&gt;
        </code>{' '}
        component — never import Lucide icons directly.
      </p>
      <ComponentPreview code={withIconCode} highlightedCode={withIconHighlighted}>
        <Button>
          <Icon name="plus" />
          Add item
        </Button>
      </ComponentPreview>

      {/* Disabled */}
      <h3 className="type-h3 mt-8 mb-2 text-foreground">Disabled</h3>
      <p className="type-body mb-2 text-foreground max-w-prose">
        Pass{' '}
        <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">
          disabled
        </code>{' '}
        to visually dim the button and block interaction. Works with all variants.
      </p>
      <ComponentPreview code={disabledCode} highlightedCode={disabledHighlighted}>
        <div className="flex flex-wrap items-center gap-4">
          <Button variant="primary" disabled>Primary</Button>
          <Button variant="secondary" disabled>Secondary</Button>
          <Button variant="tertiary" disabled>Tertiary</Button>
          <Button variant="destructive" disabled>Destructive</Button>
        </div>
      </ComponentPreview>

      {/* ── API Reference ────────────────────────────────────── */}
      <h2 className="type-h2 mt-8 mb-4 text-foreground">API Reference</h2>
      <p className="type-body mb-4 text-foreground max-w-prose">
        All props are optional.{' '}
        <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">
          Button
        </code>{' '}
        extends{' '}
        <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">
          React.ButtonHTMLAttributes
        </code>
        , so any native button attribute is also accepted.
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
              <TableCell><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle">&#39;primary&#39; | &#39;secondary&#39; | &#39;tertiary&#39; | &#39;destructive&#39;</code></TableCell>
              <TableCell><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle">&#39;primary&#39;</code></TableCell>
              <TableCell>Visual style indicating the level of emphasis or intent.</TableCell>
            </TableRow>
            <TableRow>
              <TableCell><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle">size</code></TableCell>
              <TableCell><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle">&#39;sm&#39; | &#39;md&#39; | &#39;lg&#39;</code></TableCell>
              <TableCell><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle">&#39;md&#39;</code></TableCell>
              <TableCell>Controls padding and font size. All values sit on the 4px spacing grid.</TableCell>
            </TableRow>
            <TableRow>
              <TableCell><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle">type</code></TableCell>
              <TableCell><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle">&#39;button&#39; | &#39;submit&#39; | &#39;reset&#39;</code></TableCell>
              <TableCell><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle">&#39;button&#39;</code></TableCell>
              <TableCell>
                HTML button type. Defaults to{' '}
                <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle">button</code>{' '}
                instead of the browser default{' '}
                <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle">submit</code>{' '}
                to prevent accidental form submissions.
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle">disabled</code></TableCell>
              <TableCell><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle">boolean</code></TableCell>
              <TableCell><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle">false</code></TableCell>
              <TableCell>Disables the button, reducing opacity and blocking pointer events.</TableCell>
            </TableRow>
            <TableRow>
              <TableCell><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle">className</code></TableCell>
              <TableCell><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle">string</code></TableCell>
              <TableCell>—</TableCell>
              <TableCell>Merged via cn() (class merge utility). Use for layout utilities only — never override variant styles.</TableCell>
            </TableRow>
            <TableRow>
              <TableCell><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle">children</code></TableCell>
              <TableCell><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle">React.ReactNode</code></TableCell>
              <TableCell>—</TableCell>
              <TableCell>Button content. Can include text, icons, or both.</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>

    </Container>
  )
}
