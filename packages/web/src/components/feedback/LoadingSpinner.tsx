import { cn } from "@/utils/cn";

export type LoadingSpinnerProps = {
  fullScreen?: boolean;
  label?: string;
  className?: string;
};

export function LoadingSpinner({
  fullScreen = true,
  label = "로딩중입니다",
  className,
}: LoadingSpinnerProps) {
  return (
    <div
      className={cn(
        "flex flex-col gap-3 justify-center items-center bg-[var(--color-surface)]",
        fullScreen ? "fixed top-0 left-0 w-full h-full z-50" : "h-full w-full mt-8",
        className
      )}
    >
      <div
        className="ds-spinner"
        role="status"
        aria-label={label}
      />
      <p className="text-sm font-medium text-[var(--color-muted-foreground)]">{label}</p>
    </div>
  );
}
