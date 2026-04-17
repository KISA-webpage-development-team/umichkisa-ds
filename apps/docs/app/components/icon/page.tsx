import {
  Container,
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
import { IconRegistryGrid } from '@/components/IconRegistryGrid'
import { highlight } from '@/lib/highlight'
import { Heading } from '@/components/Heading'
import { InlineCode } from '@/components/InlineCode'

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
      <h1 className="type-h1 mb-4 text-foreground">Icon</h1>
      <p className="type-body mb-8 text-foreground max-w-prose">
        The single canonical way to render icons in the KISA design system. Wraps
        Lucide icons with consistent sizing, color inheritance via{' '}
        <InlineCode>
          currentColor
        </InlineCode>
        , and built-in accessibility handling.
      </p>

      {/* ── Examples ────────────────────────────────────────── */}
      <Heading as="h2">Examples</Heading>

      {/* Default */}
      <Heading as="h3" className="mt-6">Default</Heading>
      <p className="type-body mb-2 text-foreground max-w-prose">
        No props beyond{' '}
        <InlineCode>
          name
        </InlineCode>
        . Renders at{' '}
        <InlineCode>
          md
        </InlineCode>{' '}
        (20px) by default. Decorative — screen readers ignore it.
      </p>
      <ComponentPreview code={defaultCode} highlightedCode={defaultHighlighted}>
        <Icon name="arrow-right" />
      </ComponentPreview>

      {/* Sizes */}
      <Heading as="h3">Sizes</Heading>
      <p className="type-body mb-2 text-foreground max-w-prose">
        Five size tokens map to fixed pixel values on a 4px grid. Use{' '}
        <InlineCode>
          md
        </InlineCode>{' '}
        (default) for most UI.
      </p>
      <SizesExample />

      {/* Color */}
      <Heading as="h3">Color</Heading>
      <p className="type-body mb-2 text-foreground max-w-prose">
        Icons inherit{' '}
        <InlineCode>
          currentColor
        </InlineCode>
        . Set color on the wrapping element using semantic tokens — never pass a color
        prop directly to{' '}
        <InlineCode>
          &lt;Icon&gt;
        </InlineCode>
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
      <Heading as="h3">With a label</Heading>
      <p className="type-body mb-2 text-foreground max-w-prose">
        Provide{' '}
        <InlineCode>
          label
        </InlineCode>{' '}
        when the icon carries meaning with no visible text nearby. The component sets{' '}
        <InlineCode>
          aria-label
        </InlineCode>{' '}
        on the SVG so screen readers announce it.
      </p>
      <ComponentPreview code={labelCode} highlightedCode={labelHighlighted}>
        <Icon name="thumbs-up" label="Liked" />
      </ComponentPreview>

      {/* Interactive icons */}
      <Heading as="h3">Interactive icons</Heading>
      <p className="type-body mb-2 text-foreground max-w-prose">
        <InlineCode>
          &lt;Icon&gt;
        </InlineCode>{' '}
        is never interactive — it has no hit target, no focus ring, and no accessible
        role. For interactive icons (toolbar actions, close buttons, menu triggers),
        use{' '}
        <InlineCode>
          &lt;IconButton&gt;
        </InlineCode>
        . It provides the accessible label, focus behavior, and 44×44px touch target
        for free.
      </p>
      <ComponentPreview code={buttonCode} highlightedCode={buttonHighlighted}>
        <IconButton aria-label="Delete" icon="trash-2" />
      </ComponentPreview>

      {/* ── Available Icons ──────────────────────────────────── */}
      <Heading as="h2">Available Icons</Heading>
      <IconRegistryGrid />

      {/* ── API Reference ────────────────────────────────────── */}
      <Heading as="h2">API Reference</Heading>
      <p className="type-body mb-4 text-foreground max-w-prose">
        All props except{' '}
        <InlineCode>
          name
        </InlineCode>{' '}
        are optional.{' '}
        <InlineCode>
          name
        </InlineCode>{' '}
        must be a registered{' '}
        <InlineCode>
          IconName
        </InlineCode>{' '}
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
              <TableCell><InlineCode>name<span aria-label="required">*</span></InlineCode></TableCell>
              <TableCell><InlineCode>IconName</InlineCode></TableCell>
              <TableCell>—</TableCell>
              <TableCell>Required. Lucide icon name in kebab-case. Must be a key in the DS registry.</TableCell>
            </TableRow>
            <TableRow>
              <TableCell><InlineCode>size</InlineCode></TableCell>
              <TableCell><InlineCode>&#39;xs&#39; | &#39;sm&#39; | &#39;md&#39; | &#39;lg&#39; | &#39;xl&#39;</InlineCode></TableCell>
              <TableCell><InlineCode>&#39;md&#39;</InlineCode></TableCell>
              <TableCell>Maps to a fixed pixel size (12 / 16 / 20 / 24 / 32).</TableCell>
            </TableRow>
            <TableRow>
              <TableCell><InlineCode>label</InlineCode></TableCell>
              <TableCell><InlineCode>string</InlineCode></TableCell>
              <TableCell>—</TableCell>
              <TableCell>
                When provided: sets{' '}
                <InlineCode>aria-label</InlineCode>{' '}
                on the SVG so screen readers announce it. When omitted:{' '}
                <InlineCode>aria-hidden=&quot;true&quot;</InlineCode>.
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell><InlineCode>className</InlineCode></TableCell>
              <TableCell><InlineCode>string</InlineCode></TableCell>
              <TableCell>—</TableCell>
              <TableCell>
                Layout utilities only (
                <InlineCode>block</InlineCode>
                ,{' '}
                <InlineCode>flex-shrink-0</InlineCode>
                ). Never use for color or size.
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
          <p className="type-caption mt-2 text-muted-foreground">* Required prop.</p>
        </div>
        <div className="block md:hidden">
          <TableMobileList>
            <TableMobileItem>
              <span className="type-body-sm text-foreground"><strong>name<span aria-label="required">*</span></strong></span>
              <span className="type-caption text-muted-foreground"><InlineCode>IconName</InlineCode> · required</span>
              <span className="type-caption text-muted-foreground">Lucide icon name in kebab-case. Must be a key in the DS registry.</span>
            </TableMobileItem>
            <TableMobileItem>
              <span className="type-body-sm text-foreground"><strong>size</strong></span>
              <span className="type-caption text-muted-foreground"><InlineCode>&#39;xs&#39; | &#39;sm&#39; | &#39;md&#39; | &#39;lg&#39; | &#39;xl&#39;</InlineCode> · default <InlineCode>&#39;md&#39;</InlineCode></span>
              <span className="type-caption text-muted-foreground">Maps to a fixed pixel size (12 / 16 / 20 / 24 / 32).</span>
            </TableMobileItem>
            <TableMobileItem>
              <span className="type-body-sm text-foreground"><strong>label</strong></span>
              <span className="type-caption text-muted-foreground"><InlineCode>string</InlineCode></span>
              <span className="type-caption text-muted-foreground">When provided, sets <InlineCode>aria-label</InlineCode> on the SVG. When omitted, the icon is <InlineCode>aria-hidden</InlineCode>.</span>
            </TableMobileItem>
            <TableMobileItem>
              <span className="type-body-sm text-foreground"><strong>className</strong></span>
              <span className="type-caption text-muted-foreground"><InlineCode>string</InlineCode></span>
              <span className="type-caption text-muted-foreground">Layout utilities only (<InlineCode>block</InlineCode>, <InlineCode>flex-shrink-0</InlineCode>). Never use for color or size.</span>
            </TableMobileItem>
          </TableMobileList>
          <p className="type-caption mt-2 text-muted-foreground">* Required prop.</p>
        </div>
      </div>

    </Container>
  )
}
