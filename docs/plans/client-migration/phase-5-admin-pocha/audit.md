# Phase 5 — admin-pocha consolidation (Audit)

**Type:** Vertical foundation phase (per HARNESS), subphased into lanes for parallel execution.
**Visual reference:** [`reference-incident-io.png`](./reference-incident-io.png) — incident.io's "Built on rock-solid foundations" section. Phase 5's `/admin` hub borrows this layout: hero text top-left + asymmetric card grid + small inline link ("Discover our AI platform →" → KISA's "둘러보기"). Adapt, don't copy: KISA's hub uses brand-neutral cards (no orange accent card), 5 cards instead of 5+1, and the link triggers a crossfade mode switch instead of routing away.

**Charter:** Stand up the **KISA admin app foundation** under `/admin/*`, with three pocha admin surfaces (`manage`, `dashboard`, `history`) as the first three tenants. Phase 5 is *structural* — it establishes the URL umbrella, hub IA, auth gate consolidation, and a hub-and-spoke navigation pattern that future admin tenants (Website CMS, RSVP CMS, etc.) will plug into without redesign.
**Scope principle:** Existing pocha admin pages (`manage` from Phase 2, `dashboard` from Phase 3) keep their internal layouts unchanged — Phase 5 wraps them in a route group and a navigation hub, it does not redesign their content. The only un-migrated route, `/pocha/history`, gets a [POLISH] DS migration with current functionality preserved (forward-named "Data analytics" on the hub but content stays the existing PreviousPochaList + OrderHistoryTable split-pane).

---

## Scope Snapshot

### Source files (client)

```
src/app/(pocha)/pocha/manage/                  → src/app/admin/pocha/manage/      (route move)
src/app/(pocha)/pocha/dashboard/               → src/app/admin/pocha/dashboard/   (route move)
src/app/(pocha)/pocha/history/                 → src/app/admin/pocha/history/     (route move + POLISH migration)
                                                  page.tsx, layout.tsx (preserved per route)

NEW files:
src/app/admin/
├── layout.tsx                                  Owns useAdmin gate; mounts BackToHubFAB
├── page.tsx                                    Hub: hero + 5 cards + crossfade mode switch
└── pocha/
    └── layout.tsx                              (optional, may be empty pass-through)

src/components/layout/admin/
├── AdminHubHero.tsx                            Korean greeting + subtitle + "둘러보기" link
├── AdminHubCards.tsx                           5-card grid (3 live + 2 coming-soon)
├── AdminHubAppsList.tsx                        Crossfade-target list view (3 user-facing apps)
└── BackToHubFAB.tsx                            Floating button + edge-tab collapse + sessionStorage gating

next.config.js                                  Add redirects() block: /pocha/{manage,dashboard,history} → /admin/...
```

### Touched but not redesigned

```
src/app/admin/pocha/manage/page.tsx             Drop internal useAdmin gate (now in layout); set fromHub flag plumbing
src/app/admin/pocha/dashboard/page.tsx          Same; CTA href in noPocha StatusView updated /pocha/manage → /admin/pocha/manage
src/app/admin/pocha/history/page.tsx            POLISH migration: DS tokens, drop sejongHospitalBold, drop unused OrderDashboard import,
                                                drop internal useAdmin gate, Container, type-* classes
```

### Out of scope

- **Cross-pocha analytics, KPI strips, charts, drill-in routes for history** — explicitly deferred. `/admin/pocha/history` v1 = current functionality, DS-tokenized only.
- **Sidebar nav inside admin sub-apps** — rejected during grill; hub-and-spoke + floating back button is the locked pattern.
- **Top-bar shell chrome inside sub-apps** — rejected to preserve Phase 2/3 page layouts; identity (user chip + login) stays in each page.
- **Future admin tenants** — Website CMS, RSVP CMS represented as "coming soon" cards on hub, no implementation.
- **Dashboard's History sub-tab** — different scope from `/admin/pocha/history` (current event vs past events); untouched.
- **Mobile gating** — admin routes are desktop+tablet per HARNESS; no mobile redesign.
- **Real-state-driven hub card highlight** ("Dashboard lights up when pocha is running") — nice future touch, not v1.

---

## Decisions Locked (grill output)

| Q | Decision | Rationale |
|---|---|---|
| Q1 | **`/admin/*` umbrella** — pocha admin URLs move; `next.config.js` redirects from old URLs | Setting the *starting line* — pay URL cost now while there are 3 surfaces and ~0 cross-references, not later with 6+. |
| Q2 | **`admin` is a route group, not a feature** — `features/pocha/` stays one domain feature spanning user + admin audiences; no `features/admin/`; admin chrome in `components/layout/admin/` | Audience boundaries are routing/auth concerns, not feature boundaries. Splitting `features/pocha/` would force a `pocha-shared/` junk drawer holding 60% of the folder. |
| Q3 | **Hub-and-spoke IA, no persistent sidebar** — `/admin` is itself the navigation hub; sub-pages have no cross-app nav, only a floating back-to-hub button | Admin sessions are task-focused (run live ops, OR edit menus, OR audit history); cross-app jumping ~never happens. Sidebar's persistent screen-real-estate cost isn't earned. |
| Q4 | **5 cards on hub: Pocha Manage / Pocha Dashboard / Pocha History / Website CMS (coming soon) / RSVP CMS (coming soon)**; Website CMS encompasses /info pages | Admin tools only; "coming soon" cards = honest roadmap signal. Public surfaces (kisa-web, /jobs, /pocha) belong on the user-apps list, not the admin hub. |
| Q4a | **Hero**: Korean personal greeting (`안녕하세요, {firstName}님` + subtitle) + "둘러보기" link to user-facing apps catalog | Personal greeting grounds page in the user, not corporate chrome. Korean — all KISA members are fluent. |
| Q5 | **"Discover platform" mechanism = crossfade mode switch** (admin cards collapse → 3-app list) — not Sheet, not Popover, not Dialog | User explicitly chose: hub becomes "onboarding-like" mode. Visually committed, not chrome. |
| Q5a | URL strategy = **pure client state** (no `?view=apps`, no sub-route) | Transient mode switch; refresh-resets-to-admin is the right default. |
| Q5b | Transition = **crossfade ~250ms** (Pattern 1, simple) | "Smooth" doesn't require sequential staggering. Reduced-motion = instant swap. |
| Q5c | Apps view layout = **vertical list** (not 2×3 grid mirror) — reads as guided "pick destination" mode, not another tool grid | Three items don't fit the 2×3 admin grid cleanly. |
| Q5d | **Hero title + subtitle change too** (not just link text) — full mode commit | Half-changing hero makes transition feel half-done. Final copy locked in 5.2 implementation. |
| Q6 | **Floating back-to-hub button (FAB), bottom-left** — *no* shell top-bar inside sub-apps | Preserve Phase 2 + 3's already-shipped page layouts; zero regression risk on `manage` and `dashboard`. |
| Q6a | "From hub" detection = **`sessionStorage` flag** (`kisa.admin.fromHub`) — set on hub card click, read on sub-page mount, cleared on shrink-action and tab close | Survives hard reload in same tab; no URL pollution; no `document.referrer` brittleness. |
| Q6b | **Auth gate consolidated to `/admin/layout.tsx`** — invisible structural win; each existing page drops its own `useAdmin` + `<StatusView fullScreen variant="not-authorized" />` boilerplate | Pure dedupe, no UI shift. Pages still own their identity chrome (user chip + login). |
| Q6c | FAB shape = **pill collapses to icon by default, expands to text on hover/focus** | Discoverable + lightweight. |
| Q6d | Shrink behavior = **collapse to thin edge-tab** — restorable for the session, never punitive disappearance | One misclick shouldn't lose the affordance. |
| Q6e | Dashboard collision: bulk-promote action bar is `sticky bottom-4` per-grid → **dashboard route opts in to `defaultCollapsed={true}`** on FAB; other admin routes default expanded | Honors live-ops "no chrome" principle; no special-case in FAB component logic, just a per-route prop. |
| Q7 | `/admin/pocha/history` = **[POLISH]** — mechanical DS migration + small UX fixes; current split-pane preserved; **no** drill-in routes, **no** KPI strip, **no** new analytics | Scope shrink per user. Hub card forward-named "Data analytics" but content unchanged in v1. |
| Q8 | **Dashboard's History sub-tab stays untouched** — different scope from `/admin/pocha/history` (current-event closed orders vs past-event archive); complementary, not redundant | One purpose each. Phase 3 work preserved. |
| Q9 | **6 subphases, 1 autonomous + 5 interactive, 0 TDD**; 5.1 bundled (foundation), 5.5 audit-after kept separate | Phase 5 is structure + chrome, not domain logic — no MSW or pure utils. Single foundation lane is cohesive. Audit-after is the drift catcher per Phase 2.19/3.11 precedent. |

---

## Subphase Enumeration

| # | Title | Single responsibility | TDD | Mode | Scope |
|---|---|---|:---:|---|---|
| 5.1 | **Admin shell foundation** | `/admin/layout.tsx` w/ auth gate; move `/pocha/{manage,dashboard,history}` → `/admin/pocha/*`; `next.config.js` redirects from old URLs; drop per-page `useAdmin` boilerplate from all 3 pages; fix inbound links (dashboard `noPocha` StatusView CTA `/pocha/manage` → `/admin/pocha/manage`); grep audit for any other inbound refs | no | interactive | [MECHANICAL] |
| 5.2 | **Admin hub page** | `/admin/page.tsx` — `AdminHubHero` (Korean greeting + subtitle + "둘러보기" link) + `AdminHubCards` (2×3 layout, 3 live + 2 coming-soon) + `AdminHubAppsList` (crossfade target — 3 user-facing apps as vertical list); crossfade mode switch via `useState`; sets `sessionStorage.kisa.admin.fromHub` on card click | no | interactive | [REDESIGN] |
| 5.3 | **`BackToHubFAB` component + integration** | `components/layout/admin/BackToHubFAB.tsx` — sessionStorage read on mount; pill-collapses-to-icon hover behavior; shrink → edge-tab restorable state; `defaultCollapsed` prop with route-based opt-in (dashboard `true`, others `false`); mounted in `/admin/layout.tsx` so it self-renders only when flag present | no | interactive | [REDESIGN] |
| 5.4 | **`/admin/pocha/history` DS polish migration** | Replace `sejongHospitalBold` → `type-h1`/`type-h2`; replace `LoadingSpinner`/`NotAuthorized` → DS (gate now in layout — drop the `useAdmin` block entirely); wrap in DS `Container`; drop unused `OrderDashboard` import (line 12 of current `page.tsx`); preserve PreviousPochaList + OrderHistoryTable split-pane semantics; small layout/UX fixes (gap, header alignment) | no | autonomous | [POLISH] |
| 5.5 | **Audit-after redesign pass** | Walkthrough at desktop + tablet across all 4 admin routes (`/admin`, `/admin/pocha/manage`, `/admin/pocha/dashboard`, `/admin/pocha/history`); verify mode-switch transition (admin ↔ apps view); verify FAB sessionStorage gating (deep-link = no FAB; via-hub = FAB visible); verify FAB shrunk-by-default on dashboard, expanded elsewhere; verify expand/collapse and edge-tab restoration; redirects fire from old URLs; identity chrome unchanged in 3 existing pages | no | interactive | — |
| 5.6 | **Verify + end-bump** | Build + typecheck (`pnpm build`, `pnpm typecheck`); manual smoke (login as admin → land on hub → click Manage card → return via FAB → click Dashboard card → confirm FAB shrunk → expand FAB → return); optional DS bump if mid-phase fixes accumulated; tick phase entry | no | interactive | — |

**Count:** 6 subphases (5.1–5.6).
**Autonomous/interactive:** 1 / 5.
**TDD lanes:** 0 (no new MSW handlers, no new pure utils — Phase 5 is structural + chrome).

---

## Dependency Graph

```
                ┌────────────────────────┐
                │ 5.1 Admin shell        │
                │ foundation             │ (interactive)
                │ — routes + gate +      │
                │   redirects + link fix │
                └───────────┬────────────┘
                            │ (foundation complete)
        ┌───────────────────┼───────────────────────┐
        ▼                   ▼                       ▼
  ┌─────────────┐     ┌─────────────┐         ┌──────────────┐
  │ 5.2 Hub page│     │ 5.3 FAB     │         │ 5.4 History  │
  │ (interactive│     │ (interactive│         │ DS polish    │
  │  REDESIGN)  │     │  REDESIGN)  │         │ (autonomous  │
  │             │     │             │         │  POLISH)     │
  └──────┬──────┘     └──────┬──────┘         └──────┬───────┘
         └───────────────────┼────────────────────────┘
                             ▼
                ┌────────────────────────┐
                │ 5.5 Audit-after pass   │ (interactive)
                └───────────┬────────────┘
                            ▼
                ┌────────────────────────┐
                │ 5.6 Verify + end-bump  │ (interactive)
                └────────────────────────┘
```

**Waves:**
- **Wave A (foundation, blocks all):** 5.1 — single lane, single PR.
- **Wave B (parallel presentation, 3-way):** 5.2, 5.3, 5.4 — three terminals concurrent once foundation lands.
- **Wave C (close-out, serial):** 5.5 → 5.6.

**Critical path:** 5.1 → {5.2 or 5.3} → 5.5 → 5.6 ≈ 4 serial lanes.

---

## Phase-Wide Risks

1. **Inbound link blind spots.** `/pocha/manage`, `/pocha/dashboard`, `/pocha/history` are referenced from app code (dashboard's noPocha CTA is the known one) and possibly from external sources outside the repo (Slack, bookmarks, docs). 5.1 must do a thorough grep for `/pocha/manage`, `/pocha/dashboard`, `/pocha/history` strings AND verify `next.config.js` `redirects()` covers all three. Permanent (308) redirects to preserve search-engine state where it matters.
2. **Auth gate dedupe regressions.** Each existing admin page currently runs `useAdmin()` + early-return. Moving the gate to `/admin/layout.tsx` means a misconfigured layout could either (a) flash content before gate resolves, or (b) over-gate something it shouldn't. Mitigate: layout uses the same `adminStatus === "success" && !isAdmin` pattern Phase 3 uses, and tests in 5.5 explicitly cover non-admin → StatusView, loading → null/spinner, admin → children.
3. **FAB sessionStorage edge cases.** Tab duplication (browser feature) inherits sessionStorage; user duplicates a tab from `/admin` after clicking a card and the FAB shows on the duplicate even though they didn't navigate from hub *in that tab*. Acceptable corner case — flag in 5.3 notes, don't over-engineer.
4. **Crossfade transition + reduced-motion.** Users with `prefers-reduced-motion: reduce` should get instant swap, not a 250ms fade. 5.2 must include this branch.
5. **FAB collision with dashboard's bulk-promote action bar.** Resolved by `defaultCollapsed={true}` on dashboard route, but if Phase 3's action bar position changes in a future patch, FAB may collide again. Document the contract in `BackToHubFAB.tsx` JSDoc.
6. **Hub card layout asymmetry.** Hero occupies top-left slot of a 2×3 grid; one slot may end up visually lonely depending on hero copy length. Lock layout via Figma-or-equivalent during 5.2 implementation, not at audit time.
7. **"Coming soon" cards = roadmap commitment leak.** Cards advertise Website CMS and RSVP CMS as "coming soon." If those slip indefinitely, the hub feels like a graveyard. Mitigate: keep "coming soon" implementation light (greyed card, badge, no link); easy to remove if priorities change.
8. **`/admin/pocha/history` polish-migration UX drift.** Lane 5.4 is autonomous and POLISH-marked — small UX fixes are tempting to scope-creep. Lane 5.5 (audit-after) is the backstop, but reviewer of 5.4 PR should verify no new-feature additions vs locked "current functionality only."
9. **Public-apps list copy.** The "둘러보기" popover (apps list) advertises three user-facing surfaces. Copy + icon must be picked at 5.2 implementation time; verify Korean phrasing reads naturally for KISA members.
10. **Layout shift during admin route SSR.** `/admin/layout.tsx` does client-side `useAdmin()` resolution; admin pages may briefly flash "loading" state before either gate or content. Match Phase 3's pattern — render shell + skeleton, not full-screen spinner — for consistency.

---

## Open Items (carry into plan.md)

- **5.1**: confirm `next.config.js` redirect status code (default `permanent: false` = 307; switch to `permanent: true` = 308 since these are real URL changes).
- **5.1**: search beyond `src/` — check `public/`, `tests/`, README, MSW fixtures for hardcoded admin URL refs.
- **5.2**: hero copy final lock — `안녕하세요, {firstName}님` vs `{firstName}님, 환영합니다` etc.; subtitle phrasing.
- **5.2**: card icon set — pick from DS icon registry per card; confirm "coming soon" badge style (DS `Badge`?).
- **5.2**: crossfade duration — 250ms recommended; confirm during impl + tablet test.
- **5.2**: apps list copy + icons — `공식 홈페이지`, `Jobs Curator`, `포차 앱` — final descriptions during impl.
- **5.3**: FAB exact bottom-left offset (`bottom-4 left-4` vs more); z-index to avoid colliding with future toasts.
- **5.3**: FAB pill expanded copy — `← 관리자 홈` vs `← 관리 페이지` etc.
- **5.3**: edge-tab visual — thin sliver vs small protruding chevron; pick during impl.
- **5.4**: small UX fixes scope — gap between left/right panes, selected-pocha summary card hierarchy. Reviewer note: do not introduce new analytics, KPI cards, or layout shape changes.
- **5.5** deliverable: a written walkthrough of all 4 admin routes at 1280px and 768px with screenshots; FAB state matrix verified.
