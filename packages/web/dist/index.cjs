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
  Accordion: () => Accordion,
  AccordionContent: () => AccordionContent,
  AccordionItem: () => AccordionItem,
  AccordionTrigger: () => AccordionTrigger,
  Alert: () => Alert,
  Avatar: () => Avatar,
  Badge: () => Badge,
  Button: () => Button,
  Calendar: () => Calendar2,
  Card: () => Card,
  CardContent: () => CardContent,
  CardDescription: () => CardDescription,
  CardFooter: () => CardFooter,
  CardHeader: () => CardHeader,
  CardTitle: () => CardTitle,
  Checkbox: () => Checkbox,
  Container: () => Container,
  DS_VERSION: () => DS_VERSION,
  DatePicker: () => DatePicker,
  DateRangePicker: () => DateRangePicker,
  Dialog: () => Dialog,
  DialogClose: () => DialogClose,
  DialogContent: () => DialogContent,
  DialogDescription: () => DialogDescription,
  DialogFooter: () => DialogFooter,
  DialogTitle: () => DialogTitle,
  DialogTrigger: () => DialogTrigger,
  Divider: () => Divider,
  Dropdown: () => Dropdown,
  DropdownContent: () => DropdownContent,
  DropdownGroup: () => DropdownGroup,
  DropdownItem: () => DropdownItem,
  DropdownSeparator: () => DropdownSeparator,
  DropdownTrigger: () => DropdownTrigger,
  FormItem: () => FormItem,
  Grid: () => Grid,
  Icon: () => Icon,
  IconButton: () => IconButton,
  Input: () => Input,
  Label: () => Label,
  LinkButton: () => LinkButton,
  LoadingSpinner: () => LoadingSpinner,
  OnlyMobileView: () => OnlyMobileView,
  Pagination: () => Pagination,
  Popover: () => Popover,
  PopoverContent: () => PopoverContent,
  PopoverTrigger: () => PopoverTrigger,
  RadioGroup: () => RadioGroup,
  RadioItem: () => RadioItem,
  Select: () => Select,
  SelectContent: () => SelectContent,
  SelectGroup: () => SelectGroup,
  SelectItem: () => SelectItem,
  SelectSeparator: () => SelectSeparator,
  SelectTrigger: () => SelectTrigger,
  Skeleton: () => Skeleton,
  StatusView: () => StatusView,
  Switch: () => Switch,
  Table: () => Table,
  TableBody: () => TableBody,
  TableCaption: () => TableCaption,
  TableCell: () => TableCell,
  TableFooter: () => TableFooter,
  TableHead: () => TableHead,
  TableHeader: () => TableHeader,
  TableMobileItem: () => TableMobileItem,
  TableMobileList: () => TableMobileList,
  TableRow: () => TableRow,
  Tabs: () => Tabs,
  TabsContent: () => TabsContent,
  TabsList: () => TabsList,
  TabsTrigger: () => TabsTrigger,
  Textarea: () => Textarea,
  Toaster: () => Toaster,
  ToggleGroup: () => ToggleGroup,
  Tooltip: () => Tooltip,
  alertVariants: () => alertVariants,
  avatarVariants: () => avatarVariants,
  badgeVariants: () => badgeVariants,
  buttonVariants: () => buttonVariants,
  cn: () => cn,
  tabsTriggerVariants: () => tabsTriggerVariants,
  toast: () => import_sonner.toast
});
module.exports = __toCommonJS(src_exports);

// src/utils/cn.ts
var import_clsx = require("clsx");
var import_tailwind_merge = require("tailwind-merge");
function cn(...inputs) {
  return (0, import_tailwind_merge.twMerge)((0, import_clsx.clsx)(inputs));
}

// src/components/display/Avatar.tsx
var import_react = require("react");
var import_class_variance_authority = require("class-variance-authority");

// src/components/icon/registry.ts
var import_lucide_react = require("lucide-react");

// src/components/icon/custom/GithubIcon.tsx
var import_jsx_runtime = require("react/jsx-runtime");
function GithubIcon({
  size = 24,
  className,
  ...props
}) {
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
    "svg",
    {
      xmlns: "http://www.w3.org/2000/svg",
      width: size,
      height: size,
      viewBox: "0 0 20 20",
      fill: "currentColor",
      className,
      ...props,
      children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M10,0 C15.523,0 20,4.59 20,10.253 C20,14.782 17.138,18.624 13.167,19.981 C12.66,20.082 12.48,19.762 12.48,19.489 C12.48,19.151 12.492,18.047 12.492,16.675 C12.492,15.719 12.172,15.095 11.813,14.777 C14.04,14.523 16.38,13.656 16.38,9.718 C16.38,8.598 15.992,7.684 15.35,6.966 C15.454,6.707 15.797,5.664 15.252,4.252 C15.252,4.252 14.414,3.977 12.505,5.303 C11.706,5.076 10.85,4.962 10,4.958 C9.15,4.962 8.295,5.076 7.497,5.303 C5.586,3.977 4.746,4.252 4.746,4.252 C4.203,5.664 4.546,6.707 4.649,6.966 C4.01,7.684 3.619,8.598 3.619,9.718 C3.619,13.646 5.954,14.526 8.175,14.785 C7.889,15.041 7.63,15.493 7.54,16.156 C6.97,16.418 5.522,16.871 4.63,15.304 C4.63,15.304 4.101,14.319 3.097,14.247 C3.097,14.247 2.122,14.234 3.029,14.87 C3.029,14.87 3.684,15.185 4.139,16.37 C4.139,16.37 4.726,18.2 7.508,17.58 C7.513,18.437 7.522,19.245 7.522,19.489 C7.522,19.76 7.338,20.077 6.839,19.982 C2.865,18.627 0,14.783 0,10.253 C0,4.59 4.478,0 10,0" })
    }
  );
}

// src/components/icon/custom/LinkedinIcon.tsx
var import_jsx_runtime2 = require("react/jsx-runtime");
function LinkedinIcon({
  size = 24,
  className,
  ...props
}) {
  return /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
    "svg",
    {
      xmlns: "http://www.w3.org/2000/svg",
      width: size,
      height: size,
      viewBox: "0 0 382 382",
      fill: "currentColor",
      className,
      ...props,
      children: /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("path", { d: "M347.445,0H34.555C15.471,0,0,15.471,0,34.555v312.889C0,366.529,15.471,382,34.555,382h312.889C366.529,382,382,366.529,382,347.444V34.555C382,15.471,366.529,0,347.445,0z M118.207,329.844c0,5.554-4.502,10.056-10.056,10.056H65.345c-5.554,0-10.056-4.502-10.056-10.056V150.403c0-5.554,4.502-10.056,10.056-10.056h42.806c5.554,0,10.056,4.502,10.056,10.056V329.844z M86.748,123.432c-22.459,0-40.666-18.207-40.666-40.666S64.289,42.1,86.748,42.1s40.666,18.207,40.666,40.666S109.208,123.432,86.748,123.432z M341.91,330.654c0,5.106-4.14,9.246-9.246,9.246H286.73c-5.106,0-9.246-4.14-9.246-9.246v-84.168c0-12.556,3.683-55.021-32.813-55.021c-28.309,0-34.051,29.066-35.204,42.11v97.079c0,5.106-4.139,9.246-9.246,9.246h-44.426c-5.106,0-9.246-4.14-9.246-9.246V149.593c0-5.106,4.14-9.246,9.246-9.246h44.426c5.106,0,9.246,4.14,9.246,9.246v15.655c10.497-15.753,26.097-27.912,59.312-27.912c73.552,0,73.131,68.716,73.131,106.472L341.91,330.654L341.91,330.654z" })
    }
  );
}

// src/components/icon/registry.ts
var registry = {
  "arrow-left": import_lucide_react.ArrowLeft,
  "arrow-right": import_lucide_react.ArrowRight,
  "calendar": import_lucide_react.Calendar,
  "check": import_lucide_react.Check,
  "chevron-left": import_lucide_react.ChevronLeft,
  "chevron-right": import_lucide_react.ChevronRight,
  "chevron-down": import_lucide_react.ChevronDown,
  "circle-check": import_lucide_react.CircleCheck,
  "circle-minus": import_lucide_react.CircleMinus,
  "circle-plus": import_lucide_react.CirclePlus,
  "circle-x": import_lucide_react.CircleX,
  "clipboard-check": import_lucide_react.ClipboardCheck,
  "clipboard-copy": import_lucide_react.ClipboardCopy,
  "clock-9": import_lucide_react.Clock9,
  "external-link": import_lucide_react.ExternalLink,
  "eye": import_lucide_react.Eye,
  "file-x": import_lucide_react.FileX,
  "graduation-cap": import_lucide_react.GraduationCap,
  "info": import_lucide_react.Info,
  "list": import_lucide_react.List,
  "lock": import_lucide_react.Lock,
  "log-in": import_lucide_react.LogIn,
  "mail": import_lucide_react.Mail,
  "menu": import_lucide_react.Menu,
  "message-square": import_lucide_react.MessageSquare,
  "minus": import_lucide_react.Minus,
  "pencil": import_lucide_react.Pencil,
  "plus": import_lucide_react.Plus,
  "reply": import_lucide_react.Reply,
  "shield-x": import_lucide_react.ShieldX,
  "shopping-cart": import_lucide_react.ShoppingCart,
  "smartphone": import_lucide_react.Smartphone,
  "thumbs-up": import_lucide_react.ThumbsUp,
  "ticket": import_lucide_react.Ticket,
  "trash-2": import_lucide_react.Trash2,
  "triangle-alert": import_lucide_react.TriangleAlert,
  "user-round": import_lucide_react.UserRound,
  "x": import_lucide_react.X,
  "github": GithubIcon,
  "linkedin": LinkedinIcon
};

