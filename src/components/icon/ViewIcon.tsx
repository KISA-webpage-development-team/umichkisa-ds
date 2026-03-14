import { FiEye } from "react-icons/fi";
import { iconClass, IconBaseProps } from "./Icon";

export function ViewIcon({ size = "md", className }: IconBaseProps) {
  return <FiEye className={iconClass(size, className)} />;
}
