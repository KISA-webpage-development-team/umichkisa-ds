# Phase 5 — admin-pocha consolidation (Plan)

> Lanes from this plan become GitHub issues executed per `docs/plans/client-migration/AUTONOMOUS_PROTOCOL.md`. Source of truth: `./audit.md`.
>
> **UI fidelity is handled by `pastiche`, not by this plan.** UI lane specs (5.2, 5.3) describe the artifact, the user goal, the states that must exist, and behavior — they intentionally do **not** prescribe DS atom names, exact variants, exact spacing, or typography utilities. Pastiche resolves those choices against the DS repo's `pastiche/{FACT,KNOWLEDGE,WISDOM}.md`. Mechanical/polish lanes (5.1, 5.4) and review/verify lanes (5.5, 5.6) are detailed.

**Scope:** Stand up the **KISA admin app foundation** under `/admin/*`. Move `/pocha/{manage,dashboard,history}` to `/admin/pocha/*`, add a hub page at `/admin`, consolidate the auth gate to `/admin/layout.tsx`, and add a hub-and-spoke navigation pattern (floating back-to-hub button) that future admin tenants will plug into. Existing pocha admin pages keep their internal layouts unchanged. `/admin/pocha/history` gets a [POLISH] DS migration with current functionality preserved.

**Visual reference:** [`reference-incident-io.png`](./reference-incident-io.png) — adapted, not copied.

---

## Wave / Dependency Structure

```
Wave A — foundation (single, blocks all)
  5.1  Admin shell foundation                                         (interactive)

Wave B — presentation (parallel, 3-way once 5.1 lands)
  5.2  Admin hub page (UI, pastiche)             (blocked-by 5.1)    (interactive)
  5.3  BackToHubFAB component + integration      (blocked-by 5.1)    (interactive)
  5.4  /admin/pocha/history DS polish migration  (blocked-by 5.1)    (autonomous)

Wave C — close-out (serial)
  5.5  Audit-after redesign pass                 (blocked-by 5.2,5.3,5.4) (interactive)
  5.6  Verify + end-bump                         (blocked-by 5.5)         (interactive)
```

**Critical path:** 5.1 → {5.2 or 5.3} → 5.5 → 5.6 ≈ 4 serial lanes. Wave B can run 3 concurrent terminals.

**Dependency edges** (→ means "must merge before"):

- `5.1 → 5.2, 5.3, 5.4` — every presentation lane assumes the new `/admin/*` URL umbrella, the consolidated layout gate, and the route moves are in place.
- `5.2, 5.3, 5.4 → 5.5` — audit-after walks all four admin routes; needs every surface present.
- `5.5 → 5.6` — verify is last.

---

## Label Disposition (6-Rule Gate)

Applied per `AUTONOMOUS_PROTOCOL.md` §6.

| Lane | Tag | Disposition | Rationale |
|---|---|---|---|
| 5.1 | [MECHANICAL][NO-TDD] | `needs-interactive` | Touches routing structure (route group → folder move), `next.config.js` redirects, and consolidates the auth gate — fail rule 5 (routing middleware-adjacent) and benefits from live verification of redirect behavior + auth flash |
| 5.2 | [REDESIGN][NO-TDD] | `needs-interactive` | REDESIGN tag (rule 1 fail) — hero copy, card grid composition, crossfade mode-switch transition, apps-list copy all need live grill at impl time |
| 5.3 | [REDESIGN][NO-TDD] | `needs-interactive` | REDESIGN — FAB pill collapse/expand chrome, edge-tab visual, sessionStorage gating verification — needs live UX testing |
| 5.4 | [POLISH][NO-TDD] | `autonomous-ready` | Mechanical token swap + dead-import drop + Container wrap; current split-pane preserved; spec fully concrete; no design decisions |
| 5.5 | n/a | `needs-interactive` | Review pass; full-phase visual/UX walkthrough at desktop + tablet |
| 5.6 | n/a | `needs-interactive` | Touches publish (`ds-phase-end-bump` if any DS fixes accumulated); final verify |

**Totals:** 1 autonomous-ready, 5 needs-interactive (6 lanes total).

---

## Lane 5.1 — Admin shell foundation

**Repo:** `KISA-website-client`
**Mode:** `needs-interactive` (Mode D — worktree off `dev`, direct-push)
**Scope:** [MECHANICAL]

### Files

