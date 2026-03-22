"use client";

// src/utils/cn.ts
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
function cn(...inputs) {
  return twMerge(clsx(inputs));
}

// src/components/button/Button.tsx
import { cva } from "class-variance-authority";
import { jsx } from "react/jsx-runtime";
var buttonVariants = cva(
  "inline-flex items-center justify-center self-center gap-1 cursor-pointer rounded-md text-sm md:text-base px-4 py-2 transition-colors disabled:cursor-not-allowed disabled:opacity-60",
  {
    variants: {
      variant: {
        primary: "bg-[var(--color-brand-primary)] border border-[var(--color-brand-primary)] text-[var(--color-brand-accent)] hover:border-[var(--color-brand-accent)]",
        secondary: "bg-slate-100 border border-slate-100 text-[var(--color-foreground)] hover:bg-slate-200",
        tertiary: "border-none text-[var(--color-foreground)] hover:underline"
      }
    },
    defaultVariants: {
      variant: "primary"
    }
  }
);
function Button({
  variant,
  disabled = false,
  forSubmit = false,
  className,
  onClick,
  children
}) {
  return /* @__PURE__ */ jsx(
    "button",
    {
      type: forSubmit ? "submit" : "button",
      disabled,
      "aria-disabled": disabled,
      onClick,
      className: cn(buttonVariants({ variant }), className),
      children
    }
  );
}

// src/components/button/LinkButton.tsx
import { cva as cva2 } from "class-variance-authority";
import { jsx as jsx2 } from "react/jsx-runtime";
var linkButtonVariants = cva2(
  "inline-flex items-center justify-center self-center gap-1 cursor-pointer rounded-md text-sm md:text-base px-4 py-2 transition-colors",
  {
    variants: {
      variant: {
        primary: "bg-[var(--color-brand-primary)] border border-[var(--color-brand-primary)] text-[var(--color-brand-accent)] hover:border-[var(--color-brand-accent)]",
        secondary: "bg-slate-100 border border-slate-100 text-[var(--color-foreground)] hover:bg-slate-200",
        tertiary: "border-none text-[var(--color-foreground)] hover:underline"
      }
    },
    defaultVariants: {
      variant: "primary"
    }
  }
);
function LinkButton({
  href,
  variant,
  disabled = false,
  className,
  children
}) {
  const cls = cn(linkButtonVariants({ variant }), className);
  if (disabled) {
    return /* @__PURE__ */ jsx2("span", { className: cls, "aria-disabled": "true", children });
  }
  return /* @__PURE__ */ jsx2("a", { href, className: cls, children });
}

// src/components/button/IconButton.tsx
import { cva as cva3 } from "class-variance-authority";
import { jsx as jsx3, jsxs } from "react/jsx-runtime";
var iconButtonVariants = cva3(
  "inline-flex items-center justify-center self-center gap-1 cursor-pointer rounded-md text-sm md:text-base px-4 py-2 transition-colors h-fit disabled:cursor-not-allowed disabled:opacity-60",
  {
    variants: {
      variant: {
        primary: "bg-[var(--color-brand-primary)] border border-[var(--color-brand-primary)] text-[var(--color-brand-accent)] hover:border-[var(--color-brand-accent)]",
        secondary: "bg-slate-100 border border-slate-100 text-[var(--color-foreground)] hover:bg-slate-200",
        tertiary: "border-none text-[var(--color-foreground)] hover:underline"
      }
    },
    defaultVariants: {
      variant: "secondary"
    }
  }
);
function IconButton({
  icon,
  text,
  variant,
  disabled = false,
  forSubmit = false,
  className,
  onClick,
  "aria-label": ariaLabel
}) {
  return /* @__PURE__ */ jsxs(
    "button",
    {
      type: forSubmit ? "submit" : "button",
      disabled,
      "aria-disabled": disabled,
      "aria-label": ariaLabel,
      onClick,
      className: cn(iconButtonVariants({ variant }), className),
      children: [
        icon,
        text && /* @__PURE__ */ jsx3("span", { className: "hidden sm:inline text-sm md:text-base", children: text })
      ]
    }
  );
}

