import { Button } from "@/components/button/Button";

export type UnexpectedErrorProps = {
  onRetry?: () => void;
};

export function UnexpectedError({ onRetry }: UnexpectedErrorProps) {
  return (
    <div className="h-full flex items-center justify-center px-4">
      <div className="max-w-lg w-full text-center">
        <h1 className="text-2xl font-bold text-[var(--color-text-primary)] mb-4">
          오류가 발생했습니다
        </h1>
        <p className="text-[var(--color-text-muted)] mb-6">
          잠시 후 다시 시도해주세요.
        </p>
        {onRetry && (
          <Button onClick={onRetry} variant="primary">
            다시 시도
          </Button>
        )}
      </div>
    </div>
  );
}
