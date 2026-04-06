import { Container, IconButton } from '@umichkisa-ds/web'
import { ComponentPreview } from '@/components/ComponentPreview'
import { highlight } from '@/lib/highlight'

const defaultCode = `import { IconButton } from '@umichkisa-ds/web'

<IconButton icon="pencil" aria-label="Edit" />`

const variantsCode = `import { IconButton } from '@umichkisa-ds/web'

<IconButton icon="plus" variant="primary" aria-label="Add" />
<IconButton icon="pencil" variant="secondary" aria-label="Edit" />
<IconButton icon="x" variant="tertiary" aria-label="Close" />
<IconButton icon="trash-2" variant="destructive" aria-label="Delete" />`

const sizesCode = `import { IconButton } from '@umichkisa-ds/web'

<IconButton icon="pencil" size="sm" aria-label="Edit" />
<IconButton icon="pencil" size="md" aria-label="Edit" />
<IconButton icon="pencil" size="lg" aria-label="Edit" />`

const disabledCode = `import { IconButton } from '@umichkisa-ds/web'

<IconButton icon="plus" variant="primary" disabled aria-label="Add" />
<IconButton icon="pencil" variant="secondary" disabled aria-label="Edit" />
<IconButton icon="x" variant="tertiary" disabled aria-label="Close" />
<IconButton icon="trash-2" variant="destructive" disabled aria-label="Delete" />`

