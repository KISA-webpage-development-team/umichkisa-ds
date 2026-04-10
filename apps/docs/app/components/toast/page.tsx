import { Container, Table, TableBody, TableCell, TableHead, TableHeader, TableMobileItem, TableMobileList, TableRow } from '@umichkisa-ds/web'
import { ComponentPreview } from '@/components/ComponentPreview'
import { highlight } from '@/lib/highlight'
import { BasicDemo, VariantsDemo, DescriptionDemo, ActionDemo, PromiseDemo, PositionDemo } from './_demos'
import { Heading } from '@/components/Heading'
import { InlineCode } from '@/components/InlineCode'

const setupCode = `// app/layout.tsx (or your root layout)
import { Toaster } from '@umichkisa-ds/web'

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        {children}
        <Toaster />
      </body>
    </html>
  )
}`

const basicCode = `import { toast } from '@umichkisa-ds/web'

<Button onClick={() => toast('Event has been created')}>
  Show toast
</Button>`

const variantsCode = `import { toast } from '@umichkisa-ds/web'

<Button variant="secondary" onClick={() => toast('A neutral notification')}>
  Default
</Button>
<Button variant="secondary" onClick={() => toast.info('This is an informational message')}>
  Info
</Button>
<Button onClick={() => toast.success('Action completed successfully')}>
  Success
</Button>
<Button variant="secondary" onClick={() => toast.warning('Please review before continuing')}>
  Warning
</Button>
<Button variant="destructive" onClick={() => toast.error('Something went wrong')}>
  Error
</Button>`

const descriptionCode = `import { toast } from '@umichkisa-ds/web'

<Button onClick={() => toast('Event created', { description: 'Monday, January 3rd at 6:00 PM' })}>
  With description
</Button>`

const actionCode = `import { toast } from '@umichkisa-ds/web'

<Button onClick={() => toast('Event deleted', {
  action: {
    label: 'Undo',
    onClick: () => console.log('Undo clicked'),
  },
})}>
  With action
</Button>`

const promiseCode = `import { toast } from '@umichkisa-ds/web'

<Button onClick={() => {
  toast.promise(
    new Promise((resolve) => setTimeout(resolve, 2000)),
    {
      loading: 'Saving changes...',
      success: 'Changes saved successfully',
      error: 'Failed to save changes',
    }
  )
}}>
  Save changes
</Button>`

const positionCode = `import { Toaster } from '@umichkisa-ds/web'

// Set position on the Toaster provider
<Toaster position="bottom-right" />`

