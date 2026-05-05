import type { Metadata } from 'next'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import CartPage from './CartPage'

export const metadata: Metadata = {
  title: 'Your Cart',
  robots: { index: false },
}

export default function Cart() {
  return (
    <>
      <Navbar />
      <main className="pt-[72px] min-h-screen bg-gray-50">
        <CartPage />
      </main>
      <Footer />
    </>
  )
}
