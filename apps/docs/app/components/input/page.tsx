import {
  Container,
  Input,
  Label,
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
import { Heading } from '@/components/Heading'
import { InlineCode } from '@/components/InlineCode'

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
        <InlineCode>
          &lt;input&gt;
        </InlineCode>{' '}
        attributes, with an additional{' '}
        <InlineCode>
          invalid
        </InlineCode>{' '}
        prop for error styling. Designed to compose with{' '}
        <InlineCode>
          Label
        </InlineCode>.
      </p>

      {/* ── Examples ────────────────────────────────────────── */}
      <Heading as="h2">Examples</Heading>

      {/* Default */}
      <Heading as="h3" className="mt-6">Default</Heading>
      <p className="type-body mb-2 text-foreground max-w-prose">
        The simplest usage. Renders a full-width text input.
      </p>
      <ComponentPreview code={defaultCode} highlightedCode={defaultHighlighted}>
        <div className="w-full max-w-sm">
          <Input placeholder="Enter text..." />
        </div>
      </ComponentPreview>

      {/* States */}
      <Heading as="h3">States</Heading>
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
      <Heading as="h3">Input types</Heading>
      <p className="type-body mb-2 text-foreground max-w-prose">
        Pass any native{' '}
        <InlineCode>
          type
        </InlineCode>{' '}
        attribute. Defaults to{' '}
        <InlineCode>
          text
        </InlineCode>.
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
      <Heading as="h3">With Label</Heading>
      <p className="type-body mb-2 text-foreground max-w-prose">
        Compose with{' '}
        <InlineCode>
          Label
        </InlineCode>{' '}
        for accessible form fields.
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
      <Heading as="h3">With error message</Heading>
      <p className="type-body mb-2 text-foreground max-w-prose">
        Pair{' '}
        <InlineCode>
          invalid
        </InlineCode>{' '}
        with an error message below the input. Use{' '}
        <InlineCode>
          type-caption text-error
        </InlineCode>{' '}
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
      <Heading as="h3">Controlled</Heading>
      <p className="type-body mb-2 text-foreground max-w-prose">
        Input supports both controlled and uncontrolled usage.
        Below is a controlled example with live character count.
      </p>
      <ComponentPreview code={controlledCode} highlightedCode={controlledHighlighted}>
        <ControlledDemo />
      </ComponentPreview>

      {/* ── API Reference ────────────────────────────────────── */}
      <Heading as="h2">API Reference</Heading>
      <p className="type-body mb-4 text-foreground max-w-prose">
        Extends all native{' '}
        <InlineCode>
          &lt;input&gt;
        </InlineCode>{' '}
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
                <TableCell><InlineCode>invalid</InlineCode></TableCell>
                <TableCell><InlineCode>boolean</InlineCode></TableCell>
                <TableCell><InlineCode>false</InlineCode></TableCell>
                <TableCell>Applies error border and sets aria-invalid.</TableCell>
              </TableRow>
              <TableRow>
                <TableCell><InlineCode>type</InlineCode></TableCell>
                <TableCell><InlineCode>string</InlineCode></TableCell>
                <TableCell><InlineCode>&quot;text&quot;</InlineCode></TableCell>
                <TableCell>Native input type. Defaults to &quot;text&quot;.</TableCell>
              </TableRow>
              <TableRow>
                <TableCell><InlineCode>className</InlineCode></TableCell>
                <TableCell><InlineCode>string</InlineCode></TableCell>
                <TableCell>—</TableCell>
                <TableCell>Merged via cn(). Use for layout utilities only.</TableCell>
              </TableRow>
              <TableRow>
                <TableCell><InlineCode>...props</InlineCode></TableCell>
                <TableCell><InlineCode>InputHTMLAttributes</InlineCode></TableCell>
                <TableCell>—</TableCell>
                <TableCell>All native input attributes (value, onChange, placeholder, disabled, name, etc.).</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
        <div className="block md:hidden">
          <TableMobileList>
            <TableMobileItem>
              <span className="type-body-sm text-foreground"><strong>invalid</strong></span>
              <span className="type-caption text-muted-foreground"><InlineCode>boolean</InlineCode></span>
              <span className="type-caption text-muted-foreground">Default: <InlineCode>false</InlineCode></span>
              <span className="type-caption text-muted-foreground">Applies error border and sets aria-invalid.</span>
            </TableMobileItem>
            <TableMobileItem>
              <span className="type-body-sm text-foreground"><strong>type</strong></span>
              <span className="type-caption text-muted-foreground"><InlineCode>string</InlineCode></span>
              <span className="type-caption text-muted-foreground">Default: <InlineCode>&quot;text&quot;</InlineCode></span>
              <span className="type-caption text-muted-foreground">Native input type. Defaults to &quot;text&quot;.</span>
            </TableMobileItem>
            <TableMobileItem>
              <span className="type-body-sm text-foreground"><strong>className</strong></span>
              <span className="type-caption text-muted-foreground"><InlineCode>string</InlineCode></span>
              <span className="type-caption text-muted-foreground">Merged via cn(). Use for layout utilities only.</span>
            </TableMobileItem>
            <TableMobileItem>
              <span className="type-body-sm text-foreground"><strong>...props</strong></span>
              <span className="type-caption text-muted-foreground"><InlineCode>InputHTMLAttributes</InlineCode></span>
              <span className="type-caption text-muted-foreground">All native input attributes (value, onChange, placeholder, disabled, name, etc.).</span>
            </TableMobileItem>
          </TableMobileList>
        </div>
      </div>

    </Container>
  )
}
