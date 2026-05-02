import { Drawer as Vaul } from "vaul";
import { cn } from "@/utils/cn";
import { Icon } from "@/components/icon/Icon";

// ── Sheet (Root) ─────────────────────────────────────────
//
// Mobile-only bottom-sheet overlay. For responsive overlays use Dialog.
// Built on vaul's Drawer primitive — drag-to-dismiss is part of the atom.

type SheetProps = React.ComponentPropsWithoutRef<typeof Vaul.Root>;

function Sheet(props: SheetProps) {
  return <Vaul.Root {...props} />;
}

// ── SheetTrigger ─────────────────────────────────────────
type SheetTriggerProps = React.ComponentPropsWithoutRef<typeof Vaul.Trigger>;

function SheetTrigger(props: SheetTriggerProps) {
  return <Vaul.Trigger {...props} />;
}

// ── SheetClose ───────────────────────────────────────────
type SheetCloseProps = React.ComponentPropsWithoutRef<typeof Vaul.Close>;

function SheetClose(props: SheetCloseProps) {
  return <Vaul.Close {...props} />;
}

// ── SheetContent ─────────────────────────────────────────
type SheetContentProps = {
  children: React.ReactNode;
  showCloseButton?: boolean;
  showHandle?: boolean;
  className?: string;
};

function SheetContent({
  children,
  showCloseButton = true,
  showHandle = true,
  className,
}: SheetContentProps) {
  return (
    <Vaul.Portal>
      <Vaul.Overlay
        className={cn(
          "fixed inset-0 z-50 bg-overlay",
          // Match Dialog overlay timing; vaul drives transform for drag, we drive opacity.
          "data-[state=open]:animate-[dialog-overlay-in_150ms_ease-out]",
          "data-[state=closed]:animate-[dialog-overlay-out_100ms_ease-in]",
          // Honor reduced-motion: instant open/close.
          "motion-reduce:animate-none"
        )}
      />
      <Vaul.Content
        className={cn(
          "fixed inset-x-0 bottom-0 z-50 flex max-h-[90vh] flex-col gap-4",
          "rounded-t-lg border border-border bg-surface p-6 shadow-lg",
          "focus-visible:outline-none",
          // Reduced-motion: vaul transitions are inline-style transforms; this
          // class disables any keyframe-based transitions vaul might attach.
          "motion-reduce:transition-none",
          className
        )}
      >
        {showHandle && (
          <div
            aria-hidden="true"
            className="mx-auto -mt-2 mb-2 h-1.5 w-12 rounded-full bg-border-strong"
          />
        )}
        {children}
        {showCloseButton && (
          <Vaul.Close asChild>
            <button
              type="button"
              className={cn(
                "absolute right-4 top-4 rounded-sm p-1 text-muted-foreground",
                "hover:text-foreground",
                "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus-ring",
                "focus-visible:shadow-[0_0_0_4px_var(--color-brand-primary)]",
                "after:absolute after:-inset-2 after:content-['']"
              )}
              aria-label="Close"
            >
              <Icon name="x" size="sm" />
            </button>
          </Vaul.Close>
        )}
      </Vaul.Content>
    </Vaul.Portal>
  );
}

// ── SheetTitle ───────────────────────────────────────────
type SheetTitleProps = {
  children: React.ReactNode;
  className?: string;
};

function SheetTitle({ children, className }: SheetTitleProps) {
  return (
    <Vaul.Title className={cn("type-h3 text-foreground", className)}>
      {children}
    </Vaul.Title>
  );
}

// ── SheetDescription ─────────────────────────────────────
type SheetDescriptionProps = {
  children: React.ReactNode;
  className?: string;
};

function SheetDescription({ children, className }: SheetDescriptionProps) {
  return (
    <Vaul.Description
      className={cn("type-body-sm text-muted-foreground", className)}
    >
      {children}
    </Vaul.Description>
  );
}

// ── SheetFooter ──────────────────────────────────────────
type SheetFooterProps = {
  children: React.ReactNode;
  className?: string;
};

function SheetFooter({ children, className }: SheetFooterProps) {
  return (
    <div className={cn("flex justify-end gap-2 mt-6", className)}>
      {children}
    </div>
  );
}

// ── Exports ──────────────────────────────────────────────
export {
  Sheet,
  SheetTrigger,
  SheetClose,
  SheetContent,
  SheetTitle,
  SheetDescription,
  SheetFooter,
};
export type {
  SheetProps,
  SheetTriggerProps,
  SheetCloseProps,
  SheetContentProps,
  SheetTitleProps,
  SheetDescriptionProps,
  SheetFooterProps,
};
