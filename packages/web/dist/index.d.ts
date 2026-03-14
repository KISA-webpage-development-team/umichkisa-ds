import { ClassValue } from 'clsx';
import * as react_jsx_runtime from 'react/jsx-runtime';
import * as class_variance_authority_types from 'class-variance-authority/types';
import { VariantProps } from 'class-variance-authority';
import * as react from 'react';
import * as RadixDialog from '@radix-ui/react-dialog';
import * as RadixDropdown from '@radix-ui/react-dropdown-menu';
import * as RadixPopover from '@radix-ui/react-popover';

declare function cn(...inputs: ClassValue[]): string;

declare const buttonVariants: (props?: ({
    variant?: "primary" | "secondary" | "tertiary" | null | undefined;
} & class_variance_authority_types.ClassProp) | undefined) => string;
type ButtonVariant = "primary" | "secondary" | "tertiary";
type ButtonProps = VariantProps<typeof buttonVariants> & {
    disabled?: boolean;
    forSubmit?: boolean;
    className?: string;
    onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
    children: React.ReactNode;
};
declare function Button({ variant, disabled, forSubmit, className, onClick, children, }: ButtonProps): react_jsx_runtime.JSX.Element;

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

type HorizontalDividerColor = "light" | "gray";
type HorizontalDividerProps = {
    color?: HorizontalDividerColor;
    className?: string;
};
declare function HorizontalDivider({ color, className }: HorizontalDividerProps): react_jsx_runtime.JSX.Element;

type VerticalDividerProps = {
    className?: string;
};
declare function VerticalDivider({ className }: VerticalDividerProps): react_jsx_runtime.JSX.Element;

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

type IconSize = "xs" | "sm" | "md" | "lg" | "xl";
type IconBaseProps = {
    size?: IconSize;
    className?: string;
};
declare function iconClass(size?: IconSize, className?: string): string;

declare function BackIcon({ size, className }: IconBaseProps): react_jsx_runtime.JSX.Element;

declare function ClockIcon({ size, className }: IconBaseProps): react_jsx_runtime.JSX.Element;

type CommentIconProps = IconBaseProps & {
    color?: "black" | "gray";
};
declare function CommentIcon({ size, color, className }: CommentIconProps): react_jsx_runtime.JSX.Element;

declare function CrossIcon({ size, className }: IconBaseProps): react_jsx_runtime.JSX.Element;

declare function EmailIcon({ size, className }: IconBaseProps): react_jsx_runtime.JSX.Element;

declare function GitIcon({ size, className }: IconBaseProps): react_jsx_runtime.JSX.Element;

declare function GradIcon({ size, className }: IconBaseProps): react_jsx_runtime.JSX.Element;

type LikeIconProps = IconBaseProps & {
    fill?: boolean;
    isGray?: boolean;
    color?: "blue" | "maize";
};
declare function LikeIcon({ size, fill, isGray, color, className, }: LikeIconProps): react_jsx_runtime.JSX.Element;

declare function LinkedInIcon({ size, className }: IconBaseProps): react_jsx_runtime.JSX.Element;

declare function ListIcon({ size, className }: IconBaseProps): react_jsx_runtime.JSX.Element;

declare function MinusIcon({ size, className }: IconBaseProps): react_jsx_runtime.JSX.Element;

type PencilIconProps = IconBaseProps & {
    color?: "white" | "gray";
};
declare function PencilIcon({ size, color, className }: PencilIconProps): react_jsx_runtime.JSX.Element;

declare function PlusIcon({ size, className }: IconBaseProps): react_jsx_runtime.JSX.Element;

type ReplyIconProps = IconBaseProps & {
    flip?: boolean;
};
declare function ReplyIcon({ size, flip, className }: ReplyIconProps): react_jsx_runtime.JSX.Element;

declare function RightArrowIcon({ size, className }: IconBaseProps): react_jsx_runtime.JSX.Element;

declare function SecretIcon({ size, className }: IconBaseProps): react_jsx_runtime.JSX.Element;

declare function TicketIcon({ size, className }: IconBaseProps): react_jsx_runtime.JSX.Element;

type TrashcanIconProps = IconBaseProps & {
    color?: "white" | "gray";
};
declare function TrashcanIcon({ size, color, className }: TrashcanIconProps): react_jsx_runtime.JSX.Element;

declare function ViewIcon({ size, className }: IconBaseProps): react_jsx_runtime.JSX.Element;

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

declare const DS_VERSION = "0.1.0";

export { BackIcon, Button, type ButtonProps, type ButtonVariant, ClockIcon, CommentIcon, type CommentIconProps, CrossIcon, DS_VERSION, Dialog, DialogClose, DialogContent, type DialogContentProps, DialogTitle, type DialogTitleProps, DialogTrigger, Dropdown, DropdownContent, type DropdownContentProps, DropdownItem, type DropdownItemProps, DropdownTrigger, EmailIcon, FormItem, type FormItemProps, GitIcon, GradIcon, HorizontalDivider, type HorizontalDividerColor, type HorizontalDividerProps, type IconBaseProps, IconButton, type IconButtonProps, type IconSize, Input, type InputProps, Label, type LabelProps, LikeIcon, type LikeIconProps, LinkButton, type LinkButtonProps, LinkedInIcon, ListIcon, LoadingSpinner, type LoadingSpinnerProps, MinusIcon, NotAuthorized, NotFound, NotLogin, PencilIcon, type PencilIconProps, PlusIcon, Popover, PopoverContent, type PopoverContentProps, PopoverTrigger, ReplyIcon, type ReplyIconProps, RightArrowIcon, SecretIcon, TicketIcon, ToggleBar, type ToggleBarItem, type ToggleBarProps, TrashcanIcon, type TrashcanIconProps, UnexpectedError, type UnexpectedErrorProps, VerticalDivider, type VerticalDividerProps, ViewIcon, cn, iconClass };
