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
        <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">
          FormItem
        </code>{' '}
        — it&apos;s the recommended way to wire labels, descriptions, and errors.
      </p>

      {/* ── Examples ────────────────────────────────────────── */}
      <h2 className="type-h2 mt-8 mb-4 text-foreground">Examples</h2>

      {/* Default */}
      <h3 className="type-h3 mt-6 mb-2 text-foreground">Default</h3>
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
      <h3 className="type-h3 mt-8 mb-2 text-foreground">With placeholder</h3>
      <p className="type-body mb-2 text-foreground max-w-prose">
        Use the{' '}
        <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">
          placeholder
        </code>{' '}
        prop on{' '}
        <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">
          SelectTrigger
        </code>{' '}
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
      <h3 className="type-h3 mt-8 mb-2 text-foreground">With groups</h3>
      <p className="type-body mb-2 text-foreground max-w-prose">
        Group related options with{' '}
        <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">
          SelectGroup
        </code>{' '}
        and separate them with{' '}
        <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">
          SelectSeparator
        </code>.
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
      <h3 className="type-h3 mt-8 mb-2 text-foreground">With FormItem (recommended)</h3>
      <p className="type-body mb-2 text-foreground max-w-prose">
        Wrap{' '}
        <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">
          Select
        </code>{' '}
        in{' '}
        <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">
          FormItem
        </code>{' '}
        for label + aria wiring.{' '}
        <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">
          FormItem
        </code>{' '}
        auto-generates{' '}
        <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">
          {'{htmlFor}-label'}
        </code>{' '}
        on its internal{' '}
        <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">
          Label
        </code>
        . Since Radix Select&apos;s trigger isn&apos;t a native{' '}
        <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">
          &lt;input&gt;
        </code>
        , reference that id via{' '}
        <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">
          aria-labelledby
        </code>{' '}
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
      <h3 className="type-h3 mt-8 mb-2 text-foreground">With Label</h3>
      <p className="type-body mb-2 text-foreground max-w-prose">
        If you can&apos;t use{' '}
        <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">
          FormItem
        </code>
        , wire the label manually. Give{' '}
        <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">
          Label
        </code>{' '}
        an{' '}
        <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">
          id
        </code>{' '}
        and reference it on the trigger via{' '}
        <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">
          aria-labelledby
        </code>
        . The{' '}
        <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">
          htmlFor
        </code>{' '}
        prop is still required by{' '}
        <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">
          Label
        </code>
        , but it has no effect here — the Radix trigger isn&apos;t a native form element, so the aria association happens via{' '}
        <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">
          id
        </code>{' '}
        /{' '}
        <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">
          aria-labelledby
        </code>
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
      <h3 className="type-h3 mt-8 mb-2 text-foreground">Invalid</h3>
      <p className="type-body mb-2 text-foreground max-w-prose">
        Pair{' '}
        <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">
          invalid
        </code>{' '}
        with{' '}
        <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">
          FormItem
        </code>
        &apos;s{' '}
        <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">
          error
        </code>{' '}
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
      <h3 className="type-h3 mt-8 mb-2 text-foreground">Disabled</h3>
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
      <h2 className="type-h2 mt-8 mb-4 text-foreground">API Reference</h2>
      <p className="type-body mb-4 text-foreground max-w-prose">
        Select is a compound component built on Radix Select. Each sub-component accepts the props listed below.
      </p>

      {/* Select (Root) */}
      <h3 className="type-h3 mt-8 mb-2 text-foreground">Select</h3>
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
                <TableCell><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle">defaultValue</code></TableCell>
                <TableCell><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle">string</code></TableCell>
                <TableCell>—</TableCell>
                <TableCell>Initial value for uncontrolled usage.</TableCell>
              </TableRow>
              <TableRow>
                <TableCell><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle">value</code></TableCell>
                <TableCell><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle">string</code></TableCell>
                <TableCell>—</TableCell>
                <TableCell>Controlled value. Use with onValueChange.</TableCell>
              </TableRow>
              <TableRow>
                <TableCell><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle">onValueChange</code></TableCell>
                <TableCell><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle">(value: string) =&gt; void</code></TableCell>
                <TableCell>—</TableCell>
                <TableCell>Callback when the selected value changes.</TableCell>
              </TableRow>
              <TableRow>
                <TableCell><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle">disabled</code></TableCell>
                <TableCell><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle">boolean</code></TableCell>
                <TableCell><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle">false</code></TableCell>
                <TableCell>Disables the entire select.</TableCell>
              </TableRow>
              <TableRow>
                <TableCell><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle">name</code></TableCell>
                <TableCell><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle">string</code></TableCell>
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
              <span className="type-caption text-muted-foreground"><code className="rounded px-1 py-0.5 font-mono bg-surface-subtle">string</code></span>
              <span className="type-caption text-muted-foreground">Initial value for uncontrolled usage.</span>
            </TableMobileItem>
            <TableMobileItem>
              <span className="type-body-sm text-foreground"><strong>value</strong></span>
              <span className="type-caption text-muted-foreground"><code className="rounded px-1 py-0.5 font-mono bg-surface-subtle">string</code></span>
              <span className="type-caption text-muted-foreground">Controlled value. Use with onValueChange.</span>
            </TableMobileItem>
            <TableMobileItem>
              <span className="type-body-sm text-foreground"><strong>onValueChange</strong></span>
              <span className="type-caption text-muted-foreground"><code className="rounded px-1 py-0.5 font-mono bg-surface-subtle">(value: string) =&gt; void</code></span>
              <span className="type-caption text-muted-foreground">Callback when the selected value changes.</span>
            </TableMobileItem>
            <TableMobileItem>
              <span className="type-body-sm text-foreground"><strong>disabled</strong></span>
              <span className="type-caption text-muted-foreground"><code className="rounded px-1 py-0.5 font-mono bg-surface-subtle">boolean</code></span>
              <span className="type-caption text-muted-foreground">Default: <code className="rounded px-1 py-0.5 font-mono bg-surface-subtle">false</code></span>
              <span className="type-caption text-muted-foreground">Disables the entire select.</span>
            </TableMobileItem>
            <TableMobileItem>
              <span className="type-body-sm text-foreground"><strong>name</strong></span>
              <span className="type-caption text-muted-foreground"><code className="rounded px-1 py-0.5 font-mono bg-surface-subtle">string</code></span>
              <span className="type-caption text-muted-foreground">Name for native form submission.</span>
            </TableMobileItem>
          </TableMobileList>
        </div>
      </div>

      {/* SelectTrigger */}
      <h3 className="type-h3 mt-8 mb-2 text-foreground">SelectTrigger</h3>
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
                <TableCell><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle">placeholder</code></TableCell>
                <TableCell><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle">string</code></TableCell>
                <TableCell>—</TableCell>
                <TableCell>Text shown when no value is selected.</TableCell>
              </TableRow>
              <TableRow>
                <TableCell><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle">invalid</code></TableCell>
                <TableCell><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle">boolean</code></TableCell>
                <TableCell><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle">false</code></TableCell>
                <TableCell>Applies error border and sets aria-invalid.</TableCell>
              </TableRow>
              <TableRow>
                <TableCell><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle">className</code></TableCell>
                <TableCell><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle">string</code></TableCell>
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
              <span className="type-caption text-muted-foreground"><code className="rounded px-1 py-0.5 font-mono bg-surface-subtle">string</code></span>
              <span className="type-caption text-muted-foreground">Text shown when no value is selected.</span>
            </TableMobileItem>
            <TableMobileItem>
              <span className="type-body-sm text-foreground"><strong>invalid</strong></span>
              <span className="type-caption text-muted-foreground"><code className="rounded px-1 py-0.5 font-mono bg-surface-subtle">boolean</code></span>
              <span className="type-caption text-muted-foreground">Default: <code className="rounded px-1 py-0.5 font-mono bg-surface-subtle">false</code></span>
              <span className="type-caption text-muted-foreground">Applies error border and sets aria-invalid.</span>
            </TableMobileItem>
            <TableMobileItem>
              <span className="type-body-sm text-foreground"><strong>className</strong></span>
              <span className="type-caption text-muted-foreground"><code className="rounded px-1 py-0.5 font-mono bg-surface-subtle">string</code></span>
              <span className="type-caption text-muted-foreground">Merged via cn(). Use for layout utilities only.</span>
            </TableMobileItem>
          </TableMobileList>
        </div>
      </div>

      {/* SelectContent */}
      <h3 className="type-h3 mt-8 mb-2 text-foreground">SelectContent</h3>
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
                <TableCell><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle">children</code></TableCell>
                <TableCell><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle">ReactNode</code></TableCell>
                <TableCell>—</TableCell>
                <TableCell>SelectItem and SelectGroup elements.</TableCell>
              </TableRow>
              <TableRow>
                <TableCell><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle">position</code></TableCell>
                <TableCell><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle">&quot;popper&quot; | &quot;item-aligned&quot;</code></TableCell>
                <TableCell><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle">&quot;popper&quot;</code></TableCell>
                <TableCell>Dropdown positioning strategy.</TableCell>
              </TableRow>
              <TableRow>
                <TableCell><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle">className</code></TableCell>
                <TableCell><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle">string</code></TableCell>
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
              <span className="type-caption text-muted-foreground"><code className="rounded px-1 py-0.5 font-mono bg-surface-subtle">ReactNode</code></span>
              <span className="type-caption text-muted-foreground">SelectItem and SelectGroup elements.</span>
            </TableMobileItem>
            <TableMobileItem>
              <span className="type-body-sm text-foreground"><strong>position</strong></span>
              <span className="type-caption text-muted-foreground"><code className="rounded px-1 py-0.5 font-mono bg-surface-subtle">&quot;popper&quot; | &quot;item-aligned&quot;</code></span>
              <span className="type-caption text-muted-foreground">Default: <code className="rounded px-1 py-0.5 font-mono bg-surface-subtle">&quot;popper&quot;</code></span>
              <span className="type-caption text-muted-foreground">Dropdown positioning strategy.</span>
            </TableMobileItem>
            <TableMobileItem>
              <span className="type-body-sm text-foreground"><strong>className</strong></span>
              <span className="type-caption text-muted-foreground"><code className="rounded px-1 py-0.5 font-mono bg-surface-subtle">string</code></span>
              <span className="type-caption text-muted-foreground">Merged via cn(). Use for layout utilities only.</span>
            </TableMobileItem>
          </TableMobileList>
        </div>
      </div>

      {/* SelectItem */}
      <h3 className="type-h3 mt-8 mb-2 text-foreground">SelectItem</h3>
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
                <TableCell><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle">value</code></TableCell>
                <TableCell><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle">string</code></TableCell>
                <TableCell><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle">(required)</code></TableCell>
                <TableCell>The value submitted when selected.</TableCell>
              </TableRow>
              <TableRow>
                <TableCell><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle">children</code></TableCell>
                <TableCell><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle">ReactNode</code></TableCell>
                <TableCell>—</TableCell>
                <TableCell>Display label for the option.</TableCell>
              </TableRow>
              <TableRow>
                <TableCell><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle">disabled</code></TableCell>
                <TableCell><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle">boolean</code></TableCell>
                <TableCell><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle">false</code></TableCell>
                <TableCell>Prevents selection of this item.</TableCell>
              </TableRow>
              <TableRow>
                <TableCell><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle">className</code></TableCell>
                <TableCell><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle">string</code></TableCell>
                <TableCell>—</TableCell>
                <TableCell>Merged via cn(). Use for layout utilities only.</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
        <div className="block md:hidden">
          <TableMobileList>
            <TableMobileItem>
              <span className="type-body-sm text-foreground"><strong>value</strong></span>
              <span className="type-caption text-muted-foreground"><code className="rounded px-1 py-0.5 font-mono bg-surface-subtle">string</code></span>
              <span className="type-caption text-muted-foreground">Required</span>
              <span className="type-caption text-muted-foreground">The value submitted when selected.</span>
            </TableMobileItem>
            <TableMobileItem>
              <span className="type-body-sm text-foreground"><strong>children</strong></span>
              <span className="type-caption text-muted-foreground"><code className="rounded px-1 py-0.5 font-mono bg-surface-subtle">ReactNode</code></span>
              <span className="type-caption text-muted-foreground">Display label for the option.</span>
            </TableMobileItem>
            <TableMobileItem>
              <span className="type-body-sm text-foreground"><strong>disabled</strong></span>
              <span className="type-caption text-muted-foreground"><code className="rounded px-1 py-0.5 font-mono bg-surface-subtle">boolean</code></span>
              <span className="type-caption text-muted-foreground">Default: <code className="rounded px-1 py-0.5 font-mono bg-surface-subtle">false</code></span>
              <span className="type-caption text-muted-foreground">Prevents selection of this item.</span>
            </TableMobileItem>
            <TableMobileItem>
              <span className="type-body-sm text-foreground"><strong>className</strong></span>
              <span className="type-caption text-muted-foreground"><code className="rounded px-1 py-0.5 font-mono bg-surface-subtle">string</code></span>
              <span className="type-caption text-muted-foreground">Merged via cn(). Use for layout utilities only.</span>
            </TableMobileItem>
          </TableMobileList>
        </div>
      </div>

      {/* SelectGroup */}
      <h3 className="type-h3 mt-8 mb-2 text-foreground">SelectGroup</h3>
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
                <TableCell><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle">label</code></TableCell>
                <TableCell><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle">string</code></TableCell>
                <TableCell><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle">(required)</code></TableCell>
                <TableCell>Group heading text.</TableCell>
              </TableRow>
              <TableRow>
                <TableCell><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle">children</code></TableCell>
                <TableCell><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle">ReactNode</code></TableCell>
                <TableCell>—</TableCell>
                <TableCell>SelectItem elements within the group.</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
        <div className="block md:hidden">
          <TableMobileList>
            <TableMobileItem>
              <span className="type-body-sm text-foreground"><strong>label</strong></span>
              <span className="type-caption text-muted-foreground"><code className="rounded px-1 py-0.5 font-mono bg-surface-subtle">string</code></span>
              <span className="type-caption text-muted-foreground">Required</span>
              <span className="type-caption text-muted-foreground">Group heading text.</span>
            </TableMobileItem>
            <TableMobileItem>
              <span className="type-body-sm text-foreground"><strong>children</strong></span>
              <span className="type-caption text-muted-foreground"><code className="rounded px-1 py-0.5 font-mono bg-surface-subtle">ReactNode</code></span>
              <span className="type-caption text-muted-foreground">SelectItem elements within the group.</span>
            </TableMobileItem>
          </TableMobileList>
        </div>
      </div>

      {/* SelectSeparator */}
      <h3 className="type-h3 mt-8 mb-2 text-foreground">SelectSeparator</h3>
      <p className="type-body mb-2 text-foreground max-w-prose">
        Visual divider between groups. Takes no props.
      </p>

    </Container>
  )
}
