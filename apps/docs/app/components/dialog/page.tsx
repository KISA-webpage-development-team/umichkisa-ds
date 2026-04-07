import { Container, Dialog, DialogTrigger, DialogClose, DialogContent, DialogTitle, DialogDescription, DialogFooter, Button } from '@umichkisa-ds/web'
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
        <Button variant="primary">Cancel</Button>
      </DialogClose>
      <DialogClose asChild>
        <Button>Confirm</Button>
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
        <Button variant="primary">Discard</Button>
      </DialogClose>
      <DialogClose asChild>
        <Button>Save changes</Button>
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
      <p className="type-body-sm mb-8 text-muted-foreground max-w-prose">
        Use Dialog for confirmations and forms that block interaction with the
        page. For non-modal anchored content, use Popover. For action menus,
        use Dropdown.
      </p>

      {/* -- Examples ------------------------------------------------- */}
      <h2 className="type-h2 mt-8 mb-4 text-foreground">Examples</h2>

      {/* Basic */}
      <h3 className="type-h3 mt-6 mb-2 text-foreground">Basic</h3>
      <p className="type-body mb-2 text-foreground max-w-prose">
        A dialog with a title, description, and the default close button.
        Triggered via a secondary button.
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
                <Button variant="primary">Cancel</Button>
              </DialogClose>
              <DialogClose asChild>
                <Button>Confirm</Button>
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
                <Button variant="primary">Discard</Button>
              </DialogClose>
              <DialogClose asChild>
                <Button>Save changes</Button>
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

      {/* DialogTrigger */}
      <h3 className="type-h3 mt-8 mb-2 text-foreground">DialogTrigger</h3>
      <p className="type-body mb-2 text-foreground max-w-prose">
        The element that opens the dialog.
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

      {/* DialogContent */}
      <h3 className="type-h3 mt-8 mb-2 text-foreground">DialogContent</h3>
      <p className="type-body mb-2 text-foreground max-w-prose">
        The modal panel rendered in a portal with an overlay backdrop.
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
              <td className="px-4 py-3 text-foreground"><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle">children</code></td>
              <td className="px-4 py-3 text-foreground"><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle">ReactNode</code></td>
              <td className="px-4 py-3 type-body-sm text-foreground">—</td>
              <td className="px-4 py-3 type-body-sm text-foreground">Content rendered inside the dialog panel.</td>
            </tr>
            <tr className="border-b border-border">
              <td className="px-4 py-3 text-foreground"><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle">size</code></td>
              <td className="px-4 py-3 text-foreground"><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle">&quot;sm&quot; | &quot;md&quot; | &quot;lg&quot; | &quot;full&quot;</code></td>
              <td className="px-4 py-3 text-foreground"><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle">&quot;md&quot;</code></td>
              <td className="px-4 py-3 type-body-sm text-foreground">Width of the dialog panel. sm = 384px, md = 512px, lg = 672px, full = viewport width minus margin.</td>
            </tr>
            <tr className="border-b border-border">
              <td className="px-4 py-3 text-foreground"><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle">showCloseButton</code></td>
              <td className="px-4 py-3 text-foreground"><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle">boolean</code></td>
              <td className="px-4 py-3 text-foreground"><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle">true</code></td>
              <td className="px-4 py-3 type-body-sm text-foreground">Whether to render the default X close button in the top-right corner.</td>
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

      {/* DialogTitle */}
      <h3 className="type-h3 mt-8 mb-2 text-foreground">DialogTitle</h3>
      <p className="type-body mb-2 text-foreground max-w-prose">
        Accessible heading for the dialog. Rendered as an h2.
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
              <td className="px-4 py-3 text-foreground"><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle">children</code></td>
              <td className="px-4 py-3 text-foreground"><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle">ReactNode</code></td>
              <td className="px-4 py-3 type-body-sm text-foreground">—</td>
              <td className="px-4 py-3 type-body-sm text-foreground">The title text.</td>
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

      {/* DialogDescription */}
      <h3 className="type-h3 mt-8 mb-2 text-foreground">DialogDescription</h3>
      <p className="type-body mb-2 text-foreground max-w-prose">
        Accessible description for the dialog. Rendered as a paragraph.
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
              <td className="px-4 py-3 text-foreground"><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle">children</code></td>
              <td className="px-4 py-3 text-foreground"><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle">ReactNode</code></td>
              <td className="px-4 py-3 type-body-sm text-foreground">—</td>
              <td className="px-4 py-3 type-body-sm text-foreground">The description text.</td>
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

      {/* DialogFooter */}
      <h3 className="type-h3 mt-8 mb-2 text-foreground">DialogFooter</h3>
      <p className="type-body mb-2 text-foreground max-w-prose">
        Footer area for action buttons. Renders children in a right-aligned flex row.
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
              <td className="px-4 py-3 text-foreground"><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle">children</code></td>
              <td className="px-4 py-3 text-foreground"><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle">ReactNode</code></td>
              <td className="px-4 py-3 type-body-sm text-foreground">—</td>
              <td className="px-4 py-3 type-body-sm text-foreground">Action buttons, typically Button and DialogClose combinations.</td>
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

      {/* DialogClose */}
      <h3 className="type-h3 mt-8 mb-2 text-foreground">DialogClose</h3>
      <p className="type-body mb-2 text-foreground max-w-prose">
        Closes the dialog when activated. Typically used with asChild to wrap a Button in a footer.
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
              <td className="px-4 py-3 type-body-sm text-foreground">Merge close behavior onto the child element instead of rendering a default button.</td>
            </tr>
            <tr className="border-b border-border">
              <td className="px-4 py-3 text-foreground"><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle">children</code></td>
              <td className="px-4 py-3 text-foreground"><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle">ReactNode</code></td>
              <td className="px-4 py-3 type-body-sm text-foreground">—</td>
              <td className="px-4 py-3 type-body-sm text-foreground">The close element, typically a Button.</td>
            </tr>
          </tbody>
        </table>
      </div>

    </Container>
  )
}
