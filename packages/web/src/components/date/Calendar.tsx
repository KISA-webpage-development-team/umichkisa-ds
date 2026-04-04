import React from "react";
import { DayPicker, type DayPickerProps } from "react-day-picker";
import { cn } from "../../utils/cn";
import { Icon } from "../icon/Icon";

export type CalendarProps = DayPickerProps & {
  className?: string;
};

function Chevron({
  orientation,
}: {
  orientation?: "up" | "down" | "left" | "right";
}) {
  const name = orientation === "left" ? "chevron-left" : "chevron-right";
  return <Icon name={name} size="sm" />;
}

export function Calendar({
  className,
  showOutsideDays = true,
  classNames: classNamesProp,
  components: componentsProp,
  ...props
}: CalendarProps) {
  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      className={cn("relative p-3", className)}
      classNames={{
        months: "flex flex-col md:flex-row gap-4",
        month: "flex flex-col gap-4",
        month_caption: "flex justify-center items-center pt-1",
        caption_label: "type-body-sm !font-semibold text-foreground",
        nav: "absolute top-3 right-3 left-3 flex items-center justify-between z-10 pointer-events-none",
        button_previous: cn(
          "pointer-events-auto",
          "inline-flex items-center justify-center",
          "h-7 w-7 rounded-md",
          "text-foreground hover:bg-brand-accent-subtle hover:text-brand-primary",
          "outline-2 outline-offset-2 outline-transparent",
          "focus-visible:outline-focus-ring focus-visible:shadow-[0_0_0_4px_var(--color-brand-primary)]",
          "relative after:absolute after:inset-1/2 after:-translate-x-1/2 after:-translate-y-1/2",
          "after:min-w-[44px] after:min-h-[44px]"
        ),
        button_next: cn(
          "pointer-events-auto",
          "inline-flex items-center justify-center",
          "h-7 w-7 rounded-md",
          "text-foreground hover:bg-brand-accent-subtle hover:text-brand-primary",
          "outline-2 outline-offset-2 outline-transparent",
          "focus-visible:outline-focus-ring focus-visible:shadow-[0_0_0_4px_var(--color-brand-primary)]",
          "relative after:absolute after:inset-1/2 after:-translate-x-1/2 after:-translate-y-1/2",
          "after:min-w-[44px] after:min-h-[44px]"
        ),
        month_grid: "w-full border-collapse",
        weekdays: "flex",
        weekday:
          "type-caption text-muted-foreground w-9 text-center",
        week: "flex w-full mt-1",
        day: "relative w-9 h-9 text-center p-0 text-foreground",
        day_button: cn(
          "inline-flex items-center justify-center w-9 h-9 rounded-md",
          "type-body-sm text-inherit",
          "transition-[color,background-color] duration-200 ease-in-out",
          "hover:bg-brand-accent-subtle hover:text-brand-primary",
          "outline-2 outline-offset-2 outline-transparent",
          "focus-visible:outline-focus-ring focus-visible:shadow-[0_0_0_4px_var(--color-brand-primary)]",
          // ::after pseudo-element for 44px touch target
          "relative after:absolute after:inset-1/2 after:-translate-x-1/2 after:-translate-y-1/2",
          "after:min-w-[44px] after:min-h-[44px]"
        ),
        today: "bg-surface-subtle text-foreground !font-semibold rounded-md",
        outside: "text-muted-foreground opacity-50",
        disabled: "text-disabled-foreground pointer-events-none",
        hidden: "invisible",
        selected:
          "[&>button]:bg-brand-primary [&>button]:!text-brand-foreground [&>button]:hover:bg-brand-primary",
        range_start:
          "bg-brand-accent-subtle rounded-l-md rounded-r-none",
        range_end:
          "bg-brand-accent-subtle rounded-r-md rounded-l-none",
        range_middle:
          "!bg-brand-accent-subtle !rounded-none [&>button]:!bg-transparent [&>button]:!text-foreground",
        ...classNamesProp,
      }}
      components={{
        Chevron,
        ...componentsProp,
      }}
      {...props}
    />
  );
}
