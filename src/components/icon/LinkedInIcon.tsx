import { FaLinkedin } from "react-icons/fa";
import { iconClass, IconBaseProps } from "./Icon";

export function LinkedInIcon({ size = "md", className }: IconBaseProps) {
  return <FaLinkedin className={iconClass(size, className)} color="#0a66c2" />;
}
