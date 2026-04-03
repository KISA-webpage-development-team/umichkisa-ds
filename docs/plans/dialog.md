# Dialog Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Rewrite the Dialog component with size variants, animations, proper subcomponents, and DS token compliance.

**Architecture:** Compound component wrapping `@radix-ui/react-dialog`. Seven exports: `Dialog`, `DialogTrigger`, `DialogClose`, `DialogContent`, `DialogTitle`, `DialogDescription`, `DialogFooter`. Styling via `cn()` — size is the only variant dimension (no CVA). Custom `@keyframes` for overlay fade and content slide-up (same pattern as Tooltip).

**Tech Stack:** Radix Dialog, Tailwind v4, `cn()` utility, Lucide icons via `<Icon>`.

---

## Phase 1: Component Implementation

### Task 1: Add dialog animation keyframes

**Files:**
- Modify: `packages/web/src/styles/index.css`

Add four keyframes after the existing `tooltip-out` block:

```css
@keyframes dialog-overlay-in {
  from { opacity: 0; }
  to   { opacity: 1; }
}

@keyframes dialog-overlay-out {
  from { opacity: 1; }
  to   { opacity: 0; }
}

@keyframes dialog-content-in {
  from { opacity: 0; transform: translate(-50%, -48%) scale(0.96); }
  to   { opacity: 1; transform: translate(-50%, -50%) scale(1); }
}

@keyframes dialog-content-out {
  from { opacity: 1; transform: translate(-50%, -50%) scale(1); }
  to   { opacity: 0; transform: translate(-50%, -48%) scale(0.96); }
}
```

Note: The transforms include `translate(-50%, -50%)` because the content is centered via `left-1/2 top-1/2`.

### Task 2: Rewrite Dialog component

**Files:**
- Rewrite: `packages/web/src/components/overlay/Dialog.tsx`

**Subcomponents:**

1. **Dialog** — re-export `RadixDialog.Root` (passthrough)
2. **DialogTrigger** — re-export `RadixDialog.Trigger` (passthrough)
3. **DialogClose** — re-export `RadixDialog.Close` (passthrough)
4. **DialogContent** — the main styled component
   - Props: `children`, `size?: "sm" | "md" | "lg" | "full"` (default `"md"`), `showCloseButton?: boolean` (default `true`), `className?: string`
   - Size map: `sm` → `max-w-sm` (384px), `md` → `max-w-lg` (512px), `lg` → `max-w-2xl` (672px), `full` → `max-w-[calc(100vw-2rem)]`
   - Renders Portal > Overlay + Content
   - Overlay: `fixed inset-0 z-50 bg-black/50` with `dialog-overlay-in`/`dialog-overlay-out` animations
   - Content: centered (`fixed left-1/2 top-1/2`), `rounded-lg border border-border bg-surface p-6 shadow-lg`, with `dialog-content-in`/`dialog-content-out` animations
   - Close button: `<button>` wrapping `<Icon name="x" size="sm" />` in the top-right corner, uses `DialogClose` from Radix via `asChild`
   - Durations: 150ms in, 100ms out (match Tooltip)
5. **DialogTitle** — wraps `RadixDialog.Title`
   - Props: `children`, `className?`
   - Typography: `type-h4 text-foreground`
6. **DialogDescription** — wraps `RadixDialog.Description`
   - Props: `children`, `className?`
   - Typography: `type-body-sm text-muted-foreground`
7. **DialogFooter** — plain `<div>`
   - Props: `children`, `className?`
   - Layout: `flex justify-end gap-2 mt-6`

**Export structure:** Named function exports (matching Dropdown pattern). Types exported separately.

### Task 3: Update barrel exports

**Files:**
- Modify: `packages/web/src/components/overlay/index.ts`

Add `DialogDescription`, `DialogFooter` exports and their types.

### Task 4: Verify package index exports

**Files:**
- Check: `packages/web/src/index.ts`

Verify the overlay barrel is already re-exported (it should be from prior overlay work). No changes expected.

---

## Phase 2: Docs Page + Sidebar

### Task 5: Create docs page

**Files:**
- Create: `apps/docs/app/components/dialog/page.tsx`

Must be `'use client'` (interactive Dialog demos).

**Sections:**

1. **Header** — "Dialog" title, description of modal overlay pattern. Mention: use Dialog for confirmations and forms; use Popover for non-modal anchored content; use Dropdown for action menus.

2. **Examples:**
   - **Basic** — Dialog with title, description, and close button (default). Trigger via `Button variant="secondary"`.
   - **Sizes** — Four dialogs (`sm`, `md`, `lg`, `full`) each triggered by a labeled button, showing a title and short description inside.
   - **With Footer** — Confirmation pattern: title, description, footer with Cancel + Confirm buttons. Cancel uses `DialogClose asChild` + `Button variant="secondary"`. Confirm uses `Button`.
   - **Custom Close** — `showCloseButton={false}`, custom footer with only action buttons.

3. **API Reference** — One table per subcomponent (matching Dropdown/Popover docs pattern):
   - Dialog (root): `open`, `defaultOpen`, `onOpenChange`
   - DialogTrigger: `asChild`, `children`
   - DialogContent: `children`, `size`, `showCloseButton`, `className`
   - DialogTitle: `children`, `className`
   - DialogDescription: `children`, `className`
   - DialogFooter: `children`, `className`
   - DialogClose: `asChild`, `children`

### Task 6: Add Dialog to sidebar

**Files:**
- Modify: `apps/docs/components/Sidebar.tsx`

Add `{ label: 'Dialog', href: '/components/dialog' }` to the Overlays children array, **before** Dropdown (alphabetical order).
