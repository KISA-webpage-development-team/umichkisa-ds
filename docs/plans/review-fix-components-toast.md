# Fix Plan — /components/toast

Source: `apps/docs/app/components/toast/page.tsx`
Review: `docs/reviews/docs-app-review.md` § /components/toast

## Phase 1 — DS violation (major)

### Task 1.1 — Migrate three raw `<table>` blocks to DS Table + TableMobileList

Fix #1 from review.

Replace each of the three `<table>` blocks with a desktop `Table` (`hidden md:block` wrapper) + a `TableMobileList` (`block md:hidden`):

1. **Toaster props table** — columns: Prop, Type, Default, Description.
2. **`toast()` methods table** — columns: Method, Description.
3. **Toast Options table** — columns: Option, Type, Description.

Reference any recently-migrated docs page (e.g. `/components/tabs`, `/components/accordion`) for the exact Table + TableMobileList pattern. Drop the surrounding `my-6 overflow-x-auto` wrapper — Table component handles its own spacing.

Verify after each table:
- Desktop table renders only ≥ `md`
- Mobile list renders only < `md`
- Inline `<code>` content inside cells preserved as-is (InlineCode migration is out of scope per standing rule)

## Phase 2 — Minor cleanups

### Task 2.1 — First h3 spacing
Fix #2. In the API Reference section, change the `Toaster` h3 from `mt-8 mb-2` → `mt-6 mb-2`. Leave the other two h3s (`toast()`, `Toast Options`) at `mt-8 mb-2`.

### Task 2.2 — Setup intro paragraph spacing
Fix #3. In the Setup section, change the intro paragraph (`<p className="type-body mb-4 ...">`) from `mb-4` → `mb-2` to match every other section intro on the page.

### Task 2.3 — Drop redundant deck sentence
Fix #4. In the page header deck (the second `<p>` of the header, currently "Built on Sonner. Mount `<Toaster />` once, then call `toast()` imperatively from anywhere — no React state needed."), drop the "Mount `<Toaster />` once, then call `toast()` imperatively from anywhere — no React state needed." portion. Keep "Built on Sonner." as a short standalone line, or merge it into the surrounding deck — pick whichever reads cleaner. Setup section remains the canonical mounting explanation.

### Task 2.4 — Add API Reference lead
Fix #5. Insert a one-line `<p className="type-body mb-2 text-foreground max-w-prose">` immediately after the API Reference `<h2>` and before the `Toaster` `<h3>`. Suggested: "Reference for the `Toaster` provider, the imperative `toast()` API, and per-toast options." (Refine wording as you write it.)

## Verification

- Run `pnpm typecheck` (skip `pnpm build` per standing small-docs-edit rule unless tables migration changes warrant it — table migration touches imports, so run `pnpm build` for Phase 1)
- Visit `/components/toast` at desktop and mobile widths and confirm all five fixes render correctly
- Confirm tables stack to mobile list at < `md` and switch to table at ≥ `md`
