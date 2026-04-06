# Layout Usage Page Rewrite — Fix Plan

> **For Claude:** REQUIRED SUB-SKILL: Use `ds-constrained-execution` to implement this plan task-by-task. Read `docs/DS_CONSTRAINTS.md` first.

**Goal:** Replace the stale "coming soon" stub at `/foundation/layout/usage` with a thin foundation-level orientation page that mirrors the philosophy/decision-tree tone of `/foundation/colors/usage` and `/foundation/typography/usage`.

**Architecture:** Single-file rewrite of `apps/docs/app/foundation/layout/usage/page.tsx`. Three content sections — philosophy paragraph, decision tree, anti-patterns warning. All inline code uses `<InlineCode>`. Anti-patterns rendered inside `<Alert variant="warning" title="Anti-patterns">`. Cross-references to `/components/container`, `/components/grid`, `/foundation/layout/spacing`, and `/foundation/layout/breakpoints` are inline `<a>` links in the prose — no separate "See also" card row.

**Tech Stack:** Next.js 15 App Router (RSC), `@umichkisa-ds/web` (`Container`, `Alert`), `@/components/InlineCode`, Tailwind v4 utility classes (semantic tokens only).

**Source review finding:** `docs/reviews/docs-app-review.md` § `/foundation/layout/usage` finding #1.

**Constraints to respect** (from `docs/DS_CONSTRAINTS.md`):
- All typography uses `type-*` classes paired with explicit `text-foreground` / `text-muted-foreground`.
- Body content stays inside `max-w-prose`.
- All spacing from Tailwind's built-in scale — no arbitrary values.
- Use `Container size="md" as="article"` as the page wrapper (matches sibling foundation pages).
- Use semantic tokens — never raw hex / OKLCH / primitive tokens.
- `font-sejong-bold tracking-tight` only on `type-h1` (the page title).
- Links use `text-link hover:underline hover:text-brand-primary`.
- No left-border accent for callouts — use `<Alert>`.

---

### Task 1: Rewrite `apps/docs/app/foundation/layout/usage/page.tsx`

**Files:**
- Modify (full rewrite): `apps/docs/app/foundation/layout/usage/page.tsx`

**Step 1: Replace the entire file with the rewrite**

Replace the contents of `apps/docs/app/foundation/layout/usage/page.tsx` with:

