# Phase 3 — pocha-dashboard (Plan)

> Lanes from this plan become GitHub issues executed per `docs/plans/client-migration/AUTONOMOUS_PROTOCOL.md`. All Phase 3 lanes file in the **client repo** (`KISA-webpage-development-team/KISA-website-client`) — no DS-side lane this phase. Labels, bailout triggers, budgets, and non-goals live on the issues — implementation only below. Source of truth: `./audit.md`.
>
> **UI fidelity is handled by `pastiche`, not by this plan.** Lane specs describe behavior, contracts, state machines, and acceptance criteria — they intentionally do **not** prescribe exact classes, exact variant names, exact spacing, or exact typography utilities. Pastiche resolves those choices against the DS repo's `pastiche/{FACT,KNOWLEDGE,WISDOM}.md`. Where a lane spec mentions a DS primitive (e.g. `Card`, `Tabs`, `Dialog`, `Table`, `ToggleGroup`, `Badge`, `StatusView`, `Toast`, `Skeleton`, `Icon`), it names the primitive — choosing the right variant/size/density is pastiche's job.

**Scope:** Migrate `pocha-dashboard` (`/pocha/dashboard`) — admin-only Kitchen Display System for live order fulfillment, stock management, and post-event reporting — from pre-DS client code into DS-tokenized, DS-componentized, idiomatic implementation. Full `[REDESIGN]` of all three tabs (Orders / Stock / History): replace bespoke kanban + native `<input>` stock editor + raw `<table>` history + bespoke fixed-inset modal with DS primitives. Preserve: admin gate (already in `page.tsx`), order state machine semantics (food vs drink branching), Korean labels, real-backend API contract.

---

## Wave / Dependency Structure

```
Wave A — infra (parallel)
  3.1  MSW dashboard handlers (orders/closed/status/stock/simulate-spawn)  (autonomous, TDD)
  3.2  Phase 3 pure utils (stats + batch-promote + history analytics)      (autonomous, TDD)
  3.3  WS disable in mock + Simulate button in MockAuthToggle               (interactive)
       │
       └──────► (Wave A complete → shell wave enabled)

Wave B — shell (single)
  3.4  Page shell: DS Tabs + persistent Stats strip
        (blocked-by 3.1, 3.2, 3.3)                                          (autonomous)

Wave C — presentation (parallel, post-shell)
  3.5  OrderItemCard redesign           (blocked-by 3.4)                    (autonomous)
  3.6  Food/Drink grids redesign        (blocked-by 3.4)                    (autonomous)
  3.8  Stock tab full redesign          (blocked-by 3.4)                    (interactive)
  3.9  History tab redesign             (blocked-by 3.4)                    (autonomous)

Wave D — Orders integration
  3.7  Orders tab batch-select mode     (blocked-by 3.5, 3.6, 3.2)          (interactive)

Wave E — close-out (serial)
  3.10 Page shell legacy ui sweep + error.tsx
        (blocked-by 3.7, 3.8, 3.9)                                          (autonomous)
       │
  3.11 Audit-after redesign pass        (blocked-by 3.10)                   (interactive)
       │
  3.12 Verify + end-bump                (blocked-by 3.11)                   (interactive)
```

**Critical path:** 3.1 → 3.4 → 3.5 → 3.7 → 3.10 → 3.11 → 3.12 ≈ 7 serial lanes. Wave A can run 3 concurrent; Wave C can run 4 concurrent.

**Dependency edges** (→ means "must merge before"):

- `3.1, 3.2, 3.3 → 3.4` (shell consumes MSW data, stats utils, and the "WS disabled in mock" flag)
- `3.4 → 3.5, 3.6, 3.8, 3.9` (presentation lanes plug into the new shell)
- `3.5, 3.6, 3.2 → 3.7` (batch-select integrates redesigned cards/grids and consumes `batchPromote.ts`)
- `3.7, 3.8, 3.9 → 3.10` (legacy ui sweep is final touch per file; cannot run while a lane still owns the file)
- `3.10 → 3.11 → 3.12` (review + verify last)

---

## Label Disposition (6-Rule Gate)

Applied per `AUTONOMOUS_PROTOCOL.md` §6. Drives `autonomous-ready` vs `needs-interactive` at issue creation.

| Lane | Tag | Disposition | Rationale |
|---|---|---|---|
| 3.1 | [MECHANICAL][TDD] | `autonomous-ready` | New MSW handler additions; tests pre-specified below; no app code touched |
| 3.2 | [MECHANICAL][TDD] | `autonomous-ready` | Pure functions; new files + extension of `orderHistoryUtils.ts`; tests pre-specified |
| 3.3 | [POLISH][NO-TDD] | `needs-interactive` | Modifies `MockAuthToggle.tsx` UX (button placement, copy); rule 5-adjacent (extends mock auth dock); live decision on Simulate button affordance |
| 3.4 | [REDESIGN][NO-TDD] | `needs-interactive` | REDESIGN tag (rule 1 fail); new component `DashboardStatsStrip` + tab restructure; visual decision on stats-strip layout at narrow widths |
| 3.5 | [REDESIGN][NO-TDD] | `needs-interactive` | REDESIGN — typography hierarchy + single-tap promote semantic change |
| 3.6 | [POLISH][NO-TDD] | `autonomous-ready` | Behavior-preserving column-header swap + `STATUS_COLORS` removal; spec fully locked |
| 3.7 | [REDESIGN][NO-TDD] | `needs-interactive` | REDESIGN — new selection state machine + Dialog gate + long-press gesture; integration moment |
| 3.8 | [REDESIGN][NO-TDD] | `needs-interactive` | REDESIGN — full Stock tab rewrite; inline-edit race conditions need live verify |
| 3.9 | [REDESIGN][NO-TDD] | `autonomous-ready` | REDESIGN tag, but spec is fully locked (DS Table swap + ToggleGroup filter + Dialog with B-lite analytics — concrete enough for autonomous despite tag, mirroring lane 2.7 precedent) |
| 3.10 | [MECHANICAL][NO-TDD] | `autonomous-ready` | Add `error.tsx`; sweep remaining `@/components/ui/feedback` imports; scope is mechanical |
| 3.11 | n/a | `needs-interactive` | Review pass; full-phase visual/UX diff |
| 3.12 | n/a | `needs-interactive` | Touches publish (`ds-phase-end-bump` if any DS fixes); final verify |

