# Fix plan — `/components/dropdown`

Source: `apps/docs/app/components/dropdown/page.tsx`
Findings: `docs/reviews/docs-app-review.md` § /components/dropdown

## Phase 1 — Content fixes (low-risk)

### Task 1.1 — Fix Basic example variant mismatch (Fix #1, critical)
In the "Basic" `<h3>` description paragraph, change the inline `<code>` text from `variant="secondary"` to `variant="primary"` so the prose matches the rendered preview and code snippet.

### Task 1.2 — Drop forward-reference in "With groups" (Fix #3, minor)
In the "With groups" description paragraph, remove the sentence: "For a simple visual break without labels, use `DropdownSeparator` instead." The "With separator" section that follows already covers this.

### Task 1.3 — Trim API Reference intro (Fix #4, minor)
Replace the API Reference intro paragraph:
> "Dropdown is a compound component built on Radix DropdownMenu. Each sub-component accepts the props listed below."

with:
> "Each sub-component accepts the props listed below."

The header already states the Radix dependency.

## Phase 2 — Table migration (Fix #2, major, ds-violation)

### Task 2.1 — Migrate Dropdown (root) API table
Replace the raw `<table>` for `Dropdown` props with:
- Desktop: `<Table>` wrapped in `<div className="hidden md:block ...">`
- Mobile: `<TableMobileList>` wrapped in `<div className="block md:hidden">`

Preserve all existing rows: `open`, `defaultOpen`, `onOpenChange`. Match the column shape from already-migrated component pages (e.g., `/components/popover` or `/components/dialog` if those tables have been migrated; otherwise `/components/accordion`).

### Task 2.2 — Migrate DropdownTrigger API table
Same migration for `DropdownTrigger` props (`asChild`, `children`).

### Task 2.3 — Migrate DropdownContent API table
Same migration for `DropdownContent` props (`children`, `side`, `align`, `sideOffset`, `className`).

### Task 2.4 — Migrate DropdownItem API table
Same migration for `DropdownItem` props (`children`, `onSelect`, `variant`, `disabled`, `className`).

### Task 2.5 — Migrate DropdownGroup API table
Same migration for `DropdownGroup` props (`label`, `children`).

## Verification

- Run `pnpm --filter @umichkisa-ds/docs build` (or `pnpm typecheck`) to confirm imports + types resolve.
- Visually verify the page at desktop (≥768px) and mobile (<768px) widths to confirm tables show desktop view above `md` and mobile list below.
- Confirm all 4 content fixes render correctly.

## Out of scope

- Raw inline `<code>` → `<InlineCode>` migration (deferred to global sweep, per project convention).
- Sidebar nav entry for Dropdown (separate concern, dropped from review).
