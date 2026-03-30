import { ClassValue } from 'clsx';
import * as react_jsx_runtime from 'react/jsx-runtime';
import * as class_variance_authority_types from 'class-variance-authority/types';
import { VariantProps } from 'class-variance-authority';
import * as react from 'react';
import * as lucide_react from 'lucide-react';
import * as RadixDialog from '@radix-ui/react-dialog';
import * as RadixDropdown from '@radix-ui/react-dropdown-menu';
import * as RadixPopover from '@radix-ui/react-popover';

declare function cn(...inputs: ClassValue[]): string;

declare const buttonVariants: (props?: ({
    variant?: "primary" | "secondary" | "tertiary" | "destructive" | null | undefined;
    size?: "sm" | "md" | "lg" | null | undefined;
} & class_variance_authority_types.ClassProp) | undefined) => string;
type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & VariantProps<typeof buttonVariants>;
declare function Button({ variant, size, className, type, ...props }: ButtonProps): react_jsx_runtime.JSX.Element;

declare const linkButtonVariants: (props?: ({
    variant?: "primary" | "secondary" | "tertiary" | null | undefined;
} & class_variance_authority_types.ClassProp) | undefined) => string;
type LinkButtonProps = VariantProps<typeof linkButtonVariants> & {
    href: string;
    disabled?: boolean;
    className?: string;
    children: React.ReactNode;
};
declare function LinkButton({ href, variant, disabled, className, children, }: LinkButtonProps): react_jsx_runtime.JSX.Element;

declare const iconButtonVariants: (props?: ({
    variant?: "primary" | "secondary" | "tertiary" | null | undefined;
} & class_variance_authority_types.ClassProp) | undefined) => string;
type IconButtonProps = VariantProps<typeof iconButtonVariants> & {
    icon: React.ReactNode;
    text?: string;
    disabled?: boolean;
    forSubmit?: boolean;
    className?: string;
    onClick?: () => void;
    "aria-label"?: string;
};
declare function IconButton({ icon, text, variant, disabled, forSubmit, className, onClick, "aria-label": ariaLabel, }: IconButtonProps): react_jsx_runtime.JSX.Element;

type InputProps = {
    type: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
    placeholder?: string;
    invalid?: boolean;
    required?: boolean;
    disabled?: boolean;
    id?: string;
    className?: string;
};
declare const Input: react.NamedExoticComponent<InputProps>;

type LabelProps = {
    htmlFor: string;
    required?: boolean;
    className?: string;
    children: React.ReactNode;
};
declare function Label({ htmlFor, required, className, children }: LabelProps): react_jsx_runtime.JSX.Element;

type ValidationRule = (value: string) => string | null;
type FormItemProps = {
    htmlFor: string;
    labelText: string;
    type: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    placeholder?: string;
    validationRules?: ValidationRule[];
    required?: boolean;
};
declare const FormItem: react.NamedExoticComponent<FormItemProps>;

type ToggleBarItem = {
    view: string;
    text: string;
    icon?: React.ReactNode;
};
type ToggleBarProps = {
    activeView: string;
    onViewChange: (view: string) => void;
    items: ToggleBarItem[];
    className?: string;
};
declare function ToggleBar({ activeView, onViewChange, items, className }: ToggleBarProps): react_jsx_runtime.JSX.Element;

type LoadingSpinnerProps = {
    fullScreen?: boolean;
    label?: string;
    className?: string;
};
declare function LoadingSpinner({ fullScreen, label, className, }: LoadingSpinnerProps): react_jsx_runtime.JSX.Element;

declare function NotFound(): react_jsx_runtime.JSX.Element;

declare function NotLogin(): react_jsx_runtime.JSX.Element;

declare function NotAuthorized(): react_jsx_runtime.JSX.Element;

type UnexpectedErrorProps = {
    onRetry?: () => void;
};
declare function UnexpectedError({ onRetry }: UnexpectedErrorProps): react_jsx_runtime.JSX.Element;

