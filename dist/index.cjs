"use client";
"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
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
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/index.ts
var src_exports = {};
__export(src_exports, {
  BackIcon: () => BackIcon,
  Button: () => Button,
  ClockIcon: () => ClockIcon,
  CommentIcon: () => CommentIcon,
  CrossIcon: () => CrossIcon,
  DS_VERSION: () => DS_VERSION,
  Dialog: () => Dialog,
  DialogClose: () => DialogClose,
  DialogContent: () => DialogContent,
  DialogTitle: () => DialogTitle,
  DialogTrigger: () => DialogTrigger,
  Dropdown: () => Dropdown,
  DropdownContent: () => DropdownContent,
  DropdownItem: () => DropdownItem,
  DropdownTrigger: () => DropdownTrigger,
  EmailIcon: () => EmailIcon,
  FormItem: () => FormItem,
  GitIcon: () => GitIcon,
  GradIcon: () => GradIcon,
  HorizontalDivider: () => HorizontalDivider,
  IconButton: () => IconButton,
  Input: () => Input,
  Label: () => Label,
  LikeIcon: () => LikeIcon,
  LinkButton: () => LinkButton,
  LinkedInIcon: () => LinkedInIcon,
  ListIcon: () => ListIcon,
  LoadingSpinner: () => LoadingSpinner,
  MinusIcon: () => MinusIcon,
  NotAuthorized: () => NotAuthorized,
  NotFound: () => NotFound,
  NotLogin: () => NotLogin,
  PencilIcon: () => PencilIcon,
  PlusIcon: () => PlusIcon,
  Popover: () => Popover,
  PopoverContent: () => PopoverContent,
  PopoverTrigger: () => PopoverTrigger,
  ReplyIcon: () => ReplyIcon,
  RightArrowIcon: () => RightArrowIcon,
  SecretIcon: () => SecretIcon,
  TicketIcon: () => TicketIcon,
  ToggleBar: () => ToggleBar,
  TrashcanIcon: () => TrashcanIcon,
  UnexpectedError: () => UnexpectedError,
  VerticalDivider: () => VerticalDivider,
  ViewIcon: () => ViewIcon,
  cn: () => cn,
  iconClass: () => iconClass
});
module.exports = __toCommonJS(src_exports);

// src/utils/cn.ts
var import_clsx = require("clsx");
var import_tailwind_merge = require("tailwind-merge");
function cn(...inputs) {
  return (0, import_tailwind_merge.twMerge)((0, import_clsx.clsx)(inputs));
}

