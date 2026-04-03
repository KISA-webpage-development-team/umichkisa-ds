'use client'

import { Container, Button, Dropdown, DropdownTrigger, DropdownContent, DropdownItem, DropdownGroup, DropdownSeparator } from '@umichkisa-ds/web'
import { ComponentPreview } from '@/components/ComponentPreview'

const basicCode = `import { Dropdown, DropdownTrigger, DropdownContent, DropdownItem } from '@umichkisa-ds/web'
import { Button } from '@umichkisa-ds/web'

<Dropdown>
  <DropdownTrigger asChild>
    <Button variant="secondary">Actions</Button>
  </DropdownTrigger>
  <DropdownContent>
    <DropdownItem>Edit</DropdownItem>
    <DropdownItem>Duplicate</DropdownItem>
    <DropdownItem variant="destructive">Delete</DropdownItem>
  </DropdownContent>
</Dropdown>`

const groupsCode = `import { Dropdown, DropdownTrigger, DropdownContent, DropdownItem, DropdownGroup } from '@umichkisa-ds/web'
import { Button } from '@umichkisa-ds/web'

<Dropdown>
  <DropdownTrigger asChild>
    <Button variant="secondary">Actions</Button>
  </DropdownTrigger>
  <DropdownContent>
    <DropdownGroup label="Actions">
      <DropdownItem>Edit</DropdownItem>
      <DropdownItem>Duplicate</DropdownItem>
    </DropdownGroup>
    <DropdownGroup label="Danger Zone">
      <DropdownItem variant="destructive">Delete</DropdownItem>
    </DropdownGroup>
  </DropdownContent>
</Dropdown>`

const separatorCode = `import { Dropdown, DropdownTrigger, DropdownContent, DropdownItem, DropdownSeparator } from '@umichkisa-ds/web'
import { Button } from '@umichkisa-ds/web'

<Dropdown>
  <DropdownTrigger asChild>
    <Button variant="secondary">Actions</Button>
  </DropdownTrigger>
  <DropdownContent>
    <DropdownItem>Edit</DropdownItem>
    <DropdownItem>Duplicate</DropdownItem>
    <DropdownSeparator />
    <DropdownItem variant="destructive">Delete</DropdownItem>
  </DropdownContent>
</Dropdown>`

const destructiveCode = `import { Dropdown, DropdownTrigger, DropdownContent, DropdownItem } from '@umichkisa-ds/web'
import { Button } from '@umichkisa-ds/web'

<Dropdown>
  <DropdownTrigger asChild>
    <Button variant="secondary">Actions</Button>
  </DropdownTrigger>
  <DropdownContent>
    <DropdownItem>Edit</DropdownItem>
    <DropdownItem variant="destructive">Delete</DropdownItem>
  </DropdownContent>
</Dropdown>`

const disabledCode = `import { Dropdown, DropdownTrigger, DropdownContent, DropdownItem } from '@umichkisa-ds/web'
import { Button } from '@umichkisa-ds/web'

<Dropdown>
  <DropdownTrigger asChild>
    <Button variant="secondary">Actions</Button>
  </DropdownTrigger>
  <DropdownContent>
    <DropdownItem>Edit</DropdownItem>
    <DropdownItem disabled>Duplicate</DropdownItem>
    <DropdownItem variant="destructive">Delete</DropdownItem>
  </DropdownContent>
</Dropdown>`

const positioningCode = `import { Dropdown, DropdownTrigger, DropdownContent, DropdownItem } from '@umichkisa-ds/web'
import { Button } from '@umichkisa-ds/web'

<Dropdown>
  <DropdownTrigger asChild>
    <Button variant="secondary">Actions</Button>
  </DropdownTrigger>
  <DropdownContent align="end">
    <DropdownItem>Edit</DropdownItem>
    <DropdownItem>Duplicate</DropdownItem>
    <DropdownItem variant="destructive">Delete</DropdownItem>
  </DropdownContent>
</Dropdown>`

