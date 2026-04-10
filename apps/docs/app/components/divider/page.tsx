import {
  Container,
  Divider,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableMobileItem,
  TableMobileList,
  TableRow,
} from '@umichkisa-ds/web'
import { ComponentPreview } from '@/components/ComponentPreview'
import { InlineCode } from '@/components/InlineCode'
import { highlight } from '@/lib/highlight'
import { Heading } from '@/components/Heading'

const defaultCode = `import { Divider } from '@umichkisa-ds/web'

<Divider />`

const verticalCode = `import { Divider } from '@umichkisa-ds/web'

<div className="flex items-center gap-4 h-8">
  <span>Left</span>
  <Divider orientation="vertical" />
  <span>Right</span>
</div>`

const separatorCode = `import { Divider } from '@umichkisa-ds/web'

<div className="flex flex-col gap-4">
  <p>First item</p>
  <Divider />
  <p>Second item</p>
  <Divider />
  <p>Third item</p>
</div>`

export default async function DividerPage() {
  const [
    defaultHighlighted,
    verticalHighlighted,
    separatorHighlighted,
  ] = await Promise.all([
    highlight(defaultCode),
    highlight(verticalCode),
    highlight(separatorCode),
  ])

  return (
    <Container size="md" as="article">

      {/* ── Header ──────────────────────────────────────────── */}
      <h1 className="type-h1 mb-4 text-foreground">Divider</h1>
      <p className="type-body mb-8 text-foreground max-w-prose">
        A visual separator that divides content into distinct sections. Renders as
        a semantic{' '}
        <InlineCode>
          hr
        </InlineCode>{' '}
        element with{' '}
        <InlineCode>
          role=&quot;separator&quot;
        </InlineCode>{' '}
        and supports both horizontal and vertical orientations.
      </p>

      {/* ── Examples ────────────────────────────────────────── */}
      <Heading as="h2">Examples</Heading>

      {/* Default */}
      <Heading as="h3" className="mt-6">Default</Heading>
      <p className="type-body mb-2 text-foreground max-w-prose">
        No props required. Renders a horizontal line spanning the full width of
        its container.
      </p>
      <ComponentPreview code={defaultCode} highlightedCode={defaultHighlighted}>
        <Divider />
      </ComponentPreview>

      {/* Vertical */}
      <Heading as="h3" className="mt-6">Vertical</Heading>
      <p className="type-body mb-2 text-foreground max-w-prose">
        Set{' '}
        <InlineCode>
          orientation=&quot;vertical&quot;
        </InlineCode>{' '}
        to render a vertical separator. Place inside a flex container so it
        stretches to match the height of its siblings.
      </p>
      <ComponentPreview code={verticalCode} highlightedCode={verticalHighlighted}>
        <div className="flex items-center gap-4 h-8">
          <span className="type-body text-foreground">Left</span>
          <Divider orientation="vertical" />
          <span className="type-body text-foreground">Right</span>
        </div>
      </ComponentPreview>

      {/* Content separator */}
      <Heading as="h3" className="mt-6">Content separator</Heading>
      <p className="type-body mb-2 text-foreground max-w-prose">
        A common pattern: stacked items separated by horizontal dividers.
      </p>
      <ComponentPreview code={separatorCode} highlightedCode={separatorHighlighted}>
        <div className="flex flex-col gap-4">
          <p className="type-body text-foreground">First item</p>
          <Divider />
          <p className="type-body text-foreground">Second item</p>
          <Divider />
          <p className="type-body text-foreground">Third item</p>
        </div>
      </ComponentPreview>

      {/* ── API Reference ────────────────────────────────────── */}
      <Heading as="h2">API Reference</Heading>
      <p className="type-body mb-4 text-foreground max-w-prose">
        All props are optional. Any additional props are forwarded to the
        underlying{' '}
        <InlineCode>
          hr
        </InlineCode>{' '}
        element.
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
                <TableCell><InlineCode>orientation</InlineCode></TableCell>
                <TableCell><InlineCode>&#39;horizontal&#39; | &#39;vertical&#39;</InlineCode></TableCell>
                <TableCell><InlineCode>&#39;horizontal&#39;</InlineCode></TableCell>
                <TableCell>The axis along which the divider is rendered.</TableCell>
              </TableRow>
              <TableRow>
                <TableCell><InlineCode>className</InlineCode></TableCell>
                <TableCell><InlineCode>string</InlineCode></TableCell>
                <TableCell>—</TableCell>
                <TableCell>Additional CSS classes to apply to the divider.</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
        <div className="block md:hidden">
          <TableMobileList>
            <TableMobileItem>
              <span className="type-body-sm text-foreground"><strong>orientation</strong></span>
              <span className="type-caption text-muted-foreground"><InlineCode>&#39;horizontal&#39; | &#39;vertical&#39;</InlineCode> · default <InlineCode>&#39;horizontal&#39;</InlineCode></span>
              <span className="type-caption text-muted-foreground">The axis along which the divider is rendered.</span>
            </TableMobileItem>
            <TableMobileItem>
              <span className="type-body-sm text-foreground"><strong>className</strong></span>
              <span className="type-caption text-muted-foreground"><InlineCode>string</InlineCode></span>
              <span className="type-caption text-muted-foreground">Additional CSS classes to apply to the divider.</span>
            </TableMobileItem>
          </TableMobileList>
        </div>
      </div>

    </Container>
  )
}
