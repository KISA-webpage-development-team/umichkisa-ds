import { useFormContext } from "react-hook-form";

export type UseFormStatusReturn = {
  isSubmitting: boolean;
  isValid: boolean;
  isDirty: boolean;
};

export function useFormStatus(): UseFormStatusReturn {
  const {
    formState: { isSubmitting, isValid, isDirty },
  } = useFormContext();

  return { isSubmitting, isValid, isDirty };
}
