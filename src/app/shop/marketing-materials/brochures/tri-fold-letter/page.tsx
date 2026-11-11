import TriFoldOrderPage from '@/components/marketing/TriFoldOrderPage'
export default async function Page({ searchParams }: { searchParams: Promise<{ size?: string }> }) {
 const { size } = await searchParams
 const initialSize = size === 'tabloid' ? '11" × 17"' : size === 'oversized' ? '12" × 18"' : '8.5" × 11"'
 return <TriFoldOrderPage initialSize={initialSize} />
}