// src/components/icon/Icon.tsx
var import_jsx_runtime3 = require("react/jsx-runtime");
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
    return /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
      LucideComponent,
      {
        size: px,
        className,
        "aria-label": label,
        role: "img"
      }
    );
  }
  return /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
    LucideComponent,
    {
      size: px,
      className,
      "aria-hidden": "true"
    }
  );
}

// src/components/display/Avatar.tsx
var import_jsx_runtime4 = require("react/jsx-runtime");
var avatarVariants = (0, import_class_variance_authority.cva)(
  "inline-flex items-center justify-center rounded-full overflow-hidden shrink-0 bg-brand-primary text-brand-foreground",
  {
    variants: {
      size: {
        sm: "w-8 h-8",
        md: "w-10 h-10",
        lg: "w-14 h-14"
      }
    },
    defaultVariants: {
      size: "md"
    }
  }
);
function getInitials(name) {
  const parts = name.trim().split(/\s+/);
  if (parts.length === 1) return parts[0][0].toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}
var initialsTextClass = {
  sm: "type-caption",
  md: "type-body-sm",
  lg: "type-body"
};
var iconSize = {
  sm: "xs",
  md: "sm",
  lg: "md"
};
function Avatar({ src, name, size = "md", className }) {
  const [imgError, setImgError] = (0, import_react.useState)(false);
  const resolvedSize = size ?? "md";
  const showImage = src && !imgError;
  const showInitials = !showImage && name;
  if (showImage) {
    return /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(
      "span",
      {
        className: cn(avatarVariants({ size }), className),
        role: "img",
        "aria-label": name,
        children: /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(
          "img",
          {
            src,
            alt: name ?? "",
            className: "w-full h-full object-cover",
            onError: () => setImgError(true)
          }
        )
      }
    );
  }
  if (showInitials) {
    return /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(
      "span",
      {
        className: cn(avatarVariants({ size }), className),
        role: "img",
        "aria-label": name,
        children: /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("span", { className: initialsTextClass[resolvedSize], "aria-hidden": "true", children: getInitials(name) })
      }
    );
  }
  return /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(
    "span",
    {
      className: cn(avatarVariants({ size }), className),
      role: "img",
      "aria-label": "User avatar",
      children: /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(Icon, { name: "user-round", size: iconSize[resolvedSize] })
    }
  );
}

// src/components/display/Badge.tsx
var import_class_variance_authority2 = require("class-variance-authority");
var import_react_slot = require("@radix-ui/react-slot");
var import_jsx_runtime5 = require("react/jsx-runtime");
var badgeVariants = (0, import_class_variance_authority2.cva)(
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
  const Comp = asChild ? import_react_slot.Slot : "span";
  return /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(Comp, { className: cn(badgeVariants({ variant, size }), className), ...props });
}

// src/components/display/Accordion.tsx
var RadixAccordion = __toESM(require("@radix-ui/react-accordion"), 1);
var import_jsx_runtime6 = require("react/jsx-runtime");
function Accordion({ className, ...props }) {
  const rootProps = props.type === "multiple" ? { ...props, type: "multiple" } : { ...props, type: "single", collapsible: true };
  return /* @__PURE__ */ (0, import_jsx_runtime6.jsx)(
    RadixAccordion.Root,
    {
      ...rootProps,
      className: cn("divide-y divide-border", className)
    }
  );
}
function AccordionItem({
  className,
  ...props
}) {
  return /* @__PURE__ */ (0, import_jsx_runtime6.jsx)(
    RadixAccordion.Item,
    {
      ...props,
      className: cn("", className)
    }
  );
}
function AccordionTrigger({
  children,
  showChevron = true,
  className
}) {
  return /* @__PURE__ */ (0, import_jsx_runtime6.jsx)(RadixAccordion.Header, { asChild: true, children: /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("div", { children: /* @__PURE__ */ (0, import_jsx_runtime6.jsxs)(
    RadixAccordion.Trigger,
    {
      className: cn(
        "flex w-full items-center justify-between py-4 type-body !font-semibold text-foreground",
        "underline decoration-transparent decoration-2 underline-offset-4 transition-[text-decoration-color] duration-150",
        "hover:decoration-brand-accent",
        "data-[state=open]:text-brand-primary",
        "disabled:pointer-events-none disabled:text-disabled-foreground",
        "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus-ring",
        "focus-visible:shadow-[0_0_0_4px_var(--color-brand-primary)]",
        "[&[data-state=open]>svg]:rotate-180",
        className
      ),
      children: [
        children,
        showChevron && /* @__PURE__ */ (0, import_jsx_runtime6.jsx)(
          Icon,
          {
            name: "chevron-down",
            size: "sm",
            className: "shrink-0 transition-transform duration-200"
          }
        )
      ]
    }
  ) }) });
}
function AccordionContent({
  children,
  className
}) {
  return /* @__PURE__ */ (0, import_jsx_runtime6.jsx)(
    RadixAccordion.Content,
    {
      className: cn(
        "overflow-hidden",
        "data-[state=open]:animate-[accordion-down_200ms_ease-out]",
        "data-[state=closed]:animate-[accordion-up_200ms_ease-in]"
      ),
      children: /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("div", { className: cn("pb-4 type-body text-foreground", className), children })
    }
  );
}

// src/components/display/Card.tsx
var import_jsx_runtime7 = require("react/jsx-runtime");
function Card({ className, ...props }) {
  return /* @__PURE__ */ (0, import_jsx_runtime7.jsx)(
    "div",
    {
      className: cn(
        "flex flex-col bg-surface-subtle border border-border rounded-md transition-colors duration-200 hover:border-border-strong hover:bg-surface-muted",
        className
      ),
      ...props
    }
  );
}
function CardHeader({ className, ...props }) {
  return /* @__PURE__ */ (0, import_jsx_runtime7.jsx)("div", { className: cn("p-4", className), ...props });
}
function CardTitle({
  as: Component = "h3",
  className,
  ...props
}) {
  return /* @__PURE__ */ (0, import_jsx_runtime7.jsx)(
    Component,
    {
      className: cn("type-h4 !font-semibold text-foreground", className),
      ...props
    }
  );
}
function CardDescription({
  className,
  ...props
}) {
  return /* @__PURE__ */ (0, import_jsx_runtime7.jsx)(
    "p",
    {
      className: cn("type-body-sm text-muted-foreground", className),
      ...props
    }
  );
}
function CardContent({ className, ...props }) {
  return /* @__PURE__ */ (0, import_jsx_runtime7.jsx)("div", { className: cn("flex-1 px-4 pb-4", className), ...props });
}
function CardFooter({ className, ...props }) {
  return /* @__PURE__ */ (0, import_jsx_runtime7.jsx)(
    "div",
    {
      className: cn("flex items-center gap-2 px-4 pb-4", className),
      ...props
    }
  );
}

// src/components/display/Table.tsx
var React = __toESM(require("react"), 1);
var import_jsx_runtime8 = require("react/jsx-runtime");
var Table = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime8.jsx)("div", { className: "w-full overflow-x-auto", children: /* @__PURE__ */ (0, import_jsx_runtime8.jsx)(
  "table",
  {
    ref,
    className: cn("w-full caption-bottom type-body-sm text-foreground", className),
    ...props
  }
) }));
Table.displayName = "Table";
var TableHeader = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime8.jsx)(
  "thead",
  {
    ref,
    className: cn("border-b border-brand-primary", className),
    ...props
  }
));
TableHeader.displayName = "TableHeader";
var TableBody = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime8.jsx)(
  "tbody",
  {
    ref,
    className: cn("divide-y divide-border", className),
    ...props
  }
));
TableBody.displayName = "TableBody";
var TableRow = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime8.jsx)(
  "tr",
  {
    ref,
    className: cn("transition-colors [tbody_&]:hover:bg-brand-accent-subtle", className),
    ...props
  }
));
TableRow.displayName = "TableRow";
var TableHead = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime8.jsx)(
  "th",
  {
    ref,
    className: cn("px-4 py-3 text-left type-label text-brand-primary", className),
    ...props
  }
));
TableHead.displayName = "TableHead";
var TableCell = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime8.jsx)(
  "td",
  {
    ref,
    className: cn("px-4 py-3 text-foreground", className),
    ...props
  }
));
TableCell.displayName = "TableCell";
var TableCaption = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime8.jsx)(
  "caption",
  {
    ref,
    className: cn("mt-4 type-caption text-muted-foreground", className),
    ...props
  }
));
TableCaption.displayName = "TableCaption";
var TableFooter = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime8.jsx)(
  "tfoot",
  {
    ref,
    className: cn("border-t border-border-strong bg-surface-subtle type-label text-foreground", className),
    ...props
  }
));
TableFooter.displayName = "TableFooter";
var TableMobileList = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime8.jsx)(
  "ol",
  {
    ref,
    className: cn("divide-y divide-border", className),
    ...props
  }
));
TableMobileList.displayName = "TableMobileList";
var TableMobileItem = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime8.jsx)(
  "li",
  {
    ref,
    className: cn("flex flex-col gap-1 px-4 py-3 text-foreground hover:bg-brand-accent-subtle transition-colors", className),
    ...props
  }
));
TableMobileItem.displayName = "TableMobileItem";

// src/components/button/Button.tsx
var import_class_variance_authority3 = require("class-variance-authority");
var import_jsx_runtime9 = require("react/jsx-runtime");
var buttonVariants = (0, import_class_variance_authority3.cva)(
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
          "bg-brand-primary text-brand-foreground border border-brand-primary !font-bold",
          "hover:bg-brand-primary-hover hover:border-brand-primary-hover",
          "active:bg-brand-primary-pressed active:border-brand-primary-pressed"
        ],
        secondary: [
          "bg-surface-subtle text-foreground border border-border !font-bold",
          "hover:bg-surface-muted hover:border-border-strong",
          "active:bg-border active:border-border-strong"
        ],
        tertiary: [
          "bg-transparent text-foreground border border-transparent",
          "hover:bg-surface-subtle",
          "active:bg-surface-muted"
        ],
        destructive: [
          "bg-error text-error-foreground border border-error !font-bold",
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
  return /* @__PURE__ */ (0, import_jsx_runtime9.jsx)(
    "button",
    {
      type,
      className: cn(buttonVariants({ variant, size }), className),
      ...props
    }
  );
}

