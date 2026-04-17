import Link from 'next/link'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'

export default function ProofNotFound() {
  return (
    <>
      <Navbar />
      <main className="pt-[72px] min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <div className="max-w-md w-full text-center py-20">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <span className="text-2xl">🔍</span>
          </div>
          <h1 className="text-h2 font-semibold text-gray-900 mb-3">Link not found</h1>
          <p className="text-small text-gray-500 mb-8">
            This proof link may have expired or is invalid. Please check your email for the correct link, or contact us and we'll resend it.
          </p>
          <a
            href="mailto:steve@lettuceprint.com?subject=Resend my proof link"
            className="inline-flex items-center px-6 py-3 bg-lp-green text-white font-semibold rounded-lg hover:bg-lp-green-dark transition-colors text-sm"
          >
            Email us to resend
          </a>
          <div className="mt-4">
            <Link href="/" className="text-sm text-gray-400 hover:text-gray-600 transition-colors">
              Back to Lettuce Print
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
