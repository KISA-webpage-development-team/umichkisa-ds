import { Container, Alert, Table, TableHeader, TableBody, TableRow, TableHead, TableCell, TableMobileList, TableMobileItem } from '@umichkisa-ds/web'
import { CodeBlock } from '@/components/CodeBlock'
import { InlineCode } from '@/components/InlineCode'
export default async function LayoutSpacingPage() {
  return (
    <Container size="md" as="article">

      {/* ── Header ──────────────────────────────────────────── */}
      <h1 className="type-h1 font-sejong-bold tracking-tight mb-4 text-foreground">Spacing</h1>

      <p className="type-body mb-4 text-foreground max-w-prose">
        All spacing values must come from Tailwind&#39;s built-in scale.
        Arbitrary values like{' '}
        <InlineCode>px-[24px]</InlineCode>
        {' '}or{' '}
        <InlineCode>mt-[13px]</InlineCode>
        {' '}are not allowed.
      </p>
      <p className="type-body mb-4 text-foreground max-w-prose">
        The Tailwind spacing scale is built on a 4px base unit. Every step
        is a multiple of 4 — predictable, consistent, and visually harmonious
        with the rest of the system.
      </p>

      <Alert variant="info" title="Rule">
        If a spacing value is not in Tailwind&#39;s scale, it does not belong in the codebase.
      </Alert>

      {/* ── Default Inset ───────────────────────────────────── */}
      <h2 className="type-h2 mt-8 mb-4 text-foreground">Default Inset</h2>
      <p className="type-body mb-4 text-foreground max-w-prose">
        The default inset is the standard horizontal breathing room at each
        breakpoint. It applies anywhere consistent padding is needed — the
        page shell, cards, panels, sections.
      </p>

      <div className="my-8 flex flex-col gap-3">
        {[
          { label: "Mobile", px: "px-4", value: "16px", width: "w-2" },
          { label: "Tablet", px: "px-6", value: "24px", width: "w-3" },
          { label: "Desktop", px: "px-8", value: "32px", width: "w-4" },
        ].map(({ label, px, value, width }) => (
          <div key={label}>
            <p className="mb-1 type-caption font-mono text-muted-foreground">{label} — <span className="text-foreground">{px}</span> ({value})</p>
            <div className="flex h-10 w-full items-stretch overflow-hidden rounded-lg border border-border">
              {/* Illustration-only: opacity on brand-accent to visualize inset padding */}
              <div className={`${width} shrink-0 bg-brand-accent/40`} />
              <div className="flex flex-1 items-center justify-center bg-surface-subtle text-muted-foreground type-caption">content</div>
              <div className={`${width} shrink-0 bg-brand-accent/40`} />
            </div>
          </div>
        ))}
      </div>

      <p className="type-body mb-4 text-foreground max-w-prose">
        When in doubt about how much horizontal space to give an element,
        the default inset is the answer.
      </p>

      <hr className="my-8 border-0 border-t border-border" />

      {/* ── Max-width ───────────────────────────────────────── */}
      <h2 className="type-h2 mt-8 mb-4 text-foreground">Max-width</h2>
      <p className="type-body mb-4 text-foreground max-w-prose">
        Content is constrained to a maximum width of{' '}
        <InlineCode>max-w-screen-2xl</InlineCode>
        {' '}(1536px). This prevents lines from stretching uncomfortably wide on large monitors
        and keeps the layout anchored to the center of the viewport.
      </p>

      <div className="my-8">
        <div className="flex h-16 w-full overflow-hidden rounded-lg border border-border bg-surface-subtle">
          <div className="w-1/12 bg-surface-muted border-r border-dashed border-border" />
          <div className="flex-1 bg-brand-accent/20 flex items-center justify-center type-caption text-muted-foreground font-mono">
            max-w-screen-2xl
          </div>
          <div className="w-1/12 bg-surface-muted border-l border-dashed border-border" />
        </div>
        <p className="mt-2 text-center type-caption text-muted-foreground">viewport &rarr; constrained content area &rarr; viewport</p>
      </div>

      <hr className="my-8 border-0 border-t border-border" />

      {/* ── Column Gutter ───────────────────────────────────── */}
      <h2 className="type-h2 mt-8 mb-4 text-foreground">Column Gutter</h2>
      <p className="type-body mb-4 text-foreground max-w-prose">
        The default gutter between columns is{' '}
        <InlineCode>gap-2</InlineCode>
        {' '}(8px), consistent across all breakpoints. For inline and form layouts, this gutter is a structural
        constant. The Grid component uses the DS three-tier gap system (element / component / section)
        to allow appropriate spacing for card grids and content block layouts.
      </p>

      <div className="my-8 flex flex-col gap-4">
        {[
          { label: "Mobile", cols: 1 },
          { label: "Tablet", cols: 2 },
          { label: "Desktop", cols: 3 },
        ].map(({ label, cols }) => (
          <div key={label}>
            <p className="mb-1 type-caption font-mono text-muted-foreground">{label}</p>
            <div className="grid gap-2" style={{ gridTemplateColumns: `repeat(${cols}, 1fr)` }}>
              {Array.from({ length: cols }).map((_, i) => (
                <div key={i} className="h-10 rounded-md bg-surface-subtle border border-border" />
              ))}
            </div>
          </div>
        ))}
      </div>

      <p className="type-body mb-4 text-foreground max-w-prose">
        For inline layouts, the gutter is a structural constant.
        The Grid component&#39;s{' '}
        <InlineCode>gap</InlineCode>
        {' '}prop provides tier-based control for content grids.
      </p>

      <hr className="my-8 border-0 border-t border-border" />

      {/* ── Vertical Spacing ────────────────────────────────── */}
      <h2 className="type-h2 mt-8 mb-4 text-foreground">Vertical Spacing</h2>
      <p className="type-body mb-4 text-foreground max-w-prose">
        Vertical spacing follows a fixed three-tier system. All tiers use Tailwind scale values and do not change across breakpoints — layout responsiveness is encoded in column reflow (fewer columns on smaller viewports), not in spacing changes.
      </p>

      <div className="my-6">
        <div className="hidden md:block">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Tier</TableHead>
                <TableHead>Tailwind</TableHead>
                <TableHead>Pixels</TableHead>
                <TableHead>Use cases</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell>Element</TableCell>
                <TableCell><InlineCode>gap-2</InlineCode></TableCell>
                <TableCell>8px</TableCell>
                <TableCell>Label &rarr; input, icon &rarr; text, caption below a field, heading &rarr; subtitle</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Component</TableCell>
                <TableCell><InlineCode>gap-4</InlineCode></TableCell>
                <TableCell>16px</TableCell>
                <TableCell>Stacked form fields, list items, stacked cards, navigation items</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Section</TableCell>
                <TableCell><InlineCode>gap-6</InlineCode></TableCell>
                <TableCell>24px</TableCell>
                <TableCell>Between major page sections (e.g. filter bar + data table, page heading + form block)</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
        <div className="block md:hidden">
          <TableMobileList>
            <TableMobileItem>
              <span className="type-body-sm text-foreground"><strong>Element</strong></span>
              <span className="type-caption text-muted-foreground"><InlineCode>gap-2</InlineCode> · 8px · Label &rarr; input, icon &rarr; text, caption below a field</span>
            </TableMobileItem>
            <TableMobileItem>
              <span className="type-body-sm text-foreground"><strong>Component</strong></span>
              <span className="type-caption text-muted-foreground"><InlineCode>gap-4</InlineCode> · 16px · Stacked form fields, list items, stacked cards</span>
            </TableMobileItem>
            <TableMobileItem>
              <span className="type-body-sm text-foreground"><strong>Section</strong></span>
              <span className="type-caption text-muted-foreground"><InlineCode>gap-6</InlineCode> · 24px · Between major page sections</span>
            </TableMobileItem>
          </TableMobileList>
        </div>
      </div>

      <p className="type-body mb-4 text-foreground max-w-prose">
        The element tier matches the column gutter — the smallest structural unit is consistent across both horizontal and vertical arrangements.
      </p>
      <p className="type-body mb-4 text-foreground max-w-prose">
        The component tier matches the mobile horizontal inset — component stacks breathe at the same scale as the tightest layout edge.
      </p>

      <Alert variant="info" title="Rule">
        Do not scale vertical spacing with breakpoints. If a layout feels too dense at a smaller viewport, the fix is fewer columns — not larger gaps.
      </Alert>

      <hr className="my-8 border-0 border-t border-border" />

      {/* ── Page Shell ──────────────────────────────────────── */}
      <h2 className="type-h2 mt-8 mb-4 text-foreground">Page Shell</h2>
      <p className="type-body mb-4 text-foreground max-w-prose">
        The full page shell combines max-width, centering, and the default inset into one element. This is the wrapping element that all page content lives inside.
      </p>

      <CodeBlock code={`<Container>
  {/* page content */}
</Container>`} lang="tsx" />

      <ul className="type-body text-foreground max-w-prose list-disc pl-5 space-y-2">
        <li>
          Centers content with{' '}
          <InlineCode>mx-auto</InlineCode>
        </li>
        <li>
          Fills viewport width before hitting max-width ({' '}
          <InlineCode>w-full</InlineCode>
          )
        </li>
        <li>
          Caps width at 1536px ({' '}
          <InlineCode>max-w-screen-2xl</InlineCode>
          )
        </li>
        <li>
          Applies the default inset per tier ({' '}
          <InlineCode>px-4 md:px-6 lg:px-8</InlineCode>
          )
        </li>
      </ul>

      <p className="type-body mb-4 text-foreground max-w-prose mt-4">
        The{' '}
        <InlineCode>Container</InlineCode>
        {' '}component encodes this pattern. Use it instead of composing the utility classes manually.
      </p>

      <Alert variant="info" title="Rule">
        Never apply only part of the page shell. All four concerns (centering, full-width, max-width, inset) must be present together.
      </Alert>

      <hr className="my-8 border-0 border-t border-border" />

      {/* ── Full-Bleed Elements ─────────────────────────────── */}
      <h2 className="type-h2 mt-8 mb-4 text-foreground">Full-Bleed Elements</h2>
      <p className="type-body mb-4 text-foreground max-w-prose">
        Some elements — navbars, hero banners, full-width section dividers — must span the full viewport width without being clipped by max-width. Use a full-width outer wrapper with the page shell pattern nested inside for content alignment:
      </p>

      <CodeBlock code={`<div className="w-full bg-brand-primary">
  {/* full-bleed background */}
  <Container>
    {/* constrained content — aligns with the rest of the page */}
  </Container>
</div>`} lang="tsx" />

      <p className="type-body mb-4 text-foreground max-w-prose">
        The outer element carries the background color or image and spans the full viewport. The inner element applies max-width and inset so that content aligns with the rest of the page layout.
      </p>

      <Alert variant="info" title="Rule">
        Never apply a full-bleed background directly to the page shell element — this clips the background at 1536px. Always use a separate outer wrapper.
      </Alert>

    </Container>
  )
}
