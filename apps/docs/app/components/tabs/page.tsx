'use client'

import { useState } from 'react'
import { Container, Tabs, TabsList, TabsTrigger, TabsContent } from '@umichkisa-ds/web'
import { ComponentPreview } from '@/components/ComponentPreview'

const basicCode = `import { Tabs, TabsList, TabsTrigger, TabsContent } from '@umichkisa-ds/web'

<Tabs defaultValue="account">
  <TabsList>
    <TabsTrigger value="account">Account</TabsTrigger>
    <TabsTrigger value="password">Password</TabsTrigger>
    <TabsTrigger value="settings">Settings</TabsTrigger>
  </TabsList>
  <TabsContent value="account">
    Update your account settings. Set your preferred language and timezone.
  </TabsContent>
  <TabsContent value="password">
    Change your password. After saving, you'll be logged out.
  </TabsContent>
  <TabsContent value="settings">
    Manage your notification preferences and privacy settings.
  </TabsContent>
</Tabs>`

const pillCode = `import { Tabs, TabsList, TabsTrigger, TabsContent } from '@umichkisa-ds/web'

<Tabs defaultValue="account">
  <TabsList variant="pill">
    <TabsTrigger value="account">Account</TabsTrigger>
    <TabsTrigger value="password">Password</TabsTrigger>
    <TabsTrigger value="settings">Settings</TabsTrigger>
  </TabsList>
  <TabsContent value="account">
    Update your account settings. Set your preferred language and timezone.
  </TabsContent>
  <TabsContent value="password">
    Change your password. After saving, you'll be logged out.
  </TabsContent>
  <TabsContent value="settings">
    Manage your notification preferences and privacy settings.
  </TabsContent>
</Tabs>`

const sizeCode = `import { Tabs, TabsList, TabsTrigger, TabsContent } from '@umichkisa-ds/web'

{/* Small */}
<Tabs defaultValue="account">
  <TabsList size="sm">
    <TabsTrigger value="account">Account</TabsTrigger>
    <TabsTrigger value="password">Password</TabsTrigger>
    <TabsTrigger value="settings">Settings</TabsTrigger>
  </TabsList>
  <TabsContent value="account">Small tab content.</TabsContent>
</Tabs>

{/* Medium (default) */}
<Tabs defaultValue="account">
  <TabsList size="md">
    <TabsTrigger value="account">Account</TabsTrigger>
    <TabsTrigger value="password">Password</TabsTrigger>
    <TabsTrigger value="settings">Settings</TabsTrigger>
  </TabsList>
  <TabsContent value="account">Medium tab content.</TabsContent>
</Tabs>`

const fullWidthCode = `import { Tabs, TabsList, TabsTrigger, TabsContent } from '@umichkisa-ds/web'

<Tabs defaultValue="account">
  <TabsList fullWidth>
    <TabsTrigger value="account">Account</TabsTrigger>
    <TabsTrigger value="password">Password</TabsTrigger>
    <TabsTrigger value="settings">Settings</TabsTrigger>
  </TabsList>
  <TabsContent value="account">
    Update your account settings. Set your preferred language and timezone.
  </TabsContent>
  <TabsContent value="password">
    Change your password. After saving, you'll be logged out.
  </TabsContent>
  <TabsContent value="settings">
    Manage your notification preferences and privacy settings.
  </TabsContent>
</Tabs>`

const disabledCode = `import { Tabs, TabsList, TabsTrigger, TabsContent } from '@umichkisa-ds/web'

<Tabs defaultValue="account">
  <TabsList>
    <TabsTrigger value="account">Account</TabsTrigger>
    <TabsTrigger value="password" disabled>Password</TabsTrigger>
    <TabsTrigger value="settings">Settings</TabsTrigger>
  </TabsList>
  <TabsContent value="account">
    Update your account settings. Set your preferred language and timezone.
  </TabsContent>
  <TabsContent value="password">
    Change your password. After saving, you'll be logged out.
  </TabsContent>
  <TabsContent value="settings">
    Manage your notification preferences and privacy settings.
  </TabsContent>
</Tabs>`

