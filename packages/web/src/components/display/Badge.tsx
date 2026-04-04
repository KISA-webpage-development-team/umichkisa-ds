import { cva, type VariantProps } from "class-variance-authority";
import { Slot } from "@radix-ui/react-slot";
import { cn } from "@/utils/cn";

const badgeVariants = cva(
  [
    "inline-flex items-center justify-center gap-1 rounded-md border w-fit whitespace-nowrap shrink-0 truncate",
    "focus-visible:outline focus-visible:outline-2 focus-visible:outline-focus-ring focus-visible:shadow-[0_0_0_4px_var(--color-brand-primary)]",
  ],
  {
    variants: {
      variant: {
        default: "bg-surface-subtle text-foreground border-border",
        brand: "bg-brand-primary text-brand-foreground border-brand-primary",
        success: "bg-success-subtle text-foreground border-success",
        warning: "bg-warning-subtle text-foreground border-warning",
        error: "bg-error-subtle text-foreground border-error",
        info: "bg-info-subtle text-foreground border-info",
        outline: "bg-transparent text-foreground border-border",
      },
      size: {
        sm: "type-caption px-1.5 py-0.5",
        md: "type-body-sm px-2 py-0.5",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "md",
    },
  },
);

type BadgeProps = React.ComponentPropsWithoutRef<"span"> &
  VariantProps<typeof badgeVariants> & {
    asChild?: boolean;
  };

function Badge({
  variant,
  size,
  className,
  asChild = false,
  ...props
}: BadgeProps) {
  const Comp = asChild ? Slot : "span";
  return (
    <Comp className={cn(badgeVariants({ variant, size }), className)} {...props} />
  );
}

export { Badge, badgeVariants };
export type { BadgeProps };
