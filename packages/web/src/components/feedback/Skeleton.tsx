import { cn } from "@/utils/cn";

type SkeletonProps = React.ComponentPropsWithoutRef<"div"> & {
  variant?: "rectangular" | "circular";
};

function Skeleton({
  variant = "rectangular",
  className,
  style,
  ...props
}: SkeletonProps) {
  return (
    <div
      className={cn(
        "bg-border",
        variant === "circular" ? "rounded-full" : "rounded-md w-full",
        className,
      )}
      style={{ animation: "ds-pulse 2s ease-in-out infinite", ...style }}
      {...props}
    />
  );
}

export { Skeleton };
export type { SkeletonProps };
