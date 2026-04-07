import {
  Card,
  Container,
  Grid,
  Icon,
  IconButton,
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
import { SizesExample } from '@/components/SizesExample'
import { highlight } from '@/lib/highlight'

const defaultCode = `import { Icon } from '@umichkisa-ds/web'

<Icon name="arrow-right" />`

const colorCode = `import { Icon } from '@umichkisa-ds/web'

{/* Default — inherits foreground color */}
<Icon name="plus" />

{/* Brand color — set on the wrapper */}
<span className="text-brand-primary">
  <Icon name="plus" />
</span>

{/* Error state */}
<span className="text-error">
  <Icon name="plus" />
</span>`

const labelCode = `import { Icon } from '@umichkisa-ds/web'

{/* Decorative — aria-hidden="true" (default when label is omitted) */}
<Icon name="thumbs-up" />

{/* Semantic — aria-label set, screen readers will announce it */}
<Icon name="thumbs-up" label="Liked" />`

const buttonCode = `import { IconButton } from '@umichkisa-ds/web'

<IconButton aria-label="Delete" icon="trash-2" />`

export default async function IconPage() {
  const [defaultHighlighted, colorHighlighted, labelHighlighted, buttonHighlighted] = await Promise.all([
    highlight(defaultCode),
    highlight(colorCode),
    highlight(labelCode),
    highlight(buttonCode),
  ]);

  return (
    <Container size="md" as="article">

      {/* ── Header ──────────────────────────────────────────── */}
      <h1 className="type-h1 font-sejong-bold tracking-tight mb-4 text-foreground">Icon</h1>
      <p className="type-body mb-8 text-foreground max-w-prose">
        The single canonical way to render icons in the KISA design system. Wraps
        Lucide icons with consistent sizing, color inheritance via{' '}
        <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">
          currentColor
        </code>
        , and built-in accessibility handling.
      </p>

      {/* ── Examples ────────────────────────────────────────── */}
      <h2 className="type-h2 mt-8 mb-4 text-foreground">Examples</h2>

      {/* Default */}
      <h3 className="type-h3 mt-6 mb-2 text-foreground">Default</h3>
      <p className="type-body mb-2 text-foreground max-w-prose">
        No props beyond{' '}
        <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">
          name
        </code>
        . Renders at{' '}
        <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">
          md
        </code>{' '}
        (20px) by default. Decorative — screen readers ignore it.
      </p>
      <ComponentPreview code={defaultCode} highlightedCode={defaultHighlighted}>
        <Icon name="arrow-right" />
      </ComponentPreview>

      {/* Sizes */}
      <h3 className="type-h3 mt-8 mb-2 text-foreground">Sizes</h3>
      <p className="type-body mb-2 text-foreground max-w-prose">
        Five size tokens map to fixed pixel values on a 4px grid. Use{' '}
        <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">
          md
        </code>{' '}
        (default) for most UI.
      </p>
      <SizesExample />

      {/* Color */}
      <h3 className="type-h3 mt-8 mb-2 text-foreground">Color</h3>
      <p className="type-body mb-2 text-foreground max-w-prose">
        Icons inherit{' '}
        <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">
          currentColor
        </code>
        . Set color on the wrapping element using semantic tokens — never pass a color
        prop directly to{' '}
        <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">
          &lt;Icon&gt;
        </code>
        .
      </p>
      <ComponentPreview code={colorCode} highlightedCode={colorHighlighted}>
        <div className="flex items-center gap-4">
          <Icon name="plus" />
          <span className="text-brand-primary">
            <Icon name="plus" />
          </span>
          <span className="text-error">
            <Icon name="plus" />
          </span>
        </div>
      </ComponentPreview>

      {/* With a label */}
      <h3 className="type-h3 mt-8 mb-2 text-foreground">With a label</h3>
      <p className="type-body mb-2 text-foreground max-w-prose">
        Provide{' '}
        <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">
          label
        </code>{' '}
        when the icon carries meaning with no visible text nearby. The component sets{' '}
        <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">
          aria-label
        </code>{' '}
        on the SVG so screen readers announce it.
      </p>
      <ComponentPreview code={labelCode} highlightedCode={labelHighlighted}>
        <Icon name="thumbs-up" label="Liked" />
      </ComponentPreview>

      {/* Interactive icons */}
      <h3 className="type-h3 mt-8 mb-2 text-foreground">Interactive icons</h3>
      <p className="type-body mb-2 text-foreground max-w-prose">
        <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">
          &lt;Icon&gt;
        </code>{' '}
        is never interactive — it has no hit target, no focus ring, and no accessible
        role. For interactive icons (toolbar actions, close buttons, menu triggers),
        use{' '}
        <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">
          &lt;IconButton&gt;
        </code>
        . It provides the accessible label, focus behavior, and 44×44px touch target
        for free.
      </p>
      <ComponentPreview code={buttonCode} highlightedCode={buttonHighlighted}>
        <IconButton aria-label="Delete" icon="trash-2" />
      </ComponentPreview>

      {/* ── Available Icons ──────────────────────────────────── */}
      <h2 className="type-h2 mt-8 mb-4 text-foreground">Available Icons</h2>
      <p className="type-body-sm mb-4 text-muted-foreground max-w-prose">
        25 icons in the current registry (23 Lucide + 2 custom brand icons).
      </p>
      <Grid columns={{ base: 3, md: 4, lg: 6 }} gap="component" className="my-6">
        {([
          'arrow-left','arrow-right','chevron-right','chevron-down',
          'circle-minus','circle-plus','clock-9','external-link',
          'eye','graduation-cap','list','lock','mail','message-square',
          'minus','pencil','plus','reply','shopping-cart','thumbs-up',
          'ticket','trash-2','x','github','linkedin',
        ] as const).map((name) => (
          <Card key={name} className="items-center">
            <Icon name={name} size="md" />
            <p className="type-caption font-mono text-muted-foreground text-center break-all">{name}</p>
          </Card>
        ))}
      </Grid>

      {/* ── API Reference ────────────────────────────────────── */}
      <h2 className="type-h2 mt-8 mb-4 text-foreground">API Reference</h2>
      <p className="type-body mb-4 text-foreground max-w-prose">
        All props except{' '}
        <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">
          name
        </code>{' '}
        are optional.{' '}
        <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">
          name
        </code>{' '}
        must be a registered{' '}
        <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">
          IconName
        </code>{' '}
        — TypeScript will catch invalid names at compile time.
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
              <TableCell><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle">name</code></TableCell>
              <TableCell><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle">IconName</code></TableCell>
              <TableCell>—</TableCell>
              <TableCell>Required. Lucide icon name in kebab-case. Must be a key in the DS registry.</TableCell>
            </TableRow>
            <TableRow>
              <TableCell><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle">size</code></TableCell>
              <TableCell><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle">&#39;xs&#39; | &#39;sm&#39; | &#39;md&#39; | &#39;lg&#39; | &#39;xl&#39;</code></TableCell>
              <TableCell><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle">&#39;md&#39;</code></TableCell>
              <TableCell>Maps to a fixed pixel size (12 / 16 / 20 / 24 / 32).</TableCell>
            </TableRow>
            <TableRow>
              <TableCell><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle">label</code></TableCell>
              <TableCell><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle">string</code></TableCell>
              <TableCell>—</TableCell>
              <TableCell>
                When provided: sets{' '}
                <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">aria-label</code>{' '}
                on the SVG so screen readers announce it. When omitted:{' '}
                <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">aria-hidden=&quot;true&quot;</code>.
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle">className</code></TableCell>
              <TableCell><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle">string</code></TableCell>
              <TableCell>—</TableCell>
              <TableCell>
                Layout utilities only (
                <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">block</code>
                ,{' '}
                <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">flex-shrink-0</code>
                ). Never use for color or size.
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
        </div>
        <div className="block md:hidden">
          <TableMobileList>
            <TableMobileItem>
              <span className="type-body-sm text-foreground"><strong>name</strong></span>
              <span className="type-caption text-muted-foreground"><code className="rounded px-1 py-0.5 font-mono bg-surface-subtle">IconName</code> · required</span>
              <span className="type-caption text-muted-foreground">Lucide icon name in kebab-case. Must be a key in the DS registry.</span>
            </TableMobileItem>
            <TableMobileItem>
              <span className="type-body-sm text-foreground"><strong>size</strong></span>
              <span className="type-caption text-muted-foreground"><code className="rounded px-1 py-0.5 font-mono bg-surface-subtle">&#39;xs&#39; | &#39;sm&#39; | &#39;md&#39; | &#39;lg&#39; | &#39;xl&#39;</code> · default <code className="rounded px-1 py-0.5 font-mono bg-surface-subtle">&#39;md&#39;</code></span>
              <span className="type-caption text-muted-foreground">Maps to a fixed pixel size (12 / 16 / 20 / 24 / 32).</span>
            </TableMobileItem>
            <TableMobileItem>
              <span className="type-body-sm text-foreground"><strong>label</strong></span>
              <span className="type-caption text-muted-foreground"><code className="rounded px-1 py-0.5 font-mono bg-surface-subtle">string</code></span>
              <span className="type-caption text-muted-foreground">When provided, sets <code className="rounded px-1 py-0.5 font-mono bg-surface-subtle">aria-label</code> on the SVG. When omitted, the icon is <code className="rounded px-1 py-0.5 font-mono bg-surface-subtle">aria-hidden</code>.</span>
            </TableMobileItem>
            <TableMobileItem>
              <span className="type-body-sm text-foreground"><strong>className</strong></span>
              <span className="type-caption text-muted-foreground"><code className="rounded px-1 py-0.5 font-mono bg-surface-subtle">string</code></span>
              <span className="type-caption text-muted-foreground">Layout utilities only (<code className="rounded px-1 py-0.5 font-mono bg-surface-subtle">block</code>, <code className="rounded px-1 py-0.5 font-mono bg-surface-subtle">flex-shrink-0</code>). Never use for color or size.</span>
            </TableMobileItem>
          </TableMobileList>
        </div>
      </div>

    </Container>
  )
}