```tsx
import { Container, Alert } from '@umichkisa-ds/web'
import { InlineCode } from '@/components/InlineCode'

export default function LayoutUsagePage() {
  return (
    <Container size="md" as="article">

      {/* ── Header ──────────────────────────────────────────── */}
      <h1 className="type-h1 font-sejong-bold tracking-tight mb-4 text-foreground">Usage</h1>
      <p className="type-body mb-8 text-foreground max-w-prose">
        Layout in this design system is component-driven, not utility-driven.
        The default inset, max-width, column gutter, and responsive behavior
        are encoded into a small set of components — reach for them instead
        of hand-composing responsive class strings.
      </p>

      {/* ── Philosophy ──────────────────────────────────────── */}
      <h2 className="type-h2 mt-8 mb-4 text-foreground">Philosophy</h2>
      <p className="type-body mb-4 text-foreground max-w-prose">
        Every page in the KISA app starts with the same shell:{' '}
        <InlineCode>mx-auto w-full max-w-screen-2xl px-4 md:px-6 lg:px-8</InlineCode>.
        Hand-rolling that string on every page is how design systems drift —
        one page uses{' '}
        <InlineCode>px-5</InlineCode>, another forgets the{' '}
        <InlineCode>md:</InlineCode>{' '}
        bump, and the inset stops being predictable.
      </p>
      <p className="type-body mb-4 text-foreground max-w-prose">
        The fix is not discipline. The fix is to never write the string. Reach
        for{' '}
        <a
          href="/components/container"
          className="text-link hover:underline hover:text-brand-primary"
        >
          <InlineCode>Container</InlineCode>
        </a>
        {' '}and the rules apply automatically — and they stay correct when
        the rules change.
      </p>

      {/* ── Decision Tree ───────────────────────────────────── */}
      <h2 className="type-h2 mt-8 mb-4 text-foreground">What to reach for</h2>
      <p className="type-body mb-4 text-foreground max-w-prose">
        Four decisions cover almost every layout need.
      </p>

      <ul className="type-body text-foreground max-w-prose flex flex-col gap-4 mb-4">
        <li className="flex gap-2">
          <span className="text-muted-foreground">•</span>
          <span>
            <strong className="font-semibold text-foreground">Page shell, max-width, centering</strong>
            {' — use '}
            <a
              href="/components/container"
              className="text-link hover:underline hover:text-brand-primary"
            >
              <InlineCode>Container</InlineCode>
            </a>
            . One per page region. The{' '}
            <InlineCode>size</InlineCode>{' '}
            prop chooses the max-width:{' '}
            <InlineCode>default</InlineCode>{' '}
            for standard pages,{' '}
            <InlineCode>md</InlineCode>{' '}
            or{' '}
            <InlineCode>sm</InlineCode>{' '}
            for forms,{' '}
            <InlineCode>prose</InlineCode>{' '}
            for long-form text.
          </span>
        </li>
        <li className="flex gap-2">
          <span className="text-muted-foreground">•</span>
          <span>
            <strong className="font-semibold text-foreground">Repeating items that reflow across breakpoints</strong>
            {' — use '}
            <a
              href="/components/grid"
              className="text-link hover:underline hover:text-brand-primary"
            >
              <InlineCode>Grid</InlineCode>
            </a>
            . Card grids, tag clouds, feature blocks — anything where you want
            N columns at desktop, fewer at tablet, one column on mobile. The{' '}
            <InlineCode>gap</InlineCode>{' '}
            prop maps to the three spacing tiers.
          </span>
        </li>
        <li className="flex gap-2">
          <span className="text-muted-foreground">•</span>
          <span>
            <strong className="font-semibold text-foreground">Vertical rhythm between sections</strong>
            {' — there is no component for this. Apply the three-tier spacing system from '}
            <a
              href="/foundation/layout/spacing"
              className="text-link hover:underline hover:text-brand-primary"
            >
              spacing
            </a>
            : element ({<InlineCode>gap-2</InlineCode>}), component ({<InlineCode>gap-4</InlineCode>}),
            section ({<InlineCode>gap-6</InlineCode>}). Never scale these across breakpoints.
          </span>
        </li>
        <li className="flex gap-2">
          <span className="text-muted-foreground">•</span>
          <span>
            <strong className="font-semibold text-foreground">Asymmetric layouts</strong>
            {' — sidebar + main, holy grail, magazine layouts. There is no component for these. Drop down to raw Tailwind grid utilities ('}
            <InlineCode>grid grid-cols-[240px_1fr]</InlineCode>
            {') as the escape hatch. Stay inside the three '}
            <a
              href="/foundation/layout/breakpoints"
              className="text-link hover:underline hover:text-brand-primary"
            >
              breakpoint tiers
            </a>
            {' ('}
            <InlineCode>default</InlineCode>{' / '}
            <InlineCode>md:</InlineCode>{' / '}
            <InlineCode>lg:</InlineCode>
            {').'}
          </span>
        </li>
      </ul>

      {/* ── Anti-patterns ───────────────────────────────────── */}
      <h2 className="type-h2 mt-8 mb-4 text-foreground">Anti-patterns</h2>
      <Alert variant="warning" title="Avoid these">
        <ul className="flex flex-col gap-2">
          <li>
            <strong className="font-semibold">Don&apos;t hand-roll the page shell.</strong>{' '}
            If you find yourself typing{' '}
            <InlineCode>mx-auto max-w-* px-* md:px-*</InlineCode>,
            stop and use{' '}
            <InlineCode>Container</InlineCode>{' '}
            instead.
          </li>
          <li>
            <strong className="font-semibold">Don&apos;t nest Containers.</strong>{' '}
            Each page region gets one Container at most. For full-bleed banners
            inside a Container region, see the page-level structure pattern on
            the{' '}
            <a
              href="/components/container"
              className="text-link hover:underline hover:text-brand-primary"
            >
              Container page
            </a>
            .
          </li>
          <li>
            <strong className="font-semibold">Don&apos;t scale vertical gaps across breakpoints.</strong>{' '}
            Layout responsiveness in this DS is column reflow, not gap scaling.
            A{' '}
            <InlineCode>gap-4</InlineCode>{' '}
            stays{' '}
            <InlineCode>gap-4</InlineCode>{' '}
            from mobile to desktop.
          </li>
          <li>
            <strong className="font-semibold">Don&apos;t use unsupported breakpoints.</strong>{' '}
            Only{' '}
            <InlineCode>default</InlineCode>,{' '}
            <InlineCode>md:</InlineCode>, and{' '}
            <InlineCode>lg:</InlineCode>{' '}
            are permitted. If a layout cannot be solved with three tiers, the
            problem is in the component or design — not the breakpoint system.
          </li>
          <li>
            <strong className="font-semibold">Don&apos;t use arbitrary spacing values.</strong>{' '}
            Every spacing value comes from Tailwind&apos;s built-in 4px-based
            scale. No{' '}
            <InlineCode>px-[24px]</InlineCode>, no{' '}
            <InlineCode>mt-[13px]</InlineCode>.
          </li>
        </ul>
      </Alert>

    </Container>
  )
}
```

