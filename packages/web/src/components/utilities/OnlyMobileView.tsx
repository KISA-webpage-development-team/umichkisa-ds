import { cn } from "@/utils/cn";
import { Icon } from "@/components/icon";
import type { ReactNode } from "react";

export type OnlyMobileViewProps = {
  /** Content to render on mobile screens. */
  children: ReactNode;
  /** Message displayed on the desktop overlay. */
  message?: string;
  /** Applied to the outer wrapper div. */
  className?: string;
};

export function OnlyMobileView({
  children,
  message = "Only Mobile View is supported.",
  className,
}: OnlyMobileViewProps) {
  return (
    <div className={cn(className)}>
      {/* Overlay: visible on md+ screens */}
      <div
        className="hidden md:flex fixed inset-0 z-50 flex-col items-center justify-center gap-4 bg-surface"
        role="status"
        aria-live="polite"
      >
        <div className="text-brand-primary">
          <Icon name="smartphone" size="xl" />
        </div>
        <p className="type-h3 text-foreground text-center px-4">
          {message}
        </p>
      </div>

      {/* Children: visible on mobile only */}
      <div className="md:hidden">{children}</div>
    </div>
  );
}
