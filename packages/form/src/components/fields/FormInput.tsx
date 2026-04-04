import { useController, useFormContext, type RegisterOptions } from "react-hook-form";
import { Input, FormItem, type InputProps } from "@umichkisa-ds/web";

export type FormInputProps = Omit<InputProps, "invalid" | "name" | "value" | "onChange" | "onBlur"> & {
  name: string;
  label: string;
  rules?: RegisterOptions;
  description?: string;
};

export function FormInput({
  name,
  label,
  rules,
  description,
  className,
  ...rest
}: FormInputProps) {
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
      <Input
        id={name}
        invalid={!!error}
        {...field}
        {...rest}
      />
    </FormItem>
  );
}
