"use client";

// src/hooks/useForm.ts
import {
  useForm as useRHFForm
} from "react-hook-form";
function useForm(props) {
  return useRHFForm({
    mode: "onTouched",
    ...props
  });
}

// src/hooks/useFormField.ts
import {
  useController
} from "react-hook-form";
function useFormField(name, rules) {
  const {
    field,
    fieldState: { error }
  } = useController({ name, rules });
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
      ref: field.ref
    }
  };
}

// src/hooks/useFormStatus.ts
import { useFormContext } from "react-hook-form";
function useFormStatus() {
  const {
    formState: { isSubmitting, isValid, isDirty }
  } = useFormContext();
  return { isSubmitting, isValid, isDirty };
}

// src/components/Form.tsx
import {
  FormProvider
} from "react-hook-form";
import { cn } from "@umichkisa-ds/web";

// src/components/fields/FormInput.tsx
import { useController as useController2, useFormContext as useFormContext2 } from "react-hook-form";
import { Input, FormItem } from "@umichkisa-ds/web";
import { jsx } from "react/jsx-runtime";
function FormInput({
  name,
  label,
  rules,
  description,
  className,
  ...rest
}) {
  const { control } = useFormContext2();
  const {
    field,
    fieldState: { error }
  } = useController2({ name, control, rules });
  return /* @__PURE__ */ jsx(
    FormItem,
    {
      htmlFor: name,
      label,
      required: !!rules?.required,
      error: error?.message,
      description,
      className,
      children: /* @__PURE__ */ jsx(
        Input,
        {
          id: name,
          invalid: !!error,
          ...field,
          ...rest
        }
      )
    }
  );
}

// src/components/fields/FormTextarea.tsx
import { useController as useController3, useFormContext as useFormContext3 } from "react-hook-form";
import { Textarea, FormItem as FormItem2 } from "@umichkisa-ds/web";
import { jsx as jsx2 } from "react/jsx-runtime";
function FormTextarea({
  name,
  label,
  rules,
  description,
  className,
  ...rest
}) {
  const { control } = useFormContext3();
  const {
    field,
    fieldState: { error }
  } = useController3({ name, control, rules });
  return /* @__PURE__ */ jsx2(
    FormItem2,
    {
      htmlFor: name,
      label,
      required: !!rules?.required,
      error: error?.message,
      description,
      className,
      children: /* @__PURE__ */ jsx2(
        Textarea,
        {
          id: name,
          invalid: !!error,
          ...field,
          ...rest
        }
      )
    }
  );
}

// src/components/fields/FormSelect.tsx
import { useController as useController4, useFormContext as useFormContext4 } from "react-hook-form";
import { Select, FormItem as FormItem3 } from "@umichkisa-ds/web";
import { jsx as jsx3 } from "react/jsx-runtime";
function FormSelect({
  name,
  label,
  rules,
  description,
  className,
  children
}) {
  const { control } = useFormContext4();
  const {
    field,
    fieldState: { error }
  } = useController4({ name, control, rules });
  return /* @__PURE__ */ jsx3(
    FormItem3,
    {
      htmlFor: name,
      label,
      required: !!rules?.required,
      error: error?.message,
      description,
      className,
      children: /* @__PURE__ */ jsx3(
        Select,
        {
          value: field.value,
          onValueChange: (val) => {
            field.onChange(val);
            field.onBlur();
          },
          children
        }
      )
    }
  );
}

// src/components/fields/FormCheckbox.tsx
import { useController as useController5, useFormContext as useFormContext5 } from "react-hook-form";
import { Checkbox, FormItem as FormItem4 } from "@umichkisa-ds/web";
import { jsx as jsx4 } from "react/jsx-runtime";
function FormCheckbox({
  name,
  label,
  rules,
  description,
  className,
  ...rest
}) {
  const { control } = useFormContext5();
  const {
    field,
    fieldState: { error }
  } = useController5({ name, control, rules });
  return /* @__PURE__ */ jsx4(
    FormItem4,
    {
      htmlFor: name,
      label,
      required: !!rules?.required,
      error: error?.message,
      description,
      className,
      children: /* @__PURE__ */ jsx4(
        Checkbox,
        {
          id: name,
          invalid: !!error,
          checked: !!field.value,
          onChange: (e) => {
            field.onChange(e.target.checked);
            field.onBlur();
          },
          ...rest
        }
      )
    }
  );
}

