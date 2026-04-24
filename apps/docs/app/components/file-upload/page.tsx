import {
  Alert,
  Container,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableMobileItem,
  TableMobileList,
  TableRow,
} from '@umichkisa-ds/web'
import { ComponentPreview } from '@/components/ComponentPreview'
import { InlineCode } from '@/components/InlineCode'
import { highlight } from '@/lib/highlight'
import { Heading } from '@/components/Heading'
import {
  FileUploadDemo,
  FileUploadDisabledDemo,
  FileUploadKoreanDemo,
  FileUploadRestrictedDemo,
} from './preview'

const basicCode = `"use client";

import { useState } from "react";
import { FileUpload, type FileUploadValue } from "@umichkisa-ds/web";

export function AvatarUpload() {
  const [value, setValue] = useState<FileUploadValue | null>(null);

  async function handleUpload(file: File): Promise<FileUploadValue> {
    // Send the file to your backend / storage provider.
    const form = new FormData();
    form.append("file", file);
    const res = await fetch("/api/upload", { method: "POST", body: form });
    if (!res.ok) throw new Error("Upload failed");
    return (await res.json()) as FileUploadValue; // { url, publicId }
  }

  async function handleRemove(publicId: string): Promise<void> {
    const res = await fetch(\`/api/upload/\${publicId}\`, { method: "DELETE" });
    if (!res.ok) throw new Error("Could not remove image");
  }

  return (
    <FileUpload
      value={value}
      onChange={setValue}
      onUpload={handleUpload}
      onRemove={handleRemove}
    />
  );
}`

const disabledCode = `"use client";

import { useState } from "react";
import { FileUpload, type FileUploadValue } from "@umichkisa-ds/web";

export function DisabledUpload() {
  const [value, setValue] = useState<FileUploadValue | null>(null);
  return (
    <FileUpload
      value={value}
      onChange={setValue}
      onUpload={handleUpload}
      onRemove={handleRemove}
      disabled
    />
  );
}`

const koreanCode = `"use client";

import { useState } from "react";
import { FileUpload, type FileUploadValue } from "@umichkisa-ds/web";

export function KoreanUpload() {
  const [value, setValue] = useState<FileUploadValue | null>(null);
  return (
    <FileUpload
      value={value}
      onChange={setValue}
      onUpload={handleUpload}
      onRemove={handleRemove}
      messages={{
        clickToUpload: "이미지 업로드",
        uploadLabel: "이미지 업로드",
        removeLabel: "이미지 삭제",
        sizeExceeded: (max) =>
          \`\${(max / (1024 * 1024)).toFixed(0)}MB를 초과하는 파일입니다.\`,
        invalidType: () => "PNG, JPG, WEBP 형식만 허용됩니다.",
        uploadFailed: "업로드에 실패했습니다. 다시 시도해 주세요.",
        removeFailed: "삭제에 실패했습니다.",
      }}
    />
  );
}`

const restrictedCode = `"use client";

import { useState } from "react";
import { FileUpload, type FileUploadValue } from "@umichkisa-ds/web";

export function PngOnlyUpload() {
  const [value, setValue] = useState<FileUploadValue | null>(null);
  return (
    <FileUpload
      value={value}
      onChange={setValue}
      onUpload={handleUpload}
      onRemove={handleRemove}
      accept={["image/png"]}
      maxSize={1024 * 1024}
    />
  );
}`

