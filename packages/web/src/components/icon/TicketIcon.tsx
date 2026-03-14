import { IoTicketSharp } from "react-icons/io5";
import { iconClass, IconBaseProps } from "./Icon";

export function TicketIcon({ size = "md", className }: IconBaseProps) {
  return <IoTicketSharp className={iconClass(size, className)} />;
}
