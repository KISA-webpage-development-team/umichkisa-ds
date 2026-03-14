import { FaGraduationCap } from "react-icons/fa";
import { iconClass, IconBaseProps } from "./Icon";

export function GradIcon({ size = "md", className }: IconBaseProps) {
  return <FaGraduationCap className={iconClass(size, className)} />;
}
