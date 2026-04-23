# Phase 2 — pocha-manage (Audit)

**Type:** Vertical feature phase (per HARNESS), subphased into lanes for parallel execution.
**Charter:** Migrate the admin-only `/pocha/manage` page of the pocha app (pop-up bar/restaurant event management) from pre-DS code into DS-tokenized, DS-componentized, idiomatic implementation. First phase to exercise `@umichkisa-ds/form` against complex real-world forms; introduces the first DS `FileUpload` component.
**Scope principle:** Heavy polish + redesign where the existing UX diverges from DS norms. Preserve: admin workflow (create pocha → add menu items with images → submit), Cloudinary orphan-cleanup semantics, Korean labels/copy. Replace: bespoke full-screen modal, `window.alert`/`confirm`/`reload`, deprecated `CustomField`, raw `sejongHospital*` utility classes in body contexts, ad-hoc `useState` form state.

---

## Scope Snapshot

### Source files (client)

```
src/app/(pocha)/pocha/manage/
├── page.tsx                                  [REACHABLE, admin gate commented out]
└── brainstorming.txt                         (design notes, not touched)

src/features/pocha/
├── contexts/
│   └── PochaManageContext.tsx                { menus, setMenus } only
├── hooks/
│   ├── usePocha.tsx                          current/active pocha (SWR)
│   └── useMenu.tsx                           menus for current pocha
└── components/manage/
    ├── PochaManagePageHeader.tsx             title + user chip
    ├── PochaForm.tsx                         create/update orchestrator
    ├── PochaInfoFields.tsx                   date/time/text fields via deprecated CustomField
    ├── PochaMenuFields.tsx                   section header + add button + list
    ├── PochaMenuItemForm.tsx                 456-LOC modal form w/ image upload
    ├── PochaMenuItemList.tsx                 added-menu list
    ├── PochaSummary.tsx                      active pocha card
    ├── PreviousPochaList.tsx                 past pochas (useEffect + local state)
    └── PreviosPochaSummary.tsx               N+1 menu fetch per card

src/features/pocha/components/shared/         (touched only as consumed by manage)
├── PochaBackHeading.tsx
├── PochaButton.tsx
├── PochaErrorMsg.tsx
└── PochaHorizontalDivider.tsx

src/apis/pocha/
├── queries.ts                                GET /pocha/previous/, GET /pocha/{id}/menu/
└── mutations.ts                              POST /pocha/, PUT /pocha/{id}/

src/lib/next-auth/
└── useAdmin.ts                               (consumed; not modified)

Next.js API routes (server-side, not touched):
├── /api/upload-to-cloudinary
└── /api/delete-from-cloudinary
```

### Scope boundary (shared/)

Per Q1 resolution: Phase 2 owns `manage/` + only the `shared/` primitives actually used by manage. Redesign-as-you-go — no pre-refactor of cross-feature shared components. Components in `shared/` not consumed by manage are deferred to Phase 3/4.

### Out of scope
- Other pocha surfaces (`home`, `menu`, `order`, `cart`, `pay`, `dashboard`, `history`) — deferred to Phases 3/4.
- Cloudinary backend/API routes — keep as-is.
- `useAdmin` hook internals — consumed as-is; only the `GET /auth/isAdmin/{email}` endpoint is MSW-mocked.
- Backend (`/pocha/` endpoints) — mocked via MSW; real backend unchanged.

---

## Decisions Locked (grill output)

| Q | Decision | Rationale |
|---|---|---|
| Q1 | `shared/` touched only where manage consumes it (redesign-as-you-go) | Phase 1 precedent; clean boundary |
| Q2 | Full `@umichkisa-ds/form` adoption | First form-heavy phase; DS form package must be stress-tested here |
| Q3 | Admin gate restored as Phase 2.0 (interactive, one-liner) | Security hole shipped in minutes, not piggybacked on UI work |
| Q4 | Two stacked `Switch` toggles (`Mock: logged in` + `Mock: admin`); admin disabled when logged-out | Clean UX; orthogonal state is orthogonal |
| Q5 | Build DS `FileUpload` component (`onUpload(File)→Promise<string>`, `onRemove(publicId)→Promise<void>`) | Reusable beyond pocha (profile pics, event posters) |
| Q6 | Full replacement: `alert`→toast, `confirm`→Dialog, `reload`→SWR `mutate()` | DS-idiomatic; correctness win on cache invalidation |
| Q7 | Typography pass per-subphase (no dedicated lane) | Redesign-as-you-go |
| Q8 | 19 single-responsibility subphases (see below) | User feedback: single responsibility per lane |
| Q9 | 11 autonomous / 8 interactive | Mechanical → autonomous; decisions-during-build → interactive |
| Q10 | TDD only on 2.1, 2.2, 2.3, 2.4. **No zod** — RHF native validation only | `@umichkisa-ds/form` is a thin RHF wrapper; zod is overhead |

