import { useController, useFormContext, type RegisterOptions } from "react-hook-form";
import { Select, FormItem } from "@umichkisa-ds/web";

export type FormSelectProps = {
  name: string;
  label: string;
  rules?: RegisterOptions;
  description?: string;
  className?: string;
  children: React.ReactNode;
};

export function FormSelect({
  name,
  label,
  rules,
  description,
  className,
  children,
}: FormSelectProps) {
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
      <Select
        value={field.value}
        onValueChange={(val) => {
          field.onChange(val);
          field.onBlur();
        }}
      >
        {children}
      </Select>
    </FormItem>
  );
}
