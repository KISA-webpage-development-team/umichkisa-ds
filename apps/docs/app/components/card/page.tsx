import { Container, Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter, Button, Badge, Avatar, Grid, Icon } from '@umichkisa-ds/web'
import { ComponentPreview } from '@/components/ComponentPreview'
import { CodeBlock } from '@/components/CodeBlock'
import { highlight } from '@/lib/highlight'

const basicCode = `import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@umichkisa-ds/web'

<Card>
  <CardHeader>
    <CardTitle>Spring General Meeting</CardTitle>
    <CardDescription>Join us for KISA's spring semester kickoff event.</CardDescription>
  </CardHeader>
  <CardContent>
    <p className="type-body-sm text-foreground">
      March 15, 2025 at 6:00 PM — Michigan Union, Room 2210.
      We'll cover upcoming events, new member introductions, and project team signups.
    </p>
  </CardContent>
</Card>`

const withFooterCode = `import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter, Button, Badge } from '@umichkisa-ds/web'

<Card>
  <CardHeader>
    <div className="flex items-center justify-between">
      <CardTitle>Korean Culture Night</CardTitle>
      <Badge variant="info">Upcoming</Badge>
    </div>
    <CardDescription>Annual showcase of Korean culture, food, and performances.</CardDescription>
  </CardHeader>
  <CardContent>
    <p className="type-body-sm text-foreground">
      April 5, 2025 — Rackham Auditorium. Doors open at 5:30 PM.
      Featuring traditional dance, K-pop covers, and Korean street food.
    </p>
  </CardContent>
  <CardFooter>
    <Button>RSVP</Button>
    <Button variant="primary">Learn more</Button>
  </CardFooter>
</Card>`

const gridCode = `import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter, Button, Grid } from '@umichkisa-ds/web'

<Grid columns={3}>
  <Card>
    <CardHeader>
      <CardTitle>Dev Team</CardTitle>
      <CardDescription>Build tools and websites for KISA.</CardDescription>
    </CardHeader>
    <CardContent>
      <p className="type-body-sm text-foreground">
        Work on the KISA website, design system, and internal tools
        using React, Next.js, and TypeScript.
      </p>
    </CardContent>
    <CardFooter>
      <Button>Apply</Button>
    </CardFooter>
  </Card>

  <Card>
    <CardHeader>
      <CardTitle>Media Team</CardTitle>
      <CardDescription>Capture and share KISA moments.</CardDescription>
    </CardHeader>
    <CardContent>
      <p className="type-body-sm text-foreground">
        Photography, videography, and social media management
        for all KISA events and announcements.
      </p>
    </CardContent>
    <CardFooter>
      <Button>Apply</Button>
    </CardFooter>
  </Card>

  <Card>
    <CardHeader>
      <CardTitle>Events Team</CardTitle>
      <CardDescription>Plan and run KISA events.</CardDescription>
    </CardHeader>
    <CardContent>
      <p className="type-body-sm text-foreground">
        Organize cultural nights, socials, workshops, and
        collaborations with other student orgs.
      </p>
    </CardContent>
    <CardFooter>
      <Button>Apply</Button>
    </CardFooter>
  </Card>
</Grid>`

const compositionCode = `import { Card, CardContent, CardFooter, Avatar, Button, Icon } from '@umichkisa-ds/web'

<Card className="max-w-sm">
  <CardContent className="flex flex-col items-center gap-4">
    <Avatar src="/avatars/member.jpg" name="Jioh In" size="lg" />
    <div className="text-center">
      <p className="type-body text-foreground"><strong>Jioh In</strong></p>
      <p className="type-body-sm text-muted-foreground">Dev Team Lead</p>
    </div>
    <div className="flex items-center gap-4 text-muted-foreground">
      <Icon name="github" size="sm" />
      <Icon name="linkedin" size="sm" />
      <Icon name="mail" size="sm" />
    </div>
  </CardContent>
  <CardFooter className="justify-center">
    <Button variant="primary" size="sm">View profile</Button>
  </CardFooter>
</Card>`

