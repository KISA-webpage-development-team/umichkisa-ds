# DatePicker Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Ship `DatePicker` and `DateRangePicker` components with form integration and docs.

**Architecture:** Both components compose DS Popover + Calendar + a custom `<button>` trigger styled to match Input. Single file in `packages/web/src/components/date/DatePicker.tsx`. Form wrappers (`FormDatePicker`, `FormDateRangePicker`) follow the existing `useController` + `FormItem` pattern in `packages/form`.

**Tech Stack:** React, react-day-picker (already installed for Calendar), Radix Popover (via DS Popover), CVA not needed (no variant matrix — `cn()` only).

---

## Phase 1: Component Implementation

### Task 1: DatePicker + DateRangePicker component

**Files:**
- Create: `packages/web/src/components/date/DatePicker.tsx`
- Modify: `packages/web/src/components/date/index.ts`

**Step 1: Create `DatePicker.tsx`**

Exports two components: `DatePicker` and `DateRangePicker`.

```tsx
import React, { useState } from "react";
import { type DateRange } from "react-day-picker";
import { cn } from "../../utils/cn";
import { Calendar, type CalendarProps } from "./Calendar";
import { Popover, PopoverTrigger, PopoverContent } from "../overlay/Popover";
import { Icon } from "../icon/Icon";

// ---------- Shared ----------

function defaultFormatDate(date: Date): string {
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  const y = date.getFullYear();
  return `${m}/${d}/${y}`;
}

const triggerClasses = (invalid: boolean, disabled: boolean) =>
  cn(
    "inline-flex w-full items-center justify-between rounded-md border border-border-strong bg-surface px-3 py-2 type-body-sm text-foreground transition-colors",
    "focus-visible:outline-none focus-visible:border-brand-primary",
    "disabled:pointer-events-none disabled:text-disabled-foreground disabled:bg-surface-subtle",
    invalid && "border-error focus-visible:border-error"
  );

// ---------- DatePicker ----------

export type DatePickerProps = {
  value?: Date;
  onChange?: (date: Date | undefined) => void;
  formatDate?: (date: Date) => string;
  placeholder?: string;
  disabled?: boolean;
  invalid?: boolean;
  className?: string;
  calendarProps?: Omit<CalendarProps, "mode" | "selected" | "onSelect">;
};

export function DatePicker({
  value,
  onChange,
  formatDate = defaultFormatDate,
  placeholder = "Select a date",
  disabled = false,
  invalid = false,
  className,
  calendarProps,
}: DatePickerProps) {
  const [open, setOpen] = useState(false);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <button
          type="button"
          disabled={disabled}
          className={cn(triggerClasses(invalid, disabled), className)}
        >
          <span className={cn(!value && "text-muted-foreground")}>
            {value ? formatDate(value) : placeholder}
          </span>
          <Icon name="calendar" size="sm" />
        </button>
      </PopoverTrigger>
      <PopoverContent align="start" className="w-auto p-0">
        <Calendar
          mode="single"
          selected={value}
          onSelect={(date) => {
            onChange?.(date);
            setOpen(false);
          }}
          {...calendarProps}
        />
      </PopoverContent>
    </Popover>
  );
}

// ---------- DateRangePicker ----------

export type DateRangePickerProps = {
  value?: DateRange;
  onChange?: (range: DateRange | undefined) => void;
  formatDate?: (date: Date) => string;
  placeholder?: string;
  disabled?: boolean;
  invalid?: boolean;
  className?: string;
  calendarProps?: Omit<CalendarProps, "mode" | "selected" | "onSelect">;
};

export function DateRangePicker({
  value,
  onChange,
  formatDate = defaultFormatDate,
  placeholder = "Select a date range",
  disabled = false,
  invalid = false,
  className,
  calendarProps,
}: DateRangePickerProps) {
  const [open, setOpen] = useState(false);

  const displayValue =
    value?.from && value?.to
      ? `${formatDate(value.from)} – ${formatDate(value.to)}`
      : value?.from
        ? formatDate(value.from)
        : undefined;

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <button
          type="button"
          disabled={disabled}
          className={cn(triggerClasses(invalid, disabled), className)}
        >
          <span className={cn(!displayValue && "text-muted-foreground")}>
            {displayValue ?? placeholder}
          </span>
          <Icon name="calendar" size="sm" />
        </button>
      </PopoverTrigger>
      <PopoverContent align="start" className="w-auto p-0">
        <Calendar
          mode="range"
          selected={value}
          onSelect={(range) => {
            onChange?.(range);
            if (range?.from && range?.to) {
              setOpen(false);
            }
          }}
          {...calendarProps}
        />
      </PopoverContent>
    </Popover>
  );
}
```

**Step 2: Update barrel export**

In `packages/web/src/components/date/index.ts`, add:
```ts
export { DatePicker, DateRangePicker } from "./DatePicker";
export type { DatePickerProps, DateRangePickerProps } from "./DatePicker";
```

`DateRange` type is already re-exported from this barrel.

**Step 3: Run typecheck**

Run: `pnpm typecheck`
Expected: PASS

---

### Task 2: Form wrappers

