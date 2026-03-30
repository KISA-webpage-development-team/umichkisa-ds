'use client'

import { Label, Input } from '@umichkisa-ds/web'
import { ComponentPreview } from '@/components/ComponentPreview'
import { useState } from 'react'

const defaultCode = `import { Label } from '@umichkisa-ds/web'

<Label htmlFor="name">Full name</Label>`

const requiredCode = `import { Label } from '@umichkisa-ds/web'

<Label htmlFor="email" required>
  Email address
</Label>`

const withInputCode = `import { Label, Input } from '@umichkisa-ds/web'

<Label htmlFor="username" required>
  Username
</Label>
<Input
  id="username"
  type="text"
  value={value}
  onChange={(e) => setValue(e.target.value)}
  placeholder="Enter your username"
/>`

export default function LabelPage() {
  const [username, setUsername] = useState('')

  return (
    <article className="mx-auto max-w-3xl px-6 py-12 min-w-0 overflow-hidden">

      {/* ── Header ──────────────────────────────────────────── */}
      <h1 className="type-h1 font-sejong-bold tracking-tight mt-8 mb-4 text-foreground">Label</h1>
      <p className="type-body mb-8 text-foreground max-w-prose">
        Form label with an optional required indicator. Renders a native{' '}
        <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">
          &lt;label&gt;
        </code>{' '}
        element linked to its form control via{' '}
        <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">
          htmlFor
        </code>
        . When{' '}
        <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">
          required
        </code>{' '}
        is set, an asterisk is appended automatically.
      </p>

      {/* ── Examples ────────────────────────────────────────── */}
      <h2 className="type-h2 mt-8 mb-4 text-foreground">Examples</h2>

      {/* Default */}
      <h3 className="type-h3 mt-8 mb-2 text-foreground">Default</h3>
      <p className="type-body mb-2 text-foreground max-w-prose">
        A basic label linked to a form control by id.
      </p>
      <ComponentPreview code={defaultCode}>
        <Label htmlFor="name">Full name</Label>
      </ComponentPreview>

      {/* Required */}
      <h3 className="type-h3 mt-8 mb-2 text-foreground">Required</h3>
      <p className="type-body mb-2 text-foreground max-w-prose">
        When{' '}
        <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">
          required
        </code>{' '}
        is true, a red asterisk is appended to signal the field is mandatory.
      </p>
      <ComponentPreview code={requiredCode}>
        <Label htmlFor="email" required>Email address</Label>
      </ComponentPreview>

      {/* With input */}
      <h3 className="type-h3 mt-8 mb-2 text-foreground">With input</h3>
      <p className="type-body mb-2 text-foreground max-w-prose">
        Pair a Label with an Input using matching{' '}
        <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">
          htmlFor
        </code>{' '}
        and{' '}
        <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">
          id
        </code>{' '}
        values. Clicking the label focuses the input.
      </p>
      <ComponentPreview code={withInputCode}>
        <div className="flex flex-col gap-2">
          <Label htmlFor="username" required>Username</Label>
          <Input
            id="username"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Enter your username"
          />
        </div>
      </ComponentPreview>

      {/* ── API Reference ────────────────────────────────────── */}
      <h2 className="type-h2 mt-8 mb-4 text-foreground">API Reference</h2>
      <p className="type-body mb-4 text-foreground max-w-prose">
        Label accepts the following props alongside standard{' '}
        <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">
          &lt;label&gt;
        </code>{' '}
        attributes.
      </p>
      <div className="my-4 overflow-x-auto">
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
              <td className="px-4 py-3 type-caption font-mono text-foreground">htmlFor</td>
              <td className="px-4 py-3 type-caption font-mono text-foreground">string</td>
              <td className="px-4 py-3 type-caption font-mono text-foreground">—</td>
              <td className="px-4 py-3 type-body-sm text-foreground">The id of the form control this label is associated with.</td>
            </tr>
            <tr className="border-b border-border">
              <td className="px-4 py-3 type-caption font-mono text-foreground">required</td>
              <td className="px-4 py-3 type-caption font-mono text-foreground">boolean</td>
              <td className="px-4 py-3 type-caption font-mono text-foreground">false</td>
              <td className="px-4 py-3 type-body-sm text-foreground">Appends a red asterisk to indicate the field is required.</td>
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
              <td className="px-4 py-3 type-body-sm text-foreground">Label text content.</td>
            </tr>
          </tbody>
        </table>
      </div>

    </article>
  )
}
