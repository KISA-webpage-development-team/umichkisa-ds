import type { IconName } from "./registry";

export type { IconName };

export type IconSize = "xs" | "sm" | "md" | "lg" | "xl";

export interface IconProps {
  name: IconName;
  size?: IconSize;
  label?: string;
  className?: string;
}
