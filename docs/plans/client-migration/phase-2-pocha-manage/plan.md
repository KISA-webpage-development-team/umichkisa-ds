# Phase 2 — pocha-manage (Plan)

> Lanes from this plan become GitHub issues executed per `docs/plans/client-migration/AUTONOMOUS_PROTOCOL.md`. Most lanes file in the **client repo** (`KISA-webpage-development-team/KISA-website-client`); lane 2.4 (new DS component) files in the **DS repo** (`umichkisa-ds`). Labels, bailout triggers, budgets, and non-goals live on the issues — implementation only below. Source of truth: `./audit.md`.

**Scope:** Migrate `pocha-manage` (`/pocha/manage`) — admin-only pop-up bar management — from pre-DS client code into DS-tokenized, DS-componentized, idiomatic implementation. First phase to stress-test `@umichkisa-ds/form`; ships the first DS `FileUpload` component. Heavy redesign where existing UX diverges from DS norms. Preserve: admin workflow (create pocha → add menu items with images → submit), Cloudinary orphan-cleanup semantics, Korean copy.

---

## Wave / Dependency Structure

```
Wave A — infra (partly parallel)
  2.0  Admin gate restoration                        (interactive)
        │
        ├──► 2.1  MSW pocha CRUD handlers            (autonomous, TDD)
        ├──► 2.2  MSW menu CRUD handlers             (autonomous, TDD)
        └──► 2.3  MSW admin + authContext toggle     (interactive, TDD)
                                     │
                                     ▼
                     (MSW infra complete → presentation wave enabled)

Wave A' — DS FileUpload detour (DS repo)
  2.4   DS FileUpload component                      (interactive, TDD)
        │
        ▼
  2.4b  Mid-phase patch bump (DS @ X.Y.Z → X.Y.Z+1)  (interactive, publish)

Wave B — presentation (parallel, post-MSW)
  2.5   PreviousPochaList → SWR                      (autonomous)
  2.6   PreviousPochaSummary fix N+1 + redesign      (interactive)
  2.7   PreviousPochaList redesign       (blocked-by 2.6)
  2.8   PochaManagePageHeader redesign              (autonomous)
  2.9   PochaSummary redesign                        (autonomous)
  2.10  PochaInfoFields → @umichkisa-ds/form         (autonomous)
  2.11  PochaForm orchestration      (blocked-by 2.10) (interactive)
  2.12  PochaMenuFields redesign                     (autonomous)
  2.13  PochaMenuItemList redesign + delete Dialog   (autonomous)

Wave C — menu-item form (serial)
  2.14  MenuItemForm shell → DS Dialog  (blocked-by 2.13)  (autonomous)
        │
  2.15  MenuItemForm fields → @umichkisa-ds/form
          (blocked-by 2.14, 2.4b)                    (autonomous)
        │
  2.16  MenuItemForm FileUpload integration
          (blocked-by 2.15, 2.4b)                    (interactive)

Wave D — close-out
  2.17  Page shell + legacy ui swap
          (blocked-by 2.5–2.16)                      (interactive)
        │
  2.19  Audit-after redesign pass                    (interactive)
        │
  2.18  Verify + end-bump                            (interactive)
```

**Critical path:** 2.0 → {2.1/2.2/2.3} → 2.4 → 2.4b → 2.13 → 2.14 → 2.15 → 2.16 → 2.17 → 2.19 → 2.18 ≈ 11 serial lanes. Wave B can run up to ~7 concurrent once MSW is in.

**Dependency edges** (→ means "must merge before"):

