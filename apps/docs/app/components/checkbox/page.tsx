'use client'

import { Checkbox } from '@umichkisa-ds/web'
import { ComponentPreview } from '@/components/ComponentPreview'

const defaultCode = `import { Checkbox } from '@umichkisa-ds/web'

<Checkbox />`

const checkedCode = `import { Checkbox } from '@umichkisa-ds/web'

<Checkbox defaultChecked />`

const statesCode = `import { Checkbox } from '@umichkisa-ds/web'

{/* Default */}
<Checkbox />

{/* Disabled */}
<Checkbox disabled />

{/* Disabled + Checked */}
<Checkbox disabled defaultChecked />

{/* Invalid */}
<Checkbox invalid />`

const withLabelCode = `import { Checkbox } from '@umichkisa-ds/web'

<label className="flex items-center gap-2">
  <Checkbox />
  <span className="type-body text-foreground">Accept terms</span>
</label>`

const withErrorCode = `import { Checkbox } from '@umichkisa-ds/web'

<div className="flex flex-col gap-2">
  <label className="flex items-center gap-2">
    <Checkbox invalid />
    <span className="type-body text-foreground">Accept terms</span>
  </label>
  <p className="type-caption text-error">You must accept the terms.</p>
</div>`

export default function CheckboxPage() {
  return (
    <article className="mx-auto max-w-3xl px-6 py-12 min-w-0 overflow-hidden">

      {/* ── Header ──────────────────────────────────────────── */}
      <h1 className="type-h1 font-sejong-bold tracking-tight mt-8 mb-4 text-foreground">Checkbox</h1>
      <p className="type-body mb-8 text-foreground max-w-prose">
        Standalone checkbox primitive for boolean selections. Designed to compose with{' '}
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
        A single unchecked checkbox.
      </p>
      <ComponentPreview code={defaultCode}>
        <Checkbox />
      </ComponentPreview>

      {/* Checked */}
      <h3 className="type-h3 mt-8 mb-2 text-foreground">Checked</h3>
      <p className="type-body mb-2 text-foreground max-w-prose">
        A checkbox with{' '}
        <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">
          defaultChecked
        </code>{' '}
        set.
      </p>
      <ComponentPreview code={checkedCode}>
        <Checkbox defaultChecked />
      </ComponentPreview>

      {/* States */}
      <h3 className="type-h3 mt-8 mb-2 text-foreground">States</h3>
      <p className="type-body mb-2 text-foreground max-w-prose">
        Default, disabled unchecked, disabled checked, and invalid states.
      </p>
      <ComponentPreview code={statesCode}>
        <div className="flex items-center gap-4">
          <Checkbox />
          <Checkbox disabled />
          <Checkbox disabled defaultChecked />
          <Checkbox invalid />
        </div>
      </ComponentPreview>

      {/* With Label */}
      <h3 className="type-h3 mt-8 mb-2 text-foreground">With Label</h3>
      <p className="type-body mb-2 text-foreground max-w-prose">
        Wrap in a native{' '}
        <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">
          label
        </code>{' '}
        for click-to-toggle behavior. Use{' '}
        <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">
          gap-2
        </code>{' '}
        between checkbox and text.
      </p>
      <ComponentPreview code={withLabelCode}>
        <label className="flex items-center gap-2">
          <Checkbox />
          <span className="type-body text-foreground">Accept terms</span>
        </label>
      </ComponentPreview>

      {/* With error message */}
      <h3 className="type-h3 mt-8 mb-2 text-foreground">With error message</h3>
      <p className="type-body mb-2 text-foreground max-w-prose">
        Pair{' '}
        <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">
          invalid
        </code>{' '}
        with an error message below. Use{' '}
        <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">
          type-caption text-error
        </code>{' '}
        for the message.
      </p>
      <ComponentPreview code={withErrorCode}>
        <div className="flex flex-col gap-2">
          <label className="flex items-center gap-2">
            <Checkbox invalid />
            <span className="type-body text-foreground">Accept terms</span>
          </label>
          <p className="type-caption text-error">You must accept the terms.</p>
        </div>
      </ComponentPreview>

      {/* ── API Reference ────────────────────────────────────── */}
      <h2 className="type-h2 mt-8 mb-4 text-foreground">API Reference</h2>
      <p className="type-body mb-4 text-foreground max-w-prose">
        Extends all native{' '}
        <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">
          &lt;input&gt;
        </code>{' '}
        attributes (except{' '}
        <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">
          type
        </code>
        ). Only custom props are listed below.
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
              <td className="px-4 py-3 type-caption font-mono text-foreground">...props</td>
              <td className="px-4 py-3 type-caption font-mono text-foreground">InputHTMLAttributes</td>
              <td className="px-4 py-3 type-caption font-mono text-foreground">—</td>
              <td className="px-4 py-3 type-body-sm text-foreground">All native checkbox attributes except type.</td>
            </tr>
          </tbody>
        </table>
      </div>

    </article>
  )
}
