# Form UI Design Review Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Apply KISA brand identity to form toggle controls, standardize toggle label composition via `text` prop, fix consistency issues across all form components.

**Architecture:** Toggle controls (Checkbox, Switch, RadioItem) gain a `text` string prop that renders inline label text with consistent styling. Checked states move from generic `bg-foreground` to branded `bg-brand-primary` (navy) + `bg-brand-foreground` (maize) indicators. Select gets branded hover/selection treatment. Radio focus pattern aligns with other form controls.

**Tech Stack:** React, Tailwind v4 with DS semantic tokens, Radix UI (Radio, Select), Vitest + Testing Library

---

## Phase A: Code Changes

### Task 1: Fix Radio focus pattern

Radio currently uses dual-ring focus (outline + box-shadow) while all other form controls use simplified border-color focus. DS_CONSTRAINTS explicitly lists Radio as a form control that should use the simplified pattern.

**Files:**
- Modify: `packages/web/src/components/form/Radio.tsx:39-43`

**Step 1:** In `Radio.tsx`, replace the RadioGroup.Item focus classes:

```tsx
// REMOVE these lines from RadioGroup.Item className:
"focus-visible:outline focus-visible:outline-2 focus-visible:outline-focus-ring focus-visible:shadow-[0_0_0_4px_var(--color-brand-primary)]",

// REPLACE with:
"focus-visible:outline-none focus-visible:border-brand-primary",
```

**Step 2:** Run `pnpm build && pnpm typecheck` — both must pass.

**Step 3:** Visually verify on `/test/form` — tab to a radio item, confirm it shows navy border (not dual-ring).

---

### Task 2: Radio checked state — brand colors

Change Radio checked state from generic `bg-foreground` to branded navy + maize.

**Files:**
- Modify: `packages/web/src/components/form/Radio.tsx:40-41, 44, 48-49`

**Step 1:** In RadioGroup.Item, update checked state classes:

```tsx
// REMOVE:
"data-[state=checked]:bg-foreground data-[state=checked]:border-foreground",

// REPLACE with:
"data-[state=checked]:bg-brand-primary data-[state=checked]:border-brand-primary",
```

**Step 2:** Update the disabled checked state:

```tsx
// REMOVE:
"disabled:data-[state=checked]:bg-disabled-foreground disabled:data-[state=checked]:border-disabled-foreground",

// REPLACE with (no change — keep as-is):
"disabled:data-[state=checked]:bg-disabled-foreground disabled:data-[state=checked]:border-disabled-foreground",
```

(Disabled stays generic — confirmed in grill-me.)

**Step 3:** Update the Indicator dot color:

```tsx
// REMOVE:
<span className="size-2.5 rounded-full bg-surface" />

// REPLACE with:
<span className="size-2.5 rounded-full bg-brand-foreground" />
```

**Step 4:** Run `pnpm build && pnpm typecheck`.

**Step 5:** Visually verify on `/test/form` — selected radio should show navy circle with maize dot.

---

### Task 3: RadioItem — `children` to `text` prop

Replace RadioItem's `children` (ReactNode) with a `text` string prop for consistent, guarded label rendering. Add disabled text styling.

**Files:**
- Modify: `packages/web/src/components/form/Radio.tsx:26-55`
- Modify: `packages/web/src/components/form/index.ts` (export type)

**Step 1:** Update RadioItemProps:

```tsx
type RadioItemProps = {
  value: string;
  text: string;
  disabled?: boolean;
  className?: string;
};
```

**Step 2:** Update RadioItem render — replace `{children}` with internal label using `text`:

```tsx
function RadioItem({ value, text, disabled, className }: RadioItemProps) {
  return (
    <label className={cn("flex items-center gap-2", className)}>
      <RadixRadioGroup.Item
        value={value}
        disabled={disabled}
        className={cn(
          "relative flex items-center justify-center size-5 rounded-full border border-border-strong bg-surface transition-colors",
          "data-[state=checked]:bg-brand-primary data-[state=checked]:border-brand-primary",
          "focus-visible:outline-none focus-visible:border-brand-primary",
          "disabled:pointer-events-none disabled:bg-surface-subtle disabled:border-border",
          "disabled:data-[state=checked]:bg-disabled-foreground disabled:data-[state=checked]:border-disabled-foreground",
          "group-data-[invalid]:border-error group-data-[invalid]:focus-visible:border-error"
        )}
      >
        <RadixRadioGroup.Indicator className="flex items-center justify-center">
          <span className="size-2.5 rounded-full bg-brand-foreground" />
        </RadixRadioGroup.Indicator>
      </RadixRadioGroup.Item>
      <span className={cn(
        "type-body-sm text-foreground",
        disabled && "text-disabled-foreground"
      )}>
        {text}
      </span>
    </label>
  );
}
```