// src/components/form/Input.tsx
import { memo } from "react";
import { jsx as jsx4 } from "react/jsx-runtime";
var Input = memo(function Input2({
  type,
  value,
  onChange,
  onBlur,
  placeholder,
  invalid = false,
  required = false,
  disabled = false,
  id,
  className
}) {
  return /* @__PURE__ */ jsx4(
    "input",
    {
      id,
      type,
      value,
      onChange,
      onBlur,
      placeholder,
      required,
      disabled,
      "aria-invalid": invalid,
      className: cn(
        "w-full px-3 py-2 border border-[var(--color-border-strong)] rounded-md text-sm md:text-base text-[var(--color-foreground)] bg-[var(--color-surface)] placeholder:text-[var(--color-muted-foreground)] focus:outline-none focus:ring-2 focus:ring-[var(--color-brand-primary)] disabled:opacity-50 disabled:cursor-not-allowed transition-colors",
        invalid && "border-[var(--color-error)] focus:ring-[var(--color-error)]",
        className
      )
    }
  );
});

// src/components/form/Label.tsx
import { jsx as jsx5, jsxs as jsxs2 } from "react/jsx-runtime";
function Label({ htmlFor, required = false, className, children }) {
  return /* @__PURE__ */ jsxs2(
    "label",
    {
      htmlFor,
      className: cn(
        "text-sm font-medium text-[var(--color-foreground)]",
        className
      ),
      children: [
        children,
        required && /* @__PURE__ */ jsx5("span", { className: "ml-0.5 text-[var(--color-error)]", "aria-hidden": "true", children: "*" })
      ]
    }
  );
}

