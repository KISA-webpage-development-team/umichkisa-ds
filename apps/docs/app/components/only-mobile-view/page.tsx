import {
  Alert,
  Container,
  Icon,
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

const basicCode = `import { OnlyMobileView } from '@umichkisa-ds/web'

<OnlyMobileView>
  <div className="p-4">
    <h1 className="type-h3 text-foreground">Mobile App</h1>
    <p className="type-body text-foreground">This content is only visible on mobile screens.</p>
  </div>
</OnlyMobileView>`

const customMessageCode = `import { OnlyMobileView } from '@umichkisa-ds/web'

<OnlyMobileView message="Please use a mobile device to access this page.">
  <div className="p-4">
    <h1 className="type-h3 text-foreground">Mobile App</h1>
    <p className="type-body text-foreground">This content is only visible on mobile screens.</p>
  </div>
</OnlyMobileView>`

export default async function OnlyMobileViewPage() {
  const [basicHighlighted, customMessageHighlighted] = await Promise.all([
    highlight(basicCode),
    highlight(customMessageCode),
  ]);

  return (
    <Container size="md" as="article">

      {/* -- Header -------------------------------------------------- */}
      <h1 className="type-h1 mb-4 text-foreground">OnlyMobileView</h1>
      <p className="type-body mb-4 text-foreground max-w-prose">
        Gate component that renders its children on mobile screens and displays
        a full-screen overlay on desktop, indicating the page is mobile-only.
      </p>
      <Alert variant="info" className="mb-8 max-w-prose">
        Place <InlineCode>OnlyMobileView</InlineCode> as the outermost wrapper of your page. At <InlineCode>≥768px</InlineCode>, children are hidden and a fixed overlay covers the viewport, including navigation.
      </Alert>

      {/* -- Examples ------------------------------------------------- */}
      <Heading as="h2">Examples</Heading>

      {/* Basic */}
      <Heading as="h3" className="mt-6">Basic</Heading>
      <p className="type-body mb-2 text-foreground max-w-prose">
        Wrap page content in <InlineCode>OnlyMobileView</InlineCode>. Below 768px the children render; at or above 768px the overlay replaces them.
      </p>
      <p className="type-body-sm mb-4 text-muted-foreground max-w-prose">
        The panels below are illustrative — the real component covers the full viewport, so both states are shown side by side here.
      </p>
      <ComponentPreview code={basicCode} highlightedCode={basicHighlighted}>
        <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Mobile (<768px) panel */}
          <div className="flex flex-col">
            <span className="type-caption text-muted-foreground mb-2">Mobile (&lt;768px)</span>
            <div className="relative h-48 border border-border rounded-md overflow-hidden bg-surface">
              <div className="p-4">
                <p className="type-h3 text-foreground">Mobile App</p>
                <p className="type-body text-foreground">This content is only visible on mobile screens.</p>
              </div>
            </div>
          </div>
          {/* Desktop (≥768px) panel */}
          <div className="flex flex-col">
            <span className="type-caption text-muted-foreground mb-2">Desktop (≥768px)</span>
            <div className="relative h-48 border border-border rounded-md overflow-hidden bg-surface flex flex-col items-center justify-center gap-4">
              <div className="text-brand-primary">
                <Icon name="smartphone" size="xl" />
              </div>
              <p className="type-h3 text-brand-primary text-center px-4">
                Only Mobile View is supported.
              </p>
            </div>
          </div>
        </div>
      </ComponentPreview>

      {/* Custom message */}
      <Heading as="h3">Custom message</Heading>
      <p className="type-body mb-2 text-foreground max-w-prose">
        Pass a custom string via the{' '}
        <InlineCode>message</InlineCode>{' '}
        prop to override the default overlay text.
      </p>
      <ComponentPreview code={customMessageCode} highlightedCode={customMessageHighlighted}>
        <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex flex-col">
            <span className="type-caption text-muted-foreground mb-2">Mobile (&lt;768px)</span>
            <div className="relative h-48 border border-border rounded-md overflow-hidden bg-surface">
              <div className="p-4">
                <p className="type-h3 text-foreground">Mobile App</p>
                <p className="type-body text-foreground">This content is only visible on mobile screens.</p>
              </div>
            </div>
          </div>
          <div className="flex flex-col">
            <span className="type-caption text-muted-foreground mb-2">Desktop (≥768px)</span>
            <div className="relative h-48 border border-border rounded-md overflow-hidden bg-surface flex flex-col items-center justify-center gap-4">
              <div className="text-brand-primary">
                <Icon name="smartphone" size="xl" />
              </div>
              <p className="type-h3 text-brand-primary text-center px-4">
                Please use a mobile device to access this page.
              </p>
            </div>
          </div>
        </div>
      </ComponentPreview>

      {/* -- API Reference -------------------------------------------- */}
      <Heading as="h2">API Reference</Heading>
      <div className="my-6">
        <div className="hidden md:block">
          <Table>
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
                <TableCell><InlineCode>children</InlineCode></TableCell>
                <TableCell><InlineCode>ReactNode</InlineCode></TableCell>
                <TableCell>—</TableCell>
                <TableCell>Content rendered on mobile screens (below 768px).</TableCell>
              </TableRow>
              <TableRow>
                <TableCell><InlineCode>message</InlineCode></TableCell>
                <TableCell><InlineCode>string</InlineCode></TableCell>
                <TableCell><InlineCode>&quot;Only Mobile View is supported.&quot;</InlineCode></TableCell>
                <TableCell>Text displayed on the desktop overlay.</TableCell>
              </TableRow>
              <TableRow>
                <TableCell><InlineCode>className</InlineCode></TableCell>
                <TableCell><InlineCode>string</InlineCode></TableCell>
                <TableCell>—</TableCell>
                <TableCell>Additional Tailwind classes applied to the outer wrapper div.</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
        <div className="block md:hidden">
          <TableMobileList>
            <TableMobileItem>
              <span className="type-body-sm text-foreground"><strong>children</strong></span>
              <span className="type-caption text-muted-foreground"><InlineCode>ReactNode</InlineCode></span>
              <span className="type-caption text-muted-foreground">Content rendered on mobile screens (below 768px).</span>
            </TableMobileItem>
            <TableMobileItem>
              <span className="type-body-sm text-foreground"><strong>message</strong></span>
              <span className="type-caption text-muted-foreground"><InlineCode>string</InlineCode></span>
              <span className="type-caption text-muted-foreground">Default: <InlineCode>&quot;Only Mobile View is supported.&quot;</InlineCode>. Text displayed on the desktop overlay.</span>
            </TableMobileItem>
            <TableMobileItem>
              <span className="type-body-sm text-foreground"><strong>className</strong></span>
              <span className="type-caption text-muted-foreground"><InlineCode>string</InlineCode></span>
              <span className="type-caption text-muted-foreground">Additional Tailwind classes applied to the outer wrapper div.</span>
            </TableMobileItem>
          </TableMobileList>
        </div>
      </div>

    </Container>
  )
}
