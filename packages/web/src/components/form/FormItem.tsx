import { memo, useState, useCallback } from "react";
import { Input } from "./Input";
import { Label } from "./Label";

type ValidationRule = (value: string) => string | null;

export type FormItemProps = {
  htmlFor: string;
  labelText: string;
  type: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  validationRules?: ValidationRule[];
  required?: boolean;
};

export const FormItem = memo(function FormItem({
  htmlFor,
  labelText,
  type,
  value,
  onChange,
  placeholder,
  validationRules = [],
  required = false,
}: FormItemProps) {
  const [error, setError] = useState<string | null>(null);
  const [requiredError, setRequiredError] = useState<boolean>(false);

  const validate = useCallback(
    (val: string = value) => {
      if (required && !val.trim()) {
        setRequiredError(true);
        setError(null);
        return false;
      }
      setRequiredError(false);
      for (const rule of validationRules) {
        const result = rule(val);
        if (result) {
          setError(result);
          return false;
        }
      }
      setError(null);
      return true;
    },
    [required, validationRules, value]
  );

  const handleBlur = () => validate();
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e);
    validate(e.target.value);
  };

  const isInvalid = requiredError || error !== null;

  return (
    <div className="relative flex flex-col gap-1 items-start">
      <Label htmlFor={htmlFor} required={required}>
        {labelText}
      </Label>
      <Input
        id={htmlFor}
        type={type}
        value={value}
        onChange={handleChange}
        onBlur={handleBlur}
        placeholder={placeholder}
        required={required}
        invalid={isInvalid}
      />
      {isInvalid && (
        <span className="absolute top-full mt-1 text-xs font-bold text-[var(--color-error)]">
          {error ?? ""}
        </span>
      )}
    </div>
  );
});
