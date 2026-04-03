import * as RadixDialog from "@radix-ui/react-dialog";
import { cn } from "@/utils/cn";
import { Icon } from "@/components/icon/Icon";

// ── Dialog (Root) ────────────────────────────────────────
type DialogProps = React.ComponentPropsWithoutRef<typeof RadixDialog.Root>;

function Dialog(props: DialogProps) {
  return <RadixDialog.Root {...props} />;
}

// ── DialogTrigger ────────────────────────────────────────
type DialogTriggerProps = React.ComponentPropsWithoutRef<typeof RadixDialog.Trigger>;

function DialogTrigger(props: DialogTriggerProps) {
  return <RadixDialog.Trigger {...props} />;
}

// ── DialogClose ──────────────────────────────────────────
type DialogCloseProps = React.ComponentPropsWithoutRef<typeof RadixDialog.Close>;

function DialogClose(props: DialogCloseProps) {
  return <RadixDialog.Close {...props} />;
}

// ── DialogContent ────────────────────────────────────────
const sizeMap = {
  sm: "max-w-sm",
  md: "max-w-lg",
  lg: "max-w-2xl",
  full: "max-w-full",
} as const;

type DialogContentProps = {
  children: React.ReactNode;
  size?: "sm" | "md" | "lg" | "full";
  showCloseButton?: boolean;
  className?: string;
};

function DialogContent({
  children,
  size = "md",
  showCloseButton = true,
  className,
}: DialogContentProps) {
  return (
    <RadixDialog.Portal>
      <RadixDialog.Overlay
        className={cn(
          "fixed inset-0 z-50 bg-overlay",
          "data-[state=open]:animate-[dialog-overlay-in_150ms_ease-out]",
          "data-[state=closed]:animate-[dialog-overlay-out_100ms_ease-in]"
        )}
      />
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <RadixDialog.Content
          className={cn(
            "relative w-full rounded-lg border border-border bg-surface p-6 shadow-lg",
            "data-[state=open]:animate-[dialog-content-in_150ms_ease-out]",
            "data-[state=closed]:animate-[dialog-content-out_100ms_ease-in]",
            "focus-visible:outline-none",
            sizeMap[size],
            className
          )}
        >
          {children}
          {showCloseButton && (
            <RadixDialog.Close asChild>
              <button
                type="button"
                className={cn(
                  "absolute right-4 top-4 rounded-sm p-1 text-muted-foreground",
                  "hover:text-foreground",
                  "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus-ring",
                  "focus-visible:shadow-[0_0_0_4px_var(--color-brand-primary)]",
                  "after:absolute after:inset-[-8px] after:content-['']"
                )}
                aria-label="Close"
              >
                <Icon name="x" size="sm" />
              </button>
            </RadixDialog.Close>
          )}
        </RadixDialog.Content>
      </div>
    </RadixDialog.Portal>
  );
}

// ── DialogTitle ──────────────────────────────────────────
type DialogTitleProps = {
  children: React.ReactNode;
  className?: string;
};

function DialogTitle({ children, className }: DialogTitleProps) {
  return (
    <RadixDialog.Title className={cn("type-h3 text-foreground", className)}>
      {children}
    </RadixDialog.Title>
  );
}

// ── DialogDescription ────────────────────────────────────
type DialogDescriptionProps = {
  children: React.ReactNode;
  className?: string;
};

function DialogDescription({ children, className }: DialogDescriptionProps) {
  return (
    <RadixDialog.Description
      className={cn("type-body-sm text-muted-foreground mt-2", className)}
    >
      {children}
    </RadixDialog.Description>
  );
}

// ── DialogFooter ─────────────────────────────────────────
type DialogFooterProps = {
  children: React.ReactNode;
  className?: string;
};

function DialogFooter({ children, className }: DialogFooterProps) {
  return (
    <div className={cn("flex justify-end gap-2 mt-6", className)}>
      {children}
    </div>
  );
}

// ── Exports ──────────────────────────────────────────────
export {
  Dialog,
  DialogTrigger,
  DialogClose,
  DialogContent,
  DialogTitle,
  DialogDescription,
  DialogFooter,
};
export type {
  DialogProps,
  DialogTriggerProps,
  DialogCloseProps,
  DialogContentProps,
  DialogTitleProps,
  DialogDescriptionProps,
  DialogFooterProps,
};
