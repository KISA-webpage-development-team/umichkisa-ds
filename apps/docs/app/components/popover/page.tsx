import { Container, Popover, PopoverTrigger, PopoverContent, Button, Input, FormItem } from '@umichkisa-ds/web'
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
      <h1 className="type-h1 font-sejong-bold tracking-tight mb-4 text-foreground">Popover</h1>
      <p className="type-body mb-4 text-foreground max-w-prose">
        Floating panel anchored to a trigger element for displaying rich content
        like forms, menus, or additional information.
      </p>
      <p className="type-body-sm mb-8 text-muted-foreground max-w-prose">
        Use Popover for non-modal, anchored content like settings panels or detail
        previews. For modal forms or confirmations, use Dialog. For action menus, use Dropdown.
      </p>

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
      <p className="type-body mb-4 text-foreground max-w-prose">
        Root wrapper that manages open state.
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
              <td className="px-4 py-3 text-foreground"><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle">onOpenChange</code></td>
              <td className="px-4 py-3 text-foreground"><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle">(open: boolean) =&gt; void</code></td>
              <td className="px-4 py-3 type-body-sm text-foreground">—</td>
              <td className="px-4 py-3 type-body-sm text-foreground">Callback when the open state changes.</td>
            </tr>
            <tr className="border-b border-border">
              <td className="px-4 py-3 text-foreground"><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle">defaultOpen</code></td>
              <td className="px-4 py-3 text-foreground"><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle">boolean</code></td>
              <td className="px-4 py-3 text-foreground"><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle">false</code></td>
              <td className="px-4 py-3 type-body-sm text-foreground">Uncontrolled default open state.</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* PopoverTrigger */}
      <h3 className="type-h3 mt-8 mb-2 text-foreground">PopoverTrigger</h3>
      <p className="type-body mb-4 text-foreground max-w-prose">
        The element that toggles the popover.
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
              <td className="px-4 py-3 text-foreground"><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle">asChild</code></td>
              <td className="px-4 py-3 text-foreground"><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle">boolean</code></td>
              <td className="px-4 py-3 text-foreground"><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle">false</code></td>
              <td className="px-4 py-3 type-body-sm text-foreground">Merge trigger props onto the child element. Without this, PopoverTrigger renders its own button — use asChild when you already have a Button component.</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* PopoverContent */}
      <h3 className="type-h3 mt-8 mb-2 text-foreground">PopoverContent</h3>
      <p className="type-body mb-4 text-foreground max-w-prose">
        The floating panel that appears when the popover is open.
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
              <td className="px-4 py-3 text-foreground"><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle">side</code></td>
              <td className="px-4 py-3 text-foreground"><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle">&quot;top&quot; | &quot;right&quot; | &quot;bottom&quot; | &quot;left&quot;</code></td>
              <td className="px-4 py-3 text-foreground"><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle">&quot;bottom&quot;</code></td>
              <td className="px-4 py-3 type-body-sm text-foreground">Which side of the trigger the popover appears on.</td>
            </tr>
            <tr className="border-b border-border">
              <td className="px-4 py-3 text-foreground"><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle">sideOffset</code></td>
              <td className="px-4 py-3 text-foreground"><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle">number</code></td>
              <td className="px-4 py-3 text-foreground"><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle">4</code></td>
              <td className="px-4 py-3 type-body-sm text-foreground">Distance in pixels from the trigger.</td>
            </tr>
            <tr className="border-b border-border">
              <td className="px-4 py-3 text-foreground"><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle">align</code></td>
              <td className="px-4 py-3 text-foreground"><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle">&quot;start&quot; | &quot;center&quot; | &quot;end&quot;</code></td>
              <td className="px-4 py-3 text-foreground"><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle">&quot;center&quot;</code></td>
              <td className="px-4 py-3 type-body-sm text-foreground">Alignment along the trigger edge.</td>
            </tr>
            <tr className="border-b border-border">
              <td className="px-4 py-3 text-foreground"><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle">alignOffset</code></td>
              <td className="px-4 py-3 text-foreground"><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle">number</code></td>
              <td className="px-4 py-3 text-foreground"><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle">0</code></td>
              <td className="px-4 py-3 type-body-sm text-foreground">Offset in pixels from the aligned edge.</td>
            </tr>
            <tr className="border-b border-border">
              <td className="px-4 py-3 text-foreground"><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle">className</code></td>
              <td className="px-4 py-3 text-foreground"><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle">string</code></td>
              <td className="px-4 py-3 type-body-sm text-foreground">—</td>
              <td className="px-4 py-3 type-body-sm text-foreground">Merged via cn(). Use for layout utilities only.</td>
            </tr>
            <tr className="border-b border-border">
              <td className="px-4 py-3 text-foreground"><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle">children</code></td>
              <td className="px-4 py-3 text-foreground"><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle">ReactNode</code></td>
              <td className="px-4 py-3 type-body-sm text-foreground">—</td>
              <td className="px-4 py-3 type-body-sm text-foreground">Content rendered inside the popover panel.</td>
            </tr>
          </tbody>
        </table>
      </div>

    </Container>
  )
}
