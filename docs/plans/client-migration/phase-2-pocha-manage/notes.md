# Phase 2 — Notes (append-only)

## 2026-04-24 — Lane 2.6 folded into 2.7 (grill)

Grill session locked the full redesign spec for `PreviousPochaList` + `PreviosPochaSummary` + a new `PreviousPochaDetailDialog` component. Key outcomes:

- **Lane 2.6 retired** — row redesign + N+1 fix (drop per-row `getPochaMenu` fetch) are now part of 2.7. GitHub issue #92 (client) closed as `not planned`. Issue #103 (lane 2.17) loses its `blocked-by:92` label.
- **New feature in 2.7**: clicking a historical row on `/pocha/manage` opens a list-owned menu-detail Dialog (`PreviousPochaDetailDialog.tsx`). Lazy fetch via `useMenu(pochaID, token)` — N+1 truly solved since only the opened pocha fetches.
- **Page reorder on `/pocha/manage`**: active `PochaSummary` renders before `<PreviousPochaList />`. Normally lane 2.17 territory; folded into 2.7 per user call.
- **Row tone matches `PochaSummary.tsx`** (just-merged in Wave 1): data-forward Card, CardDescription lead, muted calendar icon + date-line. Row date uses **compact single-line range** (not 2-col grid — grid reserved for the deep Dialog view).
- **Skeleton rows** (not empty fragment) for loading; `Alert variant="error"` for error; `Alert variant="info"` for empty (NOT StatusView — inline section, not full page).
- **Section header**: `<h2 className="type-h2 !font-semibold">이전 포차 목록</h2>` + `{length}개` count chip (type-caption, muted). No sub-text.
- **Row interactive treatment**: always `<Card hoverable onClick … role="button" tabIndex={0}>` with keyboard `Enter`/`Space` handler. Selected state = `bg-brand-accent-subtle border-brand-primary` (no left-border accent per `feedback_no_left_border`).
- **Cross-surface contract**: row component works unchanged on `/pocha/history` (list forwards parent's `onSelectPocha`); Dialog only renders on manage surface (when `!onSelectPocha`).
- **Execution**: deferred to nightly autonomous routine (kept `autonomous-ready` label on #93 despite REDESIGN scope — spec is fully locked + concrete).

## 2026-04-25 — Lane 2.11 (PochaForm orchestration) — DS fix mid-lane

DS FIX: Toaster missing sonner CSS → flowing `<section>` added a tall gap on every page mounting `<Toaster />`. Imported `sonner/dist/styles.css` from `packages/web/src/styles/index.css`; bumped `@umichkisa-ds/web` 1.0.9 → 1.0.10 (commit 3fc7284). Client `package.json` updated to 1.0.10.

DS FIX (round 2): 1.0.10's @import was redundant — sonner self-injects via `__insertCSS()` at module load. The real cause is that sonner only positions the inner `<ol data-sonner-toaster>`, not the outer `<section aria-label="Notifications ...">`. With no active toasts the inner ol never renders and the empty section flows in document order. Replaced the redundant @import with a CSS override targeting sonner's ARIA-attribute signature; bumped 1.0.10 → 1.0.11 (commit 27e109c). Client `package.json` updated to 1.0.11.

Also reverted `usePocha` SWR conversion in lane 2.11 — single-consumer hook, SWR's cache-sharing benefits don't apply, and the inline arrow fetcher diverged from the codebase's `fetcher`/`fetcherWithToken` pattern. Hook now exposes `refetch()` instead; page wires it as `onSubmitSuccess` for both create + update form instances.

## 2026-04-25 — Lane 2.11b DS fix: Dialog scrollable body + sticky footer

DS FIX: DialogContent had no max-height and no flex layout, so a tall form dialog (PochaFormDialog with growing menu list) overflowed viewport and lost the sticky-footer pattern entirely. Added `flex max-h-full flex-col overflow-hidden` to DialogContent root (commit 380115d on DS main). `max-h-full` resolves against the outer overlay wrapper's `p-4` to ~`100vh - 2rem` — no arbitrary values introduced. Default short dialogs (sm/md) unaffected. Consumer (PochaFormDialog) drops the temporary `max-h-[90dvh] flex flex-col` className override now that DS owns the pattern.

## 2026-04-25 — Lane 2.11b smoke fix: Dialog gap regression

DS FIX: Lane 2.11b's earlier Dialog fix (1.0.13) added `flex flex-col` to DialogContent root, which dropped native block-element margins from children — DialogTitle butted up against body, body against footer. Added `gap-4` (Component tier) to DialogContent root (commit pending). Bumped 1.0.13 → 1.0.14 (patch). Restores breathing room for ALL dialog consumers (PochaMenuItemForm, delete dialogs, etc.) — none had custom gap, so all benefit.

DS FIX: Tailwind v4 content-scan miss for DS source on client. The `data-[state=active]:border-brand-accent` utility (DS Tabs underline variant) was never being emitted by client's Tailwind build because client `.tsx` only used `variant="pill"` previously; the `@source "./src/components/**/*.{ts,tsx}"` in `@umichkisa-ds/web/theme.css` empirically didn't propagate the bracketed-attribute selectors. Workaround: added explicit `@source "../../node_modules/@umichkisa-ds/web/src/components/**/*.{ts,tsx}"` (and form symmetric) in client `globals.css` (commit 5c6ba2d on lane/2.11b-smoke-fixes). TODO: investigate DS theme.css resolution and remove duplicate once root cause is fixed.

## 2026-04-25 — Lane 2.17 DS fix: StatusView fullScreen prop

DS FIX: StatusView only centered within its own box (`w-full h-full`), forcing every consumer to wrap in `<div className="h-screen flex items-center justify-center">` for full-page status screens. Recurs across `error.tsx`, auth gates, and empty pages on every migration phase. Added `fullScreen?: boolean` prop — when true, the outer container uses `min-h-screen` + flex-center directly. Docs page updated (Alert wording, full-screen example, API table entry). Bumped `@umichkisa-ds/web` 1.0.15 → 1.0.16 (commit cd1b3e3 fix; bump commit follows). Client `package.json` updated to 1.0.16. Phase 1 jobs/error.tsx left unchanged (carries the pre-prop pattern; back-fix deferred to a small follow-up).
