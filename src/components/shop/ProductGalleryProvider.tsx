'use client'

import { createContext, useContext } from 'react'

export interface CmsProductGallery {
  galleryBackground?: 'white' | 'muted'
  images?: { image?: unknown; alt?: string; fit?: 'cover' | 'contain'; padding?: number }[]
}

const GalleryContext = createContext<Record<string, CmsProductGallery | null>>({})

export function ProductGalleryProvider({ galleries, children }: {
  galleries: Record<string, CmsProductGallery | null>
  children: React.ReactNode
}) {
  return <GalleryContext.Provider value={galleries}>{children}</GalleryContext.Provider>
}

export function useInitialProductGallery(productPath: string) {
  return useContext(GalleryContext)[productPath] ?? null
}

export function useInitialProductGalleries() {
  return useContext(GalleryContext)
}