export default async function IconButtonPage() {
  const [
    defaultHighlighted,
    variantsHighlighted,
    sizesHighlighted,
    disabledHighlighted,
  ] = await Promise.all([
    highlight(defaultCode),
    highlight(variantsCode),
    highlight(sizesCode),
    highlight(disabledCode),
  ])

  return (
    <Container size="md" as="article">

      {/* ── Header ──────────────────────────────────────────── */}
      <h1 className="type-h1 mb-4 text-foreground">IconButton</h1>
      <p className="type-body mb-8 text-foreground max-w-prose">
        A square, icon-only button for compact actions like toolbar controls,
        close buttons, and menu triggers. Wraps{' '}
        <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">
          Button
        </code>{' '}
        internally, inheriting all variant styles and focus behavior. Requires{' '}
        <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">
          aria-label
        </code>{' '}
        for accessibility since there is no visible text.
      </p>

      {/* ── Examples ────────────────────────────────────────── */}
      <h2 className="type-h2 mt-8 mb-4 text-foreground">Examples</h2>

      {/* Default */}
      <h3 className="type-h3 mt-6 mb-2 text-foreground">Default</h3>
      <p className="type-body mb-2 text-foreground max-w-prose">
        The simplest usage. Renders as{' '}
        <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">
          secondary
        </code>{' '}
        variant at{' '}
        <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">
          md
        </code>{' '}
        size by default.
      </p>
      <ComponentPreview code={defaultCode} highlightedCode={defaultHighlighted}>
        <IconButton icon="pencil" aria-label="Edit" />
      </ComponentPreview>

      {/* Variants */}
      <h3 className="type-h3 mt-8 mb-2 text-foreground">Variants</h3>
      <p className="type-body mb-2 text-foreground max-w-prose">
        Four semantic variants matching{' '}
        <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">
          Button
        </code>
        . Use{' '}
        <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">
          primary
        </code>{' '}
        sparingly — most icon buttons are utility actions.
      </p>
      <ComponentPreview code={variantsCode} highlightedCode={variantsHighlighted}>
        <div className="flex items-center gap-4">
          <IconButton icon="plus" variant="primary" aria-label="Add" />
          <IconButton icon="pencil" variant="secondary" aria-label="Edit" />
          <IconButton icon="x" variant="tertiary" aria-label="Close" />
          <IconButton icon="trash-2" variant="destructive" aria-label="Delete" />
        </div>
      </ComponentPreview>

      {/* Sizes */}
      <h3 className="type-h3 mt-8 mb-2 text-foreground">Sizes</h3>
      <p className="type-body mb-2 text-foreground max-w-prose">
        Three sizes producing square dimensions:{' '}
        <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">
          sm
        </code>{' '}
        (32px),{' '}
        <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">
          md
        </code>{' '}
        (40px),{' '}
        <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">
          lg
        </code>{' '}
        (48px). All sizes meet the 44px minimum touch target via an invisible{' '}
        <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">
          ::after
        </code>{' '}
        pseudo-element.
      </p>
      <ComponentPreview code={sizesCode} highlightedCode={sizesHighlighted}>
        <div className="flex items-center gap-4">
          <IconButton icon="pencil" size="sm" aria-label="Edit" />
          <IconButton icon="pencil" size="md" aria-label="Edit" />
          <IconButton icon="pencil" size="lg" aria-label="Edit" />
        </div>
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
        <div className="flex items-center gap-4">
          <IconButton icon="plus" variant="primary" disabled aria-label="Add" />
          <IconButton icon="pencil" variant="secondary" disabled aria-label="Edit" />
          <IconButton icon="x" variant="tertiary" disabled aria-label="Close" />
          <IconButton icon="trash-2" variant="destructive" disabled aria-label="Delete" />
        </div>
      </ComponentPreview>

      {/* ── API Reference ────────────────────────────────────── */}
      <h2 className="type-h2 mt-8 mb-4 text-foreground">API Reference</h2>
      <p className="type-body mb-4 text-foreground max-w-prose">
        <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">
          icon
        </code>{' '}
        and{' '}
        <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">
          aria-label
        </code>{' '}
        are required. All other native{' '}
        <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">
          &lt;button&gt;
        </code>{' '}
        attributes are forwarded to the underlying{' '}
        <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">
          Button
        </code>
        .
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
              <td className="px-4 py-3 text-foreground"><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle">icon</code></td>
              <td className="px-4 py-3 text-foreground"><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle">IconName</code></td>
              <td className="px-4 py-3 type-body-sm text-foreground">—</td>
              <td className="px-4 py-3 type-body-sm text-foreground">Lucide icon name in kebab-case. Required. See the{' '}
                <a href="/components/icon" className="text-link underline hover:text-brand-primary">Icon</a>{' '}
                page for available names.</td>
            </tr>
            <tr className="border-b border-border">
              <td className="px-4 py-3 text-foreground"><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle">aria-label</code></td>
              <td className="px-4 py-3 text-foreground"><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle">string</code></td>
              <td className="px-4 py-3 type-body-sm text-foreground">—</td>
              <td className="px-4 py-3 type-body-sm text-foreground">Accessible label. Required — there is no visible text.</td>
            </tr>
            <tr className="border-b border-border">
              <td className="px-4 py-3 text-foreground"><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle">variant</code></td>
              <td className="px-4 py-3 text-foreground"><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle">&#39;primary&#39; | &#39;secondary&#39; | &#39;tertiary&#39; | &#39;destructive&#39;</code></td>
              <td className="px-4 py-3 text-foreground"><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle">&#39;secondary&#39;</code></td>
              <td className="px-4 py-3 type-body-sm text-foreground">Visual style. Passed through to Button.</td>
            </tr>
            <tr className="border-b border-border">
              <td className="px-4 py-3 text-foreground"><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle">size</code></td>
              <td className="px-4 py-3 text-foreground"><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle">&#39;sm&#39; | &#39;md&#39; | &#39;lg&#39;</code></td>
              <td className="px-4 py-3 text-foreground"><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle">&#39;md&#39;</code></td>
              <td className="px-4 py-3 type-body-sm text-foreground">Controls square dimensions (32 / 40 / 48px) and icon size.</td>
            </tr>
            <tr className="border-b border-border">
              <td className="px-4 py-3 text-foreground"><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle">disabled</code></td>
              <td className="px-4 py-3 text-foreground"><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle">boolean</code></td>
              <td className="px-4 py-3 text-foreground"><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle">false</code></td>
              <td className="px-4 py-3 type-body-sm text-foreground">Disables the button, reducing opacity and blocking pointer events.</td>
            </tr>
            <tr>
              <td className="px-4 py-3 text-foreground"><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle">className</code></td>
              <td className="px-4 py-3 text-foreground"><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle">string</code></td>
              <td className="px-4 py-3 type-body-sm text-foreground">—</td>
              <td className="px-4 py-3 type-body-sm text-foreground">Merged via cn(). Use for layout utilities only — never override variant styles.</td>
            </tr>
          </tbody>
        </table>
      </div>

    </Container>
  )
}
