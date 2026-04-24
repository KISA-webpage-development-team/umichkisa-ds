"use client";
import * as React from "react";
import { cn } from "@/utils/cn";
import { Alert } from "@/components/feedback/Alert";
import { LoadingSpinner } from "@/components/feedback/LoadingSpinner";
import { Icon } from "@/components/icon";

/* ── Types ─────────────────────────────────────────────────────── */

export type FileUploadValue = { url: string; publicId: string };

export type AcceptedMimeType = "image/png" | "image/jpeg" | "image/webp";

export interface FileUploadMessages {
  clickToUpload?: string;
  uploadLabel?: string;
  removeLabel?: string;
  sizeExceeded?: (maxBytes: number) => string;
  invalidType?: (accepted: readonly string[]) => string;
  uploadFailed?: string;
  removeFailed?: string;
}

export interface FileUploadProps {
  value: FileUploadValue | null;
  onChange: (next: FileUploadValue | null) => void;
  onUpload: (file: File) => Promise<FileUploadValue>;
  onRemove: (publicId: string) => Promise<void>;
  accept?: readonly AcceptedMimeType[];
  maxSize?: number;
  disabled?: boolean;
  messages?: FileUploadMessages;
  className?: string;
}

/* ── Constants ─────────────────────────────────────────────────── */

export const FILE_UPLOAD_MAX_BYTES_DEFAULT = 5 * 1024 * 1024;

const DEFAULT_ACCEPT: readonly AcceptedMimeType[] = [
  "image/png",
  "image/jpeg",
  "image/webp",
];

const DEFAULT_UPLOAD_FAILED = "Upload failed. Please try again.";
const DEFAULT_REMOVE_FAILED = "Could not remove image.";

function mimeToShort(mime: string): string {
  if (mime === "image/png") return "PNG";
  if (mime === "image/jpeg") return "JPG";
  if (mime === "image/webp") return "WEBP";
  return mime;
}

function DEFAULT_SIZE_MSG(maxBytes: number): string {
  const mb = (maxBytes / (1024 * 1024)).toFixed(0);
  return `File exceeds ${mb}MB limit.`;
}

function DEFAULT_MIME_MSG(accepted: readonly string[]): string {
  const shorts = accepted.map(mimeToShort).join(", ");
  return `Only ${shorts} files are allowed.`;
}

/* ── Component ─────────────────────────────────────────────────── */

