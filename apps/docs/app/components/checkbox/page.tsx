'use client'

import { useState } from 'react'
import { Container, Checkbox, FormItem } from '@umichkisa-ds/web'
import { ComponentPreview } from '@/components/ComponentPreview'

const defaultCode = `import { Checkbox } from '@umichkisa-ds/web'

<Checkbox text="Accept terms" />`

const checkedCode = `import { Checkbox } from '@umichkisa-ds/web'

<Checkbox text="Accept terms" defaultChecked />`

const statesCode = `import { Checkbox } from '@umichkisa-ds/web'

{/* Default */}
<Checkbox text="Default" />

{/* Disabled */}
<Checkbox text="Disabled" disabled />

{/* Disabled + Checked */}
<Checkbox text="Disabled checked" disabled defaultChecked />

{/* Invalid */}
<Checkbox text="Invalid" invalid />`

const withFormItemCode = `import { FormItem, Checkbox } from '@umichkisa-ds/web'

<FormItem htmlFor="terms" label="Terms">
  <Checkbox id="terms" text="I agree to the terms" />
</FormItem>`

const withErrorCode = `import { FormItem, Checkbox } from '@umichkisa-ds/web'

<FormItem htmlFor="terms" label="Terms" error="You must accept the terms.">
  <Checkbox id="terms" text="Accept terms" invalid />
</FormItem>`

const controlledCode = `const [agreed, setAgreed] = useState(false)

<Checkbox
  text="I agree to the terms"
  checked={agreed}
  onChange={(e) => setAgreed(e.target.checked)}
/>
<p>{agreed ? 'Accepted' : 'Not accepted'}</p>`

export default function CheckboxPage() {
  const [agreed, setAgreed] = useState(false)

  return (
    <Container size="md" as="article">

      {/* ── Header ──────────────────────────────────────────── */}
      <h1 className="type-h1 font-sejong-bold tracking-tight mt-8 mb-4 text-foreground">Checkbox</h1>
      <p className="type-body mb-8 text-foreground max-w-prose">
        Standalone checkbox for boolean selections. Pass the{' '}
        <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">
          text
        </code>{' '}
        prop to render an inline label, or compose with{' '}
        <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">
          FormItem
        </code>{' '}
        for structured form layouts.
      </p>

      {/* ── Examples ────────────────────────────────────────── */}
      <h2 className="type-h2 mt-8 mb-4 text-foreground">Examples</h2>

      {/* Default */}
      <h3 className="type-h3 mt-6 mb-2 text-foreground">Default</h3>
      <p className="type-body mb-2 text-foreground max-w-prose">
        A single unchecked checkbox with inline label text.
      </p>
      <ComponentPreview code={defaultCode}>
        <Checkbox text="Accept terms" />
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
        <Checkbox text="Accept terms" defaultChecked />
      </ComponentPreview>

      {/* States */}
      <h3 className="type-h3 mt-8 mb-2 text-foreground">States</h3>
      <p className="type-body mb-2 text-foreground max-w-prose">
        Default, disabled unchecked, disabled checked, and invalid states.
      </p>
      <ComponentPreview code={statesCode}>
        <div className="flex items-center gap-4">
          <Checkbox text="Default" />
          <Checkbox text="Disabled" disabled />
          <Checkbox text="Disabled checked" disabled defaultChecked />
          <Checkbox text="Invalid" invalid />
        </div>
      </ComponentPreview>

      {/* With FormItem */}
      <h3 className="type-h3 mt-8 mb-2 text-foreground">With FormItem</h3>
      <p className="type-body mb-2 text-foreground max-w-prose">
        Compose with{' '}
        <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">
          FormItem
        </code>{' '}
        for structured form layouts.
      </p>
      <ComponentPreview code={withFormItemCode}>
        <FormItem htmlFor="terms" label="Terms">
          <Checkbox id="terms" text="I agree to the terms" />
        </FormItem>
      </ComponentPreview>

      {/* With error message */}
      <h3 className="type-h3 mt-8 mb-2 text-foreground">With error message</h3>
      <p className="type-body mb-2 text-foreground max-w-prose">
        Pair{' '}
        <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">
          invalid
        </code>{' '}
        with a{' '}
        <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">
          FormItem
        </code>{' '}
        error message.
      </p>
      <ComponentPreview code={withErrorCode}>
        <FormItem htmlFor="terms" label="Terms" error="You must accept the terms.">
          <Checkbox id="terms" text="Accept terms" invalid />
        </FormItem>
      </ComponentPreview>

      {/* Controlled */}
      <h3 className="type-h3 mt-8 mb-2 text-foreground">Controlled</h3>
      <p className="type-body mb-2 text-foreground max-w-prose">
        Checkbox supports both controlled and uncontrolled usage.
        Below is a controlled example with live state feedback.
      </p>
      <ComponentPreview code={controlledCode}>
        <div className="flex flex-col gap-2">
          <Checkbox
            text="I agree to the terms"
            checked={agreed}
            onChange={(e) => setAgreed(e.target.checked)}
          />
          <p className="type-caption text-muted-foreground">{agreed ? 'Accepted' : 'Not accepted'}</p>
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
              <th className="px-4 py-3 text-left type-caption border-b border-border text-muted-foreground">Prop</th>
              <th className="px-4 py-3 text-left type-caption border-b border-border text-muted-foreground">Type</th>
              <th className="px-4 py-3 text-left type-caption border-b border-border text-muted-foreground">Default</th>
              <th className="px-4 py-3 text-left type-caption border-b border-border text-muted-foreground">Description</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b border-border">
              <td className="px-4 py-3 text-foreground"><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle">text</code></td>
              <td className="px-4 py-3 text-foreground"><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle">string</code></td>
              <td className="px-4 py-3 type-body-sm text-foreground">—</td>
              <td className="px-4 py-3 type-body-sm text-foreground">Inline label text rendered beside the checkbox.</td>
            </tr>
            <tr className="border-b border-border">
              <td className="px-4 py-3 text-foreground"><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle">invalid</code></td>
              <td className="px-4 py-3 text-foreground"><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle">boolean</code></td>
              <td className="px-4 py-3 text-foreground"><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle">false</code></td>
              <td className="px-4 py-3 type-body-sm text-foreground">Applies error border and sets aria-invalid.</td>
            </tr>
            <tr className="border-b border-border">
              <td className="px-4 py-3 text-foreground"><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle">className</code></td>
              <td className="px-4 py-3 text-foreground"><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle">string</code></td>
              <td className="px-4 py-3 type-body-sm text-foreground">—</td>
              <td className="px-4 py-3 type-body-sm text-foreground">Merged via cn(). Use for layout utilities only.</td>
            </tr>
            <tr className="border-b border-border">
              <td className="px-4 py-3 text-foreground"><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle">...props</code></td>
              <td className="px-4 py-3 text-foreground"><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle">InputHTMLAttributes</code></td>
              <td className="px-4 py-3 type-body-sm text-foreground">—</td>
              <td className="px-4 py-3 type-body-sm text-foreground">All native checkbox attributes except type.</td>
            </tr>
          </tbody>
        </table>
      </div>

    </Container>
  )
}
