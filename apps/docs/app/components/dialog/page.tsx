import { Alert, Container, Dialog, DialogTrigger, DialogClose, DialogContent, DialogTitle, DialogDescription, DialogFooter, Button, Table, TableBody, TableCell, TableHead, TableHeader, TableMobileItem, TableMobileList, TableRow } from '@umichkisa-ds/web'
import { ComponentPreview } from '@/components/ComponentPreview'
import { highlight } from '@/lib/highlight'

const basicCode = `import { Dialog, DialogTrigger, DialogContent, DialogTitle, DialogDescription, DialogClose, Button } from '@umichkisa-ds/web'

<Dialog>
  <DialogTrigger asChild>
    <Button variant="primary">Open dialog</Button>
  </DialogTrigger>
  <DialogContent>
    <DialogTitle>Basic dialog</DialogTitle>
    <DialogDescription>This is a simple dialog with a title, description, and close button.</DialogDescription>
  </DialogContent>
</Dialog>`

const sizesCode = `import { Dialog, DialogTrigger, DialogContent, DialogTitle, DialogDescription, Button } from '@umichkisa-ds/web'

<Dialog>
  <DialogTrigger asChild>
    <Button variant="primary">Small</Button>
  </DialogTrigger>
  <DialogContent size="sm">
    <DialogTitle>Small dialog</DialogTitle>
    <DialogDescription>This dialog uses the sm size.</DialogDescription>
  </DialogContent>
</Dialog>

<Dialog>
  <DialogTrigger asChild>
    <Button variant="primary">Medium</Button>
  </DialogTrigger>
  <DialogContent size="md">
    <DialogTitle>Medium dialog</DialogTitle>
    <DialogDescription>This dialog uses the md size (default).</DialogDescription>
  </DialogContent>
</Dialog>

<Dialog>
  <DialogTrigger asChild>
    <Button variant="primary">Large</Button>
  </DialogTrigger>
  <DialogContent size="lg">
    <DialogTitle>Large dialog</DialogTitle>
    <DialogDescription>This dialog uses the lg size.</DialogDescription>
  </DialogContent>
</Dialog>

<Dialog>
  <DialogTrigger asChild>
    <Button variant="primary">Full</Button>
  </DialogTrigger>
  <DialogContent size="full">
    <DialogTitle>Full dialog</DialogTitle>
    <DialogDescription>This dialog uses the full size.</DialogDescription>
  </DialogContent>
</Dialog>`

const footerCode = `import { Dialog, DialogTrigger, DialogContent, DialogTitle, DialogDescription, DialogFooter, DialogClose, Button } from '@umichkisa-ds/web'

<Dialog>
  <DialogTrigger asChild>
    <Button variant="primary">Confirm action</Button>
  </DialogTrigger>
  <DialogContent>
    <DialogTitle>Are you sure?</DialogTitle>
    <DialogDescription>This action cannot be undone. This will permanently delete your account and remove your data from our servers.</DialogDescription>
    <DialogFooter>
      <DialogClose asChild>
        <Button>Cancel</Button>
      </DialogClose>
      <DialogClose asChild>
        <Button variant="primary">Confirm</Button>
      </DialogClose>
    </DialogFooter>
  </DialogContent>
</Dialog>`

const customCloseCode = `import { Dialog, DialogTrigger, DialogContent, DialogTitle, DialogDescription, DialogFooter, DialogClose, Button } from '@umichkisa-ds/web'

<Dialog>
  <DialogTrigger asChild>
    <Button variant="primary">Custom close</Button>
  </DialogTrigger>
  <DialogContent showCloseButton={false}>
    <DialogTitle>Custom close behavior</DialogTitle>
    <DialogDescription>This dialog hides the default close button. Use the footer actions to dismiss it.</DialogDescription>
    <DialogFooter>
      <DialogClose asChild>
        <Button>Discard</Button>
      </DialogClose>
      <DialogClose asChild>
        <Button variant="primary">Save changes</Button>
      </DialogClose>
    </DialogFooter>
  </DialogContent>
</Dialog>`

