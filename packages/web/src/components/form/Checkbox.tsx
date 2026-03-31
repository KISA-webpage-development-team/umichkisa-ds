import { cn } from "@/utils/cn";

type CheckboxProps = Omit<React.InputHTMLAttributes<HTMLInputElement>, "type"> & {
  invalid?: boolean;
  text?: string;
};

function Checkbox({ invalid = false, text, className, disabled, ...props }: CheckboxProps) {
  const control = (
    <span className={cn("relative inline-flex items-center justify-center size-5", !text && className)}>
      <input
        type="checkbox"
        aria-invalid={invalid}
        disabled={disabled}
        className="peer absolute inset-0 opacity-0 cursor-pointer disabled:cursor-default"
        {...props}
      />
      <span
        className={cn(
          "size-5 rounded-md border border-border-strong bg-surface transition-colors",
          "peer-checked:bg-brand-primary peer-checked:border-brand-primary",
          "peer-focus-visible:outline-none peer-focus-visible:border-brand-primary",
          "peer-disabled:pointer-events-none peer-disabled:bg-surface-subtle peer-disabled:border-border",
          "peer-disabled:peer-checked:bg-disabled-foreground peer-disabled:peer-checked:border-disabled-foreground",
          invalid && "border-error peer-focus-visible:border-error"
        )}
      />
      <svg
        aria-hidden="true"
        viewBox="0 0 14 14"
        fill="none"
        className="absolute size-3.5 text-brand-foreground opacity-0 peer-checked:opacity-100 pointer-events-none transition-opacity"
      >
        <polyline
          points="2.5 7 5.5 10.5 11.5 3.5"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </span>
  );

  if (!text) return control;

  return (
    <label className={cn("flex items-center gap-2", className)}>
      {control}
      <span className={cn(
        "type-body-sm text-foreground",
        disabled && "text-disabled-foreground"
      )}>
        {text}
      </span>
    </label>
  );
}

export { Checkbox };
export type { CheckboxProps };