export default async function FileUploadPage() {
  const [
    basicHighlighted,
    disabledHighlighted,
    koreanHighlighted,
    restrictedHighlighted,
  ] = await Promise.all([
    highlight(basicCode),
    highlight(disabledCode),
    highlight(koreanCode),
    highlight(restrictedCode),
  ])

  return (
    <Container size="md" as="article">

      {/* -- Header -------------------------------------------------- */}
      <h1 className="type-h1 mb-4 text-foreground">File Upload</h1>
      <p className="type-body mb-4 text-foreground max-w-prose">
        Storage-agnostic, low-level single-image upload component with client-side validation, optimistic preview, and consumer-owned upload/remove callbacks. &ldquo;Optimistic preview&rdquo; here means the selected image renders immediately (via a local object URL) alongside a spinner; it&apos;s replaced by the uploaded URL on success or cleared on failure.
      </p>
      <Alert variant="info" className="mb-8">
        Consumer owns the <InlineCode>onUpload</InlineCode> / <InlineCode>onRemove</InlineCode> contract — FileUpload is storage-agnostic. Any backend (Cloudinary, S3, direct-to-server) works so long as the callbacks return the expected shape.
      </Alert>

      <div className="mb-8">
        <p className="type-body-sm mb-2 text-foreground max-w-prose">
          <strong>Value shape:</strong>
        </p>
        <pre className="type-caption font-mono text-foreground bg-surface-subtle border border-border rounded-md px-3 py-2 whitespace-pre overflow-x-auto">
          <code>{`type FileUploadValue = { url: string; publicId: string };`}</code>
        </pre>
        <p className="type-caption mt-2 text-muted-foreground max-w-prose">
          <InlineCode>publicId</InlineCode> is your storage backend&apos;s identifier for the uploaded file (Cloudinary <InlineCode>public_id</InlineCode>, S3 object key, etc.) — the component passes it back to <InlineCode>onRemove</InlineCode> so you can delete the file later. If your backend doesn&apos;t have a separate id, you can pass the URL itself as both values.
        </p>
        <p className="type-caption mt-2 text-muted-foreground max-w-prose">
          The component manages <InlineCode>isUploading</InlineCode> internally — you don&apos;t need to disable your form or show your own spinner while an upload is in flight.
        </p>
      </div>

      {/* -- Examples ------------------------------------------------- */}
      <Heading as="h2">Examples</Heading>

      {/* Basic */}
      <Heading as="h3" className="mt-6">Basic</Heading>
      <p className="type-body mb-2 text-foreground max-w-prose">
        The default configuration accepts PNG, JPG, and WEBP images up to 5MB. Wire up{' '}
        <InlineCode>onUpload</InlineCode> and <InlineCode>onRemove</InlineCode> to your storage backend.
      </p>
      <ComponentPreview code={basicCode} highlightedCode={basicHighlighted}>
        <FileUploadDemo />
      </ComponentPreview>

      {/* Disabled */}
      <Heading as="h3">Disabled</Heading>
      <p className="type-body mb-2 text-foreground max-w-prose">
        Pass <InlineCode>disabled</InlineCode> to block all interaction — the trigger and the remove button both become unclickable.
      </p>
      <ComponentPreview code={disabledCode} highlightedCode={disabledHighlighted}>
        <FileUploadDisabledDemo />
      </ComponentPreview>

      {/* Korean localization */}
      <Heading as="h3">Korean localization</Heading>
      <p className="type-body mb-2 text-foreground max-w-prose">
        Override every user-facing string via the <InlineCode>messages</InlineCode> prop. Static strings are plain values; size and MIME errors are functions that receive the current limit so the message can reflect it.
      </p>
      <ComponentPreview code={koreanCode} highlightedCode={koreanHighlighted}>
        <FileUploadKoreanDemo />
      </ComponentPreview>

      {/* Custom accept + max size */}
      <Heading as="h3">Custom accept + max size</Heading>
      <p className="type-body mb-2 text-foreground max-w-prose">
        Narrow the accepted MIME types via <InlineCode>accept</InlineCode> and tighten the upper bound via <InlineCode>maxSize</InlineCode> (in bytes). Rejected files surface the corresponding localized error from <InlineCode>messages</InlineCode>.
      </p>
      <ComponentPreview code={restrictedCode} highlightedCode={restrictedHighlighted}>
        <FileUploadRestrictedDemo />
      </ComponentPreview>

      {/* -- API Reference -------------------------------------------- */}
      <Heading as="h2">API Reference</Heading>
      <p className="type-body mb-4 text-foreground max-w-prose">
        FileUpload is a single component with a controlled value. The four required props fully specify the upload contract; the rest tune validation, state, and copy.
      </p>

      <div className="my-6">
        <div className="hidden md:block">
          <Table size="sm">
            <TableHeader>
              <TableRow>
                <TableHead>Prop</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Default</TableHead>
                <TableHead>Description</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell><InlineCode>value<span aria-label="required">*</span></InlineCode></TableCell>
                <TableCell><InlineCode>{`{ url: string; publicId: string } | null`}</InlineCode></TableCell>
                <TableCell>—</TableCell>
                <TableCell>Current uploaded file. <InlineCode>null</InlineCode> when empty. Component renders based on this.</TableCell>
              </TableRow>
              <TableRow>
                <TableCell><InlineCode>onChange<span aria-label="required">*</span></InlineCode></TableCell>
                <TableCell><InlineCode>{`(next: FileUploadValue | null) => void`}</InlineCode></TableCell>
                <TableCell>—</TableCell>
                <TableCell>Fired on successful upload (with resolved value) and successful remove (with <InlineCode>null</InlineCode>).</TableCell>
              </TableRow>
              <TableRow>
                <TableCell><InlineCode>onUpload<span aria-label="required">*</span></InlineCode></TableCell>
                <TableCell><InlineCode>{`(file: File) => Promise<FileUploadValue>`}</InlineCode></TableCell>
                <TableCell>—</TableCell>
                <TableCell>Perform the upload. Return <InlineCode>{`{ url, publicId }`}</InlineCode> on success. Reject with an Error to surface a message.</TableCell>
              </TableRow>
              <TableRow>
                <TableCell><InlineCode>onRemove<span aria-label="required">*</span></InlineCode></TableCell>
                <TableCell><InlineCode>{`(publicId: string) => Promise<void>`}</InlineCode></TableCell>
                <TableCell>—</TableCell>
                <TableCell>Perform the remove. Called with the current value&apos;s publicId. Reject to surface an error.</TableCell>
              </TableRow>
              <TableRow>
                <TableCell><InlineCode>accept</InlineCode></TableCell>
                <TableCell><InlineCode>readonly AcceptedMimeType[]</InlineCode></TableCell>
                <TableCell><InlineCode>{`["image/png", "image/jpeg", "image/webp"]`}</InlineCode></TableCell>
                <TableCell>Allowed MIME types. Union is restrictive by design — images only.</TableCell>
              </TableRow>
              <TableRow>
                <TableCell><InlineCode>maxSize</InlineCode></TableCell>
                <TableCell><InlineCode>number</InlineCode></TableCell>
                <TableCell><InlineCode>{`5 * 1024 * 1024`}</InlineCode></TableCell>
                <TableCell>Max file size in bytes. Default is 5 MB via exported <InlineCode>FILE_UPLOAD_MAX_BYTES_DEFAULT</InlineCode>.</TableCell>
              </TableRow>
              <TableRow>
                <TableCell><InlineCode>disabled</InlineCode></TableCell>
                <TableCell><InlineCode>boolean</InlineCode></TableCell>
                <TableCell><InlineCode>false</InlineCode></TableCell>
                <TableCell>Disables all interaction.</TableCell>
              </TableRow>
              <TableRow>
                <TableCell><InlineCode>messages</InlineCode></TableCell>
                <TableCell><InlineCode>FileUploadMessages</InlineCode></TableCell>
                <TableCell>—</TableCell>
                <TableCell>i18n overrides for all user-facing copy. See below.</TableCell>
              </TableRow>
              <TableRow>
                <TableCell><InlineCode>className</InlineCode></TableCell>
                <TableCell><InlineCode>string</InlineCode></TableCell>
                <TableCell>—</TableCell>
                <TableCell>Extra classes on the outer wrapper.</TableCell>
              </TableRow>
            </TableBody>
          </Table>
          <p className="type-caption mt-2 text-muted-foreground">* Required prop.</p>
        </div>
        <div className="block md:hidden">
          <TableMobileList>
            <TableMobileItem>
              <span className="type-body-sm text-foreground"><strong>value<span aria-label="required">*</span></strong></span>
              <span className="type-caption text-muted-foreground"><InlineCode>{`{ url: string; publicId: string } | null`}</InlineCode></span>
              <span className="type-caption text-muted-foreground">Current uploaded file. <InlineCode>null</InlineCode> when empty. Component renders based on this.</span>
            </TableMobileItem>
            <TableMobileItem>
              <span className="type-body-sm text-foreground"><strong>onChange<span aria-label="required">*</span></strong></span>
              <span className="type-caption text-muted-foreground"><InlineCode>{`(next: FileUploadValue | null) => void`}</InlineCode></span>
              <span className="type-caption text-muted-foreground">Fired on successful upload (with resolved value) and successful remove (with <InlineCode>null</InlineCode>).</span>
            </TableMobileItem>
            <TableMobileItem>
              <span className="type-body-sm text-foreground"><strong>onUpload<span aria-label="required">*</span></strong></span>
              <span className="type-caption text-muted-foreground"><InlineCode>{`(file: File) => Promise<FileUploadValue>`}</InlineCode></span>
              <span className="type-caption text-muted-foreground">Perform the upload. Return <InlineCode>{`{ url, publicId }`}</InlineCode> on success. Reject with an Error to surface a message.</span>
            </TableMobileItem>
            <TableMobileItem>
              <span className="type-body-sm text-foreground"><strong>onRemove<span aria-label="required">*</span></strong></span>
              <span className="type-caption text-muted-foreground"><InlineCode>{`(publicId: string) => Promise<void>`}</InlineCode></span>
              <span className="type-caption text-muted-foreground">Perform the remove. Called with the current value&apos;s publicId. Reject to surface an error.</span>
            </TableMobileItem>
            <TableMobileItem>
              <span className="type-body-sm text-foreground"><strong>accept</strong></span>
              <span className="type-caption text-muted-foreground"><InlineCode>readonly AcceptedMimeType[]</InlineCode> · default <InlineCode>{`["image/png", "image/jpeg", "image/webp"]`}</InlineCode></span>
              <span className="type-caption text-muted-foreground">Allowed MIME types. Union is restrictive by design — images only.</span>
            </TableMobileItem>
            <TableMobileItem>
              <span className="type-body-sm text-foreground"><strong>maxSize</strong></span>
              <span className="type-caption text-muted-foreground"><InlineCode>number</InlineCode> · default <InlineCode>{`5 * 1024 * 1024`}</InlineCode></span>
              <span className="type-caption text-muted-foreground">Max file size in bytes. Default is 5 MB via exported <InlineCode>FILE_UPLOAD_MAX_BYTES_DEFAULT</InlineCode>.</span>
            </TableMobileItem>
            <TableMobileItem>
              <span className="type-body-sm text-foreground"><strong>disabled</strong></span>
              <span className="type-caption text-muted-foreground"><InlineCode>boolean</InlineCode> · default <InlineCode>false</InlineCode></span>
              <span className="type-caption text-muted-foreground">Disables all interaction.</span>
            </TableMobileItem>
            <TableMobileItem>
              <span className="type-body-sm text-foreground"><strong>messages</strong></span>
              <span className="type-caption text-muted-foreground"><InlineCode>FileUploadMessages</InlineCode></span>
              <span className="type-caption text-muted-foreground">i18n overrides for all user-facing copy. See below.</span>
            </TableMobileItem>
            <TableMobileItem>
              <span className="type-body-sm text-foreground"><strong>className</strong></span>
              <span className="type-caption text-muted-foreground"><InlineCode>string</InlineCode></span>
              <span className="type-caption text-muted-foreground">Extra classes on the outer wrapper.</span>
            </TableMobileItem>
          </TableMobileList>
          <p className="type-caption mt-2 text-muted-foreground">* Required prop.</p>
        </div>
      </div>

      {/* FileUploadMessages */}
      <Heading as="h3">FileUploadMessages</Heading>
      <p className="type-body mb-2 text-foreground max-w-prose">
        Every key is optional. Unset keys fall back to the English defaults shown below.
      </p>
      <div className="my-6">
        <div className="hidden md:block">
          <Table size="sm">
            <TableHeader>
              <TableRow>
                <TableHead>Key</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Default</TableHead>
                <TableHead>Description</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell><InlineCode>clickToUpload</InlineCode></TableCell>
                <TableCell><InlineCode>string</InlineCode></TableCell>
                <TableCell><InlineCode>&quot;Click to upload&quot;</InlineCode></TableCell>
                <TableCell>Label inside the empty trigger square.</TableCell>
              </TableRow>
              <TableRow>
                <TableCell><InlineCode>uploadLabel</InlineCode></TableCell>
                <TableCell><InlineCode>string</InlineCode></TableCell>
                <TableCell><InlineCode>&quot;Upload image&quot;</InlineCode></TableCell>
                <TableCell><InlineCode>aria-label</InlineCode> for the empty trigger button.</TableCell>
              </TableRow>
              <TableRow>
                <TableCell><InlineCode>removeLabel</InlineCode></TableCell>
                <TableCell><InlineCode>string</InlineCode></TableCell>
                <TableCell><InlineCode>&quot;Remove image&quot;</InlineCode></TableCell>
                <TableCell><InlineCode>aria-label</InlineCode> for the X remove button.</TableCell>
              </TableRow>
              <TableRow>
                <TableCell><InlineCode>sizeExceeded</InlineCode></TableCell>
                <TableCell><InlineCode>{`(maxBytes: number) => string`}</InlineCode></TableCell>
                <TableCell><InlineCode>&quot;File exceeds {'{N}'}MB limit.&quot;</InlineCode></TableCell>
                <TableCell>Function returning the size-error message.</TableCell>
              </TableRow>
              <TableRow>
                <TableCell><InlineCode>invalidType</InlineCode></TableCell>
                <TableCell><InlineCode>{`(accepted: readonly string[]) => string`}</InlineCode></TableCell>
                <TableCell><InlineCode>&quot;Only PNG, JPG, WEBP files are allowed.&quot;</InlineCode></TableCell>
                <TableCell>Function returning the MIME-error message.</TableCell>
              </TableRow>
              <TableRow>
                <TableCell><InlineCode>uploadFailed</InlineCode></TableCell>
                <TableCell><InlineCode>string</InlineCode></TableCell>
                <TableCell><InlineCode>&quot;Upload failed. Please try again.&quot;</InlineCode></TableCell>
                <TableCell>Fallback used when <InlineCode>onUpload</InlineCode> rejects with an empty message.</TableCell>
              </TableRow>
              <TableRow>
                <TableCell><InlineCode>removeFailed</InlineCode></TableCell>
                <TableCell><InlineCode>string</InlineCode></TableCell>
                <TableCell><InlineCode>&quot;Could not remove image.&quot;</InlineCode></TableCell>
                <TableCell>Fallback used when <InlineCode>onRemove</InlineCode> rejects with an empty message.</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
        <div className="block md:hidden">
          <TableMobileList>
            <TableMobileItem>
              <span className="type-body-sm text-foreground"><strong>clickToUpload</strong></span>
              <span className="type-caption text-muted-foreground"><InlineCode>string</InlineCode> · default <InlineCode>&quot;Click to upload&quot;</InlineCode></span>
              <span className="type-caption text-muted-foreground">Label inside the empty trigger square.</span>
            </TableMobileItem>
            <TableMobileItem>
              <span className="type-body-sm text-foreground"><strong>uploadLabel</strong></span>
              <span className="type-caption text-muted-foreground"><InlineCode>string</InlineCode> · default <InlineCode>&quot;Upload image&quot;</InlineCode></span>
              <span className="type-caption text-muted-foreground"><InlineCode>aria-label</InlineCode> for the empty trigger button.</span>
            </TableMobileItem>
            <TableMobileItem>
              <span className="type-body-sm text-foreground"><strong>removeLabel</strong></span>
              <span className="type-caption text-muted-foreground"><InlineCode>string</InlineCode> · default <InlineCode>&quot;Remove image&quot;</InlineCode></span>
              <span className="type-caption text-muted-foreground"><InlineCode>aria-label</InlineCode> for the X remove button.</span>
            </TableMobileItem>
            <TableMobileItem>
              <span className="type-body-sm text-foreground"><strong>sizeExceeded</strong></span>
              <span className="type-caption text-muted-foreground"><InlineCode>{`(maxBytes: number) => string`}</InlineCode> · default <InlineCode>&quot;File exceeds {'{N}'}MB limit.&quot;</InlineCode></span>
              <span className="type-caption text-muted-foreground">Function returning the size-error message.</span>
            </TableMobileItem>
            <TableMobileItem>
              <span className="type-body-sm text-foreground"><strong>invalidType</strong></span>
              <span className="type-caption text-muted-foreground"><InlineCode>{`(accepted: readonly string[]) => string`}</InlineCode> · default <InlineCode>&quot;Only PNG, JPG, WEBP files are allowed.&quot;</InlineCode></span>
              <span className="type-caption text-muted-foreground">Function returning the MIME-error message.</span>
            </TableMobileItem>
            <TableMobileItem>
              <span className="type-body-sm text-foreground"><strong>uploadFailed</strong></span>
              <span className="type-caption text-muted-foreground"><InlineCode>string</InlineCode> · default <InlineCode>&quot;Upload failed. Please try again.&quot;</InlineCode></span>
              <span className="type-caption text-muted-foreground">Fallback used when <InlineCode>onUpload</InlineCode> rejects with an empty message.</span>
            </TableMobileItem>
            <TableMobileItem>
              <span className="type-body-sm text-foreground"><strong>removeFailed</strong></span>
              <span className="type-caption text-muted-foreground"><InlineCode>string</InlineCode> · default <InlineCode>&quot;Could not remove image.&quot;</InlineCode></span>
              <span className="type-caption text-muted-foreground">Fallback used when <InlineCode>onRemove</InlineCode> rejects with an empty message.</span>
            </TableMobileItem>
          </TableMobileList>
        </div>
      </div>

      {/* -- Behavior ------------------------------------------------- */}
      <Heading as="h2">Behavior</Heading>

      <Heading as="h3" className="mt-6">Lifecycle</Heading>
      <p className="type-body mb-2 text-foreground max-w-prose">
        Empty → client-side validation (MIME + size) → optimistic preview with a spinner while <InlineCode>onUpload</InlineCode> is in flight → populated on resolution, or the preview reverts and an error surfaces on rejection. <InlineCode>onChange</InlineCode> fires exactly once per successful transition.
      </p>

      <Heading as="h3">Replace flow</Heading>
      <p className="type-body mb-2 text-foreground max-w-prose">
        To swap the current file, the user must first remove it — the trigger is not interactive while a value is present. Block semantics were chosen deliberately for orphan safety: a replace-in-place operation would risk uploading a new file before the old one is deleted from storage.
      </p>

      <Heading as="h3">Error surfacing</Heading>
      <p className="type-body mb-2 text-foreground max-w-prose">
        Size and MIME validation errors render from <InlineCode>messages.sizeExceeded</InlineCode> / <InlineCode>messages.invalidType</InlineCode>. When <InlineCode>onUpload</InlineCode> or <InlineCode>onRemove</InlineCode> reject, the component prefers <InlineCode>err.message</InlineCode> when present and falls back to <InlineCode>messages.uploadFailed</InlineCode> / <InlineCode>messages.removeFailed</InlineCode>.
      </p>

      <Heading as="h3">Orphan cleanup responsibility</Heading>
      <p className="type-body mb-2 text-foreground max-w-prose">
        FileUpload only <em>calls</em> <InlineCode>onRemove</InlineCode> with the current <InlineCode>publicId</InlineCode>. The consumer&apos;s handler must actually delete the file from storage. Treat the contract as: &ldquo;if <InlineCode>onRemove</InlineCode> resolves, the stored file is gone.&rdquo;
      </p>

    </Container>
  )
}
