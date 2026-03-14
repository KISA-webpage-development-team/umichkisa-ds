import { cn } from "@/utils/cn";

export type IconSize = "xs" | "sm" | "md" | "lg" | "xl";

const sizeClass: Record<IconSize, string> = {
  xs: "ds-icon-xs",
  sm: "ds-icon-sm",
  md: "ds-icon-md",
  lg: "ds-icon-lg",
  xl: "ds-icon-xl",
};

export type IconBaseProps = {
  size?: IconSize;
  className?: string;
};

export function iconClass(size: IconSize = "md", className?: string): string {
  return cn(sizeClass[size], className);
}
