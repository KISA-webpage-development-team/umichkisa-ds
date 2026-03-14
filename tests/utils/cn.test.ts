import { describe, it, expect } from "vitest";
import { cn } from "@/utils/cn";

describe("cn", () => {
  it("merges class names", () => {
    expect(cn("foo", "bar")).toBe("foo bar");
  });

  it("resolves Tailwind conflicts — last wins", () => {
    expect(cn("px-2", "px-4")).toBe("px-4");
  });

  it("ignores falsy values", () => {
    expect(cn("foo", false, undefined, null, "bar")).toBe("foo bar");
  });
});
