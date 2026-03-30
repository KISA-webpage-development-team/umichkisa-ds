'use client'

import { useState } from 'react'
import { Input, Label } from '@umichkisa-ds/web'
import { ComponentPreview } from '@/components/ComponentPreview'

const defaultCode = `import { Input } from '@umichkisa-ds/web'

<Input placeholder="Enter text..." />`

const statesCode = `import { Input } from '@umichkisa-ds/web'

{/* Default */}
<Input placeholder="Default" />

{/* Disabled */}
<Input placeholder="Disabled" disabled />

{/* Invalid */}
<Input placeholder="Invalid" invalid />`

const withLabelCode = `import { Input, Label } from '@umichkisa-ds/web'

<div className="flex flex-col gap-2">
  <Label htmlFor="email">Email</Label>
  <Input id="email" type="email" placeholder="you@example.com" />
</div>`

const typesCode = `import { Input } from '@umichkisa-ds/web'

<Input type="text" placeholder="Text" />
<Input type="email" placeholder="Email" />
<Input type="password" placeholder="Password" />
<Input type="number" placeholder="Number" />`

export default function InputPage() {
  const [value, setValue] = useState('')

  return (
    <article className="mx-auto max-w-3xl px-6 py-12 min-w-0 overflow-hidden">

      {/* ── Header ──────────────────────────────────────────── */}
      <h1 className="type-h1 font-sejong-bold tracking-tight mt-8 mb-4 text-foreground">Input</h1>
      <p className="type-body mb-8 text-foreground max-w-prose">
        Single-line text field for user input. Supports all native{' '}
        <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">
          &lt;input&gt;
        </code>{' '}
        attributes, with an additional{' '}
        <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">
          invalid
        </code>{' '}
        prop for error styling. Designed to compose with{' '}
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
        The simplest usage. Renders a full-width text input.
      </p>
      <ComponentPreview code={defaultCode}>
        <div className="w-full max-w-sm">
          <Input placeholder="Enter text..." />
        </div>
      </ComponentPreview>

      {/* States */}
      <h3 className="type-h3 mt-8 mb-2 text-foreground">States</h3>
      <p className="type-body mb-2 text-foreground max-w-prose">
        Default, disabled, and invalid states. Focus the input to see the dual-ring focus indicator.
      </p>
      <ComponentPreview code={statesCode}>
        <div className="flex flex-col gap-4 w-full max-w-sm">
          <Input placeholder="Default" />
          <Input placeholder="Disabled" disabled />
          <Input placeholder="Invalid" invalid />
        </div>
      </ComponentPreview>

      {/* Input types */}
      <h3 className="type-h3 mt-8 mb-2 text-foreground">Input types</h3>
      <p className="type-body mb-2 text-foreground max-w-prose">
        Pass any native{' '}
        <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">
          type
        </code>{' '}
        attribute. Defaults to{' '}
        <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">
          text
        </code>.
      </p>
      <ComponentPreview code={typesCode}>
        <div className="flex flex-col gap-4 w-full max-w-sm">
          <Input type="text" placeholder="Text" />
          <Input type="email" placeholder="Email" />
          <Input type="password" placeholder="Password" />
          <Input type="number" placeholder="Number" />
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
        (element tier spacing) between label and input.
      </p>
      <ComponentPreview code={withLabelCode}>
        <div className="w-full max-w-sm">
          <div className="flex flex-col gap-2">
            <Label htmlFor="email-demo">Email</Label>
            <Input id="email-demo" type="email" placeholder="you@example.com" />
          </div>
        </div>
      </ComponentPreview>

      {/* Controlled */}
      <h3 className="type-h3 mt-8 mb-2 text-foreground">Controlled</h3>
      <p className="type-body mb-2 text-foreground max-w-prose">
        Input supports both controlled and uncontrolled usage.
        Below is a controlled example with live character count.
      </p>
      <ComponentPreview code={`const [value, setValue] = useState('')\n\n<Input\n  value={value}\n  onChange={(e) => setValue(e.target.value)}\n  placeholder="Type something..."\n  maxLength={50}\n/>\n<p>{value.length}/50</p>`}>
        <div className="w-full max-w-sm flex flex-col gap-2">
          <Input
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder="Type something..."
            maxLength={50}
          />
          <p className="type-caption text-muted-foreground">{value.length}/50</p>
        </div>
      </ComponentPreview>

      {/* ── API Reference ────────────────────────────────────── */}
      <h2 className="type-h2 mt-8 mb-4 text-foreground">API Reference</h2>
      <p className="type-body mb-4 text-foreground max-w-prose">
        Extends all native{' '}
        <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">
          &lt;input&gt;
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
              <td className="px-4 py-3 type-caption font-mono text-foreground">type</td>
              <td className="px-4 py-3 type-caption font-mono text-foreground">string</td>
              <td className="px-4 py-3 type-caption font-mono text-foreground">&apos;text&apos;</td>
              <td className="px-4 py-3 type-body-sm text-foreground">Native input type. Overrides default from &quot;text&quot;.</td>
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
              <td className="px-4 py-3 type-body-sm text-foreground">All native input attributes (value, onChange, placeholder, disabled, name, etc.).</td>
            </tr>
          </tbody>
        </table>
      </div>

    </article>
  )
}
