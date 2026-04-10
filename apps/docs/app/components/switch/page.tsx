import { Container, Switch, FormItem, Table, TableBody, TableCell, TableHead, TableHeader, TableMobileItem, TableMobileList, TableRow } from '@umichkisa-ds/web'
import { ComponentPreview } from '@/components/ComponentPreview'
import { highlight } from '@/lib/highlight'
import { ControlledDemo } from './_demos'
import { Heading } from '@/components/Heading'
import { InlineCode } from '@/components/InlineCode'

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
      <h1 className="type-h1 mb-4 text-foreground">Switch</h1>
      <p className="type-body mb-8 text-foreground max-w-prose">
        A toggle for settings that take effect immediately — e.g., &ldquo;Enable
        notifications&rdquo; or &ldquo;Dark mode&rdquo;. Pass the{' '}
        <InlineCode>
          text
        </InlineCode>{' '}
        prop for an inline label that automatically wraps in a native{' '}
        <InlineCode>
          label
        </InlineCode>
        . For selections submitted with a form, use{' '}
        <InlineCode>
          Checkbox
        </InlineCode>{' '}
        instead. Compose with{' '}
        <InlineCode>
          FormItem
        </InlineCode>{' '}
        for labeled form fields.
      </p>

      {/* ── Examples ────────────────────────────────────────── */}
      <Heading as="h2">Examples</Heading>

      {/* Default */}
      <Heading as="h3" className="mt-6">Default</Heading>
      <p className="type-body mb-2 text-foreground max-w-prose">
        A switch with inline label text in the off state.
      </p>
      <ComponentPreview code={defaultCode} highlightedCode={defaultHighlighted}>
        <Switch text="Enable notifications" />
      </ComponentPreview>

      {/* Checked */}
      <Heading as="h3">Checked</Heading>
      <p className="type-body mb-2 text-foreground max-w-prose">
        A switch with{' '}
        <InlineCode>
          defaultChecked
        </InlineCode>{' '}
        set.
      </p>
      <ComponentPreview code={checkedCode} highlightedCode={checkedHighlighted}>
        <Switch text="Enable notifications" defaultChecked />
      </ComponentPreview>

      {/* Sizes */}
      <Heading as="h3">Sizes</Heading>
      <p className="type-body mb-2 text-foreground max-w-prose">
        Default and small sizes. The{' '}
        <InlineCode>
          sm
        </InlineCode>{' '}
        size uses smaller label text (
        <InlineCode>
          type-caption
        </InlineCode>
        ) for dense UI like table rows or settings panels.
      </p>
      <ComponentPreview code={sizesCode} highlightedCode={sizesHighlighted}>
        <div className="flex flex-col gap-4">
          <Switch text="Default size" />
          <Switch size="sm" text="Small size" />
        </div>
      </ComponentPreview>

      {/* States */}
      <Heading as="h3">States</Heading>
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
      <Heading as="h3">With FormItem</Heading>
      <p className="type-body mb-2 text-foreground max-w-prose">
        Compose with{' '}
        <InlineCode>
          FormItem
        </InlineCode>{' '}
        for labeled form fields. The{' '}
        <InlineCode>
          text
        </InlineCode>{' '}
        prop provides a secondary inline label next to the control.
      </p>
      <ComponentPreview code={withFormItemCode} highlightedCode={withFormItemHighlighted}>
        <FormItem htmlFor="notif" label="Notifications">
          <Switch id="notif" text="Send email updates" />
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
          <Switch id="terms" text="Accept terms" invalid />
        </FormItem>
      </ComponentPreview>

      {/* Controlled */}
      <Heading as="h3">Controlled</Heading>
      <p className="type-body mb-2 text-foreground max-w-prose">
        Switch supports both controlled and uncontrolled usage.
        Below is a controlled example with live state feedback.
      </p>
      <ComponentPreview code={controlledCode} highlightedCode={controlledHighlighted}>
        <ControlledDemo />
      </ComponentPreview>

      {/* ── API Reference ────────────────────────────────────── */}
      <Heading as="h2">API Reference</Heading>
      <p className="type-body mb-4 text-foreground max-w-prose">
        Switch renders a native{' '}
        <InlineCode>
          &lt;input type=&quot;checkbox&quot; role=&quot;switch&quot;&gt;
        </InlineCode>{' '}
        internally for full form and accessibility support. Extends all native{' '}
        <InlineCode>
          &lt;input&gt;
        </InlineCode>{' '}
        attributes (except{' '}
        <InlineCode>
          type
        </InlineCode>
        ,{' '}
        <InlineCode>
          role
        </InlineCode>
        , and{' '}
        <InlineCode>
          size
        </InlineCode>
        , which are set internally). Only custom props are listed below.
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
                <TableCell>Inline label text. Uses type-body-sm for default size, type-caption for sm.</TableCell>
              </TableRow>
              <TableRow>
                <TableCell><InlineCode>size</InlineCode></TableCell>
                <TableCell><InlineCode>&quot;default&quot; | &quot;sm&quot;</InlineCode></TableCell>
                <TableCell><InlineCode>&quot;default&quot;</InlineCode></TableCell>
                <TableCell>Switch size. Use sm for dense layouts.</TableCell>
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
                <TableCell>All native input attributes except type and role.</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
        <div className="block md:hidden">
          <TableMobileList>
            <TableMobileItem>
              <span className="type-body-sm text-foreground"><strong>text</strong></span>
              <span className="type-caption text-muted-foreground"><InlineCode>string</InlineCode></span>
              <span className="type-caption text-muted-foreground">Inline label text. Uses type-body-sm for default size, type-caption for sm.</span>
            </TableMobileItem>
            <TableMobileItem>
              <span className="type-body-sm text-foreground"><strong>size</strong></span>
              <span className="type-caption text-muted-foreground"><InlineCode>&quot;default&quot; | &quot;sm&quot;</InlineCode></span>
              <span className="type-caption text-muted-foreground">Default: <InlineCode>&quot;default&quot;</InlineCode></span>
              <span className="type-caption text-muted-foreground">Switch size. Use sm for dense layouts.</span>
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
              <span className="type-caption text-muted-foreground">All native input attributes except type and role.</span>
            </TableMobileItem>
          </TableMobileList>
        </div>
      </div>

    </Container>
  )
}
