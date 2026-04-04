"use client";

import { useRef, useCallback, type ReactNode, type KeyboardEvent } from "react";
import { cn } from "@/utils/cn";

export type ToggleGroupItem = {
  value: string;
  label: string;
  icon?: ReactNode;
};

export type ToggleGroupProps = {
  value: string;
  onValueChange: (value: string) => void;
  items: ToggleGroupItem[];
  fullWidth?: boolean;
  className?: string;
};

export function ToggleGroup({
  value,
  onValueChange,
  items,
  fullWidth = false,
  className,
}: ToggleGroupProps) {
  const itemRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const focusItem = useCallback(
    (index: number) => {
      const item = items[index];
      if (item) {
        itemRefs.current[index]?.focus();
        onValueChange(item.value);
      }
    },
    [items, onValueChange]
  );

  const handleKeyDown = useCallback(
    (e: KeyboardEvent<HTMLButtonElement>, index: number) => {
      const count = items.length;
      let nextIndex: number | null = null;

      switch (e.key) {
        case "ArrowRight":
          nextIndex = (index + 1) % count;
          break;
        case "ArrowLeft":
          nextIndex = (index - 1 + count) % count;
          break;
        case "Home":
          nextIndex = 0;
          break;
        case "End":
          nextIndex = count - 1;
          break;
        default:
          return;
      }

      e.preventDefault();
      focusItem(nextIndex);
    },
    [items.length, focusItem]
  );

  return (
    <div
      role="radiogroup"
      className={cn(
        "inline-flex items-center gap-1",
        fullWidth && "w-full",
        className
      )}
    >
      {items.map((item, index) => {
        const isSelected = value === item.value;
        return (
          <button
            key={item.value}
            ref={(el) => {
              itemRefs.current[index] = el;
            }}
            role="radio"
            type="button"
            aria-checked={isSelected}
            tabIndex={isSelected ? 0 : -1}
            onClick={() => onValueChange(item.value)}
            onKeyDown={(e) => handleKeyDown(e, index)}
            className={cn(
              "flex items-center cursor-pointer transition-colors rounded-md type-body-sm px-2.5 py-1 gap-1",
              fullWidth && "flex-1 justify-center",
              isSelected
                ? "bg-brand-primary text-brand-foreground !font-semibold"
                : "text-muted-foreground hover:bg-brand-accent-subtle hover:text-brand-primary active:opacity-90",
              "outline-none focus-visible:outline-2 focus-visible:outline-solid focus-visible:outline-[var(--color-focus-ring)] focus-visible:shadow-[0_0_0_4px_var(--color-brand-primary)]"
            )}
          >
            {item.icon}
            <span>{item.label}</span>
          </button>
        );
      })}
    </div>
  );
}
