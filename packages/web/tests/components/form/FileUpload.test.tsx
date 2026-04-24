import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import {
  FileUpload,
  FILE_UPLOAD_MAX_BYTES_DEFAULT,
  type FileUploadValue,
} from "@/components/form/FileUpload";

/* ── Helpers ───────────────────────────────────────────────────── */

const PNG: FileUploadValue = { url: "https://cdn.example.com/a.png", publicId: "a" };

function makeFile(
  name: string,
  type: AcceptedMime | "application/pdf",
  sizeBytes: number
): File {
  const file = new File(["x"], name, { type });
  // File.size is readonly — override via defineProperty for test sizing
  Object.defineProperty(file, "size", { value: sizeBytes });
  return file;
}

type AcceptedMime = "image/png" | "image/jpeg" | "image/webp";

function noopAsync<T>(v: T): Promise<T> {
  return Promise.resolve(v);
}

/* ── Tests ─────────────────────────────────────────────────────── */

describe("FileUpload — smoke", () => {
  it("renders without crashing", () => {
    render(
      <FileUpload
        value={null}
        onChange={() => {}}
        onUpload={() => noopAsync(PNG)}
        onRemove={() => Promise.resolve()}
      />
    );
    expect(screen.getByTestId("file-upload")).toBeInTheDocument();
  });

  it("exports FILE_UPLOAD_MAX_BYTES_DEFAULT as 5 MB", () => {
    expect(FILE_UPLOAD_MAX_BYTES_DEFAULT).toBe(5 * 1024 * 1024);
  });
});
