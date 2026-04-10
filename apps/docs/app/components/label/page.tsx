import {
  Container,
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
import { InlineCode } from '@/components/InlineCode'
import { Heading } from '@/components/Heading'
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
      <h1 className="type-h1 mb-4 text-foreground">Label</h1>
      <p className="type-body mb-8 text-foreground max-w-prose">
        Form label with an optional required indicator. Renders a native{' '}
        <InlineCode>
          &lt;label&gt;
        </InlineCode>{' '}
        element.
      </p>

      {/* ── Examples ────────────────────────────────────────── */}
      <Heading as="h2">Examples</Heading>

      {/* Default */}
      <Heading as="h3" className="mt-6">Default</Heading>
      <ComponentPreview code={defaultCode} highlightedCode={defaultHighlighted}>
        <Label htmlFor="name">Full name</Label>
      </ComponentPreview>

      {/* Required */}
      <Heading as="h3">Required</Heading>
      <p className="type-body mb-2 text-foreground max-w-prose">
        Set{' '}
        <InlineCode>
          required
        </InlineCode>{' '}
        to append a red asterisk.
      </p>
      <ComponentPreview code={requiredCode} highlightedCode={requiredHighlighted}>
        <Label htmlFor="email" required>Email address</Label>
      </ComponentPreview>

      {/* With input */}
      <Heading as="h3">With input</Heading>
      <p className="type-body mb-2 text-foreground max-w-prose">
        Pair a Label with an Input using matching{' '}
        <InlineCode>
          htmlFor
        </InlineCode>{' '}
        and{' '}
        <InlineCode>
          id
        </InlineCode>{' '}
        values. Clicking the label focuses the input.
      </p>
      <ComponentPreview code={withInputCode} highlightedCode={withInputHighlighted}>
        <WithInputDemo />
      </ComponentPreview>

      {/* With aria-labelledby */}
      <Heading as="h3">With aria-labelledby</Heading>
      <p className="type-body mb-2 text-foreground max-w-prose">
        Non-native form controls like Radix Select don&apos;t render a real{' '}
        <InlineCode>
          &lt;input&gt;
        </InlineCode>
        , so{' '}
        <InlineCode>
          htmlFor
        </InlineCode>{' '}
        has nothing to target. Use{' '}
        <InlineCode>
          id
        </InlineCode>{' '}
        on the Label and{' '}
        <InlineCode>
          aria-labelledby
        </InlineCode>{' '}
        on the trigger instead.
      </p>
      <ComponentPreview code={withAriaCode} highlightedCode={withAriaHighlighted}>
        <WithAriaDemo />
      </ComponentPreview>

      {/* ── API Reference ────────────────────────────────────── */}
      <Heading as="h2">API Reference</Heading>
      <p className="type-body mb-4 text-foreground max-w-prose">
        Label accepts the following props alongside standard{' '}
        <InlineCode>
          &lt;label&gt;
        </InlineCode>{' '}
        attributes.
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
                <TableCell><InlineCode>htmlFor<span aria-label="required">*</span></InlineCode></TableCell>
                <TableCell><InlineCode>string</InlineCode></TableCell>
                <TableCell>—</TableCell>
                <TableCell>The id of the form control this label is associated with.</TableCell>
              </TableRow>
              <TableRow>
                <TableCell><InlineCode>id</InlineCode></TableCell>
                <TableCell><InlineCode>string</InlineCode></TableCell>
                <TableCell>—</TableCell>
                <TableCell>HTML id attribute. Use when other elements need to reference this label via aria-labelledby.</TableCell>
              </TableRow>
              <TableRow>
                <TableCell><InlineCode>required</InlineCode></TableCell>
                <TableCell><InlineCode>boolean</InlineCode></TableCell>
                <TableCell><InlineCode>false</InlineCode></TableCell>
                <TableCell>Appends a red asterisk to indicate the field is required.</TableCell>
              </TableRow>
              <TableRow>
                <TableCell><InlineCode>className</InlineCode></TableCell>
                <TableCell><InlineCode>string</InlineCode></TableCell>
                <TableCell>—</TableCell>
                <TableCell>Merged via cn(). Use for layout utilities only.</TableCell>
              </TableRow>
              <TableRow>
                <TableCell><InlineCode>children<span aria-label="required">*</span></InlineCode></TableCell>
                <TableCell><InlineCode>ReactNode</InlineCode></TableCell>
                <TableCell>—</TableCell>
                <TableCell>Label text content.</TableCell>
              </TableRow>
            </TableBody>
          </Table>
          <p className="type-caption mt-2 text-muted-foreground">* Required prop.</p>
        </div>
        <div className="block md:hidden">
          <TableMobileList>
            <TableMobileItem>
              <span className="type-body-sm text-foreground"><strong>htmlFor<span aria-label="required">*</span></strong></span>
              <span className="type-caption text-muted-foreground"><InlineCode>string</InlineCode></span>
              <span className="type-caption text-muted-foreground">The id of the form control this label is associated with.</span>
            </TableMobileItem>
            <TableMobileItem>
              <span className="type-body-sm text-foreground"><strong>id</strong></span>
              <span className="type-caption text-muted-foreground"><InlineCode>string</InlineCode></span>
              <span className="type-caption text-muted-foreground">HTML id attribute. Use when other elements need to reference this label via aria-labelledby.</span>
            </TableMobileItem>
            <TableMobileItem>
              <span className="type-body-sm text-foreground"><strong>required</strong></span>
              <span className="type-caption text-muted-foreground"><InlineCode>boolean</InlineCode></span>
              <span className="type-caption text-muted-foreground">Default: <InlineCode>false</InlineCode></span>
              <span className="type-caption text-muted-foreground">Appends a red asterisk to indicate the field is required.</span>
            </TableMobileItem>
            <TableMobileItem>
              <span className="type-body-sm text-foreground"><strong>className</strong></span>
              <span className="type-caption text-muted-foreground"><InlineCode>string</InlineCode></span>
              <span className="type-caption text-muted-foreground">Merged via cn(). Use for layout utilities only.</span>
            </TableMobileItem>
            <TableMobileItem>
              <span className="type-body-sm text-foreground"><strong>children<span aria-label="required">*</span></strong></span>
              <span className="type-caption text-muted-foreground"><InlineCode>ReactNode</InlineCode></span>
              <span className="type-caption text-muted-foreground">Label text content.</span>
            </TableMobileItem>
          </TableMobileList>
          <p className="type-caption mt-2 text-muted-foreground">* Required prop.</p>
        </div>
      </div>

    </Container>
  )
}
