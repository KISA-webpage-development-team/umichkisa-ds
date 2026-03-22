import { memo } from "react";
import { cn } from "@/utils/cn";

export type InputProps = {
  type: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
  placeholder?: string;
  invalid?: boolean;
  required?: boolean;
  disabled?: boolean;
  id?: string;
  className?: string;
};

export const Input = memo(function Input({
  type,
  value,
  onChange,
  onBlur,
  placeholder,
  invalid = false,
  required = false,
  disabled = false,
  id,
  className,
}: InputProps) {
  return (
    <input
      id={id}
      type={type}
      value={value}
      onChange={onChange}
      onBlur={onBlur}
      placeholder={placeholder}
      required={required}
      disabled={disabled}
      aria-invalid={invalid}
      className={cn(
        "w-full px-3 py-2 border border-[var(--color-border-strong)] rounded-md text-sm md:text-base text-[var(--color-foreground)] bg-[var(--color-surface)] placeholder:text-[var(--color-muted-foreground)] focus:outline-none focus:ring-2 focus:ring-[var(--color-brand-primary)] disabled:opacity-50 disabled:cursor-not-allowed transition-colors",
        invalid && "border-[var(--color-error)] focus:ring-[var(--color-error)]",
        className
      )}
    />
  );
});
