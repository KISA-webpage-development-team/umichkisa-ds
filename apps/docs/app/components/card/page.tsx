import {
  Container,
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
  Button,
  Badge,
  Avatar,
  Grid,
  Icon,
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
import { InlineCode } from '@/components/InlineCode'
import { CodeBlock } from '@/components/CodeBlock'
import { highlight } from '@/lib/highlight'
import { Heading } from '@/components/Heading'

const basicCode = `import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@umichkisa-ds/web'

<Card>
  <CardHeader>
    <CardTitle as="h4">Spring General Meeting</CardTitle>
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
      <CardTitle as="h4">Korean Culture Night</CardTitle>
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
      <CardTitle as="h4">Dev Team</CardTitle>
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
      <CardTitle as="h4">Media Team</CardTitle>
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
      <CardTitle as="h4">Events Team</CardTitle>
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
    <div className="flex items-center gap-3 text-muted-foreground">
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
      <p className="type-body mb-8 text-foreground max-w-prose">
        A container for grouping related content and actions into a single visual
        unit with a subtle background and border.
      </p>

      {/* -- Anatomy -------------------------------------------------- */}
      <Heading as="h2">Anatomy</Heading>
      <CodeBlock code={`Card
  CardHeader
    CardTitle
    CardDescription
  CardContent
  CardFooter`} lang="text" />

      {/* -- Examples ------------------------------------------------- */}
      <Heading as="h2">Examples</Heading>

      {/* Basic */}
      <Heading as="h3" className="mt-6">Basic</Heading>
      <p className="type-body mb-2 text-foreground max-w-prose">
        A card with a header (title + description) and content section. Use this
        pattern for event announcements or informational blocks.
      </p>
      <ComponentPreview code={basicCode} highlightedCode={basicHighlighted}>
        <Card className="max-w-md">
          <CardHeader>
            <CardTitle as="h4">Spring General Meeting</CardTitle>
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
      <Heading as="h3">With footer</Heading>
      <p className="type-body mb-2 text-foreground max-w-prose">
        Add a CardFooter for action buttons. Combine with Badge for status
        indicators in the header.
      </p>
      <ComponentPreview code={withFooterCode} highlightedCode={withFooterHighlighted}>
        <Card className="max-w-md">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle as="h4">Korean Culture Night</CardTitle>
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
      <Heading as="h3">Cards in a grid</Heading>
      <p className="type-body mb-2 text-foreground max-w-prose">
        Place cards inside a Grid for multi-column layouts. Cards fill
        their column width — control the layout through Grid, not Card.
      </p>
      <ComponentPreview code={gridCode} highlightedCode={gridHighlighted}>
        <Grid columns={3}>
          <Card>
            <CardHeader>
              <CardTitle as="h4">Dev Team</CardTitle>
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
              <CardTitle as="h4">Media Team</CardTitle>
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
              <CardTitle as="h4">Events Team</CardTitle>
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
      <Heading as="h3">Custom composition</Heading>
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
            <div className="flex items-center gap-3 text-muted-foreground">
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
      <Heading as="h2">API Reference</Heading>
      <p className="type-body mb-4 text-foreground max-w-prose">
        Card is composed from several sub-components. Each accepts the props listed below plus
        standard HTML attributes via <InlineCode>className</InlineCode> and spread props.
      </p>

      {/* Card */}
      <Heading as="h3">Card</Heading>
      <p className="type-body mb-2 text-foreground max-w-prose">
        Outer container with p-4 padding, gap-4 between children, surface background,
        border, and rounded corners. For edge-to-edge bleed, use negative margins (<InlineCode>-mx-4 -mt-4</InlineCode>) on the child that needs to bleed.
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
                <TableCell><InlineCode>children</InlineCode></TableCell>
                <TableCell><InlineCode>ReactNode</InlineCode></TableCell>
                <TableCell>—</TableCell>
                <TableCell>Card sub-components (CardHeader, CardContent, CardFooter, etc.).</TableCell>
              </TableRow>
              <TableRow>
                <TableCell><InlineCode>className</InlineCode></TableCell>
                <TableCell><InlineCode>string</InlineCode></TableCell>
                <TableCell>—</TableCell>
                <TableCell>Merged via cn(). Use for width constraints or layout utilities.</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
        <div className="block md:hidden">
          <TableMobileList>
            <TableMobileItem>
              <span className="type-body-sm text-foreground"><strong>children</strong></span>
              <span className="type-caption text-muted-foreground"><InlineCode>ReactNode</InlineCode></span>
              <span className="type-caption text-muted-foreground">Card sub-components (CardHeader, CardContent, CardFooter, etc.).</span>
            </TableMobileItem>
            <TableMobileItem>
              <span className="type-body-sm text-foreground"><strong>className</strong></span>
              <span className="type-caption text-muted-foreground"><InlineCode>string</InlineCode></span>
              <span className="type-caption text-muted-foreground">Merged via cn(). Use for width constraints or layout utilities.</span>
            </TableMobileItem>
          </TableMobileList>
        </div>
      </div>

      {/* CardHeader */}
      <Heading as="h3">CardHeader</Heading>
      <p className="type-body mb-2 text-foreground max-w-prose">
        Groups CardTitle and CardDescription with element-tier spacing (gap-2).
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
                <TableCell><InlineCode>children</InlineCode></TableCell>
                <TableCell><InlineCode>ReactNode</InlineCode></TableCell>
                <TableCell>—</TableCell>
                <TableCell>Header content — typically CardTitle and CardDescription.</TableCell>
              </TableRow>
              <TableRow>
                <TableCell><InlineCode>className</InlineCode></TableCell>
                <TableCell><InlineCode>string</InlineCode></TableCell>
                <TableCell>—</TableCell>
                <TableCell>Merged via cn().</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
        <div className="block md:hidden">
          <TableMobileList>
            <TableMobileItem>
              <span className="type-body-sm text-foreground"><strong>children</strong></span>
              <span className="type-caption text-muted-foreground"><InlineCode>ReactNode</InlineCode></span>
              <span className="type-caption text-muted-foreground">Header content — typically CardTitle and CardDescription.</span>
            </TableMobileItem>
            <TableMobileItem>
              <span className="type-body-sm text-foreground"><strong>className</strong></span>
              <span className="type-caption text-muted-foreground"><InlineCode>string</InlineCode></span>
              <span className="type-caption text-muted-foreground">Merged via cn().</span>
            </TableMobileItem>
          </TableMobileList>
        </div>
      </div>

      {/* CardTitle */}
      <Heading as="h3">CardTitle</Heading>
      <p className="type-body mb-2 text-foreground max-w-prose">
        Heading for the card. Renders as an h3 by default — change with the <InlineCode>as</InlineCode> prop to match your heading hierarchy.
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
                <TableCell><InlineCode>as</InlineCode></TableCell>
                <TableCell><InlineCode>&quot;h1&quot; | &quot;h2&quot; | ... | &quot;h6&quot;</InlineCode></TableCell>
                <TableCell><InlineCode>&quot;h3&quot;</InlineCode></TableCell>
                <TableCell>HTML heading element to render.</TableCell>
              </TableRow>
              <TableRow>
                <TableCell><InlineCode>children</InlineCode></TableCell>
                <TableCell><InlineCode>ReactNode</InlineCode></TableCell>
                <TableCell>—</TableCell>
                <TableCell>The title text.</TableCell>
              </TableRow>
              <TableRow>
                <TableCell><InlineCode>className</InlineCode></TableCell>
                <TableCell><InlineCode>string</InlineCode></TableCell>
                <TableCell>—</TableCell>
                <TableCell>Merged via cn(). Use <InlineCode>line-clamp-2</InlineCode> for truncation.</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
        <div className="block md:hidden">
          <TableMobileList>
            <TableMobileItem>
              <span className="type-body-sm text-foreground"><strong>as</strong></span>
              <span className="type-caption text-muted-foreground"><InlineCode>&quot;h1&quot; | &quot;h2&quot; | ... | &quot;h6&quot;</InlineCode> · default <InlineCode>&quot;h3&quot;</InlineCode></span>
              <span className="type-caption text-muted-foreground">HTML heading element to render.</span>
            </TableMobileItem>
            <TableMobileItem>
              <span className="type-body-sm text-foreground"><strong>children</strong></span>
              <span className="type-caption text-muted-foreground"><InlineCode>ReactNode</InlineCode></span>
              <span className="type-caption text-muted-foreground">The title text.</span>
            </TableMobileItem>
            <TableMobileItem>
              <span className="type-body-sm text-foreground"><strong>className</strong></span>
              <span className="type-caption text-muted-foreground"><InlineCode>string</InlineCode></span>
              <span className="type-caption text-muted-foreground">Merged via cn(). Use <InlineCode>line-clamp-2</InlineCode> for truncation.</span>
            </TableMobileItem>
          </TableMobileList>
        </div>
      </div>

      {/* CardDescription */}
      <Heading as="h3">CardDescription</Heading>
      <p className="type-body mb-2 text-foreground max-w-prose">
        Supporting text below the title. Rendered as a paragraph with muted color.
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
                <TableCell><InlineCode>children</InlineCode></TableCell>
                <TableCell><InlineCode>ReactNode</InlineCode></TableCell>
                <TableCell>—</TableCell>
                <TableCell>The description text.</TableCell>
              </TableRow>
              <TableRow>
                <TableCell><InlineCode>className</InlineCode></TableCell>
                <TableCell><InlineCode>string</InlineCode></TableCell>
                <TableCell>—</TableCell>
                <TableCell>Merged via cn(). Use <InlineCode>line-clamp-3</InlineCode> for truncation.</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
        <div className="block md:hidden">
          <TableMobileList>
            <TableMobileItem>
              <span className="type-body-sm text-foreground"><strong>children</strong></span>
              <span className="type-caption text-muted-foreground"><InlineCode>ReactNode</InlineCode></span>
              <span className="type-caption text-muted-foreground">The description text.</span>
            </TableMobileItem>
            <TableMobileItem>
              <span className="type-body-sm text-foreground"><strong>className</strong></span>
              <span className="type-caption text-muted-foreground"><InlineCode>string</InlineCode></span>
              <span className="type-caption text-muted-foreground">Merged via cn(). Use <InlineCode>line-clamp-3</InlineCode> for truncation.</span>
            </TableMobileItem>
          </TableMobileList>
        </div>
      </div>

      {/* CardContent */}
      <Heading as="h3">CardContent</Heading>
      <p className="type-body mb-2 text-foreground max-w-prose">
        Main body area. Grows to fill available vertical space (flex-1) so
        footers pin to the bottom in equal-height grid layouts.
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
                <TableCell><InlineCode>children</InlineCode></TableCell>
                <TableCell><InlineCode>ReactNode</InlineCode></TableCell>
                <TableCell>—</TableCell>
                <TableCell>Body content — text, images, lists, or any custom layout.</TableCell>
              </TableRow>
              <TableRow>
                <TableCell><InlineCode>className</InlineCode></TableCell>
                <TableCell><InlineCode>string</InlineCode></TableCell>
                <TableCell>—</TableCell>
                <TableCell>Merged via cn(). Use for layout utilities like <InlineCode>flex flex-col gap-4</InlineCode>.</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
        <div className="block md:hidden">
          <TableMobileList>
            <TableMobileItem>
              <span className="type-body-sm text-foreground"><strong>children</strong></span>
              <span className="type-caption text-muted-foreground"><InlineCode>ReactNode</InlineCode></span>
              <span className="type-caption text-muted-foreground">Body content — text, images, lists, or any custom layout.</span>
            </TableMobileItem>
            <TableMobileItem>
              <span className="type-body-sm text-foreground"><strong>className</strong></span>
              <span className="type-caption text-muted-foreground"><InlineCode>string</InlineCode></span>
              <span className="type-caption text-muted-foreground">Merged via cn(). Use for layout utilities like <InlineCode>flex flex-col gap-4</InlineCode>.</span>
            </TableMobileItem>
          </TableMobileList>
        </div>
      </div>

      {/* CardFooter */}
      <Heading as="h3">CardFooter</Heading>
      <p className="type-body mb-2 text-foreground max-w-prose">
        Bottom section for actions. Renders as a flex row with 8px gap.
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
                <TableCell><InlineCode>children</InlineCode></TableCell>
                <TableCell><InlineCode>ReactNode</InlineCode></TableCell>
                <TableCell>—</TableCell>
                <TableCell>Action buttons or supplementary content.</TableCell>
              </TableRow>
              <TableRow>
                <TableCell><InlineCode>className</InlineCode></TableCell>
                <TableCell><InlineCode>string</InlineCode></TableCell>
                <TableCell>—</TableCell>
                <TableCell>Merged via cn(). Use <InlineCode>justify-center</InlineCode> or <InlineCode>justify-end</InlineCode> to change alignment.</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
        <div className="block md:hidden">
          <TableMobileList>
            <TableMobileItem>
              <span className="type-body-sm text-foreground"><strong>children</strong></span>
              <span className="type-caption text-muted-foreground"><InlineCode>ReactNode</InlineCode></span>
              <span className="type-caption text-muted-foreground">Action buttons or supplementary content.</span>
            </TableMobileItem>
            <TableMobileItem>
              <span className="type-body-sm text-foreground"><strong>className</strong></span>
              <span className="type-caption text-muted-foreground"><InlineCode>string</InlineCode></span>
              <span className="type-caption text-muted-foreground">Merged via cn(). Use <InlineCode>justify-center</InlineCode> or <InlineCode>justify-end</InlineCode> to change alignment.</span>
            </TableMobileItem>
          </TableMobileList>
        </div>
      </div>

    </Container>
  )
}
