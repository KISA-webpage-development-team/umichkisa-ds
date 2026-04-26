# Phase 3 — pocha-dashboard (Audit)

**Type:** Vertical feature phase (per HARNESS), subphased into lanes for parallel execution.
**Charter:** Migrate the admin-only `/pocha/dashboard` page (Kitchen Display System for live order fulfillment, stock management, and post-event reporting) from pre-DS code into DS-tokenized, DS-componentized, idiomatic implementation. **Scope marker: `[REDESIGN]`** — the existing dashboard was built under deadline pressure and exhibits anti-patterns (`window.location.reload`, `alert`, two-step select-then-button UX, native `<table>`/`<input>`, bespoke fixed-inset modal, dead unused analytics utilities). Migration is the moment to fix the UX, not just port-with-tokens.
**Scope principle:** Full redesign of all three tabs (Orders / Stock / History) within the existing dashboard route. Preserve: admin gate, order state machine semantics (food vs drink branching), Korean labels, real-backend API contract. Replace: ad-hoc UI primitives, two-step promote flow, dialog-as-window-reload pattern.

---

## Scope Snapshot

### Source files (client)

```
src/app/(pocha)/pocha/dashboard/
└── page.tsx                                  [REACHABLE, admin gate already in place]
└── error.tsx                                 (NEW — to be added in 3.10)

src/features/pocha/
├── components/dashboard/
│   ├── DashboardTabs.tsx                     bespoke tab buttons w/ sejongHospitalBold.className
│   ├── DashboardTabContent.tsx               switch on activeTab
│   ├── OrderDashboard.tsx                    Food/Drink grid container
│   ├── FoodOrderGrid.tsx                     3-col kanban (pending/preparing/ready)
│   ├── DrinkOrderGrid.tsx                    2-col kanban (pending/ready)
│   ├── OrderItemCard.tsx                     two-step select-then-promote, @nextui-org Spinner
│   ├── StockManager.tsx                      window.reload + alert + native <input>
│   ├── OrderHistoryTable.tsx                 raw <table> + filter buttons + console.log leftover
│   └── OrderSummaryModal.tsx                 bespoke fixed-inset overlay, PochaCloseIcon
├── hooks/
│   ├── useDashboardOrders.tsx                ordersMap + addNewOrderItem + updateOrderItemStatusUI
│   ├── useDashboardOrderSocket.tsx           socket.io live-order listener
│   └── useOrderHistory.tsx                   useEffect + useState (no SWR — kept by design)
├── utils/
│   ├── orderHistoryUtils.ts                  has unused analytics (rankings, soju breakdown)
│   └── statusToColor.ts                      ad-hoc status color map (replace with DS tokens)
└── (new files in 3.2)
    ├── utils/dashboardStats.ts               stats strip pure functions (Active/Pending/LowStock/SoldOut)
    └── utils/batchPromote.ts                 batch-select breakdown + Dialog-gate logic

src/apis/pocha/
├── queries.ts                                getPochaOrders, getPochaClosedOrders, getMenu
└── mutations.ts                              changeOrderItemStatus, changeStock

src/mocks/
├── handlers/pocha.ts                         (extended in 3.1: dashboard handlers)
├── fixtures/pocha.ts                         (extended in 3.1: mockOrderItems)
└── MockAuthToggle.tsx                        (extended in 3.3: Simulate-order button)
```

### Out of scope
- Real backend (`KISA-website-server`) — **no schema changes, no endpoint additions** (user has no deployment access). All order state machine + drink-skip logic mirrored client-side in MSW.
- Other pocha surfaces (`/pocha`, `/pocha/manage`, `/pocha/cart`, `/pocha/pay`, `/pocha/history`) — Phases 2 and 4.
- WebSocket realtime path in **prod** — preserved as-is; only disabled in mock mode.
- Push notifications (FCM) — out of dashboard scope.
- Order-grouped cards (1 card per parent order) — would require backend response shape changes; deferred. Stay with item-level cards.

---

## Decisions Locked (grill output)

