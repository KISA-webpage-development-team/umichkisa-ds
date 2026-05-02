import {
  Alert, Container, Sheet, SheetTrigger, SheetClose, SheetContent, SheetTitle, SheetDescription, SheetFooter, Button, Table, TableBody, TableCell, TableHead, TableHeader, TableMobileItem, TableMobileList, TableRow } from '@umichkisa-ds/web'
import { ComponentPreview } from '@/components/ComponentPreview'
import { InlineCode } from '@/components/InlineCode'
import { highlight } from '@/lib/highlight'
import { Heading } from '@/components/Heading'

const basicCode = `import { Sheet, SheetTrigger, SheetContent, SheetTitle, SheetDescription, SheetClose, Button } from '@umichkisa-ds/web'

<Sheet>
  <SheetTrigger asChild>
    <Button variant="primary">Open sheet</Button>
  </SheetTrigger>
  <SheetContent>
    <SheetTitle>Basic sheet</SheetTitle>
    <SheetDescription>This is a mobile bottom-sheet with a title, description, drag handle, and close button.</SheetDescription>
  </SheetContent>
</Sheet>`

const footerCode = `import { Sheet, SheetTrigger, SheetContent, SheetTitle, SheetDescription, SheetFooter, SheetClose, Button } from '@umichkisa-ds/web'

<Sheet>
  <SheetTrigger asChild>
    <Button variant="primary">Confirm action</Button>
  </SheetTrigger>
  <SheetContent>
    <SheetTitle>Are you sure?</SheetTitle>
    <SheetDescription>This action cannot be undone. This will permanently delete your account and remove your data from our servers.</SheetDescription>
    <SheetFooter>
      <SheetClose asChild>
        <Button>Cancel</Button>
      </SheetClose>
      <SheetClose asChild>
        <Button variant="primary">Confirm</Button>
      </SheetClose>
    </SheetFooter>
  </SheetContent>
</Sheet>`

const customCloseCode = `import { Sheet, SheetTrigger, SheetContent, SheetTitle, SheetDescription, SheetFooter, SheetClose, Button } from '@umichkisa-ds/web'

<Sheet>
  <SheetTrigger asChild>
    <Button variant="primary">Custom close</Button>
  </SheetTrigger>
  <SheetContent showCloseButton={false} showHandle={false}>
    <SheetTitle>Custom close behavior</SheetTitle>
    <SheetDescription>This sheet hides the default close button and drag handle. Use the footer actions to dismiss it.</SheetDescription>
    <SheetFooter>
      <SheetClose asChild>
        <Button>Discard</Button>
      </SheetClose>
      <SheetClose asChild>
        <Button variant="primary">Save changes</Button>
      </SheetClose>
    </SheetFooter>
  </SheetContent>
</Sheet>`

const hiddenTitleCode = `import { Sheet, SheetTrigger, SheetContent, SheetTitle, SheetDescription, Button } from '@umichkisa-ds/web'

// SheetTitle is required for screen readers. If the visual design
// doesn't call for a title, hide it with sr-only.
<Sheet>
  <SheetTrigger asChild>
    <Button variant="primary">Open picker</Button>
  </SheetTrigger>
  <SheetContent>
    <SheetTitle className="sr-only">Choose an option</SheetTitle>
    <SheetDescription>Select one of the options below.</SheetDescription>
    {/* picker content */}
  </SheetContent>
</Sheet>`