- New: `src/app/admin/layout.tsx` — owns `useAdmin()` gate; renders children when admin, `StatusView` (not-authorized variant) when not, skeleton/null while loading
- New: `src/app/admin/pocha/layout.tsx` — empty pass-through (reserve for future per-tenant chrome)
- Move: `src/app/(pocha)/pocha/manage/` → `src/app/admin/pocha/manage/` (preserve `page.tsx`, `layout.tsx`, `brainstorming.txt`)
- Move: `src/app/(pocha)/pocha/dashboard/` → `src/app/admin/pocha/dashboard/` (preserve `page.tsx`, `layout.tsx`, `error.tsx`)
- Move: `src/app/(pocha)/pocha/history/` → `src/app/admin/pocha/history/` (preserve `page.tsx`)
- Modify: `src/app/admin/pocha/manage/page.tsx` — drop the `useAdmin()` + `LoadingSpinner`/`NotAuthorized` early-return block (gate now in layout); leave the rest of the page alone
- Modify: `src/app/admin/pocha/dashboard/page.tsx` — same drop; update `noPocha` StatusView CTA `href="/pocha/manage"` → `href="/admin/pocha/manage"` (line ~107 in current file)
- Modify: `src/app/admin/pocha/history/page.tsx` — drop the `useAdmin` block only (full DS polish migration is Lane 5.4; 5.1 only removes the gate boilerplate)
- Modify: `next.config.js` — add `redirects()` block: `/pocha/manage`, `/pocha/dashboard`, `/pocha/history` → `/admin/pocha/...` with `permanent: true` (308)
- Modify: `src/mocks/MockAuthToggle.tsx` — `DASHBOARD_PATH = "/pocha/dashboard"` → `"/admin/pocha/dashboard"` (line 12)

### Locked spec

- **Layout gate pattern** — match Phase 3's `useAdmin()` pattern exactly:
  - `adminStatus === "loading"` → render skeleton (or `null` if Phase 3's dashboard layout returns null) — do **not** flash a full-screen spinner
  - `adminStatus === "success" && !isAdmin` → render `<StatusView fullScreen variant="not-authorized" />`
  - otherwise → render `{children}`
- **Redirect status** — `permanent: true` (308). These are real URL changes, not A/B tests; preserve any external bookmark/SE state.
- **Identity chrome stays in pages** — `manage`, `dashboard`, `history` continue to render their own `UserInfo` + `LoginButton` headers. Layout adds the gate only.
- **No `(pocha)` cleanup** — leave the `(pocha)` route group intact; the user-facing pocha routes (`/pocha`, `/pocha/cart`, `/pocha/pay`, `/pocha/pay-success`) still live there per Phase 4. Only the admin three move out.

### Inbound link audit

Pre-checked 2026-05-04 from current `dev`:

```
src/app/(pocha)/pocha/dashboard/page.tsx:107   href="/pocha/manage"     ← fixed in this lane
src/mocks/MockAuthToggle.tsx:12                DASHBOARD_PATH            ← fixed in this lane
```

API URLs (`/pocha/dashboard/{id}/...`, `/pocha/manage/...`) under `src/apis/`, `src/mocks/handlers/`, and tests are **backend route prefixes**, not frontend page routes — they do **not** need redirect or update.

The lane re-runs the grep at execution time and bails to `needs-decision` if any new inbound page-route reference has appeared since this audit.

### Tasks

- [ ] Worktree off `origin/dev`
- [ ] Create `src/app/admin/layout.tsx` per locked spec
- [ ] Create `src/app/admin/pocha/layout.tsx` (empty pass-through)
- [ ] `git mv` the three folders (preserves history); update any relative imports broken by the move (likely none — features live under `src/features/pocha/`, not under `(pocha)/`)
- [ ] Drop the `useAdmin()` gate block from each of the three pages
- [ ] Update dashboard `noPocha` CTA href
- [ ] Update `MockAuthToggle.DASHBOARD_PATH`
- [ ] Add `redirects()` to `next.config.js`
- [ ] Re-run inbound grep: `grep -rn '"/pocha/manage\|"/pocha/dashboard\|"/pocha/history\|href="/pocha/manage\|href="/pocha/dashboard\|href="/pocha/history\|router\.push.*pocha/manage\|router\.push.*pocha/dashboard\|router\.push.*pocha/history' src/` → expect 0 hits
- [ ] `npm run build` + `npm run typecheck` + `npm test` pass
- [ ] Manual smoke: log in as admin → visit `/admin/pocha/manage`, `/admin/pocha/dashboard`, `/admin/pocha/history`; visit old `/pocha/manage` etc. and verify 308 → new URL; log in as non-admin and verify `StatusView` not-authorized renders at all four routes; log out and verify the non-authenticated state matches existing behavior

### Acceptance criteria

- [ ] All three admin pages serve at their new `/admin/pocha/*` URLs; old URLs 308-redirect
- [ ] `/admin/layout.tsx` enforces the auth gate; non-admin and loading branches render correctly
- [ ] Each existing page's internal layout, identity chrome, and behavior unchanged (manage's editor, dashboard's live ops, history's split-pane)
- [ ] No `useAdmin()` + `LoadingSpinner`/`NotAuthorized` early-return blocks remain in the three pages
- [ ] `MockAuthToggle.DASHBOARD_PATH` updated
- [ ] `npm run build` + `npm run typecheck` + `npm test` pass
- [ ] No inbound page-route references to `/pocha/{manage,dashboard,history}` remain in `src/`

