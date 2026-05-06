export const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2024-01-01'
export const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production'

// Guard against empty string env vars (Vercel sets '' not undefined when var is blank)
const rawProjectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID
export const projectId = (rawProjectId && /^[a-z0-9-]+$/.test(rawProjectId))
  ? rawProjectId
  : 'uown0zlq'
