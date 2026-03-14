import { MdDelete } from "react-icons/md";
import { iconClass, IconBaseProps } from "./Icon";
import { cn } from "@/utils/cn";

export type TrashcanIconProps = IconBaseProps & {
  color?: "white" | "gray";
};

export function TrashcanIcon({ size = "md", color = "white", className }: TrashcanIconProps) {
  return (
    <MdDelete
      className={iconClass(size, cn(
        color === "gray" ? "text-gray-400" : "text-[var(--color-brand-accent)]",
        className
      ))}
    />
  );
}
