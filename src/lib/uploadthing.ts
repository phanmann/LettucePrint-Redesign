import { createUploadthing, type FileRouter } from 'uploadthing/next'

const f = createUploadthing()

export const ourFileRouter = {
  artworkUploader: f({
    pdf: { maxFileSize: '32MB' },
    image: { maxFileSize: '32MB', maxFileCount: 1 },
    // SVG, AI, EPS come through as blob
    blob: { maxFileSize: '64MB' },
  })
    .middleware(async ({ req }) => {
      // Pull sessionId from custom header set by the client
      const sessionId = req.headers.get('x-session-id')
      if (!sessionId) throw new Error('Missing sessionId')
      return { sessionId }
    })
    .onUploadComplete(async ({ metadata, file }) => {
      // Called server-side after file is stored
      // We return metadata to the client callback
      return {
        sessionId: metadata.sessionId,
        fileUrl: file.ufsUrl,
        fileName: file.name,
      }
    }),
} satisfies FileRouter

export type OurFileRouter = typeof ourFileRouter
