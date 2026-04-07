# Fix Plan — `/components/status-view`

Source: `apps/docs/app/components/status-view/page.tsx`
Findings: `docs/reviews/docs-app-review.md` § `/components/status-view`
Constraints: `docs/DS_CONSTRAINTS.md`

## Phase 1 — Single phase (desktop + mobile)

### Task 1 — Migrate Variant defaults table to DS `Table` + `TableMobileList`
**Fixes #1.**
- Replace the raw `<table>` under "Variant defaults" with the DS `Table` component (`hidden md:block` wrapper).
- Add a sibling `TableMobileList` (`block md:hidden`) mirroring the same data.
- After Task 4 below, this table is only 2 columns (Variant → Icon name).

### Task 2 — Migrate API Reference table to DS `Table` + `TableMobileList`
**Fixes #1.**
- Replace the raw `<table>` under "API Reference" with the DS `Table` component (`hidden md:block`).
- Add a sibling `TableMobileList` (`block md:hidden`) for mobile users.
- Columns: Prop / Type / Default / Description (unchanged).

### Task 3 — Replace secondary lead with `<Alert variant="info">`
**Fixes #2.**
- Remove the second lead paragraph (`type-body-sm text-muted-foreground` … "fills its parent / wrap in viewport / Korean defaults").
- Insert an `<Alert variant="info">` directly below lead 1 containing the parent-fill / wrap-in-viewport caveat.
- Move the Korean-defaults sentence into lead 1 (or drop — variant defaults table covers it).
- Trim the redundant restatement in the "Full-screen pattern" intro paragraph: drop the "StatusView centers within its parent / handles centering automatically" lines now that the Alert owns that message. Keep only the practical instruction ("wrap in a viewport-height container" + code example).

### Task 4 — Slim Variant defaults table to 2 columns
**Fixes #4.**
- Reduce the Variant defaults table to two columns: `Variant` and `Icon name`.
- Drop Title and Description columns — the All variants preview already shows them visually.
- Update the section's intro paragraph: shift the framing from "default icon, title, description" to "use these icon names to override the default for any variant."
- Apply this change before/with Task 1's Table migration so the migrated table is already 2-column.

### Task 5 — Add fixed-height note to Full-screen pattern preview
**Fixes #3.**
- Inside the "Full-screen pattern" section, immediately above the `ComponentPreview`, add a small caption (e.g. `<p className="type-caption text-muted-foreground mb-2">`) noting that the preview is rendered at a fixed height; in real usage, `h-screen` fills the viewport.
- Keep the code snippet as-is (it shows `h-screen`).

### Task 6 — Rework Custom icon example
**Fixes #5.**
- Change the example from `<StatusView variant="error" icon="circle-x" title="서버 오류" description="잠시 후 다시 시도해 주세요." />` (full override, variant becomes meaningless) to a **partial override**: keep `variant="not-found"` and override only the `icon` prop.
- Suggested: `<StatusView variant="not-found" icon="search-x" />` — variant still drives the title/description default.
- Update both the rendered preview and the highlighted code snippet (`customIconCode`) to match.

## Verification
- Visual check at desktop and mobile (375px) once browser is functional.
- DS constraint review pass (ds-review agent) on the modified `.tsx`.
- Skip `pnpm build`/`typecheck` per memory (single-file docs edit).
