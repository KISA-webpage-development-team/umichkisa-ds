"use client";

import { useState } from "react";
import { FileUpload, type FileUploadValue } from "@umichkisa-ds/web";

async function mockUpload(file: File): Promise<FileUploadValue> {
  // Use an object URL for the preview so it actually renders after "upload".
  // Simulate ~1.2s latency.
  await new Promise((r) => setTimeout(r, 1200));
  const url = URL.createObjectURL(file);
  return { url, publicId: `mock-${Date.now()}` };
}

async function mockRemove(_publicId: string): Promise<void> {
  await new Promise((r) => setTimeout(r, 600));
}

export function FileUploadDemo() {
  const [value, setValue] = useState<FileUploadValue | null>(null);
  return (
    <FileUpload
      value={value}
      onChange={setValue}
      onUpload={mockUpload}
      onRemove={mockRemove}
    />
  );
}

export function FileUploadDisabledDemo() {
  const [value, setValue] = useState<FileUploadValue | null>(null);
  return (
    <FileUpload
      value={value}
      onChange={setValue}
      onUpload={mockUpload}
      onRemove={mockRemove}
      disabled
    />
  );
}

export function FileUploadKoreanDemo() {
  const [value, setValue] = useState<FileUploadValue | null>(null);
  return (
    <FileUpload
      value={value}
      onChange={setValue}
      onUpload={mockUpload}
      onRemove={mockRemove}
      messages={{
        clickToUpload: "이미지 업로드",
        uploadLabel: "이미지 업로드",
        removeLabel: "이미지 삭제",
        sizeExceeded: (max) =>
          `${(max / (1024 * 1024)).toFixed(0)}MB를 초과하는 파일입니다.`,
        invalidType: () => "PNG, JPG, WEBP 형식만 허용됩니다.",
        uploadFailed: "업로드에 실패했습니다. 다시 시도해 주세요.",
        removeFailed: "삭제에 실패했습니다.",
      }}
    />
  );
}

export function FileUploadRestrictedDemo() {
  const [value, setValue] = useState<FileUploadValue | null>(null);
  return (
    <FileUpload
      value={value}
      onChange={setValue}
      onUpload={mockUpload}
      onRemove={mockRemove}
      accept={["image/png"]}
      maxSize={1024 * 1024}
    />
  );
}