// src/components/button/LinkButton.tsx
var import_jsx_runtime10 = require("react/jsx-runtime");
function LinkButton({
  variant,
  size,
  disabled = false,
  className,
  children,
  ...props
}) {
  if (disabled) {
    return /* @__PURE__ */ (0, import_jsx_runtime10.jsx)(
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
  return /* @__PURE__ */ (0, import_jsx_runtime10.jsx)(
    "a",
    {
      className: cn(buttonVariants({ variant, size }), "hover:underline", className),
      ...props,
      children
    }
  );
}

// src/components/button/IconButton.tsx
var import_jsx_runtime11 = require("react/jsx-runtime");
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
  return /* @__PURE__ */ (0, import_jsx_runtime11.jsx)(
    Button,
    {
      variant,
      className: cn(sizeStyles[size], touchTarget, className),
      ...rest,
      children: /* @__PURE__ */ (0, import_jsx_runtime11.jsx)(Icon, { name: icon, size: iconSizeMap[size] })
    }
  );
}

// src/components/form/Input.tsx
var import_jsx_runtime12 = require("react/jsx-runtime");
function Input({ invalid = false, className, type = "text", ...props }) {
  return /* @__PURE__ */ (0, import_jsx_runtime12.jsx)(
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
var import_jsx_runtime13 = require("react/jsx-runtime");
function Label({ htmlFor, id, required = false, className, children }) {
  return /* @__PURE__ */ (0, import_jsx_runtime13.jsxs)(
    "label",
    {
      htmlFor,
      id,
      className: cn(
        "type-label text-foreground",
        className
      ),
      children: [
        children,
        required && /* @__PURE__ */ (0, import_jsx_runtime13.jsx)("span", { className: "ml-0.5 text-error", "aria-hidden": "true", children: "*" })
      ]
    }
  );
}

// src/components/form/FormItem.tsx
var import_jsx_runtime14 = require("react/jsx-runtime");
function FormItem({
  htmlFor,
  label,
  required = false,
  error,
  description,
  className,
  children
}) {
  return /* @__PURE__ */ (0, import_jsx_runtime14.jsxs)("div", { className: cn("flex flex-col gap-2", className), children: [
    /* @__PURE__ */ (0, import_jsx_runtime14.jsx)(Label, { htmlFor, id: `${htmlFor}-label`, required, children: label }),
    children,
    description && !error && /* @__PURE__ */ (0, import_jsx_runtime14.jsx)(
      "p",
      {
        id: `${htmlFor}-description`,
        className: "type-caption text-muted-foreground",
        children: description
      }
    ),
    error && /* @__PURE__ */ (0, import_jsx_runtime14.jsx)(
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
var import_jsx_runtime15 = require("react/jsx-runtime");
function Checkbox({ invalid = false, text, className, disabled, ...props }) {
  const control = /* @__PURE__ */ (0, import_jsx_runtime15.jsxs)("span", { className: cn("relative inline-flex items-center justify-center size-5", !text && className), children: [
    /* @__PURE__ */ (0, import_jsx_runtime15.jsx)(
      "input",
      {
        type: "checkbox",
        "aria-invalid": invalid,
        disabled,
        className: "peer absolute inset-0 opacity-0 cursor-pointer disabled:cursor-default",
        ...props
      }
    ),
    /* @__PURE__ */ (0, import_jsx_runtime15.jsx)(
      "span",
      {
        className: cn(
          "size-5 rounded-md border border-border-strong bg-surface transition-colors",
          "peer-checked:bg-brand-primary peer-checked:border-brand-primary",
          "peer-focus-visible:outline-none peer-focus-visible:border-brand-primary",
          "peer-disabled:pointer-events-none peer-disabled:bg-surface-subtle peer-disabled:border-border",
          "peer-disabled:peer-checked:bg-disabled-foreground peer-disabled:peer-checked:border-disabled-foreground",
          invalid && "border-error peer-focus-visible:border-error"
        )
      }
    ),
    /* @__PURE__ */ (0, import_jsx_runtime15.jsx)(
      "svg",
      {
        "aria-hidden": "true",
        viewBox: "0 0 14 14",
        fill: "none",
        className: "absolute size-3.5 text-brand-foreground opacity-0 peer-checked:opacity-100 pointer-events-none transition-opacity",
        children: /* @__PURE__ */ (0, import_jsx_runtime15.jsx)(
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
  if (!text) return control;
  return /* @__PURE__ */ (0, import_jsx_runtime15.jsxs)("label", { className: cn("flex items-center gap-2", className), children: [
    control,
    /* @__PURE__ */ (0, import_jsx_runtime15.jsx)("span", { className: cn(
      "type-body-sm text-foreground",
      disabled && "text-disabled-foreground"
    ), children: text })
  ] });
}

// src/components/form/Select.tsx
var RadixSelect = __toESM(require("@radix-ui/react-select"), 1);
var import_jsx_runtime16 = require("react/jsx-runtime");
function Select(props) {
  return /* @__PURE__ */ (0, import_jsx_runtime16.jsx)(RadixSelect.Root, { ...props });
}
function SelectTrigger({ placeholder, invalid = false, "aria-labelledby": ariaLabelledBy, className }) {
  return /* @__PURE__ */ (0, import_jsx_runtime16.jsxs)(
    RadixSelect.Trigger,
    {
      "aria-invalid": invalid,
      "aria-labelledby": ariaLabelledBy,
      className: cn(
        "flex w-full items-center justify-between rounded-md border border-border-strong bg-surface px-3 py-2 type-body-sm text-foreground transition-colors",
        "placeholder:text-muted-foreground",
        "focus-visible:outline-none focus-visible:border-brand-primary",
        "disabled:pointer-events-none disabled:text-disabled-foreground disabled:bg-surface-subtle",
        invalid && "border-error focus-visible:border-error",
        className
      ),
      children: [
        /* @__PURE__ */ (0, import_jsx_runtime16.jsx)(RadixSelect.Value, { placeholder }),
        /* @__PURE__ */ (0, import_jsx_runtime16.jsx)(RadixSelect.Icon, { asChild: true, children: /* @__PURE__ */ (0, import_jsx_runtime16.jsx)(Icon, { name: "chevron-down", size: "sm", className: "flex-shrink-0" }) })
      ]
    }
  );
}
function SelectContent({ children, className, position = "popper" }) {
  return /* @__PURE__ */ (0, import_jsx_runtime16.jsx)(RadixSelect.Portal, { children: /* @__PURE__ */ (0, import_jsx_runtime16.jsx)(
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
      children: /* @__PURE__ */ (0, import_jsx_runtime16.jsx)(
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
  return /* @__PURE__ */ (0, import_jsx_runtime16.jsxs)(
    RadixSelect.Item,
    {
      value,
      disabled,
      className: cn(
        "relative flex w-full cursor-pointer select-none items-center rounded-sm py-2 pl-7 pr-3 type-body-sm text-foreground",
        "hover:bg-brand-accent-subtle focus:bg-brand-accent-subtle focus:outline-none",
        "data-[disabled]:pointer-events-none data-[disabled]:text-disabled-foreground",
        className
      ),
      children: [
        /* @__PURE__ */ (0, import_jsx_runtime16.jsx)("span", { className: "absolute left-2 flex items-center text-brand-primary", children: /* @__PURE__ */ (0, import_jsx_runtime16.jsx)(RadixSelect.ItemIndicator, { children: /* @__PURE__ */ (0, import_jsx_runtime16.jsx)(Icon, { name: "check", size: "sm" }) }) }),
        /* @__PURE__ */ (0, import_jsx_runtime16.jsx)(RadixSelect.ItemText, { children })
      ]
    }
  );
}
function SelectGroup({ label, children }) {
  return /* @__PURE__ */ (0, import_jsx_runtime16.jsxs)(RadixSelect.Group, { children: [
    /* @__PURE__ */ (0, import_jsx_runtime16.jsx)(RadixSelect.Label, { className: "px-3 py-2 type-caption text-muted-foreground", children: label }),
    children
  ] });
}
function SelectSeparator() {
  return /* @__PURE__ */ (0, import_jsx_runtime16.jsx)(RadixSelect.Separator, { className: "mx-1 my-1 h-px bg-border" });
}

// src/components/form/Switch.tsx
var import_jsx_runtime17 = require("react/jsx-runtime");
function Switch({
  invalid = false,
  size = "default",
  text,
  className,
  disabled,
  ...props
}) {
  const isSmall = size === "sm";
  const control = /* @__PURE__ */ (0, import_jsx_runtime17.jsxs)(
    "span",
    {
      className: cn(
        "relative inline-flex items-center",
        isSmall ? "h-4 w-7" : "h-6 w-10",
        !text && className
      ),
      children: [
        /* @__PURE__ */ (0, import_jsx_runtime17.jsx)(
          "input",
          {
            type: "checkbox",
            role: "switch",
            "aria-invalid": invalid,
            disabled,
            className: "peer absolute inset-0 opacity-0 cursor-pointer disabled:cursor-default",
            ...props
          }
        ),
        /* @__PURE__ */ (0, import_jsx_runtime17.jsx)(
          "span",
          {
            className: cn(
              "pointer-events-none absolute inset-0 rounded-full border transition-colors",
              "border-border-strong bg-surface-subtle",
              "peer-checked:bg-brand-primary peer-checked:border-brand-primary",
              "peer-focus-visible:outline-none peer-focus-visible:border-brand-primary",
              "peer-disabled:pointer-events-none peer-disabled:bg-surface-subtle peer-disabled:border-border",
              "peer-disabled:peer-checked:bg-disabled-foreground peer-disabled:peer-checked:border-disabled-foreground",
              invalid && "border-error peer-focus-visible:border-error"
            )
          }
        ),
        /* @__PURE__ */ (0, import_jsx_runtime17.jsx)(
          "span",
          {
            className: cn(
              "pointer-events-none absolute rounded-full bg-brand-primary transition-all duration-200",
              "peer-checked:bg-surface",
              "peer-disabled:bg-disabled-foreground",
              "peer-disabled:peer-checked:bg-surface",
              isSmall ? "left-0.5 size-2.5 peer-checked:left-[calc(100%-0.125rem-0.75rem)] peer-checked:size-3" : "left-1 size-4 peer-checked:left-[calc(100%-0.25rem-1.25rem)] peer-checked:size-5"
            )
          }
        )
      ]
    }
  );
  if (!text) return control;
  return /* @__PURE__ */ (0, import_jsx_runtime17.jsxs)("label", { className: cn("flex items-center gap-2", className), children: [
    control,
    /* @__PURE__ */ (0, import_jsx_runtime17.jsx)("span", { className: cn(
      isSmall ? "type-caption" : "type-body-sm",
      "text-foreground",
      disabled && "text-disabled-foreground"
    ), children: text })
  ] });
}

// src/components/form/Textarea.tsx
var import_jsx_runtime18 = require("react/jsx-runtime");
function Textarea({ invalid = false, className, rows = 3, ...props }) {
  return /* @__PURE__ */ (0, import_jsx_runtime18.jsx)(
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
var RadixRadioGroup = __toESM(require("@radix-ui/react-radio-group"), 1);
var import_jsx_runtime19 = require("react/jsx-runtime");
function RadioGroup({ invalid = false, orientation = "vertical", className, ...props }) {
  return /* @__PURE__ */ (0, import_jsx_runtime19.jsx)(
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
function RadioItem({ value, text, disabled, className }) {
  return /* @__PURE__ */ (0, import_jsx_runtime19.jsxs)("label", { className: cn("flex items-center gap-2", className), children: [
    /* @__PURE__ */ (0, import_jsx_runtime19.jsx)(
      RadixRadioGroup.Item,
      {
        value,
        disabled,
        className: cn(
          "relative flex items-center justify-center size-5 rounded-full border border-border-strong bg-surface transition-colors",
          "data-[state=checked]:bg-brand-primary data-[state=checked]:border-brand-primary",
          "focus-visible:outline-none focus-visible:border-brand-primary",
          "disabled:pointer-events-none disabled:bg-surface-subtle disabled:border-border",
          "disabled:data-[state=checked]:bg-disabled-foreground disabled:data-[state=checked]:border-disabled-foreground",
          "group-data-[invalid]:border-error group-data-[invalid]:focus-visible:border-error"
        ),
        children: /* @__PURE__ */ (0, import_jsx_runtime19.jsx)(RadixRadioGroup.Indicator, { className: "flex items-center justify-center", children: /* @__PURE__ */ (0, import_jsx_runtime19.jsx)("span", { className: "size-2.5 rounded-full bg-surface" }) })
      }
    ),
    /* @__PURE__ */ (0, import_jsx_runtime19.jsx)("span", { className: cn(
      "type-body-sm text-foreground",
      disabled && "text-disabled-foreground"
    ), children: text })
  ] });
}

// src/components/layout/Container.tsx
var import_class_variance_authority4 = require("class-variance-authority");
var import_jsx_runtime20 = require("react/jsx-runtime");
var containerVariants = (0, import_class_variance_authority4.cva)("mx-auto w-full px-4 md:px-6 lg:px-8", {
  variants: {
    size: {
      default: "max-w-screen-2xl",
      md: "max-w-screen-md",
      sm: "max-w-screen-sm",
      prose: "max-w-prose"
    }
  },
  defaultVariants: {
    size: "default"
  }
});
function Container({
  as: Component = "div",
  size,
  className,
  children,
  ...props
}) {
  return /* @__PURE__ */ (0, import_jsx_runtime20.jsx)(
    Component,
    {
      className: cn(containerVariants({ size }), className),
      ...props,
      children
    }
  );
}

// src/components/layout/Grid.tsx
var import_jsx_runtime21 = require("react/jsx-runtime");
var baseColsMap = {
  1: "grid-cols-1",
  2: "grid-cols-2",
  3: "grid-cols-3",
  4: "grid-cols-4",
  5: "grid-cols-5",
  6: "grid-cols-6"
};
var mdColsMap = {
  1: "md:grid-cols-1",
  2: "md:grid-cols-2",
  3: "md:grid-cols-3",
  4: "md:grid-cols-4",
  5: "md:grid-cols-5",
  6: "md:grid-cols-6"
};
var lgColsMap = {
  1: "lg:grid-cols-1",
  2: "lg:grid-cols-2",
  3: "lg:grid-cols-3",
  4: "lg:grid-cols-4",
  5: "lg:grid-cols-5",
  6: "lg:grid-cols-6"
};
var gapMap = {
  element: "gap-2",
  component: "gap-4",
  section: "gap-6"
};
function Grid({
  columns = 1,
  gap = "component",
  className,
  children,
  ...props
}) {
  const cols = typeof columns === "number" ? { base: columns } : columns;
  return /* @__PURE__ */ (0, import_jsx_runtime21.jsx)(
    "div",
    {
      className: cn(
        "grid",
        cols.base && baseColsMap[cols.base],
        cols.md && mdColsMap[cols.md],
        cols.lg && lgColsMap[cols.lg],
        gapMap[gap],
        className
      ),
      ...props,
      children
    }
  );
}

// src/components/feedback/Alert.tsx
var import_class_variance_authority5 = require("class-variance-authority");
var import_jsx_runtime22 = require("react/jsx-runtime");
var alertVariants = (0, import_class_variance_authority5.cva)(
  "w-full flex items-start gap-2 rounded-md border px-3 py-3",
  {
    variants: {
      variant: {
        info: "border-info bg-info-subtle",
        success: "border-success bg-success-subtle",
        warning: "border-warning bg-warning-subtle",
        error: "border-error bg-error-subtle"
      }
    },
    defaultVariants: {
      variant: "info"
    }
  }
);
var variantIcons = {
  info: "info",
  success: "circle-check",
  warning: "triangle-alert",
  error: "circle-x"
};
var variantIconColors = {
  info: "text-info",
  success: "text-success",
  warning: "text-warning",
  error: "text-error"
};
function Alert({
  variant = "info",
  title,
  icon,
  className,
  children,
  ...props
}) {
  const resolvedIcon = icon === null ? null : icon ?? variantIcons[variant];
  return /* @__PURE__ */ (0, import_jsx_runtime22.jsxs)("div", { className: cn(alertVariants({ variant }), className), ...props, children: [
    resolvedIcon && /* @__PURE__ */ (0, import_jsx_runtime22.jsx)("div", { className: cn("shrink-0 mt-0.5", variantIconColors[variant]), children: /* @__PURE__ */ (0, import_jsx_runtime22.jsx)(Icon, { name: resolvedIcon, size: "sm" }) }),
    /* @__PURE__ */ (0, import_jsx_runtime22.jsxs)("div", { className: "flex flex-col gap-1 min-w-0", children: [
      title && /* @__PURE__ */ (0, import_jsx_runtime22.jsx)("p", { className: "type-body-sm text-foreground", children: /* @__PURE__ */ (0, import_jsx_runtime22.jsx)("strong", { children: title }) }),
      children && /* @__PURE__ */ (0, import_jsx_runtime22.jsx)("div", { className: "type-body-sm text-foreground", children })
    ] })
  ] });
}

// src/components/feedback/LoadingSpinner.tsx
var import_jsx_runtime23 = require("react/jsx-runtime");
var sizeClasses = {
  sm: "ds-spinner-sm",
  md: "ds-spinner-md",
  lg: "ds-spinner-lg"
};
function LoadingSpinner({
  size = "md",
  label = "Loading",
  showLabel = false,
  className
}) {
  return /* @__PURE__ */ (0, import_jsx_runtime23.jsxs)(
    "div",
    {
      className: cn(
        "inline-flex flex-col items-center justify-center gap-2",
        className
      ),
      children: [
        /* @__PURE__ */ (0, import_jsx_runtime23.jsx)(
          "div",
          {
            className: cn("ds-spinner", sizeClasses[size]),
            role: "status",
            "aria-label": label
          }
        ),
        showLabel && /* @__PURE__ */ (0, import_jsx_runtime23.jsx)("p", { className: "type-body-sm !font-semibold text-brand-primary", children: label })
      ]
    }
  );
}

// src/components/feedback/Skeleton.tsx
var import_jsx_runtime24 = require("react/jsx-runtime");
function Skeleton({
  variant = "rectangular",
  className,
  style,
  ...props
}) {
  return /* @__PURE__ */ (0, import_jsx_runtime24.jsx)(
    "div",
    {
      className: cn(
        "bg-border",
        variant === "circular" ? "rounded-full" : "rounded-md w-full",
        className
      ),
      style: { animation: "ds-pulse 2s ease-in-out infinite", ...style },
      ...props
    }
  );
}

// src/components/feedback/StatusView.tsx
var import_jsx_runtime25 = require("react/jsx-runtime");
var variantDefaults = {
  "not-found": {
    icon: "file-x",
    title: "\uD398\uC774\uC9C0\uB97C \uCC3E\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4",
    description: "\uC694\uCCAD\uD558\uC2E0 \uD398\uC774\uC9C0\uAC00 \uC874\uC7AC\uD558\uC9C0 \uC54A\uAC70\uB098 \uC774\uB3D9\uB418\uC5C8\uC2B5\uB2C8\uB2E4"
  },
  "not-authorized": {
    icon: "shield-x",
    title: "\uC811\uADFC \uBD88\uAC00",
    description: "\uAD8C\uD55C\uC774 \uC5C6\uC2B5\uB2C8\uB2E4"
  },
  "not-logged-in": {
    icon: "log-in",
    title: "\uB85C\uADF8\uC778 \uD544\uC694",
    description: "\uB85C\uADF8\uC778 \uD6C4 \uC774\uC6A9\uD574 \uC8FC\uC138\uC694"
  },
  error: {
    icon: "triangle-alert",
    title: "\uC624\uB958 \uBC1C\uC0DD",
    description: "\uC608\uAE30\uCE58 \uBABB\uD55C \uC624\uB958\uAC00 \uBC1C\uC0DD\uD588\uC2B5\uB2C8\uB2E4"
  }
};
function StatusView({
  variant,
  code,
  icon,
  title,
  description,
  action,
  className
}) {
  const defaults = variantDefaults[variant];
  const resolvedIcon = icon ?? defaults.icon;
  const resolvedTitle = title ?? defaults.title;
  const resolvedDescription = description ?? defaults.description;
  return /* @__PURE__ */ (0, import_jsx_runtime25.jsx)(
    "div",
    {
      role: "status",
      "aria-live": "polite",
      className: cn(
        "inline-flex flex-col items-center justify-center w-full h-full",
        "text-center px-4",
        className
      ),
      children: /* @__PURE__ */ (0, import_jsx_runtime25.jsxs)("div", { className: "flex flex-col items-center gap-4 max-w-sm", children: [
        code && /* @__PURE__ */ (0, import_jsx_runtime25.jsx)("p", { className: "type-display font-sejong-bold tracking-tight text-brand-primary", children: code }),
        !code && /* @__PURE__ */ (0, import_jsx_runtime25.jsx)("div", { className: "text-brand-primary", children: /* @__PURE__ */ (0, import_jsx_runtime25.jsx)(Icon, { name: resolvedIcon, size: "xl" }) }),
        /* @__PURE__ */ (0, import_jsx_runtime25.jsxs)("div", { className: "flex flex-col items-center gap-2", children: [
          /* @__PURE__ */ (0, import_jsx_runtime25.jsxs)("p", { className: "flex items-center gap-2 type-h2 text-brand-primary", children: [
            code && /* @__PURE__ */ (0, import_jsx_runtime25.jsx)("span", { className: "text-brand-primary", children: /* @__PURE__ */ (0, import_jsx_runtime25.jsx)(Icon, { name: resolvedIcon, size: "md" }) }),
            resolvedTitle
          ] }),
          /* @__PURE__ */ (0, import_jsx_runtime25.jsx)("p", { className: "type-body text-muted-foreground", children: resolvedDescription })
        ] }),
        action && /* @__PURE__ */ (0, import_jsx_runtime25.jsx)("div", { className: "mt-2", children: action })
      ] })
    }
  );
}

// src/components/feedback/Toast.tsx
var import_sonner = require("sonner");
var import_jsx_runtime26 = require("react/jsx-runtime");
function Toaster({
  position = "top-center",
  duration = 4e3,
  ...props
}) {
  return /* @__PURE__ */ (0, import_jsx_runtime26.jsx)(
    import_sonner.Toaster,
    {
      position,
      duration,
      closeButton: false,
      theme: "light",
      icons: {
        success: /* @__PURE__ */ (0, import_jsx_runtime26.jsx)(Icon, { name: "circle-check", size: "sm" }),
        info: /* @__PURE__ */ (0, import_jsx_runtime26.jsx)(Icon, { name: "info", size: "sm" }),
        warning: /* @__PURE__ */ (0, import_jsx_runtime26.jsx)(Icon, { name: "triangle-alert", size: "sm" }),
        error: /* @__PURE__ */ (0, import_jsx_runtime26.jsx)(Icon, { name: "circle-x", size: "sm" })
      },
      toastOptions: {
        unstyled: true,
        classNames: {
          toast: "w-full flex items-center gap-2 rounded-md border border-border bg-surface px-3 py-3 shadow-lg",
          title: "type-label text-foreground",
          description: "type-body-sm text-muted-foreground",
          actionButton: "type-caption text-brand-primary hover:underline cursor-pointer focus-visible:outline-2 focus-visible:outline-focus-ring focus-visible:outline-offset-2 focus-visible:shadow-[0_0_0_4px_var(--color-brand-primary)]",
          cancelButton: "type-caption text-muted-foreground hover:text-foreground cursor-pointer focus-visible:outline-2 focus-visible:outline-focus-ring focus-visible:outline-offset-2 focus-visible:shadow-[0_0_0_4px_var(--color-brand-primary)]",
          success: "!border-success !bg-success-subtle",
          error: "!border-error !bg-error-subtle",
          warning: "!border-warning !bg-warning-subtle",
          info: "!border-info !bg-info-subtle",
          icon: "relative shrink-0 flex items-center w-4 h-4",
          content: "flex flex-1 flex-col gap-1 min-w-0"
        }
      },
      ...props
    }
  );
}

// src/components/overlay/Dialog.tsx
var RadixDialog = __toESM(require("@radix-ui/react-dialog"), 1);
var import_jsx_runtime27 = require("react/jsx-runtime");
function Dialog(props) {
  return /* @__PURE__ */ (0, import_jsx_runtime27.jsx)(RadixDialog.Root, { ...props });
}
function DialogTrigger(props) {
  return /* @__PURE__ */ (0, import_jsx_runtime27.jsx)(RadixDialog.Trigger, { ...props });
}
function DialogClose(props) {
  return /* @__PURE__ */ (0, import_jsx_runtime27.jsx)(RadixDialog.Close, { ...props });
}
var sizeMap2 = {
  sm: "max-w-sm",
  md: "max-w-lg",
  lg: "max-w-2xl",
  full: "max-w-full"
};
function DialogContent({
  children,
  size = "md",
  showCloseButton = true,
  className
}) {
  return /* @__PURE__ */ (0, import_jsx_runtime27.jsxs)(RadixDialog.Portal, { children: [
    /* @__PURE__ */ (0, import_jsx_runtime27.jsx)(
      RadixDialog.Overlay,
      {
        className: cn(
          "fixed inset-0 z-50 bg-overlay",
          "data-[state=open]:animate-[dialog-overlay-in_150ms_ease-out]",
          "data-[state=closed]:animate-[dialog-overlay-out_100ms_ease-in]"
        )
      }
    ),
    /* @__PURE__ */ (0, import_jsx_runtime27.jsx)("div", { className: "fixed inset-0 z-50 flex items-center justify-center p-4", children: /* @__PURE__ */ (0, import_jsx_runtime27.jsxs)(
      RadixDialog.Content,
      {
        className: cn(
          "relative w-full rounded-lg border border-border bg-surface p-6 shadow-lg",
          "data-[state=open]:animate-[dialog-content-in_150ms_ease-out]",
          "data-[state=closed]:animate-[dialog-content-out_100ms_ease-in]",
          "focus-visible:outline-none",
          sizeMap2[size],
          className
        ),
        children: [
          children,
          showCloseButton && /* @__PURE__ */ (0, import_jsx_runtime27.jsx)(RadixDialog.Close, { asChild: true, children: /* @__PURE__ */ (0, import_jsx_runtime27.jsx)(
            "button",
            {
              type: "button",
              className: cn(
                "absolute right-4 top-4 rounded-sm p-1 text-muted-foreground",
                "hover:text-foreground",
                "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus-ring",
                "focus-visible:shadow-[0_0_0_4px_var(--color-brand-primary)]",
                "after:absolute after:inset-[-8px] after:content-['']"
              ),
              "aria-label": "Close",
              children: /* @__PURE__ */ (0, import_jsx_runtime27.jsx)(Icon, { name: "x", size: "sm" })
            }
          ) })
        ]
      }
    ) })
  ] });
}
function DialogTitle({ children, className }) {
  return /* @__PURE__ */ (0, import_jsx_runtime27.jsx)(RadixDialog.Title, { className: cn("type-h3 text-foreground", className), children });
}
function DialogDescription({ children, className }) {
  return /* @__PURE__ */ (0, import_jsx_runtime27.jsx)(
    RadixDialog.Description,
    {
      className: cn("type-body-sm text-muted-foreground mt-2", className),
      children
    }
  );
}
function DialogFooter({ children, className }) {
  return /* @__PURE__ */ (0, import_jsx_runtime27.jsx)("div", { className: cn("flex justify-end gap-2 mt-6", className), children });
}

// src/components/overlay/Dropdown.tsx
var RadixDropdown = __toESM(require("@radix-ui/react-dropdown-menu"), 1);
var import_jsx_runtime28 = require("react/jsx-runtime");
function Dropdown(props) {
  return /* @__PURE__ */ (0, import_jsx_runtime28.jsx)(RadixDropdown.Root, { ...props });
}
function DropdownTrigger(props) {
  return /* @__PURE__ */ (0, import_jsx_runtime28.jsx)(RadixDropdown.Trigger, { ...props });
}
function DropdownContent({
  children,
  side = "bottom",
  align = "start",
  sideOffset = 4,
  className
}) {
  return /* @__PURE__ */ (0, import_jsx_runtime28.jsx)(RadixDropdown.Portal, { children: /* @__PURE__ */ (0, import_jsx_runtime28.jsx)(
    RadixDropdown.Content,
    {
      side,
      align,
      sideOffset,
      className: cn(
        "z-50 min-w-32 overflow-hidden rounded-md border border-border bg-surface shadow-md",
        "max-h-[var(--radix-dropdown-menu-content-available-height)] overflow-y-auto",
        "data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95",
        "data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95",
        "p-1",
        className
      ),
      children
    }
  ) });
}
function DropdownItem({
  children,
  onSelect,
  variant = "default",
  disabled,
  className
}) {
  return /* @__PURE__ */ (0, import_jsx_runtime28.jsx)(
    RadixDropdown.Item,
    {
      onSelect,
      disabled,
      className: cn(
        "relative flex cursor-pointer select-none items-center rounded-sm px-3 py-2 type-body-sm text-foreground",
        "hover:bg-brand-accent-subtle focus:bg-brand-accent-subtle focus:outline-none",
        "data-[disabled]:pointer-events-none data-[disabled]:text-disabled-foreground",
        variant === "destructive" && "text-error",
        className
      ),
      children
    }
  );
}
function DropdownGroup({ label, children }) {
  return /* @__PURE__ */ (0, import_jsx_runtime28.jsxs)(RadixDropdown.Group, { children: [
    /* @__PURE__ */ (0, import_jsx_runtime28.jsx)(RadixDropdown.Label, { className: "px-3 py-2 type-caption text-muted-foreground", children: label }),
    children
  ] });
}
function DropdownSeparator() {
  return /* @__PURE__ */ (0, import_jsx_runtime28.jsx)(RadixDropdown.Separator, { className: "mx-1 my-1 h-px bg-border" });
}

// src/components/overlay/Popover.tsx
var RadixPopover = __toESM(require("@radix-ui/react-popover"), 1);
var import_jsx_runtime29 = require("react/jsx-runtime");
var Popover = RadixPopover.Root;
var PopoverTrigger = RadixPopover.Trigger;
function PopoverContent({
  className,
  align = "center",
  sideOffset = 4,
  ...props
}) {
  return /* @__PURE__ */ (0, import_jsx_runtime29.jsx)(RadixPopover.Portal, { children: /* @__PURE__ */ (0, import_jsx_runtime29.jsx)(
    RadixPopover.Content,
    {
      align,
      sideOffset,
      className: cn(
        "z-50 rounded-md border border-border bg-surface p-4 shadow-md outline-hidden",
        "data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95",
        "data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95",
        "data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
        className
      ),
      ...props
    }
  ) });
}

// src/components/overlay/Tooltip.tsx
var RadixTooltip = __toESM(require("@radix-ui/react-tooltip"), 1);
var import_jsx_runtime30 = require("react/jsx-runtime");
function Tooltip({
  content,
  children,
  side = "top",
  delayDuration = 200
}) {
  return /* @__PURE__ */ (0, import_jsx_runtime30.jsx)(RadixTooltip.Provider, { delayDuration, children: /* @__PURE__ */ (0, import_jsx_runtime30.jsxs)(RadixTooltip.Root, { children: [
    /* @__PURE__ */ (0, import_jsx_runtime30.jsx)(RadixTooltip.Trigger, { asChild: true, children }),
    /* @__PURE__ */ (0, import_jsx_runtime30.jsx)(RadixTooltip.Portal, { children: /* @__PURE__ */ (0, import_jsx_runtime30.jsx)(
      RadixTooltip.Content,
      {
        side,
        sideOffset: 4,
        className: "z-50 rounded-md bg-[var(--color-brand-primary)] text-[var(--color-brand-foreground)] type-caption px-3 py-1.5 shadow-sm data-[state=delayed-open]:animate-[tooltip-in_150ms_ease-out] data-[state=closed]:animate-[tooltip-out_100ms_ease-in]",
        children: content
      }
    ) })
  ] }) });
}

// src/components/divider/Divider.tsx
var import_jsx_runtime31 = require("react/jsx-runtime");
function Divider({
  orientation = "horizontal",
  className,
  ...props
}) {
  return /* @__PURE__ */ (0, import_jsx_runtime31.jsx)(
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

// src/components/navigation/Tabs.tsx
var import_react2 = require("react");
var import_class_variance_authority6 = require("class-variance-authority");
var import_jsx_runtime32 = require("react/jsx-runtime");
var TabsContext = (0, import_react2.createContext)(null);
function useTabsContext() {
  const ctx = (0, import_react2.useContext)(TabsContext);
  if (!ctx) {
    throw new Error("Tabs compound components must be used within <Tabs>");
  }
  return ctx;
}
function Tabs({
  value: controlledValue,
  defaultValue,
  onValueChange,
  variant = "underline",
  size = "md",
  className,
  children
}) {
  const [internalValue, setInternalValue] = (0, import_react2.useState)(defaultValue ?? "");
  const registeredTabs = (0, import_react2.useRef)(/* @__PURE__ */ new Set());
  const hasAutoSelected = (0, import_react2.useRef)(false);
  const isControlled = controlledValue !== void 0;
  const activeValue = isControlled ? controlledValue : internalValue;
  const handleValueChange = (0, import_react2.useCallback)(
    (newValue) => {
      if (!isControlled) {
        setInternalValue(newValue);
      }
      onValueChange?.(newValue);
    },
    [isControlled, onValueChange]
  );
  const registerTab = (0, import_react2.useCallback)(
    (tabValue) => {
      registeredTabs.current.add(tabValue);
      if (!hasAutoSelected.current && !isControlled && !defaultValue) {
        hasAutoSelected.current = true;
        setInternalValue(tabValue);
      }
    },
    [isControlled, defaultValue]
  );
  const unregisterTab = (0, import_react2.useCallback)((tabValue) => {
    registeredTabs.current.delete(tabValue);
  }, []);
  return /* @__PURE__ */ (0, import_jsx_runtime32.jsx)(
    TabsContext.Provider,
    {
      value: {
        value: activeValue,
        onValueChange: handleValueChange,
        variant,
        size,
        registerTab,
        unregisterTab
      },
      children: /* @__PURE__ */ (0, import_jsx_runtime32.jsx)("div", { className, children })
    }
  );
}
function TabsList({
  variant,
  size,
  fullWidth = false,
  className,
  children
}) {
  const ctx = useTabsContext();
  const resolvedVariant = variant ?? ctx.variant;
  const resolvedSize = size ?? ctx.size;
  return /* @__PURE__ */ (0, import_jsx_runtime32.jsx)(
    TabsContext.Provider,
    {
      value: {
        ...ctx,
        variant: resolvedVariant,
        size: resolvedSize
      },
      children: /* @__PURE__ */ (0, import_jsx_runtime32.jsx)(
        "div",
        {
          role: "tablist",
          "aria-orientation": "horizontal",
          className: cn(
            "flex items-center overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden",
            resolvedVariant === "underline" && "border-b border-border",
            resolvedVariant === "pill" && "bg-surface-subtle rounded-lg p-1",
            fullWidth && "[&>button]:flex-1",
            className
          ),
          children
        }
      )
    }
  );
}
var tabsTriggerVariants = (0, import_class_variance_authority6.cva)(
  [
    "inline-flex items-center justify-center cursor-pointer whitespace-nowrap shrink-0 transition-[color,background-color,border-color] duration-200 ease-in-out",
    "focus-visible:outline focus-visible:outline-2 focus-visible:outline-focus-ring focus-visible:shadow-[0_0_0_4px_var(--color-brand-primary)]",
    "disabled:pointer-events-none disabled:text-disabled-foreground"
  ],
  {
    variants: {
      variant: {
        underline: "border-b-2 border-transparent -mb-px text-muted-foreground hover:text-foreground data-[state=active]:border-brand-accent data-[state=active]:text-foreground data-[state=active]:!font-bold",
        pill: "rounded-md text-muted-foreground hover:text-foreground data-[state=active]:bg-brand-primary data-[state=active]:text-brand-accent data-[state=active]:!font-bold"
      },
      size: {
        sm: "type-body-sm px-3 py-1.5",
        md: "type-body-sm px-4 py-2"
      }
    },
    compoundVariants: [
      { variant: "pill", size: "sm", className: "px-3 py-1" },
      { variant: "pill", size: "md", className: "px-4 py-1.5" }
    ],
    defaultVariants: {
      variant: "underline",
      size: "md"
    }
  }
);
function TabsTrigger({ value, disabled, className, children }) {
  const ctx = useTabsContext();
  const isActive = ctx.value === value;
  const triggerId = `tab-${value}`;
  const panelId = `tabpanel-${value}`;
  (0, import_react2.useEffect)(() => {
    ctx.registerTab(value);
    return () => ctx.unregisterTab(value);
  }, [value]);
  function handleClick() {
    if (!disabled) {
      ctx.onValueChange(value);
    }
  }
  function handleKeyDown(e) {
    const tablist = e.currentTarget.closest('[role="tablist"]');
    if (!tablist) return;
    const triggers = Array.from(
      tablist.querySelectorAll('[role="tab"]:not([disabled])')
    );
    const currentIndex = triggers.indexOf(e.currentTarget);
    if (currentIndex === -1) return;
    let nextIndex = null;
    switch (e.key) {
      case "ArrowRight":
        nextIndex = (currentIndex + 1) % triggers.length;
        break;
      case "ArrowLeft":
        nextIndex = (currentIndex - 1 + triggers.length) % triggers.length;
        break;
      case "Home":
        nextIndex = 0;
        break;
      case "End":
        nextIndex = triggers.length - 1;
        break;
      default:
        return;
    }
    e.preventDefault();
    const nextTrigger = triggers[nextIndex];
    nextTrigger.focus();
    const nextValue = nextTrigger.getAttribute("data-value");
    if (nextValue) {
      ctx.onValueChange(nextValue);
    }
  }
  return /* @__PURE__ */ (0, import_jsx_runtime32.jsx)(
    "button",
    {
      role: "tab",
      type: "button",
      id: triggerId,
      "aria-selected": isActive,
      "aria-controls": panelId,
      tabIndex: isActive ? 0 : -1,
      "data-state": isActive ? "active" : "inactive",
      "data-value": value,
      disabled,
      "aria-disabled": disabled ? "true" : void 0,
      "data-disabled": disabled ? "" : void 0,
      className: cn(
        tabsTriggerVariants({ variant: ctx.variant, size: ctx.size }),
        className
      ),
      onClick: handleClick,
      onKeyDown: handleKeyDown,
      children
    }
  );
}
function TabsContent({ value, className, children }) {
  const ctx = useTabsContext();
  const isActive = ctx.value === value;
  if (!isActive) return null;
  const triggerId = `tab-${value}`;
  const panelId = `tabpanel-${value}`;
  return /* @__PURE__ */ (0, import_jsx_runtime32.jsx)(
    "div",
    {
      role: "tabpanel",
      id: panelId,
      "aria-labelledby": triggerId,
      tabIndex: 0,
      className: cn("mt-4", className),
      children
    }
  );
}

// src/components/navigation/Pagination.tsx
var import_react3 = require("react");
var import_jsx_runtime33 = require("react/jsx-runtime");
function computePaginationRange(page, totalPages, siblingCount) {
  const totalSlots = 2 * siblingCount + 5;
  if (totalPages <= totalSlots) {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }
  const leftSiblingEnd = page - siblingCount;
  const rightSiblingStart = page + siblingCount;
  const showLeftEllipsis = leftSiblingEnd > 2;
  const showRightEllipsis = rightSiblingStart < totalPages - 1;
  if (!showLeftEllipsis && showRightEllipsis) {
    const leftCount = totalSlots - 2;
    const leftRange = Array.from({ length: leftCount }, (_, i) => i + 1);
    return [...leftRange, "ellipsis", totalPages];
  }
  if (showLeftEllipsis && !showRightEllipsis) {
    const rightCount = totalSlots - 2;
    const rightRange = Array.from(
      { length: rightCount },
      (_, i) => totalPages - rightCount + 1 + i
    );
    return [1, "ellipsis", ...rightRange];
  }
  const middleRange = Array.from(
    { length: 2 * siblingCount + 1 },
    (_, i) => leftSiblingEnd + i
  );
  return [1, "ellipsis", ...middleRange, "ellipsis", totalPages];
}
var pageButtonBase = [
  "inline-flex items-center justify-center",
  "h-9 w-9 rounded-md type-body-sm",
  "transition-[color,background-color] duration-200 ease-in-out",
  "focus-visible:outline focus-visible:outline-2 focus-visible:outline-focus-ring focus-visible:shadow-[0_0_0_4px_var(--color-brand-primary)]"
].join(" ");
function Pagination({
  page,
  totalPages,
  onPageChange,
  siblingCount = 1,
  className
}) {
  const fullRange = (0, import_react3.useMemo)(
    () => computePaginationRange(page, totalPages, siblingCount),
    [page, totalPages, siblingCount]
  );
  const mobileRange = (0, import_react3.useMemo)(
    () => computePaginationRange(page, totalPages, 0),
    [page, totalPages]
  );
  const mobilePageSet = (0, import_react3.useMemo)(() => {
    const set = /* @__PURE__ */ new Set();
    for (const item of mobileRange) {
      if (typeof item === "number") set.add(item);
    }
    return set;
  }, [mobileRange]);
  const handlePageChange = (0, import_react3.useCallback)(
    (newPage) => {
      onPageChange(newPage);
    },
    [onPageChange]
  );
  const isPrevDisabled = page <= 1;
  const isNextDisabled = page >= totalPages;
  return /* @__PURE__ */ (0, import_jsx_runtime33.jsxs)("nav", { "aria-label": "Pagination", className: cn("flex items-center justify-center gap-1", className), children: [
    /* @__PURE__ */ (0, import_jsx_runtime33.jsx)(
      "button",
      {
        type: "button",
        "aria-label": "Previous page",
        disabled: isPrevDisabled,
        "aria-disabled": isPrevDisabled ? "true" : void 0,
        onClick: () => handlePageChange(page - 1),
        className: cn(
          pageButtonBase,
          "relative after:absolute after:inset-1/2 after:-translate-x-1/2 after:-translate-y-1/2 after:min-w-[44px] after:min-h-[44px] after:content-['']",
          "text-foreground",
          isPrevDisabled ? "text-disabled-foreground cursor-not-allowed" : "hover:bg-brand-accent-subtle hover:text-brand-primary cursor-pointer"
        ),
        children: /* @__PURE__ */ (0, import_jsx_runtime33.jsx)(Icon, { name: "chevron-left", size: "sm" })
      }
    ),
    fullRange.map((item, index) => {
      if (item === "ellipsis") {
        const prevPage = index > 0 ? fullRange[index - 1] : null;
        const nextPage = index < fullRange.length - 1 ? fullRange[index + 1] : null;
        const showOnMobile = typeof prevPage === "number" && mobilePageSet.has(prevPage) && (typeof nextPage === "number" && mobilePageSet.has(nextPage));
        return /* @__PURE__ */ (0, import_jsx_runtime33.jsx)(
          "span",
          {
            "aria-hidden": "true",
            className: cn(
              "items-center justify-center h-9 w-9 type-body-sm text-muted-foreground select-none",
              showOnMobile ? "inline-flex" : "hidden md:inline-flex"
            ),
            children: "..."
          },
          `slot-${index}`
        );
      }
      const isCurrent = item === page;
      const isInMobileRange = mobilePageSet.has(item);
      return /* @__PURE__ */ (0, import_jsx_runtime33.jsx)(
        "button",
        {
          type: "button",
          "aria-label": `Page ${item}`,
          "aria-current": isCurrent ? "page" : void 0,
          onClick: () => handlePageChange(item),
          className: cn(
            pageButtonBase,
            "cursor-pointer",
            isInMobileRange ? "inline-flex" : "hidden md:inline-flex",
            isCurrent ? "bg-brand-primary text-brand-foreground" : "text-foreground hover:bg-brand-accent-subtle hover:text-brand-primary"
          ),
          children: item
        },
        `slot-${index}`
      );
    }),
    /* @__PURE__ */ (0, import_jsx_runtime33.jsx)(
      "button",
      {
        type: "button",
        "aria-label": "Next page",
        disabled: isNextDisabled,
        "aria-disabled": isNextDisabled ? "true" : void 0,
        onClick: () => handlePageChange(page + 1),
        className: cn(
          pageButtonBase,
          "relative after:absolute after:inset-1/2 after:-translate-x-1/2 after:-translate-y-1/2 after:min-w-[44px] after:min-h-[44px] after:content-['']",
          "text-foreground",
          isNextDisabled ? "text-disabled-foreground cursor-not-allowed" : "hover:bg-brand-accent-subtle hover:text-brand-primary cursor-pointer"
        ),
        children: /* @__PURE__ */ (0, import_jsx_runtime33.jsx)(Icon, { name: "chevron-right", size: "sm" })
      }
    )
  ] });
}

// src/components/navigation/ToggleGroup.tsx
var import_react4 = require("react");
var import_jsx_runtime34 = require("react/jsx-runtime");
function ToggleGroup({
  value,
  onValueChange,
  items,
  fullWidth = false,
  className
}) {
  const itemRefs = (0, import_react4.useRef)([]);
  const focusItem = (0, import_react4.useCallback)(
    (index) => {
      const item = items[index];
      if (item) {
        itemRefs.current[index]?.focus();
        onValueChange(item.value);
      }
    },
    [items, onValueChange]
  );
  const handleKeyDown = (0, import_react4.useCallback)(
    (e, index) => {
      const count = items.length;
      let nextIndex = null;
      switch (e.key) {
        case "ArrowRight":
          nextIndex = (index + 1) % count;
          break;
        case "ArrowLeft":
          nextIndex = (index - 1 + count) % count;
          break;
        case "Home":
          nextIndex = 0;
          break;
        case "End":
          nextIndex = count - 1;
          break;
        default:
          return;
      }
      e.preventDefault();
      focusItem(nextIndex);
    },
    [items.length, focusItem]
  );
  return /* @__PURE__ */ (0, import_jsx_runtime34.jsx)(
    "div",
    {
      role: "radiogroup",
      className: cn(
        "inline-flex items-center gap-1",
        fullWidth && "w-full",
        className
      ),
      children: items.map((item, index) => {
        const isSelected = value === item.value;
        return /* @__PURE__ */ (0, import_jsx_runtime34.jsxs)(
          "button",
          {
            ref: (el) => {
              itemRefs.current[index] = el;
            },
            role: "radio",
            type: "button",
            "aria-checked": isSelected,
            tabIndex: isSelected ? 0 : -1,
            onClick: () => onValueChange(item.value),
            onKeyDown: (e) => handleKeyDown(e, index),
            className: cn(
              "flex items-center cursor-pointer transition-colors rounded-md type-body-sm px-2.5 py-1 gap-1",
              fullWidth && "flex-1 justify-center",
              isSelected ? "bg-brand-primary text-brand-foreground !font-semibold" : "text-muted-foreground hover:bg-brand-accent-subtle hover:text-brand-primary active:opacity-90",
              "outline-none focus-visible:outline-2 focus-visible:outline-solid focus-visible:outline-[var(--color-focus-ring)] focus-visible:shadow-[0_0_0_4px_var(--color-brand-primary)]"
            ),
            children: [
              item.icon,
              /* @__PURE__ */ (0, import_jsx_runtime34.jsx)("span", { children: item.label })
            ]
          },
          item.value
        );
      })
    }
  );
}

// src/components/utilities/OnlyMobileView.tsx
var import_jsx_runtime35 = require("react/jsx-runtime");
function OnlyMobileView({
  children,
  message = "Only Mobile View is supported.",
  className
}) {
  return /* @__PURE__ */ (0, import_jsx_runtime35.jsxs)("div", { className: cn(className), children: [
    /* @__PURE__ */ (0, import_jsx_runtime35.jsxs)(
      "div",
      {
        className: "hidden md:flex fixed inset-0 z-50 flex-col items-center justify-center gap-4 bg-surface",
        role: "status",
        "aria-live": "polite",
        children: [
          /* @__PURE__ */ (0, import_jsx_runtime35.jsx)("div", { className: "text-brand-primary", children: /* @__PURE__ */ (0, import_jsx_runtime35.jsx)(Icon, { name: "smartphone", size: "xl" }) }),
          /* @__PURE__ */ (0, import_jsx_runtime35.jsx)("p", { className: "type-h3 text-brand-primary text-center px-4", children: message })
        ]
      }
    ),
    /* @__PURE__ */ (0, import_jsx_runtime35.jsx)("div", { className: "md:hidden", children })
  ] });
}

// src/components/date/Calendar.tsx
var import_react_day_picker = require("react-day-picker");
var import_jsx_runtime36 = require("react/jsx-runtime");
function Chevron({
  orientation
}) {
  const name = orientation === "left" ? "chevron-left" : "chevron-right";
  return /* @__PURE__ */ (0, import_jsx_runtime36.jsx)(Icon, { name, size: "sm" });
}
function Calendar2({
  className,
  showOutsideDays = true,
  classNames: classNamesProp,
  components: componentsProp,
  ...props
}) {
  return /* @__PURE__ */ (0, import_jsx_runtime36.jsx)(
    import_react_day_picker.DayPicker,
    {
      showOutsideDays,
      className: cn("relative p-3", className),
      classNames: {
        months: "flex flex-col md:flex-row gap-4",
        month: "flex flex-col gap-4",
        month_caption: "flex justify-center items-center pt-1",
        caption_label: "type-body-sm !font-semibold text-foreground",
        nav: "absolute top-3 right-3 left-3 flex items-center justify-between z-10 pointer-events-none",
        button_previous: cn(
          "pointer-events-auto",
          "inline-flex items-center justify-center",
          "h-7 w-7 rounded-md",
          "text-foreground hover:bg-brand-accent-subtle hover:text-brand-primary",
          "outline-2 outline-offset-2 outline-transparent",
          "focus-visible:outline-focus-ring focus-visible:shadow-[0_0_0_4px_var(--color-brand-primary)]",
          "relative after:absolute after:inset-1/2 after:-translate-x-1/2 after:-translate-y-1/2",
          "after:min-w-[44px] after:min-h-[44px]"
        ),
        button_next: cn(
          "pointer-events-auto",
          "inline-flex items-center justify-center",
          "h-7 w-7 rounded-md",
          "text-foreground hover:bg-brand-accent-subtle hover:text-brand-primary",
          "outline-2 outline-offset-2 outline-transparent",
          "focus-visible:outline-focus-ring focus-visible:shadow-[0_0_0_4px_var(--color-brand-primary)]",
          "relative after:absolute after:inset-1/2 after:-translate-x-1/2 after:-translate-y-1/2",
          "after:min-w-[44px] after:min-h-[44px]"
        ),
        month_grid: "w-full border-collapse",
        weekdays: "flex",
        weekday: "type-caption text-muted-foreground w-9 text-center",
        week: "flex w-full mt-1",
        day: "relative w-9 h-9 text-center p-0 text-foreground",
        day_button: cn(
          "inline-flex items-center justify-center w-9 h-9 rounded-md",
          "type-body-sm text-inherit",
          "transition-[color,background-color] duration-200 ease-in-out",
          "hover:bg-brand-accent-subtle hover:text-brand-primary",
          "outline-2 outline-offset-2 outline-transparent",
          "focus-visible:outline-focus-ring focus-visible:shadow-[0_0_0_4px_var(--color-brand-primary)]",
          // ::after pseudo-element for 44px touch target
          "relative after:absolute after:inset-1/2 after:-translate-x-1/2 after:-translate-y-1/2",
          "after:min-w-[44px] after:min-h-[44px]"
        ),
        today: "bg-surface-subtle text-foreground !font-semibold rounded-md",
        outside: "text-muted-foreground opacity-50",
        disabled: "text-disabled-foreground pointer-events-none",
        hidden: "invisible",
        selected: "[&>button]:bg-brand-primary [&>button]:!text-brand-foreground [&>button]:hover:bg-brand-primary",
        range_start: "bg-brand-accent-subtle rounded-l-md rounded-r-none",
        range_end: "bg-brand-accent-subtle rounded-r-md rounded-l-none",
        range_middle: "!bg-brand-accent-subtle !rounded-none [&>button]:!bg-transparent [&>button]:!text-foreground",
        ...classNamesProp
      },
      components: {
        Chevron,
        ...componentsProp
      },
      ...props
    }
  );
}

// src/components/date/DatePicker.tsx
var import_react5 = require("react");
var import_jsx_runtime37 = require("react/jsx-runtime");
function defaultFormatDate(date) {
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  const y = date.getFullYear();
  return `${m}/${d}/${y}`;
}
var triggerClasses = (invalid, disabled) => cn(
  "inline-flex w-full items-center justify-between rounded-md border border-border-strong bg-surface px-3 py-2 type-body-sm text-foreground transition-colors",
  "focus-visible:outline-none focus-visible:border-brand-primary",
  "disabled:pointer-events-none disabled:text-disabled-foreground disabled:bg-surface-subtle",
  invalid && "border-error focus-visible:border-error"
);
function DatePicker({
  value,
  onChange,
  formatDate = defaultFormatDate,
  placeholder = "Select a date",
  disabled = false,
  invalid = false,
  className,
  calendarProps
}) {
  const [open, setOpen] = (0, import_react5.useState)(false);
  return /* @__PURE__ */ (0, import_jsx_runtime37.jsxs)(Popover, { open, onOpenChange: setOpen, children: [
    /* @__PURE__ */ (0, import_jsx_runtime37.jsx)(PopoverTrigger, { asChild: true, children: /* @__PURE__ */ (0, import_jsx_runtime37.jsxs)(
      "button",
      {
        type: "button",
        disabled,
        className: cn(triggerClasses(invalid, disabled), className),
        children: [
          /* @__PURE__ */ (0, import_jsx_runtime37.jsx)("span", { className: cn(!value && "text-muted-foreground"), children: value ? formatDate(value) : placeholder }),
          /* @__PURE__ */ (0, import_jsx_runtime37.jsx)(Icon, { name: "calendar", size: "sm" })
        ]
      }
    ) }),
    /* @__PURE__ */ (0, import_jsx_runtime37.jsx)(PopoverContent, { align: "start", className: "w-auto p-0", children: /* @__PURE__ */ (0, import_jsx_runtime37.jsx)(
      Calendar2,
      {
        mode: "single",
        selected: value,
        onSelect: (date) => {
          onChange?.(date);
          setOpen(false);
        },
        ...calendarProps
      }
    ) })
  ] });
}
function DateRangePicker({
  value,
  onChange,
  formatDate = defaultFormatDate,
  placeholder = "Select a date range",
  disabled = false,
  invalid = false,
  className,
  calendarProps
}) {
  const [open, setOpen] = (0, import_react5.useState)(false);
  const displayValue = value?.from && value?.to ? `${formatDate(value.from)} \u2013 ${formatDate(value.to)}` : value?.from ? formatDate(value.from) : void 0;
  return /* @__PURE__ */ (0, import_jsx_runtime37.jsxs)(Popover, { open, onOpenChange: setOpen, children: [
    /* @__PURE__ */ (0, import_jsx_runtime37.jsx)(PopoverTrigger, { asChild: true, children: /* @__PURE__ */ (0, import_jsx_runtime37.jsxs)(
      "button",
      {
        type: "button",
        disabled,
        className: cn(triggerClasses(invalid, disabled), className),
        children: [
          /* @__PURE__ */ (0, import_jsx_runtime37.jsx)("span", { className: cn(!displayValue && "text-muted-foreground"), children: displayValue ?? placeholder }),
          /* @__PURE__ */ (0, import_jsx_runtime37.jsx)(Icon, { name: "calendar", size: "sm" })
        ]
      }
    ) }),
    /* @__PURE__ */ (0, import_jsx_runtime37.jsx)(PopoverContent, { align: "start", className: "w-auto p-0", children: /* @__PURE__ */ (0, import_jsx_runtime37.jsx)(
      Calendar2,
      {
        mode: "range",
        selected: value,
        onSelect: (range) => {
          onChange?.(range);
          if (range?.from && range?.to) {
            setOpen(false);
          }
        },
        ...calendarProps
      }
    ) })
  ] });
}

// src/index.ts
var DS_VERSION = "0.1.0";
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
  Alert,
  Avatar,
  Badge,
  Button,
  Calendar,
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
  Checkbox,
  Container,
  DS_VERSION,
  DatePicker,
  DateRangePicker,
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogTitle,
  DialogTrigger,
  Divider,
  Dropdown,
  DropdownContent,
  DropdownGroup,
  DropdownItem,
  DropdownSeparator,
  DropdownTrigger,
  FormItem,
  Grid,
  Icon,
  IconButton,
  Input,
  Label,
  LinkButton,
  LoadingSpinner,
  OnlyMobileView,
  Pagination,
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
  Skeleton,
  StatusView,
  Switch,
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableMobileItem,
  TableMobileList,
  TableRow,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
  Textarea,
  Toaster,
  ToggleGroup,
  Tooltip,
  alertVariants,
  avatarVariants,
  badgeVariants,
  buttonVariants,
  cn,
  tabsTriggerVariants,
  toast
});
//# sourceMappingURL=index.cjs.map