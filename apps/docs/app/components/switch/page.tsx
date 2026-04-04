import { Container, Switch, FormItem } from '@umichkisa-ds/web'
import { ComponentPreview } from '@/components/ComponentPreview'
import { highlight } from '@/lib/highlight'
import { ControlledDemo } from './_demos'

const defaultCode = `import { Switch } from '@umichkisa-ds/web'

<Switch text="Enable notifications" />`

const checkedCode = `import { Switch } from '@umichkisa-ds/web'

<Switch text="Enable notifications" defaultChecked />`

const sizesCode = `import { Switch } from '@umichkisa-ds/web'

{/* Default — label uses type-body-sm */}
<Switch text="Default size" />

{/* Small — label uses type-caption */}
<Switch size="sm" text="Small size" />`

const statesCode = `import { Switch } from '@umichkisa-ds/web'

{/* Default */}
<Switch text="Default" />

{/* Disabled */}
<Switch text="Disabled" disabled />

{/* Disabled + Checked */}
<Switch text="Disabled checked" disabled defaultChecked />

{/* Invalid */}
<Switch text="Invalid" invalid />`

const withFormItemCode = `import { Switch, FormItem } from '@umichkisa-ds/web'

<FormItem htmlFor="notif" label="Notifications">
  <Switch id="notif" text="Send email updates" />
</FormItem>`

const withErrorCode = `import { Switch, FormItem } from '@umichkisa-ds/web'

<FormItem htmlFor="terms" label="Terms" error="You must accept the terms.">
  <Switch id="terms" text="Accept terms" invalid />
</FormItem>`

const controlledCode = `const [enabled, setEnabled] = useState(false)

<Switch
  text="Dark mode"
  checked={enabled}
  onChange={(e) => setEnabled(e.target.checked)}
/>
<p>{enabled ? 'On' : 'Off'}</p>`

export default async function SwitchPage() {
  const [
    defaultHighlighted,
    checkedHighlighted,
    sizesHighlighted,
    statesHighlighted,
    withFormItemHighlighted,
    withErrorHighlighted,
    controlledHighlighted,
  ] = await Promise.all([
    highlight(defaultCode),
    highlight(checkedCode),
    highlight(sizesCode),
    highlight(statesCode),
    highlight(withFormItemCode),
    highlight(withErrorCode),
    highlight(controlledCode),
  ])

  return (
    <Container size="md" as="article">

      {/* ── Header ──────────────────────────────────────────── */}
      <h1 className="type-h1 font-sejong-bold tracking-tight mt-8 mb-4 text-foreground">Switch</h1>
      <p className="type-body mb-4 text-foreground max-w-prose">
        A toggle for settings that take effect immediately — e.g., &ldquo;Enable
        notifications&rdquo; or &ldquo;Dark mode&rdquo;. Pass the{' '}
        <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">
          text
        </code>{' '}
        prop for an inline label that automatically wraps in a native{' '}
        <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">
          label
        </code>
        . For selections submitted with a form, use{' '}
        <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">
          Checkbox
        </code>{' '}
        instead. Compose with{' '}
        <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">
          FormItem
        </code>{' '}
        for labeled form fields.
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
        A switch with inline label text in the off state.
      </p>
      <ComponentPreview code={defaultCode} highlightedCode={defaultHighlighted}>
        <Switch text="Enable notifications" />
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
      <ComponentPreview code={checkedCode} highlightedCode={checkedHighlighted}>
        <Switch text="Enable notifications" defaultChecked />
      </ComponentPreview>

      {/* Sizes */}
      <h3 className="type-h3 mt-8 mb-2 text-foreground">Sizes</h3>
      <p className="type-body mb-2 text-foreground max-w-prose">
        Default and small sizes. The{' '}
        <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">
          sm
        </code>{' '}
        size uses smaller label text (
        <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">
          type-caption
        </code>
        ) for dense UI like table rows or settings panels.
      </p>
      <ComponentPreview code={sizesCode} highlightedCode={sizesHighlighted}>
        <div className="flex flex-col gap-4">
          <Switch text="Default size" />
          <Switch size="sm" text="Small size" />
        </div>
      </ComponentPreview>

      {/* States */}
      <h3 className="type-h3 mt-8 mb-2 text-foreground">States</h3>
      <p className="type-body mb-2 text-foreground max-w-prose">
        Default, disabled off, disabled on, and invalid states.
      </p>
      <ComponentPreview code={statesCode} highlightedCode={statesHighlighted}>
        <div className="flex flex-col gap-4">
          <Switch text="Default" />
          <Switch text="Disabled" disabled />
          <Switch text="Disabled checked" disabled defaultChecked />
          <Switch text="Invalid" invalid />
        </div>
      </ComponentPreview>

      {/* With FormItem */}
      <h3 className="type-h3 mt-8 mb-2 text-foreground">With FormItem</h3>
      <p className="type-body mb-2 text-foreground max-w-prose">
        Compose with{' '}
        <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">
          FormItem
        </code>{' '}
        for labeled form fields. The{' '}
        <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">
          text
        </code>{' '}
        prop provides a secondary inline label next to the control.
      </p>
      <ComponentPreview code={withFormItemCode} highlightedCode={withFormItemHighlighted}>
        <FormItem htmlFor="notif" label="Notifications">
          <Switch id="notif" text="Send email updates" />
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
      <ComponentPreview code={withErrorCode} highlightedCode={withErrorHighlighted}>
        <FormItem htmlFor="terms" label="Terms" error="You must accept the terms.">
          <Switch id="terms" text="Accept terms" invalid />
        </FormItem>
      </ComponentPreview>

      {/* Controlled */}
      <h3 className="type-h3 mt-8 mb-2 text-foreground">Controlled</h3>
      <p className="type-body mb-2 text-foreground max-w-prose">
        Switch supports both controlled and uncontrolled usage.
        Below is a controlled example with live state feedback.
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
              <td className="px-4 py-3 type-body-sm text-foreground">Inline label text. Uses type-body-sm for default size, type-caption for sm.</td>
            </tr>
            <tr className="border-b border-border">
              <td className="px-4 py-3 text-foreground"><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle">size</code></td>
              <td className="px-4 py-3 text-foreground"><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle">&quot;default&quot; | &quot;sm&quot;</code></td>
              <td className="px-4 py-3 text-foreground"><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle">&quot;default&quot;</code></td>
              <td className="px-4 py-3 type-body-sm text-foreground">Switch size. Use sm for dense layouts.</td>
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
              <td className="px-4 py-3 type-body-sm text-foreground">All native input attributes except type and role.</td>
            </tr>
          </tbody>
        </table>
      </div>

    </Container>
  )
}
