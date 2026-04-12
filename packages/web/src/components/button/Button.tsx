import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/utils/cn";
import { LoadingSpinner } from "@/components/feedback/LoadingSpinner";

const buttonVariants = cva(
  [
    "inline-flex items-center justify-center gap-2 rounded-md cursor-pointer",
    "transition-colors",
    "focus-visible:outline focus-visible:outline-2 focus-visible:outline-focus-ring focus-visible:shadow-[0_0_0_4px_var(--color-brand-primary)]",
    "disabled:pointer-events-none disabled:text-disabled-foreground disabled:opacity-60",
  ],
  {
    variants: {
      variant: {
        primary: [
          "bg-brand-primary text-brand-foreground border border-brand-primary !font-bold",
          "hover:bg-brand-primary-hover hover:border-brand-primary-hover",
          "active:bg-brand-primary-pressed active:border-brand-primary-pressed",
        ],
        secondary: [
          "bg-surface-subtle text-foreground border border-border !font-bold",
          "hover:bg-surface-muted hover:border-border-strong",
          "active:bg-border active:border-border-strong",
        ],
        tertiary: [
          "bg-transparent text-foreground border border-transparent",
          "hover:bg-surface-subtle",
          "active:bg-surface-muted",
        ],
        destructive: [
          "bg-error text-error-foreground border border-error !font-bold",
          "hover:bg-error-hover hover:border-error-hover",
          "active:bg-error-pressed active:border-error-pressed",
        ],
      },
      size: {
        sm: "type-body-sm px-3 py-1.5",
        md: "type-body-sm px-4 py-2",
        lg: "type-body px-6 py-2.5",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  }
);

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> &
  VariantProps<typeof buttonVariants> & {
    /** Show a loading spinner and disable the button. */
    loading?: boolean;
  };

function Button({ variant, size, className, type = "button", loading = false, disabled, children, ...props }: ButtonProps) {
  return (
    <button
      type={type}
      className={cn(buttonVariants({ variant, size }), className)}
      disabled={disabled || loading}
      aria-busy={loading || undefined}
      {...props}
    >
      {loading && <LoadingSpinner size="sm" className="shrink-0" />}
      {children}
    </button>
  );
}

export { Button, buttonVariants };
export type { ButtonProps };
