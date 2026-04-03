import { cn } from "@/utils/cn";

type SkeletonProps = React.ComponentPropsWithoutRef<"div"> & {
  variant?: "rectangular" | "circular";
};

function Skeleton({
  variant = "rectangular",
  className,
  ...props
}: SkeletonProps) {
  return (
    <div
      className={cn(
        "animate-pulse bg-surface-muted",
        variant === "circular" ? "rounded-full" : "rounded-md w-full",
        className,
      )}
      {...props}
    />
  );
}

export { Skeleton };
export type { SkeletonProps };