- `2.0 → 2.1, 2.2, 2.3` (admin gate closes the security hole before anyone touches manage code visibly)
- `2.1, 2.2 → all Wave B lanes` (presentation lanes need MSW to smoke-test)
- `2.3 → 2.5 onward` (any lane that wants to see the admin-gated view behind the toggle)
- `2.4 → 2.4b → 2.15, 2.16` (consuming lanes need published DS version with `FileUpload`)
- `2.6 → 2.7` (`PreviousPochaList` redesign composes the redesigned summary card)
- `2.10 → 2.11` (PochaForm orchestration rewires fields migrated in 2.10)
- `2.13 → 2.14` (MenuItemForm modal shell replaces the bespoke overlay used by the list's edit flow)
- `2.14 → 2.15 → 2.16` (serial within MenuItemForm — modal shell, then fields, then FileUpload)
- `2.5–2.16 → 2.17` (page shell composes the migrated components; legacy ui swap is last touch per lane)
- `2.17 → 2.19 → 2.18` (review + publish last)

---

## Label Disposition (6-Rule Gate)

Applied per `AUTONOMOUS_PROTOCOL.md` §4. Drives `autonomous-ready` vs `needs-interactive` at issue creation.

| Lane | Tag | Disposition | Rationale |
|---|---|---|---|
| 2.0 | [MECHANICAL][NO-TDD] | `needs-interactive` | Touches auth gate (rule 5-adjacent); 5-second one-liner, live smoke easier than spec |
| 2.1 | [MECHANICAL][TDD] | `autonomous-ready` | New MSW handler file; tests pre-specified below; no app code touched |
| 2.2 | [MECHANICAL][TDD] | `autonomous-ready` | Same as 2.1; scope is fully MSW-local |
| 2.3 | [POLISH][TDD] | `needs-interactive` | Modifies `authContext.tsx` (rule 5 — auth flow logic); UX decision on switch layout |
| 2.4 | [REDESIGN][TDD] | `needs-interactive` | Rule 1 fails (REDESIGN — new DS component); needs grill on behavior axes |
| 2.4b | n/a | `needs-interactive` | Publishes to npm (rule 5 denies `npm publish` for autonomous); interactive always |
| 2.5 | [MECHANICAL][NO-TDD] | `autonomous-ready` | Behavior-preserving: `useEffect`+state → `useSWR`; no UI change |
| 2.6 | [REDESIGN][NO-TDD] | `needs-interactive` | Rule 1 fails (REDESIGN); N+1 fix decision (drop menu-preview line) + tokens |
| 2.7 | [POLISH][NO-TDD] | `autonomous-ready` | Section header + list container retokenize; concrete |
| 2.8 | [POLISH][NO-TDD] | `autonomous-ready` | `sejongHospitalBold` → `type-h1`; tokens; single file |
| 2.9 | [POLISH][NO-TDD] | `autonomous-ready` | DS `Card` + tokens + typography; toggle button swap |
| 2.10 | [POLISH][NO-TDD] | `autonomous-ready` | `CustomField` → `@umichkisa-ds/form` primitives; concrete per-field mapping below |
| 2.11 | [POLISH][NO-TDD] | `needs-interactive` | Orchestration decisions (toast wiring, `mutate()` cache keys, submit flow); integration moment |
| 2.12 | [POLISH][NO-TDD] | `autonomous-ready` | Section header + empty-state `Alert` + add-button tokens |
| 2.13 | [POLISH][NO-TDD] | `autonomous-ready` | DS `Card` items + icon buttons; `window.confirm` → DS `Dialog` |
| 2.14 | [POLISH][NO-TDD] | `autonomous-ready` | Bespoke overlay → DS `Dialog`; scope is shell-only, fields stay |
| 2.15 | [POLISH][NO-TDD] | `autonomous-ready` | Field migration concrete per mapping below; duplicate-check → inline `Alert` |
| 2.16 | [POLISH][NO-TDD] | `needs-interactive` | Cloudinary orphan-cleanup preservation is subtle; live verify |
| 2.17 | [MECHANICAL][NO-TDD] | `needs-interactive` | Integration moment — live review of all wiring |
| 2.19 | n/a | `needs-interactive` | Review pass; full-phase visual/UX diff |
| 2.18 | n/a | `needs-interactive` | Touches publish (`ds-phase-end-bump` if any DS fixes); final verify |

**Totals:** 10 autonomous-ready, 10 needs-interactive (including 2.4b).

---

## Lane 2.0 — Admin gate restoration

**Repo:** `KISA-website-client`
**Mode:** `needs-interactive` (security-adjacent one-liner)

### Files

- Modify: `src/app/(pocha)/pocha/manage/page.tsx`

### Tasks

- [ ] Uncomment lines 69–71 of `page.tsx` — restore `if (!isAdmin) { return <NotAuthorized />; }` gate
- [ ] Verify `useAdmin` returns `status === "success"` before `isAdmin` is evaluated (avoid flashing NotAuthorized on first render — currently `isLoading` covers `adminStatus === "loading"`)
- [ ] Smoke: logged-out → NotAuthorized; logged-in non-admin → NotAuthorized; logged-in admin → page renders
- [ ] `npm run build` + `npm run typecheck` pass

### Acceptance criteria

- [ ] Gate is active; non-admin cannot view manage page
- [ ] No loading flash of NotAuthorized during initial admin-check round-trip
- [ ] `npm run typecheck` passes

### Non-goals

- MSW admin handler (lane 2.3)
- Redesigning `NotAuthorized` (stays legacy until lane 2.17)

### Bailout triggers

- `useAdmin` loading-state semantics different from expected (e.g., `status` stays `"loading"` beyond the fetch) → `needs-decision`

---

## Lane 2.1 — MSW pocha CRUD handlers

**Repo:** `KISA-website-client`

### Files

- Create: `src/mocks/handlers/pocha.ts`
- Create: `src/mocks/fixtures/pocha.ts`
- Modify: `src/mocks/handlers/index.ts` — register `pochaHandlers`

### Tasks (TDD)

- [ ] **Tests first.** Write failing tests for handler behavior, confirm fail, implement to green.

#### Pre-specified test cases (per AUTONOMOUS_PROTOCOL §4 rule 4)

- [ ] `GET /pocha/status-info/?date=<ISO>` returns active pocha fixture when `date` is within fixture's window; empty object `{}` otherwise
- [ ] `GET /pocha/previous/?date=<ISO>` returns fixture list of 3–5 historical pochas, all with `endDate` before the queried date
- [ ] `POST /pocha/` with valid body returns `{ pochaID: <nextId>, message: "..." }`; appends to in-memory store
- [ ] `PUT /pocha/{id}/` with valid body for an existing pocha returns `{ pochaID: id, message: "..." }`; updates in-memory store
- [ ] `PUT /pocha/{id}/` for a non-existent pocha returns 404
- [ ] `POST /pocha/` without `Authorization: Bearer <token>` header returns 401

#### Fixtures

- [ ] Author ~3–5 synthetic `PochaInfoWithoutStatus` fixtures typed against `src/types/pocha`:
  - 1 active (window includes today)
  - 3–4 previous (endDate in recent past, varying titles/menus)
- [ ] Expose an in-memory store seeded from fixtures; POST/PUT mutate it so write-then-read round-trips work within a session

#### Handler registration

- [ ] Register `pochaHandlers` in `src/mocks/handlers/index.ts` alongside existing `jobsHandlers`
- [ ] `npm run build` + `npm run typecheck` + `npm test` pass

### Acceptance criteria

- [ ] All listed tests pass
- [ ] Handler file compiles; `index.ts` exports include `pochaHandlers`
- [ ] Manual smoke (dev with `NEXT_PUBLIC_MOCK_API=1`): `/pocha/manage` loads against fixtures; page shows no pocha active OR an active one based on fixture config
- [ ] No app code under `src/app/`, `src/features/`, `src/components/` touched

### Non-goals

- Menu CRUD (lane 2.2)
- Admin handler (lane 2.3)
- Dashboard/order/pay endpoints (deferred to Phase 3/4)

### Bailout triggers

- `PochaInfoWithoutStatus` type shape ambiguous vs handler response → `needs-decision`
- MSW in-memory store sharing between tests causes cross-test leakage → `needs-decision` (may need `setupHandlers` reset helper)

---

## Lane 2.2 — MSW menu CRUD handlers

**Repo:** `KISA-website-client`

### Files

- Modify: `src/mocks/handlers/pocha.ts` — extend with menu handlers
- Modify: `src/mocks/fixtures/pocha.ts` — add menu fixtures keyed by `pochaID`

### Tasks (TDD)

- [ ] **Tests first.**

#### Pre-specified test cases

- [ ] `GET /pocha/menu/{pochaID}/` with valid `Authorization` returns an array of `MenuByCategory` for that pochaID's fixture menu
- [ ] `GET /pocha/menu/{pochaID}/` for a pochaID without menu returns `[]`
- [ ] `GET /pocha/menu/{pochaID}/` without `Authorization` header returns 401
- [ ] Menus returned are correctly grouped by `category` and each category has a `menusList` array (matches `MenuByCategory` shape)

#### Fixtures

- [ ] Each previous-pocha fixture in `fixtures/pocha.ts` has an associated menu (5–10 items, spread across 2–3 categories); active pocha also has one
- [ ] Menu items typed against `MenuItemRaw` — include `menuID`, `nameKor`, `nameEng`, `category`, `price`, `stock`, `isImmediatePrep`, `ageCheckRequired`, `imageURL`

### Acceptance criteria

- [ ] All listed tests pass
- [ ] Handler compiled into `pochaHandlers` export
- [ ] Manual smoke: active pocha's menu fetches and displays in `PochaSummary`; previous pochas' menu-count is fetchable

### Non-goals

- Cart / order / payment endpoints (Phase 3/4)
- Mocking Cloudinary upload (stays against real `/api/upload-to-cloudinary` Next.js route — out of scope per audit)

### Bailout triggers

- `MenuByCategory` response shape ambiguous (nested vs flat) → `needs-decision`

---

## Lane 2.3 — MSW admin handler + authContext toggle extension

**Repo:** `KISA-website-client`
**Mode:** `needs-interactive` (auth context mod)

### Files

- Create: `src/mocks/handlers/auth.ts`
- Modify: `src/mocks/handlers/index.ts` — register `authHandlers`
- Modify: `src/mocks/authContext.tsx` — add `mockIsAdmin` state + second `Switch` + second `sessionStorage` key

### Tasks (TDD)

- [ ] **Tests first.**

#### Pre-specified test cases

- [ ] `GET /auth/isAdmin/{email}` with `Authorization: Bearer <token>` returns truthy when `mockIsAdmin` sessionStorage flag is `"1"`
- [ ] `GET /auth/isAdmin/{email}` returns falsy (or 401) when flag is `"0"` or missing
- [ ] `authContext.tsx`: `isAuthenticated=false` forces `isAdmin=false` (admin toggle disabled when logged-out)
- [ ] `authContext.tsx`: toggling `mockAuthed` off while `mockIsAdmin` was on clears `mockIsAdmin` sessionStorage

#### Implementation

- [ ] Admin handler responds based on a session-scoped signal readable from both browser (sessionStorage key `kisa-mock-auth-isadmin`) and MSW handler (same key via `sessionStorage.getItem` in handler body — MSW runs in-browser in dev/test)
- [ ] `authContext.tsx` adds `mockIsAdmin` state + `toggleIsAdmin` + persistence to `kisa-mock-auth-isadmin` with the same pattern as existing `mockAuthed` / `kisa-mock-auth-authenticated`
- [ ] `MockAuthToggle` component renders **two stacked `Switch`es**:
  - Top: "Mock: logged in" (existing, unchanged label text if different — match current copy)
  - Bottom: "Mock: admin" — **disabled + unchecked** when `isAuthenticated=false`
- [ ] Both toggles inside the same fixed-position container; stack vertically with `gap-2`; tokenized per DS (no raw classes beyond the existing container)
- [ ] `npm run build` + `npm run typecheck` + `npm test` pass

### Acceptance criteria

- [ ] All listed tests pass
- [ ] Toggling "Mock: admin" without being logged in is prevented (disabled switch)
- [ ] Logging out while admin was on clears the admin flag
- [ ] `useAdmin` returns `isAdmin=true` when admin toggle is on + logged in (against MSW handler)
- [ ] No regression to Phase 0.5 / Phase 1 pages that use `useMockAuth`

### Non-goals

- Switching `useAdmin` internals to consume the context directly (keep existing SWR-less fetch pattern; MSW mocks the endpoint)
- Real auth flow changes (this is mock-mode only, gated on `IS_MOCK_MODE`)

### Bailout triggers

- MSW handler cannot read `sessionStorage` cleanly from its handler body → `needs-decision` (fallback: pass flag via query-param on `getIsAdmin` call)
- DS `Switch` doesn't accept `disabled` prop → `needs-decision`

---

## Lane 2.4 — DS `FileUpload` component

**Repo:** `umichkisa-ds`
**Mode:** `needs-interactive` (new DS component — REDESIGN, requires grill)

### Files

- Create: `packages/web/src/components/form/FileUpload/FileUpload.tsx`
- Create: `packages/web/src/components/form/FileUpload/FileUpload.stories.tsx` (if Storybook present for the package — check at execution; else skip)
- Create: `packages/web/src/components/form/FileUpload/index.ts`
- Modify: `packages/web/src/index.ts` — export `FileUpload`
- Create: `apps/docs/app/components/file-upload/page.tsx` (docs page)
- Create: `apps/docs/app/components/file-upload/preview.tsx` (preview block)
- Modify: `apps/docs/app/layout.tsx` or navigation config — add sidebar entry

### Tasks (interactive — grill + TDD)

- [ ] **Grill-me first** on behavior axes (expected locked during grill, these are the axes):
  - Single-file only (this phase needs it) — confirm
  - Accepted MIME: `image/png`, `image/jpeg`, `image/webp` — confirm default
  - Max size: 5MB default (prop-overridable)
  - Preview shape: square 128×128, `object-cover`
  - Remove-while-uploading: disabled (cannot remove mid-upload)
  - Drag-and-drop: **deferred** — click-to-upload only
  - Error surface: inline DS `Alert` below preview
  - Upload contract: consumer provides `onUpload(file: File) => Promise<string>` returning URL; component manages internal `isUploading` state
  - Remove contract: consumer provides `onRemove(publicId: string) => Promise<void>`; component calls on user "Remove" click, shows pending state
  - Loading state: shows DS `LoadingSpinner` overlay on preview
- [ ] TDD: write tests against the locked API first
  - Clicking "Remove" with a pending upload is a no-op (disabled button)
  - Selecting a file calls `onUpload`; on success, preview shows returned URL
  - On `onUpload` rejection, surfaces error text from rejection message or generic fallback
  - Oversized file (>maxSize) surfaces size error before calling `onUpload`
  - Wrong MIME type surfaces type error before calling `onUpload`
- [ ] Implement using DS tokens only — `Button`, `LoadingSpinner`, `Alert`, `Input` (as hidden `<input type="file">` trigger)
- [ ] Docs page follows existing DS docs conventions (per `feedback_api_table_mobile_list`, `feedback_intro_foreground`, `feedback_blockquote_to_alert`, etc.)
- [ ] `pnpm build` + `pnpm typecheck` in DS repo pass
- [ ] Pass `ds-review` agent

### Acceptance criteria

- [ ] All listed tests pass
- [ ] Component exported from `@umichkisa-ds/web`
- [ ] Docs page live at `/components/file-upload` with Preview + API table + mobile list
- [ ] DS constraint review passes (no raw utility classes, tokens throughout)
- [ ] Sejong used only for display (per `feedback_sejong_display_only`) — component itself uses Pretendard

### Non-goals

- Multi-file uploads (deferred to future enhancement)
- Drag-and-drop (deferred)
- Cropping / image manipulation
- Progress percentage display (just indeterminate spinner)

### Bailout triggers

- Grill-me surfaces a behavior axis that fundamentally changes the API (e.g., multi-file required now) → re-scope
- DS `Alert` doesn't accept compact inline variant → may need DS fix during migration

---

## Lane 2.4b — Mid-phase bump (DS FileUpload → client)

**Repo:** `umichkisa-ds` (publish) + `KISA-website-client` (pin)
**Mode:** `needs-interactive` (publish is hard-denied for autonomous per §9)

### Tasks

- [ ] Confirm lane 2.4 merged to DS `main`; `FileUpload` exported from `packages/web/src/index.ts`
- [ ] Invoke `ds-phase-end-bump` skill (same skill, mid-phase invocation per §14c)
- [ ] Patch-bump `@umichkisa-ds/web` (mid-phase bumps are always patch)
- [ ] Append entry to `docs/plans/client-migration/ds-fixes-log.md` with "mid-phase" marker
- [ ] Tag + push → GitHub Actions publishes
- [ ] Update `KISA-website/client/package.json` pin; `npm install`; commit + open PR titled `chore(deps): bump @umichkisa-ds/web to X.Y.Z (mid-phase pre-consume for lane 2.15/2.16)`

### Acceptance criteria

- [ ] npm shows new version published
- [ ] Client lockfile pins new version; `npm run typecheck` in client passes with new DS
- [ ] `FileUpload` importable from `@umichkisa-ds/web` in client
- [ ] PR merged to client `dev`

### Depends on

- **Lane 2.4 merged to DS `main`**

---

## Lane 2.5 — `PreviousPochaList` → SWR

**Repo:** `KISA-website-client`

### Files

- Modify: `src/features/pocha/components/manage/PreviousPochaList.tsx`

### Tasks

- [ ] Replace `useEffect` + `useState(status/list/error)` block (lines 20–41) with `useSWR(['/pocha/previous/', date], fetcher)` using `@/lib/swr/fetchers` (match Phase 1 SWR patterns)
- [ ] Preserve error/loading/empty branches; keep existing JSX
- [ ] Do NOT change visual output or props — this lane is data-layer only
- [ ] `npm run build` + `npm run typecheck` pass
- [ ] `ds-client-review` passes (should be no-op — no new DS imports)

### Acceptance criteria

- [ ] No `useState`/`useEffect` for fetch state in the file
- [ ] Loading/error/success/empty states equivalent to pre-migration behavior
- [ ] Manual smoke: list populates from MSW fixtures

### Non-goals

- Visual redesign (lane 2.7)
- Fixing N+1 in `PreviousPochaSummary` (lane 2.6)

### Bailout triggers

- `fetcherWithToken` vs plain `fetcher` — previous-pocha endpoint doesn't use token; use the token-less fetcher → if ambiguous, `needs-decision`

---

## Lane 2.6 — `PreviousPochaSummary` — fix N+1 + redesign

**Repo:** `KISA-website-client`
**Mode:** `needs-interactive` (REDESIGN)

### Files

- Modify: `src/features/pocha/components/manage/PreviosPochaSummary.tsx` (note typo in filename — do NOT rename in this lane)

### Tasks (interactive)

- [ ] **Drop the "메뉴: X, Y, Z" line** — remove the per-card `getPochaMenu` fetch entirely (lines 21–40). N+1 is eliminated at the source.
- [ ] Replace with a menu-count pill: `메뉴 {count}개` — count comes from `pochaInfo.menuCount` if BE provides it; else hardcode "메뉴" label without count, or drop entirely (decide live)
- [ ] Redesign card: DS `Card` + `CardHeader` + `CardContent`; tokenize all spacing/colors
- [ ] Typography: `sejongHospital*` → DS `type-*` tokens; `sejongHospitalBold` title → `type-h3` (+ `font-semibold` via `!font-semibold` if needed per `feedback_type_weight_override`)
- [ ] Date formatting: `toLocaleString('ko-KR')` OK, but move to tokenized typography (`type-body-sm text-muted-foreground`)
- [ ] Selection highlight (`isSelected`): use bg highlight + border tone change (no left-border accent per `feedback_no_left_border`)
- [ ] Remove `useState<any[]>` and its `useEffect`
- [ ] `npm run build` + `npm run typecheck` pass
- [ ] `ds-client-review` passes

### Acceptance criteria

- [ ] Zero references to `getPochaMenu` in the file
- [ ] Card renders cleanly for all fixtures without triggering N+1 network fan-out
- [ ] Selection state visually distinct without a left-border accent
- [ ] Live visual review passes on Vercel `dev` preview

### Non-goals

- Renaming the file (`PreviosPochaSummary` → `PreviousPochaSummary`) — deferred; renames ship separately to avoid import-churn conflicts with other lanes
- `PreviousPochaList` container (lane 2.7)

### Bailout triggers

- `PochaInfoWithoutStatus` doesn't include `menuCount` and adding it requires BE work → drop the count, keep a static "메뉴 보기" chip that's not wired (decide live); do not bail

---

## Lane 2.7 — `PreviousPochaList` redesign

**Repo:** `KISA-website-client`

### Files

- Modify: `src/features/pocha/components/manage/PreviousPochaList.tsx`

### Tasks

- [ ] Section header: `이전 포차 목록` → `type-h2` tokens (or `type-h3` if sibling sections use h3 — match surrounding hierarchy)
- [ ] List container: tokenized gap/padding; no raw `text-red-500` / `text-gray-500`
- [ ] Error branch: replace raw `<p className="text-red-500">…</p>` + `<p className="text-sm text-gray-500">…</p>` with DS `Alert variant="error"` (per `feedback_blockquote_to_alert`)
- [ ] Empty branch: replace `<p className="text-gray-500">이전 포차가 없습니다.</p>` with DS `Alert variant="info"` or `StatusView variant="empty"` — pick whichever matches Phase 1 precedent
- [ ] Keep `HorizontalDivider` usage OR swap to DS `Divider` if available — check at execution
- [ ] `npm run build` + `npm run typecheck` pass
- [ ] `ds-client-review` passes

### Acceptance criteria

- [ ] No raw `text-red-*`, `text-gray-*`, or `sejongHospital*` classes in file
- [ ] Error/empty states render via DS components
- [ ] Manual smoke: happy + empty + error paths (force error by MSW failure)

### Non-goals

- `PreviousPochaSummary` internals (lane 2.6)

### Depends on

- **Lane 2.6 must merge first** — this lane's list composes the redesigned summary card. Strict `blocked-by:<2.6 issue #>` edge.

### Bailout triggers

- Sibling sections' header hierarchy unclear → `needs-decision`

---

## Lane 2.8 — `PochaManagePageHeader` redesign

**Repo:** `KISA-website-client`

### Files

- Modify: `src/features/pocha/components/manage/PochaManagePageHeader.tsx`

### Tasks

- [ ] `sejongHospitalBold` + `text-3xl` on `<h1>포차 관리</h1>` → `type-h1` (Sejong is display-only per `feedback_sejong_display_only`; `type-h1` keeps the Sejong display face correctly)
- [ ] Retokenize container: `min-h-[4.5rem]` → `min-h-header` or DS spacing token if one exists; else keep but move to a tokenized constant
- [ ] `UserInfo` and `LoginButton` stay — they're shared header primitives owned by other phases; do NOT modify them
- [ ] `npm run build` + `npm run typecheck` pass
- [ ] `ds-client-review` passes

### Acceptance criteria

- [ ] No `sejongHospital*` class in file
- [ ] `<h1>` uses `type-h1`
- [ ] Visual parity with pre-migration at 375px + 1280px

### Non-goals

- `UserInfo` / `LoginButton` internals
- Login flow changes

---

## Lane 2.9 — `PochaSummary` redesign

**Repo:** `KISA-website-client`

### Files

- Modify: `src/features/pocha/components/manage/PochaSummary.tsx`

### Tasks

- [ ] Replace outer `<div>` styled with `bg-gray-100 p-4 rounded-lg hover:bg-gray-200` with DS `Card` + `CardHeader` + `CardContent`
- [ ] No custom padding on `Card` / `CardContent` (per `feedback_card_no_override`)
- [ ] Title (`text-xl` + `sejongHospitalBold`) → `type-h3` + `!font-semibold` (per `feedback_type_weight_override`)
- [ ] `(진행 중)` / `(진행 예정)` status → DS `Badge` variant-matched (e.g., `success` / `default`)
- [ ] Description + date + menu list spans: `sejongHospitalLight` → `type-body` + `text-muted-foreground` where de-emphasized
- [ ] `CustomButton` edit-toggle → DS `Button` (variant `outline` or `secondary`)
- [ ] `npm run build` + `npm run typecheck` pass
- [ ] `ds-client-review` passes

### Acceptance criteria

- [ ] No `sejongHospital*`, no raw grays/hover classes
- [ ] Card renders via DS `Card` primitives
- [ ] Edit toggle works identically to pre-migration (controlled by parent state)

### Non-goals

- `PochaForm` edit view content (lane 2.11)
- Fetch/SWR changes

### Bailout triggers

- DS `Badge` doesn't have a success variant matching "진행 중" tone → use `default` + note in PR

---

## Lane 2.10 — `PochaInfoFields` → `@umichkisa-ds/form`

**Repo:** `KISA-website-client`

### Files

- Modify: `src/features/pocha/components/manage/PochaInfoFields.tsx`
- (Read-only reference: `src/features/pocha/components/manage/PochaForm.tsx` — do NOT touch; lane 2.11 owns orchestration)

### Tasks

- [ ] Replace `CustomField` (from `@/deprecated-components/shared/CustomField`) with `@umichkisa-ds/form` primitives per type:
  - `type: "text"` → `FormInput` (type="text")
  - `type: "date"` → `FormDatePicker`
  - `type: "time"` → `FormInput type="time"` (**no DS TimePicker exists** — native time picker, tokenized via DS `Input`)
- [ ] Inline errors: `isError`/`errorMsg` → RHF native validation surfaced via DS `Alert variant="error"` inline under each field (per `feedback_intro_subparagraph_to_alert` pattern)
- [ ] **No zod** — use RHF native `rules` per field (required, minLength, validate callbacks per audit Q10)
- [ ] Labels: Korean text preserved; typography: `type-label` via `FormItem`
- [ ] This lane refactors `PochaInfoFields` to expect a named field registry (receives `control` from parent via `useFormContext`) — lane 2.11 will wire the actual RHF form; this lane's scope is the field components only
- [ ] `npm run build` + `npm run typecheck` pass
- [ ] `ds-client-review` passes

### Acceptance criteria

- [ ] Zero imports of `CustomField` or `@/deprecated-components/shared/*` in this file
- [ ] All 6 fields (title, description, startDate, startTime, endDate, endTime) render via DS form primitives
- [ ] Component compiles standalone; full integration happens in lane 2.11
- [ ] Korean error text renders cleanly at 375px (no truncation / weird wrap)

### Non-goals

- `PochaForm` submit/mutation rewiring (lane 2.11)
- Removing `CustomField` itself (owned by the deprecated-components folder; future cleanup)

### Bailout triggers

- `FormInput type="time"` doesn't render browser time picker correctly → fallback to `<input type="time">` wrapped in `FormItem` (acceptable, document in PR)
- RHF native `validate` insufficient for end-date > start-date cross-field check → note; lane 2.11 owns cross-field, this lane only sets up primitives

---

## Lane 2.11 — `PochaForm` orchestration

**Repo:** `KISA-website-client`
**Mode:** `needs-interactive` (orchestration + toast/SWR decisions)

### Files

- Modify: `src/features/pocha/components/manage/PochaForm.tsx`

### Tasks (interactive)

- [ ] Replace 6 `useState` + `useMemo` field array with a single `useForm` from `@umichkisa-ds/form`
  - Default values: `existingPochaInfo` (if present) decomposed via `separateDateAndTime`; else empty
  - Register fields: `title`, `description`, `startDate`, `startTime`, `endDate`, `endTime`
  - RHF rules: `required` on all; `validate` on `endDate` to ensure `combineDateAndTime(endDate, endTime) > combineDateAndTime(startDate, startTime)` (cross-field, per audit Open Items)
- [ ] Submit handler:
  - `window.alert(...)` success → DS `toast()` success (per `feedback_blockquote_to_alert` pattern, and `Toaster` mount — verify present in root layout; if not, note as DS fix candidate)
  - `window.alert(...)` failure → DS `toast()` error with original message
  - `window.location.reload()` → SWR `mutate()` on the relevant cache keys (`/pocha/status-info/...`, `/pocha/previous/...`, `/pocha/menu/...` for the active pocha's id)
- [ ] `isFormValid` replaced by RHF's `formState.isValid` / `formState.isSubmitting`
- [ ] Submit button `disabled={!isValid || isSubmitting}`; `CustomButton` → DS `Button` (`type="submit"`, variant-matched)
- [ ] Delete `sejongHospitalBold` import + usage (body context, per `feedback_sejong_display_only`)
- [ ] `HorizontalDivider` → DS `Divider` if available; else keep temporarily
- [ ] `npm run build` + `npm run typecheck` pass
- [ ] `ds-client-review` passes

### Acceptance criteria

- [ ] No `window.alert`, `window.confirm`, or `window.location.reload` calls in the file
- [ ] Create path: submit → toast success → list refreshes via `mutate()` → `PochaSummary` shows new pocha
- [ ] Update path: submit → toast success → summary reflects edits without a full reload
- [ ] Error path: submit fails (MSW `?_mockState=error` or 500) → toast error, form stays mounted with values
- [ ] Cross-field validation: end-datetime before start-datetime blocks submit with inline `Alert`

### Depends on

- **Lane 2.10 must merge first** — field primitives expected by orchestration. Strict `blocked-by:<2.10 issue #>` edge.

### Bailout triggers

- `Toaster` not mounted in client root layout → `needs-decision` (small DS-fix / mount task; decide if it becomes 2.11a or rolls into this lane)
- SWR cache keys differ from what `usePocha`/`useMenu`/`PreviousPochaList` use (mismatch causes stale data after `mutate()`) → `needs-decision`

---

## Lane 2.12 — `PochaMenuFields` redesign

**Repo:** `KISA-website-client`

### Files

- Modify: `src/features/pocha/components/manage/PochaMenuFields.tsx`

### Tasks

- [ ] Section header `메뉴` (`sejongHospitalBold text-xl`) → `type-h3` + `!font-semibold`
- [ ] Replace `ErrorDisplay text="최소 1개의 메뉴를 추가해주세요."` (from `@/deprecated-components/shared/ErrorDisplay`) with DS `Alert variant="warning"` or `info`
- [ ] `CustomButton text="추가하기"` → DS `Button` (variant `secondary` or `outline`)
- [ ] Retokenize spacing (`mb-4` → token scale if off-grid)
- [ ] `npm run build` + `npm run typecheck` pass
- [ ] `ds-client-review` passes

### Acceptance criteria

- [ ] No `sejongHospital*`, no `ErrorDisplay` import, no `CustomButton` import
- [ ] Empty-state message renders via DS `Alert`
- [ ] Add-button opens the menu-item form (behavior preserved)

### Non-goals

- `PochaMenuItemList` internals (lane 2.13)
- `PochaMenuItemForm` (lanes 2.14–2.16)

---

## Lane 2.13 — `PochaMenuItemList` redesign + delete Dialog

**Repo:** `KISA-website-client`

### Files

- Modify: `src/features/pocha/components/manage/PochaMenuItemList.tsx`

### Tasks

- [ ] Replace outer list-item `<div>` (`bg-gray-100 p-4 rounded-lg hover:bg-gray-200`) with DS `Card` + `CardContent`
- [ ] `CustomImageButton` edit/delete → DS icon-only `Button` (variant `ghost`, `size="icon"`); icons: `PencilIcon`/`TrashcanIcon` can map to DS equivalents (verify during execution — may already exist; if not, note as DS fix)
- [ ] `window.confirm(...)` → DS `Dialog` with "삭제" / "취소" buttons
  - Dialog title: `메뉴 삭제`
  - Body: `정말 ${nameKor}을(를) 삭제하시겠습니까?`
  - Confirm variant: `destructive`
- [ ] `sejongHospitalBold`/`sejongHospitalLight` body usage → `type-body` + weight utilities
- [ ] `npm run build` + `npm run typecheck` pass
- [ ] `ds-client-review` passes

### Acceptance criteria

- [ ] No `window.confirm`, no `CustomImageButton`, no `sejongHospital*`
- [ ] Delete confirmation renders via DS `Dialog`
- [ ] Edit flow still opens `PochaMenuItemForm` with `mode="update"` and `initialData`

### Non-goals

- `PochaMenuItemForm` itself (lanes 2.14–2.16)
- Uncommenting the image `<figure>` block (lines 47–54) — leave commented; lane 2.16 addresses image display after `FileUpload` integration

### Bailout triggers

- DS doesn't have a `Button size="icon"` variant → use `Button` with explicit padding token override (acceptable, note in PR)

---

## Lane 2.14 — `PochaMenuItemForm` modal shell → DS `Dialog`

**Repo:** `KISA-website-client`

### Files

- Modify: `src/features/pocha/components/manage/PochaMenuItemForm.tsx`

### Tasks

- [ ] Replace outer bespoke overlay (`<div className="fixed inset-0 z-[99999] bg-black/30">` + inner centered container, lines 319–335) with DS `Dialog` + `DialogContent` + `DialogHeader` + `DialogTitle`
- [ ] Map `closeItemForm` to Dialog's `onOpenChange={(open) => !open && handleCloseForm()}` — **preserve Cloudinary cleanup** (`handleCloseForm` must still fire on close, including backdrop click / ESC)
- [ ] Header title `메뉴 추가하기` (and `메뉴 수정하기` when `mode==="update"`) → `DialogTitle` with `type-h3`
- [ ] Close button (`PochaCloseIcon` in custom button) → DS `DialogClose` with `XIcon` (or equivalent)
- [ ] Preserve max-height/scroll inside `DialogContent` — DS `Dialog` may need `className` tweak for 90vh body scroll; use tokens
- [ ] **Keep fields as-is** (`CustomField`, raw `<input type="file">`) — this lane is shell-only; lanes 2.15/2.16 migrate fields
- [ ] Mobile dialog behavior (per audit risk #8): verify 375px renders full-height or centered cleanly — note in PR
- [ ] `npm run build` + `npm run typecheck` pass
- [ ] `ds-client-review` passes

### Acceptance criteria

- [ ] No `fixed inset-0 z-[99999]` bespoke overlay
- [ ] Dialog opens/closes; Cloudinary cleanup fires on all close paths (X button, backdrop, ESC)
- [ ] Mobile verified at 375px

### Depends on

- **Lane 2.13 must merge first** — list redesign's edit flow may affect how the modal is opened

### Non-goals

- Field migration (lane 2.15)
- FileUpload swap (lane 2.16)

### Bailout triggers

- DS `Dialog` doesn't support `onOpenChange` reliably with async cleanup → `needs-decision`

---

## Lane 2.15 — `PochaMenuItemForm` fields → `@umichkisa-ds/form`

**Repo:** `KISA-website-client`

### Files

- Modify: `src/features/pocha/components/manage/PochaMenuItemForm.tsx`

### Tasks

- [ ] Replace all `CustomField` usages (text/number/checkbox) with `@umichkisa-ds/form` primitives:
  - `textFields` (nameKor, nameEng, category) → `FormInput` × 3
  - `numberFields` (price, stock) → `FormInput type="number"` × 2
  - `checkboxFields` (isImmediatePrep, ageCheckRequired) → `FormCheckbox` × 2
- [ ] Replace the 7 `useState` calls + `useMemo` field arrays with a single `useForm` call
- [ ] Duplicate-check (`isDuplicate` helper) → RHF `validate` callback on `nameKor`/`nameEng` fields; surface via inline DS `Alert` (not `alert("이미 존재하는 메뉴입니다.")`)
- [ ] Submit handler (`handleSubmitButtonClick` / `handleUpdateButtonClick`):
  - Consolidate into single `onSubmit` driven by RHF's `handleSubmit`
  - On success, emit DS `toast()` success ("메뉴가 추가되었습니다." / "수정되었습니다.")
  - `alert("로그인이 필요합니다.")` in `uploadImage` → DS `toast()` error (this is read-only for this lane — the `uploadImage` stays; lane 2.16 replaces it)
- [ ] `CustomButton` submit → DS `Button` (`type="submit"`, variant-matched)
- [ ] `sejongHospitalBold.className` on `<label>` "메뉴 이미지" → `type-label` with `!font-semibold`
- [ ] **Keep the raw `<input type="file">` block** (lines 413–425) — lane 2.16 replaces it
- [ ] `npm run build` + `npm run typecheck` pass
- [ ] `ds-client-review` passes

### Acceptance criteria

- [ ] Zero `CustomField` imports in the file
- [ ] Duplicate-name detection fires inline without `alert()`
- [ ] Submit toast fires on success, form closes, menu appears in list
- [ ] Form validation disables submit button until all required fields filled
- [ ] `VerticalDivider`, `HorizontalDivider` imports: keep if still in use; otherwise prune

### Depends on

- **Lane 2.14 merged** (modal shell)
- **Lane 2.4b merged** (DS bump so `@umichkisa-ds/form` primitives + new `FileUpload` types are pinned) — strict even though this lane doesn't consume `FileUpload` directly, because lane 2.16 is next and any type-mismatch is cheaper to catch here

### Bailout triggers

- `FormCheckbox` doesn't accept boolean value with `null` initial (per existing `Boolean(initialData?.isImmediatePrep) || null` pattern) → `needs-decision`

---

## Lane 2.16 — `PochaMenuItemForm` FileUpload integration

**Repo:** `KISA-website-client`
**Mode:** `needs-interactive` (Cloudinary orphan-cleanup preservation)

### Files

- Modify: `src/features/pocha/components/manage/PochaMenuItemForm.tsx`

### Tasks (interactive)

- [ ] Replace raw `<input type="file">` block (lines 413–425) + preview block (lines 396–411) with DS `FileUpload`
- [ ] Wire `onUpload`: move the current `uploadImage` body into a handler that matches `FileUpload`'s `onUpload(file) => Promise<string>` contract; return `result.secure_url`
  - Stash `result.public_id` in form state (via RHF `setValue('cloudinaryPublicId', ...)` — register as hidden field) so `handleCloseForm` can clean up
- [ ] Wire `onRemove`: call existing `deleteImageFromCloudinary` with stashed `publicId`; clear form field
- [ ] **Preserve Cloudinary orphan cleanup** (`handleCloseForm` lines 298–304): if `cloudinaryPublicId && imageURL` on close, delete from Cloudinary — this path MUST still fire after migration
- [ ] Remove `isUploading` state + `setIsUploading` — `FileUpload` owns internal uploading state
- [ ] Remove "기존 이미지" dual-pane layout — DS `FileUpload` shows single preview; if a previously-uploaded image exists for update mode, pass it as `defaultValue` so `FileUpload` displays it directly
- [ ] Remove unused imports (`Image` from next, `VerticalDivider`, `getMenuImagePath`, `defaultImageURL` — verify via typecheck)
- [ ] `npm run build` + `npm run typecheck` pass
- [ ] `ds-client-review` passes
- [ ] Manual smoke (live, interactive):
  - Upload → submit: Cloudinary image persists, form closes, list shows new item
  - Upload → close modal (backdrop / ESC / X): Cloudinary image deleted (orphan cleanup)
  - Upload → remove → submit without image: no Cloudinary orphans

### Acceptance criteria

- [ ] Zero raw `<input type="file">` in the file
- [ ] All 3 close paths trigger Cloudinary cleanup when appropriate
- [ ] Upload + remove + re-upload cycle works

### Depends on

- **Lane 2.15 merged** (fields migrated)
- **Lane 2.4b merged** (`FileUpload` available from `@umichkisa-ds/web`)

### Bailout triggers

- `FileUpload` API doesn't expose enough state to preserve orphan cleanup across all close paths → `needs-decision` (may require `FileUpload` API adjustment — DS fix during migration)
- `result.public_id` not surfacable through RHF field cleanly → `needs-decision`

---

## Lane 2.17 — Page shell + legacy `ui/` swap

**Repo:** `KISA-website-client`
**Mode:** `needs-interactive` (integration moment)

### Files

- Modify: `src/app/(pocha)/pocha/manage/page.tsx`
- Modify: `src/app/(pocha)/pocha/error.tsx` (if it consumes legacy ui — grep at execution)
- Modify: any `src/features/pocha/components/manage/**` file still importing legacy ui — enumerate via grep

### Tasks (interactive)

- [ ] `grep -rn "CustomButton\|CustomImageButton\|LoadingSpinner\|NotAuthorized\|HorizontalDivider\|VerticalDivider" src/features/pocha/components/manage src/app/\(pocha\)/pocha/manage src/app/\(pocha\)/pocha/error.tsx` — enumerate remaining imports
- [ ] For each match (scope limited to manage surface):
  - `CustomButton` / `CustomImageButton` → DS `Button` (variants per `DS_CLIENT_USAGE.md`)
  - Legacy `LoadingSpinner` → DS `LoadingSpinner`
  - `NotAuthorized` → DS `StatusView variant="error"` / `"forbidden"` (match Phase 1 precedent)
  - `HorizontalDivider` / `VerticalDivider` → DS `Divider` if available
- [ ] `page.tsx` composition: verify all imports point to migrated components; preserve `PochaManageProvider`, `useAdmin`, `usePocha`, `useMenu` wiring
- [ ] `error.tsx` (if present in pocha path): swap any legacy `UnexpectedError` → DS `StatusView`
- [ ] **Do NOT touch** legacy ui source files themselves — other features still consume them
- [ ] **Do NOT touch** legacy ui in `pocha-*` non-manage surfaces (`home`, `menu`, `order`, `cart`, `pay`, `dashboard`, `history`) — out of scope per audit
- [ ] `npm run build` + `npm run typecheck` pass
- [ ] `ds-client-review` passes
- [ ] Manual smoke (live, with MSW + `dev` preview):
  - Logged-out → NotAuthorized
  - Logged-in non-admin → NotAuthorized
  - Logged-in admin, no active pocha → "새로운 포차 추가하기" + previous list
  - Logged-in admin, active pocha → `PochaSummary` + edit toggle + previous list
  - Create pocha → toast → list updates (no reload)
  - Edit pocha → toast → summary updates

### Acceptance criteria

- [ ] Zero imports of `CustomButton`, `CustomImageButton`, legacy `LoadingSpinner`, `NotAuthorized`, `HorizontalDivider`, `VerticalDivider` inside the manage scope
- [ ] All entry flows verified live
- [ ] Vercel `dev` preview accepted

### Depends on

- Lanes 2.5–2.16 merged

### Non-goals

- Deleting legacy ui source files
- Touching `ErrorBoundary` (stays client-local per Phase 1 precedent)
- Non-manage pocha surfaces

### Bailout triggers

- A legacy import doesn't map cleanly to any DS equivalent → `needs-decision`

---

## Lane 2.19 — Audit-after redesign pass

**Repo:** `KISA-website-client`
**Mode:** `needs-interactive` (full-phase visual/UX review)

### Tasks

- [ ] Full walkthrough of `/pocha/manage` at 375px + 1280px, both admin on/off, both logged in/out
- [ ] Per-file diff review against DS_CONSTRAINTS.md + typography rules + all `feedback_*` memory entries:
  - No `sejongHospital*` body usage remaining
  - No raw `text-gray-*`, `text-red-*`, `bg-gray-*`, `hover:bg-*`
  - No left-border accents (per `feedback_no_left_border`)
  - No `window.alert` / `window.confirm` / `window.location.reload`
  - Card padding not overridden (per `feedback_card_no_override`)
  - Blockquote-style content uses DS `Alert` (per `feedback_blockquote_to_alert`)
  - Intro paragraphs use `text-foreground`, not `text-muted-foreground` (per `feedback_intro_foreground`)
  - Secondary/cross-ref paragraphs are `Alert`, not inline text (per `feedback_intro_subparagraph_to_alert`)
- [ ] Polish commits as needed — no major code changes expected
- [ ] File any missed lane issues found as GitHub issues tagged `ds-client-migration` / `phase-2` / `lane:2.19-followup`
- [ ] `npm run build` + `npm run typecheck` pass

### Acceptance criteria

- [ ] Clean diff review, no outstanding violations
- [ ] Any follow-ups filed (not blocked on)

---

## Lane 2.18 — Verify + end-bump

**Repo:** `umichkisa-ds` (publish lives here)
**Mode:** `needs-interactive`

### Tasks

- [ ] Full Vercel `dev`-branch preview walkthrough: all admin/login combos, create + edit + delete flows, menu-item add/edit/delete, image upload + orphan cleanup
- [ ] `pnpm build` + `pnpm typecheck` in DS repo
- [ ] `npm run build` + `npm run typecheck` + `npm test` in client repo
- [ ] Check `docs/plans/client-migration/ds-fixes-log.md` for Phase 2 entries (beyond the mid-phase 2.4b bump):
  - If any additional entries: invoke `ds-phase-end-bump` skill → bump DS (patch for icon/registry changes per `feedback_ds_bump_semver`, minor for new components beyond FileUpload)
  - If no entries beyond 2.4b (expected): skip end-bump
- [ ] Tick `Phase 2` + all subphases in `docs/TODO.md`
- [ ] Append phase summary line to `notes.md`

### Acceptance criteria

- [ ] All builds + typechecks + tests green across both repos
- [ ] `dev` preview verified by user
- [ ] TODO.md tick committed

---

## Notes

- Per `feedback_migration_is_redesign`: most Wave B lanes are redesigns despite `[POLISH]` tag — the tag captures "DS-primitive swap preserves API surface"; the visual output is intentionally different. Lane 2.19 is the backstop for accumulated drift.
- Per `feedback_no_worktree_interactive`: all `needs-interactive` lanes branch in-place, no worktree. Autonomous lanes use worktrees per §5.
- Per `feedback_parallel_wave_pickup`: at cold-session pickup of Wave B, present full lane menu and wait for user pick.
- Per `feedback_sejong_display_only`: Sejong classes are reserved for `type-h1` / `type-display` usage only; all body contexts must use Pretendard via `type-body*` / `type-label` / `type-ui`.
- Per `feedback_interactive_direct_push`: interactive Mode D lanes push directly to `dev` (no PR), autonomous lanes always open PRs.
- Per `feedback_mid_phase_bump_default`: lane 2.4b is a patch bump, not deferred to phase end.

## Open items for plan-time resolution (carry into issues)

- **2.4 FileUpload grill** — lane 2.4's interactive session must lock the behavior axes listed in its task body before writing tests.
- **2.11 Toaster mount** — verify `<Toaster />` is mounted in client root layout; if not, schedule a mount micro-lane (or roll into 2.11).
- **Shared pocha primitives** (`PochaButton`, `PochaErrorMsg`, `PochaHorizontalDivider`, `PochaBackHeading`): Phase 2 touches them only as manage consumes them. Not scheduled as lanes; redesign-as-you-go. Lane 2.19 reconciles any accumulated inconsistency.
