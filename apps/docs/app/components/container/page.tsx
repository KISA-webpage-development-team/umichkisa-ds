import { Container } from '@umichkisa-ds/web'
import { ComponentPreview } from '@/components/ComponentPreview'

const defaultCode = `import { Container } from '@umichkisa-ds/web'

<Container>
  <p>Page content constrained to 1536px with responsive padding.</p>
</Container>`

const sizesDefaultCode = `<Container size="default">
  max-w-screen-2xl (1536px)
</Container>`

const sizesMdCode = `<Container size="md">
  max-w-screen-md (768px)
</Container>`

const sizesSmCode = `<Container size="sm">
  max-w-screen-sm (640px)
</Container>`

const sizesProseCode = `<Container size="prose">
  max-w-prose (~65ch)
</Container>`

const polymorphicCode = `import { Container } from '@umichkisa-ds/web'

<Container as="main" id="main-content">
  <h1>Page Title</h1>
  <p>Main content area.</p>
</Container>

<Container as="section">
  <h2>Section Title</h2>
  <p>Section content.</p>
</Container>`

const fullBleedCode = `{/* Full-bleed background wrapper */}
<div className="bg-brand-primary">
  <Container>
    <p className="text-brand-foreground">
      Content stays constrained inside the full-bleed background.
    </p>
  </Container>
</div>`

