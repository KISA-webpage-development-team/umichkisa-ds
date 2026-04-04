import { useCallback, useMemo } from "react";
import { cn } from "@/utils/cn";
import { Icon } from "@/components/icon/Icon";

// ── Pagination range computation ──────────────────────────

type PaginationItem = number | "ellipsis";

function computePaginationRange(
  page: number,
  totalPages: number,
  siblingCount: number
): PaginationItem[] {
  // Fixed slot count: first + last + current + 2*siblings + 2 ellipsis positions
  const totalSlots = 2 * siblingCount + 5;

  // If total pages fit within slots, show all pages (no ellipsis needed)
  if (totalPages <= totalSlots) {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }

  const leftSiblingEnd = page - siblingCount;
  const rightSiblingStart = page + siblingCount;

  // Boundary thresholds — when to drop ellipsis and expand the range
  const showLeftEllipsis = leftSiblingEnd > 2;
  const showRightEllipsis = rightSiblingStart < totalPages - 1;

  if (!showLeftEllipsis && showRightEllipsis) {
    // Near start: show expanded left range + right ellipsis + last
    // e.g., [1] 2 3 4 5 ... 20
    const leftCount = totalSlots - 2; // slots minus ellipsis and last page
    const leftRange: PaginationItem[] = Array.from({ length: leftCount }, (_, i) => i + 1);
    return [...leftRange, "ellipsis", totalPages];
  }

  if (showLeftEllipsis && !showRightEllipsis) {
    // Near end: first + left ellipsis + expanded right range
    // e.g., 1 ... 16 17 18 19 [20]
    const rightCount = totalSlots - 2; // slots minus first page and ellipsis
    const rightRange: PaginationItem[] = Array.from(
      { length: rightCount },
      (_, i) => totalPages - rightCount + 1 + i
    );
    return [1, "ellipsis", ...rightRange];
  }

  // Middle: first + left ellipsis + siblings + right ellipsis + last
  // e.g., 1 ... 4 [5] 6 ... 20
  const middleRange: PaginationItem[] = Array.from(
    { length: 2 * siblingCount + 1 },
    (_, i) => leftSiblingEnd + i
  );
  return [1, "ellipsis", ...middleRange, "ellipsis", totalPages];
}

// ── Shared styles ─────────────────────────────────────────

const pageButtonBase = [
  "inline-flex items-center justify-center",
  "h-9 w-9 rounded-md type-body-sm",
  "transition-[color,background-color] duration-200 ease-in-out",
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
  const fullRange = useMemo(
    () => computePaginationRange(page, totalPages, siblingCount),
    [page, totalPages, siblingCount]
  );
  const mobileRange = useMemo(
    () => computePaginationRange(page, totalPages, 0),
    [page, totalPages]
  );

  // Build a set of page numbers in the mobile range for CSS-based responsive hiding
  const mobilePageSet = useMemo(() => {
    const set = new Set<number>();
    for (const item of mobileRange) {
      if (typeof item === "number") set.add(item);
    }
    return set;
  }, [mobileRange]);

  const handlePageChange = useCallback(
    (newPage: number) => { onPageChange(newPage); },
    [onPageChange]
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
        onClick={() => handlePageChange(page - 1)}
        className={cn(
          pageButtonBase,
          "relative after:absolute after:inset-1/2 after:-translate-x-1/2 after:-translate-y-1/2 after:min-w-[44px] after:min-h-[44px] after:content-['']",
          "text-foreground",
          isPrevDisabled
            ? "text-disabled-foreground cursor-not-allowed"
            : "hover:bg-brand-accent-subtle hover:text-brand-primary cursor-pointer"
        )}
      >
        <Icon name="chevron-left" size="sm" />
      </button>

      {/* Page buttons — single DOM, CSS-responsive */}
      {fullRange.map((item, index) => {
        if (item === "ellipsis") {
          // Check if this ellipsis position also exists in mobile range
          // by checking if the surrounding pages are in mobile set
          const prevPage = index > 0 ? fullRange[index - 1] : null;
          const nextPage = index < fullRange.length - 1 ? fullRange[index + 1] : null;
          const showOnMobile =
            (typeof prevPage === "number" && mobilePageSet.has(prevPage)) &&
            (typeof nextPage === "number" && mobilePageSet.has(nextPage));

          return (
            <span
              key={`slot-${index}`}
              aria-hidden="true"
              className={cn(
                "items-center justify-center h-9 w-9 type-body-sm text-muted-foreground select-none",
                showOnMobile ? "inline-flex" : "hidden md:inline-flex"
              )}
            >
              ...
            </span>
          );
        }

        const isCurrent = item === page;
        const isInMobileRange = mobilePageSet.has(item);

        return (
          <button
            key={`slot-${index}`}
            type="button"
            aria-label={`Page ${item}`}
            aria-current={isCurrent ? "page" : undefined}
            onClick={() => handlePageChange(item)}
            className={cn(
              pageButtonBase,
              "cursor-pointer",
              isInMobileRange ? "inline-flex" : "hidden md:inline-flex",
              isCurrent
                ? "bg-brand-primary text-brand-foreground"
                : "text-foreground hover:bg-brand-accent-subtle hover:text-brand-primary"
            )}
          >
            {item}
          </button>
        );
      })}

      {/* Next button */}
      <button
        type="button"
        aria-label="Next page"
        disabled={isNextDisabled}
        aria-disabled={isNextDisabled ? "true" : undefined}
        onClick={() => handlePageChange(page + 1)}
        className={cn(
          pageButtonBase,
          "relative after:absolute after:inset-1/2 after:-translate-x-1/2 after:-translate-y-1/2 after:min-w-[44px] after:min-h-[44px] after:content-['']",
          "text-foreground",
          isNextDisabled
            ? "text-disabled-foreground cursor-not-allowed"
            : "hover:bg-brand-accent-subtle hover:text-brand-primary cursor-pointer"
        )}
      >
        <Icon name="chevron-right" size="sm" />
      </button>
    </nav>
  );
}

export { Pagination };
export type { PaginationProps };