### Non-goals

- Hub page (`/admin/page.tsx`) — Lane 5.2
- FAB component — Lane 5.3
- History DS polish (typography, Container, OrderDashboard cleanup) — Lane 5.4
- Touching user-facing pocha routes under `(pocha)/`
- Changing per-page identity chrome (UserInfo + LoginButton stay)

### Bailout triggers

- `git mv` causes import path breakage that isn't trivially fixable (e.g., a relative `../../layout` reference into `(pocha)`) — `needs-decision`
- A new inbound page-route reference is found by the re-grep that wasn't in the 2026-05-04 audit — `needs-decision`
- Auth gate flash behavior diverges from Phase 3 dashboard's pattern (e.g., layout returns null where dashboard's layout returns shell) — `needs-decision`; do not silently invent a third pattern

### Budget

~45 min (typical move + redirects + smoke)

### Expected diff summary

~10 files, ~50 net LoC removed (gate dedupe more than offsets the new layout files). If diff exceeds 200 LoC, self-verify before merge.

---

## Lane 5.2 — Admin hub page

**Repo:** `KISA-website-client`
**Mode:** `needs-interactive` (Mode D — worktree off `dev`, direct-push)
**Scope:** [REDESIGN] · execution skill: `pastiche`

### Files

- New: `src/app/admin/page.tsx` — hub page (renders the hub layout below)
- New: `src/components/layout/admin/AdminHubHero.tsx`
- New: `src/components/layout/admin/AdminHubCards.tsx`
- New: `src/components/layout/admin/AdminHubAppsList.tsx`

