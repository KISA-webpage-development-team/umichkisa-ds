import { cn } from "@/utils/cn";

export type VerticalDividerProps = {
  className?: string;
};

export function VerticalDivider({ className }: VerticalDividerProps) {
  return (
    <div
      className={cn(
        "border-l border-[var(--color-border)] self-stretch",
        className
      )}
    />
  );
}
