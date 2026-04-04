# Card Implementation Plan

## Phase 1: Component Implementation

### Files to create
- `packages/web/src/components/display/Card.tsx`
- `packages/web/src/components/display/index.ts`

### Files to modify
- `packages/web/src/index.ts` — add `export * from "./components/display"`

### Design decisions (from grill-me)
- **Architecture:** Compound component — Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter
- **Styling:** `cn()` only, no CVA
- **Card base:** `bg-surface-subtle border border-border rounded-md`
- **Padding:** Card none; CardHeader `p-4`; CardContent/CardFooter `px-4 pb-4`
- **Typography:** CardTitle `type-h4 text-foreground`; CardDescription `type-body-sm text-muted-foreground`
- **Polymorphism:** Only CardTitle gets `as` prop (h1–h6, default h3)
- **CardFooter:** `flex items-center gap-2`

### Props interfaces
- `CardProps` — extends `HTMLAttributes<HTMLDivElement>`, no extra props
- `CardHeaderProps` — extends `HTMLAttributes<HTMLDivElement>`, no extra props
- `CardTitleProps` — extends `HTMLAttributes<HTMLHeadingElement>`, `as?: "h1"|"h2"|"h3"|"h4"|"h5"|"h6"` (default "h3")
- `CardDescriptionProps` — extends `HTMLAttributes<HTMLParagraphElement>`, no extra props
- `CardContentProps` — extends `HTMLAttributes<HTMLDivElement>`, no extra props
- `CardFooterProps` — extends `HTMLAttributes<HTMLDivElement>`, no extra props

## Phase 2: Docs Page + Sidebar

### Files to create
- `apps/docs/app/components/card/page.tsx`

### Files to modify
- `apps/docs/components/Sidebar.tsx` — add Card to COMPONENT_ITEMS under "Data Display"

### Docs sections
1. **Header** — component name, description, canonical purpose
2. **Examples** (4 total, each in ComponentPreview):
   - Basic Card — practical event/announcement card with title, description, content
   - Card with Footer — card with action buttons in footer
   - Cards in Grid — 2-3 cards in a Grid showing real layout
   - Custom Composition — image at top, flexible content arrangement
3. **API Reference** — HTML table for each sub-component's props

### Reference
- Match layout pattern from `apps/docs/app/components/dialog/page.tsx`
- Examples must feel like real KISA app use cases (events, announcements, members)
