import { ClassValue } from 'clsx';
import * as react_jsx_runtime from 'react/jsx-runtime';
import * as class_variance_authority_types from 'class-variance-authority/types';
import { VariantProps } from 'class-variance-authority';
import * as react from 'react';
import { ReactNode } from 'react';
import * as lucide_react from 'lucide-react';
import * as RadixSelect from '@radix-ui/react-select';
import * as RadixRadioGroup from '@radix-ui/react-radio-group';
import { ToasterProps as ToasterProps$1 } from 'sonner';
export { toast } from 'sonner';
import * as RadixDialog from '@radix-ui/react-dialog';
import * as RadixDropdown from '@radix-ui/react-dropdown-menu';
import * as RadixPopover from '@radix-ui/react-popover';
import { DayPickerProps, DateRange } from 'react-day-picker';
export { DateRange } from 'react-day-picker';

declare function cn(...inputs: ClassValue[]): string;

declare const avatarVariants: (props?: ({
    size?: "sm" | "md" | "lg" | null | undefined;
} & class_variance_authority_types.ClassProp) | undefined) => string;
type AvatarProps = VariantProps<typeof avatarVariants> & {
    src?: string;
    name?: string;
    className?: string;
};
declare function Avatar({ src, name, size, className }: AvatarProps): react_jsx_runtime.JSX.Element;

declare const badgeVariants: (props?: ({
    variant?: "info" | "default" | "brand" | "success" | "warning" | "error" | "outline" | null | undefined;
    size?: "sm" | "md" | null | undefined;
} & class_variance_authority_types.ClassProp) | undefined) => string;
type BadgeProps = React.ComponentPropsWithoutRef<"span"> & VariantProps<typeof badgeVariants> & {
    asChild?: boolean;
};
declare function Badge({ variant, size, className, asChild, ...props }: BadgeProps): react_jsx_runtime.JSX.Element;

type AccordionSingleProps = {
    type?: "single";
    value?: string;
    defaultValue?: string;
    onValueChange?: (value: string) => void;
    children: React.ReactNode;
    className?: string;
};
type AccordionMultipleProps = {
    type: "multiple";
    value?: string[];
    defaultValue?: string[];
    onValueChange?: (value: string[]) => void;
    children: React.ReactNode;
    className?: string;
};
type AccordionProps = AccordionSingleProps | AccordionMultipleProps;
declare function Accordion({ className, ...props }: AccordionProps): react_jsx_runtime.JSX.Element;
type AccordionItemProps = {
    value: string;
    disabled?: boolean;
    children: React.ReactNode;
    className?: string;
};
declare function AccordionItem({ className, ...props }: AccordionItemProps): react_jsx_runtime.JSX.Element;
type AccordionTriggerProps = {
    children: React.ReactNode;
    showChevron?: boolean;
    className?: string;
};
declare function AccordionTrigger({ children, showChevron, className, }: AccordionTriggerProps): react_jsx_runtime.JSX.Element;
type AccordionContentProps = {
    children: React.ReactNode;
    className?: string;
};
declare function AccordionContent({ children, className, }: AccordionContentProps): react_jsx_runtime.JSX.Element;

type CardProps = React.HTMLAttributes<HTMLDivElement>;
declare function Card({ className, ...props }: CardProps): react_jsx_runtime.JSX.Element;
type CardHeaderProps = React.HTMLAttributes<HTMLDivElement>;
declare function CardHeader({ className, ...props }: CardHeaderProps): react_jsx_runtime.JSX.Element;
type HeadingElement = "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
type CardTitleProps = React.HTMLAttributes<HTMLHeadingElement> & {
    /** HTML heading element to render. Default: "h3". */
    as?: HeadingElement;
};
declare function CardTitle({ as: Component, className, ...props }: CardTitleProps): react_jsx_runtime.JSX.Element;
type CardDescriptionProps = React.HTMLAttributes<HTMLParagraphElement>;
declare function CardDescription({ className, ...props }: CardDescriptionProps): react_jsx_runtime.JSX.Element;
type CardContentProps = React.HTMLAttributes<HTMLDivElement>;
declare function CardContent({ className, ...props }: CardContentProps): react_jsx_runtime.JSX.Element;
type CardFooterProps = React.HTMLAttributes<HTMLDivElement>;
declare function CardFooter({ className, ...props }: CardFooterProps): react_jsx_runtime.JSX.Element;

