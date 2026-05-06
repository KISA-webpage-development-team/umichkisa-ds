# Lane 5.5 — Audit-after redesign findings

**Method:** `toss-fe-review` agent against the phase-5 .tsx/.ts surface (commits `c1ea0a7^..ea38f48`).

**Tally:** 0 BLOCK · 8 SUGGEST · 3 INFO

## Files reviewed

```
src/app/admin/layout.tsx
src/app/admin/page.tsx
src/app/admin/pocha/dashboard/{error,layout,page}.tsx
src/app/admin/pocha/history/page.tsx
src/app/admin/pocha/manage/{layout,page}.tsx
src/components/layout/admin/{AdminHubAppsList,AdminHubCards,AdminHubHero,BackToHubFAB}.tsx
src/middleware.ts
src/mocks/MockAuthToggle.tsx
```

---

## SUGGEST

### S1 — `DashboardPage` mixes 4 concerns
- **File:** `src/app/admin/pocha/dashboard/page.tsx:31-183`
- **Axis:** readability / cohesion
- **Smell:** ~150 lines mixing auth/pochaID resolution, shared orders fetch hoisting, page-level select-mode state machine (with promoting flags + cross-tab effect), and full JSX layout including the inline bulk-promote toolbar.
- **Refactor:** Extract `useDashboardSelectMode({ isPromoting })` hook and `<BulkPromoteToggle />` sub-component. Page body drops to ~80 lines.

### S2 — Unchecked `searchParams` cast to `PochaDashboardTab`
- **File:** `src/app/admin/pocha/dashboard/page.tsx:43-44`
- **Axis:** predictability / coupling
- **Smell:** `searchParams.get("tab") as PochaDashboardTab` — any junk querystring becomes a typed tab and silently desyncs `<Tabs value>`.
- **Refactor:** Validate against a tuple: `const VALID: PochaDashboardTab[] = [...]; const initialTab = VALID.includes(raw) ? raw : "orders";`

### S3 — `pochaID ?? 0` / `token ?? ""` sentinels leak loading contract
- **File:** `src/app/admin/pocha/dashboard/page.tsx:57, 111, 118, 164, 165, 174, 177`
- **Axis:** predictability
- **Smell:** Magic-value sentinels (`safePochaID = 0` means "still loading") that callees must also know about — a hidden contract leaking from `useDashboardOrders`.
- **Refactor:** (a) Make `useDashboardOrders` accept `pochaID: number | null` / `token: string | null` and own the gating, **or** (b) early-return a skeleton from the page when nullish.

### S4 — SWR cache-key string-matching in `manage/page.tsx`
- **File:** `src/app/admin/pocha/manage/page.tsx:79-88`
- **Axis:** coupling
- **Smell:** Page does `startsWith("/pocha/previous/")` / `startsWith("/pocha/menu/")` against SWR's internal cache keys — silently breaks if a hook renames its key.
- **Refactor:** Each hook (`usePreviousPocha`, `useMenu`) exports a `revalidate()` helper. Page calls `Promise.all([refetchPocha(), revalidatePreviousPocha(), revalidateMenu()])`.

### S5 — Effect syncs derived data into context
- **File:** `src/app/admin/pocha/manage/page.tsx:70-74`
- **Axis:** predictability
- **Smell:** `useEffect` deps array omits `setMenus`; pushes fetched data into a context the same component reads from indirectly. Hidden coupling between fetch and context state.
- **Refactor:** (a) Move sync inside `useMenu` so the data-owning hook writes its consumer-facing context, **or** (b) restructure `PochaManageContext` to read `menuListRaw` via selector.

### S6 — Visually-hidden `<h2>spacer</h2>` layout hack
- **File:** `src/app/admin/pocha/history/page.tsx:53-55`
- **Axis:** readability
- **Smell:** A hidden heading element used purely to mirror the opposite pane's heading-row height. Future readers rediscover this by accident.
- **Refactor:** Lift a shared `<PaneHeadingRow />`, **or** use CSS-only alignment (`min-h-[var(--heading-row-h)]`, grid rows).

### S7 — `kisa.admin.fromHub` flag has 3 writers/readers
- **Files:** `src/app/admin/layout.tsx:70-74` + `src/components/layout/admin/AdminHubCards.tsx:68-74` + `src/components/layout/admin/BackToHubFAB.tsx`
- **Axis:** cohesion / predictability
- **Smell:** Layout effect writes on `/admin` mount; `AdminHubCards` writes preemptively on tool-card click; `BackToHubFAB` reads. The FAB's doc comment says "Only the hub sets it" — but cards also set it.
- **Refactor:** Extract `lib/admin/fromHubFlag.ts` exporting `setFromHubFlag()` / `clearFromHubFlag()` / `readFromHubFlag()` with a single key constant. Update the FAB doc comment.

### S8 — `BackToHubFAB` 100-line render mixes two JSX trees
- **File:** `src/components/layout/admin/BackToHubFAB.tsx:95-192`
- **Axis:** readability
- **Smell:** Two large mutually-exclusive JSX trees (shrunk vs pill) with long inline `className` arrays.
- **Refactor:** Extract file-local `<EdgeTab />` and `<HubPill />`; main component shrinks to ~30 lines.

---

## INFO

### I1 — Crossfade scaffolding duplication
- **File:** `src/app/admin/page.tsx:38-80`
- **Smell:** Two `<section>` blocks are near-duplicates of crossfade scaffolding.
- **Refactor:** Optional `<CrossfadePane visible>{children}</CrossfadePane>` — removes ~12 lines.

### I2 — `MockAuthToggle` long inline async handlers
- **File:** `src/mocks/MockAuthToggle.tsx:32-97`
- **Smell:** `handleSimulate` / `handlePromote` are ~30-line handlers each.
- **Refactor:** Optional. Dev-only under `IS_MOCK_MODE` tree-shake — acceptable as-is.

### I3 — Inline `style={{ transitionDuration }}` vs Tailwind
- **File:** `src/app/admin/page.tsx:11`
- **Smell:** `SWAP_MS = 250` injected as inline style while everything else uses Tailwind.
- **Refactor:** `duration-[250ms]` arbitrary value, or a token.

---

## Disposition (open)

To decide with user: which SUGGEST items to action this lane, which to defer to follow-up.
