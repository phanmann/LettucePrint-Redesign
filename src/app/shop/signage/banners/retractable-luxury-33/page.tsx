import ProductOrderPage from '@/components/shop/ProductOrderPage'
import { retractableProducts } from '@/lib/retractable-products'

export default function Page() {
  return <ProductOrderPage {...retractableProducts['retractable-luxury-33']} />
}