**Totals:** 4 autonomous-ready, 8 needs-interactive.

---

## Lane 3.1 — MSW dashboard handlers

**Repo:** `KISA-website-client`

### Files

- Modify: `src/mocks/handlers/pocha.ts` — append dashboard handlers + order store
- Modify: `src/mocks/fixtures/pocha.ts` — append `mockOrderItems` (~25 active + ~15 closed)
- Modify: `src/mocks/handlers/__tests__/pocha.test.ts` — append dashboard handler tests

### Tasks (TDD)

- [ ] **Tests first.** Write failing tests for handler behavior, confirm fail, implement to green.

#### Pre-specified test cases (per AP §6 rule 4)

- [ ] `GET /pocha/dashboard/orders/{pochaID}/` with `Authorization: Bearer <token>` returns `Orders` shape: `{ pending: OrderItem[], preparing: OrderItem[], ready: OrderItem[] }` populated from `orderItemStore` filtered to non-closed
- [ ] `GET /pocha/dashboard/orders/{pochaID}/` without `Authorization` returns 401
- [ ] `GET /pocha/dashboard/closed-orders/{pochaID}/` returns `OrderHistory` shape: `{ closed: OrderItem[] }` from `orderItemStore` filtered to `closed`
- [ ] `PUT /pocha/dashboard/{orderItemID}/change-status/` with food item (`isImmediatePrep=false`) advances `pending → preparing → ready → closed` (one step per call); returns `{ newStatus: <next> }`
- [ ] `PUT /pocha/dashboard/{orderItemID}/change-status/` with drink item (`isImmediatePrep=true`) advances `pending → ready → closed` (skips `preparing`)
- [ ] `PUT /pocha/dashboard/{orderItemID}/change-status/` for an item already at `closed` returns 400
- [ ] `PUT /pocha/dashboard/{orderItemID}/change-status/` for unknown id returns 404
- [ ] `PUT /pocha/menu/{menuID}/stock/` with body `{ quantity: <N> }` updates `menusStore` for the matched menu; returns `{ ok: true, menuID, quantity }`
- [ ] `PUT /pocha/menu/{menuID}/stock/` with negative `quantity` returns 400
- [ ] `POST /pocha/_mock/spawn-order/{pochaID}/` picks a random menu item from `menusStore[pochaID]` where `stock > 0`, creates a new `OrderItem` with `status='pending'` and `quantity ∈ [1,3]`, decrements that menu's stock, and returns the new `OrderItem` (full enriched shape — `menu` + `ordererName` + `ordererEmail` joined)
- [ ] `POST /pocha/_mock/spawn-order/{pochaID}/` returns 409 when every menu item has `stock === 0`
- [ ] `resetOrderStore()` re-seeds the store from `mockOrderItems` (verify by mutating then resetting then reading)

#### Fixtures

- [ ] `mockOrderItems`: ~25 `OrderItem`s with `status ∈ {pending, preparing, ready}` distributed across both food and drink items; `pochaID = 1` (active fixture); orderer names from a small set (e.g., `["민수", "지영", "현우", "수진", "도윤"]`)
- [ ] ~15 `OrderItem`s with `status='closed'` for the same pocha (history)
- [ ] `nextOrderItemID` initialized so `simulate-spawn` keeps ids monotonic

#### Implementation

- [ ] Add module-level `orderItemStore: OrderItem[]` + `nextOrderItemID: number`; mirror Phase 2 pattern (`pochaStore`, `menusStore`)
- [ ] `seedOrders()` populates `orderItemStore` from `mockOrderItems` and bumps `nextOrderItemID`
- [ ] Export `resetOrderStore()` alongside `resetPochaStore()`
- [ ] State machine helper `nextStatus(item: OrderItem): OrderStatus | null` mirrors backend `dashboard.py:202-216` exactly (food: pending→preparing→ready→closed; drink: pending→ready→closed). Add comment pointing to `KISA-website-server/server/api/pocha/dashboard.py:202-216`.
- [ ] Spawn handler: filter `menusStore[pochaID]` by `stock > 0`, `Math.random()` pick, qty `1 + Math.floor(Math.random() * 3)`, decrement stock, push to `orderItemStore`, return enriched shape
- [ ] `npm run build` + `npm run typecheck` + `npm test` pass

### Acceptance criteria

- [ ] All listed tests pass
- [ ] Handlers compiled into `pochaHandlers` export — no new file, no new index registration
- [ ] Manual smoke (dev with `NEXT_PUBLIC_MOCK_API=1`): `/pocha/dashboard` loads against fixtures; orders populate in 3 columns; History tab shows 15 closed items
- [ ] No app code under `src/app/`, `src/features/`, `src/components/` touched

### Non-goals

- WebSocket disable / Simulate button wiring (lane 3.3)
- Stats strip computation (lane 3.2 — pure utils)
- Real backend changes (out of scope per audit; user has no deployment access)

### Bailout triggers

- `Orders` / `OrderHistory` response shape ambiguous vs handler — `needs-decision`
- Drink-skip rule mismatch with backend file (if file moved or rule changed) — `needs-decision`

---

## Lane 3.2 — Phase 3 pure utils

**Repo:** `KISA-website-client`

### Files