export default async function CardPage() {
  const [basicHighlighted, withFooterHighlighted, gridHighlighted, compositionHighlighted] = await Promise.all([
    highlight(basicCode),
    highlight(withFooterCode),
    highlight(gridCode),
    highlight(compositionCode),
  ]);

  return (
    <Container size="md" as="article">

      {/* -- Header -------------------------------------------------- */}
      <h1 className="type-h1 mb-4 text-foreground">Card</h1>
      <p className="type-body mb-4 text-foreground max-w-prose">
        A container for grouping related content and actions into a single visual
        unit with a subtle background and border.
      </p>
      <p className="type-body-sm mb-8 text-muted-foreground max-w-prose">
        Compose Card from its sub-components — CardHeader, CardTitle,
        CardDescription, CardContent, and CardFooter — to build flexible
        layouts for events, profiles, project teams, and more.
      </p>

      {/* -- Anatomy -------------------------------------------------- */}
      <h2 className="type-h2 mt-8 mb-4 text-foreground">Anatomy</h2>
      <CodeBlock code={`Card              ← p-4 gap-4, border + background
  CardHeader      ← flex-col gap-2 (groups title + description)
    CardTitle     ← heading (h3 by default)
    CardDescription ← muted supporting text
  CardContent     ← flex-1 (stretches to fill)
  CardFooter      ← flex row, gap-2`} lang="text" />

      {/* -- Examples ------------------------------------------------- */}
      <h2 className="type-h2 mt-8 mb-4 text-foreground">Examples</h2>

      {/* Basic */}
      <h3 className="type-h3 mt-6 mb-2 text-foreground">Basic</h3>
      <p className="type-body mb-2 text-foreground max-w-prose">
        A card with a header (title + description) and content section. Use this
        pattern for event announcements or informational blocks.
      </p>
      <ComponentPreview code={basicCode} highlightedCode={basicHighlighted}>
        <Card className="max-w-md">
          <CardHeader>
            <CardTitle>Spring General Meeting</CardTitle>
            <CardDescription>Join us for KISA's spring semester kickoff event.</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="type-body-sm text-foreground">
              March 15, 2025 at 6:00 PM — Michigan Union, Room 2210.
              We'll cover upcoming events, new member introductions, and project team signups.
            </p>
          </CardContent>
        </Card>
      </ComponentPreview>

      {/* With Footer */}
      <h3 className="type-h3 mt-8 mb-2 text-foreground">With footer</h3>
      <p className="type-body mb-2 text-foreground max-w-prose">
        Add a CardFooter for action buttons. Combine with Badge for status
        indicators in the header.
      </p>
      <ComponentPreview code={withFooterCode} highlightedCode={withFooterHighlighted}>
        <Card className="max-w-md">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Korean Culture Night</CardTitle>
              <Badge variant="info">Upcoming</Badge>
            </div>
            <CardDescription>Annual showcase of Korean culture, food, and performances.</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="type-body-sm text-foreground">
              April 5, 2025 — Rackham Auditorium. Doors open at 5:30 PM.
              Featuring traditional dance, K-pop covers, and Korean street food.
            </p>
          </CardContent>
          <CardFooter>
            <Button>RSVP</Button>
            <Button variant="primary">Learn more</Button>
          </CardFooter>
        </Card>
      </ComponentPreview>

      {/* Cards in Grid */}
      <h3 className="type-h3 mt-8 mb-2 text-foreground">Cards in a grid</h3>
      <p className="type-body mb-2 text-foreground max-w-prose">
        Place cards inside a Grid for multi-column layouts. Cards fill
        their column width — control the layout through Grid, not Card.
      </p>
      <ComponentPreview code={gridCode} highlightedCode={gridHighlighted}>
        <Grid columns={3}>
          <Card>
            <CardHeader>
              <CardTitle>Dev Team</CardTitle>
              <CardDescription>Build tools and websites for KISA.</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="type-body-sm text-foreground">
                Work on the KISA website, design system, and internal tools
                using React, Next.js, and TypeScript.
              </p>
            </CardContent>
            <CardFooter>
              <Button>Apply</Button>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Media Team</CardTitle>
              <CardDescription>Capture and share KISA moments.</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="type-body-sm text-foreground">
                Photography, videography, and social media management
                for all KISA events and announcements.
              </p>
            </CardContent>
            <CardFooter>
              <Button>Apply</Button>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Events Team</CardTitle>
              <CardDescription>Plan and run KISA events.</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="type-body-sm text-foreground">
                Organize cultural nights, socials, workshops, and
                collaborations with other student orgs.
              </p>
            </CardContent>
            <CardFooter>
              <Button>Apply</Button>
            </CardFooter>
          </Card>
        </Grid>
      </ComponentPreview>

      {/* Custom Composition */}
      <h3 className="type-h3 mt-8 mb-2 text-foreground">Custom composition</h3>
      <p className="type-body mb-2 text-foreground max-w-prose">
        Sub-components are fully composable. Skip CardHeader entirely and
        arrange content freely. Here, a member profile card with centered layout.
      </p>
      <ComponentPreview code={compositionCode} highlightedCode={compositionHighlighted}>
        <Card className="max-w-sm">
          <CardContent className="flex flex-col items-center gap-4">
            <Avatar src="/avatars/member.jpg" name="Jioh In" size="lg" />
            <div className="text-center">
              <p className="type-body text-foreground"><strong>Jioh In</strong></p>
              <p className="type-body-sm text-muted-foreground">Dev Team Lead</p>
            </div>
            <div className="flex items-center gap-4 text-muted-foreground">
              <Icon name="github" size="sm" />
              <Icon name="linkedin" size="sm" />
              <Icon name="mail" size="sm" />
            </div>
          </CardContent>
          <CardFooter className="justify-center">
            <Button variant="primary" size="sm">View profile</Button>
          </CardFooter>
        </Card>
      </ComponentPreview>

      {/* -- API Reference -------------------------------------------- */}
      <h2 className="type-h2 mt-8 mb-4 text-foreground">API Reference</h2>
      <p className="type-body mb-4 text-foreground max-w-prose">
        Card is composed from several sub-components. Each accepts the props listed below plus
        standard HTML attributes via <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">className</code> and spread props.
      </p>

      {/* Card */}
      <h3 className="type-h3 mt-8 mb-2 text-foreground">Card</h3>
      <p className="type-body mb-2 text-foreground max-w-prose">
        Outer container with p-4 padding, gap-4 between children, surface-subtle background,
        border, and rounded corners. Use <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">!p-0</code> for edge-to-edge bleed layouts.
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
              <td className="px-4 py-3 type-body-sm text-foreground">Card sub-components (CardHeader, CardContent, CardFooter, etc.).</td>
            </tr>
            <tr className="border-b border-border">
              <td className="px-4 py-3 text-foreground"><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle">className</code></td>
              <td className="px-4 py-3 text-foreground"><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle">string</code></td>
              <td className="px-4 py-3 type-body-sm text-foreground">—</td>
              <td className="px-4 py-3 type-body-sm text-foreground">Merged via cn(). Use for width constraints or layout utilities.</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* CardHeader */}
      <h3 className="type-h3 mt-8 mb-2 text-foreground">CardHeader</h3>
      <p className="type-body mb-2 text-foreground max-w-prose">
        Groups CardTitle and CardDescription with element-tier spacing (gap-2).
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
              <td className="px-4 py-3 type-body-sm text-foreground">Header content — typically CardTitle and CardDescription.</td>
            </tr>
            <tr className="border-b border-border">
              <td className="px-4 py-3 text-foreground"><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle">className</code></td>
              <td className="px-4 py-3 text-foreground"><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle">string</code></td>
              <td className="px-4 py-3 type-body-sm text-foreground">—</td>
              <td className="px-4 py-3 type-body-sm text-foreground">Merged via cn().</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* CardTitle */}
      <h3 className="type-h3 mt-8 mb-2 text-foreground">CardTitle</h3>
      <p className="type-body mb-2 text-foreground max-w-prose">
        Heading for the card. Renders as an h3 by default — change with the <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">as</code> prop to match your heading hierarchy.
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
              <td className="px-4 py-3 text-foreground"><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle">as</code></td>
              <td className="px-4 py-3 text-foreground"><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle">&quot;h1&quot; | &quot;h2&quot; | ... | &quot;h6&quot;</code></td>
              <td className="px-4 py-3 text-foreground"><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle">&quot;h3&quot;</code></td>
              <td className="px-4 py-3 type-body-sm text-foreground">HTML heading element to render.</td>
            </tr>
            <tr className="border-b border-border">
              <td className="px-4 py-3 text-foreground"><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle">children</code></td>
              <td className="px-4 py-3 text-foreground"><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle">ReactNode</code></td>
              <td className="px-4 py-3 type-body-sm text-foreground">—</td>
              <td className="px-4 py-3 type-body-sm text-foreground">The title text.</td>
            </tr>
            <tr className="border-b border-border">
              <td className="px-4 py-3 text-foreground"><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle">className</code></td>
              <td className="px-4 py-3 text-foreground"><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle">string</code></td>
              <td className="px-4 py-3 type-body-sm text-foreground">—</td>
              <td className="px-4 py-3 type-body-sm text-foreground">Merged via cn(). Use <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">line-clamp-2</code> for truncation.</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* CardDescription */}
      <h3 className="type-h3 mt-8 mb-2 text-foreground">CardDescription</h3>
      <p className="type-body mb-2 text-foreground max-w-prose">
        Supporting text below the title. Rendered as a paragraph with muted color.
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
              <td className="px-4 py-3 type-body-sm text-foreground">The description text.</td>
            </tr>
            <tr className="border-b border-border">
              <td className="px-4 py-3 text-foreground"><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle">className</code></td>
              <td className="px-4 py-3 text-foreground"><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle">string</code></td>
              <td className="px-4 py-3 type-body-sm text-foreground">—</td>
              <td className="px-4 py-3 type-body-sm text-foreground">Merged via cn(). Use <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">line-clamp-3</code> for truncation.</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* CardContent */}
      <h3 className="type-h3 mt-8 mb-2 text-foreground">CardContent</h3>
      <p className="type-body mb-2 text-foreground max-w-prose">
        Main body area. Grows to fill available vertical space (flex-1) so
        footers pin to the bottom in equal-height grid layouts.
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
              <td className="px-4 py-3 type-body-sm text-foreground">Body content — text, images, lists, or any custom layout.</td>
            </tr>
            <tr className="border-b border-border">
              <td className="px-4 py-3 text-foreground"><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle">className</code></td>
              <td className="px-4 py-3 text-foreground"><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle">string</code></td>
              <td className="px-4 py-3 type-body-sm text-foreground">—</td>
              <td className="px-4 py-3 type-body-sm text-foreground">Merged via cn(). Use for layout utilities like <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">flex flex-col gap-4</code>.</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* CardFooter */}
      <h3 className="type-h3 mt-8 mb-2 text-foreground">CardFooter</h3>
      <p className="type-body mb-2 text-foreground max-w-prose">
        Bottom section for actions. Renders as a flex row with 8px gap.
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
              <td className="px-4 py-3 type-body-sm text-foreground">Action buttons or supplementary content.</td>
            </tr>
            <tr className="border-b border-border">
              <td className="px-4 py-3 text-foreground"><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle">className</code></td>
              <td className="px-4 py-3 text-foreground"><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle">string</code></td>
              <td className="px-4 py-3 type-body-sm text-foreground">—</td>
              <td className="px-4 py-3 type-body-sm text-foreground">Merged via cn(). Use <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">justify-center</code> or <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">justify-end</code> to change alignment.</td>
            </tr>
          </tbody>
        </table>
      </div>

    </Container>
  )
}
