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
          "z-50 min-w-32 overflow-hidden rounded-md border border-border bg-surface shadow-md",
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
        "hover:bg-brand-accent-subtle focus:bg-brand-accent-subtle focus:outline-none",
        "data-[disabled]:pointer-events-none data-[disabled]:text-disabled-foreground",
        className
      )}
    >
      <span className="absolute left-2 flex items-center text-brand-primary">
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
