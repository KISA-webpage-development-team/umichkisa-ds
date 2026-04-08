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
      <h2 className="type-h2 mt-8 mb-4 text-foreground">Examples</h2>

      {/* Basic */}
      <h3 className="type-h3 mt-6 mb-2 text-foreground">Basic</h3>
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
      <h3 className="type-h3 mt-8 mb-2 text-foreground">With form content</h3>
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
      <h3 className="type-h3 mt-8 mb-2 text-foreground">Placement</h3>
      <p className="type-body mb-2 text-foreground max-w-prose">
        Use the{' '}
        <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">
          side
        </code>{' '}
        prop on{' '}
        <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">
          PopoverContent
        </code>{' '}
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
      <h2 className="type-h2 mt-8 mb-4 text-foreground">API Reference</h2>

      {/* Popover (Root) */}
      <h3 className="type-h3 mt-6 mb-2 text-foreground">Popover</h3>
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
                <TableCell><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle">open</code></TableCell>
                <TableCell><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle">boolean</code></TableCell>
                <TableCell>—</TableCell>
                <TableCell>Controlled open state.</TableCell>
              </TableRow>
              <TableRow>
                <TableCell><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle">onOpenChange</code></TableCell>
                <TableCell><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle">(open: boolean) =&gt; void</code></TableCell>
                <TableCell>—</TableCell>
                <TableCell>Callback when the open state changes.</TableCell>
              </TableRow>
              <TableRow>
                <TableCell><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle">defaultOpen</code></TableCell>
                <TableCell><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle">boolean</code></TableCell>
                <TableCell><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle">false</code></TableCell>
                <TableCell>Uncontrolled default open state.</TableCell>
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
              <span className="type-body-sm text-foreground"><strong>onOpenChange</strong></span>
              <span className="type-caption text-muted-foreground"><code className="rounded px-1 py-0.5 font-mono bg-surface-subtle">(open: boolean) =&gt; void</code></span>
              <span className="type-caption text-muted-foreground">Callback when the open state changes.</span>
            </TableMobileItem>
            <TableMobileItem>
              <span className="type-body-sm text-foreground"><strong>defaultOpen</strong></span>
              <span className="type-caption text-muted-foreground"><code className="rounded px-1 py-0.5 font-mono bg-surface-subtle">boolean</code> · default <code className="rounded px-1 py-0.5 font-mono bg-surface-subtle">false</code></span>
              <span className="type-caption text-muted-foreground">Uncontrolled default open state.</span>
            </TableMobileItem>
          </TableMobileList>
        </div>
      </div>

      {/* PopoverTrigger */}
      <h3 className="type-h3 mt-8 mb-2 text-foreground">PopoverTrigger</h3>
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
                <TableCell><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle">asChild</code></TableCell>
                <TableCell><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle">boolean</code></TableCell>
                <TableCell><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle">false</code></TableCell>
                <TableCell>Merge trigger props onto the child element. Without this, PopoverTrigger renders its own button — use asChild when you already have a Button component.</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
        <div className="block md:hidden">
          <TableMobileList>
            <TableMobileItem>
              <span className="type-body-sm text-foreground"><strong>asChild</strong></span>
              <span className="type-caption text-muted-foreground"><code className="rounded px-1 py-0.5 font-mono bg-surface-subtle">boolean</code> · default <code className="rounded px-1 py-0.5 font-mono bg-surface-subtle">false</code></span>
              <span className="type-caption text-muted-foreground">Merge trigger props onto the child element. Without this, PopoverTrigger renders its own button — use asChild when you already have a Button component.</span>
            </TableMobileItem>
          </TableMobileList>
        </div>
      </div>

      {/* PopoverContent */}
      <h3 className="type-h3 mt-8 mb-2 text-foreground">PopoverContent</h3>
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
                <TableCell><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle">side</code></TableCell>
                <TableCell><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle">&quot;top&quot; | &quot;right&quot; | &quot;bottom&quot; | &quot;left&quot;</code></TableCell>
                <TableCell><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle">&quot;bottom&quot;</code></TableCell>
                <TableCell>Which side of the trigger the popover appears on.</TableCell>
              </TableRow>
              <TableRow>
                <TableCell><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle">sideOffset</code></TableCell>
                <TableCell><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle">number</code></TableCell>
                <TableCell><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle">4</code></TableCell>
                <TableCell>Distance in pixels from the trigger.</TableCell>
              </TableRow>
              <TableRow>
                <TableCell><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle">align</code></TableCell>
                <TableCell><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle">&quot;start&quot; | &quot;center&quot; | &quot;end&quot;</code></TableCell>
                <TableCell><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle">&quot;center&quot;</code></TableCell>
                <TableCell>Alignment along the trigger edge.</TableCell>
              </TableRow>
              <TableRow>
                <TableCell><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle">alignOffset</code></TableCell>
                <TableCell><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle">number</code></TableCell>
                <TableCell><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle">0</code></TableCell>
                <TableCell>Offset in pixels from the aligned edge.</TableCell>
              </TableRow>
              <TableRow>
                <TableCell><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle">className</code></TableCell>
                <TableCell><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle">string</code></TableCell>
                <TableCell>—</TableCell>
                <TableCell>Merged via cn(). Use for layout utilities only.</TableCell>
              </TableRow>
              <TableRow>
                <TableCell><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle">children</code></TableCell>
                <TableCell><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle">ReactNode</code></TableCell>
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
              <span className="type-caption text-muted-foreground"><code className="rounded px-1 py-0.5 font-mono bg-surface-subtle">&quot;top&quot; | &quot;right&quot; | &quot;bottom&quot; | &quot;left&quot;</code> · default <code className="rounded px-1 py-0.5 font-mono bg-surface-subtle">&quot;bottom&quot;</code></span>
              <span className="type-caption text-muted-foreground">Which side of the trigger the popover appears on.</span>
            </TableMobileItem>
            <TableMobileItem>
              <span className="type-body-sm text-foreground"><strong>sideOffset</strong></span>
              <span className="type-caption text-muted-foreground"><code className="rounded px-1 py-0.5 font-mono bg-surface-subtle">number</code> · default <code className="rounded px-1 py-0.5 font-mono bg-surface-subtle">4</code></span>
              <span className="type-caption text-muted-foreground">Distance in pixels from the trigger.</span>
            </TableMobileItem>
            <TableMobileItem>
              <span className="type-body-sm text-foreground"><strong>align</strong></span>
              <span className="type-caption text-muted-foreground"><code className="rounded px-1 py-0.5 font-mono bg-surface-subtle">&quot;start&quot; | &quot;center&quot; | &quot;end&quot;</code> · default <code className="rounded px-1 py-0.5 font-mono bg-surface-subtle">&quot;center&quot;</code></span>
              <span className="type-caption text-muted-foreground">Alignment along the trigger edge.</span>
            </TableMobileItem>
            <TableMobileItem>
              <span className="type-body-sm text-foreground"><strong>alignOffset</strong></span>
              <span className="type-caption text-muted-foreground"><code className="rounded px-1 py-0.5 font-mono bg-surface-subtle">number</code> · default <code className="rounded px-1 py-0.5 font-mono bg-surface-subtle">0</code></span>
              <span className="type-caption text-muted-foreground">Offset in pixels from the aligned edge.</span>
            </TableMobileItem>
            <TableMobileItem>
              <span className="type-body-sm text-foreground"><strong>className</strong></span>
              <span className="type-caption text-muted-foreground"><code className="rounded px-1 py-0.5 font-mono bg-surface-subtle">string</code></span>
              <span className="type-caption text-muted-foreground">Merged via cn(). Use for layout utilities only.</span>
            </TableMobileItem>
            <TableMobileItem>
              <span className="type-body-sm text-foreground"><strong>children</strong></span>
              <span className="type-caption text-muted-foreground"><code className="rounded px-1 py-0.5 font-mono bg-surface-subtle">ReactNode</code></span>
              <span className="type-caption text-muted-foreground">Content rendered inside the popover panel.</span>
            </TableMobileItem>
          </TableMobileList>
        </div>
      </div>

    </Container>
  )
}
