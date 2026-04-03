import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/utils/cn";
import { Icon } from "@/components/icon";
import type { IconName } from "@/components/icon";

const alertVariants = cva(
  "w-full flex items-center gap-2 rounded-lg border-l-4 p-4",
  {
    variants: {
      variant: {
        info: "border-l-info bg-info-subtle",
        success: "border-l-success bg-success-subtle",
        warning: "border-l-warning bg-warning-subtle",
        error: "border-l-error bg-error-subtle",
      },
    },
    defaultVariants: {
      variant: "info",
    },
  }
);

const variantIcons: Record<NonNullable<AlertProps["variant"]>, IconName> = {
  info: "info",
  success: "circle-check",
  warning: "triangle-alert",
  error: "circle-x",
};

const variantIconColors: Record<NonNullable<AlertProps["variant"]>, string> = {
  info: "text-info",
  success: "text-success",
  warning: "text-warning",
  error: "text-error",
};

type AlertProps = React.ComponentPropsWithoutRef<"div"> &
  VariantProps<typeof alertVariants> & {
    title?: string;
    icon?: IconName | null;
  };

function Alert({
  variant = "info",
  title,
  icon,
  className,
  children,
  ...props
}: AlertProps) {
  const resolvedIcon = icon === null ? null : (icon ?? variantIcons[variant!]);

  return (
    <div className={cn(alertVariants({ variant }), className)} {...props}>
      {resolvedIcon && (
        <div className={cn("shrink-0", variantIconColors[variant!])}>
          <Icon name={resolvedIcon} size="sm" />
        </div>
      )}
      <div className="flex flex-col gap-2 min-w-0">
        {title && (
          <p className="type-body-sm text-foreground"><strong>{title}</strong></p>
        )}
        {children && (
          <div className="type-body-sm text-foreground">{children}</div>
        )}
      </div>
    </div>
  );
}

export { Alert, alertVariants };
export type { AlertProps };