**Step 2: Verify the imports resolve**

Run: `pnpm --filter docs typecheck`
Expected: Pass with no errors. If `Alert` is not exported from `@umichkisa-ds/web`, fall back to importing it from its specific path the same way other docs pages import it (search the docs app for an existing `Alert` import to confirm the canonical path).

**Step 3: Verify the page renders at desktop and mobile**

Visit `https://vnw20xbg-3000.asse.devtunnels.ms/foundation/layout/usage` at 1280px and 375px.

Expected at desktop:
- H1 "Usage" with `font-sejong-bold` weight
- Lead paragraph (body), no callout above it
- "Philosophy" section with two paragraphs
- "What to reach for" section with 4-bullet list, each bullet has a bolded lead phrase and inline link(s)
- "Anti-patterns" section rendered as a single warning Alert containing a 5-bullet list
- All inline code chips have the same compact `bg-surface-subtle` styling (via `<InlineCode>`)
- All links rendered in `text-link` color, underline on hover
- No raw `<blockquote>`, no left-border accent anywhere on the page

Expected at mobile:
- Same content, no horizontal overflow
- Alert wraps cleanly, bullets stay readable
- `Container size="md"` provides the 16px inset

**Step 4: Run the DS review gate**

This task modifies a `.tsx` file, so the `ds-review` agent must approve before commit. Spawn `ds-review` with the diff and the constraints from `docs/DS_CONSTRAINTS.md`.

Expected: Pass. The most likely callouts the reviewer will check:
- No raw colors / arbitrary spacing values ✓
- Typography classes paired with color tokens ✓
- `font-sejong-bold` only on h1 ✓
- `<InlineCode>` used for all inline code (not raw `<code>`) ✓
- `<Alert>` used for the callout (not raw `<blockquote>`) ✓
- Body wrapped in `max-w-prose` ✓
- Links use `text-link hover:underline hover:text-brand-primary` ✓

**Step 5: Run the build and typecheck gates**

Run from repo root:

```bash
pnpm build
pnpm typecheck
```

Expected: Both pass.

**Step 6: Commit**

```bash
git add apps/docs/app/foundation/layout/usage/page.tsx
git commit -m "fix(docs): rewrite /foundation/layout/usage as orientation page

Replaces the stale 'coming soon' stub that claimed Container and Grid
were unimplemented. Both components are shipped — the page itself wraps
content in <Container>. New content is a thin foundation-level
orientation page with three sections (philosophy, decision tree,
anti-patterns) that links out to the dedicated component and foundation
pages instead of duplicating their content.

Resolves /foundation/layout/usage finding #1."
```

---

### Task 2: Update TODO and review-doc bookkeeping

**Files:**
- Modify: `docs/TODO.md` — check off both `Review` and `Fix` boxes for `/foundation/layout/usage`

**Step 1: Check off the TODO items**

In `docs/TODO.md` § Batch 4 — Layout, change:

```
- [ ] Review `/foundation/layout/usage`
- [ ] Fix `/foundation/layout/usage`
```

to:

```
- [x] Review `/foundation/layout/usage`
- [x] Fix `/foundation/layout/usage`
```

**Step 2: Commit the bookkeeping**

```bash
git add docs/TODO.md
git commit -m "chore: check off /foundation/layout/usage in TODO"
```

---

## Notes

- The page is small (single file, no new components, no new tokens). One task is sufficient — no need to phase this.
- The `Alert` import path may be different in this repo. If `@umichkisa-ds/web` doesn't re-export `Alert`, search the docs app for an existing `import { Alert }` and match it.
- No tests required — this is a static MDX-style content page with no logic to test.
- No screenshot capture in the fix plan — the review-doc already records the pre-fix state. After the fix lands, the next reviewer can confirm visually.
