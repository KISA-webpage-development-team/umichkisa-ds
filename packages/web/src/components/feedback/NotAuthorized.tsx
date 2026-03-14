import { LinkButton } from "@/components/button/LinkButton";

export function NotAuthorized() {
  return (
    <div className="h-full flex items-center justify-center px-4">
      <div className="max-w-lg w-full text-center">
        <h1 className="text-2xl font-bold text-[var(--color-text-primary)] mb-4">
          접근 권한이 없습니다
        </h1>
        <div className="flex justify-center">
          <LinkButton href="/" variant="primary">
            홈페이지로 돌아가기
          </LinkButton>
        </div>
      </div>
    </div>
  );
}