**Step 3:** Run `pnpm build && pnpm typecheck`.

**Note:** Tasks 1, 2, and 3 all touch Radio.tsx. The final file state after Task 3 is the complete rewrite above — Tasks 1-2 are logical steps, Task 3 is the commit point.

**Step 4:** Commit Radio changes.

---

### Task 4: Checkbox — `text` prop + brand colors

Add `text` string prop to Checkbox, update checked state to brand colors, add disabled text styling.

**Files:**
- Modify: `packages/web/src/components/form/Checkbox.tsx`

**Step 1:** Update CheckboxProps:

```tsx
type CheckboxProps = Omit<React.InputHTMLAttributes<HTMLInputElement>, "type"> & {
  invalid?: boolean;
  text?: string;
};
```

**Step 2:** Rewrite Checkbox component:

```tsx
function Checkbox({ invalid = false, text, className, disabled, ...props }: CheckboxProps) {
  const control = (
    <span className={cn("relative inline-flex items-center justify-center size-5", !text && className)}>
      <input
        type="checkbox"
        aria-invalid={invalid}
        disabled={disabled}
        className="peer absolute inset-0 opacity-0 cursor-pointer disabled:cursor-default"
        {...props}
      />
      <span
        className={cn(
          "size-5 rounded-md border border-border-strong bg-surface transition-colors",
          "peer-checked:bg-brand-primary peer-checked:border-brand-primary",
          "peer-focus-visible:outline-none peer-focus-visible:border-brand-primary",
          "peer-disabled:pointer-events-none peer-disabled:bg-surface-subtle peer-disabled:border-border",
          "peer-disabled:peer-checked:bg-disabled-foreground peer-disabled:peer-checked:border-disabled-foreground",
          invalid && "border-error peer-focus-visible:border-error"
        )}
      />
      <svg
        aria-hidden="true"
        viewBox="0 0 14 14"
        fill="none"
        className="absolute size-3.5 text-brand-foreground opacity-0 peer-checked:opacity-100 pointer-events-none transition-opacity"
      >
        <polyline
          points="2.5 7 5.5 10.5 11.5 3.5"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </span>
  );

  if (!text) return control;

  return (
    <label className={cn("flex items-center gap-2", className)}>
      {control}
      <span className={cn(
        "type-body-sm text-foreground",
        disabled && "text-disabled-foreground"
      )}>
        {text}
      </span>
    </label>
  );
}
```

Key changes from current:
- `text` prop renders inline label text in `type-body-sm`
- Checked: `bg-foreground` → `bg-brand-primary`, checkmark `text-surface` → `text-brand-foreground`
- Disabled text: `text-disabled-foreground` when `disabled`
- When `text` is provided, wraps in `<label>` with `gap-2`; when not, renders control only (for manual composition)

**Step 3:** Run `pnpm build && pnpm typecheck`.

**Step 4:** Visually verify on `/test/form` — checked checkbox should show navy box with maize checkmark.

**Step 5:** Commit Checkbox changes.

---

### Task 5: Switch — `text` prop + brand colors + size-mapped text

Add `text` string prop to Switch, map text size to control size, update checked state to brand colors, add disabled text styling.

**Files:**
- Modify: `packages/web/src/components/form/Switch.tsx`

**Step 1:** Update SwitchProps:

```tsx
type SwitchProps = Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  "type" | "role" | "size"
> & {
  invalid?: boolean;
  size?: "default" | "sm";
  text?: string;
};
```

**Step 2:** Rewrite Switch component:

