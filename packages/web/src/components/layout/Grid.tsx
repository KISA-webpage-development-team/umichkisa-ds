import { cn } from "@/utils/cn";

const baseColsMap: Record<number, string> = {
  1: "grid-cols-1",
  2: "grid-cols-2",
  3: "grid-cols-3",
  4: "grid-cols-4",
  5: "grid-cols-5",
  6: "grid-cols-6",
};

const mdColsMap: Record<number, string> = {
  1: "md:grid-cols-1",
  2: "md:grid-cols-2",
  3: "md:grid-cols-3",
  4: "md:grid-cols-4",
  5: "md:grid-cols-5",
  6: "md:grid-cols-6",
};

const lgColsMap: Record<number, string> = {
  1: "lg:grid-cols-1",
  2: "lg:grid-cols-2",
  3: "lg:grid-cols-3",
  4: "lg:grid-cols-4",
  5: "lg:grid-cols-5",
  6: "lg:grid-cols-6",
};

const gapMap = {
  element: "gap-2",
  component: "gap-4",
  section: "gap-6",
} as const;

export type GridColumns =
  | number
  | { base?: number; md?: number; lg?: number };

export type GridProps = React.HTMLAttributes<HTMLDivElement> & {
  /** Number of columns — a number or responsive object { base, md, lg }. Max 6. */
  columns?: GridColumns;
  /** Gap between items using DS spacing tiers. Default: "component" (16px). */
  gap?: "element" | "component" | "section";
};

export function Grid({
  columns = 1,
  gap = "component",
  className,
  children,
  ...props
}: GridProps) {
  const cols = typeof columns === "number" ? { base: columns } : columns;

  return (
    <div
      className={cn(
        "grid",
        cols.base && baseColsMap[cols.base],
        cols.md && mdColsMap[cols.md],
        cols.lg && lgColsMap[cols.lg],
        gapMap[gap],
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
