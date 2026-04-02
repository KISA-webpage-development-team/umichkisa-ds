import { Container } from '@umichkisa-ds/web'
import { ComponentPreview } from '@/components/ComponentPreview'

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

const pageStructureCode = `{/* Pattern: close Container, add banner, reopen Container */}

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

export default function ContainerPage() {
  return (
    <article className="mx-auto max-w-3xl px-6 py-12 min-w-0 overflow-hidden">

      {/* ── Header ──────────────────────────────────────────── */}
      <h1 className="type-h1 font-sejong-bold tracking-tight mt-8 mb-4 text-foreground">Container</h1>
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
      <ComponentPreview code={defaultCode}>
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
      <ComponentPreview code={allSizesCode}>
        <div className="w-full flex flex-col gap-2">
          {/* default — full width reference */}
          <div className="w-full rounded-md bg-brand-primary px-3 py-2 flex items-center justify-between">
            <span className="type-caption text-brand-foreground">default</span>
            <span className="type-caption text-brand-foreground">1536px — page shell</span>
          </div>
          {/* md — 768/1536 = 50% */}
          <div className="w-1/2 rounded-md bg-brand-primary/80 px-3 py-2 flex items-center justify-between">
            <span className="type-caption text-brand-foreground">md</span>
            <span className="type-caption text-brand-foreground">768px</span>
          </div>
          {/* sm — 640/1536 ≈ 42% */}
          <div className="w-[42%] rounded-md bg-brand-primary/60 px-3 py-2 flex items-center justify-between">
            <span className="type-caption text-brand-foreground">sm</span>
            <span className="type-caption text-brand-foreground">640px</span>
          </div>
          {/* prose — ~520/1536 ≈ 34% */}
          <div className="w-[34%] rounded-md bg-brand-primary/40 px-3 py-2 flex items-center justify-between">
            <span className="type-caption text-foreground">prose</span>
            <span className="type-caption text-foreground">~65ch</span>
          </div>
        </div>
      </ComponentPreview>

      <h3 className="type-h3 mt-6 mb-2 text-foreground">When to use each size</h3>
      <div className="my-6 overflow-x-auto">
        <table className="w-full border-collapse border border-border">
          <thead className="bg-surface-subtle">
            <tr>
              <th className="px-4 py-3 text-left type-caption border-b border-border text-muted-foreground">Size</th>
              <th className="px-4 py-3 text-left type-caption border-b border-border text-muted-foreground">Max Width</th>
              <th className="px-4 py-3 text-left type-caption border-b border-border text-muted-foreground">Use Case</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b border-border">
              <td className="px-4 py-3 text-foreground"><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle">default</code></td>
              <td className="px-4 py-3 type-body-sm text-muted-foreground">1536px</td>
              <td className="px-4 py-3 type-body-sm text-foreground">Standard page layout — most pages use this.</td>
            </tr>
            <tr className="border-b border-border">
              <td className="px-4 py-3 text-foreground"><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle">md</code></td>
              <td className="px-4 py-3 type-body-sm text-muted-foreground">768px</td>
              <td className="px-4 py-3 type-body-sm text-foreground">Settings pages, auth forms, focused workflows.</td>
            </tr>
            <tr className="border-b border-border">
              <td className="px-4 py-3 text-foreground"><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle">sm</code></td>
              <td className="px-4 py-3 type-body-sm text-muted-foreground">640px</td>
              <td className="px-4 py-3 type-body-sm text-foreground">Login/signup forms, single-column dialogs, narrow focused UI.</td>
            </tr>
            <tr className="border-b border-border">
              <td className="px-4 py-3 text-foreground"><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle">prose</code></td>
              <td className="px-4 py-3 type-body-sm text-muted-foreground">~65ch</td>
              <td className="px-4 py-3 type-body-sm text-foreground">Articles, blog posts, long-form text. Use for text-heavy content; use <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle">sm</code> for form-heavy content.</td>
            </tr>
          </tbody>
        </table>
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
      <ComponentPreview code={polymorphicCode}>
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
      <h3 className="type-h3 mt-6 mb-2 text-foreground">Page-level structure (recommended)</h3>
      <p className="type-body-sm mb-2 text-muted-foreground max-w-prose">
        Structure your page so banners are siblings to Containers, not children.
        Close the Container before the banner, then open a new one after.
      </p>
      <ComponentPreview code={pageStructureCode}>
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
      <ComponentPreview code={breakoutCode}>
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
      <p className="type-body mb-4 text-foreground max-w-prose">
        All props are optional. Container extends native HTML element attributes
        based on the{' '}
        <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">
          as
        </code>{' '}
        prop.
      </p>
      <div className="my-6 overflow-x-auto">
        <table className="w-full border-collapse border border-border">
          <thead className="bg-surface-subtle">
            <tr>
              <th className="px-4 py-3 text-left type-caption border-b border-border text-muted-foreground">Prop</th>
              <th className="px-4 py-3 text-left type-caption border-b border-border text-muted-foreground">Type</th>
              <th className="px-4 py-3 text-left type-caption border-b border-border text-muted-foreground">Default</th>
              <th className="px-4 py-3 text-left type-caption border-b border-border text-muted-foreground">Description</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b border-border">
              <td className="px-4 py-3 text-foreground"><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle">size</code></td>
              <td className="px-4 py-3 text-foreground"><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle">&quot;default&quot; | &quot;md&quot; | &quot;sm&quot; | &quot;prose&quot;</code></td>
              <td className="px-4 py-3 text-foreground"><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle">&quot;default&quot;</code></td>
              <td className="px-4 py-3 type-body-sm text-foreground">Maximum width constraint. default (1536px), md (768px), sm (640px), prose (~65ch).</td>
            </tr>
            <tr className="border-b border-border">
              <td className="px-4 py-3 text-foreground"><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle">as</code></td>
              <td className="px-4 py-3 text-foreground"><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle">&quot;div&quot; | &quot;section&quot; | &quot;main&quot; | &quot;article&quot; | &quot;header&quot; | &quot;footer&quot; | &quot;nav&quot;</code></td>
              <td className="px-4 py-3 text-foreground"><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle">&quot;div&quot;</code></td>
              <td className="px-4 py-3 type-body-sm text-foreground">HTML element to render. Use semantic elements for accessibility landmarks.</td>
            </tr>
            <tr className="border-b border-border">
              <td className="px-4 py-3 text-foreground"><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle">className</code></td>
              <td className="px-4 py-3 text-foreground"><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle">string</code></td>
              <td className="px-4 py-3 type-body-sm text-foreground">—</td>
              <td className="px-4 py-3 type-body-sm text-foreground">Merged via cn() (class merge utility). Add vertical padding, background, etc.</td>
            </tr>
            <tr className="border-b border-border">
              <td className="px-4 py-3 text-foreground"><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle">children</code></td>
              <td className="px-4 py-3 text-foreground"><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle">ReactNode</code></td>
              <td className="px-4 py-3 type-body-sm text-foreground">—</td>
              <td className="px-4 py-3 type-body-sm text-foreground">Content to constrain.</td>
            </tr>
          </tbody>
        </table>
      </div>

    </article>
  )
}