const controlledCode = `import { useState } from 'react'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@umichkisa-ds/web'

const [activeTab, setActiveTab] = useState('account')

<Tabs value={activeTab} onValueChange={setActiveTab}>
  <TabsList>
    <TabsTrigger value="account">Account</TabsTrigger>
    <TabsTrigger value="password">Password</TabsTrigger>
    <TabsTrigger value="settings">Settings</TabsTrigger>
  </TabsList>
  <TabsContent value="account">
    Update your account settings. Set your preferred language and timezone.
  </TabsContent>
  <TabsContent value="password">
    Change your password. After saving, you'll be logged out.
  </TabsContent>
  <TabsContent value="settings">
    Manage your notification preferences and privacy settings.
  </TabsContent>
</Tabs>
<p>Active tab: {activeTab}</p>`

export default function TabsPage() {
  const [activeTab, setActiveTab] = useState('account')

  return (
    <Container size="md" as="article">

      {/* -- Header -------------------------------------------------- */}
      <header>
        <h1 className="type-h1 text-foreground">Tabs</h1>
        <p className="type-body text-muted-foreground mt-2">
          Organize content into multiple panels, activated one at a time.
          Tabs keep related content grouped while reducing clutter. Use underline tabs for
          page-level navigation and pill tabs for in-context switching.
        </p>
      </header>

      {/* -- Basic --------------------------------------------------- */}
      <section className="mt-10">
        <h2 className="type-h3 text-foreground">Basic</h2>
        <p className="type-body-sm text-muted-foreground mt-1">
          Underline variant (default) with three tab panels.
        </p>
        <div className="mt-4">
          <ComponentPreview code={basicCode}>
            <Tabs defaultValue="account">
              <TabsList>
                <TabsTrigger value="account">Account</TabsTrigger>
                <TabsTrigger value="password">Password</TabsTrigger>
                <TabsTrigger value="settings">Settings</TabsTrigger>
              </TabsList>
              <TabsContent value="account">
                Update your account settings. Set your preferred language and timezone.
              </TabsContent>
              <TabsContent value="password">
                Change your password. After saving, you&apos;ll be logged out.
              </TabsContent>
              <TabsContent value="settings">
                Manage your notification preferences and privacy settings.
              </TabsContent>
            </Tabs>
          </ComponentPreview>
        </div>
      </section>

      {/* -- Pill variant -------------------------------------------- */}
      <section className="mt-10">
        <h2 className="type-h3 text-foreground">Pill variant</h2>
        <p className="type-body-sm text-muted-foreground mt-1">
          Use{' '}
          <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">
            variant=&quot;pill&quot;
          </code>{' '}
          on TabsList for a contained, rounded style.
        </p>
        <div className="mt-4">
          <ComponentPreview code={pillCode}>
            <Tabs defaultValue="account">
              <TabsList variant="pill">
                <TabsTrigger value="account">Account</TabsTrigger>
                <TabsTrigger value="password">Password</TabsTrigger>
                <TabsTrigger value="settings">Settings</TabsTrigger>
              </TabsList>
              <TabsContent value="account">
                Update your account settings. Set your preferred language and timezone.
              </TabsContent>
              <TabsContent value="password">
                Change your password. After saving, you&apos;ll be logged out.
              </TabsContent>
              <TabsContent value="settings">
                Manage your notification preferences and privacy settings.
              </TabsContent>
            </Tabs>
          </ComponentPreview>
        </div>
      </section>

      {/* -- Size comparison ----------------------------------------- */}
      <section className="mt-10">
        <h2 className="type-h3 text-foreground">Sizes</h2>
        <p className="type-body-sm text-muted-foreground mt-1">
          Available in small and medium (default) sizes.
        </p>
        <div className="mt-4">
          <ComponentPreview code={sizeCode}>
            <div className="flex flex-col gap-8">
              <div>
                <p className="type-caption text-muted-foreground mb-2">size=&quot;sm&quot;</p>
                  <Tabs defaultValue="account">
                    <TabsList size="sm">
                      <TabsTrigger value="account">Account</TabsTrigger>
                      <TabsTrigger value="password">Password</TabsTrigger>
                      <TabsTrigger value="settings">Settings</TabsTrigger>
                    </TabsList>
                    <TabsContent value="account">Small tab content.</TabsContent>
                  </Tabs>
                </div>
                <div>
                  <p className="type-caption text-muted-foreground mb-2">size=&quot;md&quot;</p>
                  <Tabs defaultValue="account">
                    <TabsList size="md">
                      <TabsTrigger value="account">Account</TabsTrigger>
                      <TabsTrigger value="password">Password</TabsTrigger>
                      <TabsTrigger value="settings">Settings</TabsTrigger>
                    </TabsList>
                    <TabsContent value="account">Medium tab content.</TabsContent>
                  </Tabs>
                </div>
              </div>
            </ComponentPreview>
        </div>
      </section>

      {/* -- Full width ---------------------------------------------- */}
      <section className="mt-10">
        <h2 className="type-h3 text-foreground">Full width</h2>
        <p className="type-body-sm text-muted-foreground mt-1">
          Use{' '}
          <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">
            fullWidth
          </code>{' '}
          to stretch triggers to fill the container.
        </p>
        <div className="mt-4">
          <ComponentPreview code={fullWidthCode}>
            <Tabs defaultValue="account">
              <TabsList fullWidth>
                <TabsTrigger value="account">Account</TabsTrigger>
                <TabsTrigger value="password">Password</TabsTrigger>
                <TabsTrigger value="settings">Settings</TabsTrigger>
              </TabsList>
              <TabsContent value="account">
                Update your account settings. Set your preferred language and timezone.
              </TabsContent>
              <TabsContent value="password">
                Change your password. After saving, you&apos;ll be logged out.
              </TabsContent>
              <TabsContent value="settings">
                Manage your notification preferences and privacy settings.
              </TabsContent>
            </Tabs>
          </ComponentPreview>
        </div>
      </section>

      {/* -- Disabled tab -------------------------------------------- */}
      <section className="mt-10">
        <h2 className="type-h3 text-foreground">Disabled tab</h2>
        <p className="type-body-sm text-muted-foreground mt-1">
          Use the{' '}
          <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">
            disabled
          </code>{' '}
          prop on a TabsTrigger to prevent interaction.
        </p>
        <div className="mt-4">
          <ComponentPreview code={disabledCode}>
            <Tabs defaultValue="account">
              <TabsList>
                <TabsTrigger value="account">Account</TabsTrigger>
                <TabsTrigger value="password" disabled>Password</TabsTrigger>
                <TabsTrigger value="settings">Settings</TabsTrigger>
              </TabsList>
              <TabsContent value="account">
                Update your account settings. Set your preferred language and timezone.
              </TabsContent>
              <TabsContent value="password">
                Change your password. After saving, you&apos;ll be logged out.
              </TabsContent>
              <TabsContent value="settings">
                Manage your notification preferences and privacy settings.
              </TabsContent>
            </Tabs>
          </ComponentPreview>
        </div>
      </section>

      {/* -- Controlled ---------------------------------------------- */}
      <section className="mt-10">
        <h2 className="type-h3 text-foreground">Controlled</h2>
        <p className="type-body-sm text-muted-foreground mt-1">
          Use{' '}
          <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">
            value
          </code>{' '}
          and{' '}
          <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">
            onValueChange
          </code>{' '}
          for controlled state.
        </p>
        <div className="mt-4">
          <ComponentPreview code={controlledCode}>
            <div>
              <Tabs value={activeTab} onValueChange={setActiveTab}>
                <TabsList>
                  <TabsTrigger value="account">Account</TabsTrigger>
                  <TabsTrigger value="password">Password</TabsTrigger>
                  <TabsTrigger value="settings">Settings</TabsTrigger>
                </TabsList>
                <TabsContent value="account">
                  Update your account settings. Set your preferred language and timezone.
                </TabsContent>
                <TabsContent value="password">
                  Change your password. After saving, you&apos;ll be logged out.
                </TabsContent>
                <TabsContent value="settings">
                  Manage your notification preferences and privacy settings.
                </TabsContent>
              </Tabs>
              <p className="type-body-sm text-muted-foreground mt-3">
                Active tab: <span className="text-foreground">{activeTab}</span>
              </p>
            </div>
          </ComponentPreview>
        </div>
      </section>

      {/* -- Accessibility ------------------------------------------- */}
      <section className="mt-10">
        <h2 className="type-h3 text-foreground">Accessibility</h2>
        <p className="type-body-sm text-muted-foreground mt-1">
          Tabs follow the WAI-ARIA Tabs pattern with full keyboard support.
          Use <strong className="text-foreground">Arrow Left</strong> and{' '}
          <strong className="text-foreground">Arrow Right</strong> to move between triggers,{' '}
          <strong className="text-foreground">Home</strong> and{' '}
          <strong className="text-foreground">End</strong> to jump to the first or last trigger, and{' '}
          <strong className="text-foreground">Tab</strong> to move focus into the active panel.
          Disabled triggers are automatically skipped during keyboard navigation.
        </p>
        <p className="type-body-sm text-muted-foreground mt-2">
          TabsTrigger accepts any children, so you can compose icon + text layouts
          inside triggers. Tabs are horizontal only.
        </p>
      </section>

      {/* -- API Reference ------------------------------------------- */}
      <section className="mt-10">
        <h2 className="type-h3 text-foreground">API Reference</h2>

        {/* Tabs */}
        <div className="mt-6">
          <h3 className="type-body text-foreground font-semibold">Tabs</h3>
          <div className="mt-3 overflow-x-auto">
            <table className="w-full type-body-sm text-left border-collapse">
              <thead>
                <tr className="border-b border-border">
                  <th className="py-2 pr-4 text-muted-foreground font-medium">Prop</th>
                  <th className="py-2 pr-4 text-muted-foreground font-medium">Type</th>
                  <th className="py-2 pr-4 text-muted-foreground font-medium">Default</th>
                  <th className="py-2 text-muted-foreground font-medium">Description</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-border">
                  <td className="py-2 pr-4 text-foreground font-mono">value</td>
                  <td className="py-2 pr-4 text-muted-foreground font-mono">string</td>
                  <td className="py-2 pr-4 text-muted-foreground font-mono">&mdash;</td>
                  <td className="py-2 text-muted-foreground">Controlled active tab value</td>
                </tr>
                <tr className="border-b border-border">
                  <td className="py-2 pr-4 text-foreground font-mono">defaultValue</td>
                  <td className="py-2 pr-4 text-muted-foreground font-mono">string</td>
                  <td className="py-2 pr-4 text-muted-foreground font-mono">&mdash;</td>
                  <td className="py-2 text-muted-foreground">Initial active tab (uncontrolled). If omitted, the first tab is auto-selected.</td>
                </tr>
                <tr className="border-b border-border">
                  <td className="py-2 pr-4 text-foreground font-mono">onValueChange</td>
                  <td className="py-2 pr-4 text-muted-foreground font-mono">{`(value: string) => void`}</td>
                  <td className="py-2 pr-4 text-muted-foreground font-mono">&mdash;</td>
                  <td className="py-2 text-muted-foreground">Callback when active tab changes</td>
                </tr>
                <tr className="border-b border-border">
                  <td className="py-2 pr-4 text-foreground font-mono">className</td>
                  <td className="py-2 pr-4 text-muted-foreground font-mono">string</td>
                  <td className="py-2 pr-4 text-muted-foreground font-mono">&mdash;</td>
                  <td className="py-2 text-muted-foreground">Additional CSS classes</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* TabsList */}
        <div className="mt-6">
          <h3 className="type-body text-foreground font-semibold">TabsList</h3>
          <div className="mt-3 overflow-x-auto">
            <table className="w-full type-body-sm text-left border-collapse">
              <thead>
                <tr className="border-b border-border">
                  <th className="py-2 pr-4 text-muted-foreground font-medium">Prop</th>
                  <th className="py-2 pr-4 text-muted-foreground font-medium">Type</th>
                  <th className="py-2 pr-4 text-muted-foreground font-medium">Default</th>
                  <th className="py-2 text-muted-foreground font-medium">Description</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-border">
                  <td className="py-2 pr-4 text-foreground font-mono">variant</td>
                  <td className="py-2 pr-4 text-muted-foreground font-mono">{`"underline" | "pill"`}</td>
                  <td className="py-2 pr-4 text-muted-foreground font-mono">&quot;underline&quot;</td>
                  <td className="py-2 text-muted-foreground">Visual style of the tab triggers</td>
                </tr>
                <tr className="border-b border-border">
                  <td className="py-2 pr-4 text-foreground font-mono">size</td>
                  <td className="py-2 pr-4 text-muted-foreground font-mono">{`"sm" | "md"`}</td>
                  <td className="py-2 pr-4 text-muted-foreground font-mono">&quot;md&quot;</td>
                  <td className="py-2 text-muted-foreground">Size of the tab triggers</td>
                </tr>
                <tr className="border-b border-border">
                  <td className="py-2 pr-4 text-foreground font-mono">fullWidth</td>
                  <td className="py-2 pr-4 text-muted-foreground font-mono">boolean</td>
                  <td className="py-2 pr-4 text-muted-foreground font-mono">false</td>
                  <td className="py-2 text-muted-foreground">Whether triggers stretch to fill the container</td>
                </tr>
                <tr className="border-b border-border">
                  <td className="py-2 pr-4 text-foreground font-mono">className</td>
                  <td className="py-2 pr-4 text-muted-foreground font-mono">string</td>
                  <td className="py-2 pr-4 text-muted-foreground font-mono">&mdash;</td>
                  <td className="py-2 text-muted-foreground">Additional CSS classes</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* TabsTrigger */}
        <div className="mt-6">
          <h3 className="type-body text-foreground font-semibold">TabsTrigger</h3>
          <div className="mt-3 overflow-x-auto">
            <table className="w-full type-body-sm text-left border-collapse">
              <thead>
                <tr className="border-b border-border">
                  <th className="py-2 pr-4 text-muted-foreground font-medium">Prop</th>
                  <th className="py-2 pr-4 text-muted-foreground font-medium">Type</th>
                  <th className="py-2 pr-4 text-muted-foreground font-medium">Default</th>
                  <th className="py-2 text-muted-foreground font-medium">Description</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-border">
                  <td className="py-2 pr-4 text-foreground font-mono">value</td>
                  <td className="py-2 pr-4 text-muted-foreground font-mono">string (required)</td>
                  <td className="py-2 pr-4 text-muted-foreground font-mono">&mdash;</td>
                  <td className="py-2 text-muted-foreground">Unique identifier linking trigger to content</td>
                </tr>
                <tr className="border-b border-border">
                  <td className="py-2 pr-4 text-foreground font-mono">disabled</td>
                  <td className="py-2 pr-4 text-muted-foreground font-mono">boolean</td>
                  <td className="py-2 pr-4 text-muted-foreground font-mono">false</td>
                  <td className="py-2 text-muted-foreground">Whether the trigger is disabled</td>
                </tr>
                <tr className="border-b border-border">
                  <td className="py-2 pr-4 text-foreground font-mono">className</td>
                  <td className="py-2 pr-4 text-muted-foreground font-mono">string</td>
                  <td className="py-2 pr-4 text-muted-foreground font-mono">&mdash;</td>
                  <td className="py-2 text-muted-foreground">Additional CSS classes</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* TabsContent */}
        <div className="mt-6">
          <h3 className="type-body text-foreground font-semibold">TabsContent</h3>
          <div className="mt-3 overflow-x-auto">
            <table className="w-full type-body-sm text-left border-collapse">
              <thead>
                <tr className="border-b border-border">
                  <th className="py-2 pr-4 text-muted-foreground font-medium">Prop</th>
                  <th className="py-2 pr-4 text-muted-foreground font-medium">Type</th>
                  <th className="py-2 pr-4 text-muted-foreground font-medium">Default</th>
                  <th className="py-2 text-muted-foreground font-medium">Description</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-border">
                  <td className="py-2 pr-4 text-foreground font-mono">value</td>
                  <td className="py-2 pr-4 text-muted-foreground font-mono">string (required)</td>
                  <td className="py-2 pr-4 text-muted-foreground font-mono">&mdash;</td>
                  <td className="py-2 text-muted-foreground">Must match a TabsTrigger value</td>
                </tr>
                <tr className="border-b border-border">
                  <td className="py-2 pr-4 text-foreground font-mono">className</td>
                  <td className="py-2 pr-4 text-muted-foreground font-mono">string</td>
                  <td className="py-2 pr-4 text-muted-foreground font-mono">&mdash;</td>
                  <td className="py-2 text-muted-foreground">Additional CSS classes</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

    </Container>
  )
}
