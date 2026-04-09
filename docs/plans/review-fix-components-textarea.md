# Fix Plan — /components/textarea

Source: `docs/reviews/docs-app-review.md` § /components/textarea
Page: `apps/docs/app/components/textarea/page.tsx`

## Phase 1 — Fixes (single phase, both viewports)

### Task 1 — Migrate API Reference table to DS Table + TableMobileList (Fix #1)

- Remove the raw `<table>` block (~lines 176–213) and its `overflow-x-auto` wrapper.
- Add desktop block: DS `Table` with the same API the Input fix used (verify against the post-fix `apps/docs/app/components/input/page.tsx` for the canonical pattern). Wrap in `<div className="hidden md:block my-6">`.
- Add mobile block: `TableMobileList` mirroring the rows. Wrap in `<div className="block md:hidden my-6">`.
- Columns: Prop / Type / Default / Description.
- Rows (preserve current content):
  1. `invalid` — `boolean` — `false` — Applies error border and sets aria-invalid.
  2. `rows` — `number` — `3` — Number of visible text lines. Maps to native rows attribute.
  3. `className` — `string` — — — Merged via cn(). Use for layout utilities only.
  4. `...props` — `TextareaHTMLAttributes` — — — All native textarea attributes (value, onChange, placeholder, disabled, name, etc.).
- Inline `<code>` cells stay (per standing rule, do not migrate to InlineCode).
- This migration also resolves the cell typography inconsistency (old findings #2/#3).

### Task 2 — Replace "With Label" with "With FormItem" (Fix #2)

- File: `apps/docs/app/components/textarea/page.tsx`, "With Label" section (~lines 113–132).
- Rename heading to **"With FormItem"**.
- Replace the `withLabelCode` snippet and demo with:

  ```tsx
  import { Textarea, FormItem } from '@umichkisa-ds/web'

  <FormItem htmlFor="message" label="Message">
    <Textarea id="message" placeholder="Write your message..." />
  </FormItem>
  ```

- Update imports at top of page: add `FormItem`, remove unused `Label`.
- Rename `withLabelCode`/`withLabelHighlighted` → `withFormItemCode`/`withFormItemHighlighted`.
- Body prose: trim to a single sentence explaining *why*, not mechanics. Example: "`FormItem` is the recommended composition — it wires label, description, and error together and provides the vertical layout."
- Demo wrapper: keep `<div className="w-full max-w-sm">` around the FormItem.

### Task 3 — Replace "With error message" to use FormItem `error` prop (Fix #3)

- File: same, "With error message" section (~lines 134–155).
- Replace `withErrorCode` and the demo with:

  ```tsx
  import { Textarea, FormItem } from '@umichkisa-ds/web'

  <FormItem htmlFor="message" label="Message" error="Message is required.">
    <Textarea id="message" invalid placeholder="Write your message..." />
  </FormItem>
  ```

- Drop the manual `<Label>` + `<p className="type-caption text-error">` composition.
- Body prose: trim to one sentence, e.g., "Pair `invalid` on the Textarea with `FormItem`'s `error` prop to show an error message below the field."

### Task 4 — Remove redundant "extends native textarea" from intro (Fix #4)

- File: same, intro paragraph (~lines 66–83).
- Remove the "Extends the native `<textarea>` element, with an additional `invalid` prop for error styling." clause. The API Reference intro already states this.
- Keep the Label/FormItem composition mention (FormItem example now exists on the page).
- Final intro should read approximately: "Multi-line text field for user input. Resizes vertically by default. Designed to compose with `Label` and `FormItem`."

### Task 5 — Verify controlled example is unchanged (no-op)

- Controlled section stays as-is (bare Textarea to keep focus on the controlled pattern).

## Verification

- Page renders at 1280px and 375px without layout breakage.
- Desktop shows the DS `Table`; mobile shows `TableMobileList` (hidden/visible swap at `md`).
- FormItem examples render with proper label + error association.
- Skip `pnpm build`/`pnpm typecheck` per standing rule for surgical single-file docs edits — unless the new imports or highlighted code maps warrant a typecheck (Task 2/3 change imports, so at minimum open the file in the Next.js dev server and confirm no runtime errors).
