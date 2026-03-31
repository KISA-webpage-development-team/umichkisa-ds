import { ClassValue } from 'clsx';
import * as react_jsx_runtime from 'react/jsx-runtime';
import * as class_variance_authority_types from 'class-variance-authority/types';
import { VariantProps } from 'class-variance-authority';
import * as react from 'react';
import * as lucide_react from 'lucide-react';
import * as RadixSelect from '@radix-ui/react-select';
import * as RadixRadioGroup from '@radix-ui/react-radio-group';
import * as RadixDialog from '@radix-ui/react-dialog';
import * as RadixDropdown from '@radix-ui/react-dropdown-menu';
import * as RadixPopover from '@radix-ui/react-popover';

declare function cn(...inputs: ClassValue[]): string;

declare const badgeVariants: (props?: ({
    variant?: "default" | "brand" | "success" | "warning" | "error" | "info" | "outline" | null | undefined;
    size?: "sm" | "md" | null | undefined;
} & class_variance_authority_types.ClassProp) | undefined) => string;
type BadgeProps = React.ComponentPropsWithoutRef<"span"> & VariantProps<typeof badgeVariants> & {
    asChild?: boolean;
};
declare function Badge({ variant, size, className, asChild, ...props }: BadgeProps): react_jsx_runtime.JSX.Element;

declare const buttonVariants: (props?: ({
    variant?: "primary" | "secondary" | "tertiary" | "destructive" | null | undefined;
    size?: "sm" | "md" | "lg" | null | undefined;
} & class_variance_authority_types.ClassProp) | undefined) => string;
type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & VariantProps<typeof buttonVariants>;
declare function Button({ variant, size, className, type, ...props }: ButtonProps): react_jsx_runtime.JSX.Element;

type LinkButtonProps = Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, "href"> & VariantProps<typeof buttonVariants> & {
    href?: string;
    disabled?: boolean;
};
declare function LinkButton({ variant, size, disabled, className, children, ...props }: LinkButtonProps): react_jsx_runtime.JSX.Element;

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
    readonly check: react.ForwardRefExoticComponent<Omit<lucide_react.LucideProps, "ref"> & react.RefAttributes<SVGSVGElement>>;
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

type IconButtonSize = "sm" | "md" | "lg";
type IconButtonProps = {
    icon: IconName;
    size?: IconButtonSize;
    "aria-label": string;
} & Omit<ButtonProps, "children" | "size">;
declare function IconButton({ icon, size, variant, className, ...rest }: IconButtonProps): react_jsx_runtime.JSX.Element;

type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
    invalid?: boolean;
};
declare function Input({ invalid, className, type, ...props }: InputProps): react_jsx_runtime.JSX.Element;

type LabelProps = {
    htmlFor: string;
    required?: boolean;
    className?: string;
    children: React.ReactNode;
};
declare function Label({ htmlFor, required, className, children }: LabelProps): react_jsx_runtime.JSX.Element;

type FormItemProps = {
    htmlFor: string;
    label: string;
    required?: boolean;
    error?: string;
    description?: string;
    className?: string;
    children: React.ReactNode;
};
declare function FormItem({ htmlFor, label, required, error, description, className, children, }: FormItemProps): react_jsx_runtime.JSX.Element;

type CheckboxProps = Omit<React.InputHTMLAttributes<HTMLInputElement>, "type"> & {
    invalid?: boolean;
};
declare function Checkbox({ invalid, className, ...props }: CheckboxProps): react_jsx_runtime.JSX.Element;

type SelectProps = React.ComponentPropsWithoutRef<typeof RadixSelect.Root>;
declare function Select(props: SelectProps): react_jsx_runtime.JSX.Element;
type SelectTriggerProps = {
    placeholder?: string;
    invalid?: boolean;
    className?: string;
};
declare function SelectTrigger({ placeholder, invalid, className }: SelectTriggerProps): react_jsx_runtime.JSX.Element;
type SelectContentProps = {
    children: React.ReactNode;
    className?: string;
    position?: "popper" | "item-aligned";
};
declare function SelectContent({ children, className, position }: SelectContentProps): react_jsx_runtime.JSX.Element;
type SelectItemProps = {
    value: string;
    children: React.ReactNode;
    disabled?: boolean;
    className?: string;
};
declare function SelectItem({ value, children, disabled, className }: SelectItemProps): react_jsx_runtime.JSX.Element;
type SelectGroupProps = {
    label: string;
    children: React.ReactNode;
};
declare function SelectGroup({ label, children }: SelectGroupProps): react_jsx_runtime.JSX.Element;
declare function SelectSeparator(): react_jsx_runtime.JSX.Element;

type SwitchProps = Omit<React.InputHTMLAttributes<HTMLInputElement>, "type" | "role" | "size"> & {
    invalid?: boolean;
    size?: "default" | "sm";
};
declare function Switch({ invalid, size, className, ...props }: SwitchProps): react_jsx_runtime.JSX.Element;

type TextareaProps = React.TextareaHTMLAttributes<HTMLTextAreaElement> & {
    invalid?: boolean;
};
declare function Textarea({ invalid, className, rows, ...props }: TextareaProps): react_jsx_runtime.JSX.Element;

type RadioGroupProps = React.ComponentPropsWithoutRef<typeof RadixRadioGroup.Root> & {
    invalid?: boolean;
    className?: string;
};
declare function RadioGroup({ invalid, orientation, className, ...props }: RadioGroupProps): react_jsx_runtime.JSX.Element;
type RadioItemProps = {
    value: string;
    children: React.ReactNode;
    disabled?: boolean;
    className?: string;
};
declare function RadioItem({ value, children, disabled, className }: RadioItemProps): react_jsx_runtime.JSX.Element;

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

export { Badge, type BadgeProps, Button, type ButtonProps, Checkbox, type CheckboxProps, DS_VERSION, Dialog, DialogClose, DialogContent, type DialogContentProps, DialogTitle, type DialogTitleProps, DialogTrigger, Divider, type DividerProps, Dropdown, DropdownContent, type DropdownContentProps, DropdownItem, type DropdownItemProps, DropdownTrigger, FormItem, type FormItemProps, Icon, IconButton, type IconButtonProps, type IconName, type IconProps, type IconSize, Input, type InputProps, Label, type LabelProps, LinkButton, type LinkButtonProps, LoadingSpinner, type LoadingSpinnerProps, NotAuthorized, NotFound, NotLogin, Popover, PopoverContent, type PopoverContentProps, PopoverTrigger, RadioGroup, type RadioGroupProps, RadioItem, type RadioItemProps, Select, SelectContent, type SelectContentProps, SelectGroup, type SelectGroupProps, SelectItem, type SelectItemProps, type SelectProps, SelectSeparator, SelectTrigger, type SelectTriggerProps, Switch, type SwitchProps, Textarea, type TextareaProps, ToggleBar, type ToggleBarItem, type ToggleBarProps, UnexpectedError, type UnexpectedErrorProps, badgeVariants, buttonVariants, cn };
