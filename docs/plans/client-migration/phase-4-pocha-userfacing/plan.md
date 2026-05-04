# Phase 4 — pocha-userfacing (Plan)

> Lanes from this plan become GitHub issues executed per `docs/plans/client-migration/AUTONOMOUS_PROTOCOL.md`. All Phase 4 lanes file in the **client repo** (`KISA-webpage-development-team/KISA-website-client`) — no DS-side lane is pre-locked, but mid-phase DS gaps will be patched via `ds-fix-during-migration` (likely candidates: bottom-sheet Dialog, sticky bottom action bar, quantity stepper). Source of truth: `./audit.md`.
>
> **UI fidelity is handled by `pastiche`, not by this plan.** UI lane specs describe the artifact, the user goal, the states that must exist (loading/empty/error/success), and behavior — they intentionally do **not** prescribe DS atom names, exact variants, exact spacing, or exact typography utilities. Pastiche resolves those choices against the DS repo's `pastiche/{FACT,KNOWLEDGE,WISDOM}.md`. Logic lanes are detailed; UI lanes are descriptive.

**Scope:** Migrate the customer-facing pocha routes — `/pocha` (menu home + orders tab), `/pocha/cart`, `/pocha/pay`, `/pocha/pay-success` — onto `@umichkisa-ds/web` + `@umichkisa-ds/form`. Heavy-redesign posture (parity with Phases 2 and 3). Mobile-only audience; `OnlyMobileView` gate stays.

---

## Wave / Dependency Structure

```
Wave 0 — infra (parallel — MSW + DS atom)
  4.0  DS Sheet (bottom-sheet variant on Dialog or new Sheet atom)       (interactive, DS-side)
  4.1  MSW user-facing handlers (cart/user-orders/pay-info/pay-result)   (autonomous, TDD)
       │
Wave 1 — shell (single, carries page shell)
  4.2a Home — menu tab + page shell (UI, pastiche)  (blocked-by 4.0)     (interactive)
       │
Wave 2 — presentation (parallel — fat wave)
  4.2b Home — menu tab logic                       (blocked-by 4.2a)     (autonomous)
  4.3a Home — orders tab UI (pastiche)             (blocked-by 4.2a)     (interactive)
  4.4a Cart UI (pastiche)                          (blocked-by 4.2a)     (interactive)
  4.5a Pay UI (pastiche)                           (blocked-by 4.2a)     (interactive)

Wave 2.5 — Home menu stock-cap UX (added 2026-05-04 from PR #151 review)
  4.2c Home — menu tab stock cap UX [POLISH][TDD]  (blocked-by 4.4a)     (autonomous)
       (absorbs useCart SWR migration; was 4.4b non-goal)

Wave 3 — logic (parallel; each pairs with its UI sibling)
  4.3b Home — orders tab logic + WS-mock fallback  (blocked-by 4.3a, 4.1)(interactive)
  4.4b Cart logic [TDD]                            (blocked-by 4.4a, 4.1)(autonomous)
  4.5b Pay logic + age gate + MockPayButton [TDD]  (blocked-by 4.5a, 4.1)(interactive)

Wave 4 — pay-success rebuild
  4.6  Pay-success rebuild                         (blocked-by 4.5b)     (interactive)

Wave 5 — sweep
  4.7  Page shell sweep + legacy ui swap + delete Pocha* shared
                                                   (blocked-by 4.2–4.6)  (autonomous)

Wave 6 — review
  4.8  Audit-after redesign pass + page metadata   (blocked-by 4.7)      (interactive)

Wave 7 — verify
  4.9  Verify + end-bump                           (blocked-by 4.8)      (interactive)
```

**Critical path:** 4.0 → 4.2a → 4.5a → 4.5b → 4.6 → 4.7 → 4.8 → 4.9 ≈ 8 serial lanes. Wave 2 can run 4 concurrent (4 terminals).

**Dependency edges** (→ means "must merge before"):