**Files:**
- Create: `packages/form/src/components/fields/FormDatePicker.tsx`
- Create: `packages/form/src/components/fields/FormDateRangePicker.tsx`
- Modify: `packages/form/src/components/fields/index.ts`
- Modify: `packages/form/src/components/Form.tsx`
- Modify: `packages/form/src/index.ts`

**Step 1: Create `FormDatePicker.tsx`**

Follow the FormSelect pattern — `useController` + `FormItem`:

```tsx
import { useController, useFormContext, type RegisterOptions } from "react-hook-form";
import { DatePicker, FormItem } from "@umichkisa-ds/web";

export type FormDatePickerProps = {
  name: string;
  label: string;
  rules?: RegisterOptions;
  description?: string;
  className?: string;
  placeholder?: string;
  formatDate?: (date: Date) => string;
};

export function FormDatePicker({
  name,
  label,
  rules,
  description,
  className,
  placeholder,
  formatDate,
}: FormDatePickerProps) {
  const { control } = useFormContext();
  const {
    field,
    fieldState: { error },
  } = useController({ name, control, rules });

  return (
    <FormItem
      htmlFor={name}
      label={label}
      required={!!rules?.required}
      error={error?.message}
      description={description}
      className={className}
    >
      <DatePicker
        value={field.value}
        onChange={(date) => {
          field.onChange(date);
          field.onBlur();
        }}
        invalid={!!error}
        placeholder={placeholder}
        formatDate={formatDate}
      />
    </FormItem>
  );
}
```

**Step 2: Create `FormDateRangePicker.tsx`**

Same pattern with `DateRange` value type:

```tsx
import { useController, useFormContext, type RegisterOptions } from "react-hook-form";
import { DateRangePicker, FormItem } from "@umichkisa-ds/web";

export type FormDateRangePickerProps = {
  name: string;
  label: string;
  rules?: RegisterOptions;
  description?: string;
  className?: string;
  placeholder?: string;
  formatDate?: (date: Date) => string;
};

export function FormDateRangePicker({
  name,
  label,
  rules,
  description,
  className,
  placeholder,
  formatDate,
}: FormDateRangePickerProps) {
  const { control } = useFormContext();
  const {
    field,
    fieldState: { error },
  } = useController({ name, control, rules });

  return (
    <FormItem
      htmlFor={name}
      label={label}
      required={!!rules?.required}
      error={error?.message}
      description={description}
      className={className}
    >
      <DateRangePicker
        value={field.value}
        onChange={(range) => {
          field.onChange(range);
          field.onBlur();
        }}
        invalid={!!error}
        placeholder={placeholder}
        formatDate={formatDate}
      />
    </FormItem>
  );
}
```

**Step 3: Update barrel exports + Form compound component**

In `packages/form/src/components/fields/index.ts`, add:
```ts
export { FormDatePicker } from "./FormDatePicker";
export type { FormDatePickerProps } from "./FormDatePicker";
export { FormDateRangePicker } from "./FormDateRangePicker";
export type { FormDateRangePickerProps } from "./FormDateRangePicker";
```

In `packages/form/src/components/Form.tsx`, import and attach:
```ts
import { FormDatePicker } from "./fields/FormDatePicker";
import { FormDateRangePicker } from "./fields/FormDateRangePicker";

// In Object.assign:
DatePicker: FormDatePicker,
DateRangePicker: FormDateRangePicker,
```

In `packages/form/src/index.ts`, add type exports:
```ts
export type { FormDatePickerProps } from "./components/fields/FormDatePicker";
export type { FormDateRangePickerProps } from "./components/fields/FormDateRangePicker";
```

**Step 4: Run typecheck**

Run: `pnpm typecheck`
Expected: PASS

---

## Phase 2: Docs Page

### Task 3: Docs page + sidebar

**Files:**
- Create: `apps/docs/app/components/datepicker/page.tsx`
- Modify: `apps/docs/components/Sidebar.tsx`

**Step 1: Read `apps/docs/app/components/dialog/page.tsx` for layout reference**

Match its exact pattern: heading hierarchy, spacing classes, table structure, ComponentPreview placement.

**Step 2: Create docs page**

Sections:
1. **Header** — DatePicker & DateRangePicker, description, purpose
2. **DatePicker Examples** — practical scenarios:
   - Basic (event date)
   - With default value (edit profile birth date)
   - With date bounds (booking — future dates only)
   - Disabled state
   - Error/invalid state
   - Custom format
3. **DateRangePicker Examples** — practical scenarios:
   - Basic (trip dates)
   - With default range
   - Disabled state
   - Error/invalid state
4. **Form Integration** — `FormDatePicker` and `FormDateRangePicker` in a realistic form
5. **API Reference** — two tables, one per component

All examples use `ComponentPreview` with code strings. Use realistic labels and context (not "Click me" or "Test").

**Step 3: Add to Sidebar**

In `apps/docs/components/Sidebar.tsx`, add `DatePicker` to `COMPONENT_ITEMS` under the "Date & Time" category (order 10), alongside Calendar.

**Step 4: Run typecheck + build**

Run: `pnpm typecheck && pnpm build`
Expected: PASS
