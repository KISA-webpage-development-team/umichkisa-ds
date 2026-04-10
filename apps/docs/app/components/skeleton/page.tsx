import {
  Alert,
  Container,
  Skeleton,
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

const defaultCode = `import { Skeleton } from '@umichkisa-ds/web'

<div className="flex flex-col gap-4 w-full">
  <Skeleton className="h-6 w-2/5" />
  <Skeleton className="h-32" />
</div>`

const circularCode = `import { Skeleton } from '@umichkisa-ds/web'

<Skeleton variant="circular" className="h-14 w-14" />`

const textBlockCode = `import { Skeleton } from '@umichkisa-ds/web'

<div className="flex flex-col gap-2 w-full">
  <Skeleton className="h-4 w-3/4" />
  <Skeleton className="h-4" />
  <Skeleton className="h-4 w-5/6" />
</div>`

const cardCompositionCode = `import { Skeleton } from '@umichkisa-ds/web'

<div className="flex items-start gap-4 p-4 rounded-md border border-border w-full">
  <Skeleton variant="circular" className="h-10 w-10 shrink-0" />
  <div className="flex flex-col gap-2 flex-1">
    <Skeleton className="h-4 w-1/3" />
    <Skeleton className="h-4" />
    <Skeleton className="h-4 w-5/6" />
  </div>
</div>`

export default async function SkeletonPage() {
  const [defaultHighlighted, circularHighlighted, textBlockHighlighted, cardCompositionHighlighted] = await Promise.all([
    highlight(defaultCode),
    highlight(circularCode),
    highlight(textBlockCode),
    highlight(cardCompositionCode),
  ]);

  return (
    <Container size="md" as="article">

      {/* ── Header ──────────────────────────────────────────── */}
      <h1 className="type-h1 mb-4 text-foreground">Skeleton</h1>
      <p className="type-body mb-8 text-foreground max-w-prose">
        Visual placeholder for content that is loading. Renders a pulsing block
        that approximates the shape of the real content, reducing perceived wait
        time and helping prevent layout shift when dimensions match the final
        content. Consumer controls dimensions via{' '}
        <InlineCode>
          className
        </InlineCode>.
        The skeleton pulses automatically using a CSS opacity animation.
      </p>
      <Alert variant="info" className="mb-8">
        <p className="type-body-sm text-foreground">
          When grouping multiple skeletons as a loading state, wrap them in a
          container with{' '}
          <InlineCode>
            aria-busy=&quot;true&quot;
          </InlineCode>{' '}
          to communicate the loading state to screen readers.
        </p>
      </Alert>

      {/* ── Examples ────────────────────────────────────────── */}
      <Heading as="h2">Examples</Heading>

      {/* Default */}
      <Heading as="h3" className="mt-6">Default</Heading>
      <p className="type-body mb-2 text-foreground max-w-prose">
        A heading placeholder with a content block below. Set dimensions with
        Tailwind height and width utilities.
      </p>
      <ComponentPreview code={defaultCode} highlightedCode={defaultHighlighted}>
        <div className="flex flex-col gap-4 w-full">
          <Skeleton className="h-6 w-2/5" />
          <Skeleton className="h-32" />
        </div>
      </ComponentPreview>

      {/* Circular */}
      <Heading as="h3">Circular</Heading>
      <p className="type-body mb-2 text-foreground max-w-prose">
        Use{' '}
        <InlineCode>
          variant=&quot;circular&quot;
        </InlineCode>{' '}
        for avatar or icon placeholders. Provide explicit width and height.
      </p>
      <ComponentPreview code={circularCode} highlightedCode={circularHighlighted}>
        <Skeleton variant="circular" className="h-14 w-14" />
      </ComponentPreview>

      {/* Text block */}
      <Heading as="h3">Text block</Heading>
      <p className="type-body mb-2 text-foreground max-w-prose">
        Stack multiple skeletons with varying widths to approximate a paragraph.
      </p>
      <ComponentPreview code={textBlockCode} highlightedCode={textBlockHighlighted}>
        <div className="flex flex-col gap-2 w-full">
          <Skeleton className="h-4 w-3/4" />
          <Skeleton className="h-4" />
          <Skeleton className="h-4 w-5/6" />
        </div>
      </ComponentPreview>

      {/* Card composition */}
      <Heading as="h3">Card composition</Heading>
      <p className="type-body mb-2 text-foreground max-w-prose">
        Combine circular and rectangular skeletons to create a realistic loading
        state for a card with an avatar and text content.
      </p>
      <ComponentPreview code={cardCompositionCode} highlightedCode={cardCompositionHighlighted}>
        <div className="flex items-start gap-4 p-4 rounded-md border border-border w-full">
          <Skeleton variant="circular" className="h-10 w-10 shrink-0" />
          <div className="flex flex-col gap-2 flex-1">
            <Skeleton className="h-4 w-1/3" />
            <Skeleton className="h-4" />
            <Skeleton className="h-4 w-5/6" />
          </div>
        </div>
      </ComponentPreview>

      {/* ── API Reference ────────────────────────────────────── */}
      <Heading as="h2">API Reference</Heading>
      <p className="type-body mb-4 text-foreground max-w-prose">
        All props are optional. Extends native{' '}
        <InlineCode>
          &lt;div&gt;
        </InlineCode>{' '}
        attributes.
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
                <TableCell><InlineCode>variant</InlineCode></TableCell>
                <TableCell><InlineCode>&#39;rectangular&#39; | &#39;circular&#39;</InlineCode></TableCell>
                <TableCell><InlineCode>&#39;rectangular&#39;</InlineCode></TableCell>
                <TableCell>Shape of the placeholder. Rectangular applies <InlineCode>rounded-md</InlineCode>; circular applies full rounding for avatars.</TableCell>
              </TableRow>
              <TableRow>
                <TableCell><InlineCode>className</InlineCode></TableCell>
                <TableCell><InlineCode>string</InlineCode></TableCell>
                <TableCell>—</TableCell>
                <TableCell>Controls dimensions and layout. Use height and width utilities to match the content being replaced.</TableCell>
              </TableRow>
              <TableRow>
                <TableCell><InlineCode>…rest</InlineCode></TableCell>
                <TableCell><InlineCode>HTMLDivAttributes</InlineCode></TableCell>
                <TableCell>—</TableCell>
                <TableCell>Forwarded to the underlying <InlineCode>&lt;div&gt;</InlineCode> (e.g. <InlineCode>aria-hidden</InlineCode>, <InlineCode>role</InlineCode>, <InlineCode>style</InlineCode>).</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
        <div className="block md:hidden">
          <TableMobileList>
            <TableMobileItem>
              <span className="type-body-sm text-foreground"><strong>variant</strong></span>
              <span className="type-caption text-muted-foreground"><InlineCode>&#39;rectangular&#39; | &#39;circular&#39;</InlineCode> · default <InlineCode>&#39;rectangular&#39;</InlineCode></span>
              <span className="type-caption text-muted-foreground">Shape of the placeholder. Rectangular applies <InlineCode>rounded-md</InlineCode>; circular applies full rounding for avatars.</span>
            </TableMobileItem>
            <TableMobileItem>
              <span className="type-body-sm text-foreground"><strong>className</strong></span>
              <span className="type-caption text-muted-foreground"><InlineCode>string</InlineCode></span>
              <span className="type-caption text-muted-foreground">Controls dimensions and layout. Use height and width utilities to match the content being replaced.</span>
            </TableMobileItem>
            <TableMobileItem>
              <span className="type-body-sm text-foreground"><strong>…rest</strong></span>
              <span className="type-caption text-muted-foreground"><InlineCode>HTMLDivAttributes</InlineCode></span>
              <span className="type-caption text-muted-foreground">Forwarded to the underlying <InlineCode>&lt;div&gt;</InlineCode> (e.g. <InlineCode>aria-hidden</InlineCode>, <InlineCode>role</InlineCode>, <InlineCode>style</InlineCode>).</span>
            </TableMobileItem>
          </TableMobileList>
        </div>
      </div>

    </Container>
  )
}
