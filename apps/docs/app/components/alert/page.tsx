import { Container, Alert } from '@umichkisa-ds/web'
import { ComponentPreview } from '@/components/ComponentPreview'

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

export default function AlertPage() {
  return (
    <Container size="md" as="article">

      {/* -- Header -------------------------------------------------- */}
      <h1 className="type-h1 font-sejong-bold tracking-tight mt-8 mb-4 text-foreground">Alert</h1>
      <p className="type-body mb-4 text-foreground max-w-prose">
        Static inline feedback message for communicating status, warnings,
        errors, and informational content to users.
      </p>
      <p className="type-body-sm mb-8 text-muted-foreground max-w-prose">
        Use Alert for persistent, contextual messages that appear inline with
        content. For transient notifications that appear temporarily and
        dismiss automatically, use Toast.
      </p>

      {/* -- Examples ------------------------------------------------- */}
      <h2 className="type-h2 mt-8 mb-4 text-foreground">Examples</h2>

      {/* Variants */}
      <h3 className="type-h3 mt-6 mb-2 text-foreground">Variants</h3>
      <p className="type-body mb-2 text-foreground max-w-prose">
        Four semantic variants communicate different levels of feedback. Each
        variant applies a distinct border color, background, and default icon.
      </p>
      <ComponentPreview code={variantsCode}>
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
        </div>
      </ComponentPreview>

      {/* Description only */}
      <h3 className="type-h3 mt-8 mb-2 text-foreground">Description only</h3>
      <p className="type-body mb-2 text-foreground max-w-prose">
        Omit the{' '}
        <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">title</code>{' '}
        prop to render a compact alert with only description content.
      </p>
      <ComponentPreview code={descriptionOnlyCode}>
        <Alert variant="info">
          You can display an alert with only description content and no title.
        </Alert>
      </ComponentPreview>

      {/* Custom icon */}
      <h3 className="type-h3 mt-8 mb-2 text-foreground">Custom icon</h3>
      <p className="type-body mb-2 text-foreground max-w-prose">
        Override the default variant icon by passing a Lucide icon name to the{' '}
        <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">icon</code>{' '}
        prop. The icon must be registered in the icon registry.
      </p>
      <ComponentPreview code={customIconCode}>
        <Alert variant="info" icon="eye" title="Visibility notice">
          This content is publicly visible to all members of your organization.
        </Alert>
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
      <ComponentPreview code={withoutIconCode}>
        <Alert variant="info" icon={null} title="Plain text alert">
          Icons can be hidden entirely by passing null to the icon prop.
        </Alert>
      </ComponentPreview>

      {/* Form validation error */}
      <h3 className="type-h3 mt-8 mb-2 text-foreground">Form validation error</h3>
      <p className="type-body mb-2 text-foreground max-w-prose">
        A common pattern for displaying validation errors above a form. The
        alert summarizes what needs attention while the form fields below
        highlight individual errors.
      </p>
      <ComponentPreview code={formValidationCode}>
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
        A success alert shown after a form submission, displayed above the form
        content to confirm the action was completed.
      </p>
      <ComponentPreview code={successConfirmationCode}>
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
      <ComponentPreview code={infoCalloutCode}>
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
        attributes.
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
              <td className="px-4 py-3 text-foreground"><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle">variant</code></td>
              <td className="px-4 py-3 text-foreground"><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle">&quot;info&quot; | &quot;success&quot; | &quot;warning&quot; | &quot;error&quot;</code></td>
              <td className="px-4 py-3 text-foreground"><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle">&quot;info&quot;</code></td>
              <td className="px-4 py-3 type-body-sm text-foreground">The visual style and default icon of the alert.</td>
            </tr>
            <tr className="border-b border-border">
              <td className="px-4 py-3 text-foreground"><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle">title</code></td>
              <td className="px-4 py-3 text-foreground"><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle">string</code></td>
              <td className="px-4 py-3 type-body-sm text-foreground">—</td>
              <td className="px-4 py-3 type-body-sm text-foreground">Optional bold heading displayed above the description.</td>
            </tr>
            <tr className="border-b border-border">
              <td className="px-4 py-3 text-foreground"><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle">icon</code></td>
              <td className="px-4 py-3 text-foreground"><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle">IconName | null</code></td>
              <td className="px-4 py-3 type-body-sm text-foreground">(variant default)</td>
              <td className="px-4 py-3 type-body-sm text-foreground">Override the default icon. Pass a Lucide icon name or null to hide.</td>
            </tr>
            <tr className="border-b border-border">
              <td className="px-4 py-3 text-foreground"><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle">children</code></td>
              <td className="px-4 py-3 text-foreground"><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle">ReactNode</code></td>
              <td className="px-4 py-3 type-body-sm text-foreground">—</td>
              <td className="px-4 py-3 type-body-sm text-foreground">Description content displayed in the alert body.</td>
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

    </Container>
  )
}
