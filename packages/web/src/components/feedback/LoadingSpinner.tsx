import { cn } from "@/utils/cn";

export type LoadingSpinnerProps = {
  /** Spinner diameter. sm = 20px, md = 32px, lg = 48px. */
  size?: "sm" | "md" | "lg";
  /** Accessible label for screen readers. Always applied as aria-label. */
  label?: string;
  /** Render the label visually below the spinner. */
  showLabel?: boolean;
  /** Applied to the outer wrapper div. */
  className?: string;
};

const sizeClasses = {
  sm: "ds-spinner-sm",
  md: "ds-spinner-md",
  lg: "ds-spinner-lg",
} as const;

export function LoadingSpinner({
  size = "md",
  label = "Loading",
  showLabel = false,
  className,
}: LoadingSpinnerProps) {
  return (
    <div
      className={cn(
        "inline-flex flex-col items-center justify-center gap-2",
        className
      )}
    >
      <div
        className={cn("ds-spinner", sizeClasses[size])}
        role="status"
        aria-label={label}
      />
      {showLabel && (
        <p className="type-body-sm !font-semibold text-brand-primary">{label}</p>
      )}
    </div>
  );
}
