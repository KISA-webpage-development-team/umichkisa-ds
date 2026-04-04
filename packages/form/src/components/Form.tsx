import {
  FormProvider,
  type UseFormReturn,
  type FieldValues,
  type SubmitHandler,
} from "react-hook-form";

export type FormProps<T extends FieldValues = FieldValues> = {
  form: UseFormReturn<T>;
  onSubmit: SubmitHandler<T>;
  children: React.ReactNode;
  className?: string;
};

export function Form<T extends FieldValues = FieldValues>({
  form,
  onSubmit,
  children,
  className,
}: FormProps<T>) {
  return (
    <FormProvider {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className={className}
        noValidate
      >
        {children}
      </form>
    </FormProvider>
  );
}
