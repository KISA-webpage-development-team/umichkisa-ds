import { AiOutlineLike, AiFillLike } from "react-icons/ai";
import { iconClass, IconBaseProps } from "./Icon";
import { cn } from "@/utils/cn";

export type LikeIconProps = IconBaseProps & {
  fill?: boolean;
  isGray?: boolean;
  color?: "blue" | "maize";
};

export function LikeIcon({
  size = "md",
  fill = false,
  isGray = false,
  color = "blue",
  className,
}: LikeIconProps) {
  const colorClass = isGray
    ? ""
    : color === "blue"
    ? "text-[var(--color-brand-primary)]"
    : "text-[var(--color-brand-accent)]";

  const cls = iconClass(size, cn(colorClass, className));

  return fill ? <AiFillLike className={cls} /> : <AiOutlineLike className={cls} />;
}
