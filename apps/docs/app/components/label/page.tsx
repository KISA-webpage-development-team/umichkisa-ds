import { Container, Label } from '@umichkisa-ds/web'
import { ComponentPreview } from '@/components/ComponentPreview'
import { highlight } from '@/lib/highlight'
import { WithInputDemo, WithAriaDemo } from './_demos'

const defaultCode = `import { Label } from '@umichkisa-ds/web'

<Label htmlFor="name">Full name</Label>`

const requiredCode = `import { Label } from '@umichkisa-ds/web'

<Label htmlFor="email" required>
  Email address
</Label>`

const withInputCode = `import { Label, Input } from '@umichkisa-ds/web'
import { useState } from 'react'

const [value, setValue] = useState('')

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

const withAriaCode = `import { Label, Select, SelectTrigger, SelectContent, SelectItem } from '@umichkisa-ds/web'

<div className="flex flex-col gap-2">
  <Label htmlFor="fruit" id="fruit-label">Fruit</Label>
  <Select>
    <SelectTrigger placeholder="Select a fruit..." aria-labelledby="fruit-label" />
    <SelectContent>
      <SelectItem value="apple">Apple</SelectItem>
      <SelectItem value="banana">Banana</SelectItem>
    </SelectContent>
  </Select>
</div>`

export default async function LabelPage() {
  const [
    defaultHighlighted,
    requiredHighlighted,
    withInputHighlighted,
    withAriaHighlighted,
  ] = await Promise.all([
    highlight(defaultCode),
    highlight(requiredCode),
    highlight(withInputCode),
    highlight(withAriaCode),
  ])

  return (
    <Container size="md" as="article">

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
      <ComponentPreview code={defaultCode} highlightedCode={defaultHighlighted}>
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
      <ComponentPreview code={requiredCode} highlightedCode={requiredHighlighted}>
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
      <ComponentPreview code={withInputCode} highlightedCode={withInputHighlighted}>
        <WithInputDemo />
      </ComponentPreview>

      {/* With aria-labelledby */}
      <h3 className="type-h3 mt-8 mb-2 text-foreground">With aria-labelledby</h3>
      <p className="type-body mb-2 text-foreground max-w-prose">
        For non-native form controls like Radix Select, use{' '}
        <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">
          id
        </code>{' '}
        on the Label and{' '}
        <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">
          aria-labelledby
        </code>{' '}
        on the trigger instead of{' '}
        <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">
          htmlFor
        </code>.
      </p>
      <ComponentPreview code={withAriaCode} highlightedCode={withAriaHighlighted}>
        <WithAriaDemo />
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
              <td className="px-4 py-3 text-foreground"><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle">htmlFor</code></td>
              <td className="px-4 py-3 text-foreground"><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle">string</code></td>
              <td className="px-4 py-3 text-foreground"><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle">required</code></td>
              <td className="px-4 py-3 type-body-sm text-foreground">The id of the form control this label is associated with.</td>
            </tr>
            <tr className="border-b border-border">
              <td className="px-4 py-3 text-foreground"><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle">id</code></td>
              <td className="px-4 py-3 text-foreground"><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle">string</code></td>
              <td className="px-4 py-3 type-body-sm text-foreground">—</td>
              <td className="px-4 py-3 type-body-sm text-foreground">HTML id attribute. Use when other elements need to reference this label via aria-labelledby.</td>
            </tr>
            <tr className="border-b border-border">
              <td className="px-4 py-3 text-foreground"><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle">required</code></td>
              <td className="px-4 py-3 text-foreground"><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle">boolean</code></td>
              <td className="px-4 py-3 text-foreground"><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle">false</code></td>
              <td className="px-4 py-3 type-body-sm text-foreground">Appends a red asterisk to indicate the field is required.</td>
            </tr>
            <tr className="border-b border-border">
              <td className="px-4 py-3 text-foreground"><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle">className</code></td>
              <td className="px-4 py-3 text-foreground"><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle">string</code></td>
              <td className="px-4 py-3 type-body-sm text-foreground">—</td>
              <td className="px-4 py-3 type-body-sm text-foreground">Merged via cn(). Use for layout utilities only.</td>
            </tr>
            <tr className="border-b border-border">
              <td className="px-4 py-3 text-foreground"><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle">children</code></td>
              <td className="px-4 py-3 text-foreground"><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle">ReactNode</code></td>
              <td className="px-4 py-3 text-foreground"><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle">required</code></td>
              <td className="px-4 py-3 type-body-sm text-foreground">Label text content.</td>
            </tr>
          </tbody>
        </table>
      </div>

    </Container>
  )
}
