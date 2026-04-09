# Fix Plan — `/components/select`

Source: `apps/docs/app/components/select/page.tsx`
Review: `docs/reviews/docs-app-review.md` → `/components/select`
Constraints: `docs/DS_CONSTRAINTS.md`

All findings apply to both desktop and mobile. Single phase.

---

## Phase 1 — Content restructure + Table migration

### Task 1 — Add "With FormItem" example as the primary composition (Fix #4)

- Insert a new `<h3>With FormItem</h3>` example **before** the existing "With Label" example.
- Frame the intro prose as: *"Recommended — wrap Select in `FormItem` for label + aria wiring. FormItem auto-generates `{htmlFor}-label` on its Label; reference it on the trigger via `aria-labelledby`."*
- Example code + rendered demo:
  ```tsx
  <FormItem htmlFor="fruit" label="Fruit">
    <Select>
      <SelectTrigger
        placeholder="Select a fruit..."
        aria-labelledby="fruit-label"
      />
      <SelectContent>
        <SelectItem value="apple">Apple</SelectItem>
        <SelectItem value="banana">Banana</SelectItem>
      </SelectContent>
    </Select>
  </FormItem>
  ```
- Import `FormItem` from `@umichkisa-ds/web`.
- Wrap the demo in `w-full max-w-sm` per the page pattern.
- Add a `highlight()` call for the new code string in the `Promise.all`.

### Task 2 — Reframe "With Label" as lower-level fallback (Fix #2)

- Move the existing "With Label" example **after** "With FormItem".
- Update the intro prose: *"If you can't use `FormItem`, wire the label manually with `Label` + `aria-labelledby`."*
- Drop `htmlFor` from `Label` in both `withLabelCode` and the rendered demo — use only `id`.
- Code block should read:
  ```tsx
  <div className="flex flex-col gap-2">
    <Label id="fruit-label">Fruit</Label>
    <Select>
      <SelectTrigger placeholder="Select a fruit..." aria-labelledby="fruit-label" />
      <SelectContent>
        <SelectItem value="apple">Apple</SelectItem>
        <SelectItem value="banana">Banana</SelectItem>
      </SelectContent>
    </Select>
  </div>
  ```
- Rendered demo must match exactly (drop the `htmlFor="fruit-label-demo"` pattern).

### Task 3 — Rewrite "Invalid" example to use FormItem (Fix #5)

- Replace the raw `<Label>` + `<p className="type-caption text-error">` structure with `FormItem` using its `error` prop.
- New code + demo:
  ```tsx
  <FormItem htmlFor="fruit-invalid" label="Fruit" error="Please select a fruit.">
    <Select>
      <SelectTrigger
        placeholder="Select a fruit..."
        aria-labelledby="fruit-invalid-label"
        invalid
      />
      <SelectContent>
        <SelectItem value="apple">Apple</SelectItem>
        <SelectItem value="banana">Banana</SelectItem>
      </SelectContent>
    </Select>
  </FormItem>
  ```
- Update the intro prose to point at FormItem's `error` prop rather than "pair `invalid` with a `Label` and an error message below".

### Task 4 — Add `SelectSeparator` API section (Fix #3)

- Add `<h3>SelectSeparator</h3>` in API Reference (placed after `SelectGroup`).
- Body: single paragraph — *"Visual divider between groups. Takes no props."*
- No table.

### Task 5 — Migrate all 5 API tables to DS `Table` + `TableMobileList` (Fix #1)

- Replace each of the 5 raw `<div className="my-6 overflow-x-auto"><table>…</table></div>` blocks with:
  - `<Table>` wrapped in `hidden md:block`
  - `<TableMobileList>` wrapped in `block md:hidden`
- Components: `Select`, `SelectTrigger`, `SelectContent`, `SelectItem`, `SelectGroup`.
- Use the same data as the current tables (no prop additions or removals in this task — scope is migration only).
- Follow the exact pattern used in `/components/input` (`apps/docs/app/components/input/page.tsx`) for Table + TableMobileList composition. Read that file first as reference.
- Raw `<code>` inline tags inside table cells: **leave as-is** (per standing rule to skip InlineCode migration).

### Task 6 — Verification

- `pnpm --filter @umichkisa-ds/docs build` must pass (or full `pnpm build` if the filter name differs — confirm from root `package.json`).
- `pnpm typecheck` must pass.
- Visual smoke check at 1280px and 375px on the devtunnels URL (`https://vnw20xbg-3000.asse.devtunnels.ms/components/select`):
  - FormItem example appears first and is visually correct.
  - Label example works without `htmlFor`.
  - Invalid example shows the error via FormItem's slot.
  - All 5 API sections render Table on desktop, TableMobileList on mobile.
  - SelectSeparator section present.

---

## Out of scope

- InlineCode migration for raw `<code>` tags (standing rule).
- Any change to the underlying `Select` / `SelectSeparator` / `FormItem` components in `packages/web`.
- Additional examples beyond those listed.