// src/components/button/Button.tsx
var import_class_variance_authority = require("class-variance-authority");
var import_jsx_runtime = require("react/jsx-runtime");
var buttonVariants = (0, import_class_variance_authority.cva)(
  "inline-flex items-center justify-center self-center gap-1 cursor-pointer rounded-[var(--radius-md)] text-sm md:text-base px-4 py-2 transition-colors disabled:cursor-not-allowed disabled:opacity-60",
  {
    variants: {
      variant: {
        primary: "bg-[var(--color-brand-primary)] border border-[var(--color-brand-primary)] text-[var(--color-brand-accent)] hover:border-[var(--color-brand-accent)]",
        secondary: "bg-slate-100 border border-slate-100 text-[var(--color-text-primary)] hover:bg-slate-200",
        tertiary: "border-none text-[var(--color-text-primary)] hover:underline"
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
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
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
var import_class_variance_authority2 = require("class-variance-authority");
var import_jsx_runtime2 = require("react/jsx-runtime");
var linkButtonVariants = (0, import_class_variance_authority2.cva)(
  "inline-flex items-center justify-center self-center gap-1 cursor-pointer rounded-[var(--radius-md)] text-sm md:text-base px-4 py-2 transition-colors",
  {
    variants: {
      variant: {
        primary: "bg-[var(--color-brand-primary)] border border-[var(--color-brand-primary)] text-[var(--color-brand-accent)] hover:border-[var(--color-brand-accent)]",
        secondary: "bg-slate-100 border border-slate-100 text-[var(--color-text-primary)] hover:bg-slate-200",
        tertiary: "border-none text-[var(--color-text-primary)] hover:underline"
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
    return /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("span", { className: cls, "aria-disabled": "true", children });
  }
  return /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("a", { href, className: cls, children });
}

// src/components/button/IconButton.tsx
var import_class_variance_authority3 = require("class-variance-authority");
var import_jsx_runtime3 = require("react/jsx-runtime");
var iconButtonVariants = (0, import_class_variance_authority3.cva)(
  "inline-flex items-center justify-center self-center gap-1 cursor-pointer rounded-[var(--radius-md)] text-sm md:text-base px-4 py-2 transition-colors h-fit disabled:cursor-not-allowed disabled:opacity-60",
  {
    variants: {
      variant: {
        primary: "bg-[var(--color-brand-primary)] border border-[var(--color-brand-primary)] text-[var(--color-brand-accent)] hover:border-[var(--color-brand-accent)]",
        secondary: "bg-slate-100 border border-slate-100 text-[var(--color-text-primary)] hover:bg-slate-200",
        tertiary: "border-none text-[var(--color-text-primary)] hover:underline"
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
  return /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)(
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
        text && /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("span", { className: "hidden sm:inline text-sm md:text-base", children: text })
      ]
    }
  );
}

// src/components/form/Input.tsx
var import_react = require("react");
var import_jsx_runtime4 = require("react/jsx-runtime");
var Input = (0, import_react.memo)(function Input2({
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
  return /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(
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
        "w-full px-3 py-2 border border-[var(--color-border-strong)] rounded-[var(--radius-md)] text-sm md:text-base text-[var(--color-text-primary)] bg-[var(--color-surface)] placeholder:text-[var(--color-text-muted)] focus:outline-none focus:ring-2 focus:ring-[var(--color-brand-primary)] disabled:opacity-50 disabled:cursor-not-allowed transition-colors",
        invalid && "border-[var(--color-error)] focus:ring-[var(--color-error)]",
        className
      )
    }
  );
});

// src/components/form/Label.tsx
var import_jsx_runtime5 = require("react/jsx-runtime");
function Label({ htmlFor, required = false, className, children }) {
  return /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)(
    "label",
    {
      htmlFor,
      className: cn(
        "text-sm font-medium text-[var(--color-text-primary)]",
        className
      ),
      children: [
        children,
        required && /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("span", { className: "ml-0.5 text-[var(--color-error)]", "aria-hidden": "true", children: "*" })
      ]
    }
  );
}

// src/components/form/FormItem.tsx
var import_react2 = require("react");
var import_jsx_runtime6 = require("react/jsx-runtime");
var FormItem = (0, import_react2.memo)(function FormItem2({
  htmlFor,
  labelText,
  type,
  value,
  onChange,
  placeholder,
  validationRules = [],
  required = false
}) {
  const [error, setError] = (0, import_react2.useState)(null);
  const [requiredError, setRequiredError] = (0, import_react2.useState)(false);
  const validate = (0, import_react2.useCallback)(
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
  return /* @__PURE__ */ (0, import_jsx_runtime6.jsxs)("div", { className: "relative flex flex-col gap-1 items-start", children: [
    /* @__PURE__ */ (0, import_jsx_runtime6.jsx)(Label, { htmlFor, required, children: labelText }),
    /* @__PURE__ */ (0, import_jsx_runtime6.jsx)(
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
    isInvalid && /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("span", { className: "absolute top-full mt-1 text-xs font-bold text-[var(--color-error)]", children: error ?? "" })
  ] });
});

// src/components/layout/HorizontalDivider.tsx
var import_jsx_runtime7 = require("react/jsx-runtime");
function HorizontalDivider({ color = "light", className }) {
  return /* @__PURE__ */ (0, import_jsx_runtime7.jsx)(
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
var import_jsx_runtime8 = require("react/jsx-runtime");
function VerticalDivider({ className }) {
  return /* @__PURE__ */ (0, import_jsx_runtime8.jsx)(
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
var import_jsx_runtime9 = require("react/jsx-runtime");
function ToggleBar({ activeView, onViewChange, items, className }) {
  return /* @__PURE__ */ (0, import_jsx_runtime9.jsx)("div", { className: cn("flex text-sm md:text-base mt-1", className), children: items.map((item) => /* @__PURE__ */ (0, import_jsx_runtime9.jsxs)(
    "div",
    {
      role: "tab",
      "aria-selected": activeView === item.view,
      onClick: () => onViewChange(item.view),
      className: cn(
        "px-3 py-2 flex items-center gap-1 cursor-pointer border-b-2 border-transparent text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)] transition-colors",
        activeView === item.view && "border-b-2 border-[var(--color-brand-primary)] text-[var(--color-text-primary)] font-semibold"
      ),
      children: [
        item.icon,
        /* @__PURE__ */ (0, import_jsx_runtime9.jsx)("span", { children: item.text })
      ]
    },
    item.view
  )) });
}

// src/components/feedback/LoadingSpinner.tsx
var import_jsx_runtime10 = require("react/jsx-runtime");
function LoadingSpinner({
  fullScreen = true,
  label = "\uB85C\uB529\uC911\uC785\uB2C8\uB2E4",
  className
}) {
  return /* @__PURE__ */ (0, import_jsx_runtime10.jsxs)(
    "div",
    {
      className: cn(
        "flex flex-col gap-3 justify-center items-center bg-[var(--color-surface)]",
        fullScreen ? "fixed top-0 left-0 w-full h-full z-50" : "h-full w-full mt-8",
        className
      ),
      children: [
        /* @__PURE__ */ (0, import_jsx_runtime10.jsx)(
          "div",
          {
            className: "w-10 h-10 rounded-full border-4 border-[var(--color-border)] border-t-[var(--color-brand-primary)] animate-[ds-spin_0.8s_linear_infinite]",
            role: "status",
            "aria-label": label
          }
        ),
        /* @__PURE__ */ (0, import_jsx_runtime10.jsx)("p", { className: "text-sm font-medium text-[var(--color-text-muted)]", children: label })
      ]
    }
  );
}

// src/components/feedback/NotFound.tsx
var import_jsx_runtime11 = require("react/jsx-runtime");
function NotFound() {
  return /* @__PURE__ */ (0, import_jsx_runtime11.jsx)("div", { className: "h-full flex items-center justify-center px-4", children: /* @__PURE__ */ (0, import_jsx_runtime11.jsxs)("div", { className: "max-w-lg w-full text-center", children: [
    /* @__PURE__ */ (0, import_jsx_runtime11.jsx)("h1", { className: "text-4xl font-bold text-[var(--color-text-primary)] mb-4", children: "404" }),
    /* @__PURE__ */ (0, import_jsx_runtime11.jsx)("p", { className: "text-lg md:text-2xl font-semibold text-[var(--color-text-muted)] mb-6", children: "\uC874\uC7AC\uD558\uC9C0 \uC54A\uB294 \uD398\uC774\uC9C0\uC785\uB2C8\uB2E4" }),
    /* @__PURE__ */ (0, import_jsx_runtime11.jsx)("div", { className: "flex justify-center w-[60%] mx-auto", children: /* @__PURE__ */ (0, import_jsx_runtime11.jsx)(LinkButton, { href: "/", variant: "primary", children: "\uD648\uD398\uC774\uC9C0\uB85C \uB3CC\uC544\uAC00\uAE30" }) })
  ] }) });
}

// src/components/feedback/NotLogin.tsx
var import_jsx_runtime12 = require("react/jsx-runtime");
function NotLogin() {
  return /* @__PURE__ */ (0, import_jsx_runtime12.jsx)("div", { className: "h-full flex items-center justify-center px-4", children: /* @__PURE__ */ (0, import_jsx_runtime12.jsxs)("div", { className: "max-w-lg w-full text-center", children: [
    /* @__PURE__ */ (0, import_jsx_runtime12.jsx)("h1", { className: "text-2xl font-bold text-[var(--color-text-primary)] mb-4", children: "\uB85C\uADF8\uC778\uC774 \uD544\uC694\uD569\uB2C8\uB2E4" }),
    /* @__PURE__ */ (0, import_jsx_runtime12.jsx)("div", { className: "flex justify-center", children: /* @__PURE__ */ (0, import_jsx_runtime12.jsx)(LinkButton, { href: "/signin", variant: "primary", children: "\uB85C\uADF8\uC778\uD558\uAE30" }) })
  ] }) });
}

// src/components/feedback/NotAuthorized.tsx
var import_jsx_runtime13 = require("react/jsx-runtime");
function NotAuthorized() {
  return /* @__PURE__ */ (0, import_jsx_runtime13.jsx)("div", { className: "h-full flex items-center justify-center px-4", children: /* @__PURE__ */ (0, import_jsx_runtime13.jsxs)("div", { className: "max-w-lg w-full text-center", children: [
    /* @__PURE__ */ (0, import_jsx_runtime13.jsx)("h1", { className: "text-2xl font-bold text-[var(--color-text-primary)] mb-4", children: "\uC811\uADFC \uAD8C\uD55C\uC774 \uC5C6\uC2B5\uB2C8\uB2E4" }),
    /* @__PURE__ */ (0, import_jsx_runtime13.jsx)("div", { className: "flex justify-center", children: /* @__PURE__ */ (0, import_jsx_runtime13.jsx)(LinkButton, { href: "/", variant: "primary", children: "\uD648\uD398\uC774\uC9C0\uB85C \uB3CC\uC544\uAC00\uAE30" }) })
  ] }) });
}

// src/components/feedback/UnexpectedError.tsx
var import_jsx_runtime14 = require("react/jsx-runtime");
function UnexpectedError({ onRetry }) {
  return /* @__PURE__ */ (0, import_jsx_runtime14.jsx)("div", { className: "h-full flex items-center justify-center px-4", children: /* @__PURE__ */ (0, import_jsx_runtime14.jsxs)("div", { className: "max-w-lg w-full text-center", children: [
    /* @__PURE__ */ (0, import_jsx_runtime14.jsx)("h1", { className: "text-2xl font-bold text-[var(--color-text-primary)] mb-4", children: "\uC624\uB958\uAC00 \uBC1C\uC0DD\uD588\uC2B5\uB2C8\uB2E4" }),
    /* @__PURE__ */ (0, import_jsx_runtime14.jsx)("p", { className: "text-[var(--color-text-muted)] mb-6", children: "\uC7A0\uC2DC \uD6C4 \uB2E4\uC2DC \uC2DC\uB3C4\uD574\uC8FC\uC138\uC694." }),
    onRetry && /* @__PURE__ */ (0, import_jsx_runtime14.jsx)(Button, { onClick: onRetry, variant: "primary", children: "\uB2E4\uC2DC \uC2DC\uB3C4" })
  ] }) });
}

// src/components/icon/Icon.tsx
var sizeClass = {
  xs: "ds-icon-xs",
  sm: "ds-icon-sm",
  md: "ds-icon-md",
  lg: "ds-icon-lg",
  xl: "ds-icon-xl"
};
function iconClass(size = "md", className) {
  return cn(sizeClass[size], className);
}

// src/components/icon/BackIcon.tsx
var import_md = require("react-icons/md");
var import_jsx_runtime15 = require("react/jsx-runtime");
function BackIcon({ size = "md", className }) {
  return /* @__PURE__ */ (0, import_jsx_runtime15.jsx)(import_md.MdArrowBackIosNew, { className: iconClass(size, className) });
}

// src/components/icon/ClockIcon.tsx
var import_lu = require("react-icons/lu");
var import_jsx_runtime16 = require("react/jsx-runtime");
function ClockIcon({ size = "sm", className }) {
  return /* @__PURE__ */ (0, import_jsx_runtime16.jsx)(import_lu.LuClock9, { className: iconClass(size, className ?? "text-gray-600") });
}

// src/components/icon/CommentIcon.tsx
var import_fa = require("react-icons/fa");
var import_jsx_runtime17 = require("react/jsx-runtime");
function CommentIcon({ size = "md", color = "black", className }) {
  return /* @__PURE__ */ (0, import_jsx_runtime17.jsx)(
    import_fa.FaRegComments,
    {
      className: iconClass(size, cn(color === "gray" ? "text-gray-400" : "text-black", className))
    }
  );
}

// src/components/icon/CrossIcon.tsx
var import_rx = require("react-icons/rx");
var import_jsx_runtime18 = require("react/jsx-runtime");
function CrossIcon({ size = "md", className }) {
  return /* @__PURE__ */ (0, import_jsx_runtime18.jsx)(import_rx.RxCross2, { className: iconClass(size, className) });
}

// src/components/icon/EmailIcon.tsx
var import_ai = require("react-icons/ai");
var import_jsx_runtime19 = require("react/jsx-runtime");
function EmailIcon({ size = "md", className }) {
  return /* @__PURE__ */ (0, import_jsx_runtime19.jsx)(import_ai.AiOutlineMail, { className: iconClass(size, className) });
}

// src/components/icon/GitIcon.tsx
var import_fa2 = require("react-icons/fa");
var import_jsx_runtime20 = require("react/jsx-runtime");
function GitIcon({ size = "md", className }) {
  return /* @__PURE__ */ (0, import_jsx_runtime20.jsx)(import_fa2.FaGithub, { className: iconClass(size, className) });
}

// src/components/icon/GradIcon.tsx
var import_fa3 = require("react-icons/fa");
var import_jsx_runtime21 = require("react/jsx-runtime");
function GradIcon({ size = "md", className }) {
  return /* @__PURE__ */ (0, import_jsx_runtime21.jsx)(import_fa3.FaGraduationCap, { className: iconClass(size, className) });
}

// src/components/icon/LikeIcon.tsx
var import_ai2 = require("react-icons/ai");
var import_jsx_runtime22 = require("react/jsx-runtime");
function LikeIcon({
  size = "md",
  fill = false,
  isGray = false,
  color = "blue",
  className
}) {
  const colorClass = isGray ? "" : color === "blue" ? "text-[var(--color-brand-primary)]" : "text-[var(--color-brand-accent)]";
  const cls = iconClass(size, cn(colorClass, className));
  return fill ? /* @__PURE__ */ (0, import_jsx_runtime22.jsx)(import_ai2.AiFillLike, { className: cls }) : /* @__PURE__ */ (0, import_jsx_runtime22.jsx)(import_ai2.AiOutlineLike, { className: cls });
}

// src/components/icon/LinkedInIcon.tsx
var import_fa4 = require("react-icons/fa");
var import_jsx_runtime23 = require("react/jsx-runtime");
function LinkedInIcon({ size = "md", className }) {
  return /* @__PURE__ */ (0, import_jsx_runtime23.jsx)(import_fa4.FaLinkedin, { className: iconClass(size, className), color: "#0a66c2" });
}

// src/components/icon/ListIcon.tsx
var import_io5 = require("react-icons/io5");
var import_jsx_runtime24 = require("react/jsx-runtime");
function ListIcon({ size = "md", className }) {
  return /* @__PURE__ */ (0, import_jsx_runtime24.jsx)(import_io5.IoListOutline, { className: iconClass(size, className) });
}

// src/components/icon/MinusIcon.tsx
var import_fa5 = require("react-icons/fa");
var import_jsx_runtime25 = require("react/jsx-runtime");
function MinusIcon({ size = "md", className }) {
  return /* @__PURE__ */ (0, import_jsx_runtime25.jsx)(import_fa5.FaMinus, { className: iconClass(size, className) });
}

// src/components/icon/PencilIcon.tsx
var import_bi = require("react-icons/bi");
var import_jsx_runtime26 = require("react/jsx-runtime");
function PencilIcon({ size = "md", color = "white", className }) {
  return /* @__PURE__ */ (0, import_jsx_runtime26.jsx)(
    import_bi.BiPencil,
    {
      className: iconClass(size, cn(
        color === "gray" ? "text-gray-400" : "text-[var(--color-brand-accent)]",
        className
      ))
    }
  );
}

// src/components/icon/PlusIcon.tsx
var import_fa6 = require("react-icons/fa");
var import_jsx_runtime27 = require("react/jsx-runtime");
function PlusIcon({ size = "md", className }) {
  return /* @__PURE__ */ (0, import_jsx_runtime27.jsx)(import_fa6.FaPlus, { className: iconClass(size, className) });
}

// src/components/icon/ReplyIcon.tsx
var import_im = require("react-icons/im");
var import_jsx_runtime28 = require("react/jsx-runtime");
function ReplyIcon({ size = "md", flip = false, className }) {
  return /* @__PURE__ */ (0, import_jsx_runtime28.jsx)(import_im.ImReply, { className: iconClass(size, cn(flip && "scale-x-[-1]", className)) });
}

// src/components/icon/RightArrowIcon.tsx
var import_fa7 = require("react-icons/fa");
var import_jsx_runtime29 = require("react/jsx-runtime");
function RightArrowIcon({ size = "md", className }) {
  return /* @__PURE__ */ (0, import_jsx_runtime29.jsx)(import_fa7.FaChevronRight, { className: iconClass(size, className) });
}

// src/components/icon/SecretIcon.tsx
var import_ci = require("react-icons/ci");
var import_jsx_runtime30 = require("react/jsx-runtime");
function SecretIcon({ size = "sm", className }) {
  return /* @__PURE__ */ (0, import_jsx_runtime30.jsx)(import_ci.CiLock, { className: iconClass(size, className) });
}

// src/components/icon/TicketIcon.tsx
var import_io52 = require("react-icons/io5");
var import_jsx_runtime31 = require("react/jsx-runtime");
function TicketIcon({ size = "md", className }) {
  return /* @__PURE__ */ (0, import_jsx_runtime31.jsx)(import_io52.IoTicketSharp, { className: iconClass(size, className) });
}

// src/components/icon/TrashcanIcon.tsx
var import_md2 = require("react-icons/md");
var import_jsx_runtime32 = require("react/jsx-runtime");
function TrashcanIcon({ size = "md", color = "white", className }) {
  return /* @__PURE__ */ (0, import_jsx_runtime32.jsx)(
    import_md2.MdDelete,
    {
      className: iconClass(size, cn(
        color === "gray" ? "text-gray-400" : "text-[var(--color-brand-accent)]",
        className
      ))
    }
  );
}

// src/components/icon/ViewIcon.tsx
var import_fi = require("react-icons/fi");
var import_jsx_runtime33 = require("react/jsx-runtime");
function ViewIcon({ size = "md", className }) {
  return /* @__PURE__ */ (0, import_jsx_runtime33.jsx)(import_fi.FiEye, { className: iconClass(size, className) });
}

// src/components/overlay/Dialog.tsx
var RadixDialog = __toESM(require("@radix-ui/react-dialog"), 1);
var import_jsx_runtime34 = require("react/jsx-runtime");
var Dialog = RadixDialog.Root;
var DialogTrigger = RadixDialog.Trigger;
var DialogClose = RadixDialog.Close;
function DialogContent({ children, className }) {
  return /* @__PURE__ */ (0, import_jsx_runtime34.jsxs)(RadixDialog.Portal, { children: [
    /* @__PURE__ */ (0, import_jsx_runtime34.jsx)(RadixDialog.Overlay, { className: "fixed inset-0 z-50 bg-black/50" }),
    /* @__PURE__ */ (0, import_jsx_runtime34.jsx)(
      RadixDialog.Content,
      {
        className: cn(
          "fixed left-1/2 top-1/2 z-50 -translate-x-1/2 -translate-y-1/2",
          "w-full max-w-lg rounded-[var(--radius-lg)]",
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
  return /* @__PURE__ */ (0, import_jsx_runtime34.jsx)(
    RadixDialog.Title,
    {
      className: cn("text-lg font-semibold text-[var(--color-text-primary)] mb-4", className),
      children
    }
  );
}

// src/components/overlay/Dropdown.tsx
var RadixDropdown = __toESM(require("@radix-ui/react-dropdown-menu"), 1);
var import_jsx_runtime35 = require("react/jsx-runtime");
var Dropdown = RadixDropdown.Root;
var DropdownTrigger = RadixDropdown.Trigger;
function DropdownContent({ children, className }) {
  return /* @__PURE__ */ (0, import_jsx_runtime35.jsx)(RadixDropdown.Portal, { children: /* @__PURE__ */ (0, import_jsx_runtime35.jsx)(
    RadixDropdown.Content,
    {
      className: cn(
        "z-50 min-w-[8rem] overflow-hidden rounded-[var(--radius-md)]",
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
  return /* @__PURE__ */ (0, import_jsx_runtime35.jsx)(
    RadixDropdown.Item,
    {
      onSelect,
      className: cn(
        "relative flex cursor-pointer select-none items-center rounded-sm px-3 py-2",
        "text-sm text-[var(--color-text-primary)]",
        "hover:bg-[var(--color-surface-muted)] focus:outline-none",
        className
      ),
      children
    }
  );
}

// src/components/overlay/Popover.tsx
var RadixPopover = __toESM(require("@radix-ui/react-popover"), 1);
var import_jsx_runtime36 = require("react/jsx-runtime");
var Popover = RadixPopover.Root;
var PopoverTrigger = RadixPopover.Trigger;
function PopoverContent({ children, className }) {
  return /* @__PURE__ */ (0, import_jsx_runtime36.jsx)(RadixPopover.Portal, { children: /* @__PURE__ */ (0, import_jsx_runtime36.jsx)(
    RadixPopover.Content,
    {
      className: cn(
        "z-50 rounded-[var(--radius-md)]",
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
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  BackIcon,
  Button,
  ClockIcon,
  CommentIcon,
  CrossIcon,
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
  EmailIcon,
  FormItem,
  GitIcon,
  GradIcon,
  HorizontalDivider,
  IconButton,
  Input,
  Label,
  LikeIcon,
  LinkButton,
  LinkedInIcon,
  ListIcon,
  LoadingSpinner,
  MinusIcon,
  NotAuthorized,
  NotFound,
  NotLogin,
  PencilIcon,
  PlusIcon,
  Popover,
  PopoverContent,
  PopoverTrigger,
  ReplyIcon,
  RightArrowIcon,
  SecretIcon,
  TicketIcon,
  ToggleBar,
  TrashcanIcon,
  UnexpectedError,
  VerticalDivider,
  ViewIcon,
  cn,
  iconClass
});
//# sourceMappingURL=index.cjs.map