```tsx
function Switch({
  invalid = false,
  size = "default",
  text,
  className,
  disabled,
  ...props
}: SwitchProps) {
  const isSmall = size === "sm";

  const control = (
    <span
      className={cn(
        "relative inline-flex items-center",
        isSmall ? "h-4 w-7" : "h-6 w-10",
        !text && className
      )}
    >
      <input
        type="checkbox"
        role="switch"
        aria-invalid={invalid}
        disabled={disabled}
        className="peer absolute inset-0 opacity-0 cursor-pointer disabled:cursor-default"
        {...props}
      />
      {/* Track */}
      <span
        className={cn(
          "pointer-events-none absolute inset-0 rounded-full border transition-colors",
          "border-border-strong bg-surface-subtle",
          "peer-checked:bg-brand-primary peer-checked:border-brand-primary",
          "peer-focus-visible:outline-none peer-focus-visible:border-brand-primary",
          "peer-disabled:pointer-events-none peer-disabled:bg-surface-subtle peer-disabled:border-border",
          "peer-disabled:peer-checked:bg-disabled-foreground peer-disabled:peer-checked:border-disabled-foreground",
          invalid && "border-error peer-focus-visible:border-error"
        )}
      />
      {/* Thumb */}
      <span
        className={cn(
          "pointer-events-none absolute rounded-full bg-foreground transition-all duration-200",
          "peer-checked:bg-surface",
          "peer-disabled:bg-disabled-foreground",
          "peer-disabled:peer-checked:bg-surface",
          isSmall
            ? "left-0.5 size-2.5 peer-checked:left-[calc(100%-0.125rem-0.75rem)] peer-checked:size-3"
            : "left-1 size-4 peer-checked:left-[calc(100%-0.25rem-1.25rem)] peer-checked:size-5"
        )}
      />
    </span>
  );

  if (!text) return control;

  return (
    <label className={cn("flex items-center gap-2", className)}>
      {control}
      <span className={cn(
        isSmall ? "type-caption" : "type-body-sm",
        "text-foreground",
        disabled && "text-disabled-foreground"
      )}>
        {text}
      </span>
    </label>
  );
}
```

Key changes:
- `text` prop with size-mapped typography: default → `type-body-sm`, sm → `type-caption`
- Checked track: `bg-foreground` → `bg-brand-primary`
- Disabled text: `text-disabled-foreground`
- Thumb stays `bg-surface` when checked (white on navy track)

**Step 3:** Run `pnpm build && pnpm typecheck`.

**Step 4:** Visually verify on `/test/form`.

**Step 5:** Commit Switch changes.

---

### Task 6: Select — brand hover + check icon

Update Select item hover to light maize and check icon to navy.

**Files:**
- Modify: `packages/web/src/components/form/Select.tsx:87-89, 96`

**Step 1:** In SelectItem, update hover/focus background:

```tsx
// REMOVE:
"hover:bg-surface-subtle focus:bg-surface-subtle focus:outline-none",

// REPLACE with:
"hover:bg-brand-accent-subtle focus:bg-brand-accent-subtle focus:outline-none",
```

**Step 2:** In SelectItem, update the check icon color. Wrap the Icon with a colored span:

```tsx
<span className="absolute left-2 flex items-center text-brand-primary">
  <RadixSelect.ItemIndicator>
    <Icon name="check" size="sm" />
  </RadixSelect.ItemIndicator>
</span>
```

**Step 3:** Run `pnpm build && pnpm typecheck`.

**Step 4:** Visually verify — open Select dropdown, hover items (light maize bg), select one (navy check icon).

**Step 5:** Commit Select changes.

---

### Task 7: Update test page

Update `/test/form` to use the new `text` prop API for all toggle controls.

**Files:**
- Modify: `apps/docs/app/test/form/page.tsx`

**Step 1:** Update imports and replace manual label composition with `text` prop:

```tsx
{/* Checkbox — was manual <label> wrapping */}
<Checkbox text="I agree to the terms and conditions" />

{/* RadioGroup — RadioItem uses text prop */}
<div className="flex flex-col gap-2">
  <Label htmlFor="contact">Preferred contact method</Label>
  <RadioGroup>
    <RadioItem value="email" text="Email" />
    <RadioItem value="phone" text="Phone" />
    <RadioItem value="mail" text="Mail" />
  </RadioGroup>
</div>

{/* Switch — default size */}
<Switch text="Email notifications" />

{/* Switch — sm size */}
<Switch size="sm" text="SMS alerts" />
```

**Step 2:** Run `pnpm build && pnpm typecheck`.

**Step 3:** Visually verify the full form at `/test/form`. Check:
- All toggle labels render in `type-body-sm` (sm Switch in `type-caption`)
- Checked states show navy + maize
- Select hover shows light maize
- Radio focus shows border-color (not dual-ring)

**Step 4:** Commit test page update.

---

## Phase C: Docs & Constraints Updates

### Task 8: Update Checkbox docs page

**Files:**
- Modify: `apps/docs/app/components/checkbox/page.tsx`

Update all examples to use `text` prop instead of manual `<label>` wrapping:
- Default example: `<Checkbox text="Accept terms" />`
- States example: show default, disabled, disabled+checked, invalid — all with `text`
- With FormItem example: `<FormItem ...><Checkbox id="terms" text="I agree to the terms" /></FormItem>`
- Controlled example: use `text` prop
- With error example: use `text` prop
- Update API reference table: add `text` prop (string, optional), note brand colors in checked state