interface CustomIconProps$1 {
    size?: number;
    className?: string;
    "aria-hidden"?: boolean | "true" | "false";
    "aria-label"?: string;
}
declare function GithubIcon({ size, className, ...props }: CustomIconProps$1): react_jsx_runtime.JSX.Element;

interface CustomIconProps {
    size?: number;
    className?: string;
    "aria-hidden"?: boolean | "true" | "false";
    "aria-label"?: string;
}
declare function LinkedinIcon({ size, className, ...props }: CustomIconProps): react_jsx_runtime.JSX.Element;

declare const registry: {
    readonly "arrow-left": react.ForwardRefExoticComponent<Omit<lucide_react.LucideProps, "ref"> & react.RefAttributes<SVGSVGElement>>;
    readonly "arrow-right": react.ForwardRefExoticComponent<Omit<lucide_react.LucideProps, "ref"> & react.RefAttributes<SVGSVGElement>>;
    readonly "chevron-right": react.ForwardRefExoticComponent<Omit<lucide_react.LucideProps, "ref"> & react.RefAttributes<SVGSVGElement>>;
    readonly "chevron-down": react.ForwardRefExoticComponent<Omit<lucide_react.LucideProps, "ref"> & react.RefAttributes<SVGSVGElement>>;
    readonly "circle-minus": react.ForwardRefExoticComponent<Omit<lucide_react.LucideProps, "ref"> & react.RefAttributes<SVGSVGElement>>;
    readonly "circle-plus": react.ForwardRefExoticComponent<Omit<lucide_react.LucideProps, "ref"> & react.RefAttributes<SVGSVGElement>>;
    readonly "clock-9": react.ForwardRefExoticComponent<Omit<lucide_react.LucideProps, "ref"> & react.RefAttributes<SVGSVGElement>>;
    readonly "external-link": react.ForwardRefExoticComponent<Omit<lucide_react.LucideProps, "ref"> & react.RefAttributes<SVGSVGElement>>;
    readonly eye: react.ForwardRefExoticComponent<Omit<lucide_react.LucideProps, "ref"> & react.RefAttributes<SVGSVGElement>>;
    readonly "graduation-cap": react.ForwardRefExoticComponent<Omit<lucide_react.LucideProps, "ref"> & react.RefAttributes<SVGSVGElement>>;
    readonly list: react.ForwardRefExoticComponent<Omit<lucide_react.LucideProps, "ref"> & react.RefAttributes<SVGSVGElement>>;
    readonly lock: react.ForwardRefExoticComponent<Omit<lucide_react.LucideProps, "ref"> & react.RefAttributes<SVGSVGElement>>;
    readonly mail: react.ForwardRefExoticComponent<Omit<lucide_react.LucideProps, "ref"> & react.RefAttributes<SVGSVGElement>>;
    readonly "message-square": react.ForwardRefExoticComponent<Omit<lucide_react.LucideProps, "ref"> & react.RefAttributes<SVGSVGElement>>;
    readonly minus: react.ForwardRefExoticComponent<Omit<lucide_react.LucideProps, "ref"> & react.RefAttributes<SVGSVGElement>>;
    readonly pencil: react.ForwardRefExoticComponent<Omit<lucide_react.LucideProps, "ref"> & react.RefAttributes<SVGSVGElement>>;
    readonly plus: react.ForwardRefExoticComponent<Omit<lucide_react.LucideProps, "ref"> & react.RefAttributes<SVGSVGElement>>;
    readonly reply: react.ForwardRefExoticComponent<Omit<lucide_react.LucideProps, "ref"> & react.RefAttributes<SVGSVGElement>>;
    readonly "shopping-cart": react.ForwardRefExoticComponent<Omit<lucide_react.LucideProps, "ref"> & react.RefAttributes<SVGSVGElement>>;
    readonly "thumbs-up": react.ForwardRefExoticComponent<Omit<lucide_react.LucideProps, "ref"> & react.RefAttributes<SVGSVGElement>>;
    readonly ticket: react.ForwardRefExoticComponent<Omit<lucide_react.LucideProps, "ref"> & react.RefAttributes<SVGSVGElement>>;
    readonly "trash-2": react.ForwardRefExoticComponent<Omit<lucide_react.LucideProps, "ref"> & react.RefAttributes<SVGSVGElement>>;
    readonly x: react.ForwardRefExoticComponent<Omit<lucide_react.LucideProps, "ref"> & react.RefAttributes<SVGSVGElement>>;
    readonly github: typeof GithubIcon;
    readonly linkedin: typeof LinkedinIcon;
};
type IconName = keyof typeof registry;

