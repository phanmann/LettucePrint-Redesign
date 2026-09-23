import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowDown, ArrowRight, Check, FileCheck2, HelpCircle, PackageCheck, SlidersHorizontal } from 'lucide-react'
import RollLabelCalculator from '@/components/shop/RollLabelCalculator'

export const metadata: Metadata = {
  title: 'Custom Roll Labels — Instant Pricing',
  description: 'Configure custom roll labels by size, material, finish, quantity, and application direction. See pricing before you add to cart.',
  alternates: { canonical: 'https://lettuceprint.com/lp/roll-labels' },
}

const helpHref = '/get-quote?service=stickers-labels&product=roll-labels&source=lp-roll-labels'

const faqs = [
  {
    question: 'Which material should I choose?',
    answer: 'Standard matte paper is a practical choice for dry products and general retail packaging. Premium BOPP is water-resistant and better suited to bottles, refrigerated products, cosmetics, and packaging that gets handled often.',
  },
  {
    question: 'What artwork works best?',
    answer: 'Vector artwork is preferred. A print-ready PDF, AI, or EPS file with fonts outlined and bleed included gives the cleanest result. If your file needs attention, send what you have and we can confirm the next step.',
  },
  {
    question: 'Will I see a proof?',
    answer: 'Yes. A digital proof is provided for review before production. Production starts after the proof is approved.',
  },
  {
    question: 'How long will my order take?',
    answer: 'Timing depends on the confirmed specifications, proof approval, quantity, and current production schedule. We will confirm the lead time for your order before production rather than promise a date from the calculator.',
  },
  {
    question: 'What is machine direction?',
    answer: 'An automatic applicator may require a specific edge to dispense first and the printed face to sit inside or outside the roll. Choose “With a machine” in the configurator and match the settings from your applicator manual.',
  },
  {
    question: 'What if I need a special size, adhesive, or setup?',
    answer: 'Use “Help me choose” and include your container, surface, storage conditions, applicator model, and target quantity. We will help confirm the right specification.',
  },
]

