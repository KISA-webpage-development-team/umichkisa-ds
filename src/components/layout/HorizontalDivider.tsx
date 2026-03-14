import { cn } from "@/utils/cn";

export type HorizontalDividerColor = "light" | "gray";

export type HorizontalDividerProps = {
  color?: HorizontalDividerColor;
  className?: string;
};

export function HorizontalDivider({ color = "light", className }: HorizontalDividerProps) {
  return (
    <div
      className={cn(
        "border w-full rounded-lg",
        color === "light" ? "border-gray-200/60" : "border-gray-300",
        className
      )}
    />
  );
}
