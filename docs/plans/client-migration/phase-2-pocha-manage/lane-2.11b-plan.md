# Lane 2.11b — PochaForm UX Redesign Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Redesign the pocha create/update form flow on `/pocha/manage` so the form lives in a focused modal with a sticky action bar, summary card stays as a stable reference, and menu items use compact rows that match overall page sizing.

**Architecture:** Replace the linear "Summary → inline form" stack with a **Dialog-driven edit mode**. Summary card remains the only visible page artifact in idle state; clicking `수정하기` (or `새로운 포차 추가하기` in empty state) opens a single full-height Dialog (`size="lg"`) containing the form, with **Tabs** dividing `기본 정보` / `메뉴 (N)` and a **sticky DialogFooter** holding the submit button. Menu items inside the form become compact `Card` rows (single-line title + tight inline metadata), not the current oversized cards.

**Tech Stack:** Next.js App Router · React Hook Form (`@umichkisa-ds/form`) · `@umichkisa-ds/web` (Dialog, Tabs, Card, Button, Alert, Badge, Icon) · SWR · `next/navigation`.

---

## Design narrative

### Problems being solved

| # | Pain | Cause | Fix |
|---|------|-------|-----|
| 1 | Form sits below summary; page becomes a long scroll | Inline form rendered conditionally below `<PochaSummary>` | Move form into a Dialog. Summary stays put; Dialog floats above. |
| 2 | Submit button at very bottom — gets pushed further down by every menu item | Submit is the last block in a vertical stack | Sticky `DialogFooter` always pinned to viewport bottom inside the Dialog. |
| 3 | Menu item cards in form are oversized vs page rhythm (`type-h3` titles, generous padding, multi-line metadata) | `PochaMenuItemList.tsx:65–119` uses `type-h3` for menu name and 4 stacked metadata `<p>`s | Compact row: `type-body !font-semibold` title + inline metadata strip with `·` separators. Reduce vertical padding. |

### The new flow

**Empty state (no active pocha):**
- Page renders empty-state Card with primary `Button: 새로운 포차 추가하기`.
- Click → opens `<PochaFormDialog mode="create" />`.

**Active pocha state (existing flow):**
- `<PochaSummary>` renders with `수정하기` button → opens `<PochaFormDialog mode="update" existingPochaInfo={...} />`.
- The toggle pattern (`isEditPochaFormOpen` state) is replaced by `dialogOpen` state — same shape, simpler semantics.

**Inside the Dialog:**
- Header: title (`포차 생성하기` / `포차 수정하기`) + close button (DS Dialog provides this).
- Body: `<Tabs>` with two panels:
  - **기본 정보** — current `PochaInfoFields` (no change to fields themselves)
  - **메뉴 (N)** — header strip with `메뉴 N개` label + `추가하기` button → renders compact menu rows below; same add/edit/delete behavior, smaller visual footprint.
- Footer (sticky): cross-field error Alert (if any) + `취소` (secondary) + `포차 생성하기 / 포차 수정하기` (primary, disabled when invalid).

### What is NOT changing

- Field set + validation rules in `PochaInfoFields`.
- `PochaMenuItemForm` (the per-menu add/edit modal) — already its own Dialog.
- `usePocha` / `useMenu` data flow.
- API contracts (`createPocha`, `updatePocha`).
- `PreviousPochaList` block at the bottom of the page.
- Toast messages and SWR refetch logic in `PochaForm.onSubmit`.

### What IS changing (file-level)

