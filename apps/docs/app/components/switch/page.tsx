'use client'

import { useState } from 'react'
import { Switch } from '@umichkisa-ds/web'
import { ComponentPreview } from '@/components/ComponentPreview'

const defaultCode = `import { Switch } from '@umichkisa-ds/web'

<Switch />`

const checkedCode = `import { Switch } from '@umichkisa-ds/web'

<Switch defaultChecked />`

const sizesCode = `import { Switch } from '@umichkisa-ds/web'

{/* Default */}
<Switch />

{/* Small */}
<Switch size="sm" />`

const statesCode = `import { Switch } from '@umichkisa-ds/web'

{/* Default */}
<Switch />

{/* Disabled */}
<Switch disabled />

{/* Disabled + Checked */}
<Switch disabled defaultChecked />

{/* Invalid */}
<Switch invalid />`

const withLabelCode = `import { Switch } from '@umichkisa-ds/web'

<label className="flex items-center gap-2">
  <Switch />
  <span className="type-body text-foreground">Enable notifications</span>
</label>`

const controlledCode = `const [enabled, setEnabled] = useState(false)

<label className="flex items-center gap-2">
  <Switch
    checked={enabled}
    onChange={(e) => setEnabled(e.target.checked)}
  />
  <span className="type-body text-foreground">
    Dark mode
  </span>
</label>
<p>{enabled ? 'On' : 'Off'}</p>`

const withErrorCode = `import { Switch } from '@umichkisa-ds/web'

<div className="flex flex-col gap-2">
  <label className="flex items-center gap-2">
    <Switch invalid />
    <span className="type-body text-foreground">Accept terms</span>
  </label>
  <p className="type-caption text-error">You must accept the terms.</p>
</div>`

export default function SwitchPage() {
  const [enabled, setEnabled] = useState(false)

  return (
    <article className="mx-auto max-w-3xl px-6 py-12 min-w-0 overflow-hidden">

      {/* ── Header ──────────────────────────────────────────── */}
      <h1 className="type-h1 font-sejong-bold tracking-tight mt-8 mb-4 text-foreground">Switch</h1>
      <p className="type-body mb-4 text-foreground max-w-prose">
        A toggle for settings that take effect immediately — e.g., &ldquo;Enable
        notifications&rdquo; or &ldquo;Dark mode&rdquo;. For selections submitted
        with a form, use{' '}
        <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">
          Checkbox
        </code>{' '}
        instead. Wrap in a native{' '}
        <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">
          label
        </code>{' '}
        for click-to-toggle behavior, or compose with{' '}
        <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">
          FormItem
        </code>.
      </p>
      <p className="type-body-sm mb-8 text-muted-foreground max-w-prose">
        Renders a native{' '}
        <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">
          &lt;input type=&quot;checkbox&quot; role=&quot;switch&quot;&gt;
        </code>{' '}
        internally for full form and accessibility support.
      </p>

      {/* ── Examples ────────────────────────────────────────── */}
      <h2 className="type-h2 mt-8 mb-4 text-foreground">Examples</h2>

      {/* Default */}
      <h3 className="type-h3 mt-6 mb-2 text-foreground">Default</h3>
      <p className="type-body mb-2 text-foreground max-w-prose">
        A single switch in the off state.
      </p>
      <ComponentPreview code={defaultCode}>
        <Switch />
      </ComponentPreview>

      {/* Checked */}
      <h3 className="type-h3 mt-8 mb-2 text-foreground">Checked</h3>
      <p className="type-body mb-2 text-foreground max-w-prose">
        A switch with{' '}
        <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">
          defaultChecked
        </code>{' '}
        set.
      </p>
      <ComponentPreview code={checkedCode}>
        <Switch defaultChecked />
      </ComponentPreview>

      {/* Sizes */}
      <h3 className="type-h3 mt-8 mb-2 text-foreground">Sizes</h3>
      <p className="type-body mb-2 text-foreground max-w-prose">
        Default and small sizes. Use{' '}
        <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">
          sm
        </code>{' '}
        for dense UI like table rows or settings panels.
      </p>
      <ComponentPreview code={sizesCode}>
        <div className="flex items-center gap-4">
          <Switch />
          <Switch size="sm" />
        </div>
      </ComponentPreview>

      {/* States */}
      <h3 className="type-h3 mt-8 mb-2 text-foreground">States</h3>
      <p className="type-body mb-2 text-foreground max-w-prose">
        Default, disabled off, disabled on, and invalid states.
      </p>
      <ComponentPreview code={statesCode}>
        <div className="flex items-center gap-4">
          <Switch />
          <Switch disabled />
          <Switch disabled defaultChecked />
          <Switch invalid />
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
        between switch and text.
      </p>
      <ComponentPreview code={withLabelCode}>
        <label className="flex items-center gap-2">
          <Switch />
          <span className="type-body text-foreground">Enable notifications</span>
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
            <Switch invalid />
            <span className="type-body text-foreground">Accept terms</span>
          </label>
          <p className="type-caption text-error">You must accept the terms.</p>
        </div>
      </ComponentPreview>

      {/* Controlled */}
      <h3 className="type-h3 mt-8 mb-2 text-foreground">Controlled</h3>
      <p className="type-body mb-2 text-foreground max-w-prose">
        Switch supports both controlled and uncontrolled usage.
        Below is a controlled example with live state feedback.
      </p>
      <ComponentPreview code={controlledCode}>
        <div className="flex flex-col gap-2">
          <label className="flex items-center gap-2">
            <Switch
              checked={enabled}
              onChange={(e) => setEnabled(e.target.checked)}
            />
            <span className="type-body text-foreground">Dark mode</span>
          </label>
          <p className="type-caption text-muted-foreground">{enabled ? 'On' : 'Off'}</p>
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
        ,{' '}
        <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">
          role
        </code>
        , and{' '}
        <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">
          size
        </code>
        , which are set internally). Only custom props are listed below.
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
              <td className="px-4 py-3 type-caption font-mono text-foreground">size</td>
              <td className="px-4 py-3 type-caption font-mono text-foreground">&quot;default&quot; | &quot;sm&quot;</td>
              <td className="px-4 py-3 type-caption font-mono text-foreground">&quot;default&quot;</td>
              <td className="px-4 py-3 type-body-sm text-foreground">Switch size. Use sm for dense layouts.</td>
            </tr>
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
              <td className="px-4 py-3 type-body-sm text-foreground">All native input attributes except type and role.</td>
            </tr>
          </tbody>
        </table>
      </div>

    </article>
  )
}
