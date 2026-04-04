import { useController, useFormContext, type RegisterOptions } from "react-hook-form";
import { Checkbox, FormItem, type CheckboxProps } from "@umichkisa-ds/web";

export type FormCheckboxProps = Omit<CheckboxProps, "invalid" | "name" | "checked" | "onChange" | "onBlur"> & {
  name: string;
  label: string;
  rules?: RegisterOptions;
  description?: string;
};

export function FormCheckbox({
  name,
  label,
  rules,
  description,
  className,
  ...rest
}: FormCheckboxProps) {
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
      <Checkbox
        id={name}
        invalid={!!error}
        checked={!!field.value}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          field.onChange(e.target.checked);
          field.onBlur();
        }}
        {...rest}
      />
    </FormItem>
  );
}