export default async function DialogPage() {
  const [basicHighlighted, sizesHighlighted, footerHighlighted, customCloseHighlighted] = await Promise.all([
    highlight(basicCode),
    highlight(sizesCode),
    highlight(footerCode),
    highlight(customCloseCode),
  ]);

  return (
    <Container size="md" as="article">

      {/* -- Header -------------------------------------------------- */}
      <h1 className="type-h1 mb-4 text-foreground">Dialog</h1>
      <p className="type-body mb-4 text-foreground max-w-prose">
        Modal overlay for confirmations, forms, and focused tasks that require
        user attention before continuing.
      </p>
      <Alert variant="info" className="mb-8">
        Use Dialog for confirmations and forms that block interaction with the page. For non-modal anchored content, use Popover. For action menus, use Dropdown.
      </Alert>

      {/* -- Examples ------------------------------------------------- */}
      <h2 className="type-h2 mt-8 mb-4 text-foreground">Examples</h2>

      {/* Basic */}
      <h3 className="type-h3 mt-6 mb-2 text-foreground">Basic</h3>
      <p className="type-body mb-2 text-foreground max-w-prose">
        A dialog with a title, description, and the default close button.
      </p>
      <ComponentPreview code={basicCode} highlightedCode={basicHighlighted}>
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="primary">Open dialog</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogTitle>Basic dialog</DialogTitle>
            <DialogDescription>This is a simple dialog with a title, description, and close button.</DialogDescription>
          </DialogContent>
        </Dialog>
      </ComponentPreview>

      {/* Sizes */}
      <h3 className="type-h3 mt-8 mb-2 text-foreground">Sizes</h3>
      <p className="type-body mb-2 text-foreground max-w-prose">
        DialogContent supports four sizes:{' '}
        <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">sm</code>,{' '}
        <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">md</code>{' '}
        (default),{' '}
        <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">lg</code>, and{' '}
        <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">full</code>.
      </p>
      <ComponentPreview code={sizesCode} highlightedCode={sizesHighlighted}>
        <div className="flex flex-wrap gap-2">
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="primary">Small</Button>
            </DialogTrigger>
            <DialogContent size="sm">
              <DialogTitle>Small dialog</DialogTitle>
              <DialogDescription>This dialog uses the sm size.</DialogDescription>
            </DialogContent>
          </Dialog>
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="primary">Medium</Button>
            </DialogTrigger>
            <DialogContent size="md">
              <DialogTitle>Medium dialog</DialogTitle>
              <DialogDescription>This dialog uses the md size (default).</DialogDescription>
            </DialogContent>
          </Dialog>
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="primary">Large</Button>
            </DialogTrigger>
            <DialogContent size="lg">
              <DialogTitle>Large dialog</DialogTitle>
              <DialogDescription>This dialog uses the lg size.</DialogDescription>
            </DialogContent>
          </Dialog>
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="primary">Full</Button>
            </DialogTrigger>
            <DialogContent size="full">
              <DialogTitle>Full dialog</DialogTitle>
              <DialogDescription>This dialog uses the full size.</DialogDescription>
            </DialogContent>
          </Dialog>
        </div>
      </ComponentPreview>

      {/* With Footer */}
      <h3 className="type-h3 mt-8 mb-2 text-foreground">With footer</h3>
      <p className="type-body mb-2 text-foreground max-w-prose">
        Confirmation pattern with a footer containing Cancel and Confirm buttons.
        Cancel uses{' '}
        <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">
          DialogClose asChild
        </code>{' '}
        to dismiss the dialog without additional logic.
      </p>
      <ComponentPreview code={footerCode} highlightedCode={footerHighlighted}>
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="primary">Confirm action</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogTitle>Are you sure?</DialogTitle>
            <DialogDescription>This action cannot be undone. This will permanently delete your account and remove your data from our servers.</DialogDescription>
            <DialogFooter>
              <DialogClose asChild>
                <Button>Cancel</Button>
              </DialogClose>
              <DialogClose asChild>
                <Button variant="primary">Confirm</Button>
              </DialogClose>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </ComponentPreview>

      {/* Custom Close */}
      <h3 className="type-h3 mt-8 mb-2 text-foreground">Custom close</h3>
      <p className="type-body mb-2 text-foreground max-w-prose">
        Set{' '}
        <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">
          showCloseButton={'{false}'}
        </code>{' '}
        to hide the default X button. Use footer actions with{' '}
        <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">
          DialogClose asChild
        </code>{' '}
        for custom dismiss behavior.
      </p>
      <ComponentPreview code={customCloseCode} highlightedCode={customCloseHighlighted}>
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="primary">Custom close</Button>
          </DialogTrigger>
          <DialogContent showCloseButton={false}>
            <DialogTitle>Custom close behavior</DialogTitle>
            <DialogDescription>This dialog hides the default close button. Use the footer actions to dismiss it.</DialogDescription>
            <DialogFooter>
              <DialogClose asChild>
                <Button>Discard</Button>
              </DialogClose>
              <DialogClose asChild>
                <Button variant="primary">Save changes</Button>
              </DialogClose>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </ComponentPreview>

      {/* -- API Reference -------------------------------------------- */}
      <h2 className="type-h2 mt-8 mb-4 text-foreground">API Reference</h2>
      <p className="type-body mb-4 text-foreground max-w-prose">
        Dialog is composed from several sub-components that you assemble together. Each accepts the props listed below.
      </p>

      {/* Dialog (Root) */}
      <h3 className="type-h3 mt-8 mb-2 text-foreground">Dialog</h3>
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
                <TableCell><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">open</code></TableCell>
                <TableCell><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">boolean</code></TableCell>
                <TableCell>—</TableCell>
                <TableCell>Controlled open state.</TableCell>
              </TableRow>
              <TableRow>
                <TableCell><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">defaultOpen</code></TableCell>
                <TableCell><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">boolean</code></TableCell>
                <TableCell>—</TableCell>
                <TableCell>Initial open state for uncontrolled usage.</TableCell>
              </TableRow>
              <TableRow>
                <TableCell><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">onOpenChange</code></TableCell>
                <TableCell><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">{`(open: boolean) => void`}</code></TableCell>
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
              <span className="type-caption text-muted-foreground"><code className="rounded px-1 py-0.5 font-mono bg-surface-subtle">{`(open: boolean) => void`}</code></span>
              <span className="type-caption text-muted-foreground">Callback when the open state changes.</span>
            </TableMobileItem>
          </TableMobileList>
        </div>
      </div>

      {/* DialogTrigger */}
      <h3 className="type-h3 mt-8 mb-2 text-foreground">DialogTrigger</h3>
      <p className="type-body mb-2 text-foreground max-w-prose">
        The element that opens the dialog.
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
                <TableCell><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">asChild</code></TableCell>
                <TableCell><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">boolean</code></TableCell>
                <TableCell><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">false</code></TableCell>
                <TableCell>Merge trigger props onto the child element instead of rendering a default button.</TableCell>
              </TableRow>
              <TableRow>
                <TableCell><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">children</code></TableCell>
                <TableCell><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">ReactNode</code></TableCell>
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

      {/* DialogContent */}
      <h3 className="type-h3 mt-8 mb-2 text-foreground">DialogContent</h3>
      <p className="type-body mb-2 text-foreground max-w-prose">
        The modal panel rendered in a portal with an overlay backdrop.
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
                <TableCell><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">children</code></TableCell>
                <TableCell><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">ReactNode</code></TableCell>
                <TableCell>—</TableCell>
                <TableCell>Content rendered inside the dialog panel.</TableCell>
              </TableRow>
              <TableRow>
                <TableCell><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">size</code></TableCell>
                <TableCell><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">&quot;sm&quot; | &quot;md&quot; | &quot;lg&quot; | &quot;full&quot;</code></TableCell>
                <TableCell><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">&quot;md&quot;</code></TableCell>
                <TableCell>Width of the dialog panel. sm = 384px, md = 512px, lg = 672px, full = viewport width minus margin.</TableCell>
              </TableRow>
              <TableRow>
                <TableCell><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">showCloseButton</code></TableCell>
                <TableCell><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">boolean</code></TableCell>
                <TableCell><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">true</code></TableCell>
                <TableCell>Whether to render the default X close button in the top-right corner.</TableCell>
              </TableRow>
              <TableRow>
                <TableCell><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">className</code></TableCell>
                <TableCell><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">string</code></TableCell>
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
              <span className="type-caption text-muted-foreground">Content rendered inside the dialog panel.</span>
            </TableMobileItem>
            <TableMobileItem>
              <span className="type-body-sm text-foreground"><strong>size</strong></span>
              <span className="type-caption text-muted-foreground"><code className="rounded px-1 py-0.5 font-mono bg-surface-subtle">&quot;sm&quot; | &quot;md&quot; | &quot;lg&quot; | &quot;full&quot;</code> · default <code className="rounded px-1 py-0.5 font-mono bg-surface-subtle">&quot;md&quot;</code></span>
              <span className="type-caption text-muted-foreground">Width of the dialog panel. sm = 384px, md = 512px, lg = 672px, full = viewport width minus margin.</span>
            </TableMobileItem>
            <TableMobileItem>
              <span className="type-body-sm text-foreground"><strong>showCloseButton</strong></span>
              <span className="type-caption text-muted-foreground"><code className="rounded px-1 py-0.5 font-mono bg-surface-subtle">boolean</code> · default <code className="rounded px-1 py-0.5 font-mono bg-surface-subtle">true</code></span>
              <span className="type-caption text-muted-foreground">Whether to render the default X close button in the top-right corner.</span>
            </TableMobileItem>
            <TableMobileItem>
              <span className="type-body-sm text-foreground"><strong>className</strong></span>
              <span className="type-caption text-muted-foreground"><code className="rounded px-1 py-0.5 font-mono bg-surface-subtle">string</code></span>
              <span className="type-caption text-muted-foreground">Merged via cn(). Use for layout utilities only.</span>
            </TableMobileItem>
          </TableMobileList>
        </div>
      </div>

      {/* DialogTitle */}
      <h3 className="type-h3 mt-8 mb-2 text-foreground">DialogTitle</h3>
      <p className="type-body mb-2 text-foreground max-w-prose">
        Accessible heading for the dialog. Rendered as an h2.
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
                <TableCell><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">children</code></TableCell>
                <TableCell><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">ReactNode</code></TableCell>
                <TableCell>—</TableCell>
                <TableCell>The title text.</TableCell>
              </TableRow>
              <TableRow>
                <TableCell><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">className</code></TableCell>
                <TableCell><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">string</code></TableCell>
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
              <span className="type-caption text-muted-foreground">The title text.</span>
            </TableMobileItem>
            <TableMobileItem>
              <span className="type-body-sm text-foreground"><strong>className</strong></span>
              <span className="type-caption text-muted-foreground"><code className="rounded px-1 py-0.5 font-mono bg-surface-subtle">string</code></span>
              <span className="type-caption text-muted-foreground">Merged via cn(). Use for layout utilities only.</span>
            </TableMobileItem>
          </TableMobileList>
        </div>
      </div>

      {/* DialogDescription */}
      <h3 className="type-h3 mt-8 mb-2 text-foreground">DialogDescription</h3>
      <p className="type-body mb-2 text-foreground max-w-prose">
        Accessible description for the dialog. Rendered as a paragraph.
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
                <TableCell><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">children</code></TableCell>
                <TableCell><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">ReactNode</code></TableCell>
                <TableCell>—</TableCell>
                <TableCell>The description text.</TableCell>
              </TableRow>
              <TableRow>
                <TableCell><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">className</code></TableCell>
                <TableCell><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">string</code></TableCell>
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
              <span className="type-caption text-muted-foreground">The description text.</span>
            </TableMobileItem>
            <TableMobileItem>
              <span className="type-body-sm text-foreground"><strong>className</strong></span>
              <span className="type-caption text-muted-foreground"><code className="rounded px-1 py-0.5 font-mono bg-surface-subtle">string</code></span>
              <span className="type-caption text-muted-foreground">Merged via cn(). Use for layout utilities only.</span>
            </TableMobileItem>
          </TableMobileList>
        </div>
      </div>

      {/* DialogFooter */}
      <h3 className="type-h3 mt-8 mb-2 text-foreground">DialogFooter</h3>
      <p className="type-body mb-2 text-foreground max-w-prose">
        Footer area for action buttons. Renders children in a right-aligned flex row.
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
                <TableCell><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">children</code></TableCell>
                <TableCell><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">ReactNode</code></TableCell>
                <TableCell>—</TableCell>
                <TableCell>Action buttons, typically Button and DialogClose combinations.</TableCell>
              </TableRow>
              <TableRow>
                <TableCell><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">className</code></TableCell>
                <TableCell><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">string</code></TableCell>
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
              <span className="type-caption text-muted-foreground">Action buttons, typically Button and DialogClose combinations.</span>
            </TableMobileItem>
            <TableMobileItem>
              <span className="type-body-sm text-foreground"><strong>className</strong></span>
              <span className="type-caption text-muted-foreground"><code className="rounded px-1 py-0.5 font-mono bg-surface-subtle">string</code></span>
              <span className="type-caption text-muted-foreground">Merged via cn(). Use for layout utilities only.</span>
            </TableMobileItem>
          </TableMobileList>
        </div>
      </div>

      {/* DialogClose */}
      <h3 className="type-h3 mt-8 mb-2 text-foreground">DialogClose</h3>
      <p className="type-body mb-2 text-foreground max-w-prose">
        Closes the dialog when activated. Typically used with asChild to wrap a Button in a footer.
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
                <TableCell><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">asChild</code></TableCell>
                <TableCell><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">boolean</code></TableCell>
                <TableCell><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">false</code></TableCell>
                <TableCell>Merge close behavior onto the child element instead of rendering a default button.</TableCell>
              </TableRow>
              <TableRow>
                <TableCell><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">children</code></TableCell>
                <TableCell><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">ReactNode</code></TableCell>
                <TableCell>—</TableCell>
                <TableCell>The close element, typically a Button.</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
        <div className="block md:hidden">
          <TableMobileList>
            <TableMobileItem>
              <span className="type-body-sm text-foreground"><strong>asChild</strong></span>
              <span className="type-caption text-muted-foreground"><code className="rounded px-1 py-0.5 font-mono bg-surface-subtle">boolean</code> · default <code className="rounded px-1 py-0.5 font-mono bg-surface-subtle">false</code></span>
              <span className="type-caption text-muted-foreground">Merge close behavior onto the child element instead of rendering a default button.</span>
            </TableMobileItem>
            <TableMobileItem>
              <span className="type-body-sm text-foreground"><strong>children</strong></span>
              <span className="type-caption text-muted-foreground"><code className="rounded px-1 py-0.5 font-mono bg-surface-subtle">ReactNode</code></span>
              <span className="type-caption text-muted-foreground">The close element, typically a Button.</span>
            </TableMobileItem>
          </TableMobileList>
        </div>
      </div>

    </Container>
  )
}
