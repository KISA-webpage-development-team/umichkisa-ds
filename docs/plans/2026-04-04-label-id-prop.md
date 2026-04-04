# Label `id` Prop — `aria-labelledby` Support

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Add an optional `id` prop to Label so other elements can reference it via `aria-labelledby`, and auto-generate `{htmlFor}-label` in FormItem.

**Architecture:** Label gets an optional `id` passed through to `<label>`. FormItem auto-generates `{htmlFor}-label` on its internal Label, matching the existing `-description` / `-error` ID convention. SelectTrigger gets `aria-labelledby` as a named prop. FormSelect and FormRadio in the form package auto-wire the label ID.

**Tech Stack:** React, TypeScript, Radix Select, `@umichkisa-ds/web`, `@umichkisa-ds/form`

---

## Task 1: Add `id` prop to Label

**Files:**
- Modify: `packages/web/src/components/form/Label.tsx:3-8` (LabelProps type)
- Modify: `packages/web/src/components/form/Label.tsx:10-13` (destructure + render)

**Step 1: Add `id` to LabelProps and pass it through**

```tsx
// packages/web/src/components/form/Label.tsx — full file
import { cn } from "@/utils/cn";

export type LabelProps = {
  htmlFor: string;
  id?: string;
  required?: boolean;
  className?: string;
  children: React.ReactNode;
};

export function Label({ htmlFor, id, required = false, className, children }: LabelProps) {
  return (
    <label
      htmlFor={htmlFor}
      id={id}
      className={cn(
        "type-label text-foreground",
        className
      )}
    >
      {children}
      {required && (
        <span className="ml-0.5 text-error" aria-hidden="true">
          *
        </span>
      )}
    </label>
  );
}
```

**Step 2: Verify build**

Run: `pnpm --filter @umichkisa-ds/web build`
Expected: SUCCESS

**Step 3: Commit**

```bash
git add packages/web/src/components/form/Label.tsx
git commit -m "feat(Label): add optional id prop for aria-labelledby support"
```

---

## Task 2: Auto-generate `{htmlFor}-label` in FormItem

**Files:**
- Modify: `packages/web/src/components/form/FormItem.tsx:25` (Label render line)

**Step 1: Pass auto-generated id to Label**

Change line 25 in FormItem.tsx from:

```tsx
      <Label htmlFor={htmlFor} required={required}>
```

to:

```tsx
      <Label htmlFor={htmlFor} id={`${htmlFor}-label`} required={required}>
```

No other changes needed — the rest of FormItem stays the same.

**Step 2: Verify build**

Run: `pnpm --filter @umichkisa-ds/web build`
Expected: SUCCESS

**Step 3: Commit**

```bash
git add packages/web/src/components/form/FormItem.tsx
git commit -m "feat(FormItem): auto-generate {htmlFor}-label id on internal Label"
```

---

## Task 3: Add `aria-labelledby` prop to SelectTrigger

**Files:**
- Modify: `packages/web/src/components/form/Select.tsx:13-17` (SelectTriggerProps type)
- Modify: `packages/web/src/components/form/Select.tsx:19-37` (SelectTrigger component)

**Step 1: Add the prop and forward it**

Change SelectTriggerProps and SelectTrigger:

```tsx
// ── SelectTrigger ──────────────────────────────────────────
type SelectTriggerProps = {
  placeholder?: string;
  invalid?: boolean;
  "aria-labelledby"?: string;
  className?: string;
};

function SelectTrigger({ placeholder, invalid = false, "aria-labelledby": ariaLabelledBy, className }: SelectTriggerProps) {
  return (
    <RadixSelect.Trigger
      aria-invalid={invalid}
      aria-labelledby={ariaLabelledBy}
      className={cn(
        "flex w-full items-center justify-between rounded-md border border-border-strong bg-surface px-3 py-2 type-body-sm text-foreground transition-colors",
        "placeholder:text-muted-foreground",
        "focus-visible:outline-none focus-visible:border-brand-primary",
        "disabled:pointer-events-none disabled:text-disabled-foreground disabled:bg-surface-subtle",
        invalid && "border-error focus-visible:border-error",
        className
      )}
    >
      <RadixSelect.Value placeholder={placeholder} />
      <RadixSelect.Icon asChild>
        <Icon name="chevron-down" size="sm" className="flex-shrink-0" />
      </RadixSelect.Icon>
    </RadixSelect.Trigger>
  );
}
```

