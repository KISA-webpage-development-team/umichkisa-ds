# Phase 4 — pocha-userfacing — Audit

**Phase scope:** Migrate the customer-facing pocha routes — `/pocha` (menu home + orders tab), `/pocha/cart`, `/pocha/pay`, `/pocha/pay-success` — onto `@umichkisa-ds/web` + `@umichkisa-ds/form`. Heavy-redesign posture (parity with Phases 2 and 3).

**Out of scope:**
- `/pocha/history` — admin-only (uses `useAdmin` + `NotAuthorized`); already touched by Phase 3.10. Folded into the new Phase 5 (admin-pocha consolidation).
- `/pocha/manage` (Phase 2, done) and `/pocha/dashboard` (Phase 3, done).

**Audience:** End users on phones at the event — drinkers/diners ordering from KISA pocha menus. Mobile-only gate (`OnlyMobileView`) stays in place.

---

## Prerequisite (already done on `dev`)

- **`POCHA_THEME` flipped `spring` → `default`** (client commit `eac2afb`). Cherry blossom theme files (`CherryBlossomBranch`, `CherryBlossomPetals_optimized`, `theme/colors`) stay in the repo for future seasonal reuse — only the flag is flipped so Phase 4 redesign decisions aren't constrained by decorative layout.

---

## Subphase list (13 lanes)

| # | Lane | Scope tag | Test tag | One-line summary |
|---|---|---|---|---|
| 4.1 | MSW user-facing handlers | [MECHANICAL] | **[TDD]** | cart GET/POST, user-orders GET, user-closed-orders GET, pay-info GET, pay-result PUT — combined per the same precedent as Phase 2.1/2.2 and Phase 3.1 |
| 4.2a | Home — menu tab + page shell (UI) | [REDESIGN] | [NO-TDD] | `HomeHeading`, `HomeTabs`, `MenuList`, `MenuListItem`, `MenuItemDetail`, `ViewCartButton`, sticky bottom bar. **Carries the page shell** — must land before any other home/cart/pay UI lane. Pastiche. |
| 4.2b | Home — menu tab logic | [POLISH] | [NO-TDD] | `useMenu` wiring polish, `getImagePath` audit, any addToCart hook glue. May collapse to no-op if nothing surfaces — keep the lane stub. Superpowers. |
| 4.3a | Home — orders tab UI | [REDESIGN] | [NO-TDD] | `OrderList`, `PochaOrderItem`, `OrderTicketModal` redesign. Status badge via DS Badge. Pastiche. |
| 4.3b | Home — orders tab logic + WS-mock fallback | [POLISH] | [NO-TDD] | `useUserOrderSocket` disabled in mock mode; SWR poll on `useUserOrders` (~1.5s interval) when `NEXT_PUBLIC_MOCK_API=1`; `MockAuthToggle` gets a "Simulate Promote" button that flips one of the current user's orders to the next status. Real WS path untouched. Superpowers. |
| 4.4a | Cart UI | [REDESIGN] | [NO-TDD] | `CartList`, `CartListItem`, `CartTotalSummary`, `ProceedToPaymentButton`, `EmptyCartAlert`, sticky bottom bar. Pastiche. |
| 4.4b | Cart logic | [POLISH] | **[TDD]** | TDD only the additions (e.g. stock-cap enforcement on quantity change). Existing `cartToAmount.ts` stays as the pure-util host; if `useCart` quantity branching turns out ugly, escalate to a Phase 3.2-style util extraction at plan time. Superpowers. |
| 4.5a | Pay UI | [REDESIGN] | [NO-TDD] | `PaymentSubmitForm` shell, `PaySummaryCard`, `PayButton` chrome, Stripe `<Elements>` wrapper untouched. Pastiche. |
| 4.5b | Pay logic + age gate + MockPayButton | [POLISH] | **[TDD]** | Extract age-gate decision into a pure `ageGateResolve.ts` util and TDD it. Add `MockPayButton` swap (mock-mode only — bypasses Stripe entirely, redirects to `/pay-success`). `usePay` and `useStripePayment` stay; only the mock-mode branch is new. Existing `calculateStripeFee.ts` stays pure. Superpowers. |
| 4.6 | Pay-success rebuild | [REDESIGN] | [NO-TDD] | Excise tip plumbing entirely (`TipModal.tsx` deleted, localStorage `paymentMethodId`/`customerName`/`customerEmail`/`customerID` flow removed, `setup_future_usage: "off_session"` removed from pay page). Fix duplicate `useEffect` blocks + render-time `window.location.href` redirect. Simple success view: icon + "주문 내역 보기" + "홈으로 돌아가기" + popstate-back-to-home guard. Superpowers. |
| 4.7 | Page shell sweep + legacy ui swap + delete `Pocha*` shared | [MECHANICAL] | [NO-TDD] | `layout.tsx` polish, `error.tsx` swaps, `OnlyMobileView` swap, drop `@/components/ui/feedback/LoadingSpinner` etc., delete `features/pocha/components/shared/Pocha{Button,BackHeading,HorizontalDivider,ErrorMsg}.tsx` (all callers replaced by 4.6). Superpowers. |
| 4.8 | Audit-after redesign pass + page metadata | [POLISH] | [NO-TDD] | Manual mobile UX walkthrough, page titles, last-mile polish. Per Phase 2.19 / Phase 3.11 precedent. Pastiche if real DS work surfaces, else superpowers. |
| 4.9 | Verify + end-bump | [MECHANICAL] | [NO-TDD] | DS build/typecheck/tests; client build/tsc/tests; bump only if accumulated DS fixes warrant it. |

