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
