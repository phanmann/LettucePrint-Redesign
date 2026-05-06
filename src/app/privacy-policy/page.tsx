import type { Metadata } from 'next'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'Privacy Policy for Lettuce Print website, quotes, orders, and customer communications.',
  alternates: { canonical: 'https://lettuceprint.com/privacy-policy' },
}

const sections = [
  ['Information we collect', 'We collect information you submit through forms, checkout, artwork uploads, and direct communication. This may include your name, company, email, phone, billing and shipping details, project specs, uploaded files, and order history.'],
  ['How we use it', 'We use this information to answer inquiries, prepare quotes, process orders, collect payment, coordinate production, send proofs, provide support, and improve the website experience.'],
  ['Payments', 'Payments are processed by Stripe. Lettuce Print does not store full credit card numbers on our servers. Stripe may collect payment, billing, fraud-prevention, and compliance information according to its own terms.'],
  ['Artwork and project files', 'Files you upload or send to us are used to review, quote, print, fulfill, and support your project. Do not submit files unless you have the rights or permission needed for production.'],
  ['Service providers', 'We may use trusted service providers for hosting, analytics, payments, email delivery, file uploads, shipping, customer support, and production workflow. They only receive information needed to perform their role.'],
  ['Analytics and cookies', 'The site may use cookies and analytics tools to understand performance, traffic, and conversion behavior. You can control cookies through your browser settings.'],
  ['Data retention', 'We keep quote, order, artwork, proof, and communication records as long as needed for business operations, customer support, legal, tax, and production reference purposes.'],
  ['Your choices', 'You can request that we update or delete certain personal information by contacting us. Some records may need to be retained for legal, accounting, fraud-prevention, or operational reasons.'],
  ['Contact', 'Questions about privacy can be sent to steve@lettuceprint.com or mailed to Lettuce Print, 361 Stagg St, Brooklyn, NY 11206.'],
]

export default function PrivacyPolicyPage() {
  return (
    <>
      <Navbar />
      <main className="pt-[72px] bg-white">
        <section className="border-b border-gray-100 py-16">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-lp-green mb-4">Legal</p>
            <h1 className="text-display font-semibold text-gray-900 mb-4">Privacy Policy</h1>
            <p className="text-small text-gray-500">Last updated May 6, 2026</p>
          </div>
        </section>
        <section className="py-12">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
            {sections.map(([title, copy]) => (
              <section key={title}>
                <h2 className="text-h4 font-semibold text-gray-900 mb-3">{title}</h2>
                <p className="text-body text-gray-600">{copy}</p>
              </section>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