type TableSize = "sm" | "md";
type TableProps = react.HTMLAttributes<HTMLTableElement> & {
    size?: TableSize;
};
declare const Table: react.ForwardRefExoticComponent<react.HTMLAttributes<HTMLTableElement> & {
    size?: TableSize;
} & react.RefAttributes<HTMLTableElement>>;
declare const TableHeader: react.ForwardRefExoticComponent<react.HTMLAttributes<HTMLTableSectionElement> & react.RefAttributes<HTMLTableSectionElement>>;
declare const TableBody: react.ForwardRefExoticComponent<react.HTMLAttributes<HTMLTableSectionElement> & react.RefAttributes<HTMLTableSectionElement>>;
declare const TableRow: react.ForwardRefExoticComponent<react.HTMLAttributes<HTMLTableRowElement> & react.RefAttributes<HTMLTableRowElement>>;
declare const TableHead: react.ForwardRefExoticComponent<react.ThHTMLAttributes<HTMLTableCellElement> & react.RefAttributes<HTMLTableCellElement>>;
declare const TableCell: react.ForwardRefExoticComponent<react.TdHTMLAttributes<HTMLTableCellElement> & react.RefAttributes<HTMLTableCellElement>>;
declare const TableCaption: react.ForwardRefExoticComponent<react.HTMLAttributes<HTMLTableCaptionElement> & react.RefAttributes<HTMLTableCaptionElement>>;
declare const TableFooter: react.ForwardRefExoticComponent<react.HTMLAttributes<HTMLTableSectionElement> & react.RefAttributes<HTMLTableSectionElement>>;
declare const TableMobileList: react.ForwardRefExoticComponent<react.OlHTMLAttributes<HTMLOListElement> & react.RefAttributes<HTMLOListElement>>;
declare const TableMobileItem: react.ForwardRefExoticComponent<react.LiHTMLAttributes<HTMLLIElement> & react.RefAttributes<HTMLLIElement>>;

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
    readonly calendar: react.ForwardRefExoticComponent<Omit<lucide_react.LucideProps, "ref"> & react.RefAttributes<SVGSVGElement>>;
    readonly check: react.ForwardRefExoticComponent<Omit<lucide_react.LucideProps, "ref"> & react.RefAttributes<SVGSVGElement>>;
    readonly "chevron-left": react.ForwardRefExoticComponent<Omit<lucide_react.LucideProps, "ref"> & react.RefAttributes<SVGSVGElement>>;
    readonly "chevron-right": react.ForwardRefExoticComponent<Omit<lucide_react.LucideProps, "ref"> & react.RefAttributes<SVGSVGElement>>;
    readonly "chevron-down": react.ForwardRefExoticComponent<Omit<lucide_react.LucideProps, "ref"> & react.RefAttributes<SVGSVGElement>>;
    readonly "circle-check": react.ForwardRefExoticComponent<Omit<lucide_react.LucideProps, "ref"> & react.RefAttributes<SVGSVGElement>>;
    readonly "circle-minus": react.ForwardRefExoticComponent<Omit<lucide_react.LucideProps, "ref"> & react.RefAttributes<SVGSVGElement>>;
    readonly "circle-plus": react.ForwardRefExoticComponent<Omit<lucide_react.LucideProps, "ref"> & react.RefAttributes<SVGSVGElement>>;
    readonly "circle-x": react.ForwardRefExoticComponent<Omit<lucide_react.LucideProps, "ref"> & react.RefAttributes<SVGSVGElement>>;
    readonly "clipboard-check": react.ForwardRefExoticComponent<Omit<lucide_react.LucideProps, "ref"> & react.RefAttributes<SVGSVGElement>>;
    readonly "clipboard-copy": react.ForwardRefExoticComponent<Omit<lucide_react.LucideProps, "ref"> & react.RefAttributes<SVGSVGElement>>;
    readonly "clock-9": react.ForwardRefExoticComponent<Omit<lucide_react.LucideProps, "ref"> & react.RefAttributes<SVGSVGElement>>;
    readonly "external-link": react.ForwardRefExoticComponent<Omit<lucide_react.LucideProps, "ref"> & react.RefAttributes<SVGSVGElement>>;
    readonly eye: react.ForwardRefExoticComponent<Omit<lucide_react.LucideProps, "ref"> & react.RefAttributes<SVGSVGElement>>;
    readonly "file-x": react.ForwardRefExoticComponent<Omit<lucide_react.LucideProps, "ref"> & react.RefAttributes<SVGSVGElement>>;
    readonly "graduation-cap": react.ForwardRefExoticComponent<Omit<lucide_react.LucideProps, "ref"> & react.RefAttributes<SVGSVGElement>>;
    readonly image: react.ForwardRefExoticComponent<Omit<lucide_react.LucideProps, "ref"> & react.RefAttributes<SVGSVGElement>>;
    readonly info: react.ForwardRefExoticComponent<Omit<lucide_react.LucideProps, "ref"> & react.RefAttributes<SVGSVGElement>>;
    readonly "layout-grid": react.ForwardRefExoticComponent<Omit<lucide_react.LucideProps, "ref"> & react.RefAttributes<SVGSVGElement>>;
    readonly list: react.ForwardRefExoticComponent<Omit<lucide_react.LucideProps, "ref"> & react.RefAttributes<SVGSVGElement>>;
    readonly lock: react.ForwardRefExoticComponent<Omit<lucide_react.LucideProps, "ref"> & react.RefAttributes<SVGSVGElement>>;
    readonly "log-in": react.ForwardRefExoticComponent<Omit<lucide_react.LucideProps, "ref"> & react.RefAttributes<SVGSVGElement>>;
    readonly mail: react.ForwardRefExoticComponent<Omit<lucide_react.LucideProps, "ref"> & react.RefAttributes<SVGSVGElement>>;
    readonly menu: react.ForwardRefExoticComponent<Omit<lucide_react.LucideProps, "ref"> & react.RefAttributes<SVGSVGElement>>;
    readonly "message-square": react.ForwardRefExoticComponent<Omit<lucide_react.LucideProps, "ref"> & react.RefAttributes<SVGSVGElement>>;
    readonly minus: react.ForwardRefExoticComponent<Omit<lucide_react.LucideProps, "ref"> & react.RefAttributes<SVGSVGElement>>;
    readonly palette: react.ForwardRefExoticComponent<Omit<lucide_react.LucideProps, "ref"> & react.RefAttributes<SVGSVGElement>>;
    readonly pencil: react.ForwardRefExoticComponent<Omit<lucide_react.LucideProps, "ref"> & react.RefAttributes<SVGSVGElement>>;
    readonly plus: react.ForwardRefExoticComponent<Omit<lucide_react.LucideProps, "ref"> & react.RefAttributes<SVGSVGElement>>;
    readonly reply: react.ForwardRefExoticComponent<Omit<lucide_react.LucideProps, "ref"> & react.RefAttributes<SVGSVGElement>>;
    readonly "search-x": react.ForwardRefExoticComponent<Omit<lucide_react.LucideProps, "ref"> & react.RefAttributes<SVGSVGElement>>;
    readonly "shield-x": react.ForwardRefExoticComponent<Omit<lucide_react.LucideProps, "ref"> & react.RefAttributes<SVGSVGElement>>;
    readonly "shopping-cart": react.ForwardRefExoticComponent<Omit<lucide_react.LucideProps, "ref"> & react.RefAttributes<SVGSVGElement>>;
    readonly smartphone: react.ForwardRefExoticComponent<Omit<lucide_react.LucideProps, "ref"> & react.RefAttributes<SVGSVGElement>>;
    readonly "thumbs-up": react.ForwardRefExoticComponent<Omit<lucide_react.LucideProps, "ref"> & react.RefAttributes<SVGSVGElement>>;
    readonly ticket: react.ForwardRefExoticComponent<Omit<lucide_react.LucideProps, "ref"> & react.RefAttributes<SVGSVGElement>>;
    readonly "trash-2": react.ForwardRefExoticComponent<Omit<lucide_react.LucideProps, "ref"> & react.RefAttributes<SVGSVGElement>>;
    readonly "triangle-alert": react.ForwardRefExoticComponent<Omit<lucide_react.LucideProps, "ref"> & react.RefAttributes<SVGSVGElement>>;
    readonly type: react.ForwardRefExoticComponent<Omit<lucide_react.LucideProps, "ref"> & react.RefAttributes<SVGSVGElement>>;
    readonly "user-round": react.ForwardRefExoticComponent<Omit<lucide_react.LucideProps, "ref"> & react.RefAttributes<SVGSVGElement>>;
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
    id?: string;
    required?: boolean;
    className?: string;
    children: React.ReactNode;
};
declare function Label({ htmlFor, id, required, className, children }: LabelProps): react_jsx_runtime.JSX.Element;

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
    text?: string;
};
declare function Checkbox({ invalid, text, className, disabled, ...props }: CheckboxProps): react_jsx_runtime.JSX.Element;