function SizePlaceholder({ label, sublabel }: { label: string; sublabel: string }) {
  return (
    <div className="flex items-center justify-between rounded-lg border border-border bg-surface px-4 py-3">
      <span className="type-body-sm text-foreground">{label}</span>
      <span className="type-caption text-muted-foreground">{sublabel}</span>
    </div>
  )
}

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

      {/* ── Examples ────────────────────────────────────────── */}
      <h2 className="type-h2 mt-8 mb-4 text-foreground">Examples</h2>

      {/* Default */}
      <h3 className="type-h3 mt-6 mb-2 text-foreground">Default</h3>
      <p className="type-body mb-2 text-foreground max-w-prose">
        With no props, Container constrains to{' '}
        <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">
          max-w-screen-2xl
        </code>{' '}
        (1536px) with responsive padding.
      </p>
      <ComponentPreview code={defaultCode}>
        <div className="w-full">
          <Container className="border border-dashed border-border rounded-lg py-4">
            <p className="type-body-sm text-foreground text-center">Page content constrained to 1536px</p>
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
        padding and centering.
      </p>

      {/* default */}
      <h3 className="type-h3 mt-6 mb-2 text-foreground">default (1536px)</h3>
      <p className="type-body-sm mb-2 text-muted-foreground max-w-prose">
        Full page shell — the standard constraint for page-level content.
      </p>
      <ComponentPreview code={sizesDefaultCode}>
        <div className="w-full">
          <Container size="default" className="border border-dashed border-border rounded-lg py-3">
            <SizePlaceholder label="default" sublabel="max-w-screen-2xl (1536px)" />
          </Container>
        </div>
      </ComponentPreview>

      {/* md */}
      <h3 className="type-h3 mt-8 mb-2 text-foreground">md (768px)</h3>
      <p className="type-body-sm mb-2 text-muted-foreground max-w-prose">
        Mid-width — settings pages, auth forms, focused workflows.
      </p>
      <ComponentPreview code={sizesMdCode}>
        <div className="w-full">
          <Container size="md" className="border border-dashed border-border rounded-lg py-3">
            <SizePlaceholder label="md" sublabel="max-w-screen-md (768px)" />
          </Container>
        </div>
      </ComponentPreview>

      {/* sm */}
      <h3 className="type-h3 mt-8 mb-2 text-foreground">sm (640px)</h3>
      <p className="type-body-sm mb-2 text-muted-foreground max-w-prose">
        Narrow — login forms, single-column dialogs.
      </p>
      <ComponentPreview code={sizesSmCode}>
        <div className="w-full">
          <Container size="sm" className="border border-dashed border-border rounded-lg py-3">
            <SizePlaceholder label="sm" sublabel="max-w-screen-sm (640px)" />
          </Container>
        </div>
      </ComponentPreview>

      {/* prose */}
      <h3 className="type-h3 mt-8 mb-2 text-foreground">prose (~65ch)</h3>
      <p className="type-body-sm mb-2 text-muted-foreground max-w-prose">
        Optimized for reading — articles, blog posts, long-form content. Use{' '}
        <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">
          prose
        </code>{' '}
        when the content is mostly text;{' '}
        <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">
          sm
        </code>{' '}
        when it is a form or focused UI.
      </p>
      <ComponentPreview code={sizesProseCode}>
        <div className="w-full">
          <Container size="prose" className="border border-dashed border-border rounded-lg py-3">
            <SizePlaceholder label="prose" sublabel="max-w-prose (~65ch)" />
          </Container>
        </div>
      </ComponentPreview>

      {/* ── Polymorphic ─────────────────────────────────────── */}
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
          <Container as="main" className="border border-dashed border-border rounded-lg py-3">
            <p className="type-body-sm text-foreground text-center">
              {'<main>'} — primary content area
            </p>
          </Container>
          <Container as="section" className="border border-dashed border-border rounded-lg py-3">
            <p className="type-body-sm text-foreground text-center">
              {'<section>'} — page section
            </p>
          </Container>
        </div>
      </ComponentPreview>

      {/* ── Full-bleed Pattern ──────────────────────────────── */}
      <h2 className="type-h2 mt-8 mb-4 text-foreground">Full-bleed Pattern</h2>
      <p className="type-body mb-2 text-foreground max-w-prose">
        For full-width backgrounds (navbars, heroes, footers), wrap Container
        inside an outer{' '}
        <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">
          div
        </code>{' '}
        that carries the background. Container constrains the content inside.
        Never apply a background directly to Container — it clips at the max-width.
      </p>
      <ComponentPreview code={fullBleedCode}>
        <div className="w-full">
          <div className="bg-brand-primary rounded-lg">
            <Container className="py-6">
              <p className="type-body-sm text-brand-foreground text-center">
                Full-bleed navy background — content constrained by Container
              </p>
            </Container>
          </div>
        </div>
      </ComponentPreview>

      {/* ── Usage Guidelines ────────────────────────────────── */}
      <h2 className="type-h2 mt-8 mb-4 text-foreground">Usage Guidelines</h2>
      <ul className="type-body-sm text-foreground max-w-prose flex flex-col gap-2 mb-8">
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
            For full-bleed sections, the background goes on an outer wrapper, not on Container.
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
            Choose size based on content width needs, not visual aesthetics. Let the content
            dictate the constraint.
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
              <td className="px-4 py-3 type-caption font-mono text-foreground">size</td>
              <td className="px-4 py-3 type-caption font-mono text-foreground">&quot;default&quot; | &quot;md&quot; | &quot;sm&quot; | &quot;prose&quot;</td>
              <td className="px-4 py-3 type-caption font-mono text-foreground">&quot;default&quot;</td>
              <td className="px-4 py-3 type-body-sm text-foreground">Maximum width constraint. default (1536px), md (768px), sm (640px), prose (~65ch).</td>
            </tr>
            <tr className="border-b border-border">
              <td className="px-4 py-3 type-caption font-mono text-foreground">as</td>
              <td className="px-4 py-3 type-caption font-mono text-foreground">&quot;div&quot; | &quot;section&quot; | &quot;main&quot; | &quot;article&quot; | &quot;header&quot; | &quot;footer&quot; | &quot;nav&quot;</td>
              <td className="px-4 py-3 type-caption font-mono text-foreground">&quot;div&quot;</td>
              <td className="px-4 py-3 type-body-sm text-foreground">HTML element to render. Use semantic elements for accessibility landmarks.</td>
            </tr>
            <tr className="border-b border-border">
              <td className="px-4 py-3 type-caption font-mono text-foreground">className</td>
              <td className="px-4 py-3 type-caption font-mono text-foreground">string</td>
              <td className="px-4 py-3 type-caption font-mono text-foreground">—</td>
              <td className="px-4 py-3 type-body-sm text-foreground">Merged via cn() (class merge utility). Add vertical padding, background, etc.</td>
            </tr>
            <tr className="border-b border-border">
              <td className="px-4 py-3 type-caption font-mono text-foreground">children</td>
              <td className="px-4 py-3 type-caption font-mono text-foreground">ReactNode</td>
              <td className="px-4 py-3 type-caption font-mono text-foreground">—</td>
              <td className="px-4 py-3 type-body-sm text-foreground">Content to constrain.</td>
            </tr>
          </tbody>
        </table>
      </div>

    </article>
  )
}
