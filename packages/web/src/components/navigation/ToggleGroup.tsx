"use client";

import { useRef, useCallback, type ReactNode, type KeyboardEvent } from "react";
import { cn } from "@/utils/cn";

export type ToggleGroupItem = {
  value: string;
  label: string;
  icon?: ReactNode;
};

type CommonProps = {
  items: ToggleGroupItem[];
  fullWidth?: boolean;
  className?: string;
};

type SingleProps = CommonProps & {
  type?: "single";
  value: string;
  onValueChange: (value: string) => void;
};

type MultipleProps = CommonProps & {
  type: "multiple";
  value: string[];
  onValueChange: (value: string[]) => void;
};

export type ToggleGroupProps = SingleProps | MultipleProps;

const itemClasses = (isSelected: boolean, fullWidth: boolean) =>
  cn(
    "flex items-center cursor-pointer transition-colors rounded-md type-body-sm px-2.5 py-1 gap-1",
    fullWidth && "flex-1 justify-center",
    isSelected
      ? "bg-brand-primary text-brand-foreground !font-semibold"
      : "text-muted-foreground hover:bg-brand-accent-subtle hover:text-brand-primary active:opacity-90",
    "outline-none focus-visible:outline-2 focus-visible:outline-solid focus-visible:outline-[var(--color-focus-ring)] focus-visible:shadow-[0_0_0_4px_var(--color-brand-primary)]"
  );

export function ToggleGroup(props: ToggleGroupProps) {
  const { items, fullWidth = false, className } = props;
  const isMultiple = props.type === "multiple";
  const itemRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const isSelected = useCallback(
    (itemValue: string) =>
      isMultiple ? props.value.includes(itemValue) : props.value === itemValue,
    [isMultiple, props.value]
  );

  const focusItem = useCallback((index: number) => {
    itemRefs.current[index]?.focus();
  }, []);

  const selectSingle = useCallback(
    (itemValue: string) => {
      if (!isMultiple) props.onValueChange(itemValue);
    },
    [isMultiple, props.onValueChange]
  );

  const toggleMultiple = useCallback(
    (itemValue: string) => {
      if (isMultiple) {
        const current = props.value;
        props.onValueChange(
          current.includes(itemValue)
            ? current.filter((v) => v !== itemValue)
            : [...current, itemValue]
        );
      }
    },
    [isMultiple, props.value, props.onValueChange]
  );

  const handleClick = useCallback(
    (itemValue: string) => {
      if (isMultiple) {
        toggleMultiple(itemValue);
      } else {
        selectSingle(itemValue);
      }
    },
    [isMultiple, toggleMultiple, selectSingle]
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
      if (!isMultiple) {
        const nextItem = items[nextIndex];
        if (nextItem) selectSingle(nextItem.value);
      }
    },
    [items, isMultiple, focusItem, selectSingle]
  );

  // Roving tabindex: in multiple mode, first selected item (or first item if
  // none selected) gets tabIndex=0; in single mode, the selected item does.
  const rovingTabIndex = useCallback(
    (item: ToggleGroupItem, index: number) => {
      if (isSelected(item.value)) return 0;
      if (isMultiple) {
        const anySelected = items.some((it) => isSelected(it.value));
        return !anySelected && index === 0 ? 0 : -1;
      }
      return -1;
    },
    [isMultiple, isSelected, items]
  );

  return (
    <div
      role={isMultiple ? "group" : "radiogroup"}
      className={cn(
        "inline-flex items-center gap-1",
        fullWidth && "w-full",
        className
      )}
    >
      {items.map((item, index) => {
        const selected = isSelected(item.value);
        return (
          <button
            key={item.value}
            ref={(el) => {
              itemRefs.current[index] = el;
            }}
            role={isMultiple ? "button" : "radio"}
            type="button"
            aria-checked={isMultiple ? undefined : selected}
            aria-pressed={isMultiple ? selected : undefined}
            tabIndex={rovingTabIndex(item, index)}
            onClick={() => handleClick(item.value)}
            onKeyDown={(e) => handleKeyDown(e, index)}
            className={itemClasses(selected, fullWidth)}
          >
            {item.icon}
            <span>{item.label}</span>
          </button>
        );
      })}
    </div>
  );
}
