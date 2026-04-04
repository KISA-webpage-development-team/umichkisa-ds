import { cn } from "@/utils/cn";
import { Icon } from "@/components/icon/Icon";

// ── Pagination range computation ──────────────────────────

type PaginationItem = number | "ellipsis";

function computePaginationRange(
  page: number,
  totalPages: number,
  siblingCount: number
): PaginationItem[] {
  // Always show first page, last page, current page, and siblings
  const range = new Set<number>();

  range.add(1);
  range.add(totalPages);

  const start = Math.max(2, page - siblingCount);
  const end = Math.min(totalPages - 1, page + siblingCount);

  for (let i = start; i <= end; i++) {
    range.add(i);
  }

  // Sort and insert ellipsis gaps
  const sorted = Array.from(range).sort((a, b) => a - b);
  const result: PaginationItem[] = [];

  for (let i = 0; i < sorted.length; i++) {
    if (i > 0 && sorted[i] - sorted[i - 1] > 1) {
      result.push("ellipsis");
    }
    result.push(sorted[i]);
  }

  return result;
}

// ── Shared styles ─────────────────────────────────────────

const pageButtonBase = [
  "inline-flex items-center justify-center",
  "h-9 min-w-9 rounded-md type-body-sm",
  "transition-colors duration-150",
  "focus-visible:outline focus-visible:outline-2 focus-visible:outline-focus-ring focus-visible:shadow-[0_0_0_4px_var(--color-brand-primary)]",
].join(" ");

// ── Component ─────────────────────────────────────────────

type PaginationProps = {
  /** Current page (1-indexed) */
  page: number;
  /** Total number of pages */
  totalPages: number;
  /** Callback when page changes */
  onPageChange: (page: number) => void;
  /** Number of sibling pages to show on each side of current page. Default: 1 */
  siblingCount?: number;
  /** Additional class names for the nav wrapper */
  className?: string;
};

function Pagination({
  page,
  totalPages,
  onPageChange,
  siblingCount = 1,
  className,
}: PaginationProps) {
  const fullRange = computePaginationRange(page, totalPages, siblingCount);
  const mobileRange = computePaginationRange(page, totalPages, 0);

  // Determine which items are mobile-only (appear in both ranges)
  // and which are desktop-only (only in fullRange)
  const mobileSet = new Set(
    mobileRange.map((item, i) => (item === "ellipsis" ? `ellipsis-${i}` : String(item)))
  );

  const isPrevDisabled = page <= 1;
  const isNextDisabled = page >= totalPages;

  return (
    <nav aria-label="Pagination" className={cn("flex items-center justify-center gap-1", className)}>
      {/* Previous button */}
      <button
        type="button"
        aria-label="Previous page"
        disabled={isPrevDisabled}
        aria-disabled={isPrevDisabled ? "true" : undefined}
        onClick={() => onPageChange(page - 1)}
        className={cn(
          pageButtonBase,
          "relative after:absolute after:inset-1/2 after:-translate-x-1/2 after:-translate-y-1/2 after:min-w-[44px] after:min-h-[44px] after:content-['']",
          "text-foreground",
          isPrevDisabled
            ? "text-disabled-foreground cursor-not-allowed"
            : "hover:bg-surface-subtle cursor-pointer"
        )}
      >
        <Icon name="chevron-left" size="sm" />
      </button>

      {/* Page buttons — full range for desktop */}
      <div className="hidden md:flex items-center gap-1">
        {fullRange.map((item, index) =>
          item === "ellipsis" ? (
            <span
              key={`ellipsis-${index}`}
              aria-hidden="true"
              className="inline-flex items-center justify-center h-9 min-w-9 type-body-sm text-muted-foreground select-none"
            >
              ...
            </span>
          ) : (
            <button
              key={item}
              type="button"
              aria-label={`Page ${item}`}
              aria-current={item === page ? "page" : undefined}
              onClick={() => onPageChange(item)}
              className={cn(
                pageButtonBase,
                "cursor-pointer",
                item === page
                  ? "bg-brand-primary text-brand-foreground"
                  : "text-foreground hover:bg-surface-subtle"
              )}
            >
              {item}
            </button>
          )
        )}
      </div>

      {/* Page buttons — collapsed range for mobile */}
      <div className="flex md:hidden items-center gap-1">
        {mobileRange.map((item, index) =>
          item === "ellipsis" ? (
            <span
              key={`ellipsis-${index}`}
              aria-hidden="true"
              className="inline-flex items-center justify-center h-9 min-w-9 type-body-sm text-muted-foreground select-none"
            >
              ...
            </span>
          ) : (
            <button
              key={item}
              type="button"
              aria-label={`Page ${item}`}
              aria-current={item === page ? "page" : undefined}
              onClick={() => onPageChange(item)}
              className={cn(
                pageButtonBase,
                "cursor-pointer",
                item === page
                  ? "bg-brand-primary text-brand-foreground"
                  : "text-foreground hover:bg-surface-subtle"
              )}
            >
              {item}
            </button>
          )
        )}
      </div>

      {/* Next button */}
      <button
        type="button"
        aria-label="Next page"
        disabled={isNextDisabled}
        aria-disabled={isNextDisabled ? "true" : undefined}
        onClick={() => onPageChange(page + 1)}
        className={cn(
          pageButtonBase,
          "relative after:absolute after:inset-1/2 after:-translate-x-1/2 after:-translate-y-1/2 after:min-w-[44px] after:min-h-[44px] after:content-['']",
          "text-foreground",
          isNextDisabled
            ? "text-disabled-foreground cursor-not-allowed"
            : "hover:bg-surface-subtle cursor-pointer"
        )}
      >
        <Icon name="chevron-right" size="sm" />
      </button>
    </nav>
  );
}

export { Pagination };
export type { PaginationProps };
