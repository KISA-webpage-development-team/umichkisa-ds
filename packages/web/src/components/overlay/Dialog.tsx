import * as RadixDialog from "@radix-ui/react-dialog";
import { cn } from "@/utils/cn";

export const Dialog = RadixDialog.Root;
export const DialogTrigger = RadixDialog.Trigger;
export const DialogClose = RadixDialog.Close;

export type DialogContentProps = {
  children: React.ReactNode;
  className?: string;
};

export function DialogContent({ children, className }: DialogContentProps) {
  return (
    <RadixDialog.Portal>
      <RadixDialog.Overlay className="fixed inset-0 z-50 bg-black/50" />
      <RadixDialog.Content
        className={cn(
          "fixed left-1/2 top-1/2 z-50 -translate-x-1/2 -translate-y-1/2",
          "w-full max-w-lg rounded-lg",
          "border border-[var(--color-border)] bg-[var(--color-surface)]",
          "p-6 shadow-lg focus:outline-none",
          className
        )}
      >
        {children}
      </RadixDialog.Content>
    </RadixDialog.Portal>
  );
}

export type DialogTitleProps = {
  children: React.ReactNode;
  className?: string;
};

export function DialogTitle({ children, className }: DialogTitleProps) {
  return (
    <RadixDialog.Title
      className={cn("text-lg font-semibold text-[var(--color-text-primary)] mb-4", className)}
    >
      {children}
    </RadixDialog.Title>
  );
}
