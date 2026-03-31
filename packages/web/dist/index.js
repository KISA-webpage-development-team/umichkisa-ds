"use client";

// src/utils/cn.ts
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
function cn(...inputs) {
  return twMerge(clsx(inputs));
}

// src/components/badge/Badge.tsx
import { cva } from "class-variance-authority";
import { Slot } from "@radix-ui/react-slot";
import { jsx } from "react/jsx-runtime";
var badgeVariants = cva(
  [
    "inline-flex items-center justify-center gap-1 rounded-md border w-fit whitespace-nowrap shrink-0 truncate",
    "focus-visible:outline focus-visible:outline-2 focus-visible:outline-focus-ring focus-visible:shadow-[0_0_0_4px_var(--color-brand-primary)]"
  ],
  {
    variants: {
      variant: {
        default: "bg-surface-subtle text-foreground border-border",
        brand: "bg-brand-primary text-brand-foreground border-brand-primary",
        success: "bg-success-subtle text-foreground border-success",
        warning: "bg-warning-subtle text-foreground border-warning",
        error: "bg-error-subtle text-foreground border-error",
        info: "bg-info-subtle text-foreground border-info",
        outline: "bg-transparent text-foreground border-border"
      },
      size: {
        sm: "type-caption px-1.5 py-0.5",
        md: "type-body-sm px-2 py-0.5"
      }
    },
    defaultVariants: {
      variant: "default",
      size: "md"
    }
  }
);
function Badge({
  variant,
  size,
  className,
  asChild = false,
  ...props
}) {
  const Comp = asChild ? Slot : "span";
  return /* @__PURE__ */ jsx(Comp, { className: cn(badgeVariants({ variant, size }), className), ...props });
}

// src/components/button/Button.tsx
import { cva as cva2 } from "class-variance-authority";
import { jsx as jsx2 } from "react/jsx-runtime";
var buttonVariants = cva2(
  [
    "inline-flex items-center justify-center gap-2 rounded-md cursor-pointer",
    "transition-colors",
    "focus-visible:outline focus-visible:outline-2 focus-visible:outline-focus-ring focus-visible:shadow-[0_0_0_4px_var(--color-brand-primary)]",
    "disabled:pointer-events-none disabled:text-disabled-foreground disabled:opacity-60"
  ],
  {
    variants: {
      variant: {
        primary: [
          "bg-brand-primary text-brand-foreground border border-brand-primary",
          "hover:bg-brand-primary-hover hover:border-brand-primary-hover",
          "active:bg-brand-primary-pressed active:border-brand-primary-pressed"
        ],
        secondary: [
          "bg-surface-subtle text-foreground border border-border",
          "hover:bg-surface-muted hover:border-border-strong",
          "active:bg-border active:border-border-strong"
        ],
        tertiary: [
          "bg-transparent text-foreground border border-transparent",
          "hover:bg-surface-subtle",
          "active:bg-surface-muted"
        ],
        destructive: [
          "bg-error text-error-foreground border border-error",
          "hover:bg-error-hover hover:border-error-hover",
          "active:bg-error-pressed active:border-error-pressed"
        ]
      },
      size: {
        sm: "type-body-sm px-3 py-1.5",
        md: "type-body-sm px-4 py-2",
        lg: "type-body px-6 py-2.5"
      }
    },
    defaultVariants: {
      variant: "primary",
      size: "md"
    }
  }
);
function Button({ variant, size, className, type = "button", ...props }) {
  return /* @__PURE__ */ jsx2(
    "button",
    {
      type,
      className: cn(buttonVariants({ variant, size }), className),
      ...props
    }
  );
}

// src/components/button/LinkButton.tsx
import { jsx as jsx3 } from "react/jsx-runtime";
function LinkButton({
  variant,
  size,
  disabled = false,
  className,
  children,
  ...props
}) {
  if (disabled) {
    return /* @__PURE__ */ jsx3(
      "span",
      {
        className: cn(
          buttonVariants({ variant, size }),
          "pointer-events-none text-disabled-foreground opacity-60",
          className
        ),
        role: "link",
        "aria-disabled": "true",
        children
      }
    );
  }
  return /* @__PURE__ */ jsx3(
    "a",
    {
      className: cn(buttonVariants({ variant, size }), "hover:underline", className),
      ...props,
      children
    }
  );
}