**Step 2: Verify build**

Run: `pnpm --filter @umichkisa-ds/web build`
Expected: SUCCESS

**Step 3: Commit**

```bash
git add packages/web/src/components/form/Select.tsx
git commit -m "feat(SelectTrigger): accept aria-labelledby prop"
```

---

## Task 4: Auto-wire `aria-labelledby` in FormSelect

**Files:**
- Modify: `packages/form/src/components/fields/FormSelect.tsx:36-44` (Select children area)

**Step 1: Thread `aria-labelledby` into the Select's children**

The challenge: FormSelect renders `{children}` as Select's children (which includes SelectTrigger, SelectContent, etc.). FormSelect doesn't render SelectTrigger itself — the consumer passes it as children.

**Revised approach:** Since FormSelect accepts `children` (which contains `<SelectTrigger>`, `<SelectContent>`, etc.), FormSelect cannot inject `aria-labelledby` into the trigger without cloning children. This is fragile.

**Better approach:** Document that when using `FormItem` + `Select` (or `Form.Select`), the consumer should pass `aria-labelledby="{name}-label"` on SelectTrigger. FormItem now auto-generates the predictable ID, so the consumer just references it.

No code change needed for FormSelect — the convention is documented instead.

**Step 2: Commit** — skip (no code change)

---

## Task 5: Auto-wire `aria-labelledby` in FormRadio

**Files:**
- Modify: `packages/form/src/components/fields/FormRadio.tsx:36-45` (RadioGroup render)

**Step 1: Add aria-labelledby to RadioGroup**

RadioGroup extends `React.ComponentPropsWithoutRef<typeof RadixRadioGroup.Root>` and uses `{...rest}`, so it already accepts `aria-labelledby`. FormRadio just needs to pass it.

Change FormRadio's RadioGroup render from:

```tsx
      <RadioGroup
        invalid={!!error}
        value={field.value}
        onValueChange={(val) => {
          field.onChange(val);
          field.onBlur();
        }}
        {...rest}
      >
```

to:

```tsx
      <RadioGroup
        invalid={!!error}
        aria-labelledby={`${name}-label`}
        value={field.value}
        onValueChange={(val) => {
          field.onChange(val);
          field.onBlur();
        }}
        {...rest}
      >
```

**Step 2: Verify build**

Run: `pnpm --filter @umichkisa-ds/form build`
Expected: SUCCESS

**Step 3: Commit**

```bash
git add packages/form/src/components/fields/FormRadio.tsx
git commit -m "feat(FormRadio): auto-wire aria-labelledby to RadioGroup"
```

---

## Task 6: Add DS_CONSTRAINTS rule

**Files:**
- Modify: `docs/DS_CONSTRAINTS.md:276` (after existing FormItem Composition rules)

**Step 1: Append rule after line 276**

Add after the existing `aria-describedby` rule:

```
Must: Use `htmlFor` for native form elements (input, textarea). Use `aria-labelledby` with the Label's `id` for non-native triggers (Select, RadioGroup). FormItem auto-generates `{htmlFor}-label` on its Label — reference it on the control when needed. [source:label-id/2026-04-04]
```

**Step 2: Commit**

```bash
git add docs/DS_CONSTRAINTS.md
git commit -m "docs(DS_CONSTRAINTS): add aria-labelledby vs htmlFor guidance"
```

---

