import { useController, useFormContext, type RegisterOptions } from "react-hook-form";
import { DateRangePicker, FormItem } from "@umichkisa-ds/web";

export type FormDateRangePickerProps = {
  name: string;
  label: string;
  rules?: RegisterOptions;
  description?: string;
  className?: string;
  placeholder?: string;
  formatDate?: (date: Date) => string;
};

export function FormDateRangePicker({
  name,
  label,
  rules,
  description,
  className,
  placeholder,
  formatDate,
}: FormDateRangePickerProps) {
  const { control } = useFormContext();
  const {
    field,
    fieldState: { error },
  } = useController({ name, control, rules });

  return (
    <FormItem
      htmlFor={name}
      label={label}
      required={!!rules?.required}
      error={error?.message}
      description={description}
      className={className}
    >
      <DateRangePicker
        value={field.value}
        onChange={(range) => {
          field.onChange(range);
          field.onBlur();
        }}
        invalid={!!error}
        placeholder={placeholder}
        formatDate={formatDate}
      />
    </FormItem>
  );
}
