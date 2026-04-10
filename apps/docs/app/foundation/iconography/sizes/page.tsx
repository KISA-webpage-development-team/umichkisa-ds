import {
  Container,
  Divider,
  Icon,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@umichkisa-ds/web'
import { CodeBlock } from '@/components/CodeBlock'
import { InlineCode } from '@/components/InlineCode'
import { Heading } from '@/components/Heading'
export default async function IconographySizesPage() {
  return (
    <Container size="md" as="article">

      {/* ── Header ──────────────────────────────────────────── */}
      <h1 className="type-h1 font-sejong-bold tracking-tight mb-4 text-foreground">Icon Sizes</h1>
      <p className="type-body mb-4 text-foreground max-w-prose">
        Icons do not have one right size. A navigation icon and a display illustration
        serve different purposes and live in different contexts. The size scale exists so
        you never have to pick a size by eye — you pick a size by context.
      </p>

      <Divider className="my-8" />

      {/* ── The Scale ───────────────────────────────────────── */}
      <Heading as="h2">The Scale</Heading>

      <div className="my-6">
        <Table size="sm">
          <TableHeader>
            <TableRow>
              <TableHead>Preview</TableHead>
              <TableHead>Token</TableHead>
              <TableHead>px</TableHead>
              <TableHead>Use case</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell><Icon name="info" size="xs" /></TableCell>
              <TableCell><InlineCode>xs</InlineCode></TableCell>
              <TableCell>12px</TableCell>
              <TableCell>Inline with caption text, badge labels</TableCell>
            </TableRow>
            <TableRow>
              <TableCell><Icon name="info" size="sm" /></TableCell>
              <TableCell><InlineCode>sm</InlineCode></TableCell>
              <TableCell>16px</TableCell>
              <TableCell>Compact UI — tags, small inputs, secondary actions</TableCell>
            </TableRow>
            <TableRow>
              <TableCell><Icon name="info" size="md" /></TableCell>
              <TableCell><InlineCode>md</InlineCode></TableCell>
              <TableCell>20px</TableCell>
              <TableCell><strong>Default</strong> — buttons, nav items, most UI</TableCell>
            </TableRow>
            <TableRow>
              <TableCell><Icon name="info" size="lg" /></TableCell>
              <TableCell><InlineCode>lg</InlineCode></TableCell>
              <TableCell>24px</TableCell>
              <TableCell>Prominent actions, section headers</TableCell>
            </TableRow>
            <TableRow>
              <TableCell><Icon name="info" size="xl" /></TableCell>
              <TableCell><InlineCode>xl</InlineCode></TableCell>
              <TableCell>32px</TableCell>
              <TableCell>Display, empty states, decorative</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>

      <p className="type-body mb-4 text-foreground max-w-prose">
        The scale is built on the 4px grid. Every step is a clean, intentional jump —
        not an arbitrary intermediate value.
      </p>

      <Divider className="my-8" />

      {/* ── Default is md ───────────────────────────────────── */}
      <Heading as="h2">The Default Size</Heading>
      <p className="type-body mb-4 text-foreground max-w-prose">
        When in doubt, use{' '}
        <InlineCode>md</InlineCode>.
        {' '}The 20px default is calibrated to pair with body text and read clearly
        across the most common UI contexts.
      </p>
      <p className="type-body mb-4 text-foreground max-w-prose">
        Only deviate from{' '}
        <InlineCode>md</InlineCode>{' '}
        when you have a specific reason tied to context — not
        because something {'"'}looks better{'"'} at a different size.
      </p>

      <Divider className="my-8" />

      {/* ── Never Size with Font-Size ───────────────────────── */}
      <Heading as="h2">Never Size with Font-Size</Heading>
      <p className="type-body mb-4 text-foreground max-w-prose">
        Icons are SVGs. Their size is controlled by{' '}
        <InlineCode>width</InlineCode>{' '}
        and{' '}
        <InlineCode>height</InlineCode>{' '}
        — not by{' '}
        <InlineCode>font-size</InlineCode>{' '}
        or{' '}
        <InlineCode>text-xl</InlineCode>{' '}
        utility classes.
      </p>
      <p className="type-body mb-4 text-foreground max-w-prose">
        The previous approach in the KISA client applied Tailwind text size classes
        (<InlineCode>text-lg</InlineCode>,{' '}
        <InlineCode>text-2xl</InlineCode>)
        {' '}to icon components. This worked by accident in some
        cases because some icon libraries read from{' '}
        <InlineCode>font-size</InlineCode>.
        {' '}It is not reliable, not predictable, and not how SVG sizing works.
      </p>
      <p className="type-body mb-4 text-foreground max-w-prose">
        The{' '}
        <InlineCode>{'<Icon>'}</InlineCode>{' '}
        component translates the{' '}
        <InlineCode>size</InlineCode>{' '}
        prop directly to{' '}
        <InlineCode>width</InlineCode>{' '}
        and{' '}
        <InlineCode>height</InlineCode>{' '}
        attributes on the SVG. Never override icon size with font utilities.
      </p>

      <Divider className="my-8" />

      {/* ── Pairing Icons with Text ─────────────────────────── */}
      <Heading as="h2">Pairing Icons with Text</Heading>
      <p className="type-body mb-4 text-foreground max-w-prose">
        Icons should feel like they belong with the text next to them, not like they
        were dropped in at a different scale.
      </p>

      <div className="my-6">
        <Table size="sm">
          <TableHeader>
            <TableRow>
              <TableHead>Preview</TableHead>
              <TableHead>Text style</TableHead>
              <TableHead>Icon size</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell>
                <span className="flex items-center gap-2 text-foreground">
                  <Icon name="info" size="sm" />
                  <span className="type-caption">Caption text</span>
                </span>
              </TableCell>
              <TableCell><InlineCode>type-caption</InlineCode> / <InlineCode>type-body-sm</InlineCode></TableCell>
              <TableCell><InlineCode>sm</InlineCode> (16px)</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <span className="flex items-center gap-2 text-foreground">
                  <Icon name="info" size="md" />
                  <span className="type-body">Body text</span>
                </span>
              </TableCell>
              <TableCell><InlineCode>type-body</InlineCode></TableCell>
              <TableCell><InlineCode>md</InlineCode> (20px)</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <span className="flex items-center gap-2 text-foreground">
                  <Icon name="info" size="md" />
                  <span className="type-h3">Subheading</span>
                </span>
              </TableCell>
              <TableCell><InlineCode>type-h3</InlineCode></TableCell>
              <TableCell><InlineCode>md</InlineCode> or <InlineCode>lg</InlineCode> (20–24px)</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <span className="flex items-center gap-2 text-foreground">
                  <Icon name="info" size="lg" />
                  <span className="type-h2">Heading</span>
                </span>
              </TableCell>
              <TableCell><InlineCode>type-h2</InlineCode></TableCell>
              <TableCell><InlineCode>lg</InlineCode> (24px)</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>

      <p className="type-body mb-4 text-foreground max-w-prose">
        The icon should be slightly smaller than the text{"'"}s cap height, not matched to
        it. An icon at the exact same pixel height as the text usually reads as
        slightly too large. Trust the scale — it is calibrated for this.
      </p>

      <Divider className="my-8" />

      {/* ── Never Apply Breakpoints to Icon Size ────────────── */}
      <Heading as="h2">Never Apply Breakpoints to Icon Size</Heading>
      <p className="type-body mb-4 text-foreground max-w-prose">
        Icon size is determined by context — the component the icon lives in — not by the viewport width. Never use breakpoint prefixes on the{' '}
        <InlineCode>size</InlineCode>{' '}
        prop or on any class that affects icon dimensions.
      </p>
      <p className="type-body mb-4 text-foreground max-w-prose">
        If a component changes size across breakpoints (a button that is compact on mobile and default on desktop), the icon size change is handled inside that component{"'"}s variant logic. The{' '}
        <InlineCode>{'<Icon>'}</InlineCode>{' '}
        itself receives a fixed{' '}
        <InlineCode>size</InlineCode>{' '}
        prop.
      </p>

      <CodeBlock code={`// ✅ correct — fixed size, component handles responsiveness
<Icon name="search" size="md" />

// ❌ wrong — breakpoint prefix on icon size
<Icon name="search" size="sm" className="md:w-5 md:h-5" />`} lang="tsx" />

    </Container>
  )
}
