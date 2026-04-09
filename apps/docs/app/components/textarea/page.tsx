import {
  Container,
  Textarea,
  FormItem,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableMobileItem,
  TableMobileList,
  TableRow,
} from '@umichkisa-ds/web'
import { ComponentPreview } from '@/components/ComponentPreview'
import { highlight } from '@/lib/highlight'
import { ControlledDemo } from './_demos'

const defaultCode = `import { Textarea } from '@umichkisa-ds/web'

<Textarea placeholder="Enter your message..." />`

const statesCode = `import { Textarea } from '@umichkisa-ds/web'

{/* Default */}
<Textarea placeholder="Default" />

{/* Disabled */}
<Textarea placeholder="Disabled" disabled />

{/* Invalid */}
<Textarea placeholder="Invalid" invalid />`

const withFormItemCode = `import { Textarea, FormItem } from '@umichkisa-ds/web'

<FormItem htmlFor="message" label="Message">
  <Textarea id="message" placeholder="Write your message..." />
</FormItem>`

const withErrorCode = `import { Textarea, FormItem } from '@umichkisa-ds/web'

<FormItem htmlFor="message" label="Message" error="Message is required.">
  <Textarea id="message" invalid placeholder="Write your message..." />
</FormItem>`

const controlledCode = `const [value, setValue] = useState('')

<Textarea
  value={value}
  onChange={(e) => setValue(e.target.value)}
  placeholder="Type something..."
  maxLength={200}
/>
<p>{value.length}/200</p>`

