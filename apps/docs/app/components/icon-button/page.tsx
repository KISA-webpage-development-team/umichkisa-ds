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
import { Heading } from '@/components/Heading'
import { InlineCode } from '@/components/InlineCode'

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
        <InlineCode>
          Button
        </InlineCode>
        &apos;s variants, sizes, and focus behavior. Requires{' '}
        <InlineCode>
          aria-label
        </InlineCode>{' '}
        for accessibility since there is no visible text.
      </p>

      {/* ── Examples ────────────────────────────────────────── */}
      <Heading as="h2">Examples</Heading>

      {/* Default */}
      <Heading as="h3" className="mt-6">Default</Heading>
      <p className="type-body mb-2 text-foreground max-w-prose">
        The simplest usage —{' '}
        <InlineCode>
          icon
        </InlineCode>{' '}
        and{' '}
        <InlineCode>
          aria-label
        </InlineCode>{' '}
        are the only required props.
      </p>
      <ComponentPreview code={defaultCode} highlightedCode={defaultHighlighted}>
        <IconButton icon="pencil" aria-label="Edit" />
      </ComponentPreview>

      {/* Variants */}
      <Heading as="h3">Variants</Heading>
      <p className="type-body mb-2 text-foreground max-w-prose">
        Four semantic variants matching{' '}
        <InlineCode>
          Button
        </InlineCode>
        . Use{' '}
        <InlineCode>
          primary
        </InlineCode>{' '}
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
      <Heading as="h3">Sizes</Heading>
      <p className="type-body mb-2 text-foreground max-w-prose">
        Three sizes producing square dimensions:{' '}
        <InlineCode>
          sm
        </InlineCode>{' '}
        (32px),{' '}
        <InlineCode>
          md
        </InlineCode>{' '}
        (40px),{' '}
        <InlineCode>
          lg
        </InlineCode>{' '}
        (48px). All sizes meet the 44px minimum touch target via an invisible{' '}
        <InlineCode>
          ::after
        </InlineCode>{' '}
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
      <Heading as="h3">Disabled</Heading>
      <p className="type-body mb-2 text-foreground max-w-prose">
        Pass{' '}
        <InlineCode>
          disabled
        </InlineCode>{' '}
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
      <Heading as="h3">With Tooltip</Heading>
      <p className="type-body mb-2 text-foreground max-w-prose">
        Wrap an{' '}
        <InlineCode>
          IconButton
        </InlineCode>{' '}
        in a{' '}
        <InlineCode>
          Tooltip
        </InlineCode>{' '}
        to expose its label to sighted users. The tooltip content must match{' '}
        <InlineCode>
          aria-label
        </InlineCode>{' '}
        exactly.
      </p>
      <ComponentPreview code={tooltipCode} highlightedCode={tooltipHighlighted}>
        <Tooltip content="Edit profile">
          <IconButton icon="pencil" aria-label="Edit profile" />
        </Tooltip>
      </ComponentPreview>

      {/* ── Accessibility ───────────────────────────────────── */}
      <Heading as="h2">Accessibility</Heading>
      <Alert variant="info" className="mb-4">
        <ul className="list-disc pl-5 space-y-1">
          <li>
            <InlineCode>aria-label</InlineCode>{' '}
            must describe the <strong>action</strong>, not the icon — use{' '}
            <em>&ldquo;Edit profile&rdquo;</em>, not <em>&ldquo;Edit&rdquo;</em> or{' '}
            <em>&ldquo;Pencil&rdquo;</em>.
          </li>
          <li>
            When wrapped in a{' '}
            <InlineCode>Tooltip</InlineCode>,
            the tooltip text must match{' '}
            <InlineCode>aria-label</InlineCode>{' '}
            exactly to avoid duplicate or conflicting screen-reader announcements.
          </li>
        </ul>
      </Alert>
      <p className="type-body text-foreground max-w-prose">
        All three sizes meet the WCAG 44×44px touch target. Even when the visible
        button is 32px (
        <InlineCode>size=&quot;sm&quot;</InlineCode>
        ), an invisible{' '}
        <InlineCode>::after</InlineCode>{' '}
        pseudo-element extends the hit area to 44×44 without changing the visible
        box.
      </p>

      {/* ── API Reference ────────────────────────────────────── */}
      <Heading as="h2">API Reference</Heading>
      <p className="type-body mb-4 text-foreground max-w-prose">
        <InlineCode>
          icon
        </InlineCode>{' '}
        and{' '}
        <InlineCode>
          aria-label
        </InlineCode>{' '}
        are required. All other native{' '}
        <InlineCode>
          &lt;button&gt;
        </InlineCode>{' '}
        attributes are forwarded to the underlying{' '}
        <InlineCode>
          Button
        </InlineCode>
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
              <TableCell><InlineCode>icon</InlineCode></TableCell>
              <TableCell><InlineCode>IconName</InlineCode></TableCell>
              <TableCell>—</TableCell>
              <TableCell>
                Lucide icon name in kebab-case. Required. See the{' '}
                <a href="/components/icon" className="text-link underline hover:text-brand-primary">Icon</a>{' '}
                page for available names.
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell><InlineCode>aria-label</InlineCode></TableCell>
              <TableCell><InlineCode>string</InlineCode></TableCell>
              <TableCell>—</TableCell>
              <TableCell>Accessible label. Required — there is no visible text.</TableCell>
            </TableRow>
            <TableRow>
              <TableCell><InlineCode>variant</InlineCode></TableCell>
              <TableCell><InlineCode>&#39;primary&#39; | &#39;secondary&#39; | &#39;tertiary&#39; | &#39;destructive&#39;</InlineCode></TableCell>
              <TableCell><InlineCode>&#39;secondary&#39;</InlineCode></TableCell>
              <TableCell>Visual style. Passed through to Button.</TableCell>
            </TableRow>
            <TableRow>
              <TableCell><InlineCode>size</InlineCode></TableCell>
              <TableCell><InlineCode>&#39;sm&#39; | &#39;md&#39; | &#39;lg&#39;</InlineCode></TableCell>
              <TableCell><InlineCode>&#39;md&#39;</InlineCode></TableCell>
              <TableCell>Controls square dimensions (32 / 40 / 48px) and icon size.</TableCell>
            </TableRow>
            <TableRow>
              <TableCell><InlineCode>disabled</InlineCode></TableCell>
              <TableCell><InlineCode>boolean</InlineCode></TableCell>
              <TableCell><InlineCode>false</InlineCode></TableCell>
              <TableCell>Disables the button, reducing opacity and blocking pointer events.</TableCell>
            </TableRow>
            <TableRow>
              <TableCell><InlineCode>className</InlineCode></TableCell>
              <TableCell><InlineCode>string</InlineCode></TableCell>
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
              <span className="type-caption text-muted-foreground"><InlineCode>IconName</InlineCode> · required</span>
              <span className="type-caption text-muted-foreground">Lucide icon name in kebab-case. See the <a href="/components/icon" className="text-link underline hover:text-brand-primary">Icon</a> page for available names.</span>
            </TableMobileItem>
            <TableMobileItem>
              <span className="type-body-sm text-foreground"><strong>aria-label</strong></span>
              <span className="type-caption text-muted-foreground"><InlineCode>string</InlineCode> · required</span>
              <span className="type-caption text-muted-foreground">Accessible label. Required — there is no visible text.</span>
            </TableMobileItem>
            <TableMobileItem>
              <span className="type-body-sm text-foreground"><strong>variant</strong></span>
              <span className="type-caption text-muted-foreground"><InlineCode>&#39;primary&#39; | &#39;secondary&#39; | &#39;tertiary&#39; | &#39;destructive&#39;</InlineCode> · default <InlineCode>&#39;secondary&#39;</InlineCode></span>
              <span className="type-caption text-muted-foreground">Visual style. Passed through to Button.</span>
            </TableMobileItem>
            <TableMobileItem>
              <span className="type-body-sm text-foreground"><strong>size</strong></span>
              <span className="type-caption text-muted-foreground"><InlineCode>&#39;sm&#39; | &#39;md&#39; | &#39;lg&#39;</InlineCode> · default <InlineCode>&#39;md&#39;</InlineCode></span>
              <span className="type-caption text-muted-foreground">Controls square dimensions (32 / 40 / 48px) and icon size.</span>
            </TableMobileItem>
            <TableMobileItem>
              <span className="type-body-sm text-foreground"><strong>disabled</strong></span>
              <span className="type-caption text-muted-foreground"><InlineCode>boolean</InlineCode> · default <InlineCode>false</InlineCode></span>
              <span className="type-caption text-muted-foreground">Disables the button, reducing opacity and blocking pointer events.</span>
            </TableMobileItem>
            <TableMobileItem>
              <span className="type-body-sm text-foreground"><strong>className</strong></span>
              <span className="type-caption text-muted-foreground"><InlineCode>string</InlineCode></span>
              <span className="type-caption text-muted-foreground">Merged via cn(). Use for layout utilities only — never override variant styles.</span>
            </TableMobileItem>
          </TableMobileList>
        </div>
      </div>

    </Container>
  )
}