- `4.0 → 4.2a, 4.3a` (UI lanes that use bottom-sheet need DS Sheet published; mid-phase patch bump expected)
- `4.1 → 4.2b, 4.3b, 4.4b, 4.5b` (logic lanes consume MSW; UI lanes can render against existing fixtures+real but the logic siblings need handlers)
- `4.2a → 4.2b, 4.3a, 4.4a, 4.5a` (page shell carries — every other UI lane needs it)
- `4.4a → 4.2c → 4.4b` (added 2026-05-04: 4.2c absorbs `useCart` SWR migration that was 4.4b's non-goal; 4.4b's server-reject signal forwarding now layers on top of SWR'd `useCart`)
- `4.Xa → 4.Xb` (UI lane lands first per audit — pastiche targets stable contracts)
- `4.5b → 4.6` (4.6 redirects from pay button; needs MockPayButton in place)
- `4.2–4.6 → 4.7` (sweep deletes `Pocha*` shared after every caller is migrated)
- `4.7 → 4.8 → 4.9`

---

## Label Disposition (6-Rule Gate)

Applied per `AUTONOMOUS_PROTOCOL.md` §6.

| Lane | Tag | Disposition | Rationale |
|---|---|---|---|
| 4.0 | [REDESIGN][NO-TDD] | `needs-interactive` | New DS atom — Sheet API + atom-style decisions need live grill; ships as DS patch bump (per `feedback_ds_bump_semver`) |
| 4.1 | [MECHANICAL][TDD] | `autonomous-ready` | New MSW handler additions; tests pre-specified below; no app code touched |
| 4.2a | [REDESIGN][NO-TDD] | `needs-interactive` | REDESIGN tag (rule 1 fail); carries page shell — visual decisions on heading/tabs rhythm and sticky `ViewCartButton` placement need live grill |
| 4.2b | [POLISH][NO-TDD] | `autonomous-ready` | Behavior-preserving wiring polish; spec narrow; may degenerate to no-op |
| 4.2c | [POLISH][TDD] | `autonomous-ready` | Added 2026-05-04 from PR #151 review — Home menu stock-cap UX; decisions locked via grill (issue #152); absorbs `useCart` SWR migration |
| 4.3a | [REDESIGN][NO-TDD] | `needs-interactive` | REDESIGN — order-ticket modal is likely a bottom-sheet (mobile); status-badge tone mapping decision |
| 4.3b | [POLISH][NO-TDD] | `needs-interactive` | Mock-mode WS disable + Simulate Promote button placement — mirrors Phase 3.3 (also interactive) |
| 4.4a | [REDESIGN][NO-TDD] | `autonomous-ready` | REDESIGN — decisions locked via grill 2026-05-02 (issue #142); pastiche owns visual chrome |
| 4.4b | [POLISH][TDD] | `autonomous-ready` | TDD-locked; pure logic additions on top of stable hook contract |
| 4.5a | [REDESIGN][NO-TDD] | `needs-interactive` | REDESIGN — Stripe `<Elements>` shell stays, but pay summary card + button chrome are visual decisions |
| 4.5b | [POLISH][TDD] | `needs-interactive` | TDD-locked for the util, but MockPayButton swap touches mock-mode branch + redirect contract — live verify |
| 4.6 | [REDESIGN][NO-TDD] | `needs-interactive` | REDESIGN — tip excision + duplicate-effect removal + render-time-redirect fix; semantic surgery |
| 4.7 | [MECHANICAL][NO-TDD] | `autonomous-ready` | Mechanical sweep + deletes; spec fully concrete |
| 4.8 | n/a | `needs-interactive` | Review pass; full-phase visual/UX walkthrough |
| 4.9 | n/a | `needs-interactive` | Touches publish (`ds-phase-end-bump` if any DS fixes); final verify |

**Totals:** 6 autonomous-ready, 9 needs-interactive (15 lanes total — 4.0 added 2026-05-02 from 4.2a grill; 4.4a flipped to autonomous-ready 2026-05-02 via grill; 4.2c added 2026-05-04 from PR #151 review).

---

## Lane 4.0 — DS Sheet (bottom-sheet variant)

**Repo:** `umichkisa-ds`
**Mode:** Mode D (DS-repo new-component flow — worktree, direct-merge to main, patch bump + publish)

### Locked decisions (2026-05-02 grill)

- **API:** Separate `Sheet.tsx` atom mirroring Dialog's structure (`Sheet`, `SheetTrigger`, `SheetContent`, `SheetTitle`, `SheetDescription`, `SheetFooter`, `SheetClose`). Not a `side` prop on Dialog — clean separation, parallels shadcn/ui.
- **Drag library:** `vaul` (Emil Kowalski) — built on Radix Dialog, ~9KB gzip, drag-to-dismiss + scrim-fade-on-drag out of the box. New dep added to `@umichkisa-ds/web`.
- **Snap points:** Single — content auto-sizes up to ~90vh, then scrolls internally. No `snapPoints` prop exposed.
- **Scrim:** Match Dialog `bg-overlay` token. Drag-tied opacity fade (vaul default). Tap-to-dismiss enabled. Body scroll locked while open.
- **Focus + a11y:** Radix defaults (first focusable on open, focus trap, Escape closes). `SheetTitle` + `SheetDescription` required (consumers can wrap in Radix `VisuallyHidden`). No keyboard drag simulation. Honor `prefers-reduced-motion: reduce` (instant open/close, no slide).
- **Viewport posture:** Mobile-only. No responsive behavior. Documented in WISDOM as a hard constraint — for responsive overlays, consumers use Dialog.
- **Animation:** vaul defaults (~500ms spring open; ~300ms slide close; momentum from drag release). Do not override to match Dialog's 150ms.

### Files

- Create: `packages/web/src/components/overlay/Sheet.tsx`
- Modify: `packages/web/src/components/overlay/index.ts` — export Sheet subcomponents
- Modify: `packages/web/package.json` — add `vaul` dep
- Add: docs app page demonstrating Sheet at 375px (and notes it's mobile-only)
- Pastiche: run `pnpm pastiche:fact` (auto-generates FACT entry); manually add KNOWLEDGE scenarios + 3 WISDOM rules

### Tasks

- [ ] Worktree off `main` in DS repo
- [ ] Add `vaul` to `packages/web/package.json` deps; `pnpm install`
- [ ] Implement `Sheet.tsx` per locked decisions (mirror Dialog structure; subcomponents 1:1)
- [ ] Export from `overlay/index.ts`
- [ ] Add docs page (Overlays → Sheet) — usage example, mobile-only callout, reduced-motion note
- [ ] `pnpm build` + `pnpm typecheck` pass
- [ ] Run `pnpm pastiche:fact` to regenerate FACT.md
- [ ] Append to `pastiche/KNOWLEDGE.md`: single comma-separated line of Sheet scenarios (mobile detail panel, mobile picker/selector, mobile order/receipt view)
- [ ] Append to `pastiche/WISDOM.md` under the Sheet tag (whatever FACT emits) — 3 rules:
  1. "Sheet is mobile-only. For responsive overlays use Dialog."
  2. "Drag-to-dismiss is part of the atom — consumers do not implement custom dismissal gestures."
  3. "Sheet content must declare a `SheetTitle` (wrap in `VisuallyHidden` if not visually shown)."
- [ ] Run pastiche tag-sanity check
- [ ] Bump `packages/web/package.json` version (patch — per `feedback_ds_bump_semver`)
- [ ] Merge worktree → main (after user confirms; per `feedback_no_auto_merge`)
- [ ] `git tag web-vX.X.X && git push --tags` (CI publishes)
- [ ] Update client `package.json` `@umichkisa-ds/web` version + `npm install`
- [ ] Append entry to `docs/plans/client-migration/ds-fixes-log.md`

### Acceptance criteria

- [ ] Bottom-sheet renders with vaul-default slide-up + drag-fade scrim
- [ ] Scrim tap, swipe-down past threshold, close X, and Escape all dismiss
- [ ] `prefers-reduced-motion: reduce` → instant open/close
- [ ] Body scroll locked while open
- [ ] Lane 4.2a's MenuItemDetail and Lane 4.3a's OrderTicketModal can both consume the same atom
- [ ] DS docs page demonstrates usage at 375px viewport with mobile-only callout
- [ ] FACT.md regenerated; KNOWLEDGE + WISDOM entries committed; pastiche tag-sanity green

### Bailout triggers

- `vaul` peer-deps conflict with our Radix versions — pin Radix Dialog to the version vaul expects (likely already aligned at `^1.1.x`)
- vaul SSR / "use client" boundary issues with our tsup bundling — wrap in dynamic import or add `"use client"` directive at module top

---

## Lane 4.1 — MSW user-facing handlers

**Repo:** `KISA-website-client`

### Files

- Modify: `src/mocks/handlers/pocha.ts` — append user-facing handlers + cart store
- Modify: `src/mocks/fixtures/pocha.ts` — append `mockUserCart` (a small per-user/pocha cart fixture)
- Modify: `src/mocks/handlers/__tests__/pocha.test.ts` — append user-facing handler tests

### Tasks (TDD)

- [ ] **Tests first.** Write failing tests for handler behavior, confirm fail, implement to green.

#### Pre-specified test cases (per AP §6 rule 4)

**Cart**
- [ ] `GET /pocha/cart/{email}/{pochaID}/` returns the user's `Cart` shape `{ [menuID]: { menu: MenuItem, quantity: number } }` (object keyed by menuID); empty user → `{}`
- [ ] `POST /pocha/cart/{email}/{pochaID}/` with body `{ menuID, quantity }`:
  - **Adds** an item when not already in cart (positive `quantity`)
  - **Increments** existing item's quantity (positive `quantity`)
  - **Decrements** existing item's quantity (negative `quantity`); removes the item entirely when resulting quantity ≤ 0
  - Returns `{ isStocked: true, message: <string> }` on success
  - Returns 409 `{ isStocked: false, message: <string> }` when requested quantity would exceed the menu's current stock
- [ ] `PUT /pocha/payment/{email}/{pochaID}/check-stock/` returns `{ isStocked: true }` when every cart item's quantity ≤ its menu's current stock; `{ isStocked: false }` otherwise

**Orders (user-facing)**
- [ ] `GET /pocha/order/{email}/{pochaID}/` with `Authorization: Bearer <token>` returns `Orders` shape `{ pending, preparing, ready }` filtered to non-closed orders **for that email** in `orderItemStore`
- [ ] `GET /pocha/order/{email}/{pochaID}/` without `Authorization` returns 401
- [ ] `GET /pocha/order/{email}/{pochaID}/closed/` returns `{ closed: OrderItem[] }` filtered to `status='closed'` for that email

**Pay**
- [ ] `GET /pocha/cart/{email}/{pochaID}/checkout-info/` with `Authorization: Bearer <token>` returns `PayInfo` shape: `{ amount: number, ageCheckRequired: "true" | "false" }`. `amount` = sum of `menu.price * quantity` over the user's cart. `ageCheckRequired = "true"` iff any cart item's `menu.ageCheckRequired === true` (matches real BE — `KISA-website-server/server/api/pocha/cart.py:552-581`)
- [ ] `GET /pocha/cart/{email}/{pochaID}/checkout-info/` without `Authorization` returns 401
- [ ] `PUT /pocha/payment/{email}/{pochaID}/pay-result/` with body `{ result: "success" }`:
  - Drains the user's cart entries into new `OrderItem`s in `orderItemStore` (one OrderItem per cart line, `status='pending'`, `quantity` carried over, ids from `nextOrderItemID++`)
  - Decrements menu stock for each (matches real-backend semantics — the dashboard then has fresh pendings to promote)
  - Clears the user's cart
  - Returns `{ ok: true }`
- [ ] `PUT /pocha/payment/{email}/{pochaID}/pay-result/` with body `{ result: "failure" }` is a no-op (cart preserved); returns `{ ok: true }`

**Reset**
- [ ] `resetCartStore()` re-seeds the cart store from `mockUserCart` (verify by mutating then resetting then reading)

#### Fixtures

- [ ] `mockUserCart`: a small per-`(email, pochaID)` keyed map seeded with one or two carts for the default mock user(s) so the cart route is non-empty on first load. Default user matches `MockAuthToggle`'s active identity.
- [ ] Additional `mockUserOrders`: ~4–6 orders **for the default user** distributed across `pending/preparing/ready/closed` so `/pocha?tab=orders` is non-empty on first load (extends the existing dashboard fixture set; keep both reset paths idempotent)

#### Implementation

- [ ] Add module-level `cartStore: Map<string, Cart>` keyed by `${email}:${pochaID}`; mirror Phase 2 store pattern
- [ ] `seedCarts()` populates `cartStore` from `mockUserCart`
- [ ] Export `resetCartStore()` alongside `resetPochaStore()` / `resetOrderStore()`
- [ ] Pay-result success path reuses the existing `nextOrderItemID` counter and writes through the same `orderItemStore` lane 3.1 introduced (so dashboard sees the new orders immediately)
- [ ] `npm run build` + `npm run typecheck` + `npm test` pass

### Acceptance criteria

- [ ] All listed tests pass
- [ ] Handlers compiled into `pochaHandlers` export — no new file, no new index registration
- [ ] Manual smoke (dev with `NEXT_PUBLIC_MOCK_API=1`): `/pocha` orders tab populates with the seeded user's orders; `/pocha/cart` shows seeded cart; `/pocha/pay` reads `checkout-info` non-zero
- [ ] No app code under `src/app/`, `src/features/`, `src/components/` touched

### Non-goals

- Stripe mocking (lane 4.5b owns `MockPayButton`)
- WS-mock fallback wiring (lane 4.3b)
- Tip endpoints (excised entirely in 4.6)

### Bailout triggers

- `Cart` / `PayInfo` response shape ambiguous vs handler call sites (`getUserCart`, `getPayInfo`) — `needs-decision`
- ~~`MenuItem.isAlcohol` field name differs from real-backend~~ — resolved 2026-05-02: real BE returns `ageCheckRequired` (`cart.py:552-581`); no `isAlcohol` field exists. Handler uses `menu.ageCheckRequired`.

---

## Lane 4.2a — Home: menu tab + page shell

**Repo:** `KISA-website-client`
**Mode:** `needs-interactive` (REDESIGN — page shell decisions, sticky `ViewCartButton` placement)

### Files

- Modify: `src/app/(pocha)/pocha/page.tsx` (page shell)
- Modify: `src/features/pocha/components/home/HomeHeading.tsx`
- Modify: `src/features/pocha/components/home/HomeTabs.tsx`
- Modify: `src/features/pocha/components/home/HomeTabContent.tsx` (or fold into page.tsx)
- Modify: `src/features/pocha/components/menu/MenuList.tsx`
- Modify: `src/features/pocha/components/menu/MenuListItem.tsx`
- Modify: `src/features/pocha/components/menu/MenuItemDetail.tsx`
- Modify: `src/features/pocha/components/menu/ViewCartButton.tsx`

### Scope (descriptive — pastiche resolves DS surface)

- **Page shell** for `/pocha` — landing route for end users at the event. Carries:
  - The pocha heading (event name / pocha info), grouped with the tabs strip at the top.
  - A two-tab switcher (`Menu` / `Orders`) that reflects + writes the URL `?tab=` query param (the existing prop-driven `activeTab` pattern stays — wire it to the tabs control).
  - Loading state = **skeleton page shell** (heading + tab strip + 4–5 menu row skeletons), not spinner. No-pocha + upcoming guards stay; both render as `StatusView` (upcoming uses calendar icon + pocha title/date in description).
  - **Theme code untouched in this lane.** The cherry-blossom branch + petals JSX, dynamic imports, `POCHA_THEME` checks, and `swayTrigger` onClick all stay as-is in `page.tsx`. A future "theme-wiring strategy" lane (TBD lane 4.10 or post-Phase-4 follow-up) reworks how seasonal themes plug into the DS-migrated shell. Rationale: theming is a real product feature for future seasonal pochas; rewiring it deserves its own design pass, not a side-effect of this rebuild.
- **Menu tab content** — the in-event menu surface:
  - Sectioned by category (existing `useMenu` returns `MenuByCategory[]`).
  - Each row shows the menu item's photo, English name (primary), Korean name as secondary line when present, price, and a low/sold-out signal when stock is constrained. **Underage gating** (`ageCheckRequired && useUserAge.underAge`): row dimmed (~50% opacity) with a small `21+` badge near the price, button disabled. No red overlay (legacy treatment dropped).
  - Tapping a row opens a **menu-item detail** rendered as a **DS bottom-sheet** (Sheet variant — see Lane 4.0 below; this lane is gated on it). Sheet content: larger image, name + description, quantity stepper, `Add to Cart` action. Dismissal: swipe-down + backdrop tap + close X in sheet header. After successful Add to Cart: sheet closes (current behavior).
  - **Sticky `ViewCartButton`** at the bottom of the menu tab (and only the menu tab — orders tab does not show it) — **always visible on the menu tab** (label "View Cart" only, no count/total — intentional UX to keep users browsing). Full-width edge-to-edge with safe-area-inset-bottom; reevaluate width after first build. Pastiche owns the "sticky bottom action bar" pattern.

### Tasks

- [ ] Rebuild page shell + menu tab end-to-end per the descriptive scope above
- [ ] English-first copy (audience is Korean internationals + Korean Americans); preserve existing Korean strings as the secondary line where they already exist in props
- [ ] `npm run build` + `npm run typecheck` pass

### Acceptance criteria

- [ ] `/pocha` page shell rebuilt with DS atoms (heading + tabs + content area); theme code paths preserved unchanged
- [ ] Tab state is URL-sourced (`useSearchParams` reads tab; tap calls `router.replace(?tab=...)` — no `useState`); deep-linking and refresh persist the active tab
- [ ] Menu list paints categories with the seeded fixture; underage user (toggleable via `MockAuthToggle`) sees alcohol items dimmed with a `21+` badge, button disabled
- [ ] Tapping a menu item opens the DS bottom-sheet; quantity adjust + add to cart still works against existing `useCart` (`changeItemInCart` mutation); sheet closes on success
- [ ] `ViewCartButton` always rendered on menu tab; tapping routes to `/pocha/cart`
- [ ] Loading state renders skeleton page shell (heading + tab strip + ~5 menu row skeletons), not a spinner
- [ ] No `LoadingSpinner` from `@/components/ui/feedback` remains in page.tsx (use DS primitives — sweep happens here, not in 4.7)
- [ ] No `sejongHospital*` raw font imports remain in any file touched

### Non-goals

- Orders tab content (lane 4.3a)
- Cart route (lane 4.4a)
- Pay route (lane 4.5a)
- Hooks-side polish (lane 4.2b)

### Bailout triggers

- DS Sheet (Lane 4.0) doesn't ship in time or its API doesn't fit menu-detail content cleanly — fall back to current full-screen overlay pattern + flag for follow-up (do **not** introduce in-place panel — confirmed unacceptable in grill 2026-05-02)
- `useCart`'s `handleQuantityChange` signature can't be cleanly bound from the menu-detail control — `needs-decision` (likely just prop-drill)

---

## Lane 4.2b — Home: menu tab logic polish

**Repo:** `KISA-website-client`

### Files

- Modify: `src/features/pocha/hooks/useMenu.tsx` (only if a real surface change is needed — additive)
- Modify: `src/features/pocha/utils/getImagePath.ts` (audit only)
- Modify: any call site flagged by 4.2a's pastiche (e.g., menu image fallback path)

### Scope

A narrow follow-up for things 4.2a's UI lane should not own:

- Audit `getImagePath.ts` for dead branches; remove any.
- If 4.2a's `MenuItemDetail → addToCart` glue feels brittle (e.g., raw `axios` call inline), extract a thin hook or ensure it goes through `useCart`'s existing `handleQuantityChange` pathway. Decide based on what 4.2a actually shipped — this lane may collapse to a no-op, in which case ship a single-line cleanup commit (or close the issue with a link to the relevant 4.2a commit).
- Verify menu-item detail's underage gating runs through `useUserAge.underAge` (no inline whitelist hardcoded outside `useUserAge`).

### Tasks

- [ ] Run `git diff dev...origin/<4.2a branch>` after 4.2a merges; identify glue touchpoints
- [ ] Apply minimal polish; do not redesign behavior
- [ ] `npm run build` + `npm run typecheck` pass

### Acceptance criteria

- [ ] No regression in menu tab behavior
- [ ] No inline `axios` calls outside `apis/`
- [ ] Hook surface untouched unless additive

### Non-goals

- Any UI change (4.2a owned that)
- SWR migration of `useMenu` (out of scope)

### Bailout triggers

- 4.2a left brittle glue that needs a real refactor (>30 LoC) — `needs-decision` (likely escalate to a follow-up Phase 4 issue rather than balloon this lane)

---

## Lane 4.2c — Home: menu tab stock cap UX

**Repo:** `KISA-website-client`
**Mode:** `autonomous-ready`
**Added:** 2026-05-04 (from live review of PR #151 / Lane 4.4a)

### Origin

Discovered while testing 4.4a's cart-side stock cap on localhost: with `떡볶이` stock=1, the cart row correctly disabled `+` and showed `Max · 재고 1개` — but on the Home menu surface, the `MenuListItem` showed no signal, and `MenuItemDetail`'s stepper had no upper bound. User could spam `+` past stock and tap "Add to Cart" — server would silently reject. 4.2a missed this UX path entirely.

### Locked decisions (grill 2026-05-04)

1. **Cart-aware cap, not raw-stock cap.** Stepper caps at `stock - existingCartQty`.
2. **Menu list row visual contract:**
   - `stock === 0`: unchanged from 4.2a (line-through, "Out of stock", disabled).
   - `existingCartQty >= stock > 0`: **no row change** — sheet handles it.
   - `0 < stock <= 3`: `재고 N개 남음` hint; suppressed when at-cap.
   - Normal: unchanged.
3. **Low-stock threshold: `stock <= 3`** (mirrors `dashboardStats.ts:28` and `StockManager.tsx:108`).
4. **Extract `isLowStock(stock: number): boolean`** helper; refactor existing two call sites + new menu list site.
5. **Detail sheet at-cap state:** opens normally, `quantity = 1`, `+` disabled, inline red `Max · 재고 N개`, "Add to Cart" disabled with copy swap to `최대 수량 도달 · Stock cap reached`.
6. **Detail sheet within-budget state:** stepper caps at `stock - existingCartQty`; inline red at cap; "Add to Cart" stays enabled.
7. **`useCart` migration: SWR + `mutate()` + ref-stable debounce (Pattern A).** Preserves the 1s debounce. Fixes the per-render-debounce bug via `useRef(useMemo(() => debounce(...), []))`.
8. **`existingCartQty` flow:** parent calls `useCart()` once, derives map, passes `existingCartQty: number` per row. SWR auto-dedupes when `MenuItemDetail` calls `useCart()` independently.
9. **Server-reject path:** auto-close sheet, `toast.error("재고가 부족합니다 · Insufficient stock")` from inside `useCart`'s SWR settle handler. Coexists with 4.4b's cart-row inline-red.

### Files

**Modified:**
- `src/features/pocha/hooks/useCart.ts` — SWR migration; toast on reject
- `src/features/pocha/components/menu/MenuListItem.tsx` — `existingCartQty` prop; low-stock hint
- `src/features/pocha/components/menu/MenuItemDetail.tsx` — cart-aware stepper cap; inline red; button copy swap
- `src/features/pocha/components/menu/MenuList.tsx` — pass `existingCartQty` per row
- `src/app/(pocha)/pocha/page.tsx` — call `useCart`; thread `cart` to `MenuList`
- `src/features/pocha/utils/dashboardStats.ts` — refactor to `isLowStock`
- `src/features/pocha/components/dashboard/StockManager.tsx` — refactor to `isLowStock`

**Created:**
- `src/features/pocha/utils/isLowStock.ts`
- `src/features/pocha/utils/__tests__/isLowStock.test.ts`

### Acceptance criteria

See issue #152 (single source of truth post-grill).

### Non-goals

- Cart row inline-red on server reject (4.4b)
- `cartToTotalAmount` / `wouldExceedStock` / `clampDelta` pure utils (4.4b)
- Pay-flow stock checks (4.5x)
- Low-stock hint inside detail sheet (only on row + inline red at cap)

### Bailout triggers

- SWR migration breaks 4.4a's cart row optimistic UI in observable ways
- `useCart` consumers exist outside enumerated `## Files` with non-trivial cart-state usage
- `selectedMenu.stock` snapshot structurally unreliable (deeper grill on staleness)

### Issue

#152 — `[Lane 4.2c] Home menu tab — stock cap UX`. Issue is the source of truth post-grill (per AP §327).

---

## Lane 4.3a — Home: orders tab UI

**Repo:** `KISA-website-client`
**Mode:** `needs-interactive` (REDESIGN — order-ticket modal mobile pattern + status-badge tone mapping)

### Files

- Modify: `src/features/pocha/components/order/OrderList.tsx`
- Modify: `src/features/pocha/components/order/PochaOrderItem.tsx`
- Modify: `src/features/pocha/components/order/OrderTicket.tsx`
- Modify: `src/features/pocha/components/order/OrderTicketModal.tsx`
- Modify: `src/features/pocha/components/order/OrderStatusSelector.tsx` (or delete if unused after redesign — verify)

### Scope (descriptive)

- Orders tab inside `/pocha` for the **end user** — shows the user's own orders for the active pocha.
- Top of the tab carries a **status filter** (e.g., active vs closed, or per-status). The existing `OrderStatusSelector.tsx` is a candidate to keep; pastiche may collapse it into a `ToggleGroup` (or equivalent). Decision can be made during execution — both are acceptable.
- Each order row (`PochaOrderItem`) shows: order number / id, menu name + quantity, current status as a tonal badge (semantic: pending=warning, preparing=info, ready=success, closed=neutral; exact tone names resolved by pastiche), and a tap target.
- Tapping a row opens an **order-ticket** view showing the larger order details (menu image, item line, status timeline / current state, total). On mobile this is likely a bottom-sheet — pastiche owns this; in-place panel also acceptable.
- Empty state when the user has no orders for this pocha: clear message with a CTA back to the menu tab.
- Loading: skeleton rows.
- Error: friendly inline error.
- The legacy `@nextui-org/react` `Tabs` import in `OrderList.tsx` must be removed in this lane (the page-level tab strip lives in 4.2a; per-orders sub-filter goes through DS atoms).

### Tasks

- [ ] English-first copy on this surface (audience is Korean internationals + Korean Americans); preserve existing Korean strings where they already exist in props
- [ ] `npm run build` + `npm run typecheck` pass

### Acceptance criteria

- [ ] `/pocha?tab=orders` renders for the seeded user
- [ ] Status filter selects update the rendered set
- [ ] Tapping a row reveals the order detail view; closing returns to the list
- [ ] No `@nextui-org/react` imports remain in the order subtree
- [ ] No raw color classes (`text-gray-*`, `bg-blue-*`, etc.) — DS-tokenized only

### Non-goals

- WS-mock fallback wiring (lane 4.3b)
- Real-backend order subscription (untouched)

### Bailout triggers

- DS Dialog has no usable bottom-sheet variant and pastiche judges in-place panel insufficient — `ds-fix-during-migration` (mid-phase patch bump)
- DS Badge tone palette doesn't map cleanly to 4-state status semantics — fall back to closest equivalents and document in `notes.md`

---

## Lane 4.3b — Home: orders tab logic + WS-mock fallback + Simulate Promote

**Repo:** `KISA-website-client`
**Mode:** `needs-interactive` (mock auth dock UX placement decision; mirrors Phase 3.3)

### Files

- Modify: `src/features/pocha/hooks/useUserOrderSocket.ts` — early-return when `IS_MOCK_MODE`
- Modify: `src/features/pocha/hooks/useUserOrders.tsx` — add SWR-style polling in mock mode (~1.5s)
- Modify: `src/mocks/MockAuthToggle.tsx` — add "Simulate Promote" button (visible only on `/pocha` orders tab)

### Locked spec

**WS disable in mock**
- In `useUserOrderSocket`, early-return `null` and skip the entire effect when `process.env.NEXT_PUBLIC_MOCK_API === "1"` (or use the existing `IS_MOCK_MODE` constant). **Real WS path 100% untouched.**

**Mock polling**
- In `useUserOrders` (or `useUserOrdersMap`): when `IS_MOCK_MODE`, use a polling refetch — either via `setInterval`-on-mount (stop/cleanup on unmount) **or** by switching to SWR with `refreshInterval: 1500` for the user-orders cache key. **Pick whichever is the smaller diff** — both are acceptable.
- Real-mode (`!IS_MOCK_MODE`) behavior is identical to today (single fetch on mount + WS subscription).

**Simulate Promote**
- `MockAuthToggle` gets a button labeled `Simulate Promote`:
  - Visibility: only when `isAuthenticated && pathname === '/pocha'` AND `searchParams.get('tab') === 'orders'`. (Use `usePathname()` + `useSearchParams()` from `next/navigation`.)
  - On click: pick **one** of the current user's open orders (pending/preparing/ready, the oldest one — deterministic) and call `PUT /pocha/dashboard/{orderItemID}/change-status/` (the handler from Phase 3.1 is already in MSW). The polling in `useUserOrders` will pick up the change within ~1.5s.
  - Surface a toast on success/error (use whatever toast pattern is in use — match Phase 2.11).
- Single click moves both dashboard view and user view since they share `orderItemStore`.

### Tasks

- [ ] Apply WS early-return + mock polling
- [ ] Wire Simulate Promote button per spec
- [ ] `npm run build` + `npm run typecheck` + `npm test` pass

### Acceptance criteria

- [ ] In mock mode, no WS connection from `useUserOrderSocket` (no `[UserSocket] Connected` log)
- [ ] In real mode (toggle off), behavior unchanged
- [ ] Polling visibly updates orders within ~2s after the Simulate Promote button is tapped
- [ ] Simulate Promote button only visible on `/pocha?tab=orders`
- [ ] Existing `MockAuthToggle` UX (auth toggle + Simulate Order from Phase 3.3) unchanged

### Non-goals

- Adding new mock auth surface
- Real-backend WS changes (out of scope)

### Bailout triggers

- `IS_MOCK_MODE` constant location ambiguous (search both `@/constants/env` and `@/lib/auth/authContext`) — `needs-decision`
- Polling interval feels too aggressive on the device and causes flicker — `needs-decision` (tune to 2–3s)

---

## Lane 4.4a — Cart UI

**Repo:** `KISA-website-client`
**Mode:** `autonomous-ready` (decisions locked via grill 2026-05-02 — see issue #142 comment for full rationale; visual chrome delegated to pastiche)

### Files

- Modify: `src/app/(pocha)/pocha/cart/page.tsx`
- Modify: `src/features/pocha/components/cart/CartList.tsx`
- Modify: `src/features/pocha/components/cart/CartListItem.tsx`
- Modify: `src/features/pocha/components/cart/CartTotalSummary.tsx`
- Modify: `src/features/pocha/components/cart/ProceedToPaymentButton.tsx`
- Modify: `src/features/pocha/components/cart/EmptyCartAlert.tsx`

### Page context

`/pocha/cart` is the user's cart for the active pocha. Mobile-only. Reached from `/pocha` via the Cart icon. Single way out via the back chevron in the header (or via Checkout → `/pocha/pay`). Drinking-event cart — usually small (<10 lines), price-driven, not item-count-driven.

### Locked decisions (UX + behavior — visual chrome → pastiche)

**Page shell**
- Back chevron (left) + centered title (`Cart`, English only); no divider; scrolls with content
- ProceedToPayment uses `router.push` (no full reload)

**Cart row**
- Stepper UX: decrement / count / increment. At `qty=1` decrement becomes a "remove" affordance (icon-swap intent preserved)
- Single remove path (decrement-to-zero); no separate X button, no swipe-to-delete
- Row shows per-unit price + line total (compact, e.g. `$4.00 × 3 · $12.00`)
- Menu name renders `nameKor` then `nameEng` (per app convention)
- No alcohol/21+ badge (age-gating happens on menu page, not cart)
- No stock-remaining indicator on rows that aren't capped

**Stock UX — inline red, never toast** (matches `MenuListItem`'s existing vocabulary; toasts collide with sticky bar on mobile)
- `quantity === menu.stock` → `+` disabled + inline red hint on the row (`Max` / `재고 N개`)
- Server race-reject (`{ isStocked: false }`) → inline red text on row (`Only N left` / `Out of stock`) for ~3s, then `fetchCart` reverts

**Sticky bottom bar**
- Total price only (no item count)
- Hidden when cart empty; always visible otherwise (no hide-on-scroll); respects iOS safe-area inset

**Empty state**
- Custom illustration (no matching `StatusView` variant; pastiche may keep the PNG or simplify)
- English-only copy; no CTA — back-chevron in header is the only return path

**Loading / error**
- Loading: skeleton (header + ~3 rows + sticky bar shape) — not a bare spinner
- Error: `StatusView` inline + retry button calling `fetchCart()` (replaces current `throw new Error`)
- `noPocha` short-circuit: keep existing `StatusView` (already DS)

### Pastiche freedom
- Stepper container shape (pill chip vs segmented vs inline)
- Skeleton primitive selection
- Empty-state illustration (keep PNG or replace)
- Exact spacing, colors, type sizes — within DS tokens

### Tasks

- [ ] Rebuild cart page + components per locked decisions
- [ ] Drop `PochaBackHeading` / `PochaHorizontalDivider` shared usage in this file (the 4.7 sweep deletes those — but this lane is the consumer, so swap to DS-tokenized header locally)
- [ ] `npm run build` + `npm run typecheck` pass

### Acceptance criteria

- [ ] `/pocha/cart` renders the seeded cart in mock mode
- [ ] Quantity stepper increments + decrements; decrementing to 0 removes the line
- [ ] At `quantity === stock`, `+` is disabled and an inline red `Max` / `재고 N개` hint shows on the row
- [ ] Server stock-reject surfaces inline red text on the row (~3s) then reverts via `fetchCart`
- [ ] Sticky bottom bar shows total price only, visible iff cart non-empty, respects safe-area inset
- [ ] Empty state renders illustration + English copy, no CTA
- [ ] Loading state renders skeleton (no bare spinner)
- [ ] Error state renders inline `StatusView` with retry calling `fetchCart`
- [ ] Checkout uses `router.push`, not `window.location.href`
- [ ] No imports from `@/features/pocha/components/shared/Pocha*`

### Non-goals

- Stock-cap pure helpers (`wouldExceedStock`, `clampDelta`) → lane 4.4b
- Pay route → lane 4.5a
- `Pocha*` shared component deletion → lane 4.7

### Bailout triggers

- DS does not expose a quantity stepper and a clean compose from existing primitives is awkward — `ds-fix-during-migration` (likely a small new primitive or composition pattern; mid-phase patch bump)
- Sticky bottom bar visual conflicts with `OnlyMobileView` viewport assumptions — `needs-decision`

---

## Lane 4.4b — Cart logic [TDD]

**Repo:** `KISA-website-client`

### Files

- Modify: `src/features/pocha/utils/cartToAmount.ts` (host the new helpers if extraction surfaces; otherwise keep this file untouched)
- Create: `src/features/pocha/utils/__tests__/cartToAmount.test.ts` (or extend if exists)
- Modify: `src/features/pocha/hooks/useCart.ts` (additive — only if 4.4a left a stock-cap branch worth extracting)

### Tasks (TDD)

- [ ] **Tests first.** Write failing tests, confirm fail, implement to green.

#### Pre-specified test cases

- [ ] `cartToTotalAmount(cart: Cart): number` — pure: returns the dollar total `Σ menu.price × quantity`. Empty cart → `0`. Already exists in `useCart.ts` as a private helper; surface it from `cartToAmount.ts` if not already.
- [ ] `wouldExceedStock(cart: Cart, menuID: number, delta: number): boolean` — given an attempted quantity change, returns `true` iff `(currentQty + delta) > menu.stock`. Used by the cart UI to short-circuit before the POST.
- [ ] `clampDelta(currentQty: number, delta: number, stock: number): number` — returns the largest `delta` that keeps the resulting quantity in `[0, stock]`. Examples: `(2, +5, 4) → +2`; `(2, -10, 4) → -2`; `(0, +3, 0) → 0`.
- [ ] All helpers are pure (no React imports, no I/O)

#### Hook surface

- [ ] If `useCart` ends up branching on stock-cap inline (verify after 4.4a), wrap the branch in `clampDelta` + a single optimistic update path. **Do not** introduce SWR migration here.

### Acceptance criteria

- [ ] All listed tests pass
- [ ] No new dependencies
- [ ] `npm run typecheck` passes

### Non-goals

- SWR migration of `useCart`
- Cart UI (lane 4.4a)

### Bailout triggers

- 4.4a's stock-cap UX requires a server round-trip pattern (e.g., debounced check-stock during typing) that doesn't fit a pure util — `needs-decision`

---

## Lane 4.5a — Pay UI

**Repo:** `KISA-website-client`
**Mode:** `needs-interactive` (REDESIGN — pay summary + button chrome)

### Files

- Modify: `src/app/(pocha)/pocha/pay/page.tsx`
- Modify: `src/features/pocha/components/pay/PaymentSubmitForm.tsx`
- Modify: `src/features/pocha/components/pay/PaySummaryCard.tsx`
- Modify: `src/features/pocha/components/pay/PayButton.tsx`

### Scope (descriptive)

- The pay route for the user's checkout flow. Mobile-only.
- Page header: back-affordance + title (`Pay` / `결제`).
- **Stripe `<Elements>` wrapper untouched** — the `PaymentElement` from Stripe is rendered as-is (it's an iframe; we don't style it). The `setup_future_usage: "off_session"` option in `<Elements>` is **removed in lane 4.6** as part of tip excision; this lane leaves it alone or removes it conservatively (4.6 will re-verify).
- **Pay summary card:** clear breakdown — line for `Subtotal` (`amount` from `usePay`), line for `Service fee` (`fee` from `usePay`), and an emphasized line for `Total` (`totalPrice`). All values are USD `$X.YY`. Pastiche owns the card chrome.
- **Pay button:** primary, full-width sticky bottom (or in-flow per pastiche call), label includes the total (e.g., `Pay $12.34`). Loading state while the payment is in flight (`paymentLoading` from `useStripePayment`).
- **Error message** rendered above the button when `errorMessage` is non-empty (DS error surface — exact atom resolved by pastiche; likely `Alert` or inline error text).
- Loading / no-pocha guards stay; redirect-to-`/pocha` on hard-error is preserved.

### Tasks

- [ ] English-first copy on this surface (audience is Korean internationals + Korean Americans); preserve existing Korean strings where they already exist in props
- [ ] Drop `PochaBackHeading` / `PochaHorizontalDivider` usage (use DS atoms locally)
- [ ] `npm run build` + `npm run typecheck` pass

### Acceptance criteria

- [ ] `/pocha/pay` renders for the seeded user (mock mode)
- [ ] Pay summary displays subtotal / fee / total
- [ ] Stripe `PaymentElement` still renders inside the form (real Stripe path untouched — the iframe contents are not our concern)
- [ ] Loading state visible during payment in flight
- [ ] Error surface shows when `errorMessage` non-empty
- [ ] No imports from `@/features/pocha/components/shared/Pocha*`

### Non-goals

- MockPayButton swap (lane 4.5b)
- Age-gate util extraction (lane 4.5b)
- Tip flow (excised in 4.6)

### Bailout triggers

- Stripe `PaymentElement` styling conflicts with the page shell tokens — accept Stripe's defaults; document in `notes.md`

---

## Lane 4.5b — Pay logic + age gate + MockPayButton [TDD]

**Repo:** `KISA-website-client`
**Mode:** `needs-interactive` (mock-mode branch + redirect contract — live verify)

### Files

- Create: `src/features/pocha/utils/ageGateResolve.ts`
- Create: `src/features/pocha/utils/__tests__/ageGateResolve.test.ts`
- Modify: `src/features/pocha/hooks/useStripePayment.ts` (only the age-gate branch — extract to use the new util)
- Modify: `src/features/pocha/components/pay/PaymentSubmitForm.tsx` — swap `<PayButton>` → `<MockPayButton>` when `IS_MOCK_MODE`
- Create: `src/features/pocha/components/pay/MockPayButton.tsx`

### Tasks (TDD for the util)

- [ ] **Tests first** for `ageGateResolve.ts`.

#### `ageGateResolve.ts` — pre-specified test cases

- [ ] `ageGateResolve({ ageCheckRequired, underAge }): { allowed: boolean, reason: 'allowed' | 'underage' | 'not-required' }`
  - `ageCheckRequired=false` → `{ allowed: true, reason: 'not-required' }` (no alcohol in cart — gate skipped)
  - `ageCheckRequired=true, underAge=false` → `{ allowed: true, reason: 'allowed' }`
  - `ageCheckRequired=true, underAge=true` → `{ allowed: false, reason: 'underage' }`
  - `ageCheckRequired=true, underAge=null` (still loading) → `{ allowed: false, reason: 'underage' }` (fail-closed default)
- [ ] Pure (no React imports, no I/O)

#### MockPayButton

- [ ] Component renders the same visual chrome as `PayButton` (loading state, total label) — pastiche resolves visual parity. **Do not** make it visually distinguishable in production output (it never ships to prod).
- [ ] On click:
  1. Run the same age-gate check via `ageGateResolve` — show error if blocked
  2. POST `PUT /pocha/payment/${email}/${pochaID}/pay-result/` with `{ result: "success" }` (handled by 4.1's MSW)
  3. Redirect to `/pocha/pay-success?pochaid=${pochaID}&amount=${totalPrice}`
- [ ] No Stripe API calls. No `useStripe` / `useElements` calls.
- [ ] Loading state during the in-flight POST.

#### Swap wiring

- [ ] In `PaymentSubmitForm.tsx`, conditional render: `IS_MOCK_MODE ? <MockPayButton /> : <PayButton />`
- [ ] **Real-mode path 100% untouched.**

#### `useStripePayment.ts` — narrow change

- [ ] Replace the inline `if (ageCheckRequired && underAge)` branch with a call to `ageGateResolve(...)`. Behavior identical.
- [ ] Do **not** refactor anything else in this hook.

### Acceptance criteria

- [ ] All age-gate tests pass
- [ ] In mock mode, the `Pay` button on `/pocha/pay` is wired to `MockPayButton`; clicking it redirects to `/pay-success` with the expected query params
- [ ] In real mode, `PayButton` + Stripe flow is byte-identical to pre-lane (verify by `git diff` on `useStripePayment.ts` outside the age-gate extraction)
- [ ] Underage user (toggleable) blocked from both real and mock pay buttons with the same error path
- [ ] `npm run build` + `npm run typecheck` + `npm test` pass

### Non-goals

- Refactoring `useStripePayment` beyond the age-gate extraction
- `calculateStripeFee.ts` changes (already pure)
- Tip excision (lane 4.6)

### Bailout triggers

- `MockPayButton` redirect doesn't mount the success page cleanly because of `next/navigation` quirks — `needs-decision`
- `IS_MOCK_MODE` constant location ambiguous — `needs-decision`

---

## Lane 4.6 — Pay-success rebuild

**Repo:** `KISA-website-client`
**Mode:** `needs-interactive` (REDESIGN — semantic surgery on tip excision + duplicate-effect fix + render-time-redirect fix)

### Files

- Modify: `src/app/(pocha)/pocha/pay-success/page.tsx` (rebuild)
- Delete: `src/features/pocha/components/pay/TipModal.tsx`
- Modify: `src/app/(pocha)/pocha/pay/page.tsx` — remove `setup_future_usage: "off_session"` from `<Elements>` options (was tip plumbing)
- Audit: any `localStorage.setItem("paymentMethodId" | "customerName" | "customerEmail" | "customerID", ...)` write sites in `useStripePayment.ts` — remove

### Locked spec

- **Tip flow excised entirely.** No tip modal, no `tip_completed` query param branch, no localStorage scaffolding for `paymentMethodId` / `customerName` / `customerEmail` / `customerID`.
- **Bug fixes** baked in:
  - The duplicate `useEffect` blocks (literal copy-paste in current file) collapsed to single instances.
  - The render-time `if (!tipCompleted && (!pochaID || !amount)) { window.location.href = "/pocha"; }` block — replaced with a `useEffect` that calls `router.replace("/pocha")` on this condition. Render-time mutation of `window.location` is a React anti-pattern.
- **Simplified success view:**
  - Centered success icon (the existing `/images/check_circle.png` is acceptable; pastiche may swap to a DS Icon if a clean equivalent exists).
  - Heading text: English primary (e.g., `Payment complete`); existing Korean string `결제가 완료되었습니다` may be kept as a secondary line — pastiche's call.
  - Two action buttons stacked, full-width-percentage (English-primary labels; existing Korean labels `주문 내역 보기` / `홈으로 돌아가기` may be kept as secondary lines):
    - `View orders` → `router.push("/pocha?tab=orders")`
    - `Back to home` → `router.push("/pocha")`
  - Pastiche owns visual chrome (DS Button atoms).
- **Popstate guard** preserved: `window.history.pushState({ from: "pay-success" }, ...)` + `popstate` listener that routes to `/pocha`. Single `useEffect`, with cleanup.
- **No `PochaButton` import** — uses DS Button.

### Tasks

- [ ] Rebuild `pay-success/page.tsx` per spec (single file rewrite)
- [ ] Delete `TipModal.tsx` (verify no remaining imports: `grep -rn "TipModal" src/`)
- [ ] Remove `setup_future_usage: "off_session"` from `<Elements>` options in `pay/page.tsx`
- [ ] Audit + remove any `localStorage.setItem` writes for `paymentMethodId` / `customerName` / `customerEmail` / `customerID` in `useStripePayment.ts`
- [ ] `npm run build` + `npm run typecheck` pass

### Acceptance criteria

- [ ] `pay-success/page.tsx` is single-file, no `TipModal` import, no `localStorage` reads, no duplicate `useEffect`s, no render-time `window.location` writes
- [ ] `TipModal.tsx` file is deleted
- [ ] `setup_future_usage: "off_session"` removed from pay route
- [ ] No `localStorage.setItem("paymentMethodId" | ...)` calls anywhere in `src/features/pocha/`
- [ ] In mock mode, completing payment via MockPayButton (4.5b) lands on the new success view; `주문 내역 보기` routes to `/pocha?tab=orders`; `홈으로 돌아가기` routes to `/pocha`
- [ ] Back button on success view routes to `/pocha` (popstate guard works)

### Non-goals

- New tip ideation (strictly excise; not redesign)
- Stripe path changes beyond the `setup_future_usage` removal
- Pay-button changes (4.5b)

### Bailout triggers

- `setup_future_usage: "off_session"` removal triggers a Stripe error in real-mode end-to-end (we're in mock here, but a hidden coupling could surface) — `needs-decision`
- A `localStorage` write site discovered outside the audited files — `needs-decision`

---

## Lane 4.7 — Page shell sweep + legacy ui swap + delete `Pocha*` shared

**Repo:** `KISA-website-client`

### Files

- Modify: `src/app/(pocha)/pocha/layout.tsx` — `OnlyMobileView` import to DS if available; otherwise leave + flag
- Modify: `src/app/(pocha)/pocha/error.tsx` — DS `StatusView` swap (mirrors Phase 3.10)
- Modify: `src/app/(pocha)/pocha/cart/error.tsx` (create if missing — see Phase 3.10 pattern)
- Modify: `src/app/(pocha)/pocha/pay/error.tsx` (create if missing)
- Modify: `src/app/(pocha)/pocha/pay-success/error.tsx` (create if missing)
- Sweep: any remaining `@/components/ui/feedback` imports across files touched in Phase 4
- Sweep: any remaining `sejongHospital*` raw font imports in Phase 4 files (should be 0 after each lane's `ds-client-review`, but verify)
- Delete: `src/features/pocha/components/shared/PochaButton.tsx`
- Delete: `src/features/pocha/components/shared/PochaBackHeading.tsx`
- Delete: `src/features/pocha/components/shared/PochaHorizontalDivider.tsx`
- Delete: `src/features/pocha/components/shared/PochaErrorMsg.tsx`

### Locked spec

- **`error.tsx` template** — Next.js error boundary (`"use client"`) — receives `{ error: Error & { digest?: string }; reset: () => void }` and renders DS `StatusView` (error variant, full-screen) with title naming the route (e.g., `"Failed to load cart."`), description from `error.message` (fallback `"Please try again."`), primary action: DS Button `Retry` wired to `reset`. Mirror Phase 3.10 lane 3.10.
- **Verify no callers** before deleting any `Pocha*` shared file:
  - `grep -rn "from \"@/features/pocha/components/shared/PochaButton\"" src/` → expect 0
  - same for `PochaBackHeading`, `PochaHorizontalDivider`, `PochaErrorMsg`
- If any caller remains, the lane bails to `needs-decision` (the sweep is not free to silence the import; the consumer lane should have replaced it).

### Tasks

- [ ] Add per-route `error.tsx` files where missing
- [ ] Sweep imports per spec
- [ ] Delete the four `Pocha*` shared files (verify no callers first)
- [ ] `grep -rn "@/components/ui/feedback" src/app/\\(pocha\\)/ src/features/pocha/` → expect 0 (or only `NotAuthorized` if DS still missing it — flag in `notes.md` as a follow-up)
- [ ] `grep -rn "sejongHospital" src/app/\\(pocha\\)/ src/features/pocha/` → expect 0 in non-admin paths
- [ ] `npm run build` + `npm run typecheck` + `npm test` pass

### Acceptance criteria

- [ ] All four `Pocha*` shared files deleted
- [ ] Per-route `error.tsx` files render DS `StatusView`
- [ ] No `@/components/ui/feedback` imports under `(pocha)` user-facing tree
- [ ] No `sejongHospital*` font imports in user-facing pocha files
- [ ] No new dependencies

### Non-goals

- Migrating `NotAuthorized` to DS (Phase 5+ scope if not already there)
- Touching files outside the user-facing pocha tree
- Touching `OnlyMobileView` internals (only its import path, if it has moved to DS)

### Bailout triggers

- A `Pocha*` shared file still has a caller after Phase 4 lane merges — `needs-decision` (find the missed lane)
- `OnlyMobileView` not exported from DS and a clean equivalent is unobvious — leave the import; flag

---

## Lane 4.8 — Audit-after redesign pass + page metadata

**Repo:** `KISA-website-client`
**Mode:** `needs-interactive` (review pass)

### Scope

- Manual visual/UX walkthrough of `/pocha`, `/pocha/cart`, `/pocha/pay`, `/pocha/pay-success` at mobile viewports (375px primary, 414px) in mock mode.
- Use `review-ui-on-browser` skill via Playwright CLI on the devtunnels URL (never localhost — see `feedback_never_localhost`).
- Coverage:
  - Page shell tabs URL sync (`?tab=orders`, `?tab=menu`)
  - Menu list: categories, image fallback, sold-out signal, underage gating, sticky `ViewCartButton` show/hide on cart non-empty
  - Menu-item detail: open/close, quantity stepper, add-to-cart success/failure
  - Orders tab: status filter, ticket open/close, Simulate Promote button visibility + behavior, polling visibly updates
  - Cart: stepper + stock-cap toast, sticky bottom summary, empty state
  - Pay: summary card, MockPayButton flow end-to-end, error surface, age-gate block (toggle underage in `MockAuthToggle`)
  - Pay-success: success view, both buttons route correctly, popstate guard
  - Per-route `error.tsx` (force a thrown error and verify DS `StatusView` renders with Retry)
- **Page metadata:** verify `<title>` / `<meta>` for each route. Apply Next.js `export const metadata` patterns where missing (e.g., `Cart | KISA`, `Pay | KISA`, `Order complete | KISA`, etc.).
- Fix on the same branch any drift caught (typography, spacing, copy).

### Tasks

- [ ] Spin up dev server: `cd KISA-website/client && NEXT_PUBLIC_MOCK_API=1 npm run dev` (use devtunnels URL)
- [ ] Run `review-ui-on-browser` per coverage list
- [ ] Capture findings in `docs/plans/client-migration/phase-4-pocha-userfacing/review-4.8-findings.md`
- [ ] Apply fixes; commit + push (Mode D — direct push, no PR)

### Acceptance criteria

- [ ] All coverage items reviewed; findings file checked in
- [ ] No outstanding visual / UX drift on the four routes at 375px
- [ ] Page metadata present on each route
- [ ] `npm run build` + `npm run typecheck` pass

### Non-goals

- Desktop coverage (mobile-only tool)
- Cross-browser (Chrome only acceptable for this pass)

---

## Lane 4.9 — Verify + end-bump

**Repo:** `KISA-website-client` + `umichkisa-ds` (if any DS fixes accumulated)
**Mode:** `needs-interactive`

### Tasks

- [ ] Both repos: `pnpm build` + `pnpm typecheck` (DS) / `npm run build` + `npm run typecheck` + `npm test` (client) all green
- [ ] Manual smoke on real Stripe path (toggle mock off, attempt a small real payment in test mode if possible, or document the manual smoke deferred to pre-`dev → main` ship per audit `notes.md`)
- [ ] Manual smoke in mock mode: full happy-path — browse menu, add items, view cart, adjust quantities, proceed to pay, MockPayButton, success view, view orders, Simulate Promote, see status update
- [ ] Check `docs/plans/client-migration/ds-fixes-log.md` for Phase 4 entries
- [ ] If entries exist: invoke `ds-phase-end-bump` (always patch per `feedback_ds_bump_semver`)
- [ ] If no entries: skip end-bump, document `"no end-bump needed — all DS fixes mid-phase shipped"` in TODO entry per Phase 1/2/3 precedent
- [ ] Tick Phase 4.9 + parent Phase 4 in `docs/TODO.md`

### Acceptance criteria

- [ ] Both repos green
- [ ] DS version pinned correctly in client `package.json` (latest mid-phase patch, or unchanged if no fixes)
- [ ] TODO.md ticks reflect lane completion

### Non-goals

- Real-Stripe end-to-end test in CI (manual only — Stripe iframes are not honestly mockable per audit)
- Phase 5 kickoff (next session)

---

## Open items deferred to execution

Carried forward from `audit.md`:

- ~~**4.1**: confirm `MenuItem.isAlcohol` field name vs real-backend~~ — resolved 2026-05-02: BE field is `ageCheckRequired`; handler + tests use it directly
- ~~**4.2a**: page shell visual rhythm + sticky `ViewCartButton` placement~~ — resolved 2026-05-02 grill: heading scrolls + tabs sticky; ViewCartButton always visible, label-only, full-width; theme code untouched; bottom-sheet via new Lane 4.0; underage = inline dim + 21+ badge; URL-as-source-of-truth + `router.replace`
- **4.3a**: order-ticket bottom-sheet vs in-place panel — resolved by Lane 4.0 (use DS Sheet); status-badge tone mapping still pastiche call
- **4.3b**: polling interval (1.5s default) — tunable at execution if it feels laggy
- ~~**4.4a**: quantity-stepper composition + sticky checkout bar~~ — resolved 2026-05-02 grill (issue #142): stepper visual chrome → pastiche; qty=1 trash-swap intent preserved; stock UX is inline red (never toast) matching `MenuListItem`; sticky bar = total price only + safe-area; empty state = no CTA; loading = skeleton; error = inline `StatusView` + `fetchCart` retry; checkout uses `router.push`. Flipped to `autonomous-ready`.
- **4.5b**: MockPayButton visual parity with `PayButton` — pastiche call
- **4.6**: confirm no hidden `localStorage` write sites for tip plumbing outside the audited files
- **4.8**: review file path created at execution — `review-4.8-findings.md`

### Follow-up lane (post-Phase-4 candidate)

- **Theme-wiring strategy** (TBD lane): rework how `POCHA_THEME` (and future seasonal themes) plug into the DS-migrated pocha shell. Current theme JSX (CherryBlossom branch + petals + swayTrigger handler) is preserved as-is in `page.tsx` through Phase 4. Needs a clean theming primitive — likely DS-side (theme-scoped tokens / wrapper) — before re-flipping to a seasonal theme. Decided 2026-05-02 grill.

---

## Pre-`dev → main` ship checklist (informational)

Per audit `notes.md`: real Stripe path is not mocked. Before any `dev → main` PR for Phase 4:

- [ ] Manual smoke of full real Stripe flow in test mode (one card payment end-to-end against `dev`)
- [ ] Verify `MockPayButton` is **not** rendered in production build (check `IS_MOCK_MODE` is `false` in prod env)
- [ ] Verify `_mock` MSW handlers are tree-shaken from prod bundle
