import {
  Alert,
  Container,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  TableMobileList,
  TableMobileItem,
  Tooltip,
} from '@umichkisa-ds/web'
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

const tooltipCode = `import { IconButton, Tooltip } from '@umichkisa-ds/web'

<Tooltip content="Edit profile">
  <IconButton icon="pencil" aria-label="Edit profile" />
</Tooltip>`

export default async function IconButtonPage() {
  const [
    defaultHighlighted,
    variantsHighlighted,
    sizesHighlighted,
    disabledHighlighted,
    tooltipHighlighted,
  ] = await Promise.all([
    highlight(defaultCode),
    highlight(variantsCode),
    highlight(sizesCode),
    highlight(disabledCode),
    highlight(tooltipCode),
  ])

  return (
    <Container size="md" as="article">

      {/* ── Header ──────────────────────────────────────────── */}
      <h1 className="type-h1 mb-4 text-foreground">IconButton</h1>
      <p className="type-body mb-8 text-foreground max-w-prose">
        A square, icon-only button for compact actions like toolbar controls,
        close buttons, and menu triggers. Shares{' '}
        <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">
          Button
        </code>
        &apos;s variants, sizes, and focus behavior. Requires{' '}
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
        The simplest usage —{' '}
        <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">
          icon
        </code>{' '}
        and{' '}
        <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">
          aria-label
        </code>{' '}
        are the only required props.
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

      {/* With Tooltip */}
      <h3 className="type-h3 mt-8 mb-2 text-foreground">With Tooltip</h3>
      <p className="type-body mb-2 text-foreground max-w-prose">
        Wrap an{' '}
        <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">
          IconButton
        </code>{' '}
        in a{' '}
        <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">
          Tooltip
        </code>{' '}
        to expose its label to sighted users. The tooltip content must match{' '}
        <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">
          aria-label
        </code>{' '}
        exactly.
      </p>
      <ComponentPreview code={tooltipCode} highlightedCode={tooltipHighlighted}>
        <Tooltip content="Edit profile">
          <IconButton icon="pencil" aria-label="Edit profile" />
        </Tooltip>
      </ComponentPreview>

      {/* ── Accessibility ───────────────────────────────────── */}
      <h2 className="type-h2 mt-8 mb-4 text-foreground">Accessibility</h2>
      <Alert variant="info" className="mb-4">
        <ul className="list-disc pl-5 space-y-1">
          <li>
            <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">aria-label</code>{' '}
            must describe the <strong>action</strong>, not the icon — use{' '}
            <em>&ldquo;Edit profile&rdquo;</em>, not <em>&ldquo;Edit&rdquo;</em> or{' '}
            <em>&ldquo;Pencil&rdquo;</em>.
          </li>
          <li>
            When wrapped in a{' '}
            <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">Tooltip</code>,
            the tooltip text must match{' '}
            <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">aria-label</code>{' '}
            exactly to avoid duplicate or conflicting screen-reader announcements.
          </li>
        </ul>
      </Alert>
      <p className="type-body text-foreground max-w-prose">
        All three sizes meet the WCAG 44×44px touch target. Even when the visible
        button is 32px (
        <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">size=&quot;sm&quot;</code>
        ), an invisible{' '}
        <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">::after</code>{' '}
        pseudo-element extends the hit area to 44×44 without changing the visible
        box.
      </p>

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
              <TableCell><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle">icon</code></TableCell>
              <TableCell><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle">IconName</code></TableCell>
              <TableCell>—</TableCell>
              <TableCell>
                Lucide icon name in kebab-case. Required. See the{' '}
                <a href="/components/icon" className="text-link underline hover:text-brand-primary">Icon</a>{' '}
                page for available names.
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle">aria-label</code></TableCell>
              <TableCell><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle">string</code></TableCell>
              <TableCell>—</TableCell>
              <TableCell>Accessible label. Required — there is no visible text.</TableCell>
            </TableRow>
            <TableRow>
              <TableCell><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle">variant</code></TableCell>
              <TableCell><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle">&#39;primary&#39; | &#39;secondary&#39; | &#39;tertiary&#39; | &#39;destructive&#39;</code></TableCell>
              <TableCell><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle">&#39;secondary&#39;</code></TableCell>
              <TableCell>Visual style. Passed through to Button.</TableCell>
            </TableRow>
            <TableRow>
              <TableCell><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle">size</code></TableCell>
              <TableCell><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle">&#39;sm&#39; | &#39;md&#39; | &#39;lg&#39;</code></TableCell>
              <TableCell><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle">&#39;md&#39;</code></TableCell>
              <TableCell>Controls square dimensions (32 / 40 / 48px) and icon size.</TableCell>
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
              <TableCell>Merged via cn(). Use for layout utilities only — never override variant styles.</TableCell>
            </TableRow>
          </TableBody>
        </Table>
        </div>
        <div className="block md:hidden">
          <TableMobileList>
            <TableMobileItem>
              <span className="type-body-sm text-foreground"><strong>icon</strong></span>
              <span className="type-caption text-muted-foreground"><code className="rounded px-1 py-0.5 font-mono bg-surface-subtle">IconName</code> · required</span>
              <span className="type-caption text-muted-foreground">Lucide icon name in kebab-case. See the <a href="/components/icon" className="text-link underline hover:text-brand-primary">Icon</a> page for available names.</span>
            </TableMobileItem>
            <TableMobileItem>
              <span className="type-body-sm text-foreground"><strong>aria-label</strong></span>
              <span className="type-caption text-muted-foreground"><code className="rounded px-1 py-0.5 font-mono bg-surface-subtle">string</code> · required</span>
              <span className="type-caption text-muted-foreground">Accessible label. Required — there is no visible text.</span>
            </TableMobileItem>
            <TableMobileItem>
              <span className="type-body-sm text-foreground"><strong>variant</strong></span>
              <span className="type-caption text-muted-foreground"><code className="rounded px-1 py-0.5 font-mono bg-surface-subtle">&#39;primary&#39; | &#39;secondary&#39; | &#39;tertiary&#39; | &#39;destructive&#39;</code> · default <code className="rounded px-1 py-0.5 font-mono bg-surface-subtle">&#39;secondary&#39;</code></span>
              <span className="type-caption text-muted-foreground">Visual style. Passed through to Button.</span>
            </TableMobileItem>
            <TableMobileItem>
              <span className="type-body-sm text-foreground"><strong>size</strong></span>
              <span className="type-caption text-muted-foreground"><code className="rounded px-1 py-0.5 font-mono bg-surface-subtle">&#39;sm&#39; | &#39;md&#39; | &#39;lg&#39;</code> · default <code className="rounded px-1 py-0.5 font-mono bg-surface-subtle">&#39;md&#39;</code></span>
              <span className="type-caption text-muted-foreground">Controls square dimensions (32 / 40 / 48px) and icon size.</span>
            </TableMobileItem>
            <TableMobileItem>
              <span className="type-body-sm text-foreground"><strong>disabled</strong></span>
              <span className="type-caption text-muted-foreground"><code className="rounded px-1 py-0.5 font-mono bg-surface-subtle">boolean</code> · default <code className="rounded px-1 py-0.5 font-mono bg-surface-subtle">false</code></span>
              <span className="type-caption text-muted-foreground">Disables the button, reducing opacity and blocking pointer events.</span>
            </TableMobileItem>
            <TableMobileItem>
              <span className="type-body-sm text-foreground"><strong>className</strong></span>
              <span className="type-caption text-muted-foreground"><code className="rounded px-1 py-0.5 font-mono bg-surface-subtle">string</code></span>
              <span className="type-caption text-muted-foreground">Merged via cn(). Use for layout utilities only — never override variant styles.</span>
            </TableMobileItem>
          </TableMobileList>
        </div>
      </div>

    </Container>
  )
}
