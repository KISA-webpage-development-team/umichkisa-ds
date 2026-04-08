import {
  Container,
  Button,
  Dropdown,
  DropdownTrigger,
  DropdownContent,
  DropdownItem,
  DropdownGroup,
  DropdownSeparator,
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

const basicCode = `import { Dropdown, DropdownTrigger, DropdownContent, DropdownItem } from '@umichkisa-ds/web'
import { Button } from '@umichkisa-ds/web'

<Dropdown>
  <DropdownTrigger asChild>
    <Button variant="primary">Actions</Button>
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
    <Button variant="primary">Actions</Button>
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
    <Button variant="primary">Actions</Button>
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
    <Button variant="primary">Actions</Button>
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
    <Button variant="primary">Actions</Button>
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
    <Button variant="primary">Actions</Button>
  </DropdownTrigger>
  <DropdownContent align="end">
    <DropdownItem>Edit</DropdownItem>
    <DropdownItem>Duplicate</DropdownItem>
    <DropdownItem variant="destructive">Delete</DropdownItem>
  </DropdownContent>
</Dropdown>`

export default async function DropdownPage() {
  const [basicHighlighted, groupsHighlighted, separatorHighlighted, destructiveHighlighted, disabledHighlighted, positioningHighlighted] = await Promise.all([
    highlight(basicCode),
    highlight(groupsCode),
    highlight(separatorCode),
    highlight(destructiveCode),
    highlight(disabledCode),
    highlight(positioningCode),
  ]);

  return (
    <Container size="md" as="article">

      {/* -- Header -------------------------------------------------- */}
      <h1 className="type-h1 mb-4 text-foreground">Dropdown</h1>
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
          variant=&quot;primary&quot;
        </code>{' '}
        as the trigger via{' '}
        <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">
          asChild
        </code>.
      </p>
      <ComponentPreview code={basicCode} highlightedCode={basicHighlighted}>
        <Dropdown>
          <DropdownTrigger asChild>
            <Button variant="primary">Actions</Button>
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
        Use groups when items need a visible heading. Group related items with{' '}
        <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">
          DropdownGroup
        </code>{' '}
        and its{' '}
        <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">
          label
        </code>{' '}
        prop.
      </p>
      <ComponentPreview code={groupsCode} highlightedCode={groupsHighlighted}>
        <Dropdown>
          <DropdownTrigger asChild>
            <Button variant="primary">Actions</Button>
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
      <ComponentPreview code={separatorCode} highlightedCode={separatorHighlighted}>
        <Dropdown>
          <DropdownTrigger asChild>
            <Button variant="primary">Actions</Button>
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
      <ComponentPreview code={destructiveCode} highlightedCode={destructiveHighlighted}>
        <Dropdown>
          <DropdownTrigger asChild>
            <Button variant="primary">Actions</Button>
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
      <ComponentPreview code={disabledCode} highlightedCode={disabledHighlighted}>
        <Dropdown>
          <DropdownTrigger asChild>
            <Button variant="primary">Actions</Button>
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
      <ComponentPreview code={positioningCode} highlightedCode={positioningHighlighted}>
        <div className="flex justify-end">
          <Dropdown>
            <DropdownTrigger asChild>
              <Button variant="primary">Actions</Button>
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
        Each sub-component accepts the props listed below.
      </p>

      {/* Dropdown (Root) */}
      <h3 className="type-h3 mt-8 mb-2 text-foreground">Dropdown</h3>
      <p className="type-body mb-2 text-foreground max-w-prose">
        The root component that manages open/closed state. Wraps all other sub-components.
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
                <TableCell><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle">open</code></TableCell>
                <TableCell><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle">boolean</code></TableCell>
                <TableCell>—</TableCell>
                <TableCell>Controlled open state.</TableCell>
              </TableRow>
              <TableRow>
                <TableCell><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle">defaultOpen</code></TableCell>
                <TableCell><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle">boolean</code></TableCell>
                <TableCell>—</TableCell>
                <TableCell>Initial open state for uncontrolled usage.</TableCell>
              </TableRow>
              <TableRow>
                <TableCell><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle">onOpenChange</code></TableCell>
                <TableCell><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle">(open: boolean) =&gt; void</code></TableCell>
                <TableCell>—</TableCell>
                <TableCell>Callback when the open state changes.</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
        <div className="block md:hidden">
          <TableMobileList>
            <TableMobileItem>
              <span className="type-body-sm text-foreground"><strong>open</strong></span>
              <span className="type-caption text-muted-foreground"><code className="rounded px-1 py-0.5 font-mono bg-surface-subtle">boolean</code></span>
              <span className="type-caption text-muted-foreground">Controlled open state.</span>
            </TableMobileItem>
            <TableMobileItem>
              <span className="type-body-sm text-foreground"><strong>defaultOpen</strong></span>
              <span className="type-caption text-muted-foreground"><code className="rounded px-1 py-0.5 font-mono bg-surface-subtle">boolean</code></span>
              <span className="type-caption text-muted-foreground">Initial open state for uncontrolled usage.</span>
            </TableMobileItem>
            <TableMobileItem>
              <span className="type-body-sm text-foreground"><strong>onOpenChange</strong></span>
              <span className="type-caption text-muted-foreground"><code className="rounded px-1 py-0.5 font-mono bg-surface-subtle">(open: boolean) =&gt; void</code></span>
              <span className="type-caption text-muted-foreground">Callback when the open state changes.</span>
            </TableMobileItem>
          </TableMobileList>
        </div>
      </div>

      {/* DropdownTrigger */}
      <h3 className="type-h3 mt-8 mb-2 text-foreground">DropdownTrigger</h3>
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
                <TableCell><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle">asChild</code></TableCell>
                <TableCell><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle">boolean</code></TableCell>
                <TableCell><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle">false</code></TableCell>
                <TableCell>Merge trigger props onto the child element instead of rendering a default button.</TableCell>
              </TableRow>
              <TableRow>
                <TableCell><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle">children</code></TableCell>
                <TableCell><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle">ReactNode</code></TableCell>
                <TableCell>—</TableCell>
                <TableCell>The trigger element, typically a Button.</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
        <div className="block md:hidden">
          <TableMobileList>
            <TableMobileItem>
              <span className="type-body-sm text-foreground"><strong>asChild</strong></span>
              <span className="type-caption text-muted-foreground"><code className="rounded px-1 py-0.5 font-mono bg-surface-subtle">boolean</code> · default <code className="rounded px-1 py-0.5 font-mono bg-surface-subtle">false</code></span>
              <span className="type-caption text-muted-foreground">Merge trigger props onto the child element instead of rendering a default button.</span>
            </TableMobileItem>
            <TableMobileItem>
              <span className="type-body-sm text-foreground"><strong>children</strong></span>
              <span className="type-caption text-muted-foreground"><code className="rounded px-1 py-0.5 font-mono bg-surface-subtle">ReactNode</code></span>
              <span className="type-caption text-muted-foreground">The trigger element, typically a Button.</span>
            </TableMobileItem>
          </TableMobileList>
        </div>
      </div>

      {/* DropdownContent */}
      <h3 className="type-h3 mt-8 mb-2 text-foreground">DropdownContent</h3>
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
                <TableCell>DropdownItem, DropdownGroup, and DropdownSeparator elements.</TableCell>
              </TableRow>
              <TableRow>
                <TableCell><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle">side</code></TableCell>
                <TableCell><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle">&quot;top&quot; | &quot;right&quot; | &quot;bottom&quot; | &quot;left&quot;</code></TableCell>
                <TableCell><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle">&quot;bottom&quot;</code></TableCell>
                <TableCell>Which side of the trigger to render on.</TableCell>
              </TableRow>
              <TableRow>
                <TableCell><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle">align</code></TableCell>
                <TableCell><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle">&quot;start&quot; | &quot;center&quot; | &quot;end&quot;</code></TableCell>
                <TableCell><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle">&quot;start&quot;</code></TableCell>
                <TableCell>Alignment along the side axis.</TableCell>
              </TableRow>
              <TableRow>
                <TableCell><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle">sideOffset</code></TableCell>
                <TableCell><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle">number</code></TableCell>
                <TableCell><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle">4</code></TableCell>
                <TableCell>Offset in pixels from the trigger.</TableCell>
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
              <span className="type-caption text-muted-foreground">DropdownItem, DropdownGroup, and DropdownSeparator elements.</span>
            </TableMobileItem>
            <TableMobileItem>
              <span className="type-body-sm text-foreground"><strong>side</strong></span>
              <span className="type-caption text-muted-foreground"><code className="rounded px-1 py-0.5 font-mono bg-surface-subtle">&quot;top&quot; | &quot;right&quot; | &quot;bottom&quot; | &quot;left&quot;</code> · default <code className="rounded px-1 py-0.5 font-mono bg-surface-subtle">&quot;bottom&quot;</code></span>
              <span className="type-caption text-muted-foreground">Which side of the trigger to render on.</span>
            </TableMobileItem>
            <TableMobileItem>
              <span className="type-body-sm text-foreground"><strong>align</strong></span>
              <span className="type-caption text-muted-foreground"><code className="rounded px-1 py-0.5 font-mono bg-surface-subtle">&quot;start&quot; | &quot;center&quot; | &quot;end&quot;</code> · default <code className="rounded px-1 py-0.5 font-mono bg-surface-subtle">&quot;start&quot;</code></span>
              <span className="type-caption text-muted-foreground">Alignment along the side axis.</span>
            </TableMobileItem>
            <TableMobileItem>
              <span className="type-body-sm text-foreground"><strong>sideOffset</strong></span>
              <span className="type-caption text-muted-foreground"><code className="rounded px-1 py-0.5 font-mono bg-surface-subtle">number</code> · default <code className="rounded px-1 py-0.5 font-mono bg-surface-subtle">4</code></span>
              <span className="type-caption text-muted-foreground">Offset in pixels from the trigger.</span>
            </TableMobileItem>
            <TableMobileItem>
              <span className="type-body-sm text-foreground"><strong>className</strong></span>
              <span className="type-caption text-muted-foreground"><code className="rounded px-1 py-0.5 font-mono bg-surface-subtle">string</code></span>
              <span className="type-caption text-muted-foreground">Merged via cn(). Use for layout utilities only.</span>
            </TableMobileItem>
          </TableMobileList>
        </div>
      </div>

      {/* DropdownItem */}
      <h3 className="type-h3 mt-8 mb-2 text-foreground">DropdownItem</h3>
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
                <TableCell>The item label content.</TableCell>
              </TableRow>
              <TableRow>
                <TableCell><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle">onSelect</code></TableCell>
                <TableCell><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle">() =&gt; void</code></TableCell>
                <TableCell>—</TableCell>
                <TableCell>Callback when the item is selected.</TableCell>
              </TableRow>
              <TableRow>
                <TableCell><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle">variant</code></TableCell>
                <TableCell><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle">&quot;default&quot; | &quot;destructive&quot;</code></TableCell>
                <TableCell><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle">&quot;default&quot;</code></TableCell>
                <TableCell>Visual style. Use destructive for dangerous actions.</TableCell>
              </TableRow>
              <TableRow>
                <TableCell><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle">disabled</code></TableCell>
                <TableCell><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle">boolean</code></TableCell>
                <TableCell><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle">false</code></TableCell>
                <TableCell>Prevents interaction with this item.</TableCell>
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
              <span className="type-caption text-muted-foreground">The item label content.</span>
            </TableMobileItem>
            <TableMobileItem>
              <span className="type-body-sm text-foreground"><strong>onSelect</strong></span>
              <span className="type-caption text-muted-foreground"><code className="rounded px-1 py-0.5 font-mono bg-surface-subtle">() =&gt; void</code></span>
              <span className="type-caption text-muted-foreground">Callback when the item is selected.</span>
            </TableMobileItem>
            <TableMobileItem>
              <span className="type-body-sm text-foreground"><strong>variant</strong></span>
              <span className="type-caption text-muted-foreground"><code className="rounded px-1 py-0.5 font-mono bg-surface-subtle">&quot;default&quot; | &quot;destructive&quot;</code> · default <code className="rounded px-1 py-0.5 font-mono bg-surface-subtle">&quot;default&quot;</code></span>
              <span className="type-caption text-muted-foreground">Visual style. Use destructive for dangerous actions.</span>
            </TableMobileItem>
            <TableMobileItem>
              <span className="type-body-sm text-foreground"><strong>disabled</strong></span>
              <span className="type-caption text-muted-foreground"><code className="rounded px-1 py-0.5 font-mono bg-surface-subtle">boolean</code> · default <code className="rounded px-1 py-0.5 font-mono bg-surface-subtle">false</code></span>
              <span className="type-caption text-muted-foreground">Prevents interaction with this item.</span>
            </TableMobileItem>
            <TableMobileItem>
              <span className="type-body-sm text-foreground"><strong>className</strong></span>
              <span className="type-caption text-muted-foreground"><code className="rounded px-1 py-0.5 font-mono bg-surface-subtle">string</code></span>
              <span className="type-caption text-muted-foreground">Merged via cn(). Use for layout utilities only.</span>
            </TableMobileItem>
          </TableMobileList>
        </div>
      </div>

      {/* DropdownGroup */}
      <h3 className="type-h3 mt-8 mb-2 text-foreground">DropdownGroup</h3>
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
                <TableCell>DropdownItem elements within the group.</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
        <div className="block md:hidden">
          <TableMobileList>
            <TableMobileItem>
              <span className="type-body-sm text-foreground"><strong>label</strong></span>
              <span className="type-caption text-muted-foreground"><code className="rounded px-1 py-0.5 font-mono bg-surface-subtle">string</code> · required</span>
              <span className="type-caption text-muted-foreground">Group heading text.</span>
            </TableMobileItem>
            <TableMobileItem>
              <span className="type-body-sm text-foreground"><strong>children</strong></span>
              <span className="type-caption text-muted-foreground"><code className="rounded px-1 py-0.5 font-mono bg-surface-subtle">ReactNode</code></span>
              <span className="type-caption text-muted-foreground">DropdownItem elements within the group.</span>
            </TableMobileItem>
          </TableMobileList>
        </div>
      </div>

      {/* DropdownSeparator */}
      <h3 className="type-h3 mt-8 mb-2 text-foreground">DropdownSeparator</h3>
      <p className="type-body mb-2 text-foreground max-w-prose">
        A visual divider between items. Accepts no props.
      </p>

    </Container>
  )
}
