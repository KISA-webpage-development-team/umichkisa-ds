import { FaPlus } from "react-icons/fa";
import { iconClass, IconBaseProps } from "./Icon";

export function PlusIcon({ size = "md", className }: IconBaseProps) {
  return <FaPlus className={iconClass(size, className)} />;
}