---

## Wave plan (parallelism)

For cold-session pickup across multiple terminals (per `feedback_parallel_wave_pickup`):

| Wave | Lanes | Blocked on |
|---|---|---|
| 0 | **4.1** | — |
| 1 | **4.2a** (carries shell) | 4.1 |
| 2 | **4.2b**, **4.3a**, **4.4a**, **4.5a** (parallel) | 4.1 + 4.2a |
| 3 | **4.3b**, **4.4b**, **4.5b** (parallel; each needs its UI sibling) | matching `Xa` |
| 4 | **4.6** | 4.5b (touches `usePay`) |
| 5 | **4.7** | all of 4.2–4.6 (deletes `Pocha*` shared) |
| 6 | **4.8** | 4.7 |
| 7 | **4.9** | last |

Wave 2 is the fat wave — 4 parallel lanes, ~4 terminals.

---

## Pastiche vs superpowers split

**Pastiche** (DS-scoped, expensive — pay only when there's real DS-surface debate): 4.2a, 4.3a, 4.4a, 4.5a, possibly 4.8.

**Superpowers** (general implementation, cheaper — wiring, logic, deletion, sweeps): 4.1, 4.2b, 4.3b, 4.4b, 4.5b, 4.6, 4.7, 4.9.

Within a UI/logic pair, **UI lane lands first**: existing hooks already work, pastiche targets stable contracts, the UI lane is a complete demo-able artifact even if its logic sibling is delayed.

---

## Stripe handling (decided upfront)

Stripe Elements iframes + tokenization can't be honestly mocked. So **mock mode bypasses Stripe entirely**: in 4.5b, swap `<PayButton>` for `<MockPayButton>` when `NEXT_PUBLIC_MOCK_API=1`. The mock button does:
1. POST `/pocha/payment/.../pay-result` with `{ result: "success" }` (handled by 4.1's MSW)
2. Redirect to `/pay-success?pochaid=...&amount=...`

Real Stripe path stays intact for production. Smoke testing the real Stripe flow is a manual step before any `dev → main` ship — flagged in `notes.md` once we get there.

---

## WebSocket mock handling (decided upfront)

Mirrors Phase 3.3 dashboard precedent:
- `useUserOrderSocket` returns a no-op when `NEXT_PUBLIC_MOCK_API=1`.
- `useUserOrders` polls every ~1.5s in mock mode.
- `MockAuthToggle` gets a **Simulate Promote** button that calls the existing `PUT /pocha/dashboard/{orderItemId}/change-status` handler (already in MSW from Phase 3.1) on one of the current user's open orders. Single click moves both dashboard view and user view since they share the same store.

---

## DS gaps (likely — pastiche will surface mid-phase)

These are heads-up risks, not pre-locked decisions:

1. **Mobile bottom-sheet variant of DS Dialog** — `MenuItemDetail` and `OrderTicketModal` are likely bottom sheets on mobile. Current DS Dialog is desktop-leaning. May need a mid-phase patch bump per `feedback_mid_phase_bump_default`.
2. **Sticky bottom action bar pattern** — used in cart and menu (`ViewCartButton`). Probably composable from existing primitives but worth a check.
3. **Quantity stepper** for cart `+/-`. May need a small new DS component or compose from Button + numeric input.

Mid-phase DS fixes follow the standard `ds-fix-during-migration` skill; phase-end bump (4.9) only fires if accumulated fixes warrant it (per `feedback_ds_bump_semver` — always patch).

---

## Risks

| Risk | Mitigation |
|---|---|
| Mobile bottom-sheet DS gap | Mid-phase patch bump (default per `feedback_mid_phase_bump_default`) |
| WS polling latency in mock (1.5s) feels laggy under bursty staff promotion | Acceptable in mock; real WS path untouched. Tunable if it becomes annoying |
| Stripe non-mockability | Mitigated by MockPayButton; manual smoke before any `dev → main` ship |
| Pay-success rebuild scope creep | Strict scope: tip-excise + duplicate-effect fix + render-time redirect fix + simplified view. No new tip ideation. |
| Mobile-only gate edge cases (tablets) | Existing `OnlyMobileView` already handles this; not regressed by Phase 4 |
| Cherry blossom regression (when re-enabled in 2027) | Theme files preserved verbatim; only flag flipped. Re-enabling is one-line revert. |

---

## Auth / role touchpoints

- Every user-facing route uses `useSession` for `session.user.email`.
- `/pocha/cart` and `/pocha/pay` pass `email` as path param to cart/pay endpoints.
- Mock mode: `MockAuthToggle`'s existing user picker covers identity; no new auth surface needed for Phase 4.
- No admin gating in this phase — all admin surface (manage, dashboard, history) is already done or moved to Phase 5.

---

## Phase renumbering (applied at end of Mode A)

Original `Phase 5: kisa-web` → renumbered to **Phase 6: kisa-web**.

New **Phase 5: admin-pocha consolidation** — covers `/pocha/history` redesign + folding `manage` and `dashboard` into a single admin pocha app for easier maintenance. Audit kickoff happens after Phase 4 closes.
