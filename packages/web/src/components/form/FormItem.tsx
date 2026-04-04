import { cn } from "@/utils/cn";
import { Label } from "./Label";

export type FormItemProps = {
  htmlFor: string;
  label: string;
  required?: boolean;
  error?: string;
  description?: string;
  className?: string;
  children: React.ReactNode;
};

export function FormItem({
  htmlFor,
  label,
  required = false,
  error,
  description,
  className,
  children,
}: FormItemProps) {
  return (
    <div className={cn("flex flex-col gap-2", className)}>
      <Label htmlFor={htmlFor} id={`${htmlFor}-label`} required={required}>
        {label}
      </Label>
      {children}
      {description && !error && (
        <p
          id={`${htmlFor}-description`}
          className="type-caption text-muted-foreground"
        >
          {description}
        </p>
      )}
      {error && (
        <p
          id={`${htmlFor}-error`}
          className="type-caption text-error"
        >
          {error}
        </p>
      )}
    </div>
  );
}
