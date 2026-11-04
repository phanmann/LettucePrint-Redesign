import FlyersOrderPage from '@/components/marketing/FlyersOrderPage'
export default async function Page({ searchParams }: { searchParams: Promise<{ size?: string }> }) {
  const { size } = await searchParams
  return <FlyersOrderPage initialSize={size === 'oversized' ? '12" × 18"' : size === 'tabloid' ? '11" × 17"' : '8.5" × 11"'} />
}
