import Medusa from '@medusajs/js-sdk'
export const commerceBackend = process.env.NEXT_PUBLIC_COMMERCE_BACKEND === 'medusa' ? 'medusa' : 'legacy'
export const medusa = new Medusa({baseUrl:process.env.NEXT_PUBLIC_MEDUSA_BACKEND_URL || 'http://localhost:9000',publishableKey:process.env.NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY,debug:false})
export type PrintEngine = 'sticker'|'spot-uv'|'roll-label'|'business-card'|'premium-business-card'
export interface PrintQuote {totalCents:number;display:{summary:string}}
export async function fetchPrintQuote(engine:PrintEngine,config:Record<string,unknown>,signal?:AbortSignal):Promise<PrintQuote>{
 if(commerceBackend!=='medusa')throw Error('Medusa integration disabled')
 const result=await medusa.client.fetch<{quote:PrintQuote}>('/store/print-quote',{method:'POST',body:{engine,config},signal})
 return result.quote
}
export async function getPrintCart(){
 const id=localStorage.getItem('lp_medusa_cart')
 if(id){try{return (await medusa.store.cart.retrieve(id)).cart}catch{localStorage.removeItem('lp_medusa_cart')}}
 const {regions}=await medusa.store.region.list(); const region=regions.find(r=>r.currency_code==='usd');if(!region)throw Error('US store unavailable')
 const {cart}=await medusa.store.cart.create({region_id:region.id});localStorage.setItem('lp_medusa_cart',cart.id);return cart
}
