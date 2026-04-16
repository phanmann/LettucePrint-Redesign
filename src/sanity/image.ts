import { createImageUrlBuilder } from '@sanity/image-url'
import { projectId, dataset } from './env'

const imageBuilder = createImageUrlBuilder({ projectId, dataset })

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function urlFor(source: any) {
  return imageBuilder.image(source)
}