type SelectProps = React.ComponentPropsWithoutRef<typeof RadixSelect.Root>;
declare function Select(props: SelectProps): react_jsx_runtime.JSX.Element;
type SelectTriggerProps = {
    placeholder?: string;
    invalid?: boolean;
    "aria-labelledby"?: string;
    className?: string;
};
declare function SelectTrigger({ placeholder, invalid, "aria-labelledby": ariaLabelledBy, className }: SelectTriggerProps): react_jsx_runtime.JSX.Element;
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
    text?: string;
};
declare function Switch({ invalid, size, text, className, disabled, ...props }: SwitchProps): react_jsx_runtime.JSX.Element;

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
    text: string;
    disabled?: boolean;
    className?: string;
};
declare function RadioItem({ value, text, disabled, className }: RadioItemProps): react_jsx_runtime.JSX.Element;

declare const containerVariants: (props?: ({
    size?: "sm" | "md" | "default" | "prose" | null | undefined;
} & class_variance_authority_types.ClassProp) | undefined) => string;
type AllowedElement = "div" | "section" | "main" | "article" | "header" | "footer" | "nav";
type ContainerProps = React.HTMLAttributes<HTMLElement> & VariantProps<typeof containerVariants> & {
    /** HTML element to render. Default: "div". */
    as?: AllowedElement;
};
declare function Container({ as: Component, size, className, children, ...props }: ContainerProps): react_jsx_runtime.JSX.Element;

