import { Container, Table, TableBody, TableCell, TableHead, TableHeader, TableMobileItem, TableMobileList, TableRow } from '@umichkisa-ds/web'
import { ComponentPreview } from '@/components/ComponentPreview'
import { highlight } from '@/lib/highlight'
import { BasicDemo, VariantsDemo, DescriptionDemo, ActionDemo, PromiseDemo, PositionDemo } from './_demos'

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
      <h2 className="type-h2 mt-8 mb-4 text-foreground">Setup</h2>
      <p className="type-body mb-2 text-foreground max-w-prose">
        Mount the <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">{'<Toaster />'}</code> component
        once in your application's root layout. This renders the toast container
        that all <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">toast()</code> calls
        target.
      </p>
      <ComponentPreview code={setupCode} highlightedCode={setupHighlighted}>
        <div className="type-body-sm text-muted-foreground">
          Add the Toaster component to your root layout — see the code panel for
          the full example.
        </div>
      </ComponentPreview>

      {/* -- Basic Usage --------------------------------------------- */}
      <h2 className="type-h2 mt-8 mb-4 text-foreground">Basic Usage</h2>
      <p className="type-body mb-2 text-foreground max-w-prose">
        Call <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">toast()</code> from
        anywhere in your app. Pass a string message as the first argument.
      </p>
      <ComponentPreview code={basicCode} highlightedCode={basicHighlighted}>
        <BasicDemo />
      </ComponentPreview>

      {/* -- Variants ------------------------------------------------ */}
      <h2 className="type-h2 mt-8 mb-4 text-foreground">Variants</h2>
      <p className="type-body mb-2 text-foreground max-w-prose">
        Five variants map to feedback states. The default variant uses a neutral
        style. The four feedback variants (<code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">info</code>,{' '}
        <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">success</code>,{' '}
        <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">warning</code>,{' '}
        <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">error</code>)
        add a colored left border, tinted background, and matching icon —
        consistent with the Alert component.
      </p>
      <ComponentPreview code={variantsCode} highlightedCode={variantsHighlighted}>
        <VariantsDemo />
      </ComponentPreview>

      {/* -- With Description ---------------------------------------- */}
      <h2 className="type-h2 mt-8 mb-4 text-foreground">With Description</h2>
      <p className="type-body mb-2 text-foreground max-w-prose">
        Pass a <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">description</code> option
        to add secondary text below the title.
      </p>
      <ComponentPreview code={descriptionCode} highlightedCode={descriptionHighlighted}>
        <DescriptionDemo />
      </ComponentPreview>

      {/* -- With Action --------------------------------------------- */}
      <h2 className="type-h2 mt-8 mb-4 text-foreground">With Action</h2>
      <p className="type-body mb-2 text-foreground max-w-prose">
        Add an action button to the toast with the <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">action</code> option.
        Provide a <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">label</code> and
        an <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">onClick</code> handler.
      </p>
      <ComponentPreview code={actionCode} highlightedCode={actionHighlighted}>
        <ActionDemo />
      </ComponentPreview>

      {/* -- Promise ------------------------------------------------- */}
      <h2 className="type-h2 mt-8 mb-4 text-foreground">Promise</h2>
      <p className="type-body mb-2 text-foreground max-w-prose">
        Use <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">toast.promise()</code> to
        show loading, success, and error states for async operations. The toast
        updates automatically as the promise resolves or rejects.
      </p>
      <ComponentPreview code={promiseCode} highlightedCode={promiseHighlighted}>
        <PromiseDemo />
      </ComponentPreview>

      {/* -- Positioning --------------------------------------------- */}
      <h2 className="type-h2 mt-8 mb-4 text-foreground">Positioning</h2>
      <p className="type-body mb-2 text-foreground max-w-prose">
        The <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">position</code> prop
        on <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">{'<Toaster />'}</code> controls
        where toasts appear. Click a position below to try it out.
      </p>
      <ComponentPreview code={positionCode} highlightedCode={positionHighlighted}>
        <PositionDemo />
      </ComponentPreview>

      {/* -- API Reference ------------------------------------------- */}
      <h2 className="type-h2 mt-8 mb-4 text-foreground">API Reference</h2>
      <p className="type-body mb-2 text-foreground max-w-prose">
        Reference for the <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">{'<Toaster />'}</code> provider,
        the imperative <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">toast()</code> API,
        and per-toast options.
      </p>

      {/* Toaster */}
      <h3 className="type-h3 mt-6 mb-2 text-foreground">Toaster</h3>
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
                <TableCell><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">position</code></TableCell>
                <TableCell><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">{'"top-left" | "top-center" | "top-right" | "bottom-left" | "bottom-center" | "bottom-right"'}</code></TableCell>
                <TableCell><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">"top-center"</code></TableCell>
                <TableCell>Where toasts appear on screen.</TableCell>
              </TableRow>
              <TableRow>
                <TableCell><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">duration</code></TableCell>
                <TableCell><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">number</code></TableCell>
                <TableCell><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">4000</code></TableCell>
                <TableCell>Default auto-dismiss time in milliseconds.</TableCell>
              </TableRow>
              <TableRow>
                <TableCell><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">expand</code></TableCell>
                <TableCell><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">boolean</code></TableCell>
                <TableCell><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">false</code></TableCell>
                <TableCell>Expand all toasts by default instead of stacking.</TableCell>
              </TableRow>
              <TableRow>
                <TableCell><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">visibleToasts</code></TableCell>
                <TableCell><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">number</code></TableCell>
                <TableCell><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">3</code></TableCell>
                <TableCell>Maximum number of visible toasts at once.</TableCell>
              </TableRow>
              <TableRow>
                <TableCell><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">offset</code></TableCell>
                <TableCell><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">string | number</code></TableCell>
                <TableCell>—</TableCell>
                <TableCell>Distance from the edge of the viewport.</TableCell>
              </TableRow>
              <TableRow>
                <TableCell><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">gap</code></TableCell>
                <TableCell><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">number</code></TableCell>
                <TableCell><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">14</code></TableCell>
                <TableCell>Gap between stacked toasts in pixels.</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
        <div className="block md:hidden">
          <TableMobileList>
            <TableMobileItem>
              <span className="type-body-sm text-foreground"><strong>position</strong></span>
              <span className="type-caption text-muted-foreground"><code className="rounded px-1 py-0.5 font-mono bg-surface-subtle">{'"top-left" | "top-center" | "top-right" | "bottom-left" | "bottom-center" | "bottom-right"'}</code></span>
              <span className="type-caption text-muted-foreground">Default: <code className="rounded px-1 py-0.5 font-mono bg-surface-subtle">"top-center"</code> — Where toasts appear on screen.</span>
            </TableMobileItem>
            <TableMobileItem>
              <span className="type-body-sm text-foreground"><strong>duration</strong></span>
              <span className="type-caption text-muted-foreground"><code className="rounded px-1 py-0.5 font-mono bg-surface-subtle">number</code></span>
              <span className="type-caption text-muted-foreground">Default: <code className="rounded px-1 py-0.5 font-mono bg-surface-subtle">4000</code> — Default auto-dismiss time in milliseconds.</span>
            </TableMobileItem>
            <TableMobileItem>
              <span className="type-body-sm text-foreground"><strong>expand</strong></span>
              <span className="type-caption text-muted-foreground"><code className="rounded px-1 py-0.5 font-mono bg-surface-subtle">boolean</code></span>
              <span className="type-caption text-muted-foreground">Default: <code className="rounded px-1 py-0.5 font-mono bg-surface-subtle">false</code> — Expand all toasts by default instead of stacking.</span>
            </TableMobileItem>
            <TableMobileItem>
              <span className="type-body-sm text-foreground"><strong>visibleToasts</strong></span>
              <span className="type-caption text-muted-foreground"><code className="rounded px-1 py-0.5 font-mono bg-surface-subtle">number</code></span>
              <span className="type-caption text-muted-foreground">Default: <code className="rounded px-1 py-0.5 font-mono bg-surface-subtle">3</code> — Maximum number of visible toasts at once.</span>
            </TableMobileItem>
            <TableMobileItem>
              <span className="type-body-sm text-foreground"><strong>offset</strong></span>
              <span className="type-caption text-muted-foreground"><code className="rounded px-1 py-0.5 font-mono bg-surface-subtle">string | number</code></span>
              <span className="type-caption text-muted-foreground">Distance from the edge of the viewport.</span>
            </TableMobileItem>
            <TableMobileItem>
              <span className="type-body-sm text-foreground"><strong>gap</strong></span>
              <span className="type-caption text-muted-foreground"><code className="rounded px-1 py-0.5 font-mono bg-surface-subtle">number</code></span>
              <span className="type-caption text-muted-foreground">Default: <code className="rounded px-1 py-0.5 font-mono bg-surface-subtle">14</code> — Gap between stacked toasts in pixels.</span>
            </TableMobileItem>
          </TableMobileList>
        </div>
      </div>

      {/* toast() */}
      <h3 className="type-h3 mt-8 mb-2 text-foreground">toast()</h3>
      <p className="type-body mb-2 text-foreground max-w-prose">
        Imperative function to trigger toasts from anywhere in your app.
        Every <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">toast()</code> call
        returns an ID you can pass to <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">toast.dismiss(id)</code> to
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
                <TableCell><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">toast(message, options?)</code></TableCell>
                <TableCell>Show a default toast.</TableCell>
              </TableRow>
              <TableRow>
                <TableCell><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">toast.info(message, options?)</code></TableCell>
                <TableCell>Show an info toast with info icon and blue tint.</TableCell>
              </TableRow>
              <TableRow>
                <TableCell><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">toast.success(message, options?)</code></TableCell>
                <TableCell>Show a success toast with check icon and green tint.</TableCell>
              </TableRow>
              <TableRow>
                <TableCell><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">toast.warning(message, options?)</code></TableCell>
                <TableCell>Show a warning toast with alert icon and yellow tint.</TableCell>
              </TableRow>
              <TableRow>
                <TableCell><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">toast.error(message, options?)</code></TableCell>
                <TableCell>Show an error toast with error icon and red tint.</TableCell>
              </TableRow>
              <TableRow>
                <TableCell><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">toast.promise(promise, options)</code></TableCell>
                <TableCell>Show loading/success/error states for an async operation.</TableCell>
              </TableRow>
              <TableRow>
                <TableCell><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">toast.dismiss(id?)</code></TableCell>
                <TableCell>Dismiss a specific toast by ID, or all toasts if no ID given.</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
        <div className="block md:hidden">
          <TableMobileList>
            <TableMobileItem>
              <span className="type-body-sm text-foreground"><code className="rounded px-1 py-0.5 font-mono bg-surface-subtle">toast(message, options?)</code></span>
              <span className="type-caption text-muted-foreground">Show a default toast.</span>
            </TableMobileItem>
            <TableMobileItem>
              <span className="type-body-sm text-foreground"><code className="rounded px-1 py-0.5 font-mono bg-surface-subtle">toast.info(message, options?)</code></span>
              <span className="type-caption text-muted-foreground">Show an info toast with info icon and blue tint.</span>
            </TableMobileItem>
            <TableMobileItem>
              <span className="type-body-sm text-foreground"><code className="rounded px-1 py-0.5 font-mono bg-surface-subtle">toast.success(message, options?)</code></span>
              <span className="type-caption text-muted-foreground">Show a success toast with check icon and green tint.</span>
            </TableMobileItem>
            <TableMobileItem>
              <span className="type-body-sm text-foreground"><code className="rounded px-1 py-0.5 font-mono bg-surface-subtle">toast.warning(message, options?)</code></span>
              <span className="type-caption text-muted-foreground">Show a warning toast with alert icon and yellow tint.</span>
            </TableMobileItem>
            <TableMobileItem>
              <span className="type-body-sm text-foreground"><code className="rounded px-1 py-0.5 font-mono bg-surface-subtle">toast.error(message, options?)</code></span>
              <span className="type-caption text-muted-foreground">Show an error toast with error icon and red tint.</span>
            </TableMobileItem>
            <TableMobileItem>
              <span className="type-body-sm text-foreground"><code className="rounded px-1 py-0.5 font-mono bg-surface-subtle">toast.promise(promise, options)</code></span>
              <span className="type-caption text-muted-foreground">Show loading/success/error states for an async operation.</span>
            </TableMobileItem>
            <TableMobileItem>
              <span className="type-body-sm text-foreground"><code className="rounded px-1 py-0.5 font-mono bg-surface-subtle">toast.dismiss(id?)</code></span>
              <span className="type-caption text-muted-foreground">Dismiss a specific toast by ID, or all toasts if no ID given.</span>
            </TableMobileItem>
          </TableMobileList>
        </div>
      </div>

      {/* toast options */}
      <h3 className="type-h3 mt-8 mb-2 text-foreground">Toast Options</h3>
      <p className="type-body mb-2 text-foreground max-w-prose">
        Options passed as the second argument to any <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">toast()</code> call.
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
                <TableCell><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">description</code></TableCell>
                <TableCell><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">ReactNode</code></TableCell>
                <TableCell>Secondary text displayed below the title.</TableCell>
              </TableRow>
              <TableRow>
                <TableCell><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">duration</code></TableCell>
                <TableCell><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">number</code></TableCell>
                <TableCell>Override the default auto-dismiss time for this toast. Use <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">Infinity</code> for a persistent toast that must be dismissed manually.</TableCell>
              </TableRow>
              <TableRow>
                <TableCell><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">action</code></TableCell>
                <TableCell><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">{'{ label: ReactNode; onClick: () => void }'}</code></TableCell>
                <TableCell>Render an action button (e.g., "Undo") inside the toast.</TableCell>
              </TableRow>
              <TableRow>
                <TableCell><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">icon</code></TableCell>
                <TableCell><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">ReactNode</code></TableCell>
                <TableCell>Custom icon to display. Overrides the variant default.</TableCell>
              </TableRow>
              <TableRow>
                <TableCell><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">onDismiss</code></TableCell>
                <TableCell><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">{'(toast) => void'}</code></TableCell>
                <TableCell>Callback fired when the toast is dismissed.</TableCell>
              </TableRow>
              <TableRow>
                <TableCell><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">onAutoClose</code></TableCell>
                <TableCell><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">{'(toast) => void'}</code></TableCell>
                <TableCell>Callback fired when the toast auto-closes after its duration.</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
        <div className="block md:hidden">
          <TableMobileList>
            <TableMobileItem>
              <span className="type-body-sm text-foreground"><strong>description</strong></span>
              <span className="type-caption text-muted-foreground"><code className="rounded px-1 py-0.5 font-mono bg-surface-subtle">ReactNode</code></span>
              <span className="type-caption text-muted-foreground">Secondary text displayed below the title.</span>
            </TableMobileItem>
            <TableMobileItem>
              <span className="type-body-sm text-foreground"><strong>duration</strong></span>
              <span className="type-caption text-muted-foreground"><code className="rounded px-1 py-0.5 font-mono bg-surface-subtle">number</code></span>
              <span className="type-caption text-muted-foreground">Override the default auto-dismiss time. Use <code className="rounded px-1 py-0.5 font-mono bg-surface-subtle">Infinity</code> for a persistent toast.</span>
            </TableMobileItem>
            <TableMobileItem>
              <span className="type-body-sm text-foreground"><strong>action</strong></span>
              <span className="type-caption text-muted-foreground"><code className="rounded px-1 py-0.5 font-mono bg-surface-subtle">{'{ label: ReactNode; onClick: () => void }'}</code></span>
              <span className="type-caption text-muted-foreground">Render an action button (e.g., "Undo") inside the toast.</span>
            </TableMobileItem>
            <TableMobileItem>
              <span className="type-body-sm text-foreground"><strong>icon</strong></span>
              <span className="type-caption text-muted-foreground"><code className="rounded px-1 py-0.5 font-mono bg-surface-subtle">ReactNode</code></span>
              <span className="type-caption text-muted-foreground">Custom icon to display. Overrides the variant default.</span>
            </TableMobileItem>
            <TableMobileItem>
              <span className="type-body-sm text-foreground"><strong>onDismiss</strong></span>
              <span className="type-caption text-muted-foreground"><code className="rounded px-1 py-0.5 font-mono bg-surface-subtle">{'(toast) => void'}</code></span>
              <span className="type-caption text-muted-foreground">Callback fired when the toast is dismissed.</span>
            </TableMobileItem>
            <TableMobileItem>
              <span className="type-body-sm text-foreground"><strong>onAutoClose</strong></span>
              <span className="type-caption text-muted-foreground"><code className="rounded px-1 py-0.5 font-mono bg-surface-subtle">{'(toast) => void'}</code></span>
              <span className="type-caption text-muted-foreground">Callback fired when the toast auto-closes after its duration.</span>
            </TableMobileItem>
          </TableMobileList>
        </div>
      </div>

    </Container>
  )
}
