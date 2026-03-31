'use client'

import { useState } from 'react'
import { RadioGroup, RadioItem } from '@umichkisa-ds/web'
import { ComponentPreview } from '@/components/ComponentPreview'

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

export default function RadioPage() {
  const [fruit, setFruit] = useState('banana')
  return (
    <article className="mx-auto max-w-3xl px-6 py-12 min-w-0 overflow-hidden">

      {/* ── Header ──────────────────────────────────────────── */}
      <h1 className="type-h1 font-sejong-bold tracking-tight mt-8 mb-4 text-foreground">Radio</h1>
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
      <ComponentPreview code={basicCode}>
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
      <ComponentPreview code={horizontalCode}>
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
      <ComponentPreview code={defaultValueCode}>
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
      <ComponentPreview code={disabledGroupCode}>
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
      <ComponentPreview code={disabledItemCode}>
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
      <ComponentPreview code={invalidCode}>
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
      <ComponentPreview code={controlledCode}>
        <div className="flex flex-col gap-2">
          <RadioGroup value={fruit} onValueChange={setFruit}>
            <RadioItem value="apple" text="Apple" />
            <RadioItem value="banana" text="Banana" />
            <RadioItem value="cherry" text="Cherry" />
          </RadioGroup>
          <p className="type-caption text-muted-foreground">You picked: {fruit}</p>
        </div>
      </ComponentPreview>

      {/* ── API Reference ────────────────────────────────────── */}
      <h2 className="type-h2 mt-8 mb-4 text-foreground">API Reference</h2>

      {/* RadioGroup table */}
      <h3 className="type-h3 mt-6 mb-2 text-foreground">RadioGroup</h3>
      <p className="type-body mb-4 text-foreground max-w-prose">
        The group container. Built on Radix RadioGroup — all props below are supported.
      </p>
      <div className="my-6 overflow-x-auto">
        <table className="w-full border-collapse border border-border">
          <thead className="bg-surface-subtle">
            <tr>
              <th className="px-4 py-3 text-left type-caption uppercase border-b border-border text-muted-foreground">Prop</th>
              <th className="px-4 py-3 text-left type-caption uppercase border-b border-border text-muted-foreground">Type</th>
              <th className="px-4 py-3 text-left type-caption uppercase border-b border-border text-muted-foreground">Default</th>
              <th className="px-4 py-3 text-left type-caption uppercase border-b border-border text-muted-foreground">Description</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b border-border">
              <td className="px-4 py-3 type-caption font-mono text-foreground">value</td>
              <td className="px-4 py-3 type-caption font-mono text-foreground">string</td>
              <td className="px-4 py-3 type-caption font-mono text-foreground">—</td>
              <td className="px-4 py-3 type-body-sm text-foreground">Controlled selected value.</td>
            </tr>
            <tr className="border-b border-border">
              <td className="px-4 py-3 type-caption font-mono text-foreground">defaultValue</td>
              <td className="px-4 py-3 type-caption font-mono text-foreground">string</td>
              <td className="px-4 py-3 type-caption font-mono text-foreground">—</td>
              <td className="px-4 py-3 type-body-sm text-foreground">Uncontrolled default selected value.</td>
            </tr>
            <tr className="border-b border-border">
              <td className="px-4 py-3 type-caption font-mono text-foreground">onValueChange</td>
              <td className="px-4 py-3 type-caption font-mono text-foreground">{"(value: string) => void"}</td>
              <td className="px-4 py-3 type-caption font-mono text-foreground">—</td>
              <td className="px-4 py-3 type-body-sm text-foreground">Called when the selected value changes.</td>
            </tr>
            <tr className="border-b border-border">
              <td className="px-4 py-3 type-caption font-mono text-foreground">disabled</td>
              <td className="px-4 py-3 type-caption font-mono text-foreground">boolean</td>
              <td className="px-4 py-3 type-caption font-mono text-foreground">false</td>
              <td className="px-4 py-3 type-body-sm text-foreground">Disables the entire group.</td>
            </tr>
            <tr className="border-b border-border">
              <td className="px-4 py-3 type-caption font-mono text-foreground">orientation</td>
              <td className="px-4 py-3 type-caption font-mono text-foreground">{'"horizontal" | "vertical"'}</td>
              <td className="px-4 py-3 type-caption font-mono text-foreground">"vertical"</td>
              <td className="px-4 py-3 type-body-sm text-foreground">Layout direction of the radio items.</td>
            </tr>
            <tr className="border-b border-border">
              <td className="px-4 py-3 type-caption font-mono text-foreground">name</td>
              <td className="px-4 py-3 type-caption font-mono text-foreground">string</td>
              <td className="px-4 py-3 type-caption font-mono text-foreground">—</td>
              <td className="px-4 py-3 type-body-sm text-foreground">Form field name for the group.</td>
            </tr>
            <tr className="border-b border-border">
              <td className="px-4 py-3 type-caption font-mono text-foreground">required</td>
              <td className="px-4 py-3 type-caption font-mono text-foreground">boolean</td>
              <td className="px-4 py-3 type-caption font-mono text-foreground">false</td>
              <td className="px-4 py-3 type-body-sm text-foreground">Marks the group as required for form validation.</td>
            </tr>
            <tr className="border-b border-border">
              <td className="px-4 py-3 type-caption font-mono text-foreground">invalid</td>
              <td className="px-4 py-3 type-caption font-mono text-foreground">boolean</td>
              <td className="px-4 py-3 type-caption font-mono text-foreground">false</td>
              <td className="px-4 py-3 type-body-sm text-foreground">Applies error border styling to all items.</td>
            </tr>
            <tr className="border-b border-border">
              <td className="px-4 py-3 type-caption font-mono text-foreground">className</td>
              <td className="px-4 py-3 type-caption font-mono text-foreground">string</td>
              <td className="px-4 py-3 type-caption font-mono text-foreground">—</td>
              <td className="px-4 py-3 type-body-sm text-foreground">Additional CSS classes. Use for layout utilities only.</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* RadioItem table */}
      <h3 className="type-h3 mt-8 mb-2 text-foreground">RadioItem</h3>
      <p className="type-body mb-4 text-foreground max-w-prose">
        A single radio option. Must be used inside{' '}
        <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">
          RadioGroup
        </code>.
      </p>
      <div className="my-6 overflow-x-auto">
        <table className="w-full border-collapse border border-border">
          <thead className="bg-surface-subtle">
            <tr>
              <th className="px-4 py-3 text-left type-caption uppercase border-b border-border text-muted-foreground">Prop</th>
              <th className="px-4 py-3 text-left type-caption uppercase border-b border-border text-muted-foreground">Type</th>
              <th className="px-4 py-3 text-left type-caption uppercase border-b border-border text-muted-foreground">Default</th>
              <th className="px-4 py-3 text-left type-caption uppercase border-b border-border text-muted-foreground">Description</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b border-border">
              <td className="px-4 py-3 type-caption font-mono text-foreground">value</td>
              <td className="px-4 py-3 type-caption font-mono text-foreground">string</td>
              <td className="px-4 py-3 type-caption font-mono text-foreground">required</td>
              <td className="px-4 py-3 type-body-sm text-foreground">Unique value identifying this option.</td>
            </tr>
            <tr className="border-b border-border">
              <td className="px-4 py-3 type-caption font-mono text-foreground">text</td>
              <td className="px-4 py-3 type-caption font-mono text-foreground">string</td>
              <td className="px-4 py-3 type-caption font-mono text-foreground">required</td>
              <td className="px-4 py-3 type-body-sm text-foreground">Label text rendered beside the radio indicator.</td>
            </tr>
            <tr className="border-b border-border">
              <td className="px-4 py-3 type-caption font-mono text-foreground">disabled</td>
              <td className="px-4 py-3 type-caption font-mono text-foreground">boolean</td>
              <td className="px-4 py-3 type-caption font-mono text-foreground">false</td>
              <td className="px-4 py-3 type-body-sm text-foreground">Disables this individual item.</td>
            </tr>
            <tr className="border-b border-border">
              <td className="px-4 py-3 type-caption font-mono text-foreground">className</td>
              <td className="px-4 py-3 type-caption font-mono text-foreground">string</td>
              <td className="px-4 py-3 type-caption font-mono text-foreground">—</td>
              <td className="px-4 py-3 type-body-sm text-foreground">Additional CSS classes. Use for layout utilities only.</td>
            </tr>
          </tbody>
        </table>
      </div>

    </article>
  )
}