type GridColumns = number | {
    base?: number;
    md?: number;
    lg?: number;
};
type GridProps = React.HTMLAttributes<HTMLDivElement> & {
    /** Number of columns — a number or responsive object { base, md, lg }. Max 6. */
    columns?: GridColumns;
    /** Gap between items using DS spacing tiers. Default: "component" (16px). */
    gap?: "element" | "component" | "section";
};
declare function Grid({ columns, gap, className, children, ...props }: GridProps): react_jsx_runtime.JSX.Element;

declare function Icon({ name, size, label, className }: IconProps): react_jsx_runtime.JSX.Element;

declare const alertVariants: (props?: ({
    variant?: "info" | "success" | "warning" | "error" | null | undefined;
} & class_variance_authority_types.ClassProp) | undefined) => string;
type AlertProps = React.ComponentPropsWithoutRef<"div"> & VariantProps<typeof alertVariants> & {
    title?: string;
    icon?: IconName | null;
};
declare function Alert({ variant, title, icon, className, children, ...props }: AlertProps): react_jsx_runtime.JSX.Element;

type LoadingSpinnerProps = {
    /** Spinner diameter. sm = 20px, md = 32px, lg = 48px. */
    size?: "sm" | "md" | "lg";
    /** Accessible label for screen readers. Always applied as aria-label. */
    label?: string;
    /** Render the label visually below the spinner. */
    showLabel?: boolean;
    /** Applied to the outer wrapper div. */
    className?: string;
};
declare function LoadingSpinner({ size, label, showLabel, className, }: LoadingSpinnerProps): react_jsx_runtime.JSX.Element;

