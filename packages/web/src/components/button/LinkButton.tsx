import { type VariantProps } from "class-variance-authority";
import { cn } from "@/utils/cn";
import { buttonVariants } from "./Button";

type LinkButtonProps = Omit<
  React.AnchorHTMLAttributes<HTMLAnchorElement>,
  "href"
> &
  VariantProps<typeof buttonVariants> & {
    href?: string;
    disabled?: boolean;
  };

function LinkButton({
  variant,
  size,
  disabled = false,
  className,
  children,
  ...props
}: LinkButtonProps) {
  if (disabled) {
    return (
      <span
        className={cn(
          buttonVariants({ variant, size }),
          "pointer-events-none text-disabled-foreground opacity-60",
          className
        )}
        role="link"
        aria-disabled="true"
      >
        {children}
      </span>
    );
  }

  return (
    <a
      className={cn(buttonVariants({ variant, size }), "hover:underline", className)}
      {...props}
    >
      {children}
    </a>
  );
}

export { LinkButton };
export type { LinkButtonProps };
