import { createContext, useContext, useRef, useState, useCallback, useEffect } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/utils/cn";

// ── TabsContext ──────────────────────────────────────────
type TabsContextValue = {
  value: string;
  onValueChange: (value: string) => void;
  variant: "underline" | "pill";
  size: "sm" | "md";
  registerTab: (value: string) => void;
  unregisterTab: (value: string) => void;
};

const TabsContext = createContext<TabsContextValue | null>(null);

function useTabsContext() {
  const ctx = useContext(TabsContext);
  if (!ctx) {
    throw new Error("Tabs compound components must be used within <Tabs>");
  }
  return ctx;
}

// ── Tabs (Root) ──────────────────────────────────────────
type TabsProps = {
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  variant?: "underline" | "pill";
  size?: "sm" | "md";
  className?: string;
  children: React.ReactNode;
};

function Tabs({
  value: controlledValue,
  defaultValue,
  onValueChange,
  variant = "underline",
  size = "md",
  className,
  children,
}: TabsProps) {
  const [internalValue, setInternalValue] = useState(defaultValue ?? "");
  const registeredTabs = useRef<Set<string>>(new Set());
  const hasAutoSelected = useRef(false);

  const isControlled = controlledValue !== undefined;
  const activeValue = isControlled ? controlledValue : internalValue;

  const handleValueChange = useCallback(
    (newValue: string) => {
      if (!isControlled) {
        setInternalValue(newValue);
      }
      onValueChange?.(newValue);
    },
    [isControlled, onValueChange]
  );

  const registerTab = useCallback(
    (tabValue: string) => {
      registeredTabs.current.add(tabValue);
      // Auto-select first registered tab if no value is set
      if (!hasAutoSelected.current && !isControlled && !defaultValue) {
        hasAutoSelected.current = true;
        setInternalValue(tabValue);
      }
    },
    [isControlled, defaultValue]
  );

  const unregisterTab = useCallback((tabValue: string) => {
    registeredTabs.current.delete(tabValue);
  }, []);

  return (
    <TabsContext.Provider
      value={{
        value: activeValue,
        onValueChange: handleValueChange,
        variant,
        size,
        registerTab,
        unregisterTab,
      }}
    >
      <div className={className}>{children}</div>
    </TabsContext.Provider>
  );
}

// ── TabsList ─────────────────────────────────────────────
type TabsListProps = {
  variant?: "underline" | "pill";
  size?: "sm" | "md";
  fullWidth?: boolean;
  className?: string;
  children: React.ReactNode;
};

function TabsList({
  variant,
  size,
  fullWidth = false,
  className,
  children,
}: TabsListProps) {
  const ctx = useTabsContext();

  // TabsList variant/size override context values
  const resolvedVariant = variant ?? ctx.variant;
  const resolvedSize = size ?? ctx.size;

  return (
    <TabsContext.Provider
      value={{
        ...ctx,
        variant: resolvedVariant,
        size: resolvedSize,
      }}
    >
      <div
        role="tablist"
        aria-orientation="horizontal"
        className={cn(
          "flex items-center overflow-x-auto scrollbar-none",
          resolvedVariant === "underline" && "border-b border-border",
          resolvedVariant === "pill" && "bg-surface-subtle rounded-lg p-1",
          fullWidth && "[&>button]:flex-1",
          className
        )}
      >
        {children}
      </div>
    </TabsContext.Provider>
  );
}