// src/components/icon/registry.ts
import {
  ArrowLeft,
  ArrowRight,
  Check,
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
import { jsx as jsx4 } from "react/jsx-runtime";
function GithubIcon({
  size = 24,
  className,
  ...props
}) {
  return /* @__PURE__ */ jsx4(
    "svg",
    {
      xmlns: "http://www.w3.org/2000/svg",
      width: size,
      height: size,
      viewBox: "0 0 20 20",
      fill: "currentColor",
      className,
      ...props,
      children: /* @__PURE__ */ jsx4("path", { d: "M10,0 C15.523,0 20,4.59 20,10.253 C20,14.782 17.138,18.624 13.167,19.981 C12.66,20.082 12.48,19.762 12.48,19.489 C12.48,19.151 12.492,18.047 12.492,16.675 C12.492,15.719 12.172,15.095 11.813,14.777 C14.04,14.523 16.38,13.656 16.38,9.718 C16.38,8.598 15.992,7.684 15.35,6.966 C15.454,6.707 15.797,5.664 15.252,4.252 C15.252,4.252 14.414,3.977 12.505,5.303 C11.706,5.076 10.85,4.962 10,4.958 C9.15,4.962 8.295,5.076 7.497,5.303 C5.586,3.977 4.746,4.252 4.746,4.252 C4.203,5.664 4.546,6.707 4.649,6.966 C4.01,7.684 3.619,8.598 3.619,9.718 C3.619,13.646 5.954,14.526 8.175,14.785 C7.889,15.041 7.63,15.493 7.54,16.156 C6.97,16.418 5.522,16.871 4.63,15.304 C4.63,15.304 4.101,14.319 3.097,14.247 C3.097,14.247 2.122,14.234 3.029,14.87 C3.029,14.87 3.684,15.185 4.139,16.37 C4.139,16.37 4.726,18.2 7.508,17.58 C7.513,18.437 7.522,19.245 7.522,19.489 C7.522,19.76 7.338,20.077 6.839,19.982 C2.865,18.627 0,14.783 0,10.253 C0,4.59 4.478,0 10,0" })
    }
  );
}

// src/components/icon/custom/LinkedinIcon.tsx
import { jsx as jsx5 } from "react/jsx-runtime";
function LinkedinIcon({
  size = 24,
  className,
  ...props
}) {
  return /* @__PURE__ */ jsx5(
    "svg",
    {
      xmlns: "http://www.w3.org/2000/svg",
      width: size,
      height: size,
      viewBox: "0 0 382 382",
      fill: "currentColor",
      className,
      ...props,
      children: /* @__PURE__ */ jsx5("path", { d: "M347.445,0H34.555C15.471,0,0,15.471,0,34.555v312.889C0,366.529,15.471,382,34.555,382h312.889C366.529,382,382,366.529,382,347.444V34.555C382,15.471,366.529,0,347.445,0z M118.207,329.844c0,5.554-4.502,10.056-10.056,10.056H65.345c-5.554,0-10.056-4.502-10.056-10.056V150.403c0-5.554,4.502-10.056,10.056-10.056h42.806c5.554,0,10.056,4.502,10.056,10.056V329.844z M86.748,123.432c-22.459,0-40.666-18.207-40.666-40.666S64.289,42.1,86.748,42.1s40.666,18.207,40.666,40.666S109.208,123.432,86.748,123.432z M341.91,330.654c0,5.106-4.14,9.246-9.246,9.246H286.73c-5.106,0-9.246-4.14-9.246-9.246v-84.168c0-12.556,3.683-55.021-32.813-55.021c-28.309,0-34.051,29.066-35.204,42.11v97.079c0,5.106-4.139,9.246-9.246,9.246h-44.426c-5.106,0-9.246-4.14-9.246-9.246V149.593c0-5.106,4.14-9.246,9.246-9.246h44.426c5.106,0,9.246,4.14,9.246,9.246v15.655c10.497-15.753,26.097-27.912,59.312-27.912c73.552,0,73.131,68.716,73.131,106.472L341.91,330.654L341.91,330.654z" })
    }
  );
}

// src/components/icon/registry.ts
var registry = {
  "arrow-left": ArrowLeft,
  "arrow-right": ArrowRight,
  "check": Check,
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
import { jsx as jsx6 } from "react/jsx-runtime";
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
    return /* @__PURE__ */ jsx6(
      LucideComponent,
      {
        size: px,
        className,
        "aria-label": label,
        role: "img"
      }
    );
  }
  return /* @__PURE__ */ jsx6(
    LucideComponent,
    {
      size: px,
      className,
      "aria-hidden": "true"
    }
  );
}

