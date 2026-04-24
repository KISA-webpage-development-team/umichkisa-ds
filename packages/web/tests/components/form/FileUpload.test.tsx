import { beforeEach, afterEach, describe, it, expect, vi } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
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
  Object.defineProperty(file, "size", { value: sizeBytes });
  return file;
}

type AcceptedMime = "image/png" | "image/jpeg" | "image/webp";

function noopAsync<T>(v: T): Promise<T> {
  return Promise.resolve(v);
}

// Ensure URL.createObjectURL / revokeObjectURL exist in jsdom for all tests.
// Task 4's describe replaces them with spies; this default covers other tests.
if (typeof URL.createObjectURL !== "function") {
  (URL as unknown as { createObjectURL: (b: Blob) => string }).createObjectURL = () =>
    "blob:default";
}
if (typeof URL.revokeObjectURL !== "function") {
  (URL as unknown as { revokeObjectURL: (s: string) => void }).revokeObjectURL = () => {};
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

describe("FileUpload — empty state (Task 2)", () => {
  it("renders trigger as a button with default aria-label when value is null", () => {
    render(
      <FileUpload
        value={null}
        onChange={() => {}}
        onUpload={() => noopAsync(PNG)}
        onRemove={() => Promise.resolve()}
      />
    );
    expect(screen.getByRole("button", { name: "Upload image" })).toBeInTheDocument();
  });

  it("trigger contains 'Click to upload' label and derived helper 'PNG · JPG · WEBP'", () => {
    render(
      <FileUpload
        value={null}
        onChange={() => {}}
        onUpload={() => noopAsync(PNG)}
        onRemove={() => Promise.resolve()}
      />
    );
    expect(screen.getByText("Click to upload")).toBeInTheDocument();
    expect(screen.getByText("PNG · JPG · WEBP")).toBeInTheDocument();
  });

  it("trigger is disabled when disabled prop is true", () => {
    render(
      <FileUpload
        value={null}
        onChange={() => {}}
        onUpload={() => noopAsync(PNG)}
        onRemove={() => Promise.resolve()}
        disabled
      />
    );
    expect(screen.getByRole("button", { name: "Upload image" })).toBeDisabled();
  });

  it("trigger is not rendered when value is populated (replace-block)", () => {
    render(
      <FileUpload
        value={PNG}
        onChange={() => {}}
        onUpload={() => noopAsync(PNG)}
        onRemove={() => Promise.resolve()}
      />
    );
    expect(screen.queryByRole("button", { name: "Upload image" })).not.toBeInTheDocument();
  });
});

describe("FileUpload — client validation (Task 3)", () => {
  it("size > maxSize surfaces size error; onUpload NOT called", async () => {
    const onUpload = vi.fn(() => noopAsync(PNG));
    render(
      <FileUpload
        value={null}
        onChange={() => {}}
        onUpload={onUpload}
        onRemove={() => Promise.resolve()}
        maxSize={1024}
      />
    );
    const input = screen.getByTestId("file-upload-input") as HTMLInputElement;
    const big = makeFile("a.png", "image/png", 2048);
    await userEvent.upload(input, big);
    expect(onUpload).not.toHaveBeenCalled();
    expect(screen.getByRole("alert")).toHaveTextContent(/exceeds/i);
  });

  it("MIME outside accept surfaces type error; onUpload NOT called", async () => {
    const onUpload = vi.fn(() => noopAsync(PNG));
    render(
      <FileUpload
        value={null}
        onChange={() => {}}
        onUpload={onUpload}
        onRemove={() => Promise.resolve()}
      />
    );
    const input = screen.getByTestId("file-upload-input") as HTMLInputElement;
    const pdf = makeFile("a.pdf", "application/pdf", 100);
    await userEvent.upload(input, pdf, { applyAccept: false });
    expect(onUpload).not.toHaveBeenCalled();
    expect(screen.getByRole("alert")).toHaveTextContent(/only/i);
  });

  it("custom messages.sizeExceeded is called with maxSize and its return is rendered", async () => {
    const sizeExceeded = vi.fn((n: number) => `too big: ${n}`);
    render(
      <FileUpload
        value={null}
        onChange={() => {}}
        onUpload={() => noopAsync(PNG)}
        onRemove={() => Promise.resolve()}
        maxSize={1024}
        messages={{ sizeExceeded }}
      />
    );
    const input = screen.getByTestId("file-upload-input") as HTMLInputElement;
    await userEvent.upload(input, makeFile("a.png", "image/png", 2048));
    expect(sizeExceeded).toHaveBeenCalledWith(1024);
    expect(screen.getByRole("alert")).toHaveTextContent("too big: 1024");
  });

  it("clicking trigger clears existing error", async () => {
    render(
      <FileUpload
        value={null}
        onChange={() => {}}
        onUpload={() => noopAsync(PNG)}
        onRemove={() => Promise.resolve()}
      />
    );
    const input = screen.getByTestId("file-upload-input") as HTMLInputElement;
    await userEvent.upload(input, makeFile("a.pdf", "application/pdf", 100), {
      applyAccept: false,
    });
    expect(screen.getByRole("alert")).toBeInTheDocument();
    await userEvent.click(screen.getByRole("button", { name: "Upload image" }));
    expect(screen.queryByRole("alert")).not.toBeInTheDocument();
  });
});

describe("FileUpload — upload happy path (Task 4)", () => {
  let originalCreate: typeof URL.createObjectURL;
  let originalRevoke: typeof URL.revokeObjectURL;
  let createSpy: ReturnType<typeof vi.fn>;
  let revokeSpy: ReturnType<typeof vi.fn>;

  beforeEach(() => {
    originalCreate = URL.createObjectURL;
    originalRevoke = URL.revokeObjectURL;
    createSpy = vi.fn((_: Blob) => "blob:mock");
    revokeSpy = vi.fn();
    URL.createObjectURL = createSpy as unknown as typeof URL.createObjectURL;
    URL.revokeObjectURL = revokeSpy as unknown as typeof URL.revokeObjectURL;
  });
  afterEach(() => {
    URL.createObjectURL = originalCreate;
    URL.revokeObjectURL = originalRevoke;
  });

  it("selecting a valid file calls onUpload exactly once with the file", async () => {
    const onUpload = vi.fn(() => noopAsync(PNG));
    render(
      <FileUpload
        value={null}
        onChange={() => {}}
        onUpload={onUpload}
        onRemove={() => Promise.resolve()}
      />
    );
    const file = makeFile("a.png", "image/png", 100);
    await userEvent.upload(
      screen.getByTestId("file-upload-input") as HTMLInputElement,
      file
    );
    expect(onUpload).toHaveBeenCalledTimes(1);
    expect(onUpload).toHaveBeenCalledWith(file);
  });

  it("during pending upload renders object-URL preview img + spinner", async () => {
    const onUpload = vi.fn(() => new Promise<FileUploadValue>(() => {}));
    render(
      <FileUpload
        value={null}
        onChange={() => {}}
        onUpload={onUpload}
        onRemove={() => Promise.resolve()}
      />
    );
    await userEvent.upload(
      screen.getByTestId("file-upload-input") as HTMLInputElement,
      makeFile("a.png", "image/png", 100)
    );
    const img = await screen.findByRole("img");
    expect(img).toHaveAttribute("src", "blob:mock");
    expect(screen.getByTestId("file-upload-spinner")).toBeInTheDocument();
  });

  it("onChange is called with the resolved value exactly once on success", async () => {
    const onChange = vi.fn();
    render(
      <FileUpload
        value={null}
        onChange={onChange}
        onUpload={() => noopAsync(PNG)}
        onRemove={() => Promise.resolve()}
      />
    );
    await userEvent.upload(
      screen.getByTestId("file-upload-input") as HTMLInputElement,
      makeFile("a.png", "image/png", 100)
    );
    expect(onChange).toHaveBeenCalledTimes(1);
    expect(onChange).toHaveBeenCalledWith(PNG);
  });

  it("object URL is revoked after successful upload", async () => {
    render(
      <FileUpload
        value={null}
        onChange={() => {}}
        onUpload={() => noopAsync(PNG)}
        onRemove={() => Promise.resolve()}
      />
    );
    await userEvent.upload(
      screen.getByTestId("file-upload-input") as HTMLInputElement,
      makeFile("a.png", "image/png", 100)
    );
    expect(revokeSpy).toHaveBeenCalledWith("blob:mock");
  });

  it("wrapper has aria-busy=true during upload, false after", async () => {
    let resolveUpload!: (v: FileUploadValue) => void;
    const onUpload = vi.fn(
      () =>
        new Promise<FileUploadValue>((r) => {
          resolveUpload = r;
        })
    );
    render(
      <FileUpload
        value={null}
        onChange={() => {}}
        onUpload={onUpload}
        onRemove={() => Promise.resolve()}
      />
    );
    await userEvent.upload(
      screen.getByTestId("file-upload-input") as HTMLInputElement,
      makeFile("a.png", "image/png", 100)
    );
    expect(screen.getByTestId("file-upload")).toHaveAttribute("aria-busy", "true");
    resolveUpload(PNG);
    await waitFor(() =>
      expect(screen.getByTestId("file-upload")).not.toHaveAttribute("aria-busy", "true")
    );
  });
});

describe("FileUpload — upload failure (Task 5)", () => {
  it("onUpload rejection with message surfaces that message verbatim", async () => {
    const onChange = vi.fn();
    render(
      <FileUpload
        value={null}
        onChange={onChange}
        onUpload={() => Promise.reject(new Error("Rate limited"))}
        onRemove={() => Promise.resolve()}
      />
    );
    await userEvent.upload(
      screen.getByTestId("file-upload-input") as HTMLInputElement,
      makeFile("a.png", "image/png", 100)
    );
    await waitFor(() =>
      expect(screen.getByRole("alert")).toHaveTextContent("Rate limited")
    );
    expect(onChange).not.toHaveBeenCalled();
  });

  it("onUpload rejection with empty message uses default uploadFailed copy", async () => {
    render(
      <FileUpload
        value={null}
        onChange={() => {}}
        onUpload={() => Promise.reject(new Error(""))}
        onRemove={() => Promise.resolve()}
      />
    );
    await userEvent.upload(
      screen.getByTestId("file-upload-input") as HTMLInputElement,
      makeFile("a.png", "image/png", 100)
    );
    await waitFor(() =>
      expect(screen.getByRole("alert")).toHaveTextContent(/upload failed/i)
    );
  });

  it("custom messages.uploadFailed is used when rejection has empty message", async () => {
    render(
      <FileUpload
        value={null}
        onChange={() => {}}
        onUpload={() => Promise.reject(new Error(""))}
        onRemove={() => Promise.resolve()}
        messages={{ uploadFailed: "커스텀 에러" }}
      />
    );
    await userEvent.upload(
      screen.getByTestId("file-upload-input") as HTMLInputElement,
      makeFile("a.png", "image/png", 100)
    );
    await waitFor(() =>
      expect(screen.getByRole("alert")).toHaveTextContent("커스텀 에러")
    );
  });
});

describe("FileUpload — populated state & remove (Task 6)", () => {
  it("renders img with value.url when populated", () => {
    render(
      <FileUpload
        value={PNG}
        onChange={() => {}}
        onUpload={() => noopAsync(PNG)}
        onRemove={() => Promise.resolve()}
      />
    );
    expect(screen.getByRole("img")).toHaveAttribute("src", PNG.url);
  });

  it("renders X remove button with default aria-label", () => {
    render(
      <FileUpload
        value={PNG}
        onChange={() => {}}
        onUpload={() => noopAsync(PNG)}
        onRemove={() => Promise.resolve()}
      />
    );
    expect(screen.getByRole("button", { name: "Remove image" })).toBeInTheDocument();
  });

  it("clicking X calls onRemove with value.publicId exactly once", async () => {
    const onRemove = vi.fn(() => Promise.resolve());
    render(
      <FileUpload
        value={PNG}
        onChange={() => {}}
        onUpload={() => noopAsync(PNG)}
        onRemove={onRemove}
      />
    );
    await userEvent.click(screen.getByRole("button", { name: "Remove image" }));
    expect(onRemove).toHaveBeenCalledTimes(1);
    expect(onRemove).toHaveBeenCalledWith(PNG.publicId);
  });

  it("onChange called with null after successful remove", async () => {
    const onChange = vi.fn();
    render(
      <FileUpload
        value={PNG}
        onChange={onChange}
        onUpload={() => noopAsync(PNG)}
        onRemove={() => Promise.resolve()}
      />
    );
    await userEvent.click(screen.getByRole("button", { name: "Remove image" }));
    await waitFor(() => expect(onChange).toHaveBeenCalledWith(null));
  });

  it("onRemove rejection surfaces error message; onChange NOT called", async () => {
    const onChange = vi.fn();
    render(
      <FileUpload
        value={PNG}
        onChange={onChange}
        onUpload={() => noopAsync(PNG)}
        onRemove={() => Promise.reject(new Error("Net down"))}
      />
    );
    await userEvent.click(screen.getByRole("button", { name: "Remove image" }));
    await waitFor(() =>
      expect(screen.getByRole("alert")).toHaveTextContent("Net down")
    );
    expect(onChange).not.toHaveBeenCalled();
  });

  it("custom messages.removeLabel is used as aria-label on X", () => {
    render(
      <FileUpload
        value={PNG}
        onChange={() => {}}
        onUpload={() => noopAsync(PNG)}
        onRemove={() => Promise.resolve()}
        messages={{ removeLabel: "이미지 삭제" }}
      />
    );
    expect(screen.getByRole("button", { name: "이미지 삭제" })).toBeInTheDocument();
  });
});

describe("FileUpload — disabled (Task 7)", () => {
  it("disabled + empty: hidden input is disabled", () => {
    const onUpload = vi.fn(() => noopAsync(PNG));
    render(
      <FileUpload
        value={null}
        onChange={() => {}}
        onUpload={onUpload}
        onRemove={() => Promise.resolve()}
        disabled
      />
    );
    expect(screen.getByTestId("file-upload-input")).toBeDisabled();
  });

  it("disabled + populated: X button has disabled attribute", () => {
    render(
      <FileUpload
        value={PNG}
        onChange={() => {}}
        onUpload={() => noopAsync(PNG)}
        onRemove={() => Promise.resolve()}
        disabled
      />
    );
    expect(screen.getByRole("button", { name: "Remove image" })).toBeDisabled();
  });

  it("wrapper has aria-describedby pointing at Alert id when error is present", async () => {
    render(
      <FileUpload
        value={null}
        onChange={() => {}}
        onUpload={() => Promise.reject(new Error("x"))}
        onRemove={() => Promise.resolve()}
      />
    );
    await userEvent.upload(
      screen.getByTestId("file-upload-input") as HTMLInputElement,
      makeFile("a.png", "image/png", 100)
    );
    await waitFor(() => {
      const alert = screen.getByRole("alert");
      const wrapper = screen.getByTestId("file-upload");
      expect(wrapper).toHaveAttribute("aria-describedby", alert.id);
    });
  });
});