// ── TabsTrigger ──────────────────────────────────────────
const tabsTriggerVariants = cva(
  [
    "inline-flex items-center justify-center cursor-pointer whitespace-nowrap transition-colors",
    "focus-visible:outline focus-visible:outline-2 focus-visible:outline-focus-ring focus-visible:shadow-[0_0_0_4px_var(--color-brand-primary)]",
    "disabled:pointer-events-none disabled:text-disabled-foreground",
  ],
  {
    variants: {
      variant: {
        underline:
          "border-b-2 border-transparent -mb-px text-muted-foreground hover:text-foreground hover:bg-brand-accent-subtle data-[state=active]:border-brand-primary data-[state=active]:text-brand-primary",
        pill: "rounded-md text-muted-foreground hover:text-foreground hover:bg-brand-accent-subtle data-[state=active]:bg-brand-primary data-[state=active]:text-brand-foreground",
      },
      size: {
        sm: "type-body-sm px-3 py-1.5",
        md: "type-body-sm px-4 py-2",
      },
    },
    compoundVariants: [
      { variant: "pill", size: "sm", className: "px-3 py-1" },
      { variant: "pill", size: "md", className: "px-4 py-1.5" },
    ],
    defaultVariants: {
      variant: "underline",
      size: "md",
    },
  }
);

type TabsTriggerProps = VariantProps<typeof tabsTriggerVariants> & {
  value: string;
  disabled?: boolean;
  className?: string;
  children: React.ReactNode;
};

function TabsTrigger({ value, disabled, className, children }: TabsTriggerProps) {
  const ctx = useTabsContext();
  const isActive = ctx.value === value;

  const triggerId = `tab-${value}`;
  const panelId = `tabpanel-${value}`;

  // Register/unregister on mount/unmount
  useEffect(() => {
    ctx.registerTab(value);
    return () => ctx.unregisterTab(value);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  function handleClick() {
    if (!disabled) {
      ctx.onValueChange(value);
    }
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLButtonElement>) {
    const tablist = e.currentTarget.closest('[role="tablist"]');
    if (!tablist) return;

    const triggers = Array.from(
      tablist.querySelectorAll<HTMLButtonElement>('[role="tab"]:not([disabled])')
    );
    const currentIndex = triggers.indexOf(e.currentTarget);
    if (currentIndex === -1) return;

    let nextIndex: number | null = null;

    switch (e.key) {
      case "ArrowRight":
        nextIndex = (currentIndex + 1) % triggers.length;
        break;
      case "ArrowLeft":
        nextIndex = (currentIndex - 1 + triggers.length) % triggers.length;
        break;
      case "Home":
        nextIndex = 0;
        break;
      case "End":
        nextIndex = triggers.length - 1;
        break;
      default:
        return;
    }

    e.preventDefault();
    const nextTrigger = triggers[nextIndex];
    nextTrigger.focus();

    // Automatic activation: focusing also activates
    const nextValue = nextTrigger.getAttribute("data-value");
    if (nextValue) {
      ctx.onValueChange(nextValue);
    }
  }

  return (
    <button
      role="tab"
      type="button"
      id={triggerId}
      aria-selected={isActive}
      aria-controls={panelId}
      tabIndex={isActive ? 0 : -1}
      data-state={isActive ? "active" : "inactive"}
      data-value={value}
      disabled={disabled}
      aria-disabled={disabled ? "true" : undefined}
      data-disabled={disabled ? "" : undefined}
      className={cn(
        tabsTriggerVariants({ variant: ctx.variant, size: ctx.size }),
        className
      )}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
    >
      {children}
    </button>
  );
}

// ── TabsContent ──────────────────────────────────────────
type TabsContentProps = {
  value: string;
  className?: string;
  children: React.ReactNode;
};

function TabsContent({ value, className, children }: TabsContentProps) {
  const ctx = useTabsContext();
  const isActive = ctx.value === value;

  if (!isActive) return null;

  const triggerId = `tab-${value}`;
  const panelId = `tabpanel-${value}`;

  return (
    <div
      role="tabpanel"
      id={panelId}
      aria-labelledby={triggerId}
      tabIndex={0}
      className={cn("mt-4", className)}
    >
      {children}
    </div>
  );
}

// ── Exports ──────────────────────────────────────────────
export { Tabs, TabsList, TabsTrigger, TabsContent, tabsTriggerVariants };
export type { TabsProps, TabsListProps, TabsTriggerProps, TabsContentProps };
