import * as RadixDropdown from "@radix-ui/react-dropdown-menu";
import { cn } from "@/utils/cn";

// ── Dropdown (Root) ───────────────────────────────────────
type DropdownProps = React.ComponentPropsWithoutRef<typeof RadixDropdown.Root>;

function Dropdown(props: DropdownProps) {
  return <RadixDropdown.Root {...props} />;
}

// ── DropdownTrigger ───────────────────────────────────────
type DropdownTriggerProps = React.ComponentPropsWithoutRef<typeof RadixDropdown.Trigger>;

function DropdownTrigger(props: DropdownTriggerProps) {
  return <RadixDropdown.Trigger {...props} />;
}

// ── DropdownContent ───────────────────────────────────────
type DropdownContentProps = {
  children: React.ReactNode;
  side?: "top" | "right" | "bottom" | "left";
  align?: "start" | "center" | "end";
  sideOffset?: number;
  className?: string;
};

function DropdownContent({
  children,
  side = "bottom",
  align = "start",
  sideOffset = 4,
  className,
}: DropdownContentProps) {
  return (
    <RadixDropdown.Portal>
      <RadixDropdown.Content
        side={side}
        align={align}
        sideOffset={sideOffset}
        className={cn(
          "z-50 min-w-32 overflow-hidden rounded-md border border-border bg-surface shadow-md",
          "max-h-[var(--radix-dropdown-menu-content-available-height)] overflow-y-auto",
          "data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95",
          "data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95",
          "p-1",
          className
        )}
      >
        {children}
      </RadixDropdown.Content>
    </RadixDropdown.Portal>
  );
}

// ── DropdownItem ──────────────────────────────────────────
type DropdownItemProps = {
  children: React.ReactNode;
  onSelect?: () => void;
  variant?: "default" | "destructive";
  disabled?: boolean;
  className?: string;
};

function DropdownItem({
  children,
  onSelect,
  variant = "default",
  disabled,
  className,
}: DropdownItemProps) {
  return (
    <RadixDropdown.Item
      onSelect={onSelect}
      disabled={disabled}
      className={cn(
        "relative flex cursor-pointer select-none items-center rounded-sm px-3 py-2 type-body-sm text-foreground",
        "hover:bg-brand-accent-subtle focus:bg-brand-accent-subtle focus:outline-none",
        "data-[disabled]:pointer-events-none data-[disabled]:text-disabled-foreground",
        variant === "destructive" && "text-error",
        className
      )}
    >
      {children}
    </RadixDropdown.Item>
  );
}

// ── DropdownGroup ─────────────────────────────────────────
type DropdownGroupProps = {
  label: string;
  children: React.ReactNode;
};

function DropdownGroup({ label, children }: DropdownGroupProps) {
  return (
    <RadixDropdown.Group>
      <RadixDropdown.Label className="px-3 py-2 type-caption text-muted-foreground">
        {label}
      </RadixDropdown.Label>
      {children}
    </RadixDropdown.Group>
  );
}

// ── DropdownSeparator ─────────────────────────────────────
function DropdownSeparator() {
  return <RadixDropdown.Separator className="mx-1 my-1 h-px bg-border" />;
}

// ── Exports ───────────────────────────────────────────────
export { Dropdown, DropdownTrigger, DropdownContent, DropdownItem, DropdownGroup, DropdownSeparator };
export type { DropdownProps, DropdownTriggerProps, DropdownContentProps, DropdownItemProps, DropdownGroupProps };