- Create: `src/features/pocha/utils/dashboardStats.ts`
- Create: `src/features/pocha/utils/__tests__/dashboardStats.test.ts`
- Create: `src/features/pocha/utils/batchPromote.ts`
- Create: `src/features/pocha/utils/__tests__/batchPromote.test.ts`
- Modify: `src/features/pocha/utils/orderHistoryUtils.ts` — surface `calculateFoodRankings`, `calculateDrinkRankings`, `analyzeSojuSales`; delete dead `// alert(...)` block
- Create: `src/features/pocha/utils/__tests__/orderHistoryUtils.test.ts`

### Tasks (TDD)

- [ ] **Tests first.**

#### `dashboardStats.ts` — pre-specified test cases

- [ ] `computeStats(orders: OrderItem[], menus: MenuByCategory[])` returns `{ active: number, pending: number, lowStock: number, soldOut: number }`
- [ ] `active` = count of `orders` with `status ∈ {pending, preparing, ready}` (non-closed)
- [ ] `pending` = count of `orders` with `status === 'pending'`
- [ ] `lowStock` = count of menu items across all categories where `stock > 0 && stock <= 3`
- [ ] `soldOut` = count of menu items where `stock === 0`
- [ ] Empty inputs → all zeros
- [ ] Memo-friendly: pure, no side effects, output identity stable for identical inputs (returns new object each call — let consumers `useMemo`)

#### `batchPromote.ts` — pre-specified test cases

- [ ] `computeBreakdown(selectedOrderItems: OrderItem[])` returns `{ toPreparing: number, toReady: number, toClosed: number }`
- [ ] Food `pending` → counts as `toPreparing`
- [ ] Food `preparing` → counts as `toReady`
- [ ] Drink `pending` (where `menu.isImmediatePrep === true`) → counts as `toReady` (skips preparing)
- [ ] Any item with `status === 'ready'` → counts as `toClosed`
- [ ] Items with `status === 'closed'` are ignored (defensive — should not be in selection set)
- [ ] `requiresDialogGate(selectedOrderItems): boolean` returns `true` iff at least one selected item has `status === 'ready'` (would promote to `closed`)
- [ ] `formatBreakdown(breakdown): string` returns English label `"N items (X → Preparing, Y → Ready)"` skipping zero buckets
- [ ] Examples: `{toPreparing:2, toReady:1, toClosed:0}` → `"3 items (2 → Preparing, 1 → Ready)"`; `{toPreparing:0, toReady:0, toClosed:5}` → `"5 items (5 → Closed)"`

#### `orderHistoryUtils.ts` — pre-specified test cases (extension)

- [ ] `calculateFoodRankings(orderHistory)` returns top-3 food items (anju) by quantity sold: `Array<{ nameKor: string, quantity: number, revenue: number }>`
- [ ] `calculateDrinkRankings(orderHistory)` returns top-3 drink items (immediate-prep) by quantity sold (same shape)
- [ ] `analyzeSojuSales(orderHistory)` returns `{ regular: number, fruit: number, total: number }` — `regular` = items whose `nameKor` includes `"소주"` AND not includes any of `["과일", "딸기", "복숭아", "포도", "자몽", "청포도", "사과"]`; `fruit` = items including `"소주"` AND one of those fruit tokens
- [ ] Empty history → all rankings are `[]`; soju analysis returns `{ regular: 0, fruit: 0, total: 0 }`
- [ ] No-soju history → soju analysis returns `{ regular: 0, fruit: 0, total: 0 }`
- [ ] Existing exports (`calculateTotalSales`, `calculateSummary`, `convertOrderHistoryToMenuMap`) remain — no behavior change

#### Implementation cleanup

- [ ] Delete dead commented `// alert(\`총 금액: ...\`)` block in `calculateSummary` (lines 60–66 in current file)
- [ ] No `console.log` left in any util file

### Acceptance criteria

- [ ] All listed tests pass
- [ ] `npm run typecheck` passes
- [ ] `dashboardStats.ts` and `batchPromote.ts` are pure (no React imports, no I/O)
- [ ] `orderHistoryUtils.ts` exports the three new functions

### Non-goals

- Stats strip UI (lane 3.4)
- Batch-select UX (lane 3.7)
- History summary modal UI (lane 3.9)

### Bailout triggers

- Soju-fruit detection token list incomplete vs actual fixtures (e.g., a fruit-soju in fixtures not matched) — `needs-decision`
- `OrderItem.menu.isImmediatePrep` typed as `boolean | undefined` requiring narrowing — `needs-decision`

---

## Lane 3.3 — WS disable in mock + Simulate button in MockAuthToggle

**Repo:** `KISA-website-client`
**Mode:** `needs-interactive` (mock auth dock UX)

### Files

- Modify: `src/features/pocha/hooks/useDashboardOrderSocket.tsx` — early-return when `IS_MOCK_MODE`
- Modify: `src/mocks/MockAuthToggle.tsx` — add "Simulate order" button (visible only on `/pocha/dashboard` when admin toggle is on)
- Modify: `src/mocks/__tests__/authContext.test.tsx` — extend if behavior changes (likely not)

### Tasks

