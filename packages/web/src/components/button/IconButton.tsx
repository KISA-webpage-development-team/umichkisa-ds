import { cn } from "@/utils/cn";
import { Button } from "./Button";
import { Icon } from "../icon/Icon";
import type { IconName } from "../icon/types";
import type { ButtonProps } from "./Button";

type IconButtonSize = "sm" | "md" | "lg";

const iconSizeMap: Record<IconButtonSize, "sm" | "md" | "lg"> = {
  sm: "sm",
  md: "md",
  lg: "lg",
};

const sizeStyles: Record<IconButtonSize, string> = {
  sm: "p-2",
  md: "p-2.5",
  lg: "p-3",
};

const touchTarget = [
  "relative",
  "after:content-[''] after:absolute after:top-1/2 after:left-1/2",
  "after:-translate-x-1/2 after:-translate-y-1/2",
  "after:min-w-[44px] after:min-h-[44px] after:w-full after:h-full",
].join(" ");

type IconButtonProps = {
  icon: IconName;
  size?: IconButtonSize;
  "aria-label": string;
} & Omit<ButtonProps, "children" | "size">;

function IconButton({
  icon,
  size = "md",
  variant = "secondary",
  className,
  ...rest
}: IconButtonProps) {
  return (
    <Button
      variant={variant}
      className={cn(sizeStyles[size], touchTarget, className)}
      {...rest}
    >
      <Icon name={icon} size={iconSizeMap[size]} />
    </Button>
  );
}

export { IconButton };
export type { IconButtonProps };
