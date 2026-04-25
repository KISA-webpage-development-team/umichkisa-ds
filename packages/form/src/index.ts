// @umichkisa-ds/form — entry point
// Exports added as hooks and components are built

export { useForm } from "./hooks/useForm";
export { useFormField } from "./hooks/useFormField";
export type { UseFormFieldReturn } from "./hooks/useFormField";
export { useFormStatus } from "./hooks/useFormStatus";
export type { UseFormStatusReturn } from "./hooks/useFormStatus";

// Re-exports from react-hook-form. Consumers must import these from
// `@umichkisa-ds/form` rather than `react-hook-form` directly so the
// hook closes over the same RHF module instance the DS `<FormProvider>`
// writes to. Without this re-export, a consumer that has its own copy of
// `react-hook-form` in node_modules ends up reading from a different
// React context and `useFormContext()` returns null.
export { useFormContext } from "react-hook-form";

export { Form } from "./components/Form";
export type { FormProps } from "./components/Form";

// Field components (also available as Form.Input, Form.Textarea, etc.)
export type { FormInputProps } from "./components/fields/FormInput";
export type { FormTextareaProps } from "./components/fields/FormTextarea";
export type { FormSelectProps } from "./components/fields/FormSelect";
export type { FormCheckboxProps } from "./components/fields/FormCheckbox";
export type { FormRadioProps } from "./components/fields/FormRadio";
export type { FormSwitchProps } from "./components/fields/FormSwitch";
export type { FormButtonProps } from "./components/fields/FormButton";
export type { FormDatePickerProps } from "./components/fields/FormDatePicker";
export type { FormDateRangePickerProps } from "./components/fields/FormDateRangePicker";
