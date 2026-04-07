import { Container, Input, Label } from '@umichkisa-ds/web'
import { ComponentPreview } from '@/components/ComponentPreview'
import { highlight } from '@/lib/highlight'
import { ControlledDemo } from './_demos'

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

const withErrorCode = `import { Input, Label } from '@umichkisa-ds/web'

<div className="flex flex-col gap-2">
  <Label htmlFor="email">Email</Label>
  <Input id="email" type="email" invalid placeholder="you@example.com" />
  <p className="type-caption text-error">Please enter a valid email.</p>
</div>`

const controlledCode = `const [value, setValue] = useState('')

<Input
  value={value}
  onChange={(e) => setValue(e.target.value)}
  placeholder="Type something..."
  maxLength={50}
/>
<p>{value.length}/50</p>`

export default async function InputPage() {
  const [
    defaultHighlighted,
    statesHighlighted,
    typesHighlighted,
    withLabelHighlighted,
    withErrorHighlighted,
    controlledHighlighted,
  ] = await Promise.all([
    highlight(defaultCode),
    highlight(statesCode),
    highlight(typesCode),
    highlight(withLabelCode),
    highlight(withErrorCode),
    highlight(controlledCode),
  ])

  return (
    <Container size="md" as="article">

      {/* ── Header ──────────────────────────────────────────── */}
      <h1 className="type-h1 mb-4 text-foreground">Input</h1>
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
      <ComponentPreview code={defaultCode} highlightedCode={defaultHighlighted}>
        <div className="w-full max-w-sm">
          <Input placeholder="Enter text..." />
        </div>
      </ComponentPreview>

      {/* States */}
      <h3 className="type-h3 mt-8 mb-2 text-foreground">States</h3>
      <p className="type-body mb-2 text-foreground max-w-prose">
        Default, disabled, and invalid states. Focus the input to see the focus styling.
      </p>
      <ComponentPreview code={statesCode} highlightedCode={statesHighlighted}>
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
      <ComponentPreview code={typesCode} highlightedCode={typesHighlighted}>
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
        between label and input.
      </p>
      <ComponentPreview code={withLabelCode} highlightedCode={withLabelHighlighted}>
        <div className="w-full max-w-sm">
          <div className="flex flex-col gap-2">
            <Label htmlFor="email-demo">Email</Label>
            <Input id="email-demo" type="email" placeholder="you@example.com" />
          </div>
        </div>
      </ComponentPreview>

      {/* With error message */}
      <h3 className="type-h3 mt-8 mb-2 text-foreground">With error message</h3>
      <p className="type-body mb-2 text-foreground max-w-prose">
        Pair{' '}
        <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">
          invalid
        </code>{' '}
        with an error message below the input. Use{' '}
        <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">
          type-caption text-error
        </code>{' '}
        for the message.
      </p>
      <ComponentPreview code={withErrorCode} highlightedCode={withErrorHighlighted}>
        <div className="w-full max-w-sm">
          <div className="flex flex-col gap-2">
            <Label htmlFor="error-demo">Email</Label>
            <Input id="error-demo" type="email" invalid placeholder="you@example.com" />
            <p className="type-caption text-error">Please enter a valid email.</p>
          </div>
        </div>
      </ComponentPreview>

      {/* Controlled */}
      <h3 className="type-h3 mt-8 mb-2 text-foreground">Controlled</h3>
      <p className="type-body mb-2 text-foreground max-w-prose">
        Input supports both controlled and uncontrolled usage.
        Below is a controlled example with live character count.
      </p>
      <ComponentPreview code={controlledCode} highlightedCode={controlledHighlighted}>
        <ControlledDemo />
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
              <th className="px-4 py-3 text-left type-caption border-b border-border text-muted-foreground">Prop</th>
              <th className="px-4 py-3 text-left type-caption border-b border-border text-muted-foreground">Type</th>
              <th className="px-4 py-3 text-left type-caption border-b border-border text-muted-foreground">Default</th>
              <th className="px-4 py-3 text-left type-caption border-b border-border text-muted-foreground">Description</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b border-border">
              <td className="px-4 py-3 text-foreground"><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle">invalid</code></td>
              <td className="px-4 py-3 text-foreground"><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle">boolean</code></td>
              <td className="px-4 py-3 text-foreground"><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle">false</code></td>
              <td className="px-4 py-3 type-body-sm text-foreground">Applies error border and sets aria-invalid.</td>
            </tr>
            <tr className="border-b border-border">
              <td className="px-4 py-3 text-foreground"><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle">type</code></td>
              <td className="px-4 py-3 text-foreground"><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle">string</code></td>
              <td className="px-4 py-3 text-foreground"><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle">&apos;text&apos;</code></td>
              <td className="px-4 py-3 type-body-sm text-foreground">Native input type. Overrides default from &quot;text&quot;.</td>
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
              <td className="px-4 py-3 type-body-sm text-foreground">All native input attributes (value, onChange, placeholder, disabled, name, etc.).</td>
            </tr>
          </tbody>
        </table>
      </div>

    </Container>
  )
}
