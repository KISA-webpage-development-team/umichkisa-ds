# ToggleBar Implementation Plan

## Decisions (from grill-me)

- **Semantic role:** `radiogroup` + `radio` (not tablist)
- **Category:** `navigation/` (move from `layout/`)
- **Mode:** Full rewrite
- **Value type:** Always `string`
- **Item shape:** `{ value: string; label: string; icon?: ReactNode }`
- **Props:** `value`, `onValueChange`, `items`, `size` (`sm` | `md`), `fullWidth`, `className`
- **Styling:** `cn()` only (one variant dimension), bottom-border indicator with `--color-brand-primary`
- **Keyboard:** Roving tabindex, arrow keys move + select, Home/End
- **No built-in responsiveness**

---

## Phase 1: Component Implementation

### Files to modify

1. **Delete** `packages/web/src/components/layout/ToggleBar.tsx`
2. **Remove** ToggleBar exports from `packages/web/src/components/layout/index.ts`
3. **Create** `packages/web/src/components/navigation/ToggleBar.tsx`
4. **Update** `packages/web/src/components/navigation/index.ts` — add ToggleBar exports

### Component spec

```
ToggleBarItem = { value: string; label: string; icon?: ReactNode }

ToggleBarProps = {
  value: string
  onValueChange: (value: string) => void
  items: ToggleBarItem[]
  size?: "sm" | "md"           // default "md"
  fullWidth?: boolean           // default false
  className?: string
}
```

### Behavior

- Container: `role="radiogroup"`, `flex`, optional `w-full`
- Each item: `role="radio"`, `aria-checked`, `tabIndex` (roving: 0 for focused, -1 for others)
- Click → `onValueChange(item.value)`
- Keyboard: ArrowLeft/ArrowRight cycle through items, Home/End jump to first/last, selection follows focus
- Bottom border indicator: `border-b-2 border-[var(--color-brand-primary)]` on active item

### Styling

- `md` size: `type-body`, `px-3 py-2`
- `sm` size: `type-body-sm`, `px-2 py-1.5`
- Active: `text-foreground font-semibold border-b-2 border-[var(--color-brand-primary)]`
- Inactive: `text-muted-foreground border-b-2 border-transparent`
- Hover: `text-foreground`
- Transition: `transition-colors`
- Icon + text: `flex items-center gap-2` (md), `gap-1` (sm)
- Focus: dual-ring pattern per DS_CONSTRAINTS (buttons/interactive elements)

---

## Phase 2: Docs Page

### Files to create/modify

1. **Create** `apps/docs/app/components/toggle-bar/page.tsx`
2. **Update** `apps/docs/components/Sidebar.tsx` — add ToggleBar to Navigation children

### Page structure (match Dialog page pattern)

1. **Header** — name, description, purpose
2. **Examples:**
   - Content view switch — icon + text items ("Posts" / "Comments"), default `md` size
   - Page size selector — text-only items ("10" / "25" / "50"), `sm` size
   - Full width — `fullWidth` prop stretching across container
3. **API Reference** — single table for ToggleBar props + ToggleBarItem type
