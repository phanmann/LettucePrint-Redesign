import CommerceCart from '@/components/shop/CommerceCart'
import type { Metadata } from 'next'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'

export const metadata: Metadata = {
  title: 'Your Cart',
  robots: { index: false },
}

export default function Cart() {
  return (
    <>
      <Navbar />
      <main className="pt-[72px] min-h-screen bg-gray-50">
        <CommerceCart />
      </main>
      <Footer />
    </>
  )
}
