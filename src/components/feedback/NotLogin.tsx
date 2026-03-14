import { LinkButton } from "@/components/button/LinkButton";

export function NotLogin() {
  return (
    <div className="h-full flex items-center justify-center px-4">
      <div className="max-w-lg w-full text-center">
        <h1 className="text-2xl font-bold text-[var(--color-text-primary)] mb-4">
          로그인이 필요합니다
        </h1>
        <div className="flex justify-center">
          <LinkButton href="/signin" variant="primary">
            로그인하기
          </LinkButton>
        </div>
      </div>
    </div>
  );
}
