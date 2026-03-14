import { FaGithub } from "react-icons/fa";
import { iconClass, IconBaseProps } from "./Icon";

export function GitIcon({ size = "md", className }: IconBaseProps) {
  return <FaGithub className={iconClass(size, className)} />;
}
