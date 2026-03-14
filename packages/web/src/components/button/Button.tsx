import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/utils/cn";

const buttonVariants = cva(
  "inline-flex items-center justify-center self-center gap-1 cursor-pointer rounded-[var(--radius-md)] text-sm md:text-base px-4 py-2 transition-colors disabled:cursor-not-allowed disabled:opacity-60",
  {
    variants: {
      variant: {
        primary:
          "bg-[var(--color-brand-primary)] border border-[var(--color-brand-primary)] text-[var(--color-brand-accent)] hover:border-[var(--color-brand-accent)]",
        secondary:
          "bg-slate-100 border border-slate-100 text-[var(--color-text-primary)] hover:bg-slate-200",
        tertiary:
          "border-none text-[var(--color-text-primary)] hover:underline",
      },
    },
    defaultVariants: {
      variant: "primary",
    },
  }
);

export type ButtonVariant = "primary" | "secondary" | "tertiary";

export type ButtonProps = VariantProps<typeof buttonVariants> & {
  disabled?: boolean;
  forSubmit?: boolean;
  className?: string;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  children: React.ReactNode;
};

export function Button({
  variant,
  disabled = false,
  forSubmit = false,
  className,
  onClick,
  children,
}: ButtonProps) {
  return (
    <button
      type={forSubmit ? "submit" : "button"}
      disabled={disabled}
      aria-disabled={disabled}
      onClick={onClick}
      className={cn(buttonVariants({ variant }), className)}
    >
      {children}
    </button>
  );
}