type IconSize = "xs" | "sm" | "md" | "lg" | "xl";
interface IconProps {
    name: IconName;
    size?: IconSize;
    label?: string;
    className?: string;
}

declare function Icon({ name, size, label, className }: IconProps): react_jsx_runtime.JSX.Element;

declare const Dialog: react.FC<RadixDialog.DialogProps>;
declare const DialogTrigger: react.ForwardRefExoticComponent<RadixDialog.DialogTriggerProps & react.RefAttributes<HTMLButtonElement>>;
declare const DialogClose: react.ForwardRefExoticComponent<RadixDialog.DialogCloseProps & react.RefAttributes<HTMLButtonElement>>;
type DialogContentProps = {
    children: React.ReactNode;
    className?: string;
};
declare function DialogContent({ children, className }: DialogContentProps): react_jsx_runtime.JSX.Element;
type DialogTitleProps = {
    children: React.ReactNode;
    className?: string;
};
declare function DialogTitle({ children, className }: DialogTitleProps): react_jsx_runtime.JSX.Element;

declare const Dropdown: react.FC<RadixDropdown.DropdownMenuProps>;
declare const DropdownTrigger: react.ForwardRefExoticComponent<RadixDropdown.DropdownMenuTriggerProps & react.RefAttributes<HTMLButtonElement>>;
type DropdownContentProps = {
    children: React.ReactNode;
    className?: string;
};
declare function DropdownContent({ children, className }: DropdownContentProps): react_jsx_runtime.JSX.Element;
type DropdownItemProps = {
    children: React.ReactNode;
    onSelect?: () => void;
    className?: string;
};
declare function DropdownItem({ children, onSelect, className }: DropdownItemProps): react_jsx_runtime.JSX.Element;

declare const Popover: react.FC<RadixPopover.PopoverProps>;
declare const PopoverTrigger: react.ForwardRefExoticComponent<RadixPopover.PopoverTriggerProps & react.RefAttributes<HTMLButtonElement>>;
type PopoverContentProps = {
    children: React.ReactNode;
    className?: string;
};
declare function PopoverContent({ children, className }: PopoverContentProps): react_jsx_runtime.JSX.Element;

type DividerProps = {
    orientation?: "horizontal" | "vertical";
    className?: string;
} & Omit<React.ComponentPropsWithoutRef<"hr">, "className">;
declare function Divider({ orientation, className, ...props }: DividerProps): react_jsx_runtime.JSX.Element;

declare const DS_VERSION = "0.1.0";

export { Button, type ButtonProps, DS_VERSION, Dialog, DialogClose, DialogContent, type DialogContentProps, DialogTitle, type DialogTitleProps, DialogTrigger, Divider, type DividerProps, Dropdown, DropdownContent, type DropdownContentProps, DropdownItem, type DropdownItemProps, DropdownTrigger, FormItem, type FormItemProps, Icon, IconButton, type IconButtonProps, type IconName, type IconProps, type IconSize, Input, type InputProps, Label, type LabelProps, LinkButton, type LinkButtonProps, LoadingSpinner, type LoadingSpinnerProps, NotAuthorized, NotFound, NotLogin, Popover, PopoverContent, type PopoverContentProps, PopoverTrigger, ToggleBar, type ToggleBarItem, type ToggleBarProps, UnexpectedError, type UnexpectedErrorProps, buttonVariants, cn };
