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
import { Heading } from '@/components/Heading'
import { InlineCode } from '@/components/InlineCode'

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
        <InlineCode>
          RadioGroup
        </InlineCode>{' '}
        and{' '}
        <InlineCode>
          RadioItem
        </InlineCode>{' '}
        together to let users pick one option from a set.
      </p>

      {/* ── Examples ────────────────────────────────────────── */}
      <Heading as="h2">Examples</Heading>

      {/* Basic */}
      <Heading as="h3" className="mt-6">Basic</Heading>
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
      <Heading as="h3">Horizontal orientation</Heading>
      <p className="type-body mb-2 text-foreground max-w-prose">
        Set{' '}
        <InlineCode>
          orientation=&quot;horizontal&quot;
        </InlineCode>{' '}
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
      <Heading as="h3">Default value</Heading>
      <p className="type-body mb-2 text-foreground max-w-prose">
        Use{' '}
        <InlineCode>
          defaultValue
        </InlineCode>{' '}
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
      <Heading as="h3">Disabled group</Heading>
      <p className="type-body mb-2 text-foreground max-w-prose">
        Set{' '}
        <InlineCode>
          disabled
        </InlineCode>{' '}
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
      <Heading as="h3">Disabled individual item</Heading>
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
      <Heading as="h3">Invalid / error state</Heading>
      <p className="type-body mb-2 text-foreground max-w-prose">
        Pair{' '}
        <InlineCode>
          invalid
        </InlineCode>{' '}
        with an error message below. Use{' '}
        <InlineCode>
          type-caption text-error
        </InlineCode>{' '}
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
      <Heading as="h3">Controlled</Heading>
      <p className="type-body mb-2 text-foreground max-w-prose">
        Use{' '}
        <InlineCode>
          value
        </InlineCode>{' '}
        and{' '}
        <InlineCode>
          onValueChange
        </InlineCode>{' '}
        for controlled state.
      </p>
      <ComponentPreview code={controlledCode} highlightedCode={controlledHighlighted}>
        <ControlledDemo />
      </ComponentPreview>

      {/* ── API Reference ────────────────────────────────────── */}
      <Heading as="h2">API Reference</Heading>

      {/* RadioGroup table */}
      <Heading as="h3" className="mt-6">RadioGroup</Heading>
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
                <TableCell><InlineCode>value</InlineCode></TableCell>
                <TableCell><InlineCode>string</InlineCode></TableCell>
                <TableCell>—</TableCell>
                <TableCell>Controlled selected value.</TableCell>
              </TableRow>
              <TableRow>
                <TableCell><InlineCode>defaultValue</InlineCode></TableCell>
                <TableCell><InlineCode>string</InlineCode></TableCell>
                <TableCell>—</TableCell>
                <TableCell>Uncontrolled default selected value.</TableCell>
              </TableRow>
              <TableRow>
                <TableCell><InlineCode>onValueChange</InlineCode></TableCell>
                <TableCell><InlineCode>{"(value: string) => void"}</InlineCode></TableCell>
                <TableCell>—</TableCell>
                <TableCell>Called when the selected value changes.</TableCell>
              </TableRow>
              <TableRow>
                <TableCell><InlineCode>disabled</InlineCode></TableCell>
                <TableCell><InlineCode>boolean</InlineCode></TableCell>
                <TableCell><InlineCode>false</InlineCode></TableCell>
                <TableCell>Disables the entire group.</TableCell>
              </TableRow>
              <TableRow>
                <TableCell><InlineCode>orientation</InlineCode></TableCell>
                <TableCell><InlineCode>{'"horizontal" | "vertical"'}</InlineCode></TableCell>
                <TableCell><InlineCode>"vertical"</InlineCode></TableCell>
                <TableCell>Layout direction of the radio items.</TableCell>
              </TableRow>
              <TableRow>
                <TableCell><InlineCode>name</InlineCode></TableCell>
                <TableCell><InlineCode>string</InlineCode></TableCell>
                <TableCell>—</TableCell>
                <TableCell>Form field name for the group.</TableCell>
              </TableRow>
              <TableRow>
                <TableCell><InlineCode>required</InlineCode></TableCell>
                <TableCell><InlineCode>boolean</InlineCode></TableCell>
                <TableCell><InlineCode>false</InlineCode></TableCell>
                <TableCell>Marks the group as required for form validation.</TableCell>
              </TableRow>
              <TableRow>
                <TableCell><InlineCode>invalid</InlineCode></TableCell>
                <TableCell><InlineCode>boolean</InlineCode></TableCell>
                <TableCell><InlineCode>false</InlineCode></TableCell>
                <TableCell>Applies error border styling to all items.</TableCell>
              </TableRow>
              <TableRow>
                <TableCell><InlineCode>className</InlineCode></TableCell>
                <TableCell><InlineCode>string</InlineCode></TableCell>
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
              <span className="type-caption text-muted-foreground"><InlineCode>string</InlineCode></span>
              <span className="type-caption text-muted-foreground">Controlled selected value.</span>
            </TableMobileItem>
            <TableMobileItem>
              <span className="type-body-sm text-foreground"><strong>defaultValue</strong></span>
              <span className="type-caption text-muted-foreground"><InlineCode>string</InlineCode></span>
              <span className="type-caption text-muted-foreground">Uncontrolled default selected value.</span>
            </TableMobileItem>
            <TableMobileItem>
              <span className="type-body-sm text-foreground"><strong>onValueChange</strong></span>
              <span className="type-caption text-muted-foreground"><InlineCode>{"(value: string) => void"}</InlineCode></span>
              <span className="type-caption text-muted-foreground">Called when the selected value changes.</span>
            </TableMobileItem>
            <TableMobileItem>
              <span className="type-body-sm text-foreground"><strong>disabled</strong></span>
              <span className="type-caption text-muted-foreground"><InlineCode>boolean</InlineCode></span>
              <span className="type-caption text-muted-foreground">Default: <InlineCode>false</InlineCode></span>
              <span className="type-caption text-muted-foreground">Disables the entire group.</span>
            </TableMobileItem>
            <TableMobileItem>
              <span className="type-body-sm text-foreground"><strong>orientation</strong></span>
              <span className="type-caption text-muted-foreground"><InlineCode>{'"horizontal" | "vertical"'}</InlineCode></span>
              <span className="type-caption text-muted-foreground">Default: <InlineCode>"vertical"</InlineCode></span>
              <span className="type-caption text-muted-foreground">Layout direction of the radio items.</span>
            </TableMobileItem>
            <TableMobileItem>
              <span className="type-body-sm text-foreground"><strong>name</strong></span>
              <span className="type-caption text-muted-foreground"><InlineCode>string</InlineCode></span>
              <span className="type-caption text-muted-foreground">Form field name for the group.</span>
            </TableMobileItem>
            <TableMobileItem>
              <span className="type-body-sm text-foreground"><strong>required</strong></span>
              <span className="type-caption text-muted-foreground"><InlineCode>boolean</InlineCode></span>
              <span className="type-caption text-muted-foreground">Default: <InlineCode>false</InlineCode></span>
              <span className="type-caption text-muted-foreground">Marks the group as required for form validation.</span>
            </TableMobileItem>
            <TableMobileItem>
              <span className="type-body-sm text-foreground"><strong>invalid</strong></span>
              <span className="type-caption text-muted-foreground"><InlineCode>boolean</InlineCode></span>
              <span className="type-caption text-muted-foreground">Default: <InlineCode>false</InlineCode></span>
              <span className="type-caption text-muted-foreground">Applies error border styling to all items.</span>
            </TableMobileItem>
            <TableMobileItem>
              <span className="type-body-sm text-foreground"><strong>className</strong></span>
              <span className="type-caption text-muted-foreground"><InlineCode>string</InlineCode></span>
              <span className="type-caption text-muted-foreground">Additional CSS classes. Use for layout utilities only.</span>
            </TableMobileItem>
          </TableMobileList>
        </div>
      </div>

      {/* RadioItem table */}
      <Heading as="h3">RadioItem</Heading>
      <p className="type-body mb-4 text-foreground max-w-prose">
        A single radio option. Must be used inside{' '}
        <InlineCode>
          RadioGroup
        </InlineCode>.
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
                <TableCell><InlineCode>value</InlineCode></TableCell>
                <TableCell><InlineCode>string</InlineCode></TableCell>
                <TableCell><InlineCode>required</InlineCode></TableCell>
                <TableCell>Unique value identifying this option.</TableCell>
              </TableRow>
              <TableRow>
                <TableCell><InlineCode>text</InlineCode></TableCell>
                <TableCell><InlineCode>string</InlineCode></TableCell>
                <TableCell><InlineCode>required</InlineCode></TableCell>
                <TableCell>Label text rendered beside the radio indicator.</TableCell>
              </TableRow>
              <TableRow>
                <TableCell><InlineCode>disabled</InlineCode></TableCell>
                <TableCell><InlineCode>boolean</InlineCode></TableCell>
                <TableCell><InlineCode>false</InlineCode></TableCell>
                <TableCell>Disables this individual item.</TableCell>
              </TableRow>
              <TableRow>
                <TableCell><InlineCode>className</InlineCode></TableCell>
                <TableCell><InlineCode>string</InlineCode></TableCell>
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
              <span className="type-caption text-muted-foreground"><InlineCode>string</InlineCode></span>
              <span className="type-caption text-muted-foreground">Default: <InlineCode>required</InlineCode></span>
              <span className="type-caption text-muted-foreground">Unique value identifying this option.</span>
            </TableMobileItem>
            <TableMobileItem>
              <span className="type-body-sm text-foreground"><strong>text</strong></span>
              <span className="type-caption text-muted-foreground"><InlineCode>string</InlineCode></span>
              <span className="type-caption text-muted-foreground">Default: <InlineCode>required</InlineCode></span>
              <span className="type-caption text-muted-foreground">Label text rendered beside the radio indicator.</span>
            </TableMobileItem>
            <TableMobileItem>
              <span className="type-body-sm text-foreground"><strong>disabled</strong></span>
              <span className="type-caption text-muted-foreground"><InlineCode>boolean</InlineCode></span>
              <span className="type-caption text-muted-foreground">Default: <InlineCode>false</InlineCode></span>
              <span className="type-caption text-muted-foreground">Disables this individual item.</span>
            </TableMobileItem>
            <TableMobileItem>
              <span className="type-body-sm text-foreground"><strong>className</strong></span>
              <span className="type-caption text-muted-foreground"><InlineCode>string</InlineCode></span>
              <span className="type-caption text-muted-foreground">Additional CSS classes. Use for layout utilities only.</span>
            </TableMobileItem>
          </TableMobileList>
        </div>
      </div>

    </Container>
  )
}