---

## Subphase Enumeration

| # | Title | Single responsibility | TDD | Mode |
|---|---|---|:---:|---|
| 2.0 | Admin gate restoration | Uncomment `NotAuthorized` in `page.tsx`; verify `useAdmin` path | no | interactive |
| 2.1 | MSW: pocha CRUD handlers | `POST /pocha/`, `PUT /pocha/{id}/`, `GET /pocha/previous/` + mock fixture | **yes** | autonomous |
| 2.2 | MSW: menu CRUD handlers | `GET /pocha/{id}/menu/` + mock fixture | **yes** | autonomous |
| 2.3 | MSW: admin handler + authContext toggle extension | `GET /auth/isAdmin/{email}`, 2nd `Switch` (disabled when logged-out), `sessionStorage` key | **yes** | interactive |
| 2.4 | DS `FileUpload` component | New DS component + stories + docs page; mid-phase patch bump | **yes** | interactive |
| 2.5 | `PreviousPochaList` → SWR | Behavior only: `useEffect`+local state → `useSWR` | no | autonomous |
| 2.6 | `PreviousPochaSummary` — fix N+1 + redesign | Batch or dedupe menu fetch + DS `Card`/tokens | no | interactive |
| 2.7 | `PreviousPochaList` redesign | Section header + list container tokens | no | autonomous |
| 2.8 | `PochaManagePageHeader` redesign | `sejongHospitalBold` → `type-h1`; tokens | no | autonomous |
| 2.9 | `PochaSummary` redesign | DS `Card` + tokens + typography; toggle edit button | no | autonomous |
| 2.10 | `PochaInfoFields` → `@umichkisa-ds/form` | Text/date/time fields as DS form primitives; inline `Alert` errors; RHF native validation | no | autonomous |
| 2.11 | `PochaForm` orchestration | RHF form wiring, submit → toast, remove `window.location.reload`, SWR `mutate()` | no | interactive |
| 2.12 | `PochaMenuFields` redesign | Section header + empty-state `Alert` + add button tokens | no | autonomous |
| 2.13 | `PochaMenuItemList` redesign | DS `Card` items; edit/delete icon buttons; **delete confirm → DS `Dialog`** | no | autonomous |
| 2.14 | `PochaMenuItemForm`: modal shell | Swap bespoke full-screen overlay → DS `Dialog`; keep existing fields temporarily | no | autonomous |
| 2.15 | `PochaMenuItemForm`: fields migration | Text/number/checkbox → `@umichkisa-ds/form`; duplicate-check → inline `Alert`; submit toast | no | autonomous |
| 2.16 | `PochaMenuItemForm`: FileUpload integration | Swap raw `<input type=file>` → DS `FileUpload` (2.4); preserve Cloudinary orphan cleanup | no | interactive |
| 2.17 | Page shell + legacy `ui/` swap | `LoadingSpinner`/`NotAuthorized` → DS; `error.tsx`; remove remaining legacy `ui/` imports | no | autonomous |
| 2.19 | Audit-after redesign pass | Full phase-level visual/UX review; catch accumulated drift before close | no | interactive |
| 2.18 | Verify + end-bump | Build/typecheck, manual smoke (both toggles), tick phase; DS end-bump if needed | no | interactive |

**Count:** 20 subphases (numbered 2.0–2.19; 2.19 runs before 2.18 per graph below).
**Autonomous/interactive:** 11 / 9.
**TDD lanes:** 4 (all in Wave A infra).

---

## Dependency Graph

