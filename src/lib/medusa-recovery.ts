/** Pure recovery boundary: checking status must never create or confirm a payment. */
export async function recoverCheckout(
 retrieve:()=>Promise<{status:string}>,
 complete:()=>Promise<{type:string;order?:{id:string}}>,
){
 const intent=await retrieve()
 if(intent.status==='succeeded'){
  const result=await complete()
  if(result.type!=='order'||!result.order)throw Error('Payment received; order is still processing. Check again before paying.')
  return {kind:'complete' as const,orderId:result.order.id}
 }
 if(intent.status==='requires_payment_method')return {kind:'retry' as const}
 if(intent.status==='requires_action'||intent.status==='requires_confirmation')return {kind:'action' as const}
 if(intent.status==='processing'||intent.status==='requires_capture')return {kind:'pending' as const}
 return {kind:'blocked' as const}
}
export async function retrieveOrCreateCart<T extends {id:string}>(savedId:string|null,retrieve:(id:string)=>Promise<T>,create:()=>Promise<T>){
 // A timeout, 404 or auth error does not prove the cart is disposable.
 return savedId?retrieve(savedId):create()
}
export function cartSeparation(legacyCount:number,medusaCount:number){
 return {count:legacyCount+medusaCount,mixed:legacyCount>0&&medusaCount>0}
}
export async function attachUploadedArtwork(
 result:{ufsUrl:string;name:string}|undefined,
 attach:(artwork:{url:string;filename:string})=>Promise<unknown>,
){
 if(!result)throw Error('Upload did not return a file. Please try again.')
 const url=new URL(result.ufsUrl)
 if(url.protocol!=='https:')throw Error('Upload returned an invalid file URL')
 await attach({url:result.ufsUrl,filename:result.name})
 return result.name
}