export default async function SheetPage() {
  const [basicHighlighted, footerHighlighted, customCloseHighlighted, hiddenTitleHighlighted] = await Promise.all([
    highlight(basicCode),
    highlight(footerCode),
    highlight(customCloseCode),
    highlight(hiddenTitleCode),
  ]);

  return (
    <Container size="md" as="article">

      {/* -- Header -------------------------------------------------- */}
      <h1 className="type-h1 mb-4 text-foreground">Sheet</h1>
      <p className="type-body mb-4 text-foreground">
        Mobile bottom-sheet overlay for detail panels, pickers, and order/receipt views. Slides up from the bottom of the viewport with drag-to-dismiss.
      </p>
      <Alert variant="info" className="mb-8">
        Sheet is mobile-only — designed for mobile viewports. It does not enforce a breakpoint itself; gate it at your route or layout level (e.g. <InlineCode>md:hidden</InlineCode> wrapper or a mobile-only route group). For overlays that need to work on every viewport, use Dialog. Drag-to-dismiss is built in — consumers do not implement custom dismissal gestures.
      </Alert>

      {/* -- Examples ------------------------------------------------- */}
      <Heading as="h2">Examples</Heading>

      {/* Basic */}
      <Heading as="h3" className="mt-6">Basic</Heading>
      <p className="type-body mb-2 text-foreground">
        A sheet with a title, description, drag handle, and the default close button.
      </p>
      <ComponentPreview code={basicCode} highlightedCode={basicHighlighted}>
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="primary">Open sheet</Button>
          </SheetTrigger>
          <SheetContent>
            <SheetTitle>Basic sheet</SheetTitle>
            <SheetDescription>This is a mobile bottom-sheet with a title, description, drag handle, and close button.</SheetDescription>
          </SheetContent>
        </Sheet>
      </ComponentPreview>

      {/* With Footer */}
      <Heading as="h3">With footer</Heading>
      <p className="type-body mb-2 text-foreground">
        Confirmation pattern with a footer containing Cancel and Confirm buttons.
        Cancel uses{' '}
        <InlineCode>
          SheetClose asChild
        </InlineCode>{' '}
        to dismiss the sheet without additional logic.
      </p>
      <ComponentPreview code={footerCode} highlightedCode={footerHighlighted}>
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="primary">Confirm action</Button>
          </SheetTrigger>
          <SheetContent>
            <SheetTitle>Are you sure?</SheetTitle>
            <SheetDescription>This action cannot be undone. This will permanently delete your account and remove your data from our servers.</SheetDescription>
            <SheetFooter>
              <SheetClose asChild>
                <Button>Cancel</Button>
              </SheetClose>
              <SheetClose asChild>
                <Button variant="primary">Confirm</Button>
              </SheetClose>
            </SheetFooter>
          </SheetContent>
        </Sheet>
      </ComponentPreview>

      {/* Custom Close */}
      <Heading as="h3">Custom close</Heading>
      <p className="type-body mb-2 text-foreground">
        Set{' '}
        <InlineCode>
          showCloseButton={'{false}'}
        </InlineCode>{' '}
        to hide the default X button and{' '}
        <InlineCode>
          showHandle={'{false}'}
        </InlineCode>{' '}
        to hide the drag handle. Use footer actions with{' '}
        <InlineCode>
          SheetClose asChild
        </InlineCode>{' '}
        for custom dismiss behavior.
      </p>
      <ComponentPreview code={customCloseCode} highlightedCode={customCloseHighlighted}>
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="primary">Custom close</Button>
          </SheetTrigger>
          <SheetContent showCloseButton={false} showHandle={false}>
            <SheetTitle>Custom close behavior</SheetTitle>
            <SheetDescription>This sheet hides the default close button and drag handle. Use the footer actions to dismiss it.</SheetDescription>
            <SheetFooter>
              <SheetClose asChild>
                <Button>Discard</Button>
              </SheetClose>
              <SheetClose asChild>
                <Button variant="primary">Save changes</Button>
              </SheetClose>
            </SheetFooter>
          </SheetContent>
        </Sheet>
      </ComponentPreview>

      {/* Hidden Title (a11y) */}
      <Heading as="h3">Hidden title (a11y)</Heading>
      <p className="type-body mb-2 text-foreground">
        <InlineCode>SheetTitle</InlineCode> is required for screen-reader accessibility, but you don&apos;t always want it visible — pickers and selectors typically don&apos;t need a heading. Wrap the title text in an <InlineCode>sr-only</InlineCode> span (or pass <InlineCode>className=&quot;sr-only&quot;</InlineCode> directly) to keep it accessible without showing it.
      </p>
      <ComponentPreview code={hiddenTitleCode} highlightedCode={hiddenTitleHighlighted}>
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="primary">Open picker</Button>
          </SheetTrigger>
          <SheetContent>
            <SheetTitle className="sr-only">Choose an option</SheetTitle>
            <SheetDescription>Select one of the options below.</SheetDescription>
          </SheetContent>
        </Sheet>
      </ComponentPreview>

      {/* -- API Reference -------------------------------------------- */}
      <Heading as="h2">API Reference</Heading>
      <p className="type-body mb-4 text-foreground">
        Sheet is composed from several sub-components that you assemble together. Each accepts the props listed below.
      </p>

      {/* Sheet (Root) */}
      <Heading as="h3">Sheet</Heading>
      <p className="type-body mb-2 text-foreground">
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
                <TableCell><InlineCode>defaultOpen</InlineCode></TableCell>
                <TableCell><InlineCode>boolean</InlineCode></TableCell>
                <TableCell>—</TableCell>
                <TableCell>Initial open state for uncontrolled usage.</TableCell>
              </TableRow>
              <TableRow>
                <TableCell><InlineCode>onOpenChange</InlineCode></TableCell>
                <TableCell><InlineCode>{`(open: boolean) => void`}</InlineCode></TableCell>
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
              <span className="type-caption text-muted-foreground"><InlineCode>{`(open: boolean) => void`}</InlineCode></span>
              <span className="type-caption text-muted-foreground">Callback when the open state changes.</span>
            </TableMobileItem>
          </TableMobileList>
        </div>
      </div>

      {/* SheetTrigger */}
      <Heading as="h3">SheetTrigger</Heading>
      <p className="type-body mb-2 text-foreground">
        The element that opens the sheet.
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

      {/* SheetContent */}
      <Heading as="h3">SheetContent</Heading>
      <p className="type-body mb-2 text-foreground">
        The bottom-sheet panel rendered in a portal with an overlay backdrop. Slides up from the bottom and supports drag-to-dismiss.
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
                <TableCell><InlineCode>children</InlineCode></TableCell>
                <TableCell><InlineCode>ReactNode</InlineCode></TableCell>
                <TableCell>—</TableCell>
                <TableCell>Content rendered inside the sheet panel.</TableCell>
              </TableRow>
              <TableRow>
                <TableCell><InlineCode>showCloseButton</InlineCode></TableCell>
                <TableCell><InlineCode>boolean</InlineCode></TableCell>
                <TableCell><InlineCode>true</InlineCode></TableCell>
                <TableCell>Whether to render the default X close button in the top-right corner.</TableCell>
              </TableRow>
              <TableRow>
                <TableCell><InlineCode>showHandle</InlineCode></TableCell>
                <TableCell><InlineCode>boolean</InlineCode></TableCell>
                <TableCell><InlineCode>true</InlineCode></TableCell>
                <TableCell>Whether to render the visual drag handle at the top of the sheet.</TableCell>
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
              <span className="type-caption text-muted-foreground">Content rendered inside the sheet panel.</span>
            </TableMobileItem>
            <TableMobileItem>
              <span className="type-body-sm text-foreground"><strong>showCloseButton</strong></span>
              <span className="type-caption text-muted-foreground"><InlineCode>boolean</InlineCode> · default <InlineCode>true</InlineCode></span>
              <span className="type-caption text-muted-foreground">Whether to render the default X close button in the top-right corner.</span>
            </TableMobileItem>
            <TableMobileItem>
              <span className="type-body-sm text-foreground"><strong>showHandle</strong></span>
              <span className="type-caption text-muted-foreground"><InlineCode>boolean</InlineCode> · default <InlineCode>true</InlineCode></span>
              <span className="type-caption text-muted-foreground">Whether to render the visual drag handle at the top of the sheet.</span>
            </TableMobileItem>
            <TableMobileItem>
              <span className="type-body-sm text-foreground"><strong>className</strong></span>
              <span className="type-caption text-muted-foreground"><InlineCode>string</InlineCode></span>
              <span className="type-caption text-muted-foreground">Merged via cn(). Use for layout utilities only.</span>
            </TableMobileItem>
          </TableMobileList>
        </div>
      </div>

      {/* SheetTitle */}
      <Heading as="h3">SheetTitle</Heading>
      <p className="type-body mb-2 text-foreground">
        Accessible heading for the sheet. Rendered as an <InlineCode>h2</InlineCode>. Required for screen-reader accessibility — if you don&apos;t want it visually shown, pass <InlineCode>className=&quot;sr-only&quot;</InlineCode> (see the &ldquo;Hidden title (a11y)&rdquo; example above).
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
                <TableCell><InlineCode>children</InlineCode></TableCell>
                <TableCell><InlineCode>ReactNode</InlineCode></TableCell>
                <TableCell>—</TableCell>
                <TableCell>The title text.</TableCell>
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
              <span className="type-caption text-muted-foreground">The title text.</span>
            </TableMobileItem>
            <TableMobileItem>
              <span className="type-body-sm text-foreground"><strong>className</strong></span>
              <span className="type-caption text-muted-foreground"><InlineCode>string</InlineCode></span>
              <span className="type-caption text-muted-foreground">Merged via cn(). Use for layout utilities only.</span>
            </TableMobileItem>
          </TableMobileList>
        </div>
      </div>

      {/* SheetDescription */}
      <Heading as="h3">SheetDescription</Heading>
      <p className="type-body mb-2 text-foreground">
        Accessible description for the sheet. Rendered as a paragraph.
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
                <TableCell><InlineCode>children</InlineCode></TableCell>
                <TableCell><InlineCode>ReactNode</InlineCode></TableCell>
                <TableCell>—</TableCell>
                <TableCell>The description text.</TableCell>
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
              <span className="type-caption text-muted-foreground">The description text.</span>
            </TableMobileItem>
            <TableMobileItem>
              <span className="type-body-sm text-foreground"><strong>className</strong></span>
              <span className="type-caption text-muted-foreground"><InlineCode>string</InlineCode></span>
              <span className="type-caption text-muted-foreground">Merged via cn(). Use for layout utilities only.</span>
            </TableMobileItem>
          </TableMobileList>
        </div>
      </div>

      {/* SheetFooter */}
      <Heading as="h3">SheetFooter</Heading>
      <p className="type-body mb-2 text-foreground">
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
                <TableCell><InlineCode>children</InlineCode></TableCell>
                <TableCell><InlineCode>ReactNode</InlineCode></TableCell>
                <TableCell>—</TableCell>
                <TableCell>Action buttons, typically Button and SheetClose combinations.</TableCell>
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
              <span className="type-caption text-muted-foreground">Action buttons, typically Button and SheetClose combinations.</span>
            </TableMobileItem>
            <TableMobileItem>
              <span className="type-body-sm text-foreground"><strong>className</strong></span>
              <span className="type-caption text-muted-foreground"><InlineCode>string</InlineCode></span>
              <span className="type-caption text-muted-foreground">Merged via cn(). Use for layout utilities only.</span>
            </TableMobileItem>
          </TableMobileList>
        </div>
      </div>

      {/* SheetClose */}
      <Heading as="h3">SheetClose</Heading>
      <p className="type-body mb-2 text-foreground">
        Closes the sheet when activated. Typically used with asChild to wrap a Button in a footer.
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
                <TableCell>Merge close behavior onto the child element instead of rendering a default button.</TableCell>
              </TableRow>
              <TableRow>
                <TableCell><InlineCode>children</InlineCode></TableCell>
                <TableCell><InlineCode>ReactNode</InlineCode></TableCell>
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
              <span className="type-caption text-muted-foreground"><InlineCode>boolean</InlineCode> · default <InlineCode>false</InlineCode></span>
              <span className="type-caption text-muted-foreground">Merge close behavior onto the child element instead of rendering a default button.</span>
            </TableMobileItem>
            <TableMobileItem>
              <span className="type-body-sm text-foreground"><strong>children</strong></span>
              <span className="type-caption text-muted-foreground"><InlineCode>ReactNode</InlineCode></span>
              <span className="type-caption text-muted-foreground">The close element, typically a Button.</span>
            </TableMobileItem>
          </TableMobileList>
        </div>
      </div>

    </Container>
  )
}