| Q | Decision | Rationale |
|---|---|---|
| Q1 | **WebSocket disabled in mock mode** + **"Simulate order" button** in `MockAuthToggle` dock; Simulate calls a new MSW-only `_mock/spawn-order/{pochaID}` endpoint that adds to the order store and decrements menu stock | MSW can't sanely mock socket.io. Simulate routes through MSW so refresh persists state and stock decrements demo cross-tab consistency. Prod path untouched. |
| Q2 | **Batch-select promote** — iPhone-Photos pattern: page-level `선택 모드` toggle, per-grid action bars, "smart breakdown" label (e.g., `Promote 3개 (2→준비중, 1→완료)`), Dialog gate when selection includes any `ready→closed`, silent click default + long-press shortcut, client fan-out (no new bulk endpoint), per-grid scope (food/drink independent) | Replaces the deliberate-but-bad two-step select-then-promote. Mis-tap protection preserved via select-mode gesture. Per-grid scope keeps food/drink station workflows independent. |
| Q3 | **Hybrid IA** — keep DS `Tabs` (Orders / Stock / History) + persistent stats strip above tabs (visible on every tab) | Preserves correct mode separation (live ops vs inventory vs analytics) without reshaping IA. Stats strip earns its keep on every tab (e.g., low-stock signals visible while in Orders). |
| Q3a | Stats strip = **Active · Pending · Low stock (≤3) · Sold out (=0)** | Operational, not financial. Cross-tab signals — Stock-tab signals visible while in Orders. |
| Q3b | **Drop urgency timer** | Backend `orderItem` schema has no `createdAt`/`updatedAt` columns and user has no deployment access to add them. Honest UX > fake timer. |
| Q3c | **Item-level cards** (current data shape), redesigned typography & hierarchy (Order# primary, qty badge, customer chip) | Order-grouped cards would require backend response shape changes. Item-level is what the API gives us. |
| Q4 | **Stock = inline-editable DS `Table`** with Excel-style cell edit (Tab/Enter commits, Escape cancels), per-row `✕` sold-out button → DS `Dialog` confirm, filter chips (전체/재고있음/부족/품절), Skeleton during load, StatusView on error, optimistic local update + revert on error (no SWR) | Replaces `window.reload` + `alert` + native `<input>`. No bulk select (low-frequency action). No SWR (overengineering for single-source admin tab). |
| Q5 | **History = DS `Table`** (all 7 cols incl. Email), DS `ToggleGroup` filter chips (전체/안주/주류 with counts), summary modal → DS `Dialog` with **B-lite analytics** (KPI cards + top-3 food + top-3 drink rankings + soju regular-vs-fruit breakdown, no charts), drop `console.log`, delete dead `alert` block in utils, no SWR | Surfaces unused-but-computed analytics (rankings, soju breakdown) instead of deleting them. No charts — text rows + DS Card for KPIs. Email kept as-is (no truncation). |
| Q6 | **Single combined MSW lane** (3.1) covering: orders GET active, orders GET closed, status PUT (with drink-skip rule mirrored), stock PUT, simulate-spawn POST + decrement-stock; module-level store + `resetOrderStore()` (Phase 2 pattern); pre-seed ~25 active + ~15 closed orderItems | Same store, same fixture, splitting is bookkeeping overhead. Drink-skip rule (`pending→ready` for `isImmediatePrep=true`) mirrored exactly per backend `dashboard.py`. |
| Q6h | **Optimistic promote** for non-terminal transitions; **pessimistic** + Dialog confirm for `ready→closed` | Real-world kitchen feel for routine promotes; gating preserved on the destructive removal step. |
| Q7 | **2 TDD lanes**: 3.1 (MSW handlers), 3.2 (pure utils — stats + batch-promote + history analytics extensions) | Down from Phase 2's 4 because Phase 3 has no new DS component (Phase 2 had `FileUpload`) and MSW lanes are bundled. UI lanes stay `[NO-TDD]` per Phase 2 ethos. |
| Q8 | **12 lanes** total (3.1–3.12); 7 autonomous, 5 interactive; 4-way parallelism in Wave C | Single-responsibility per lane (Phase 2 ethos). Fine granularity for parallel terminal pickup. |

---

## Subphase Enumeration

| # | Title | Single responsibility | TDD | Mode |
|---|---|---|:---:|---|
| 3.1 | **MSW dashboard handlers** | Combined: orders GET (active), orders GET (closed), status PUT (with drink-skip), stock PUT, simulate-spawn POST + decrement-stock; `mockOrderItems` fixture (~25 active + ~15 closed); module-level `orderItemStore` + `resetOrderStore()` | **yes** | autonomous |
| 3.2 | **Phase 3 pure utils** | Combined: `dashboardStats.ts` (Active/Pending/LowStock/SoldOut counts), `batchPromote.ts` (`computeBreakdown`, `requiresDialogGate`), surface existing `calculateFood/DrinkRankings` + `analyzeSojuSales` from `orderHistoryUtils.ts` (extend with tests) | **yes** | autonomous |
| 3.3 | **WS disable + Simulate button** | `useDashboardOrderSocket` early-return when `NEXT_PUBLIC_MOCK_API=1`; extend `MockAuthToggle` with "Simulate order" button calling `_mock/spawn-order/{pochaID}` → `addNewOrderItem`; success Toast | no | interactive |
| 3.4 | **Page shell: DS Tabs + Stats strip** | `page.tsx` restructure; `DashboardTabs` → DS `Tabs`; new `DashboardStatsStrip` component above tabs (consumes 3.2 utils); remove "To promote Order Item..." instructional copy | no | autonomous |
| 3.5 | **OrderItemCard redesign** | Typography hierarchy (Order# primary, qty badge, customer chip), single-tap promote (no select-first state), DS tokens, replace `@nextui-org/react` Spinner with DS `LoadingSpinner` | no | autonomous |
| 3.6 | **Food/Drink grids redesign** | `FoodOrderGrid` + `DrinkOrderGrid` column headers (DS `Badge` variants for status colors), kanban layout polish, drop `STATUS_COLORS` ad-hoc map | no | autonomous |
| 3.7 | **Orders tab batch-select mode** | Page-level 선택 모드 toggle; per-grid action bars (sticky bottom); smart breakdown label `Promote N개 (X→준비중, Y→완료)`; Dialog gate when selection includes `ready→closed`; client fan-out promote (parallel `changeOrderItemStatus` calls); optimistic UI; long-press = enter select mode + select that card | no | interactive |
| 3.8 | **Stock tab full redesign** | `StockManager` → DS `Table`; Excel-style inline edit (Tab/Enter commit, Escape cancel) with optimistic local update + revert on error; per-row `✕` sold-out → DS `Dialog` confirm; filter chips (전체/재고있음/부족/품절 with counts) via DS `ToggleGroup`; Skeleton during load; StatusView on error; remove `window.reload` + `alert` | no | interactive |
| 3.9 | **History tab redesign** | `OrderHistoryTable` → DS `Table` (all 7 cols); filter chips → DS `ToggleGroup` (전체/안주/주류); `OrderSummaryModal` → DS `Dialog` with B-lite analytics (KPI cards + top-3 food + top-3 drink + soju regular-vs-fruit, no charts); remove `console.log('menuMap', ...)`; delete dead `alert` comment block in `orderHistoryUtils.ts` | no | autonomous |
| 3.10 | **Page shell legacy ui sweep + error.tsx** | Add `dashboard/error.tsx` (DS `StatusView` pattern); sweep any remaining `@/components/ui/feedback` imports → DS; final `sejongHospital*.className` audit on touched files | no | autonomous |
| 3.11 | **Audit-after redesign pass** | Phase-level visual/UX walkthrough at desktop + tablet viewports; catch drift before close (mirrors Phase 2.19) | no | interactive |
| 3.12 | **Verify + end-bump** | Build + typecheck; manual smoke (toggle mocks on, click Simulate ×3, run promote chain, edit stock, view history + summary); optional DS bump if mid-phase fixes accumulated | no | interactive |

**Count:** 12 subphases (3.1–3.12; strict sequential, no out-of-order).
**Autonomous/interactive:** 7 / 5.
**TDD lanes:** 2 (3.1, 3.2 — both Wave A infra).

---

## Dependency Graph

```
                    ┌──────────────────┐
                    │ Wave A — Infra   │
                    │ (parallel)       │
                    └──────┬───────────┘
        ┌──────────────────┼──────────────────┐
        ▼                  ▼                  ▼
┌────────────────┐  ┌────────────────┐  ┌──────────────────┐
│ 3.1 MSW        │  │ 3.2 Pure utils │  │ 3.3 WS+Simulate  │
│ handlers (TDD) │  │ (TDD)          │  │ (interactive)    │
└────────┬───────┘  └────────┬───────┘  └─────────┬────────┘
         └──────────┬────────┴────────────────────┘
                    │ (Wave A complete)
                    ▼
            ┌──────────────────┐
            │ 3.4 Page shell:  │ (autonomous)
            │ Tabs + Stats     │
            └────────┬─────────┘
       ┌────────────┼────────────┬─────────────┐
       ▼            ▼            ▼             ▼
   ┌───────┐   ┌───────┐   ┌─────────┐   ┌──────────┐
   │ 3.5   │   │ 3.6   │   │ 3.8     │   │ 3.9      │
   │ Card  │   │ Grids │   │ Stock   │   │ History  │
   │ (auto)│   │ (auto)│   │ (int)   │   │ (auto)   │
   └───┬───┘   └───┬───┘   └────┬────┘   └─────┬────┘
       └─────┬─────┘            │              │
             ▼                  │              │
      ┌──────────────────┐      │              │
      │ 3.7 Batch-select │      │              │
      │ (interactive)    │      │              │
      └──────────┬───────┘      │              │
                 └──────┬───────┴──────────────┘
                        ▼
               ┌──────────────────┐
               │ 3.10 ui sweep +  │ (auto)
               │ error.tsx        │
               └────────┬─────────┘
                        ▼
               ┌──────────────────┐
               │ 3.11 Audit-after │ (interactive)
               └────────┬─────────┘
                        ▼
               ┌──────────────────┐
               │ 3.12 Verify+bump │ (interactive)
               └──────────────────┘
```

**Waves:**
- **Wave A (infra, fully parallel):** 3.1, 3.2, 3.3 — three terminals concurrent
- **Wave B (shell):** 3.4 — single terminal, fast
- **Wave C (presentation, fully parallel):** 3.5, 3.6, 3.8, 3.9 — up to 4 terminals concurrent
- **Wave D (Orders integration):** 3.7 — gates on 3.5 + 3.6 + 3.2
- **Wave E (close-out, serial):** 3.10 → 3.11 → 3.12

**Critical path:** 3.1 → 3.4 → 3.5 → 3.7 → 3.10 → 3.11 → 3.12 ≈ 7 serial lanes.

---

## Phase-Wide Risks

1. **WebSocket UX is prod-only after this phase.** Live-arrival of orders is verified manually on real hardware post-deploy, not in Vercel preview. The Simulate button covers visual regression but not the actual `socket.io` connection lifecycle. Mitigation: leave `useDashboardOrderSocket` prod path 100% untouched; mock-mode early-return is the only diff.
2. **No `createdAt` means no urgency signal.** Kitchen staff lose the "this order has been pending for 7 minutes" cue. Mitigation: stats strip's "Pending now" count is the closest substitute; flag as future backend ask once deployment access is restored.
3. **State machine duplication risk.** The drink-skip rule lives in MSW (3.1) and the real backend. If backend ever changes the rule, MSW drifts. Mitigation: comment the MSW handler with a pointer to `server/api/pocha/dashboard.py:202-216`.
4. **Optimistic UI rollback correctness.** If `changeOrderItemStatus` returns 4xx, the card needs to snap back to the prior column. Map-based state mutation must support this without losing position. Test in 3.7.
5. **Batch-promote partial failure.** Client fan-out fires N parallel calls; some may fail. UX: show "X promoted, Y failed" Toast; the failed cards stay in their original column (no optimistic update for failed). Implementation in 3.7 must handle this.
6. **Stock inline-edit race.** User commits cell A, then cell B before A returns. Two in-flight requests; if A fails after B succeeds, revert logic must only revert A. Mitigation: per-row request-id tracking. Cover in 3.8 manual smoke.
7. **History analytics correctness.** `analyzeSojuSales` filters by Korean string includes (`'소주'`) — fragile. Test 3.2 with edge cases (empty history, no soju items, all soju).
8. **`MockAuthToggle` cross-phase coupling.** Phase 2 introduced this dock; Phase 3 extends it (Simulate button). Future phases may extend further. Mitigation: keep extension API simple — buttons array config rather than hard-coded children.
9. **Filter chip count update.** Counts on filter chips (`전체 (152) · 안주 (89) · 주류 (63)`) must update reactively when data changes. Memoize derivations to avoid recompute on every render.
10. **Mobile/tablet breakpoint.** Layout per HARNESS is "desktop + tablet (no mobile gate)" but admins may use phones in a pinch. Stats strip needs to wrap or scroll-x on narrow widths. Cover in 3.11.

---

## Open Items (carry into plan.md)

- **3.1**: exact response shape of `simulate-spawn` — match `OrderItem` shape from `getPochaOrders` exactly so `addNewOrderItem` works without translation. Decide whether to randomize qty (1–3) or always 1.
- **3.2**: `batchPromote.computeBreakdown` signature — takes `selectedOrderItems: OrderItem[]` + `menus: MenuByCategory[]` (for `isImmediatePrep` lookup), returns `{ toPreparing: number, toReady: number, toClosed: number }`. Shape lock during plan write.
- **3.4**: stats strip layout at narrow widths — wrap to 2×2 grid, or horizontal scroll? Lock in 3.4 implementation.
- **3.7**: long-press detection threshold — 500ms standard. Right-click on desktop maps to long-press. Verify cross-browser.
- **3.8**: per-row `✕` icon — DS `Icon` `XCircle` vs `Trash2`? `XCircle` reads as "set to zero", `Trash2` reads as "delete the menu item" (wrong). Use `XCircle` or `Ban`.
- **3.9**: KPI card colors in summary modal — neutral, or use brand navy/maize? Default neutral; revisit in 3.11 audit.
- **3.11** deliverable: a diff review of every touched file against `DS_CLIENT_USAGE.md` + typography rules + final `sejongHospital*` purge; no code changes expected beyond polish.
- **Backend follow-up** (post-Phase-3, post-deployment-access): add `createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP` and `updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP` to `orderItem` table; expose in SELECT statements; swap `OrderItemCard` to render real urgency timer. Single ALTER + 4-line Python diff.
