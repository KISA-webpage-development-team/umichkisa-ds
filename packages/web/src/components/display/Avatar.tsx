import { useState } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/utils/cn";
import { Icon } from "@/components/icon";

const avatarVariants = cva(
  "inline-flex items-center justify-center rounded-full overflow-hidden shrink-0 bg-brand-primary text-brand-foreground",
  {
    variants: {
      size: {
        sm: "w-8 h-8",
        md: "w-10 h-10",
        lg: "w-14 h-14",
      },
    },
    defaultVariants: {
      size: "md",
    },
  },
);

type AvatarProps = VariantProps<typeof avatarVariants> & {
  src?: string;
  name?: string;
  className?: string;
};

function getInitials(name: string): string {
  const parts = name.trim().split(/\s+/);
  if (parts.length === 1) return parts[0][0].toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

const initialsTextClass: Record<string, string> = {
  sm: "type-caption",
  md: "type-body-sm",
  lg: "type-body",
};

const iconSize: Record<string, "xs" | "sm" | "md"> = {
  sm: "xs",
  md: "sm",
  lg: "md",
};

function Avatar({ src, name, size = "md", className }: AvatarProps) {
  const [imgError, setImgError] = useState(false);
  const resolvedSize = size ?? "md";

  const showImage = src && !imgError;
  const showInitials = !showImage && name;

  if (showImage) {
    return (
      <span
        className={cn(avatarVariants({ size }), className)}
        role="img"
        aria-label={name}
      >
        <img
          src={src}
          alt={name ?? ""}
          className="w-full h-full object-cover"
          onError={() => setImgError(true)}
        />
      </span>
    );
  }

  if (showInitials) {
    return (
      <span
        className={cn(avatarVariants({ size }), className)}
        role="img"
        aria-label={name}
      >
        <span className={initialsTextClass[resolvedSize]} aria-hidden="true">
          {getInitials(name)}
        </span>
      </span>
    );
  }

  return (
    <span
      className={cn(avatarVariants({ size }), className)}
      role="img"
      aria-label="User avatar"
    >
      <Icon name="user-round" size={iconSize[resolvedSize]} />
    </span>
  );
}

export { Avatar, avatarVariants };
export type { AvatarProps };
