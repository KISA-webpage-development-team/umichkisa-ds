import React from "react";
import type { LucideProps } from "lucide-react";
import { registry } from "./registry";
import type { IconProps, IconSize } from "./types";

const sizeMap: Record<IconSize, number> = {
  xs: 12,
  sm: 16,
  md: 20,
  lg: 24,
  xl: 32,
};

export function Icon({ name, size = "md", label, className }: IconProps) {
  const LucideComponent = registry[name] as React.ComponentType<LucideProps>;
  const px = sizeMap[size];

  if (label) {
    return (
      <LucideComponent
        size={px}
        className={className}
        aria-label={label}
      />
    );
  }

  return (
    <LucideComponent
      size={px}
      className={className}
      aria-hidden="true"
    />
  );
}
