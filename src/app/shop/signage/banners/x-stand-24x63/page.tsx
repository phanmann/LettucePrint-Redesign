import ProductOrderPage from '@/components/shop/ProductOrderPage'
import { retractableProducts } from '@/lib/retractable-products'

export default function Page() {
  return <ProductOrderPage {...retractableProducts['x-stand-24x63']} />
}
