import * as React from "react";
import { cn } from "@/utils/cn";

/* ── Size context ─────────────────────────────────── */

type TableSize = "sm" | "md";

const TableSizeContext = React.createContext<TableSize>("md");

function useTableSize() {
  return React.useContext(TableSizeContext);
}

/* ── Table (root) ─────────────────────────────────── */

type TableProps = React.HTMLAttributes<HTMLTableElement> & {
  size?: TableSize;
};

const Table = React.forwardRef<HTMLTableElement, TableProps>(
  ({ className, size = "md", ...props }, ref) => (
    <TableSizeContext.Provider value={size}>
      <div className="w-full overflow-x-auto">
        <table
          ref={ref}
          className={cn(
            "w-full caption-bottom text-foreground",
            size === "sm" ? "type-body-sm" : "type-body",
            className,
          )}
          {...props}
        />
      </div>
    </TableSizeContext.Provider>
  ),
);
Table.displayName = "Table";

/* ── TableHeader ──────────────────────────────────── */

const TableHeader = React.forwardRef<
  HTMLTableSectionElement,
  React.HTMLAttributes<HTMLTableSectionElement>
>(({ className, ...props }, ref) => (
  <thead
    ref={ref}
    className={cn("border-b border-brand-primary", className)}
    {...props}
  />
));
TableHeader.displayName = "TableHeader";

/* ── TableBody ────────────────────────────────────── */

const TableBody = React.forwardRef<
  HTMLTableSectionElement,
  React.HTMLAttributes<HTMLTableSectionElement>
>(({ className, ...props }, ref) => (
  <tbody
    ref={ref}
    className={cn("divide-y divide-border", className)}
    {...props}
  />
));
TableBody.displayName = "TableBody";

/* ── TableRow ─────────────────────────────────────── */

const TableRow = React.forwardRef<
  HTMLTableRowElement,
  React.HTMLAttributes<HTMLTableRowElement>
>(({ className, ...props }, ref) => (
  <tr
    ref={ref}
    className={cn("transition-colors [tbody_&]:hover:bg-brand-accent-subtle", className)}
    {...props}
  />
));
TableRow.displayName = "TableRow";

/* ── TableHead ────────────────────────────────────── */

const TableHead = React.forwardRef<
  HTMLTableCellElement,
  React.ThHTMLAttributes<HTMLTableCellElement>
>(({ className, ...props }, ref) => {
  const size = useTableSize();
  return (
    <th
      ref={ref}
      className={cn(
        "text-left !font-medium text-brand-primary",
        size === "sm"
          ? "px-3 py-2 type-body-sm"
          : "px-4 py-3 type-body",
        className,
      )}
      {...props}
    />
  );
});
TableHead.displayName = "TableHead";

/* ── TableCell ────────────────────────────────────── */

const TableCell = React.forwardRef<
  HTMLTableCellElement,
  React.TdHTMLAttributes<HTMLTableCellElement>
>(({ className, ...props }, ref) => {
  const size = useTableSize();
  return (
    <td
      ref={ref}
      className={cn(
        "text-foreground",
        size === "sm" ? "px-3 py-2" : "px-4 py-3",
        className,
      )}
      {...props}
    />
  );
});
TableCell.displayName = "TableCell";

/* ── TableCaption ─────────────────────────────────── */

const TableCaption = React.forwardRef<
  HTMLTableCaptionElement,
  React.HTMLAttributes<HTMLTableCaptionElement>
>(({ className, ...props }, ref) => (
  <caption
    ref={ref}
    className={cn("mt-4 type-caption text-muted-foreground", className)}
    {...props}
  />
));
TableCaption.displayName = "TableCaption";

/* ── TableFooter ──────────────────────────────────── */

const TableFooter = React.forwardRef<
  HTMLTableSectionElement,
  React.HTMLAttributes<HTMLTableSectionElement>
>(({ className, ...props }, ref) => {
  const size = useTableSize();
  return (
    <tfoot
      ref={ref}
      className={cn(
        "border-t border-border-strong bg-surface-subtle text-foreground",
        size === "sm" ? "type-caption" : "type-label",
        className,
      )}
      {...props}
    />
  );
});
TableFooter.displayName = "TableFooter";

/* ── TableMobileList ──────────────────────────────── */

const TableMobileList = React.forwardRef<
  HTMLOListElement,
  React.OlHTMLAttributes<HTMLOListElement>
>(({ className, ...props }, ref) => (
  <ol
    ref={ref}
    className={cn("divide-y divide-border", className)}
    {...props}
  />
));
TableMobileList.displayName = "TableMobileList";

/* ── TableMobileItem ──────────────────────────────── */

const TableMobileItem = React.forwardRef<
  HTMLLIElement,
  React.LiHTMLAttributes<HTMLLIElement>
>(({ className, ...props }, ref) => (
  <li
    ref={ref}
    className={cn("flex flex-col gap-1 px-4 py-3 text-foreground hover:bg-brand-accent-subtle transition-colors", className)}
    {...props}
  />
));
TableMobileItem.displayName = "TableMobileItem";

/* ── Exports ──────────────────────────────────────── */

export {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
  TableCaption,
  TableFooter,
  TableMobileList,
  TableMobileItem,
};

export type { TableProps };
