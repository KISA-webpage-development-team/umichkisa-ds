import { MdArrowBackIosNew } from "react-icons/md";
import { iconClass, IconBaseProps } from "./Icon";

export function BackIcon({ size = "md", className }: IconBaseProps) {
  return <MdArrowBackIosNew className={iconClass(size, className)} />;
}
