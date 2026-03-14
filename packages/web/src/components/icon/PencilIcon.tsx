import { BiPencil } from "react-icons/bi";
import { iconClass, IconBaseProps } from "./Icon";
import { cn } from "@/utils/cn";

export type PencilIconProps = IconBaseProps & {
  color?: "white" | "gray";
};

export function PencilIcon({ size = "md", color = "white", className }: PencilIconProps) {
  return (
    <BiPencil
      className={iconClass(size, cn(
        color === "gray" ? "text-gray-400" : "text-[var(--color-brand-accent)]",
        className
      ))}
    />
  );
}
