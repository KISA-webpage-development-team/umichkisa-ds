# Phase 3 — pocha-dashboard (Notes)

Append-only breadcrumbs: DS bugs, decision changes, blockers, user feedback.

---

## 2026-04-26 — Kickoff (Mode A complete)

- Audit grill resolved 8 question groups (Q1–Q8). All decisions in `audit.md`.
- Phase scope upgraded to `[REDESIGN]` (full UX redesign of all 3 tabs); user explicitly opened the door — current dashboard was built under deadline pressure.
- `[NO-TDD]` for UI lanes per Phase 2 ethos; TDD only on 3.1 (MSW) and 3.2 (pure utils).

## Backend follow-up (post-Phase-3)

User has **no deployment access** to `KISA-website-server` during Phase 3. Items deferred until access returns:

1. **`orderItem` timestamp columns**: Add `createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP` + `updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP`. Single ALTER. Update SELECT statements in `server/api/pocha/dashboard.py` (4 sites) + `order.py` to include both columns. Update `queries/pocha_create.sql` for fresh installs. Once shipped, swap `OrderItemCard` to render real per-status urgency chip ("Pending for X minutes", "Preparing for X minutes"); update MSW fixtures to mirror. Source: Q3b grill — dropped urgency timer for Phase 3 because schema lacks timestamps.

## State machine reference

Mirroring backend exactly (per `KISA-website-server/server/api/pocha/dashboard.py:202-216`):

```
Food (isImmediatePrep=false):  pending → preparing → ready → closed
Drink (isImmediatePrep=true):  pending → ready → closed       (skips preparing)
```

If backend ever changes this rule, MSW handler in 3.1 must drift in lockstep. Comment the MSW handler with a pointer to the backend file.

## WebSocket strategy

Real `useDashboardOrderSocket` connects to `WEBSOCKET_URL` and listens for `order-created`. In `NEXT_PUBLIC_MOCK_API=1` mode, the hook early-returns (no socket connection). The "Simulate order" button in `MockAuthToggle` calls a new MSW-only endpoint `POST /api/v2/pocha/_mock/spawn-order/{pochaID}` that:

1. Picks a random menu item from `mockPochaMenus[pochaID]` (skips items where `stock===0`)
2. Creates a new `orderItem` with `status='pending'`, random orderer name, qty 1–3
3. Decrements that menu's `stock` in `menusStore`
4. Returns the full enriched OrderItem shape (with menu + ordererName joined)

The Simulate button caller then invokes `addNewOrderItem(returnedOrder)` directly. **Prod path is 100% untouched.**

## 2026-05-01 — Lane 3.4 DS fix

DS FIX: Add `size="full"` (`max-w-none`) variant to Container — pocha dashboard is a full-screen app shell; existing `default` size caps at `max-w-screen-2xl` (1536px) which would shrink the dashboard on >1536px displays. Default padding unchanged. Bumped `@umichkisa-ds/web` 1.0.22 → 1.0.23 (mid-phase patch).
