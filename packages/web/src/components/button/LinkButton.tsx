import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/utils/cn";

const linkButtonVariants = cva(
  "inline-flex items-center justify-center self-center gap-1 cursor-pointer rounded-md text-sm md:text-base px-4 py-2 transition-colors",
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

export type LinkButtonProps = VariantProps<typeof linkButtonVariants> & {
  href: string;
  disabled?: boolean;
  className?: string;
  children: React.ReactNode;
};

export function LinkButton({
  href,
  variant,
  disabled = false,
  className,
  children,
}: LinkButtonProps) {
  const cls = cn(linkButtonVariants({ variant }), className);

  if (disabled) {
    return (
      <span className={cls} aria-disabled="true">
        {children}
      </span>
    );
  }

  return (
    <a href={href} className={cls}>
      {children}
    </a>
  );
}
