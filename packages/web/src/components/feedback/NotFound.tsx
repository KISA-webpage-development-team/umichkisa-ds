import { LinkButton } from "@/components/button/LinkButton";

export function NotFound() {
  return (
    <div className="h-full flex items-center justify-center px-4">
      <div className="max-w-lg w-full text-center">
        <h1 className="text-4xl font-bold text-[var(--color-text-primary)] mb-4">404</h1>
        <p className="text-lg md:text-2xl font-semibold text-[var(--color-text-muted)] mb-6">
          존재하지 않는 페이지입니다
        </p>
        <div className="flex justify-center w-[60%] mx-auto">
          <LinkButton href="/" variant="primary">
            홈페이지로 돌아가기
          </LinkButton>
        </div>
      </div>
    </div>
  );
}
