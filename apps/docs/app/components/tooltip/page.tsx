import {
  Container,
  Alert,
  Tooltip,
  IconButton,
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
import { highlight } from '@/lib/highlight'
import { Heading } from '@/components/Heading'
import { InlineCode } from '@/components/InlineCode'

const defaultCode = `import { Tooltip, IconButton } from '@umichkisa-ds/web'

<Tooltip content="Delete item">
  <IconButton icon="trash-2" aria-label="Delete item" />
</Tooltip>`

const truncatedCode = `import { Tooltip } from '@umichkisa-ds/web'

<Tooltip content="This is the full text that was truncated">
  <span className="block max-w-32 truncate">
    This is the full text that was truncated
  </span>
</Tooltip>`

const placementCode = `import { Tooltip, IconButton } from '@umichkisa-ds/web'

<Tooltip content="Top" side="top">
  <IconButton icon="info" aria-label="Top" />
</Tooltip>
<Tooltip content="Right" side="right">
  <IconButton icon="info" aria-label="Right" />
</Tooltip>
<Tooltip content="Bottom" side="bottom">
  <IconButton icon="info" aria-label="Bottom" />
</Tooltip>
<Tooltip content="Left" side="left">
  <IconButton icon="info" aria-label="Left" />
</Tooltip>`

const delayCode = `import { Tooltip, IconButton } from '@umichkisa-ds/web'

<Tooltip content="Slow tooltip" delayDuration={800}>
  <IconButton icon="clock-9" aria-label="Slow tooltip" />
</Tooltip>`

export default async function TooltipPage() {
  const [
    defaultHighlighted,
    truncatedHighlighted,
    placementHighlighted,
    delayHighlighted,
  ] = await Promise.all([
    highlight(defaultCode),
    highlight(truncatedCode),
    highlight(placementCode),
    highlight(delayCode),
  ])

  return (
    <Container size="md" as="article">

      {/* ── Header ──────────────────────────────────────────── */}
      <h1 className="type-h1 mb-4 text-foreground">Tooltip</h1>
      <p className="type-body mb-4 text-foreground max-w-prose">
        Informational text label that appears on hover or focus. Use for
        icon-only buttons, truncated text, or any element that benefits from a
        short textual hint. When wrapping icon-only buttons, the tooltip
        content should match the trigger&apos;s{' '}
        <InlineCode>
          aria-label
        </InlineCode>{' '}
        so screen readers and sighted users receive the same information.
      </p>
      <Alert variant="warning" className="mb-8">
        Tooltips fire on hover and keyboard focus only — they do not appear on
        touch devices. Tooltip content must never be essential. If the
        information needs to be reachable on touch, use Popover instead.
      </Alert>

      {/* ── Guidelines ─────────────────────────────────────── */}
      <Heading as="h2">Guidelines</Heading>
      <p className="type-body mb-2 text-foreground max-w-prose">
        Tooltip is a supplementary hint pattern. It exists to give sighted
        desktop users extra context that is already conveyed elsewhere — never
        as the sole carrier of information.
      </p>

      <Heading as="h3" className="mt-6">Use Tooltip for</Heading>
      <ul className="type-body mb-4 text-foreground max-w-prose list-disc pl-6 space-y-1">
        <li>Labeling icon-only buttons (match the trigger&apos;s <InlineCode>aria-label</InlineCode> exactly).</li>
        <li>Revealing the full content of truncated text on hover.</li>
        <li>Short, supplementary hints that complement the visible UI.</li>
      </ul>

      <Heading as="h3">Don&apos;t</Heading>
      <ul className="type-body mb-4 text-foreground max-w-prose list-disc pl-6 space-y-1">
        <li>Put essential information inside a tooltip — touch users will never see it.</li>
        <li>Use Tooltip for content the user must read. Reach for Popover instead.</li>
        <li>Place long text, paragraphs, or multi-line copy inside a tooltip.</li>
        <li>Place interactive content (links, buttons, inputs) inside a tooltip.</li>
      </ul>

      {/* ── Examples ────────────────────────────────────────── */}
      <Heading as="h2">Examples</Heading>

      {/* Default */}
      <Heading as="h3" className="mt-6">Default</Heading>
      <p className="type-body mb-2 text-foreground max-w-prose">
        Wrap any trigger element. The tooltip appears on hover and focus.
      </p>
      <ComponentPreview code={defaultCode} highlightedCode={defaultHighlighted}>
        <Tooltip content="Delete item">
          <IconButton icon="trash-2" aria-label="Delete item" />
        </Tooltip>
      </ComponentPreview>

      {/* On text */}
      <Heading as="h3">On truncated text</Heading>
      <p className="type-body mb-2 text-foreground max-w-prose">
        Wrap truncated text to reveal the full content on hover.
      </p>
      <ComponentPreview code={truncatedCode} highlightedCode={truncatedHighlighted}>
        <Tooltip content="This is the full text that was truncated because it is too long to display">
          <span className="type-body-sm text-foreground block max-w-32 truncate">
            This is the full text that was truncated because it is too long to display
          </span>
        </Tooltip>
      </ComponentPreview>

      {/* Placement */}
      <Heading as="h3">Placement</Heading>
      <p className="type-body mb-2 text-foreground max-w-prose">
        Use the{' '}
        <InlineCode>
          side
        </InlineCode>{' '}
        prop to control which side of the trigger the tooltip appears on.
        Radix automatically flips to an available side if the preferred one
        would overflow the viewport.
      </p>
      <ComponentPreview code={placementCode} highlightedCode={placementHighlighted}>
        <div className="flex items-center gap-4">
          <Tooltip content="Top" side="top">
            <IconButton icon="info" aria-label="Top" />
          </Tooltip>
          <Tooltip content="Right" side="right">
            <IconButton icon="info" aria-label="Right" />
          </Tooltip>
          <Tooltip content="Bottom" side="bottom">
            <IconButton icon="info" aria-label="Bottom" />
          </Tooltip>
          <Tooltip content="Left" side="left">
            <IconButton icon="info" aria-label="Left" />
          </Tooltip>
        </div>
      </ComponentPreview>

      {/* Custom delay */}
      <Heading as="h3">Custom delay</Heading>
      <p className="type-body mb-2 text-foreground max-w-prose">
        Override{' '}
        <InlineCode>
          delayDuration
        </InlineCode>{' '}
        to control how long (in milliseconds) the user must hover before
        the tooltip appears. Default is 200ms.
      </p>
      <ComponentPreview code={delayCode} highlightedCode={delayHighlighted}>
        <Tooltip content="Slow tooltip" delayDuration={800}>
          <IconButton icon="clock-9" aria-label="Slow tooltip" />
        </Tooltip>
      </ComponentPreview>

      {/* ── API Reference ────────────────────────────────────── */}
      <Heading as="h2">API Reference</Heading>
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
                <TableCell><InlineCode>content<span aria-label="required">*</span></InlineCode></TableCell>
                <TableCell><InlineCode>string</InlineCode></TableCell>
                <TableCell className="text-muted-foreground">—</TableCell>
                <TableCell>Text displayed in the tooltip bubble. Required.</TableCell>
              </TableRow>
              <TableRow>
                <TableCell><InlineCode>children<span aria-label="required">*</span></InlineCode></TableCell>
                <TableCell><InlineCode>ReactNode</InlineCode></TableCell>
                <TableCell className="text-muted-foreground">—</TableCell>
                <TableCell>The trigger element. Native elements and DS components work out of the box.</TableCell>
              </TableRow>
              <TableRow>
                <TableCell><InlineCode>side</InlineCode></TableCell>
                <TableCell><InlineCode>&quot;top&quot; | &quot;right&quot; | &quot;bottom&quot; | &quot;left&quot;</InlineCode></TableCell>
                <TableCell><InlineCode>&quot;top&quot;</InlineCode></TableCell>
                <TableCell>Preferred side of the trigger. Flips automatically on overflow.</TableCell>
              </TableRow>
              <TableRow>
                <TableCell><InlineCode>delayDuration</InlineCode></TableCell>
                <TableCell><InlineCode>number</InlineCode></TableCell>
                <TableCell><InlineCode>200</InlineCode></TableCell>
                <TableCell>Milliseconds to wait before showing the tooltip on hover.</TableCell>
              </TableRow>
            </TableBody>
          </Table>
          <p className="type-caption mt-2 text-muted-foreground">* Required prop.</p>
        </div>
        <div className="block md:hidden">
          <TableMobileList>
            <TableMobileItem>
              <span className="type-body-sm text-foreground"><strong>content<span aria-label="required">*</span></strong></span>
              <span className="type-caption text-muted-foreground"><InlineCode>string</InlineCode></span>
              <span className="type-caption text-muted-foreground">Text displayed in the tooltip bubble. Required.</span>
            </TableMobileItem>
            <TableMobileItem>
              <span className="type-body-sm text-foreground"><strong>children<span aria-label="required">*</span></strong></span>
              <span className="type-caption text-muted-foreground"><InlineCode>ReactNode</InlineCode></span>
              <span className="type-caption text-muted-foreground">The trigger element. Native elements and DS components work out of the box.</span>
            </TableMobileItem>
            <TableMobileItem>
              <span className="type-body-sm text-foreground"><strong>side</strong></span>
              <span className="type-caption text-muted-foreground"><InlineCode>&quot;top&quot; | &quot;right&quot; | &quot;bottom&quot; | &quot;left&quot;</InlineCode> · default <InlineCode>&quot;top&quot;</InlineCode></span>
              <span className="type-caption text-muted-foreground">Preferred side of the trigger. Flips automatically on overflow.</span>
            </TableMobileItem>
            <TableMobileItem>
              <span className="type-body-sm text-foreground"><strong>delayDuration</strong></span>
              <span className="type-caption text-muted-foreground"><InlineCode>number</InlineCode> · default <InlineCode>200</InlineCode></span>
              <span className="type-caption text-muted-foreground">Milliseconds to wait before showing the tooltip on hover.</span>
            </TableMobileItem>
          </TableMobileList>
          <p className="type-caption mt-2 text-muted-foreground">* Required prop.</p>
        </div>
      </div>

    </Container>
  )
}
