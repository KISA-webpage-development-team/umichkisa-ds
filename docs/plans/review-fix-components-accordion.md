# Fix Plan — `/components/accordion`

Source: `apps/docs/app/components/accordion/page.tsx`
Findings: `docs/reviews/docs-app-review.md` § `/components/accordion`
Constraints: `docs/DS_CONSTRAINTS.md`

## Phase 1 — Single phase (desktop + mobile)

### Task 1 — Migrate the 4 API Reference tables to DS `Table` + `TableMobileList`
**Fixes #1.**
- Replace each of the 4 raw `<table>` blocks (Accordion, AccordionItem, AccordionTrigger, AccordionContent) with the DS `Table` component (`hidden md:block` wrapper).
- For each, add a sibling `TableMobileList` (`block md:hidden`) mirroring the same data.
- Columns unchanged: Prop / Type / Default / Description.
- Drop the `my-6 overflow-x-auto` wrapper divs — DS Table handles its own layout.
- Import `Table`, related sub-components, and `TableMobileList` from `@umichkisa-ds/web`.

### Task 2 — Strip redundant `font-sejong-bold tracking-tight` from h1
**Fixes #2.**
- File: `apps/docs/app/components/accordion/page.tsx:123`
- Change `className="type-h1 font-sejong-bold tracking-tight mb-4 text-foreground"` → `className="type-h1 mb-4 text-foreground"`.
- Rationale: `type-h1` already sets font + tracking; the extra utilities are redundant.

### Task 3 — Add "Keyboard interactions" section
**Fixes #3.**
- Insert a new `<h2 className="type-h2 mt-8 mb-4 text-foreground">Keyboard interactions</h2>` section immediately **after** the API Reference (after the last AccordionContent table, before the closing `</Container>`).
- Add a short intro `<p className="type-body mb-4 text-foreground max-w-prose">` explaining that Accordion provides built-in keyboard navigation via Radix.
- Below the intro, render a DS `Table` (`hidden md:block`) + `TableMobileList` (`block md:hidden`) pair with two columns: `Key` and `Action`. Rows:
  - `Space` / `Enter` — Toggles the focused trigger open or closed.
  - `↓` (Arrow Down) — Moves focus to the next trigger.
  - `↑` (Arrow Up) — Moves focus to the previous trigger.
  - `Home` — Moves focus to the first trigger.
  - `End` — Moves focus to the last trigger.
- Use the same DS Table import added in Task 1.

### Task 4 — Add "without chevron" usage caveat
**Fixes #4.**
- File: `apps/docs/app/components/accordion/page.tsx:247-254` (the prose paragraph above the `noChevronCode` ComponentPreview).
- Append a sentence after the existing prose: "Only use without the chevron when the trigger content itself signals that it expands (e.g., numbered steps) — otherwise users lose the only visual affordance for interactivity."

## Verification

- Visit `/components/accordion` at desktop (1280px) — confirm: 5 DS Tables render (4 API + 1 Keyboard), h1 looks unchanged visually, new Keyboard section is present, "without chevron" copy includes the caveat.
- Resize to 375px — confirm: every Table swaps to its TableMobileList (no horizontal table scroll).
- `pnpm typecheck` passes.

## Notes

- Single .tsx-only docs page edit. No tests, no `pnpm build` required (per session policy for surgical docs edits) — but **do** run `pnpm typecheck` since this adds new imports.
- DS constraint review applies (Task 1 + Task 3 introduce new component usage).
