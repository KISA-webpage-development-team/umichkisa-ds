"use client";
"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/index.ts
var src_exports = {};
__export(src_exports, {
  Form: () => Form,
  useForm: () => useForm,
  useFormField: () => useFormField,
  useFormStatus: () => useFormStatus
});
module.exports = __toCommonJS(src_exports);

// src/hooks/useForm.ts
var import_react_hook_form = require("react-hook-form");
function useForm(props) {
  return (0, import_react_hook_form.useForm)({
    mode: "onTouched",
    ...props
  });
}

// src/hooks/useFormField.ts
var import_react_hook_form2 = require("react-hook-form");
function useFormField(name, rules) {
  const {
    field,
    fieldState: { error }
  } = (0, import_react_hook_form2.useController)({ name, rules });
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
var import_react_hook_form3 = require("react-hook-form");
function useFormStatus() {
  const {
    formState: { isSubmitting, isValid, isDirty }
  } = (0, import_react_hook_form3.useFormContext)();
  return { isSubmitting, isValid, isDirty };
}

// src/components/Form.tsx
var import_react_hook_form13 = require("react-hook-form");
var import_web10 = require("@umichkisa-ds/web");

// src/components/fields/FormInput.tsx
var import_react_hook_form4 = require("react-hook-form");
var import_web = require("@umichkisa-ds/web");
var import_jsx_runtime = require("react/jsx-runtime");
function FormInput({
  name,
  label,
  rules,
  description,
  className,
  ...rest
}) {
  const { control } = (0, import_react_hook_form4.useFormContext)();
  const {
    field,
    fieldState: { error }
  } = (0, import_react_hook_form4.useController)({ name, control, rules });
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
    import_web.FormItem,
    {
      htmlFor: name,
      label,
      required: !!rules?.required,
      error: error?.message,
      description,
      className,
      children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
        import_web.Input,
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
var import_react_hook_form5 = require("react-hook-form");
var import_web2 = require("@umichkisa-ds/web");
var import_jsx_runtime2 = require("react/jsx-runtime");
function FormTextarea({
  name,
  label,
  rules,
  description,
  className,
  ...rest
}) {
  const { control } = (0, import_react_hook_form5.useFormContext)();
  const {
    field,
    fieldState: { error }
  } = (0, import_react_hook_form5.useController)({ name, control, rules });
  return /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
    import_web2.FormItem,
    {
      htmlFor: name,
      label,
      required: !!rules?.required,
      error: error?.message,
      description,
      className,
      children: /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
        import_web2.Textarea,
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
var import_react_hook_form6 = require("react-hook-form");
var import_web3 = require("@umichkisa-ds/web");
var import_jsx_runtime3 = require("react/jsx-runtime");
function FormSelect({
  name,
  label,
  rules,
  description,
  className,
  children
}) {
  const { control } = (0, import_react_hook_form6.useFormContext)();
  const {
    field,
    fieldState: { error }
  } = (0, import_react_hook_form6.useController)({ name, control, rules });
  return /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
    import_web3.FormItem,
    {
      htmlFor: name,
      label,
      required: !!rules?.required,
      error: error?.message,
      description,
      className,
      children: /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
        import_web3.Select,
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
var import_react_hook_form7 = require("react-hook-form");
var import_web4 = require("@umichkisa-ds/web");
var import_jsx_runtime4 = require("react/jsx-runtime");
function FormCheckbox({
  name,
  label,
  rules,
  description,
  className,
  ...rest
}) {
  const { control } = (0, import_react_hook_form7.useFormContext)();
  const {
    field,
    fieldState: { error }
  } = (0, import_react_hook_form7.useController)({ name, control, rules });
  return /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(
    import_web4.FormItem,
    {
      htmlFor: name,
      label,
      required: !!rules?.required,
      error: error?.message,
      description,
      className,
      children: /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(
        import_web4.Checkbox,
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
var import_react_hook_form8 = require("react-hook-form");
var import_web5 = require("@umichkisa-ds/web");
var import_jsx_runtime5 = require("react/jsx-runtime");
function FormRadio({
  name,
  label,
  rules,
  description,
  className,
  children,
  ...rest
}) {
  const { control } = (0, import_react_hook_form8.useFormContext)();
  const {
    field,
    fieldState: { error }
  } = (0, import_react_hook_form8.useController)({ name, control, rules });
  return /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(
    import_web5.FormItem,
    {
      htmlFor: name,
      label,
      required: !!rules?.required,
      error: error?.message,
      description,
      className,
      children: /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(
        import_web5.RadioGroup,
        {
          invalid: !!error,
          "aria-labelledby": `${name}-label`,
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
var import_react_hook_form9 = require("react-hook-form");
var import_web6 = require("@umichkisa-ds/web");
var import_jsx_runtime6 = require("react/jsx-runtime");
function FormSwitch({
  name,
  label,
  rules,
  description,
  className,
  ...rest
}) {
  const { control } = (0, import_react_hook_form9.useFormContext)();
  const {
    field,
    fieldState: { error }
  } = (0, import_react_hook_form9.useController)({ name, control, rules });
  return /* @__PURE__ */ (0, import_jsx_runtime6.jsx)(
    import_web6.FormItem,
    {
      htmlFor: name,
      label,
      required: !!rules?.required,
      error: error?.message,
      description,
      className,
      children: /* @__PURE__ */ (0, import_jsx_runtime6.jsx)(
        import_web6.Switch,
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
var import_react_hook_form10 = require("react-hook-form");
var import_web7 = require("@umichkisa-ds/web");
var import_jsx_runtime7 = require("react/jsx-runtime");
function FormButton({
  disableWhenInvalid = false,
  disabled,
  children,
  ...rest
}) {
  const {
    formState: { isSubmitting, isValid }
  } = (0, import_react_hook_form10.useFormContext)();
  const isDisabled = disabled || isSubmitting || disableWhenInvalid && !isValid;
  return /* @__PURE__ */ (0, import_jsx_runtime7.jsx)(import_web7.Button, { type: "submit", disabled: isDisabled, ...rest, children });
}

// src/components/fields/FormDatePicker.tsx
var import_react_hook_form11 = require("react-hook-form");
var import_web8 = require("@umichkisa-ds/web");
var import_jsx_runtime8 = require("react/jsx-runtime");
function FormDatePicker({
  name,
  label,
  rules,
  description,
  className,
  placeholder,
  formatDate
}) {
  const { control } = (0, import_react_hook_form11.useFormContext)();
  const {
    field,
    fieldState: { error }
  } = (0, import_react_hook_form11.useController)({ name, control, rules });
  return /* @__PURE__ */ (0, import_jsx_runtime8.jsx)(
    import_web8.FormItem,
    {
      htmlFor: name,
      label,
      required: !!rules?.required,
      error: error?.message,
      description,
      className,
      children: /* @__PURE__ */ (0, import_jsx_runtime8.jsx)(
        import_web8.DatePicker,
        {
          value: field.value,
          onChange: (date) => {
            field.onChange(date);
            field.onBlur();
          },
          invalid: !!error,
          placeholder,
          formatDate
        }
      )
    }
  );
}

// src/components/fields/FormDateRangePicker.tsx
var import_react_hook_form12 = require("react-hook-form");
var import_web9 = require("@umichkisa-ds/web");
var import_jsx_runtime9 = require("react/jsx-runtime");
function FormDateRangePicker({
  name,
  label,
  rules,
  description,
  className,
  placeholder,
  formatDate
}) {
  const { control } = (0, import_react_hook_form12.useFormContext)();
  const {
    field,
    fieldState: { error }
  } = (0, import_react_hook_form12.useController)({ name, control, rules });
  return /* @__PURE__ */ (0, import_jsx_runtime9.jsx)(
    import_web9.FormItem,
    {
      htmlFor: name,
      label,
      required: !!rules?.required,
      error: error?.message,
      description,
      className,
      children: /* @__PURE__ */ (0, import_jsx_runtime9.jsx)(
        import_web9.DateRangePicker,
        {
          value: field.value,
          onChange: (range) => {
            field.onChange(range);
            field.onBlur();
          },
          invalid: !!error,
          placeholder,
          formatDate
        }
      )
    }
  );
}

// src/components/Form.tsx
var import_jsx_runtime10 = require("react/jsx-runtime");
function FormRoot({
  form,
  onSubmit,
  children,
  className
}) {
  return /* @__PURE__ */ (0, import_jsx_runtime10.jsx)(import_react_hook_form13.FormProvider, { ...form, children: /* @__PURE__ */ (0, import_jsx_runtime10.jsx)(
    "form",
    {
      onSubmit: form.handleSubmit(onSubmit),
      className: (0, import_web10.cn)("flex flex-col gap-4", className),
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
  Button: FormButton,
  DatePicker: FormDatePicker,
  DateRangePicker: FormDateRangePicker
});
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  Form,
  useForm,
  useFormField,
  useFormStatus
});
//# sourceMappingURL=index.cjs.map