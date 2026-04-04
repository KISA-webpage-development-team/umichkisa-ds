import { useController, useFormContext, type RegisterOptions } from "react-hook-form";
import { RadioGroup, FormItem, type RadioGroupProps } from "@umichkisa-ds/web";

export type FormRadioProps = Omit<RadioGroupProps, "invalid" | "name" | "value" | "onValueChange"> & {
  name: string;
  label: string;
  rules?: RegisterOptions;
  description?: string;
  children: React.ReactNode;
};

export function FormRadio({
  name,
  label,
  rules,
  description,
  className,
  children,
  ...rest
}: FormRadioProps) {
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
      <RadioGroup
        invalid={!!error}
        value={field.value}
        onValueChange={(val) => {
          field.onChange(val);
          field.onBlur();
        }}
        {...rest}
      >
        {children}
      </RadioGroup>
    </FormItem>
  );
}
