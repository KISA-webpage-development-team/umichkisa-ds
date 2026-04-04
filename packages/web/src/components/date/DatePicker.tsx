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