// src/components/button/IconButton.tsx
import { jsx as jsx7 } from "react/jsx-runtime";
var iconSizeMap = {
  sm: "sm",
  md: "md",
  lg: "lg"
};
var sizeStyles = {
  sm: "p-2",
  md: "p-2.5",
  lg: "p-3"
};
var touchTarget = [
  "relative",
  "after:content-[''] after:absolute after:top-1/2 after:left-1/2",
  "after:-translate-x-1/2 after:-translate-y-1/2",
  "after:min-w-[44px] after:min-h-[44px] after:w-full after:h-full"
].join(" ");
function IconButton({
  icon,
  size = "md",
  variant = "secondary",
  className,
  ...rest
}) {
  return /* @__PURE__ */ jsx7(
    Button,
    {
      variant,
      className: cn(sizeStyles[size], touchTarget, className),
      ...rest,
      children: /* @__PURE__ */ jsx7(Icon, { name: icon, size: iconSizeMap[size] })
    }
  );
}

// src/components/form/Input.tsx
import { jsx as jsx8 } from "react/jsx-runtime";
function Input({ invalid = false, className, type = "text", ...props }) {
  return /* @__PURE__ */ jsx8(
    "input",
    {
      type,
      "aria-invalid": invalid,
      className: cn(
        "w-full rounded-md border border-border-strong bg-surface px-3 py-2 type-body-sm text-foreground placeholder:text-muted-foreground transition-colors",
        "focus-visible:outline-none focus-visible:border-brand-primary",
        "disabled:pointer-events-none disabled:text-disabled-foreground disabled:bg-surface-subtle",
        invalid && "border-error focus-visible:border-error",
        className
      ),
      ...props
    }
  );
}

// src/components/form/Label.tsx
import { jsx as jsx9, jsxs } from "react/jsx-runtime";
function Label({ htmlFor, required = false, className, children }) {
  return /* @__PURE__ */ jsxs(
    "label",
    {
      htmlFor,
      className: cn(
        "type-label text-foreground",
        className
      ),
      children: [
        children,
        required && /* @__PURE__ */ jsx9("span", { className: "ml-0.5 text-error", "aria-hidden": "true", children: "*" })
      ]
    }
  );
}

// src/components/form/FormItem.tsx
import { jsx as jsx10, jsxs as jsxs2 } from "react/jsx-runtime";
function FormItem({
  htmlFor,
  label,
  required = false,
  error,
  description,
  className,
  children
}) {
  return /* @__PURE__ */ jsxs2("div", { className: cn("flex flex-col gap-2", className), children: [
    /* @__PURE__ */ jsx10(Label, { htmlFor, required, children: label }),
    children,
    description && !error && /* @__PURE__ */ jsx10(
      "p",
      {
        id: `${htmlFor}-description`,
        className: "type-caption text-muted-foreground",
        children: description
      }
    ),
    error && /* @__PURE__ */ jsx10(
      "p",
      {
        id: `${htmlFor}-error`,
        className: "type-caption text-error",
        children: error
      }
    )
  ] });
}

// src/components/form/Checkbox.tsx
import { jsx as jsx11, jsxs as jsxs3 } from "react/jsx-runtime";
function Checkbox({ invalid = false, className, ...props }) {
  return /* @__PURE__ */ jsxs3("span", { className: cn("relative inline-flex items-center justify-center size-5", className), children: [
    /* @__PURE__ */ jsx11(
      "input",
      {
        type: "checkbox",
        "aria-invalid": invalid,
        className: "peer absolute inset-0 opacity-0 cursor-pointer disabled:cursor-default",
        ...props
      }
    ),
    /* @__PURE__ */ jsx11(
      "span",
      {
        className: cn(
          "size-5 rounded-md border border-border-strong bg-surface transition-colors",
          "peer-checked:bg-foreground peer-checked:border-foreground",
          "peer-focus-visible:outline-none peer-focus-visible:border-brand-primary",
          "peer-disabled:pointer-events-none peer-disabled:bg-surface-subtle peer-disabled:border-border",
          "peer-disabled:peer-checked:bg-disabled-foreground peer-disabled:peer-checked:border-disabled-foreground",
          invalid && "border-error peer-focus-visible:border-error"
        )
      }
    ),
    /* @__PURE__ */ jsx11(
      "svg",
      {
        "aria-hidden": "true",
        viewBox: "0 0 14 14",
        fill: "none",
        className: "absolute size-3.5 text-surface opacity-0 peer-checked:opacity-100 pointer-events-none transition-opacity",
        children: /* @__PURE__ */ jsx11(
          "polyline",
          {
            points: "2.5 7 5.5 10.5 11.5 3.5",
            stroke: "currentColor",
            strokeWidth: "2",
            strokeLinecap: "round",
            strokeLinejoin: "round"
          }
        )
      }
    )
  ] });
}

