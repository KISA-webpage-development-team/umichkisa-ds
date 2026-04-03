import { Container } from '@umichkisa-ds/web'
export default function IconographySizesPage() {
  return (
    <Container size="md" as="article">

      {/* ── Header ──────────────────────────────────────────── */}
      <h1 className="type-h1 font-sejong-bold tracking-tight mt-8 mb-4 text-foreground">Icon Sizes</h1>
      <p className="type-body mb-4 text-foreground max-w-prose">
        Icons do not have one right size. A navigation icon and a display illustration
        serve different purposes and live in different contexts. The size scale exists so
        you never have to pick a size by eye — you pick a size by context.
      </p>

      <hr className="my-8 border-0 border-t border-border" />

      {/* ── The Scale ───────────────────────────────────────── */}
      <h2 className="type-h2 mt-8 mb-4 text-foreground">The Scale</h2>

      <div className="my-6 overflow-x-auto">
        <table className="w-full border-collapse border border-border">
          <thead className="bg-surface-subtle">
            <tr>
              <th className="px-4 py-3 text-left type-caption border-b border-border text-muted-foreground">Token</th>
              <th className="px-4 py-3 text-left type-caption border-b border-border text-muted-foreground">px</th>
              <th className="px-4 py-3 text-left type-caption border-b border-border text-muted-foreground">Use case</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b border-border">
              <td className="px-4 py-3 type-body-sm text-foreground"><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">xs</code></td>
              <td className="px-4 py-3 type-body-sm text-foreground">12px</td>
              <td className="px-4 py-3 type-body-sm text-foreground">Inline with caption text, badge labels</td>
            </tr>
            <tr className="border-b border-border">
              <td className="px-4 py-3 type-body-sm text-foreground"><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">sm</code></td>
              <td className="px-4 py-3 type-body-sm text-foreground">16px</td>
              <td className="px-4 py-3 type-body-sm text-foreground">Compact UI — tags, small inputs, secondary actions</td>
            </tr>
            <tr className="border-b border-border">
              <td className="px-4 py-3 type-body-sm text-foreground"><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">md</code></td>
              <td className="px-4 py-3 type-body-sm text-foreground">20px</td>
              <td className="px-4 py-3 type-body-sm text-foreground"><strong className="font-semibold text-foreground">Default</strong> — buttons, nav items, most UI</td>
            </tr>
            <tr className="border-b border-border">
              <td className="px-4 py-3 type-body-sm text-foreground"><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">lg</code></td>
              <td className="px-4 py-3 type-body-sm text-foreground">24px</td>
              <td className="px-4 py-3 type-body-sm text-foreground">Prominent actions, section headers</td>
            </tr>
            <tr className="border-b border-border">
              <td className="px-4 py-3 type-body-sm text-foreground"><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">xl</code></td>
              <td className="px-4 py-3 type-body-sm text-foreground">32px</td>
              <td className="px-4 py-3 type-body-sm text-foreground">Display, empty states, decorative</td>
            </tr>
          </tbody>
        </table>
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

      <div className="my-6 overflow-x-auto">
        <table className="w-full border-collapse border border-border">
          <thead className="bg-surface-subtle">
            <tr>
              <th className="px-4 py-3 text-left type-caption border-b border-border text-muted-foreground">Text style</th>
              <th className="px-4 py-3 text-left type-caption border-b border-border text-muted-foreground">Icon size</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b border-border">
              <td className="px-4 py-3 type-body-sm text-foreground">Caption / label (<code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">text-xs</code>, <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">text-sm</code>)</td>
              <td className="px-4 py-3 type-body-sm text-foreground"><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">sm</code> (16px)</td>
            </tr>
            <tr className="border-b border-border">
              <td className="px-4 py-3 type-body-sm text-foreground">Body (<code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">text-base</code>)</td>
              <td className="px-4 py-3 type-body-sm text-foreground"><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">md</code> (20px)</td>
            </tr>
            <tr className="border-b border-border">
              <td className="px-4 py-3 type-body-sm text-foreground">Subheading (<code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">text-lg</code>)</td>
              <td className="px-4 py-3 type-body-sm text-foreground"><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">md</code> or <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">lg</code> (20–24px)</td>
            </tr>
            <tr className="border-b border-border">
              <td className="px-4 py-3 type-body-sm text-foreground">Heading (<code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">text-xl</code>+)</td>
              <td className="px-4 py-3 type-body-sm text-foreground"><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">lg</code> (24px)</td>
            </tr>
          </tbody>
        </table>
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

      <pre className="overflow-x-auto max-w-full rounded-lg bg-surface-muted p-4 my-4">
        <code className="type-caption font-mono text-foreground">{`// ✅ correct — fixed size, component handles responsiveness
<Icon name="search" size="md" />

// ❌ wrong — breakpoint prefix on icon size
<Icon name="search" size="sm" className="md:w-5 md:h-5" />`}</code>
      </pre>

    </Container>
  )
}
