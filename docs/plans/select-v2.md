# Select v2 (Radix) Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Replace the native `<select>` wrapper with a fully styleable Radix-based compound Select component.

**Architecture:** Compound component pattern using `@radix-ui/react-select`. Six exports: Select (root), SelectTrigger, SelectContent, SelectItem, SelectGroup, SelectSeparator. Trigger styled to match Input. Dropdown overlay styled with DS tokens. All `cn()` only (no CVA).

**Tech Stack:** React, @radix-ui/react-select, Tailwind CSS v4, cn() utility, Icon component

---

## Phase 1: Component Implementation

### Task 1: Install Radix Select dependency

**Files:**
- Modify: `packages/web/package.json`

**Step 1: Install the package**

Run from worktree root:
```bash
cd packages/web && pnpm add @radix-ui/react-select
```

**Step 2: Verify install**

Run: `pnpm typecheck`
Expected: PASS

---

### Task 2: Rewrite Select component

**Files:**
- Rewrite: `packages/web/src/components/form/Select.tsx`
- Modify: `packages/web/src/components/form/index.ts`

**Step 1: Rewrite Select.tsx**

Replace the entire file with the Radix compound component. Six exports:

```tsx
import * as RadixSelect from "@radix-ui/react-select";
import { cn } from "@/utils/cn";
import { Icon } from "@/components/icon";

// ── Select (Root) ──────────────────────────────────────────
type SelectProps = React.ComponentPropsWithoutRef<typeof RadixSelect.Root>;

function Select(props: SelectProps) {
  return <RadixSelect.Root {...props} />;
}

// ── SelectTrigger ──────────────────────────────────────────
type SelectTriggerProps = {
  placeholder?: string;
  invalid?: boolean;
  className?: string;
};

function SelectTrigger({ placeholder, invalid = false, className }: SelectTriggerProps) {
  return (
    <RadixSelect.Trigger
      aria-invalid={invalid}
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

// ── SelectContent ──────────────────────────────────────────
type SelectContentProps = {
  children: React.ReactNode;
  className?: string;
  position?: "popper" | "item-aligned";
};

function SelectContent({ children, className, position = "popper" }: SelectContentProps) {
  return (
    <RadixSelect.Portal>
      <RadixSelect.Content
        position={position}
        className={cn(
          "z-50 min-w-[8rem] overflow-hidden rounded-md border border-border bg-surface shadow-md",
          "data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95",
          "data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95",
          position === "popper" && "max-h-[var(--radix-select-content-available-height)]",
          className
        )}
        sideOffset={4}
      >
        <RadixSelect.Viewport
          className={cn(
            "p-1",
            position === "popper" && "h-[var(--radix-select-trigger-height)] w-full min-w-[var(--radix-select-trigger-width)]"
          )}
        >
          {children}
        </RadixSelect.Viewport>
      </RadixSelect.Content>
    </RadixSelect.Portal>
  );
}

// ── SelectItem ─────────────────────────────────────────────
type SelectItemProps = {
  value: string;
  children: React.ReactNode;
  disabled?: boolean;
  className?: string;
};

function SelectItem({ value, children, disabled, className }: SelectItemProps) {
  return (
    <RadixSelect.Item
      value={value}
      disabled={disabled}
      className={cn(
        "relative flex w-full cursor-pointer select-none items-center rounded-sm py-2 pl-7 pr-3 type-body-sm text-foreground",
        "hover:bg-surface-subtle focus:bg-surface-subtle focus:outline-none",
        "data-[disabled]:pointer-events-none data-[disabled]:text-disabled-foreground",
        className
      )}
    >
      <span className="absolute left-2 flex items-center">
        <RadixSelect.ItemIndicator>
          <Icon name="check" size="sm" />
        </RadixSelect.ItemIndicator>
      </span>
      <RadixSelect.ItemText>{children}</RadixSelect.ItemText>
    </RadixSelect.Item>
  );
}

// ── SelectGroup ────────────────────────────────────────────
type SelectGroupProps = {
  label: string;
  children: React.ReactNode;
};

function SelectGroup({ label, children }: SelectGroupProps) {
  return (
    <RadixSelect.Group>
      <RadixSelect.Label className="px-3 py-2 type-caption text-muted-foreground">
        {label}
      </RadixSelect.Label>
      {children}
    </RadixSelect.Group>
  );
}

// ── SelectSeparator ────────────────────────────────────────
function SelectSeparator() {
  return <RadixSelect.Separator className="mx-1 my-1 h-px bg-border" />;
}

// ── Exports ────────────────────────────────────────────────
export { Select, SelectTrigger, SelectContent, SelectItem, SelectGroup, SelectSeparator };
export type { SelectProps, SelectTriggerProps, SelectContentProps, SelectItemProps, SelectGroupProps };
```

**Step 2: Update form barrel exports**

Replace the old Select exports in `packages/web/src/components/form/index.ts`:

Old (lines 9-10):
```ts
export { Select } from "./Select";
export type { SelectProps } from "./Select";
```

New:
```ts
export { Select, SelectTrigger, SelectContent, SelectItem, SelectGroup, SelectSeparator } from "./Select";
export type { SelectProps, SelectTriggerProps, SelectContentProps, SelectItemProps, SelectGroupProps } from "./Select";
```

**Step 3: Verify**

Run: `pnpm typecheck`
Expected: PASS (docs page will fail — that's expected, we fix it in Phase 2)

---

## Phase 2: Docs Page

### Task 3: Rewrite Select docs page

**Files:**
- Rewrite: `apps/docs/app/components/select/page.tsx`

**Step 1: Rewrite the docs page**

Replace with compound component examples. Same structure (Header, 6 Examples, API Reference) but updated for the new API.

Imports: `Select, SelectTrigger, SelectContent, SelectItem, SelectGroup, SelectSeparator, Label` from `@umichkisa-ds/web`.

**Examples:**

1. **Default** — Select + SelectTrigger + SelectContent with 3 SelectItems
2. **With placeholder** — SelectTrigger with `placeholder` prop
3. **With groups** — SelectGroup with label + SelectSeparator between groups
4. **With Label** — Label + Select composition with gap-2
5. **Invalid** — `invalid` on SelectTrigger + error message
6. **Disabled** — `disabled` on Select root

**API Reference** — 4 tables: SelectTrigger props, SelectContent props, SelectItem props, SelectGroup props. Same table styling pattern as Input page.

**Step 2: Verify**

Run: `pnpm typecheck && pnpm build`
Expected: Both PASS

---

### Task 4: Update migration notes

**Files:**
- Modify: `docs/_client_migration_notes.md`

**Step 1: Append Select migration section**

```markdown
## Select

- **Breaking:** Replaced native `<select>` with Radix compound component
- `<option value="x">Label</option>` → `<SelectItem value="x">Label</SelectItem>`
- `<optgroup label="Group">` → `<SelectGroup label="Group">`
- `onChange` → `onValueChange` (Radix convention)
- `defaultValue` stays the same (on `<Select>` root)
- `invalid` moved from `<Select>` to `<SelectTrigger>`
- `disabled` stays on `<Select>` root
- Must wrap items in `<SelectContent>` and use `<SelectTrigger>` for the trigger button
```
