# Toast — Implementation Plan

## Decisions (from grill-me)

- **Engine:** Sonner (direct dependency) — DS styles via `classNames` API
- **Exports:** `Toaster` (provider, mount once) + `toast` (imperative function, re-exported from Sonner)
- **Variants:** `default`, `info`, `success`, `warning`, `error`
- **Position:** configurable on `<Toaster>`, default `top-center`
- **Features:** title + description, auto-mapped icons, always-visible dismiss, optional action button, configurable duration (4s), `toast.promise()`
- **Responsive:** Sonner default (full-width top-center on mobile)
- **Category:** `feedback/` (alongside Alert, LoadingSpinner, Skeleton)
- **Styling:** CSS overrides via Sonner's `classNames` slots — no CVA (no variant matrix on a rendered component), DS tokens only

---

## Phase 1 — Component Implementation

### 1.1 Install Sonner

- `pnpm --filter @umichkisa-ds/web add sonner`

### 1.2 Create `packages/web/src/components/feedback/Toast.tsx`

**`Toaster` component:**
- Wraps Sonner's `<Toaster>` with DS token styling
- Props: `position` (default `"top-center"`), plus passthrough Sonner config
- Applies DS classes via `toastOptions.classNames`:
  - Toast container: `bg-surface`, `border border-border`, `rounded-md`, `shadow-lg`, `type-body-sm text-foreground`
  - Title: `type-body-sm text-foreground font-semibold`
  - Description: `type-body-sm text-muted-foreground`
  - Action button: DS button-like styling with brand colors
  - Close button: DS icon button styling
- Uses `icons` prop to inject DS `<Icon>` components for each variant (matching Alert's icon map)

**`toast` function:**
- Re-export Sonner's `toast` directly — no wrapper needed since styling is handled by `<Toaster>`

### 1.3 Update barrel exports

- `packages/web/src/components/feedback/index.ts` — add `Toaster`, `toast` exports
- No type export needed — `toast` is a function, `Toaster` props are inferred

### 1.4 Files touched

- `packages/web/package.json` (add `sonner` dependency)
- `packages/web/src/components/feedback/Toast.tsx` (new)
- `packages/web/src/components/feedback/index.ts` (add exports)

---

## Phase 2 — Docs Page

### 2.1 Create `apps/docs/app/components/toast/page.tsx`

Follow Dialog page layout pattern exactly. Sections:

1. **Header** — "Toast" title, description of ephemeral notifications
2. **Setup** — How to mount `<Toaster />` in app root layout, with code example
3. **Basic Usage** — `toast("message")` with a trigger button
4. **Variants** — Five buttons triggering `default`, `info`, `success`, `warning`, `error` toasts
5. **With Description** — Title + description example
6. **With Action** — Toast with action button (e.g., "Undo")
7. **Promise** — `toast.promise()` async example
8. **Positioning** — Note on `position` prop, list of options, mobile behavior
9. **API Reference** — Two tables: `<Toaster>` props and `toast()` options

### 2.2 Update Sidebar

- Add `{ label: 'Toast', href: '/components/toast' }` to the Feedback category in `COMPONENT_ITEMS`

### 2.3 Files touched

- `apps/docs/app/components/toast/page.tsx` (new)
- `apps/docs/components/Sidebar.tsx` (add Toast to Feedback)
