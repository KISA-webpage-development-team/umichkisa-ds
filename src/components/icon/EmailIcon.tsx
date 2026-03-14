import { AiOutlineMail } from "react-icons/ai";
import { iconClass, IconBaseProps } from "./Icon";

export function EmailIcon({ size = "md", className }: IconBaseProps) {
  return <AiOutlineMail className={iconClass(size, className)} />;
}
