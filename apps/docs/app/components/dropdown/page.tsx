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
import { Heading } from '@/components/Heading'
import { InlineCode } from '@/components/InlineCode'
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
      <Heading as="h2">Examples</Heading>

      {/* Basic */}
      <Heading as="h3" className="mt-6">Basic</Heading>
      <p className="type-body mb-2 text-foreground max-w-prose">
        A simple dropdown with three items. Use a{' '}
        <InlineCode>
          Button
        </InlineCode>{' '}
        with{' '}
        <InlineCode>
          variant=&quot;primary&quot;
        </InlineCode>{' '}
        as the trigger via{' '}
        <InlineCode>
          asChild
        </InlineCode>.
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
      <Heading as="h3">With groups</Heading>
      <p className="type-body mb-2 text-foreground max-w-prose">
        Use groups when items need a visible heading. Group related items with{' '}
        <InlineCode>
          DropdownGroup
        </InlineCode>{' '}
        and its{' '}
        <InlineCode>
          label
        </InlineCode>{' '}
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
      <Heading as="h3">With separator</Heading>
      <p className="type-body mb-2 text-foreground max-w-prose">
        Use{' '}
        <InlineCode>
          DropdownSeparator
        </InlineCode>{' '}
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
      <Heading as="h3">Destructive item</Heading>
      <p className="type-body mb-2 text-foreground max-w-prose">
        Apply{' '}
        <InlineCode>
          variant=&quot;destructive&quot;
        </InlineCode>{' '}
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
      <Heading as="h3">Disabled items</Heading>
      <p className="type-body mb-2 text-foreground max-w-prose">
        Use the{' '}
        <InlineCode>
          disabled
        </InlineCode>{' '}
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
      <Heading as="h3">Positioning</Heading>
      <p className="type-body mb-2 text-foreground max-w-prose">
        Use{' '}
        <InlineCode>
          align
        </InlineCode>,{' '}
        <InlineCode>
          side
        </InlineCode>, and{' '}
        <InlineCode>
          sideOffset
        </InlineCode>{' '}
        on{' '}
        <InlineCode>
          DropdownContent
        </InlineCode>{' '}
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
      <Heading as="h2">API Reference</Heading>
      <p className="type-body mb-4 text-foreground max-w-prose">
        Each sub-component accepts the props listed below.
      </p>

      {/* Dropdown (Root) */}
      <Heading as="h3">Dropdown</Heading>
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
                <TableCell><InlineCode>open</InlineCode></TableCell>
                <TableCell><InlineCode>boolean</InlineCode></TableCell>
                <TableCell>—</TableCell>
                <TableCell>Controlled open state.</TableCell>
              </TableRow>
              <TableRow>
                <TableCell><InlineCode>defaultOpen</InlineCode></TableCell>
                <TableCell><InlineCode>boolean</InlineCode></TableCell>
                <TableCell>—</TableCell>
                <TableCell>Initial open state for uncontrolled usage.</TableCell>
              </TableRow>
              <TableRow>
                <TableCell><InlineCode>onOpenChange</InlineCode></TableCell>
                <TableCell><InlineCode>(open: boolean) =&gt; void</InlineCode></TableCell>
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
              <span className="type-caption text-muted-foreground"><InlineCode>boolean</InlineCode></span>
              <span className="type-caption text-muted-foreground">Controlled open state.</span>
            </TableMobileItem>
            <TableMobileItem>
              <span className="type-body-sm text-foreground"><strong>defaultOpen</strong></span>
              <span className="type-caption text-muted-foreground"><InlineCode>boolean</InlineCode></span>
              <span className="type-caption text-muted-foreground">Initial open state for uncontrolled usage.</span>
            </TableMobileItem>
            <TableMobileItem>
              <span className="type-body-sm text-foreground"><strong>onOpenChange</strong></span>
              <span className="type-caption text-muted-foreground"><InlineCode>(open: boolean) =&gt; void</InlineCode></span>
              <span className="type-caption text-muted-foreground">Callback when the open state changes.</span>
            </TableMobileItem>
          </TableMobileList>
        </div>
      </div>

      {/* DropdownTrigger */}
      <Heading as="h3">DropdownTrigger</Heading>
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
                <TableCell><InlineCode>asChild</InlineCode></TableCell>
                <TableCell><InlineCode>boolean</InlineCode></TableCell>
                <TableCell><InlineCode>false</InlineCode></TableCell>
                <TableCell>Merge trigger props onto the child element instead of rendering a default button.</TableCell>
              </TableRow>
              <TableRow>
                <TableCell><InlineCode>children</InlineCode></TableCell>
                <TableCell><InlineCode>ReactNode</InlineCode></TableCell>
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
              <span className="type-caption text-muted-foreground"><InlineCode>boolean</InlineCode> · default <InlineCode>false</InlineCode></span>
              <span className="type-caption text-muted-foreground">Merge trigger props onto the child element instead of rendering a default button.</span>
            </TableMobileItem>
            <TableMobileItem>
              <span className="type-body-sm text-foreground"><strong>children</strong></span>
              <span className="type-caption text-muted-foreground"><InlineCode>ReactNode</InlineCode></span>
              <span className="type-caption text-muted-foreground">The trigger element, typically a Button.</span>
            </TableMobileItem>
          </TableMobileList>
        </div>
      </div>

      {/* DropdownContent */}
      <Heading as="h3">DropdownContent</Heading>
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
                <TableCell>DropdownItem, DropdownGroup, and DropdownSeparator elements.</TableCell>
              </TableRow>
              <TableRow>
                <TableCell><InlineCode>side</InlineCode></TableCell>
                <TableCell><InlineCode>&quot;top&quot; | &quot;right&quot; | &quot;bottom&quot; | &quot;left&quot;</InlineCode></TableCell>
                <TableCell><InlineCode>&quot;bottom&quot;</InlineCode></TableCell>
                <TableCell>Which side of the trigger to render on.</TableCell>
              </TableRow>
              <TableRow>
                <TableCell><InlineCode>align</InlineCode></TableCell>
                <TableCell><InlineCode>&quot;start&quot; | &quot;center&quot; | &quot;end&quot;</InlineCode></TableCell>
                <TableCell><InlineCode>&quot;start&quot;</InlineCode></TableCell>
                <TableCell>Alignment along the side axis.</TableCell>
              </TableRow>
              <TableRow>
                <TableCell><InlineCode>sideOffset</InlineCode></TableCell>
                <TableCell><InlineCode>number</InlineCode></TableCell>
                <TableCell><InlineCode>4</InlineCode></TableCell>
                <TableCell>Offset in pixels from the trigger.</TableCell>
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
              <span className="type-caption text-muted-foreground">DropdownItem, DropdownGroup, and DropdownSeparator elements.</span>
            </TableMobileItem>
            <TableMobileItem>
              <span className="type-body-sm text-foreground"><strong>side</strong></span>
              <span className="type-caption text-muted-foreground"><InlineCode>&quot;top&quot; | &quot;right&quot; | &quot;bottom&quot; | &quot;left&quot;</InlineCode> · default <InlineCode>&quot;bottom&quot;</InlineCode></span>
              <span className="type-caption text-muted-foreground">Which side of the trigger to render on.</span>
            </TableMobileItem>
            <TableMobileItem>
              <span className="type-body-sm text-foreground"><strong>align</strong></span>
              <span className="type-caption text-muted-foreground"><InlineCode>&quot;start&quot; | &quot;center&quot; | &quot;end&quot;</InlineCode> · default <InlineCode>&quot;start&quot;</InlineCode></span>
              <span className="type-caption text-muted-foreground">Alignment along the side axis.</span>
            </TableMobileItem>
            <TableMobileItem>
              <span className="type-body-sm text-foreground"><strong>sideOffset</strong></span>
              <span className="type-caption text-muted-foreground"><InlineCode>number</InlineCode> · default <InlineCode>4</InlineCode></span>
              <span className="type-caption text-muted-foreground">Offset in pixels from the trigger.</span>
            </TableMobileItem>
            <TableMobileItem>
              <span className="type-body-sm text-foreground"><strong>className</strong></span>
              <span className="type-caption text-muted-foreground"><InlineCode>string</InlineCode></span>
              <span className="type-caption text-muted-foreground">Merged via cn(). Use for layout utilities only.</span>
            </TableMobileItem>
          </TableMobileList>
        </div>
      </div>

      {/* DropdownItem */}
      <Heading as="h3">DropdownItem</Heading>
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
                <TableCell>The item label content.</TableCell>
              </TableRow>
              <TableRow>
                <TableCell><InlineCode>onSelect</InlineCode></TableCell>
                <TableCell><InlineCode>() =&gt; void</InlineCode></TableCell>
                <TableCell>—</TableCell>
                <TableCell>Callback when the item is selected.</TableCell>
              </TableRow>
              <TableRow>
                <TableCell><InlineCode>variant</InlineCode></TableCell>
                <TableCell><InlineCode>&quot;default&quot; | &quot;destructive&quot;</InlineCode></TableCell>
                <TableCell><InlineCode>&quot;default&quot;</InlineCode></TableCell>
                <TableCell>Visual style. Use destructive for dangerous actions.</TableCell>
              </TableRow>
              <TableRow>
                <TableCell><InlineCode>disabled</InlineCode></TableCell>
                <TableCell><InlineCode>boolean</InlineCode></TableCell>
                <TableCell><InlineCode>false</InlineCode></TableCell>
                <TableCell>Prevents interaction with this item.</TableCell>
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
              <span className="type-caption text-muted-foreground">The item label content.</span>
            </TableMobileItem>
            <TableMobileItem>
              <span className="type-body-sm text-foreground"><strong>onSelect</strong></span>
              <span className="type-caption text-muted-foreground"><InlineCode>() =&gt; void</InlineCode></span>
              <span className="type-caption text-muted-foreground">Callback when the item is selected.</span>
            </TableMobileItem>
            <TableMobileItem>
              <span className="type-body-sm text-foreground"><strong>variant</strong></span>
              <span className="type-caption text-muted-foreground"><InlineCode>&quot;default&quot; | &quot;destructive&quot;</InlineCode> · default <InlineCode>&quot;default&quot;</InlineCode></span>
              <span className="type-caption text-muted-foreground">Visual style. Use destructive for dangerous actions.</span>
            </TableMobileItem>
            <TableMobileItem>
              <span className="type-body-sm text-foreground"><strong>disabled</strong></span>
              <span className="type-caption text-muted-foreground"><InlineCode>boolean</InlineCode> · default <InlineCode>false</InlineCode></span>
              <span className="type-caption text-muted-foreground">Prevents interaction with this item.</span>
            </TableMobileItem>
            <TableMobileItem>
              <span className="type-body-sm text-foreground"><strong>className</strong></span>
              <span className="type-caption text-muted-foreground"><InlineCode>string</InlineCode></span>
              <span className="type-caption text-muted-foreground">Merged via cn(). Use for layout utilities only.</span>
            </TableMobileItem>
          </TableMobileList>
        </div>
      </div>

      {/* DropdownGroup */}
      <Heading as="h3">DropdownGroup</Heading>
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
                <TableCell><InlineCode>label</InlineCode></TableCell>
                <TableCell><InlineCode>string</InlineCode></TableCell>
                <TableCell><InlineCode>(required)</InlineCode></TableCell>
                <TableCell>Group heading text.</TableCell>
              </TableRow>
              <TableRow>
                <TableCell><InlineCode>children</InlineCode></TableCell>
                <TableCell><InlineCode>ReactNode</InlineCode></TableCell>
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
              <span className="type-caption text-muted-foreground"><InlineCode>string</InlineCode> · required</span>
              <span className="type-caption text-muted-foreground">Group heading text.</span>
            </TableMobileItem>
            <TableMobileItem>
              <span className="type-body-sm text-foreground"><strong>children</strong></span>
              <span className="type-caption text-muted-foreground"><InlineCode>ReactNode</InlineCode></span>
              <span className="type-caption text-muted-foreground">DropdownItem elements within the group.</span>
            </TableMobileItem>
          </TableMobileList>
        </div>
      </div>

      {/* DropdownSeparator */}
      <Heading as="h3">DropdownSeparator</Heading>
      <p className="type-body mb-2 text-foreground max-w-prose">
        A visual divider between items. Accepts no props.
      </p>

    </Container>
  )
}
