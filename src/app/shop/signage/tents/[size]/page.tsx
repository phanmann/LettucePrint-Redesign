import OrderShortcut from '@/components/shop/OrderShortcut'
import FaqSection from '@/components/seo/FaqSection'
import { tentFaqs } from '@/lib/department-product-faqs'
import RelatedProducts from '@/components/shop/RelatedProducts'
import type { Metadata } from 'next'
import ProductImageGallery from '@/components/shop/ProductImageGallery'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import TentConfigurator from '@/components/shop/TentConfigurator'
import { tentNames, type TentSize } from '@/lib/tent-pricing'
export function generateStaticParams() { return [{ size: '10x10' }, { size: '20x10' }] }
export async function generateMetadata({ params }: { params: Promise<{ size: string }> }): Promise<Metadata> {
  const { size } = await params
  return { title: tentNames[size as TentSize] ?? 'Canopy Tents', description: 'Configure a full printed canopy tent with frame, optional walls, flag holder hardware and wheel bag.' }
}
export default async function TentPage({ params }: { params: Promise<{ size: string }> }) {
  const { size } = await params
  if (size !== '10x10' && size !== '20x10') notFound()
  return <><Navbar /><main className="pt-[100px] pb-16 bg-gray-50"><div className="max-w-6xl mx-auto px-4 sm:px-6">
    <Link href="/shop/signage" className="text-lp-green underline">Signs & event displays</Link>
    <h1 className="text-4xl font-semibold mt-6 mb-4">{tentNames[size]}</h1>
    <p className="text-lg text-gray-600 mb-8">Make room for your brand. A full printed canopy and frame, with the walls and accessories your event needs. Replacement fabric tops and frames are also available separately.</p>
    <nav aria-label="Tent size" className="flex flex-wrap gap-3 mb-6">{(['10x10', '20x10'] as const).map(option => <Link key={option} href={`/shop/signage/tents/${option}`} aria-current={size === option ? 'page' : undefined} className={`rounded-lg border px-5 py-3 font-semibold ${size === option ? 'bg-lp-green text-white' : 'bg-white text-gray-900'}`}>{tentNames[option]}</Link>)}</nav>
    <div className="grid lg:grid-cols-2 gap-8 items-start"><div><ProductImageGallery /><p className="text-sm text-gray-600 mt-3">Choose a full kit, replacement fabric top, or frame below. Accessories available with full kits.</p></div><div data-mobile-order-module role="region" aria-label="Order options" tabIndex={-1} className="product-order-panel product-order-target lg:col-start-2 lg:row-start-1 lg:row-span-2"><TentConfigurator key={size} size={size} /></div><div className="lg:col-start-1 lg:row-start-2"><FaqSection faqs={tentFaqs(size)} /><div className="product-order-related"><RelatedProducts currentPath={`/shop/signage/tents/${size}`} /></div></div></div>
  </div></main><OrderShortcut /><Footer /></>
}
