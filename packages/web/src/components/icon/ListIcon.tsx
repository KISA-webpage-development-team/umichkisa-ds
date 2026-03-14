import { IoListOutline } from "react-icons/io5";
import { iconClass, IconBaseProps } from "./Icon";

export function ListIcon({ size = "md", className }: IconBaseProps) {
  return <IoListOutline className={iconClass(size, className)} />;
}