// src/components/fields/FormRadio.tsx
import { useController as useController6, useFormContext as useFormContext6 } from "react-hook-form";
import { RadioGroup, FormItem as FormItem5 } from "@umichkisa-ds/web";
import { jsx as jsx5 } from "react/jsx-runtime";
function FormRadio({
  name,
  label,
  rules,
  description,
  className,
  children,
  ...rest
}) {
  const { control } = useFormContext6();
  const {
    field,
    fieldState: { error }
  } = useController6({ name, control, rules });
  return /* @__PURE__ */ jsx5(
    FormItem5,
    {
      htmlFor: name,
      label,
      required: !!rules?.required,
      error: error?.message,
      description,
      className,
      children: /* @__PURE__ */ jsx5(
        RadioGroup,
        {
          invalid: !!error,
          value: field.value,
          onValueChange: (val) => {
            field.onChange(val);
            field.onBlur();
          },
          ...rest,
          children
        }
      )
    }
  );
}

// src/components/fields/FormSwitch.tsx
import { useController as useController7, useFormContext as useFormContext7 } from "react-hook-form";
import { Switch, FormItem as FormItem6 } from "@umichkisa-ds/web";
import { jsx as jsx6 } from "react/jsx-runtime";
function FormSwitch({
  name,
  label,
  rules,
  description,
  className,
  ...rest
}) {
  const { control } = useFormContext7();
  const {
    field,
    fieldState: { error }
  } = useController7({ name, control, rules });
  return /* @__PURE__ */ jsx6(
    FormItem6,
    {
      htmlFor: name,
      label,
      required: !!rules?.required,
      error: error?.message,
      description,
      className,
      children: /* @__PURE__ */ jsx6(
        Switch,
        {
          id: name,
          invalid: !!error,
          checked: !!field.value,
          onChange: (e) => {
            field.onChange(e.target.checked);
            field.onBlur();
          },
          ...rest
        }
      )
    }
  );
}

// src/components/fields/FormButton.tsx
import { useFormContext as useFormContext8 } from "react-hook-form";
import { Button } from "@umichkisa-ds/web";
import { jsx as jsx7 } from "react/jsx-runtime";
function FormButton({
  disableWhenInvalid = false,
  disabled,
  children,
  ...rest
}) {
  const {
    formState: { isSubmitting, isValid }
  } = useFormContext8();
  const isDisabled = disabled || isSubmitting || disableWhenInvalid && !isValid;
  return /* @__PURE__ */ jsx7(Button, { type: "submit", disabled: isDisabled, ...rest, children });
}

// src/components/Form.tsx
import { jsx as jsx8 } from "react/jsx-runtime";
function FormRoot({
  form,
  onSubmit,
  children,
  className
}) {
  return /* @__PURE__ */ jsx8(FormProvider, { ...form, children: /* @__PURE__ */ jsx8(
    "form",
    {
      onSubmit: form.handleSubmit(onSubmit),
      className: cn("flex flex-col gap-4", className),
      noValidate: true,
      children
    }
  ) });
}
var Form = Object.assign(FormRoot, {
  Input: FormInput,
  Textarea: FormTextarea,
  Select: FormSelect,
  Checkbox: FormCheckbox,
  Radio: FormRadio,
  Switch: FormSwitch,
  Button: FormButton
});
export {
  Form,
  useForm,
  useFormField,
  useFormStatus
};
//# sourceMappingURL=index.js.map