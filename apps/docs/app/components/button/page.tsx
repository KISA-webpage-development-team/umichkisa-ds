import { Button, Icon } from '@umichkisa-ds/web'
import { ComponentPreview } from '@/components/ComponentPreview'

const defaultCode = `import { Button } from '@umichkisa-ds/web'

<Button>Label</Button>`

const variantsCode = `import { Button } from '@umichkisa-ds/web'

<Button variant="primary">Primary</Button>
<Button variant="secondary">Secondary</Button>
<Button variant="tertiary">Tertiary</Button>
<Button variant="destructive">Destructive</Button>`

const sizesCode = `import { Button } from '@umichkisa-ds/web'

<Button size="sm">Small</Button>
<Button size="md">Medium</Button>
<Button size="lg">Large</Button>`

const withIconCode = `import { Button, Icon } from '@umichkisa-ds/web'

<Button>
  <Icon name="plus" />
  Add item
</Button>`

const disabledCode = `import { Button } from '@umichkisa-ds/web'

<Button variant="primary" disabled>Primary</Button>
<Button variant="secondary" disabled>Secondary</Button>
<Button variant="tertiary" disabled>Tertiary</Button>
<Button variant="destructive" disabled>Destructive</Button>`

export default function ButtonPage() {
  return (
    <article className="mx-auto max-w-3xl px-6 py-12 min-w-0 overflow-hidden">

      {/* ── Header ──────────────────────────────────────────── */}
      <h1 className="type-h1 font-sejong-bold tracking-tight mt-8 mb-4 text-foreground">Button</h1>
      <p className="type-body mb-8 text-foreground max-w-prose">
        The primary interactive element for triggering actions. Supports four
        semantic variants, three sizes, and built-in{' '}
        <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">
          gap-2
        </code>{' '}
        alignment for icon + text pairings. Extends all native{' '}
        <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">
          &lt;button&gt;
        </code>{' '}
        attributes.
      </p>

      {/* ── Examples ────────────────────────────────────────── */}
      <h2 className="type-h2 mt-8 mb-4 text-foreground">Examples</h2>

      {/* Default */}
      <h3 className="type-h3 mt-6 mb-2 text-foreground">Default</h3>
      <p className="type-body mb-2 text-foreground max-w-prose">
        The simplest usage. Renders as{' '}
        <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">
          primary
        </code>{' '}
        variant at{' '}
        <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">
          md
        </code>{' '}
        size by default.
      </p>
      <ComponentPreview code={defaultCode}>
        <Button>Label</Button>
      </ComponentPreview>

      {/* Variants */}
      <h3 className="type-h3 mt-8 mb-2 text-foreground">Variants</h3>
      <p className="type-body mb-2 text-foreground max-w-prose">
        Four semantic variants for different levels of emphasis and intent.
      </p>
      <ComponentPreview code={variantsCode}>
        <div className="flex items-center gap-4">
          <Button variant="primary">Primary</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="tertiary">Tertiary</Button>
          <Button variant="destructive">Destructive</Button>
        </div>
      </ComponentPreview>
      <ul className="type-body-sm max-w-prose mt-4 mb-2 flex flex-col gap-2">
        <li><strong className="text-foreground">Primary</strong> — the main action on the page. Usually one per screen.</li>
        <li><strong className="text-foreground">Secondary</strong> — supporting actions alongside a primary button.</li>
        <li><strong className="text-foreground">Tertiary</strong> — low-emphasis actions like "Cancel" or inline text-level actions.</li>
        <li><strong className="text-foreground">Destructive</strong> — actions that delete data or cannot be undone.</li>
      </ul>

      {/* Sizes */}
      <h3 className="type-h3 mt-8 mb-2 text-foreground">Sizes</h3>
      <p className="type-body mb-2 text-foreground max-w-prose">
        Three sizes aligned to the spacing grid. Use{' '}
        <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">
          md
        </code>{' '}
        (default) for most UI.
      </p>
      <ComponentPreview code={sizesCode}>
        <div className="flex items-center gap-4">
          <Button size="sm">Small</Button>
          <Button size="md">Medium</Button>
          <Button size="lg">Large</Button>
        </div>
      </ComponentPreview>

      {/* With icon */}
      <h3 className="type-h3 mt-8 mb-2 text-foreground">With icon</h3>
      <p className="type-body mb-2 text-foreground max-w-prose">
        Button has built-in{' '}
        <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">
          gap-2
        </code>{' '}
        so icons and text align automatically. Always use the{' '}
        <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">
          &lt;Icon&gt;
        </code>{' '}
        component — never import Lucide icons directly.
      </p>
      <ComponentPreview code={withIconCode}>
        <Button>
          <Icon name="plus" />
          Add item
        </Button>
      </ComponentPreview>

      {/* Disabled */}
      <h3 className="type-h3 mt-8 mb-2 text-foreground">Disabled</h3>
      <p className="type-body mb-2 text-foreground max-w-prose">
        Pass{' '}
        <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">
          disabled
        </code>{' '}
        to visually dim the button and block interaction. Works with all variants.
      </p>
      <ComponentPreview code={disabledCode}>
        <div className="flex items-center gap-4">
          <Button variant="primary" disabled>Primary</Button>
          <Button variant="secondary" disabled>Secondary</Button>
          <Button variant="tertiary" disabled>Tertiary</Button>
          <Button variant="destructive" disabled>Destructive</Button>
        </div>
      </ComponentPreview>

      {/* ── API Reference ────────────────────────────────────── */}
      <h2 className="type-h2 mt-8 mb-4 text-foreground">API Reference</h2>
      <p className="type-body mb-4 text-foreground max-w-prose">
        All props are optional.{' '}
        <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">
          Button
        </code>{' '}
        extends{' '}
        <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">
          React.ButtonHTMLAttributes
        </code>
        , so any native button attribute is also accepted.
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
              <td className="px-4 py-3 type-caption font-mono text-foreground">variant</td>
              <td className="px-4 py-3 type-caption font-mono text-foreground">&#39;primary&#39; | &#39;secondary&#39; | &#39;tertiary&#39; | &#39;destructive&#39;</td>
              <td className="px-4 py-3 type-caption font-mono text-foreground">&#39;primary&#39;</td>
              <td className="px-4 py-3 type-body-sm text-foreground">Visual style indicating the level of emphasis or intent.</td>
            </tr>
            <tr className="border-b border-border">
              <td className="px-4 py-3 type-caption font-mono text-foreground">size</td>
              <td className="px-4 py-3 type-caption font-mono text-foreground">&#39;sm&#39; | &#39;md&#39; | &#39;lg&#39;</td>
              <td className="px-4 py-3 type-caption font-mono text-foreground">&#39;md&#39;</td>
              <td className="px-4 py-3 type-body-sm text-foreground">Controls padding and font size. All values sit on the 4px spacing grid.</td>
            </tr>
            <tr className="border-b border-border">
              <td className="px-4 py-3 type-caption font-mono text-foreground">type</td>
              <td className="px-4 py-3 type-caption font-mono text-foreground">&#39;button&#39; | &#39;submit&#39; | &#39;reset&#39;</td>
              <td className="px-4 py-3 type-caption font-mono text-foreground">&#39;button&#39;</td>
              <td className="px-4 py-3 type-body-sm text-foreground">
                HTML button type. Defaults to{' '}
                <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">button</code>{' '}
                instead of the browser default{' '}
                <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">submit</code>{' '}
                to prevent accidental form submissions.
              </td>
            </tr>
            <tr className="border-b border-border">
              <td className="px-4 py-3 type-caption font-mono text-foreground">disabled</td>
              <td className="px-4 py-3 type-caption font-mono text-foreground">boolean</td>
              <td className="px-4 py-3 type-caption font-mono text-foreground">false</td>
              <td className="px-4 py-3 type-body-sm text-foreground">Disables the button, reducing opacity and blocking pointer events.</td>
            </tr>
            <tr className="border-b border-border">
              <td className="px-4 py-3 type-caption font-mono text-foreground">className</td>
              <td className="px-4 py-3 type-caption font-mono text-foreground">string</td>
              <td className="px-4 py-3 type-caption text-foreground">—</td>
              <td className="px-4 py-3 type-body-sm text-foreground">Merged via cn() (class merge utility). Use for layout utilities only — never override variant styles.</td>
            </tr>
            <tr>
              <td className="px-4 py-3 type-caption font-mono text-foreground">children</td>
              <td className="px-4 py-3 type-caption font-mono text-foreground">React.ReactNode</td>
              <td className="px-4 py-3 type-caption text-foreground">—</td>
              <td className="px-4 py-3 type-body-sm text-foreground">Button content. Can include text, icons, or both.</td>
            </tr>
          </tbody>
        </table>
      </div>

    </article>
  )
}
