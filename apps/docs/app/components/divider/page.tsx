import { Container, Divider } from '@umichkisa-ds/web'
import { ComponentPreview } from '@/components/ComponentPreview'

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

export default function DividerPage() {
  return (
    <Container size="md" as="article">

      {/* ── Header ──────────────────────────────────────────── */}
      <h1 className="type-h1 font-sejong-bold tracking-tight mt-8 mb-4 text-foreground">Divider</h1>
      <p className="type-body mb-8 text-foreground max-w-prose">
        A visual separator that divides content into distinct sections. Renders as
        a semantic{' '}
        <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">
          hr
        </code>{' '}
        element with{' '}
        <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">
          role=&quot;separator&quot;
        </code>{' '}
        and supports both horizontal and vertical orientations.
      </p>

      {/* ── Examples ────────────────────────────────────────── */}
      <h2 className="type-h2 mt-8 mb-4 text-foreground">Examples</h2>

      {/* Default */}
      <h3 className="type-h3 mt-6 mb-2 text-foreground">Default</h3>
      <p className="type-body mb-2 text-foreground max-w-prose">
        No props required. Renders a horizontal line spanning the full width of
        its container.
      </p>
      <ComponentPreview code={defaultCode}>
        <Divider />
      </ComponentPreview>

      {/* Vertical */}
      <h3 className="type-h3 mt-6 mb-2 text-foreground">Vertical</h3>
      <p className="type-body mb-2 text-foreground max-w-prose">
        Set{' '}
        <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">
          orientation=&quot;vertical&quot;
        </code>{' '}
        to render a vertical separator. Place inside a flex container so it
        stretches to match the height of its siblings.
      </p>
      <ComponentPreview code={verticalCode}>
        <div className="flex items-center gap-4 h-8">
          <span className="type-body text-foreground">Left</span>
          <Divider orientation="vertical" />
          <span className="type-body text-foreground">Right</span>
        </div>
      </ComponentPreview>

      {/* Content separator */}
      <h3 className="type-h3 mt-6 mb-2 text-foreground">Content separator</h3>
      <p className="type-body mb-2 text-foreground max-w-prose">
        A common pattern: stacked items separated by horizontal dividers.
      </p>
      <ComponentPreview code={separatorCode}>
        <div className="flex flex-col gap-4">
          <p className="type-body text-foreground">First item</p>
          <Divider />
          <p className="type-body text-foreground">Second item</p>
          <Divider />
          <p className="type-body text-foreground">Third item</p>
        </div>
      </ComponentPreview>

      {/* ── API Reference ────────────────────────────────────── */}
      <h2 className="type-h2 mt-8 mb-4 text-foreground">API Reference</h2>
      <p className="type-body mb-4 text-foreground max-w-prose">
        All props are optional. Any additional props are forwarded to the
        underlying{' '}
        <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">
          hr
        </code>{' '}
        element.
      </p>
      <div className="my-6 overflow-x-auto">
        <table className="w-full border-collapse border border-border">
          <thead className="bg-surface-subtle">
            <tr>
              <th className="px-4 py-3 text-left type-caption uppercase border-b border-border text-muted-foreground">Prop</th>
              <th className="px-4 py-3 text-left type-caption uppercase border-b border-border text-muted-foreground">Type</th>
              <th className="px-4 py-3 text-left type-caption uppercase border-b border-border text-muted-foreground">Default</th>
              <th className="px-4 py-3 text-left type-caption uppercase border-b border-border text-muted-foreground">Description</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b border-border">
              <td className="px-4 py-3 type-caption font-mono text-foreground">orientation</td>
              <td className="px-4 py-3 type-caption font-mono text-foreground">&quot;horizontal&quot; | &quot;vertical&quot;</td>
              <td className="px-4 py-3 type-caption text-foreground">&quot;horizontal&quot;</td>
              <td className="px-4 py-3 type-body-sm text-foreground">The axis along which the divider is rendered.</td>
            </tr>
            <tr className="border-b border-border">
              <td className="px-4 py-3 type-caption font-mono text-foreground">className</td>
              <td className="px-4 py-3 type-caption font-mono text-foreground">string</td>
              <td className="px-4 py-3 type-caption text-foreground">—</td>
              <td className="px-4 py-3 type-body-sm text-foreground">Additional CSS classes to apply to the divider.</td>
            </tr>
          </tbody>
        </table>
      </div>

    </Container>
  )
}
