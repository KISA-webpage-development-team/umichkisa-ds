import { RxCross2 } from "react-icons/rx";
import { iconClass, IconBaseProps } from "./Icon";

export function CrossIcon({ size = "md", className }: IconBaseProps) {
  return <RxCross2 className={iconClass(size, className)} />;
}
