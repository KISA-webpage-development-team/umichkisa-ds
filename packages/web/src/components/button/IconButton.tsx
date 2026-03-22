import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/utils/cn";

const iconButtonVariants = cva(
  "inline-flex items-center justify-center self-center gap-1 cursor-pointer rounded-md text-sm md:text-base px-4 py-2 transition-colors h-fit disabled:cursor-not-allowed disabled:opacity-60",
  {
    variants: {
      variant: {
        primary:
          "bg-[var(--color-brand-primary)] border border-[var(--color-brand-primary)] text-[var(--color-brand-accent)] hover:border-[var(--color-brand-accent)]",
        secondary:
          "bg-slate-100 border border-slate-100 text-[var(--color-foreground)] hover:bg-slate-200",
        tertiary:
          "border-none text-[var(--color-foreground)] hover:underline",
      },
    },
    defaultVariants: {
      variant: "secondary",
    },
  }
);

export type IconButtonProps = VariantProps<typeof iconButtonVariants> & {
  icon: React.ReactNode;
  text?: string;
  disabled?: boolean;
  forSubmit?: boolean;
  className?: string;
  onClick?: () => void;
  "aria-label"?: string;
};

export function IconButton({
  icon,
  text,
  variant,
  disabled = false,
  forSubmit = false,
  className,
  onClick,
  "aria-label": ariaLabel,
}: IconButtonProps) {
  return (
    <button
      type={forSubmit ? "submit" : "button"}
      disabled={disabled}
      aria-disabled={disabled}
      aria-label={ariaLabel}
      onClick={onClick}
      className={cn(iconButtonVariants({ variant }), className)}
    >
      {icon}
      {text && (
        <span className="hidden sm:inline text-sm md:text-base">{text}</span>
      )}
    </button>
  );
}
