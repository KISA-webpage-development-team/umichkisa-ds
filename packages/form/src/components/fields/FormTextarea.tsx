import { useController, useFormContext, type RegisterOptions } from "react-hook-form";
import { Textarea, FormItem, type TextareaProps } from "@umichkisa-ds/web";

export type FormTextareaProps = Omit<TextareaProps, "invalid" | "name" | "value" | "onChange" | "onBlur"> & {
  name: string;
  label: string;
  rules?: RegisterOptions;
  description?: string;
};

export function FormTextarea({
  name,
  label,
  rules,
  description,
  className,
  ...rest
}: FormTextareaProps) {
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
      <Textarea
        id={name}
        invalid={!!error}
        {...field}
        {...rest}
      />
    </FormItem>
  );
}
