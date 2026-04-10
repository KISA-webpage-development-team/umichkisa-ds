import {
  Alert,
  Checkbox,
  Container,
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
import { InlineCode } from '@/components/InlineCode'
import { highlight } from '@/lib/highlight'
import { ControlledDemo } from './_demos'
import { Heading } from '@/components/Heading'

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

export default async function CheckboxPage() {
  const [
    defaultHighlighted,
    checkedHighlighted,
    statesHighlighted,
    withFormItemHighlighted,
    withErrorHighlighted,
    controlledHighlighted,
  ] = await Promise.all([
    highlight(defaultCode),
    highlight(checkedCode),
    highlight(statesCode),
    highlight(withFormItemCode),
    highlight(withErrorCode),
    highlight(controlledCode),
  ])

  return (
    <Container size="md" as="article">

      {/* ── Header ──────────────────────────────────────────── */}
      <h1 className="type-h1 mb-4 text-foreground">Checkbox</h1>
      <Alert variant="info" className="mb-8">
        Standalone checkbox for boolean selections.
      </Alert>

      {/* ── Examples ────────────────────────────────────────── */}
      <Heading as="h2">Examples</Heading>

      {/* Default */}
      <Heading as="h3" className="mt-6">Default</Heading>
      <ComponentPreview code={defaultCode} highlightedCode={defaultHighlighted}>
        <Checkbox text="Accept terms" />
      </ComponentPreview>

      {/* Checked */}
      <Heading as="h3">Checked</Heading>
      <p className="type-body mb-2 text-foreground max-w-prose">
        A checkbox with{' '}
        <InlineCode>
          defaultChecked
        </InlineCode>{' '}
        set.
      </p>
      <ComponentPreview code={checkedCode} highlightedCode={checkedHighlighted}>
        <Checkbox text="Accept terms" defaultChecked />
      </ComponentPreview>

      {/* States */}
      <Heading as="h3">States</Heading>
      <p className="type-body mb-2 text-foreground max-w-prose">
        Default, disabled unchecked, disabled checked, and invalid states.
      </p>
      <ComponentPreview code={statesCode} highlightedCode={statesHighlighted}>
        <div className="flex flex-col gap-2">
          <Checkbox text="Default" />
          <Checkbox text="Disabled" disabled />
          <Checkbox text="Disabled checked" disabled defaultChecked />
          <Checkbox text="Invalid" invalid />
        </div>
      </ComponentPreview>

      {/* With FormItem */}
      <Heading as="h3">With FormItem</Heading>
      <p className="type-body mb-2 text-foreground max-w-prose">
        Compose with{' '}
        <InlineCode>
          FormItem
        </InlineCode>{' '}
        for structured form layouts.
      </p>
      <ComponentPreview code={withFormItemCode} highlightedCode={withFormItemHighlighted}>
        <FormItem htmlFor="terms" label="Terms">
          <Checkbox id="terms" text="I agree to the terms" />
        </FormItem>
      </ComponentPreview>

      {/* With error message */}
      <Heading as="h3">With error message</Heading>
      <p className="type-body mb-2 text-foreground max-w-prose">
        Pair{' '}
        <InlineCode>
          invalid
        </InlineCode>{' '}
        with a{' '}
        <InlineCode>
          FormItem
        </InlineCode>{' '}
        error message.
      </p>
      <ComponentPreview code={withErrorCode} highlightedCode={withErrorHighlighted}>
        <FormItem htmlFor="terms" label="Terms" error="You must accept the terms.">
          <Checkbox id="terms" text="Accept terms" invalid />
        </FormItem>
      </ComponentPreview>

      {/* Controlled */}
      <Heading as="h3">Controlled</Heading>
      <p className="type-body mb-2 text-foreground max-w-prose">
        Pass{' '}
        <InlineCode>
          checked
        </InlineCode>{' '}
        and{' '}
        <InlineCode>
          onChange
        </InlineCode>{' '}
        for controlled usage.
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
        attributes (except{' '}
        <InlineCode>
          type
        </InlineCode>
        ). Only custom props are listed below.
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
                <TableCell><InlineCode>text</InlineCode></TableCell>
                <TableCell><InlineCode>string</InlineCode></TableCell>
                <TableCell>—</TableCell>
                <TableCell>Inline label text rendered beside the checkbox.</TableCell>
              </TableRow>
              <TableRow>
                <TableCell><InlineCode>invalid</InlineCode></TableCell>
                <TableCell><InlineCode>boolean</InlineCode></TableCell>
                <TableCell><InlineCode>false</InlineCode></TableCell>
                <TableCell>Applies error border and sets aria-invalid.</TableCell>
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
                <TableCell>All native checkbox attributes except type.</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
        <div className="block md:hidden">
          <TableMobileList>
            <TableMobileItem>
              <span className="type-body-sm text-foreground"><strong>text</strong></span>
              <span className="type-caption text-muted-foreground"><InlineCode>string</InlineCode></span>
              <span className="type-caption text-muted-foreground">Inline label text rendered beside the checkbox.</span>
            </TableMobileItem>
            <TableMobileItem>
              <span className="type-body-sm text-foreground"><strong>invalid</strong></span>
              <span className="type-caption text-muted-foreground"><InlineCode>boolean</InlineCode></span>
              <span className="type-caption text-muted-foreground">Default: <InlineCode>false</InlineCode></span>
              <span className="type-caption text-muted-foreground">Applies error border and sets aria-invalid.</span>
            </TableMobileItem>
            <TableMobileItem>
              <span className="type-body-sm text-foreground"><strong>className</strong></span>
              <span className="type-caption text-muted-foreground"><InlineCode>string</InlineCode></span>
              <span className="type-caption text-muted-foreground">Merged via cn(). Use for layout utilities only.</span>
            </TableMobileItem>
            <TableMobileItem>
              <span className="type-body-sm text-foreground"><strong>...props</strong></span>
              <span className="type-caption text-muted-foreground"><InlineCode>InputHTMLAttributes</InlineCode></span>
              <span className="type-caption text-muted-foreground">All native checkbox attributes except type.</span>
            </TableMobileItem>
          </TableMobileList>
        </div>
      </div>

    </Container>
  )
}