export default async function ToastPage() {
  const [
    setupHighlighted,
    basicHighlighted,
    variantsHighlighted,
    descriptionHighlighted,
    actionHighlighted,
    promiseHighlighted,
    positionHighlighted,
  ] = await Promise.all([
    highlight(setupCode),
    highlight(basicCode),
    highlight(variantsCode),
    highlight(descriptionCode),
    highlight(actionCode),
    highlight(promiseCode),
    highlight(positionCode),
  ])

  return (
    <Container size="md" as="article">

      {/* -- Header -------------------------------------------------- */}
      <h1 className="type-h1 mb-4 text-foreground">Toast</h1>
      <p className="type-body mb-4 text-foreground max-w-prose">
        Ephemeral notifications that appear temporarily to provide feedback
        about an action or event without interrupting the user's workflow.
      </p>
      <p className="type-body-sm mb-4 text-muted-foreground max-w-prose">
        Built on <strong>Sonner</strong>.
      </p>
      <p className="type-body-sm mb-8 text-muted-foreground max-w-prose">
        Use Toast for brief, non-blocking feedback (save confirmations, error
        alerts, async status). For persistent in-page messages, use Alert.
      </p>

      {/* -- Setup --------------------------------------------------- */}
      <Heading as="h2">Setup</Heading>
      <p className="type-body mb-2 text-foreground max-w-prose">
        Mount the <InlineCode>{'<Toaster />'}</InlineCode> component
        once in your application's root layout. This renders the toast container
        that all <InlineCode>toast()</InlineCode> calls
        target.
      </p>
      <ComponentPreview code={setupCode} highlightedCode={setupHighlighted}>
        <div className="type-body-sm text-muted-foreground">
          Add the Toaster component to your root layout — see the code panel for
          the full example.
        </div>
      </ComponentPreview>

      {/* -- Basic Usage --------------------------------------------- */}
      <Heading as="h2">Basic Usage</Heading>
      <p className="type-body mb-2 text-foreground max-w-prose">
        Call <InlineCode>toast()</InlineCode> from
        anywhere in your app. Pass a string message as the first argument.
      </p>
      <ComponentPreview code={basicCode} highlightedCode={basicHighlighted}>
        <BasicDemo />
      </ComponentPreview>

      {/* -- Variants ------------------------------------------------ */}
      <Heading as="h2">Variants</Heading>
      <p className="type-body mb-2 text-foreground max-w-prose">
        Five variants map to feedback states. The default variant uses a neutral
        style. The four feedback variants (<InlineCode>info</InlineCode>,{' '}
        <InlineCode>success</InlineCode>,{' '}
        <InlineCode>warning</InlineCode>,{' '}
        <InlineCode>error</InlineCode>)
        add a colored left border, tinted background, and matching icon —
        consistent with the Alert component.
      </p>
      <ComponentPreview code={variantsCode} highlightedCode={variantsHighlighted}>
        <VariantsDemo />
      </ComponentPreview>

      {/* -- With Description ---------------------------------------- */}
      <Heading as="h2">With Description</Heading>
      <p className="type-body mb-2 text-foreground max-w-prose">
        Pass a <InlineCode>description</InlineCode> option
        to add secondary text below the title.
      </p>
      <ComponentPreview code={descriptionCode} highlightedCode={descriptionHighlighted}>
        <DescriptionDemo />
      </ComponentPreview>

      {/* -- With Action --------------------------------------------- */}
      <Heading as="h2">With Action</Heading>
      <p className="type-body mb-2 text-foreground max-w-prose">
        Add an action button to the toast with the <InlineCode>action</InlineCode> option.
        Provide a <InlineCode>label</InlineCode> and
        an <InlineCode>onClick</InlineCode> handler.
      </p>
      <ComponentPreview code={actionCode} highlightedCode={actionHighlighted}>
        <ActionDemo />
      </ComponentPreview>

      {/* -- Promise ------------------------------------------------- */}
      <Heading as="h2">Promise</Heading>
      <p className="type-body mb-2 text-foreground max-w-prose">
        Use <InlineCode>toast.promise()</InlineCode> to
        show loading, success, and error states for async operations. The toast
        updates automatically as the promise resolves or rejects.
      </p>
      <ComponentPreview code={promiseCode} highlightedCode={promiseHighlighted}>
        <PromiseDemo />
      </ComponentPreview>

      {/* -- Positioning --------------------------------------------- */}
      <Heading as="h2">Positioning</Heading>
      <p className="type-body mb-2 text-foreground max-w-prose">
        The <InlineCode>position</InlineCode> prop
        on <InlineCode>{'<Toaster />'}</InlineCode> controls
        where toasts appear. Click a position below to try it out.
      </p>
      <ComponentPreview code={positionCode} highlightedCode={positionHighlighted}>
        <PositionDemo />
      </ComponentPreview>

      {/* -- API Reference ------------------------------------------- */}
      <Heading as="h2">API Reference</Heading>
      <p className="type-body mb-2 text-foreground max-w-prose">
        Reference for the <InlineCode>{'<Toaster />'}</InlineCode> provider,
        the imperative <InlineCode>toast()</InlineCode> API,
        and per-toast options.
      </p>

      {/* Toaster */}
      <Heading as="h3" className="mt-6">Toaster</Heading>
      <p className="type-body mb-2 text-foreground max-w-prose">
        Provider component mounted once at the app root. Renders the toast
        container and applies DS styling.
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
                <TableCell><InlineCode>position</InlineCode></TableCell>
                <TableCell><InlineCode>{'"top-left" | "top-center" | "top-right" | "bottom-left" | "bottom-center" | "bottom-right"'}</InlineCode></TableCell>
                <TableCell><InlineCode>"top-center"</InlineCode></TableCell>
                <TableCell>Where toasts appear on screen.</TableCell>
              </TableRow>
              <TableRow>
                <TableCell><InlineCode>duration</InlineCode></TableCell>
                <TableCell><InlineCode>number</InlineCode></TableCell>
                <TableCell><InlineCode>4000</InlineCode></TableCell>
                <TableCell>Default auto-dismiss time in milliseconds.</TableCell>
              </TableRow>
              <TableRow>
                <TableCell><InlineCode>expand</InlineCode></TableCell>
                <TableCell><InlineCode>boolean</InlineCode></TableCell>
                <TableCell><InlineCode>false</InlineCode></TableCell>
                <TableCell>Expand all toasts by default instead of stacking.</TableCell>
              </TableRow>
              <TableRow>
                <TableCell><InlineCode>visibleToasts</InlineCode></TableCell>
                <TableCell><InlineCode>number</InlineCode></TableCell>
                <TableCell><InlineCode>3</InlineCode></TableCell>
                <TableCell>Maximum number of visible toasts at once.</TableCell>
              </TableRow>
              <TableRow>
                <TableCell><InlineCode>offset</InlineCode></TableCell>
                <TableCell><InlineCode>string | number</InlineCode></TableCell>
                <TableCell>—</TableCell>
                <TableCell>Distance from the edge of the viewport.</TableCell>
              </TableRow>
              <TableRow>
                <TableCell><InlineCode>gap</InlineCode></TableCell>
                <TableCell><InlineCode>number</InlineCode></TableCell>
                <TableCell><InlineCode>14</InlineCode></TableCell>
                <TableCell>Gap between stacked toasts in pixels.</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
        <div className="block md:hidden">
          <TableMobileList>
            <TableMobileItem>
              <span className="type-body-sm text-foreground"><strong>position</strong></span>
              <span className="type-caption text-muted-foreground"><InlineCode>{'"top-left" | "top-center" | "top-right" | "bottom-left" | "bottom-center" | "bottom-right"'}</InlineCode></span>
              <span className="type-caption text-muted-foreground">Default: <InlineCode>"top-center"</InlineCode> — Where toasts appear on screen.</span>
            </TableMobileItem>
            <TableMobileItem>
              <span className="type-body-sm text-foreground"><strong>duration</strong></span>
              <span className="type-caption text-muted-foreground"><InlineCode>number</InlineCode></span>
              <span className="type-caption text-muted-foreground">Default: <InlineCode>4000</InlineCode> — Default auto-dismiss time in milliseconds.</span>
            </TableMobileItem>
            <TableMobileItem>
              <span className="type-body-sm text-foreground"><strong>expand</strong></span>
              <span className="type-caption text-muted-foreground"><InlineCode>boolean</InlineCode></span>
              <span className="type-caption text-muted-foreground">Default: <InlineCode>false</InlineCode> — Expand all toasts by default instead of stacking.</span>
            </TableMobileItem>
            <TableMobileItem>
              <span className="type-body-sm text-foreground"><strong>visibleToasts</strong></span>
              <span className="type-caption text-muted-foreground"><InlineCode>number</InlineCode></span>
              <span className="type-caption text-muted-foreground">Default: <InlineCode>3</InlineCode> — Maximum number of visible toasts at once.</span>
            </TableMobileItem>
            <TableMobileItem>
              <span className="type-body-sm text-foreground"><strong>offset</strong></span>
              <span className="type-caption text-muted-foreground"><InlineCode>string | number</InlineCode></span>
              <span className="type-caption text-muted-foreground">Distance from the edge of the viewport.</span>
            </TableMobileItem>
            <TableMobileItem>
              <span className="type-body-sm text-foreground"><strong>gap</strong></span>
              <span className="type-caption text-muted-foreground"><InlineCode>number</InlineCode></span>
              <span className="type-caption text-muted-foreground">Default: <InlineCode>14</InlineCode> — Gap between stacked toasts in pixels.</span>
            </TableMobileItem>
          </TableMobileList>
        </div>
      </div>

      {/* toast() */}
      <Heading as="h3">toast()</Heading>
      <p className="type-body mb-2 text-foreground max-w-prose">
        Imperative function to trigger toasts from anywhere in your app.
        Every <InlineCode>toast()</InlineCode> call
        returns an ID you can pass to <InlineCode>toast.dismiss(id)</InlineCode> to
        close it programmatically.
      </p>
      <div className="my-6">
        <div className="hidden md:block">
          <Table size="sm">
            <TableHeader>
              <TableRow>
                <TableHead>Method</TableHead>
                <TableHead>Description</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell><InlineCode>toast(message, options?)</InlineCode></TableCell>
                <TableCell>Show a default toast.</TableCell>
              </TableRow>
              <TableRow>
                <TableCell><InlineCode>toast.info(message, options?)</InlineCode></TableCell>
                <TableCell>Show an info toast with info icon and blue tint.</TableCell>
              </TableRow>
              <TableRow>
                <TableCell><InlineCode>toast.success(message, options?)</InlineCode></TableCell>
                <TableCell>Show a success toast with check icon and green tint.</TableCell>
              </TableRow>
              <TableRow>
                <TableCell><InlineCode>toast.warning(message, options?)</InlineCode></TableCell>
                <TableCell>Show a warning toast with alert icon and yellow tint.</TableCell>
              </TableRow>
              <TableRow>
                <TableCell><InlineCode>toast.error(message, options?)</InlineCode></TableCell>
                <TableCell>Show an error toast with error icon and red tint.</TableCell>
              </TableRow>
              <TableRow>
                <TableCell><InlineCode>toast.promise(promise, options)</InlineCode></TableCell>
                <TableCell>Show loading/success/error states for an async operation.</TableCell>
              </TableRow>
              <TableRow>
                <TableCell><InlineCode>toast.dismiss(id?)</InlineCode></TableCell>
                <TableCell>Dismiss a specific toast by ID, or all toasts if no ID given.</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
        <div className="block md:hidden">
          <TableMobileList>
            <TableMobileItem>
              <span className="type-body-sm text-foreground"><InlineCode>toast(message, options?)</InlineCode></span>
              <span className="type-caption text-muted-foreground">Show a default toast.</span>
            </TableMobileItem>
            <TableMobileItem>
              <span className="type-body-sm text-foreground"><InlineCode>toast.info(message, options?)</InlineCode></span>
              <span className="type-caption text-muted-foreground">Show an info toast with info icon and blue tint.</span>
            </TableMobileItem>
            <TableMobileItem>
              <span className="type-body-sm text-foreground"><InlineCode>toast.success(message, options?)</InlineCode></span>
              <span className="type-caption text-muted-foreground">Show a success toast with check icon and green tint.</span>
            </TableMobileItem>
            <TableMobileItem>
              <span className="type-body-sm text-foreground"><InlineCode>toast.warning(message, options?)</InlineCode></span>
              <span className="type-caption text-muted-foreground">Show a warning toast with alert icon and yellow tint.</span>
            </TableMobileItem>
            <TableMobileItem>
              <span className="type-body-sm text-foreground"><InlineCode>toast.error(message, options?)</InlineCode></span>
              <span className="type-caption text-muted-foreground">Show an error toast with error icon and red tint.</span>
            </TableMobileItem>
            <TableMobileItem>
              <span className="type-body-sm text-foreground"><InlineCode>toast.promise(promise, options)</InlineCode></span>
              <span className="type-caption text-muted-foreground">Show loading/success/error states for an async operation.</span>
            </TableMobileItem>
            <TableMobileItem>
              <span className="type-body-sm text-foreground"><InlineCode>toast.dismiss(id?)</InlineCode></span>
              <span className="type-caption text-muted-foreground">Dismiss a specific toast by ID, or all toasts if no ID given.</span>
            </TableMobileItem>
          </TableMobileList>
        </div>
      </div>

      {/* toast options */}
      <Heading as="h3">Toast Options</Heading>
      <p className="type-body mb-2 text-foreground max-w-prose">
        Options passed as the second argument to any <InlineCode>toast()</InlineCode> call.
      </p>
      <div className="my-6">
        <div className="hidden md:block">
          <Table size="sm">
            <TableHeader>
              <TableRow>
                <TableHead>Option</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Description</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell><InlineCode>description</InlineCode></TableCell>
                <TableCell><InlineCode>ReactNode</InlineCode></TableCell>
                <TableCell>Secondary text displayed below the title.</TableCell>
              </TableRow>
              <TableRow>
                <TableCell><InlineCode>duration</InlineCode></TableCell>
                <TableCell><InlineCode>number</InlineCode></TableCell>
                <TableCell>Override the default auto-dismiss time for this toast. Use <InlineCode>Infinity</InlineCode> for a persistent toast that must be dismissed manually.</TableCell>
              </TableRow>
              <TableRow>
                <TableCell><InlineCode>action</InlineCode></TableCell>
                <TableCell><InlineCode>{'{ label: ReactNode; onClick: () => void }'}</InlineCode></TableCell>
                <TableCell>Render an action button (e.g., "Undo") inside the toast.</TableCell>
              </TableRow>
              <TableRow>
                <TableCell><InlineCode>icon</InlineCode></TableCell>
                <TableCell><InlineCode>ReactNode</InlineCode></TableCell>
                <TableCell>Custom icon to display. Overrides the variant default.</TableCell>
              </TableRow>
              <TableRow>
                <TableCell><InlineCode>onDismiss</InlineCode></TableCell>
                <TableCell><InlineCode>{'(toast) => void'}</InlineCode></TableCell>
                <TableCell>Callback fired when the toast is dismissed.</TableCell>
              </TableRow>
              <TableRow>
                <TableCell><InlineCode>onAutoClose</InlineCode></TableCell>
                <TableCell><InlineCode>{'(toast) => void'}</InlineCode></TableCell>
                <TableCell>Callback fired when the toast auto-closes after its duration.</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
        <div className="block md:hidden">
          <TableMobileList>
            <TableMobileItem>
              <span className="type-body-sm text-foreground"><strong>description</strong></span>
              <span className="type-caption text-muted-foreground"><InlineCode>ReactNode</InlineCode></span>
              <span className="type-caption text-muted-foreground">Secondary text displayed below the title.</span>
            </TableMobileItem>
            <TableMobileItem>
              <span className="type-body-sm text-foreground"><strong>duration</strong></span>
              <span className="type-caption text-muted-foreground"><InlineCode>number</InlineCode></span>
              <span className="type-caption text-muted-foreground">Override the default auto-dismiss time. Use <InlineCode>Infinity</InlineCode> for a persistent toast.</span>
            </TableMobileItem>
            <TableMobileItem>
              <span className="type-body-sm text-foreground"><strong>action</strong></span>
              <span className="type-caption text-muted-foreground"><InlineCode>{'{ label: ReactNode; onClick: () => void }'}</InlineCode></span>
              <span className="type-caption text-muted-foreground">Render an action button (e.g., "Undo") inside the toast.</span>
            </TableMobileItem>
            <TableMobileItem>
              <span className="type-body-sm text-foreground"><strong>icon</strong></span>
              <span className="type-caption text-muted-foreground"><InlineCode>ReactNode</InlineCode></span>
              <span className="type-caption text-muted-foreground">Custom icon to display. Overrides the variant default.</span>
            </TableMobileItem>
            <TableMobileItem>
              <span className="type-body-sm text-foreground"><strong>onDismiss</strong></span>
              <span className="type-caption text-muted-foreground"><InlineCode>{'(toast) => void'}</InlineCode></span>
              <span className="type-caption text-muted-foreground">Callback fired when the toast is dismissed.</span>
            </TableMobileItem>
            <TableMobileItem>
              <span className="type-body-sm text-foreground"><strong>onAutoClose</strong></span>
              <span className="type-caption text-muted-foreground"><InlineCode>{'(toast) => void'}</InlineCode></span>
              <span className="type-caption text-muted-foreground">Callback fired when the toast auto-closes after its duration.</span>
            </TableMobileItem>
          </TableMobileList>
        </div>
      </div>

    </Container>
  )
}