// src/components/form/Select.tsx
import * as RadixSelect from "@radix-ui/react-select";
import { jsx as jsx12, jsxs as jsxs4 } from "react/jsx-runtime";
function Select(props) {
  return /* @__PURE__ */ jsx12(RadixSelect.Root, { ...props });
}
function SelectTrigger({ placeholder, invalid = false, className }) {
  return /* @__PURE__ */ jsxs4(
    RadixSelect.Trigger,
    {
      "aria-invalid": invalid,
      className: cn(
        "flex w-full items-center justify-between rounded-md border border-border-strong bg-surface px-3 py-2 type-body-sm text-foreground transition-colors",
        "placeholder:text-muted-foreground",
        "focus-visible:outline-none focus-visible:border-brand-primary",
        "disabled:pointer-events-none disabled:text-disabled-foreground disabled:bg-surface-subtle",
        invalid && "border-error focus-visible:border-error",
        className
      ),
      children: [
        /* @__PURE__ */ jsx12(RadixSelect.Value, { placeholder }),
        /* @__PURE__ */ jsx12(RadixSelect.Icon, { asChild: true, children: /* @__PURE__ */ jsx12(Icon, { name: "chevron-down", size: "sm", className: "flex-shrink-0" }) })
      ]
    }
  );
}
function SelectContent({ children, className, position = "popper" }) {
  return /* @__PURE__ */ jsx12(RadixSelect.Portal, { children: /* @__PURE__ */ jsx12(
    RadixSelect.Content,
    {
      position,
      className: cn(
        "z-50 min-w-32 overflow-hidden rounded-md border border-border bg-surface shadow-md",
        "data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95",
        "data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95",
        position === "popper" && "max-h-[var(--radix-select-content-available-height)]",
        className
      ),
      sideOffset: 4,
      children: /* @__PURE__ */ jsx12(
        RadixSelect.Viewport,
        {
          className: cn(
            "p-1",
            position === "popper" && "h-[var(--radix-select-trigger-height)] w-full min-w-[var(--radix-select-trigger-width)]"
          ),
          children
        }
      )
    }
  ) });
}
function SelectItem({ value, children, disabled, className }) {
  return /* @__PURE__ */ jsxs4(
    RadixSelect.Item,
    {
      value,
      disabled,
      className: cn(
        "relative flex w-full cursor-pointer select-none items-center rounded-sm py-2 pl-7 pr-3 type-body-sm text-foreground",
        "hover:bg-surface-subtle focus:bg-surface-subtle focus:outline-none",
        "data-[disabled]:pointer-events-none data-[disabled]:text-disabled-foreground",
        className
      ),
      children: [
        /* @__PURE__ */ jsx12("span", { className: "absolute left-2 flex items-center", children: /* @__PURE__ */ jsx12(RadixSelect.ItemIndicator, { children: /* @__PURE__ */ jsx12(Icon, { name: "check", size: "sm" }) }) }),
        /* @__PURE__ */ jsx12(RadixSelect.ItemText, { children })
      ]
    }
  );
}
function SelectGroup({ label, children }) {
  return /* @__PURE__ */ jsxs4(RadixSelect.Group, { children: [
    /* @__PURE__ */ jsx12(RadixSelect.Label, { className: "px-3 py-2 type-caption text-muted-foreground", children: label }),
    children
  ] });
}
function SelectSeparator() {
  return /* @__PURE__ */ jsx12(RadixSelect.Separator, { className: "mx-1 my-1 h-px bg-border" });
}

