import { useFormContext } from "react-hook-form";
import { Button, type ButtonProps } from "@umichkisa-ds/web";

export type FormButtonProps = ButtonProps & {
  disableWhenInvalid?: boolean;
};

export function FormButton({
  disableWhenInvalid = false,
  disabled,
  children,
  ...rest
}: FormButtonProps) {
  const {
    formState: { isSubmitting, isValid },
  } = useFormContext();

  const isDisabled =
    disabled || isSubmitting || (disableWhenInvalid && !isValid);

  return (
    <Button type="submit" disabled={isDisabled} {...rest}>
      {children}
    </Button>
  );
}
