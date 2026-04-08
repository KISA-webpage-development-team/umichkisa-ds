import {
  Container,
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

const defaultCode = `import { Container } from '@umichkisa-ds/web'

<Container>
  <p>Page content constrained to 1536px with responsive padding.</p>
</Container>`

const allSizesCode = `<Container size="default">  {/* 1536px — page shell */}
<Container size="md">       {/* 768px  — settings, auth */}
<Container size="sm">       {/* 640px  — login forms */}
<Container size="prose">    {/* ~65ch  — articles */}`

const polymorphicCode = `import { Container } from '@umichkisa-ds/web'

<Container as="main" id="main-content">
  <h1>Page Title</h1>
  <p>Main content area.</p>
</Container>

<Container as="section">
  <h2>Section Title</h2>
  <p>Section content.</p>
</Container>`

const pageStructureCode = `{/* Pattern: close add banner, reopen Container */}

<Container as="main">
  <p>Page content here.</p>
</Container>

{/* Banner — full viewport width, not inside any Container */}
<div className="w-full bg-brand-primary">
  <Container>
    <p className="text-brand-foreground">
      Banner content — constrained inside.
    </p>
  </Container>
</div>

<Container>
  <p>More page content below the banner.</p>
</Container>`

const breakoutCode = `{/* When you're inside a Container and need to break out */}

<Container>
  <p>Regular content above the banner.</p>

  {/* Breakout: stretches to full viewport width */}
  <div className="relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] w-screen bg-brand-primary">
    <Container>
      <p className="text-brand-foreground">
        Breakout banner content.
      </p>
    </Container>
  </div>

  <p>Content continues below the banner.</p>
</Container>`

export default async function ContainerPage() {
  const [
    defaultHighlighted,
    allSizesHighlighted,
    polymorphicHighlighted,
    pageStructureHighlighted,
    breakoutHighlighted,
  ] = await Promise.all([
    highlight(defaultCode),
    highlight(allSizesCode),
    highlight(polymorphicCode),
    highlight(pageStructureCode),
    highlight(breakoutCode),
  ])

  return (
    <Container size="md" as="article">

      {/* ── Header ──────────────────────────────────────────── */}
      <h1 className="type-h1 mb-4 text-foreground">Container</h1>
      <p className="type-body mb-8 text-foreground max-w-prose">
        Constrains content to a maximum width with responsive horizontal padding
        ({' '}
        <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">
          px-4
        </code>{' '}
        on mobile,{' '}
        <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">
          px-6
        </code>{' '}
        on tablet,{' '}
        <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">
          px-8
        </code>{' '}
        on desktop) and auto-centering. The primary building block for page-level
        layout. Extends all native HTML element attributes via the{' '}
        <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">
          as
        </code>{' '}
        prop.
      </p>

      {/* ── Default ─────────────────────────────────────────── */}
      <h2 className="type-h2 mt-8 mb-4 text-foreground">Default</h2>
      <p className="type-body mb-2 text-foreground max-w-prose">
        With no props, Container constrains to{' '}
        <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">
          max-w-screen-2xl
        </code>{' '}
        (1536px) with responsive padding and centering.
      </p>
      <ComponentPreview code={defaultCode} highlightedCode={defaultHighlighted}>
        <div className="w-full">
          <Container className="border border-dashed border-border bg-surface rounded-lg py-4">
            <p className="type-body-sm text-foreground text-center">Page content constrained to 1536px with responsive padding.</p>
          </Container>
        </div>
      </ComponentPreview>

      {/* ── Size Variants ──────────────────────────────────── */}
      <h2 className="type-h2 mt-8 mb-4 text-foreground">Size Variants</h2>
      <p className="type-body mb-4 text-foreground max-w-prose">
        The{' '}
        <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">
          size
        </code>{' '}
        prop controls the maximum width. All sizes share the same responsive
        padding and centering. The bars below show each size relative to the
        full-width{' '}
        <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">
          default
        </code>
        .
      </p>
      <ComponentPreview code={allSizesCode} highlightedCode={allSizesHighlighted}>
        <div className="w-full flex flex-col gap-2">
          {/* default — full width reference */}
          <div className="w-full rounded-md bg-brand-primary px-3 py-2 flex items-center justify-between">
            <span className="type-caption text-brand-foreground">default</span>
            <span className="type-caption text-brand-foreground">1536px — page shell</span>
          </div>
          {/* md — 768/1536 = 50% */}
          <div className="w-1/2 rounded-md bg-brand-primary px-3 py-2 flex items-center justify-between">
            <span className="type-caption text-brand-foreground">md</span>
            <span className="type-caption text-brand-foreground">768px</span>
          </div>
          {/* sm — 640/1536 ≈ 40% */}
          <div className="w-2/5 rounded-md bg-brand-primary px-3 py-2 flex items-center justify-between">
            <span className="type-caption text-brand-foreground">sm</span>
            <span className="type-caption text-brand-foreground">640px</span>
          </div>
          {/* prose — ~520/1536 ≈ 33% */}
          <div className="w-1/3 rounded-md bg-brand-primary px-3 py-2 flex items-center justify-between">
            <span className="type-caption text-brand-foreground">prose</span>
            <span className="type-caption text-brand-foreground">~65ch</span>
          </div>
        </div>
      </ComponentPreview>

      <h3 className="type-h3 mt-6 mb-2 text-foreground">When to use each size</h3>
      <div className="my-6">
        <div className="hidden md:block">
          <Table size="sm">
            <TableHeader>
              <TableRow>
                <TableHead>Size</TableHead>
                <TableHead>Max Width</TableHead>
                <TableHead>Use Case</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle">default</code></TableCell>
                <TableCell>1536px</TableCell>
                <TableCell>Standard page layout — most pages use this.</TableCell>
              </TableRow>
              <TableRow>
                <TableCell><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle">md</code></TableCell>
                <TableCell>768px</TableCell>
                <TableCell>Settings pages, auth forms, focused workflows.</TableCell>
              </TableRow>
              <TableRow>
                <TableCell><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle">sm</code></TableCell>
                <TableCell>640px</TableCell>
                <TableCell>Login/signup forms, single-column dialogs, narrow focused UI.</TableCell>
              </TableRow>
              <TableRow>
                <TableCell><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle">prose</code></TableCell>
                <TableCell>~65ch</TableCell>
                <TableCell>Articles, blog posts, long-form text. Use for text-heavy content; use <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle">sm</code> for form-heavy content.</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
        <div className="block md:hidden">
          <TableMobileList>
            <TableMobileItem>
              <span className="type-body-sm text-foreground"><strong>default</strong></span>
              <span className="type-caption text-muted-foreground">1536px</span>
              <span className="type-caption text-muted-foreground">Standard page layout — most pages use this.</span>
            </TableMobileItem>
            <TableMobileItem>
              <span className="type-body-sm text-foreground"><strong>md</strong></span>
              <span className="type-caption text-muted-foreground">768px</span>
              <span className="type-caption text-muted-foreground">Settings pages, auth forms, focused workflows.</span>
            </TableMobileItem>
            <TableMobileItem>
              <span className="type-body-sm text-foreground"><strong>sm</strong></span>
              <span className="type-caption text-muted-foreground">640px</span>
              <span className="type-caption text-muted-foreground">Login/signup forms, single-column dialogs, narrow focused UI.</span>
            </TableMobileItem>
            <TableMobileItem>
              <span className="type-body-sm text-foreground"><strong>prose</strong></span>
              <span className="type-caption text-muted-foreground">~65ch</span>
              <span className="type-caption text-muted-foreground">Articles, blog posts, long-form text. Use for text-heavy content; <code className="rounded px-1 py-0.5 font-mono bg-surface-subtle">sm</code> for form-heavy.</span>
            </TableMobileItem>
          </TableMobileList>
        </div>
      </div>

      {/* ── Semantic Elements ───────────────────────────────── */}
      <h2 className="type-h2 mt-8 mb-4 text-foreground">Semantic Elements</h2>
      <p className="type-body mb-2 text-foreground max-w-prose">
        Use the{' '}
        <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">
          as
        </code>{' '}
        prop to render as a semantic HTML element. This is important for
        accessibility landmarks ({' '}
        <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">
          main
        </code>
        ,{' '}
        <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">
          nav
        </code>
        ,{' '}
        <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">
          section
        </code>
        ).
      </p>
      <ComponentPreview code={polymorphicCode} highlightedCode={polymorphicHighlighted}>
        <div className="w-full flex flex-col gap-4">
          <Container as="main" id="main-content" className="border border-dashed border-border bg-surface rounded-lg py-3">
            <h1 className="type-body-sm text-foreground">Page Title</h1>
            <p className="type-body-sm text-muted-foreground">Main content area.</p>
          </Container>
          <Container as="section" className="border border-dashed border-border bg-surface rounded-lg py-3">
            <h2 className="type-body-sm text-foreground">Section Title</h2>
            <p className="type-body-sm text-muted-foreground">Section content.</p>
          </Container>
        </div>
      </ComponentPreview>

      {/* ── Full-width Backgrounds ──────────────────────────── */}
      <h2 className="type-h2 mt-8 mb-4 text-foreground">Full-width Backgrounds</h2>
      <p className="type-body mb-4 text-foreground max-w-prose">
        Banners, heroes, and navbars need to span the full viewport width while
        keeping their content constrained. There are two patterns depending on
        your page structure.
      </p>

      {/* Pattern 1: Page structure */}
      <h3 className="type-h3 mt-8 mb-2 text-foreground">Page-level structure (recommended)</h3>
      <p className="type-body-sm mb-2 text-muted-foreground max-w-prose">
        Structure your page so banners are siblings to Containers, not children.
        Close the Container before the banner, then open a new one after.
      </p>
      <ComponentPreview code={pageStructureCode} highlightedCode={pageStructureHighlighted}>
        {/* Simulated desktop viewport */}
        <div className="w-full rounded-lg border border-border overflow-hidden bg-surface">
          {/* Top bar */}
          <div className="flex items-center gap-1.5 px-3 py-2 border-b border-border bg-surface-subtle">
            <div className="w-2.5 h-2.5 rounded-full bg-border" />
            <div className="w-2.5 h-2.5 rounded-full bg-border" />
            <div className="w-2.5 h-2.5 rounded-full bg-border" />
          </div>
          {/* Page body */}
          <div className="flex flex-col">
            {/* Container region — inset from edges, subtle bg to show width */}
            <div className="mx-auto w-3/4 bg-surface-subtle border border-dashed border-border rounded py-4 px-4 my-4">
              <p className="type-body-sm text-foreground">Page content here.</p>
            </div>
            {/* Banner — full width, edge to edge */}
            <div className="w-full bg-brand-primary px-4 py-4">
              <div className="mx-auto w-3/4">
                <p className="type-body-sm text-brand-foreground">Banner content — constrained inside.</p>
              </div>
            </div>
            {/* Container region — inset from edges, subtle bg to show width */}
            <div className="mx-auto w-3/4 bg-surface-subtle border border-dashed border-border rounded py-4 px-4 my-4">
              <p className="type-body-sm text-foreground">More page content below the banner.</p>
            </div>
          </div>
        </div>
      </ComponentPreview>

      {/* Pattern 2: CSS breakout */}
      <h3 className="type-h3 mt-8 mb-2 text-foreground">CSS breakout (inside a Container)</h3>
      <p className="type-body-sm mb-2 text-muted-foreground max-w-prose">
        If you are already inside a Container and cannot restructure the page,
        use the viewport-width breakout trick. This forces an element to span
        the full screen regardless of any parent constraints.
      </p>
      <ComponentPreview code={breakoutCode} highlightedCode={breakoutHighlighted}>
        {/* Simulated desktop viewport */}
        <div className="w-full rounded-lg border border-border overflow-hidden bg-surface">
          {/* Top bar */}
          <div className="flex items-center gap-1.5 px-3 py-2 border-b border-border bg-surface-subtle">
            <div className="w-2.5 h-2.5 rounded-full bg-border" />
            <div className="w-2.5 h-2.5 rounded-full bg-border" />
            <div className="w-2.5 h-2.5 rounded-full bg-border" />
          </div>
          {/* Page body — everything is inside a Container (inset) */}
          <div className="flex flex-col">
            {/* Container content — inset */}
            <div className="mx-auto w-3/4 bg-surface-subtle border border-dashed border-border rounded py-4 px-4 my-4">
              <p className="type-body-sm text-foreground">Regular content above the banner.</p>
            </div>
            {/* Breakout banner — escapes Container, full width */}
            <div className="w-full bg-brand-primary px-4 py-4">
              <div className="mx-auto w-3/4">
                <p className="type-body-sm text-brand-foreground">Breakout banner content.</p>
              </div>
            </div>
            {/* Container content — inset */}
            <div className="mx-auto w-3/4 bg-surface-subtle border border-dashed border-border rounded py-4 px-4 my-4">
              <p className="type-body-sm text-foreground">Content continues below the banner.</p>
            </div>
          </div>
        </div>
      </ComponentPreview>

      {/* ── Usage Guidelines ────────────────────────────────── */}
      <h2 className="type-h2 mt-8 mb-4 text-foreground">Usage Guidelines</h2>
      <ul className="type-body text-foreground max-w-prose flex flex-col gap-2 mb-8">
        <li className="flex gap-2">
          <span className="text-muted-foreground">{'•'}</span>
          <span>Use Container as the outermost content wrapper on every page.</span>
        </li>
        <li className="flex gap-2">
          <span className="text-muted-foreground">{'•'}</span>
          <span>
            Do not nest Containers — each page region gets one Container at most.
          </span>
        </li>
        <li className="flex gap-2">
          <span className="text-muted-foreground">{'•'}</span>
          <span>
            For full-width banners, prefer the page-level structure pattern. Use the
            CSS breakout only when restructuring is not possible.
          </span>
        </li>
        <li className="flex gap-2">
          <span className="text-muted-foreground">{'•'}</span>
          <span>
            Use{' '}
            <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">
              as=&quot;main&quot;
            </code>{' '}
            for the primary content area with{' '}
            <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">
              id=&quot;main-content&quot;
            </code>{' '}
            for skip-link targets.
          </span>
        </li>
        <li className="flex gap-2">
          <span className="text-muted-foreground">{'•'}</span>
          <span>
            Choose size based on content type — not visual preference. Text-heavy
            pages use{' '}
            <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">
              prose
            </code>
            , form-heavy pages use{' '}
            <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">
              sm
            </code>{' '}
            or{' '}
            <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">
              md
            </code>
            .
          </span>
        </li>
      </ul>

      {/* ── API Reference ────────────────────────────────────── */}
      <h2 className="type-h2 mt-8 mb-4 text-foreground">API Reference</h2>
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
                <TableCell><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle">size</code></TableCell>
                <TableCell><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle">&quot;default&quot; | &quot;md&quot; | &quot;sm&quot; | &quot;prose&quot;</code></TableCell>
                <TableCell><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle">&quot;default&quot;</code></TableCell>
                <TableCell>Maximum width constraint. default (1536px), md (768px), sm (640px), prose (~65ch).</TableCell>
              </TableRow>
              <TableRow>
                <TableCell><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle">as</code></TableCell>
                <TableCell><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle">&quot;div&quot; | &quot;section&quot; | &quot;main&quot; | &quot;article&quot; | &quot;header&quot; | &quot;footer&quot; | &quot;nav&quot;</code></TableCell>
                <TableCell><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle">&quot;div&quot;</code></TableCell>
                <TableCell>HTML element to render. Use semantic elements for accessibility landmarks.</TableCell>
              </TableRow>
              <TableRow>
                <TableCell><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle">className</code></TableCell>
                <TableCell><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle">string</code></TableCell>
                <TableCell>—</TableCell>
                <TableCell>Merged via cn() (class merge utility). Add vertical padding, background, etc.</TableCell>
              </TableRow>
              <TableRow>
                <TableCell><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle">children</code></TableCell>
                <TableCell><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle">ReactNode</code></TableCell>
                <TableCell>—</TableCell>
                <TableCell>Content to constrain.</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
        <div className="block md:hidden">
          <TableMobileList>
            <TableMobileItem>
              <span className="type-body-sm text-foreground"><strong>size</strong></span>
              <span className="type-caption text-muted-foreground"><code className="rounded px-1 py-0.5 font-mono bg-surface-subtle">&quot;default&quot; | &quot;md&quot; | &quot;sm&quot; | &quot;prose&quot;</code> · default <code className="rounded px-1 py-0.5 font-mono bg-surface-subtle">&quot;default&quot;</code></span>
              <span className="type-caption text-muted-foreground">Maximum width constraint. default (1536px), md (768px), sm (640px), prose (~65ch).</span>
            </TableMobileItem>
            <TableMobileItem>
              <span className="type-body-sm text-foreground"><strong>as</strong></span>
              <span className="type-caption text-muted-foreground"><code className="rounded px-1 py-0.5 font-mono bg-surface-subtle">&quot;div&quot; | &quot;section&quot; | &quot;main&quot; | &quot;article&quot; | &quot;header&quot; | &quot;footer&quot; | &quot;nav&quot;</code> · default <code className="rounded px-1 py-0.5 font-mono bg-surface-subtle">&quot;div&quot;</code></span>
              <span className="type-caption text-muted-foreground">HTML element to render. Use semantic elements for accessibility landmarks.</span>
            </TableMobileItem>
            <TableMobileItem>
              <span className="type-body-sm text-foreground"><strong>className</strong></span>
              <span className="type-caption text-muted-foreground"><code className="rounded px-1 py-0.5 font-mono bg-surface-subtle">string</code></span>
              <span className="type-caption text-muted-foreground">Merged via cn() (class merge utility). Add vertical padding, background, etc.</span>
            </TableMobileItem>
            <TableMobileItem>
              <span className="type-body-sm text-foreground"><strong>children</strong></span>
              <span className="type-caption text-muted-foreground"><code className="rounded px-1 py-0.5 font-mono bg-surface-subtle">ReactNode</code></span>
              <span className="type-caption text-muted-foreground">Content to constrain.</span>
            </TableMobileItem>
          </TableMobileList>
        </div>
      </div>

    </Container>
  )
}