type SkeletonProps = React.ComponentPropsWithoutRef<"div"> & {
    variant?: "rectangular" | "circular";
};
declare function Skeleton({ variant, className, style, ...props }: SkeletonProps): react_jsx_runtime.JSX.Element;

type StatusViewVariant = "not-found" | "not-authorized" | "not-logged-in" | "error";
type StatusViewProps = {
    /** Determines default icon, title, and description. */
    variant: StatusViewVariant;
    /** Large status code displayed above the icon (e.g. "404"). */
    code?: string;
    /** Override the variant's default icon. Pass a registered Lucide icon name. */
    icon?: IconName;
    /** Override the variant's default title. */
    title?: string;
    /** Override the variant's default description. */
    description?: string;
    /** Optional action area rendered below the description. */
    action?: ReactNode;
    /** Applied to the outer wrapper div. */
    className?: string;
};
declare function StatusView({ variant, code, icon, title, description, action, className, }: StatusViewProps): react_jsx_runtime.JSX.Element;

type ToasterProps = Pick<ToasterProps$1, "position" | "duration" | "expand" | "visibleToasts" | "offset" | "gap" | "dir" | "className" | "style">;
declare function Toaster({ position, duration, ...props }: ToasterProps): react_jsx_runtime.JSX.Element;

type DialogProps = React.ComponentPropsWithoutRef<typeof RadixDialog.Root>;
declare function Dialog(props: DialogProps): react_jsx_runtime.JSX.Element;
type DialogTriggerProps = React.ComponentPropsWithoutRef<typeof RadixDialog.Trigger>;
declare function DialogTrigger(props: DialogTriggerProps): react_jsx_runtime.JSX.Element;
type DialogCloseProps = React.ComponentPropsWithoutRef<typeof RadixDialog.Close>;
declare function DialogClose(props: DialogCloseProps): react_jsx_runtime.JSX.Element;
type DialogContentProps = {
    children: React.ReactNode;
    size?: "sm" | "md" | "lg" | "full";
    showCloseButton?: boolean;
    className?: string;
};
declare function DialogContent({ children, size, showCloseButton, className, }: DialogContentProps): react_jsx_runtime.JSX.Element;
type DialogTitleProps = {
    children: React.ReactNode;
    className?: string;
};
declare function DialogTitle({ children, className }: DialogTitleProps): react_jsx_runtime.JSX.Element;
type DialogDescriptionProps = {
    children: React.ReactNode;
    className?: string;
};
declare function DialogDescription({ children, className }: DialogDescriptionProps): react_jsx_runtime.JSX.Element;
type DialogFooterProps = {
    children: React.ReactNode;
    className?: string;
};
declare function DialogFooter({ children, className }: DialogFooterProps): react_jsx_runtime.JSX.Element;

type DropdownProps = React.ComponentPropsWithoutRef<typeof RadixDropdown.Root>;
declare function Dropdown(props: DropdownProps): react_jsx_runtime.JSX.Element;
type DropdownTriggerProps = React.ComponentPropsWithoutRef<typeof RadixDropdown.Trigger>;
declare function DropdownTrigger(props: DropdownTriggerProps): react_jsx_runtime.JSX.Element;
type DropdownContentProps = {
    children: React.ReactNode;
    side?: "top" | "right" | "bottom" | "left";
    align?: "start" | "center" | "end";
    sideOffset?: number;
    className?: string;
};
declare function DropdownContent({ children, side, align, sideOffset, className, }: DropdownContentProps): react_jsx_runtime.JSX.Element;
type DropdownItemProps = {
    children: React.ReactNode;
    onSelect?: () => void;
    variant?: "default" | "destructive";
    disabled?: boolean;
    className?: string;
};
declare function DropdownItem({ children, onSelect, variant, disabled, className, }: DropdownItemProps): react_jsx_runtime.JSX.Element;
type DropdownGroupProps = {
    label: string;
    children: React.ReactNode;
};
declare function DropdownGroup({ label, children }: DropdownGroupProps): react_jsx_runtime.JSX.Element;
declare function DropdownSeparator(): react_jsx_runtime.JSX.Element;