- [ ] In `useDashboardOrderSocket`, early-return `null` (and skip the socket effect entirely) when `process.env.NEXT_PUBLIC_MOCK_API === "1"` (or use the existing `IS_MOCK_MODE` constant if exported from `@/constants/env` or `@/lib/auth/authContext`). **Prod path 100% untouched.**
- [ ] Wire up "Simulate order" button in `MockAuthToggle`:
  - Visibility: only when `isAuthenticated && isAdmin && pathname === "/pocha/dashboard"` (use `usePathname()` from `next/navigation`)
  - Affordance: DS `Button` with a leading DS `Icon`, label `"Simulate order"` (variant/size/icon-name resolved by pastiche)
  - On click: `fetch("/api/v2/pocha/_mock/spawn-order/" + activePochaID, { method: "POST", headers: { Authorization: "Bearer " + mockToken } })` → on success surface a DS `Toast` `"Order added"`; on error surface an error Toast
  - Active pochaID source: read from URL search params or call `usePochaID()` (whichever lane 3.1's spawn endpoint expects — pochaID lives in URL `?pochaID=N` or query a fixture-default constant)
- [ ] Discuss in grill: where should `addNewOrderItem` get the new order? Two options — (a) Simulate button calls handler that returns `OrderItem`, then dispatches a custom DOM event listened by `useDashboardOrders` to push into `ordersMap`; (b) Simulate button just calls the spawn endpoint and the dashboard polls/refetches. **Lock during execution grill.** Default proposal: option (a) with a `window.dispatchEvent(new CustomEvent("mock:new-order", { detail: orderItem }))` listened by `useDashboardOrders` only when `IS_MOCK_MODE`.
- [ ] `npm run build` + `npm run typecheck` + `npm test` pass

### Acceptance criteria

- [ ] In mock mode, the dashboard socket hook never opens a connection (verify via `console.log` removal + no `socket.io` traffic in network panel)
- [ ] In prod (non-mock) mode, behavior is identical to pre-lane (early-return is gated only by `IS_MOCK_MODE`)
- [ ] Simulate button visible only on `/pocha/dashboard` when admin toggle is on; clicking adds an order to the active pocha and decrements menu stock
- [ ] Toast confirms success/failure
- [ ] Existing `MockAuthToggle` two-switch UX unchanged

### Non-goals

- Adding a "Simulate stock change" or "Simulate close-out" button (out of scope; YAGNI)
- Showing the Simulate button on other pocha pages (gated to `/pocha/dashboard`)
- Implementing the `_mock/spawn-order` handler (lane 3.1)

### Bailout triggers

- `useDashboardOrders` hook does not expose a way to push new orders cleanly — `needs-decision` (might need an extra param or `useReducer` switch)
- `IS_MOCK_MODE` constant location ambiguous (search both `@/constants/env` and `@/lib/auth/authContext`) — `needs-decision`

---

## Lane 3.4 — Page shell: DS Tabs + Stats strip

**Repo:** `KISA-website-client`
**Mode:** `needs-interactive` (REDESIGN — visual layout decision on stats-strip narrow-width behavior)

### Files

- Modify: `src/app/(pocha)/pocha/dashboard/page.tsx`
- Delete: `src/features/pocha/components/dashboard/DashboardTabs.tsx` (replaced by DS `Tabs`)
- Modify: `src/features/pocha/components/dashboard/DashboardTabContent.tsx` — wrap in DS `TabsContent` slots (or fold into page.tsx if Tabs API requires colocation)
- Create: `src/features/pocha/components/dashboard/DashboardStatsStrip.tsx`

### Tasks

- [ ] Restructure `page.tsx`:
  - Keep admin gate + loading guards (untouched)
  - Render `<DashboardStatsStrip pochaID={pochaID} token={token} />` above the tabs
  - Replace `<DashboardTabs ... /> + <DashboardTabContent ... />` with a single DS `Tabs` shell controlling 3 panels (`Orders`, `Stock`, `History`) wrapping `<OrderDashboard />`, `<StockManager />`, `<OrderHistoryTable />` respectively
  - Preserve URL sync via `updateURLWithTab` — wire to the Tabs value-change handler
  - **Delete** the "To promote Order Item to next status, 1. select the order item, 2. click the Promote button" copy entirely (single-tap promote in 3.5 + batch-select mode in 3.7 makes this irrelevant)
  - Page container axis matches Phase 2 (same horizontal padding rhythm)

- [ ] Build `DashboardStatsStrip.tsx`:
  - Consumes `useDashboardOrders(pochaID, token)` → `ordersMap` + `useMenu(pochaID, token)` → `menuList`
  - `useMemo` over `computeStats(Array.from(ordersMap.values()), menuList)`
  - Renders 4 stats — `Active`, `Pending`, `Low stock (≤3)`, `Sold out (=0)` — using DS `Card` containers, with the `Low stock` / `Sold out` values visually accented (warning / error tone) when their value > 0
  - Layout adapts across breakpoints (4 across at desktop, denser at narrow widths) — exact grid resolved during execution
  - Loading: DS `Skeleton` placeholders inside the same card containers (label + value)
  - Error: silently fall back to em-dashes — strip is a signal aid, not blocking content

- [ ] Pass `ds-client-review`; `npm run build` + `npm run typecheck` pass

### Acceptance criteria

- [ ] `page.tsx` no longer imports `DashboardTabs` (file deleted) or has any `sejongHospital*` import
- [ ] `Tabs` URL sync works (`?tab=stock` deep links open Stock tab)
- [ ] Stats strip renders identical numbers as manual count from MSW fixtures (eyeball check)
- [ ] Stats strip wraps gracefully at narrow widths (verify 375px and 768px viewports in browser)
- [ ] No regression to admin gate behavior

### Non-goals

- Tab content redesign (lanes 3.5–3.9 own the contents)
- `error.tsx` (lane 3.10)
- `LoadingSpinner` swap on the page shell (already DS `LoadingSpinner` from `@/components/ui/feedback`; lane 3.10 sweeps the import)

### Bailout triggers

- DS `Tabs` API doesn't accept controlled `value`/`onValueChange` — `needs-decision`
- Stats strip query causes double-fetch with `OrderDashboard`'s own `useDashboardOrders` (one shared SWR cache key would dedupe; without SWR, two `useEffect` fetches double-fire) — `needs-decision` (likely fix: hoist `useDashboardOrders` call to page level + prop-drill, or convert to SWR)

---

## Lane 3.5 — OrderItemCard redesign

**Repo:** `KISA-website-client`
**Mode:** `needs-interactive` (REDESIGN — typography hierarchy + single-tap promote semantic change)

### Files

- Modify: `src/features/pocha/components/dashboard/OrderItemCard.tsx`

### Locked spec

**Drop entirely:**
- `useState<selected>` + `handleSelectCard` + the legacy bordered "selected" affordance — selection now lives in batch-select mode (3.7)
- `@nextui-org/react` `Spinner` import
- Ad-hoc `STATUS_COLORS` import
- Any raw color/shadow classes (`text-gray-*`, `bg-white`, `shadow-md`, `border-blue-500`, etc.) — DS-tokenized only

**Card chrome:** DS `Card` (hoverable) — match the Phase 2 `PreviosPochaSummary` Card pattern.

**Loading:** DS `LoadingSpinner`.

**Card content hierarchy** (specifics — variant/size/weight — resolved by pastiche):
- Primary: order number `#{orderItemID}` — strongest emphasis
- Menu name + quantity badge (`×{quantity}`) inline
- Customer chip (orderer name) below the menu line
- **Status not rendered in the card body** — column header carries status (lane 3.6)

**Promote interaction:**
- Single DS `Button` labeled `Promote` — single tap (no select-first step), disabled while `loading`
- Calls `handlePromote` directly; loading state visible during in-flight `changeOrderItemStatus`

**Batch-select integration (prop-driven; consumed by 3.7):**
- Optional props: `isSelectMode?: boolean`, `isSelected?: boolean`, `onToggleSelect?: () => void`, `onLongPress?: () => void`
- When `isSelectMode` is true: hide the Promote button, render a DS `Checkbox` (or equivalent selection affordance) in the corner
- When `isSelectMode` is false / undefined: behave as single-tap card (defaults preserve current semantics)
- Long-press: `onPointerDown` + 500ms timer → if pointer not released, call `onLongPress?.()`; cancel on `pointerup` / `pointerleave` / `pointermove` past a small threshold

### Tasks

- [ ] Implement per spec above
- [ ] Pass `ds-client-review`
- [ ] `npm run build` + `npm run typecheck` pass

### Acceptance criteria

- [ ] No `@nextui-org/react`, no `text-gray-*` / `bg-white` raw classes, no `STATUS_COLORS` import
- [ ] Single-tap promote works in mock mode (food: pending → preparing on click; drink: pending → ready)
- [ ] Loading state visible during in-flight `changeOrderItemStatus`
- [ ] Card visually consistent with Phase 2 `PreviosPochaSummary` Card patterns

### Non-goals

- Column header redesign (lane 3.6)
- Wiring `isSelectMode` to a parent state — props are accepted but no parent yet uses them (lane 3.7 wires)
- Optimistic UI update (lane 3.7 — currently still `await`-then-update via `updateOrderItemStatusUI`)

### Bailout triggers

- DS `Card` does not offer a density appropriate for a dense kanban card — `ds-fix-during-migration` candidate, but try existing variants first
- DS `Badge` lacks a variant suited for the customer chip (subtle outline / neutral chip) — fall back to whatever closest exists and document in `notes.md`

---

## Lane 3.6 — Food/Drink grids redesign

**Repo:** `KISA-website-client`

### Files

- Modify: `src/features/pocha/components/dashboard/FoodOrderGrid.tsx`
- Modify: `src/features/pocha/components/dashboard/DrinkOrderGrid.tsx`
- Delete: `src/features/pocha/utils/statusToColor.ts` (no remaining callers after this lane + 3.5)

### Locked spec

- Column shells: DS-tokenized container (border + muted-surface background, rounded). Exact tokens chosen by pastiche.
- Column header: DS `Badge` carrying the status label + a count caption.
  - Status → label mapping: `pending → "Pending"`, `preparing → "Preparing"`, `ready → "Ready"`. Closed is **not** rendered in dashboard grids (History only).
  - Status → Badge variant: warning-toned for `pending`, info-toned for `preparing`, success-toned for `ready`. Exact variant names resolved by pastiche against DS docs.
- Empty state per column: a centered muted caption reading `"None"`.
- Drop `STATUS_COLORS` import from both files (only `OrderItemCard` consumed it; lane 3.5 removed that).

### Tasks

- [ ] Apply spec to both grids
- [ ] Verify `statusToColor.ts` has no remaining callers (`grep -r "statusToColor\|STATUS_COLORS" src/` returns 0); delete file
- [ ] Pass `ds-client-review`
- [ ] `npm run build` + `npm run typecheck` pass

### Acceptance criteria

- [ ] Both grids render with DS-tokenized column shells + Badge headers
- [ ] No remaining references to `statusToColor` / `STATUS_COLORS`
- [ ] FoodOrderGrid renders 3 columns (pending/preparing/ready); DrinkOrderGrid renders 2 (pending/ready)

### Non-goals

- Card content (lane 3.5)
- Batch-select action bars (lane 3.7)

### Bailout triggers

- DS `Badge` lacks a variant set that maps cleanly to status semantics (warning / info / success tones) — adapt to closest equivalents and document in `notes.md`

---

## Lane 3.7 — Orders tab batch-select mode

**Repo:** `KISA-website-client`
**Mode:** `needs-interactive` (REDESIGN — new selection state machine + Dialog gate + long-press gesture)

### Files

- Modify: `src/features/pocha/components/dashboard/OrderDashboard.tsx` (selection state owner)
- Modify: `src/features/pocha/components/dashboard/FoodOrderGrid.tsx` + `DrinkOrderGrid.tsx` (action bars)
- Modify: `src/features/pocha/components/dashboard/OrderItemCard.tsx` (consume `isSelectMode` props from 3.5)
- Modify: `src/features/pocha/hooks/useDashboardOrders.tsx` (optimistic update + revert helpers)

### Locked spec

**Selection state model**
- Page-level `selectMode: boolean` toggle, surfaced via a DS `Button` in the Orders tab's top-right (label flips between `"Select"` and `"Done"`)
- Per-grid `selectedIds: Set<number>` — food and drink grids are **independent** (selecting in food grid does not bleed into drink grid, and vice versa)

**Per-grid action bar** (visible iff `selectMode && selectedIds.size > 0`)
- Sticky to the bottom of the grid, pinned with elevation (DS `Card` container — exact pinning/elevation chosen by pastiche)
- Smart breakdown label via `formatBreakdown(computeBreakdown(selectedItems))` (lane 3.2 utils)
- Primary action: `Promote` button — triggers the promote flow below
- Secondary action: `Cancel` button — clears selection (does not exit select mode)

**Promote flow**
- **Dialog gate:** if `requiresDialogGate(selectedItems)` is true (any selected item is `ready` → would close), open DS `Dialog`:
  - Title: `"Close these orders?"`
  - Body: `formatBreakdown(...)` + the line `"Closed orders cannot be reverted."`
  - Confirm action: destructive-toned `Close` button; cancel action: `Cancel`
- **Otherwise** (no `ready→closed` in selection): silent fan-out, no Dialog
- Fan-out: `Promise.all(selectedItems.map(item => changeOrderItemStatus(item.orderItemID)))`
  - Optimistic: pre-update `ordersMap` to next status before `await`
  - On per-item rejection: revert that item, accumulate failed list
  - After all settle: surface a DS `Toast` — `"N promoted"` on full success, `"N promoted, M failed"` on partial failure
  - Clear `selectedIds` and exit select mode

**Gestures**
- Long-press (500ms) on a card outside select mode: enter select mode + select that card
- Right-click on desktop maps to long-press: `onContextMenu` → `e.preventDefault()` → same handler
- Click in select mode: toggle that card's selection (no promote)
- Click outside select mode: single-tap promote (preserves 3.5 behavior)

### Tasks

- [ ] Add selection state to `OrderDashboard.tsx` with two `Set<number>` (food, drink); pass selection state + handlers down to each grid
- [ ] Wire `OrderItemCard` props (`isSelectMode`, `isSelected`, `onToggleSelect`, `onLongPress`) — ensure long-press cancels on `pointerup` / `pointerleave`
- [ ] Implement `useDashboardOrders` extension: `optimisticPromote(orderItemID, nextStatus)` + `revertPromote(orderItemID, prevStatus)` helpers (both update `ordersMap` synchronously)
- [ ] Implement Dialog gate + fan-out in `OrderDashboard.tsx` (or new co-located helper)
- [ ] Toast wiring via DS `<Toast>` (or whichever DS toast API is in use — match Phase 2.11 pattern)
- [ ] Pass `ds-client-review`
- [ ] `npm run build` + `npm run typecheck` + manual smoke pass

### Acceptance criteria

- [ ] Selection in food grid does not select cards in drink grid (and vice versa)
- [ ] Smart breakdown label updates reactively as cards toggle in/out of selection
- [ ] Selecting any `ready` item triggers the Dialog gate; selecting only non-`ready` items does silent fan-out
- [ ] Partial failure: failed cards revert column position; success Toast names both counts
- [ ] Long-press (500ms) on a card enters select mode + selects that card; right-click does the same
- [ ] Single-tap (outside select mode) still single-tap promotes (3.5 behavior preserved)
- [ ] Exiting select mode (`Done` button) clears all selections in both grids

### Non-goals

- Bulk-promote backend endpoint (client fan-out only, per audit Q2)
- Cross-grid selection (food + drink simultaneous) — explicitly out per audit
- Mobile-specific long-press tuning beyond 500ms — desktop + tablet only per HARNESS

### Bailout triggers

- `useDashboardOrders` mutating `ordersMap` synchronously breaks React's reconciliation (e.g., shared Map reference) — `needs-decision` (fix: `setOrdersMap(new Map(prev))` clone-on-write)
- Long-press false-positives during scroll on tablet — `needs-decision` (may need `pointermove` cancellation)

---

## Lane 3.8 — Stock tab full redesign

**Repo:** `KISA-website-client`
**Mode:** `needs-interactive` (REDESIGN — inline-edit race conditions need live verify)

### Files

- Modify: `src/features/pocha/components/dashboard/StockManager.tsx` (full rewrite)

### Locked spec

**Drop entirely:** `window.location.reload`, every `alert(...)`, native `<input>`, `selectedMenu` / `customStock` state, the "Reload Stock" button, all raw color classes (`bg-blue-500`, `bg-red-500`, `bg-green-500`, etc.).

**Layout:** DS `Table` with columns `[Menu, Category, Stock, Action]`.

**Inline-edit on the Stock cell**
- Row state: `editingId: number | null`, `editValue: string`
- Not editing → display text value of `{stock}`
- Editing (entered by click) → DS numeric `Input` with `min=0`, `autoFocus`. Key handling:
  - `Tab` / `Enter` → commit
  - `Escape` → cancel
  - `blur` → commit
- Commit calls `await changeStock({ menuID, quantity })` with optimistic local update (mutate `menuList` cache or call `mutate(...)` if SWR-backed); on failure → revert + DS `Toast`

**Per-row sold-out action (Action cell)**
- DS icon `Button` carrying a DS `Icon` (semantically a "zero out" / "cancel" affordance — exact icon name resolved by pastiche; **not** a trash/delete icon, since this is a clear-stock action, not a delete)
- On click: open DS `Dialog` `"Set stock to 0?"`; on confirm, commit stock = 0 via the same `changeStock` flow

**Filter chips:** DS `ToggleGroup` (single-select). Options + filter rules:
- `All` — all rows
- `In stock` — `stock > 0`
- `Low` — `1 ≤ stock ≤ 3`
- `Sold out` — `stock === 0`
Each option label includes a memoized count, e.g. `"All (12)"`.

**Loading:** DS `Skeleton` rows.
**Error:** DS `StatusView` (error variant) — title `"Failed to load stock."`, body shows `error.message`.
**Empty (after filter):** centered muted caption `"No menus match this filter."`.

### Tasks

- [ ] Rewrite `StockManager.tsx` per spec
- [ ] Per-row request id tracking: `inFlight: Map<menuID, AbortController>` so concurrent edits don't cross-revert
- [ ] Filter counts memoized on `menuList`
- [ ] Pass `ds-client-review`
- [ ] `npm run build` + `npm run typecheck` + manual smoke pass (commit cell A, then cell B before A returns; verify only A reverts on A's failure)

### Acceptance criteria

- [ ] No `window.location.reload`, no `alert`, no native `<input>` in file
- [ ] Inline-edit commits via Tab/Enter/blur; Escape cancels
- [ ] Per-row `✕` opens Dialog → confirm → stock set to 0
- [ ] Filter chips update counts reactively
- [ ] Race-test passes: A fails after B succeeds → only A reverts

### Non-goals

- SWR migration of `useMenu` (kept as-is per audit)
- Bulk-edit / bulk-zero (out of scope, low frequency)
- Adding new menu items here (handled by `/pocha/manage`)

### Bailout triggers

- DS `Table` API requires a different row/cell model than expected (e.g., row-render-prop only) — adapt; document
- No DS `Icon` available that semantically reads as "zero out / sold out" — bail to `ds-fix-during-migration` only if no equivalent exists at all

---

## Lane 3.9 — History tab redesign

**Repo:** `KISA-website-client`

### Files

- Modify: `src/features/pocha/components/dashboard/OrderHistoryTable.tsx`
- Modify: `src/features/pocha/components/dashboard/OrderSummaryModal.tsx` → consider rename to `OrderSummaryDialog.tsx` (rename optional; keeping name acceptable to minimize import churn)

### Locked spec

#### `OrderHistoryTable.tsx`

- DS `Table` with all 7 columns: `[#, Menu, Category, Qty, Price, Total, Orderer email]`. No email truncation.
- Filter chips: DS `ToggleGroup` (single-select) with `All (N)` / `Food (N)` / `Drinks (N)` (counts memoized on the full `orderHistory`).
- Summary trigger: DS `Button` in the top-right labeled `"View summary"`, opens the Summary Dialog.
- Loading: DS `Skeleton` rows.
- Error: replace the existing `throw new Error(...)` with DS `StatusView` (error variant, title `"Failed to load order history."`) — let `error.tsx` (lane 3.10) catch only true crashes.
- Empty (no history): DS `StatusView` (empty variant, title `"No order history."`).
- Empty (after filter): caption row inside the table shell — not a full `StatusView`.
- **Delete** the `console.log('menuMap', menuMap)` call (currently around the `convertOrderHistoryToMenuMap` call site) — verify with grep before commit.

#### `OrderSummaryModal.tsx` → DS `Dialog` with B-lite analytics

- Triggered by the `View summary` button. Title `"Order summary"`. Use the DS `Dialog`'s built-in close — drop the existing `PochaCloseIcon` import and the bespoke fixed-inset overlay.
- Pass `pochaID` + `orderHistory` props from parent.
- Body is a vertical stack of 4 sections:
  1. **KPI row** — 3 DS `Card`s: `Total revenue` (`calculateTotalSales`), `Food revenue` (anjuRevenue), `Drinks revenue` (drinkRevenue). Each card: caption-style label + emphasized value.
  2. **Top 3 food** — DS `Card` with 3 rows from `calculateFoodRankings(orderHistory)`. Each row: rank (1/2/3) + `nameKor` + `×{quantity}` + `${revenue.toFixed(2)}`.
  3. **Top 3 drinks** — same structure, from `calculateDrinkRankings(orderHistory)`.
  4. **Soju breakdown** — DS `Card`: 2-row breakdown (regular vs fruit) with absolute counts + `(percentage%)`.
- Empty-history fallback: a single line in the body — `"No order history for this pocha."`
- **No charts** — pure text rows + DS `Card` containers (per audit Q5).
- Dialog size: large enough to fit the analytics body; exact size token chosen by pastiche.

### Tasks

- [ ] Rewrite `OrderHistoryTable.tsx` with DS `Table` + `ToggleGroup` per spec; delete `console.log('menuMap', ...)`
- [ ] Rewrite `OrderSummaryModal.tsx` body with DS `Dialog` + B-lite analytics per spec
- [ ] Pass `ds-client-review`
- [ ] `npm run build` + `npm run typecheck` pass

### Acceptance criteria

- [ ] No `console.log` in file (verify `grep -n "console" src/features/pocha/components/dashboard/OrderHistoryTable.tsx`)
- [ ] All 7 columns render in DS Table
- [ ] Filter chips update reactively with counts
- [ ] Summary Dialog renders KPI cards + top-3 food + top-3 drink + soju breakdown
- [ ] No bespoke fixed-inset overlay code remains in `OrderSummaryModal.tsx`

### Non-goals

- Charts (text rows only per audit)
- Email truncation / hover-reveal (kept as-is)
- Adding new analytics beyond what `orderHistoryUtils.ts` exposes

### Bailout triggers

- DS `Dialog` largest size still insufficient for the analytics body — accept overflow scroll inside the body
- `analyzeSojuSales` returns unexpected zero counts on real fixtures (token mismatch) — `ds-fix-during-migration` is irrelevant here; fix in lane 3.2 retroactively; for this lane just render whatever it returns

---

## Lane 3.10 — Page shell legacy ui sweep + error.tsx

**Repo:** `KISA-website-client`

### Files

- Modify: `src/app/(pocha)/pocha/dashboard/page.tsx` — swap remaining `@/components/ui/feedback` imports → `@umichkisa-ds/web`
- Create: `src/app/(pocha)/pocha/dashboard/error.tsx`
- Sweep: any remaining `sejongHospital*` imports across files touched in this phase

### Locked spec

#### `error.tsx`

- Next.js error boundary (`"use client"`) — receives `{ error: Error & { digest?: string }; reset: () => void }` and renders DS `StatusView` (error variant, full-screen) with:
  - title `"Failed to load dashboard."`
  - description from `error.message` (fallback `"Please try again."`)
  - primary action: DS `Button` labeled `"Retry"` wired to `reset`

#### `page.tsx` import sweep

- `import { LoadingSpinner, NotAuthorized } from "@/components/ui/feedback";` → `import { LoadingSpinner, NotAuthorized } from "@umichkisa-ds/web";` (verify both are exported; if `NotAuthorized` is not yet in DS, keep the legacy import and flag in `notes.md` as a Phase 4 lane candidate)

### Tasks

- [ ] Add `error.tsx` per spec
- [ ] Sweep page.tsx imports
- [ ] `grep -rn "sejongHospital" src/features/pocha/components/dashboard/ src/app/\\(pocha\\)/pocha/dashboard/` → expect 0 matches
- [ ] `grep -rn "@/components/ui/feedback" src/features/pocha/components/dashboard/ src/app/\\(pocha\\)/pocha/dashboard/` → expect 0 matches (or only `NotAuthorized` if DS missing it)
- [ ] Pass `ds-client-review`
- [ ] `npm run build` + `npm run typecheck` pass

### Acceptance criteria

- [ ] `error.tsx` present and renders DS `StatusView` on thrown errors
- [ ] No `sejongHospital*` imports in the dashboard subtree
- [ ] No `@/components/ui/feedback` imports remain (or only `NotAuthorized` with a documented carry-over)

### Non-goals

- Migrating `NotAuthorized` to DS (Phase 4+ scope if not already in DS)
- Touching files outside dashboard subtree

### Bailout triggers

- `LoadingSpinner` / `NotAuthorized` API mismatch between legacy and DS — document the diff and `needs-decision`

---

## Lane 3.11 — Audit-after redesign pass

**Repo:** `KISA-website-client`
**Mode:** `needs-interactive` (review pass)

### Scope

- Manual visual/UX walkthrough of `/pocha/dashboard` at desktop (1280px) and tablet (768px) viewports in mock mode
- Use `review-ui-on-browser` skill via Playwright CLI
- Coverage:
  - Stats strip layout at all breakpoints (4-col / 2×2 / 1-col)
  - Tabs URL sync (`?tab=stock`, `?tab=history`)
  - Orders tab: single-tap promote (food + drink), select mode toggle, batch fan-out, Dialog gate on `ready→closed`, long-press, partial failure
  - Stock tab: inline-edit commit/cancel, per-row `✕` Dialog, filter chips
  - History tab: filter chips, Summary Dialog with all 4 sections
  - Empty / loading / error states for all three tabs
- Fix on the same branch any drift caught (typography, spacing, copy)

### Tasks

- [ ] Spin up dev server: `cd ../KISA-website/client && NEXT_PUBLIC_MOCK_API=1 npm run dev` (use devtunnels URL, never localhost)
- [ ] Run `review-ui-on-browser` per coverage list
- [ ] Capture findings in `docs/plans/client-migration/phase-3-pocha-dashboard/review-3.11-findings.md` (create as needed)
- [ ] Apply fixes; commit + push (this is Mode D — direct push, no PR)

### Acceptance criteria

- [ ] All coverage items reviewed; findings file checked in
- [ ] No outstanding visual / UX drift
- [ ] `npm run build` + `npm run typecheck` pass

### Non-goals

- Mobile (≤ 480px) coverage — admin tool, not mobile-first
- Cross-browser (Chrome only acceptable for this pass)

---

## Lane 3.12 — Verify + end-bump

**Repo:** `KISA-website-client` + `umichkisa-ds` (if any DS fixes accumulated)
**Mode:** `needs-interactive`

### Tasks

- [ ] Both repos: `pnpm build` + `pnpm typecheck` (DS) / `npm run build` + `npm run typecheck` + `npm test` (client) all green
- [ ] Manual smoke: toggle mock auth on, click Simulate ×3, run promote chain (single + batch), open Dialog gate, edit stock + cancel, view History summary, hard-refresh between
- [ ] Check `docs/plans/client-migration/ds-fixes-log.md` for Phase 3 entries
- [ ] If entries exist: invoke `ds-phase-end-bump` (always patch per memory `feedback_ds_bump_semver`)
- [ ] If no entries: skip end-bump, document `"no end-bump needed — all DS fixes mid-phase shipped"` in TODO entry per Phase 1/2 precedent
- [ ] Tick Phase 3.12 + parent Phase 3 in `docs/TODO.md`

### Acceptance criteria

- [ ] Both repos green
- [ ] DS version pinned correctly in client `package.json` (whatever the latest mid-phase patch is, or unchanged if no fixes)
- [ ] TODO.md ticks reflect lane completion

### Non-goals

- Phase 4 kickoff (next session)

---

## Open items deferred to execution

Carried forward from `audit.md`:

- **3.1**: `simulate-spawn` qty randomization range (currently spec'd as 1–3); confirm at execution
- **3.2**: `analyzeSojuSales` fruit-token list (audit lists `["과일","딸기","복숭아","포도","자몽","청포도","사과"]`); validate against actual fixture menu names at execution
- **3.4**: stats-strip narrow-width behavior — defer to pastiche/grill
- **3.7**: long-press threshold (500ms default); right-click → `onContextMenu` mapping; verify cross-browser at execution
- **3.11**: review file path created at execution — `review-3.11-findings.md` or per-tab files
- **Backend follow-up** (post-Phase-3, when deployment access returns): add `createdAt`/`updatedAt` to `orderItem` table; restore urgency timer on `OrderItemCard`