| File | Change |
|------|--------|
| `src/app/(pocha)/pocha/manage/page.tsx` | Replace inline form rendering + `isNewPochaFormOpen` / `isEditPochaFormOpen` with a single `dialogOpen` state. Pass open/onOpenChange to a new `<PochaFormDialog>`. Empty state becomes a proper empty Card with a CTA button. |
| `src/features/pocha/components/manage/PochaFormDialog.tsx` (new) | Wrapper: Dialog shell + Tabs + sticky DialogFooter. Owns `methods` from `useForm` and the submit handler — i.e. the body of current `PochaForm.tsx` is **moved into here**, refactored around the Tabs+footer layout. |
| `src/features/pocha/components/manage/PochaForm.tsx` | Either deleted (if all logic moves to `PochaFormDialog`) or kept as a thin re-export. Decision: **delete** — there's no other consumer. |
| `src/features/pocha/components/manage/PochaSummary.tsx` | Replace `setIsEditPochaFormOpen` toggle with `onEditClick` callback prop. Drop the `isEditPochaFormOpen` prop. |
| `src/features/pocha/components/manage/PochaMenuFields.tsx` | Add a header label `메뉴 N개`. Move add-button click target into Tabs panel (no change to inner state machine). |
| `src/features/pocha/components/manage/PochaMenuItemList.tsx` | Compact-row redesign: `type-body !font-semibold` title, inline metadata strip with `·` separators, reduce CardContent padding via internal layout (no override of Card defaults — per memory). |

---

## Tasks

### Task 1: Skeleton — create `PochaFormDialog.tsx`

**Files:**
- Create: `src/features/pocha/components/manage/PochaFormDialog.tsx`

**Step 1:** Create new file with empty Dialog shell that accepts `open`, `onOpenChange`, `mode`, `existingPochaInfo`, `onSubmitSuccess` props. Render `<Dialog open onOpenChange><DialogContent size="lg"><DialogTitle>…</DialogTitle><div>placeholder</div></DialogContent></Dialog>`. Don't move logic yet.

**Step 2:** In `page.tsx`, swap rendering: replace the conditional `<PochaForm>` blocks with a single `<PochaFormDialog open={dialogOpen} onOpenChange={setDialogOpen} mode={mode} existingPochaInfo={pochaInfo} onSubmitSuccess={refetchPocha} />` and consolidate to one `dialogOpen: boolean` + `dialogMode: 'create' | 'update'` pair.

**Step 3:** Update `PochaSummary` to take `onEditClick: () => void` instead of the open/toggle pair. Pass `() => { setDialogMode('update'); setDialogOpen(true); }` from the page.

**Step 4:** Update empty-state branch in `page.tsx` to render a DS empty-state Card (Card + CardContent + heading + body + CTA Button) instead of the bare `CustomButton`. Drop `CustomButton` import. Click → `setDialogMode('create'); setDialogOpen(true)`.

**Step 5:** Smoke test on tunnel: page loads, Dialog opens on both buttons, Dialog closes on overlay click. No form yet.

**Step 6:** Commit.

```bash
git add src/features/pocha/components/manage/PochaFormDialog.tsx \
        src/features/pocha/components/manage/PochaSummary.tsx \
        src/app/\(pocha\)/pocha/manage/page.tsx
git commit -m "feat(pocha-manage): scaffold PochaFormDialog shell + replace inline form with dialog (lane 2.11b)"
```

---

### Task 2: Move form logic into `PochaFormDialog`

**Files:**
- Modify: `src/features/pocha/components/manage/PochaFormDialog.tsx`
- Delete: `src/features/pocha/components/manage/PochaForm.tsx`

**Step 1:** Move the entire body of `PochaForm.tsx` (form state, cross-field validation effect, `onSubmit`) into `PochaFormDialog.tsx`. Keep the existing `<Form form={methods} onSubmit={onSubmit}>` wrapping the dialog body.

