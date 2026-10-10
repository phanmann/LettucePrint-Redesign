import type { Metadata } from 'next'
import Image from 'next/image'
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
    <Link href="/services/signage" className="text-lp-green underline">Signs & event displays</Link>
    <h1 className="text-4xl font-semibold mt-6 mb-4">{tentNames[size]}</h1>
    <p className="text-lg text-gray-600 mb-8">Make room for your brand. A full printed canopy and frame, with the walls and accessories your event needs.</p>
    <nav aria-label="Tent size" className="flex flex-wrap gap-3 mb-6">{(['10x10', '20x10'] as const).map(option => <Link key={option} href={`/services/signage/tents/${option}`} aria-current={size === option ? 'page' : undefined} className={`rounded-lg border px-5 py-3 font-semibold ${size === option ? 'bg-lp-green text-white' : 'bg-white text-gray-900'}`}>{tentNames[option]}</Link>)}</nav>
    <div className="grid lg:grid-cols-2 gap-8 items-start"><div><Image src={`/images/products/tents/${size}.svg`} width={800} height={800} alt={`Original placeholder illustration of a ${size} canopy tent; not a product photograph`} className="w-full rounded-2xl" priority /><p className="text-sm text-gray-600 mt-3">Original placeholder art — illustrative only, not a product photograph. Accessories selected separately.</p></div><TentConfigurator key={size} size={size} /></div>
  </div></main><Footer /></>
}
