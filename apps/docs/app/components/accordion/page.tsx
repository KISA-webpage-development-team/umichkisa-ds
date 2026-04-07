import { Container, Accordion, AccordionItem, AccordionTrigger, AccordionContent } from '@umichkisa-ds/web'
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
      <p className="type-body-sm mb-8 text-muted-foreground max-w-prose">
        Use Accordion for progressive disclosure — FAQs, settings panels,
        step-by-step guides. For tabbed content that shows one panel at a
        time without collapsing, use Tabs.
      </p>

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
        numbered steps or custom trigger layouts.
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
              <td className="px-4 py-3 text-foreground"><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle">type</code></td>
              <td className="px-4 py-3 text-foreground"><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle">&quot;single&quot; | &quot;multiple&quot;</code></td>
              <td className="px-4 py-3 text-foreground"><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle">&quot;single&quot;</code></td>
              <td className="px-4 py-3 type-body-sm text-foreground">Whether one or many items can be open at the same time.</td>
            </tr>
            <tr className="border-b border-border">
              <td className="px-4 py-3 text-foreground"><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle">value</code></td>
              <td className="px-4 py-3 text-foreground"><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle">string | string[]</code></td>
              <td className="px-4 py-3 type-body-sm text-foreground">—</td>
              <td className="px-4 py-3 type-body-sm text-foreground">Controlled open state. String for single, array for multiple.</td>
            </tr>
            <tr className="border-b border-border">
              <td className="px-4 py-3 text-foreground"><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle">defaultValue</code></td>
              <td className="px-4 py-3 text-foreground"><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle">string | string[]</code></td>
              <td className="px-4 py-3 type-body-sm text-foreground">—</td>
              <td className="px-4 py-3 type-body-sm text-foreground">Initial open state for uncontrolled usage.</td>
            </tr>
            <tr className="border-b border-border">
              <td className="px-4 py-3 text-foreground"><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle">onValueChange</code></td>
              <td className="px-4 py-3 text-foreground"><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle">(value: string | string[]) =&gt; void</code></td>
              <td className="px-4 py-3 type-body-sm text-foreground">—</td>
              <td className="px-4 py-3 type-body-sm text-foreground">Callback when the open items change.</td>
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

      {/* AccordionItem */}
      <h3 className="type-h3 mt-8 mb-2 text-foreground">AccordionItem</h3>
      <p className="type-body mb-2 text-foreground max-w-prose">
        Wraps a single collapsible section — a trigger and its content panel.
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
              <td className="px-4 py-3 type-body-sm text-foreground">Unique identifier for this item. Required.</td>
            </tr>
            <tr className="border-b border-border">
              <td className="px-4 py-3 text-foreground"><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle">children</code></td>
              <td className="px-4 py-3 text-foreground"><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle">ReactNode</code></td>
              <td className="px-4 py-3 type-body-sm text-foreground">—</td>
              <td className="px-4 py-3 type-body-sm text-foreground">AccordionTrigger and AccordionContent for this item.</td>
            </tr>
            <tr className="border-b border-border">
              <td className="px-4 py-3 text-foreground"><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle">disabled</code></td>
              <td className="px-4 py-3 text-foreground"><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle">boolean</code></td>
              <td className="px-4 py-3 text-foreground"><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle">false</code></td>
              <td className="px-4 py-3 type-body-sm text-foreground">Prevents interaction and removes item from keyboard navigation.</td>
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

      {/* AccordionTrigger */}
      <h3 className="type-h3 mt-8 mb-2 text-foreground">AccordionTrigger</h3>
      <p className="type-body mb-2 text-foreground max-w-prose">
        Button that toggles the content panel. Wrapped in a Radix header for accessibility.
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
              <td className="px-4 py-3 text-foreground"><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle">children</code></td>
              <td className="px-4 py-3 text-foreground"><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle">ReactNode</code></td>
              <td className="px-4 py-3 type-body-sm text-foreground">—</td>
              <td className="px-4 py-3 type-body-sm text-foreground">The trigger label text or content.</td>
            </tr>
            <tr className="border-b border-border">
              <td className="px-4 py-3 text-foreground"><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle">showChevron</code></td>
              <td className="px-4 py-3 text-foreground"><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle">boolean</code></td>
              <td className="px-4 py-3 text-foreground"><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle">true</code></td>
              <td className="px-4 py-3 type-body-sm text-foreground">Whether to show the chevron indicator on the right side.</td>
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

      {/* AccordionContent */}
      <h3 className="type-h3 mt-8 mb-2 text-foreground">AccordionContent</h3>
      <p className="type-body mb-2 text-foreground max-w-prose">
        The collapsible panel that reveals when its parent item is open. Animates height on expand and collapse.
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
              <td className="px-4 py-3 text-foreground"><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle">children</code></td>
              <td className="px-4 py-3 text-foreground"><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle">ReactNode</code></td>
              <td className="px-4 py-3 type-body-sm text-foreground">—</td>
              <td className="px-4 py-3 type-body-sm text-foreground">The content revealed when the item is open.</td>
            </tr>
            <tr className="border-b border-border">
              <td className="px-4 py-3 text-foreground"><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle">className</code></td>
              <td className="px-4 py-3 text-foreground"><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle">string</code></td>
              <td className="px-4 py-3 type-body-sm text-foreground">—</td>
              <td className="px-4 py-3 type-body-sm text-foreground">Merged via cn(). Applied to the inner content wrapper.</td>
            </tr>
          </tbody>
        </table>
      </div>

    </Container>
  )
}
