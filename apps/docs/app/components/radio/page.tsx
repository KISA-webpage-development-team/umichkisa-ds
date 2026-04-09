import {
  Container,
  RadioGroup,
  RadioItem,
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

const basicCode = `import { RadioGroup, RadioItem } from '@umichkisa-ds/web'

<RadioGroup>
  <RadioItem value="apple" text="Apple" />
  <RadioItem value="banana" text="Banana" />
  <RadioItem value="cherry" text="Cherry" />
</RadioGroup>`

const horizontalCode = `import { RadioGroup, RadioItem } from '@umichkisa-ds/web'

<RadioGroup orientation="horizontal">
  <RadioItem value="small" text="Small" />
  <RadioItem value="medium" text="Medium" />
  <RadioItem value="large" text="Large" />
</RadioGroup>`

const defaultValueCode = `import { RadioGroup, RadioItem } from '@umichkisa-ds/web'

<RadioGroup defaultValue="medium">
  <RadioItem value="small" text="Small" />
  <RadioItem value="medium" text="Medium" />
  <RadioItem value="large" text="Large" />
</RadioGroup>`

const disabledGroupCode = `import { RadioGroup, RadioItem } from '@umichkisa-ds/web'

<RadioGroup disabled defaultValue="banana">
  <RadioItem value="apple" text="Apple" />
  <RadioItem value="banana" text="Banana" />
  <RadioItem value="cherry" text="Cherry" />
</RadioGroup>`

const disabledItemCode = `import { RadioGroup, RadioItem } from '@umichkisa-ds/web'

<RadioGroup>
  <RadioItem value="apple" text="Apple" />
  <RadioItem value="banana" text="Banana" disabled />
  <RadioItem value="cherry" text="Cherry" />
</RadioGroup>`

const invalidCode = `import { RadioGroup, RadioItem } from '@umichkisa-ds/web'

<div className="flex flex-col gap-2">
  <RadioGroup invalid>
    <RadioItem value="apple" text="Apple" />
    <RadioItem value="banana" text="Banana" />
    <RadioItem value="cherry" text="Cherry" />
  </RadioGroup>
  <p className="type-caption text-error">Please select a fruit.</p>
</div>`

const controlledCode = `const [fruit, setFruit] = useState('banana')

<RadioGroup value={fruit} onValueChange={setFruit}>
  <RadioItem value="apple" text="Apple" />
  <RadioItem value="banana" text="Banana" />
  <RadioItem value="cherry" text="Cherry" />
</RadioGroup>
<p>You picked: {fruit}</p>`

export default async function RadioPage() {
  const [
    basicHighlighted,
    horizontalHighlighted,
    defaultValueHighlighted,
    disabledGroupHighlighted,
    disabledItemHighlighted,
    invalidHighlighted,
    controlledHighlighted,
  ] = await Promise.all([
    highlight(basicCode),
    highlight(horizontalCode),
    highlight(defaultValueCode),
    highlight(disabledGroupCode),
    highlight(disabledItemCode),
    highlight(invalidCode),
    highlight(controlledCode),
  ])

  return (
    <Container size="md" as="article">

      {/* ── Header ──────────────────────────────────────────── */}
      <h1 className="type-h1 mb-4 text-foreground">Radio</h1>
      <p className="type-body mb-8 text-foreground max-w-prose">
        Use{' '}
        <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">
          RadioGroup
        </code>{' '}
        and{' '}
        <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">
          RadioItem
        </code>{' '}
        together to let users pick one option from a set.
      </p>

      {/* ── Examples ────────────────────────────────────────── */}
      <h2 className="type-h2 mt-8 mb-4 text-foreground">Examples</h2>

      {/* Basic */}
      <h3 className="type-h3 mt-6 mb-2 text-foreground">Basic</h3>
      <p className="type-body mb-2 text-foreground max-w-prose">
        A vertical radio group with three options.
      </p>
      <ComponentPreview code={basicCode} highlightedCode={basicHighlighted}>
        <RadioGroup>
          <RadioItem value="apple" text="Apple" />
          <RadioItem value="banana" text="Banana" />
          <RadioItem value="cherry" text="Cherry" />
        </RadioGroup>
      </ComponentPreview>

      {/* Horizontal */}
      <h3 className="type-h3 mt-8 mb-2 text-foreground">Horizontal orientation</h3>
      <p className="type-body mb-2 text-foreground max-w-prose">
        Set{' '}
        <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">
          orientation=&quot;horizontal&quot;
        </code>{' '}
        to lay out items in a row.
      </p>
      <ComponentPreview code={horizontalCode} highlightedCode={horizontalHighlighted}>
        <RadioGroup orientation="horizontal">
          <RadioItem value="small" text="Small" />
          <RadioItem value="medium" text="Medium" />
          <RadioItem value="large" text="Large" />
        </RadioGroup>
      </ComponentPreview>

      {/* Default value */}
      <h3 className="type-h3 mt-8 mb-2 text-foreground">Default value</h3>
      <p className="type-body mb-2 text-foreground max-w-prose">
        Use{' '}
        <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">
          defaultValue
        </code>{' '}
        to set the initial value without managing state.
      </p>
      <ComponentPreview code={defaultValueCode} highlightedCode={defaultValueHighlighted}>
        <RadioGroup defaultValue="medium">
          <RadioItem value="small" text="Small" />
          <RadioItem value="medium" text="Medium" />
          <RadioItem value="large" text="Large" />
        </RadioGroup>
      </ComponentPreview>

      {/* Disabled group */}
      <h3 className="type-h3 mt-8 mb-2 text-foreground">Disabled group</h3>
      <p className="type-body mb-2 text-foreground max-w-prose">
        Set{' '}
        <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">
          disabled
        </code>{' '}
        on the group to disable all items.
      </p>
      <ComponentPreview code={disabledGroupCode} highlightedCode={disabledGroupHighlighted}>
        <RadioGroup disabled defaultValue="banana">
          <RadioItem value="apple" text="Apple" />
          <RadioItem value="banana" text="Banana" />
          <RadioItem value="cherry" text="Cherry" />
        </RadioGroup>
      </ComponentPreview>

      {/* Disabled individual item */}
      <h3 className="type-h3 mt-8 mb-2 text-foreground">Disabled individual item</h3>
      <p className="type-body mb-2 text-foreground max-w-prose">
        Disable a single item while the rest remain interactive.
      </p>
      <ComponentPreview code={disabledItemCode} highlightedCode={disabledItemHighlighted}>
        <RadioGroup>
          <RadioItem value="apple" text="Apple" />
          <RadioItem value="banana" text="Banana" disabled />
          <RadioItem value="cherry" text="Cherry" />
        </RadioGroup>
      </ComponentPreview>

      {/* Invalid / error state */}
      <h3 className="type-h3 mt-8 mb-2 text-foreground">Invalid / error state</h3>
      <p className="type-body mb-2 text-foreground max-w-prose">
        Pair{' '}
        <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">
          invalid
        </code>{' '}
        with an error message below. Use{' '}
        <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">
          type-caption text-error
        </code>{' '}
        for the message.
      </p>
      <ComponentPreview code={invalidCode} highlightedCode={invalidHighlighted}>
        <div className="flex flex-col gap-2">
          <RadioGroup invalid>
            <RadioItem value="apple" text="Apple" />
            <RadioItem value="banana" text="Banana" />
            <RadioItem value="cherry" text="Cherry" />
          </RadioGroup>
          <p className="type-caption text-error">Please select a fruit.</p>
        </div>
      </ComponentPreview>

      {/* Controlled */}
      <h3 className="type-h3 mt-8 mb-2 text-foreground">Controlled</h3>
      <p className="type-body mb-2 text-foreground max-w-prose">
        Use{' '}
        <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">
          value
        </code>{' '}
        and{' '}
        <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">
          onValueChange
        </code>{' '}
        for controlled state.
      </p>
      <ComponentPreview code={controlledCode} highlightedCode={controlledHighlighted}>
        <ControlledDemo />
      </ComponentPreview>

      {/* ── API Reference ────────────────────────────────────── */}
      <h2 className="type-h2 mt-8 mb-4 text-foreground">API Reference</h2>

      {/* RadioGroup table */}
      <h3 className="type-h3 mt-6 mb-2 text-foreground">RadioGroup</h3>
      <p className="type-body mb-4 text-foreground max-w-prose">
        The group container. Built on Radix RadioGroup — all props below are supported.
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
                <TableCell><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle">value</code></TableCell>
                <TableCell><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle">string</code></TableCell>
                <TableCell>—</TableCell>
                <TableCell>Controlled selected value.</TableCell>
              </TableRow>
              <TableRow>
                <TableCell><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle">defaultValue</code></TableCell>
                <TableCell><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle">string</code></TableCell>
                <TableCell>—</TableCell>
                <TableCell>Uncontrolled default selected value.</TableCell>
              </TableRow>
              <TableRow>
                <TableCell><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle">onValueChange</code></TableCell>
                <TableCell><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle">{"(value: string) => void"}</code></TableCell>
                <TableCell>—</TableCell>
                <TableCell>Called when the selected value changes.</TableCell>
              </TableRow>
              <TableRow>
                <TableCell><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle">disabled</code></TableCell>
                <TableCell><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle">boolean</code></TableCell>
                <TableCell><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle">false</code></TableCell>
                <TableCell>Disables the entire group.</TableCell>
              </TableRow>
              <TableRow>
                <TableCell><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle">orientation</code></TableCell>
                <TableCell><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle">{'"horizontal" | "vertical"'}</code></TableCell>
                <TableCell><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle">"vertical"</code></TableCell>
                <TableCell>Layout direction of the radio items.</TableCell>
              </TableRow>
              <TableRow>
                <TableCell><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle">name</code></TableCell>
                <TableCell><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle">string</code></TableCell>
                <TableCell>—</TableCell>
                <TableCell>Form field name for the group.</TableCell>
              </TableRow>
              <TableRow>
                <TableCell><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle">required</code></TableCell>
                <TableCell><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle">boolean</code></TableCell>
                <TableCell><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle">false</code></TableCell>
                <TableCell>Marks the group as required for form validation.</TableCell>
              </TableRow>
              <TableRow>
                <TableCell><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle">invalid</code></TableCell>
                <TableCell><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle">boolean</code></TableCell>
                <TableCell><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle">false</code></TableCell>
                <TableCell>Applies error border styling to all items.</TableCell>
              </TableRow>
              <TableRow>
                <TableCell><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle">className</code></TableCell>
                <TableCell><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle">string</code></TableCell>
                <TableCell>—</TableCell>
                <TableCell>Additional CSS classes. Use for layout utilities only.</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
        <div className="block md:hidden">
          <TableMobileList>
            <TableMobileItem>
              <span className="type-body-sm text-foreground"><strong>value</strong></span>
              <span className="type-caption text-muted-foreground"><code className="rounded px-1 py-0.5 font-mono bg-surface-subtle">string</code></span>
              <span className="type-caption text-muted-foreground">Controlled selected value.</span>
            </TableMobileItem>
            <TableMobileItem>
              <span className="type-body-sm text-foreground"><strong>defaultValue</strong></span>
              <span className="type-caption text-muted-foreground"><code className="rounded px-1 py-0.5 font-mono bg-surface-subtle">string</code></span>
              <span className="type-caption text-muted-foreground">Uncontrolled default selected value.</span>
            </TableMobileItem>
            <TableMobileItem>
              <span className="type-body-sm text-foreground"><strong>onValueChange</strong></span>
              <span className="type-caption text-muted-foreground"><code className="rounded px-1 py-0.5 font-mono bg-surface-subtle">{"(value: string) => void"}</code></span>
              <span className="type-caption text-muted-foreground">Called when the selected value changes.</span>
            </TableMobileItem>
            <TableMobileItem>
              <span className="type-body-sm text-foreground"><strong>disabled</strong></span>
              <span className="type-caption text-muted-foreground"><code className="rounded px-1 py-0.5 font-mono bg-surface-subtle">boolean</code></span>
              <span className="type-caption text-muted-foreground">Default: <code className="rounded px-1 py-0.5 font-mono bg-surface-subtle">false</code></span>
              <span className="type-caption text-muted-foreground">Disables the entire group.</span>
            </TableMobileItem>
            <TableMobileItem>
              <span className="type-body-sm text-foreground"><strong>orientation</strong></span>
              <span className="type-caption text-muted-foreground"><code className="rounded px-1 py-0.5 font-mono bg-surface-subtle">{'"horizontal" | "vertical"'}</code></span>
              <span className="type-caption text-muted-foreground">Default: <code className="rounded px-1 py-0.5 font-mono bg-surface-subtle">"vertical"</code></span>
              <span className="type-caption text-muted-foreground">Layout direction of the radio items.</span>
            </TableMobileItem>
            <TableMobileItem>
              <span className="type-body-sm text-foreground"><strong>name</strong></span>
              <span className="type-caption text-muted-foreground"><code className="rounded px-1 py-0.5 font-mono bg-surface-subtle">string</code></span>
              <span className="type-caption text-muted-foreground">Form field name for the group.</span>
            </TableMobileItem>
            <TableMobileItem>
              <span className="type-body-sm text-foreground"><strong>required</strong></span>
              <span className="type-caption text-muted-foreground"><code className="rounded px-1 py-0.5 font-mono bg-surface-subtle">boolean</code></span>
              <span className="type-caption text-muted-foreground">Default: <code className="rounded px-1 py-0.5 font-mono bg-surface-subtle">false</code></span>
              <span className="type-caption text-muted-foreground">Marks the group as required for form validation.</span>
            </TableMobileItem>
            <TableMobileItem>
              <span className="type-body-sm text-foreground"><strong>invalid</strong></span>
              <span className="type-caption text-muted-foreground"><code className="rounded px-1 py-0.5 font-mono bg-surface-subtle">boolean</code></span>
              <span className="type-caption text-muted-foreground">Default: <code className="rounded px-1 py-0.5 font-mono bg-surface-subtle">false</code></span>
              <span className="type-caption text-muted-foreground">Applies error border styling to all items.</span>
            </TableMobileItem>
            <TableMobileItem>
              <span className="type-body-sm text-foreground"><strong>className</strong></span>
              <span className="type-caption text-muted-foreground"><code className="rounded px-1 py-0.5 font-mono bg-surface-subtle">string</code></span>
              <span className="type-caption text-muted-foreground">Additional CSS classes. Use for layout utilities only.</span>
            </TableMobileItem>
          </TableMobileList>
        </div>
      </div>

      {/* RadioItem table */}
      <h3 className="type-h3 mt-8 mb-2 text-foreground">RadioItem</h3>
      <p className="type-body mb-4 text-foreground max-w-prose">
        A single radio option. Must be used inside{' '}
        <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">
          RadioGroup
        </code>.
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
                <TableCell><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle">value</code></TableCell>
                <TableCell><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle">string</code></TableCell>
                <TableCell><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle">required</code></TableCell>
                <TableCell>Unique value identifying this option.</TableCell>
              </TableRow>
              <TableRow>
                <TableCell><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle">text</code></TableCell>
                <TableCell><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle">string</code></TableCell>
                <TableCell><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle">required</code></TableCell>
                <TableCell>Label text rendered beside the radio indicator.</TableCell>
              </TableRow>
              <TableRow>
                <TableCell><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle">disabled</code></TableCell>
                <TableCell><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle">boolean</code></TableCell>
                <TableCell><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle">false</code></TableCell>
                <TableCell>Disables this individual item.</TableCell>
              </TableRow>
              <TableRow>
                <TableCell><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle">className</code></TableCell>
                <TableCell><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle">string</code></TableCell>
                <TableCell>—</TableCell>
                <TableCell>Additional CSS classes. Use for layout utilities only.</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
        <div className="block md:hidden">
          <TableMobileList>
            <TableMobileItem>
              <span className="type-body-sm text-foreground"><strong>value</strong></span>
              <span className="type-caption text-muted-foreground"><code className="rounded px-1 py-0.5 font-mono bg-surface-subtle">string</code></span>
              <span className="type-caption text-muted-foreground">Default: <code className="rounded px-1 py-0.5 font-mono bg-surface-subtle">required</code></span>
              <span className="type-caption text-muted-foreground">Unique value identifying this option.</span>
            </TableMobileItem>
            <TableMobileItem>
              <span className="type-body-sm text-foreground"><strong>text</strong></span>
              <span className="type-caption text-muted-foreground"><code className="rounded px-1 py-0.5 font-mono bg-surface-subtle">string</code></span>
              <span className="type-caption text-muted-foreground">Default: <code className="rounded px-1 py-0.5 font-mono bg-surface-subtle">required</code></span>
              <span className="type-caption text-muted-foreground">Label text rendered beside the radio indicator.</span>
            </TableMobileItem>
            <TableMobileItem>
              <span className="type-body-sm text-foreground"><strong>disabled</strong></span>
              <span className="type-caption text-muted-foreground"><code className="rounded px-1 py-0.5 font-mono bg-surface-subtle">boolean</code></span>
              <span className="type-caption text-muted-foreground">Default: <code className="rounded px-1 py-0.5 font-mono bg-surface-subtle">false</code></span>
              <span className="type-caption text-muted-foreground">Disables this individual item.</span>
            </TableMobileItem>
            <TableMobileItem>
              <span className="type-body-sm text-foreground"><strong>className</strong></span>
              <span className="type-caption text-muted-foreground"><code className="rounded px-1 py-0.5 font-mono bg-surface-subtle">string</code></span>
              <span className="type-caption text-muted-foreground">Additional CSS classes. Use for layout utilities only.</span>
            </TableMobileItem>
          </TableMobileList>
        </div>
      </div>

    </Container>
  )
}
