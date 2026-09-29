import { NextResponse } from 'next/server'
import { freshClient } from '@/sanity/client'
import { productGalleryByPathQuery } from '@/sanity/queries'

export const dynamic = 'force-dynamic'

export async function GET(request: Request) {
  const productPath = new URL(request.url).searchParams.get('productPath')

  if (!productPath || (!productPath.startsWith('/services/') && !productPath.startsWith('/shop/'))) {
    return NextResponse.json({ error: 'Invalid product path' }, { status: 400 })
  }

  const gallery = await freshClient.fetch(
    productGalleryByPathQuery,
    { productPath },
    { cache: 'no-store' },
  )

  return NextResponse.json(gallery, {
    headers: {
      'Cache-Control': 'no-store, max-age=0',
    },
  })
}
