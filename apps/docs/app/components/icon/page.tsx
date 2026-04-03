import { Container, Icon } from '@umichkisa-ds/web'
import { ComponentPreview } from '@/components/ComponentPreview'
import { SizesExample } from '@/components/SizesExample'

const defaultCode = `import { Icon } from '@umichkisa-ds/web'

<Icon name="arrow-right" />`

const colorCode = `import { Icon } from '@umichkisa-ds/web'

{/* Default — inherits foreground color */}
<Icon name="plus" />

{/* Brand color — set on the wrapper */}
<span className="text-brand-primary">
  <Icon name="plus" />
</span>

{/* Error state */}
<span className="text-error">
  <Icon name="plus" />
</span>`

const labelCode = `import { Icon } from '@umichkisa-ds/web'

{/* Decorative — aria-hidden="true" (default when label is omitted) */}
<Icon name="thumbs-up" />

{/* Semantic — aria-label set, screen readers will announce it */}
<Icon name="thumbs-up" label="Liked" />`

const buttonCode = `import { Icon } from '@umichkisa-ds/web'

<button
  aria-label="Delete"
  className="flex items-center justify-center min-w-[44px] min-h-[44px] rounded-md hover:bg-surface-subtle"
>
  <Icon name="trash-2" />
</button>`

