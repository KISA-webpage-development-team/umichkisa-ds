import { FaMinus } from "react-icons/fa";
import { iconClass, IconBaseProps } from "./Icon";

export function MinusIcon({ size = "md", className }: IconBaseProps) {
  return <FaMinus className={iconClass(size, className)} />;
}