declare const Popover: react.FC<RadixPopover.PopoverProps>;
declare const PopoverTrigger: react.ForwardRefExoticComponent<RadixPopover.PopoverTriggerProps & react.RefAttributes<HTMLButtonElement>>;
type PopoverContentProps = React.ComponentPropsWithoutRef<typeof RadixPopover.Content>;
declare function PopoverContent({ className, align, sideOffset, ...props }: PopoverContentProps): react_jsx_runtime.JSX.Element;

type TooltipProps = {
    /** Text content displayed in the tooltip bubble. */
    content: string;
    /** The trigger element — must accept a ref. */
    children: React.ReactNode;
    /** Preferred side of the trigger to render the tooltip. */
    side?: "top" | "right" | "bottom" | "left";
    /** Milliseconds before the tooltip appears on hover. */
    delayDuration?: number;
};
declare function Tooltip({ content, children, side, delayDuration, }: TooltipProps): react_jsx_runtime.JSX.Element;

type DividerProps = {
    orientation?: "horizontal" | "vertical";
    className?: string;
} & Omit<React.ComponentPropsWithoutRef<"hr">, "className">;
declare function Divider({ orientation, className, ...props }: DividerProps): react_jsx_runtime.JSX.Element;

type TabsProps = {
    value?: string;
    defaultValue?: string;
    onValueChange?: (value: string) => void;
    variant?: "underline" | "pill";
    size?: "sm" | "md";
    className?: string;
    children: React.ReactNode;
};
declare function Tabs({ value: controlledValue, defaultValue, onValueChange, variant, size, className, children, }: TabsProps): react_jsx_runtime.JSX.Element;
type TabsListProps = {
    variant?: "underline" | "pill";
    size?: "sm" | "md";
    fullWidth?: boolean;
    className?: string;
    children: React.ReactNode;
};
declare function TabsList({ variant, size, fullWidth, className, children, }: TabsListProps): react_jsx_runtime.JSX.Element;
declare const tabsTriggerVariants: (props?: ({
    variant?: "underline" | "pill" | null | undefined;
    size?: "sm" | "md" | null | undefined;
} & class_variance_authority_types.ClassProp) | undefined) => string;
type TabsTriggerProps = VariantProps<typeof tabsTriggerVariants> & {
    value: string;
    disabled?: boolean;
    className?: string;
    children: React.ReactNode;
};
declare function TabsTrigger({ value, disabled, className, children }: TabsTriggerProps): react_jsx_runtime.JSX.Element;
type TabsContentProps = {
    value: string;
    className?: string;
    children: React.ReactNode;
};
declare function TabsContent({ value, className, children }: TabsContentProps): react_jsx_runtime.JSX.Element | null;

type PaginationProps = {
    /** Current page (1-indexed) */
    page: number;
    /** Total number of pages */
    totalPages: number;
    /** Callback when page changes */
    onPageChange: (page: number) => void;
    /** Number of sibling pages to show on each side of current page. Default: 1 */
    siblingCount?: number;
    /** Additional class names for the nav wrapper */
    className?: string;
};
declare function Pagination({ page, totalPages, onPageChange, siblingCount, className, }: PaginationProps): react_jsx_runtime.JSX.Element;

type ToggleGroupItem = {
    value: string;
    label: string;
    icon?: ReactNode;
};
type ToggleGroupProps = {
    value: string;
    onValueChange: (value: string) => void;
    items: ToggleGroupItem[];
    fullWidth?: boolean;
    className?: string;
};
declare function ToggleGroup({ value, onValueChange, items, fullWidth, className, }: ToggleGroupProps): react_jsx_runtime.JSX.Element;

type OnlyMobileViewProps = {
    /** Content to render on mobile screens. */
    children: ReactNode;
    /** Message displayed on the desktop overlay. */
    message?: string;
    /** Applied to the outer wrapper div. */
    className?: string;
};
declare function OnlyMobileView({ children, message, className, }: OnlyMobileViewProps): react_jsx_runtime.JSX.Element;