export default function DropdownPage() {
  return (
    <Container size="md" as="article">

      {/* -- Header -------------------------------------------------- */}
      <h1 className="type-h1 font-sejong-bold tracking-tight mt-8 mb-4 text-foreground">Dropdown</h1>
      <p className="type-body mb-8 text-foreground max-w-prose">
        Action menu triggered by a button. Built on Radix DropdownMenu for full keyboard navigation
        and accessibility. Compose sub-components together — trigger, content panel, and menu items.
        Use Dropdown for action menus (edit, delete, share). For value selection from a list,
        use Select instead.
      </p>

      {/* -- Examples ------------------------------------------------- */}
      <h2 className="type-h2 mt-8 mb-4 text-foreground">Examples</h2>

      {/* Basic */}
      <h3 className="type-h3 mt-6 mb-2 text-foreground">Basic</h3>
      <p className="type-body mb-2 text-foreground max-w-prose">
        A simple dropdown with three items. Use a{' '}
        <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">
          Button
        </code>{' '}
        with{' '}
        <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">
          variant=&quot;secondary&quot;
        </code>{' '}
        as the trigger via{' '}
        <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">
          asChild
        </code>.
      </p>
      <ComponentPreview code={basicCode}>
        <Dropdown>
          <DropdownTrigger asChild>
            <Button variant="secondary">Actions</Button>
          </DropdownTrigger>
          <DropdownContent>
            <DropdownItem>Edit</DropdownItem>
            <DropdownItem>Duplicate</DropdownItem>
            <DropdownItem variant="destructive">Delete</DropdownItem>
          </DropdownContent>
        </Dropdown>
      </ComponentPreview>

      {/* With groups */}
      <h3 className="type-h3 mt-8 mb-2 text-foreground">With groups</h3>
      <p className="type-body mb-2 text-foreground max-w-prose">
        Use groups when items need a visible heading. For a simple visual break without labels,
        use{' '}
        <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">
          DropdownSeparator
        </code>{' '}
        instead. Group related items with{' '}
        <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">
          DropdownGroup
        </code>{' '}
        and its{' '}
        <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">
          label
        </code>{' '}
        prop.
      </p>
      <ComponentPreview code={groupsCode}>
        <Dropdown>
          <DropdownTrigger asChild>
            <Button variant="secondary">Actions</Button>
          </DropdownTrigger>
          <DropdownContent>
            <DropdownGroup label="Actions">
              <DropdownItem>Edit</DropdownItem>
              <DropdownItem>Duplicate</DropdownItem>
            </DropdownGroup>
            <DropdownGroup label="Danger Zone">
              <DropdownItem variant="destructive">Delete</DropdownItem>
            </DropdownGroup>
          </DropdownContent>
        </Dropdown>
      </ComponentPreview>

      {/* With separator */}
      <h3 className="type-h3 mt-8 mb-2 text-foreground">With separator</h3>
      <p className="type-body mb-2 text-foreground max-w-prose">
        Use{' '}
        <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">
          DropdownSeparator
        </code>{' '}
        to visually divide items into sections.
      </p>
      <ComponentPreview code={separatorCode}>
        <Dropdown>
          <DropdownTrigger asChild>
            <Button variant="secondary">Actions</Button>
          </DropdownTrigger>
          <DropdownContent>
            <DropdownItem>Edit</DropdownItem>
            <DropdownItem>Duplicate</DropdownItem>
            <DropdownSeparator />
            <DropdownItem variant="destructive">Delete</DropdownItem>
          </DropdownContent>
        </Dropdown>
      </ComponentPreview>

      {/* Destructive item */}
      <h3 className="type-h3 mt-8 mb-2 text-foreground">Destructive item</h3>
      <p className="type-body mb-2 text-foreground max-w-prose">
        Apply{' '}
        <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">
          variant=&quot;destructive&quot;
        </code>{' '}
        to highlight dangerous actions like delete.
      </p>
      <ComponentPreview code={destructiveCode}>
        <Dropdown>
          <DropdownTrigger asChild>
            <Button variant="secondary">Actions</Button>
          </DropdownTrigger>
          <DropdownContent>
            <DropdownItem>Edit</DropdownItem>
            <DropdownItem variant="destructive">Delete</DropdownItem>
          </DropdownContent>
        </Dropdown>
      </ComponentPreview>

      {/* Disabled items */}
      <h3 className="type-h3 mt-8 mb-2 text-foreground">Disabled items</h3>
      <p className="type-body mb-2 text-foreground max-w-prose">
        Use the{' '}
        <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">
          disabled
        </code>{' '}
        prop to prevent interaction with a menu item.
      </p>
      <ComponentPreview code={disabledCode}>
        <Dropdown>
          <DropdownTrigger asChild>
            <Button variant="secondary">Actions</Button>
          </DropdownTrigger>
          <DropdownContent>
            <DropdownItem>Edit</DropdownItem>
            <DropdownItem disabled>Duplicate</DropdownItem>
            <DropdownItem variant="destructive">Delete</DropdownItem>
          </DropdownContent>
        </Dropdown>
      </ComponentPreview>

      {/* Positioning */}
      <h3 className="type-h3 mt-8 mb-2 text-foreground">Positioning</h3>
      <p className="type-body mb-2 text-foreground max-w-prose">
        Use{' '}
        <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">
          align
        </code>,{' '}
        <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">
          side
        </code>, and{' '}
        <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">
          sideOffset
        </code>{' '}
        on{' '}
        <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">
          DropdownContent
        </code>{' '}
        to control where the menu appears.
      </p>
      <ComponentPreview code={positioningCode}>
        <div className="flex justify-end">
          <Dropdown>
            <DropdownTrigger asChild>
              <Button variant="secondary">Actions</Button>
            </DropdownTrigger>
            <DropdownContent align="end">
              <DropdownItem>Edit</DropdownItem>
              <DropdownItem>Duplicate</DropdownItem>
              <DropdownItem variant="destructive">Delete</DropdownItem>
            </DropdownContent>
          </Dropdown>
        </div>
      </ComponentPreview>

      {/* -- API Reference -------------------------------------------- */}
      <h2 className="type-h2 mt-8 mb-4 text-foreground">API Reference</h2>
      <p className="type-body mb-4 text-foreground max-w-prose">
        Dropdown is a compound component built on Radix DropdownMenu. Each sub-component accepts the props listed below.
      </p>

      {/* Dropdown (Root) */}
      <h3 className="type-h3 mt-8 mb-2 text-foreground">Dropdown</h3>
      <p className="type-body mb-2 text-foreground max-w-prose">
        The root component that manages open/closed state. Wraps all other sub-components.
      </p>
      <div className="my-6 overflow-x-auto">
        <table className="w-full border-collapse border border-border">
          <thead className="bg-surface-subtle">
            <tr>
              <th className="px-4 py-3 text-left type-caption border-b border-border text-muted-foreground">Prop</th>
              <th className="px-4 py-3 text-left type-caption border-b border-border text-muted-foreground">Type</th>
              <th className="px-4 py-3 text-left type-caption border-b border-border text-muted-foreground">Default</th>
              <th className="px-4 py-3 text-left type-caption border-b border-border text-muted-foreground">Description</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b border-border">
              <td className="px-4 py-3 text-foreground"><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle">open</code></td>
              <td className="px-4 py-3 text-foreground"><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle">boolean</code></td>
              <td className="px-4 py-3 type-body-sm text-foreground">—</td>
              <td className="px-4 py-3 type-body-sm text-foreground">Controlled open state.</td>
            </tr>
            <tr className="border-b border-border">
              <td className="px-4 py-3 text-foreground"><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle">defaultOpen</code></td>
              <td className="px-4 py-3 text-foreground"><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle">boolean</code></td>
              <td className="px-4 py-3 type-body-sm text-foreground">—</td>
              <td className="px-4 py-3 type-body-sm text-foreground">Initial open state for uncontrolled usage.</td>
            </tr>
            <tr className="border-b border-border">
              <td className="px-4 py-3 text-foreground"><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle">onOpenChange</code></td>
              <td className="px-4 py-3 text-foreground"><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle">(open: boolean) =&gt; void</code></td>
              <td className="px-4 py-3 type-body-sm text-foreground">—</td>
              <td className="px-4 py-3 type-body-sm text-foreground">Callback when the open state changes.</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* DropdownTrigger */}
      <h3 className="type-h3 mt-8 mb-2 text-foreground">DropdownTrigger</h3>
      <div className="my-6 overflow-x-auto">
        <table className="w-full border-collapse border border-border">
          <thead className="bg-surface-subtle">
            <tr>
              <th className="px-4 py-3 text-left type-caption border-b border-border text-muted-foreground">Prop</th>
              <th className="px-4 py-3 text-left type-caption border-b border-border text-muted-foreground">Type</th>
              <th className="px-4 py-3 text-left type-caption border-b border-border text-muted-foreground">Default</th>
              <th className="px-4 py-3 text-left type-caption border-b border-border text-muted-foreground">Description</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b border-border">
              <td className="px-4 py-3 text-foreground"><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle">asChild</code></td>
              <td className="px-4 py-3 text-foreground"><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle">boolean</code></td>
              <td className="px-4 py-3 text-foreground"><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle">false</code></td>
              <td className="px-4 py-3 type-body-sm text-foreground">Merge trigger props onto the child element instead of rendering a default button.</td>
            </tr>
            <tr className="border-b border-border">
              <td className="px-4 py-3 text-foreground"><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle">children</code></td>
              <td className="px-4 py-3 text-foreground"><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle">ReactNode</code></td>
              <td className="px-4 py-3 type-body-sm text-foreground">—</td>
              <td className="px-4 py-3 type-body-sm text-foreground">The trigger element, typically a Button.</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* DropdownContent */}
      <h3 className="type-h3 mt-8 mb-2 text-foreground">DropdownContent</h3>
      <div className="my-6 overflow-x-auto">
        <table className="w-full border-collapse border border-border">
          <thead className="bg-surface-subtle">
            <tr>
              <th className="px-4 py-3 text-left type-caption border-b border-border text-muted-foreground">Prop</th>
              <th className="px-4 py-3 text-left type-caption border-b border-border text-muted-foreground">Type</th>
              <th className="px-4 py-3 text-left type-caption border-b border-border text-muted-foreground">Default</th>
              <th className="px-4 py-3 text-left type-caption border-b border-border text-muted-foreground">Description</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b border-border">
              <td className="px-4 py-3 text-foreground"><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle">children</code></td>
              <td className="px-4 py-3 text-foreground"><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle">ReactNode</code></td>
              <td className="px-4 py-3 type-body-sm text-foreground">—</td>
              <td className="px-4 py-3 type-body-sm text-foreground">DropdownItem, DropdownGroup, and DropdownSeparator elements.</td>
            </tr>
            <tr className="border-b border-border">
              <td className="px-4 py-3 text-foreground"><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle">side</code></td>
              <td className="px-4 py-3 text-foreground"><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle">&quot;top&quot; | &quot;right&quot; | &quot;bottom&quot; | &quot;left&quot;</code></td>
              <td className="px-4 py-3 text-foreground"><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle">&quot;bottom&quot;</code></td>
              <td className="px-4 py-3 type-body-sm text-foreground">Which side of the trigger to render on.</td>
            </tr>
            <tr className="border-b border-border">
              <td className="px-4 py-3 text-foreground"><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle">align</code></td>
              <td className="px-4 py-3 text-foreground"><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle">&quot;start&quot; | &quot;center&quot; | &quot;end&quot;</code></td>
              <td className="px-4 py-3 text-foreground"><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle">&quot;start&quot;</code></td>
              <td className="px-4 py-3 type-body-sm text-foreground">Alignment along the side axis.</td>
            </tr>
            <tr className="border-b border-border">
              <td className="px-4 py-3 text-foreground"><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle">sideOffset</code></td>
              <td className="px-4 py-3 text-foreground"><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle">number</code></td>
              <td className="px-4 py-3 text-foreground"><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle">4</code></td>
              <td className="px-4 py-3 type-body-sm text-foreground">Offset in pixels from the trigger.</td>
            </tr>
            <tr className="border-b border-border">
              <td className="px-4 py-3 text-foreground"><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle">className</code></td>
              <td className="px-4 py-3 text-foreground"><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle">string</code></td>
              <td className="px-4 py-3 type-body-sm text-foreground">—</td>
              <td className="px-4 py-3 type-body-sm text-foreground">Merged via cn(). Use for layout utilities only.</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* DropdownItem */}
      <h3 className="type-h3 mt-8 mb-2 text-foreground">DropdownItem</h3>
      <div className="my-6 overflow-x-auto">
        <table className="w-full border-collapse border border-border">
          <thead className="bg-surface-subtle">
            <tr>
              <th className="px-4 py-3 text-left type-caption border-b border-border text-muted-foreground">Prop</th>
              <th className="px-4 py-3 text-left type-caption border-b border-border text-muted-foreground">Type</th>
              <th className="px-4 py-3 text-left type-caption border-b border-border text-muted-foreground">Default</th>
              <th className="px-4 py-3 text-left type-caption border-b border-border text-muted-foreground">Description</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b border-border">
              <td className="px-4 py-3 text-foreground"><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle">children</code></td>
              <td className="px-4 py-3 text-foreground"><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle">ReactNode</code></td>
              <td className="px-4 py-3 type-body-sm text-foreground">—</td>
              <td className="px-4 py-3 type-body-sm text-foreground">The item label content.</td>
            </tr>
            <tr className="border-b border-border">
              <td className="px-4 py-3 text-foreground"><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle">onSelect</code></td>
              <td className="px-4 py-3 text-foreground"><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle">() =&gt; void</code></td>
              <td className="px-4 py-3 type-body-sm text-foreground">—</td>
              <td className="px-4 py-3 type-body-sm text-foreground">Callback when the item is selected.</td>
            </tr>
            <tr className="border-b border-border">
              <td className="px-4 py-3 text-foreground"><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle">variant</code></td>
              <td className="px-4 py-3 text-foreground"><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle">&quot;default&quot; | &quot;destructive&quot;</code></td>
              <td className="px-4 py-3 text-foreground"><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle">&quot;default&quot;</code></td>
              <td className="px-4 py-3 type-body-sm text-foreground">Visual style. Use destructive for dangerous actions.</td>
            </tr>
            <tr className="border-b border-border">
              <td className="px-4 py-3 text-foreground"><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle">disabled</code></td>
              <td className="px-4 py-3 text-foreground"><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle">boolean</code></td>
              <td className="px-4 py-3 text-foreground"><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle">false</code></td>
              <td className="px-4 py-3 type-body-sm text-foreground">Prevents interaction with this item.</td>
            </tr>
            <tr className="border-b border-border">
              <td className="px-4 py-3 text-foreground"><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle">className</code></td>
              <td className="px-4 py-3 text-foreground"><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle">string</code></td>
              <td className="px-4 py-3 type-body-sm text-foreground">—</td>
              <td className="px-4 py-3 type-body-sm text-foreground">Merged via cn(). Use for layout utilities only.</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* DropdownGroup */}
      <h3 className="type-h3 mt-8 mb-2 text-foreground">DropdownGroup</h3>
      <div className="my-6 overflow-x-auto">
        <table className="w-full border-collapse border border-border">
          <thead className="bg-surface-subtle">
            <tr>
              <th className="px-4 py-3 text-left type-caption border-b border-border text-muted-foreground">Prop</th>
              <th className="px-4 py-3 text-left type-caption border-b border-border text-muted-foreground">Type</th>
              <th className="px-4 py-3 text-left type-caption border-b border-border text-muted-foreground">Default</th>
              <th className="px-4 py-3 text-left type-caption border-b border-border text-muted-foreground">Description</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b border-border">
              <td className="px-4 py-3 text-foreground"><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle">label</code></td>
              <td className="px-4 py-3 text-foreground"><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle">string</code></td>
              <td className="px-4 py-3 text-foreground"><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle">(required)</code></td>
              <td className="px-4 py-3 type-body-sm text-foreground">Group heading text.</td>
            </tr>
            <tr className="border-b border-border">
              <td className="px-4 py-3 text-foreground"><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle">children</code></td>
              <td className="px-4 py-3 text-foreground"><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle">ReactNode</code></td>
              <td className="px-4 py-3 type-body-sm text-foreground">—</td>
              <td className="px-4 py-3 type-body-sm text-foreground">DropdownItem elements within the group.</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* DropdownSeparator */}
      <h3 className="type-h3 mt-8 mb-2 text-foreground">DropdownSeparator</h3>
      <p className="type-body mb-2 text-foreground max-w-prose">
        A visual divider between items. Accepts no props.
      </p>

    </Container>
  )
}
