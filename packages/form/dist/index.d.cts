import { FieldValues, UseFormProps, UseFormReturn, FieldPath, UseControllerProps, RegisterOptions, SubmitHandler } from 'react-hook-form';
import * as react_jsx_runtime from 'react/jsx-runtime';
import { InputProps, TextareaProps, CheckboxProps, RadioGroupProps, SwitchProps, ButtonProps } from '@umichkisa-ds/web';

declare function useForm<T extends FieldValues = FieldValues>(props?: UseFormProps<T>): UseFormReturn<T>;

type UseFormFieldReturn = {
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
declare function useFormField<TFieldValues extends FieldValues = FieldValues, TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>>(name: TName, rules?: UseControllerProps<TFieldValues, TName>["rules"]): UseFormFieldReturn;

type UseFormStatusReturn = {
    isSubmitting: boolean;
    isValid: boolean;
    isDirty: boolean;
};
declare function useFormStatus(): UseFormStatusReturn;

type FormInputProps = Omit<InputProps, "invalid" | "name" | "value" | "onChange" | "onBlur"> & {
    name: string;
    label: string;
    rules?: RegisterOptions;
    description?: string;
};
declare function FormInput({ name, label, rules, description, className, ...rest }: FormInputProps): react_jsx_runtime.JSX.Element;

type FormTextareaProps = Omit<TextareaProps, "invalid" | "name" | "value" | "onChange" | "onBlur"> & {
    name: string;
    label: string;
    rules?: RegisterOptions;
    description?: string;
};
declare function FormTextarea({ name, label, rules, description, className, ...rest }: FormTextareaProps): react_jsx_runtime.JSX.Element;

type FormSelectProps = {
    name: string;
    label: string;
    rules?: RegisterOptions;
    description?: string;
    className?: string;
    children: React.ReactNode;
};
declare function FormSelect({ name, label, rules, description, className, children, }: FormSelectProps): react_jsx_runtime.JSX.Element;

type FormCheckboxProps = Omit<CheckboxProps, "invalid" | "name" | "checked" | "onChange" | "onBlur"> & {
    name: string;
    label: string;
    rules?: RegisterOptions;
    description?: string;
};
declare function FormCheckbox({ name, label, rules, description, className, ...rest }: FormCheckboxProps): react_jsx_runtime.JSX.Element;

type FormRadioProps = Omit<RadioGroupProps, "invalid" | "name" | "value" | "onValueChange"> & {
    name: string;
    label: string;
    rules?: RegisterOptions;
    description?: string;
    children: React.ReactNode;
};
declare function FormRadio({ name, label, rules, description, className, children, ...rest }: FormRadioProps): react_jsx_runtime.JSX.Element;

type FormSwitchProps = Omit<SwitchProps, "invalid" | "name" | "checked" | "onChange" | "onBlur"> & {
    name: string;
    label: string;
    rules?: RegisterOptions;
    description?: string;
};
declare function FormSwitch({ name, label, rules, description, className, ...rest }: FormSwitchProps): react_jsx_runtime.JSX.Element;

type FormButtonProps = ButtonProps & {
    disableWhenInvalid?: boolean;
};
declare function FormButton({ disableWhenInvalid, disabled, children, ...rest }: FormButtonProps): react_jsx_runtime.JSX.Element;

type FormDatePickerProps = {
    name: string;
    label: string;
    rules?: RegisterOptions;
    description?: string;
    className?: string;
    placeholder?: string;
    formatDate?: (date: Date) => string;
};
declare function FormDatePicker({ name, label, rules, description, className, placeholder, formatDate, }: FormDatePickerProps): react_jsx_runtime.JSX.Element;

type FormDateRangePickerProps = {
    name: string;
    label: string;
    rules?: RegisterOptions;
    description?: string;
    className?: string;
    placeholder?: string;
    formatDate?: (date: Date) => string;
};
declare function FormDateRangePicker({ name, label, rules, description, className, placeholder, formatDate, }: FormDateRangePickerProps): react_jsx_runtime.JSX.Element;

type FormProps<T extends FieldValues = FieldValues> = {
    form: UseFormReturn<T>;
    onSubmit: SubmitHandler<T>;
    children: React.ReactNode;
    className?: string;
};
declare function FormRoot<T extends FieldValues = FieldValues>({ form, onSubmit, children, className, }: FormProps<T>): react_jsx_runtime.JSX.Element;
declare const Form: typeof FormRoot & {
    Input: typeof FormInput;
    Textarea: typeof FormTextarea;
    Select: typeof FormSelect;
    Checkbox: typeof FormCheckbox;
    Radio: typeof FormRadio;
    Switch: typeof FormSwitch;
    Button: typeof FormButton;
    DatePicker: typeof FormDatePicker;
    DateRangePicker: typeof FormDateRangePicker;
};

export { Form, type FormButtonProps, type FormCheckboxProps, type FormDatePickerProps, type FormDateRangePickerProps, type FormInputProps, type FormProps, type FormRadioProps, type FormSelectProps, type FormSwitchProps, type FormTextareaProps, type UseFormFieldReturn, type UseFormStatusReturn, useForm, useFormField, useFormStatus };
