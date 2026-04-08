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
        <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">
          &lt;div&gt;
        </code>{' '}
        attributes.
      </p>
      <Alert variant="info" className="mb-8">
        Use Grid when you have a list of same-type items that should reflow
        across breakpoints (card grids, image galleries, feature lists). For
        asymmetric layouts like sidebar + main content, use Tailwind grid
        utilities directly.
      </Alert>

      {/* ── Examples ────────────────────────────────────────── */}
      <h2 className="type-h2 mt-8 mb-4 text-foreground">Examples</h2>

      {/* Basic */}
      <h3 className="type-h3 mt-6 mb-2 text-foreground">Basic</h3>
      <p className="type-body mb-2 text-foreground max-w-prose">
        Pass a number to{' '}
        <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">
          columns
        </code>{' '}
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
      <h3 className="type-h3 mt-8 mb-2 text-foreground">Responsive</h3>
      <p className="type-body mb-2 text-foreground max-w-prose">
        Pass a responsive object to{' '}
        <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">
          columns
        </code>{' '}
        to control the column count at each breakpoint. Values cascade upward —{' '}
        <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">
          {'{ base: 1, lg: 3 }'}
        </code>{' '}
        means 1 column until the{' '}
        <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">
          lg
        </code>{' '}
        breakpoint. If you omit{' '}
        <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">
          base
        </code>
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
      <h2 className="type-h2 mt-8 mb-4 text-foreground">Gap Variants</h2>
      <p className="type-body mb-4 text-foreground max-w-prose">
        The{' '}
        <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">
          gap
        </code>{' '}
        prop controls both column and row gaps using three spacing tiers:
        element (8px), component (16px), and section (24px).
      </p>

      {/* Element */}
      <h3 className="type-h3 mt-6 mb-2 text-foreground">Element (8px)</h3>
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
      <h3 className="type-h3 mt-8 mb-2 text-foreground">Component (16px)</h3>
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
      <h3 className="type-h3 mt-8 mb-2 text-foreground">Section (24px)</h3>
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
      <h2 className="type-h2 mt-8 mb-4 text-foreground">Real-world Examples</h2>
      <p className="type-body mb-4 text-foreground max-w-prose">
        Card grids at each gap tier, showing how spacing affects the feel
        of a realistic layout.
      </p>

      {/* Element gap tags */}
      <h3 className="type-h3 mt-6 mb-2 text-foreground">Element gap</h3>
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
      <h3 className="type-h3 mt-8 mb-2 text-foreground">Component gap</h3>
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
      <h3 className="type-h3 mt-8 mb-2 text-foreground">Section gap</h3>
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
      <h2 className="type-h2 mt-8 mb-4 text-foreground">API Reference</h2>
      <p className="type-body mb-4 text-foreground max-w-prose">
        All props are optional. Grid extends native{' '}
        <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">
          &lt;div&gt;
        </code>{' '}
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
                <TableCell><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle">columns</code></TableCell>
                <TableCell><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle">number | {'{ base?, md?, lg? }'}</code></TableCell>
                <TableCell><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle">1</code></TableCell>
                <TableCell>Number of equal-width columns. Pass a number for fixed, or a responsive object for breakpoint control. Max 6.</TableCell>
              </TableRow>
              <TableRow>
                <TableCell><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle">gap</code></TableCell>
                <TableCell><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle">&quot;element&quot; | &quot;component&quot; | &quot;section&quot;</code></TableCell>
                <TableCell><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle">&quot;component&quot;</code></TableCell>
                <TableCell>Gap between items, mapped to the DS spacing tiers: element (8px), component (16px), section (24px).</TableCell>
              </TableRow>
              <TableRow>
                <TableCell><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle">className</code></TableCell>
                <TableCell><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle">string</code></TableCell>
                <TableCell>—</TableCell>
                <TableCell>Merged via cn(). Use for layout utilities only.</TableCell>
              </TableRow>
              <TableRow>
                <TableCell><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle">children</code></TableCell>
                <TableCell><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle">ReactNode</code></TableCell>
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
              <span className="type-caption text-muted-foreground"><code className="rounded px-1 py-0.5 font-mono bg-surface-subtle">number | {'{ base?, md?, lg? }'}</code></span>
              <span className="type-caption text-muted-foreground">Default: <code className="rounded px-1 py-0.5 font-mono bg-surface-subtle">1</code></span>
              <span className="type-caption text-muted-foreground">Number of equal-width columns. Pass a number for fixed, or a responsive object for breakpoint control. Max 6.</span>
            </TableMobileItem>
            <TableMobileItem>
              <span className="type-body-sm text-foreground"><strong>gap</strong></span>
              <span className="type-caption text-muted-foreground"><code className="rounded px-1 py-0.5 font-mono bg-surface-subtle">&quot;element&quot; | &quot;component&quot; | &quot;section&quot;</code></span>
              <span className="type-caption text-muted-foreground">Default: <code className="rounded px-1 py-0.5 font-mono bg-surface-subtle">&quot;component&quot;</code></span>
              <span className="type-caption text-muted-foreground">Gap between items, mapped to the DS spacing tiers: element (8px), component (16px), section (24px).</span>
            </TableMobileItem>
            <TableMobileItem>
              <span className="type-body-sm text-foreground"><strong>className</strong></span>
              <span className="type-caption text-muted-foreground"><code className="rounded px-1 py-0.5 font-mono bg-surface-subtle">string</code></span>
              <span className="type-caption text-muted-foreground">Merged via cn(). Use for layout utilities only.</span>
            </TableMobileItem>
            <TableMobileItem>
              <span className="type-body-sm text-foreground"><strong>children</strong></span>
              <span className="type-caption text-muted-foreground"><code className="rounded px-1 py-0.5 font-mono bg-surface-subtle">ReactNode</code></span>
              <span className="type-caption text-muted-foreground">Grid items.</span>
            </TableMobileItem>
          </TableMobileList>
        </div>
      </div>

    </Container>
  )
}
