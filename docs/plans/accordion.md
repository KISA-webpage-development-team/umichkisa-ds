# Accordion — Implementation Plan

## Decisions (from grill-me)

- Radix `@radix-ui/react-accordion` wrapper
- `type="single"` (default, collapsible) and `type="multiple"`
- Four exports: `Accordion`, `AccordionItem`, `AccordionTrigger`, `AccordionContent`
- Category: `display/` — migrate Avatar + Badge here too
- `cn()` only (no CVA)
- CSS keyframe animation via `--radix-accordion-content-height`
- Chevron: `<Icon name="chevron-down" size="sm" />` default on, `showChevron` prop
- Disabled: exposed on AccordionItem, `text-disabled-foreground`
- Borders: `divide-y divide-border` on root
- Trigger: `type-body !font-semibold text-foreground py-4 hover:underline`
- Content: `pb-4 type-body text-foreground`

---

## Phase 1: Component implementation

### 1a. Install Radix dependency

- `pnpm --filter @umichkisa-ds/web add @radix-ui/react-accordion`

### 1b. Create `display/` category, migrate Avatar + Badge

- Create `packages/web/src/components/display/`
- Move `avatar/Avatar.tsx` → `display/Avatar.tsx`
- Move `badge/Badge.tsx` → `display/Badge.tsx`
- Delete empty `avatar/` and `badge/` directories
- Create `display/index.ts` barrel exporting Avatar, Badge (and later Accordion)
- Update `packages/web/src/index.ts`: replace `avatar` + `badge` lines with single `display` line

### 1c. Implement Accordion

- Create `packages/web/src/components/display/Accordion.tsx`
- Add keyframe animations (`accordion-down`, `accordion-up`) to `packages/web/src/styles/kisa-ds.css`
- Update `display/index.ts` to export Accordion sub-components

### Files touched (Phase 1)

| File | Action |
|------|--------|
| `packages/web/package.json` | add radix accordion dep |
| `packages/web/src/components/display/Accordion.tsx` | create |
| `packages/web/src/components/display/Avatar.tsx` | move from avatar/ |
| `packages/web/src/components/display/Badge.tsx` | move from badge/ |
| `packages/web/src/components/display/index.ts` | create |
| `packages/web/src/components/avatar/` | delete directory |
| `packages/web/src/components/badge/` | delete directory |
| `packages/web/src/index.ts` | update exports |
| `packages/web/src/styles/kisa-ds.css` | add keyframes |

---

## Phase 2: Docs page + sidebar

### 2a. Docs page

- Create `apps/docs/app/components/accordion/page.tsx`
- Match Dialog page layout pattern exactly
- Sections: Header, Examples (4 practical demos), API Reference (4 sub-component tables)
- Examples: FAQ, Settings panel (multiple), Disabled item, No chevron

### 2b. Sidebar update

- Add "Accordion" to `COMPONENT_ITEMS` in `apps/docs/components/Sidebar.tsx` under Data Display

### Files touched (Phase 2)

| File | Action |
|------|--------|
| `apps/docs/app/components/accordion/page.tsx` | create |
| `apps/docs/components/Sidebar.tsx` | update |
