import { cn } from "@/lib/cn";
import { slugify } from "@/lib/slug";

interface HeadingProps {
  as: "h2" | "h3";
  id?: string;
  className?: string;
  children: React.ReactNode;
}

const defaults = {
  h2: "type-h2 mt-8 mb-4 text-foreground",
  h3: "type-h3 mt-8 mb-2 text-foreground",
};

export function Heading({ as: Tag, id, className, children }: HeadingProps) {
  const slug = id ?? slugify(typeof children === "string" ? children : "");

  return (
    <Tag
      id={slug}
      className={cn(defaults[Tag], "group scroll-mt-20", className)}
    >
      {children}
      <a
        href={`#${slug}`}
        aria-label={`Link to ${typeof children === "string" ? children : "this section"}`}
        data-heading-anchor
        className="ml-2 opacity-0 group-hover:opacity-100 transition-opacity text-muted-foreground no-underline"
      >
        #
      </a>
    </Tag>
  );
}
