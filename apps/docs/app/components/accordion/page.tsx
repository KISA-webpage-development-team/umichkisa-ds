import {
  Container,
  Alert,
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
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

const basicCode = `import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from '@umichkisa-ds/web'

<Accordion type="single" defaultValue="what-is-kisa">
  <AccordionItem value="what-is-kisa">
    <AccordionTrigger>What is KISA?</AccordionTrigger>
    <AccordionContent>
      KISA (Korean International Student Association) is a student
      organization at the University of Michigan dedicated to promoting
      Korean culture and building community among students.
    </AccordionContent>
  </AccordionItem>
  <AccordionItem value="how-to-join">
    <AccordionTrigger>How do I join?</AccordionTrigger>
    <AccordionContent>
      You can sign up on our website during the fall or winter
      recruitment period. All UMich students are welcome regardless
      of background.
    </AccordionContent>
  </AccordionItem>
  <AccordionItem value="membership-fee">
    <AccordionTrigger>Is there a membership fee?</AccordionTrigger>
    <AccordionContent>
      Yes, there is a small semester fee that covers event costs,
      merchandise, and group activities. The exact amount is
      announced at the start of each semester.
    </AccordionContent>
  </AccordionItem>
</Accordion>`

const multipleCode = `import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from '@umichkisa-ds/web'

<Accordion type="multiple" defaultValue={['notifications']}>
  <AccordionItem value="notifications">
    <AccordionTrigger>Notifications</AccordionTrigger>
    <AccordionContent>
      Configure how you receive alerts. You can enable push
      notifications, email digests, or both.
    </AccordionContent>
  </AccordionItem>
  <AccordionItem value="privacy">
    <AccordionTrigger>Privacy</AccordionTrigger>
    <AccordionContent>
      Control who can see your profile and activity. Set your
      account to public, members-only, or private.
    </AccordionContent>
  </AccordionItem>
  <AccordionItem value="appearance">
    <AccordionTrigger>Appearance</AccordionTrigger>
    <AccordionContent>
      Customize the look of your dashboard. Choose your preferred
      language and date format.
    </AccordionContent>
  </AccordionItem>
</Accordion>`

const disabledCode = `import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from '@umichkisa-ds/web'

<Accordion type="single">
  <AccordionItem value="current-events">
    <AccordionTrigger>Current events</AccordionTrigger>
    <AccordionContent>
      Check out our upcoming events including the annual culture
      show, spring picnic, and sports tournament.
    </AccordionContent>
  </AccordionItem>
  <AccordionItem value="archived" disabled>
    <AccordionTrigger>Archived events</AccordionTrigger>
    <AccordionContent>
      This section is currently unavailable.
    </AccordionContent>
  </AccordionItem>
  <AccordionItem value="proposals">
    <AccordionTrigger>Event proposals</AccordionTrigger>
    <AccordionContent>
      Submit your ideas for new events. The board reviews
      proposals at the start of each month.
    </AccordionContent>
  </AccordionItem>
</Accordion>`

const noChevronCode = `import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from '@umichkisa-ds/web'

<Accordion type="single">
  <AccordionItem value="step-1">
    <AccordionTrigger showChevron={false}>1. Create an account</AccordionTrigger>
    <AccordionContent>
      Visit the signup page and fill in your name, UMich email,
      and a password. You will receive a confirmation email.
    </AccordionContent>
  </AccordionItem>
  <AccordionItem value="step-2">
    <AccordionTrigger showChevron={false}>2. Complete your profile</AccordionTrigger>
    <AccordionContent>
      Add your graduation year, major, and a short bio so other
      members can get to know you.
    </AccordionContent>
  </AccordionItem>
  <AccordionItem value="step-3">
    <AccordionTrigger showChevron={false}>3. Join a team</AccordionTrigger>
    <AccordionContent>
      Browse available teams — design, dev, media, events — and
      request to join. Team leads will review your application.
    </AccordionContent>
  </AccordionItem>
</Accordion>`

export default async function AccordionPage() {
  const [basicHighlighted, multipleHighlighted, disabledHighlighted, noChevronHighlighted] = await Promise.all([
    highlight(basicCode),
    highlight(multipleCode),
    highlight(disabledCode),
    highlight(noChevronCode),
  ]);

  return (
    <Container size="md" as="article">

      {/* -- Header -------------------------------------------------- */}
      <h1 className="type-h1 mb-4 text-foreground">Accordion</h1>
      <p className="type-body mb-4 text-foreground max-w-prose">
        Vertically stacked set of collapsible sections. Each section has a
        trigger that reveals or hides its associated content panel.
      </p>
      <Alert variant="info" className="mb-8">
        Use Accordion for progressive disclosure — FAQs, settings panels,
        step-by-step guides. For tabbed content that shows one panel at a
        time without collapsing, use Tabs.
      </Alert>

      {/* -- Examples ------------------------------------------------- */}
      <h2 className="type-h2 mt-8 mb-4 text-foreground">Examples</h2>

      {/* Basic / FAQ */}
      <h3 className="type-h3 mt-6 mb-2 text-foreground">FAQ</h3>
      <p className="type-body mb-2 text-foreground max-w-prose">
        Single-mode accordion where one item can be open at a time. Clicking
        the open item collapses it (all items can be closed). Set{' '}
        <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">defaultValue</code>{' '}
        to expand an item on mount.
      </p>
      <ComponentPreview code={basicCode} highlightedCode={basicHighlighted}>
        <div className="w-full">
        <Accordion type="single" defaultValue="what-is-kisa">
          <AccordionItem value="what-is-kisa">
            <AccordionTrigger>What is KISA?</AccordionTrigger>
            <AccordionContent>
              KISA (Korean International Student Association) is a student
              organization at the University of Michigan dedicated to promoting
              Korean culture and building community among students.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="how-to-join">
            <AccordionTrigger>How do I join?</AccordionTrigger>
            <AccordionContent>
              You can sign up on our website during the fall or winter
              recruitment period. All UMich students are welcome regardless
              of background.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="membership-fee">
            <AccordionTrigger>Is there a membership fee?</AccordionTrigger>
            <AccordionContent>
              Yes, there is a small semester fee that covers event costs,
              merchandise, and group activities. The exact amount is
              announced at the start of each semester.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
        </div>
      </ComponentPreview>

      {/* Multiple / Settings */}
      <h3 className="type-h3 mt-8 mb-2 text-foreground">Settings panel</h3>
      <p className="type-body mb-2 text-foreground max-w-prose">
        Multiple-mode accordion where several sections can be open
        simultaneously. Useful for settings or filter panels where users
        configure independent groups.
      </p>
      <ComponentPreview code={multipleCode} highlightedCode={multipleHighlighted}>
        <div className="w-full">
        <Accordion type="multiple" defaultValue={['notifications']}>
          <AccordionItem value="notifications">
            <AccordionTrigger>Notifications</AccordionTrigger>
            <AccordionContent>
              Configure how you receive alerts. You can enable push
              notifications, email digests, or both.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="privacy">
            <AccordionTrigger>Privacy</AccordionTrigger>
            <AccordionContent>
              Control who can see your profile and activity. Set your
              account to public, members-only, or private.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="appearance">
            <AccordionTrigger>Appearance</AccordionTrigger>
            <AccordionContent>
              Customize the look of your dashboard. Choose your preferred
              language and date format.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
        </div>
      </ComponentPreview>

      {/* Disabled */}
      <h3 className="type-h3 mt-8 mb-2 text-foreground">Disabled item</h3>
      <p className="type-body mb-2 text-foreground max-w-prose">
        Individual items can be disabled to prevent interaction. The
        trigger text dims and the item is skipped during keyboard
        navigation.
      </p>
      <ComponentPreview code={disabledCode} highlightedCode={disabledHighlighted}>
        <div className="w-full">
        <Accordion type="single">
          <AccordionItem value="current-events">
            <AccordionTrigger>Current events</AccordionTrigger>
            <AccordionContent>
              Check out our upcoming events including the annual culture
              show, spring picnic, and sports tournament.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="archived" disabled>
            <AccordionTrigger>Archived events</AccordionTrigger>
            <AccordionContent>
              This section is currently unavailable.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="proposals">
            <AccordionTrigger>Event proposals</AccordionTrigger>
            <AccordionContent>
              Submit your ideas for new events. The board reviews
              proposals at the start of each month.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
        </div>
      </ComponentPreview>

      {/* No chevron */}
      <h3 className="type-h3 mt-8 mb-2 text-foreground">Without chevron</h3>
      <p className="type-body mb-2 text-foreground max-w-prose">
        Set{' '}
        <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">
          showChevron={'{false}'}
        </code>{' '}
        on the trigger to hide the default indicator. Useful for
        numbered steps or custom trigger layouts. Only use without
        the chevron when the trigger content itself signals that it
        expands (e.g., numbered steps) — otherwise users lose the
        only visual affordance for interactivity.
      </p>
      <ComponentPreview code={noChevronCode} highlightedCode={noChevronHighlighted}>
        <div className="w-full">
        <Accordion type="single">
          <AccordionItem value="step-1">
            <AccordionTrigger showChevron={false}>1. Create an account</AccordionTrigger>
            <AccordionContent>
              Visit the signup page and fill in your name, UMich email,
              and a password. You will receive a confirmation email.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="step-2">
            <AccordionTrigger showChevron={false}>2. Complete your profile</AccordionTrigger>
            <AccordionContent>
              Add your graduation year, major, and a short bio so other
              members can get to know you.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="step-3">
            <AccordionTrigger showChevron={false}>3. Join a team</AccordionTrigger>
            <AccordionContent>
              Browse available teams — design, dev, media, events — and
              request to join. Team leads will review your application.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
        </div>
      </ComponentPreview>

      {/* -- API Reference -------------------------------------------- */}
      <h2 className="type-h2 mt-8 mb-4 text-foreground">API Reference</h2>
      <p className="type-body mb-4 text-foreground max-w-prose">
        Accordion is composed from four sub-components. Assemble them to build collapsible sections.
        Note: the shape of{' '}
        <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">value</code>,{' '}
        <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">defaultValue</code>, and{' '}
        <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">onValueChange</code>{' '}
        depends on the{' '}
        <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">type</code>{' '}
        prop — single mode uses strings, multiple mode uses string arrays.
      </p>

      {/* Accordion (Root) */}
      <h3 className="type-h3 mt-8 mb-2 text-foreground">Accordion</h3>
      <p className="type-body mb-2 text-foreground max-w-prose">
        Root wrapper that manages expand/collapse state.
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
                <TableCell><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle">type</code></TableCell>
                <TableCell><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle">&quot;single&quot; | &quot;multiple&quot;</code></TableCell>
                <TableCell><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle">&quot;single&quot;</code></TableCell>
                <TableCell>Whether one or many items can be open at the same time.</TableCell>
              </TableRow>
              <TableRow>
                <TableCell><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle">value</code></TableCell>
                <TableCell><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle">string | string[]</code></TableCell>
                <TableCell>—</TableCell>
                <TableCell>Controlled open state. String for single, array for multiple.</TableCell>
              </TableRow>
              <TableRow>
                <TableCell><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle">defaultValue</code></TableCell>
                <TableCell><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle">string | string[]</code></TableCell>
                <TableCell>—</TableCell>
                <TableCell>Initial open state for uncontrolled usage.</TableCell>
              </TableRow>
              <TableRow>
                <TableCell><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle">onValueChange</code></TableCell>
                <TableCell><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle">(value: string | string[]) =&gt; void</code></TableCell>
                <TableCell>—</TableCell>
                <TableCell>Callback when the open items change.</TableCell>
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
        <div className="block md:hidden">
          <TableMobileList>
            <TableMobileItem>
              <span className="type-body-sm text-foreground"><strong>type</strong></span>
              <span className="type-caption text-muted-foreground"><code className="rounded px-1 py-0.5 font-mono bg-surface-subtle">&quot;single&quot; | &quot;multiple&quot;</code> · default <code className="rounded px-1 py-0.5 font-mono bg-surface-subtle">&quot;single&quot;</code></span>
              <span className="type-caption text-muted-foreground">Whether one or many items can be open at the same time.</span>
            </TableMobileItem>
            <TableMobileItem>
              <span className="type-body-sm text-foreground"><strong>value</strong></span>
              <span className="type-caption text-muted-foreground"><code className="rounded px-1 py-0.5 font-mono bg-surface-subtle">string | string[]</code></span>
              <span className="type-caption text-muted-foreground">Controlled open state. String for single, array for multiple.</span>
            </TableMobileItem>
            <TableMobileItem>
              <span className="type-body-sm text-foreground"><strong>defaultValue</strong></span>
              <span className="type-caption text-muted-foreground"><code className="rounded px-1 py-0.5 font-mono bg-surface-subtle">string | string[]</code></span>
              <span className="type-caption text-muted-foreground">Initial open state for uncontrolled usage.</span>
            </TableMobileItem>
            <TableMobileItem>
              <span className="type-body-sm text-foreground"><strong>onValueChange</strong></span>
              <span className="type-caption text-muted-foreground"><code className="rounded px-1 py-0.5 font-mono bg-surface-subtle">(value: string | string[]) =&gt; void</code></span>
              <span className="type-caption text-muted-foreground">Callback when the open items change.</span>
            </TableMobileItem>
            <TableMobileItem>
              <span className="type-body-sm text-foreground"><strong>className</strong></span>
              <span className="type-caption text-muted-foreground"><code className="rounded px-1 py-0.5 font-mono bg-surface-subtle">string</code></span>
              <span className="type-caption text-muted-foreground">Merged via cn(). Use for layout utilities only.</span>
            </TableMobileItem>
          </TableMobileList>
        </div>
      </div>

      {/* AccordionItem */}
      <h3 className="type-h3 mt-8 mb-2 text-foreground">AccordionItem</h3>
      <p className="type-body mb-2 text-foreground max-w-prose">
        Wraps a single collapsible section — a trigger and its content panel.
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
                <TableCell><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle">value</code></TableCell>
                <TableCell><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle">string</code></TableCell>
                <TableCell>—</TableCell>
                <TableCell>Unique identifier for this item. Required.</TableCell>
              </TableRow>
              <TableRow>
                <TableCell><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle">children</code></TableCell>
                <TableCell><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle">ReactNode</code></TableCell>
                <TableCell>—</TableCell>
                <TableCell>AccordionTrigger and AccordionContent for this item.</TableCell>
              </TableRow>
              <TableRow>
                <TableCell><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle">disabled</code></TableCell>
                <TableCell><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle">boolean</code></TableCell>
                <TableCell><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle">false</code></TableCell>
                <TableCell>Prevents interaction and removes item from keyboard navigation.</TableCell>
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
        <div className="block md:hidden">
          <TableMobileList>
            <TableMobileItem>
              <span className="type-body-sm text-foreground"><strong>value</strong></span>
              <span className="type-caption text-muted-foreground"><code className="rounded px-1 py-0.5 font-mono bg-surface-subtle">string</code></span>
              <span className="type-caption text-muted-foreground">Unique identifier for this item. Required.</span>
            </TableMobileItem>
            <TableMobileItem>
              <span className="type-body-sm text-foreground"><strong>children</strong></span>
              <span className="type-caption text-muted-foreground"><code className="rounded px-1 py-0.5 font-mono bg-surface-subtle">ReactNode</code></span>
              <span className="type-caption text-muted-foreground">AccordionTrigger and AccordionContent for this item.</span>
            </TableMobileItem>
            <TableMobileItem>
              <span className="type-body-sm text-foreground"><strong>disabled</strong></span>
              <span className="type-caption text-muted-foreground"><code className="rounded px-1 py-0.5 font-mono bg-surface-subtle">boolean</code> · default <code className="rounded px-1 py-0.5 font-mono bg-surface-subtle">false</code></span>
              <span className="type-caption text-muted-foreground">Prevents interaction and removes item from keyboard navigation.</span>
            </TableMobileItem>
            <TableMobileItem>
              <span className="type-body-sm text-foreground"><strong>className</strong></span>
              <span className="type-caption text-muted-foreground"><code className="rounded px-1 py-0.5 font-mono bg-surface-subtle">string</code></span>
              <span className="type-caption text-muted-foreground">Merged via cn(). Use for layout utilities only.</span>
            </TableMobileItem>
          </TableMobileList>
        </div>
      </div>

      {/* AccordionTrigger */}
      <h3 className="type-h3 mt-8 mb-2 text-foreground">AccordionTrigger</h3>
      <p className="type-body mb-2 text-foreground max-w-prose">
        Button that toggles the content panel. Wrapped in a Radix header for accessibility.
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
                <TableCell><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle">children</code></TableCell>
                <TableCell><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle">ReactNode</code></TableCell>
                <TableCell>—</TableCell>
                <TableCell>The trigger label text or content.</TableCell>
              </TableRow>
              <TableRow>
                <TableCell><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle">showChevron</code></TableCell>
                <TableCell><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle">boolean</code></TableCell>
                <TableCell><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle">true</code></TableCell>
                <TableCell>Whether to show the chevron indicator on the right side.</TableCell>
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
        <div className="block md:hidden">
          <TableMobileList>
            <TableMobileItem>
              <span className="type-body-sm text-foreground"><strong>children</strong></span>
              <span className="type-caption text-muted-foreground"><code className="rounded px-1 py-0.5 font-mono bg-surface-subtle">ReactNode</code></span>
              <span className="type-caption text-muted-foreground">The trigger label text or content.</span>
            </TableMobileItem>
            <TableMobileItem>
              <span className="type-body-sm text-foreground"><strong>showChevron</strong></span>
              <span className="type-caption text-muted-foreground"><code className="rounded px-1 py-0.5 font-mono bg-surface-subtle">boolean</code> · default <code className="rounded px-1 py-0.5 font-mono bg-surface-subtle">true</code></span>
              <span className="type-caption text-muted-foreground">Whether to show the chevron indicator on the right side.</span>
            </TableMobileItem>
            <TableMobileItem>
              <span className="type-body-sm text-foreground"><strong>className</strong></span>
              <span className="type-caption text-muted-foreground"><code className="rounded px-1 py-0.5 font-mono bg-surface-subtle">string</code></span>
              <span className="type-caption text-muted-foreground">Merged via cn(). Use for layout utilities only.</span>
            </TableMobileItem>
          </TableMobileList>
        </div>
      </div>

      {/* AccordionContent */}
      <h3 className="type-h3 mt-8 mb-2 text-foreground">AccordionContent</h3>
      <p className="type-body mb-2 text-foreground max-w-prose">
        The collapsible panel that reveals when its parent item is open. Animates height on expand and collapse.
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
                <TableCell><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle">children</code></TableCell>
                <TableCell><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle">ReactNode</code></TableCell>
                <TableCell>—</TableCell>
                <TableCell>The content revealed when the item is open.</TableCell>
              </TableRow>
              <TableRow>
                <TableCell><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle">className</code></TableCell>
                <TableCell><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle">string</code></TableCell>
                <TableCell>—</TableCell>
                <TableCell>Merged via cn(). Applied to the inner content wrapper.</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
        <div className="block md:hidden">
          <TableMobileList>
            <TableMobileItem>
              <span className="type-body-sm text-foreground"><strong>children</strong></span>
              <span className="type-caption text-muted-foreground"><code className="rounded px-1 py-0.5 font-mono bg-surface-subtle">ReactNode</code></span>
              <span className="type-caption text-muted-foreground">The content revealed when the item is open.</span>
            </TableMobileItem>
            <TableMobileItem>
              <span className="type-body-sm text-foreground"><strong>className</strong></span>
              <span className="type-caption text-muted-foreground"><code className="rounded px-1 py-0.5 font-mono bg-surface-subtle">string</code></span>
              <span className="type-caption text-muted-foreground">Merged via cn(). Applied to the inner content wrapper.</span>
            </TableMobileItem>
          </TableMobileList>
        </div>
      </div>

      {/* -- Keyboard interactions ----------------------------------- */}
      <h2 className="type-h2 mt-8 mb-4 text-foreground">Keyboard interactions</h2>
      <p className="type-body mb-4 text-foreground max-w-prose">
        Accordion provides built-in keyboard navigation via Radix. Triggers
        are reachable with <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">Tab</code>;
        once focused, the keys below operate within the accordion. Disabled
        items are skipped automatically.
      </p>
      <div className="my-6">
        <div className="hidden md:block">
          <Table size="sm">
            <TableHeader>
              <TableRow>
                <TableHead>Key</TableHead>
                <TableHead>Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle">Space</code> / <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle">Enter</code></TableCell>
                <TableCell>Toggles the focused trigger open or closed.</TableCell>
              </TableRow>
              <TableRow>
                <TableCell><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle">↓</code> (Arrow Down)</TableCell>
                <TableCell>Moves focus to the next trigger.</TableCell>
              </TableRow>
              <TableRow>
                <TableCell><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle">↑</code> (Arrow Up)</TableCell>
                <TableCell>Moves focus to the previous trigger.</TableCell>
              </TableRow>
              <TableRow>
                <TableCell><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle">Home</code></TableCell>
                <TableCell>Moves focus to the first trigger.</TableCell>
              </TableRow>
              <TableRow>
                <TableCell><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle">End</code></TableCell>
                <TableCell>Moves focus to the last trigger.</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
        <div className="block md:hidden">
          <TableMobileList>
            <TableMobileItem>
              <span className="type-body-sm text-foreground"><strong>Space / Enter</strong></span>
              <span className="type-caption text-muted-foreground">Toggles the focused trigger open or closed.</span>
            </TableMobileItem>
            <TableMobileItem>
              <span className="type-body-sm text-foreground"><strong>↓ (Arrow Down)</strong></span>
              <span className="type-caption text-muted-foreground">Moves focus to the next trigger.</span>
            </TableMobileItem>
            <TableMobileItem>
              <span className="type-body-sm text-foreground"><strong>↑ (Arrow Up)</strong></span>
              <span className="type-caption text-muted-foreground">Moves focus to the previous trigger.</span>
            </TableMobileItem>
            <TableMobileItem>
              <span className="type-body-sm text-foreground"><strong>Home</strong></span>
              <span className="type-caption text-muted-foreground">Moves focus to the first trigger.</span>
            </TableMobileItem>
            <TableMobileItem>
              <span className="type-body-sm text-foreground"><strong>End</strong></span>
              <span className="type-caption text-muted-foreground">Moves focus to the last trigger.</span>
            </TableMobileItem>
          </TableMobileList>
        </div>
      </div>

    </Container>
  )
}
