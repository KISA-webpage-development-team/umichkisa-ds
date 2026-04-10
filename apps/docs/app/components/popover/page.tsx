import {
  Container,
  Alert,
  Popover,
  PopoverTrigger,
  PopoverContent,
  Button,
  Input,
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

const basicCode = `import { Popover, PopoverTrigger, PopoverContent, Button } from '@umichkisa-ds/web'

<Popover>
  <PopoverTrigger asChild>
    <Button variant="primary">Open popover</Button>
  </PopoverTrigger>
  <PopoverContent>
    <p className="type-body-sm text-foreground">This is the popover content.</p>
  </PopoverContent>
</Popover>`

const formCode = `import { Popover, PopoverTrigger, PopoverContent, Button, Input, FormItem } from '@umichkisa-ds/web'

<Popover>
  <PopoverTrigger asChild>
    <Button variant="primary">Update name</Button>
  </PopoverTrigger>
  <PopoverContent>
    <div className="flex flex-col gap-4">
      <FormItem htmlFor="name" label="Name">
        <Input id="name" placeholder="Enter your name" />
      </FormItem>
      <Button size="sm">Submit</Button>
    </div>
  </PopoverContent>
</Popover>`

const placementCode = `import { Popover, PopoverTrigger, PopoverContent, Button } from '@umichkisa-ds/web'

<Popover>
  <PopoverTrigger asChild>
    <Button variant="primary">Bottom</Button>
  </PopoverTrigger>
  <PopoverContent side="bottom">
    <p className="type-body-sm text-foreground">Bottom content</p>
  </PopoverContent>
</Popover>

<Popover>
  <PopoverTrigger asChild>
    <Button variant="primary">Top</Button>
  </PopoverTrigger>
  <PopoverContent side="top">
    <p className="type-body-sm text-foreground">Top content</p>
  </PopoverContent>
</Popover>

<Popover>
  <PopoverTrigger asChild>
    <Button variant="primary">Left</Button>
  </PopoverTrigger>
  <PopoverContent side="left">
    <p className="type-body-sm text-foreground">Left content</p>
  </PopoverContent>
</Popover>

<Popover>
  <PopoverTrigger asChild>
    <Button variant="primary">Right</Button>
  </PopoverTrigger>
  <PopoverContent side="right">
    <p className="type-body-sm text-foreground">Right content</p>
  </PopoverContent>
</Popover>`

export default async function PopoverPage() {
  const [
    basicHighlighted,
    formHighlighted,
    placementHighlighted,
  ] = await Promise.all([
    highlight(basicCode),
    highlight(formCode),
    highlight(placementCode),
  ])

  return (
    <Container size="md" as="article">

      {/* ── Header ──────────────────────────────────────────── */}
      <h1 className="type-h1 mb-4 text-foreground">Popover</h1>
      <p className="type-body mb-4 text-foreground max-w-prose">
        Floating panel anchored to a trigger element for displaying rich content
        like forms, menus, or additional information.
      </p>
      <Alert variant="info" className="mb-8">
        Use Popover for non-modal, anchored content like settings panels or detail
        previews. For modal forms or confirmations, use Dialog. For action menus, use Dropdown.
      </Alert>

      {/* ── Examples ────────────────────────────────────────── */}
      <Heading as="h2">Examples</Heading>

      {/* Basic */}
      <Heading as="h3" className="mt-6">Basic</Heading>
      <p className="type-body mb-2 text-foreground max-w-prose">
        A trigger button that opens a popover with simple text content.
      </p>
      <ComponentPreview code={basicCode} highlightedCode={basicHighlighted}>
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="primary">Open popover</Button>
          </PopoverTrigger>
          <PopoverContent>
            <p className="type-body-sm text-foreground">This is the popover content.</p>
          </PopoverContent>
        </Popover>
      </ComponentPreview>

      {/* With form content */}
      <Heading as="h3">With form content</Heading>
      <p className="type-body mb-2 text-foreground max-w-prose">
        Popovers can contain rich content such as forms with labels, inputs, and buttons.
      </p>
      <ComponentPreview code={formCode} highlightedCode={formHighlighted}>
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="primary">Update name</Button>
          </PopoverTrigger>
          <PopoverContent>
            <div className="flex flex-col gap-4">
              <FormItem htmlFor="name" label="Name">
                <Input id="name" placeholder="Enter your name" />
              </FormItem>
              <Button size="sm">Submit</Button>
            </div>
          </PopoverContent>
        </Popover>
      </ComponentPreview>

      {/* Placement */}
      <Heading as="h3">Placement</Heading>
      <p className="type-body mb-2 text-foreground max-w-prose">
        Use the{' '}
        <InlineCode>
          side
        </InlineCode>{' '}
        prop on{' '}
        <InlineCode>
          PopoverContent
        </InlineCode>{' '}
        to control which side the popover appears on.
      </p>
      <ComponentPreview code={placementCode} highlightedCode={placementHighlighted}>
        <div className="flex items-center gap-4 flex-wrap">
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="primary">Bottom</Button>
            </PopoverTrigger>
            <PopoverContent side="bottom">
              <p className="type-body-sm text-foreground">Bottom content</p>
            </PopoverContent>
          </Popover>
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="primary">Top</Button>
            </PopoverTrigger>
            <PopoverContent side="top">
              <p className="type-body-sm text-foreground">Top content</p>
            </PopoverContent>
          </Popover>
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="primary">Left</Button>
            </PopoverTrigger>
            <PopoverContent side="left">
              <p className="type-body-sm text-foreground">Left content</p>
            </PopoverContent>
          </Popover>
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="primary">Right</Button>
            </PopoverTrigger>
            <PopoverContent side="right">
              <p className="type-body-sm text-foreground">Right content</p>
            </PopoverContent>
          </Popover>
        </div>
      </ComponentPreview>

      {/* ── API Reference ────────────────────────────────────── */}
      <Heading as="h2">API Reference</Heading>

      {/* Popover (Root) */}
      <Heading as="h3" className="mt-6">Popover</Heading>
      <p className="type-body mb-2 text-foreground max-w-prose">
        Root wrapper that manages open state.
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
                <TableCell><InlineCode>onOpenChange</InlineCode></TableCell>
                <TableCell><InlineCode>(open: boolean) =&gt; void</InlineCode></TableCell>
                <TableCell>—</TableCell>
                <TableCell>Callback when the open state changes.</TableCell>
              </TableRow>
              <TableRow>
                <TableCell><InlineCode>defaultOpen</InlineCode></TableCell>
                <TableCell><InlineCode>boolean</InlineCode></TableCell>
                <TableCell><InlineCode>false</InlineCode></TableCell>
                <TableCell>Uncontrolled default open state.</TableCell>
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
              <span className="type-body-sm text-foreground"><strong>onOpenChange</strong></span>
              <span className="type-caption text-muted-foreground"><InlineCode>(open: boolean) =&gt; void</InlineCode></span>
              <span className="type-caption text-muted-foreground">Callback when the open state changes.</span>
            </TableMobileItem>
            <TableMobileItem>
              <span className="type-body-sm text-foreground"><strong>defaultOpen</strong></span>
              <span className="type-caption text-muted-foreground"><InlineCode>boolean</InlineCode> · default <InlineCode>false</InlineCode></span>
              <span className="type-caption text-muted-foreground">Uncontrolled default open state.</span>
            </TableMobileItem>
          </TableMobileList>
        </div>
      </div>

      {/* PopoverTrigger */}
      <Heading as="h3">PopoverTrigger</Heading>
      <p className="type-body mb-2 text-foreground max-w-prose">
        The element that toggles the popover.
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
                <TableCell><InlineCode>asChild</InlineCode></TableCell>
                <TableCell><InlineCode>boolean</InlineCode></TableCell>
                <TableCell><InlineCode>false</InlineCode></TableCell>
                <TableCell>Merge trigger props onto the child element. Without this, PopoverTrigger renders its own button — use asChild when you already have a Button component.</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
        <div className="block md:hidden">
          <TableMobileList>
            <TableMobileItem>
              <span className="type-body-sm text-foreground"><strong>asChild</strong></span>
              <span className="type-caption text-muted-foreground"><InlineCode>boolean</InlineCode> · default <InlineCode>false</InlineCode></span>
              <span className="type-caption text-muted-foreground">Merge trigger props onto the child element. Without this, PopoverTrigger renders its own button — use asChild when you already have a Button component.</span>
            </TableMobileItem>
          </TableMobileList>
        </div>
      </div>

      {/* PopoverContent */}
      <Heading as="h3">PopoverContent</Heading>
      <p className="type-body mb-2 text-foreground max-w-prose">
        The floating panel that appears when the popover is open.
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
                <TableCell><InlineCode>side</InlineCode></TableCell>
                <TableCell><InlineCode>&quot;top&quot; | &quot;right&quot; | &quot;bottom&quot; | &quot;left&quot;</InlineCode></TableCell>
                <TableCell><InlineCode>&quot;bottom&quot;</InlineCode></TableCell>
                <TableCell>Which side of the trigger the popover appears on.</TableCell>
              </TableRow>
              <TableRow>
                <TableCell><InlineCode>sideOffset</InlineCode></TableCell>
                <TableCell><InlineCode>number</InlineCode></TableCell>
                <TableCell><InlineCode>4</InlineCode></TableCell>
                <TableCell>Distance in pixels from the trigger.</TableCell>
              </TableRow>
              <TableRow>
                <TableCell><InlineCode>align</InlineCode></TableCell>
                <TableCell><InlineCode>&quot;start&quot; | &quot;center&quot; | &quot;end&quot;</InlineCode></TableCell>
                <TableCell><InlineCode>&quot;center&quot;</InlineCode></TableCell>
                <TableCell>Alignment along the trigger edge.</TableCell>
              </TableRow>
              <TableRow>
                <TableCell><InlineCode>alignOffset</InlineCode></TableCell>
                <TableCell><InlineCode>number</InlineCode></TableCell>
                <TableCell><InlineCode>0</InlineCode></TableCell>
                <TableCell>Offset in pixels from the aligned edge.</TableCell>
              </TableRow>
              <TableRow>
                <TableCell><InlineCode>className</InlineCode></TableCell>
                <TableCell><InlineCode>string</InlineCode></TableCell>
                <TableCell>—</TableCell>
                <TableCell>Merged via cn(). Use for layout utilities only.</TableCell>
              </TableRow>
              <TableRow>
                <TableCell><InlineCode>children</InlineCode></TableCell>
                <TableCell><InlineCode>ReactNode</InlineCode></TableCell>
                <TableCell>—</TableCell>
                <TableCell>Content rendered inside the popover panel.</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
        <div className="block md:hidden">
          <TableMobileList>
            <TableMobileItem>
              <span className="type-body-sm text-foreground"><strong>side</strong></span>
              <span className="type-caption text-muted-foreground"><InlineCode>&quot;top&quot; | &quot;right&quot; | &quot;bottom&quot; | &quot;left&quot;</InlineCode> · default <InlineCode>&quot;bottom&quot;</InlineCode></span>
              <span className="type-caption text-muted-foreground">Which side of the trigger the popover appears on.</span>
            </TableMobileItem>
            <TableMobileItem>
              <span className="type-body-sm text-foreground"><strong>sideOffset</strong></span>
              <span className="type-caption text-muted-foreground"><InlineCode>number</InlineCode> · default <InlineCode>4</InlineCode></span>
              <span className="type-caption text-muted-foreground">Distance in pixels from the trigger.</span>
            </TableMobileItem>
            <TableMobileItem>
              <span className="type-body-sm text-foreground"><strong>align</strong></span>
              <span className="type-caption text-muted-foreground"><InlineCode>&quot;start&quot; | &quot;center&quot; | &quot;end&quot;</InlineCode> · default <InlineCode>&quot;center&quot;</InlineCode></span>
              <span className="type-caption text-muted-foreground">Alignment along the trigger edge.</span>
            </TableMobileItem>
            <TableMobileItem>
              <span className="type-body-sm text-foreground"><strong>alignOffset</strong></span>
              <span className="type-caption text-muted-foreground"><InlineCode>number</InlineCode> · default <InlineCode>0</InlineCode></span>
              <span className="type-caption text-muted-foreground">Offset in pixels from the aligned edge.</span>
            </TableMobileItem>
            <TableMobileItem>
              <span className="type-body-sm text-foreground"><strong>className</strong></span>
              <span className="type-caption text-muted-foreground"><InlineCode>string</InlineCode></span>
              <span className="type-caption text-muted-foreground">Merged via cn(). Use for layout utilities only.</span>
            </TableMobileItem>
            <TableMobileItem>
              <span className="type-body-sm text-foreground"><strong>children</strong></span>
              <span className="type-caption text-muted-foreground"><InlineCode>ReactNode</InlineCode></span>
              <span className="type-caption text-muted-foreground">Content rendered inside the popover panel.</span>
            </TableMobileItem>
          </TableMobileList>
        </div>
      </div>

    </Container>
  )
}
