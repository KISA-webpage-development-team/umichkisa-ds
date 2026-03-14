import * as RadixDropdown from "@radix-ui/react-dropdown-menu";
import { cn } from "@/utils/cn";

export const Dropdown = RadixDropdown.Root;
export const DropdownTrigger = RadixDropdown.Trigger;

export type DropdownContentProps = {
  children: React.ReactNode;
  className?: string;
};

export function DropdownContent({ children, className }: DropdownContentProps) {
  return (
    <RadixDropdown.Portal>
      <RadixDropdown.Content
        className={cn(
          "z-50 min-w-[8rem] overflow-hidden rounded-[var(--radius-md)]",
          "border border-[var(--color-border)] bg-[var(--color-surface)] shadow-md",
          "p-1",
          className
        )}
        sideOffset={4}
      >
        {children}
      </RadixDropdown.Content>
    </RadixDropdown.Portal>
  );
}

export type DropdownItemProps = {
  children: React.ReactNode;
  onSelect?: () => void;
  className?: string;
};

export function DropdownItem({ children, onSelect, className }: DropdownItemProps) {
  return (
    <RadixDropdown.Item
      onSelect={onSelect}
      className={cn(
        "relative flex cursor-pointer select-none items-center rounded-sm px-3 py-2",
        "text-sm text-[var(--color-text-primary)]",
        "hover:bg-[var(--color-surface-muted)] focus:outline-none",
        className
      )}
    >
      {children}
    </RadixDropdown.Item>
  );
}