function FileUpload({
  value,
  onChange,
  onUpload,
  onRemove,
  accept = DEFAULT_ACCEPT,
  maxSize = FILE_UPLOAD_MAX_BYTES_DEFAULT,
  disabled = false,
  messages,
  className,
}: FileUploadProps) {
  const inputRef = React.useRef<HTMLInputElement>(null);
  const [pending, setPending] = React.useState<{
    file: File;
    blobUrl: string;
  } | null>(null);
  const [isUploading, setIsUploading] = React.useState(false);
  const [isRemoving, setIsRemoving] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);
  const errorId = React.useId();

  // Cleanup blob URL on unmount (only if pending still exists)
  const pendingRef = React.useRef(pending);
  pendingRef.current = pending;
  React.useEffect(() => {
    return () => {
      if (pendingRef.current) URL.revokeObjectURL(pendingRef.current.blobUrl);
    };
  }, []);

  const helperText = accept.map(mimeToShort).join(" · ");
  const clickToUpload = messages?.clickToUpload ?? "Click to upload";
  const uploadLabel = messages?.uploadLabel ?? "Upload image";
  const removeLabel = messages?.removeLabel ?? "Remove image";

  async function handleFilePicked(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    // Reset input so picking the same file again re-fires change
    e.target.value = "";
    if (!file) return;
    setError(null);
    if (file.size > maxSize) {
      setError(messages?.sizeExceeded?.(maxSize) ?? DEFAULT_SIZE_MSG(maxSize));
      return;
    }
    if (!accept.includes(file.type as AcceptedMimeType)) {
      setError(messages?.invalidType?.(accept) ?? DEFAULT_MIME_MSG(accept));
      return;
    }
    const blobUrl = URL.createObjectURL(file);
    setPending({ file, blobUrl });
    setIsUploading(true);
    try {
      const result = await onUpload(file);
      onChange(result);
    } catch (err) {
      const msg =
        err instanceof Error && err.message
          ? err.message
          : messages?.uploadFailed ?? DEFAULT_UPLOAD_FAILED;
      setError(msg);
    } finally {
      URL.revokeObjectURL(blobUrl);
      setPending(null);
      setIsUploading(false);
    }
  }

  async function handleRemoveClick() {
    if (!value) return;
    setError(null);
    setIsRemoving(true);
    try {
      await onRemove(value.publicId);
      onChange(null);
    } catch (err) {
      const msg =
        err instanceof Error && err.message
          ? err.message
          : messages?.removeFailed ?? DEFAULT_REMOVE_FAILED;
      setError(msg);
    } finally {
      setIsRemoving(false);
    }
  }

  function handleTriggerClick() {
    setError(null);
    inputRef.current?.click();
  }

  const showPreview = pending !== null || value !== null;
  const previewSrc = pending?.blobUrl ?? value?.url ?? "";

  return (
    <div
      data-testid="file-upload"
      className={cn("inline-block", className)}
      aria-busy={isUploading || undefined}
      aria-disabled={disabled || undefined}
      aria-describedby={error ? errorId : undefined}
    >
      <input
        ref={inputRef}
        type="file"
        data-testid="file-upload-input"
        tabIndex={-1}
        className="sr-only"
        accept={accept.join(",")}
        disabled={disabled || isUploading}
        onChange={handleFilePicked}
      />

      {showPreview ? (
        <div className="relative h-32 w-32">
          <img
            src={previewSrc}
            alt="Uploaded image"
            className="h-32 w-32 rounded-md border border-border object-cover"
          />
          {isUploading && (
            <div
              data-testid="file-upload-spinner"
              className="absolute inset-0 grid place-items-center rounded-md bg-background/40"
            >
              <LoadingSpinner size="sm" />
            </div>
          )}
          <button
            type="button"
            aria-label={removeLabel}
            disabled={isUploading || isRemoving || disabled}
            onClick={handleRemoveClick}
            className={cn(
              "absolute right-1.5 top-1.5 grid h-6 w-6 place-items-center",
              "rounded-full bg-surface ring-1 ring-border shadow-sm",
              "text-foreground transition-colors",
              "hover:bg-surface-subtle",
              "focus-visible:outline-2 focus-visible:outline-[var(--color-focus-ring)]",
              "focus-visible:[box-shadow:0_0_0_4px_var(--color-brand-primary)]",
              "disabled:cursor-not-allowed disabled:opacity-50",
              "after:absolute after:-inset-2.5 after:content-['']"
            )}
          >
            {isRemoving ? (
              <LoadingSpinner size="sm" />
            ) : (
              <Icon name="x" size="sm" aria-hidden="true" />
            )}
          </button>
        </div>
      ) : (
        <button
          type="button"
          aria-label={uploadLabel}
          disabled={disabled}
          onClick={handleTriggerClick}
          className={cn(
            "flex h-32 w-32 flex-col items-center justify-center gap-1.5",
            "rounded-md border border-dashed border-border",
            "text-muted-foreground transition-colors",
            "hover:text-foreground hover:border-foreground/40",
            "focus-visible:outline-2 focus-visible:outline-[var(--color-focus-ring)]",
            "focus-visible:[box-shadow:0_0_0_4px_var(--color-brand-primary)]",
            "disabled:cursor-not-allowed disabled:opacity-50",
            "disabled:hover:text-muted-foreground disabled:hover:border-border"
          )}
        >
          <Icon name="upload" size="md" aria-hidden="true" />
          <span className="type-label-sm text-current">{clickToUpload}</span>
          <span className="type-caption text-muted-foreground">
            {helperText}
          </span>
        </button>
      )}

      {error && (
        <Alert
          id={errorId}
          variant="error"
          role="alert"
          className="mt-2 w-full"
        >
          {error}
        </Alert>
      )}
    </div>
  );
}

export { FileUpload };
