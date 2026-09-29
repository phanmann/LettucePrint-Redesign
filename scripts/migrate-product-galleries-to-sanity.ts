import { createHash } from 'node:crypto'
import { readdir, readFile } from 'node:fs/promises'
import path from 'node:path'
import { pathToFileURL } from 'node:url'
import { isValidElement, type ReactNode } from 'react'
import { createClient } from '@sanity/client'
import ProductImageGallery from '../src/components/shop/ProductImageGallery'
import ProductOrderPage from '../src/components/shop/ProductOrderPage'
import { apiVersion, dataset, projectId } from '../src/sanity/env'

type GalleryImage = {
  src: string
  alt: string
  fit?: 'cover' | 'contain'
  padding?: number
}

type GalleryRecord = {
  title: string
  productPath: string
  galleryBackground: 'white' | 'muted'
  images: GalleryImage[]
}

type PreparedDocument = {
  _id: string
  _type: string
  [key: string]: unknown
}

const root = process.cwd()
const appRoot = path.join(root, 'src', 'app')
const apply = process.argv.includes('--apply')
const overwriteExisting = process.argv.includes('--overwrite-existing')

function titleFromRoute(productPath: string) {
  const finalSegment = productPath
    .split('/')
    .filter(Boolean)
    .at(-1)!
    .split('-')
    .map(word => word.length <= 2 ? word.toUpperCase() : word[0].toUpperCase() + word.slice(1))
    .join(' ')

  if (productPath.includes('/business-cards/')) return `${finalSegment} Business Cards`
  if (productPath.includes('/flyers/')) return `${finalSegment} Flyers`
  if (productPath.includes('/postcards/')) return `${finalSegment} Postcards`
  return finalSegment
}

