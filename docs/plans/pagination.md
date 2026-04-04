# Pagination — Implementation Plan

## Decisions (from grill-me)

- Controlled only: `page` (1-indexed), `totalPages`, `onPageChange` — all required
- `siblingCount` prop (default `1`), first/last page always visible
- Prev/next arrows always shown, disabled at boundaries — `<Icon name="chevron-left" />` / `<Icon name="chevron-right" />`
- Static (non-interactive) ellipsis
- Single size (h-9 w-9 page buttons), no size variants — `cn()` only, no CVA
- Responsive: mobile forces `siblingCount=0`, `md:` uses configured value — CSS show/hide
- Category: `navigation/` (alongside Tabs)
- Accessibility: `<nav aria-label="Pagination">`, `aria-current="page"`, labeled prev/next, `aria-hidden` ellipsis
- No page-size selector (separate concern — ToggleBar in Batch 13)

---

## Phase 1: Component implementation

### 1a. Create Pagination component

- Create `packages/web/src/components/navigation/Pagination.tsx`
- Single export: `Pagination`
- Props: `page`, `totalPages`, `onPageChange`, `siblingCount?`, `className?`
- Internal `usePaginationRange` helper to compute visible page slots
- CSS-based responsive: sibling pages wrapped in `hidden md:flex` for mobile collapse
- Dual-ring focus on page buttons and prev/next arrows
- Disabled state on prev/next at boundaries

### 1b. Update barrel export

- Add Pagination export to `packages/web/src/components/navigation/index.ts`

### Files touched (Phase 1)

| File | Action |
|------|--------|
| `packages/web/src/components/navigation/Pagination.tsx` | create |
| `packages/web/src/components/navigation/index.ts` | update |

---

## Phase 2: Docs page + sidebar

### 2a. Docs page

- Create `apps/docs/app/components/pagination/page.tsx`
- Match Dialog page layout pattern exactly
- Sections: Header, Examples (4 demos), API Reference
- Examples:
  1. **Basic** — 10 pages, interactive
  2. **Many pages** — 50 pages starting at page 25, shows ellipsis
  3. **Custom sibling count** — `siblingCount={2}` for wider window
  4. **Few pages** — 3 pages, no ellipsis

### 2b. Sidebar update

- Add "Pagination" to Navigation children in `COMPONENT_ITEMS` in `apps/docs/components/Sidebar.tsx`

### Files touched (Phase 2)

| File | Action |
|------|--------|
| `apps/docs/app/components/pagination/page.tsx` | create |
| `apps/docs/components/Sidebar.tsx` | update |
