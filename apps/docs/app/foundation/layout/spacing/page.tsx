import { Container } from '@umichkisa-ds/web'
import { CodeBlock } from '@/components/CodeBlock'
export default async function LayoutSpacingPage() {
  return (
    <Container size="md" as="article">

      {/* ── Header ──────────────────────────────────────────── */}
      <h1 className="type-h1 font-sejong-bold tracking-tight mb-4 text-foreground">Spacing</h1>

      <p className="type-body mb-4 text-foreground max-w-prose">
        All spacing values must come from Tailwind&#39;s built-in scale.
        Arbitrary values like{' '}
        <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">px-[24px]</code>
        {' '}or{' '}
        <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">mt-[13px]</code>
        {' '}are not allowed.
      </p>
      <p className="type-body mb-4 text-foreground max-w-prose">
        The Tailwind spacing scale is built on a 4px base unit. Every step
        is a multiple of 4 — predictable, consistent, and visually harmonious
        with the rest of the system.
      </p>

      <blockquote className="border-l-[3px] border-brand-accent bg-surface-subtle pl-4 py-2 my-4 rounded-r">
        <span className="italic text-muted-foreground type-body">
          <strong className="font-semibold text-foreground">Rule:</strong> If a spacing value is not in Tailwind&#39;s scale, it does not belong in the codebase.
        </span>
      </blockquote>

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
            <p className="mb-1 text-xs font-mono text-gray-400">{label} — <span className="text-gray-700">{px}</span> ({value})</p>
            <div className="flex h-10 w-full items-stretch overflow-hidden rounded-lg border border-gray-200">
              <div className={`${width} shrink-0 bg-[#ffcb05]/40`} />
              <div className="flex flex-1 items-center justify-center bg-gray-50 text-xs text-gray-400">content</div>
              <div className={`${width} shrink-0 bg-[#ffcb05]/40`} />
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
        <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">max-w-screen-2xl</code>
        {' '}(1536px). This prevents lines from stretching uncomfortably wide on large monitors
        and keeps the layout anchored to the center of the viewport.
      </p>

      <div className="my-8">
        <div className="relative h-16 w-full overflow-hidden rounded-lg border border-gray-200 bg-gray-50">
          <div className="absolute inset-y-0 left-0 right-0 flex items-center justify-center">
            <div className="h-full w-full max-w-[80%] bg-[#ffcb05]/20 flex items-center justify-center text-xs text-gray-500 font-mono">
              max-w-screen-2xl
            </div>
          </div>
          <div className="absolute inset-y-0 left-0 w-[10%] bg-gray-100 border-r border-dashed border-gray-300" />
          <div className="absolute inset-y-0 right-0 w-[10%] bg-gray-100 border-l border-dashed border-gray-300" />
        </div>
        <p className="mt-2 text-center text-xs text-gray-400">viewport &rarr; constrained content area &rarr; viewport</p>
      </div>

      <hr className="my-8 border-0 border-t border-border" />

      {/* ── Column Gutter ───────────────────────────────────── */}
      <h2 className="type-h2 mt-8 mb-4 text-foreground">Column Gutter</h2>
      <p className="type-body mb-4 text-foreground max-w-prose">
        The default gutter between columns is{' '}
        <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">gap-2</code>
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
            <p className="mb-1 text-xs font-mono text-gray-400">{label}</p>
            <div className="grid gap-2" style={{ gridTemplateColumns: `repeat(${cols}, 1fr)` }}>
              {Array.from({ length: cols }).map((_, i) => (
                <div key={i} className="h-10 rounded-md bg-gray-100 border border-gray-200" />
              ))}
            </div>
          </div>
        ))}
      </div>

      <p className="type-body mb-4 text-foreground max-w-prose">
        For inline layouts, the gutter is a structural constant.
        The Grid component&#39;s{' '}
        <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">gap</code>
        {' '}prop provides tier-based control for content grids.
      </p>

      <hr className="my-8 border-0 border-t border-border" />

      {/* ── Vertical Spacing ────────────────────────────────── */}
      <h2 className="type-h2 mt-8 mb-4 text-foreground">Vertical Spacing</h2>
      <p className="type-body mb-4 text-foreground max-w-prose">
        Vertical spacing follows a fixed three-tier system. All tiers use Tailwind scale values and do not change across breakpoints — layout responsiveness is encoded in column reflow (fewer columns on smaller viewports), not in spacing changes.
      </p>

      <div className="my-6 overflow-x-auto">
        <table className="w-full border-collapse border border-border">
          <thead className="bg-surface-subtle">
            <tr>
              <th className="px-4 py-3 text-left type-caption border-b border-border text-muted-foreground">Tier</th>
              <th className="px-4 py-3 text-left type-caption border-b border-border text-muted-foreground">Tailwind</th>
              <th className="px-4 py-3 text-left type-caption border-b border-border text-muted-foreground">Pixels</th>
              <th className="px-4 py-3 text-left type-caption border-b border-border text-muted-foreground">Use cases</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b border-border">
              <td className="px-4 py-3 type-body-sm text-foreground">Element</td>
              <td className="px-4 py-3 type-body-sm text-foreground"><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">gap-2</code></td>
              <td className="px-4 py-3 type-body-sm text-foreground">8px</td>
              <td className="px-4 py-3 type-body-sm text-foreground">Label &rarr; input, icon &rarr; text, caption below a field, heading &rarr; subtitle</td>
            </tr>
            <tr className="border-b border-border">
              <td className="px-4 py-3 type-body-sm text-foreground">Component</td>
              <td className="px-4 py-3 type-body-sm text-foreground"><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">gap-4</code></td>
              <td className="px-4 py-3 type-body-sm text-foreground">16px</td>
              <td className="px-4 py-3 type-body-sm text-foreground">Stacked form fields, list items, stacked cards, navigation items</td>
            </tr>
            <tr className="border-b border-border">
              <td className="px-4 py-3 type-body-sm text-foreground">Section</td>
              <td className="px-4 py-3 type-body-sm text-foreground"><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">gap-6</code></td>
              <td className="px-4 py-3 type-body-sm text-foreground">24px</td>
              <td className="px-4 py-3 type-body-sm text-foreground">Between major page sections (e.g. filter bar + data table, page heading + form block)</td>
            </tr>
          </tbody>
        </table>
      </div>

      <p className="type-body mb-4 text-foreground max-w-prose">
        The element tier matches the column gutter — the smallest structural unit is consistent across both horizontal and vertical arrangements.
      </p>
      <p className="type-body mb-4 text-foreground max-w-prose">
        The component tier matches the mobile horizontal inset — component stacks breathe at the same scale as the tightest layout edge.
      </p>

      <blockquote className="border-l-[3px] border-brand-accent bg-surface-subtle pl-4 py-2 my-4 rounded-r">
        <span className="italic text-muted-foreground type-body">
          <strong className="font-semibold text-foreground">Rule:</strong> Do not scale vertical spacing with breakpoints. If a layout feels too dense at a smaller viewport, the fix is fewer columns — not larger gaps.
        </span>
      </blockquote>

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
          <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">mx-auto</code>
        </li>
        <li>
          Fills viewport width before hitting max-width ({' '}
          <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">w-full</code>
          )
        </li>
        <li>
          Caps width at 1536px ({' '}
          <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">max-w-screen-2xl</code>
          )
        </li>
        <li>
          Applies the default inset per tier ({' '}
          <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">px-4 md:px-6 lg:px-8</code>
          )
        </li>
      </ul>

      <p className="type-body mb-4 text-foreground max-w-prose mt-4">
        The{' '}
        <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">Container</code>
        {' '}component encodes this pattern. Use it instead of composing the utility classes manually.
      </p>

      <blockquote className="border-l-[3px] border-brand-accent bg-surface-subtle pl-4 py-2 my-4 rounded-r">
        <span className="italic text-muted-foreground type-body">
          <strong className="font-semibold text-foreground">Rule:</strong> Never apply only part of the page shell. All four concerns (centering, full-width, max-width, inset) must be present together.
        </span>
      </blockquote>

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

      <blockquote className="border-l-[3px] border-brand-accent bg-surface-subtle pl-4 py-2 my-4 rounded-r">
        <span className="italic text-muted-foreground type-body">
          <strong className="font-semibold text-foreground">Rule:</strong> Never apply a full-bleed background directly to the page shell element — this clips the background at 1536px. Always use a separate outer wrapper.
        </span>
      </blockquote>

    </Container>
  )
}
