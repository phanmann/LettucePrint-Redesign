import FaqSection from '@/components/seo/FaqSection'
import type { Faq } from '@/lib/sticker-catalog'
import type { ReactNode } from 'react'
import Link from 'next/link'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import Button from '@/components/ui/Button'

export default function OrderingPageLayout({ title, introduction, customPrompt, children, faqs }: {
  title: string
  introduction: string
  customPrompt: string
  children: ReactNode
  faqs?: Faq[]
}) {
  return <><Navbar /><main className="pt-[72px]">
    <section className="border-b border-gray-100 bg-white py-16"><div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <Link href="/shop/marketing-materials" className="mb-4 inline-block text-xs font-semibold uppercase tracking-[0.2em] text-lp-green hover:underline">Marketing Materials</Link>
      <h1 className="text-display font-semibold text-gray-900">{title}</h1>
      <p className="mt-4 max-w-2xl text-body-lg text-gray-500">{introduction}</p>
    </div></section>
    <section className="bg-gray-50 py-16"><div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">{children}</div></section>
    {faqs && <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-8"><FaqSection faqs={faqs} /></div>}
    <section className="border-t border-gray-100 bg-white px-4 py-16 text-center"><h2 className="mb-4 text-h2 font-semibold text-gray-900">{customPrompt}</h2><Link href="/get-quote"><Button size="lg">Talk to Us</Button></Link></section>
  </main><Footer /></>
}
