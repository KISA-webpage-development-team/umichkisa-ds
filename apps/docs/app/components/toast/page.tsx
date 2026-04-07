import { Container } from '@umichkisa-ds/web'
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
        Built on <strong>Sonner</strong>. Mount{' '}
        <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">{'<Toaster />'}</code> once,
        then call <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">toast()</code> imperatively
        from anywhere — no React state needed.
      </p>
      <p className="type-body-sm mb-8 text-muted-foreground max-w-prose">
        Use Toast for brief, non-blocking feedback (save confirmations, error
        alerts, async status). For persistent in-page messages, use Alert.
      </p>

      {/* -- Setup --------------------------------------------------- */}
      <h2 className="type-h2 mt-8 mb-4 text-foreground">Setup</h2>
      <p className="type-body mb-4 text-foreground max-w-prose">
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

      {/* Toaster */}
      <h3 className="type-h3 mt-8 mb-2 text-foreground">Toaster</h3>
      <p className="type-body mb-2 text-foreground max-w-prose">
        Provider component mounted once at the app root. Renders the toast
        container and applies DS styling.
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
              <td className="px-4 py-3 text-foreground"><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle">position</code></td>
              <td className="px-4 py-3 text-foreground"><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle">{'"top-left" | "top-center" | "top-right" | "bottom-left" | "bottom-center" | "bottom-right"'}</code></td>
              <td className="px-4 py-3 text-foreground"><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle">"top-center"</code></td>
              <td className="px-4 py-3 type-body-sm text-foreground">Where toasts appear on screen.</td>
            </tr>
            <tr className="border-b border-border">
              <td className="px-4 py-3 text-foreground"><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle">duration</code></td>
              <td className="px-4 py-3 text-foreground"><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle">number</code></td>
              <td className="px-4 py-3 text-foreground"><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle">4000</code></td>
              <td className="px-4 py-3 type-body-sm text-foreground">Default auto-dismiss time in milliseconds.</td>
            </tr>
            <tr className="border-b border-border">
              <td className="px-4 py-3 text-foreground"><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle">expand</code></td>
              <td className="px-4 py-3 text-foreground"><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle">boolean</code></td>
              <td className="px-4 py-3 text-foreground"><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle">false</code></td>
              <td className="px-4 py-3 type-body-sm text-foreground">Expand all toasts by default instead of stacking.</td>
            </tr>
            <tr className="border-b border-border">
              <td className="px-4 py-3 text-foreground"><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle">visibleToasts</code></td>
              <td className="px-4 py-3 text-foreground"><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle">number</code></td>
              <td className="px-4 py-3 text-foreground"><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle">3</code></td>
              <td className="px-4 py-3 type-body-sm text-foreground">Maximum number of visible toasts at once.</td>
            </tr>
            <tr className="border-b border-border">
              <td className="px-4 py-3 text-foreground"><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle">offset</code></td>
              <td className="px-4 py-3 text-foreground"><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle">string | number</code></td>
              <td className="px-4 py-3 type-body-sm text-foreground">—</td>
              <td className="px-4 py-3 type-body-sm text-foreground">Distance from the edge of the viewport.</td>
            </tr>
            <tr className="border-b border-border">
              <td className="px-4 py-3 text-foreground"><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle">gap</code></td>
              <td className="px-4 py-3 text-foreground"><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle">number</code></td>
              <td className="px-4 py-3 text-foreground"><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle">14</code></td>
              <td className="px-4 py-3 type-body-sm text-foreground">Gap between stacked toasts in pixels.</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* toast() */}
      <h3 className="type-h3 mt-8 mb-2 text-foreground">toast()</h3>
      <p className="type-body mb-2 text-foreground max-w-prose">
        Imperative function to trigger toasts from anywhere in your app.
        Every <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">toast()</code> call
        returns an ID you can pass to <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">toast.dismiss(id)</code> to
        close it programmatically.
      </p>
      <div className="my-6 overflow-x-auto">
        <table className="w-full border-collapse border border-border">
          <thead className="bg-surface-subtle">
            <tr>
              <th className="px-4 py-3 text-left type-caption border-b border-border text-muted-foreground">Method</th>
              <th className="px-4 py-3 text-left type-caption border-b border-border text-muted-foreground">Description</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b border-border">
              <td className="px-4 py-3 text-foreground"><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle">toast(message, options?)</code></td>
              <td className="px-4 py-3 type-body-sm text-foreground">Show a default toast.</td>
            </tr>
            <tr className="border-b border-border">
              <td className="px-4 py-3 text-foreground"><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle">toast.info(message, options?)</code></td>
              <td className="px-4 py-3 type-body-sm text-foreground">Show an info toast with info icon and blue tint.</td>
            </tr>
            <tr className="border-b border-border">
              <td className="px-4 py-3 text-foreground"><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle">toast.success(message, options?)</code></td>
              <td className="px-4 py-3 type-body-sm text-foreground">Show a success toast with check icon and green tint.</td>
            </tr>
            <tr className="border-b border-border">
              <td className="px-4 py-3 text-foreground"><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle">toast.warning(message, options?)</code></td>
              <td className="px-4 py-3 type-body-sm text-foreground">Show a warning toast with alert icon and yellow tint.</td>
            </tr>
            <tr className="border-b border-border">
              <td className="px-4 py-3 text-foreground"><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle">toast.error(message, options?)</code></td>
              <td className="px-4 py-3 type-body-sm text-foreground">Show an error toast with error icon and red tint.</td>
            </tr>
            <tr className="border-b border-border">
              <td className="px-4 py-3 text-foreground"><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle">toast.promise(promise, options)</code></td>
              <td className="px-4 py-3 type-body-sm text-foreground">Show loading/success/error states for an async operation.</td>
            </tr>
            <tr className="border-b border-border">
              <td className="px-4 py-3 text-foreground"><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle">toast.dismiss(id?)</code></td>
              <td className="px-4 py-3 type-body-sm text-foreground">Dismiss a specific toast by ID, or all toasts if no ID given.</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* toast options */}
      <h3 className="type-h3 mt-8 mb-2 text-foreground">Toast Options</h3>
      <p className="type-body mb-2 text-foreground max-w-prose">
        Options passed as the second argument to any <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">toast()</code> call.
      </p>
      <div className="my-6 overflow-x-auto">
        <table className="w-full border-collapse border border-border">
          <thead className="bg-surface-subtle">
            <tr>
              <th className="px-4 py-3 text-left type-caption border-b border-border text-muted-foreground">Option</th>
              <th className="px-4 py-3 text-left type-caption border-b border-border text-muted-foreground">Type</th>
              <th className="px-4 py-3 text-left type-caption border-b border-border text-muted-foreground">Description</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b border-border">
              <td className="px-4 py-3 text-foreground"><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle">description</code></td>
              <td className="px-4 py-3 text-foreground"><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle">ReactNode</code></td>
              <td className="px-4 py-3 type-body-sm text-foreground">Secondary text displayed below the title.</td>
            </tr>
            <tr className="border-b border-border">
              <td className="px-4 py-3 text-foreground"><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle">duration</code></td>
              <td className="px-4 py-3 text-foreground"><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle">number</code></td>
              <td className="px-4 py-3 type-body-sm text-foreground">Override the default auto-dismiss time for this toast. Use <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">Infinity</code> for a persistent toast that must be dismissed manually.</td>
            </tr>
            <tr className="border-b border-border">
              <td className="px-4 py-3 text-foreground"><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle">action</code></td>
              <td className="px-4 py-3 text-foreground"><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle">{'{ label: ReactNode; onClick: () => void }'}</code></td>
              <td className="px-4 py-3 type-body-sm text-foreground">Render an action button (e.g., "Undo") inside the toast.</td>
            </tr>
            <tr className="border-b border-border">
              <td className="px-4 py-3 text-foreground"><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle">icon</code></td>
              <td className="px-4 py-3 text-foreground"><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle">ReactNode</code></td>
              <td className="px-4 py-3 type-body-sm text-foreground">Custom icon to display. Overrides the variant default.</td>
            </tr>
            <tr className="border-b border-border">
              <td className="px-4 py-3 text-foreground"><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle">onDismiss</code></td>
              <td className="px-4 py-3 text-foreground"><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle">{'(toast) => void'}</code></td>
              <td className="px-4 py-3 type-body-sm text-foreground">Callback fired when the toast is dismissed.</td>
            </tr>
            <tr className="border-b border-border">
              <td className="px-4 py-3 text-foreground"><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle">onAutoClose</code></td>
              <td className="px-4 py-3 text-foreground"><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle">{'(toast) => void'}</code></td>
              <td className="px-4 py-3 type-body-sm text-foreground">Callback fired when the toast auto-closes after its duration.</td>
            </tr>
          </tbody>
        </table>
      </div>

    </Container>
  )
}