**Step 2:** Layout inside `<DialogContent size="lg" className="max-h-[90dvh] flex flex-col">`:
  - `<DialogTitle>` mode-aware (`포차 생성하기 / 포차 수정하기`)
  - `<div className="flex-1 overflow-y-auto">` containing `<PochaInfoFields />` then `<Divider />` then `<PochaMenuFields />` (we'll add Tabs in Task 3 — for now keep them stacked but inside scroll container)
  - `<DialogFooter>` containing cross-field Alert (if any) + `취소` (secondary, calls `onOpenChange(false)`) + submit Button (primary)

**Step 3:** On successful submit, call `onOpenChange(false)` after the SWR mutate calls (only for `update` mode; `create` mode also closes since the page transitions out of empty state once `usePocha` refetches).

**Step 4:** Delete `PochaForm.tsx`. Search for other importers — there should be none (confirmed: only `page.tsx` imports it). Update `page.tsx` import if anything dangles.

**Step 5:** `npm run typecheck` → pass. Smoke test on tunnel: open create dialog, fill all fields + add a menu, submit. Toast appears, dialog closes, summary updates.

**Step 6:** Commit.

```bash
git add -A
git commit -m "feat(pocha-manage): move PochaForm logic into PochaFormDialog, delete legacy PochaForm (lane 2.11b)"
```

---

### Task 3: Add Tabs to dialog body

**Files:**
- Modify: `src/features/pocha/components/manage/PochaFormDialog.tsx`

**Step 1:** Wrap the scroll body with DS `<Tabs defaultValue="info">` containing `<TabsList>` (`기본 정보` / `메뉴 ({menus.length})`) and two `<TabsContent value="info">` / `<TabsContent value="menu">` panels. Drop the `<Divider />` between info and menu sections.

**Step 2:** Reactive tab badge: pull `menus` from `usePochaManage()` to compute the count for the menu tab label.

**Step 3:** When cross-field validation OR menu-empty error fires, the user might be on the wrong tab. Add a small effect: if `errors.endDate` or `errors.endTime` exists on submit attempt, switch to `info` tab; if `menus.length === 0` on submit attempt, switch to `menu` tab. Use a controlled `activeTab` state instead of `defaultValue`.

**Step 4:** Smoke test: tabs switch, count updates as menus added, submitting empty form lands user on the offending tab.

**Step 5:** Commit.

```bash
git add src/features/pocha/components/manage/PochaFormDialog.tsx
git commit -m "feat(pocha-manage): split PochaFormDialog into Tabs (info/menu) (lane 2.11b)"
```

---

### Task 4: Compact menu-item rows

**Files:**
- Modify: `src/features/pocha/components/manage/PochaMenuItemList.tsx`

**Step 1:** Redesign each menu Card body:
  - Title row: `<h3 className="type-body !font-semibold">{menu.nameKor} <span className="text-muted-foreground !font-normal">({menu.nameEng})</span></h3>` + edit/delete IconButton group on the right (unchanged).
  - Metadata row: single `<div className="flex flex-wrap items-center gap-x-3 gap-y-1 type-body-sm text-muted-foreground">` with inline spans separated by `<span aria-hidden>·</span>`:
    - `{menu.category}`
    - `${menu.price?.toLocaleString()}`
    - `재고 {menu.stock}개`
    - if `isImmediatePrep`: `<Badge variant="outline" size="sm">즉시 제공</Badge>` (else show nothing — saves space)
    - if `ageCheckRequired`: `<Badge variant="outline" size="sm">연령 확인</Badge>` (else nothing)
  - Drop the verbose `카테고리: / 가격: / 재고: / 즉시 준비: / 연령 확인:` label-value pairs.

**Step 2:** Do **not** override `<CardContent>` padding (per memory — no custom padding on Card). If the default still feels too tall, reduce the inner gap on the row layout (`gap-1` instead of `gap-2`) — that's the lever.

**Step 3:** Run `ds-client-review` on `PochaMenuItemList.tsx`.

**Step 4:** Smoke test: list of menus, visual density matches the rest of the page, edit + delete still work.

**Step 5:** Commit.

```bash
git add src/features/pocha/components/manage/PochaMenuItemList.tsx
git commit -m "refactor(pocha-manage): compact menu-row layout in PochaMenuItemList (lane 2.11b)"
```

---

### Task 5: Polish header strip in menu tab

**Files:**
- Modify: `src/features/pocha/components/manage/PochaMenuFields.tsx`

**Step 1:** Replace the `mb-4 flex items-center justify-between` header. Keep `추가하기` button on the right; replace the `<h2>메뉴</h2>` with a left-side label `메뉴 {menus.length}개` (`type-body-sm text-muted-foreground`) — the Tab list already serves as the section header. This removes redundant `type-h3` weight.

**Step 2:** Empty-state Alert wording stays (`최소 1개의 메뉴를 추가해주세요.`) but consider variant `info` if `warning` reads too loud post-redesign — judgment call during smoke test.

**Step 3:** Run `ds-client-review` on `PochaMenuFields.tsx`.

**Step 4:** Smoke test.

**Step 5:** Commit.

```bash
git add src/features/pocha/components/manage/PochaMenuFields.tsx
git commit -m "refactor(pocha-manage): tab-aware menu header strip in PochaMenuFields (lane 2.11b)"
```

---

### Task 6: Sticky footer audit + dialog scroll behavior

**Files:**
- Modify: `src/features/pocha/components/manage/PochaFormDialog.tsx`

**Step 1:** Verify the DS `DialogContent` + `DialogFooter` combination already gives a sticky footer with scrollable body (the `flex flex-col` + `flex-1 overflow-y-auto` pattern from Task 2 should achieve this). On a tall menu list, body scrolls and footer stays visible.

**Step 2:** If footer is NOT sticky, the `DialogFooter` may need a wrapping container with `border-t` and `bg-background` to visually separate from scrolling content. Apply only if needed — start without it.

**Step 3:** Mobile width (`375px`) check via tunnel resize: dialog fills screen reasonably (`size="lg"` should be near-full on mobile per DS `Dialog` defaults), tabs remain tappable, footer pinned.

**Step 4:** If a DS Dialog gap is uncovered (e.g., footer doesn't pin on tall content), invoke `ds-fix-during-migration` skill — do not patch over it on the client side.

**Step 5:** Commit any client-side polish.

```bash
git add -A
git commit -m "polish(pocha-manage): sticky footer + mobile scroll behavior (lane 2.11b)"
```

---

### Task 7: Final verification + wrap-up

**Files:** none (verification only)

**Step 1:** `npm run build` + `npm run typecheck` from `KISA-website/client/` → both pass.

**Step 2:** `ds-client-review` agent over every modified `.tsx` (`PochaFormDialog.tsx`, `PochaSummary.tsx`, `PochaMenuFields.tsx`, `PochaMenuItemList.tsx`, `page.tsx`).

**Step 3:** End-to-end smoke on tunnel:
  - Empty state → create flow → submit → summary appears.
  - Active pocha → edit flow → modify title → submit → summary updates.
  - Edit flow → add menu → submit → menu appears in summary.
  - Edit flow → delete menu → confirm dialog → menu removed.
  - Cross-field error: end before start → switches to info tab + Alert in footer.
  - Empty menu submit → switches to menu tab.
  - Mobile (375px) walkthrough of all of the above.
  - No `console.error`/`console.warn` regressions.

**Step 4:** Direct push to `dev` (Mode D direct-push per memory). Worktree wrap-up: invoke `wrapping-up-lane` skill (close client#114, strip labels, tick TODO, post-merge sync, remove worktree).

---

## Bailout triggers

- DS Dialog sticky-footer gap → `ds-fix-during-migration` mid-lane (patch bump, per memory).
- DS Tabs lacks count-badge support that looks acceptable → fall back to plain text label `메뉴 (3)`.
- Smoke uncovers >3 new UX issues unrelated to the redesign → split into 2.11c polish lane.

## Acceptance criteria

- [ ] Form opens in a Dialog from both empty-state CTA and `수정하기` button.
- [ ] Submit button is always visible inside the Dialog regardless of menu count (sticky footer).
- [ ] Menu item rows visually match the rest of the page (no `type-h3` for menu names).
- [ ] Tabs separate 기본 정보 and 메뉴; menu count updates live.
- [ ] Submit-time validation lands the user on the offending tab.
- [ ] All existing toast + SWR refetch behavior preserved.
- [ ] `ds-client-review` clean on every changed file.
- [ ] `npm run build` + `npm run typecheck` pass.
- [ ] End-to-end smoke pass on desktop + mobile widths.
