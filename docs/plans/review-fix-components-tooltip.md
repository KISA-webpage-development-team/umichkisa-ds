# Fix Plan — `/components/tooltip`

Source: `apps/docs/app/components/tooltip/page.tsx`
Findings: `docs/reviews/docs-app-review.md` § `/components/tooltip`

All fixes are scoped to the docs page (`apps/docs/app/components/tooltip/page.tsx`). No `packages/web/` changes. The Tooltip component itself stays hover/focus only — touch handling is intentionally deferred to `Popover` per Radix / ARIA APG industry convention.

---

## Phase 1 — Single phase (all fixes touch one file)

### Task 1.1 — Migrate API Reference to `Table` + `TableMobileList`
**Fixes:** #1 (major, ds-violation, responsive)

- Import `Table`, `TableHeader`, `TableBody`, `TableRow`, `TableHead`, `TableCell`, `TableMobileList`, `TableMobileItem` (or whatever the existing API exposes — match the pattern used in `/components/popover` and `/components/dialog` once those land, or the latest migrated docs page).
- Replace the raw `<table>` block with:
  - `Table` wrapped in `hidden md:block`
  - `TableMobileList` wrapped in `block md:hidden`
- Each row maps `Prop` → `Type` → `Default` → `Description` for: `content`, `children`, `side`, `delayDuration`.
- Keep the existing inline `<code>` markup for prop names / types / default values inside the new cells (raw `<code>` is intentionally not migrated this pass).

### Task 1.2 — Fix `text-foreground` "—" placeholders
**Fixes:** #2 (minor, styling)

- In the new `Table` rows for `content` and `children`, the `Default` cell shows `—`. Use `text-muted-foreground` on those `—` cells (and the matching `TableMobileList` items).
- Other rows (`side`, `delayDuration`) keep `text-foreground` since they have real default values.

### Task 1.3 — Add Guidelines section (When to use / When not to use)
**Fixes:** #3 (major, content + accessibility)

- Add a new `<h2>` section titled **Guidelines** (or **When to use**) directly after the intro paragraph and before the existing `<h2>Examples</h2>`.
- Contents (use the DS `Alert` component for any callouts, not raw blockquotes):
  - **Use Tooltip for:** supplementary hints — labeling icon-only buttons, revealing truncated text, short hover-only context.
  - **Don't:**
    - Put essential information inside a tooltip. Tooltip content must never be load-bearing.
    - Use Tooltip on touch devices for content users need to read — tooltips don't fire on touch. Reach for `Popover` instead.
    - Put long text, paragraphs, or multi-line content inside a tooltip.
    - Put interactive content (links, buttons, inputs) inside a tooltip.
  - **Always:** match the tooltip `content` to the trigger's `aria-label` exactly when wrapping icon-only buttons.
- Use an `Alert` (severity `info` or similar — match the alert/popover/accordion docs pattern) for the touch-device note specifically, since it's the most important rule and the easiest to miss. Cross-reference `Popover` as the touch alternative.
- Follow established docs page rhythm: first `<h3>` uses `mt-6`, subsequent ones `mt-8` (this section may not need `<h3>`s — short prose + Alert is fine).

### Task 1.4 — Replace `max-w-[120px]` with `max-w-32`
**Fixes:** #4 (minor, content)

- In the "On truncated text" demo and its `truncatedCode` snippet, replace `max-w-[120px]` with `max-w-32` (both the live JSX and the highlighted code string).
- The truncated demo string can stay as-is — `max-w-32` (128px) gives essentially the same visual result.

### Task 1.5 — Use a single icon across the Placement example
**Fixes:** #5 (minor, ux)

- In the "Placement" demo and its `placementCode` snippet, replace the 4 different icons with a single neutral icon — `info` is the recommended choice — across all 4 `<IconButton>` triggers.
- Update both the live JSX and the highlighted code string consistently.
- Keep the `aria-label` per button (`Top` / `Right` / `Bottom` / `Left`) so each button is still distinguishable to AT.

### Task 1.6 — Tighten "On truncated text" prose
**Fixes:** #6 (minor, content)

- Current: "Tooltip works on any element, not just icon buttons. Wrap truncated text to reveal the full content on hover."
- Replace with something focused only on the truncation use case, e.g.: "Wrap truncated text to reveal the full content on hover."
- Drops the "any element" framing already covered in the intro.

---

## Verification

Per project rule: skip `pnpm build` / `pnpm typecheck` for surgical single-file docs edits. Visual verification only:

1. Reload `/components/tooltip` at desktop (1280px) — confirm new Table renders, "—" cells are muted, Guidelines section is present, Placement example uses one icon, truncated demo uses `max-w-32`.
2. Reload at mobile (375px) — confirm `TableMobileList` renders instead of `Table`, Guidelines Alert is readable, no horizontal scroll.

## Out of Scope

- Raw inline `<code>` → `<InlineCode>` migration (deferred to global sweep per project rule).
- Any change to the `Tooltip` component itself in `packages/web/`. Touch handling is intentionally not added — `Popover` is the correct primitive for touch-reachable content.