function documentId(productPath: string) {
  const slug = productPath.replace(/^\//, '').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')
  return `product-gallery-${slug}`
}

async function findProductPages(directory: string): Promise<string[]> {
  const entries = await readdir(directory, { withFileTypes: true })
  const nested = await Promise.all(entries.map(async entry => {
    const absolute = path.join(directory, entry.name)
    if (entry.isDirectory()) return findProductPages(absolute)
    if (entry.name !== 'page.tsx') return []

    const source = await readFile(absolute, 'utf8')
    return source.includes('ProductImageGallery') || source.includes('ProductOrderPage')
      ? [absolute]
      : []
  }))

  return nested.flat()
}

function findGalleryElement(node: ReactNode): { title?: string; background?: 'white' | 'muted'; images: GalleryImage[] } | null {
  if (Array.isArray(node)) {
    for (const child of node) {
      const found = findGalleryElement(child)
      if (found) return found
    }
    return null
  }

  if (!isValidElement(node)) return null

  if (node.type === ProductOrderPage) {
    const props = node.props as {
      name?: string
      galleryBackground?: 'white' | 'muted'
      images?: GalleryImage[]
    }
    if (props.images?.length) {
      return {
        title: props.name,
        background: props.galleryBackground,
        images: props.images,
      }
    }
  }

  if (node.type === ProductImageGallery) {
    const props = node.props as {
      background?: 'white' | 'muted'
      images?: GalleryImage[]
    }
    if (props.images?.length) {
      return {
        background: props.background,
        images: props.images,
      }
    }
  }

  const props = node.props as { children?: ReactNode }
  return findGalleryElement(props.children)
}

async function inventory(): Promise<GalleryRecord[]> {
  const pages = await findProductPages(appRoot)
  const records: GalleryRecord[] = []

  for (const pageFile of pages.sort()) {
    const relative = path.relative(appRoot, pageFile).replace(/\/page\.tsx$/, '')
    const productPath = `/${relative.split(path.sep).join('/')}`
    const pageModule = await import(`${pathToFileURL(pageFile).href}?inventory=${Date.now()}`)
    const rendered = await pageModule.default()
    const gallery = findGalleryElement(rendered)

    if (!gallery) continue
    records.push({
      title: gallery.title || titleFromRoute(productPath),
      productPath,
      galleryBackground: gallery.background || 'muted',
      images: gallery.images,
    })
  }

  return records
}

function mimeTypeFor(source: string) {
  const extension = path.extname(new URL(source, 'https://local.invalid').pathname).toLowerCase()
  return ({
    '.gif': 'image/gif',
    '.jpeg': 'image/jpeg',
    '.jpg': 'image/jpeg',
    '.png': 'image/png',
    '.svg': 'image/svg+xml',
    '.webp': 'image/webp',
  } as Record<string, string>)[extension] || 'application/octet-stream'
}

async function loadImage(source: string) {
  if (source.startsWith('/')) {
    const absolute = path.join(root, 'public', source.replace(/^\//, ''))
    return {
      buffer: await readFile(absolute),
      contentType: mimeTypeFor(source),
      filename: path.basename(absolute),
    }
  }

  const response = await fetch(source)
  if (!response.ok) throw new Error(`Unable to download ${source}: HTTP ${response.status}`)
  const pathname = new URL(source).pathname
  return {
    buffer: Buffer.from(await response.arrayBuffer()),
    contentType: response.headers.get('content-type')?.split(';')[0] || mimeTypeFor(source),
    filename: path.basename(pathname) || 'product-image',
  }
}

async function main() {
  const records = await inventory()
  const totalImages = records.reduce((sum, record) => sum + record.images.length, 0)

  console.log(JSON.stringify({ mode: apply ? 'apply' : 'dry-run', products: records.length, images: totalImages }))
  for (const record of records) {
    console.log(`${record.productPath} | ${record.title} | ${record.images.length} image(s) | ${record.galleryBackground}`)
  }

  if (!apply) return

  const token = process.env.SANITY_API_TOKEN
  if (!token) throw new Error('SANITY_API_TOKEN is required for --apply')

  const writeClient = createClient({ projectId, dataset, apiVersion, token, useCdn: false })
  const existingPaths = new Set(await writeClient.fetch<string[]>(
    '*[_type == "productGallery"].productPath'
  ))
  const uploadedByHash = new Map<string, string>()
  const preparedDocuments: PreparedDocument[] = []
  let migrated = 0
  let skipped = 0

  for (const record of records) {
    if (existingPaths.has(record.productPath) && !overwriteExisting) {
      console.log(`SKIP existing ${record.productPath}`)
      skipped += 1
      continue
    }

    const images = []
    for (const [index, image] of record.images.entries()) {
      const source = await loadImage(image.src)
      const hash = createHash('sha256').update(source.buffer).digest('hex')
      let assetId = uploadedByHash.get(hash)

      if (!assetId) {
        const asset = await writeClient.assets.upload('image', source.buffer, {
          contentType: source.contentType,
          filename: source.filename,
        })
        assetId = asset._id
        uploadedByHash.set(hash, assetId)
      }

      const fit: 'cover' | 'contain' = image.fit === 'contain' ? 'contain' : 'cover'
      images.push({
        _key: `image-${index + 1}`,
        _type: 'productGalleryImage',
        image: {
          _type: 'image',
          asset: { _type: 'reference', _ref: assetId },
        },
        alt: image.alt,
        fit,
        padding: fit === 'contain' ? (image.padding ?? 16) : 0,
      })
    }

    preparedDocuments.push({
      _id: documentId(record.productPath),
      _type: 'productGallery',
      title: record.title,
      productPath: record.productPath,
      enabled: true,
      galleryBackground: record.galleryBackground,
      images,
    })
    migrated += 1
    console.log(`PREPARED ${record.productPath}`)
  }

  if (preparedDocuments.length > 0) {
    let transaction = writeClient.transaction()
    for (const document of preparedDocuments) transaction = transaction.createOrReplace(document)
    await transaction.commit()
  }

  console.log(JSON.stringify({ migrated, skipped, products: records.length, uploadedAssets: uploadedByHash.size }))
}

main().catch(error => {
  console.error(error instanceof Error ? error.message : error)
  process.exit(1)
})
