import { cn } from "@/utils/cn";

type SwitchProps = Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  "type" | "role" | "size"
> & {
  invalid?: boolean;
  size?: "default" | "sm";
  text?: string;
};

function Switch({
  invalid = false,
  size = "default",
  text,
  className,
  disabled,
  ...props
}: SwitchProps) {
  const isSmall = size === "sm";

  const control = (
    <span
      className={cn(
        "relative inline-flex items-center",
        isSmall ? "h-4 w-7" : "h-6 w-10",
        !text && className
      )}
    >
      <input
        type="checkbox"
        role="switch"
        aria-invalid={invalid}
        disabled={disabled}
        className="peer absolute inset-0 opacity-0 cursor-pointer disabled:cursor-default"
        {...props}
      />
      {/* Track */}
      <span
        className={cn(
          "pointer-events-none absolute inset-0 rounded-full border transition-colors",
          "border-border-strong bg-surface-subtle",
          "peer-checked:bg-brand-primary peer-checked:border-brand-primary",
          "peer-focus-visible:outline-none peer-focus-visible:border-brand-primary",
          "peer-disabled:pointer-events-none peer-disabled:bg-surface-subtle peer-disabled:border-border",
          "peer-disabled:peer-checked:bg-disabled-foreground peer-disabled:peer-checked:border-disabled-foreground",
          invalid && "border-error peer-focus-visible:border-error"
        )}
      />
      {/* Thumb */}
      <span
        className={cn(
          "pointer-events-none absolute rounded-full bg-brand-primary transition-all duration-200",
          "peer-checked:bg-surface",
          "peer-disabled:bg-disabled-foreground",
          "peer-disabled:peer-checked:bg-surface",
          isSmall
            ? "left-0.5 size-2.5 peer-checked:left-[calc(100%-0.125rem-0.75rem)] peer-checked:size-3"
            : "left-1 size-4 peer-checked:left-[calc(100%-0.25rem-1.25rem)] peer-checked:size-5"
        )}
      />
    </span>
  );

  if (!text) return control;

  return (
    <label className={cn("flex items-center gap-2", className)}>
      {control}
      <span className={cn(
        isSmall ? "type-caption" : "type-body-sm",
        "text-foreground",
        disabled && "text-disabled-foreground"
      )}>
        {text}
      </span>
    </label>
  );
}

export { Switch };
export type { SwitchProps };
