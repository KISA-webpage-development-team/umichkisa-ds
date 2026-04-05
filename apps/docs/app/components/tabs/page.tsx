import { Container, Tabs, TabsList, TabsTrigger, TabsContent, FormItem, Input } from '@umichkisa-ds/web'
import { ComponentPreview } from '@/components/ComponentPreview'
import { highlight } from '@/lib/highlight'
import { ControlledDemo } from './_demos'

const basicCode = `import { Container, Tabs, TabsList, TabsTrigger, TabsContent, FormItem, Input } from '@umichkisa-ds/web'

<Container size="sm">
  <Tabs defaultValue="account">
    <TabsList>
      <TabsTrigger value="account">Account</TabsTrigger>
      <TabsTrigger value="password">Password</TabsTrigger>
      <TabsTrigger value="settings">Settings</TabsTrigger>
    </TabsList>
    <TabsContent value="account">
      <FormItem label="Display name"><Input placeholder="Enter name" /></FormItem>
      <FormItem label="Email" className="mt-4"><Input placeholder="you@example.com" /></FormItem>
    </TabsContent>
    <TabsContent value="password">
      <FormItem label="Current password"><Input type="password" placeholder="••••••••" /></FormItem>
      <FormItem label="New password" className="mt-4"><Input type="password" placeholder="••••••••" /></FormItem>
    </TabsContent>
    <TabsContent value="settings">
      <FormItem label="Language"><Input placeholder="English" /></FormItem>
      <FormItem label="Timezone" className="mt-4"><Input placeholder="UTC-5" /></FormItem>
    </TabsContent>
  </Tabs>
</Container>`

const pillCode = `import { Container, Tabs, TabsList, TabsTrigger, TabsContent, FormItem, Input } from '@umichkisa-ds/web'

<Container size="sm">
  <Tabs defaultValue="account">
    <TabsList variant="pill">
      <TabsTrigger value="account">Account</TabsTrigger>
      <TabsTrigger value="password">Password</TabsTrigger>
      <TabsTrigger value="settings">Settings</TabsTrigger>
    </TabsList>
    <TabsContent value="account">
      <FormItem label="Display name"><Input placeholder="Enter name" /></FormItem>
      <FormItem label="Email" className="mt-4"><Input placeholder="you@example.com" /></FormItem>
    </TabsContent>
    <TabsContent value="password">
      <FormItem label="Current password"><Input type="password" placeholder="••••••••" /></FormItem>
      <FormItem label="New password" className="mt-4"><Input type="password" placeholder="••••••••" /></FormItem>
    </TabsContent>
    <TabsContent value="settings">
      <FormItem label="Language"><Input placeholder="English" /></FormItem>
      <FormItem label="Timezone" className="mt-4"><Input placeholder="UTC-5" /></FormItem>
    </TabsContent>
  </Tabs>
</Container>`

const sizeCode = `import { Container, Tabs, TabsList, TabsTrigger, TabsContent } from '@umichkisa-ds/web'

<Container size="sm">
  {/* Small */}
  <Tabs defaultValue="profile">
    <TabsList size="sm">
      <TabsTrigger value="profile">Profile</TabsTrigger>
      <TabsTrigger value="billing">Billing</TabsTrigger>
      <TabsTrigger value="team">Team</TabsTrigger>
    </TabsList>
    <TabsContent value="profile">
      <p className="type-body-sm text-foreground">Small size trigger with profile settings.</p>
    </TabsContent>
    <TabsContent value="billing">
      <p className="type-body-sm text-foreground">Small size trigger with billing details.</p>
    </TabsContent>
    <TabsContent value="team">
      <p className="type-body-sm text-foreground">Small size trigger with team members.</p>
    </TabsContent>
  </Tabs>

  {/* Medium (default) */}
  <Tabs defaultValue="profile">
    <TabsList size="md">
      <TabsTrigger value="profile">Profile</TabsTrigger>
      <TabsTrigger value="billing">Billing</TabsTrigger>
      <TabsTrigger value="team">Team</TabsTrigger>
    </TabsList>
    <TabsContent value="profile">
      <p className="type-body-sm text-foreground">Medium size trigger with profile settings.</p>
    </TabsContent>
    <TabsContent value="billing">
      <p className="type-body-sm text-foreground">Medium size trigger with billing details.</p>
    </TabsContent>
    <TabsContent value="team">
      <p className="type-body-sm text-foreground">Medium size trigger with team members.</p>
    </TabsContent>
  </Tabs>
</Container>`