// src/components/form/Switch.tsx
import { jsx as jsx13, jsxs as jsxs5 } from "react/jsx-runtime";
function Switch({
  invalid = false,
  size = "default",
  className,
  ...props
}) {
  const isSmall = size === "sm";
  return /* @__PURE__ */ jsxs5(
    "span",
    {
      className: cn(
        "relative inline-flex items-center",
        isSmall ? "h-4 w-7" : "h-6 w-10",
        className
      ),
      children: [
        /* @__PURE__ */ jsx13(
          "input",
          {
            type: "checkbox",
            role: "switch",
            "aria-invalid": invalid,
            className: "peer absolute inset-0 opacity-0 cursor-pointer disabled:cursor-default",
            ...props
          }
        ),
        /* @__PURE__ */ jsx13(
          "span",
          {
            className: cn(
              "pointer-events-none absolute inset-0 rounded-full border transition-colors",
              "border-border-strong bg-surface-subtle",
              "peer-checked:bg-foreground peer-checked:border-foreground",
              "peer-focus-visible:outline-none peer-focus-visible:border-brand-primary",
              "peer-disabled:pointer-events-none peer-disabled:bg-surface-subtle peer-disabled:border-border",
              "peer-disabled:peer-checked:bg-disabled-foreground peer-disabled:peer-checked:border-disabled-foreground",
              invalid && "border-error peer-focus-visible:border-error"
            )
          }
        ),
        /* @__PURE__ */ jsx13(
          "span",
          {
            className: cn(
              "pointer-events-none absolute rounded-full bg-foreground transition-all duration-200",
              "peer-checked:bg-surface",
              "peer-disabled:bg-disabled-foreground",
              "peer-disabled:peer-checked:bg-surface",
              isSmall ? "left-0.5 size-2.5 peer-checked:left-[calc(100%-0.125rem-0.625rem)] peer-checked:size-3" : "left-1 size-4 peer-checked:left-[calc(100%-0.25rem-1.25rem)] peer-checked:size-5"
            )
          }
        )
      ]
    }
  );
}

// src/components/form/Textarea.tsx
import { jsx as jsx14 } from "react/jsx-runtime";
function Textarea({ invalid = false, className, rows = 3, ...props }) {
  return /* @__PURE__ */ jsx14(
    "textarea",
    {
      rows,
      "aria-invalid": invalid,
      className: cn(
        "w-full resize-y rounded-md border border-border-strong bg-surface px-3 py-2 type-body-sm text-foreground placeholder:text-muted-foreground transition-colors",
        "focus-visible:outline-none focus-visible:border-brand-primary",
        "disabled:pointer-events-none disabled:text-disabled-foreground disabled:bg-surface-subtle",
        invalid && "border-error focus-visible:border-error",
        className
      ),
      ...props
    }
  );
}

// src/components/form/Radio.tsx
import * as RadixRadioGroup from "@radix-ui/react-radio-group";
import { jsx as jsx15, jsxs as jsxs6 } from "react/jsx-runtime";
function RadioGroup({ invalid = false, orientation = "vertical", className, ...props }) {
  return /* @__PURE__ */ jsx15(
    RadixRadioGroup.Root,
    {
      "data-invalid": invalid ? "" : void 0,
      orientation,
      className: cn(
        "group flex",
        orientation === "horizontal" ? "flex-row gap-4" : "flex-col gap-2",
        className
      ),
      ...props
    }
  );
}
function RadioItem({ value, children, disabled, className }) {
  return /* @__PURE__ */ jsxs6("label", { className: cn("flex items-center gap-2", className), children: [
    /* @__PURE__ */ jsx15(
      RadixRadioGroup.Item,
      {
        value,
        disabled,
        className: cn(
          "relative flex items-center justify-center size-5 rounded-full border border-border-strong bg-surface transition-colors",
          "data-[state=checked]:bg-foreground data-[state=checked]:border-foreground",
          "focus-visible:outline focus-visible:outline-2 focus-visible:outline-focus-ring focus-visible:shadow-[0_0_0_4px_var(--color-brand-primary)]",
          "disabled:pointer-events-none disabled:bg-surface-subtle disabled:border-border",
          "disabled:data-[state=checked]:bg-disabled-foreground disabled:data-[state=checked]:border-disabled-foreground",
          "group-data-[invalid]:border-error group-data-[invalid]:focus-visible:border-error"
        ),
        children: /* @__PURE__ */ jsx15(RadixRadioGroup.Indicator, { className: "flex items-center justify-center", children: /* @__PURE__ */ jsx15("span", { className: "size-2.5 rounded-full bg-surface" }) })
      }
    ),
    /* @__PURE__ */ jsx15("span", { className: "type-body-sm text-foreground", children })
  ] });
}

