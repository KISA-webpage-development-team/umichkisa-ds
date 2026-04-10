import { Container, Divider } from '@umichkisa-ds/web'
import { DoDont, Do, Dont } from '@/components/DoDont'
import { InlineCode } from '@/components/InlineCode'

export default function TypographyUsagePage() {
  return (
    <Container size="md" as="article">

      {/* ── Header ──────────────────────────────────────────── */}
      <h1 className="type-h1 font-sejong-bold tracking-tight mb-4 text-foreground">Usage</h1>
      <p className="type-body mb-4 text-foreground max-w-prose">
        Rules and patterns for applying the type system consistently across the product.
      </p>

      <Divider className="my-8" />

      {/* ── Always use semantic classes ─────────────────────── */}
      <h2 className="type-h2 mt-8 mb-4 text-foreground">Always use semantic classes</h2>
      <p className="type-body mb-4 text-foreground max-w-prose">
        Reach for{' '}
        <InlineCode>type-*</InlineCode>{' '}
        utilities instead of composing raw Tailwind classes. The semantic classes are the
        contract — if the scale changes, only the definition updates, not every component
        that uses it.
      </p>
      <p className="type-body mb-4 text-foreground max-w-prose">
        Use{' '}
        <InlineCode>type-body</InlineCode>{' '}
        instead of{' '}
        <InlineCode>text-base font-normal leading-relaxed font-pretendard</InlineCode>.
        Use{' '}
        <InlineCode>type-label</InlineCode>{' '}
        instead of{' '}
        <InlineCode>text-sm font-medium leading-normal font-pretendard</InlineCode>.
        The class name communicates intent. The raw combination does not.
      </p>

      {/* ── Keep emphasis inline ────────────────────────────── */}
      <h2 className="type-h2 mt-8 mb-4 text-foreground">Keep emphasis inline, not structural</h2>
      <p className="type-body mb-4 text-foreground max-w-prose">
        For emphasis within body text, use{' '}
        <InlineCode>&lt;strong&gt;</InlineCode>.
        Applying a weight utility to the entire container changes the role of the text — it
        is no longer body copy, it is something the system has no name for. If a block of text
        needs more visual weight, reach for a higher type class instead.
      </p>

      {/* ── Always set color explicitly ────────────────────── */}
      <h2 className="type-h2 mt-8 mb-4 text-foreground">Always set color explicitly</h2>
      <p className="type-body mb-4 text-foreground max-w-prose">
        <InlineCode>type-*</InlineCode>{' '}
        classes handle family, size, weight, and line height only — not color. Every text
        element needs a color token paired explicitly:{' '}
        <InlineCode>text-foreground</InlineCode>{' '}
        for readable content,{' '}
        <InlineCode>text-muted-foreground</InlineCode>{' '}
        for supporting information. Unset color falls back to the browser default, which is
        outside the design system.
      </p>

      <Divider className="my-8" />

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
            <p className="type-display tracking-tight text-foreground">Annual Gala Night</p>
            <p className="type-h2 text-foreground">Event Schedule</p>
          </div>
        </Do>
        <Dont>
          <div className="space-y-3 py-2">
            <p className="type-display tracking-tight text-foreground">Annual Gala Night</p>
            <p className="type-h2 !font-sejong-bold text-foreground">Event Schedule</p>
          </div>
        </Dont>
      </DoDont>

      {/* Line length */}
      <h3 className="type-h3 mt-6 mb-2 text-foreground">Line length</h3>
      <p className="type-body mb-4 text-foreground max-w-prose">
        Keep body text within{' '}
        <InlineCode>max-w-prose</InlineCode>{' '}
        (~65 characters). Lines that stretch the full container width force the eye to travel
        too far, making long passages harder to follow.
      </p>

      <DoDont>
        <Do>
          <article className="max-w-prose">
            <p className="type-body text-foreground">KISA brings together Korean international students across all schools and programs at the University of Michigan.</p>
          </article>
        </Do>
        <Dont>
          <p className="type-body text-foreground w-full">KISA brings together Korean international students across all schools and programs at the University of Michigan, fostering community through events, mentorship, and shared experience.</p>
        </Dont>
      </DoDont>

      <Divider className="my-8" />

      {/* ── State typography ────────────────────────────────── */}
      <h2 className="type-h2 mt-8 mb-4 text-foreground">State typography</h2>

      <h3 className="type-h3 mt-6 mb-2 text-foreground">Disabled text</h3>
      <p className="type-body mb-4 text-foreground max-w-prose">
        Disabled text uses the same{' '}
        <InlineCode>type-*</InlineCode>{' '}
        class as its active state. Only the color changes — use{' '}
        <InlineCode>text-disabled-foreground</InlineCode>. Do not reduce weight or size. The type role stays the same; the color
        signals that the element is inactive.
      </p>

      <h3 className="type-h3 mt-6 mb-2 text-foreground">Error messages</h3>
      <p className="type-body mb-4 text-foreground max-w-prose">
        Use{' '}
        <InlineCode>type-caption</InlineCode>{' '}
        +{' '}
        <InlineCode>text-error</InlineCode>.
        Error messages appear below form fields and are supporting information — they do not
        need body weight. Keep them concise: one sentence, no period needed for short phrases.
      </p>
      <div className="mt-2 mb-4 rounded-md border border-border bg-surface-subtle px-4 py-3">
        <p className="type-body text-foreground">Email address</p>
        <p className="type-caption text-error mt-1">Please enter a valid email address</p>
      </div>

      <h3 className="type-h3 mt-6 mb-2 text-foreground">Helper text</h3>
      <p className="type-body mb-4 text-foreground max-w-prose">
        Use{' '}
        <InlineCode>type-caption</InlineCode>{' '}
        +{' '}
        <InlineCode>text-muted-foreground</InlineCode>.
        Helper text provides context before or after interaction — instructions, character
        counts, format hints. Same size as error messages; the color difference ({' '}
        <InlineCode>text-muted-foreground</InlineCode>{' '}
        vs{' '}
        <InlineCode>text-error</InlineCode>)
        distinguishes the two states.
      </p>
      <div className="mt-2 mb-4 rounded-md border border-border bg-surface-subtle px-4 py-3">
        <p className="type-body text-foreground">Bio</p>
        <p className="type-caption text-muted-foreground mt-1">Maximum 160 characters</p>
      </div>

      <Divider className="my-8" />

      {/* ── Links ──────────────────────────────────────────── */}
      <h2 className="type-h2 mt-8 mb-4 text-foreground">Links</h2>
      <p className="type-body mb-4 text-foreground max-w-prose">
        Links inherit the{' '}
        <InlineCode>type-*</InlineCode>{' '}
        class of their container — a link inside a{' '}
        <InlineCode>type-body</InlineCode>{' '}
        paragraph uses body sizing and weight. Do not apply a separate type class to links.
      </p>
      <p className="type-body mb-4 text-foreground max-w-prose">
        Color and decoration rules:
      </p>
      <ul className="type-body text-foreground max-w-prose list-disc pl-5 space-y-2">
        <li>
          Color: always{' '}
          <InlineCode>text-link</InlineCode>
        </li>
        <li>
          Decoration: underline on hover ({' '}
          <InlineCode>hover:underline</InlineCode>)
        </li>
        <li>
          Hover:{' '}
          <InlineCode>text-brand-primary</InlineCode>{' '}
          (Michigan Blue)
        </li>
        <li>
          Visited: no separate visited style — leave at default link color
        </li>
      </ul>
      <p className="type-body mb-4 mt-4 text-foreground max-w-prose">
        Never use{' '}
        <InlineCode>text-foreground</InlineCode>{' '}
        for links. The{' '}
        <InlineCode>text-link</InlineCode>{' '}
        token exists specifically to distinguish interactive text from static text.
      </p>
      <div className="mt-2 mb-4 rounded-md border border-border bg-surface-subtle px-4 py-3">
        <p className="type-body text-foreground">
          Read the{' '}
          <a href="#" className="text-link hover:underline hover:text-brand-primary">contribution guidelines</a>{' '}
          before submitting.
        </p>
      </div>

      <Divider className="my-8" />

      {/* ── Truncation ─────────────────────────────────────── */}
      <h2 className="type-h2 mt-8 mb-4 text-foreground">Truncation</h2>
      <p className="type-body mb-4 text-foreground max-w-prose">
        Truncation is for UI elements — not for long-form content. Never truncate{' '}
        <InlineCode>type-body</InlineCode>{' '}
        in article or content reading contexts.
      </p>
      <p className="type-body mb-4 text-foreground max-w-prose">
        Two patterns:
      </p>
      <p className="type-body mb-4 text-foreground max-w-prose">
        <strong className="font-semibold text-foreground">Single-line truncation</strong> — use{' '}
        <InlineCode>truncate</InlineCode>{' '}
        (applies{' '}
        <InlineCode>overflow: hidden</InlineCode>,{' '}
        <InlineCode>text-overflow: ellipsis</InlineCode>,{' '}
        <InlineCode>white-space: nowrap</InlineCode>).
        For: nav items, table cells, tags, badges, any UI element where one line is a hard
        constraint.
      </p>
      <p className="type-body mb-4 text-foreground max-w-prose">
        <strong className="font-semibold text-foreground">Multi-line truncation</strong> — use{' '}
        <InlineCode>line-clamp-2</InlineCode>{' '}
        or{' '}
        <InlineCode>line-clamp-3</InlineCode>.
        For: card titles and descriptions where 2–3 lines are acceptable before cutting.
        Prefer{' '}
        <InlineCode>line-clamp-2</InlineCode>{' '}
        for titles,{' '}
        <InlineCode>line-clamp-3</InlineCode>{' '}
        for descriptions.
      </p>
      <p className="type-body mb-4 text-foreground max-w-prose">
        When in doubt, prefer{' '}
        <InlineCode>truncate</InlineCode>.
        Multi-line clamping can produce unexpected results with certain line heights — always
        verify visually.
      </p>

    </Container>
  )
}
