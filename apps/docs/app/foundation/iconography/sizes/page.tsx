import {
  Container,
  Icon,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@umichkisa-ds/web'
import { CodeBlock } from '@/components/CodeBlock'
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

      <hr className="my-8 border-0 border-t border-border" />

      {/* ── The Scale ───────────────────────────────────────── */}
      <h2 className="type-h2 mt-8 mb-4 text-foreground">The Scale</h2>

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
              <TableCell><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">xs</code></TableCell>
              <TableCell>12px</TableCell>
              <TableCell>Inline with caption text, badge labels</TableCell>
            </TableRow>
            <TableRow>
              <TableCell><Icon name="info" size="sm" /></TableCell>
              <TableCell><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">sm</code></TableCell>
              <TableCell>16px</TableCell>
              <TableCell>Compact UI — tags, small inputs, secondary actions</TableCell>
            </TableRow>
            <TableRow>
              <TableCell><Icon name="info" size="md" /></TableCell>
              <TableCell><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">md</code></TableCell>
              <TableCell>20px</TableCell>
              <TableCell><strong>Default</strong> — buttons, nav items, most UI</TableCell>
            </TableRow>
            <TableRow>
              <TableCell><Icon name="info" size="lg" /></TableCell>
              <TableCell><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">lg</code></TableCell>
              <TableCell>24px</TableCell>
              <TableCell>Prominent actions, section headers</TableCell>
            </TableRow>
            <TableRow>
              <TableCell><Icon name="info" size="xl" /></TableCell>
              <TableCell><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">xl</code></TableCell>
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

      <hr className="my-8 border-0 border-t border-border" />

      {/* ── Default is md ───────────────────────────────────── */}
      <h2 className="type-h2 mt-8 mb-4 text-foreground">Default is <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">md</code></h2>
      <p className="type-body mb-4 text-foreground max-w-prose">
        When in doubt, use{' '}
        <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">md</code>.
        {' '}The 20px default is sized to pair comfortably with
        body text, sit correctly in buttons, and read clearly in navigation. It is the
        right choice for the vast majority of UI contexts.
      </p>
      <p className="type-body mb-4 text-foreground max-w-prose">
        Only deviate from{' '}
        <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">md</code>{' '}
        when you have a specific reason tied to context — not
        because something {'"'}looks better{'"'} at a different size.
      </p>

      <hr className="my-8 border-0 border-t border-border" />

      {/* ── Never Size with Font-Size ───────────────────────── */}
      <h2 className="type-h2 mt-8 mb-4 text-foreground">Never Size with Font-Size</h2>
      <p className="type-body mb-4 text-foreground max-w-prose">
        Icons are SVGs. Their size is controlled by{' '}
        <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">width</code>{' '}
        and{' '}
        <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">height</code>{' '}
        — not by{' '}
        <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">font-size</code>{' '}
        or{' '}
        <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">text-xl</code>{' '}
        utility classes.
      </p>
      <p className="type-body mb-4 text-foreground max-w-prose">
        The previous approach in the KISA client applied Tailwind text size classes
        (<code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">text-lg</code>,{' '}
        <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">text-2xl</code>)
        {' '}to icon components. This worked by accident in some
        cases because some icon libraries read from{' '}
        <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">font-size</code>.
        {' '}It is not reliable, not predictable, and not how SVG sizing works.
      </p>
      <p className="type-body mb-4 text-foreground max-w-prose">
        The{' '}
        <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">{'<Icon>'}</code>{' '}
        component translates the{' '}
        <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">size</code>{' '}
        prop directly to{' '}
        <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">width</code>{' '}
        and{' '}
        <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">height</code>{' '}
        attributes on the SVG. Never override icon size with font utilities.
      </p>

      <hr className="my-8 border-0 border-t border-border" />

      {/* ── Pairing Icons with Text ─────────────────────────── */}
      <h2 className="type-h2 mt-8 mb-4 text-foreground">Pairing Icons with Text</h2>
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
              <TableCell><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">type-caption</code> / <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">type-body-sm</code></TableCell>
              <TableCell><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">sm</code> (16px)</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <span className="flex items-center gap-2 text-foreground">
                  <Icon name="info" size="md" />
                  <span className="type-body">Body text</span>
                </span>
              </TableCell>
              <TableCell><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">type-body</code></TableCell>
              <TableCell><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">md</code> (20px)</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <span className="flex items-center gap-2 text-foreground">
                  <Icon name="info" size="md" />
                  <span className="type-h3">Subheading</span>
                </span>
              </TableCell>
              <TableCell><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">type-h3</code></TableCell>
              <TableCell><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">md</code> or <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">lg</code> (20–24px)</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <span className="flex items-center gap-2 text-foreground">
                  <Icon name="info" size="lg" />
                  <span className="type-h2">Heading</span>
                </span>
              </TableCell>
              <TableCell><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">type-h2</code></TableCell>
              <TableCell><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">lg</code> (24px)</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>

      <p className="type-body mb-4 text-foreground max-w-prose">
        The icon should be slightly smaller than the text{"'"}s cap height, not matched to
        it. An icon at the exact same pixel height as the text usually reads as
        slightly too large. Trust the scale — it is calibrated for this.
      </p>

      <hr className="my-8 border-0 border-t border-border" />

      {/* ── Never Apply Breakpoints to Icon Size ────────────── */}
      <h2 className="type-h2 mt-8 mb-4 text-foreground">Never Apply Breakpoints to Icon Size</h2>
      <p className="type-body mb-4 text-foreground max-w-prose">
        Icon size is determined by context — the component the icon lives in — not by the viewport width. Never use breakpoint prefixes on the{' '}
        <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">size</code>{' '}
        prop or on any class that affects icon dimensions.
      </p>
      <p className="type-body mb-4 text-foreground max-w-prose">
        If a component changes size across breakpoints (a button that is compact on mobile and default on desktop), the icon size change is handled inside that component{"'"}s variant logic. The{' '}
        <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">{'<Icon>'}</code>{' '}
        itself receives a fixed{' '}
        <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">size</code>{' '}
        prop.
      </p>

      <CodeBlock code={`// ✅ correct — fixed size, component handles responsiveness
<Icon name="search" size="md" />

// ❌ wrong — breakpoint prefix on icon size
<Icon name="search" size="sm" className="md:w-5 md:h-5" />`} lang="tsx" />

    </Container>
  )
}