// src/components/layout/ToggleBar.tsx
import { jsx as jsx16, jsxs as jsxs7 } from "react/jsx-runtime";
function ToggleBar({ activeView, onViewChange, items, className }) {
  return /* @__PURE__ */ jsx16("div", { className: cn("flex text-sm md:text-base mt-1", className), children: items.map((item) => /* @__PURE__ */ jsxs7(
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
        /* @__PURE__ */ jsx16("span", { children: item.text })
      ]
    },
    item.view
  )) });
}

// src/components/feedback/LoadingSpinner.tsx
import { jsx as jsx17, jsxs as jsxs8 } from "react/jsx-runtime";
function LoadingSpinner({
  fullScreen = true,
  label = "\uB85C\uB529\uC911\uC785\uB2C8\uB2E4",
  className
}) {
  return /* @__PURE__ */ jsxs8(
    "div",
    {
      className: cn(
        "flex flex-col gap-3 justify-center items-center bg-[var(--color-surface)]",
        fullScreen ? "fixed top-0 left-0 w-full h-full z-50" : "h-full w-full mt-8",
        className
      ),
      children: [
        /* @__PURE__ */ jsx17(
          "div",
          {
            className: "ds-spinner",
            role: "status",
            "aria-label": label
          }
        ),
        /* @__PURE__ */ jsx17("p", { className: "text-sm font-medium text-[var(--color-muted-foreground)]", children: label })
      ]
    }
  );
}

// src/components/feedback/NotFound.tsx
import { jsx as jsx18, jsxs as jsxs9 } from "react/jsx-runtime";
function NotFound() {
  return /* @__PURE__ */ jsx18("div", { className: "h-full flex items-center justify-center px-4", children: /* @__PURE__ */ jsxs9("div", { className: "max-w-lg w-full text-center", children: [
    /* @__PURE__ */ jsx18("h1", { className: "text-4xl font-bold text-[var(--color-foreground)] mb-4", children: "404" }),
    /* @__PURE__ */ jsx18("p", { className: "text-lg md:text-2xl font-semibold text-[var(--color-muted-foreground)] mb-6", children: "\uC874\uC7AC\uD558\uC9C0 \uC54A\uB294 \uD398\uC774\uC9C0\uC785\uB2C8\uB2E4" }),
    /* @__PURE__ */ jsx18("div", { className: "flex justify-center w-[60%] mx-auto", children: /* @__PURE__ */ jsx18(LinkButton, { href: "/", variant: "primary", children: "\uD648\uD398\uC774\uC9C0\uB85C \uB3CC\uC544\uAC00\uAE30" }) })
  ] }) });
}

// src/components/feedback/NotLogin.tsx
import { jsx as jsx19, jsxs as jsxs10 } from "react/jsx-runtime";
function NotLogin() {
  return /* @__PURE__ */ jsx19("div", { className: "h-full flex items-center justify-center px-4", children: /* @__PURE__ */ jsxs10("div", { className: "max-w-lg w-full text-center", children: [
    /* @__PURE__ */ jsx19("h1", { className: "text-2xl font-bold text-[var(--color-foreground)] mb-4", children: "\uB85C\uADF8\uC778\uC774 \uD544\uC694\uD569\uB2C8\uB2E4" }),
    /* @__PURE__ */ jsx19("div", { className: "flex justify-center", children: /* @__PURE__ */ jsx19(LinkButton, { href: "/signin", variant: "primary", children: "\uB85C\uADF8\uC778\uD558\uAE30" }) })
  ] }) });
}

// src/components/feedback/NotAuthorized.tsx
import { jsx as jsx20, jsxs as jsxs11 } from "react/jsx-runtime";
function NotAuthorized() {
  return /* @__PURE__ */ jsx20("div", { className: "h-full flex items-center justify-center px-4", children: /* @__PURE__ */ jsxs11("div", { className: "max-w-lg w-full text-center", children: [
    /* @__PURE__ */ jsx20("h1", { className: "text-2xl font-bold text-[var(--color-foreground)] mb-4", children: "\uC811\uADFC \uAD8C\uD55C\uC774 \uC5C6\uC2B5\uB2C8\uB2E4" }),
    /* @__PURE__ */ jsx20("div", { className: "flex justify-center", children: /* @__PURE__ */ jsx20(LinkButton, { href: "/", variant: "primary", children: "\uD648\uD398\uC774\uC9C0\uB85C \uB3CC\uC544\uAC00\uAE30" }) })
  ] }) });
}

