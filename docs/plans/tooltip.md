# Tooltip — Implementation Plan

## Decisions (from grill-me)

- Radix UI (`@radix-ui/react-tooltip`), Provider baked into each instance
- Single wrapper API: `<Tooltip content="..."><Trigger /></Tooltip>`
- `content` is `string` only
- 4 props: `content` (required), `children` (required), `side` (default `"top"`), `delayDuration` (default `200`)
- Brand-styled bubble: navy bg + maize text, `type-caption`, `rounded-md`, `px-3 py-1.5`, `shadow-sm`, no arrow
- Hardcoded: `sideOffset={4}`, no controlled mode, no className on content
- Category: `overlay/`
- Docs: Header + 3 examples (default, placement, custom delay) + API Reference

---

## Phase 1: Component Implementation

### 1.1 Install dependency

```bash
pnpm --filter @umichkisa-ds/web add @radix-ui/react-tooltip
```

### 1.2 Create component

**File:** `packages/web/src/components/overlay/Tooltip.tsx`

- Import `@radix-ui/react-tooltip`
- Export `Tooltip` component and `TooltipProps` type
- Props: `content: string`, `children: ReactNode`, `side?: "top" | "right" | "bottom" | "left"` (default `"top"`), `delayDuration?: number` (default `200`)
- Internals: `Provider > Root > Trigger (asChild) > Portal > Content`
- Content styling: `bg-[var(--color-brand-primary)] text-[var(--color-brand-foreground)] type-caption rounded-md px-3 py-1.5 shadow-sm z-50`
- `sideOffset={4}`, no arrow
- Simple `cn()` — no CVA needed (no variant matrix)

### 1.3 Update barrel export

**File:** `packages/web/src/components/overlay/index.ts`

- Add `export { Tooltip } from "./Tooltip"` and `export type { TooltipProps } from "./Tooltip"`

---

## Phase 2: Docs Page + Sidebar

### 2.1 Create docs page

**File:** `apps/docs/app/components/tooltip/page.tsx`

Sections:
1. **Header** — "Tooltip" title, description: informational text label that appears on hover/focus, used for icon-only buttons and truncated text
2. **Examples:**
   - Default — Tooltip on an IconButton
   - Placement — four `side` options shown side by side
   - Custom delay — longer delay example
3. **API Reference** — table with 4 props (content, children, side, delayDuration)

### 2.2 Update sidebar

**File:** `apps/docs/components/Sidebar.tsx`

- Add new "Overlays" category to `COMPONENT_ITEMS` (this is the first overlay component shipping)
- Single entry: `{ label: 'Tooltip', href: '/components/tooltip' }`
