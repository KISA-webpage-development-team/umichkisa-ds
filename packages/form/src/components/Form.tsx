import {
  FormProvider,
  type UseFormReturn,
  type FieldValues,
  type SubmitHandler,
} from "react-hook-form";
import { cn } from "@umichkisa-ds/web";
import { FormInput } from "./fields/FormInput";
import { FormTextarea } from "./fields/FormTextarea";
import { FormSelect } from "./fields/FormSelect";
import { FormCheckbox } from "./fields/FormCheckbox";
import { FormRadio } from "./fields/FormRadio";
import { FormSwitch } from "./fields/FormSwitch";
import { FormButton } from "./fields/FormButton";
import { FormDatePicker } from "./fields/FormDatePicker";
import { FormDateRangePicker } from "./fields/FormDateRangePicker";

export type FormProps<T extends FieldValues = FieldValues> = {
  form: UseFormReturn<T>;
  onSubmit: SubmitHandler<T>;
  children: React.ReactNode;
  className?: string;
};

function FormRoot<T extends FieldValues = FieldValues>({
  form,
  onSubmit,
  children,
  className,
}: FormProps<T>) {
  return (
    <FormProvider {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className={cn("flex flex-col gap-4", className)}
        noValidate
      >
        {children}
      </form>
    </FormProvider>
  );
}

export const Form = Object.assign(FormRoot, {
  Input: FormInput,
  Textarea: FormTextarea,
  Select: FormSelect,
  Checkbox: FormCheckbox,
  Radio: FormRadio,
  Switch: FormSwitch,
  Button: FormButton,
  DatePicker: FormDatePicker,
  DateRangePicker: FormDateRangePicker,
});
