import { FaRegComments } from "react-icons/fa";
import { iconClass, IconBaseProps } from "./Icon";
import { cn } from "@/utils/cn";

export type CommentIconProps = IconBaseProps & {
  color?: "black" | "gray";
};

export function CommentIcon({ size = "md", color = "black", className }: CommentIconProps) {
  return (
    <FaRegComments
      className={iconClass(size, cn(color === "gray" ? "text-gray-400" : "text-black", className))}
    />
  );
}
