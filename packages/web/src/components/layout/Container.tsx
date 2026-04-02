import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/utils/cn";

const containerVariants = cva("mx-auto w-full px-4 md:px-6 lg:px-8", {
  variants: {
    size: {
      default: "max-w-screen-2xl",
      md: "max-w-screen-md",
      sm: "max-w-screen-sm",
      prose: "max-w-prose",
    },
  },
  defaultVariants: {
    size: "default",
  },
});

type AllowedElement =
  | "div"
  | "section"
  | "main"
  | "article"
  | "header"
  | "footer"
  | "nav";

export type ContainerProps = React.HTMLAttributes<HTMLElement> &
  VariantProps<typeof containerVariants> & {
    /** HTML element to render. Default: "div". */
    as?: AllowedElement;
  };

export function Container({
  as: Component = "div",
  size,
  className,
  children,
  ...props
}: ContainerProps) {
  return (
    <Component
      className={cn(containerVariants({ size }), className)}
      {...props}
    >
      {children}
    </Component>
  );
}
