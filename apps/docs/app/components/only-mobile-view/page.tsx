'use client'

import { Container, Icon } from '@umichkisa-ds/web'
import { ComponentPreview } from '@/components/ComponentPreview'

const basicCode = `import { OnlyMobileView } from '@umichkisa-ds/web'

<OnlyMobileView>
  <div className="p-4">
    <h1 className="type-h3 text-foreground">Mobile App</h1>
    <p className="type-body text-foreground">This content is only visible on mobile screens.</p>
  </div>
</OnlyMobileView>`

const customMessageCode = `import { OnlyMobileView } from '@umichkisa-ds/web'

<OnlyMobileView message="Please use a mobile device to access this page.">
  <div className="p-4">
    <h1 className="type-h3 text-foreground">Mobile App</h1>
    <p className="type-body text-foreground">This content is only visible on mobile screens.</p>
  </div>
</OnlyMobileView>`

export default function OnlyMobileViewPage() {
  return (
    <Container size="md" as="article">

      {/* -- Header -------------------------------------------------- */}
      <h1 className="type-h1 font-sejong-bold tracking-tight mt-8 mb-4 text-foreground">OnlyMobileView</h1>
      <p className="type-body mb-4 text-foreground max-w-prose">
        Gate component that renders its children on mobile screens and displays
        a full-screen overlay on desktop, indicating the page is mobile-only.
      </p>
      <p className="type-body-sm mb-8 text-muted-foreground max-w-prose">
        Place OnlyMobileView as the outermost wrapper of your page component.
        On screens 768px and wider, children are hidden and a fixed full-screen
        overlay with a smartphone icon and message is shown instead, covering
        all other content including navigation.
      </p>

      {/* -- Examples ------------------------------------------------- */}
      <h2 className="type-h2 mt-8 mb-4 text-foreground">Examples</h2>

      {/* Basic */}
      <h3 className="type-h3 mt-6 mb-2 text-foreground">Basic</h3>
      <p className="type-body mb-2 text-foreground max-w-prose">
        Wrap page content in OnlyMobileView. Resize the browser below 768px to
        see the children; above 768px the overlay appears. The preview below
        simulates the overlay in a contained box — the actual component covers
        the full viewport.
      </p>
      <ComponentPreview code={basicCode}>
        <div className="w-full">
          <div className="relative w-full h-48 border border-border rounded-md overflow-hidden">
            {/* Simulated mobile content */}
            <div className="p-4">
              <p className="type-body-sm text-muted-foreground">
                Resize the browser below 768px to see the mobile content. On desktop, the overlay covers this area.
              </p>
            </div>
            {/* Inline simulation of overlay for desktop viewers */}
            <div className="hidden md:flex absolute inset-0 flex-col items-center justify-center gap-4 bg-surface">
              <div className="text-brand-primary">
                <Icon name="smartphone" size="xl" />
              </div>
              <p className="type-h3 text-foreground text-center px-4">
                Only Mobile View is supported.
              </p>
            </div>
          </div>
        </div>
      </ComponentPreview>

      {/* Custom message */}
      <h3 className="type-h3 mt-8 mb-2 text-foreground">Custom message</h3>
      <p className="type-body mb-2 text-foreground max-w-prose">
        Pass a custom string via the{' '}
        <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">message</code>{' '}
        prop to override the default overlay text.
      </p>
      <ComponentPreview code={customMessageCode}>
        <div className="w-full">
          <div className="relative w-full h-48 border border-border rounded-md overflow-hidden">
            <div className="p-4">
              <p className="type-body-sm text-muted-foreground">
                Resize the browser below 768px to see the mobile content.
              </p>
            </div>
            <div className="hidden md:flex absolute inset-0 flex-col items-center justify-center gap-4 bg-surface">
              <div className="text-brand-primary">
                <Icon name="smartphone" size="xl" />
              </div>
              <p className="type-h3 text-foreground text-center px-4">
                Please use a mobile device to access this page.
              </p>
            </div>
          </div>
        </div>
      </ComponentPreview>

      {/* -- API Reference -------------------------------------------- */}
      <h2 className="type-h2 mt-8 mb-4 text-foreground">API Reference</h2>
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
              <td className="px-4 py-3 type-body-sm text-foreground">Content rendered on mobile screens (below 768px).</td>
            </tr>
            <tr className="border-b border-border">
              <td className="px-4 py-3 text-foreground"><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle">message</code></td>
              <td className="px-4 py-3 text-foreground"><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle">string</code></td>
              <td className="px-4 py-3 text-foreground"><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle">&quot;Only Mobile View is supported.&quot;</code></td>
              <td className="px-4 py-3 type-body-sm text-foreground">Text displayed on the desktop overlay.</td>
            </tr>
            <tr className="border-b border-border">
              <td className="px-4 py-3 text-foreground"><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle">className</code></td>
              <td className="px-4 py-3 text-foreground"><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle">string</code></td>
              <td className="px-4 py-3 type-body-sm text-foreground">—</td>
              <td className="px-4 py-3 type-body-sm text-foreground">Additional Tailwind classes applied to the outer wrapper div.</td>
            </tr>
          </tbody>
        </table>
      </div>

    </Container>
  )
}