**Step 1:** Rewrite the page with updated examples and code snippets.

**Step 2:** Run `pnpm build && pnpm typecheck`.

**Step 3:** Visually verify at `/components/checkbox`.

**Step 4:** Commit.

---

### Task 9: Update Switch docs page

**Files:**
- Modify: `apps/docs/app/components/switch/page.tsx`

Same pattern as Task 8:
- All examples use `text` prop
- Sizes example shows default (`type-body-sm`) and sm (`type-caption`) text
- With FormItem example
- Update API reference table: add `text` prop, note size-mapped text behavior

**Step 1-4:** Same workflow as Task 8.

---

### Task 10: Update Radio docs page

**Files:**
- Modify: `apps/docs/app/components/radio/page.tsx`

- All RadioItem examples change from `<RadioItem value="x">Label</RadioItem>` to `<RadioItem value="x" text="Label" />`
- Update API reference table: `children` removed, `text` prop added
- Note brand colors in checked state

**Step 1-4:** Same workflow as Task 8.

---

### Task 11: Update Select docs page

**Files:**
- Modify: `apps/docs/app/components/select/page.tsx`

- Add `aria-labelledby` example in the "With Label" section
- Note in description that Label is visual-only unless `aria-labelledby` is wired
- No API changes needed — just docs guidance

**Step 1-4:** Same workflow as Task 8.

---

### Task 12: Update FormItem docs page

**Files:**
- Modify: `apps/docs/app/components/form-item/page.tsx`

Add new examples:
- FormItem + Checkbox (with `text` prop)
- FormItem + Switch (with `text` prop)
- FormItem + RadioGroup
- Add note about manual `aria-describedby` wiring pattern:
  ```tsx
  <FormItem htmlFor="email" label="Email" description="We'll never share your email.">
    <Input id="email" aria-describedby="email-description" />
  </FormItem>
  ```

**Step 1-4:** Same workflow as Task 8.

---

### Task 13: Update DS_CONSTRAINTS.md

**Files:**
- Modify: `docs/DS_CONSTRAINTS.md`

Add under **Interactive States** section:

```markdown
Must: Use `--color-brand-primary` (navy) as the checked/selected background for toggle controls (Checkbox, Radio, Switch). [source:form-ui-review/2026-03-31]
Must: Use `--color-brand-foreground` (maize) for indicators on checked toggle controls — checkmarks, radio dots. [source:form-ui-review/2026-03-31]
Must: Use `--color-brand-accent-subtle` (light maize) as hover/focus background for interactive list items (Select items, Dropdown items, Popover menu items). [source:form-ui-review/2026-03-31]
Must: Use `--color-brand-primary` for selected-item indicators (check icons) in interactive lists. [source:form-ui-review/2026-03-31]
```

Add under **Components (General)** section or create a **Form Controls** section:

```markdown
Must: Toggle controls (Checkbox, Switch, RadioItem) use the `text` string prop for inline label text — never pass label content as children or via external markup. [source:form-ui-review/2026-03-31]
Must: Toggle inline label text uses `type-body-sm text-foreground`. Exception: Switch `size="sm"` uses `type-caption`. [source:form-ui-review/2026-03-31]
Must: Disabled toggle controls dim both the control and the inline text (`text-disabled-foreground`). [source:form-ui-review/2026-03-31]
```

**Step 1:** Apply edits to DS_CONSTRAINTS.md.

**Step 2:** Commit.

---

### Task 14: Update CODEBASE.md + TODO.md

**Files:**
- Modify: `docs/CODEBASE.md` — update form component status tables
- Modify: `docs/TODO.md` — check off Batch 5.5, add post-v1.0 item

**Step 1:** Check off Batch 5.5 in TODO.md. Add post-v1.0 section:

```markdown
### Post-v1.0
- [ ] Form DX — custom hooks (useFormField, etc.) + form building guideline doc
```

Also add a note under post-v1.0:

```markdown
- [ ] Toggle checked state variant — navy + white (alternative to navy + maize for small-scale indicators)
```

**Step 2:** Update CODEBASE.md status tables to reflect completed Batch 5.5 changes.

**Step 3:** Run `pnpm build && pnpm typecheck` — final verification.

**Step 4:** Commit.

---

## Verification

After all tasks:
1. `pnpm build` passes
2. `pnpm typecheck` passes
3. `/test/form` page shows branded toggle controls (navy + maize checked states, light maize select hover)
4. All individual component docs pages render correctly with updated examples
5. DS_CONSTRAINTS.md reflects new rules
6. TODO.md has Batch 5.5 checked off and post-v1.0 items added
