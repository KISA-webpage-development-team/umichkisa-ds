import * as RadixPopover from "@radix-ui/react-popover";
import { cn } from "@/utils/cn";

export const Popover = RadixPopover.Root;
export const PopoverTrigger = RadixPopover.Trigger;

export type PopoverContentProps = {
  children: React.ReactNode;
  className?: string;
};

export function PopoverContent({ children, className }: PopoverContentProps) {
  return (
    <RadixPopover.Portal>
      <RadixPopover.Content
        className={cn(
          "z-50 rounded-md",
          "border border-[var(--color-border)] bg-[var(--color-surface)] shadow-md",
          "p-4",
          className
        )}
        sideOffset={4}
      >
        {children}
      </RadixPopover.Content>
    </RadixPopover.Portal>
  );
}