const fullWidthCode = `import { Container, Tabs, TabsList, TabsTrigger, TabsContent } from '@umichkisa-ds/web'

<Container size="sm">
  <Tabs defaultValue="overview">
    <TabsList fullWidth>
      <TabsTrigger value="overview">Overview</TabsTrigger>
      <TabsTrigger value="analytics">Analytics</TabsTrigger>
      <TabsTrigger value="reports">Reports</TabsTrigger>
    </TabsList>
    <TabsContent value="overview">
      <p className="type-body-sm text-foreground mb-3">Total members</p>
      <p className="type-h3 text-foreground">128</p>
    </TabsContent>
    <TabsContent value="analytics">
      <p className="type-body-sm text-foreground mb-3">Page views (30d)</p>
      <p className="type-h3 text-foreground">4,231</p>
    </TabsContent>
    <TabsContent value="reports">
      <p className="type-body-sm text-foreground mb-3">Reports generated</p>
      <p className="type-h3 text-foreground">17</p>
    </TabsContent>
  </Tabs>
</Container>`

const disabledCode = `import { Container, Tabs, TabsList, TabsTrigger, TabsContent, FormItem, Input } from '@umichkisa-ds/web'

<Container size="sm">
  <Tabs defaultValue="general">
    <TabsList>
      <TabsTrigger value="general">General</TabsTrigger>
      <TabsTrigger value="security" disabled>Security</TabsTrigger>
      <TabsTrigger value="notifications">Notifications</TabsTrigger>
    </TabsList>
    <TabsContent value="general">
      <FormItem label="App name"><Input placeholder="My App" /></FormItem>
    </TabsContent>
    <TabsContent value="security">
      <FormItem label="Two-factor auth"><Input placeholder="Enabled" /></FormItem>
    </TabsContent>
    <TabsContent value="notifications">
      <FormItem label="Email digest"><Input placeholder="Weekly" /></FormItem>
    </TabsContent>
  </Tabs>
</Container>`

const controlledCode = `import { useState } from 'react'
import { Container, Tabs, TabsList, TabsTrigger, TabsContent, FormItem, Input } from '@umichkisa-ds/web'

const [activeTab, setActiveTab] = useState('members')

<Container size="sm">
  <Tabs value={activeTab} onValueChange={setActiveTab}>
    <TabsList>
      <TabsTrigger value="members">Members</TabsTrigger>
      <TabsTrigger value="roles">Roles</TabsTrigger>
      <TabsTrigger value="invites">Invites</TabsTrigger>
    </TabsList>
    <TabsContent value="members">
      <FormItem label="Search members"><Input placeholder="Search by name" /></FormItem>
    </TabsContent>
    <TabsContent value="roles">
      <FormItem label="Role name"><Input placeholder="Admin" /></FormItem>
    </TabsContent>
    <TabsContent value="invites">
      <FormItem label="Email address"><Input placeholder="user@example.com" /></FormItem>
    </TabsContent>
  </Tabs>
  <p>Active tab: {activeTab}</p>
</Container>`