// src/components/feedback/UnexpectedError.tsx
import { jsx as jsx21, jsxs as jsxs12 } from "react/jsx-runtime";
function UnexpectedError({ onRetry }) {
  return /* @__PURE__ */ jsx21("div", { className: "h-full flex items-center justify-center px-4", children: /* @__PURE__ */ jsxs12("div", { className: "max-w-lg w-full text-center", children: [
    /* @__PURE__ */ jsx21("h1", { className: "text-2xl font-bold text-[var(--color-foreground)] mb-4", children: "\uC624\uB958\uAC00 \uBC1C\uC0DD\uD588\uC2B5\uB2C8\uB2E4" }),
    /* @__PURE__ */ jsx21("p", { className: "text-[var(--color-muted-foreground)] mb-6", children: "\uC7A0\uC2DC \uD6C4 \uB2E4\uC2DC \uC2DC\uB3C4\uD574\uC8FC\uC138\uC694." }),
    onRetry && /* @__PURE__ */ jsx21(Button, { onClick: onRetry, variant: "primary", children: "\uB2E4\uC2DC \uC2DC\uB3C4" })
  ] }) });
}

// src/components/overlay/Dialog.tsx
import * as RadixDialog from "@radix-ui/react-dialog";
import { jsx as jsx22, jsxs as jsxs13 } from "react/jsx-runtime";
var Dialog = RadixDialog.Root;
var DialogTrigger = RadixDialog.Trigger;
var DialogClose = RadixDialog.Close;
function DialogContent({ children, className }) {
  return /* @__PURE__ */ jsxs13(RadixDialog.Portal, { children: [
    /* @__PURE__ */ jsx22(RadixDialog.Overlay, { className: "fixed inset-0 z-50 bg-black/50" }),
    /* @__PURE__ */ jsx22(
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
  return /* @__PURE__ */ jsx22(
    RadixDialog.Title,
    {
      className: cn("text-lg font-semibold text-[var(--color-foreground)] mb-4", className),
      children
    }
  );
}

// src/components/overlay/Dropdown.tsx
import * as RadixDropdown from "@radix-ui/react-dropdown-menu";
import { jsx as jsx23 } from "react/jsx-runtime";
var Dropdown = RadixDropdown.Root;
var DropdownTrigger = RadixDropdown.Trigger;
function DropdownContent({ children, className }) {
  return /* @__PURE__ */ jsx23(RadixDropdown.Portal, { children: /* @__PURE__ */ jsx23(
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
  return /* @__PURE__ */ jsx23(
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
import { jsx as jsx24 } from "react/jsx-runtime";
var Popover = RadixPopover.Root;
var PopoverTrigger = RadixPopover.Trigger;
function PopoverContent({ children, className }) {
  return /* @__PURE__ */ jsx24(RadixPopover.Portal, { children: /* @__PURE__ */ jsx24(
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

// src/components/divider/Divider.tsx
import { jsx as jsx25 } from "react/jsx-runtime";
function Divider({
  orientation = "horizontal",
  className,
  ...props
}) {
  return /* @__PURE__ */ jsx25(
    "hr",
    {
      role: "separator",
      "aria-orientation": orientation,
      className: cn(
        "border-border",
        orientation === "horizontal" ? "border-t w-full" : "border-l self-stretch h-auto",
        className
      ),
      ...props
    }
  );
}

// src/index.ts
var DS_VERSION = "0.1.0";
export {
  Badge,
  Button,
  Checkbox,
  DS_VERSION,
  Dialog,
  DialogClose,
  DialogContent,
  DialogTitle,
  DialogTrigger,
  Divider,
  Dropdown,
  DropdownContent,
  DropdownItem,
  DropdownTrigger,
  FormItem,
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
  RadioGroup,
  RadioItem,
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectSeparator,
  SelectTrigger,
  Switch,
  Textarea,
  ToggleBar,
  UnexpectedError,
  badgeVariants,
  buttonVariants,
  cn
};
//# sourceMappingURL=index.js.map