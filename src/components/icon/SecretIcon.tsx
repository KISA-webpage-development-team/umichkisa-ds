import { CiLock } from "react-icons/ci";
import { iconClass, IconBaseProps } from "./Icon";

export function SecretIcon({ size = "sm", className }: IconBaseProps) {
  return <CiLock className={iconClass(size, className)} />;
}
