import { cn } from "@/utils/cn";

/* ---------------------------------- Card ---------------------------------- */

export type CardProps = React.HTMLAttributes<HTMLDivElement>;

export function Card({ className, ...props }: CardProps) {
  return (
    <div
      className={cn(
        "flex flex-col gap-4 p-4 bg-surface-subtle border border-border rounded-md transition-colors duration-200 hover:border-border-strong hover:bg-surface-muted",
        className
      )}
      {...props}
    />
  );
}

/* ------------------------------- CardHeader ------------------------------- */

export type CardHeaderProps = React.HTMLAttributes<HTMLDivElement>;

export function CardHeader({ className, ...props }: CardHeaderProps) {
  return <div className={cn("flex flex-col gap-2", className)} {...props} />;
}

/* -------------------------------- CardTitle ------------------------------- */

type HeadingElement = "h1" | "h2" | "h3" | "h4" | "h5" | "h6";

export type CardTitleProps = React.HTMLAttributes<HTMLHeadingElement> & {
  /** HTML heading element to render. Default: "h3". */
  as?: HeadingElement;
};

export function CardTitle({
  as: Component = "h3",
  className,
  ...props
}: CardTitleProps) {
  return (
    <Component
      className={cn("type-h4 !font-semibold text-foreground", className)}
      {...props}
    />
  );
}

/* ----------------------------- CardDescription ---------------------------- */

export type CardDescriptionProps =
  React.HTMLAttributes<HTMLParagraphElement>;

export function CardDescription({
  className,
  ...props
}: CardDescriptionProps) {
  return (
    <p
      className={cn("type-body-sm text-muted-foreground", className)}
      {...props}
    />
  );
}

/* ------------------------------- CardContent ------------------------------ */

export type CardContentProps = React.HTMLAttributes<HTMLDivElement>;

export function CardContent({ className, ...props }: CardContentProps) {
  return <div className={cn("flex-1", className)} {...props} />;
}

/* ------------------------------- CardFooter ------------------------------- */

export type CardFooterProps = React.HTMLAttributes<HTMLDivElement>;

export function CardFooter({ className, ...props }: CardFooterProps) {
  return (
    <div
      className={cn("flex items-center gap-2", className)}
      {...props}
    />
  );
}