export default function IconPage() {
  return (
    <Container size="md" as="article">

      {/* ── Header ──────────────────────────────────────────── */}
      <h1 className="type-h1 font-sejong-bold tracking-tight mt-8 mb-4 text-foreground">Icon</h1>
      <p className="type-body mb-8 text-foreground max-w-prose">
        The single canonical way to render icons in the KISA design system. Wraps
        Lucide icons with consistent sizing, color inheritance via{' '}
        <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">
          currentColor
        </code>
        , and built-in accessibility handling.
      </p>

      {/* ── Examples ────────────────────────────────────────── */}
      <h2 className="type-h2 mt-8 mb-4 text-foreground">Examples</h2>

      {/* Default */}
      <h3 className="type-h3 mt-6 mb-2 text-foreground">Default</h3>
      <p className="type-body mb-2 text-foreground max-w-prose">
        No props beyond{' '}
        <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">
          name
        </code>
        . Renders at{' '}
        <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">
          md
        </code>{' '}
        (20px) by default. Decorative — screen readers ignore it.
      </p>
      <ComponentPreview code={defaultCode}>
        <Icon name="arrow-right" />
      </ComponentPreview>

      {/* Sizes */}
      <h3 className="type-h3 mt-8 mb-2 text-foreground">Sizes</h3>
      <p className="type-body mb-2 text-foreground max-w-prose">
        Five size tokens map to fixed pixel values on a 4px grid. Use{' '}
        <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">
          md
        </code>{' '}
        (default) for most UI.
      </p>
      <SizesExample />

      {/* Color */}
      <h3 className="type-h3 mt-8 mb-2 text-foreground">Color</h3>
      <p className="type-body mb-2 text-foreground max-w-prose">
        Icons inherit{' '}
        <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">
          currentColor
        </code>
        . Set color on the wrapping element using semantic tokens — never pass a color
        prop directly to{' '}
        <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">
          &lt;Icon&gt;
        </code>
        .
      </p>
      <ComponentPreview code={colorCode}>
        <div className="flex items-center gap-4">
          <Icon name="plus" />
          <span className="text-brand-primary">
            <Icon name="plus" />
          </span>
          <span className="text-error">
            <Icon name="plus" />
          </span>
        </div>
      </ComponentPreview>

      {/* With a label */}
      <h3 className="type-h3 mt-8 mb-2 text-foreground">With a label</h3>
      <p className="type-body mb-2 text-foreground max-w-prose">
        Provide{' '}
        <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">
          label
        </code>{' '}
        when the icon carries meaning with no visible text nearby. The component sets{' '}
        <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">
          aria-label
        </code>{' '}
        on the SVG so screen readers announce it.
      </p>
      <ComponentPreview code={labelCode}>
        <Icon name="thumbs-up" label="Liked" />
      </ComponentPreview>

      {/* Inside a button */}
      <h3 className="type-h3 mt-8 mb-2 text-foreground">Inside a button</h3>
      <p className="type-body mb-2 text-foreground max-w-prose">
        <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">
          &lt;Icon&gt;
        </code>{' '}
        is never interactive. Wrap in a{' '}
        <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">
          &lt;button&gt;
        </code>{' '}
        or{' '}
        <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">
          &lt;a&gt;
        </code>
        . The wrapper provides the accessible label and the minimum 44×44px touch target.
      </p>
      <ComponentPreview code={buttonCode}>
        <button
          aria-label="Delete"
          className="cursor-pointer
          flex items-center justify-center min-w-[44px] min-h-[44px] rounded-md hover:bg-surface-subtle focus-visible:outline focus-visible:outline-2 focus-visible:outline-[var(--color-focus-ring)] focus-visible:shadow-[0_0_0_4px_var(--color-brand-primary)]"
        >
          <Icon name="trash-2" />
        </button>
      </ComponentPreview>

      {/* ── Available Icons ──────────────────────────────────── */}
      <h2 className="type-h2 mt-8 mb-4 text-foreground">Available Icons</h2>
      <p className="type-body-sm mb-4 text-muted-foreground max-w-prose">
        25 icons in the current registry (23 Lucide + 2 custom brand icons).
      </p>
      <div className="grid grid-cols-[repeat(auto-fill,minmax(96px,1fr))] gap-4 my-6">
        {([
          'arrow-left','arrow-right','chevron-right','chevron-down',
          'circle-minus','circle-plus','clock-9','external-link',
          'eye','graduation-cap','list','lock','mail','message-square',
          'minus','pencil','plus','reply','shopping-cart','thumbs-up',
          'ticket','trash-2','x','github','linkedin',
        ] as const).map((name) => (
          <div key={name} className="flex flex-col items-center gap-2 p-3 rounded-lg bg-surface-subtle border border-border">
            <Icon name={name} size="md" />
            <span className="type-caption font-mono text-muted-foreground text-center break-all">{name}</span>
          </div>
        ))}
      </div>

      {/* ── API Reference ────────────────────────────────────── */}
      <h2 className="type-h2 mt-8 mb-4 text-foreground">API Reference</h2>
      <p className="type-body mb-4 text-foreground max-w-prose">
        All props except{' '}
        <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">
          name
        </code>{' '}
        are optional.{' '}
        <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">
          name
        </code>{' '}
        must be a registered{' '}
        <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">
          IconName
        </code>{' '}
        — TypeScript will catch invalid names at compile time.
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
              <td className="px-4 py-3 text-foreground"><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle">name</code></td>
              <td className="px-4 py-3 text-foreground"><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle">IconName</code></td>
              <td className="px-4 py-3 type-body-sm text-foreground">—</td>
              <td className="px-4 py-3 type-body-sm text-foreground">Required. Lucide icon name in kebab-case. Must be a key in the DS registry.</td>
            </tr>
            <tr className="border-b border-border">
              <td className="px-4 py-3 text-foreground"><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle">size</code></td>
              <td className="px-4 py-3 text-foreground"><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle">&#39;xs&#39; | &#39;sm&#39; | &#39;md&#39; | &#39;lg&#39; | &#39;xl&#39;</code></td>
              <td className="px-4 py-3 text-foreground"><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle">&#39;md&#39;</code></td>
              <td className="px-4 py-3 type-body-sm text-foreground">Maps to a fixed pixel size (12 / 16 / 20 / 24 / 32).</td>
            </tr>
            <tr className="border-b border-border">
              <td className="px-4 py-3 text-foreground"><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle">label</code></td>
              <td className="px-4 py-3 text-foreground"><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle">string</code></td>
              <td className="px-4 py-3 type-body-sm text-foreground">—</td>
              <td className="px-4 py-3 type-body-sm text-foreground">
                When provided: sets{' '}
                <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">aria-label</code>{' '}
                on the SVG so screen readers announce it. When omitted:{' '}
                <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">aria-hidden=&quot;true&quot;</code>.
              </td>
            </tr>
            <tr>
              <td className="px-4 py-3 text-foreground"><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle">className</code></td>
              <td className="px-4 py-3 text-foreground"><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle">string</code></td>
              <td className="px-4 py-3 type-body-sm text-foreground">—</td>
              <td className="px-4 py-3 type-body-sm text-foreground">
                Layout utilities only (
                <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">block</code>
                ,{' '}
                <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">flex-shrink-0</code>
                ). Never use for color or size.
              </td>
            </tr>
          </tbody>
        </table>
      </div>

    </Container>
  )
}