```
                                    ┌──────────────────┐
                                    │ 2.0 Admin gate   │
                                    │ restoration      │
                                    └────────┬─────────┘
                                             │
                  ┌──────────────────────────┼──────────────────────────┐
                  ▼                          ▼                          ▼
         ┌────────────────┐      ┌─────────────────────┐     ┌─────────────────────┐
         │ 2.1 MSW pocha  │      │ 2.2 MSW menu CRUD   │     │ 2.3 MSW admin +     │
         │ CRUD handlers  │      │ handlers            │     │ authContext toggle  │
         └────────┬───────┘      └──────────┬──────────┘     └──────────┬──────────┘
                  └─────────────────────────┼───────────────────────────┘
                                            │  (MSW infra complete)
           ┌────────────────────────────────┼───────────────────────────────────┐
           ▼                                ▼                                   ▼
   ┌───────────────┐         ┌─────────────────────────────┐         ┌────────────────┐
   │ 2.4 DS        │         │  PRESENTATION WAVE          │         │ 2.10 PochaInfo │
   │ FileUpload    │         │  (all parallel)             │         │ Fields → form  │
   │ (DS repo,     │         │  2.5  PrevList → SWR        │         └────────┬───────┘
   │  patch bump)  │         │  2.6  PrevSummary N+1 + UI  │                  ▼
   └───────┬───────┘         │  2.7  PrevList UI (→ 2.6)   │         ┌────────────────┐
           │                 │  2.8  PageHeader UI         │         │ 2.11 PochaForm │
           │                 │  2.9  PochaSummary UI       │         │ orchestration  │
           │                 │  2.12 MenuFields UI         │         └────────────────┘
           │                 │  2.13 MenuItemList UI       │
           │                 └──────────────┬──────────────┘
           │                                ▼
           │                     ┌────────────────────┐
           │                     │ 2.14 MenuItemForm  │
           │                     │ shell → Dialog     │
           │                     └──────────┬─────────┘
           │                                ▼
           │                     ┌────────────────────┐
           │                     │ 2.15 MenuItemForm  │
           │                     │ fields → DS form   │
           │                     └──────────┬─────────┘
           └────────────────────────────────┤
                                            ▼
                                 ┌────────────────────┐
                                 │ 2.16 MenuItemForm  │
                                 │ FileUpload integ.  │
                                 └──────────┬─────────┘
                                            ▼
                                 ┌────────────────────┐
                                 │ 2.17 Page shell +  │
                                 │ legacy ui swap     │
                                 └──────────┬─────────┘
                                            ▼
                                 ┌────────────────────┐
                                 │ 2.19 Audit-after   │
                                 │ redesign pass      │
                                 └──────────┬─────────┘
                                            ▼
                                 ┌────────────────────┐
                                 │ 2.18 Verify +      │
                                 │ end-bump           │
                                 └────────────────────┘
```

**Waves:**
- **Wave A (infra, partly parallel):** 2.0 → {2.1, 2.2, 2.3 in parallel} → 2.4
- **Wave B (parallel presentation):** 2.5, 2.6→2.7, 2.8, 2.9, 2.12, 2.13, 2.10→2.11 — up to 7 concurrent once MSW is in
- **Wave C (serial menu-item form):** 2.14 → 2.15 → 2.16 (gated on 2.13 + 2.4)
- **Wave D (close-out):** 2.17 → 2.19 → 2.18

**Critical path:** 2.0 → {2.1/2.2/2.3} → 2.13 → 2.14 → 2.15 → 2.16 → 2.17 → 2.19 → 2.18 ≈ 9 serial lanes.

---

## Phase-Wide Risks

1. **First heavy form phase** — `@umichkisa-ds/form` mostly untested against complex forms. Expect 2–4 mid-phase DS fixes (patch bumps per `feedback_mid_phase_bump_default`).
2. **New DS component `FileUpload`** — inserts a DS worktree detour mid-phase. Needs its own grill-me inside 2.4.
3. **Cloudinary orphan cleanup** — must preserve close-without-submit cleanup during modal rewrite (2.14 + 2.16).
4. **SWR conversion + `window.location.reload` removal** — if `mutate()` is wired incorrectly, post-submit UI shows stale data. Must verify both create and update paths.
5. **Admin toggle regression risk** — existing `authContext.tsx` uses single `mockAuthed` boolean; adding admin flag must not break Phase 0/1 paths. Cover in 2.3 smoke.
6. **Korean text handling in forms** — RHF error rendering with Korean strings; verify no encoding/line-wrap issues at small widths.
7. **`useMenu` pre-fill timing** — current `useEffect` in `page.tsx:54-58` depends on `menuStatus === "success"`; SWR conversion in 2.5 must not affect this flow (or, if touched, preserve the pre-fill semantics).
8. **Mobile-first UX** — pocha is phone-in-pocket; DS `Dialog` at 375px needs explicit check in 2.14 (full-height vs centered; dismiss target).
9. **`sejongHospital*` utility removal** — per `feedback_sejong_display_only`, body usage must go. Per-subphase pass risks missed instances; 2.19 is the backstop.
10. **Shared pocha primitives** (`PochaButton`, `PochaErrorMsg`, etc.) — redesign-as-you-go means the *same* file may get multiple drive-by edits across lanes. Last lane wins. 2.19 reconciles.

---

## Open Items (carry into plan.md)

- 2.6: exact N+1 strategy — new batch endpoint (requires BE) vs SWR dedup (client-only). Default to SWR dedup; escalate to BE if measurable.
- 2.4: DS `FileUpload` — full grill-me before build. Behavior axes: single vs multi-file (this phase only needs single), size limits, accepted MIME, preview shape (square vs aspect-preserving), remove-while-uploading, drag-and-drop (defer).
- 2.11: cross-field validation (endDate > startDate) lives in RHF `validate` callback on end-date field — no zod schema.
- 2.19 deliverable: a diff review of every touched file against DS_CONSTRAINTS.md + typography rules; no code changes expected beyond polish.