## Task 7: Update Label docs page

**Files:**
- Modify: `apps/docs/app/components/label/page.tsx`

**Step 1: Add `id` row to API Reference table**

Insert a new `<tr>` after the `htmlFor` row (after line 131):

```tsx
            <tr className="border-b border-border">
              <td className="px-4 py-3 text-foreground"><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle">id</code></td>
              <td className="px-4 py-3 text-foreground"><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle">string</code></td>
              <td className="px-4 py-3 type-body-sm text-foreground">—</td>
              <td className="px-4 py-3 type-body-sm text-foreground">HTML id attribute. Use when other elements need to reference this label via aria-labelledby.</td>
            </tr>
```

**Step 2: Add "With aria-labelledby" example section**

Add a new example after the "With input" section (after line 104). Add a code snippet constant after `withInputCode`:

```tsx
const withAriaCode = `import { Label, Select, SelectTrigger, SelectContent, SelectItem } from '@umichkisa-ds/web'

<div className="flex flex-col gap-2">
  <Label htmlFor="fruit" id="fruit-label">Fruit</Label>
  <Select>
    <SelectTrigger placeholder="Select a fruit..." aria-labelledby="fruit-label" />
    <SelectContent>
      <SelectItem value="apple">Apple</SelectItem>
      <SelectItem value="banana">Banana</SelectItem>
    </SelectContent>
  </Select>
</div>`
```

Add `withAriaHighlighted` to the `Promise.all` array, and add the example section:

```tsx
      {/* With aria-labelledby */}
      <h3 className="type-h3 mt-8 mb-2 text-foreground">With aria-labelledby</h3>
      <p className="type-body mb-2 text-foreground max-w-prose">
        For non-native form controls like Radix Select, use{' '}
        <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">
          id
        </code>{' '}
        on the Label and{' '}
        <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">
          aria-labelledby
        </code>{' '}
        on the trigger instead of{' '}
        <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">
          htmlFor
        </code>.
      </p>
      <ComponentPreview code={withAriaCode} highlightedCode={withAriaHighlighted}>
        <WithAriaDemo />
      </ComponentPreview>
```

This requires a client `_demos` component (`WithAriaDemo`) for the interactive Select. Create it in `apps/docs/app/components/label/_demos.tsx` alongside the existing `WithInputDemo`:

```tsx
'use client'

import { Select, SelectTrigger, SelectContent, SelectItem, Label } from '@umichkisa-ds/web'

export function WithAriaDemo() {
  return (
    <div className="w-full max-w-sm">
      <div className="flex flex-col gap-2">
        <Label htmlFor="fruit" id="fruit-label">Fruit</Label>
        <Select>
          <SelectTrigger placeholder="Select a fruit..." aria-labelledby="fruit-label" />
          <SelectContent>
            <SelectItem value="apple">Apple</SelectItem>
            <SelectItem value="banana">Banana</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  )
}
```

Update the import at the top of the page to include `WithAriaDemo`:

```tsx
import { WithInputDemo, WithAriaDemo } from './_demos'
```

**Step 3: Verify docs dev**

Run: `pnpm --filter docs dev` and visually confirm the new section renders.

**Step 4: Commit**

```bash
git add apps/docs/app/components/label/
git commit -m "docs(Label): add id prop to API table and aria-labelledby example"
```

---

## Task 8: Update FormItem docs page

**Files:**
- Modify: `apps/docs/app/components/form-item/page.tsx:337-350` (Accessibility section)

**Step 1: Update the accessibility section to include `{htmlFor}-label`**

Replace the existing accessibility paragraph (lines 337-349) to mention all three auto-generated IDs:

