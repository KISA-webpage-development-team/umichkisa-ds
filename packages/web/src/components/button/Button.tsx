import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/utils/cn";

const buttonVariants = cva(
  [
    "inline-flex items-center justify-center gap-2 rounded-md cursor-pointer",
    "transition-colors",
    "focus-visible:outline focus-visible:outline-2 focus-visible:outline-[var(--color-focus-ring)] focus-visible:shadow-[0_0_0_4px_var(--color-brand-primary)]",
    "disabled:pointer-events-none disabled:text-[var(--color-disabled-foreground)] disabled:opacity-60",
  ],
  {
    variants: {
      variant: {
        primary: [
          "bg-[var(--color-brand-primary)] text-[var(--color-brand-foreground)] border border-[var(--color-brand-primary)]",
          "hover:bg-[var(--color-brand-primary-hover)] hover:border-[var(--color-brand-primary-hover)]",
          "active:bg-[var(--color-brand-primary-pressed)] active:border-[var(--color-brand-primary-pressed)]",
        ],
        secondary: [
          "bg-[var(--color-surface-subtle)] text-[var(--color-foreground)] border border-[var(--color-border)]",
          "hover:bg-[var(--color-surface-muted)] hover:border-[var(--color-border-strong)]",
          "active:bg-[var(--color-border)] active:border-[var(--color-border-strong)]",
        ],
        tertiary: [
          "bg-transparent text-[var(--color-foreground)] border border-transparent",
          "hover:bg-[var(--color-surface-subtle)]",
          "active:bg-[var(--color-surface-muted)]",
        ],
        destructive: [
          "bg-[var(--color-error)] text-[var(--color-error-foreground)] border border-[var(--color-error)]",
          "hover:bg-[var(--color-error-hover)] hover:border-[var(--color-error-hover)]",
          "active:bg-[var(--color-error-pressed)] active:border-[var(--color-error-pressed)]",
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
  VariantProps<typeof buttonVariants>;

function Button({ variant, size, className, type = "button", ...props }: ButtonProps) {
  return (
    <button
      type={type}
      className={cn(buttonVariants({ variant, size }), className)}
      {...props}
    />
  );
}

export { Button, buttonVariants };
export type { ButtonProps };
