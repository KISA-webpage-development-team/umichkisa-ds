import {
  Container,
  Grid,
  Alert,
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
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

const basicCode = `import { Grid } from '@umichkisa-ds/web'

<Grid columns={3}>
  <div>Item 1</div>
  <div>Item 2</div>
  <div>Item 3</div>
  <div>Item 4</div>
  <div>Item 5</div>
  <div>Item 6</div>
</Grid>`

const responsiveCode = `import { Grid } from '@umichkisa-ds/web'

<Grid columns={{ base: 1, md: 2, lg: 3 }}>
  <div>Item 1</div>
  <div>Item 2</div>
  <div>Item 3</div>
  <div>Item 4</div>
  <div>Item 5</div>
  <div>Item 6</div>
</Grid>`

const gapElementCode = `import { Grid } from '@umichkisa-ds/web'

<Grid columns={3} gap="element">
  ...
</Grid>`

const gapComponentCode = `import { Grid } from '@umichkisa-ds/web'

<Grid columns={3} gap="component">
  ...
</Grid>`

const gapSectionCode = `import { Grid } from '@umichkisa-ds/web'

<Grid columns={3} gap="section">
  ...
</Grid>`

const realWorldElementCode = `import { Grid } from '@umichkisa-ds/web'

<Grid columns={{ base: 2, md: 3, lg: 4 }} gap="element">
  <Tag>React</Tag>
  <Tag>TypeScript</Tag>
  <Tag>Tailwind</Tag>
  ...
</Grid>`

const realWorldComponentCode = `import { Grid, Card, CardHeader, CardTitle, CardDescription } from '@umichkisa-ds/web'

<Grid columns={{ base: 1, md: 2, lg: 3 }} gap="component">
  <Card>
    <CardHeader>
      <CardTitle>Analytics</CardTitle>
      <CardDescription>View traffic and engagement metrics across all pages.</CardDescription>
    </CardHeader>
  </Card>
  <Card>
    <CardHeader>
      <CardTitle>Members</CardTitle>
      <CardDescription>Manage team members, roles, and permissions.</CardDescription>
    </CardHeader>
  </Card>
  <Card>
    <CardHeader>
      <CardTitle>Settings</CardTitle>
      <CardDescription>Configure organization preferences and integrations.</CardDescription>
    </CardHeader>
  </Card>
</Grid>`

const realWorldSectionCode = `import { Grid } from '@umichkisa-ds/web'

<Grid columns={{ base: 1, md: 2, lg: 3 }} gap="section">
  <FeatureBlock icon="..." title="..." description="..." />
  <FeatureBlock icon="..." title="..." description="..." />
  <FeatureBlock icon="..." title="..." description="..." />
</Grid>`

function Placeholder({ label }: { label: string }) {
  return (
    <div className="flex items-center justify-center rounded-md border border-border bg-surface px-4 py-6 type-body-sm text-foreground">
      {label}
    </div>
  )
}

function Tag({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center justify-center rounded-full border border-border bg-surface px-3 py-1 type-caption text-foreground">
      {children}
    </span>
  )
}

function FeatureBlock({ icon, title, description }: { icon: string; title: string; description: string }) {
  return (
    <div className="flex flex-col gap-2 p-6 rounded-md border border-border bg-surface">
      <span className="type-h2 text-foreground">{icon}</span>
      <h4 className="type-label text-foreground">{title}</h4>
      <p className="type-body-sm text-muted-foreground">{description}</p>
    </div>
  )
}

export default async function GridPage() {
  const [
    basicHighlighted,
    responsiveHighlighted,
    gapElementHighlighted,
    gapComponentHighlighted,
    gapSectionHighlighted,
    realWorldElementHighlighted,
    realWorldComponentHighlighted,
    realWorldSectionHighlighted,
  ] = await Promise.all([
    highlight(basicCode),
    highlight(responsiveCode),
    highlight(gapElementCode),
    highlight(gapComponentCode),
    highlight(gapSectionCode),
    highlight(realWorldElementCode),
    highlight(realWorldComponentCode),
    highlight(realWorldSectionCode),
  ])

  return (
    <Container size="md" as="article">

      {/* ── Header ──────────────────────────────────────────── */}
      <h1 className="type-h1 mb-4 text-foreground">Grid</h1>
      <p className="type-body mb-4 text-foreground max-w-prose">
        Responsive equal-width column layout for repeating items. Handles the
        common pattern of reflowing content from fewer columns on mobile to more
        columns on desktop. Extends all native{' '}
        <InlineCode>
          &lt;div&gt;
        </InlineCode>{' '}
        attributes.
      </p>
      <Alert variant="info" className="mb-8">
        Use Grid when you have a list of same-type items that should reflow
        across breakpoints (card grids, image galleries, feature lists). For
        asymmetric layouts like sidebar + main content, use Tailwind grid
        utilities directly.
      </Alert>

      {/* ── Examples ────────────────────────────────────────── */}
      <Heading as="h2">Examples</Heading>

      {/* Basic */}
      <Heading as="h3" className="mt-6">Basic</Heading>
      <p className="type-body mb-2 text-foreground max-w-prose">
        Pass a number to{' '}
        <InlineCode>
          columns
        </InlineCode>{' '}
        for a fixed column count across all breakpoints.
      </p>
      <ComponentPreview code={basicCode} highlightedCode={basicHighlighted}>
        <div className="w-full">
          <Grid columns={3}>
            {Array.from({ length: 6 }, (_, i) => (
              <Placeholder key={i} label={`Item ${i + 1}`} />
            ))}
          </Grid>
        </div>
      </ComponentPreview>

      {/* Responsive */}
      <Heading as="h3">Responsive</Heading>
      <p className="type-body mb-2 text-foreground max-w-prose">
        Pass a responsive object to{' '}
        <InlineCode>
          columns
        </InlineCode>{' '}
        to control the column count at each breakpoint. Values cascade upward —{' '}
        <InlineCode>
          {'{ base: 1, lg: 3 }'}
        </InlineCode>{' '}
        means 1 column until the{' '}
        <InlineCode>
          lg
        </InlineCode>{' '}
        breakpoint. If you omit{' '}
        <InlineCode>
          base
        </InlineCode>
        , the grid defaults to 1 column at the smallest size.
        Resize your browser to see the reflow.
      </p>
      <ComponentPreview code={responsiveCode} highlightedCode={responsiveHighlighted}>
        <div className="w-full">
          <Grid columns={{ base: 1, md: 2, lg: 3 }}>
            {Array.from({ length: 6 }, (_, i) => (
              <Placeholder key={i} label={`Item ${i + 1}`} />
            ))}
          </Grid>
        </div>
      </ComponentPreview>

      {/* ── Gap Variants ────────────────────────────────────── */}
      <Heading as="h2">Gap Variants</Heading>
      <p className="type-body mb-4 text-foreground max-w-prose">
        The{' '}
        <InlineCode>
          gap
        </InlineCode>{' '}
        prop controls both column and row gaps using three spacing tiers:
        element (8px), component (16px), and section (24px).
      </p>

      {/* Element */}
      <Heading as="h3" className="mt-6">Element (8px)</Heading>
      <p className="type-body-sm mb-2 text-muted-foreground max-w-prose">
        Tight spacing for compact grids — icon grids, tag collections.
      </p>
      <ComponentPreview code={gapElementCode} highlightedCode={gapElementHighlighted}>
        <div className="w-full">
          <Grid columns={3} gap="element">
            {Array.from({ length: 6 }, (_, i) => (
              <Placeholder key={i} label={`${i + 1}`} />
            ))}
          </Grid>
        </div>
      </ComponentPreview>

      {/* Component */}
      <Heading as="h3">Component (16px)</Heading>
      <p className="type-body-sm mb-2 text-muted-foreground max-w-prose">
        Default. Standard spacing for card grids and content blocks.
      </p>
      <ComponentPreview code={gapComponentCode} highlightedCode={gapComponentHighlighted}>
        <div className="w-full">
          <Grid columns={3} gap="component">
            {Array.from({ length: 6 }, (_, i) => (
              <Placeholder key={i} label={`${i + 1}`} />
            ))}
          </Grid>
        </div>
      </ComponentPreview>

      {/* Section */}
      <Heading as="h3">Section (24px)</Heading>
      <p className="type-body-sm mb-2 text-muted-foreground max-w-prose">
        Spacious spacing for feature grids and landing page layouts.
      </p>
      <ComponentPreview code={gapSectionCode} highlightedCode={gapSectionHighlighted}>
        <div className="w-full">
          <Grid columns={3} gap="section">
            {Array.from({ length: 6 }, (_, i) => (
              <Placeholder key={i} label={`${i + 1}`} />
            ))}
          </Grid>
        </div>
      </ComponentPreview>

      {/* ── Real-world Examples ──────────────────────────────── */}
      <Heading as="h2">Real-world Examples</Heading>
      <p className="type-body mb-4 text-foreground max-w-prose">
        Card grids at each gap tier, showing how spacing affects the feel
        of a realistic layout.
      </p>

      {/* Element gap tags */}
      <Heading as="h3" className="mt-6">Element gap</Heading>
      <ComponentPreview code={realWorldElementCode} highlightedCode={realWorldElementHighlighted}>
        <div className="w-full">
          <Grid columns={{ base: 2, md: 3, lg: 4 }} gap="element">
            <Tag>React</Tag>
            <Tag>TypeScript</Tag>
            <Tag>Tailwind CSS</Tag>
            <Tag>Next.js</Tag>
            <Tag>Node.js</Tag>
            <Tag>Figma</Tag>
            <Tag>GraphQL</Tag>
            <Tag>PostgreSQL</Tag>
          </Grid>
        </div>
      </ComponentPreview>

      {/* Component gap cards */}
      <Heading as="h3">Component gap</Heading>
      <ComponentPreview code={realWorldComponentCode} highlightedCode={realWorldComponentHighlighted}>
        <div className="w-full">
          <Grid columns={{ base: 1, md: 2, lg: 3 }} gap="component">
            <Card>
              <CardHeader>
                <CardTitle>Analytics</CardTitle>
                <CardDescription>View traffic and engagement metrics across all pages.</CardDescription>
              </CardHeader>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Members</CardTitle>
                <CardDescription>Manage team members, roles, and permissions.</CardDescription>
              </CardHeader>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Settings</CardTitle>
                <CardDescription>Configure organization preferences and integrations.</CardDescription>
              </CardHeader>
            </Card>
          </Grid>
        </div>
      </ComponentPreview>

      {/* Section gap feature blocks */}
      <Heading as="h3">Section gap</Heading>
      <ComponentPreview code={realWorldSectionCode} highlightedCode={realWorldSectionHighlighted}>
        <div className="w-full">
          <Grid columns={{ base: 1, md: 2, lg: 3 }} gap="section">
            <FeatureBlock icon="📊" title="Analytics" description="Track engagement metrics, page views, and user behavior across your entire platform." />
            <FeatureBlock icon="🔒" title="Security" description="Enterprise-grade encryption, SSO integration, and role-based access controls built in." />
            <FeatureBlock icon="⚡" title="Performance" description="Sub-100ms response times with edge caching and automatic scaling for any traffic level." />
          </Grid>
        </div>
      </ComponentPreview>

      {/* ── API Reference ────────────────────────────────────── */}
      <Heading as="h2">API Reference</Heading>
      <p className="type-body mb-4 text-foreground max-w-prose">
        All props are optional. Grid extends native{' '}
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
                <TableCell><InlineCode>columns</InlineCode></TableCell>
                <TableCell><InlineCode>number | {'{ base?, md?, lg? }'}</InlineCode></TableCell>
                <TableCell><InlineCode>1</InlineCode></TableCell>
                <TableCell>Number of equal-width columns. Pass a number for fixed, or a responsive object for breakpoint control. Max 6.</TableCell>
              </TableRow>
              <TableRow>
                <TableCell><InlineCode>gap</InlineCode></TableCell>
                <TableCell><InlineCode>&quot;element&quot; | &quot;component&quot; | &quot;section&quot;</InlineCode></TableCell>
                <TableCell><InlineCode>&quot;component&quot;</InlineCode></TableCell>
                <TableCell>Gap between items, mapped to the DS spacing tiers: element (8px), component (16px), section (24px).</TableCell>
              </TableRow>
              <TableRow>
                <TableCell><InlineCode>className</InlineCode></TableCell>
                <TableCell><InlineCode>string</InlineCode></TableCell>
                <TableCell>—</TableCell>
                <TableCell>Merged via cn(). Use for layout utilities only.</TableCell>
              </TableRow>
              <TableRow>
                <TableCell><InlineCode>children</InlineCode></TableCell>
                <TableCell><InlineCode>ReactNode</InlineCode></TableCell>
                <TableCell>—</TableCell>
                <TableCell>Grid items.</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
        <div className="block md:hidden">
          <TableMobileList>
            <TableMobileItem>
              <span className="type-body-sm text-foreground"><strong>columns</strong></span>
              <span className="type-caption text-muted-foreground"><InlineCode>number | {'{ base?, md?, lg? }'}</InlineCode></span>
              <span className="type-caption text-muted-foreground">Default: <InlineCode>1</InlineCode></span>
              <span className="type-caption text-muted-foreground">Number of equal-width columns. Pass a number for fixed, or a responsive object for breakpoint control. Max 6.</span>
            </TableMobileItem>
            <TableMobileItem>
              <span className="type-body-sm text-foreground"><strong>gap</strong></span>
              <span className="type-caption text-muted-foreground"><InlineCode>&quot;element&quot; | &quot;component&quot; | &quot;section&quot;</InlineCode></span>
              <span className="type-caption text-muted-foreground">Default: <InlineCode>&quot;component&quot;</InlineCode></span>
              <span className="type-caption text-muted-foreground">Gap between items, mapped to the DS spacing tiers: element (8px), component (16px), section (24px).</span>
            </TableMobileItem>
            <TableMobileItem>
              <span className="type-body-sm text-foreground"><strong>className</strong></span>
              <span className="type-caption text-muted-foreground"><InlineCode>string</InlineCode></span>
              <span className="type-caption text-muted-foreground">Merged via cn(). Use for layout utilities only.</span>
            </TableMobileItem>
            <TableMobileItem>
              <span className="type-body-sm text-foreground"><strong>children</strong></span>
              <span className="type-caption text-muted-foreground"><InlineCode>ReactNode</InlineCode></span>
              <span className="type-caption text-muted-foreground">Grid items.</span>
            </TableMobileItem>
          </TableMobileList>
        </div>
      </div>

    </Container>
  )
}
