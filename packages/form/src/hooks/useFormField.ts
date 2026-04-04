import {
  useController,
  type UseControllerProps,
  type FieldValues,
  type FieldPath,
} from "react-hook-form";

export type UseFormFieldReturn = {
  value: unknown;
  invalid: boolean;
  error: string | undefined;
  inputProps: {
    name: string;
    value: unknown;
    onChange: (...event: unknown[]) => void;
    onBlur: () => void;
    invalid: boolean;
    ref: React.Ref<unknown>;
  };
};

export function useFormField<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>(
  name: TName,
  rules?: UseControllerProps<TFieldValues, TName>["rules"]
): UseFormFieldReturn {
  const {
    field,
    fieldState: { error },
  } = useController<TFieldValues, TName>({ name, rules });

  const invalid = !!error;

  return {
    value: field.value,
    invalid,
    error: error?.message,
    inputProps: {
      name: field.name,
      value: field.value,
      onChange: field.onChange,
      onBlur: field.onBlur,
      invalid,
      ref: field.ref,
    },
  };
}
