'use client'

import { Select, Label } from '@umichkisa-ds/web'
import { ComponentPreview } from '@/components/ComponentPreview'

const defaultCode = `import { Select } from '@umichkisa-ds/web'

<Select>
  <option value="apple">Apple</option>
  <option value="banana">Banana</option>
  <option value="cherry">Cherry</option>
</Select>`

const placeholderCode = `import { Select } from '@umichkisa-ds/web'

<Select defaultValue="">
  <option value="" disabled>Select a fruit...</option>
  <option value="apple">Apple</option>
  <option value="banana">Banana</option>
  <option value="cherry">Cherry</option>
</Select>`

const optgroupCode = `import { Select } from '@umichkisa-ds/web'

<Select>
  <optgroup label="Fruits">
    <option value="apple">Apple</option>
    <option value="banana">Banana</option>
  </optgroup>
  <optgroup label="Vegetables">
    <option value="carrot">Carrot</option>
    <option value="broccoli">Broccoli</option>
  </optgroup>
</Select>`

const withLabelCode = `import { Select, Label } from '@umichkisa-ds/web'

<div className="flex flex-col gap-2">
  <Label htmlFor="fruit">Fruit</Label>
  <Select id="fruit" defaultValue="">
    <option value="" disabled>Select a fruit...</option>
    <option value="apple">Apple</option>
    <option value="banana">Banana</option>
  </Select>
</div>`

const invalidCode = `import { Select, Label } from '@umichkisa-ds/web'

<div className="flex flex-col gap-2">
  <Label htmlFor="fruit">Fruit</Label>
  <Select id="fruit" invalid defaultValue="">
    <option value="" disabled>Select a fruit...</option>
    <option value="apple">Apple</option>
    <option value="banana">Banana</option>
  </Select>
  <p className="type-caption text-error">Please select a fruit.</p>
</div>`

const disabledCode = `import { Select } from '@umichkisa-ds/web'

<Select disabled>
  <option value="apple">Apple</option>
  <option value="banana">Banana</option>
  <option value="cherry">Cherry</option>
</Select>`

