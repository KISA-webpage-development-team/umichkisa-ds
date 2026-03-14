import { ImReply } from "react-icons/im";
import { iconClass, IconBaseProps } from "./Icon";
import { cn } from "@/utils/cn";

export type ReplyIconProps = IconBaseProps & {
  flip?: boolean;
};

export function ReplyIcon({ size = "md", flip = false, className }: ReplyIconProps) {
  return (
    <ImReply className={iconClass(size, cn(flip && "scale-x-[-1]", className))} />
  );
}
