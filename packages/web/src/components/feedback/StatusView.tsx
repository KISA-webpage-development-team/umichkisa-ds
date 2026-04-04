import { cn } from "@/utils/cn";
import { Icon } from "@/components/icon";
import type { IconName } from "@/components/icon";
import type { ReactNode } from "react";

type StatusViewVariant =
  | "not-found"
  | "not-authorized"
  | "not-logged-in"
  | "error";

export type StatusViewProps = {
  /** Determines default icon, title, and description. */
  variant: StatusViewVariant;
  /** Large status code displayed above the icon (e.g. "404"). */
  code?: string;
  /** Override the variant's default icon. Pass a registered Lucide icon name. */
  icon?: IconName;
  /** Override the variant's default title. */
  title?: string;
  /** Override the variant's default description. */
  description?: string;
  /** Optional action area rendered below the description. */
  action?: ReactNode;
  /** Applied to the outer wrapper div. */
  className?: string;
};

const variantDefaults: Record<
  StatusViewVariant,
  { icon: IconName; title: string; description: string }
> = {
  "not-found": {
    icon: "file-x",
    title: "404",
    description: "존재하지 않는 페이지입니다",
  },
  "not-authorized": {
    icon: "shield-x",
    title: "접근 불가",
    description: "권한이 없습니다",
  },
  "not-logged-in": {
    icon: "log-in",
    title: "로그인 필요",
    description: "로그인 후 이용해 주세요",
  },
  error: {
    icon: "triangle-alert",
    title: "오류 발생",
    description: "예기치 못한 오류가 발생했습니다",
  },
};

export function StatusView({
  variant,
  code,
  icon,
  title,
  description,
  action,
  className,
}: StatusViewProps) {
  const defaults = variantDefaults[variant];
  const resolvedIcon = icon ?? defaults.icon;
  const resolvedTitle = title ?? defaults.title;
  const resolvedDescription = description ?? defaults.description;

  return (
    <div
      role="status"
      aria-live="polite"
      className={cn(
        "inline-flex flex-col items-center justify-center w-full h-full",
        "text-center px-4",
        className
      )}
    >
      <div className="flex flex-col items-center gap-4 max-w-sm">
        {code && (
          <p className="type-display font-sejong-bold tracking-tight text-foreground">
            {code}
          </p>
        )}
        <div className="text-muted-foreground">
          <Icon name={resolvedIcon} size="xl" />
        </div>
        <div className="flex flex-col items-center gap-2">
          <p className="type-h2 text-foreground">{resolvedTitle}</p>
          <p className="type-body text-muted-foreground">
            {resolvedDescription}
          </p>
        </div>
        {action && <div className="mt-2">{action}</div>}
      </div>
    </div>
  );
}
