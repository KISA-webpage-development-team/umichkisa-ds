import { Container } from '@umichkisa-ds/web'
export default function IconographyAccessibilityPage() {
  return (
    <Container size="md" as="article">

      {/* ── Header ──────────────────────────────────────────── */}
      <h1 className="type-h1 font-sejong-bold tracking-tight mt-8 mb-4 text-foreground">Accessibility</h1>

      {/* ── The Problem Icons Create ────────────────────────── */}
      <h2 className="type-h2 mt-8 mb-4 text-foreground">The Problem Icons Create</h2>
      <p className="type-body mb-4 text-foreground max-w-prose">
        Icons are visually obvious to sighted users but completely ambiguous to screen
        readers — unless the code explicitly describes them. A trash can icon conveys
        {'"'}delete{'"'} to anyone looking at the screen. To a screen reader, it is just an
        SVG element with no label. The user hears nothing, or worse, the raw SVG title
        if one happens to exist.
      </p>
      <p className="type-body mb-4 text-foreground max-w-prose">
        The KISA icon system makes the right behavior the default. When you omit the{' '}
        <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">label</code>{' '}
        prop, the icon is hidden from assistive technology. When you provide
        it, the icon becomes a labeled image. Neither option requires you to write
        accessibility attributes by hand — the{' '}
        <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">{'<Icon>'}</code>{' '}
        component handles them.
      </p>

      <hr className="my-8 border-0 border-t border-border" />

      {/* ── Decorative Icons ────────────────────────────────── */}
      <h2 className="type-h2 mt-8 mb-4 text-foreground">Decorative Icons</h2>
      <p className="type-body mb-4 text-foreground max-w-prose">
        When the{' '}
        <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">label</code>{' '}
        prop is omitted,{' '}
        <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">{'<Icon>'}</code>{' '}
        sets{' '}
        <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">aria-hidden=&quot;true&quot;</code>{' '}
        on the SVG. The icon is invisible to screen readers. Any accessible announcement comes
        from the surrounding context — the button{"'"}s{' '}
        <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">aria-label</code>,
        {' '}the visible text label, or the heading it sits next to.
      </p>
      <p className="type-body mb-4 text-foreground max-w-prose">
        Use decorative icons whenever visible text already describes the action or content:
      </p>

      <pre className="overflow-x-auto max-w-full rounded-lg bg-surface-muted p-4 my-4">
        <code className="type-caption font-mono text-foreground">{`// The button label "Save changes" is the announcement.
// The icon adds visual reinforcement — screen readers ignore it.
<button>
  <Icon name="save" />
  Save changes
</button>`}</code>
      </pre>

      <hr className="my-8 border-0 border-t border-border" />

      {/* ── Semantic Icons ──────────────────────────────────── */}
      <h2 className="type-h2 mt-8 mb-4 text-foreground">Semantic Icons</h2>
      <p className="type-body mb-4 text-foreground max-w-prose">
        When{' '}
        <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">label</code>{' '}
        is provided,{' '}
        <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">{'<Icon>'}</code>{' '}
        sets{' '}
        <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">role=&quot;img&quot;</code>{' '}
        and{' '}
        <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">aria-label</code>{' '}
        on the SVG. The icon becomes a labeled image that screen readers will announce.
      </p>
      <p className="type-body mb-4 text-foreground max-w-prose">
        Use semantic icons when the icon is the only indicator of meaning — no visible
        text label nearby explains what it represents:
      </p>

      <pre className="overflow-x-auto max-w-full rounded-lg bg-surface-muted p-4 my-4">
        <code className="type-caption font-mono text-foreground">{`// A status dot with no label — the icon must announce its own meaning.
<Icon name="check-circle" label="Verified" />`}</code>
      </pre>

      <p className="type-body mb-4 text-foreground max-w-prose">
        Do not use{' '}
        <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">label</code>{' '}
        when the icon is inside a button that already has{' '}
        <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">aria-label</code>.
        {' '}That creates duplicate announcements — the screen reader reads
        both the button label and the icon label.
      </p>

      <hr className="my-8 border-0 border-t border-border" />

      {/* ── Decision Rule ───────────────────────────────────── */}
      <h2 className="type-h2 mt-8 mb-4 text-foreground">Decision Rule</h2>
      <p className="type-body mb-4 text-foreground max-w-prose">
        Three scenarios cover the vast majority of icon usage:
      </p>

      <div className="my-6 overflow-x-auto">
        <table className="w-full border-collapse border border-border">
          <thead className="bg-surface-subtle">
            <tr>
              <th className="px-4 py-3 text-left type-caption border-b border-border text-muted-foreground">Scenario</th>
              <th className="px-4 py-3 text-left type-caption border-b border-border text-muted-foreground">Correct approach</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b border-border">
              <td className="px-4 py-3 type-body-sm text-foreground">Icon next to a visible text label</td>
              <td className="px-4 py-3 type-body-sm text-foreground">Decorative — omit <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">label</code> prop</td>
            </tr>
            <tr className="border-b border-border">
              <td className="px-4 py-3 type-body-sm text-foreground">Icon alone inside a <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">button</code> or <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">a</code></td>
              <td className="px-4 py-3 type-body-sm text-foreground">Decorative — <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">aria-label</code> goes on the <strong className="font-semibold text-foreground">button</strong>, not the icon</td>
            </tr>
            <tr className="border-b border-border">
              <td className="px-4 py-3 type-body-sm text-foreground">Icon as a standalone meaning indicator (no button, no nearby text)</td>
              <td className="px-4 py-3 type-body-sm text-foreground">Semantic — provide <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">label</code> prop</td>
            </tr>
          </tbody>
        </table>
      </div>

      <p className="type-body mb-4 text-foreground max-w-prose">
        When in doubt, ask: <em>is there text nearby that already describes this?</em> If yes,
        decorative. If no, semantic.
      </p>

      <hr className="my-8 border-0 border-t border-border" />

      {/* ── Touch Targets ───────────────────────────────────── */}
      <h2 className="type-h2 mt-8 mb-4 text-foreground">Touch Targets</h2>
      <p className="type-body mb-4 text-foreground max-w-prose">
        The{' '}
        <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">{'<Icon>'}</code>{' '}
        component renders an SVG at the specified size — 12px to 32px depending on the{' '}
        <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">size</code>{' '}
        prop. None of these are large enough to serve as a touch target.
      </p>
      <p className="type-body mb-4 text-foreground max-w-prose">
        Interactive wrappers around icons must be at least 44×44px. This is the minimum touch target size for mobile use per WCAG 2.5.5. Use{' '}
        <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">min-w-[44px] min-h-[44px]</code>{' '}
        with{' '}
        <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">flex items-center justify-center</code>{' '}
        on the button so the icon is centered inside regardless of its visual size:
      </p>

      <pre className="overflow-x-auto max-w-full rounded-lg bg-surface-muted p-4 my-4">
        <code className="type-caption font-mono text-foreground">{`<button
  aria-label="Close"
  className="flex items-center justify-center min-w-[44px] min-h-[44px]"
>
  <Icon name="x" />
</button>`}</code>
      </pre>

      <p className="type-body mb-4 text-foreground max-w-prose">
        This approach works for any icon size — the wrapper always meets 44×44px. Never rely on padding calculated from the icon{"'"}s pixel size, as changing the{' '}
        <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">size</code>{' '}
        prop would break the math.
      </p>
      <p className="type-body mb-4 text-foreground max-w-prose">
        Never reduce the button dimensions below 44×44px to make an icon-only button feel smaller.
      </p>

      <hr className="my-8 border-0 border-t border-border" />

      {/* ── Icon Color and Contrast ─────────────────────────── */}
      <h2 className="type-h2 mt-8 mb-4 text-foreground">Icon Color and Contrast</h2>
      <p className="type-body mb-4 text-foreground max-w-prose">
        Icons are non-text UI components and must meet the 3:1 contrast ratio threshold (WCAG 1.4.11).
      </p>
      <p className="type-body mb-4 text-foreground max-w-prose">
        Two semantic color tokens fail this threshold and must never be used as the sole color of an icon:
      </p>
      <ul className="type-body text-foreground max-w-prose flex flex-col gap-2 mb-4">
        <li className="flex gap-2">
          <span className="text-muted-foreground">&bull;</span>
          <span>
            <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">--color-success</code>{' '}
            — 2.2:1 on white. Fails both text and non-text contrast thresholds.
          </span>
        </li>
        <li className="flex gap-2">
          <span className="text-muted-foreground">&bull;</span>
          <span>
            <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">--color-warning</code>{' '}
            — 3.0:1 on white. Exactly at the floor, not a comfortable pass.
          </span>
        </li>
      </ul>
      <p className="type-body mb-4 text-foreground max-w-prose">
        When using these tokens in a feedback context, always pair the icon with a visible text label using{' '}
        <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">text-foreground</code>.
        {' '}The label carries the accessible meaning; the icon adds visual reinforcement.
      </p>

      <pre className="overflow-x-auto max-w-full rounded-lg bg-surface-muted p-4 my-4">
        <code className="type-caption font-mono text-foreground">{`// ✅ correct — icon + text label; icon contrast alone does not matter
<span className="flex items-center gap-2">
  <span className="text-success"><Icon name="check-circle" /></span>
  <span className="text-foreground">Profile saved</span>
</span>

// ❌ wrong — standalone icon with --color-success, fails 3:1
<span className="text-success"><Icon name="check-circle" label="Success" /></span>`}</code>
      </pre>

      <p className="type-body mb-4 text-foreground max-w-prose">
        <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">--color-error</code>{' '}
        (3.9:1) passes non-text contrast and may be used as a standalone icon color for error state indicators, though pairing with a label is still preferred.
      </p>

      <hr className="my-8 border-0 border-t border-border" />

      {/* ── Quick Reference ─────────────────────────────────── */}
      <h2 className="type-h2 mt-8 mb-4 text-foreground">Quick Reference</h2>

      <div className="my-6 overflow-x-auto">
        <table className="w-full border-collapse border border-border">
          <thead className="bg-surface-subtle">
            <tr>
              <th className="px-4 py-3 text-left type-caption border-b border-border text-muted-foreground">Scenario</th>
              <th className="px-4 py-3 text-left type-caption border-b border-border text-muted-foreground">Markup</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b border-border">
              <td className="px-4 py-3 type-body-sm text-foreground">Icon + visible text label in a button</td>
              <td className="px-4 py-3 type-body-sm text-foreground"><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">{`<button><Icon name="save" />Save</button>`}</code> — no label prop, no aria-label on button</td>
            </tr>
            <tr className="border-b border-border">
              <td className="px-4 py-3 type-body-sm text-foreground">Icon-only button</td>
              <td className="px-4 py-3 type-body-sm text-foreground"><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">{`<button aria-label="Close"><Icon name="x" /></button>`}</code> — no label prop on icon</td>
            </tr>
            <tr className="border-b border-border">
              <td className="px-4 py-3 type-body-sm text-foreground">Standalone status icon</td>
              <td className="px-4 py-3 type-body-sm text-foreground"><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">{`<Icon name="check-circle" label="Verified" />`}</code> — label prop on icon</td>
            </tr>
          </tbody>
        </table>
      </div>

    </Container>
  )
}