export default async function TabsPage() {
  const [
    basicHighlighted,
    pillHighlighted,
    sizeHighlighted,
    fullWidthHighlighted,
    disabledHighlighted,
    controlledHighlighted,
  ] = await Promise.all([
    highlight(basicCode),
    highlight(pillCode),
    highlight(sizeCode),
    highlight(fullWidthCode),
    highlight(disabledCode),
    highlight(controlledCode),
  ])

  return (
    <Container size="md" as="article">

      {/* -- Header -------------------------------------------------- */}
      <h1 className="type-h1 font-sejong-bold tracking-tight mb-4 text-foreground">Tabs</h1>
      <p className="type-body mb-4 text-foreground max-w-prose">
        Organize content into multiple panels, activated one at a time.
        Tabs keep related content grouped while reducing clutter.
      </p>
      <p className="type-body-sm mb-8 text-muted-foreground max-w-prose">
        Use underline tabs for page-level navigation and pill tabs for
        in-context switching. TabsTrigger accepts any children, so you can
        compose icon + text layouts inside triggers. Tabs are horizontal only.
      </p>

      {/* -- Examples ------------------------------------------------- */}
      <h2 className="type-h2 mt-8 mb-4 text-foreground">Examples</h2>

      {/* Basic */}
      <h3 className="type-h3 mt-6 mb-2 text-foreground">Basic</h3>
      <p className="type-body mb-2 text-foreground max-w-prose">
        Underline variant (default) with three tab panels.
      </p>
      <ComponentPreview code={basicCode} highlightedCode={basicHighlighted}>
        <Container size="sm">
          <Tabs defaultValue="account">
            <TabsList>
              <TabsTrigger value="account">Account</TabsTrigger>
              <TabsTrigger value="password">Password</TabsTrigger>
              <TabsTrigger value="settings">Settings</TabsTrigger>
            </TabsList>
            <TabsContent value="account">
              <FormItem htmlFor="basic-name" label="Display name"><Input id="basic-name" placeholder="Enter name" /></FormItem>
              <FormItem htmlFor="basic-email" label="Email" className="mt-4"><Input id="basic-email" placeholder="you@example.com" /></FormItem>
            </TabsContent>
            <TabsContent value="password">
              <FormItem htmlFor="basic-curpw" label="Current password"><Input id="basic-curpw" type="password" placeholder="••••••••" /></FormItem>
              <FormItem htmlFor="basic-newpw" label="New password" className="mt-4"><Input id="basic-newpw" type="password" placeholder="••••••••" /></FormItem>
            </TabsContent>
            <TabsContent value="settings">
              <FormItem htmlFor="basic-lang" label="Language"><Input id="basic-lang" placeholder="English" /></FormItem>
              <FormItem htmlFor="basic-tz" label="Timezone" className="mt-4"><Input id="basic-tz" placeholder="UTC-5" /></FormItem>
            </TabsContent>
          </Tabs>
        </Container>
      </ComponentPreview>

      {/* Pill variant */}
      <h3 className="type-h3 mt-8 mb-2 text-foreground">Pill variant</h3>
      <p className="type-body mb-2 text-foreground max-w-prose">
        Use{' '}
        <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">
          variant=&quot;pill&quot;
        </code>{' '}
        on TabsList for a contained, rounded style.
      </p>
      <ComponentPreview code={pillCode} highlightedCode={pillHighlighted}>
        <Container size="sm">
          <Tabs defaultValue="account">
            <TabsList variant="pill">
              <TabsTrigger value="account">Account</TabsTrigger>
              <TabsTrigger value="password">Password</TabsTrigger>
              <TabsTrigger value="settings">Settings</TabsTrigger>
            </TabsList>
            <TabsContent value="account">
              <FormItem htmlFor="pill-name" label="Display name"><Input id="pill-name" placeholder="Enter name" /></FormItem>
              <FormItem htmlFor="pill-email" label="Email" className="mt-4"><Input id="pill-email" placeholder="you@example.com" /></FormItem>
            </TabsContent>
            <TabsContent value="password">
              <FormItem htmlFor="pill-curpw" label="Current password"><Input id="pill-curpw" type="password" placeholder="••••••••" /></FormItem>
              <FormItem htmlFor="pill-newpw" label="New password" className="mt-4"><Input id="pill-newpw" type="password" placeholder="••••••••" /></FormItem>
            </TabsContent>
            <TabsContent value="settings">
              <FormItem htmlFor="pill-lang" label="Language"><Input id="pill-lang" placeholder="English" /></FormItem>
              <FormItem htmlFor="pill-tz" label="Timezone" className="mt-4"><Input id="pill-tz" placeholder="UTC-5" /></FormItem>
            </TabsContent>
          </Tabs>
        </Container>
      </ComponentPreview>

      {/* Sizes */}
      <h3 className="type-h3 mt-8 mb-2 text-foreground">Sizes</h3>
      <p className="type-body mb-2 text-foreground max-w-prose">
        Available in small and medium (default) sizes via the{' '}
        <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">
          size
        </code>{' '}
        prop on TabsList.
      </p>
      <ComponentPreview code={sizeCode} highlightedCode={sizeHighlighted}>
        <Container size="sm">
          <div className="flex flex-col gap-8">
            <div>
              <p className="type-caption text-muted-foreground mb-2">size=&quot;sm&quot;</p>
              <Tabs defaultValue="profile">
                <TabsList size="sm">
                  <TabsTrigger value="profile">Profile</TabsTrigger>
                  <TabsTrigger value="billing">Billing</TabsTrigger>
                  <TabsTrigger value="team">Team</TabsTrigger>
                </TabsList>
                <TabsContent value="profile">
                  <p className="type-body-sm text-foreground">Small size trigger with profile settings.</p>
                </TabsContent>
                <TabsContent value="billing">
                  <p className="type-body-sm text-foreground">Small size trigger with billing details.</p>
                </TabsContent>
                <TabsContent value="team">
                  <p className="type-body-sm text-foreground">Small size trigger with team members.</p>
                </TabsContent>
              </Tabs>
            </div>
            <div>
              <p className="type-caption text-muted-foreground mb-2">size=&quot;md&quot;</p>
              <Tabs defaultValue="profile">
                <TabsList size="md">
                  <TabsTrigger value="profile">Profile</TabsTrigger>
                  <TabsTrigger value="billing">Billing</TabsTrigger>
                  <TabsTrigger value="team">Team</TabsTrigger>
                </TabsList>
                <TabsContent value="profile">
                  <p className="type-body-sm text-foreground">Medium size trigger with profile settings.</p>
                </TabsContent>
                <TabsContent value="billing">
                  <p className="type-body-sm text-foreground">Medium size trigger with billing details.</p>
                </TabsContent>
                <TabsContent value="team">
                  <p className="type-body-sm text-foreground">Medium size trigger with team members.</p>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </Container>
      </ComponentPreview>

      {/* Full width */}
      <h3 className="type-h3 mt-8 mb-2 text-foreground">Full width</h3>
      <p className="type-body mb-2 text-foreground max-w-prose">
        Use{' '}
        <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">
          fullWidth
        </code>{' '}
        to stretch triggers to fill the container.
      </p>
      <ComponentPreview code={fullWidthCode} highlightedCode={fullWidthHighlighted}>
        <Container size="sm">
          <Tabs defaultValue="overview">
            <TabsList fullWidth>
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="analytics">Analytics</TabsTrigger>
              <TabsTrigger value="reports">Reports</TabsTrigger>
            </TabsList>
            <TabsContent value="overview">
              <p className="type-body-sm text-foreground mb-3">Total members</p>
              <p className="type-h3 text-foreground">128</p>
            </TabsContent>
            <TabsContent value="analytics">
              <p className="type-body-sm text-foreground mb-3">Page views (30d)</p>
              <p className="type-h3 text-foreground">4,231</p>
            </TabsContent>
            <TabsContent value="reports">
              <p className="type-body-sm text-foreground mb-3">Reports generated</p>
              <p className="type-h3 text-foreground">17</p>
            </TabsContent>
          </Tabs>
        </Container>
      </ComponentPreview>

      {/* Disabled tab */}
      <h3 className="type-h3 mt-8 mb-2 text-foreground">Disabled tab</h3>
      <p className="type-body mb-2 text-foreground max-w-prose">
        Use the{' '}
        <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">
          disabled
        </code>{' '}
        prop on a TabsTrigger to prevent interaction. Disabled triggers are
        skipped during keyboard navigation.
      </p>
      <ComponentPreview code={disabledCode} highlightedCode={disabledHighlighted}>
        <Container size="sm">
          <Tabs defaultValue="general">
            <TabsList>
              <TabsTrigger value="general">General</TabsTrigger>
              <TabsTrigger value="security" disabled>Security</TabsTrigger>
              <TabsTrigger value="notifications">Notifications</TabsTrigger>
            </TabsList>
            <TabsContent value="general">
              <FormItem htmlFor="dis-app" label="App name"><Input id="dis-app" placeholder="My App" /></FormItem>
            </TabsContent>
            <TabsContent value="security">
              <FormItem htmlFor="dis-2fa" label="Two-factor auth"><Input id="dis-2fa" placeholder="Enabled" /></FormItem>
            </TabsContent>
            <TabsContent value="notifications">
              <FormItem htmlFor="dis-digest" label="Email digest"><Input id="dis-digest" placeholder="Weekly" /></FormItem>
            </TabsContent>
          </Tabs>
        </Container>
      </ComponentPreview>

      {/* Controlled */}
      <h3 className="type-h3 mt-8 mb-2 text-foreground">Controlled</h3>
      <p className="type-body mb-2 text-foreground max-w-prose">
        Use{' '}
        <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">
          value
        </code>{' '}
        and{' '}
        <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">
          onValueChange
        </code>{' '}
        for controlled state. Useful when syncing tab selection with URL
        parameters or external state.
      </p>
      <ComponentPreview code={controlledCode} highlightedCode={controlledHighlighted}>
        <ControlledDemo />
      </ComponentPreview>

      {/* Accessibility */}
      <h3 className="type-h3 mt-8 mb-2 text-foreground">Accessibility</h3>
      <p className="type-body mb-2 text-foreground max-w-prose">
        Tabs follow the WAI-ARIA Tabs pattern with full keyboard support.
        Use <strong>Arrow Left</strong> and <strong>Arrow Right</strong> to
        move between triggers, <strong>Home</strong> and <strong>End</strong> to
        jump to the first or last trigger, and <strong>Tab</strong> to move
        focus into the active panel.
      </p>

      {/* -- API Reference -------------------------------------------- */}
      <h2 className="type-h2 mt-8 mb-4 text-foreground">API Reference</h2>
      <p className="type-body mb-4 text-foreground max-w-prose">
        Tabs is composed from several sub-components that you assemble together. Each accepts the props listed below.
      </p>

      {/* Tabs (Root) */}
      <h3 className="type-h3 mt-8 mb-2 text-foreground">Tabs</h3>
      <p className="type-body mb-2 text-foreground max-w-prose">
        Root wrapper that manages tab state. If neither{' '}
        <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">value</code>{' '}
        nor{' '}
        <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">defaultValue</code>{' '}
        is provided, the first tab is auto-selected.
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
              <td className="px-4 py-3 text-foreground"><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle">value</code></td>
              <td className="px-4 py-3 text-foreground"><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle">string</code></td>
              <td className="px-4 py-3 type-body-sm text-foreground">—</td>
              <td className="px-4 py-3 type-body-sm text-foreground">Controlled active tab value.</td>
            </tr>
            <tr className="border-b border-border">
              <td className="px-4 py-3 text-foreground"><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle">defaultValue</code></td>
              <td className="px-4 py-3 text-foreground"><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle">string</code></td>
              <td className="px-4 py-3 type-body-sm text-foreground">—</td>
              <td className="px-4 py-3 type-body-sm text-foreground">Initial active tab for uncontrolled usage.</td>
            </tr>
            <tr className="border-b border-border">
              <td className="px-4 py-3 text-foreground"><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle">onValueChange</code></td>
              <td className="px-4 py-3 text-foreground"><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle">{`(value: string) => void`}</code></td>
              <td className="px-4 py-3 type-body-sm text-foreground">—</td>
              <td className="px-4 py-3 type-body-sm text-foreground">Callback when the active tab changes.</td>
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

      {/* TabsList */}
      <h3 className="type-h3 mt-8 mb-2 text-foreground">TabsList</h3>
      <p className="type-body mb-2 text-foreground max-w-prose">
        Container for tab triggers. Controls variant, size, and width.
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
              <td className="px-4 py-3 text-foreground"><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle">&quot;underline&quot; | &quot;pill&quot;</code></td>
              <td className="px-4 py-3 text-foreground"><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle">&quot;underline&quot;</code></td>
              <td className="px-4 py-3 type-body-sm text-foreground">Visual style of the tab triggers.</td>
            </tr>
            <tr className="border-b border-border">
              <td className="px-4 py-3 text-foreground"><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle">size</code></td>
              <td className="px-4 py-3 text-foreground"><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle">&quot;sm&quot; | &quot;md&quot;</code></td>
              <td className="px-4 py-3 text-foreground"><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle">&quot;md&quot;</code></td>
              <td className="px-4 py-3 type-body-sm text-foreground">Size of the tab triggers.</td>
            </tr>
            <tr className="border-b border-border">
              <td className="px-4 py-3 text-foreground"><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle">fullWidth</code></td>
              <td className="px-4 py-3 text-foreground"><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle">boolean</code></td>
              <td className="px-4 py-3 text-foreground"><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle">false</code></td>
              <td className="px-4 py-3 type-body-sm text-foreground">Whether triggers stretch to fill the container.</td>
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

      {/* TabsTrigger */}
      <h3 className="type-h3 mt-8 mb-2 text-foreground">TabsTrigger</h3>
      <p className="type-body mb-2 text-foreground max-w-prose">
        An individual tab button. Activates the matching TabsContent panel.
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
              <td className="px-4 py-3 text-foreground"><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle">value</code></td>
              <td className="px-4 py-3 text-foreground"><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle">string</code></td>
              <td className="px-4 py-3 type-body-sm text-foreground">—</td>
              <td className="px-4 py-3 type-body-sm text-foreground">Required. Unique identifier linking this trigger to its content panel.</td>
            </tr>
            <tr className="border-b border-border">
              <td className="px-4 py-3 text-foreground"><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle">disabled</code></td>
              <td className="px-4 py-3 text-foreground"><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle">boolean</code></td>
              <td className="px-4 py-3 text-foreground"><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle">false</code></td>
              <td className="px-4 py-3 type-body-sm text-foreground">Whether the trigger is disabled. Disabled triggers are skipped during keyboard navigation.</td>
            </tr>
            <tr className="border-b border-border">
              <td className="px-4 py-3 text-foreground"><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle">children</code></td>
              <td className="px-4 py-3 text-foreground"><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle">ReactNode</code></td>
              <td className="px-4 py-3 type-body-sm text-foreground">—</td>
              <td className="px-4 py-3 type-body-sm text-foreground">The trigger label. Accepts text or composed elements (e.g. icon + text).</td>
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

      {/* TabsContent */}
      <h3 className="type-h3 mt-8 mb-2 text-foreground">TabsContent</h3>
      <p className="type-body mb-2 text-foreground max-w-prose">
        The panel rendered when its matching trigger is active. Unmounted when inactive.
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
              <td className="px-4 py-3 text-foreground"><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle">value</code></td>
              <td className="px-4 py-3 text-foreground"><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle">string</code></td>
              <td className="px-4 py-3 type-body-sm text-foreground">—</td>
              <td className="px-4 py-3 type-body-sm text-foreground">Required. Must match a TabsTrigger value.</td>
            </tr>
            <tr className="border-b border-border">
              <td className="px-4 py-3 text-foreground"><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle">children</code></td>
              <td className="px-4 py-3 text-foreground"><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle">ReactNode</code></td>
              <td className="px-4 py-3 type-body-sm text-foreground">—</td>
              <td className="px-4 py-3 type-body-sm text-foreground">Content rendered inside the panel.</td>
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
