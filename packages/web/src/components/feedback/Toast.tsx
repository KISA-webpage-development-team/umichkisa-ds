import {
  Toaster as SonnerToaster,
  toast,
  type ToasterProps as SonnerToasterProps,
} from "sonner";
import { Icon } from "@/components/icon";

type ToasterProps = Pick<
  SonnerToasterProps,
  | "position"
  | "duration"
  | "expand"
  | "visibleToasts"

  | "offset"
  | "gap"
  | "dir"
  | "className"
  | "style"
>;

function Toaster({
  position = "top-center",
  duration = 4000,
  ...props
}: ToasterProps) {
  return (
    <SonnerToaster
      position={position}
      duration={duration}
      closeButton={false}
      theme="light"
      icons={{
        success: <Icon name="circle-check" size="sm" />,
        info: <Icon name="info" size="sm" />,
        warning: <Icon name="triangle-alert" size="sm" />,
        error: <Icon name="circle-x" size="sm" />,
      }}
      toastOptions={{
        unstyled: true,
        classNames: {
          toast:
            "w-full flex items-center gap-2 rounded-md border border-border bg-surface px-3 py-3 shadow-lg",
          title: "type-label text-foreground",
          description: "type-body-sm text-muted-foreground",
          actionButton:
            "type-caption text-brand-primary hover:underline cursor-pointer focus-visible:outline-2 focus-visible:outline-focus-ring focus-visible:outline-offset-2 focus-visible:shadow-[0_0_0_4px_var(--color-brand-primary)]",
          cancelButton:
            "type-caption text-muted-foreground hover:text-foreground cursor-pointer focus-visible:outline-2 focus-visible:outline-focus-ring focus-visible:outline-offset-2 focus-visible:shadow-[0_0_0_4px_var(--color-brand-primary)]",
          success: "!border-success !bg-success-subtle",
          error: "!border-error !bg-error-subtle",
          warning: "!border-warning !bg-warning-subtle",
          info: "!border-info !bg-info-subtle",
          icon: "relative shrink-0 flex items-center w-4 h-4",
          content: "flex flex-1 flex-col gap-1 min-w-0",
        },
      }}
      {...props}
    />
  );
}

export { Toaster, toast };
export type { ToasterProps };
