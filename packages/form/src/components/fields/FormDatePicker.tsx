import { useController, useFormContext, type RegisterOptions } from "react-hook-form";
import { DatePicker, FormItem } from "@umichkisa-ds/web";

export type FormDatePickerProps = {
  name: string;
  label: string;
  rules?: RegisterOptions;
  description?: string;
  className?: string;
  placeholder?: string;
  formatDate?: (date: Date) => string;
};

export function FormDatePicker({
  name,
  label,
  rules,
  description,
  className,
  placeholder,
  formatDate,
}: FormDatePickerProps) {
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
      <DatePicker
        value={field.value}
        onChange={(date) => {
          field.onChange(date);
          field.onBlur();
        }}
        invalid={!!error}
        placeholder={placeholder}
        formatDate={formatDate}
      />
    </FormItem>
  );
}
