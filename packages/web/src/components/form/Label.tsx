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
        "type-label text-foreground",
        className
      )}
    >
      {children}
      {required && (
        <span className="ml-0.5 text-error" aria-hidden="true">
          *
        </span>
      )}
    </label>
  );
}
