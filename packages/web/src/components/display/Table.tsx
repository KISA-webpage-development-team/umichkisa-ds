import * as React from "react";
import { cn } from "@/utils/cn";

/* ── Table (root) ─────────────────────────────────── */

const Table = React.forwardRef<
  HTMLTableElement,
  React.HTMLAttributes<HTMLTableElement>
>(({ className, ...props }, ref) => (
  <div className="w-full overflow-x-auto">
    <table
      ref={ref}
      className={cn("w-full caption-bottom type-body-sm text-foreground", className)}
      {...props}
    />
  </div>
));
Table.displayName = "Table";

/* ── TableHeader ──────────────────────────────────── */

const TableHeader = React.forwardRef<
  HTMLTableSectionElement,
  React.HTMLAttributes<HTMLTableSectionElement>
>(({ className, ...props }, ref) => (
  <thead
    ref={ref}
    className={cn("border-b border-border-strong", className)}
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
    className={cn("hover:bg-surface-subtle transition-colors", className)}
    {...props}
  />
));
TableRow.displayName = "TableRow";

/* ── TableHead ────────────────────────────────────── */

const TableHead = React.forwardRef<
  HTMLTableCellElement,
  React.ThHTMLAttributes<HTMLTableCellElement>
>(({ className, ...props }, ref) => (
  <th
    ref={ref}
    className={cn("px-4 py-3 text-left type-label text-muted-foreground", className)}
    {...props}
  />
));
TableHead.displayName = "TableHead";

/* ── TableCell ────────────────────────────────────── */

const TableCell = React.forwardRef<
  HTMLTableCellElement,
  React.TdHTMLAttributes<HTMLTableCellElement>
>(({ className, ...props }, ref) => (
  <td
    ref={ref}
    className={cn("px-4 py-3 text-foreground", className)}
    {...props}
  />
));
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
>(({ className, ...props }, ref) => (
  <tfoot
    ref={ref}
    className={cn("border-t border-border-strong bg-surface-subtle type-label text-foreground", className)}
    {...props}
  />
));
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
    className={cn("flex flex-col gap-1 px-4 py-3 text-foreground hover:bg-surface-subtle transition-colors", className)}
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
