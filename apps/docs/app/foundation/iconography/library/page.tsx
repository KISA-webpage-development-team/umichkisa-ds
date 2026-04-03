export default function IconographyLibraryPage() {
  return (
    <article className="mx-auto max-w-3xl px-6 min-w-0 overflow-hidden">

      {/* ── Header ──────────────────────────────────────────── */}
      <h1 className="type-h1 font-sejong-bold tracking-tight mt-8 mb-4 text-foreground">Icon Library</h1>

      {/* ── Why Lucide ──────────────────────────────────────── */}
      <h2 className="type-h2 mt-8 mb-4 text-foreground">Why Lucide</h2>
      <p className="type-body mb-4 text-foreground max-w-prose">
        Lucide is the single icon library for the KISA design system. It is not a
        default we fell into — it is a deliberate choice that every component depends on.
      </p>
      <ul className="type-body text-foreground max-w-prose flex flex-col gap-2 mb-4">
        <li className="flex gap-2">
          <span className="text-muted-foreground">&bull;</span>
          <span><strong className="font-semibold text-foreground">Single stroke weight.</strong> Every icon is drawn with a 2px stroke on a 24×24 viewBox. There is no mixing of filled icons with outlined icons, no thick icons next to thin ones. Visual consistency is guaranteed at the source.</span>
        </li>
        <li className="flex gap-2">
          <span className="text-muted-foreground">&bull;</span>
          <span><strong className="font-semibold text-foreground">1500+ icons.</strong> Lucide covers virtually every UI need: navigation, actions, status, communication, media, files, and more. If it is a common UI pattern, Lucide has an icon for it.</span>
        </li>
        <li className="flex gap-2">
          <span className="text-muted-foreground">&bull;</span>
          <span><strong className="font-semibold text-foreground">MIT license.</strong> No attribution required, no licensing concerns for any KISA product.</span>
        </li>
        <li className="flex gap-2">
          <span className="text-muted-foreground">&bull;</span>
          <span><strong className="font-semibold text-foreground">Tree-shakeable.</strong> Only the icons you import are included in the bundle. The full 1500-icon library costs nothing if you only use ten icons.</span>
        </li>
        <li className="flex gap-2">
          <span className="text-muted-foreground">&bull;</span>
          <span><strong className="font-semibold text-foreground">shadcn-native.</strong> The shadcn/ui component library is built on Lucide. If KISA ever integrates shadcn components, there is no library conflict.</span>
        </li>
      </ul>

      <hr className="my-8 border-0 border-t border-border" />

      {/* ── Browsing Icons ──────────────────────────────────── */}
      <h2 className="type-h2 mt-8 mb-4 text-foreground">Browsing Icons</h2>
      <p className="type-body mb-4 text-foreground max-w-prose">
        The full Lucide catalogue is at{' '}
        <a href="https://lucide.dev" className="text-link underline-offset-2 hover:underline" target="_blank" rel="noopener noreferrer">lucide.dev</a>.
        {' '}Search by keyword to find what you need. The search understands intent — searching
        {' '}{'"'}close{'"'} returns{' '}
        <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">x</code>,{' '}
        <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">x-circle</code>,
        {' '}and related icons.
      </p>
      <p className="type-body mb-4 text-foreground max-w-prose">
        When evaluating options, prefer the simplest icon that communicates the
        meaning. If two icons could both work, choose the one users are more likely to
        recognize from common applications.
      </p>

      <hr className="my-8 border-0 border-t border-border" />

      {/* ── Naming Convention ───────────────────────────────── */}
      <h2 className="type-h2 mt-8 mb-4 text-foreground">Naming Convention</h2>
      <p className="type-body mb-4 text-foreground max-w-prose">
        Lucide uses kebab-case names:{' '}
        <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">arrow-right</code>,{' '}
        <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">chevron-down</code>,{' '}
        <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">alert-triangle</code>.
        {' '}The{' '}
        <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">{'<Icon>'}</code>{' '}
        component takes the same name as a string:
      </p>

      <pre className="overflow-x-auto max-w-full rounded-lg bg-surface-muted p-4 my-4">
        <code className="type-caption font-mono text-foreground">{`<Icon name="arrow-right" />
<Icon name="chevron-down" />
<Icon name="alert-triangle" />`}</code>
      </pre>

      <p className="type-body mb-4 text-foreground max-w-prose">
        The name in the{' '}
        <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">{'<Icon>'}</code>{' '}
        component is always the exact kebab-case name shown on{' '}
        <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">lucide.dev</code>.
        {' '}Do not translate it to camelCase or PascalCase — the component resolves the string at runtime.
      </p>

      <hr className="my-8 border-0 border-t border-border" />

      {/* ── What We Don't Use ───────────────────────────────── */}
      <h2 className="type-h2 mt-8 mb-4 text-foreground">What We Don{"'"}t Use</h2>
      <p className="type-body mb-4 text-foreground max-w-prose">
        <strong className="font-semibold text-foreground">
          <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">react-icons</code>
        </strong>{' '}
        — the previous approach in the KISA client imported icons from{' '}
        <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">react-icons/md</code>,{' '}
        <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">react-icons/fa</code>,{' '}
        <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">react-icons/ai</code>, and{' '}
        <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">react-icons/lu</code>.
        {' '}Each sub-library has its own visual style, stroke weight, and design language.
        Mixing them is what produced the inconsistency this system replaces. Never
        import from{' '}
        <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">react-icons</code>.
      </p>
      <p className="type-body mb-4 text-foreground max-w-prose">
        <strong className="font-semibold text-foreground">Emoji as icons</strong> — emoji rendering varies across operating systems, browsers,
        and screen readers. They are not design elements.
      </p>
      <p className="type-body mb-4 text-foreground max-w-prose">
        <strong className="font-semibold text-foreground">PNG or JPG icons</strong> — raster icons cannot scale cleanly and cannot inherit
        color from CSS. All icons in the system are SVG.
      </p>

      <hr className="my-8 border-0 border-t border-border" />

      {/* ── Custom Icons ────────────────────────────────────── */}
      <h2 className="type-h2 mt-8 mb-4 text-foreground">Custom Icons</h2>
      <p className="type-body mb-4 text-foreground max-w-prose">
        Before adding a custom SVG, confirm Lucide truly does not have what you need. The Lucide search understands intent and synonyms — try several keywords before concluding the icon is missing. Custom SVGs are exceptions, not alternatives.
      </p>
      <p className="type-body mb-4 text-foreground max-w-prose">
        If Lucide does not have the icon you need, use an inline SVG directly in the
        component — not a new icon library.
      </p>
      <p className="type-body mb-4 text-foreground max-w-prose">
        Custom SVGs must match Lucide{"'"}s visual language exactly:
      </p>
      <ul className="type-body text-foreground max-w-prose flex flex-col gap-2 mb-4">
        <li className="flex gap-2">
          <span className="text-muted-foreground">&bull;</span>
          <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">viewBox=&quot;0 0 24 24&quot;</code>
        </li>
        <li className="flex gap-2">
          <span className="text-muted-foreground">&bull;</span>
          <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">stroke-width=&quot;2&quot;</code>
        </li>
        <li className="flex gap-2">
          <span className="text-muted-foreground">&bull;</span>
          <span>
            <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">stroke=&quot;currentColor&quot;</code>,{' '}
            <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">fill=&quot;none&quot;</code>
          </span>
        </li>
        <li className="flex gap-2">
          <span className="text-muted-foreground">&bull;</span>
          <span>
            <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">stroke-linecap=&quot;round&quot;</code>,{' '}
            <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">stroke-linejoin=&quot;round&quot;</code>
          </span>
        </li>
      </ul>
      <p className="type-body mb-4 text-foreground max-w-prose">
        If the shape you need is not achievable in this format — for example, a complex
        logo mark — it is probably not an icon. Use an{' '}
        <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">{'<img>'}</code>{' '}
        or an inline SVG component instead, and do not put it through the{' '}
        <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">{'<Icon>'}</code>{' '}
        system.
      </p>

    </article>
  )
}