export default function RollLabelsLandingPage() {
  return (
    <main className="min-h-screen overflow-x-clip bg-[#f7f7f2] pb-20 text-gray-950 md:pb-0">
      <nav className="sticky top-0 z-50 border-b border-black/10 bg-[#f7f7f2]/95 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <Link href="/" className="block flex-shrink-0" aria-label="Lettuce Print home">
            <span className="relative block h-[46px] w-[120px] overflow-hidden sm:h-[52px] sm:w-[140px]">
              <Image
                src="/images/logos/LP_Logos_Wordmark-Green.svg"
                alt="Lettuce Print"
                width={1366}
                height={768}
                className="absolute left-[-31px] top-[-30px] h-auto w-[185px] max-w-none sm:left-[-36px] sm:top-[-35px] sm:w-[215px]"
              />
            </span>
          </Link>
          <a href="#pricing" className="rounded-full border-2 border-lp-green px-4 py-2 text-xs font-bold uppercase tracking-[0.12em] text-lp-green transition-colors hover:bg-lp-green hover:text-white">
            Get Instant Pricing
          </a>
        </div>
      </nav>

      <section className="mx-auto max-w-7xl px-4 pb-16 pt-10 sm:px-6 sm:pt-16 lg:px-8 lg:pb-24">
        <div className="grid items-start gap-12 lg:grid-cols-[minmax(0,0.9fr)_minmax(460px,1.1fr)] lg:gap-16">
          <div className="lg:sticky lg:top-24">
            <p className="mb-5 text-xs font-bold uppercase tracking-[0.2em] text-lp-green">Printed in Brooklyn</p>
            <h1 className="max-w-2xl text-4xl font-semibold leading-[0.98] tracking-[-0.04em] sm:text-6xl lg:text-7xl">
              Custom roll labels. Sized for your packaging.
            </h1>
            <p className="mt-6 max-w-xl text-base leading-7 text-gray-600 sm:text-lg">
              Enter a width and length from 0.5&Prime; to 12&Prime;, choose matte paper or water-resistant BOPP, then price quantities from 250 labels.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a href="#pricing" className="inline-flex items-center justify-center gap-2 rounded-xl border-2 border-lp-green bg-transparent px-6 py-3.5 text-sm font-bold uppercase tracking-[0.08em] text-lp-green transition-colors hover:bg-lp-green hover:text-white">
                Get Instant Pricing <ArrowDown size={17} />
              </a>
              <Link href={helpHref} className="inline-flex items-center justify-center gap-2 rounded-xl border border-gray-300 bg-white px-6 py-3.5 text-sm font-semibold text-gray-800 transition-colors hover:border-lp-green hover:text-lp-green">
                Help me choose <ArrowRight size={17} />
              </Link>
            </div>

            <div className="relative mt-10 aspect-[4/3] overflow-hidden rounded-[2rem] bg-[#e5e5dc]">
              <Image
                src="/images/products/roll-labels/roll-labels-2.jpg"
                alt="Printed custom labels arranged on rolls"
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 44vw"
                className="object-cover"
              />
            </div>
            <div className="mt-5 grid grid-cols-2 gap-3 text-sm text-gray-700">
              <p className="flex items-center gap-2"><Check size={16} className="text-lp-green" /> Digital proof before production</p>
              <p className="flex items-center gap-2"><Check size={16} className="text-lp-green" /> Standard 3&Prime; roll core</p>
            </div>
          </div>

          <div id="pricing" className="scroll-mt-24">
            <div className="mb-4 flex items-center justify-between gap-4">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.18em] text-lp-green">Configure your labels</p>
                <h2 className="mt-1 text-2xl font-semibold tracking-tight">See your price</h2>
              </div>
              <SlidersHorizontal size={24} className="text-lp-green" aria-hidden="true" />
            </div>
            <RollLabelCalculator productName="Custom Roll Labels" purchaseCtaStyle="outline" />
          </div>
        </div>
      </section>

      <section className="border-y border-black/10 bg-white py-16 sm:py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-10 lg:grid-cols-[0.75fr_1.25fr] lg:items-start">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-lp-green">Material guide</p>
              <h2 className="mt-3 text-3xl font-semibold tracking-[-0.03em] sm:text-4xl">Match the label to where it lives.</h2>
              <p className="mt-4 leading-7 text-gray-600">Start with the conditions around your package: moisture, refrigeration, handling, and the surface you are labeling.</p>
            </div>
            <div className="overflow-hidden rounded-2xl border border-gray-200">
              <div className="grid grid-cols-[0.8fr_1.2fr_1.2fr] bg-gray-950 px-4 py-3 text-xs font-bold uppercase tracking-wider text-white sm:px-6">
                <span>Material</span><span>Best fit</span><span>Consider</span>
              </div>
              <div className="grid grid-cols-[0.8fr_1.2fr_1.2fr] gap-3 border-b border-gray-200 px-4 py-5 text-sm sm:px-6">
                <strong>Matte paper</strong><span className="text-gray-600">Dry goods, boxes, retail packaging</span><span className="text-gray-600">Economical; not intended for repeated moisture</span>
              </div>
              <div className="grid grid-cols-[0.8fr_1.2fr_1.2fr] gap-3 px-4 py-5 text-sm sm:px-6">
                <strong>Premium BOPP</strong><span className="text-gray-600">Bottles, refrigerated goods, cosmetics</span><span className="text-gray-600">Water-resistant and more durable under handling</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
        <p className="text-center text-xs font-bold uppercase tracking-[0.2em] text-lp-green">From setup to production</p>
        <h2 className="mx-auto mt-3 max-w-2xl text-center text-3xl font-semibold tracking-[-0.03em] sm:text-4xl">A clear handoff at every step.</h2>
        <div className="mt-10 grid gap-4 md:grid-cols-4">
          {[
            { step: '01', title: 'Configure', body: 'Choose size, material, finish, quantity, and hand or machine application.', icon: SlidersHorizontal },
            { step: '02', title: 'Send artwork', body: 'Upload your artwork in the cart before payment. Need help with your file? Contact us before ordering.', icon: FileCheck2 },
            { step: '03', title: 'Approve proof', body: 'Review the digital proof and confirm the final production setup.', icon: Check },
            { step: '04', title: 'Production', body: 'We confirm the production schedule after specifications and proof are approved.', icon: PackageCheck },
          ].map(({ step, title, body, icon: Icon }) => (
            <article key={step} className="rounded-2xl border border-black/10 bg-white p-6">
              <div className="flex items-center justify-between"><span className="text-xs font-bold tracking-widest text-lp-green">{step}</span><Icon size={20} className="text-lp-green" /></div>
              <h3 className="mt-8 text-xl font-semibold">{title}</h3>
              <p className="mt-2 text-sm leading-6 text-gray-600">{body}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="bg-[#123c2f] py-16 text-white sm:py-20">
        <div className="mx-auto grid max-w-6xl gap-10 px-4 sm:px-6 lg:grid-cols-[0.7fr_1.3fr] lg:px-8">
          <div>
            <HelpCircle size={28} className="text-[#a7f3d0]" />
            <h2 className="mt-5 text-3xl font-semibold tracking-[-0.03em]">Questions before you configure?</h2>
            <p className="mt-4 leading-7 text-white/70">The practical details that affect material, artwork, application, and timing.</p>
            <Link href={helpHref} className="mt-7 inline-flex items-center gap-2 rounded-xl border border-white/60 px-5 py-3 text-sm font-semibold transition-colors hover:bg-white hover:text-[#123c2f]">Get custom help <ArrowRight size={16} /></Link>
          </div>
          <div className="divide-y divide-white/15 border-y border-white/15">
            {faqs.map((faq) => (
              <details key={faq.question} className="group py-5">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-5 font-semibold marker:hidden">
                  {faq.question}<span className="text-2xl font-light text-[#a7f3d0] transition-transform group-open:rotate-45">+</span>
                </summary>
                <p className="max-w-2xl pt-3 text-sm leading-6 text-white/70">{faq.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white px-4 py-16 text-center sm:px-6 sm:py-20">
        <h2 className="text-3xl font-semibold tracking-[-0.03em] sm:text-4xl">Ready to size up your label?</h2>
        <p className="mx-auto mt-4 max-w-xl leading-7 text-gray-600">Use the configurator for an instant price, or send us the packaging details if you need help choosing.</p>
        <div className="mt-7 flex flex-col justify-center gap-3 sm:flex-row">
          <a href="#pricing" className="inline-flex items-center justify-center gap-2 rounded-xl border-2 border-lp-green px-6 py-3.5 text-sm font-bold uppercase tracking-[0.08em] text-lp-green transition-colors hover:bg-lp-green hover:text-white">Get Instant Pricing <ArrowRight size={17} /></a>
          <Link href={helpHref} className="inline-flex items-center justify-center rounded-xl border border-gray-300 px-6 py-3.5 text-sm font-semibold text-gray-800 hover:border-lp-green hover:text-lp-green">Help me choose</Link>
        </div>
      </section>

      <footer className="border-t border-gray-200 bg-white py-8">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-4 text-sm text-gray-500 sm:flex-row sm:px-6 lg:px-8">
          <p>© {new Date().getFullYear()} Lettuce Print. Brooklyn, NY.</p>
          <Link href="/shop/roll-labels" className="font-semibold text-lp-green hover:underline">View full product page</Link>
        </div>
      </footer>

      <div className="fixed inset-x-0 bottom-0 z-50 border-t border-black/10 bg-white/95 p-3 shadow-[0_-8px_24px_rgba(0,0,0,0.08)] backdrop-blur md:hidden">
        <a href="#pricing" className="flex w-full items-center justify-center gap-2 rounded-xl border-2 border-lp-green px-5 py-3 text-sm font-bold uppercase tracking-[0.08em] text-lp-green">Get Instant Pricing <ArrowRight size={16} /></a>
      </div>
    </main>
  )
}
