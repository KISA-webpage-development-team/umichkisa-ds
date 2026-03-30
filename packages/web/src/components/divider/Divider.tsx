import { cn } from "@/utils/cn";

export type DividerProps = {
  orientation?: "horizontal" | "vertical";
  className?: string;
} & Omit<React.ComponentPropsWithoutRef<"hr">, "className">;

export function Divider({
  orientation = "horizontal",
  className,
  ...props
}: DividerProps) {
  return (
    <hr
      role="separator"
      aria-orientation={orientation}
      className={cn(
        "border-border",
        orientation === "horizontal"
          ? "border-t w-full"
          : "border-l self-stretch h-auto",
        className
      )}
      {...props}
    />
  );
}
