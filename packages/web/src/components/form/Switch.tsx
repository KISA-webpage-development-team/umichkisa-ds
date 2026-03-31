import { cn } from "@/utils/cn";

type SwitchProps = Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  "type" | "role" | "size"
> & {
  invalid?: boolean;
  size?: "default" | "sm";
};

function Switch({
  invalid = false,
  size = "default",
  className,
  ...props
}: SwitchProps) {
  const isSmall = size === "sm";

  return (
    <span
      className={cn(
        "relative inline-flex items-center",
        isSmall ? "h-4 w-7" : "h-6 w-10",
        className
      )}
    >
      <input
        type="checkbox"
        role="switch"
        aria-invalid={invalid}
        className="peer absolute inset-0 opacity-0 cursor-pointer disabled:cursor-default"
        {...props}
      />
      {/* Track */}
      <span
        className={cn(
          "absolute inset-0 rounded-full border transition-colors",
          "border-border-strong bg-surface-subtle",
          "peer-checked:bg-foreground peer-checked:border-foreground",
          "peer-focus-visible:outline-none peer-focus-visible:border-brand-primary",
          "peer-disabled:pointer-events-none peer-disabled:bg-surface-subtle peer-disabled:border-border",
          "peer-disabled:peer-checked:bg-disabled-foreground peer-disabled:peer-checked:border-disabled-foreground",
          invalid && "border-error peer-focus-visible:border-error"
        )}
      />
      {/* Thumb */}
      <span
        className={cn(
          "pointer-events-none absolute rounded-full bg-foreground transition-all duration-200",
          "peer-checked:bg-surface",
          "peer-disabled:bg-disabled-foreground",
          "peer-disabled:peer-checked:bg-surface",
          isSmall
            ? "left-0.5 size-2.5 peer-checked:left-[calc(100%-0.125rem-0.625rem)] peer-checked:size-3"
            : "left-1 size-4 peer-checked:left-[calc(100%-0.25rem-1.25rem)] peer-checked:size-5"
        )}
      />
    </span>
  );
}

export { Switch };
export type { SwitchProps };
