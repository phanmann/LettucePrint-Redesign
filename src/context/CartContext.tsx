'use client'

import {
  createContext, useContext, useEffect, useState, useCallback,
  type ReactNode,
} from 'react'
import type { CartItem } from '@/lib/cart'

interface CartContextValue {
  items: CartItem[]
  count: number
  addItem: (item: Omit<CartItem, 'id' | 'addedAt'>) => void
  removeItem: (id: string) => void
  updateArtwork: (id: string, artworkUrl: string, artworkFilename: string) => void
  clearCart: () => void
}

const CartContext = createContext<CartContextValue | null>(null)

// Bump when authoritative pricing changes so stale browser totals cannot linger.
const STORAGE_KEY = 'lp_cart_v2'

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([])
  const [hydrated, setHydrated] = useState(false)

  // Hydrate from localStorage on mount
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY)
      if (raw) setItems(JSON.parse(raw))
    } catch {
      // ignore parse errors
    }
    setHydrated(true)
  }, [])

  // Persist on every change (after hydration)
  useEffect(() => {
    if (!hydrated) return
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items))
  }, [items, hydrated])

  const addItem = useCallback((item: Omit<CartItem, 'id' | 'addedAt'>) => {
    const newItem: CartItem = {
      ...item,
      id: crypto.randomUUID(),
      addedAt: Date.now(),
    }
    setItems(prev => [...prev, newItem])
  }, [])

  const removeItem = useCallback((id: string) => {
    setItems(prev => prev.filter(i => i.id !== id))
  }, [])

  const updateArtwork = useCallback((id: string, artworkUrl: string, artworkFilename: string) => {
    setItems(prev => prev.map(i => i.id === id ? { ...i, artworkUrl, artworkFilename } : i))
  }, [])

  const clearCart = useCallback(() => {
    setItems([])
  }, [])

  return (
    <CartContext.Provider value={{
      items,
      count: items.length,
      addItem,
      removeItem,
      updateArtwork,
      clearCart,
    }}>
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error('useCart must be used inside CartProvider')
  return ctx
}