type CalendarProps = DayPickerProps & {
    className?: string;
};
declare function Calendar({ className, showOutsideDays, classNames: classNamesProp, components: componentsProp, ...props }: CalendarProps): react_jsx_runtime.JSX.Element;

type DatePickerProps = {
    value?: Date;
    onChange?: (date: Date | undefined) => void;
    formatDate?: (date: Date) => string;
    placeholder?: string;
    disabled?: boolean;
    invalid?: boolean;
    className?: string;
    calendarProps?: Omit<CalendarProps, "mode" | "selected" | "onSelect">;
};
declare function DatePicker({ value, onChange, formatDate, placeholder, disabled, invalid, className, calendarProps, }: DatePickerProps): react_jsx_runtime.JSX.Element;
type DateRangePickerProps = {
    value?: DateRange;
    onChange?: (range: DateRange | undefined) => void;
    formatDate?: (date: Date) => string;
    placeholder?: string;
    disabled?: boolean;
    invalid?: boolean;
    className?: string;
    calendarProps?: Omit<CalendarProps, "mode" | "selected" | "onSelect">;
};
declare function DateRangePicker({ value, onChange, formatDate, placeholder, disabled, invalid, className, calendarProps, }: DateRangePickerProps): react_jsx_runtime.JSX.Element;

declare const DS_VERSION = "0.1.0";

export { Accordion, AccordionContent, type AccordionContentProps, AccordionItem, type AccordionItemProps, type AccordionProps, AccordionTrigger, type AccordionTriggerProps, Alert, type AlertProps, Avatar, type AvatarProps, Badge, type BadgeProps, Button, type ButtonProps, Calendar, type CalendarProps, Card, CardContent, type CardContentProps, CardDescription, type CardDescriptionProps, CardFooter, type CardFooterProps, CardHeader, type CardHeaderProps, type CardProps, CardTitle, type CardTitleProps, Checkbox, type CheckboxProps, Container, type ContainerProps, DS_VERSION, DatePicker, type DatePickerProps, DateRangePicker, type DateRangePickerProps, Dialog, DialogClose, type DialogCloseProps, DialogContent, type DialogContentProps, DialogDescription, type DialogDescriptionProps, DialogFooter, type DialogFooterProps, type DialogProps, DialogTitle, type DialogTitleProps, DialogTrigger, type DialogTriggerProps, Divider, type DividerProps, Dropdown, DropdownContent, type DropdownContentProps, DropdownGroup, type DropdownGroupProps, DropdownItem, type DropdownItemProps, type DropdownProps, DropdownSeparator, DropdownTrigger, type DropdownTriggerProps, FormItem, type FormItemProps, Grid, type GridColumns, type GridProps, Icon, IconButton, type IconButtonProps, type IconName, type IconProps, type IconSize, Input, type InputProps, Label, type LabelProps, LinkButton, type LinkButtonProps, LoadingSpinner, type LoadingSpinnerProps, OnlyMobileView, type OnlyMobileViewProps, Pagination, type PaginationProps, Popover, PopoverContent, type PopoverContentProps, PopoverTrigger, RadioGroup, type RadioGroupProps, RadioItem, type RadioItemProps, Select, SelectContent, type SelectContentProps, SelectGroup, type SelectGroupProps, SelectItem, type SelectItemProps, type SelectProps, SelectSeparator, SelectTrigger, type SelectTriggerProps, Skeleton, type SkeletonProps, StatusView, type StatusViewProps, Switch, type SwitchProps, Table, TableBody, TableCaption, TableCell, TableFooter, TableHead, TableHeader, TableMobileItem, TableMobileList, type TableProps, TableRow, Tabs, TabsContent, type TabsContentProps, TabsList, type TabsListProps, type TabsProps, TabsTrigger, type TabsTriggerProps, Textarea, type TextareaProps, Toaster, type ToasterProps, ToggleGroup, type ToggleGroupItem, type ToggleGroupProps, Tooltip, type TooltipProps, alertVariants, avatarVariants, badgeVariants, buttonVariants, cn, tabsTriggerVariants };