(Pastiche may decide to fold `AdminHubHero/Cards/AppsList` into the page or keep them split — that composition decision is pastiche's call.)

### Scope (descriptive — pastiche resolves DS surface)

The `/admin` hub is the **landing page admins see when they sign in**. It is a single screen with two visual modes that swap in place via a crossfade:

- **Default mode (Admin tools)** — the page advertises which admin tools the signed-in user can run, and lets them launch one. Layout intent: a personal greeting on one side, a small grid of admin "tool cards" on the other side (asymmetric — not a centered hero).
- **Apps mode (둘러보기)** — the same hero region rewords itself as "here's what KISA ships to the public," and a vertical list of the user-facing surfaces takes the place of the admin grid. There is no route change; the URL stays at `/admin`. This mode is transient — refreshing returns to default mode.

#### Default mode content

- **Hero** — a personal Korean greeting (`안녕하세요, {firstName}님` style — exact phrasing locked at impl) plus a one-line subtitle that frames the page as "your admin home." A small inline link below the subtitle reads roughly "둘러보기 →" and triggers the mode switch to apps mode.
- **Tool cards (5 total)** — each card is a launch surface for one admin tool. Three are live and link out:
  - `Pocha Manage` → `/admin/pocha/manage` (event setup: pochas, menus)
  - `Pocha Dashboard` → `/admin/pocha/dashboard` (live operations during an active pocha)
  - `Pocha History / Data analytics` → `/admin/pocha/history` (past-event lookup; copy forward-named "Data analytics" even though v1 content is the existing list)
  - Two "coming soon" cards — `Website CMS` and `RSVP CMS`. These are non-interactive placeholders: dimmed appearance, "coming soon" badge, no link, no hover affordance suggesting action. They communicate roadmap honestly.
- **Card click side-effect** — before navigating, the live cards set `sessionStorage.kisa.admin.fromHub = "1"`. (Lane 5.3 reads this. The hub itself never cares whether the flag is set.)

#### Apps mode content

- **Hero rewrites entirely** — title and subtitle both change (e.g., from a personal greeting to "KISA가 운영하는 서비스"-style framing). The inline link reads "← 관리자로 돌아가기" and toggles back to default mode.
- **Apps list (3 items, vertical)** — the three public-facing KISA surfaces, one row each, with a name, a one-line description in Korean, and the route they live at:
  - 공식 홈페이지 → `/`
  - Jobs Curator → `/jobs`
  - 포차 앱 → `/pocha`
- The list reads as a guided "pick a destination" view, not as a second tool grid. Apps row click navigates the user there (regular `<a>` / `Link`).

#### States and behavior

- **Loading state** — while `useAdmin()` resolves, the hub renders nothing or a quiet skeleton; the layout gate (Lane 5.1) handles the not-authorized path. The hub itself assumes admin once it mounts.
- **Mode switch transition** — crossfade ~250ms when both modes swap in/out of the same region. Honor `prefers-reduced-motion: reduce` → instant swap, no fade.
- **No URL state** — the mode is pure component state (`useState`). Do not write `?view=apps`, do not introduce a sub-route.
- **Empty / error** — there are no async data sources on this page; admin status comes from the layout gate.

#### Audience and viewport

Desktop + tablet only — admin app is desktop-first per HARNESS. No mobile redesign.

### Pastiche brief

- **Decisions to lock in pastiche grill or impl**: hero copy (greeting + subtitle wording in both modes); inline link copy in both directions; tool card icon set; "coming soon" badge style; apps list row copy + icons; crossfade duration confirm (~250ms baseline); card grid composition (true 2×3 vs 1×4+1, etc.) — pastiche owns these.
- **Pass-through context**: visual reference is `reference-incident-io.png` in the audit folder; KISA hub is **brand-neutral**, not orange-accented; 5 cards (not 5+1).

### Tasks

- [ ] Worktree off `origin/dev`
- [ ] Invoke `pastiche` skill with this lane's spec + the visual reference
- [ ] Triage `// pastiche-unresolved-doubt:` markers (block before merge per Mode D workflow)
- [ ] Triage `## Follow-ups`
- [ ] `pnpm typecheck` (DS) — n/a; `npm run typecheck` + `npm run build` (client) pass
- [ ] Suggest `vercel-react-best-practices` + `review-ui-on-browser` to the user post-pastiche (UI lane, REDESIGN)
- [ ] Manual smoke at desktop + tablet: hub renders; clicking a live card sets sessionStorage and navigates; clicking the inline link crossfades to apps mode without URL change; reload returns to default; clicking back-link in apps mode crossfades back; reduced-motion media query swaps modes instantly

### Acceptance criteria

- [ ] `/admin` renders the hub; admin gate works (non-admin sees not-authorized via layout)
- [ ] Default mode shows hero + 5 cards (3 live + 2 coming-soon)
- [ ] Live cards set `sessionStorage.kisa.admin.fromHub = "1"` before navigating
- [ ] Coming-soon cards are visually distinct and non-interactive
- [ ] Inline link triggers crossfade (~250ms) to apps mode in place; URL unchanged
- [ ] Apps mode shows rewritten hero + 3-row vertical list of user-facing apps; back-link returns to default mode
- [ ] `prefers-reduced-motion: reduce` → instant swap, no animation
- [ ] No pastiche-unresolved-doubt markers remain
- [ ] `npm run build` + `npm run typecheck` pass

### Non-goals

- Real-state-driven card highlight ("Dashboard lights up when a pocha is running") — explicitly deferred per audit Q9
- Sub-routes for apps mode — explicitly rejected per audit Q5a
- Sidebar nav, top-bar shell, breadcrumbs — explicitly rejected per audit Q3, Q6
- Mobile redesign — out of scope

### Bailout triggers

- Pastiche cannot resolve a DS gap for the asymmetric hero+cards composition — file `ds-fix-during-migration` mid-phase, do not invent ad-hoc utility classes
- "Coming soon" badge has no clean DS atom — `needs-decision` (likely a `Badge` variant)
- Crossfade transition causes layout shift / scrollbar pop — fix with reserved height on the swap container; don't ship with pop

### Budget

~90 min (UI redesign with pastiche)

### Expected diff summary

~5 files new, ~300 LoC. If diff exceeds 600 LoC, self-verify before merge.

---

## Lane 5.3 — BackToHubFAB component + integration

**Repo:** `KISA-website-client`
**Mode:** `needs-interactive` (Mode D — worktree off `dev`, direct-push)
**Scope:** [REDESIGN] · execution skill: `pastiche`

### Files

- New: `src/components/layout/admin/BackToHubFAB.tsx`
- Modify: `src/app/admin/layout.tsx` — mount the FAB

### Scope (descriptive — pastiche resolves DS surface)

`BackToHubFAB` is the **single navigation affordance back to `/admin`** from any admin sub-page. It exists because the audit rejected sidebars and shell top-bars (Q3, Q6) — the hub-and-spoke pattern relies on this one button to close the loop.

#### When it appears

- **Mounted in `/admin/layout.tsx`** so it sits over every admin route.
- On mount, it reads `sessionStorage.kisa.admin.fromHub`. If absent, the FAB **does not render** at all (deep-linked admin page → no FAB; the user reached this page directly, not via the hub, so a "back to hub" CTA would be wrong).
- If present, the FAB renders. The flag persists for the session so reloads keep the FAB visible.

#### Visual states

- **Expanded (default for most routes)** — a pill-shaped floating element in the bottom-left of the viewport, showing an icon + a short Korean label (e.g., `← 관리자 홈` — final copy locked at impl). On hover/focus the pill stays expanded; the expanded form is the resting state.
- **Collapsed (default for the dashboard route)** — the same pill collapses to icon-only on its resting state, and expands to icon+label on hover/focus. This honors the "no chrome during live ops" principle and avoids colliding with the dashboard's `sticky bottom-4` bulk-promote action bar.
- **Shrunk (user-triggered, restorable)** — a small "shrink" affordance on the pill (e.g., × or a chevron) collapses the FAB into a thin **edge-tab** stuck to the left edge of the viewport. The edge-tab is a small protruding sliver that re-expands the FAB on click. Shrunk state is **never punitive** — it always remains restorable for the rest of the session.
- **Reduced-motion** — any expand/collapse animation respects `prefers-reduced-motion: reduce` (instant transition).

#### Behavior

- Click on the expanded pill (or the icon-only collapsed pill) navigates to `/admin`.
- Click on the shrink affordance toggles to edge-tab; click on the edge-tab restores the expanded/collapsed pill.
- Clicking the FAB navigates the user back to the hub. Per audit Q6a, the `kisa.admin.fromHub` flag should be **cleared** when the user actively returns to the hub via the FAB (the flag's job is "did this session enter via the hub" — once the user goes back, the next sub-page visit is a fresh decision).
- The flag is also cleared on tab close (sessionStorage default behavior — no extra code needed).

#### Per-route configuration

`BackToHubFAB` accepts a `defaultCollapsed` prop. The layout decides per-route which value to pass (e.g., `true` on the dashboard route, `false` elsewhere). The FAB itself does not contain route-name conditionals — it stays a dumb visual primitive driven by props.

#### States and edge cases

- **Tab duplication corner case** (audit risk #3): a duplicated tab inherits sessionStorage, so the FAB will appear in the duplicate even though the user didn't navigate from the hub *in that tab*. This is acceptable — flag in JSDoc, do not over-engineer.
- **Z-index** — must sit above page content but below toasts and modals.
- **Safe-area-inset** — no mobile gating needed (admin is desktop-first), but the bottom offset should still respect any future wrapper that uses `env(safe-area-inset-bottom)`.

#### Audience and viewport

Desktop + tablet only. No mobile.

### Pastiche brief

- **Decisions to lock**: exact pill copy (`← 관리자 홈` vs alternatives); icon choice; collapsed icon-only minimum size; edge-tab visual (sliver vs chevron protrusion); animation timing for expand/collapse and pill ↔ edge-tab transitions; bottom-left offset (e.g., 16px vs more).
- **Pass-through context**: this is the *only* nav back to the hub from sub-pages — no top-bar, no sidebar exists.

### Tasks

- [ ] Worktree off `origin/dev`
- [ ] Invoke `pastiche` skill with this lane's spec
- [ ] Wire into `/admin/layout.tsx` with route-aware `defaultCollapsed` (dashboard `true`, others `false`)
- [ ] Triage `// pastiche-unresolved-doubt:` markers
- [ ] Triage `## Follow-ups`
- [ ] `npm run typecheck` + `npm run build` pass
- [ ] Suggest `vercel-react-best-practices` + `review-ui-on-browser` to the user post-pastiche
- [ ] Manual smoke matrix:
  - Deep-link to `/admin/pocha/manage` (no sessionStorage flag) → no FAB
  - Click `Pocha Manage` card from `/admin` → land on manage with FAB visible (expanded) → click → return to hub
  - Click `Pocha Dashboard` card → land on dashboard with FAB **collapsed** (icon-only) by default; hover expands; click navigates back
  - Shrink FAB on any admin page → edge-tab visible; click edge-tab → FAB restores
  - Reload page with flag set → FAB still visible
  - Close tab and reopen via direct URL → no FAB

### Acceptance criteria

- [ ] FAB renders only when `sessionStorage.kisa.admin.fromHub === "1"`
- [ ] FAB navigates to `/admin` on click
- [ ] `defaultCollapsed={true}` on dashboard route, `false` on manage/history
- [ ] Shrink/restore (edge-tab) cycle works and persists for the session
- [ ] FAB clears the `kisa.admin.fromHub` flag when user returns to hub via FAB
- [ ] `prefers-reduced-motion: reduce` → instant transitions
- [ ] No collision with dashboard's bulk-promote action bar (collapsed default)
- [ ] No pastiche-unresolved-doubt markers remain
- [ ] JSDoc on the FAB component documents the dashboard-collision contract and the tab-duplication corner case

### Non-goals

- Mobile / responsive behavior — out of scope (admin is desktop-first)
- Generalizing the FAB into a reusable DS atom — KISA-specific use; keep in `components/layout/admin/`
- Adding route-name conditionals inside the FAB — keep it driven by props
- Breadcrumbs, top-bar, sidebar — explicitly rejected

### Bailout triggers

- Pastiche cannot resolve the pill ↔ edge-tab transition without a custom DS gap — file `ds-fix-during-migration`, don't invent
- Z-index conflicts with an existing global overlay (toast, modal) — `needs-decision`
- Dashboard's bulk-promote action bar has shifted position since audit and `defaultCollapsed={true}` no longer prevents collision — `needs-decision`

### Budget

~90 min

### Expected diff summary

~3 files, ~200 LoC.

---

## Lane 5.4 — `/admin/pocha/history` DS polish migration

**Repo:** `KISA-website-client`
**Mode:** `autonomous-ready` (cron routine eligible)
**Scope:** [POLISH][NO-TDD] · execution skill: `/executing-plans`

### Files

- Modify: `src/app/admin/pocha/history/page.tsx` — DS polish migration

### Locked spec

The page is the existing split-pane (`PreviousPochaList` left, `OrderHistoryTable` right when a pocha is selected, empty state otherwise). Lane 5.4 does **not** redesign content. Specific changes:

- **Drop the `useAdmin()` block entirely** — gate is in `/admin/layout.tsx` after Lane 5.1. The page should not call `useAdmin()` and should not render `LoadingSpinner` / `NotAuthorized`.
- **Drop the unused `OrderDashboard` import** — currently imported (line ~12 in the pre-5.1 file) but never rendered. Dead code.
- **Replace `sejongHospitalBold` font usage** — the page currently uses `sejongHospitalBold.className` on `h1` and `h2`. Replace with DS `type-h1` (page heading: "포차 주문 기록") and `type-h2` (selected-pocha title); remove the `sejongHospitalBold` import. Per `feedback_only_type_tokens` — pick a type-* token and stop; raise a DS gap if the right token is missing.
- **Wrap page content in DS `Container`** — currently uses `section className='px-2 max-w-screen-2xl mx-auto mb-10'`. Replace the manual composition with a DS `Container`. Per `feedback` precedent (Lane 0.5.6 site-wide swap), the DS Container is the correct shell.
- **Preserve the split-pane layout** — `flex gap-6` with `basis-1/3` / `basis-2/3` is fine to keep as-is or swap to DS spacing tokens via pastiche-equivalent judgment, but **do not change the split ratio** and **do not introduce KPI cards, drill-in routes, or new analytics**.
- **Identity chrome (UserInfo + LoginButton) stays** — same pattern as the other admin pages.
- **Small UX fixes only** — gap consistency, header/identity-chrome alignment if obviously off. Reviewer note: *no new features*.

### Tasks

- [ ] Worktree off `origin/dev` (or branch off `dev` per autonomous routine convention)
- [ ] Drop the `useAdmin` block (the import line, the `adminStatus === 'loading'` early return, the `!isAdmin` early return, the `isAdmin`/`token`/`adminStatus` destructure)
- [ ] Remove the `OrderDashboard` import line
- [ ] Remove the `LoadingSpinner`, `NotAuthorized` imports (no longer used)
- [ ] Remove the `sejongHospitalBold` import
- [ ] Replace `<h1 className={\`${sejongHospitalBold.className} text-3xl\`}>` with DS `type-h1` equivalent
- [ ] Replace `<h2 className={\`${sejongHospitalBold.className} text-2xl mb-2\`}>` with DS `type-h2` equivalent
- [ ] Wrap content in DS `Container`; remove the manual `section className='px-2 max-w-screen-2xl mx-auto mb-10'` composition
- [ ] `npm run build` + `npm run typecheck` + `npm test` pass
- [ ] Run `ds-client-review` agent on the changed file
- [ ] Manual smoke (mock mode, admin user): `/admin/pocha/history` renders; left pane lists previous pochas; selecting one renders the right pane with PreviousPocha title + OrderHistoryTable

### Acceptance criteria

- [ ] No `useAdmin`, `LoadingSpinner`, `NotAuthorized`, `OrderDashboard`, or `sejongHospitalBold` imports remain in the file
- [ ] Page heading uses DS type-* token; selected-pocha title uses DS type-* token
- [ ] DS `Container` wraps content; no manual `max-w-screen-2xl mx-auto` composition remains
- [ ] PreviousPochaList + OrderHistoryTable behavior unchanged
- [ ] No new components, routes, or analytics
- [ ] `npm run build` + `npm run typecheck` + `npm test` pass
- [ ] `ds-client-review` agent passes

### Non-goals

- KPI strip, charts, drill-in routes, cross-pocha analytics — explicitly out of scope per audit Q7
- Touching `PreviousPochaList` or `OrderHistoryTable` internals
- Touching the dashboard's History sub-tab (different scope per audit Q8)
- Mobile redesign

### Bailout triggers

- DS lacks a clean `type-*` token for the page heading or section heading — file `ds-fix-during-migration` and bail to `needs-decision`; do not use arbitrary `text-[Xrem]` per `feedback_only_type_tokens`
- DS `Container` API doesn't fit the split-pane layout cleanly (e.g., padding clashes with the inner `flex gap-6` rhythm) — `needs-decision`
- The page references something audit didn't catch (e.g., a hidden modal portal) — `needs-decision`

### Budget

~30 min

### Expected diff summary

~1 file, ~30 LoC net (mostly removals). If diff exceeds 100 LoC, self-verify — likely scope creep.

---

## Lane 5.5 — Audit-after redesign pass

**Repo:** `KISA-website-client`
**Mode:** `needs-interactive`

### Scope

Manual visual/UX walkthrough across all four admin routes at desktop (1280px primary) + tablet (768px). Use `review-ui-on-browser` skill via Playwright CLI on the devtunnels URL (never localhost).

#### Coverage

- **`/admin` (hub)**:
  - Default mode renders: hero + 5 cards (3 live + 2 coming-soon)
  - Inline link triggers crossfade to apps mode; URL stays `/admin`
  - Apps mode renders rewritten hero + 3-row vertical list
  - Back-link returns to default mode
  - `prefers-reduced-motion: reduce` → instant swap (toggle in browser devtools)
- **`/admin/pocha/manage`**:
  - Page renders unchanged from Phase 2
  - Identity chrome unchanged
  - FAB visible (expanded) when entered via hub card; click → returns to `/admin`
  - FAB absent when deep-linked
- **`/admin/pocha/dashboard`**:
  - Page renders unchanged from Phase 3
  - Identity chrome unchanged
  - FAB visible **collapsed** when entered via hub card; hover expands; click → returns to `/admin`
  - No collision with bulk-promote `sticky bottom-4` action bar
- **`/admin/pocha/history`**:
  - Lane 5.4 polish applied: type-* tokens, Container, no dead imports, no `useAdmin` block
  - Split-pane behavior unchanged
- **Redirects**: `/pocha/manage`, `/pocha/dashboard`, `/pocha/history` all 308 → `/admin/pocha/...`
- **Auth gate**: log out, visit each `/admin/*` route → not-authorized via layout; loading state has no spinner flash
- **FAB shrink/restore**: shrink to edge-tab on each route; restore from edge-tab; verify session-persistence across reload

Fix on the same branch any drift caught (typography, spacing, copy).

### Tasks

- [ ] Spin up dev server (devtunnels URL — never localhost)
- [ ] Run `review-ui-on-browser` per coverage list
- [ ] Capture findings in `docs/plans/client-migration/phase-5-admin-pocha/review-5.5-findings.md`
- [ ] Apply fixes; commit + push (Mode D — direct push, no PR)

### Acceptance criteria

- [ ] All coverage items reviewed; findings file checked in
- [ ] No outstanding visual / UX drift on the four admin routes at desktop + tablet
- [ ] FAB state matrix verified across the matrix above
- [ ] `npm run build` + `npm run typecheck` pass

### Non-goals

- Mobile coverage (admin is desktop-first)
- Cross-browser (Chrome only acceptable for this pass)
- Redesigning anything caught — small drift fixes only; new features bail to a follow-up

---

## Lane 5.6 — Verify + end-bump

**Repo:** `KISA-website-client` + `umichkisa-ds` (if any DS fixes accumulated)
**Mode:** `needs-interactive`

### Tasks

- [ ] Both repos: `pnpm build` + `pnpm typecheck` (DS) / `npm run build` + `npm run typecheck` + `npm test` (client) all green
- [ ] Manual happy-path smoke: log in as admin → land on `/admin` → click `Pocha Manage` card → return via FAB → click `Pocha Dashboard` card → confirm FAB shrunk by default → expand FAB → return → click `Pocha History` card → return → toggle to apps mode → click `포차 앱` → land on `/pocha`
- [ ] Verify old URLs redirect: visit `/pocha/manage`, `/pocha/dashboard`, `/pocha/history` and confirm 308 → new URL
- [ ] Check `docs/plans/client-migration/ds-fixes-log.md` for Phase 5 entries
- [ ] If entries exist: invoke `ds-phase-end-bump` (always patch per `feedback_ds_bump_semver`)
- [ ] If no entries: skip end-bump, document `"no end-bump needed — all DS fixes mid-phase shipped"` (or `"no DS fixes this phase"`) in TODO entry per Phase 1/2/3/4 precedent
- [ ] Tick Phase 5.6 + parent Phase 5 in `docs/TODO.md`

### Acceptance criteria

- [ ] Both repos green
- [ ] DS version pinned correctly in client `package.json` (latest mid-phase patch, or unchanged if no fixes)
- [ ] TODO.md ticks reflect lane completion

### Non-goals

- Phase 6 kickoff
- Real backend integration testing (everything is mock-mode admin)

---

## Open items deferred to execution

Carried forward from `audit.md`:

- **5.1**: confirm `next.config.js` redirect status code at impl time (locked here as `permanent: true` / 308)
- **5.1**: search beyond `src/` — check `public/`, `tests/`, README, MSW fixtures for hardcoded admin URL refs (pre-checked 2026-05-04 — confirmed no hits beyond what's listed)
- **5.2**: hero copy final lock (greeting + subtitle in default and apps modes)
- **5.2**: card icon set; coming-soon badge style
- **5.2**: crossfade duration tune (~250ms baseline)
- **5.2**: apps list copy + icons
- **5.3**: FAB exact bottom-left offset; z-index value
- **5.3**: FAB pill expanded copy
- **5.3**: edge-tab visual choice
- **5.4**: small UX fixes scope — no new analytics, no KPI cards, no layout shape changes
- **5.5** deliverable: review file path created at execution — `review-5.5-findings.md`

### Follow-up candidates (post-Phase-5)

- **Real-state-driven hub card highlight** — "Dashboard lights up when a pocha is running" (audit risk Q9 deferred)
- **Theme-wiring strategy** for `/admin` (currently zero seasonal themes apply; if added later, follow Phase 4's deferred theme-wiring lane)
- **Future admin tenants** — Website CMS, RSVP CMS implementations replace the "coming soon" cards
