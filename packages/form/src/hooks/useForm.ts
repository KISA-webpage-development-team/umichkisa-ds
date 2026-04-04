import {
  useForm as useRHFForm,
  type UseFormProps,
  type UseFormReturn,
  type FieldValues,
} from "react-hook-form";

export function useForm<T extends FieldValues = FieldValues>(
  props?: UseFormProps<T>
): UseFormReturn<T> {
  return useRHFForm<T>({
    mode: "onTouched",
    ...props,
  });
}
