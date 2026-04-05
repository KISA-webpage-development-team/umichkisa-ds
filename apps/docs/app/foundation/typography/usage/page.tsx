import { Container } from '@umichkisa-ds/web'
import { DoDont, Do, Dont } from '@/components/DoDont'

export default function TypographyUsagePage() {
  return (
    <Container size="md" as="article">

      {/* ── Header ──────────────────────────────────────────── */}
      <h1 className="type-h1 font-sejong-bold tracking-tight mb-4 text-foreground">Usage</h1>
      <p className="type-body mb-4 text-foreground max-w-prose">
        Rules and patterns for applying the type system consistently across the product.
      </p>

      <hr className="my-8 border-0 border-t border-border" />

      {/* ── Always use semantic classes ─────────────────────── */}
      <h2 className="type-h2 mt-8 mb-4 text-foreground">Always use semantic classes</h2>
      <p className="type-body mb-4 text-foreground max-w-prose">
        Reach for{' '}
        <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">type-*</code>{' '}
        utilities instead of composing raw Tailwind classes. The semantic classes are the
        contract — if the scale changes, only the definition updates, not every component
        that uses it.
      </p>
      <p className="type-body mb-4 text-foreground max-w-prose">
        Use{' '}
        <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">type-body</code>{' '}
        instead of{' '}
        <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">text-base font-normal leading-relaxed font-pretendard</code>.
        Use{' '}
        <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">type-label</code>{' '}
        instead of{' '}
        <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">text-sm font-medium leading-normal font-pretendard</code>.
        The class name communicates intent. The raw combination does not.
      </p>

      {/* ── Keep emphasis inline ────────────────────────────── */}
      <h2 className="type-h2 mt-8 mb-4 text-foreground">Keep emphasis inline, not structural</h2>
      <p className="type-body mb-4 text-foreground max-w-prose">
        For emphasis within body text, use{' '}
        <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">&lt;strong&gt;</code>.
        Applying a weight utility to the entire container changes the role of the text — it
        is no longer body copy, it is something the system has no name for. If a block of text
        needs more visual weight, reach for a higher type class instead.
      </p>

      {/* ── Always set color explicitly ────────────────────── */}
      <h2 className="type-h2 mt-8 mb-4 text-foreground">Always set color explicitly</h2>
      <p className="type-body mb-4 text-foreground max-w-prose">
        <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">type-*</code>{' '}
        classes handle family, size, weight, and line height only — not color. Every text
        element needs a color token paired explicitly:{' '}
        <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">text-foreground</code>{' '}
        for readable content,{' '}
        <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">text-muted-foreground</code>{' '}
        for supporting information. Unset color falls back to the browser default, which is
        outside the design system.
      </p>

      <hr className="my-8 border-0 border-t border-border" />

      {/* ── Do's and Don'ts ────────────────────────────────── */}
      <h2 className="type-h2 mt-8 mb-4 text-foreground">Do&#39;s and Don&#39;ts</h2>

      {/* Font boundary */}
      <h3 className="type-h3 mt-6 mb-2 text-foreground">Font boundary</h3>
      <p className="type-body mb-4 text-foreground max-w-prose">
        SejongHospital is for Display and H1 only. Do not use it below H1 — hand off to
        Pretendard for every heading level after the first.
      </p>

      <DoDont>
        <Do>
          <div className="space-y-3 py-2">
            <p className="text-4xl font-sejong-bold leading-tight text-foreground">Annual Gala Night</p>
            <p className="text-2xl font-pretendard font-semibold leading-snug text-foreground">Event Schedule</p>
          </div>
        </Do>
        <Dont>
          <div className="space-y-3 py-2">
            <p className="text-4xl font-sejong-bold leading-tight text-foreground">Annual Gala Night</p>
            <p className="text-2xl font-sejong-bold leading-snug text-foreground">Event Schedule</p>
          </div>
        </Dont>
      </DoDont>

      {/* Line length */}
      <h3 className="type-h3 mt-6 mb-2 text-foreground">Line length</h3>
      <p className="type-body mb-4 text-foreground max-w-prose">
        Keep body text within{' '}
        <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">max-w-prose</code>{' '}
        (~65 characters). Lines that stretch the full container width force the eye to travel
        too far, making long passages harder to follow.
      </p>

      <DoDont>
        <Do>
          <article className="max-w-prose">
            <p className="text-base font-pretendard font-normal leading-relaxed text-foreground">KISA brings together Korean international students across all schools and programs at the University of Michigan.</p>
          </article>
        </Do>
        <Dont>
          <p className="text-base font-pretendard font-normal leading-relaxed text-foreground w-full">KISA brings together Korean international students across all schools and programs at the University of Michigan, fostering community through events, mentorship, and shared experience.</p>
        </Dont>
      </DoDont>

      <hr className="my-8 border-0 border-t border-border" />

      {/* ── State typography ────────────────────────────────── */}
      <h2 className="type-h2 mt-8 mb-4 text-foreground">State typography</h2>

      <h3 className="type-h3 mt-6 mb-2 text-foreground">Disabled text</h3>
      <p className="type-body mb-4 text-foreground max-w-prose">
        Disabled text uses the same{' '}
        <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">type-*</code>{' '}
        class as its active state. Only the color changes — use{' '}
        <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">text-disabled-foreground</code>{' '}
        (gray-400). Do not reduce weight or size. The type role stays the same; the color
        signals that the element is inactive.
      </p>

      <h3 className="type-h3 mt-6 mb-2 text-foreground">Error messages</h3>
      <p className="type-body mb-4 text-foreground max-w-prose">
        Use{' '}
        <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">type-caption</code>{' '}
        +{' '}
        <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">text-error</code>.
        Error messages appear below form fields and are supporting information — they do not
        need body weight. Keep them concise: one sentence, no period needed for short phrases.
      </p>

      <h3 className="type-h3 mt-6 mb-2 text-foreground">Helper text</h3>
      <p className="type-body mb-4 text-foreground max-w-prose">
        Use{' '}
        <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">type-caption</code>{' '}
        +{' '}
        <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">text-muted-foreground</code>.
        Helper text provides context before or after interaction — instructions, character
        counts, format hints. Same size as error messages; the color difference ({' '}
        <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">text-muted-foreground</code>{' '}
        vs{' '}
        <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">text-error</code>)
        distinguishes the two states.
      </p>

      <hr className="my-8 border-0 border-t border-border" />

      {/* ── Links ──────────────────────────────────────────── */}
      <h2 className="type-h2 mt-8 mb-4 text-foreground">Links</h2>
      <p className="type-body mb-4 text-foreground max-w-prose">
        Links inherit the{' '}
        <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">type-*</code>{' '}
        class of their container — a link inside a{' '}
        <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">type-body</code>{' '}
        paragraph uses body sizing and weight. Do not apply a separate type class to links.
      </p>
      <p className="type-body mb-4 text-foreground max-w-prose">
        Color and decoration rules:
      </p>
      <ul className="type-body text-foreground max-w-prose flex flex-col gap-2">
        <li className="flex gap-2">
          <span className="text-muted-foreground">&bull;</span>
          Color: always{' '}
          <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">text-link</code>
        </li>
        <li className="flex gap-2">
          <span className="text-muted-foreground">&bull;</span>
          Decoration: underline by default ({' '}
          <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">underline</code>)
        </li>
        <li className="flex gap-2">
          <span className="text-muted-foreground">&bull;</span>
          Hover:{' '}
          <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">text-brand-primary</code>{' '}
          (Michigan Blue)
        </li>
        <li className="flex gap-2">
          <span className="text-muted-foreground">&bull;</span>
          Visited: no separate visited style — leave at default link color
        </li>
      </ul>
      <p className="type-body mb-4 mt-4 text-foreground max-w-prose">
        Never use{' '}
        <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">text-foreground</code>{' '}
        for links. The{' '}
        <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">text-link</code>{' '}
        token exists specifically to distinguish interactive text from static text.
      </p>

      <hr className="my-8 border-0 border-t border-border" />

      {/* ── Truncation ─────────────────────────────────────── */}
      <h2 className="type-h2 mt-8 mb-4 text-foreground">Truncation</h2>
      <p className="type-body mb-4 text-foreground max-w-prose">
        Truncation is for UI elements — not for long-form content. Never truncate{' '}
        <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">type-body</code>{' '}
        in article or content reading contexts.
      </p>
      <p className="type-body mb-4 text-foreground max-w-prose">
        Two patterns:
      </p>
      <p className="type-body mb-4 text-foreground max-w-prose">
        <strong className="font-semibold text-foreground">Single-line truncation</strong> — use{' '}
        <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">truncate</code>{' '}
        (applies{' '}
        <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">overflow: hidden</code>,{' '}
        <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">text-overflow: ellipsis</code>,{' '}
        <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">white-space: nowrap</code>).
        For: nav items, table cells, tags, badges, any UI element where one line is a hard
        constraint.
      </p>
      <p className="type-body mb-4 text-foreground max-w-prose">
        <strong className="font-semibold text-foreground">Multi-line truncation</strong> — use{' '}
        <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">line-clamp-2</code>{' '}
        or{' '}
        <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">line-clamp-3</code>.
        For: card titles and descriptions where 2–3 lines are acceptable before cutting.
        Prefer{' '}
        <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">line-clamp-2</code>{' '}
        for titles,{' '}
        <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">line-clamp-3</code>{' '}
        for descriptions.
      </p>
      <p className="type-body mb-4 text-foreground max-w-prose">
        When in doubt, prefer{' '}
        <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">truncate</code>.
        Multi-line clamping can produce unexpected results with certain line heights — always
        verify visually.
      </p>

    </Container>
  )
}
