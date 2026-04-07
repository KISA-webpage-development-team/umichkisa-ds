import {
  Container,
  Alert,
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

const variantsCode = `import { Alert } from '@umichkisa-ds/web'

<div className="flex flex-col gap-4">
  <Alert variant="info" title="Information">
    This is an informational message with helpful context.
  </Alert>
  <Alert variant="success" title="Success">
    Your action was completed successfully.
  </Alert>
  <Alert variant="warning" title="Warning">
    Please review this before proceeding.
  </Alert>
  <Alert variant="error" title="Error">
    Something went wrong. Please try again.
  </Alert>
</div>`

const descriptionOnlyCode = `import { Alert } from '@umichkisa-ds/web'

<Alert variant="info">
  You can display an alert with only description content and no title.
</Alert>`

const customIconCode = `import { Alert } from '@umichkisa-ds/web'

<Alert variant="info" icon="eye" title="Visibility notice">
  This content is publicly visible to all members of your organization.
</Alert>`

const withoutIconCode = `import { Alert } from '@umichkisa-ds/web'

<Alert variant="info" icon={null} title="Plain text alert">
  Icons can be hidden entirely by passing null to the icon prop.
</Alert>`

const formValidationCode = `import { Alert } from '@umichkisa-ds/web'

<div className="flex flex-col gap-4 w-full">
  <Alert variant="error" title="Please fix the following errors before submitting">
    <ul className="list-disc pl-4 mt-2 flex flex-col gap-2">
      <li>Email address is required</li>
      <li>Password must be at least 8 characters</li>
      <li>You must agree to the terms of service</li>
    </ul>
  </Alert>
  <div className="flex flex-col gap-4 rounded-lg border border-border p-4">
    <div className="flex flex-col gap-2">
      <span className="type-body-sm text-foreground">Email</span>
      <div className="h-10 rounded-md border border-error bg-surface px-3" />
    </div>
    <div className="flex flex-col gap-2">
      <span className="type-body-sm text-foreground">Password</span>
      <div className="h-10 rounded-md border border-error bg-surface px-3" />
    </div>
  </div>
</div>`

const successConfirmationCode = `import { Alert } from '@umichkisa-ds/web'

<div className="flex flex-col gap-4 w-full">
  <Alert variant="success" title="Profile updated successfully">
    Your changes have been saved and will take effect immediately.
  </Alert>
  <div className="flex flex-col gap-4 rounded-lg border border-border p-4">
    <div className="flex flex-col gap-2">
      <span className="type-body-sm text-foreground">Display name</span>
      <div className="flex h-10 items-center rounded-md border border-border bg-surface px-3">
        <span className="type-body-sm text-muted-foreground">Jioh In</span>
      </div>
    </div>
    <div className="flex flex-col gap-2">
      <span className="type-body-sm text-foreground">Bio</span>
      <div className="flex h-16 items-start rounded-md border border-border bg-surface px-3 pt-2">
        <span className="type-body-sm text-muted-foreground">Design systems enthusiast</span>
      </div>
    </div>
  </div>
</div>`

const infoCalloutCode = `import { Alert } from '@umichkisa-ds/web'

<div className="flex flex-col gap-4 w-full">
  <p className="type-body text-foreground">
    To get started with the KISA Design System, install the package
    from the GitHub registry and import the CSS bundle in your root layout.
  </p>
  <Alert variant="info" title="Prerequisite">
    You must be using Tailwind CSS v4 or later. The design system tokens
    are defined using the CSS-first configuration format.
  </Alert>
  <p className="type-body text-foreground">
    Once installed, you can import any component directly and start building
    your interface with consistent tokens and patterns.
  </p>
</div>`

export default async function AlertPage() {
  const [variantsHighlighted, descriptionOnlyHighlighted, customIconHighlighted, withoutIconHighlighted, formValidationHighlighted, successConfirmationHighlighted, infoCalloutHighlighted] = await Promise.all([
    highlight(variantsCode),
    highlight(descriptionOnlyCode),
    highlight(customIconCode),
    highlight(withoutIconCode),
    highlight(formValidationCode),
    highlight(successConfirmationCode),
    highlight(infoCalloutCode),
  ]);

  return (
    <Container size="md" as="article">

      {/* -- Header -------------------------------------------------- */}
      <h1 className="type-h1 mb-4 text-foreground">Alert</h1>
      <p className="type-body mb-4 text-foreground max-w-prose">
        Static inline feedback message for communicating status, warnings,
        errors, and informational content to users.
      </p>
      <Alert variant="info" className="mb-8">
        Use Alert for persistent, contextual messages that appear inline with
        content. For transient notifications that appear temporarily and
        dismiss automatically, use Toast.
      </Alert>

      {/* -- Examples ------------------------------------------------- */}
      <h2 className="type-h2 mt-8 mb-4 text-foreground">Examples</h2>

      {/* Variants */}
      <h3 className="type-h3 mt-6 mb-2 text-foreground">Variants</h3>
      <p className="type-body mb-2 text-foreground max-w-prose">
        Four semantic variants communicate different levels of feedback. Each
        variant applies a distinct border color, background, and default icon.
      </p>
      <ComponentPreview code={variantsCode} highlightedCode={variantsHighlighted}>
        <div className="flex flex-col gap-4 w-full">
          <Alert variant="info" title="Information">
            This is an informational message with helpful context.
          </Alert>
          <Alert variant="success" title="Success">
            Your action was completed successfully.
          </Alert>
          <Alert variant="warning" title="Warning">
            Please review this before proceeding.
          </Alert>
          <Alert variant="error" title="Error">
            Something went wrong. Please try again.
          </Alert>
        </div>
      </ComponentPreview>

      {/* Description only */}
      <h3 className="type-h3 mt-8 mb-2 text-foreground">Description only</h3>
      <p className="type-body mb-2 text-foreground max-w-prose">
        Omit the{' '}
        <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">title</code>{' '}
        prop to render a compact alert with only description content.
      </p>
      <ComponentPreview code={descriptionOnlyCode} highlightedCode={descriptionOnlyHighlighted}>
        <div className="w-full">
          <Alert variant="info">
            You can display an alert with only description content and no title.
          </Alert>
        </div>
      </ComponentPreview>

      {/* Custom icon */}
      <h3 className="type-h3 mt-8 mb-2 text-foreground">Custom icon</h3>
      <p className="type-body mb-2 text-foreground max-w-prose">
        Override the default variant icon by passing a Lucide icon name to the{' '}
        <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">icon</code>{' '}
        prop. The icon must be registered in the{' '}
        <a href="/components/icon" className="text-link underline hover:text-brand-primary">Icon</a>{' '}
        registry.
      </p>
      <ComponentPreview code={customIconCode} highlightedCode={customIconHighlighted}>
        <div className="w-full">
          <Alert variant="info" icon="eye" title="Visibility notice">
            This content is publicly visible to all members of your organization.
          </Alert>
        </div>
      </ComponentPreview>

      {/* Without icon */}
      <h3 className="type-h3 mt-8 mb-2 text-foreground">Without icon</h3>
      <p className="type-body mb-2 text-foreground max-w-prose">
        Pass{' '}
        <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">
          icon={'{null}'}
        </code>{' '}
        to hide the icon entirely for a text-only alert.
      </p>
      <ComponentPreview code={withoutIconCode} highlightedCode={withoutIconHighlighted}>
        <div className="w-full">
          <Alert variant="info" icon={null} title="Plain text alert">
            Icons can be hidden entirely by passing null to the icon prop.
          </Alert>
        </div>
      </ComponentPreview>

      {/* Form validation error */}
      <h3 className="type-h3 mt-8 mb-2 text-foreground">Form validation error</h3>
      <p className="type-body mb-2 text-foreground max-w-prose">
        A common pattern for displaying validation errors above a form. The
        alert summarizes what needs attention while the form fields below
        highlight individual errors.
      </p>
      <ComponentPreview code={formValidationCode} highlightedCode={formValidationHighlighted}>
        <div className="flex flex-col gap-4 w-full">
          <Alert variant="error" title="Please fix the following errors before submitting">
            <ul className="list-disc pl-4 mt-2 flex flex-col gap-2">
              <li>Email address is required</li>
              <li>Password must be at least 8 characters</li>
              <li>You must agree to the terms of service</li>
            </ul>
          </Alert>
          <div className="flex flex-col gap-4 rounded-lg border border-border p-4">
            <div className="flex flex-col gap-1">
              <span className="type-body-sm text-foreground">Email</span>
              <div className="h-10 rounded-md border border-error bg-surface px-3" />
            </div>
            <div className="flex flex-col gap-1">
              <span className="type-body-sm text-foreground">Password</span>
              <div className="h-10 rounded-md border border-error bg-surface px-3" />
            </div>
          </div>
        </div>
      </ComponentPreview>

      {/* Success confirmation */}
      <h3 className="type-h3 mt-8 mb-2 text-foreground">Success confirmation</h3>
      <p className="type-body mb-2 text-foreground max-w-prose">
        A confirmation banner placed directly above the form the user just edited.
      </p>
      <ComponentPreview code={successConfirmationCode} highlightedCode={successConfirmationHighlighted}>
        <div className="flex flex-col gap-4 w-full">
          <Alert variant="success" title="Profile updated successfully">
            Your changes have been saved and will take effect immediately.
          </Alert>
          <div className="flex flex-col gap-4 rounded-lg border border-border p-4">
            <div className="flex flex-col gap-1">
              <span className="type-body-sm text-foreground">Display name</span>
              <div className="flex h-10 items-center rounded-md border border-border bg-surface px-3">
                <span className="type-body-sm text-muted-foreground">Jioh In</span>
              </div>
            </div>
            <div className="flex flex-col gap-1">
              <span className="type-body-sm text-foreground">Bio</span>
              <div className="flex h-16 items-start rounded-md border border-border bg-surface px-3 pt-2">
                <span className="type-body-sm text-muted-foreground">Design systems enthusiast</span>
              </div>
            </div>
          </div>
        </div>
      </ComponentPreview>

      {/* Info callout in content */}
      <h3 className="type-h3 mt-8 mb-2 text-foreground">Info callout in content</h3>
      <p className="type-body mb-2 text-foreground max-w-prose">
        An informational alert used as an aside within body content, drawing
        attention to a prerequisite or important note.
      </p>
      <ComponentPreview code={infoCalloutCode} highlightedCode={infoCalloutHighlighted}>
        <div className="flex flex-col gap-4 w-full">
          <p className="type-body text-foreground">
            To get started with the KISA Design System, install the package
            from the GitHub registry and import the CSS bundle in your root layout.
          </p>
          <Alert variant="info" title="Prerequisite">
            You must be using Tailwind CSS v4 or later. The design system tokens
            are defined using the CSS-first configuration format.
          </Alert>
          <p className="type-body text-foreground">
            Once installed, you can import any component directly and start building
            your interface with consistent tokens and patterns.
          </p>
        </div>
      </ComponentPreview>

      {/* -- API Reference -------------------------------------------- */}
      <h2 className="type-h2 mt-8 mb-4 text-foreground">API Reference</h2>
      <p className="type-body mb-4 text-foreground max-w-prose">
        All props are optional. Extends native{' '}
        <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">
          &lt;div&gt;
        </code>{' '}
        attributes — pass{' '}
        <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">
          role=&quot;alert&quot;
        </code>{' '}
        for dynamic alerts that should be announced by screen readers.
      </p>
      <div className="hidden md:block my-6">
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
              <TableCell><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle">variant</code></TableCell>
              <TableCell><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle">&quot;info&quot; | &quot;success&quot; | &quot;warning&quot; | &quot;error&quot;</code></TableCell>
              <TableCell><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle">&quot;info&quot;</code></TableCell>
              <TableCell>The visual style and default icon of the alert.</TableCell>
            </TableRow>
            <TableRow>
              <TableCell><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle">title</code></TableCell>
              <TableCell><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle">string</code></TableCell>
              <TableCell>—</TableCell>
              <TableCell>Optional bold heading displayed above the description.</TableCell>
            </TableRow>
            <TableRow>
              <TableCell><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle">icon</code></TableCell>
              <TableCell><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle">IconName | null</code></TableCell>
              <TableCell>(variant default)</TableCell>
              <TableCell>Override the default icon. Pass a Lucide icon name or null to hide.</TableCell>
            </TableRow>
            <TableRow>
              <TableCell><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle">children</code></TableCell>
              <TableCell><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle">ReactNode</code></TableCell>
              <TableCell>—</TableCell>
              <TableCell>Description content displayed in the alert body.</TableCell>
            </TableRow>
            <TableRow>
              <TableCell><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle">className</code></TableCell>
              <TableCell><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle">string</code></TableCell>
              <TableCell>—</TableCell>
              <TableCell>Merged via cn(). Use for layout utilities only.</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
      <div className="block md:hidden my-6">
        <TableMobileList>
          <TableMobileItem>
            <span className="type-body-sm text-foreground"><strong>variant</strong></span>
            <span className="type-caption text-muted-foreground"><code className="rounded px-1 py-0.5 font-mono bg-surface-subtle">&quot;info&quot; | &quot;success&quot; | &quot;warning&quot; | &quot;error&quot;</code> · default <code className="rounded px-1 py-0.5 font-mono bg-surface-subtle">&quot;info&quot;</code></span>
            <span className="type-caption text-muted-foreground">The visual style and default icon of the alert.</span>
          </TableMobileItem>
          <TableMobileItem>
            <span className="type-body-sm text-foreground"><strong>title</strong></span>
            <span className="type-caption text-muted-foreground"><code className="rounded px-1 py-0.5 font-mono bg-surface-subtle">string</code></span>
            <span className="type-caption text-muted-foreground">Optional bold heading displayed above the description.</span>
          </TableMobileItem>
          <TableMobileItem>
            <span className="type-body-sm text-foreground"><strong>icon</strong></span>
            <span className="type-caption text-muted-foreground"><code className="rounded px-1 py-0.5 font-mono bg-surface-subtle">IconName | null</code> · default (variant default)</span>
            <span className="type-caption text-muted-foreground">Override the default icon. Pass a Lucide icon name or null to hide.</span>
          </TableMobileItem>
          <TableMobileItem>
            <span className="type-body-sm text-foreground"><strong>children</strong></span>
            <span className="type-caption text-muted-foreground"><code className="rounded px-1 py-0.5 font-mono bg-surface-subtle">ReactNode</code></span>
            <span className="type-caption text-muted-foreground">Description content displayed in the alert body.</span>
          </TableMobileItem>
          <TableMobileItem>
            <span className="type-body-sm text-foreground"><strong>className</strong></span>
            <span className="type-caption text-muted-foreground"><code className="rounded px-1 py-0.5 font-mono bg-surface-subtle">string</code></span>
            <span className="type-caption text-muted-foreground">Merged via cn(). Use for layout utilities only.</span>
          </TableMobileItem>
        </TableMobileList>
      </div>

      {/* -- Accessibility --------------------------------------------- */}
      <h2 className="type-h2 mt-8 mb-4 text-foreground">Accessibility</h2>
      <p className="type-body mb-4 text-foreground max-w-prose">
        Static alerts present on initial render do not need an explicit ARIA
        role — the visible icon and color convey meaning. For alerts that
        appear dynamically in response to user action (e.g., after form
        submission), pass{' '}
        <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">
          role=&quot;alert&quot;
        </code>{' '}
        so screen readers announce the message immediately.
      </p>
      <p className="type-body mb-4 text-foreground max-w-prose">
        Use{' '}
        <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">
          role=&quot;status&quot;
        </code>{' '}
        instead for non-critical updates that should not interrupt the user.
      </p>

    </Container>
  )
}
