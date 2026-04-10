import { Container, Divider } from '@umichkisa-ds/web'
import { CodeBlock } from '@/components/CodeBlock'
import { DoDont, Dont } from '@/components/DoDont'
export default async function IconographyLibraryPage() {
  return (
    <Container size="md" as="article">

      {/* ── Header ──────────────────────────────────────────── */}
      <h1 className="type-h1 mb-4 text-foreground">Icon Library</h1>

      {/* ── Why Lucide ──────────────────────────────────────── */}
      <h2 className="type-h2 mt-8 mb-4 text-foreground">Why Lucide</h2>
      <p className="type-body mb-4 text-foreground max-w-prose">
        Lucide is the single icon library for the KISA design system. It is not a
        default we fell into — it is a deliberate choice that every component depends on.
      </p>
      <ul className="type-body text-foreground max-w-prose flex flex-col gap-2 mb-4">
        <li className="flex gap-2">
          <span className="text-muted-foreground">&bull;</span>
          <span><strong className="!font-semibold">Single stroke weight.</strong> Every icon is drawn with a 2px stroke on a 24×24 viewBox. There is no mixing of filled icons with outlined icons, no thick icons next to thin ones. Visual consistency is guaranteed at the source.</span>
        </li>
        <li className="flex gap-2">
          <span className="text-muted-foreground">&bull;</span>
          <span><strong className="!font-semibold">1500+ icons.</strong> Lucide covers virtually every UI need: navigation, actions, status, communication, media, files, and more. If it is a common UI pattern, Lucide has an icon for it.</span>
        </li>
        <li className="flex gap-2">
          <span className="text-muted-foreground">&bull;</span>
          <span><strong className="!font-semibold">MIT license.</strong> No attribution required, no licensing concerns for any KISA product.</span>
        </li>
        <li className="flex gap-2">
          <span className="text-muted-foreground">&bull;</span>
          <span><strong className="!font-semibold">Tree-shakeable.</strong> Only the icons you import are included in the bundle. The full 1500-icon library costs nothing if you only use ten icons.</span>
        </li>
        <li className="flex gap-2">
          <span className="text-muted-foreground">&bull;</span>
          <span><strong className="!font-semibold">shadcn-native.</strong> The shadcn/ui component library is built on Lucide. If KISA ever integrates shadcn components, there is no library conflict.</span>
        </li>
      </ul>

      <Divider className="my-8" />

      {/* ── Browsing Icons ──────────────────────────────────── */}
      <h2 className="type-h2 mt-8 mb-4 text-foreground">Browsing Icons</h2>
      <p className="type-body mb-4 text-foreground max-w-prose">
        The full Lucide catalogue is at{' '}
        <a href="https://lucide.dev" className="text-link underline-offset-2 hover:underline hover:text-brand-primary" target="_blank" rel="noopener noreferrer">lucide.dev</a>.
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

      <Divider className="my-8" />

      {/* ── Naming Convention ───────────────────────────────── */}
      <h2 className="type-h2 mt-8 mb-4 text-foreground">Naming Convention</h2>
      <p className="type-body mb-4 text-foreground max-w-prose">
        Lucide uses kebab-case names:{' '}
        <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">arrow-right</code>,{' '}
        <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">chevron-down</code>,{' '}
        <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">alert-triangle</code>.
        {' '}The{' '}
        <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">{'<Icon>'}</code>{' '}
        component takes the same name as a string — always the exact kebab-case name shown on{' '}
        <a href="https://lucide.dev" className="text-link underline-offset-2 hover:underline hover:text-brand-primary" target="_blank" rel="noopener noreferrer">lucide.dev</a>.
        {' '}Never translate it to camelCase or PascalCase — the component resolves the string at runtime.
      </p>

      <CodeBlock code={`<Icon name="arrow-right" />
<Icon name="chevron-down" />
<Icon name="alert-triangle" />`} lang="tsx" />

      <Divider className="my-8" />

      {/* ── What We Don't Use ───────────────────────────────── */}
      <h2 className="type-h2 mt-8 mb-4 text-foreground">What We Don{"'"}t Use</h2>
      <DoDont>
        <Dont label="Don't: react-icons">
          <p className="type-body-sm text-foreground">
            The previous KISA client mixed icons from{' '}
            <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">react-icons/md</code>,{' '}
            <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">react-icons/fa</code>,{' '}
            <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">react-icons/ai</code>, and{' '}
            <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">react-icons/lu</code>.
            {' '}Each sub-library has its own stroke weight and design language. Mixing them produced
            the inconsistency this system replaces.
          </p>
        </Dont>
        <Dont label="Don't: Emoji as icons">
          <p className="type-body-sm text-foreground">
            Emoji rendering varies across operating systems, browsers, and screen readers. They are
            not design elements and cannot be styled with semantic tokens.
          </p>
        </Dont>
        <Dont label="Don't: PNG or JPG icons">
          <p className="type-body-sm text-foreground">
            Raster icons cannot scale cleanly and cannot inherit color from CSS. Every icon in the
            system is an SVG so it stays sharp at every size and follows{' '}
            <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">currentColor</code>.
          </p>
        </Dont>
      </DoDont>

      <Divider className="my-8" />

      {/* ── Custom Icons ────────────────────────────────────── */}
      <h2 className="type-h2 mt-8 mb-4 text-foreground">Custom Icons</h2>
      <p className="type-body mb-4 text-foreground max-w-prose">
        Before requesting a custom icon, confirm Lucide truly does not have what you need. The
        Lucide search understands intent and synonyms — try several keywords before concluding the
        icon is missing. Custom icons are exceptions, not alternatives.
      </p>
      <p className="type-body mb-4 text-foreground max-w-prose">
        If Lucide genuinely does not cover the icon you need, contact the design system project
        owner. Custom icons are registered centrally in the{' '}
        <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">{'<Icon>'}</code>{' '}
        system so every consumer uses them the same way:{' '}
        <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">{'<Icon name="..." />'}</code>.
        Never inline a raw SVG in a component to work around a missing icon.
      </p>

    </Container>
  )
}
