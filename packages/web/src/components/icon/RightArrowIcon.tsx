import { FaChevronRight } from "react-icons/fa";
import { iconClass, IconBaseProps } from "./Icon";

export function RightArrowIcon({ size = "md", className }: IconBaseProps) {
  return <FaChevronRight className={iconClass(size, className)} />;
}
