import {
  Container,
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectGroup,
  SelectSeparator,
  Label,
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
import { Heading } from '@/components/Heading'
import { InlineCode } from '@/components/InlineCode'

const defaultCode = `import { Select, SelectTrigger, SelectContent, SelectItem } from '@umichkisa-ds/web'

<Select defaultValue="apple">
  <SelectTrigger />
  <SelectContent>
    <SelectItem value="apple">Apple</SelectItem>
    <SelectItem value="banana">Banana</SelectItem>
    <SelectItem value="cherry">Cherry</SelectItem>
  </SelectContent>
</Select>`

const placeholderCode = `import { Select, SelectTrigger, SelectContent, SelectItem } from '@umichkisa-ds/web'

<Select>
  <SelectTrigger placeholder="Select a fruit..." />
  <SelectContent>
    <SelectItem value="apple">Apple</SelectItem>
    <SelectItem value="banana">Banana</SelectItem>
    <SelectItem value="cherry">Cherry</SelectItem>
  </SelectContent>
</Select>`

const groupsCode = `import { Select, SelectTrigger, SelectContent, SelectItem, SelectGroup, SelectSeparator } from '@umichkisa-ds/web'

<Select>
  <SelectTrigger placeholder="Select an item..." />
  <SelectContent>
    <SelectGroup label="Fruits">
      <SelectItem value="apple">Apple</SelectItem>
      <SelectItem value="banana">Banana</SelectItem>
    </SelectGroup>
    <SelectSeparator />
    <SelectGroup label="Vegetables">
      <SelectItem value="carrot">Carrot</SelectItem>
      <SelectItem value="broccoli">Broccoli</SelectItem>
    </SelectGroup>
  </SelectContent>
</Select>`

const withFormItemCode = `import { FormItem, Select, SelectTrigger, SelectContent, SelectItem } from '@umichkisa-ds/web'

<FormItem htmlFor="fruit" label="Fruit">
  <Select>
    <SelectTrigger
      placeholder="Select a fruit..."
      aria-labelledby="fruit-label"
    />
    <SelectContent>
      <SelectItem value="apple">Apple</SelectItem>
      <SelectItem value="banana">Banana</SelectItem>
    </SelectContent>
  </Select>
</FormItem>`

const withLabelCode = `import { Label, Select, SelectTrigger, SelectContent, SelectItem } from '@umichkisa-ds/web'

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

const invalidCode = `import { FormItem, Select, SelectTrigger, SelectContent, SelectItem } from '@umichkisa-ds/web'

<FormItem htmlFor="fruit-invalid" label="Fruit" error="Please select a fruit.">
  <Select>
    <SelectTrigger
      placeholder="Select a fruit..."
      aria-labelledby="fruit-invalid-label"
      invalid
    />
    <SelectContent>
      <SelectItem value="apple">Apple</SelectItem>
      <SelectItem value="banana">Banana</SelectItem>
    </SelectContent>
  </Select>
</FormItem>`

const disabledCode = `import { Select, SelectTrigger, SelectContent, SelectItem } from '@umichkisa-ds/web'

<Select disabled>
  <SelectTrigger placeholder="Select a fruit..." />
  <SelectContent>
    <SelectItem value="apple">Apple</SelectItem>
    <SelectItem value="banana">Banana</SelectItem>
    <SelectItem value="cherry">Cherry</SelectItem>
  </SelectContent>
</Select>`

export default async function SelectPage() {
  const [
    defaultHighlighted,
    placeholderHighlighted,
    groupsHighlighted,
    withFormItemHighlighted,
    withLabelHighlighted,
    invalidHighlighted,
    disabledHighlighted,
  ] = await Promise.all([
    highlight(defaultCode),
    highlight(placeholderCode),
    highlight(groupsCode),
    highlight(withFormItemCode),
    highlight(withLabelCode),
    highlight(invalidCode),
    highlight(disabledCode),
  ])

  return (
    <Container size="md" as="article">

      {/* ── Header ──────────────────────────────────────────── */}
      <h1 className="type-h1 mb-4 text-foreground">Select</h1>
      <p className="type-body mb-8 text-foreground max-w-prose">
        Custom dropdown for choosing from predefined options. Built on Radix Select for full styling
        control and accessibility. Instead of a single element, you compose multiple sub-components
        together — each handling one concern (trigger, content, items). For form fields, wrap in{' '}
        <InlineCode>
          FormItem
        </InlineCode>{' '}
        — it&apos;s the recommended way to wire labels, descriptions, and errors.
      </p>

      {/* ── Examples ────────────────────────────────────────── */}
      <Heading as="h2">Examples</Heading>

      {/* Default */}
      <Heading as="h3" className="mt-6">Default</Heading>
      <p className="type-body mb-2 text-foreground max-w-prose">
        A basic select with a pre-selected value.
      </p>
      <ComponentPreview code={defaultCode} highlightedCode={defaultHighlighted}>
        <div className="w-full max-w-sm">
          <Select defaultValue="apple">
            <SelectTrigger />
            <SelectContent>
              <SelectItem value="apple">Apple</SelectItem>
              <SelectItem value="banana">Banana</SelectItem>
              <SelectItem value="cherry">Cherry</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </ComponentPreview>

      {/* With placeholder */}
      <Heading as="h3">With placeholder</Heading>
      <p className="type-body mb-2 text-foreground max-w-prose">
        Use the{' '}
        <InlineCode>
          placeholder
        </InlineCode>{' '}
        prop on{' '}
        <InlineCode>
          SelectTrigger
        </InlineCode>{' '}
        to show a prompt when no value is selected.
      </p>
      <ComponentPreview code={placeholderCode} highlightedCode={placeholderHighlighted}>
        <div className="w-full max-w-sm">
          <Select>
            <SelectTrigger placeholder="Select a fruit..." />
            <SelectContent>
              <SelectItem value="apple">Apple</SelectItem>
              <SelectItem value="banana">Banana</SelectItem>
              <SelectItem value="cherry">Cherry</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </ComponentPreview>

      {/* With groups */}
      <Heading as="h3">With groups</Heading>
      <p className="type-body mb-2 text-foreground max-w-prose">
        Group related options with{' '}
        <InlineCode>
          SelectGroup
        </InlineCode>{' '}
        and separate them with{' '}
        <InlineCode>
          SelectSeparator
        </InlineCode>.
      </p>
      <ComponentPreview code={groupsCode} highlightedCode={groupsHighlighted}>
        <div className="w-full max-w-sm">
          <Select>
            <SelectTrigger placeholder="Select an item..." />
            <SelectContent>
              <SelectGroup label="Fruits">
                <SelectItem value="apple">Apple</SelectItem>
                <SelectItem value="banana">Banana</SelectItem>
              </SelectGroup>
              <SelectSeparator />
              <SelectGroup label="Vegetables">
                <SelectItem value="carrot">Carrot</SelectItem>
                <SelectItem value="broccoli">Broccoli</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      </ComponentPreview>

      {/* With FormItem — recommended */}
      <Heading as="h3">With FormItem (recommended)</Heading>
      <p className="type-body mb-2 text-foreground max-w-prose">
        Wrap{' '}
        <InlineCode>
          Select
        </InlineCode>{' '}
        in{' '}
        <InlineCode>
          FormItem
        </InlineCode>{' '}
        for label + aria wiring.{' '}
        <InlineCode>
          FormItem
        </InlineCode>{' '}
        auto-generates{' '}
        <InlineCode>
          {'{htmlFor}-label'}
        </InlineCode>{' '}
        on its internal{' '}
        <InlineCode>
          Label
        </InlineCode>
        . Since Radix Select&apos;s trigger isn&apos;t a native{' '}
        <InlineCode>
          &lt;input&gt;
        </InlineCode>
        , reference that id via{' '}
        <InlineCode>
          aria-labelledby
        </InlineCode>{' '}
        on the trigger.
      </p>
      <ComponentPreview code={withFormItemCode} highlightedCode={withFormItemHighlighted}>
        <div className="w-full max-w-sm">
          <FormItem htmlFor="fruit-formitem-demo" label="Fruit">
            <Select>
              <SelectTrigger
                placeholder="Select a fruit..."
                aria-labelledby="fruit-formitem-demo-label"
              />
              <SelectContent>
                <SelectItem value="apple">Apple</SelectItem>
                <SelectItem value="banana">Banana</SelectItem>
              </SelectContent>
            </Select>
          </FormItem>
        </div>
      </ComponentPreview>

      {/* With Label — lower-level */}
      <Heading as="h3">With Label</Heading>
      <p className="type-body mb-2 text-foreground max-w-prose">
        If you can&apos;t use{' '}
        <InlineCode>
          FormItem
        </InlineCode>
        , wire the label manually. Give{' '}
        <InlineCode>
          Label
        </InlineCode>{' '}
        an{' '}
        <InlineCode>
          id
        </InlineCode>{' '}
        and reference it on the trigger via{' '}
        <InlineCode>
          aria-labelledby
        </InlineCode>
        . The{' '}
        <InlineCode>
          htmlFor
        </InlineCode>{' '}
        prop is still required by{' '}
        <InlineCode>
          Label
        </InlineCode>
        , but it has no effect here — the Radix trigger isn&apos;t a native form element, so the aria association happens via{' '}
        <InlineCode>
          id
        </InlineCode>{' '}
        /{' '}
        <InlineCode>
          aria-labelledby
        </InlineCode>
        .
      </p>
      <ComponentPreview code={withLabelCode} highlightedCode={withLabelHighlighted}>
        <div className="w-full max-w-sm">
          <div className="flex flex-col gap-2">
            <Label htmlFor="fruit-manual" id="fruit-manual-label">Fruit</Label>
            <Select>
              <SelectTrigger placeholder="Select a fruit..." aria-labelledby="fruit-manual-label" />
              <SelectContent>
                <SelectItem value="apple">Apple</SelectItem>
                <SelectItem value="banana">Banana</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </ComponentPreview>

      {/* Invalid */}
      <Heading as="h3">Invalid</Heading>
      <p className="type-body mb-2 text-foreground max-w-prose">
        Pair{' '}
        <InlineCode>
          invalid
        </InlineCode>{' '}
        with{' '}
        <InlineCode>
          FormItem
        </InlineCode>
        &apos;s{' '}
        <InlineCode>
          error
        </InlineCode>{' '}
        prop to show an error message below the field.
      </p>
      <ComponentPreview code={invalidCode} highlightedCode={invalidHighlighted}>
        <div className="w-full max-w-sm">
          <FormItem htmlFor="fruit-invalid-demo" label="Fruit" error="Please select a fruit.">
            <Select>
              <SelectTrigger
                placeholder="Select a fruit..."
                aria-labelledby="fruit-invalid-demo-label"
                invalid
              />
              <SelectContent>
                <SelectItem value="apple">Apple</SelectItem>
                <SelectItem value="banana">Banana</SelectItem>
              </SelectContent>
            </Select>
          </FormItem>
        </div>
      </ComponentPreview>

      {/* Disabled */}
      <Heading as="h3">Disabled</Heading>
      <p className="type-body mb-2 text-foreground max-w-prose">
        The disabled state prevents interaction.
      </p>
      <ComponentPreview code={disabledCode} highlightedCode={disabledHighlighted}>
        <div className="w-full max-w-sm">
          <Select disabled>
            <SelectTrigger placeholder="Select a fruit..." />
            <SelectContent>
              <SelectItem value="apple">Apple</SelectItem>
              <SelectItem value="banana">Banana</SelectItem>
              <SelectItem value="cherry">Cherry</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </ComponentPreview>

      {/* ── API Reference ────────────────────────────────────── */}
      <Heading as="h2">API Reference</Heading>
      <p className="type-body mb-4 text-foreground max-w-prose">
        Select is a compound component built on Radix Select. Each sub-component accepts the props listed below.
      </p>

      {/* Select (Root) */}
      <Heading as="h3">Select</Heading>
      <p className="type-body mb-2 text-foreground max-w-prose">
        The root component that manages state. Wraps all other sub-components.
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
                <TableCell><InlineCode>defaultValue</InlineCode></TableCell>
                <TableCell><InlineCode>string</InlineCode></TableCell>
                <TableCell>—</TableCell>
                <TableCell>Initial value for uncontrolled usage.</TableCell>
              </TableRow>
              <TableRow>
                <TableCell><InlineCode>value</InlineCode></TableCell>
                <TableCell><InlineCode>string</InlineCode></TableCell>
                <TableCell>—</TableCell>
                <TableCell>Controlled value. Use with onValueChange.</TableCell>
              </TableRow>
              <TableRow>
                <TableCell><InlineCode>onValueChange</InlineCode></TableCell>
                <TableCell><InlineCode>(value: string) =&gt; void</InlineCode></TableCell>
                <TableCell>—</TableCell>
                <TableCell>Callback when the selected value changes.</TableCell>
              </TableRow>
              <TableRow>
                <TableCell><InlineCode>disabled</InlineCode></TableCell>
                <TableCell><InlineCode>boolean</InlineCode></TableCell>
                <TableCell><InlineCode>false</InlineCode></TableCell>
                <TableCell>Disables the entire select.</TableCell>
              </TableRow>
              <TableRow>
                <TableCell><InlineCode>name</InlineCode></TableCell>
                <TableCell><InlineCode>string</InlineCode></TableCell>
                <TableCell>—</TableCell>
                <TableCell>Name for native form submission.</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
        <div className="block md:hidden">
          <TableMobileList>
            <TableMobileItem>
              <span className="type-body-sm text-foreground"><strong>defaultValue</strong></span>
              <span className="type-caption text-muted-foreground"><InlineCode>string</InlineCode></span>
              <span className="type-caption text-muted-foreground">Initial value for uncontrolled usage.</span>
            </TableMobileItem>
            <TableMobileItem>
              <span className="type-body-sm text-foreground"><strong>value</strong></span>
              <span className="type-caption text-muted-foreground"><InlineCode>string</InlineCode></span>
              <span className="type-caption text-muted-foreground">Controlled value. Use with onValueChange.</span>
            </TableMobileItem>
            <TableMobileItem>
              <span className="type-body-sm text-foreground"><strong>onValueChange</strong></span>
              <span className="type-caption text-muted-foreground"><InlineCode>(value: string) =&gt; void</InlineCode></span>
              <span className="type-caption text-muted-foreground">Callback when the selected value changes.</span>
            </TableMobileItem>
            <TableMobileItem>
              <span className="type-body-sm text-foreground"><strong>disabled</strong></span>
              <span className="type-caption text-muted-foreground"><InlineCode>boolean</InlineCode></span>
              <span className="type-caption text-muted-foreground">Default: <InlineCode>false</InlineCode></span>
              <span className="type-caption text-muted-foreground">Disables the entire select.</span>
            </TableMobileItem>
            <TableMobileItem>
              <span className="type-body-sm text-foreground"><strong>name</strong></span>
              <span className="type-caption text-muted-foreground"><InlineCode>string</InlineCode></span>
              <span className="type-caption text-muted-foreground">Name for native form submission.</span>
            </TableMobileItem>
          </TableMobileList>
        </div>
      </div>

      {/* SelectTrigger */}
      <Heading as="h3">SelectTrigger</Heading>
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
                <TableCell><InlineCode>placeholder</InlineCode></TableCell>
                <TableCell><InlineCode>string</InlineCode></TableCell>
                <TableCell>—</TableCell>
                <TableCell>Text shown when no value is selected.</TableCell>
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
            </TableBody>
          </Table>
        </div>
        <div className="block md:hidden">
          <TableMobileList>
            <TableMobileItem>
              <span className="type-body-sm text-foreground"><strong>placeholder</strong></span>
              <span className="type-caption text-muted-foreground"><InlineCode>string</InlineCode></span>
              <span className="type-caption text-muted-foreground">Text shown when no value is selected.</span>
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
          </TableMobileList>
        </div>
      </div>

      {/* SelectContent */}
      <Heading as="h3">SelectContent</Heading>
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
                <TableCell><InlineCode>children</InlineCode></TableCell>
                <TableCell><InlineCode>ReactNode</InlineCode></TableCell>
                <TableCell>—</TableCell>
                <TableCell>SelectItem and SelectGroup elements.</TableCell>
              </TableRow>
              <TableRow>
                <TableCell><InlineCode>position</InlineCode></TableCell>
                <TableCell><InlineCode>&quot;popper&quot; | &quot;item-aligned&quot;</InlineCode></TableCell>
                <TableCell><InlineCode>&quot;popper&quot;</InlineCode></TableCell>
                <TableCell>Dropdown positioning strategy.</TableCell>
              </TableRow>
              <TableRow>
                <TableCell><InlineCode>className</InlineCode></TableCell>
                <TableCell><InlineCode>string</InlineCode></TableCell>
                <TableCell>—</TableCell>
                <TableCell>Merged via cn(). Use for layout utilities only.</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
        <div className="block md:hidden">
          <TableMobileList>
            <TableMobileItem>
              <span className="type-body-sm text-foreground"><strong>children</strong></span>
              <span className="type-caption text-muted-foreground"><InlineCode>ReactNode</InlineCode></span>
              <span className="type-caption text-muted-foreground">SelectItem and SelectGroup elements.</span>
            </TableMobileItem>
            <TableMobileItem>
              <span className="type-body-sm text-foreground"><strong>position</strong></span>
              <span className="type-caption text-muted-foreground"><InlineCode>&quot;popper&quot; | &quot;item-aligned&quot;</InlineCode></span>
              <span className="type-caption text-muted-foreground">Default: <InlineCode>&quot;popper&quot;</InlineCode></span>
              <span className="type-caption text-muted-foreground">Dropdown positioning strategy.</span>
            </TableMobileItem>
            <TableMobileItem>
              <span className="type-body-sm text-foreground"><strong>className</strong></span>
              <span className="type-caption text-muted-foreground"><InlineCode>string</InlineCode></span>
              <span className="type-caption text-muted-foreground">Merged via cn(). Use for layout utilities only.</span>
            </TableMobileItem>
          </TableMobileList>
        </div>
      </div>

      {/* SelectItem */}
      <Heading as="h3">SelectItem</Heading>
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
                <TableCell><InlineCode>value<span aria-label="required">*</span></InlineCode></TableCell>
                <TableCell><InlineCode>string</InlineCode></TableCell>
                <TableCell>—</TableCell>
                <TableCell>The value submitted when selected.</TableCell>
              </TableRow>
              <TableRow>
                <TableCell><InlineCode>children<span aria-label="required">*</span></InlineCode></TableCell>
                <TableCell><InlineCode>ReactNode</InlineCode></TableCell>
                <TableCell>—</TableCell>
                <TableCell>Display label for the option.</TableCell>
              </TableRow>
              <TableRow>
                <TableCell><InlineCode>disabled</InlineCode></TableCell>
                <TableCell><InlineCode>boolean</InlineCode></TableCell>
                <TableCell><InlineCode>false</InlineCode></TableCell>
                <TableCell>Prevents selection of this item.</TableCell>
              </TableRow>
              <TableRow>
                <TableCell><InlineCode>className</InlineCode></TableCell>
                <TableCell><InlineCode>string</InlineCode></TableCell>
                <TableCell>—</TableCell>
                <TableCell>Merged via cn(). Use for layout utilities only.</TableCell>
              </TableRow>
            </TableBody>
          </Table>
          <p className="type-caption mt-2 text-muted-foreground">* Required prop.</p>
        </div>
        <div className="block md:hidden">
          <TableMobileList>
            <TableMobileItem>
              <span className="type-body-sm text-foreground"><strong>value<span aria-label="required">*</span></strong></span>
              <span className="type-caption text-muted-foreground"><InlineCode>string</InlineCode></span>
              <span className="type-caption text-muted-foreground">The value submitted when selected.</span>
            </TableMobileItem>
            <TableMobileItem>
              <span className="type-body-sm text-foreground"><strong>children<span aria-label="required">*</span></strong></span>
              <span className="type-caption text-muted-foreground"><InlineCode>ReactNode</InlineCode></span>
              <span className="type-caption text-muted-foreground">Display label for the option.</span>
            </TableMobileItem>
            <TableMobileItem>
              <span className="type-body-sm text-foreground"><strong>disabled</strong></span>
              <span className="type-caption text-muted-foreground"><InlineCode>boolean</InlineCode></span>
              <span className="type-caption text-muted-foreground">Default: <InlineCode>false</InlineCode></span>
              <span className="type-caption text-muted-foreground">Prevents selection of this item.</span>
            </TableMobileItem>
            <TableMobileItem>
              <span className="type-body-sm text-foreground"><strong>className</strong></span>
              <span className="type-caption text-muted-foreground"><InlineCode>string</InlineCode></span>
              <span className="type-caption text-muted-foreground">Merged via cn(). Use for layout utilities only.</span>
            </TableMobileItem>
          </TableMobileList>
          <p className="type-caption mt-2 text-muted-foreground">* Required prop.</p>
        </div>
      </div>

      {/* SelectGroup */}
      <Heading as="h3">SelectGroup</Heading>
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
                <TableCell><InlineCode>label<span aria-label="required">*</span></InlineCode></TableCell>
                <TableCell><InlineCode>string</InlineCode></TableCell>
                <TableCell>—</TableCell>
                <TableCell>Group heading text.</TableCell>
              </TableRow>
              <TableRow>
                <TableCell><InlineCode>children<span aria-label="required">*</span></InlineCode></TableCell>
                <TableCell><InlineCode>ReactNode</InlineCode></TableCell>
                <TableCell>—</TableCell>
                <TableCell>SelectItem elements within the group.</TableCell>
              </TableRow>
            </TableBody>
          </Table>
          <p className="type-caption mt-2 text-muted-foreground">* Required prop.</p>
        </div>
        <div className="block md:hidden">
          <TableMobileList>
            <TableMobileItem>
              <span className="type-body-sm text-foreground"><strong>label<span aria-label="required">*</span></strong></span>
              <span className="type-caption text-muted-foreground"><InlineCode>string</InlineCode></span>
              <span className="type-caption text-muted-foreground">Group heading text.</span>
            </TableMobileItem>
            <TableMobileItem>
              <span className="type-body-sm text-foreground"><strong>children<span aria-label="required">*</span></strong></span>
              <span className="type-caption text-muted-foreground"><InlineCode>ReactNode</InlineCode></span>
              <span className="type-caption text-muted-foreground">SelectItem elements within the group.</span>
            </TableMobileItem>
          </TableMobileList>
          <p className="type-caption mt-2 text-muted-foreground">* Required prop.</p>
        </div>
      </div>

      {/* SelectSeparator */}
      <Heading as="h3">SelectSeparator</Heading>
      <p className="type-body mb-2 text-foreground max-w-prose">
        Visual divider between groups. Takes no props.
      </p>

    </Container>
  )
}