```tsx
      <p className="type-body mb-2 text-foreground max-w-prose">
        FormItem generates predictable IDs on its internal elements:{' '}
        <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">
          {'{htmlFor}-label'}
        </code>,{' '}
        <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">
          {'{htmlFor}-description'}
        </code>, and{' '}
        <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">
          {'{htmlFor}-error'}
        </code>
        . Wire{' '}
        <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">
          aria-describedby
        </code>{' '}
        on the form control to associate helper text, and{' '}
        <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">
          aria-labelledby
        </code>{' '}
        for non-native triggers (e.g. Select).
      </p>
```

**Step 2: Update the a11y code example to show the `{htmlFor}-label` pattern with Select**

Add a second a11y example constant (after `a11yCode`):

```tsx
const a11ySelectCode = `import { FormItem, Select, SelectTrigger, SelectContent, SelectItem } from '@umichkisa-ds/web'

<FormItem htmlFor="fruit" label="Fruit">
  <Select>
    <SelectTrigger placeholder="Pick a fruit..." aria-labelledby="fruit-label" />
    <SelectContent>
      <SelectItem value="apple">Apple</SelectItem>
      <SelectItem value="banana">Banana</SelectItem>
    </SelectContent>
  </Select>
</FormItem>`
```

Add it to the `Promise.all`, and render it below the existing a11y example:

```tsx
      <p className="type-body mt-4 mb-2 text-foreground max-w-prose">
        For non-native triggers like Select, use{' '}
        <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">
          aria-labelledby
        </code>{' '}
        with the auto-generated{' '}
        <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">
          {'{htmlFor}-label'}
        </code>{' '}
        ID.
      </p>
      <ComponentPreview code={a11ySelectCode} highlightedCode={a11ySelectHighlighted}>
        <div className="w-full max-w-sm">
          <WithA11ySelectDemo />
        </div>
      </ComponentPreview>
```

This needs a client demo component. Add to `apps/docs/app/components/form-item/_demos.tsx`:

```tsx
export function WithA11ySelectDemo() {
  return (
    <FormItem htmlFor="a11y-fruit" label="Fruit">
      <Select>
        <SelectTrigger placeholder="Pick a fruit..." aria-labelledby="a11y-fruit-label" />
        <SelectContent>
          <SelectItem value="apple">Apple</SelectItem>
          <SelectItem value="banana">Banana</SelectItem>
        </SelectContent>
      </Select>
    </FormItem>
  )
}
```

**Step 3: Commit**

```bash
git add apps/docs/app/components/form-item/
git commit -m "docs(FormItem): document {htmlFor}-label auto-generated ID in accessibility section"
```

---

## Task 9: Clean up Select docs page

**Files:**
- Modify: `apps/docs/app/components/select/page.tsx:213` (demo render area)

**Step 1: Remove the `<span>` wrapper hack**

The Select docs page currently wraps Label in a `<span id="fruit-label-demo">` (line 213) because Label didn't have `id` support. Now it does. Update the demo render to use Label's `id` directly:

```tsx
          <div className="flex flex-col gap-2">
            <Label htmlFor="fruit-label-demo" id="fruit-label-demo">Fruit</Label>
            <Select>
              <SelectTrigger placeholder="Select a fruit..." aria-labelledby="fruit-label-demo" />
```

(Remove the wrapping `<span>` and its closing tag.)

**Step 2: Add a note that FormSelect auto-wires this for RadioGroup**

In the "With Label" description text (around line 199-208), append a sentence:

```
When using FormItem, the label automatically receives an id of{' '}
<code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">
  {'{htmlFor}-label'}
</code>
— reference it on the trigger.
```

**Step 3: Commit**

```bash
git add apps/docs/app/components/select/page.tsx
git commit -m "docs(Select): use Label id prop directly, document FormItem auto-ID"
```

---

## Task 10: Build + typecheck + rebuild dist

**Step 1: Full build and typecheck**

Run: `pnpm build && pnpm typecheck`
Expected: SUCCESS

**Step 2: Commit dist**

```bash
git add packages/web/dist/ packages/form/dist/
git commit -m "chore: rebuild dist after Label id prop changes"
```