// src/components/form/FormItem.tsx
import { memo as memo2, useState, useCallback } from "react";
import { jsx as jsx6, jsxs as jsxs3 } from "react/jsx-runtime";
var FormItem = memo2(function FormItem2({
  htmlFor,
  labelText,
  type,
  value,
  onChange,
  placeholder,
  validationRules = [],
  required = false
}) {
  const [error, setError] = useState(null);
  const [requiredError, setRequiredError] = useState(false);
  const validate = useCallback(
    (val = value) => {
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
  const handleChange = (e) => {
    onChange(e);
    validate(e.target.value);
  };
  const isInvalid = requiredError || error !== null;
  return /* @__PURE__ */ jsxs3("div", { className: "relative flex flex-col gap-1 items-start", children: [
    /* @__PURE__ */ jsx6(Label, { htmlFor, required, children: labelText }),
    /* @__PURE__ */ jsx6(
      Input,
      {
        id: htmlFor,
        type,
        value,
        onChange: handleChange,
        onBlur: handleBlur,
        placeholder,
        required,
        invalid: isInvalid
      }
    ),
    isInvalid && /* @__PURE__ */ jsx6("span", { className: "absolute top-full mt-1 text-xs font-bold text-[var(--color-error)]", children: error ?? "" })
  ] });
});

// src/components/layout/HorizontalDivider.tsx
import { jsx as jsx7 } from "react/jsx-runtime";
function HorizontalDivider({ color = "light", className }) {
  return /* @__PURE__ */ jsx7(
    "div",
    {
      className: cn(
        "border w-full rounded-lg",
        color === "light" ? "border-gray-200/60" : "border-gray-300",
        className
      )
    }
  );
}

// src/components/layout/VerticalDivider.tsx
import { jsx as jsx8 } from "react/jsx-runtime";
function VerticalDivider({ className }) {
  return /* @__PURE__ */ jsx8(
    "div",
    {
      className: cn(
        "border-l border-[var(--color-border)] self-stretch",
        className
      )
    }
  );
}

// src/components/layout/ToggleBar.tsx
import { jsx as jsx9, jsxs as jsxs4 } from "react/jsx-runtime";
function ToggleBar({ activeView, onViewChange, items, className }) {
  return /* @__PURE__ */ jsx9("div", { className: cn("flex text-sm md:text-base mt-1", className), children: items.map((item) => /* @__PURE__ */ jsxs4(
    "div",
    {
      role: "tab",
      "aria-selected": activeView === item.view,
      onClick: () => onViewChange(item.view),
      className: cn(
        "px-3 py-2 flex items-center gap-1 cursor-pointer border-b-2 border-transparent text-[var(--color-muted-foreground)] hover:text-[var(--color-foreground)] transition-colors",
        activeView === item.view && "border-b-2 border-[var(--color-brand-primary)] text-[var(--color-foreground)] font-semibold"
      ),
      children: [
        item.icon,
        /* @__PURE__ */ jsx9("span", { children: item.text })
      ]
    },
    item.view
  )) });
}

// src/components/feedback/LoadingSpinner.tsx
import { jsx as jsx10, jsxs as jsxs5 } from "react/jsx-runtime";
function LoadingSpinner({
  fullScreen = true,
  label = "\uB85C\uB529\uC911\uC785\uB2C8\uB2E4",
  className
}) {
  return /* @__PURE__ */ jsxs5(
    "div",
    {
      className: cn(
        "flex flex-col gap-3 justify-center items-center bg-[var(--color-surface)]",
        fullScreen ? "fixed top-0 left-0 w-full h-full z-50" : "h-full w-full mt-8",
        className
      ),
      children: [
        /* @__PURE__ */ jsx10(
          "div",
          {
            className: "ds-spinner",
            role: "status",
            "aria-label": label
          }
        ),
        /* @__PURE__ */ jsx10("p", { className: "text-sm font-medium text-[var(--color-muted-foreground)]", children: label })
      ]
    }
  );
}

// src/components/feedback/NotFound.tsx
import { jsx as jsx11, jsxs as jsxs6 } from "react/jsx-runtime";
function NotFound() {
  return /* @__PURE__ */ jsx11("div", { className: "h-full flex items-center justify-center px-4", children: /* @__PURE__ */ jsxs6("div", { className: "max-w-lg w-full text-center", children: [
    /* @__PURE__ */ jsx11("h1", { className: "text-4xl font-bold text-[var(--color-foreground)] mb-4", children: "404" }),
    /* @__PURE__ */ jsx11("p", { className: "text-lg md:text-2xl font-semibold text-[var(--color-muted-foreground)] mb-6", children: "\uC874\uC7AC\uD558\uC9C0 \uC54A\uB294 \uD398\uC774\uC9C0\uC785\uB2C8\uB2E4" }),
    /* @__PURE__ */ jsx11("div", { className: "flex justify-center w-[60%] mx-auto", children: /* @__PURE__ */ jsx11(LinkButton, { href: "/", variant: "primary", children: "\uD648\uD398\uC774\uC9C0\uB85C \uB3CC\uC544\uAC00\uAE30" }) })
  ] }) });
}

// src/components/feedback/NotLogin.tsx
import { jsx as jsx12, jsxs as jsxs7 } from "react/jsx-runtime";
function NotLogin() {
  return /* @__PURE__ */ jsx12("div", { className: "h-full flex items-center justify-center px-4", children: /* @__PURE__ */ jsxs7("div", { className: "max-w-lg w-full text-center", children: [
    /* @__PURE__ */ jsx12("h1", { className: "text-2xl font-bold text-[var(--color-foreground)] mb-4", children: "\uB85C\uADF8\uC778\uC774 \uD544\uC694\uD569\uB2C8\uB2E4" }),
    /* @__PURE__ */ jsx12("div", { className: "flex justify-center", children: /* @__PURE__ */ jsx12(LinkButton, { href: "/signin", variant: "primary", children: "\uB85C\uADF8\uC778\uD558\uAE30" }) })
  ] }) });
}

// src/components/feedback/NotAuthorized.tsx
import { jsx as jsx13, jsxs as jsxs8 } from "react/jsx-runtime";
function NotAuthorized() {
  return /* @__PURE__ */ jsx13("div", { className: "h-full flex items-center justify-center px-4", children: /* @__PURE__ */ jsxs8("div", { className: "max-w-lg w-full text-center", children: [
    /* @__PURE__ */ jsx13("h1", { className: "text-2xl font-bold text-[var(--color-foreground)] mb-4", children: "\uC811\uADFC \uAD8C\uD55C\uC774 \uC5C6\uC2B5\uB2C8\uB2E4" }),
    /* @__PURE__ */ jsx13("div", { className: "flex justify-center", children: /* @__PURE__ */ jsx13(LinkButton, { href: "/", variant: "primary", children: "\uD648\uD398\uC774\uC9C0\uB85C \uB3CC\uC544\uAC00\uAE30" }) })
  ] }) });
}

// src/components/feedback/UnexpectedError.tsx
import { jsx as jsx14, jsxs as jsxs9 } from "react/jsx-runtime";
function UnexpectedError({ onRetry }) {
  return /* @__PURE__ */ jsx14("div", { className: "h-full flex items-center justify-center px-4", children: /* @__PURE__ */ jsxs9("div", { className: "max-w-lg w-full text-center", children: [
    /* @__PURE__ */ jsx14("h1", { className: "text-2xl font-bold text-[var(--color-foreground)] mb-4", children: "\uC624\uB958\uAC00 \uBC1C\uC0DD\uD588\uC2B5\uB2C8\uB2E4" }),
    /* @__PURE__ */ jsx14("p", { className: "text-[var(--color-muted-foreground)] mb-6", children: "\uC7A0\uC2DC \uD6C4 \uB2E4\uC2DC \uC2DC\uB3C4\uD574\uC8FC\uC138\uC694." }),
    onRetry && /* @__PURE__ */ jsx14(Button, { onClick: onRetry, variant: "primary", children: "\uB2E4\uC2DC \uC2DC\uB3C4" })
  ] }) });
}

// src/components/icon/registry.ts
import {
  ArrowLeft,
  ArrowRight,
  ChevronRight,
  ChevronDown,
  CircleMinus,
  CirclePlus,
  Clock9,
  ExternalLink,
  Eye,
  GraduationCap,
  List,
  Lock,
  Mail,
  MessageSquare,
  Minus,
  Pencil,
  Plus,
  Reply,
  ShoppingCart,
  ThumbsUp,
  Ticket,
  Trash2,
  X
} from "lucide-react";

// src/components/icon/custom/GithubIcon.tsx
import { jsx as jsx15 } from "react/jsx-runtime";
function GithubIcon({
  size = 24,
  className,
  ...props
}) {
  return /* @__PURE__ */ jsx15(
    "svg",
    {
      xmlns: "http://www.w3.org/2000/svg",
      width: size,
      height: size,
      viewBox: "0 0 20 20",
      fill: "currentColor",
      className,
      ...props,
      children: /* @__PURE__ */ jsx15("path", { d: "M10,0 C15.523,0 20,4.59 20,10.253 C20,14.782 17.138,18.624 13.167,19.981 C12.66,20.082 12.48,19.762 12.48,19.489 C12.48,19.151 12.492,18.047 12.492,16.675 C12.492,15.719 12.172,15.095 11.813,14.777 C14.04,14.523 16.38,13.656 16.38,9.718 C16.38,8.598 15.992,7.684 15.35,6.966 C15.454,6.707 15.797,5.664 15.252,4.252 C15.252,4.252 14.414,3.977 12.505,5.303 C11.706,5.076 10.85,4.962 10,4.958 C9.15,4.962 8.295,5.076 7.497,5.303 C5.586,3.977 4.746,4.252 4.746,4.252 C4.203,5.664 4.546,6.707 4.649,6.966 C4.01,7.684 3.619,8.598 3.619,9.718 C3.619,13.646 5.954,14.526 8.175,14.785 C7.889,15.041 7.63,15.493 7.54,16.156 C6.97,16.418 5.522,16.871 4.63,15.304 C4.63,15.304 4.101,14.319 3.097,14.247 C3.097,14.247 2.122,14.234 3.029,14.87 C3.029,14.87 3.684,15.185 4.139,16.37 C4.139,16.37 4.726,18.2 7.508,17.58 C7.513,18.437 7.522,19.245 7.522,19.489 C7.522,19.76 7.338,20.077 6.839,19.982 C2.865,18.627 0,14.783 0,10.253 C0,4.59 4.478,0 10,0" })
    }
  );
}

// src/components/icon/custom/LinkedinIcon.tsx
import { jsx as jsx16 } from "react/jsx-runtime";
function LinkedinIcon({
  size = 24,
  className,
  ...props
}) {
  return /* @__PURE__ */ jsx16(
    "svg",
    {
      xmlns: "http://www.w3.org/2000/svg",
      width: size,
      height: size,
      viewBox: "0 0 382 382",
      fill: "currentColor",
      className,
      ...props,
      children: /* @__PURE__ */ jsx16("path", { d: "M347.445,0H34.555C15.471,0,0,15.471,0,34.555v312.889C0,366.529,15.471,382,34.555,382h312.889C366.529,382,382,366.529,382,347.444V34.555C382,15.471,366.529,0,347.445,0z M118.207,329.844c0,5.554-4.502,10.056-10.056,10.056H65.345c-5.554,0-10.056-4.502-10.056-10.056V150.403c0-5.554,4.502-10.056,10.056-10.056h42.806c5.554,0,10.056,4.502,10.056,10.056V329.844z M86.748,123.432c-22.459,0-40.666-18.207-40.666-40.666S64.289,42.1,86.748,42.1s40.666,18.207,40.666,40.666S109.208,123.432,86.748,123.432z M341.91,330.654c0,5.106-4.14,9.246-9.246,9.246H286.73c-5.106,0-9.246-4.14-9.246-9.246v-84.168c0-12.556,3.683-55.021-32.813-55.021c-28.309,0-34.051,29.066-35.204,42.11v97.079c0,5.106-4.139,9.246-9.246,9.246h-44.426c-5.106,0-9.246-4.14-9.246-9.246V149.593c0-5.106,4.14-9.246,9.246-9.246h44.426c5.106,0,9.246,4.14,9.246,9.246v15.655c10.497-15.753,26.097-27.912,59.312-27.912c73.552,0,73.131,68.716,73.131,106.472L341.91,330.654L341.91,330.654z" })
    }
  );
}

// src/components/icon/registry.ts
var registry = {
  "arrow-left": ArrowLeft,
  "arrow-right": ArrowRight,
  "chevron-right": ChevronRight,
  "chevron-down": ChevronDown,
  "circle-minus": CircleMinus,
  "circle-plus": CirclePlus,
  "clock-9": Clock9,
  "external-link": ExternalLink,
  "eye": Eye,
  "graduation-cap": GraduationCap,
  "list": List,
  "lock": Lock,
  "mail": Mail,
  "message-square": MessageSquare,
  "minus": Minus,
  "pencil": Pencil,
  "plus": Plus,
  "reply": Reply,
  "shopping-cart": ShoppingCart,
  "thumbs-up": ThumbsUp,
  "ticket": Ticket,
  "trash-2": Trash2,
  "x": X,
  "github": GithubIcon,
  "linkedin": LinkedinIcon
};

// src/components/icon/Icon.tsx
import { jsx as jsx17 } from "react/jsx-runtime";
var sizeMap = {
  xs: 12,
  sm: 16,
  md: 20,
  lg: 24,
  xl: 32
};
function Icon({ name, size = "md", label, className }) {
  const LucideComponent = registry[name];
  const px = sizeMap[size];
  if (label) {
    return /* @__PURE__ */ jsx17(
      LucideComponent,
      {
        size: px,
        className,
        "aria-label": label,
        role: "img"
      }
    );
  }
  return /* @__PURE__ */ jsx17(
    LucideComponent,
    {
      size: px,
      className,
      "aria-hidden": "true"
    }
  );
}

// src/components/overlay/Dialog.tsx
import * as RadixDialog from "@radix-ui/react-dialog";
import { jsx as jsx18, jsxs as jsxs10 } from "react/jsx-runtime";
var Dialog = RadixDialog.Root;
var DialogTrigger = RadixDialog.Trigger;
var DialogClose = RadixDialog.Close;
function DialogContent({ children, className }) {
  return /* @__PURE__ */ jsxs10(RadixDialog.Portal, { children: [
    /* @__PURE__ */ jsx18(RadixDialog.Overlay, { className: "fixed inset-0 z-50 bg-black/50" }),
    /* @__PURE__ */ jsx18(
      RadixDialog.Content,
      {
        className: cn(
          "fixed left-1/2 top-1/2 z-50 -translate-x-1/2 -translate-y-1/2",
          "w-full max-w-lg rounded-lg",
          "border border-[var(--color-border)] bg-[var(--color-surface)]",
          "p-6 shadow-lg focus:outline-none",
          className
        ),
        children
      }
    )
  ] });
}
function DialogTitle({ children, className }) {
  return /* @__PURE__ */ jsx18(
    RadixDialog.Title,
    {
      className: cn("text-lg font-semibold text-[var(--color-foreground)] mb-4", className),
      children
    }
  );
}

// src/components/overlay/Dropdown.tsx
import * as RadixDropdown from "@radix-ui/react-dropdown-menu";
import { jsx as jsx19 } from "react/jsx-runtime";
var Dropdown = RadixDropdown.Root;
var DropdownTrigger = RadixDropdown.Trigger;
function DropdownContent({ children, className }) {
  return /* @__PURE__ */ jsx19(RadixDropdown.Portal, { children: /* @__PURE__ */ jsx19(
    RadixDropdown.Content,
    {
      className: cn(
        "z-50 min-w-[8rem] overflow-hidden rounded-md",
        "border border-[var(--color-border)] bg-[var(--color-surface)] shadow-md",
        "p-1",
        className
      ),
      sideOffset: 4,
      children
    }
  ) });
}
function DropdownItem({ children, onSelect, className }) {
  return /* @__PURE__ */ jsx19(
    RadixDropdown.Item,
    {
      onSelect,
      className: cn(
        "relative flex cursor-pointer select-none items-center rounded-sm px-3 py-2",
        "text-sm text-[var(--color-foreground)]",
        "hover:bg-[var(--color-surface-muted)] focus:outline-none",
        className
      ),
      children
    }
  );
}

// src/components/overlay/Popover.tsx
import * as RadixPopover from "@radix-ui/react-popover";
import { jsx as jsx20 } from "react/jsx-runtime";
var Popover = RadixPopover.Root;
var PopoverTrigger = RadixPopover.Trigger;
function PopoverContent({ children, className }) {
  return /* @__PURE__ */ jsx20(RadixPopover.Portal, { children: /* @__PURE__ */ jsx20(
    RadixPopover.Content,
    {
      className: cn(
        "z-50 rounded-md",
        "border border-[var(--color-border)] bg-[var(--color-surface)] shadow-md",
        "p-4",
        className
      ),
      sideOffset: 4,
      children
    }
  ) });
}

// src/index.ts
var DS_VERSION = "0.1.0";
export {
  Button,
  DS_VERSION,
  Dialog,
  DialogClose,
  DialogContent,
  DialogTitle,
  DialogTrigger,
  Dropdown,
  DropdownContent,
  DropdownItem,
  DropdownTrigger,
  FormItem,
  HorizontalDivider,
  Icon,
  IconButton,
  Input,
  Label,
  LinkButton,
  LoadingSpinner,
  NotAuthorized,
  NotFound,
  NotLogin,
  Popover,
  PopoverContent,
  PopoverTrigger,
  ToggleBar,
  UnexpectedError,
  VerticalDivider,
  cn
};
//# sourceMappingURL=index.js.map