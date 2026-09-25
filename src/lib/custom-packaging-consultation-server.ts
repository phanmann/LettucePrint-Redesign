import type { CustomPackagingConsultationPayload } from './custom-packaging-consultation'

export const CUSTOM_PACKAGING_UPLOAD_LIMITS = {
  maxFiles: 3,
  maxFileBytes: 10 * 1024 * 1024,
  maxTotalBytes: 20 * 1024 * 1024,
} as const

const MIME_TYPES = new Set(['application/pdf', 'image/jpeg', 'image/png', 'image/webp'])

export interface ValidatedConsultationFile {
  originalName: string
  filename: string
  mimeType: string
  size: number
  content: Buffer
}

export type ConsultationUploadResult =
  | { success: true; files: ValidatedConsultationFile[] }
  | { success: false; error: string }

export function sanitizeAttachmentFilename(filename: string, index: number): string {
  const basename = filename.normalize('NFKC').split(/[\\/]/).pop() ?? ''
  const normalized = basename.replace(/[\0\r\n]/g, '-')
  const safe = normalized.replace(/[^a-zA-Z0-9._ -]/g, '_').replace(/\s+/g, ' ').trim()
  const withoutLeadingDots = safe.replace(/^\.+/, '')
  return (withoutLeadingDots || `reference-${index + 1}`).slice(0, 120)
}

function matchesMagicBytes(mimeType: string, bytes: Uint8Array): boolean {
  if (mimeType === 'application/pdf') {
    return bytes.length >= 5 && String.fromCharCode(...bytes.slice(0, 5)) === '%PDF-'
  }
  if (mimeType === 'image/jpeg') return bytes[0] === 0xff && bytes[1] === 0xd8 && bytes[2] === 0xff
  if (mimeType === 'image/png') {
    return bytes.length >= 8 && [0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a].every((value, index) => bytes[index] === value)
  }
  if (mimeType === 'image/webp') {
    return bytes.length >= 12
      && String.fromCharCode(...bytes.slice(0, 4)) === 'RIFF'
      && String.fromCharCode(...bytes.slice(8, 12)) === 'WEBP'
  }
  return false
}

export async function validateConsultationFiles(files: File[]): Promise<ConsultationUploadResult> {
  if (files.length > CUSTOM_PACKAGING_UPLOAD_LIMITS.maxFiles) {
    return { success: false, error: `Upload up to ${CUSTOM_PACKAGING_UPLOAD_LIMITS.maxFiles} files.` }
  }

  let totalBytes = 0
  const validated: ValidatedConsultationFile[] = []
  for (const [index, file] of files.entries()) {
    if (!MIME_TYPES.has(file.type)) {
      return { success: false, error: 'Files must be PDF, JPG, PNG, or WebP.' }
    }
    if (file.size <= 0 || file.size > CUSTOM_PACKAGING_UPLOAD_LIMITS.maxFileBytes) {
      return { success: false, error: 'Each file must be larger than 0 bytes and no more than 10 MB.' }
    }
    totalBytes += file.size
    if (totalBytes > CUSTOM_PACKAGING_UPLOAD_LIMITS.maxTotalBytes) {
      return { success: false, error: 'Combined uploads must be no more than 20 MB.' }
    }
    const bytes = new Uint8Array(await file.arrayBuffer())
    if (!matchesMagicBytes(file.type, bytes)) {
      return { success: false, error: `The contents of ${sanitizeAttachmentFilename(file.name, index)} do not match its file type.` }
    }
    validated.push({
      originalName: file.name,
      filename: sanitizeAttachmentFilename(file.name, index),
      mimeType: file.type,
      size: file.size,
      content: Buffer.from(bytes),
    })
  }
  return { success: true, files: validated }
}

function escapeHtml(value: string): string {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;')
}

function row(label: string, value: string): string {
  return `<tr><td style="padding:6px 0;color:#6b7280;font-size:13px;width:190px">${escapeHtml(label)}</td><td style="padding:6px 0">${escapeHtml(value || 'Not provided')}</td></tr>`
}

export function buildCustomPackagingInternalEmail(
  quote: CustomPackagingConsultationPayload,
  files: ValidatedConsultationFile[],
) {
  const { contact, projectDetails } = quote
  const attachmentSummary = files.length
    ? files.map(file => `${file.filename} (${file.mimeType}, ${file.size} bytes)`).join('; ')
    : 'None'
  return {
    from: 'Lettuce Print Website <onboarding@resend.dev>',
    to: 'info@lettuceprint.com',
    subject: `New Packaging Consultation — ${contact.company ? `${contact.company} · ` : ''}${contact.name}`,
    html: `
      <div style="font-family:sans-serif;max-width:680px;margin:0 auto">
        <h1 style="color:#00a175;font-size:20px">New Packaging Consultation</h1>
        <table style="width:100%;border-collapse:collapse">
          ${row('Name', contact.name)}
          ${row('Company', contact.company)}
          ${row('Email', contact.email)}
          ${row('Phone', contact.phone)}
          ${row('What are you packaging?', projectDetails.packagingContents)}
          ${row('Packaging type', projectDetails.packagingTypes.join(', '))}
          ${row('Estimated quantity', projectDetails.estimatedQuantity)}
          ${row('Approximate size', projectDetails.approximateSize)}
          ${row('Artwork or dieline?', projectDetails.artworkDielineStatus)}
          ${row('Target timeline', projectDetails.targetTimeline)}
          ${row('Project description', projectDetails.projectDescription)}
          ${row('Uploaded files', attachmentSummary)}
        </table>
        <p style="color:#9ca3af;font-size:12px">Submitted via ${escapeHtml(quote.source)}</p>
      </div>
    `,
    attachments: files.map(file => ({ filename: file.filename, content: file.content })),
  }
}

export async function sendCustomPackagingInternalEmail(
  send: (email: ReturnType<typeof buildCustomPackagingInternalEmail>) => Promise<{ error?: { message: string } | null }>,
  quote: CustomPackagingConsultationPayload,
  files: ValidatedConsultationFile[],
): Promise<ReturnType<typeof buildCustomPackagingInternalEmail>> {
  const email = buildCustomPackagingInternalEmail(quote, files)
  const result = await send(email)
  if (result.error) throw new Error(`Internal consultation email failed: ${result.error.message}`)
  return email
}
