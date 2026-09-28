import { createClient } from 'next-sanity'
import { apiVersion, dataset, projectId } from './env'

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: true, // cached reads for public content
})

// Gallery edits should appear immediately after publishing in Studio. Using the
// live API also avoids caching a previous null result for a newly created path.
export const freshClient = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: false,
})

export const previewClient = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: false,
  token: process.env.SANITY_API_TOKEN,
})

// Server-only write client — never expose to browser
export const writeClient = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: false,
  token: process.env.SANITY_API_TOKEN,
})
