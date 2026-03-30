import { cn } from "@/utils/cn";

type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  invalid?: boolean;
};

function Input({ invalid = false, className, type = "text", ...props }: InputProps) {
  return (
    <input
      type={type}
      aria-invalid={invalid}
      className={cn(
        "w-full rounded-md border border-border-strong bg-surface px-3 py-2 type-body-sm text-foreground placeholder:text-muted-foreground transition-colors",
        "focus-visible:outline-none focus-visible:border-brand-primary",
        "disabled:pointer-events-none disabled:text-disabled-foreground disabled:bg-surface-subtle",
        invalid && "border-error focus-visible:border-error",
        className
      )}
      {...props}
    />
  );
}

export { Input };
export type { InputProps };
