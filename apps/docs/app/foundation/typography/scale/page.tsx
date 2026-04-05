import { Container } from '@umichkisa-ds/web'
export default function TypographyScalePage() {
  return (
    <Container size="md" as="article">

      {/* ── Header ──────────────────────────────────────────── */}
      <h1 className="type-h1 font-sejong-bold tracking-tight mb-4 text-foreground">Type Scale</h1>
      <p className="type-body mb-4 text-foreground max-w-prose">
        Each role in the hierarchy is defined as a single semantic utility class. Rather than
        composing raw Tailwind utilities every time, you apply one class —{' '}
        <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">type-body</code>,{' '}
        <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">type-label</code>,{' '}
        <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">type-h2</code>{' '}
        — and the size, weight, line height, and font family all come with it.
      </p>

      {/* ── Scale specimen ─────────────────────────────────── */}
      <div className="my-6 rounded-xl border border-border overflow-hidden">
        <div className="bg-surface px-6 py-6 space-y-6">
          <div>
            <p className="type-display text-foreground">Display</p>
            <p className="mt-1 type-caption text-muted-foreground font-mono">type-display</p>
          </div>
          <div>
            <p className="type-h1 text-foreground">Heading 1</p>
            <p className="mt-1 type-caption text-muted-foreground font-mono">type-h1</p>
          </div>
          <div>
            <p className="type-h2 text-foreground">Heading 2</p>
            <p className="mt-1 type-caption text-muted-foreground font-mono">type-h2</p>
          </div>
          <div>
            <p className="type-h3 text-foreground">Heading 3</p>
            <p className="mt-1 type-caption text-muted-foreground font-mono">type-h3</p>
          </div>
          <div>
            <p className="type-body text-foreground">Body — the default for all paragraph text and long-form content.</p>
            <p className="mt-1 type-caption text-muted-foreground font-mono">type-body</p>
          </div>
          <div>
            <p className="type-body-sm text-foreground">Body SM — secondary text, dense layouts, supporting information.</p>
            <p className="mt-1 type-caption text-muted-foreground font-mono">type-body-sm</p>
          </div>
          <div>
            <p className="type-label text-foreground">Label — buttons, navigation, form labels.</p>
            <p className="mt-1 type-caption text-muted-foreground font-mono">type-label</p>
          </div>
          <div>
            <p className="type-caption text-muted-foreground">Caption — timestamps, metadata, helper text.</p>
            <p className="mt-1 type-caption text-muted-foreground font-mono">type-caption</p>
          </div>
        </div>
      </div>

      {/* ── Scale reference table ──────────────────────────── */}
      <div className="my-6 overflow-x-auto">
        <table className="w-full border-collapse border border-border">
          <thead className="bg-surface-subtle">
            <tr>
              <th className="px-4 py-3 text-left type-caption border-b border-border text-muted-foreground">Class</th>
              <th className="px-4 py-3 text-left type-caption border-b border-border text-muted-foreground">Font</th>
              <th className="px-4 py-3 text-left type-caption border-b border-border text-muted-foreground">Tailwind</th>
              <th className="px-4 py-3 text-left type-caption border-b border-border text-muted-foreground">Size</th>
              <th className="px-4 py-3 text-left type-caption border-b border-border text-muted-foreground">Weight</th>
              <th className="px-4 py-3 text-left type-caption border-b border-border text-muted-foreground">Line height</th>
              <th className="px-4 py-3 text-left type-caption border-b border-border text-muted-foreground">Tracking</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b border-border">
              <td className="px-4 py-3 type-body-sm text-foreground"><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">type-display</code></td>
              <td className="px-4 py-3 type-body-sm text-foreground"><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">font-sejong-bold</code></td>
              <td className="px-4 py-3 type-body-sm text-foreground"><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">text-5xl</code></td>
              <td className="px-4 py-3 type-body-sm text-foreground">3rem / 48px</td>
              <td className="px-4 py-3 type-body-sm text-foreground">—</td>
              <td className="px-4 py-3 type-body-sm text-foreground">1.25</td>
              <td className="px-4 py-3 type-body-sm text-foreground"><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">tracking-tight</code></td>
            </tr>
            <tr className="border-b border-border">
              <td className="px-4 py-3 type-body-sm text-foreground"><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">type-h1</code></td>
              <td className="px-4 py-3 type-body-sm text-foreground"><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">font-sejong-bold</code></td>
              <td className="px-4 py-3 type-body-sm text-foreground"><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">text-4xl</code></td>
              <td className="px-4 py-3 type-body-sm text-foreground">2.25rem / 36px</td>
              <td className="px-4 py-3 type-body-sm text-foreground">—</td>
              <td className="px-4 py-3 type-body-sm text-foreground">1.25</td>
              <td className="px-4 py-3 type-body-sm text-foreground"><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">tracking-tight</code></td>
            </tr>
            <tr className="border-b border-border">
              <td className="px-4 py-3 type-body-sm text-foreground"><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">type-h2</code></td>
              <td className="px-4 py-3 type-body-sm text-foreground"><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">font-pretendard</code></td>
              <td className="px-4 py-3 type-body-sm text-foreground"><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">text-2xl</code></td>
              <td className="px-4 py-3 type-body-sm text-foreground">1.5rem / 24px</td>
              <td className="px-4 py-3 type-body-sm text-foreground"><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">font-semibold</code></td>
              <td className="px-4 py-3 type-body-sm text-foreground">1.375</td>
              <td className="px-4 py-3 type-body-sm text-foreground"><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">tracking-normal</code></td>
            </tr>
            <tr className="border-b border-border">
              <td className="px-4 py-3 type-body-sm text-foreground"><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">type-h3</code></td>
              <td className="px-4 py-3 type-body-sm text-foreground"><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">font-pretendard</code></td>
              <td className="px-4 py-3 type-body-sm text-foreground"><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">text-xl</code></td>
              <td className="px-4 py-3 type-body-sm text-foreground">1.25rem / 20px</td>
              <td className="px-4 py-3 type-body-sm text-foreground"><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">font-semibold</code></td>
              <td className="px-4 py-3 type-body-sm text-foreground">1.375</td>
              <td className="px-4 py-3 type-body-sm text-foreground"><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">tracking-normal</code></td>
            </tr>
            <tr className="border-b border-border">
              <td className="px-4 py-3 type-body-sm text-foreground"><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">type-body</code></td>
              <td className="px-4 py-3 type-body-sm text-foreground"><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">font-pretendard</code></td>
              <td className="px-4 py-3 type-body-sm text-foreground"><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">text-base</code></td>
              <td className="px-4 py-3 type-body-sm text-foreground">1rem / 16px</td>
              <td className="px-4 py-3 type-body-sm text-foreground"><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">font-normal</code></td>
              <td className="px-4 py-3 type-body-sm text-foreground">1.625</td>
              <td className="px-4 py-3 type-body-sm text-foreground"><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">tracking-normal</code></td>
            </tr>
            <tr className="border-b border-border">
              <td className="px-4 py-3 type-body-sm text-foreground"><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">type-body-sm</code></td>
              <td className="px-4 py-3 type-body-sm text-foreground"><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">font-pretendard</code></td>
              <td className="px-4 py-3 type-body-sm text-foreground"><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">text-sm</code></td>
              <td className="px-4 py-3 type-body-sm text-foreground">0.875rem / 14px</td>
              <td className="px-4 py-3 type-body-sm text-foreground"><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">font-normal</code></td>
              <td className="px-4 py-3 type-body-sm text-foreground">1.5</td>
              <td className="px-4 py-3 type-body-sm text-foreground"><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">tracking-normal</code></td>
            </tr>
            <tr className="border-b border-border">
              <td className="px-4 py-3 type-body-sm text-foreground"><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">type-label</code></td>
              <td className="px-4 py-3 type-body-sm text-foreground"><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">font-pretendard</code></td>
              <td className="px-4 py-3 type-body-sm text-foreground"><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">text-sm</code></td>
              <td className="px-4 py-3 type-body-sm text-foreground">0.875rem / 14px</td>
              <td className="px-4 py-3 type-body-sm text-foreground"><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">font-medium</code></td>
              <td className="px-4 py-3 type-body-sm text-foreground">1.5</td>
              <td className="px-4 py-3 type-body-sm text-foreground"><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">tracking-normal</code></td>
            </tr>
            <tr className="border-b border-border">
              <td className="px-4 py-3 type-body-sm text-foreground"><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">type-caption</code></td>
              <td className="px-4 py-3 type-body-sm text-foreground"><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">font-pretendard</code></td>
              <td className="px-4 py-3 type-body-sm text-foreground"><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">text-xs</code></td>
              <td className="px-4 py-3 type-body-sm text-foreground">0.75rem / 12px</td>
              <td className="px-4 py-3 type-body-sm text-foreground"><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">font-normal</code></td>
              <td className="px-4 py-3 type-body-sm text-foreground">1.5</td>
              <td className="px-4 py-3 type-body-sm text-foreground"><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">tracking-normal</code></td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* ── Notes ──────────────────────────────────────────── */}
      <blockquote className="border-l-[3px] border-brand-accent bg-surface-subtle pl-4 py-2 my-4 rounded-r">
        <span className="italic text-muted-foreground type-body">
          <strong className="font-semibold text-foreground">Note:</strong> The Tailwind column
          shows the equivalent Tailwind v4 font-size token for developer reference. The actual
          values are implemented as responsive{' '}
          <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">@media</code>{' '}
          overrides inside the{' '}
          <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">type-*</code>{' '}
          class definitions — these are not Tailwind utilities.
        </span>
      </blockquote>

      <blockquote className="border-l-[3px] border-brand-accent bg-surface-subtle pl-4 py-2 my-4 rounded-r">
        <span className="italic text-muted-foreground type-body">
          <strong className="font-semibold text-foreground">Display vs H1:</strong> Both use
          SejongHospital Bold. The distinction is context, not style — Display is for hero
          sections and landing pages, H1 is for page titles within the app. Never apply both{' '}
          <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">type-display</code>{' '}
          and{' '}
          <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">type-h1</code>{' '}
          styling on the same page. If a page has a Display hero and requires a semantic{' '}
          <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">&lt;h1&gt;</code>{' '}
          element for accessibility, apply{' '}
          <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">type-h2</code>{' '}
          styling to the{' '}
          <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">&lt;h1&gt;</code>{' '}
          — the visual hierarchy takes precedence over the class name.
        </span>
      </blockquote>

      <blockquote className="border-l-[3px] border-brand-accent bg-surface-subtle pl-4 py-2 my-4 rounded-r">
        <span className="italic text-muted-foreground type-body">
          <strong className="font-semibold text-foreground">Body SM vs Label:</strong> Same
          size, different weight. Body SM ({' '}
          <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">font-normal</code>{' '}
          ) is for reading. Label ({' '}
          <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">font-medium</code>{' '}
          ) is for interacting. The extra weight signals that something is actionable.
        </span>
      </blockquote>

      <hr className="my-6 border-0 border-t border-border" />

      {/* ── Responsive Behavior ────────────────────────────── */}
      <h2 className="type-h2 mt-6 mb-4 text-foreground">Responsive Behavior</h2>
      <p className="type-body mb-4 text-foreground max-w-prose">
        <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">type-body</code>,{' '}
        <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">type-body-sm</code>,{' '}
        <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">type-label</code>,
        and{' '}
        <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">type-caption</code>{' '}
        are fixed — they are already readable at all viewport sizes.
      </p>
      <p className="type-body mb-4 text-foreground max-w-prose">
        Display-level and heading classes scale across the three layout tiers defined in the
        layout system ({' '}
        <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">default</code>{' '}
        →{' '}
        <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">md:</code>{' '}
        →{' '}
        <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">lg:</code>):
      </p>

      <div className="my-6 overflow-x-auto">
        <table className="w-full border-collapse border border-border">
          <thead className="bg-surface-subtle">
            <tr>
              <th className="px-4 py-3 text-left type-caption border-b border-border text-muted-foreground">Class</th>
              <th className="px-4 py-3 text-left type-caption border-b border-border text-muted-foreground">Mobile (default)</th>
              <th className="px-4 py-3 text-left type-caption border-b border-border text-muted-foreground">Tablet <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">md:</code></th>
              <th className="px-4 py-3 text-left type-caption border-b border-border text-muted-foreground">Desktop <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">lg:</code></th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b border-border">
              <td className="px-4 py-3 type-body-sm text-foreground"><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">type-display</code></td>
              <td className="px-4 py-3 type-body-sm text-foreground">2rem / 32px</td>
              <td className="px-4 py-3 type-body-sm text-foreground">2.5rem / 40px</td>
              <td className="px-4 py-3 type-body-sm text-foreground">3rem / 48px</td>
            </tr>
            <tr className="border-b border-border">
              <td className="px-4 py-3 type-body-sm text-foreground"><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">type-h1</code></td>
              <td className="px-4 py-3 type-body-sm text-foreground">1.75rem / 28px</td>
              <td className="px-4 py-3 type-body-sm text-foreground">2rem / 32px</td>
              <td className="px-4 py-3 type-body-sm text-foreground">2.25rem / 36px</td>
            </tr>
            <tr className="border-b border-border">
              <td className="px-4 py-3 type-body-sm text-foreground"><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">type-h2</code></td>
              <td className="px-4 py-3 type-body-sm text-foreground">1.25rem / 20px</td>
              <td className="px-4 py-3 type-body-sm text-foreground">1.375rem / 22px</td>
              <td className="px-4 py-3 type-body-sm text-foreground">1.5rem / 24px</td>
            </tr>
            <tr className="border-b border-border">
              <td className="px-4 py-3 type-body-sm text-foreground"><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">type-h3</code></td>
              <td className="px-4 py-3 type-body-sm text-foreground">1.125rem / 18px</td>
              <td className="px-4 py-3 type-body-sm text-foreground">1.25rem / 20px</td>
              <td className="px-4 py-3 type-body-sm text-foreground">1.25rem / 20px</td>
            </tr>
          </tbody>
        </table>
      </div>

      <p className="type-body mb-4 text-foreground max-w-prose">
        Responsive scaling is baked into the{' '}
        <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">type-*</code>{' '}
        class definitions. Components do not need to apply breakpoint overrides — reaching for{' '}
        <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">type-display</code>{' '}
        on any viewport automatically applies the correct size.
      </p>

      <blockquote className="border-l-[3px] border-brand-accent bg-surface-subtle pl-4 py-2 my-4 rounded-r">
        <span className="italic text-muted-foreground type-body">
          Avoid{' '}
          <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">sm:</code>,{' '}
          <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">xl:</code>,
          or{' '}
          <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">2xl:</code>{' '}
          for typography overrides. The layout system operates on three tiers only. See{' '}
          <a href="/foundation/layout/breakpoints" className="text-link underline-offset-2 hover:underline">Breakpoints</a>{' '}
          for the full breakpoint policy.
        </span>
      </blockquote>

    </Container>
  )
}
