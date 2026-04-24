import * as React from "react";
import { cn } from "@/utils/cn";

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

/* ── Component (shell — filled in subsequent tasks) ────────────── */

function FileUpload({ className }: FileUploadProps) {
  return <div data-testid="file-upload" className={cn("inline-block", className)} />;
}

export { FileUpload };
