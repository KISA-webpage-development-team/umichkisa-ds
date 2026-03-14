import { LuClock9 } from "react-icons/lu";
import { iconClass, IconBaseProps } from "./Icon";

export function ClockIcon({ size = "sm", className }: IconBaseProps) {
  return <LuClock9 className={iconClass(size, className ?? "text-gray-600")} />;
}
