import { cn } from "@/utils/cn";
import { Icon } from "@/components/icon";

type SelectProps = React.SelectHTMLAttributes<HTMLSelectElement> & {
  invalid?: boolean;
};

function Select({ invalid = false, className, children, ...props }: SelectProps) {
  return (
    <div className="relative w-full text-foreground has-[:disabled]:text-disabled-foreground">
      <select
        aria-invalid={invalid}
        className={cn(
          "w-full appearance-none rounded-md border border-border-strong bg-surface px-3 py-2 pr-8 type-body-sm text-foreground transition-colors",
          "focus-visible:outline-none focus-visible:border-brand-primary",
          "disabled:pointer-events-none disabled:text-disabled-foreground disabled:bg-surface-subtle",
          invalid && "border-error focus-visible:border-error",
          className
        )}
        {...props}
      >
        {children}
      </select>
      <Icon
        name="chevron-down"
        size="sm"
        className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2"
      />
    </div>
  );
}

export { Select };
export type { SelectProps };