export default async function TextareaPage() {
  const [
    defaultHighlighted,
    statesHighlighted,
    withFormItemHighlighted,
    withErrorHighlighted,
    controlledHighlighted,
  ] = await Promise.all([
    highlight(defaultCode),
    highlight(statesCode),
    highlight(withFormItemCode),
    highlight(withErrorCode),
    highlight(controlledCode),
  ])

  return (
    <Container size="md" as="article">

      {/* ── Header ──────────────────────────────────────────── */}
      <h1 className="type-h1 mb-4 text-foreground">Textarea</h1>
      <p className="type-body mb-8 text-foreground max-w-prose">
        Multi-line text field for user input. Resizes vertically by default. Designed to compose with{' '}
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
        The simplest usage. Renders a full-width multi-line text area.
      </p>
      <ComponentPreview code={defaultCode} highlightedCode={defaultHighlighted}>
        <div className="w-full max-w-sm">
          <Textarea placeholder="Enter your message..." />
        </div>
      </ComponentPreview>

      {/* States */}
      <h3 className="type-h3 mt-8 mb-2 text-foreground">States</h3>
      <p className="type-body mb-2 text-foreground max-w-prose">
        Default, disabled, and invalid states. Focus the textarea to see the focus styling.
      </p>
      <ComponentPreview code={statesCode} highlightedCode={statesHighlighted}>
        <div className="flex flex-col gap-4 w-full max-w-sm">
          <Textarea placeholder="Default" />
          <Textarea placeholder="Disabled" disabled />
          <Textarea placeholder="Invalid" invalid />
        </div>
      </ComponentPreview>

      {/* With FormItem */}
      <h3 className="type-h3 mt-8 mb-2 text-foreground">With FormItem</h3>
      <p className="type-body mb-2 text-foreground max-w-prose">
        FormItem is the recommended composition — it wires the label, description, and error together and provides the vertical layout.
      </p>
      <ComponentPreview code={withFormItemCode} highlightedCode={withFormItemHighlighted}>
        <div className="w-full max-w-sm">
          <FormItem htmlFor="message-demo" label="Message">
            <Textarea id="message-demo" placeholder="Write your message..." />
          </FormItem>
        </div>
      </ComponentPreview>

      {/* With error message */}
      <h3 className="type-h3 mt-8 mb-2 text-foreground">With error message</h3>
      <p className="type-body mb-2 text-foreground max-w-prose">
        Pair{' '}
        <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">
          invalid
        </code>{' '}
        on the Textarea with FormItem&apos;s{' '}
        <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">
          error
        </code>{' '}
        prop to display an error message below the field.
      </p>
      <ComponentPreview code={withErrorCode} highlightedCode={withErrorHighlighted}>
        <div className="w-full max-w-sm">
          <FormItem htmlFor="error-demo" label="Message" error="Message is required.">
            <Textarea id="error-demo" invalid placeholder="Write your message..." />
          </FormItem>
        </div>
      </ComponentPreview>

      {/* Controlled */}
      <h3 className="type-h3 mt-8 mb-2 text-foreground">Controlled</h3>
      <p className="type-body mb-2 text-foreground max-w-prose">
        Textarea supports both controlled and uncontrolled usage.
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
          &lt;textarea&gt;
        </code>{' '}
        attributes. Only custom props are listed below.
      </p>
      <div className="my-6">
        <div className="hidden md:block">
          <Table size="sm">
            <TableHeader>
              <TableRow>
                <TableHead>Prop</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Default</TableHead>
                <TableHead>Description</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle">invalid</code></TableCell>
                <TableCell><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle">boolean</code></TableCell>
                <TableCell><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle">false</code></TableCell>
                <TableCell>Applies error border and sets aria-invalid.</TableCell>
              </TableRow>
              <TableRow>
                <TableCell><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle">rows</code></TableCell>
                <TableCell><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle">number</code></TableCell>
                <TableCell><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle">3</code></TableCell>
                <TableCell>Number of visible text lines. Maps to native rows attribute.</TableCell>
              </TableRow>
              <TableRow>
                <TableCell><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle">className</code></TableCell>
                <TableCell><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle">string</code></TableCell>
                <TableCell>—</TableCell>
                <TableCell>Merged via cn(). Use for layout utilities only.</TableCell>
              </TableRow>
              <TableRow>
                <TableCell><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle">...props</code></TableCell>
                <TableCell><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle">TextareaHTMLAttributes</code></TableCell>
                <TableCell>—</TableCell>
                <TableCell>All native textarea attributes (value, onChange, placeholder, disabled, name, etc.).</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
        <div className="block md:hidden">
          <TableMobileList>
            <TableMobileItem>
              <span className="type-body-sm text-foreground"><strong>invalid</strong></span>
              <span className="type-caption text-muted-foreground"><code className="rounded px-1 py-0.5 font-mono bg-surface-subtle">boolean</code></span>
              <span className="type-caption text-muted-foreground">Default: <code className="rounded px-1 py-0.5 font-mono bg-surface-subtle">false</code></span>
              <span className="type-caption text-muted-foreground">Applies error border and sets aria-invalid.</span>
            </TableMobileItem>
            <TableMobileItem>
              <span className="type-body-sm text-foreground"><strong>rows</strong></span>
              <span className="type-caption text-muted-foreground"><code className="rounded px-1 py-0.5 font-mono bg-surface-subtle">number</code></span>
              <span className="type-caption text-muted-foreground">Default: <code className="rounded px-1 py-0.5 font-mono bg-surface-subtle">3</code></span>
              <span className="type-caption text-muted-foreground">Number of visible text lines. Maps to native rows attribute.</span>
            </TableMobileItem>
            <TableMobileItem>
              <span className="type-body-sm text-foreground"><strong>className</strong></span>
              <span className="type-caption text-muted-foreground"><code className="rounded px-1 py-0.5 font-mono bg-surface-subtle">string</code></span>
              <span className="type-caption text-muted-foreground">Merged via cn(). Use for layout utilities only.</span>
            </TableMobileItem>
            <TableMobileItem>
              <span className="type-body-sm text-foreground"><strong>...props</strong></span>
              <span className="type-caption text-muted-foreground"><code className="rounded px-1 py-0.5 font-mono bg-surface-subtle">TextareaHTMLAttributes</code></span>
              <span className="type-caption text-muted-foreground">All native textarea attributes (value, onChange, placeholder, disabled, name, etc.).</span>
            </TableMobileItem>
          </TableMobileList>
        </div>
      </div>

    </Container>
  )
}