export default function SelectPage() {
  return (
    <article className="mx-auto max-w-3xl px-6 py-12 min-w-0 overflow-hidden">

      {/* ── Header ──────────────────────────────────────────── */}
      <h1 className="type-h1 font-sejong-bold tracking-tight mt-8 mb-4 text-foreground">Select</h1>
      <p className="type-body mb-8 text-foreground max-w-prose">
        Native dropdown for choosing from predefined options. Supports all native{' '}
        <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">
          &lt;select&gt;
        </code>{' '}
        attributes, with an{' '}
        <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">
          invalid
        </code>{' '}
        prop for error styling. Composes with{' '}
        <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">
          Label
        </code>{' '}
        and{' '}
        <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">
          FormItem
        </code>.
      </p>

      {/* ── Examples ────────────────────────────────────────── */}
      <h2 className="type-h2 mt-8 mb-4 text-foreground">Examples</h2>

      {/* Default */}
      <h3 className="type-h3 mt-6 mb-2 text-foreground">Default</h3>
      <p className="type-body mb-2 text-foreground max-w-prose">
        A basic select with three options.
      </p>
      <ComponentPreview code={defaultCode}>
        <div className="w-full max-w-sm">
          <Select>
            <option value="apple">Apple</option>
            <option value="banana">Banana</option>
            <option value="cherry">Cherry</option>
          </Select>
        </div>
      </ComponentPreview>

      {/* With placeholder */}
      <h3 className="type-h3 mt-8 mb-2 text-foreground">With placeholder</h3>
      <p className="type-body mb-2 text-foreground max-w-prose">
        Use a disabled first option as a placeholder prompt.
      </p>
      <ComponentPreview code={placeholderCode}>
        <div className="w-full max-w-sm">
          <Select defaultValue="">
            <option value="" disabled>Select a fruit...</option>
            <option value="apple">Apple</option>
            <option value="banana">Banana</option>
            <option value="cherry">Cherry</option>
          </Select>
        </div>
      </ComponentPreview>

      {/* With optgroup */}
      <h3 className="type-h3 mt-8 mb-2 text-foreground">With optgroup</h3>
      <p className="type-body mb-2 text-foreground max-w-prose">
        Group related options with{' '}
        <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">
          &lt;optgroup&gt;
        </code>.
      </p>
      <ComponentPreview code={optgroupCode}>
        <div className="w-full max-w-sm">
          <Select>
            <optgroup label="Fruits">
              <option value="apple">Apple</option>
              <option value="banana">Banana</option>
            </optgroup>
            <optgroup label="Vegetables">
              <option value="carrot">Carrot</option>
              <option value="broccoli">Broccoli</option>
            </optgroup>
          </Select>
        </div>
      </ComponentPreview>

      {/* With Label */}
      <h3 className="type-h3 mt-8 mb-2 text-foreground">With Label</h3>
      <p className="type-body mb-2 text-foreground max-w-prose">
        Compose with{' '}
        <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">
          Label
        </code>{' '}
        for accessible form fields. Use{' '}
        <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">
          gap-2
        </code>{' '}
        between label and select.
      </p>
      <ComponentPreview code={withLabelCode}>
        <div className="w-full max-w-sm">
          <div className="flex flex-col gap-2">
            <Label htmlFor="fruit-label-demo">Fruit</Label>
            <Select id="fruit-label-demo" defaultValue="">
              <option value="" disabled>Select a fruit...</option>
              <option value="apple">Apple</option>
              <option value="banana">Banana</option>
            </Select>
          </div>
        </div>
      </ComponentPreview>

      {/* Invalid */}
      <h3 className="type-h3 mt-8 mb-2 text-foreground">Invalid</h3>
      <p className="type-body mb-2 text-foreground max-w-prose">
        Pair{' '}
        <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">
          invalid
        </code>{' '}
        with a{' '}
        <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">
          Label
        </code>{' '}
        and an error message below.
      </p>
      <ComponentPreview code={invalidCode}>
        <div className="w-full max-w-sm">
          <div className="flex flex-col gap-2">
            <Label htmlFor="fruit-demo">Fruit</Label>
            <Select id="fruit-demo" invalid defaultValue="">
              <option value="" disabled>Select a fruit...</option>
              <option value="apple">Apple</option>
              <option value="banana">Banana</option>
            </Select>
            <p className="type-caption text-error">Please select a fruit.</p>
          </div>
        </div>
      </ComponentPreview>

      {/* Disabled */}
      <h3 className="type-h3 mt-8 mb-2 text-foreground">Disabled</h3>
      <p className="type-body mb-2 text-foreground max-w-prose">
        The disabled state prevents interaction.
      </p>
      <ComponentPreview code={disabledCode}>
        <div className="w-full max-w-sm">
          <Select disabled>
            <option value="apple">Apple</option>
            <option value="banana">Banana</option>
            <option value="cherry">Cherry</option>
          </Select>
        </div>
      </ComponentPreview>

      {/* ── API Reference ────────────────────────────────────── */}
      <h2 className="type-h2 mt-8 mb-4 text-foreground">API Reference</h2>
      <p className="type-body mb-4 text-foreground max-w-prose">
        Extends all native{' '}
        <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">
          &lt;select&gt;
        </code>{' '}
        attributes. Only custom props are listed below.
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
              <td className="px-4 py-3 type-caption font-mono text-foreground">invalid</td>
              <td className="px-4 py-3 type-caption font-mono text-foreground">boolean</td>
              <td className="px-4 py-3 type-caption font-mono text-foreground">false</td>
              <td className="px-4 py-3 type-body-sm text-foreground">Applies error border and sets aria-invalid.</td>
            </tr>
            <tr className="border-b border-border">
              <td className="px-4 py-3 type-caption font-mono text-foreground">className</td>
              <td className="px-4 py-3 type-caption font-mono text-foreground">string</td>
              <td className="px-4 py-3 type-caption font-mono text-foreground">—</td>
              <td className="px-4 py-3 type-body-sm text-foreground">Merged via cn(). Use for layout utilities only.</td>
            </tr>
            <tr className="border-b border-border">
              <td className="px-4 py-3 type-caption font-mono text-foreground">children</td>
              <td className="px-4 py-3 type-caption font-mono text-foreground">ReactNode</td>
              <td className="px-4 py-3 type-caption font-mono text-foreground">—</td>
              <td className="px-4 py-3 type-body-sm text-foreground">Native &lt;option&gt; and &lt;optgroup&gt; elements.</td>
            </tr>
            <tr className="border-b border-border">
              <td className="px-4 py-3 type-caption font-mono text-foreground">...props</td>
              <td className="px-4 py-3 type-caption font-mono text-foreground">SelectHTMLAttributes</td>
              <td className="px-4 py-3 type-caption font-mono text-foreground">—</td>
              <td className="px-4 py-3 type-body-sm text-foreground">All native select attributes.</td>
            </tr>
          </tbody>
        </table>
      </div>

    </article>
  )
}
