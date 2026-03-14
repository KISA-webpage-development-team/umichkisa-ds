import { cn } from "@/utils/cn";

export type LabelProps = {
  htmlFor: string;
  required?: boolean;
  className?: string;
  children: React.ReactNode;
};

export function Label({ htmlFor, required = false, className, children }: LabelProps) {
  return (
    <label
      htmlFor={htmlFor}
      className={cn(
        "text-sm font-medium text-[var(--color-text-primary)]",
        className
      )}
    >
      {children}
      {required && (
        <span className="ml-0.5 text-[var(--color-error)]" aria-hidden="true">
          *
        </span>
      )}
    </label>
  );
}
